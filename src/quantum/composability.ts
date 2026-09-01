/**
 * Composability: quantum modules work together (beyond workflow).
 *
 * Current: workflow.ts orchestrates (profile → recommend → solve).
 * This layer: compose modules freely (superposition of strategies).
 *
 * Principle: any module can feed output to any other module without a
 * orchestrator prescribing the sequence. This is quantum entanglement:
 * modules are interdependent, not in a single sequence.
 */

import { round } from '../0/algebra.ts'

// ============================================================================
// COMPOSABILITY TYPES: HOW MODULES EXCHANGE DATA
// ============================================================================

export interface ModulePort<T> {
  readonly module_name: string
  readonly port_type: 'output' | 'input'
  readonly data_type: string
  readonly value: T
}

export interface CompositionGraph {
  readonly nodes: readonly string[] // Module names
  readonly edges: readonly { readonly from: string; readonly to: string }[]
  readonly data_flows: readonly { readonly edge: { readonly from: string; readonly to: string }; readonly type: string }[]
}

// ============================================================================
// ENTANGLEMENT: CONNECT MODULES FREELY
// ============================================================================

/**
 * Create a composition where modules are not in sequence (workflow),
 * but in a graph where any output port can connect to any input port.
 *
 * Example: VQE finds good parameters → pass to Tomography (measure state)
 *          AND pass to HardwareCompilation (estimate fidelity)
 *          Tomography result → feed to ErrorCorrection
 *          ErrorCorrection result → feed back to VQE for next round
 */
export function buildCompositionGraph(
  module_pairs: readonly { readonly from: string; readonly to: string; readonly data_type: string }[],
): CompositionGraph {
  const nodes = Array.from(new Set(module_pairs.flatMap((p) => [p.from, p.to])))
  const edges = module_pairs.map((p) => ({ from: p.from, to: p.to }))
  // The declared shape is { edge, type }; module_pairs is { from, to, data_type },
  // so this returned data_flows in a shape no consumer of the type expects.
  const data_flows = module_pairs.map((p) => ({ edge: { from: p.from, to: p.to }, type: p.data_type }))

  return { nodes, edges, data_flows }
}

/**
 * Check if a composition graph is valid (acyclic, all ports compatible).
 * Quantum principle: no causal loops (a module cannot depend on its own future output).
 */
export function validateCompositionGraph(graph: CompositionGraph): {
  readonly valid: boolean
  readonly cycles: readonly (readonly string[])[]
  readonly type_errors: readonly string[]
} {
  // Detect cycles via depth-first search
  const cycles: (readonly string[])[] = []

  function dfs(node: string, path: string[], visited: Set<string>) {
    if (visited.has(node)) {
      const cycle_start = path.indexOf(node)
      if (cycle_start >= 0) {
        cycles.push([...path.slice(cycle_start), node])
      }
      return
    }
    visited.add(node)
    const neighbors = graph.edges
      .filter((e) => e.from === node)
      .map((e) => e.to)
    for (const next of neighbors) {
      dfs(next, [...path, node], visited)
    }
  }

  for (const node of graph.nodes) {
    dfs(node, [], new Set())
  }

  // For now, assume type checking passes (ports are compatible)
  const type_errors: string[] = []

  return {
    valid: cycles.length === 0,
    cycles: cycles.length > 0 ? cycles : [],
    type_errors,
  }
}

// ============================================================================
// INTERFERENCE: MULTIPLE PATHS, AMPLIFY CORRECT ONE
// ============================================================================

/**
 * Some problems can be solved via multiple composition paths.
 * Run all paths in parallel (superposition), measure outcomes (interference).
 * The path with best outcome "interferes constructively" — use it.
 */
export interface CompositionPath {
  readonly path: readonly string[] // Module sequence
  readonly outcome_value: number // Result quality
  readonly confidence: number // 0-1: how much do we trust this path?
}

/**
 * Given a start module and end module, find all paths through the composition graph.
 * This is path enumeration: all ways to get from A to B.
 */
export function findPaths(
  graph: CompositionGraph,
  start: string,
  end: string,
  max_depth: number = 10,
): readonly (readonly string[])[] {
  const paths: (readonly string[])[] = []

  function dfs(node: string, path: readonly string[], depth: number) {
    if (depth > max_depth) return
    if (node === end) {
      paths.push([...path, node])
      return
    }

    const neighbors = graph.edges
      .filter((e) => e.from === node)
      .map((e) => e.to)

    for (const next of neighbors) {
      if (!path.includes(next)) {
        // Avoid cycles
        dfs(next, [...path, node], depth + 1)
      }
    }
  }

  dfs(start, [], 0)
  return paths
}

/**
 * Evaluate multiple paths: which one is best?
 * This simulates quantum interference: all paths exist (superposition),
 * measurement picks the one with highest amplitude (best outcome).
 */
export function selectBestPath(
  paths: readonly CompositionPath[],
): CompositionPath | null {
  if (paths.length === 0) return null

  // Amplitude = outcome_value × confidence
  // Pick path with highest amplitude
  const amplitudes = paths.map((p) => p.outcome_value * p.confidence)
  const best_idx = amplitudes.reduce((idx, val, i) => (val > amplitudes[idx]! ? i : idx), 0)

  return paths[best_idx] || null
}

// ============================================================================
// SELF-IMPROVING COMPOSITION: LEARN WHICH PATHS WORK
// ============================================================================

export interface CompositionStrategy {
  readonly name: string
  readonly graph: CompositionGraph
  readonly preferred_path: readonly string[]
  readonly success_rate: number // 0-1: how often this strategy succeeds
  readonly improvement_potential: number // How much better can we do?
}

/**
 * Track which composition paths work well, recommend best one.
 * Principle: learn from experience (quantum learning patterns applied to composition).
 */
export function trackCompositionStrategy(
  attempt: {
    readonly path: readonly string[]
    readonly outcome_value: number
    readonly is_success: boolean
  },
  history: readonly CompositionStrategy[] = [],
): CompositionStrategy[] {
  // Find or create strategy for this path
  const path_key = attempt.path.join('→')
  let strategy = history.find((s) => s.preferred_path.join('→') === path_key)

  if (!strategy) {
    // Create new strategy
    strategy = {
      name: `composition:${path_key}`,
      graph: {
        nodes: attempt.path,
        edges: attempt.path.slice(1).map((to, i) => ({
          from: attempt.path[i]!,
          to,
        })),
        data_flows: [],
      },
      preferred_path: attempt.path,
      success_rate: attempt.is_success ? 1 : 0,
      improvement_potential: 0.5,
    }
  } else {
    // Update success rate
    const total_attempts = 10 // Assume 10 attempts per strategy tracked
    const success_count = round(strategy.success_rate * total_attempts)
    const new_count = success_count + (attempt.is_success ? 1 : 0)
    strategy = {
      ...strategy,
      success_rate: new_count / (total_attempts + 1),
    }
  }

  const updated = history.filter((s) => s.name !== strategy.name)
  return [...updated, strategy]
}

/**
 * Recommend best strategy based on history.
 */
export function recommendCompositionStrategy(
  strategies: readonly CompositionStrategy[],
): CompositionStrategy | null {
  if (strategies.length === 0) return null

  // Pick strategy with highest success rate × improvement potential
  const scores = strategies.map((s) => s.success_rate * (1 + s.improvement_potential))
  const best_idx = scores.reduce((idx, val, i) => (val > scores[idx]! ? i : idx), 0)

  return strategies[best_idx] || null
}

// ============================================================================
// ADAPTIVE COMPOSITION: ADJUST GRAPH BASED ON FEEDBACK
// ============================================================================

/**
 * If a module in the composition graph consistently underperforms,
 * replace it with an alternative or bypass it entirely.
 */
export function adaptCompositionGraph(
  graph: CompositionGraph,
  problem_modules: readonly string[], // Modules that are failing
  alternatives: readonly { readonly module: string; readonly alternative: string }[],
): CompositionGraph {
  // graph.edges is readonly and this function rewires it; the pushes below
  // were mutating a frozen contract through a type that forbade it.
  let new_edges = [...graph.edges]

  for (const { module, alternative } of alternatives) {
    if (problem_modules.includes(module)) {
      // Replace edges: X → module → Z becomes X → alternative → Z
      const incoming = new_edges.filter((e) => e.to === module)
      const outgoing = new_edges.filter((e) => e.from === module)

      // Remove edges involving problem module
      new_edges = new_edges.filter((e) => e.from !== module && e.to !== module)

      // Add new edges via alternative
      for (const inc of incoming) {
        new_edges.push({ from: inc.from, to: alternative })
      }
      for (const out of outgoing) {
        new_edges.push({ from: alternative, to: out.to })
      }
    }
  }

  return {
    nodes: graph.nodes,
    edges: new_edges,
    data_flows: graph.data_flows,
  }
}
