/**
 * Kernel adaptation: quantum heuristics guide classical kernel optimization.
 *
 * Quantum discovers parameter landscapes. Classical kernels learn from those
 * discoveries: warm-starting from successful ansatze, adaptive depth based on
 * convergence patterns, hardware selection via quantum profiling.
 *
 * Principle: Quantum explores fast (small N). Classical scales (large N).
 * Quantum teaches Classical what works.
 */

import { abs, max, min, round, floor, sqrt } from '../0/algebra.ts'

// ============================================================================
// KERNEL HINTS FROM QUANTUM
// ============================================================================

export interface QuantumHint {
  readonly parameter_suggestion: readonly number[]
  readonly learning_rate: number
  readonly expected_convergence_steps: number
  readonly hardware_recommendation: string
  readonly confidence: number
}

// Classical kernel receives quantum insights
export function kernelHintFromQuantum(
  successful_theta: readonly number[],
  convergence_history_length: number,
  problem_dimension: number,
  seed: number = 0,
): QuantumHint {
  // Learning rate: inverse of convergence speed
  const converged_fast = convergence_history_length < 30
  const learning_rate = converged_fast ? 1 / 50 : 1 / 100

  // Expected steps: scale by dimension
  const base_steps = convergence_history_length
  const expected_steps = floor(base_steps * sqrt(problem_dimension))

  // Hardware: smaller problems on simulators, larger on specialized hardware
  let hardware = 'simulator'
  if (problem_dimension > 4) {
    hardware = 'specialized-quantum-processor'
  }

  return {
    parameter_suggestion: successful_theta,
    learning_rate,
    expected_convergence_steps: expected_steps,
    hardware_recommendation: hardware,
    confidence: converged_fast ? 0.9 : 0.6,
  }
}

// ============================================================================
// CLASSICAL KERNEL OPTIMIZATION GUIDED BY QUANTUM
// ============================================================================

export interface KernelOptimizationState {
  readonly x: readonly number[]
  readonly fx: number
  readonly iteration: number
  readonly learning_rate: number
  readonly warm_started: boolean
}

// Classical optimizer with quantum guidance
export function classicalKernelOptimize(
  objective: (x: readonly number[]) => number,
  dimension: number,
  hint: QuantumHint | null,
  max_iterations: number = 100,
  seed: number = 0,
): {
  readonly final_x: readonly number[]
  readonly final_value: number
  readonly iterations_used: number
} {
  // Initialize from quantum hint or random
  let x = hint ? hint.parameter_suggestion.slice() : new Array(dimension).fill(0)
  const warm_started = hint !== null
  let learning_rate = hint?.learning_rate || 1 / 50
  let s = seed

  let best_x = x.slice() as any as number[]
  let best_value = objective(x)

  for (let iter = 0; iter < max_iterations; iter++) {
    // Gradient-free step with quantum-guided learning rate
    for (let d = 0; d < dimension; d++) {
      s = (1664525 * s + 1013904223) % 4294967296
      const direction = (s / 4294967296) * 2 - 1
      x[d] = x[d]! + learning_rate * direction
    }

    const fx = objective(x)
    if (fx < best_value) {
      best_value = fx
      best_x = x.slice() as any as number[]
    }

    // Adapt learning rate based on progress
    if (iter % 10 === 0 && iter > 0) {
      learning_rate *= 0.9 // Decay
    }
  }

  return {
    final_x: best_x,
    final_value: best_value,
    iterations_used: max_iterations,
  }
}

// ============================================================================
// CIRCUIT DEPTH ADAPTATION
// ============================================================================

export interface CircuitDepthRecommendation {
  readonly depth: number
  readonly reasoning: string
  readonly convergence_likelihood: number
}

// Recommend circuit depth based on quantum learning patterns
export function recommendCircuitDepthKernel(
  problem_dimension: number,
  prior_convergence_steps: readonly number[],
  target_convergence_steps: number = 50,
): CircuitDepthRecommendation {
  // Depth scales with problem dimension and convergence difficulty
  const avg_prior_steps = prior_convergence_steps.length > 0
    ? prior_convergence_steps.reduce((s, v) => s + v, 0) / prior_convergence_steps.length
    : 20

  const difficulty_ratio = target_convergence_steps / max(avg_prior_steps, 1)

  // Recommended depth: linear in dimension, scaled by difficulty
  let depth = floor(problem_dimension * (1 + difficulty_ratio))
  depth = min(max(depth, 2), 20) // Clamp to [2, 20]

  const convergence_likelihood = 1 - abs(difficulty_ratio - 1) / 2

  return {
    depth,
    reasoning: `dimension=${problem_dimension}, prior_convergence=${floor(avg_prior_steps)}, target=${target_convergence_steps}`,
    convergence_likelihood,
  }
}

// ============================================================================
// HYBRID KERNEL DECISION
// ============================================================================

export interface HybridKernelDecision {
  readonly use_quantum: boolean
  readonly use_classical: boolean
  readonly strategy: 'quantum-primary' | 'classical-primary' | 'alternating'
  readonly rationale: string
}

// Decide whether to use quantum, classical, or hybrid
export function decideKernelStrategy(
  problem_dimension: number,
  problem_complexity: number, // 0-1 estimate
  quantum_budget: number,
  classical_budget: number,
): HybridKernelDecision {
  // Quantum advantage: small dimension, moderate-to-high complexity
  const quantum_suitable = problem_dimension <= 10 && problem_complexity > 1 / 2

  // Classical advantage: any dimension, low-to-moderate complexity
  const classical_suitable = true

  if (quantum_suitable && quantum_budget > classical_budget) {
    return {
      use_quantum: true,
      use_classical: false,
      strategy: 'quantum-primary',
      rationale: 'Quantum suitable for this problem; use it first',
    }
  }

  if (!quantum_suitable || classical_budget > quantum_budget) {
    return {
      use_quantum: false,
      use_classical: true,
      strategy: 'classical-primary',
      rationale: 'Classical more efficient for this problem',
    }
  }

  return {
    use_quantum: true,
    use_classical: true,
    strategy: 'alternating',
    rationale: 'Hybrid: quantum explores, classical refines',
  }
}
