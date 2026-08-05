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
  zeroState,
  applyGate1,
  applyControlled,
  measure,
  probabilities,
  cabs2,
  cx,
  H,
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

/** Quantum Fourier Transform on all n qubits (with the standard final bit-reversal). */
export function qft(reg: Register): Register {
  const n = reg.n
  let s = reg
  for (let j = n - 1; j >= 0; j -= 1) {
    s = applyGate1(s, j, H)
    for (let k = 1; k <= j; k += 1) {
      // controlled R_k = phase 2π/2^{k+1} = π/2^k, control j−k onto target j
      s = applyControlled(s, j - k, j, phase(PI / (1 << k)))
    }
  }
  for (let i = 0; i < n >> 1; i += 1) s = swap(s, i, n - 1 - i)
  return s
}

/** Inverse QFT — the exact adjoint of qft (reversed ops, negated phases). */
export function iqft(reg: Register): Register {
  const n = reg.n
  let s = reg
  for (let i = 0; i < n >> 1; i += 1) s = swap(s, i, n - 1 - i)
  for (let j = 0; j < n; j += 1) {
    for (let k = j; k >= 1; k -= 1) {
      s = applyControlled(s, j - k, j, phase(-PI / (1 << k)))
    }
    s = applyGate1(s, j, H)
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
