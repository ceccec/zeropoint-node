/**
 * Quantum algorithms and measurement statistics over the statevector core.
 *
 *   - qft / iqft: the Quantum Fourier Transform and its exact inverse.
 *   - grover: amplitude amplification — finds a marked basis state in ~√N steps.
 *   - sample: Born-rule measurement statistics over many shots (seeded, so
 *     reproducible and free of ambient RNG).
 *
 * These are the parts that make the core a quantum *computer* rather than a bag
 * of gates. Each is checked externally in scripts/quantum-sim.mjs by facts a
 * reader can recompute (iqft∘qft = I; Grover’s success probability; sampled
 * frequencies converge to |amplitude|²). Decimals are integer fractions; the
 * transcendental angles come from src/0/algebra, not ambient Math.*.
 */

import { PI, sqrt, round } from '../0/algebra.ts'
import {
  type Register,
  type Complex,
  zeroState,
  applyGate1,
  applyControlled,
  measure,
  measureQubit,
  probabilities,
  cabs2,
  cx,
  H,
  X,
  Z,
  cnot,
  phase,
} from './simulator.ts'
import { swap } from './gates.ts'

/** Number of set bits in a non-negative integer. */
function popcount(x: number): number {
  let n = x
  let c = 0
  while (n !== 0) {
    c += n & 1
    n >>>= 1
  }
  return c
}

/** Uniform superposition H^⊗n |0…0⟩ over n qubits. */
function uniform(n: number): Register {
  let s = zeroState(n)
  for (let q = 0; q < n; q += 1) s = applyGate1(s, q, H)
  return s
}

/** The identity qubit list [0,1,…,n−1] — the default QFT register. */
const allQubits = (n: number): number[] => Array.from({ length: n }, (_, i) => i)

/**
 * Quantum Fourier Transform over an ordered subset of qubits (default: all),
 * with the standard final bit-reversal. Acting on a subset lets phase
 * estimation transform only its counting register.
 */
export function qft(reg: Register, qubits: readonly number[] = allQubits(reg.n)): Register {
  const m = qubits.length
  let s = reg
  for (let j = m - 1; j >= 0; j -= 1) {
    s = applyGate1(s, qubits[j]!, H)
    for (let k = 1; k <= j; k += 1) {
      s = applyControlled(s, qubits[j - k]!, qubits[j]!, phase(PI / (1 << k)))
    }
  }
  for (let i = 0; i < m >> 1; i += 1) s = swap(s, qubits[i]!, qubits[m - 1 - i]!)
  return s
}

/** Inverse QFT — the exact adjoint of qft over the same qubit subset. */
export function iqft(reg: Register, qubits: readonly number[] = allQubits(reg.n)): Register {
  const m = qubits.length
  let s = reg
  for (let i = 0; i < m >> 1; i += 1) s = swap(s, qubits[i]!, qubits[m - 1 - i]!)
  for (let j = 0; j < m; j += 1) {
    for (let k = j; k >= 1; k -= 1) {
      s = applyControlled(s, qubits[j - k]!, qubits[j]!, phase(-PI / (1 << k)))
    }
    s = applyGate1(s, qubits[j]!, H)
  }
  return s
}

/** Optimal Grover iteration count for a single marked item in N = 2^n states. */
export const groverIterations = (size: number): number => round((PI / 4) * sqrt(size))

/**
 * Grover search: prepare the uniform superposition, then repeat
 * (phase-flip the marked state · invert about the mean). After ~(π/4)√N
 * iterations the marked amplitude dominates. Oracle and diffusion act directly
 * on the statevector — real amplitude amplification.
 */
export function grover(n: number, target: number, iterations?: number): Register {
  const size = 1 << n
  if (target < 0 || target >= size) throw new Error('grover: target out of range')
  let s = zeroState(n)
  for (let q = 0; q < n; q += 1) s = applyGate1(s, q, H)
  const iters = iterations ?? groverIterations(size)
  for (let it = 0; it < iters; it += 1) {
    // Oracle: phase-flip the marked basis state.
    s = { n, amps: s.amps.map((a, i) => (i === target ? cx(-a.re, -a.im) : a)) }
    // Diffusion: reflect every amplitude about the mean (inversion about average).
    let mr = 0
    let mi = 0
    for (const a of s.amps) {
      mr += a.re
      mi += a.im
    }
    mr /= size
    mi /= size
    s = { n, amps: s.amps.map((a) => cx(2 * mr - a.re, 2 * mi - a.im)) }
  }
  return s
}

/**
 * Generalised Grover search: amplify every basis state satisfying `isMarked`
 * (there may be several), using the optimal ⌊(π/4)√(N/M)⌋ iterations for M
 * solutions. Returns the amplified state, or null when there are no solutions
 * or all states match. The single-target `grover` is the M=1 special case.
 */
export function groverSearch(n: number, isMarked: (x: number) => boolean, markedCount?: number): Register | null {
  const size = 1 << n
  let m = markedCount ?? 0
  if (m === 0) for (let x = 0; x < size; x += 1) if (isMarked(x)) m += 1
  if (m === 0 || m >= size) return null
  let s = zeroState(n)
  for (let q = 0; q < n; q += 1) s = applyGate1(s, q, H)
  const iters = round((PI / 4) * sqrt(size / m))
  for (let it = 0; it < iters; it += 1) {
    s = { n, amps: s.amps.map((a, i) => (isMarked(i) ? cx(-a.re, -a.im) : a)) }
    let mr = 0
    let mi = 0
    for (const a of s.amps) {
      mr += a.re
      mi += a.im
    }
    mr /= size
    mi /= size
    s = { n, amps: s.amps.map((a) => cx(2 * mr - a.re, 2 * mi - a.im)) }
  }
  return s
}

/**
 * Measurement statistics: run `shots` Born-rule measurements and return a
 * histogram of outcome counts. Randomness is a deterministic LCG seeded by
 * `seed`, so results are reproducible and this surface stays free of ambient
 * RNG. With enough shots the counts converge to size·|amplitudeᵢ|².
 */
/**
 * Bernstein–Vazirani: recover a hidden n-bit string s from the oracle
 * f(x) = s·x (mod 2), in a SINGLE query. Sandwich a phase oracle
 * (|x⟩ → (−1)^{s·x}|x⟩) between two layers of Hadamards; the state collapses
 * onto |s⟩ deterministically. Returns the recovered integer (= hidden).
 */
export function bernsteinVazirani(n: number, hidden: number): number {
  let s = uniform(n)
  s = { n, amps: s.amps.map((a, i) => (popcount(i & hidden) & 1 ? cx(-a.re, -a.im) : a)) }
  for (let q = 0; q < n; q += 1) s = applyGate1(s, q, H)
  const p = probabilities(s)
  let arg = 0
  for (let i = 1; i < p.length; i += 1) if (p[i]! > p[arg]!) arg = i
  return arg
}

/**
 * Deutsch–Jozsa: decide whether f:{0,1}ⁿ→{0,1} (promised constant or balanced)
 * is constant or balanced, in a SINGLE query. After the H·oracle·H sandwich the
 * all-zeros outcome has probability 1 iff f is constant, 0 iff balanced.
 */
export function deutschJozsa(n: number, f: (x: number) => 0 | 1): 'constant' | 'balanced' {
  let s = uniform(n)
  s = { n, amps: s.amps.map((a, i) => (f(i) ? cx(-a.re, -a.im) : a)) }
  for (let q = 0; q < n; q += 1) s = applyGate1(s, q, H)
  return cabs2(s.amps[0]!) > 1 / 2 ? 'constant' : 'balanced'
}

/**
 * Quantum teleportation: move an arbitrary one-qubit state α|0⟩+β|1⟩ from
 * qubit 0 to qubit 2 using a shared Bell pair and two classical bits. The
 * mid-circuit measurements are driven by u0,u1 ∈ [0,1); Bob's X/Z corrections
 * are conditioned on the outcomes. Returns qubit 2's recovered amplitudes —
 * equal to (α,β) up to numerical error, for any measurement branch.
 */
export function teleport(alpha: Complex, beta: Complex, u0 = 0, u1 = 0): { a0: Complex; a1: Complex } {
  // amps index bits: q0 = bit0, q1 = bit1, q2 = bit2. Load |ψ⟩ on q0, |00⟩ on q1q2.
  const amps = new Array<Complex>(8).fill(cx(0))
  amps[0] = alpha
  amps[1] = beta
  let s: Register = { n: 3, amps }
  s = applyGate1(s, 1, H) // Bell pair on q1,q2
  s = cnot(s, 1, 2)
  s = cnot(s, 0, 1) // Alice entangles her qubit
  s = applyGate1(s, 0, H)
  const m0 = measureQubit(s, 0, u0)
  s = m0.collapsed
  const m1 = measureQubit(s, 1, u1)
  s = m1.collapsed
  if (m1.bit === 1) s = applyGate1(s, 2, X) // Bob's corrections
  if (m0.bit === 1) s = applyGate1(s, 2, Z)
  // q2 amplitudes: support sits at q0=m0, q1=m1; read q2 = 0 vs 1.
  const base = (m0.bit << 0) | (m1.bit << 1)
  return { a0: s.amps[base]!, a1: s.amps[base | 4]! }
}

/**
 * Superdense coding: with a shared Bell pair, Alice sends two classical bits
 * (b0,b1) to Bob by acting on her single qubit with I/X/Z/ZX and transmitting
 * it. Bob disentangles and reads both bits deterministically. Returns the
 * decoded [b0, b1].
 */
export function superdenseCoding(b0: 0 | 1, b1: 0 | 1): [number, number] {
  let s = cnot(applyGate1(zeroState(2), 0, H), 0, 1) // Bell pair
  if (b1 === 1) s = applyGate1(s, 0, X) // Alice encodes on her qubit (q0)
  if (b0 === 1) s = applyGate1(s, 0, Z)
  s = cnot(s, 0, 1) // Bob decodes
  s = applyGate1(s, 0, H)
  const p = probabilities(s)
  let arg = 0
  for (let i = 1; i < p.length; i += 1) if (p[i]! > p[arg]!) arg = i
  return [arg & 1, (arg >> 1) & 1]
}

/**
 * Quantum phase estimation: estimate φ where U = phase(2πφ) has eigenvalue
 * e^{2πiφ} on |1⟩. Uses t counting qubits (0..t−1) and one eigenstate qubit
 * (index t) prepared in |1⟩. Returns the counting-register integer, which
 * equals φ·2ᵗ exactly when φ is a dyadic k/2ᵗ.
 */
export function phaseEstimation(t: number, phi: number): number {
  let s = zeroState(t + 1)
  s = applyGate1(s, t, X) // eigenstate |1⟩
  for (let q = 0; q < t; q += 1) s = applyGate1(s, q, H)
  const twoPi = 2 * PI
  for (let j = 0; j < t; j += 1) {
    // controlled-U^{2^j} = controlled-phase(2π·φ·2^j), control j → eigenstate t
    s = applyControlled(s, j, t, phase(twoPi * phi * (1 << j)))
  }
  s = iqft(s, allQubits(t)) // inverse QFT on the counting register only
  const p = probabilities(s)
  let arg = 0
  for (let i = 1; i < p.length; i += 1) if (p[i]! > p[arg]!) arg = i
  return arg & ((1 << t) - 1) // drop the eigenstate bit
}

/**
 * Three-qubit bit-flip error-correcting code. Encodes α|0⟩+β|1⟩ into
 * α|000⟩+β|111⟩, optionally injects an X error on one data qubit, extracts the
 * syndrome into two ancillas (parities that do NOT reveal α,β), corrects, and
 * decodes. Returns qubit 0's amplitudes — equal to (α,β) for any single-qubit
 * error, which is the whole point: a bit flip is detected and undone.
 */
export function bitFlipCode(alpha: Complex, beta: Complex, errorQubit = -1): { a0: Complex; a1: Complex } {
  const amps = new Array<Complex>(32).fill(cx(0))
  amps[0] = alpha
  amps[1] = beta // |ψ⟩ on q0; q1..q4 = |0⟩
  let s: Register = { n: 5, amps }
  s = cnot(s, 0, 1) // encode: α|000⟩ + β|111⟩ on q0,q1,q2
  s = cnot(s, 0, 2)
  if (errorQubit >= 0) s = applyGate1(s, errorQubit, X) // inject a bit flip
  s = cnot(s, 0, 3) // syndrome q3 = q0 ⊕ q1
  s = cnot(s, 1, 3)
  s = cnot(s, 0, 4) // syndrome q4 = q0 ⊕ q2
  s = cnot(s, 2, 4)
  const m3 = measureQubit(s, 3, 0)
  s = m3.collapsed
  const m4 = measureQubit(s, 4, 0)
  s = m4.collapsed
  const syndrome = (m3.bit << 1) | m4.bit
  const correct = syndrome === 3 ? 0 : syndrome === 2 ? 1 : syndrome === 1 ? 2 : -1
  if (correct >= 0) s = applyGate1(s, correct, X)
  s = cnot(s, 0, 2) // decode
  s = cnot(s, 0, 1)
  const base = (m3.bit << 3) | (m4.bit << 4)
  return { a0: s.amps[base]!, a1: s.amps[base | 1]! }
}

/** Nonzero null-space vector of the given GF(2) row vectors (n-bit), or 0 if none. */
function gf2Nullspace(n: number, rows: readonly number[]): number {
  const R = rows.slice()
  const pivots: number[] = []
  let r = 0
  for (let col = 0; col < n && r < R.length; col += 1) {
    let sel = -1
    for (let i = r; i < R.length; i += 1)
      if ((R[i]! >> col) & 1) {
        sel = i
        break
      }
    if (sel < 0) continue
    const tmp = R[r]!
    R[r] = R[sel]!
    R[sel] = tmp
    for (let i = 0; i < R.length; i += 1) if (i !== r && (R[i]! >> col) & 1) R[i]! ^= R[r]!
    pivots.push(col)
    r += 1
  }
  const isPivot = new Set(pivots)
  let free = -1
  for (let c = 0; c < n; c += 1)
    if (!isPivot.has(c)) {
      free = c
      break
    }
  if (free < 0) return 0
  let s = 1 << free
  for (let i = 0; i < pivots.length; i += 1) {
    const pc = pivots[i]!
    let bit = 0
    for (let c = 0; c < n; c += 1) if (c !== pc && (R[i]! >> c) & 1 && (s >> c) & 1) bit ^= 1
    if (bit) s |= 1 << pc
  }
  return s
}

/**
 * Simon's algorithm: recover the hidden mask s (f(x) = f(x⊕s), 2-to-1) with an
 * exponential speedup over classical. Each run of H·oracle·H yields a y with
 * y·s = 0 (mod 2); on the statevector the whole support {y : y·s = 0} appears
 * at once, so one pass plus a GF(2) null-space solve recovers s exactly.
 */
export function simon(n: number, hidden: number): number {
  const size = 1 << n
  const total = 2 * n
  const f = (x: number): number => {
    const y = x ^ hidden
    return x < y ? x : y
  }
  let s = zeroState(total)
  for (let q = 0; q < n; q += 1) s = applyGate1(s, q, H)
  const out = new Array<Complex>(1 << total).fill(cx(0)) // oracle: |x⟩|y⟩ → |x⟩|y⊕f(x)⟩
  for (let idx = 0; idx < out.length; idx += 1) {
    const a = s.amps[idx]!
    if (a.re === 0 && a.im === 0) continue
    const x = idx & (size - 1)
    const y = (idx >> n) & (size - 1)
    out[x | ((y ^ f(x)) << n)] = a
  }
  s = { n: total, amps: out }
  for (let q = 0; q < n; q += 1) s = applyGate1(s, q, H)
  const support: number[] = []
  for (let y = 1; y < size; y += 1) {
    let p = 0
    for (let o = 0; o < size; o += 1) p += cabs2(s.amps[y | (o << n)]!)
    if (p > 1e-9) support.push(y)
  }
  return gf2Nullspace(n, support)
}

// ── Classical number theory helpers (integer-only, no ambient Math.*) ────────
function gcdInt(a: number, b: number): number {
  let x = a < 0 ? -a : a
  let y = b < 0 ? -b : b
  while (y !== 0) {
    const t = x % y
    x = y
    y = t
  }
  return x
}
function modpow(base: number, exp: number, mod: number): number {
  let result = 1
  let b = base % mod
  let e = exp
  while (e > 0) {
    if (e & 1) result = (result * b) % mod
    b = (b * b) % mod
    e >>>= 1
  }
  return result
}
function bitsFor(n: number): number {
  let m = 0
  while (1 << m < n) m += 1
  return m
}
/** Best continued-fraction denominator ≤ maxDen approximating c/q — the period candidate. */
function periodFromCounting(c: number, q: number, maxDen: number): number {
  if (c === 0) return 0
  let a = c
  let b = q
  let p0 = 0
  let p1 = 1
  let q0 = 1
  let q1 = 0
  while (b !== 0) {
    const t = (a - (a % b)) / b
    const p2 = t * p1 + p0
    const den = t * q1 + q0
    if (den > maxDen) break
    p0 = p1
    p1 = p2
    q0 = q1
    q1 = den
    const r = a % b
    a = b
    b = r
  }
  return q1
}

/**
 * Controlled modular multiplication: work register w ↦ (mult·w mod N) when the
 * control qubit is 1, identity otherwise. mult must be coprime to N so the map
 * is a bijection on {0..N−1} (out-of-range values are fixed). This is Shor's
 * arithmetic oracle, applied directly as a statevector permutation.
 */
function controlledModMult(reg: Register, control: number, mult: number, N: number, t: number, m: number): Register {
  const cbit = 1 << control
  const workMask = ((1 << m) - 1) << t
  const out = new Array<Complex>(reg.amps.length).fill(cx(0))
  for (let idx = 0; idx < reg.amps.length; idx += 1) {
    const a = reg.amps[idx]!
    if ((idx & cbit) === 0) {
      out[idx] = a
      continue
    }
    const w = (idx >> t) & ((1 << m) - 1)
    if (w >= N) {
      out[idx] = a
      continue
    }
    out[(idx & ~workMask) | (((mult * w) % N) << t)] = a
  }
  return { n: reg.n, amps: out }
}

/**
 * Shor's algorithm: factor N by finding the period of x ↦ aˣ mod N with quantum
 * phase estimation over the modular-multiplication unitary, then continued
 * fractions + gcd. Returns a non-trivial factor pair, or null if this base
 * yields an odd period or the trivial square root (classically: retry with
 * another a). This is the real thing — QPE, inverse QFT, controlled modular
 * arithmetic — reduced to the small statevector a simulator can hold (e.g. 15).
 */
export function shor(N: number, a: number): [number, number] | null {
  // N < 2 has no factorisation to find, and N === 0 made the lucky-factor
  // branch return [0, 0/0] — a NaN inside a [number, number].
  if (!Number.isInteger(N) || N < 2) {
    throw new RangeError(`shor: N must be an integer of at least 2, got ${N}`)
  }
  const g = gcdInt(a, N)
  if (g !== 1) return [g, N / g] // lucky common factor
  const m = bitsFor(N)
  const t = 2 * m // counting qubits
  const q = 1 << t
  const amps = new Array<Complex>(1 << (t + m)).fill(cx(0))
  amps[1 << t] = cx(1) // work register = |1⟩, counting = |0⟩
  let s: Register = { n: t + m, amps }
  for (let j = 0; j < t; j += 1) s = applyGate1(s, j, H)
  for (let j = 0; j < t; j += 1) s = controlledModMult(s, j, modpow(a, 1 << j, N), N, t, m)
  s = iqft(s, allQubits(t))
  const countProb = new Array<number>(q).fill(0)
  for (let idx = 0; idx < s.amps.length; idx += 1) countProb[idx & (q - 1)]! += cabs2(s.amps[idx]!)
  let r = 0
  for (let c = 1; c < q; c += 1) {
    if (countProb[c]! <= 1e-6) continue
    const cand = periodFromCounting(c, q, N)
    if (cand > 0 && modpow(a, cand, N) === 1 && (r === 0 || cand < r)) r = cand
  }
  if (r === 0 || r & 1) return null
  const x = modpow(a, r >> 1, N)
  if (x === N - 1) return null
  const f1 = gcdInt(x - 1, N)
  const f2 = gcdInt(x + 1, N)
  if (f1 > 1 && f1 < N) return [f1, N / f1]
  if (f2 > 1 && f2 < N) return [f2, N / f2]
  return null
}

/**
 * Deutsch problem: given f:{0,1}→{0,1} (promised constant or balanced),
 * determine its type in a SINGLE query. The balanced case (f(0)≠f(1)) flips
 * the phase; the constant case (f(0)=f(1)) doesn't. A single measurement of
 * qubit 0 after H·oracle·H reveals the answer.
 */
export function deutsch(f0: 0 | 1, f1: 0 | 1): 'constant' | 'balanced' {
  if (f0 === f1) return 'constant'
  let s = applyGate1(zeroState(1), 0, H)
  s = { n: 1, amps: s.amps.map((a, i) => (f0 === (i & 1) ? a : cx(-a.re, -a.im))) }
  s = applyGate1(s, 0, H)
  return cabs2(s.amps[0]!) > 1 / 2 ? 'constant' : 'balanced'
}

export function sample(reg: Register, shots: number, seed = 1): number[] {
  const A = 1664525
  const C = 1013904223
  const M = 4294967296 // 2^32
  let state = (seed >>> 0) || 1
  const counts = new Array<number>(reg.amps.length).fill(0)
  for (let i = 0; i < shots; i += 1) {
    state = (A * state + C) % M
    const { outcome } = measure(reg, state / M)
    counts[outcome] += 1
  }
  return counts
}
