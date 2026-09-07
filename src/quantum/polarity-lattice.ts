/**
 * polarity-lattice.ts — the 6-cube doubled by polarity, and what it is NOT.
 *
 * THIS FILE WAS CALLED vector-equilibrium.ts AND THE NAME WAS A CLAIM I COULD
 * NOT SUPPORT. It is kept here as the finding rather than deleted, because the
 * count that suggested it is real and the conclusion drawn from the count was
 * not.
 *
 * WHAT IS TRUE. A state is a six-bit cell together with a polarity. Flipping
 * any bit reaches a cell, and that cell at EITHER polarity is a neighbour, so
 * six positions become twelve moves:
 *
 *   states                    128   64 cells x 2 polarities
 *   neighbours per state       12   uniform, every one
 *   connectivity              one component
 *   automorphisms             exclusive-or by any cell, AND the polarity flip
 *
 * Twelve is the number of spheres a sphere touches in the closest packing, and
 * that is what made a vector equilibrium look like the answer.
 *
 * WHAT IS FALSE, AND BOTH HALVES WERE CAUGHT BY PEERS RATHER THAN BY ME.
 *
 * IT IS NOT A VECTOR EQUILIBRIUM. A cuboctahedron's twelve vertices are each
 * adjacent to four others — 24 edges among them. The twelve neighbours here
 * have ZERO edges among them: two states reached by flipping different bits
 * differ in two bits, and two bits apart is not adjacent. The neighbourhood is
 * an independent set. What this is, exactly, is the 6-cube with every vertex
 * doubled into a non-adjacent twin. The vertex count of a cuboctahedron
 * without any of its geometry, and a count is not a solid.
 *
 * THE POLARITY DID NOT BUY THE TRANSITIVITY. The undoubled 6-cube is already
 * vertex-transitive: 64 cells, degree 6, exclusive-or acting transitively. So
 * doubling took a transitive structure and made another one. A negative arm
 * showing the degree falls from 12 to 6 proves the degree changed; it does not
 * prove the mechanism produced the property, and the property was what was
 * being claimed. millennium-solutions put it exactly: "polarity bought
 * transitivity" and "polarity doubled a neighbourhood that was already
 * transitive" look identical from inside a passing suite, and only the
 * undoubled case tells them apart.
 *
 * AND THE TRANSITIVITY NEEDED THE FLIP. uuidna-27 asked whether exclusive-or
 * alone is transitive on 128 states. It is not — 64 elements give two orbits of
 * 64, one per polarity class. The polarity flip is also an automorphism, since
 * adjacency depends only on the cell, so the full group IS transitive; but the
 * suite had asserted only the exclusive-or half and its "any two states"
 * check was trivially true. A claim can rest on a group being bigger than the
 * one you tested.
 *
 * THE RULE THIS LEAVES, which is the only part worth carrying elsewhere:
 * before crediting a mechanism with a property, compute the property WITHOUT
 * the mechanism.
 */

export const LATTICE_BITS = 6
export const LATTICE_CELLS = 1 << LATTICE_BITS
/** Twice the cells, because polarity is part of the state. */
export const LATTICE_STATES = LATTICE_CELLS * 2
/** Twelve: six bit positions, each offering both polarities. */
export const LATTICE_DEGREE = LATTICE_BITS * 2
/** A cuboctahedron's twelve vertices carry 24 edges. This lattice's carry none. */
export const CUBOCTAHEDRON_NEIGHBOUR_EDGES = 24

export interface LatticeState {
  readonly cell: number
  readonly polarity: 0 | 1
}

const inRange = (n: number, hi: number) => Number.isInteger(n) && n >= 0 && n < hi

export function latticeState(cell: number, polarity: 0 | 1): LatticeState {
  if (!inRange(cell, LATTICE_CELLS)) throw new Error(`polarity-lattice: cell ${cell} is outside 0..${LATTICE_CELLS - 1}`)
  if (polarity !== 0 && polarity !== 1) throw new Error(`polarity-lattice: polarity ${polarity} is not 0 or 1`)
  return { cell, polarity }
}

export const latticeIndex = (s: LatticeState): number => s.cell * 2 + s.polarity
export const latticeFromIndex = (i: number): LatticeState => {
  if (!inRange(i, LATTICE_STATES)) throw new Error(`polarity-lattice: index ${i} is outside 0..${LATTICE_STATES - 1}`)
  return { cell: i >> 1, polarity: (i & 1) as 0 | 1 }
}

/** The twelve. Both polarities of each bit-flipped cell. */
export function latticeNeighbours(s: LatticeState): readonly LatticeState[] {
  const out: LatticeState[] = []
  for (let b = 0; b < LATTICE_BITS; b += 1) {
    const cell = s.cell ^ (1 << b)
    out.push({ cell, polarity: 0 })
    out.push({ cell, polarity: 1 })
  }
  return out
}

export const latticeDegree = (s: LatticeState): number =>
  new Set(latticeNeighbours(s).map(latticeIndex)).size

/** Exclusive-or by a cell. Preserves polarity, so on its own it has two orbits. */
export const latticeTranslate = (s: LatticeState, by: number): LatticeState => {
  if (!inRange(by, LATTICE_CELLS)) throw new Error(`polarity-lattice: translation ${by} is outside 0..${LATTICE_CELLS - 1}`)
  return { cell: s.cell ^ by, polarity: s.polarity }
}

/** The other generator. Adjacency ignores polarity, so this is an automorphism. */
export const latticeFlip = (s: LatticeState): LatticeState =>
  ({ cell: s.cell, polarity: (1 - s.polarity) as 0 | 1 })

/**
 * How many edges run between a state's own neighbours. Zero here, 24 in a
 * cuboctahedron — the measurement that refused the name this file used to have.
 */
export function edgesAmongNeighbours(s: LatticeState): number {
  const n = latticeNeighbours(s).map(latticeIndex)
  const adjacent = (a: number, b: number) =>
    latticeNeighbours(latticeFromIndex(a)).some((x) => latticeIndex(x) === b)
  let edges = 0
  for (let i = 0; i < n.length; i += 1) {
    for (let j = i + 1; j < n.length; j += 1) if (adjacent(n[i]!, n[j]!)) edges += 1
  }
  return edges
}

/** The undoubled 6-cube, kept so the doubling can be compared against nothing. */
export const cubeNeighbours = (cell: number): readonly number[] => {
  if (!inRange(cell, LATTICE_CELLS)) throw new Error(`polarity-lattice: cell ${cell} is outside 0..${LATTICE_CELLS - 1}`)
  const out: number[] = []
  for (let b = 0; b < LATTICE_BITS; b += 1) out.push(cell ^ (1 << b))
  return out
}

/**
 * Is exclusive-or transitive on the cells alone? Yes — which is why the
 * doubling cannot be credited with the transitivity of the doubled space.
 */
export function cubeIsVertexTransitive(): boolean {
  for (let by = 0; by < LATTICE_CELLS; by += 1) {
    for (let c = 0; c < LATTICE_CELLS; c += 1) {
      const moved = new Set(cubeNeighbours(c).map((x) => x ^ by))
      const direct = new Set(cubeNeighbours(c ^ by))
      if (moved.size !== direct.size) return false
      for (const x of moved) if (!direct.has(x)) return false
    }
  }
  return true
}

export function latticeAllStates(): readonly LatticeState[] {
  const out: LatticeState[] = []
  for (let i = 0; i < LATTICE_STATES; i += 1) out.push(latticeFromIndex(i))
  return out
}

/** Orbits under a generator set, so "transitive" is counted rather than asserted. */
export function orbitCount(generators: readonly ((s: LatticeState) => LatticeState)[]): number {
  const seen = new Set<number>()
  let orbits = 0
  for (const start of latticeAllStates()) {
    if (seen.has(latticeIndex(start))) continue
    orbits += 1
    const queue = [start]
    seen.add(latticeIndex(start))
    while (queue.length > 0) {
      const at = queue.pop()!
      for (const g of generators) {
        const to = g(at)
        if (!seen.has(latticeIndex(to))) { seen.add(latticeIndex(to)); queue.push(to) }
      }
    }
  }
  return orbits
}

export function latticeIsConnected(): boolean {
  const seen = new Set<number>([0])
  const queue: number[] = [0]
  while (queue.length > 0) {
    const at = queue.pop()!
    for (const n of latticeNeighbours(latticeFromIndex(at))) {
      const i = latticeIndex(n)
      if (!seen.has(i)) { seen.add(i); queue.push(i) }
    }
  }
  return seen.size === LATTICE_STATES
}
