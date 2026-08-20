/**
 * A real quantum-circuit simulator — genuine linear algebra over complex
 * amplitudes, not quantum vocabulary over classical operations.
 *
 * The state of n qubits is a vector of 2^n complex amplitudes. Gates are
 * unitary matrices applied by mixing amplitude pairs; entanglement is not
 * hand-coded — it emerges when a two-qubit gate correlates amplitudes that a
 * product state cannot factor. Measurement follows the Born rule (probability
 * = |amplitude|²) and collapses the state.
 *
 * Everything here is externally checkable without trusting this file: run
 * simulator.test.ts and verify H² = I, that gates preserve the norm (unitarity),
 * and that a Bell circuit produces the |00⟩+|11⟩ correlation no product state
 * can. That is the honesty standard — the properties are quantum mechanics, and
 * anyone can recompute them.
 *
 * Ambient Math.* is banned on this surface; sqrt/cos/sin come from src/0/algebra.
 */

import { sqrt, cos, sin } from '../0/algebra.ts'

// ── Complex arithmetic ──────────────────────────────────────────────────────
export interface Complex {
  readonly re: number
  readonly im: number
}
export const cx = (re: number, im = 0): Complex => ({ re, im })
export const cadd = (a: Complex, b: Complex): Complex => ({ re: a.re + b.re, im: a.im + b.im })
export const csub = (a: Complex, b: Complex): Complex => ({ re: a.re - b.re, im: a.im - b.im })
export const cmul = (a: Complex, b: Complex): Complex => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re,
})
export const cconj = (a: Complex): Complex => ({ re: a.re, im: -a.im })
/** |z|² — the Born-rule weight, real and non-negative. */
export const cabs2 = (a: Complex): number => a.re * a.re + a.im * a.im

const INV_SQRT2 = 1 / sqrt(2)

// ── State ───────────────────────────────────────────────────────────────────
/** An n-qubit register: 2^n complex amplitudes. Qubit q is bit q of the index (q=0 least significant). */
export interface Register {
  readonly n: number
  readonly amps: Complex[]
}

/** |0…0⟩ — amplitude 1 on basis state 0, zero elsewhere. */
export function zeroState(n: number): Register {
  if (!Number.isInteger(n) || n < 1) throw new Error('zeroState: n must be a positive integer')
  const amps: Complex[] = new Array(1 << n)
  for (let i = 0; i < amps.length; i += 1) amps[i] = cx(0)
  amps[0] = cx(1)
  return { n, amps }
}

// ── Single-qubit gate application ───────────────────────────────────────────
/** A single-qubit gate as a 2×2 unitary [[u00,u01],[u10,u11]]. */
export type Gate1 = readonly [Complex, Complex, Complex, Complex]

/**
 * Apply a 2×2 unitary to qubit q. For every basis pair (i with bit q = 0, its
 * partner j = i|bit q) the new amplitudes are the matrix times (aᵢ, aⱼ). This
 * is the exact action of U ⊗ I on the state vector — no matrix is materialised.
 */
export function applyGate1(reg: Register, q: number, [u00, u01, u10, u11]: Gate1): Register {
  if (q < 0 || q >= reg.n) throw new Error(`applyGate1: qubit ${q} out of range 0..${reg.n - 1}`)
  const bit = 1 << q
  const out = reg.amps.slice()
  for (let i = 0; i < out.length; i += 1) {
    if ((i & bit) !== 0) continue
    const j = i | bit
    const a = reg.amps[i]!
    const b = reg.amps[j]!
    out[i] = cadd(cmul(u00, a), cmul(u01, b))
    out[j] = cadd(cmul(u10, a), cmul(u11, b))
  }
  return { n: reg.n, amps: out }
}

/**
 * Apply a controlled single-qubit gate: U acts on `target` only in the
 * amplitude subspace where `control` is 1. This is where entanglement is
 * created — the two qubits' amplitudes become correlated.
 */
export function applyControlled(reg: Register, control: number, target: number, [u00, u01, u10, u11]: Gate1): Register {
  if (control === target) throw new Error('applyControlled: control and target must differ')
  const cbit = 1 << control
  const tbit = 1 << target
  const out = reg.amps.slice()
  for (let i = 0; i < out.length; i += 1) {
    if ((i & cbit) === 0 || (i & tbit) !== 0) continue
    const j = i | tbit
    const a = reg.amps[i]!
    const b = reg.amps[j]!
    out[i] = cadd(cmul(u00, a), cmul(u01, b))
    out[j] = cadd(cmul(u10, a), cmul(u11, b))
  }
  return { n: reg.n, amps: out }
}

// ── Standard gates (unitary) ────────────────────────────────────────────────
export const H: Gate1 = [cx(INV_SQRT2), cx(INV_SQRT2), cx(INV_SQRT2), cx(-INV_SQRT2)]
export const X: Gate1 = [cx(0), cx(1), cx(1), cx(0)]
export const Y: Gate1 = [cx(0), cx(0, -1), cx(0, 1), cx(0)]
export const Z: Gate1 = [cx(1), cx(0), cx(0), cx(-1)]
export const S: Gate1 = [cx(1), cx(0), cx(0), cx(0, 1)]
export const T: Gate1 = [cx(1), cx(0), cx(0), cx(INV_SQRT2, INV_SQRT2)]
export const I1: Gate1 = [cx(1), cx(0), cx(0), cx(1)]

/** Phase gate — diag(1, e^{iθ}). */
export const phase = (theta: number): Gate1 => [cx(1), cx(0), cx(0), cx(cos(theta), sin(theta))]
/** Rotation about Z — diag(e^{-iθ/2}, e^{iθ/2}). */
export const rz = (theta: number): Gate1 => [
  cx(cos(theta / 2), -sin(theta / 2)),
  cx(0),
  cx(0),
  cx(cos(theta / 2), sin(theta / 2)),
]
/** Rotation about Y — real rotation matrix. */
export const ry = (theta: number): Gate1 => [
  cx(cos(theta / 2)),
  cx(-sin(theta / 2)),
  cx(sin(theta / 2)),
  cx(cos(theta / 2)),
]
/** Rotation about X — e^{-iθX/2}, the QAOA mixer generator. */
export const rx = (theta: number): Gate1 => [
  cx(cos(theta / 2)),
  cx(0, -sin(theta / 2)),
  cx(0, -sin(theta / 2)),
  cx(cos(theta / 2)),
]

// ── Composite gates ─────────────────────────────────────────────────────────
export const cnot = (reg: Register, control: number, target: number): Register =>
  applyControlled(reg, control, target, X)
export const cz = (reg: Register, control: number, target: number): Register =>
  applyControlled(reg, control, target, Z)

// ── Measurement (Born rule) ─────────────────────────────────────────────────
/** Probability of each computational basis state — |amplitude|². Sums to 1 for a valid state. */
export function probabilities(reg: Register): number[] {
  return reg.amps.map(cabs2)
}

/** The state norm √Σ|aᵢ|². A unitary evolution keeps this at 1. */
export function norm(reg: Register): number {
  let sum = 0
  for (const a of reg.amps) sum += cabs2(a)
  return sqrt(sum)
}

export function isNormalized(reg: Register, eps = 1e-9): boolean {
  const d = norm(reg) - 1
  return (d < 0 ? -d : d) < eps
}

/**
 * Measure the whole register in the computational basis. `unit` ∈ [0,1) is the
 * externally supplied randomness (this surface bans ambient RNG — the caller
 * owns the draw, which also makes measurement reproducible). Returns the
 * outcome basis index and the collapsed state (amplitude 1 on the outcome).
 */
export function measure(reg: Register, unit: number): { outcome: number; collapsed: Register } {
  const probs = probabilities(reg)
  let acc = 0
  let outcome = probs.length - 1
  for (let i = 0; i < probs.length; i += 1) {
    acc += probs[i]!
    if (unit < acc) {
      outcome = i
      break
    }
  }
  const amps = reg.amps.map(() => cx(0))
  amps[outcome] = cx(1)
  return { outcome, collapsed: { n: reg.n, amps } }
}

/**
 * Measure a single qubit q. Returns the outcome bit and the collapsed,
 * renormalised state. On an entangled state this is where the correlation
 * bites — measuring one qubit of a Bell pair fixes the other.
 */
/**
 * The modulus of the LCG these modules use for deterministic sampling.
 */
export const RNG_MODULUS = 4294967296

/**
 * Map an LCG state onto the unit interval `measureQubit` expects.
 *
 * `measureQubit` takes a UNIT in [0, 1), not a seed. Four call sites passed the
 * raw LCG state instead, which is an integer up to 2^32. Since the outcome test
 * is `unit < 1 - pOne`, any state of 1 or more forced the outcome to 1 — so
 * `measureZ` on |0> returned 999 ones in 1000 shots, and repetition-code
 * syndrome extraction reported a clean codeword as an error.
 */
export function unitOf(seed: number): number {
  const m = seed % RNG_MODULUS
  return (m < 0 ? m + RNG_MODULUS : m) / RNG_MODULUS
}

export function measureQubit(reg: Register, q: number, unit: number): { bit: 0 | 1; collapsed: Register } {
  const bit = 1 << q
  let pOne = 0
  for (let i = 0; i < reg.amps.length; i += 1) if ((i & bit) !== 0) pOne += cabs2(reg.amps[i]!)
  // Cumulative from |0⟩, matching measure(): small unit → 0, large unit → 1.
  const outcome: 0 | 1 = unit < 1 - pOne ? 0 : 1
  const keepProb = outcome === 1 ? pOne : 1 - pOne
  const scale = keepProb > 0 ? 1 / sqrt(keepProb) : 0
  const amps = reg.amps.map((a, i) => {
    const isOne = (i & bit) !== 0
    return (outcome === 1) === isOne ? cx(a.re * scale, a.im * scale) : cx(0)
  })
  return { bit: outcome, collapsed: { n: reg.n, amps } }
}
