/**
 * Composite and multi-qubit gates over the statevector core (simulator.ts).
 * SWAP, multi-controlled X (Toffoli), controlled-phase, and the adjoint of any
 * single-qubit gate — enough to build QFT and Grover. Amplitude-level action,
 * no materialised matrices; Math.* is avoided (none needed here).
 */

import { type Register, type Gate1, applyControlled, phase, cconj, X } from './simulator.ts'

/** SWAP qubits a and b — exchanges their amplitudes across the whole state. */
export function swap(reg: Register, a: number, b: number): Register {
  if (a === b) return reg
  const abit = 1 << a
  const bbit = 1 << b
  const out = reg.amps.slice()
  for (let i = 0; i < out.length; i += 1) {
    const onA = (i & abit) !== 0
    const onB = (i & bbit) !== 0
    if (onA === onB) continue
    const j = (i ^ abit) ^ bbit
    if (i < j) {
      out[i] = reg.amps[j]!
      out[j] = reg.amps[i]!
    }
  }
  return { n: reg.n, amps: out }
}

/** Multi-controlled X: flip `target` on the subspace where every control is 1. */
export function mcx(reg: Register, controls: readonly number[], target: number): Register {
  const tbit = 1 << target
  let cmask = 0
  for (const c of controls) {
    if (c === target) throw new Error('mcx: control equals target')
    cmask |= 1 << c
  }
  const out = reg.amps.slice()
  for (let i = 0; i < out.length; i += 1) {
    if ((i & cmask) !== cmask || (i & tbit) !== 0) continue
    const j = i | tbit
    out[i] = reg.amps[j]!
    out[j] = reg.amps[i]!
  }
  return { n: reg.n, amps: out }
}

/** Toffoli (CCX): X on target when both controls are 1 — a classical-universal gate. */
export const toffoli = (reg: Register, c1: number, c2: number, target: number): Register =>
  mcx(reg, [c1, c2], target)

/** Controlled-phase: multiply by e^{iθ} only when control and target are both 1. */
export const cphase = (reg: Register, control: number, target: number, theta: number): Register =>
  applyControlled(reg, control, target, phase(theta))

/** Controlled-X spelled out (control, target) — an alias for the two-qubit Toffoli case. */
export const ccx = toffoli

/** Adjoint (conjugate transpose) of a single-qubit gate: U† — undoes U. */
export const adjoint = ([u00, u01, u10, u11]: Gate1): Gate1 => [cconj(u00), cconj(u10), cconj(u01), cconj(u11)]

/** Re-export X's controlled form for symmetry with the algorithms module. */
export const cxGate = X
