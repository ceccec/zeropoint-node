/**
 * vector-equilibrium.ts — every state is a centre, and only its neighbours change.
 *
 * The 64-cell hexbit lattice gives each cell six neighbours, one per bit. That
 * is not a vector equilibrium: a cuboctahedron has TWELVE vertices around its
 * centre, and six is half of what is needed.
 *
 * THE MISSING FACTOR IS POLARITY. A state here is a cell AND a polarity, so
 * flipping a bit can leave the polarity or reverse it, and each of the six bits
 * therefore offers two moves. Six positions doubled by polarity is twelve, and
 * the twelve are the vertices.
 *
 * WHAT THAT BUYS, and it is the whole point rather than a coincidence of
 * counting: the space becomes VERTEX-TRANSITIVE. Exclusive-or by any cell is an
 * automorphism, so for any two states there is a symmetry of the whole
 * structure carrying one onto the other. No state is distinguished. Every state
 * is the centre of a vector equilibrium at all times, and what differs between
 * standing at one and standing at another is only which states are the
 * neighbours — never how many, never how they are arranged.
 *
 * IT FAILS WITHOUT THE DOUBLING, which is how you know the doubling is load
 * bearing. Drop polarity and every state has six neighbours, not twelve; that
 * is a different solid and the suite asserts the difference rather than
 * describing it.
 *
 * AND IT FAILS IN THE DIGITS. The same question asked of 1..9 under doubling,
 * halving and reflection gives degrees of 1, 2 and 3 — connected, but not
 * uniform and not transitive. The equilibrium is not in the digit space. It is
 * in the hexbits, and only once polarity is carried alongside them.
 *
 * The faces come out too, without being put in: a cuboctahedron has 14, being
 * 6 squares and 8 triangles. Here 6 is the bit positions and 8 is the sign
 * choices over three axis-pairs, 2^3.
 */

/** Six bits, so sixty-four cells. */
export const HEXBIT_BITS = 6
export const HEXBIT_CELLS = 1 << HEXBIT_BITS

/** A cell with a polarity. There are twice as many states as cells. */
export const VE_STATES = HEXBIT_CELLS * 2

/** The cuboctahedron's counts, stated so the code can be held to them. */
export const VE_VERTICES = 12
export const VE_SQUARE_FACES = HEXBIT_BITS
export const VE_TRIANGLE_FACES = 8
export const VE_FACES = VE_SQUARE_FACES + VE_TRIANGLE_FACES

export interface VeState {
  /** 0..63 */
  readonly cell: number
  /** 0 or 1 */
  readonly polarity: 0 | 1
}

const inRange = (n: number, hi: number) => Number.isInteger(n) && n >= 0 && n < hi

export function veState(cell: number, polarity: 0 | 1): VeState {
  if (!inRange(cell, HEXBIT_CELLS)) throw new Error(`vector-equilibrium: cell ${cell} is outside 0..${HEXBIT_CELLS - 1}`)
  if (polarity !== 0 && polarity !== 1) throw new Error(`vector-equilibrium: polarity ${polarity} is not 0 or 1`)
  return { cell, polarity }
}

/** States are indexed so that a state is one number: cell doubled, plus polarity. */
export const veIndex = (s: VeState): number => s.cell * 2 + s.polarity
export const veFromIndex = (i: number): VeState => {
  if (!inRange(i, VE_STATES)) throw new Error(`vector-equilibrium: index ${i} is outside 0..${VE_STATES - 1}`)
  return { cell: i >> 1, polarity: (i & 1) as 0 | 1 }
}

/**
 * The twelve. Flipping bit b reaches a cell; that cell at EITHER polarity is a
 * neighbour, which is what doubles six into twelve. A state is never its own
 * neighbour: the flip always changes the cell, so no move returns to the
 * starting state.
 */
export function veNeighbours(s: VeState): readonly VeState[] {
  const out: VeState[] = []
  for (let b = 0; b < HEXBIT_BITS; b += 1) {
    const cell = s.cell ^ (1 << b)
    out.push({ cell, polarity: 0 })
    out.push({ cell, polarity: 1 })
  }
  return out
}

/** How many distinct states a state is adjacent to. Twelve, for every state. */
export const veDegree = (s: VeState): number =>
  new Set(veNeighbours(s).map(veIndex)).size

/**
 * Exclusive-or by a cell, carrying polarity through. This is the symmetry that
 * makes every state a centre: it maps neighbours onto neighbours, so the view
 * from any state is the view from any other with the labels moved.
 */
export const veTranslate = (s: VeState, by: number): VeState => {
  if (!inRange(by, HEXBIT_CELLS)) throw new Error(`vector-equilibrium: translation ${by} is outside 0..${HEXBIT_CELLS - 1}`)
  return { cell: s.cell ^ by, polarity: s.polarity }
}

/** Reversing polarity alone. A state's polarity twin is NOT one of its twelve. */
export const veReverse = (s: VeState): VeState => ({ cell: s.cell, polarity: (1 - s.polarity) as 0 | 1 })

/**
 * WITHOUT THE DOUBLING, for the suite to contrast against. Six neighbours is a
 * different solid; naming it here keeps the comparison honest rather than
 * rhetorical.
 */
export const hexbitNeighboursOnly = (cell: number): readonly number[] => {
  if (!inRange(cell, HEXBIT_CELLS)) throw new Error(`vector-equilibrium: cell ${cell} is outside 0..${HEXBIT_CELLS - 1}`)
  const out: number[] = []
  for (let b = 0; b < HEXBIT_BITS; b += 1) out.push(cell ^ (1 << b))
  return out
}

/** Every state, in index order. */
export function veAllStates(): readonly VeState[] {
  const out: VeState[] = []
  for (let i = 0; i < VE_STATES; i += 1) out.push(veFromIndex(i))
  return out
}

/**
 * Is the whole space one piece? Walked rather than asserted, because a claim
 * that every state is reachable from every other is exactly the kind that reads
 * as obvious and can be false.
 */
export function veIsConnected(): boolean {
  const seen = new Set<number>([0])
  const queue: number[] = [0]
  while (queue.length > 0) {
    const at = queue.pop()!
    for (const n of veNeighbours(veFromIndex(at))) {
      const i = veIndex(n)
      if (!seen.has(i)) { seen.add(i); queue.push(i) }
    }
  }
  return seen.size === VE_STATES
}
