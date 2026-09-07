/**
 * What the polarity lattice is, and — kept deliberately — what it is not.
 *
 * The refusals below are the point. This module was named vector-equilibrium.ts
 * on the strength of a vertex count, and two peers took the claim apart from
 * opposite ends. Both refutations are asserted here so the name cannot come
 * back without the geometry coming with it.
 */
import {
  LATTICE_BITS, LATTICE_CELLS, LATTICE_STATES, LATTICE_DEGREE,
  CUBOCTAHEDRON_NEIGHBOUR_EDGES,
  latticeState, latticeIndex, latticeFromIndex, latticeNeighbours, latticeDegree,
  latticeTranslate, latticeFlip, latticeAllStates, latticeIsConnected,
  edgesAmongNeighbours, cubeNeighbours, cubeIsVertexTransitive, orbitCount,
  latticePart, latticeIsBipartite, adjacencyIgnoresPolarity, polaritiesAreTwins,
} from './polarity-lattice.ts'
import { createChecker } from '../verification/harness.ts'

const checker = createChecker('polarity-lattice')

// ── the space ──────────────────────────────────────────────────────────────
checker.check('six bits give sixty-four cells', LATTICE_CELLS, 64)
checker.check('polarity doubles them into states', LATTICE_STATES, 128)
checker.check('index and state are inverses',
  latticeAllStates().every((s) => latticeIndex(latticeFromIndex(latticeIndex(s))) === latticeIndex(s)), true)

// ── twelve, uniformly ──────────────────────────────────────────────────────
checker.check('every state has exactly twelve neighbours',
  [...new Set(latticeAllStates().map(latticeDegree))], [LATTICE_DEGREE])
checker.check('no state is its own neighbour',
  latticeAllStates().every((s) => !latticeNeighbours(s).some((n) => latticeIndex(n) === latticeIndex(s))), true)
checker.check('every state is reachable from every other', latticeIsConnected(), true)

/**
 * ── REFUSAL ONE: this is not a vector equilibrium ──────────────────────────
 *
 * A cuboctahedron's twelve vertices carry 24 edges among themselves, each
 * vertex meeting four others. Here they carry none: flipping two different bits
 * lands two bits apart, and two bits apart is not adjacent. The neighbourhood
 * is an independent set. Twelve is a count, and a count is not a solid.
 */
{
  const sample = [0, 1, 42, 63].map((c) => latticeState(c, 0))
  checker.check('the twelve neighbours have no edges among them',
    sample.map(edgesAmongNeighbours), [0, 0, 0, 0])
  checker.check('a cuboctahedron would have twenty-four',
    edgesAmongNeighbours(latticeState(0, 0)) === CUBOCTAHEDRON_NEIGHBOUR_EDGES, false)
  checker.check('so the vertex count matches and the geometry does not',
    LATTICE_DEGREE === 12 && edgesAmongNeighbours(latticeState(0, 0)) !== CUBOCTAHEDRON_NEIGHBOUR_EDGES, true)
}

/**
 * ── REFUSAL TWO: the polarity did not buy the transitivity ─────────────────
 *
 * The undoubled 6-cube is already vertex-transitive. So a negative arm showing
 * the degree falling from twelve to six proves the degree changed and nothing
 * about the property. Compute the property WITHOUT the mechanism.
 */
{
  checker.check('the undoubled cube is six-regular',
    [...new Set([...Array(LATTICE_CELLS).keys()].map((c) => cubeNeighbours(c).length))], [LATTICE_BITS])
  checker.check('and is ALREADY vertex-transitive before any polarity', cubeIsVertexTransitive(), true)
  checker.check('so the doubling changed the degree, not the transitivity',
    LATTICE_BITS !== LATTICE_DEGREE && cubeIsVertexTransitive(), true)
}

/**
 * ── REFUSAL THREE: exclusive-or alone is not transitive here ───────────────
 *
 * 64 translations over 128 states leave two orbits, one per polarity class. The
 * flip is the generator that joins them, and it is an automorphism because
 * adjacency depends only on the cell. The earlier suite asserted only the
 * exclusive-or half and called the result transitive.
 */
{
  checker.check('exclusive-or alone leaves two orbits',
    orbitCount([...Array(LATTICE_CELLS).keys()].map((by) => (s) => latticeTranslate(s, by))), 2)
  checker.check('adding the polarity flip leaves one',
    orbitCount([...[...Array(LATTICE_CELLS).keys()].map((by) => (s) => latticeTranslate(s, by)), latticeFlip]), 1)

  let flipIsAutomorphism = true
  for (const s of latticeAllStates()) {
    const moved = new Set(latticeNeighbours(s).map((n) => latticeIndex(latticeFlip(n))))
    const direct = new Set(latticeNeighbours(latticeFlip(s)).map(latticeIndex))
    if (moved.size !== direct.size || [...moved].some((i) => !direct.has(i))) flipIsAutomorphism = false
  }
  checker.check('the flip carries neighbours onto neighbours', flipIsAutomorphism, true)
  checker.check('the polarity twin is not among the twelve',
    latticeNeighbours(latticeState(21, 0)).some((n) => latticeIndex(n) === latticeIndex(latticeFlip(latticeState(21, 0)))), false)
}

// ── the guards say no, and say yes ─────────────────────────────────────────
{
  const refuses = (f: () => unknown) => { try { f(); return false } catch { return true } }
  checker.check('a cell past the lattice is refused', refuses(() => latticeState(64, 0)), true)
  checker.check('a polarity that is not 0 or 1 is refused', refuses(() => latticeState(0, 2 as 0 | 1)), true)
  checker.check('an index past the states is refused', refuses(() => latticeFromIndex(LATTICE_STATES)), true)
  checker.check('a translation past the lattice is refused', refuses(() => latticeTranslate(latticeState(0, 0), 64)), true)
  checker.check('and a valid state is not refused', refuses(() => latticeState(63, 1)), false)
}

/**
 * ── WHAT IT IS, since naming what a thing is not leaves it unnamed ─────────
 *
 * millennium-solutions replaced a degree theorem of their own with one that
 * says WHICH GRAPH, after this same finding. The same move applies here.
 */
{
  checker.check('adjacency depends only on the cells', adjacencyIgnoresPolarity(), true)
  checker.check('so the two polarities of a cell are twins', polaritiesAreTwins(), true)
  checker.check('and the blow-up inherits the cube\'s bipartition', latticeIsBipartite(), true)
  checker.check('with the parts equal',
    latticeAllStates().filter((s) => latticePart(s) === 0).length, LATTICE_STATES / 2)

  // A twin pair is the strongest form of the retraction: a label that changes
  // no adjacency cannot be what makes the structure what it is.
  checker.check('the twins are not adjacent to each other',
    latticeNeighbours(latticeState(9, 0)).some((n) => latticeIndex(n) === latticeIndex(latticeFlip(latticeState(9, 0)))), false)
}

checker.report()
