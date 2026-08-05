/**
 * A fluent circuit builder over the statevector core — record a sequence of
 * gates, then run it on an initial state (default |0…0⟩). Sugar, not new
 * physics: `circuit(2).h(0).cnot(0, 1).run()` is the Bell state.
 */

import {
  type Register,
  type Gate1,
  zeroState,
  applyGate1,
  probabilities,
  measure,
  cnot,
  cz,
  H,
  X,
  Y,
  Z,
  S,
  T,
  rz as rzGate,
  ry as ryGate,
  phase as phaseGate,
} from './simulator.ts'
import { swap as swapOp, toffoli as toffoliOp, cphase as cphaseOp } from './gates.ts'

export interface Circuit {
  h(q: number): Circuit
  x(q: number): Circuit
  y(q: number): Circuit
  z(q: number): Circuit
  s(q: number): Circuit
  t(q: number): Circuit
  rz(q: number, theta: number): Circuit
  ry(q: number, theta: number): Circuit
  phase(q: number, theta: number): Circuit
  gate(q: number, g: Gate1): Circuit
  cnot(control: number, target: number): Circuit
  cz(control: number, target: number): Circuit
  cphase(control: number, target: number, theta: number): Circuit
  swap(a: number, b: number): Circuit
  toffoli(c1: number, c2: number, target: number): Circuit
  run(initial?: Register): Register
  probabilities(initial?: Register): number[]
  measure(unit: number, initial?: Register): { outcome: number; collapsed: Register }
}

export function circuit(n: number): Circuit {
  const ops: ((r: Register) => Register)[] = []
  const push = (f: (r: Register) => Register): Circuit => {
    ops.push(f)
    return api
  }
  const api: Circuit = {
    h: (q) => push((r) => applyGate1(r, q, H)),
    x: (q) => push((r) => applyGate1(r, q, X)),
    y: (q) => push((r) => applyGate1(r, q, Y)),
    z: (q) => push((r) => applyGate1(r, q, Z)),
    s: (q) => push((r) => applyGate1(r, q, S)),
    t: (q) => push((r) => applyGate1(r, q, T)),
    rz: (q, theta) => push((r) => applyGate1(r, q, rzGate(theta))),
    ry: (q, theta) => push((r) => applyGate1(r, q, ryGate(theta))),
    phase: (q, theta) => push((r) => applyGate1(r, q, phaseGate(theta))),
    gate: (q, g) => push((r) => applyGate1(r, q, g)),
    cnot: (control, target) => push((r) => cnot(r, control, target)),
    cz: (control, target) => push((r) => cz(r, control, target)),
    cphase: (control, target, theta) => push((r) => cphaseOp(r, control, target, theta)),
    swap: (a, b) => push((r) => swapOp(r, a, b)),
    toffoli: (c1, c2, target) => push((r) => toffoliOp(r, c1, c2, target)),
    run: (initial) => {
      let r = initial ?? zeroState(n)
      for (const op of ops) r = op(r)
      return r
    },
    probabilities: (initial) => probabilities(api.run(initial)),
    measure: (unit, initial) => measure(api.run(initial), unit),
  }
  return api
}
