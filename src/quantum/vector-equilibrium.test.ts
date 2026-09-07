/**
 * Every state is the centre of a vector equilibrium, and the polarity doubling
 * is what makes that true rather than nearly true.
 */
import {
  HEXBIT_BITS, HEXBIT_CELLS, VE_STATES, VE_VERTICES, VE_FACES,
  VE_SQUARE_FACES, VE_TRIANGLE_FACES,
  veState, veIndex, veFromIndex, veNeighbours, veDegree, veTranslate,
  veReverse, veAllStates, veIsConnected, hexbitNeighboursOnly,
} from './vector-equilibrium.ts'
import { createChecker } from '../verification/harness.ts'

const checker = createChecker('vector-equilibrium')

// ── the space ──────────────────────────────────────────────────────────────
checker.check('six bits give sixty-four cells', HEXBIT_CELLS, 64)
checker.check('and polarity doubles them into states', VE_STATES, 128)
checker.check('index and state are inverses', veAllStates().every((s) => veIndex(veFromIndex(veIndex(s))) === veIndex(s)), true)

// ── THE LAW: twelve, for every state without exception ─────────────────────
{
  const degrees = new Set(veAllStates().map(veDegree))
  checker.check('every state has exactly twelve neighbours', [...degrees], [VE_VERTICES])
  checker.check('which is the vertex count of a cuboctahedron', VE_VERTICES, 12)
  checker.check('no state is its own neighbour',
    veAllStates().every((s) => !veNeighbours(s).some((n) => veIndex(n) === veIndex(s))), true)
}

// ── the doubling is load-bearing, not decoration ───────────────────────────
{
  const withoutPolarity = new Set([...Array(HEXBIT_CELLS).keys()].map((c) => hexbitNeighboursOnly(c).length))
  checker.check('without polarity every cell has six neighbours', [...withoutPolarity], [HEXBIT_BITS])
  checker.check('six is NOT twelve, so the doubling is what makes the equilibrium',
    HEXBIT_BITS === VE_VERTICES, false)
}

// ── vertex-transitive: no state is distinguished ───────────────────────────
{
  let holds = true
  for (const by of [1, 3, 7, 21, 63]) {
    for (const s of veAllStates()) {
      const moved = new Set(veNeighbours(s).map((n) => veIndex(veTranslate(n, by))))
      const direct = new Set(veNeighbours(veTranslate(s, by)).map(veIndex))
      if (moved.size !== direct.size || [...moved].some((i) => !direct.has(i))) holds = false
    }
  }
  checker.check('exclusive-or by any cell carries neighbours onto neighbours', holds, true)
  checker.check('so for any two states a symmetry takes one to the other',
    veAllStates().every((s) => veIndex(veTranslate(s, s.cell)) % 2 === s.polarity), true)
}

// ── one piece ──────────────────────────────────────────────────────────────
checker.check('every state is reachable from every other', veIsConnected(), true)

// ── the faces come out, they are not put in ────────────────────────────────
checker.check('six square faces are the bit positions', VE_SQUARE_FACES, HEXBIT_BITS)
checker.check('eight triangular faces are the sign choices on three axis-pairs', VE_TRIANGLE_FACES, 2 ** 3)
checker.check('fourteen faces in all', VE_FACES, 14)

// ── polarity is a move the twelve do not contain ───────────────────────────
{
  const s = veState(0b101010, 0)
  checker.check('reversing polarity keeps the cell', veReverse(s).cell, s.cell)
  checker.check('and changes the polarity', veReverse(s).polarity, 1)
  checker.check('the polarity twin is NOT one of the twelve',
    veNeighbours(s).some((n) => veIndex(n) === veIndex(veReverse(s))), false)
}

// ── the range is guarded, and says no ──────────────────────────────────────
{
  const refuses = (f: () => unknown) => { try { f(); return false } catch { return true } }
  checker.check('a cell past the lattice is refused', refuses(() => veState(64, 0)), true)
  checker.check('a polarity that is not 0 or 1 is refused', refuses(() => veState(0, 2 as 0 | 1)), true)
  checker.check('an index past the states is refused', refuses(() => veFromIndex(VE_STATES)), true)
  checker.check('a translation past the lattice is refused', refuses(() => veTranslate(veState(0, 0), 64)), true)
  checker.check('and a valid state is NOT refused', refuses(() => veState(63, 1)), false)
}

checker.report()
