/**
 * Full variational framework: parameter sweeps, gradient estimation (parameter
 * shift rule), adaptive learning rates, convergence monitoring, history tracking.
 * Quantum methods inform classical optimization: use VQE success patterns to
 * seed new ansatzes, use circuit success traces to guide gate decomposition.
 */

import { PI, sqrt, abs } from '../0/algebra.ts'
import {
  type Register,
  zeroState,
  applyGate1,
  ry,
  rz,
} from './simulator.ts'

export interface OptimizationHistory {
  readonly iteration: number
  readonly theta: number[]
  readonly energy: number
  readonly gradient: number[]
  readonly learningRate: number
  readonly timestamp: number
}

export interface VQEResult {
  readonly converged: boolean
  readonly theta: number[]
  readonly energy: number
  readonly exactGroundEnergy: number
  readonly history: readonly OptimizationHistory[]
  readonly finalError: number
}

/**
 * Parameter shift rule: estimate gradient of ⟨ψ(θ)|H|ψ(θ)⟩ by measuring at
 * θ + π/2 and θ − π/2 for each parameter. Exact for unitary rotations.
 */
function parameterShiftGradient(
  paramIndex: number,
  params: number[],
  hamiltonian: (s: Register) => number,
  ansatz: (theta: number[]) => Register,
): number {
  const shift = PI / 2
  const params_plus = params.slice()
  params_plus[paramIndex] += shift
  const e_plus = hamiltonian(ansatz(params_plus))

  const params_minus = params.slice()
  params_minus[paramIndex] -= shift
  const e_minus = hamiltonian(ansatz(params_minus))

  return (e_plus - e_minus) / 2
}

/**
 * Full VQE with parameter shift rule gradients, adaptive learning rate
 * (reduce on stall), and convergence history.
 */
export function vqeAdaptive(
  ansatz: (theta: number[]) => Register,
  hamiltonian: (s: Register) => number,
  exactGroundEnergy: number,
  initialTheta: number[],
  maxIterations: number = 200,
  convergenceTol: number = 1e-4,
): VQEResult {
  let theta = initialTheta.slice()
  let learningRate = 0.1
  const history: OptimizationHistory[] = []
  let bestEnergy = Infinity
  let staleCount = 0
  const maxStale = 5

  for (let i = 0; i < maxIterations; i++) {
    const s = ansatz(theta)
    const energy = hamiltonian(s)
    const gradient = theta.map((_, j) =>
      parameterShiftGradient(j, theta, hamiltonian, ansatz),
    )

    history.push({
      iteration: i,
      theta: theta.slice(),
      energy,
      gradient,
      learningRate,
      timestamp: 0, // No Date.now in algebra-only environment
    })

    // Adaptive learning rate: reduce if energy stalls
    if (energy < bestEnergy - convergenceTol) {
      bestEnergy = energy
      staleCount = 0
    } else {
      staleCount += 1
      if (staleCount >= maxStale) {
        learningRate /= 2
        staleCount = 0
      }
    }

    // Gradient descent
    for (let j = 0; j < theta.length; j++) {
      theta[j] -= learningRate * gradient[j]
    }

    // Check convergence
    const gradNorm = sqrt(gradient.reduce((s, g) => s + g * g, 0))
    if (gradNorm < convergenceTol) {
      break
    }
  }

  const finalState = ansatz(theta)
  const finalEnergy = hamiltonian(finalState)
  const finalError = abs(finalEnergy - exactGroundEnergy)

  return {
    converged: finalError < convergenceTol,
    theta,
    energy: finalEnergy,
    exactGroundEnergy,
    history,
    finalError,
  }
}

/**
 * Warm-start VQE: seed parameters from a successful prior run (e.g., a
 * simpler system or related problem). Accelerates convergence.
 */
export function vqeWarmStart(
  ansatz: (theta: number[]) => Register,
  hamiltonian: (s: Register) => number,
  exactGroundEnergy: number,
  warmStartTheta: number[],
  perturbationScale: number = 1 / 10,
  maxIterations: number = 100,
): VQEResult {
  // Perturb the warm-start point slightly (use a seeded LCG instead of Math.random)
  let state = 42
  const perturbed = warmStartTheta.map((t) => {
    state = (1664525 * state + 1013904223) % 4294967296
    const u = (state / 4294967296) - 1 / 2
    return t + u * 2 * perturbationScale
  })
  return vqeAdaptive(ansatz, hamiltonian, exactGroundEnergy, perturbed, maxIterations)
}
