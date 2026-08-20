/**
 * Dynamic comparison mesh: map solution landscape via pairwise comparisons.
 *
 * Maintains a dynamic graph of candidate solutions. Edges represent similarity/
 * improvement relationships. Mesh evolves: bad solutions prune, good solutions
 * cluster, patterns guide new exploration. Discovers what search alone misses.
 *
 * Principle: solutions teach each other via topology. Mesh is the teacher.
 */

import { sqrt, abs, max, min } from '../0/algebra.ts'

export interface MeshNode {
  readonly id: number
  readonly solution: readonly number[]
  readonly value: number
  readonly iteration: number
  readonly neighbors: readonly number[] // IDs of connected nodes
}

export interface MeshEdge {
  readonly from: number
  readonly to: number
  readonly similarity: number
  readonly improvement: number
}

export interface MeshCluster {
  readonly nodes: readonly number[]
  readonly center: readonly number[]
  readonly radius: number
  readonly quality: number // Average value in cluster
}

export interface MeshPattern {
  readonly type: 'improvement' | 'stagnation' | 'bifurcation'
  readonly nodes: readonly number[]
  readonly direction: readonly number[] // Gradient direction
  readonly confidence: number
}

// Build initial mesh: add nodes with diversity constraint
export function initializeMesh(
  nodeCount: number,
  dimension: number,
  objective: (x: readonly number[]) => number,
  seed: number = 0,
): {
  readonly nodes: readonly MeshNode[]
  readonly edges: readonly MeshEdge[]
} {
  const nodes: MeshNode[] = []
  let s = seed

  // Generate diverse initial solutions
  for (let i = 0; i < nodeCount; i++) {
    const solution = new Array(dimension)
    for (let d = 0; d < dimension; d++) {
      s = (1664525 * s + 1013904223) % 4294967296
      solution[d] = ((s / 4294967296) * 2) - 1 // [-1, 1]
    }

    const value = objective(solution)
    nodes.push({
      id: i,
      solution: solution as readonly number[],
      value,
      iteration: 0,
      neighbors: [],
    })
  }

  // Build edges: connect K-nearest neighbors + improvement chain
  const edges: MeshEdge[] = []
  const K = min(3, nodeCount - 1)

  for (let i = 0; i < nodes.length; i++) {
    // K-nearest by distance
    const distances = nodes.map((n, j) => {
      if (i === j) return { id: j, dist: 1e10 } // Large value for self
      let dist = 0
      for (let d = 0; d < dimension; d++) {
        const diff = nodes[i]!.solution[d]! - n.solution[d]!
        dist += diff * diff
      }
      return { id: j, dist: sqrt(dist) }
    })

    distances.sort((a, b) => a.dist - b.dist)
    for (let k = 0; k < K; k++) {
      const target = distances[k]!.id
      const similarity = 1 - distances[k]!.dist / 2 // Normalize to [0, 1]
      const improvement = (nodes[i]!.value - nodes[target]!.value) / max(abs(nodes[i]!.value), 1)

      edges.push({
        from: i,
        to: target,
        similarity,
        improvement,
      })
    }
  }

  return { nodes: nodes as readonly MeshNode[], edges: edges as readonly MeshEdge[] }
}

// Add new candidate to mesh: insert and rewire if beneficial
export function addNodeToMesh(
  nodes: readonly MeshNode[],
  edges: readonly MeshEdge[],
  newSolution: readonly number[],
  newValue: number,
  maxNeighbors: number = 4,
): {
  readonly nodes: readonly MeshNode[]
  readonly edges: readonly MeshEdge[]
} {
  const newNodeId = nodes.length
  const dimension = newSolution.length

  // Create new node
  const newNode: MeshNode = {
    id: newNodeId,
    solution: newSolution,
    value: newValue,
    iteration: 0,
    neighbors: [],
  }

  const updatedNodes = [...nodes, newNode] as any as MeshNode[]

  // Connect to K-nearest existing nodes
  const distances = nodes.map((n, i) => {
    let dist = 0
    for (let d = 0; d < dimension; d++) {
      const diff = newSolution[d]! - n.solution[d]!
      dist += diff * diff
    }
    return { id: i, dist: sqrt(dist) }
  })

  distances.sort((a, b) => a.dist - b.dist)

  const newEdges: MeshEdge[] = []
  for (const e of edges) {
    newEdges.push(e)
  }

  // Add edges from new node
  for (let k = 0; k < min(maxNeighbors, nodes.length); k++) {
    const target = distances[k]!.id
    const similarity = 1 - distances[k]!.dist / 2
    const improvement = (newValue - nodes[target]!.value) / max(abs(newValue), 1)

    newEdges.push({
      from: newNodeId,
      to: target,
      similarity,
      improvement,
    })
  }

  return { nodes: updatedNodes, edges: newEdges as readonly MeshEdge[] }
}

// Prune worst nodes: keep elite + frontier
export function pruneMesh(
  nodes: readonly MeshNode[],
  edges: readonly MeshEdge[],
  keepCount: number,
): {
  readonly nodes: readonly MeshNode[]
  readonly edges: readonly MeshEdge[]
  readonly pruned: readonly number[]
} {
  const sorted = nodes.slice().sort((a, b) => a.value - b.value)
  const kept = sorted.slice(0, keepCount)
  const keptIds = new Set(kept.map((n) => n.id))
  const pruned: number[] = []

  for (const n of nodes) {
    if (!keptIds.has(n.id)) {
      pruned.push(n.id)
    }
  }

  // Remove edges involving pruned nodes
  const newEdges = edges.filter((e) => keptIds.has(e.from) && keptIds.has(e.to))

  // Renumber IDs
  const idMap = new Map<number, number>()
  for (let i = 0; i < kept.length; i++) {
    idMap.set(kept[i]!.id, i)
  }

  const remappedNodes = kept.map((n, i) => ({
    ...n,
    id: i,
  })) as any as MeshNode[]

  const remappedEdges = newEdges.map((e) => ({
    ...e,
    from: idMap.get(e.from)!,
    to: idMap.get(e.to)!,
  }))

  return {
    nodes: remappedNodes,
    edges: remappedEdges as readonly MeshEdge[],
    pruned: pruned as readonly number[],
  }
}

// Cluster mesh nodes: identify solution islands
export function clusterMesh(nodes: readonly MeshNode[], edges: readonly MeshEdge[]): readonly MeshCluster[] {
  const clusters: MeshCluster[] = []
  const visited = new Set<number>()

  // Simple clustering: BFS on high-similarity edges
  for (const startNode of nodes) {
    if (visited.has(startNode.id)) continue

    const cluster: number[] = [startNode.id]
    visited.add(startNode.id)
    const queue: number[] = [startNode.id]

    while (queue.length > 0) {
      const current = queue.shift()!
      for (const e of edges) {
        if (e.from === current && e.similarity > 1 / 2) {
          if (!visited.has(e.to)) {
            visited.add(e.to)
            cluster.push(e.to)
            queue.push(e.to)
          }
        }
      }
    }

    // Compute cluster center and quality
    const clusterNodes = nodes.filter((n) => cluster.includes(n.id))
    const center = new Array(nodes[0]!.solution.length)
    for (let d = 0; d < center.length; d++) {
      center[d] = clusterNodes.reduce((sum, n) => sum + n.solution[d]!, 0) / clusterNodes.length
    }

    const radius = max(...clusterNodes.map((n) => {
      let dist = 0
      for (let d = 0; d < center.length; d++) {
        const diff = n.solution[d]! - center[d]!
        dist += diff * diff
      }
      return sqrt(dist)
    }))

    const quality = clusterNodes.reduce((sum, n) => sum + n.value, 0) / clusterNodes.length

    clusters.push({
      nodes: cluster,
      center: center as readonly number[],
      radius,
      quality,
    })
  }

  return clusters
}

// Extract patterns: identify improvement paths, bifurcations, stagnations
export function extractPatterns(
  nodes: readonly MeshNode[],
  edges: readonly MeshEdge[],
  clusters: readonly MeshCluster[],
): readonly MeshPattern[] {
  const patterns: MeshPattern[] = []

  // Pattern 1: Improvement chains (edges with positive improvement)
  for (const e of edges) {
    if (e.improvement > 1 / 5) {
      const fromNode = nodes.find((n) => n.id === e.from)!
      const toNode = nodes.find((n) => n.id === e.to)!
      const direction = new Array(fromNode.solution.length)
      for (let d = 0; d < direction.length; d++) {
        direction[d] = toNode.solution[d]! - fromNode.solution[d]!
      }
      patterns.push({
        type: 'improvement',
        nodes: [e.from, e.to],
        direction: direction as readonly number[],
        confidence: abs(e.improvement),
      })
    }
  }

  // Pattern 2: Bifurcations (nodes with high-quality divergent neighbors)
  for (const node of nodes) {
    const neighbors = edges.filter((e) => e.from === node.id).map((e) => nodes.find((n) => n.id === e.to)!)
    if (neighbors.length >= 2) {
      const goodNeighbors = neighbors.filter((n) => n!.value < node.value)
      if (goodNeighbors.length >= 2) {
        const dirs = goodNeighbors.map((n) => {
          const dir = new Array(node.solution.length)
          for (let d = 0; d < node.solution.length; d++) {
            dir[d] = n!.solution[d]! - node.solution[d]!
          }
          return dir
        })

        // Average direction
        const avgDir = new Array(node.solution.length)
        for (let d = 0; d < avgDir.length; d++) {
          avgDir[d] = dirs.reduce((sum, dir) => sum + dir[d]!, 0) / dirs.length
        }

        patterns.push({
          type: 'bifurcation',
          nodes: [node.id, ...goodNeighbors.map((n) => n!.id)],
          direction: avgDir as readonly number[],
          confidence: goodNeighbors.length / neighbors.length,
        })
      }
    }
  }

  // Pattern 3: Stagnations (clusters with no outgoing improvement)
  for (const cluster of clusters) {
    const outgoing = edges.filter((e) => cluster.nodes.includes(e.from) && !cluster.nodes.includes(e.to))
    const improvingOutgoing = outgoing.filter((e) => e.improvement > 0)
    if (improvingOutgoing.length < outgoing.length / 2) {
      patterns.push({
        type: 'stagnation',
        nodes: cluster.nodes.slice(),
        direction: cluster.center.slice() as unknown as readonly number[],
        confidence: 1 - improvingOutgoing.length / max(outgoing.length, 1),
      })
    }
  }

  return patterns
}

// Recommend exploration: find unexplored regions near good solutions
export function recommendExploration(
  nodes: readonly MeshNode[],
  clusters: readonly MeshCluster[],
  patterns: readonly MeshPattern[],
  dimension: number,
  seed: number = 0,
): {
  readonly targets: readonly (readonly number[])[]
  readonly rationale: string
} {
  const targets: (readonly number[])[] = []

  // Exploration strategy 1: Extend improvement patterns
  for (const p of patterns) {
    if (p.type === 'improvement') {
      // Extrapolate
      const target = new Array(dimension)
      for (let d = 0; d < dimension; d++) {
        target[d] = nodes[p.nodes[1]!]!.solution[d]! + p.direction[d]! * 1 / 2
      }
      targets.push(target as readonly number[])
    }
  }

  // Exploration strategy 2: Jump between clusters
  if (clusters.length > 1) {
    for (let i = 0; i < clusters.length - 1; i++) {
      const c1 = clusters[i]!
      const c2 = clusters[i + 1]!
      const midpoint = new Array(dimension)
      for (let d = 0; d < dimension; d++) {
        midpoint[d] = (c1.center[d]! + c2.center[d]!) / 2
      }
      targets.push(midpoint as readonly number[])
    }
  }

  // Exploration strategy 3: Escape stagnation
  for (const p of patterns) {
    if (p.type === 'stagnation') {
      const escape = new Array(dimension)
      let s = seed
      for (let d = 0; d < dimension; d++) {
        s = (1664525 * s + 1013904223) % 4294967296
        const direction = ((s / 4294967296) * 2) - 1
        escape[d] = p.direction[d]! + direction * (1 / 2)
      }
      targets.push(escape as readonly number[])
    }
  }

  const rationale = `Found ${targets.length} targets via ${patterns.length} patterns (improvements: ${patterns.filter((p) => p.type === 'improvement').length}, bifurcations: ${patterns.filter((p) => p.type === 'bifurcation').length}, escapes: ${patterns.filter((p) => p.type === 'stagnation').length})`

  return { targets, rationale }
}

// Mesh quality metrics
export function assessMesh(nodes: readonly MeshNode[], edges: readonly MeshEdge[]): {
  readonly diversity: number
  readonly connectivity: number
  readonly convergence: number
} {
  // Diversity: average pairwise distance
  let totalDist = 0
  let count = 0
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      let dist = 0
      for (let d = 0; d < nodes[0]!.solution.length; d++) {
        const diff = nodes[i]!.solution[d]! - nodes[j]!.solution[d]!
        dist += diff * diff
      }
      totalDist += sqrt(dist)
      count++
    }
  }
  const diversity = count > 0 ? totalDist / count : 0

  // Connectivity: average edges per node
  const connectivity = nodes.length > 0 ? (edges.length * 2) / nodes.length : 0

  // Convergence: ratio of best to avg value
  const best = min(...nodes.map((n) => n.value))
  const avg = nodes.reduce((sum, n) => sum + n.value, 0) / nodes.length
  const convergence = abs(avg - best) / max(abs(avg), 1)

  return { diversity, connectivity, convergence }
}
