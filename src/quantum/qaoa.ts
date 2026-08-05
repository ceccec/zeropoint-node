/**
 * QAOA — the Quantum Approximate Optimization Algorithm — for MaxCut. A p=1
 * ansatz prepares |+⟩^n, applies a cost layer (a ZZ rotation per edge) and a
 * mixer layer (an X rotation per qubit), then a classical grid search tunes the
 * two angles to maximise the expected cut. On small graphs the optimised state
 * concentrates on an optimal cut — checked against the brute-force MaxCut.
 *
 * Integer-fraction decimals; angles from src/0/algebra via the gate factories.
 */

import { PI } from '../0/algebra.ts'
import {
  type Register,
  zeroState,
  applyGate1,
  probabilities,
  cnot,
  H,
  rx,
  rz,
} from './simulator.ts'

export type Edge = readonly [number, number]

/** Cut value of a bitstring: edges whose endpoints land on opposite sides. */
export function cutValue(bits: number, edges: readonly Edge[]): number {
  let c = 0
  for (const [i, j] of edges) if (((bits >> i) & 1) !== ((bits >> j) & 1)) c += 1
  return c
}

/** Brute-force MaxCut (classical) — the target QAOA should reach. */
export function maxCut(n: number, edges: readonly Edge[]): number {
  let best = 0
  for (let b = 0; b < 1 << n; b += 1) {
    const v = cutValue(b, edges)
    if (v > best) best = v
  }
  return best
}

/** Expected cut ⟨C⟩ of a state — Σ probability(bits)·cutValue(bits). */
export function expectedCut(reg: Register, edges: readonly Edge[]): number {
  const p = probabilities(reg)
  let e = 0
  for (let k = 0; k < p.length; k += 1) e += p[k]! * cutValue(k, edges)
  return e
}

/** e^{-iθ Z_i Z_j/2} via CNOT · Rz(θ) · CNOT — the cost-layer interaction. */
function rzz(reg: Register, i: number, j: number, theta: number): Register {
  let s = cnot(reg, i, j)
  s = applyGate1(s, j, rz(theta))
  s = cnot(s, i, j)
  return s
}

/** One QAOA layer (p=1): cost rotation γ per edge, then mixer rotation β per qubit. */
export function qaoaMaxCut(n: number, edges: readonly Edge[], gamma: number, beta: number): Register {
  let s = zeroState(n)
  for (let q = 0; q < n; q += 1) s = applyGate1(s, q, H)
  for (const [i, j] of edges) s = rzz(s, i, j, 2 * gamma)
  for (let q = 0; q < n; q += 1) s = applyGate1(s, q, rx(2 * beta))
  return s
}

export interface QaoaResult {
  readonly gamma: number
  readonly beta: number
  readonly expected: number
  readonly reg: Register
}

/** Grid-search the two QAOA angles over [0,π) to maximise the expected cut. */
export function qaoaOptimize(n: number, edges: readonly Edge[], steps = 24): QaoaResult {
  let best: QaoaResult = { gamma: 0, beta: 0, expected: -1, reg: zeroState(n) }
  for (let a = 0; a < steps; a += 1) {
    for (let b = 0; b < steps; b += 1) {
      const gamma = (PI * a) / steps
      const beta = (PI * b) / steps
      const reg = qaoaMaxCut(n, edges, gamma, beta)
      const expected = expectedCut(reg, edges)
      if (expected > best.expected) best = { gamma, beta, expected, reg }
    }
  }
  return best
}

/** The most-probable bitstring of a state — QAOA's proposed solution. */
export function mostProbable(reg: Register): number {
  const p = probabilities(reg)
  let arg = 0
  for (let i = 1; i < p.length; i += 1) if (p[i]! > p[arg]!) arg = i
  return arg
}
