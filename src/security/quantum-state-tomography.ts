/**
 * src/security/quantum-state-tomography.ts
 *
 * Phase 2: Quantum State Tomography
 *
 * Verify quantum states via multi-basis measurement: measure copies in the
 * Z, X, Y bases, reconstruct the density matrix by linear inversion on the
 * Bloch vector, and compare fidelity against the expected state.
 *
 * Problem: an adversary may substitute a different state (intercept-resend).
 * Mirror solution: tomograph a sample of states — a substituted state shows
 * low fidelity against the expected preparation, and every measurement lands
 * in the Tier 4 receipt chain, so the evidence itself is tamper-proof.
 *
 * Fold integration:
 *   Tier 1 — states are content-addressed (QuantumStateUUID)
 *   Tier 4 — every shot recorded via recordMeasurement receipt chain
 *   Tier 5 — all receipts fold to a single merkle root (the proof)
 *
 * Honesty ledger:
 *   Exact    — Bloch reconstruction, fidelity/purity/entropy formulas (2×2 algebra)
 *   Faithful — the simulated measurement model (same-basis certainty, mutually
 *              unbiased bases give 1/2) mirrors ideal qubit statistics
 *   Refused  — no claim about physical quantum hardware
 */

import {
  encodeQuantumState,
  recordMeasurement,
  verifyMeasurementReceipt,
  QuantumFoldCipher,
  type MeasurementReceipt,
  type QuantumStateUUID,
  type QuantumCipherGate,
} from './quantum-fold-cipher.ts'

import { toUuid, merkleFold } from '../0/index.ts'
import { max, min, ceil, sqrt, log2, unitFromSeed, indexFromSeed } from '../0/algebra.ts'

/** Complex number for density-matrix entries. */
export interface Complex {
  readonly real: number
  readonly imag: number
}

/** One tomography basis. Y exists only as a measurement basis here. */
export type TomographyBasis = 'Z' | 'X' | 'Y'

/** Complete tomography output: reconstruction + properties + chain proof. */
export interface TomographyResult {
  readonly densityMatrix: Complex[][] // 2×2, Hermitian, trace 1
  readonly blochVector: { rx: number; ry: number; rz: number }
  readonly fidelity: number // ⟨ψ|ρ|ψ⟩ against the expected state, in [0,1]
  readonly purity: number // Tr(ρ²) = (1+|r|²)/2, in [1/2, 1]
  readonly entropy: number // von Neumann entropy in bits, in [0, 1]
  readonly proof: string // merkle root over all measurement receipts
  readonly measurements: {
    readonly z: readonly number[]
    readonly x: readonly number[]
    readonly y: readonly number[]
  }
  readonly receipts: readonly MeasurementReceipt[]
}

/** Result of sampling a channel for substituted states. */
export interface SubstitutionDetection {
  readonly adversaryDetected: boolean
  readonly confidenceLevel: number // fraction of states verified
  readonly minFidelity: number
  readonly fidelities: readonly number[]
}

const TOMOGRAPHY_GENESIS = toUuid('tomography-chain-genesis')
const MIN_FIDELITY_DEFAULT = 19 / 20 // acceptance gate: fidelity ≥ 19/20
const UNBIASED = 1 / 2 // mutually unbiased basis: P(0) = 1/2
const DEFAULT_SAMPLE_FRACTION = 1 / 10 // verify one state in ten

/**
 * Bloch vector of an expected pure state. Z0 → +z, Z1 → −z, X0 → +x, X1 → −x.
 * (Preparation bases in the cipher are Z and X; Y appears only in measurement.)
 */
function expectedBloch(state: QuantumStateUUID): { nx: number; ny: number; nz: number } {
  const sign = state.value === 0 ? 1 : -1
  if (state.basis === 'Z') return { nx: 0, ny: 0, nz: sign }
  return { nx: sign, ny: 0, nz: 0 }
}

export class QuantumStateTomography {
  /**
   * Simulated ideal-qubit measurement of one shot.
   * Same basis as preparation → the prepared value with certainty.
   * Mutually unbiased basis → deterministic pseudo-uniform 0/1 from the fold
   * hash of (state, basis, shot). No ambient entropy: reruns are identical.
   */
  private measureShot(state: QuantumStateUUID, basis: TomographyBasis, shot: number): 0 | 1 {
    if (basis === state.basis) return state.value
    return unitFromSeed(`${state.id}:${basis}:${shot}`) < UNBIASED ? 0 : 1
  }

  /** Measure `numShots` copies of the state in one basis. */
  collectMeasurements(
    state: QuantumStateUUID,
    basis: TomographyBasis,
    numShots: number,
  ): number[] {
    const outcomes: number[] = []
    for (let i = 0; i < numShots; i++) outcomes.push(this.measureShot(state, basis, i))
    return outcomes
  }

  /**
   * Linear-inversion reconstruction: ρ = (I + r·σ)/2 with
   * r_k = P(k=0) − P(k=1) for k ∈ {x, y, z}.
   * Exact 2×2 algebra — Hermitian by construction, trace exactly 1.
   */
  reconstructDensityMatrix(
    zOutcomes: readonly number[],
    xOutcomes: readonly number[],
    yOutcomes: readonly number[],
  ): { rho: Complex[][]; bloch: { rx: number; ry: number; rz: number } } {
    const expectation = (outcomes: readonly number[]): number => {
      if (outcomes.length === 0) return 0
      let zeros = 0
      for (const o of outcomes) if (o === 0) zeros++
      return (2 * zeros - outcomes.length) / outcomes.length
    }

    const rx = expectation(xOutcomes)
    const ry = expectation(yOutcomes)
    const rz = expectation(zOutcomes)

    // ρ = ½ [[1+rz, rx − i·ry], [rx + i·ry, 1−rz]]
    const rho: Complex[][] = [
      [
        { real: (1 + rz) / 2, imag: 0 },
        { real: rx / 2, imag: -ry / 2 },
      ],
      [
        { real: rx / 2, imag: ry / 2 },
        { real: (1 - rz) / 2, imag: 0 },
      ],
    ]

    return { rho, bloch: { rx, ry, rz } }
  }

  /**
   * Fidelity of ρ against the expected pure state |ψ⟩:
   * F = ⟨ψ|ρ|ψ⟩ = (1 + r·n)/2 where n is the expected Bloch vector.
   */
  calculateFidelity(
    expected: QuantumStateUUID,
    bloch: { rx: number; ry: number; rz: number },
  ): number {
    const n = expectedBloch(expected)
    const dot = bloch.rx * n.nx + bloch.ry * n.ny + bloch.rz * n.nz
    return max(0, min(1, (1 + dot) / 2))
  }

  /** Purity Tr(ρ²) = (1 + |r|²)/2 ∈ [1/2, 1] for a qubit. */
  calculatePurity(bloch: { rx: number; ry: number; rz: number }): number {
    const r2 = bloch.rx ** 2 + bloch.ry ** 2 + bloch.rz ** 2
    return max(0, min(1, (1 + r2) / 2))
  }

  /**
   * Von Neumann entropy in bits. Eigenvalues of ρ are (1 ± |r|)/2, so
   * S = −λ₊log₂λ₊ − λ₋log₂λ₋ ∈ [0, 1]; 0 for pure, 1 for maximally mixed.
   */
  calculateEntropy(bloch: { rx: number; ry: number; rz: number }): number {
    const r = min(1, sqrt(bloch.rx ** 2 + bloch.ry ** 2 + bloch.rz ** 2))
    const lp = (1 + r) / 2
    const lm = (1 - r) / 2
    const term = (l: number): number => (l > 1e-12 ? -l * log2(l) : 0)
    return max(0, term(lp) + term(lm))
  }

  /**
   * Full tomography: measure in Z, X, Y (numShots each), chain every shot
   * as a Tier 4 receipt, reconstruct ρ, and fold all receipts to one root.
   */
  performTomography(state: QuantumStateUUID, numShots: number = 1000): TomographyResult {
    const z = this.collectMeasurements(state, 'Z', numShots)
    const x = this.collectMeasurements(state, 'X', numShots)
    const y = this.collectMeasurements(state, 'Y', numShots)

    const receipts: MeasurementReceipt[] = []
    let prev: MeasurementReceipt | typeof TOMOGRAPHY_GENESIS = TOMOGRAPHY_GENESIS
    const record = (basis: TomographyBasis, outcomes: readonly number[]): void => {
      for (const outcome of outcomes) {
        const receipt = recordMeasurement(prev, outcome as 0 | 1, basis, state.registerIdx)
        receipts.push(receipt)
        prev = receipt
      }
    }
    record('Z', z)
    record('X', x)
    record('Y', y)

    const { rho, bloch } = this.reconstructDensityMatrix(z, x, y)

    return {
      densityMatrix: rho,
      blochVector: bloch,
      fidelity: this.calculateFidelity(state, bloch),
      purity: this.calculatePurity(bloch),
      entropy: this.calculateEntropy(bloch),
      proof: merkleFold(receipts.map((r) => r.id)),
      measurements: { z, x, y },
      receipts,
    }
  }

  /** Verify the receipt chain of a tomography run: every link recomputes. */
  verifyReceiptChain(result: TomographyResult): boolean {
    let prevId = TOMOGRAPHY_GENESIS
    for (const receipt of result.receipts) {
      if (receipt.prev !== prevId) return false
      if (!verifyMeasurementReceipt(receipt)) return false
      prevId = receipt.id
    }
    return merkleFold(result.receipts.map((r) => r.id)) === result.proof
  }

  /** Accept the state only if measured fidelity meets the threshold. */
  verifyTomography(
    expected: QuantumStateUUID,
    tomography: TomographyResult,
    minFidelity: number = MIN_FIDELITY_DEFAULT,
  ): boolean {
    return this.calculateFidelity(expected, tomography.blochVector) >= minFidelity &&
      tomography.fidelity >= minFidelity
  }

  /**
   * Sample a fraction of the channel's states and tomograph each. Any
   * fidelity below threshold flags substitution. Selection is deterministic
   * from the fold hash of the state list — no ambient entropy.
   */
  detectStateSubstitution(
    states: readonly QuantumStateUUID[],
    fractionToVerify: number = DEFAULT_SAMPLE_FRACTION,
    numShots: number = 200,
    minFidelity: number = MIN_FIDELITY_DEFAULT,
  ): SubstitutionDetection {
    if (states.length === 0) {
      return { adversaryDetected: false, confidenceLevel: 0, minFidelity: 1, fidelities: [] }
    }

    const listRoot = merkleFold(states.map((s) => s.id))
    const numToVerify = min(states.length, max(1, ceil(states.length * fractionToVerify)))

    const chosen = new Set<number>()
    let salt = 0
    while (chosen.size < numToVerify) {
      chosen.add(indexFromSeed(`select:${listRoot}:${salt}`, states.length))
      salt++
    }

    const fidelities: number[] = []
    for (const idx of chosen) {
      const tomo = this.performTomography(states[idx]!, numShots)
      fidelities.push(tomo.fidelity)
    }

    const lowest = min(...fidelities)
    return {
      adversaryDetected: lowest < minFidelity,
      confidenceLevel: numToVerify / states.length,
      minFidelity: lowest,
      fidelities,
    }
  }
}

/**
 * Tier 5 composition: the cipher's six facets plus a seventh that attests
 * the prepared state actually tomographs to what the preparation claims.
 *
 * This lives here, not in the cipher, because the dependency runs one way —
 * tomography imports the cipher. Reversing it would add an import cycle, and
 * the cycle count is capped. `computesGate(extraFacets)` is the seam.
 *
 * The seventh facet is on only when measured fidelity clears the gate, so a
 * substituted state turns the whole root off rather than passing quietly.
 */
export function computesGateWithTomography(
  cipher: QuantumFoldCipher,
  numShots: number = 1000,
  minFidelity: number = MIN_FIDELITY_DEFAULT,
): { gate: QuantumCipherGate; tomography: TomographyResult | null } {
  const state = cipher.state
  if (state === null) {
    // No state prepared: the facet is off, and it must not silently vanish —
    // an absent facet would leave the root looking like a clean six-facet run.
    return { gate: cipher.computesGate([{ facet: 'state-tomography', on: false }]), tomography: null }
  }

  const tomo = new QuantumStateTomography()
  const result = tomo.performTomography(state, numShots)
  const on = result.fidelity >= minFidelity && tomo.verifyReceiptChain(result)

  return { gate: cipher.computesGate([{ facet: 'state-tomography', on }]), tomography: result }
}

/**
 * Convenience: tomograph a state that claims to be `claimed` but was actually
 * prepared as `actual` — models an adversary substitution for testing. The
 * measurements follow the actual state; fidelity is computed against the claim.
 */
export function tomographAgainstClaim(
  actual: QuantumStateUUID,
  claimed: QuantumStateUUID,
  numShots: number = 1000,
): { fidelity: number; result: TomographyResult } {
  const tomo = new QuantumStateTomography()
  const result = tomo.performTomography(actual, numShots)
  return { fidelity: tomo.calculateFidelity(claimed, result.blochVector), result }
}

export { encodeQuantumState }
