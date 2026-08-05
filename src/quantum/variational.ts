/**
 * Variational quantum eigensolver (VQE) — the hybrid quantum/classical method:
 * a parameterised circuit prepares a trial state, the quantum part measures the
 * energy ⟨ψ(θ)|H|ψ(θ)⟩, and a classical optimiser lowers it toward the ground
 * state. Here for a single-qubit Hamiltonian H = a·Z + b·X, whose exact ground
 * energy is −√(a²+b²); VQE recovers it from an Ry(θ) ansatz by gradient descent.
 *
 * Pauli expectations are read straight off the statevector; gradients are finite
 * differences. Decimals are integer fractions; no ambient Math.*.
 */

import { sqrt } from '../0/algebra.ts'
import {
  type Register,
  zeroState,
  applyGate1,
  ry,
  cabs2,
  cconj,
  cmul,
} from './simulator.ts'

/** Expectation ⟨Z_q⟩ = Σᵢ (−1)^{bit q of i} |amplitudeᵢ|². */
export function expectationZ(reg: Register, q: number): number {
  const bit = 1 << q
  let e = 0
  for (let i = 0; i < reg.amps.length; i += 1) e += ((i & bit) !== 0 ? -1 : 1) * cabs2(reg.amps[i]!)
  return e
}

/** Expectation ⟨X_q⟩ = Σ over pairs of 2·Re(conj(aᵢ)·a_{i⊕bit}). */
export function expectationX(reg: Register, q: number): number {
  const bit = 1 << q
  let e = 0
  for (let i = 0; i < reg.amps.length; i += 1) {
    if ((i & bit) !== 0) continue
    e += 2 * cmul(cconj(reg.amps[i]!), reg.amps[i | bit]!).re
  }
  return e
}

export interface VqeResult {
  readonly theta: number
  readonly energy: number
  readonly exact: number
}

/**
 * VQE for H = a·Z + b·X on one qubit. Ansatz |ψ(θ)⟩ = Ry(θ)|0⟩ gives
 * energy(θ) = a·cos θ + b·sin θ; gradient descent (finite-difference gradient)
 * minimises it to the exact ground energy −√(a²+b²).
 */
export function vqe1(a: number, b: number, steps = 500): VqeResult {
  const energyAt = (theta: number): number => {
    const s = applyGate1(zeroState(1), 0, ry(theta))
    return a * expectationZ(s, 0) + b * expectationX(s, 0)
  }
  const lr = 1 / 5
  const eps = 1 / 1000
  let theta = 1
  for (let i = 0; i < steps; i += 1) {
    const grad = (energyAt(theta + eps) - energyAt(theta - eps)) / (2 * eps)
    theta -= lr * grad
  }
  return { theta, energy: energyAt(theta), exact: -sqrt(a * a + b * b) }
}
