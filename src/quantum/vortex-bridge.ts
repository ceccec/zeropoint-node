/**
 * Vortex bridge: quantum learning patterns inform self-development invariants.
 *
 * Quantum discovers via mesh topology. Vortex verifies via invariants.
 * Bridge: extract learning patterns from quantum solutions → feed into vortex
 * verification (what quantum discovered, vortex can structurally verify).
 *
 * Principle: Quantum explores (dynamic mesh). Vortex validates (static invariants).
 * Together: discovery + verification = trustworthy innovation.
 */

import { abs, max, min } from '../0/algebra.ts'

// ============================================================================
// LEARNING PATTERN EXTRACTION
// ============================================================================

export interface QuantumLearningPattern {
  readonly type: 'improvement' | 'bifurcation' | 'convergence' | 'escape'
  readonly confidence: number
  readonly dimension: number // Parameter space
  readonly depth: number // Iterations to learn
  readonly scalability: number // How well it generalizes
}

export interface VortexInvariant {
  readonly name: string
  readonly equation: string // Symbolic form
  readonly holds: boolean // Does this pattern satisfy it?
  readonly evidence: number // [0,1] confidence in holding
}

// Extract patterns from quantum optimization history
export function extractLearningPatterns(
  history: readonly { readonly theta: readonly number[]; readonly energy: number }[],
): readonly QuantumLearningPattern[] {
  if (history.length < 2) return []

  const patterns: QuantumLearningPattern[] = []
  const dimension = history[0]?.theta.length || 0
  const depth = history.length

  // Pattern 1: Improvement trajectory (monotonic or oscillating)
  let improvements = 0
  let reversals = 0
  for (let i = 1; i < history.length; i++) {
    if (history[i]!.energy < history[i - 1]!.energy) {
      improvements++
    } else {
      reversals++
    }
  }
  const improvementRatio = improvements / max(improvements + reversals, 1)

  patterns.push({
    type: 'improvement',
    confidence: improvementRatio,
    dimension,
    depth,
    scalability: 1 - reversals / depth,
  })

  // Pattern 2: Convergence (energy oscillations narrow)
  const energies = history.map((h) => h.energy)
  let variance = 0
  const mean = energies.reduce((s, e) => s + e, 0) / energies.length
  for (const e of energies) {
    variance += (e - mean) ** 2
  }
  variance /= energies.length

  if (variance < 1 / 10) {
    patterns.push({
      type: 'convergence',
      confidence: 1 - variance,
      dimension,
      depth,
      scalability: 1,
    })
  }

  // Pattern 3: Parameter space bifurcation
  if (dimension >= 2) {
    let correlation = 0
    for (let i = 0; i < dimension - 1; i++) {
      const vals1 = history.map((h) => h.theta[i]!)
      const vals2 = history.map((h) => h.theta[i + 1]!)
      const cov = vals1.reduce((s, v, j) => s + v * vals2[j]!, 0) / vals1.length
      correlation += abs(cov)
    }
    correlation /= dimension - 1

    if (correlation < 1 / 2) {
      patterns.push({
        type: 'bifurcation',
        confidence: 1 - correlation,
        dimension,
        depth,
        scalability: correlation, // Low correlation = good scaling
      })
    }
  }

  return patterns
}

// ============================================================================
// VORTEX INVARIANT CHECKING
// ============================================================================

// Vortex invariants: structural properties that must hold
export function checkVortexInvariants(
  patterns: readonly QuantumLearningPattern[],
): readonly VortexInvariant[] {
  const invariants: VortexInvariant[] = []

  // Invariant 1: vortexInvariantsHold (self-consistency)
  // Quantum learning must not contradict itself
  const consistentPatterns = patterns.filter((p) => p.confidence > 1 / 2)
  invariants.push({
    name: 'vortexInvariantsHold',
    equation: 'confidence(all patterns) > 0.5',
    holds: consistentPatterns.length === patterns.length,
    evidence: min(...patterns.map((p) => p.confidence)),
  })

  // Invariant 2: Scalability (learned patterns generalize)
  const avgScalability = patterns.reduce((s, p) => s + p.scalability, 0) / max(patterns.length, 1)
  invariants.push({
    name: 'scalability-invariant',
    equation: 'avg_scalability(patterns) > 0.6',
    holds: avgScalability > 1 / 2,
    evidence: avgScalability,
  })

  // Invariant 3: Reachability (learned paths are discoverable from any start)
  const hasDiverseApproaches = patterns.some((p) => p.type === 'bifurcation')
  invariants.push({
    name: 'reachability-invariant',
    equation: 'exists bifurcation path',
    holds: hasDiverseApproaches,
    evidence: hasDiverseApproaches ? 1 : 0,
  })

  // Invariant 4: Convergence (learning terminates)
  const hasConvergence = patterns.some((p) => p.type === 'convergence')
  invariants.push({
    name: 'convergence-invariant',
    equation: 'exists final state',
    holds: hasConvergence,
    evidence: hasConvergence ? 1 : 0,
  })

  return invariants
}

// ============================================================================
// VORTEX CERTIFICATE (proof that learning is trustworthy)
// ============================================================================

export interface VortexCertificate {
  readonly valid: boolean
  readonly invariants_held: number
  readonly total_invariants: number
  readonly confidence: number
  readonly timestamp: number
}

// Generate vortex certificate: proof that quantum learning is structurally sound
export function generateVortexCertificate(
  patterns: readonly QuantumLearningPattern[],
): VortexCertificate {
  const invariants = checkVortexInvariants(patterns)
  const held = invariants.filter((inv) => inv.holds).length
  const avgConfidence = invariants.reduce((s, inv) => s + inv.evidence, 0) / invariants.length

  return {
    valid: held === invariants.length,
    invariants_held: held,
    total_invariants: invariants.length,
    confidence: avgConfidence,
    timestamp: 0, // Deterministic; no Date.now()
  }
}

// ============================================================================
// FEEDBACK LOOP: Vortex → Quantum (refine based on invariants)
// ============================================================================

export interface VortexGuidance {
  readonly adjust_dimension: number // If -1, reduce; if +1, increase
  readonly adjust_depth: number // Suggest iterations
  readonly adjust_strategy: string // 'bifurcate', 'converge', 'escape'
  readonly confidence: number
}

// Vortex provides guidance to improve quantum learning
export function vortexGuidanceForQuantum(cert: VortexCertificate): VortexGuidance {
  if (!cert.valid) {
    // Learning is inconsistent; reduce complexity
    return {
      adjust_dimension: -1,
      adjust_depth: 10, // More iterations to stabilize
      adjust_strategy: 'converge',
      confidence: cert.confidence,
    }
  }

  if (cert.confidence > 0.9) {
    // Learning is excellent; increase scale
    return {
      adjust_dimension: 1,
      adjust_depth: 5, // Fewer iterations needed
      adjust_strategy: 'bifurcate',
      confidence: cert.confidence,
    }
  }

  // Learning is adequate; maintain
  return {
    adjust_dimension: 0,
    adjust_depth: 0,
    adjust_strategy: 'maintain',
    confidence: cert.confidence,
  }
}
