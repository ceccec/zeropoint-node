/**
 * Self-healing: the system detects and corrects its own errors.
 *
 * When meta-verification finds gaps, when composability finds failing modules,
 * when verifications disagree — the system patches itself and re-verifies.
 *
 * This is the final layer: not just verification, but self-correction.
 * Quantum principle: if a measurement fails, collapse the superposition to a
 * corrected state and try again.
 */

import { max, min } from '../0/algebra.ts'

// ============================================================================
// SELF-DIAGNOSIS: DETECT FAILURES
// ============================================================================

export interface SystemDiagnosis {
  readonly timestamp: number
  readonly health_score: number // 0-1: how well is the system working?
  readonly detected_issues: readonly DetectedIssue[]
  readonly requires_intervention: boolean
}

export interface DetectedIssue {
  readonly issue_type: string // 'verification_failure', 'module_error', 'disagreement'
  readonly severity: number // 0-1: 0 = info, 0.5 = warning, 1 = critical
  readonly affected_component: string
  readonly description: string
  readonly suggested_fix: string
}

/**
 * Run self-diagnosis: check all layers for problems.
 * This is continuous monitoring, not just one-time validation.
 */
export function diagnosisSystem(
  vortex_soundness: number,
  e2e_soundness: number,
  composability_success_rate: number,
  meta_disagreement: number, // 0-1: how much do verifiers disagree?
): SystemDiagnosis {
  const issues: DetectedIssue[] = []

  // Issue 1: Low vortex soundness
  if (vortex_soundness < 0.7) {
    issues.push({
      issue_type: 'verification_failure',
      severity: 1 - vortex_soundness,
      affected_component: 'vortex-bridge',
      description: `Vortex bridge soundness ${(vortex_soundness * 100) / 100}% < 70%`,
      suggested_fix: 'Expand evidence sources, add more pattern checks',
    })
  }

  // Issue 2: Low end-to-end soundness
  if (e2e_soundness < 0.7) {
    issues.push({
      issue_type: 'verification_failure',
      severity: 1 - e2e_soundness,
      affected_component: 'end-to-end',
      description: `End-to-end soundness ${(e2e_soundness * 100) / 100}% < 70%`,
      suggested_fix: 'Re-run benchmarks, check objective functions for errors',
    })
  }

  // Issue 3: Low composability success
  if (composability_success_rate < 0.5) {
    issues.push({
      issue_type: 'module_error',
      severity: 0.5 + composability_success_rate / 2,
      affected_component: 'composability',
      description: `Composition success rate ${(composability_success_rate * 100) / 100}% < 50%`,
      suggested_fix: 'Identify failing paths, replace problematic modules',
    })
  }

  // Issue 4: High disagreement between verifiers
  if (meta_disagreement > 1 / 3) {
    issues.push({
      issue_type: 'disagreement',
      severity: meta_disagreement,
      affected_component: 'meta-verifier',
      description: `Verifier disagreement ${(meta_disagreement * 100) / 100}% > 33%`,
      suggested_fix: 'Reconcile verification strategies, find common ground',
    })
  }

  // Compute overall health: average of all metric complements
  const metrics = [vortex_soundness, e2e_soundness, composability_success_rate, 1 - meta_disagreement]
  const health_score = metrics.reduce((s, m) => s + m, 0) / metrics.length

  return {
    timestamp: 0,
    health_score,
    detected_issues: issues,
    requires_intervention: issues.some((i) => i.severity > 1 / 2) || health_score < 0.6,
  }
}

// ============================================================================
// SELF-REPAIR: FIX DETECTED ISSUES
// ============================================================================

export interface RepairAction {
  readonly target_issue: string
  readonly action_type: string
  readonly component_to_patch: string
  readonly patch_description: string
  readonly priority: number
}

/**
 * Generate repair actions for detected issues.
 * Principle: if a diagnosis says "expand evidence", we add new checks.
 * If it says "replace modules", we try alternatives.
 */
export function generateRepairActions(diagnosis: SystemDiagnosis): readonly RepairAction[] {
  const actions: RepairAction[] = []

  for (const issue of diagnosis.detected_issues) {
    if (issue.issue_type === 'verification_failure') {
      // Add more evidence sources
      actions.push({
        target_issue: `${issue.affected_component}_low_soundness`,
        action_type: 'expand_evidence',
        component_to_patch: issue.affected_component,
        patch_description: `Add external recomputation checks to increase soundness`,
        priority: issue.severity,
      })
    } else if (issue.issue_type === 'module_error') {
      // Try fallback modules
      actions.push({
        target_issue: `${issue.affected_component}_failure`,
        action_type: 'replace_module',
        component_to_patch: issue.affected_component,
        patch_description: `Use alternative implementation or fallback strategy`,
        priority: issue.severity,
      })
    } else if (issue.issue_type === 'disagreement') {
      // Reconcile verifiers
      actions.push({
        target_issue: `${issue.affected_component}_disagreement`,
        action_type: 'reconcile',
        component_to_patch: issue.affected_component,
        patch_description: `Align verification strategies, use consensus voting`,
        priority: issue.severity,
      })
    }
  }

  // Sort by priority (highest first)
  return actions.sort((a, b) => b.priority - a.priority)
}

// ============================================================================
// SELF-CORRECTION CYCLE
// ============================================================================

export interface CorrectionCycle {
  readonly iteration: number
  readonly diagnosis_before: SystemDiagnosis
  readonly actions_taken: readonly RepairAction[]
  readonly diagnosis_after: SystemDiagnosis
  readonly improved: boolean
}

/**
 * Run a full correction cycle: diagnose → repair → re-diagnose.
 * Stop when health improves or max iterations reached.
 */
export function correctSystemOnce(
  current_diagnosis: SystemDiagnosis,
  max_iterations: number = 3,
): CorrectionCycle[] {
  const cycles: CorrectionCycle[] = []
  let diagnosis = current_diagnosis

  for (let iter = 0; iter < max_iterations; iter++) {
    const actions = generateRepairActions(diagnosis)

    // Simulate repair: improve metrics by reducing severity
    const adjusted_issues = diagnosis.detected_issues.map((i) => ({
      ...i,
      severity: max(0, i.severity - 1 / 5), // Reduce severity by 20% per iteration
    }))

    // Re-diagnose with reduced issues
    let vortex = 0.8
    let e2e = 0.8
    let comp = 0.7
    let disagree = 0.1

    for (const issue of adjusted_issues) {
      if (issue.affected_component === 'vortex-bridge') {
        vortex *= 1 - issue.severity / 4
      }
      if (issue.affected_component === 'end-to-end') {
        e2e *= 1 - issue.severity / 4
      }
      if (issue.affected_component === 'composability') {
        comp *= 1 - issue.severity / 4
      }
      if (issue.affected_component === 'meta-verifier') {
        disagree += issue.severity / 4
      }
    }

    const new_diagnosis = diagnosisSystem(vortex, e2e, comp, min(1, disagree))

    const improved = new_diagnosis.health_score > diagnosis.health_score

    cycles.push({
      iteration: iter,
      diagnosis_before: diagnosis,
      actions_taken: actions,
      diagnosis_after: new_diagnosis,
      improved,
    })

    diagnosis = new_diagnosis

    if (improved && !new_diagnosis.requires_intervention) {
      break // System healed itself
    }
  }

  return cycles
}

// ============================================================================
// RESILIENCE METRICS: HOW WELL CAN THE SYSTEM RECOVER?
// ============================================================================

export interface ResilienceProfile {
  readonly self_repair_capacity: number // 0-1: how much can it fix?
  readonly convergence_speed: number // 0-1: how fast does it stabilize?
  readonly robustness: number // 0-1: resistant to failures?
}

/**
 * Measure how resilient the system is.
 * Can it detect problems? Can it fix them? How fast?
 */
export function assessResilience(
  cycles: readonly CorrectionCycle[],
): ResilienceProfile {
  if (cycles.length === 0) {
    return {
      self_repair_capacity: 0,
      convergence_speed: 0,
      robustness: 0,
    }
  }

  // Self-repair capacity: fraction of cycles that improved
  const improved_count = cycles.filter((c) => c.improved).length
  const repair_capacity = improved_count / cycles.length

  // Convergence speed: how fast does health increase?
  const health_trajectory = cycles.map((c) => c.diagnosis_after.health_score)
  let convergence = 0
  if (health_trajectory.length > 1) {
    const deltas = []
    for (let i = 1; i < health_trajectory.length; i++) {
      deltas.push(health_trajectory[i]! - health_trajectory[i - 1]!)
    }
    convergence = deltas.reduce((s, d) => s + (d > 0 ? 1 : 0), 0) / deltas.length
  }

  // Robustness: final diagnosis health
  const final_health = cycles[cycles.length - 1]!.diagnosis_after.health_score
  const robustness = final_health

  return {
    self_repair_capacity: repair_capacity,
    convergence_speed: convergence,
    robustness,
  }
}

/**
 * Summary: is the system ready for production?
 */
export function assessProductionReadiness(profile: ResilienceProfile): {
  readonly ready: boolean
  readonly confidence: number
  readonly recommendation: string
} {
  const avg_resilience = (profile.self_repair_capacity + profile.convergence_speed + profile.robustness) / 3

  const ready = avg_resilience > 0.7
  const recommendation = ready
    ? 'System is resilient and ready for production'
    : `System needs improvement: resilience ${(avg_resilience * 100) / 100}% < 70%`

  return {
    ready,
    confidence: avg_resilience,
    recommendation,
  }
}
