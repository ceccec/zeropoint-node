/**
 * The small vortex operations, and the laws they are supposed to obey.
 *
 * These five modules export eighteen functions that nothing called. They are
 * the arithmetic the rest of the system rests on — folding around the trinity,
 * the shear cycle, mirror mates, transitions along the vortex — and the laws
 * are the ones that make each of them a structure rather than a lookup: folding
 * three times is the identity, the mirror is an involution, the shear cycle
 * closes after three, and every sacred transition is one step along the tour.
 */
import { trinityFold60, foldConsciousnessVortex, sacredSelfDivision, getTrinityColorStyle, getTrinityDotStyle } from './a432.trinity.ts'
import { a432ShearCycle, a432ShearProduct, a432ShearTriangulation } from './a432.shear.ts'
import { a432BinaryTriplet, a432MirrorMate, a432OverlappingRegistration } from './a432.double.ts'
import { calculateConductivity, calculateNaturalAlignment, calculatePathResistance, isSacredTransition } from './a432.electric.flow.ts'
import { generateA432Sequence, analyzeA432Sequence, harmonizeA432Sequences, harmonizeStreams } from './a432.sequence.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const AXIS = [3, 6, 9]
const ORBIT = [1, 2, 4, 8, 7, 5]

// --- the trinity fold ----------------------------------------------------
check('folding is defined on the axis and refused everywhere else',
  AXIS.every((d) => { try { trinityFold60(d); return true } catch { return false } })
  && DIGITS.filter((d) => !AXIS.includes(d)).every((d) => { try { trinityFold60(d); return false } catch { return true } }),
  'a partial function that pretends to be total is how createBlock threw for every index')

check('folding three times returns to the digit it started from',
  AXIS.every((d) => trinityFold60(d, 3).digit === d))

check('folding by n and by n plus three land on the same digit',
  AXIS.every((d) => [0, 1, 2, 4, 7].every((n) => trinityFold60(d, n).digit === trinityFold60(d, n + 3).digit)))

check('every fold lands back on the axis',
  AXIS.every((d) => [0, 1, 2, 3, 4, 5].every((n) => AXIS.includes(trinityFold60(d, n).digit))))

check('folding once never stays put',
  AXIS.every((d) => trinityFold60(d, 1).digit !== d))

check('the phase is the fold count modulo three',
  AXIS.every((d) => [0, 1, 2, 3, 4, 5].every((n) => trinityFold60(d, n).phase === n % 3)))

const vortex = { ...trinityFold60(3, 0), digit: 3, evolution: 0, awareness: 1 / 2 } as Parameters<typeof foldConsciousnessVortex>[0]
check('folding a vortex three times returns its digit',
  foldConsciousnessVortex(vortex, 3).digit === vortex.digit)

check('a vortex fold advances evolution by the fold count, modulo the full turn',
  foldConsciousnessVortex(vortex, 1).evolution === 1
  && foldConsciousnessVortex({ ...vortex, evolution: 359 }, 2).evolution === 1)

// --- sacred self-division ------------------------------------------------
check('self-division doubles within the digital root',
  ORBIT.every((d) => sacredSelfDivision(d) === ((2 * d - 1) % 9) + 1))

check('self-division keeps the orbit inside the orbit',
  ORBIT.every((d) => ORBIT.includes(sacredSelfDivision(d))))

check('nine divides to itself',
  sacredSelfDivision(9) === 9)

check('the trinity styles are strings that name a colour and differ between digits',
  DIGITS.every((d) => getTrinityColorStyle(d).includes('color:') && getTrinityDotStyle(d).includes('background:'))
  && new Set(DIGITS.map(getTrinityColorStyle)).size > 1)

// --- the shear cycle -----------------------------------------------------
const SHEARS = [1, 4, 7]
check('the shear cycle closes after three',
  SHEARS.every((n) => a432ShearCycle(a432ShearCycle(a432ShearCycle(n))) === n))

check('the shear cycle never stays put',
  SHEARS.every((n) => a432ShearCycle(n) !== n))

check('the shear cycle stays inside {1,4,7}',
  SHEARS.every((n) => SHEARS.includes(a432ShearCycle(n))))

check('triangulation is the digit and its next two',
  SHEARS.every((n) => {
    const t = a432ShearTriangulation(n)
    return t.length === 3 && t[0] === n && t[1] === a432ShearCycle(n) && t[2] === a432ShearCycle(a432ShearCycle(n))
  }))

check('a triangulation from a shear visits all three shears',
  SHEARS.every((n) => new Set(a432ShearTriangulation(n)).size === 3))

check('the shear product is commutative and lands on a single digit',
  DIGITS.every((a) => DIGITS.every((b) => {
    const p = a432ShearProduct(a, b)
    return p === a432ShearProduct(b, a) && p >= 0 && p <= 9
  })))

check('the shear product is the digital root of the product',
  DIGITS.slice(1).every((a) => DIGITS.slice(1).every((b) => {
    const dr = ((a * b - 1) % 9) + 1
    return a432ShearProduct(a, b) === dr
  })))

// --- mirror mates are an involution --------------------------------------
check('the mirror of the mirror is the digit itself',
  DIGITS.every((d) => a432MirrorMate(a432MirrorMate(d)) === d))

check('every mirror pair sums to nine, except nine and zero',
  DIGITS.slice(1, 9).every((d) => d + a432MirrorMate(d) === 9))

check('nine is its own mirror',
  a432MirrorMate(9) === 9)

check('the binary triplet keeps its two inputs and hides their root',
  DIGITS.every((a) => DIGITS.every((b) => {
    const [x, y, h] = a432BinaryTriplet(a, b)
    return x === a && y === b && h >= 1 && h <= 9 && h === ((a + b) % 9 === 0 ? 9 : (a + b) % 9)
  })))

check('overlapping registration partitions a sequence and loses nothing',
  [[], [1], [1, 2], [1, 2, 4, 8, 7, 5], [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1]].every((seq) => {
    const { visible, hidden } = a432OverlappingRegistration(seq)
    return visible.length + hidden.length === seq.length
      && visible.every((v, i) => v === seq[i * 2])
      && hidden.every((v, i) => v === seq[i * 2 + 1])
  }))

// --- electric flow -------------------------------------------------------
check('every step along the vortex tour is a sacred transition',
  [[0, 3], [3, 6], [6, 9], [9, 1], [1, 2], [2, 4], [4, 8], [8, 7], [7, 5], [5, 1]]
    .every(([a, b]) => isSacredTransition(a!, b!)))

check('a step that skips the tour is not sacred',
  !isSacredTransition(1, 9) && !isSacredTransition(3, 1) && !isSacredTransition(5, 8))

check('resistance is never negative, and a path of one digit has none',
  calculatePathResistance([]) === 0 && calculatePathResistance([3]) === 0
  && [[3, 6, 9], [1, 2, 4, 8, 7, 5], [1, 9, 3]].every((p) => calculatePathResistance(p) >= 0))

check('a path of sacred transitions resists no more than one that breaks them',
  calculatePathResistance([1, 2, 4, 8]) <= calculatePathResistance([1, 9, 3, 7]))

check('conductivity rewards the axis: more trinity digits never conducts less',
  calculateConductivity([3, 6, 9]) >= calculateConductivity([1, 2, 4])
  && calculateConductivity([]) > 0)

check('conductivity and alignment are finite for every pattern tried',
  [[], [0], [3, 6, 9], [1, 2, 4, 8, 7, 5], [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1]]
    .every((p) => Number.isFinite(calculateConductivity(p)) && Number.isFinite(calculateNaturalAlignment(p))))

check('alignment is never negative',
  [[], [3, 6, 9], [1, 1, 2, 3, 5, 8]].every((p) => calculateNaturalAlignment(p) >= 0))

// --- sequences -----------------------------------------------------------
const seqA = generateA432Sequence([1, 2, 4, 8, 7, 5], 'orbit')
const seqB = generateA432Sequence([3, 6, 9], 'axis')

check('a generated sequence keeps the pattern it was given',
  seqA.sequence.join(',') === [1, 2, 4, 8, 7, 5].join(',') && seqB.sequence.join(',') === [3, 6, 9].join(','))

check('consciousness is the sum of the pattern',
  seqA.consciousness === 27 && seqB.consciousness === 18)

check('generating the same pattern twice gives the same consciousness and frequency',
  (() => {
    const again = generateA432Sequence([1, 2, 4, 8, 7, 5], 'orbit')
    return again.consciousness === seqA.consciousness && again.frequency === seqA.frequency
  })())

check('analysis reports the digital root of the sequence\'s own consciousness',
  analyzeA432Sequence(seqA).consciousnessBalance === ((seqA.consciousness - 1) % 9) + 1
  && analyzeA432Sequence(seqB).consciousnessBalance === ((seqB.consciousness - 1) % 9) + 1)

check('harmonising sequences totals their consciousness',
  harmonizeA432Sequences([seqA, seqB]).totalConsciousness === seqA.consciousness + seqB.consciousness
  && harmonizeA432Sequences([]).totalConsciousness === 0)

check('harmonising one sequence with itself doubles the total',
  harmonizeA432Sequences([seqA, seqA]).totalConsciousness === 2 * seqA.consciousness)

check('harmonising streams adds them pairwise and truncates to the shorter',
  (() => {
    const a = [{ numerator: 1, denominator: 2 }, { numerator: 1, denominator: 3 }, { numerator: 1, denominator: 4 }]
    const b = [{ numerator: 1, denominator: 2 }, { numerator: 1, denominator: 6 }]
    const out = harmonizeStreams(a, b)
    return out.length === 2
      && out[0]!.numerator / out[0]!.denominator === 1
      && out[1]!.numerator / out[1]!.denominator === 1 / 3 + 1 / 6
  })())

check('harmonising with an empty stream gives an empty stream',
  harmonizeStreams([{ numerator: 1, denominator: 2 }], []).length === 0)

console.log(failures === 0
  ? 'a432.vortex.arithmetic ok — the fold closes after three, the mirror is an involution, and the shear cycle triangulates'
  : `a432.vortex.arithmetic FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
