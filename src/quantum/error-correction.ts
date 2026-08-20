/**
 * Quantum error correction: protect quantum states from decoherence.
 *
 * Stabilizer codes: measure syndrome (error pattern) without destroying state.
 * Surface codes: 2D lattice with threshold error rate (realistic hardware).
 * Repetition codes: simple 3-qubit extension (redundancy → recovery).
 *
 * All verified externally: error detection, correction cycles, fidelity gain.
 */

import { floor, abs, max, min, round } from '../0/algebra.ts'
import { type Register, zeroState, applyGate1, cnot, H, X, Z, probabilities, measureQubit, unitOf } from './simulator.ts'

export interface StabilizerCode {
  readonly name: string
  readonly logicalQubits: number // Number of encoded logical qubits
  readonly physicalQubits: number // Number of physical qubits
  readonly distance: number // Minimum weight of logical operator
  /**
   * Stabiliser generators in SYMPLECTIC form: each row is 2n bits,
   * [x_0..x_{n-1} | z_0..z_{n-1}].
   *
   * The previous n-bit form could not express a CSS code at all. An X-type and
   * a Z-type generator over the same support are different operators but
   * identical bit patterns, so the Steane code's six generators collapsed to
   * three distinct rows — and the list that was there had seven rows, of which
   * 13 of the 21 pairs anticommuted. A stabiliser group needs its generators to
   * commute pairwise; that one was not a group.
   *
   * Two rows commute iff their symplectic product is even:
   *   <g,h> = x_g . z_h + z_g . x_h  (mod 2)
   */
  readonly generators: readonly (readonly number[])[]
  /** X-type supports, n bits each. */
  readonly xGenerators: readonly (readonly number[])[]
  /** Z-type supports, n bits each. */
  readonly zGenerators: readonly (readonly number[])[]
}

/** Build a symplectic generator row from separate X and Z supports. */
function symplectic(x: readonly number[], z: readonly number[]): number[] {
  return [...x, ...z]
}

/** Symplectic product mod 2 — zero exactly when the two operators commute. */
export function symplecticProduct(g: readonly number[], h: readonly number[]): 0 | 1 {
  const n = g.length / 2
  let acc = 0
  for (let i = 0; i < n; i++) acc += g[i]! * h[n + i]! + g[n + i]! * h[i]!
  return (acc % 2) as 0 | 1
}

export interface SyndromeResult {
  readonly syndrome: readonly (0 | 1)[]
  readonly detected: boolean
  readonly errorType: string
}

export interface SurfaceCodeQubit {
  readonly row: number
  readonly col: number
  readonly physical: number // Index in physical qubit array
}

export interface SurfaceCodePlaquette {
  readonly type: 'Z' | 'X' // Z-stabilizer (4 Z gates) or X-stabilizer (4 X gates)
  readonly qubits: readonly number[] // Indices of qubits in the plaquette
}

export interface CorrelationValue {
  readonly re: number
  readonly im: number
}

// Simple 3-qubit repetition code: encode 1 logical qubit in 3 physical qubits
const REPETITION_Z: number[][] = [
  [1, 1, 0], // Z0 Z1
  [0, 1, 1], // Z1 Z2
]

export const REPETITION_3_CODE: StabilizerCode = {
  name: 'Repetition [3,1,1]',
  logicalQubits: 1,
  physicalQubits: 3,
  // Distance 1 as a QUANTUM code: it detects bit flips and is blind to phase
  // flips, so a single Z is an undetectable logical error.
  distance: 1,
  xGenerators: [],
  zGenerators: REPETITION_Z,
  generators: REPETITION_Z.map((z) => symplectic([0, 0, 0], z)),
}

// Steane code [7,1,3]: 7 physical qubits, 1 logical, distance 3
/**
 * The three parity checks of the classical [7,4,3] Hamming code. Steane's code
 * is the CSS construction over them, so the SAME three supports appear once as
 * X-type generators and once as Z-type — six in total, which is n - k = 7 - 1.
 *
 * Each pair overlaps in exactly two positions, so every X row commutes with
 * every Z row.
 */
const HAMMING_CHECKS: number[][] = [
  [0, 0, 0, 1, 1, 1, 1], // qubits 3,4,5,6
  [0, 1, 1, 0, 0, 1, 1], // qubits 1,2,5,6
  [1, 0, 1, 0, 1, 0, 1], // qubits 0,2,4,6
]

const ZERO7 = [0, 0, 0, 0, 0, 0, 0]

export const STEANE_CODE: StabilizerCode = {
  name: 'Steane [7,1,3]',
  logicalQubits: 1,
  physicalQubits: 7,
  distance: 3,
  xGenerators: HAMMING_CHECKS,
  zGenerators: HAMMING_CHECKS,
  generators: [
    ...HAMMING_CHECKS.map((x) => symplectic(x, ZERO7)),
    ...HAMMING_CHECKS.map((z) => symplectic(ZERO7, z)),
  ],
}

// Encode logical |0⟩ using repetition code: |0⟩_L = |000⟩
export function encodeLogicalZero(reg: Register): Register {
  // Start with |0⟩ and copy to 3 qubits via CNOTs
  // Register should have at least 3 qubits
  let result = reg
  // CNOT(0, 1): copy qubit 0 to qubit 1
  result = cnot(result, 0, 1)
  // CNOT(0, 2): copy qubit 0 to qubit 2
  result = cnot(result, 0, 2)
  return result
}

// Encode logical |+⟩ using repetition code: |+⟩_L = |+++⟩
export function encodeLogicalPlus(reg: Register): Register {
  let result = reg
  // Apply H to all 3 qubits
  result = applyGate1(result, 0, H)
  result = applyGate1(result, 1, H)
  result = applyGate1(result, 2, H)
  // Encode via CNOTs (copy)
  result = cnot(result, 0, 1)
  result = cnot(result, 0, 2)
  return result
}

// Measure syndrome for repetition code: check Z stabilizers (Z1 Z2, Z2 Z3)
export function measureSyndromeRepetition(
  reg: Register,
  seed: number = 0,
): SyndromeResult {
  let s = seed
  const syndrome: (0 | 1)[] = []

  // Syndrome 0: Z1 Z2 (correlation between qubits 0 and 1)
  // In computational basis, this is even/odd parity of (q0, q1)
  const m0 = measureQubit(reg, 0, unitOf(s))
  s = (1664525 * s + 1013904223) % 4294967296
  const m1 = measureQubit(reg, 1, unitOf(s))
  s = (1664525 * s + 1013904223) % 4294967296
  const parity01 = (m0.bit + m1.bit) % 2
  syndrome.push(parity01 as 0 | 1)

  // Syndrome 1: Z2 Z3 (correlation between qubits 1 and 2)
  const m2 = measureQubit(reg, 2, unitOf(s))
  const parity12 = (m1.bit + m2.bit) % 2
  syndrome.push(parity12 as 0 | 1)

  // Decode error from syndrome
  const detected = parity01 === 1 || parity12 === 1
  let errorType = 'none'
  if (parity01 === 1 && parity12 === 0) errorType = 'X0' // Error on qubit 0
  else if (parity01 === 1 && parity12 === 1) errorType = 'X1' // Error on qubit 1
  else if (parity01 === 0 && parity12 === 1) errorType = 'X2' // Error on qubit 2

  return { syndrome, detected, errorType }
}

// Apply correction based on syndrome (1-bit flip correction)
export function correctRepetition(reg: Register, syndrome: SyndromeResult): Register {
  let result = reg
  if (syndrome.errorType === 'X0') result = applyGate1(result, 0, X)
  else if (syndrome.errorType === 'X1') result = applyGate1(result, 1, X)
  else if (syndrome.errorType === 'X2') result = applyGate1(result, 2, X)
  return result
}

// Decode logical qubit (majority vote for repetition code)
export function decodeLogicalRepetition(reg: Register, seed: number = 0): 0 | 1 {
  let s = seed
  const m0 = measureQubit(reg, 0, unitOf(s))
  s = (1664525 * s + 1013904223) % 4294967296
  const m1 = measureQubit(reg, 1, unitOf(s))
  s = (1664525 * s + 1013904223) % 4294967296
  const m2 = measureQubit(reg, 2, unitOf(s))

  // Majority vote
  const vote = m0.bit + m1.bit + m2.bit
  return (vote >= 2 ? 1 : 0) as 0 | 1
}

// Surface code: 2D lattice of data and syndrome qubits
export function createSurfaceCodeLattice(distance: number): {
  readonly dataQubits: readonly SurfaceCodeQubit[]
  readonly plaquettes: readonly SurfaceCodePlaquette[]
} {
  const dataQubits: SurfaceCodeQubit[] = []
  const plaquettes: SurfaceCodePlaquette[] = []
  let physicalIdx = 0

  // Distance d means (2d-1) × (2d-1) lattice of data qubits
  const size = 2 * distance - 1

  // Create data qubits
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      dataQubits.push({ row, col, physical: physicalIdx })
      physicalIdx++
    }
  }

  // Create plaquettes (X and Z stabilizers interleaved)
  for (let row = 0; row < size - 1; row++) {
    for (let col = 0; col < size - 1; col++) {
      // Z-stabilizer (even row+col)
      if ((row + col) % 2 === 0) {
        const tl = row * size + col // top-left
        const tr = row * size + (col + 1) // top-right
        const bl = (row + 1) * size + col // bottom-left
        const br = (row + 1) * size + (col + 1) // bottom-right
        plaquettes.push({ type: 'Z', qubits: [tl, tr, bl, br] })
      }
      // X-stabilizer (odd row+col)
      else {
        const tl = row * size + col
        const tr = row * size + (col + 1)
        const bl = (row + 1) * size + col
        const br = (row + 1) * size + (col + 1)
        plaquettes.push({ type: 'X', qubits: [tl, tr, bl, br] })
      }
    }
  }

  return { dataQubits, plaquettes }
}

// Estimate threshold error rate: below threshold, QEC improves fidelity
export function estimateSurfaceCodeThreshold(
  distance: number,
  physicalErrorRate: number,
): {
  readonly logicalErrorRate: number
  readonly threshold: number
  readonly isBelowThreshold: boolean
} {
  const threshold = 1 / 100 // ~1% for surface codes (typical)
  const isBelowThreshold = physicalErrorRate < threshold

  // Simplified model: logical error rate ∝ (physical error)^((distance+1)/2)
  // Below threshold: exponential suppression; above: errors accumulate
  const exponent = (distance + 1) / 2
  let logicalErrorRate: number
  if (isBelowThreshold) {
    logicalErrorRate = physicalErrorRate ** exponent
  } else {
    // Above threshold, errors accumulate quickly
    logicalErrorRate = 1 - (1 - physicalErrorRate) ** distance
  }

  return { logicalErrorRate, threshold, isBelowThreshold }
}

// Calculate logical fidelity after QEC round
export function calculateLogicalFidelity(
  initialFidelity: number,
  distance: number,
  physicalErrorRate: number,
): number {
  const result = estimateSurfaceCodeThreshold(distance, physicalErrorRate)
  if (result.isBelowThreshold) {
    // Below threshold: fidelity improves exponentially
    return 1 - result.logicalErrorRate
  } else {
    // Above threshold: fidelity degrades
    return max(0, initialFidelity * (1 - result.logicalErrorRate))
  }
}

// Full error correction cycle: encode → apply noise → measure syndrome → correct
export function errorCorrectionCycle(
  logicalState: Register,
  physicalErrorRate: number,
  seed: number = 0,
): {
  readonly encoded: Register
  readonly syndrome: SyndromeResult
  readonly corrected: Register
  readonly recovered: boolean
} {
  // Encode logical qubit
  const encoded = encodeLogicalZero(logicalState)

  // Simulate single-qubit bit-flip error at rate physicalErrorRate
  let erroredState = encoded
  let s = seed
  for (let q = 0; q < 3; q++) {
    s = (1664525 * s + 1013904223) % 4294967296
    const errorThreshold = round(physicalErrorRate * 1000000)
    const random = s % 1000000
    if (random < errorThreshold) {
      // Bit-flip error on qubit q
      erroredState = applyGate1(erroredState, q, X)
    }
  }

  // Measure syndrome (non-destructive)
  const syndrome = measureSyndromeRepetition(erroredState, s)

  // Apply correction
  const corrected = correctRepetition(erroredState, syndrome)

  // Verify recovery
  const recovered = !syndrome.detected

  return { encoded, syndrome, corrected, recovered }
}

// Batch error correction: run multiple QEC cycles, track fidelity improvement
export function batchErrorCorrection(
  logicalState: Register,
  physicalErrorRate: number,
  cycles: number,
  seed: number = 0,
): {
  readonly results: readonly {
    readonly cycle: number
    readonly syndrome: readonly (0 | 1)[]
    readonly recovered: boolean
  }[]
  readonly successRate: number
  readonly totalErrors: number
} {
  const results: {
    readonly cycle: number
    readonly syndrome: readonly (0 | 1)[]
    readonly recovered: boolean
  }[] = []
  let successCount = 0
  let totalErrors = 0
  let s = seed

  for (let c = 0; c < cycles; c++) {
    const cycle = errorCorrectionCycle(logicalState, physicalErrorRate, s)
    s = (1664525 * s + 1013904223) % 4294967296

    results.push({
      cycle: c,
      syndrome: cycle.syndrome.syndrome,
      recovered: cycle.recovered,
    })

    if (cycle.recovered) successCount++
    if (cycle.syndrome.detected) totalErrors++
  }

  const successRate = successCount / cycles
  return { results, successRate, totalErrors }
}

// Stabilizer code monitoring: track syndrome history for pattern detection
export function monitorSyndromePattern(
  syndromeHistory: readonly SyndromeResult[],
): {
  readonly correlated: boolean
  readonly patternType: string
  readonly confidenceRatio: number
} {
  if (syndromeHistory.length < 2) {
    return { correlated: false, patternType: 'insufficient', confidenceRatio: 0 }
  }

  let sameConsecutive = 0
  for (let i = 1; i < syndromeHistory.length; i++) {
    const prev = syndromeHistory[i - 1]!.syndrome
    const curr = syndromeHistory[i]!.syndrome
    if (prev[0] === curr[0] && prev[1] === curr[1]) {
      sameConsecutive++
    }
  }

  const correlationRatio = sameConsecutive / (syndromeHistory.length - 1)
  const correlated = correlationRatio > 1 / 2

  let patternType = 'random'
  if (correlated) patternType = 'correlated error'

  return { correlated, patternType, confidenceRatio: correlationRatio }
}
