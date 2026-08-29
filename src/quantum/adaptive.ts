/**
 * Adaptive & self-improving quantum circuits: use feedback from VQE runs to
 * guide circuit construction, parameter initialization, and hardware selection.
 * Quantum methods inform classical heuristics — ansatz choice based on energy
 * landscape geometry, warm-starting from successful predecessors.
 */

import { round, max } from '../0/algebra.ts'
import './simulator.ts'
import { type VQEResult } from './variational-optimizer.ts'
import { type CompiledCircuit, type HardwareProfile } from './hardware-compilation.ts'

export interface AdaptiveState {
  readonly successfulAnsatze: Array<{ name: string; theta: number[] }>
  readonly hardwareHistory: Array<{ profile: string; fidelity: number }>
  readonly convergedRuns: number
  readonly averageConvergenceSteps: number
}

/**
 * Learn from VQE results: track which ansatze converge well, which hardware
 * profiles achieve best fidelity. Use to seed future runs.
 */
export class AdaptiveOptimizer {
  private state: AdaptiveState

  constructor() {
    this.state = {
      successfulAnsatze: [],
      hardwareHistory: [],
      convergedRuns: 0,
      averageConvergenceSteps: 0,
    }
  }

  /**
   * Record a successful VQE run: extract the ansatz, track convergence.
   */
  recordSuccess(name: string, result: VQEResult, initialTheta: number[]): void {
    if (result.converged) {
      // Rebuilt rather than mutated. These fields are readonly, and assigning
      // through the annotation was the same defect fixed in orchestrator.ts:
      // the type was reporting a real violation, not being pedantic.
      const steps = result.history.length
      const convergedRuns = this.state.convergedRuns + 1
      this.state = {
        ...this.state,
        successfulAnsatze: [...this.state.successfulAnsatze, { name, theta: result.theta }],
        convergedRuns,
        averageConvergenceSteps:
          (this.state.averageConvergenceSteps * (convergedRuns - 1) + steps) / convergedRuns,
      }
    }
  }

  /**
   * Record hardware performance: track which profiles give best fidelity.
   */
  recordHardware(profileName: string, fidelity: number): void {
    this.state.hardwareHistory.push({ profile: profileName, fidelity })
  }

  /**
   * Recommend warm-start parameters from successful predecessors.
   */
  recommendWarmStart(): number[] | null {
    if (this.state.successfulAnsatze.length === 0) return null
    // Return the most recently successful ansatz (could also be a weighted average)
    return this.state.successfulAnsatze[this.state.successfulAnsatze.length - 1]!.theta
  }

  /**
   * Recommend best hardware profile based on history.
   */
  recommendHardware(): string | null {
    if (this.state.hardwareHistory.length === 0) return null
    let best = this.state.hardwareHistory[0]!
    for (const h of this.state.hardwareHistory) {
      if (h.fidelity > best.fidelity) best = h
    }
    return best.profile
  }

  /**
   * Estimate convergence time for a new problem of similar size.
   */
  estimatedSteps(): number {
    return round(this.state.averageConvergenceSteps) || 100
  }

  /**
   * Export state for inter-session persistence (e.g., serialize to JSON).
   */
  exportState(): AdaptiveState {
    return { ...this.state }
  }

  /**
   * Import state from a prior run.
   */
  importState(s: AdaptiveState): void {
    this.state = { ...s }
  }
}

/**
 * Adaptive circuit quality: predict whether a circuit will achieve target
 * fidelity on a given hardware, based on depth and gate count.
 */
export function predictFidelity(compiled: CompiledCircuit, profile: HardwareProfile): number {
  const oneQ_error = compiled.gateCount * 0.3 * profile.errorRate1Q // Rough 30% one-qubit gates
  const twoQ_error = compiled.gateCount * 0.2 * profile.errorRate2Q // Rough 20% two-qubit gates
  const depth_error = compiled.depth * profile.depthPenalty
  return max(0, 1 - (oneQ_error + twoQ_error + depth_error))
}

/**
 * Adaptive gate selection: given a target fidelity and hardware, recommend
 * whether to add more gates for expressivity or stick with shallow circuits.
 */
export function recommendCircuitDepth(
  targetFidelity: number,
  currentFidelity: number,
  maxDepth: number,
  profile: HardwareProfile,
): { recommended: number; rationale: string } {
  if (currentFidelity >= targetFidelity) {
    return { recommended: 0, rationale: 'Target fidelity already achieved; add no gates.' }
  }

  const fidelityGap = targetFidelity - currentFidelity
  const depthToAdd = round(fidelityGap / profile.depthPenalty + 1 / 2) // Ceiling via round

  if (depthToAdd > maxDepth) {
    return { recommended: maxDepth, rationale: 'Gap is large; hardware constraint binding.' }
  }

  return { recommended: depthToAdd, rationale: `Gap of ${fidelityGap.toFixed(3)}; add ~${depthToAdd} layers.` }
}
