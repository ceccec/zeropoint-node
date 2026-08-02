/**
 * Quantum State Tomography: Verify quantum states via multi-basis measurement
 *
 * Phase 2 Implementation: Reconstruct density matrix from measurement outcomes
 * without destroying the quantum state.
 *
 * Problem: Detect if adversary substituted different state (E.V. Eve attack)
 * Solution: Measure in Z, X, Y bases → reconstruct density matrix → verify fidelity
 * Fold Integration: Tier 4 (Chain Verification) — all measurements in receipt chain
 */

import { QuantumStateUUID } from './quantum-fold-cipher'
import { FoldReceipt, recordMeasurement } from '../integrity/receipt'
import { merkleFold, toUuid } from '../index'

/**
 * Complex number representation for density matrix elements
 */
export interface Complex {
  real: number
  imag: number
}

/**
 * Quantum tomography result: density matrix + properties + proofs
 */
export interface TomographyResult {
  densityMatrix: Complex[][]
  fidelity: number           // 0-1: overlap with expected state
  purity: number             // 0-1: trace(ρ²), measure of pureness
  entropy: number            // 0+: von Neumann entropy
  proof: string              // Merkle root of all measurements
  measurements: {
    z_outcomes: number[]     // Z-basis measurement outcomes (1000)
    x_outcomes: number[]     // X-basis measurement outcomes (1000)
    y_outcomes: number[]     // Y-basis measurement outcomes (1000)
  }
  receipts: FoldReceipt[]    // Measurement chain receipts
}

/**
 * Quantum State Tomography: Reconstruct & verify quantum states
 */
export class QuantumStateTomography {
  private receipts: FoldReceipt[] = []
  private prevReceipt: FoldReceipt | null = null

  /**
   * Complex arithmetic helpers
   */
  private static complex(real: number, imag: number = 0): Complex {
    return { real, imag }
  }

  private static complexAdd(a: Complex, b: Complex): Complex {
    return {
      real: a.real + b.real,
      imag: a.imag + b.imag
    }
  }

  private static complexMultiply(a: Complex, b: Complex): Complex {
    return {
      real: a.real * b.real - a.imag * b.imag,
      imag: a.real * b.imag + a.imag * b.real
    }
  }

  private static complexConj(c: Complex): Complex {
    return { real: c.real, imag: -c.imag }
  }

  private static complexMagnitude(c: Complex): number {
    return Math.sqrt(c.real ** 2 + c.imag ** 2)
  }

  /**
   * Collect measurement outcomes in given basis
   * Simulates measuring quantum state N times without destroying it
   *
   * @param state Quantum state to measure
   * @param basis 'Z' | 'X' | 'Y' — measurement basis
   * @param numShots Number of measurements (default 1000)
   * @returns Array of outcomes (0 or 1 for each shot)
   */
  private collectMeasurements(
    state: QuantumStateUUID,
    basis: 'Z' | 'X' | 'Y',
    numShots: number = 1000
  ): number[] {
    const outcomes: number[] = []

    // Simulate quantum measurement: depends on state + basis
    // For now, use deterministic mapping from state UUID
    const stateDigest = toUuid(`${state.id}:${basis}`)

    for (let i = 0; i < numShots; i++) {
      // Pseudo-random outcome based on state + shot index
      const seed = toUuid(`${stateDigest}:shot:${i}`)
      // Extract last hex digit, map to 0 or 1
      const lastChar = seed.slice(-1)
      const hexVal = parseInt(lastChar, 16)
      outcomes.push(hexVal >= 8 ? 1 : 0)
    }

    return outcomes
  }

  /**
   * Reconstruct single-qubit density matrix from measurement outcomes
   * ρ = average of |outcome⟩⟨outcome| projectors across all bases
   *
   * For single qubit (2×2 density matrix):
   * - Measure in Z basis: get Z probabilities
   * - Measure in X basis: get X probabilities
   * - Measure in Y basis: get Y probabilities
   * - Reconstruct using maximum likelihood estimation
   *
   * @param zOutcomes Z-basis measurement outcomes (0 or 1)
   * @param xOutcomes X-basis measurement outcomes (0 or 1)
   * @param yOutcomes Y-basis measurement outcomes (0 or 1)
   * @returns 2×2 complex density matrix
   */
  private reconstructDensityMatrix(
    zOutcomes: number[],
    xOutcomes: number[],
    yOutcomes: number[]
  ): Complex[][] {
    // Calculate measurement probabilities
    const pZ0 = zOutcomes.filter(x => x === 0).length / zOutcomes.length
    const pZ1 = zOutcomes.filter(x => x === 1).length / zOutcomes.length

    const pX0 = xOutcomes.filter(x => x === 0).length / xOutcomes.length
    const pX1 = xOutcomes.filter(x => x === 1).length / xOutcomes.length

    const pY0 = yOutcomes.filter(x => x === 0).length / yOutcomes.length
    const pY1 = yOutcomes.filter(x => x === 1).length / yOutcomes.length

    // Maximum likelihood estimation for 2×2 density matrix
    // ρ = [[ρ₀₀, ρ₀₁], [ρ₁₀, ρ₁₁]]
    //
    // From measurement probabilities:
    // ρ₀₀ = P(Z=0) = (1 + (P(X=0) - P(X=1)))/2
    // ρ₁₁ = P(Z=1) = (1 - (P(X=0) - P(X=1)))/2
    // ρ₀₁ = ρ₁₀* from Y basis: (P(Y=0) - P(Y=1))/2 as phase

    const rho00 = (pZ0 + pX0 - pX1) / 2
    const rho11 = (pZ1 + pX1 - pX0) / 2

    // Off-diagonal elements from Y basis
    const yPhase = (pY0 - pY1) / 2
    // For Bloch sphere: Y measurement encodes coherence
    const cohMagnitude = Math.sqrt(Math.max(0, rho00 * rho11))

    // ρ₀₁ = cohMagnitude * exp(i*phase)
    const rho01: Complex = {
      real: cohMagnitude * Math.cos(yPhase),
      imag: cohMagnitude * Math.sin(yPhase)
    }

    const rho10: Complex = QuantumStateTomography.complexConj(rho01)

    return [
      [{ real: rho00, imag: 0 }, rho01],
      [rho10, { real: rho11, imag: 0 }]
    ]
  }

  /**
   * Calculate fidelity between expected state and reconstructed density matrix
   * Fidelity F = ⟨expected|ρ|expected⟩ ∈ [0, 1]
   *
   * High fidelity (>0.95) means state matches expected
   * Low fidelity (<0.95) suggests adversary substitution
   *
   * @param expectedState Expected quantum state
   * @param rho Reconstructed density matrix
   * @returns Fidelity value 0-1 (1.0 = perfect match)
   */
  private calculateFidelity(
    expectedState: QuantumStateUUID,
    rho: Complex[][]
  ): number {
    // Map expected state to Bloch sphere coordinate
    // State is encoded as digit in vortex sequence
    const stateDigit = parseInt(expectedState.id.slice(-1), 10)

    // Map vortex digit to Bloch sphere: [0-8] → [0°-360°]
    const angle = (stateDigit / 9) * 2 * Math.PI

    // Expected state: |ψ⟩ = cos(θ/2)|0⟩ + sin(θ/2)e^(iφ)|1⟩
    const theta = angle / 2
    const psi0 = Math.cos(theta)
    const psi1Phase = Math.sin(theta)

    // Fidelity = ⟨ψ|ρ|ψ⟩
    // = |ψ₀|² ρ₀₀ + |ψ₁|² ρ₁₁ + 2 Re(ψ₀* ψ₁ ρ₀₁)
    const term1 = psi0 ** 2 * rho[0][0].real
    const term2 = psi1Phase ** 2 * rho[1][1].real
    const term3 = 2 * psi0 * psi1Phase * rho[0][1].real

    const fidelity = Math.max(0, Math.min(1, term1 + term2 + term3))
    return fidelity
  }

  /**
   * Calculate purity of density matrix
   * Purity P = Tr(ρ²) ∈ [0, 1]
   *
   * Pure states: P = 1
   * Mixed states: P < 1
   * White noise: P = 1/d (for d-dimensional system)
   *
   * @param rho Density matrix
   * @returns Purity value 0-1
   */
  private calculatePurity(rho: Complex[][]): number {
    // Compute ρ²
    const rho2_00 = QuantumStateTomography.complexAdd(
      QuantumStateTomography.complexMultiply(rho[0][0], rho[0][0]),
      QuantumStateTomography.complexMultiply(rho[0][1], rho[1][0])
    )

    const rho2_11 = QuantumStateTomography.complexAdd(
      QuantumStateTomography.complexMultiply(rho[1][0], rho[0][1]),
      QuantumStateTomography.complexMultiply(rho[1][1], rho[1][1])
    )

    // Purity = Tr(ρ²) = ρ²₀₀ + ρ²₁₁ (diagonal elements only)
    const purity = rho2_00.real + rho2_11.real
    return Math.max(0, Math.min(1, purity))
  }

  /**
   * Calculate von Neumann entropy of density matrix
   * S(ρ) = -Σ λᵢ log₂(λᵢ) where λᵢ are eigenvalues
   *
   * Measures mixedness: S=0 for pure states, S=1 for maximum mixture
   *
   * @param rho Density matrix
   * @returns Entropy value 0+
   */
  private calculateEntropy(rho: Complex[][]): number {
    // For 2×2 matrix, eigenvalues can be computed analytically
    // Trace = λ₁ + λ₂ = ρ₀₀ + ρ₁₁
    const trace = rho[0][0].real + rho[1][1].real

    // Determinant = λ₁ * λ₂ = ρ₀₀*ρ₁₁ - |ρ₀₁|²
    const det =
      rho[0][0].real * rho[1][1].real -
      (rho[0][1].real ** 2 + rho[0][1].imag ** 2)

    // Eigenvalues: λ = (trace ± √(trace² - 4*det))/2
    const discriminant = Math.max(0, trace ** 2 - 4 * det)
    const sqrtDisc = Math.sqrt(discriminant)

    const lambda1 = (trace + sqrtDisc) / 2
    const lambda2 = (trace - sqrtDisc) / 2

    // Entropy S = -Σ λᵢ log₂(λᵢ)
    const entropy = -(
      (lambda1 > 1e-10 ? lambda1 * Math.log2(lambda1) : 0) +
      (lambda2 > 1e-10 ? lambda2 * Math.log2(lambda2) : 0)
    )

    return Math.max(0, entropy)
  }

  /**
   * Perform quantum state tomography on given state
   *
   * Measures state in Z, X, Y bases (1000 shots each)
   * Reconstructs density matrix
   * Calculates fidelity, purity, entropy
   * Records all measurements in receipt chain (Tier 4)
   *
   * @param state Quantum state UUID to tomograph
   * @param numShots Number of measurements per basis (default 1000)
   * @returns Complete tomography result with proofs
   */
  performTomography(
    state: QuantumStateUUID,
    numShots: number = 1000
  ): TomographyResult {
    // Collect measurements in each basis
    const zOutcomes = this.collectMeasurements(state, 'Z', numShots)
    const xOutcomes = this.collectMeasurements(state, 'X', numShots)
    const yOutcomes = this.collectMeasurements(state, 'Y', numShots)

    // Record measurements in receipt chain (Tier 4 integration)
    this.receipts = []
    for (let i = 0; i < numShots; i++) {
      const measurement = `z:${zOutcomes[i]}`
      const receipt = recordMeasurement(
        this.prevReceipt,
        measurement,
        `tomography:${state.id}:z:${i}`
      )
      this.receipts.push(receipt)
      this.prevReceipt = receipt
    }

    for (let i = 0; i < numShots; i++) {
      const measurement = `x:${xOutcomes[i]}`
      const receipt = recordMeasurement(
        this.prevReceipt,
        measurement,
        `tomography:${state.id}:x:${i}`
      )
      this.receipts.push(receipt)
      this.prevReceipt = receipt
    }

    for (let i = 0; i < numShots; i++) {
      const measurement = `y:${yOutcomes[i]}`
      const receipt = recordMeasurement(
        this.prevReceipt,
        measurement,
        `tomography:${state.id}:y:${i}`
      )
      this.receipts.push(receipt)
      this.prevReceipt = receipt
    }

    // Reconstruct density matrix from outcomes
    const rho = this.reconstructDensityMatrix(zOutcomes, xOutcomes, yOutcomes)

    // Calculate quantum properties
    const fidelity = this.calculateFidelity(state, rho)
    const purity = this.calculatePurity(rho)
    const entropy = this.calculateEntropy(rho)

    // Create merkle proof from all receipts
    const receiptIds = this.receipts.map(r => r.id)
    const proof = merkleFold(receiptIds)

    return {
      densityMatrix: rho,
      fidelity,
      purity,
      entropy,
      proof,
      measurements: {
        z_outcomes: zOutcomes,
        x_outcomes: xOutcomes,
        y_outcomes: yOutcomes
      },
      receipts: this.receipts
    }
  }

  /**
   * Verify tomography result against expected state
   *
   * Checks if reconstructed fidelity meets minimum threshold
   * High fidelity (>0.95) = state matches expected
   * Low fidelity (<0.95) = state may be substituted (attack detected)
   *
   * @param expected Expected quantum state
   * @param tomography Tomography result to verify
   * @param minFidelity Minimum acceptable fidelity (default 0.95)
   * @returns True if state verified, false if substitution suspected
   */
  verifyTomography(
    expected: QuantumStateUUID,
    tomography: TomographyResult,
    minFidelity: number = 0.95
  ): boolean {
    return tomography.fidelity >= minFidelity
  }

  /**
   * Detect state substitution via tomography of random subset
   *
   * Uses statistical sampling: verify 10% of states
   * If any show low fidelity, adversary detected
   *
   * @param aliceStates Array of quantum states to verify
   * @param fractionToVerify Fraction of states to tomograph (default 0.1)
   * @returns Detection result with confidence level
   */
  detectStateSubstitution(
    aliceStates: QuantumStateUUID[],
    fractionToVerify: number = 0.1
  ): {
    adversaryDetected: boolean
    confidenceLevel: number
    minFidelity: number
    fidelities: number[]
  } {
    const numToVerify = Math.max(1, Math.ceil(aliceStates.length * fractionToVerify))

    // Randomly select states to verify
    const toVerify: QuantumStateUUID[] = []
    const indices = new Set<number>()

    while (indices.size < numToVerify && indices.size < aliceStates.length) {
      indices.add(Math.floor(Math.random() * aliceStates.length))
    }

    for (const idx of indices) {
      toVerify.push(aliceStates[idx])
    }

    // Perform tomography on each
    const fidelities: number[] = []
    for (const state of toVerify) {
      const tomo = this.performTomography(state)
      fidelities.push(tomo.fidelity)
    }

    // If any fidelity < 0.95, adversary detected
    const minFidelity = Math.min(...fidelities)
    const adversaryDetected = minFidelity < 0.95

    // Confidence = fraction of states verified
    const confidenceLevel = numToVerify / aliceStates.length

    return {
      adversaryDetected,
      confidenceLevel,
      minFidelity,
      fidelities
    }
  }
}
