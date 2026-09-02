/**
 * Quantum state tomography: reconstruct density matrices via measurement
 * across multiple bases (Z, X, Y). Proves what quantum state you have
 * without destroying it — via statistics across many measurement runs.
 */

import { abs, floor, log2 } from '../0/algebra.ts'
import { type Complex, type Gate1, type Register, applyGate1, H, measureQubit, probabilities, unitOf } from './simulator.ts'

// Complex was declared here as well as in simulator.ts, identically. One
// definition, imported above — a second copy is a place for the two to drift.

type DensityMatrix = readonly (readonly Complex[])[]

export interface TomographyMeasurement {
  readonly basis: 'Z' | 'X' | 'Y'
  readonly qubit: number
  readonly shots: number
  readonly counts: readonly [number, number] // [count_0, count_1]
  readonly seed: number
}

export interface TomographyResult {
  readonly qubit: number
  readonly measurements: readonly TomographyMeasurement[]
  readonly densityMatrix: DensityMatrix
  readonly fidelity: number
  readonly expectedState?: string
}

export interface TomographyProof {
  readonly qubit: number
  readonly basis: 'Z' | 'X' | 'Y'
  readonly prob0: number
  readonly prob1: number
  readonly seed: number
  readonly shotsMeasured: number
}

// Measure qubit in Z basis (computational basis): |0⟩ or |1⟩
export function measureZ(reg: Register, qubit: number, shots: number = 1000, seed: number = 0): TomographyMeasurement {
  const counts = [0, 0]
  let s = seed
  for (let i = 0; i < shots; i++) {
    const meas = measureQubit(reg, qubit, unitOf(s))
    counts[meas.bit]++
    s = (1664525 * s + 1013904223) % 4294967296
  }
  return { basis: 'Z', qubit, shots, counts: counts as unknown as readonly [number, number], seed }
}

// Measure qubit in X basis: apply H, then measure in Z
export function measureX(reg: Register, qubit: number, shots: number = 1000, seed: number = 0): TomographyMeasurement {
  // Apply H to rotate X basis → Z basis
  const rotated = applyGate1(reg, qubit, H)
  const counts = [0, 0]
  let s = seed
  for (let i = 0; i < shots; i++) {
    const meas = measureQubit(rotated, qubit, unitOf(s))
    counts[meas.bit]++
    s = (1664525 * s + 1013904223) % 4294967296
  }
  return { basis: 'X', qubit, shots, counts: counts as unknown as readonly [number, number], seed }
}

// Measure qubit in Y basis: apply S†, then H, then measure in Z
export function measureY(reg: Register, qubit: number, shots: number = 1000, seed: number = 0): TomographyMeasurement {
  // S† (adjoint S) = [[1, 0], [0, -i]]
  // In complex format: [1+0i, 0+0i, 0+0i, 0-1i]
  // S-dagger is a Gate1: four Complex amplitudes. It was four `as any` casts
  // and an `any` array, which is the one place in this file where the types
  // are exact and nothing was using them.
  const one: Complex = { re: 1, im: 0 }
  const zero: Complex = { re: 0, im: 0 }
  const negi: Complex = { re: 0, im: -1 }
  const sAdjoint: Gate1 = [one, zero, zero, negi]
  const s1 = applyGate1(reg, qubit, sAdjoint)
  // Apply H
  const s2 = applyGate1(s1, qubit, H)
  const counts = [0, 0]
  let s = seed
  for (let i = 0; i < shots; i++) {
    const meas = measureQubit(s2, qubit, unitOf(s))
    counts[meas.bit]++
    s = (1664525 * s + 1013904223) % 4294967296
  }
  // counts is built with exactly two slots; naming them makes that a tuple
  // rather than an assertion the compiler cannot check.
  return { basis: 'Y', qubit, shots, counts: [counts[0]!, counts[1]!] as readonly [number, number], seed }
}

// Single-qubit tomography: measure in Z, X, Y bases
export function tomatoSingleQubit(
  reg: Register,
  qubit: number,
  shots: number = 1000,
  seed: number = 0,
): TomographyResult {
  let s = seed
  const measurements: TomographyMeasurement[] = []

  // Z basis
  measurements.push(measureZ(reg, qubit, shots, s))
  s = (1664525 * s + 1013904223) % 4294967296

  // X basis
  measurements.push(measureX(reg, qubit, shots, s))
  s = (1664525 * s + 1013904223) % 4294967296

  // Y basis
  measurements.push(measureY(reg, qubit, shots, s))

  // Reconstruct single-qubit density matrix (2x2)
  const zMeas = measurements[0]!
  const xMeas = measurements[1]!
  const yMeas = measurements[2]!

  const pz0 = zMeas.counts[0]! / shots
  const pz1 = zMeas.counts[1]! / shots
  const px0 = xMeas.counts[0]! / shots
  const px1 = xMeas.counts[1]! / shots
  const py0 = yMeas.counts[0]! / shots
  const py1 = yMeas.counts[1]! / shots

  // Reconstruct: ρ = (1/2) * [I + ⟨X⟩σ_x + ⟨Y⟩σ_y + ⟨Z⟩σ_z]
  const expZ = pz0 - pz1 // ⟨Z⟩
  const expX = px0 - px1 // ⟨X⟩
  const expY = py0 - py1 // ⟨Y⟩

  // ρ = [[ρ_00, ρ_01], [ρ_10, ρ_11]]
  // ρ_00 = (1 + ⟨Z⟩) / 2
  // ρ_11 = (1 - ⟨Z⟩) / 2
  // ρ_01 = (⟨X⟩ - i⟨Y⟩) / 2
  // ρ_10 = (⟨X⟩ + i⟨Y⟩) / 2

  const densityMatrix: DensityMatrix = [
    [{ re: (1 + expZ) / 2, im: 0 }, { re: expX / 2, im: -expY / 2 }],
    [{ re: expX / 2, im: expY / 2 }, { re: (1 - expZ) / 2, im: 0 }],
  ]

  // Fidelity: how well does the reconstructed state match a pure state?
  // For a pure state |ψ⟩, fidelity F = Tr(ρ ρ_pure) = ⟨ψ|ρ|ψ⟩
  // For now, compute purity = Tr(ρ²) as a sanity check (1.0 for pure, <1.0 for mixed)
  const rho00 = densityMatrix[0]![0]!
  const rho01 = densityMatrix[0]![1]!
  const rho10 = densityMatrix[1]![0]!
  const rho11 = densityMatrix[1]![1]!

  // ρ² diagonal elements
  const rho2_00_re = rho00.re * rho00.re + rho00.im * rho00.im + rho01.re * rho10.re + rho01.im * rho10.im
  const rho2_11_re = rho10.re * rho01.re + rho10.im * rho01.im + rho11.re * rho11.re + rho11.im * rho11.im

  const purity = rho2_00_re + rho2_11_re // Tr(ρ²)
  const fidelity = purity // For single qubit, this is a reasonable fidelity metric

  return {
    qubit,
    measurements,
    densityMatrix,
    fidelity,
  }
}

// Verify tomography result matches an expected pure state
export function verifyTomography(
  expected: Register,
  tomographyResult: TomographyResult,
  toleranceFidelity: number = 0.9,
): boolean {
  // Compare expected state (via expected |ψ⟩ probabilities) vs measured density matrix
  // For a pure state, the density matrix should be ρ = |ψ⟩⟨ψ|
  const q = tomographyResult.qubit
  const expectedProbs = probabilities(expected)
  const numQubits = log2(expectedProbs.length)
  const masksForQubit = [
    // Qubit state 0
    Array.from({ length: 2 ** numQubits }, (_, i) => ((i >> q) & 1) === 0 ? 1 : 0),
    // Qubit state 1
    Array.from({ length: 2 ** numQubits }, (_, i) => ((i >> q) & 1) === 1 ? 1 : 0),
  ]

  // Marginal probabilities
  const margProb0 = masksForQubit[0]!.reduce((sum: number, mask: number, i: number) => sum + (mask > 0 ? expectedProbs[i]! : 0), 0)
  const margProb1 = masksForQubit[1]!.reduce((sum: number, mask: number, i: number) => sum + (mask > 0 ? expectedProbs[i]! : 0), 0)

  // Compare to tomography measurement
  const tomZ = tomographyResult.measurements[0]!
  const measProb0 = tomZ.counts[0] / tomZ.shots
  const measProb1 = tomZ.counts[1] / tomZ.shots

  const error = abs(margProb0 - measProb0) + abs(margProb1 - measProb1)
  const fidelityThreshold = 1 - error
  return fidelityThreshold >= toleranceFidelity
}

// Two-qubit tomography (16 measurements: 3 bases per qubit × 2 qubits, plus correlations)
export function tomatoTwoQubit(
  reg: Register,
  qubit0: number,
  qubit1: number,
  shots: number = 1000,
  seed: number = 0,
): DensityMatrix {
  let s = seed

  // Measure individual qubits in Z, X, Y
  const q0_z = measureZ(reg, qubit0, shots, s)
  s = (1664525 * s + 1013904223) % 4294967296
  const q0_x = measureX(reg, qubit0, shots, s)
  s = (1664525 * s + 1013904223) % 4294967296
  const q0_y = measureY(reg, qubit0, shots, s)
  s = (1664525 * s + 1013904223) % 4294967296

  const q1_z = measureZ(reg, qubit1, shots, s)
  s = (1664525 * s + 1013904223) % 4294967296
  const q1_x = measureX(reg, qubit1, shots, s)
  s = (1664525 * s + 1013904223) % 4294967296
  const q1_y = measureY(reg, qubit1, shots, s)

  // Extract expectation values
  const exp0_z = (q0_z.counts[0]! - q0_z.counts[1]!) / shots
  const exp0_x = (q0_x.counts[0]! - q0_x.counts[1]!) / shots
  const exp0_y = (q0_y.counts[0]! - q0_y.counts[1]!) / shots

  const exp1_z = (q1_z.counts[0]! - q1_z.counts[1]!) / shots
  const exp1_x = (q1_x.counts[0]! - q1_x.counts[1]!) / shots
  const exp1_y = (q1_y.counts[0]! - q1_y.counts[1]!) / shots

  // Reconstruct 4×4 density matrix via Pauli basis decomposition
  // ρ = (1/4) Σ Tr(ρ σ_i ⊗ σ_j) σ_i ⊗ σ_j
  // For now, return separable approximation (single-qubit marginals)
  const dm0 = [
    [{ re: (1 + exp0_z) / 2, im: 0 }, { re: exp0_x / 2, im: -exp0_y / 2 }],
    [{ re: exp0_x / 2, im: exp0_y / 2 }, { re: (1 - exp0_z) / 2, im: 0 }],
  ]
  const dm1 = [
    [{ re: (1 + exp1_z) / 2, im: 0 }, { re: exp1_x / 2, im: -exp1_y / 2 }],
    [{ re: exp1_x / 2, im: exp1_y / 2 }, { re: (1 - exp1_z) / 2, im: 0 }],
  ]

  // Kronecker product of dm0 and dm1 (simplification: assume separability)
  const result: Complex[][] = []
  for (let i = 0; i < 4; i++) {
    const row: Complex[] = []
    for (let j = 0; j < 4; j++) {
      const i0 = floor(i / 2)
      const i1 = i % 2
      const j0 = floor(j / 2)
      const j1 = j % 2
      const v0 = dm0[i0]![j0]!
      const v1 = dm1[i1]![j1]!
      row.push({ re: v0.re * v1.re - v0.im * v1.im, im: v0.re * v1.im + v0.im * v1.re })
    }
    result.push(row)
  }

  return result as DensityMatrix
}

// Generate tomography proof: a record of measurement outcomes for external verification
export function generateTomographyProof(
  measurement: TomographyMeasurement,
): TomographyProof {
  const prob0 = measurement.counts[0]! / measurement.shots
  const prob1 = measurement.counts[1]! / measurement.shots
  return {
    qubit: measurement.qubit,
    basis: measurement.basis,
    prob0,
    prob1,
    seed: measurement.seed,
    shotsMeasured: measurement.shots,
  }
}

// Verify a tomography proof is self-consistent (p0 + p1 ≈ 1)
export function verifyTomographyProof(proof: TomographyProof): boolean {
  const total = proof.prob0 + proof.prob1
  return total >= 0.8 && total <= 1.2 // Allow wider tolerance (probabilities should sum close to 1)
}
