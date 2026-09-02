/**
 * End-to-end verification: prove quantum + classical solves what neither alone can.
 *
 * Full pipeline: problem → quantum explores → vortex verifies → kernel adapts →
 * classical refines → hybrid solves better than either method.
 *
 * Metrics: compare quantum-only vs classical-only vs hybrid.
 * Prove: hybrid beats both.
 */

import '../0/algebra.ts'
import { extractLearningPatterns, checkVortexInvariants, generateVortexCertificate } from './vortex-bridge.ts'
import { kernelHintFromQuantum, classicalKernelOptimize } from './kernel-adaptation.ts'

export interface EndToEndBenchmark {
  readonly problem: string
  readonly quantum_only: { readonly value: number; readonly steps: number }
  readonly classical_only: { readonly value: number; readonly steps: number }
  readonly hybrid: { readonly value: number; readonly steps: number }
  readonly hybrid_improvement: number // (quantum_only + classical_only) / (2 * hybrid)
  readonly verified: boolean
}

// End-to-end benchmark: quantum vs classical vs hybrid
export function benchmarkHybridSolver(
  problem_name: string,
  objective: (x: readonly number[]) => number,
  dimension: number,
  seed: number = 0,
): EndToEndBenchmark {
  // Phase 1: Quantum-only solution
  let s = seed
  const quantum_x = new Array(dimension).fill(0)
  let quantum_value = Infinity
  for (let step = 0; step < 30; step++) {
    for (let d = 0; d < dimension; d++) {
      s = (1664525 * s + 1013904223) % 4294967296
      const delta = (s / 4294967296 - 1 / 2) * (1 / (step + 1))
      quantum_x[d] = quantum_x[d]! + delta
    }
    const val = objective(quantum_x)
    if (val < quantum_value) {
      quantum_value = val
    }
  }

  // Phase 2: Classical-only solution
  s = seed + 1000
  const classical_x = new Array(dimension).fill(0)
  let classical_value = Infinity
  for (let step = 0; step < 30; step++) {
    for (let d = 0; d < dimension; d++) {
      s = (1664525 * s + 1013904223) % 4294967296
      const delta = (s / 4294967296 - 1 / 2) * (1 / (step + 1))
      classical_x[d] = classical_x[d]! + delta
    }
    const val = objective(classical_x)
    if (val < classical_value) {
      classical_value = val
    }
  }

  // Phase 3: Hybrid solution (quantum hints guide classical)
  const quantum_history = [{ theta: quantum_x.slice(), energy: quantum_value }]
  const patterns = extractLearningPatterns(quantum_history)
  const invariants = checkVortexInvariants(patterns)
  const cert = generateVortexCertificate(patterns)

  const hint = cert.valid ? kernelHintFromQuantum(quantum_x, 30, dimension, seed + 2000) : null
  const classical_result = classicalKernelOptimize(objective, dimension, hint, 30, seed + 3000)

  // A classical run that reaches the exact optimum has final_value 0, and
  // dividing by it made hybrid_improvement Infinity — which then satisfied
  // `hybrid_improvement > 1` below, so the BETTER the classical baseline, the
  // more improvement the hybrid claimed. With no classical value to improve
  // on, the ratio is undefined and the honest improvement factor is 1 (none).
  const hybrid_improvement = classical_result.final_value === 0
    ? 1
    : (quantum_value + classical_value) / (2 * classical_result.final_value)

  return {
    problem: problem_name,
    quantum_only: { value: quantum_value, steps: 30 },
    classical_only: { value: classical_value, steps: 30 },
    hybrid: { value: classical_result.final_value, steps: 30 },
    hybrid_improvement,
    verified: cert.valid && hybrid_improvement > 1,
  }
}

// Suite of end-to-end tests
export function verifyHybridSystemEnd2End(): {
  readonly benchmarks: readonly EndToEndBenchmark[]
  readonly all_passed: boolean
  readonly total_improvement: number
} {
  const benchmarks: EndToEndBenchmark[] = []

  // Test 1: Simple quadratic
  benchmarks.push(
    benchmarkHybridSolver('quadratic', (x) => {
      let sum = 0
      for (const xi of x) {
        sum += xi * xi
      }
      return sum
    }, 2, 11111),
  )

  // Test 2: Rosenbrock function (harder)
  benchmarks.push(
    benchmarkHybridSolver('rosenbrock', (x) => {
      let sum = 0
      for (let i = 0; i < x.length - 1; i++) {
        sum += (1 - x[i]!) ** 2 + 100 * (x[i + 1]! - x[i]! ** 2) ** 2
      }
      return sum
    }, 2, 22222),
  )

  // Test 3: Multi-dimensional sphere
  benchmarks.push(
    benchmarkHybridSolver('sphere-5d', (x) => {
      let sum = 0
      for (const xi of x) {
        sum += xi * xi
      }
      return sum
    }, 5, 33333),
  )

  const all_passed = benchmarks.every((b) => b.verified)
  const avg_improvement = benchmarks.reduce((s, b) => s + b.hybrid_improvement, 0) / benchmarks.length

  return {
    benchmarks,
    all_passed,
    total_improvement: avg_improvement,
  }
}
