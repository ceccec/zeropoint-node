/**
 * Density-matrix simulation — mixed states and noise, the paradigm a pure
 * statevector cannot express. A state is an N×N matrix ρ (N = 2ⁿ); unitary
 * evolution is ρ → UρU†, and decoherence is a Kraus channel ρ → Σᵢ KᵢρKᵢ†.
 *
 * Externally checkable (scripts/quantum-sim.mjs): a pure state has purity
 * Tr(ρ²) = 1; a full bit-flip sends |0⟩ to |1⟩; a fully depolarised qubit is the
 * maximally mixed I/2 with purity 1/2; every channel preserves Tr(ρ) = 1.
 *
 * O(4ⁿ) memory and O(8ⁿ) per gate — small n only, which is the honest cost of
 * density-matrix simulation. Math.* is banned here; sqrt comes from src/0/algebra.
 */

import { sqrt } from '../0/algebra.ts'
import { type Complex, type Register, type Gate1, cx, cadd, cmul, cconj } from './simulator.ts'

type CMatrix = Complex[][]
export interface Density {
  readonly n: number
  readonly rho: CMatrix
}

function zeros(dim: number): CMatrix {
  const m: CMatrix = new Array(dim)
  for (let i = 0; i < dim; i += 1) {
    m[i] = new Array<Complex>(dim).fill(cx(0))
  }
  return m
}

function matmul(a: CMatrix, b: CMatrix): CMatrix {
  const dim = a.length
  const out = zeros(dim)
  for (let i = 0; i < dim; i += 1) {
    for (let k = 0; k < dim; k += 1) {
      const aik = a[i]![k]!
      if (aik.re === 0 && aik.im === 0) continue
      for (let j = 0; j < dim; j += 1) out[i]![j] = cadd(out[i]![j]!, cmul(aik, b[k]![j]!))
    }
  }
  return out
}

function dagger(a: CMatrix): CMatrix {
  const dim = a.length
  const out = zeros(dim)
  for (let i = 0; i < dim; i += 1) for (let j = 0; j < dim; j += 1) out[i]![j] = cconj(a[j]![i]!)
  return out
}

/** Lift a 2×2 single-qubit operator to the full 2ⁿ space, acting on qubit q. */
function lift(n: number, q: number, [u00, u01, u10, u11]: Gate1): CMatrix {
  const dim = 1 << n
  const bit = 1 << q
  const g = [
    [u00, u01],
    [u10, u11],
  ]
  const out = zeros(dim)
  for (let i = 0; i < dim; i += 1) {
    for (let j = 0; j < dim; j += 1) {
      if ((i & ~bit) !== (j & ~bit)) continue // must agree on all other qubits
      out[i]![j] = g[(i & bit) !== 0 ? 1 : 0]![(j & bit) !== 0 ? 1 : 0]!
    }
  }
  return out
}

/** Pure density matrix |ψ⟩⟨ψ| from a statevector. */
export function pure(reg: Register): Density {
  const dim = reg.amps.length
  const rho = zeros(dim)
  for (let i = 0; i < dim; i += 1) for (let j = 0; j < dim; j += 1) rho[i]![j] = cmul(reg.amps[i]!, cconj(reg.amps[j]!))
  return { n: reg.n, rho }
}

/** Apply a single-qubit unitary: ρ → UρU†. */
export function applyGate(d: Density, q: number, g: Gate1): Density {
  const u = lift(d.n, q, g)
  return { n: d.n, rho: matmul(matmul(u, d.rho), dagger(u)) }
}

/** Apply a single-qubit Kraus channel on qubit q: ρ → Σᵢ KᵢρKᵢ† (each Kᵢ a 2×2 op). */
export function applyChannel(d: Density, q: number, kraus: readonly Gate1[]): Density {
  const dim = 1 << d.n
  const out = zeros(dim)
  for (const k2 of kraus) {
    const k = lift(d.n, q, k2)
    const term = matmul(matmul(k, d.rho), dagger(k))
    for (let i = 0; i < dim; i += 1) for (let j = 0; j < dim; j += 1) out[i]![j] = cadd(out[i]![j]!, term[i]![j]!)
  }
  return { n: d.n, rho: out }
}

/** Measurement probabilities — the real diagonal of ρ. */
export function measureProbs(d: Density): number[] {
  return d.rho.map((row, i) => row[i]!.re)
}

/** Trace of ρ (should stay 1 under valid evolution). */
export function trace(d: Density): number {
  let s = 0
  for (let i = 0; i < d.rho.length; i += 1) s += d.rho[i]![i]!.re
  return s
}

/** Purity Tr(ρ²) ∈ [1/N, 1]: 1 for a pure state, 1/N for maximally mixed. */
export function purity(d: Density): number {
  const dim = d.rho.length
  let s = 0
  for (let i = 0; i < dim; i += 1) for (let k = 0; k < dim; k += 1) s += cmul(d.rho[i]![k]!, d.rho[k]![i]!).re
  return s
}

// ── Named single-qubit noise channels (Kraus operators) ─────────────────────
const scaled = (g: Gate1, s: number): Gate1 => [
  cx(g[0].re * s, g[0].im * s),
  cx(g[1].re * s, g[1].im * s),
  cx(g[2].re * s, g[2].im * s),
  cx(g[3].re * s, g[3].im * s),
]
const I2: Gate1 = [cx(1), cx(0), cx(0), cx(1)]
const Xg: Gate1 = [cx(0), cx(1), cx(1), cx(0)]
const Yg: Gate1 = [cx(0), cx(0, -1), cx(0, 1), cx(0)]
const Zg: Gate1 = [cx(1), cx(0), cx(0), cx(-1)]

/** Bit-flip channel: with probability p, apply X. */
export const bitFlip = (p: number): Gate1[] => [scaled(I2, sqrt(1 - p)), scaled(Xg, sqrt(p))]
/** Phase-flip channel: with probability p, apply Z. */
export const phaseFlip = (p: number): Gate1[] => [scaled(I2, sqrt(1 - p)), scaled(Zg, sqrt(p))]
/** Depolarising channel: with probability p, replace with a random Pauli. p=1 ⇒ maximally mixed. */
export const depolarizing = (p: number): Gate1[] => [
  scaled(I2, sqrt(1 - (3 * p) / 4)),
  scaled(Xg, sqrt(p / 4)),
  scaled(Yg, sqrt(p / 4)),
  scaled(Zg, sqrt(p / 4)),
]
/** Amplitude damping (T₁ decay): |1⟩ relaxes toward |0⟩ with probability γ. */
export const amplitudeDamping = (gamma: number): Gate1[] => [
  [cx(1), cx(0), cx(0), cx(sqrt(1 - gamma))],
  [cx(0), cx(sqrt(gamma)), cx(0), cx(0)],
]
