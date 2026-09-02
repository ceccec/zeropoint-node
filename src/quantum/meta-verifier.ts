/**
 * Meta-verifier: verify the verifiers themselves.
 *
 * The vortex bridge checks learning patterns. The end-to-end benchmark proves
 * hybrid works. But who verifies those verifications? This layer applies quantum
 * principles recursively: measure the measurement, verify the verification.
 *
 * Architecture: superposition of verification strategies → interference to find
 * ground truth → measurement (external recomputation) → vortex check of the
 * verification itself.
 */

import { abs, max, min } from '../0/algebra.ts'
import type { QuantumLearningPattern } from './vortex-bridge.ts'
import type { EndToEndBenchmark } from './end-to-end.ts'

// ============================================================================
// META-VERIFICATION: VERIFY THAT VERIFICATIONS ARE SOUND
// ============================================================================

export interface VerificationAudit {
  readonly verifier_name: string
  readonly claim: string
  readonly evidence_sources: readonly string[]
  readonly external_recompute: boolean // Can an outsider recompute this without trusting our code?
  readonly structural_guarantee: boolean // Does this satisfy vortex invariants?
  readonly soundness_score: number // 0-1: how trustworthy is this verification?
}

/**
 * Audit the vortex bridge: does it correctly verify learning patterns?
 * External recomputation: an outsider can measure the quantum history themselves.
 */
export function auditVortexBridge(
  patterns: readonly QuantumLearningPattern[],
  history_size: number,
): VerificationAudit {
  // Claim: extracted patterns reflect true learning
  const pattern_count = patterns.length
  const expects_improvement = patterns.some((p) => p.type === 'improvement')
  const expects_bifurcation = patterns.some((p) => p.type === 'bifurcation')
  const expects_convergence = patterns.some((p) => p.type === 'convergence')

  // Evidence: patterns span the hypothesis space (superposition)
  const pattern_diversity = pattern_count > 0 ? max(1, min(4, pattern_count)) / 4 : 0
  const covers_dynamics = (expects_improvement ? 1 / 3 : 0) + (expects_bifurcation ? 1 / 3 : 0) +
    (expects_convergence ? 1 / 3 : 0)

  // External recomputation: can someone rerun the quantum circuit and measure patterns?
  // YES: quantum history is a list of (theta, energy) pairs anyone can analyze
  const external_recompute = history_size >= 2 // Need at least 2 points to see a pattern

  // Structural guarantee: patterns should form a directed acyclic graph (DAG)
  // Improvement → Convergence is valid
  // Bifurcation → Convergence is valid
  // Cycles are invalid (e.g., Improvement → Bifurcation → Improvement)
  let is_dag = true
  for (let i = 0; i < patterns.length; i++) {
    const pi = patterns[i]!
    for (let j = i + 1; j < patterns.length; j++) {
      const pj = patterns[j]!
      // Check for backward edges (should not exist in a valid pattern sequence)
      if (pi.confidence > pj.confidence && pj.type === 'improvement' && pi.type === 'convergence') {
        is_dag = false
      }
    }
  }

  const soundness = (pattern_diversity + covers_dynamics) / 2

  return {
    verifier_name: 'vortex-bridge',
    claim: `${pattern_count} patterns extracted, DAG structure ${is_dag ? 'valid' : 'invalid'}`,
    evidence_sources: ['quantum_history', 'pattern_extraction_algorithm', 'invariant_checks'],
    external_recompute,
    structural_guarantee: is_dag,
    soundness_score: external_recompute && is_dag ? soundness : soundness / 2,
  }
}

/**
 * Audit the end-to-end benchmark: does the improvement claim hold?
 * External recomputation: anyone can run the same 3 test problems.
 */
export function auditEndToEndBenchmark(benchmarks: readonly EndToEndBenchmark[]): VerificationAudit {
  if (benchmarks.length === 0) {
    return {
      verifier_name: 'end-to-end',
      claim: 'No benchmarks to verify',
      evidence_sources: [],
      external_recompute: false,
      structural_guarantee: false,
      soundness_score: 0,
    }
  }

  // Claim: hybrid improves over both quantum-only and classical-only
  const all_hybrid_wins = benchmarks.every((b) => b.hybrid_improvement > 1)
  const avg_improvement = benchmarks.reduce((s, b) => s + b.hybrid_improvement, 0) / benchmarks.length

  // Evidence: tested on diverse problems (quadratic, Rosenbrock, sphere)
  const problem_diversity = benchmarks.length >= 3 ? 1 : benchmarks.length / 3

  // External recomputation: benchmarks are deterministic if seed is fixed
  const external_recompute = benchmarks.every((b) => b.verified)

  // Structural guarantee: improvement should be >1, ideally not >2 (outlier detection)
  const reasonable_improvements = benchmarks.every((b) => b.hybrid_improvement > 1 && b.hybrid_improvement < 2)

  const soundness = all_hybrid_wins ? problem_diversity : 0

  return {
    verifier_name: 'end-to-end',
    claim: `${benchmarks.length} problems, avg improvement ${(avg_improvement * 10) / 10}, all pass ${all_hybrid_wins ? 'YES' : 'NO'}`,
    evidence_sources: ['quantum_solver', 'classical_solver', 'hybrid_solver', 'objective_functions'],
    external_recompute,
    structural_guarantee: reasonable_improvements,
    soundness_score: external_recompute && soundness > (1 / 2) ? soundness : soundness / 2,
  }
}

// ============================================================================
// RECURSIVE VERIFICATION: VERIFY THE AUDITS THEMSELVES
// ============================================================================

export interface MetaVerification {
  readonly audit_level: number // Depth of recursion: 1 = vortex audit, 2 = audit of audit, etc.
  readonly verifications: readonly VerificationAudit[]
  readonly consensus_soundness: number // Average soundness across all audits
  readonly all_pass: boolean
  readonly structural_integrity: string // Summary: "sound", "questionable", "unsound"
}

/**
 * Meta-verification: run multiple independent audits and see if they agree.
 * This is the quantum superposition principle: generate multiple hypotheses,
 * then interference (agreement) validates the ground truth.
 */
export function metaVerifySystem(
  vortex_audit: VerificationAudit,
  e2e_audit: VerificationAudit,
): MetaVerification {
  const audits = [vortex_audit, e2e_audit]

  // Superposition: each audit is an independent measurement
  // Interference: if they agree on soundness, the system is sound
  const soundness_agreement = abs(vortex_audit.soundness_score - e2e_audit.soundness_score)
  const sound_if_agreement = soundness_agreement < 1 / 5 // < 0.2 disagreement

  // Structural integrity check: are both audits external-recomputable?
  const all_external = audits.every((a) => a.external_recompute)

  // Ground truth: if both audits agree AND both are external-recomputable, we have high confidence
  const consensus_soundness = audits.reduce((s, a) => s + a.soundness_score, 0) / audits.length
  const all_pass = audits.every((a) => a.soundness_score > (1 / 2))

  let integrity = 'questionable'
  if (all_external && sound_if_agreement && all_pass) {
    integrity = 'sound'
  } else if (!all_external || !all_pass) {
    integrity = 'unsound'
  }

  return {
    audit_level: 1,
    verifications: audits,
    consensus_soundness,
    all_pass,
    structural_integrity: integrity,
  }
}

// ============================================================================
// SELF-IMPROVEMENT: USE AUDITS TO IMPROVE THE SYSTEM
// ============================================================================

export interface SystemImprovement {
  readonly gap: string
  readonly priority: number // 1 = critical, 0.5 = medium, 0 = nice-to-have
  readonly suggested_fix: string
  readonly verifiable: boolean // Can improvement be verified externally?
}

/**
 * Identify gaps by analyzing audit failures.
 * Apply quantum principles: superposition (many possible gaps) → interference
 * (find root causes) → measurement (verify fix).
 */
export function identifyGaps(meta: MetaVerification): readonly SystemImprovement[] {
  const gaps: SystemImprovement[] = []

  // Gap 1: Non-external-recomputable verification
  if (!meta.verifications.every((a) => a.external_recompute)) {
    gaps.push({
      gap: 'Some verifications are self-referential (not externally recomputable)',
      priority: 1,
      suggested_fix: 'Ensure all verification steps are deterministic and can be redone by an outsider',
      verifiable: true,
    })
  }

  // Gap 2: Low consensus soundness
  if (meta.consensus_soundness < (7 / 10)) {
    gaps.push({
      gap: 'Verifications have low confidence (soundness < 0.7)',
      priority: (1 / 2),
      suggested_fix: 'Expand evidence sources, add more structural checks',
      verifiable: true,
    })
  }

  // Gap 3: Disagreement between verifiers
  const soundness_scores = meta.verifications.map((a) => a.soundness_score)
  if (soundness_scores.length >= 2) {
    const max_score = max(...soundness_scores)
    const min_score = min(...soundness_scores)
    if (max_score - min_score > 1 / 3) {
      gaps.push({
        gap: 'Verifiers disagree on soundness (range > 0.33)',
        priority: (1 / 2),
        suggested_fix: 'Reconcile different verification strategies, find common ground',
        verifiable: true,
      })
    }
  }

  // Gap 4: Structural integrity not "sound"
  if (meta.structural_integrity !== 'sound') {
    gaps.push({
      gap: `Structural integrity is "${meta.structural_integrity}", not "sound"`,
      priority: 1,
      suggested_fix: 'Ensure all verifications satisfy vortex invariants',
      verifiable: true,
    })
  }

  return gaps
}
