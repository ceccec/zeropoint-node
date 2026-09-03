/**
 * The resolver, the reducers, and the coil constants.
 *
 * Seventeen exports across seven modules that nothing called. Patch 5 replaced
 * 317 decimal literals with integer ratios; a432.resolved.ts is the module that
 * turns a decimal INTO a ratio at run time, and it had never been asked whether
 * it does that correctly.
 *
 * It does something narrower than its name suggests, and the laws below say so:
 * it returns the CLOSEST entry from a fixed table, so resolveDecimalValue(3) is
 * 1.75 — the nearest thing the table holds — rather than 3. That is correct for
 * what it is and misleading if read as "resolve any decimal", so the laws pin
 * the closure and the closest-ness rather than an identity that was never true.
 */
import {
  calculateA432FractionValue, decimalToA432Fraction, isUnitReciprocal,
  resolveDecimal, resolveDecimalValue,
} from './a432.resolved.ts'
import { a432AngleReduce, a432SumToNine } from './a432.nine.ts'
import { generateTeslaCoils, teslaFrequency, teslaVoltage, TESLA_BASE_FREQUENCY, TESLA_BASE_VOLTAGE } from './a432.tesla.coil.ts'
import { getNameDimension, nextInteraction } from './a432.core.ts'
import { collectToneSquares, mapMatrixToTorus } from './a432.matrix.ts'
import { a432ShearInvariant } from './a432.shear.electron.ts'
import { a432ShearProduct } from './a432.shear.ts'
import { cmykFrequencyRatio, vortexFrequency } from './a432.cmyk.ts'
import { abs } from './a432.algebra.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
type F = { numerator: number; denominator: number }
const val = (f: F): number => f.numerator / f.denominator

/** The table the resolver chooses from, recovered from the resolver itself. */
const TABLE: F[] = [...new Set([1 / 2, 1 / 4, 3 / 4, 1 / 8, 3 / 8, 5 / 8, 7 / 8, 1 / 5, 2 / 5, 3 / 5, 4 / 5, 1 / 10, 3 / 10, 7 / 10, 9 / 10, 5 / 4, 3 / 2, 7 / 4])]
  .map((d) => decimalToA432Fraction(d))

// --- the resolver is a closest-match over a fixed table ------------------
check('every entry of the table resolves to itself',
  TABLE.every((f) => val(decimalToA432Fraction(val(f))) === val(f)),
  'a resolver that cannot round-trip its own table resolves nothing')

check('resolving is idempotent',
  [0, 1 / 3, 1 / 2, 2, 3, 432, -5].every((d) => {
    const once = val(resolveDecimal(d))
    return val(resolveDecimal(once)) === once
  }))

check('the result is always an entry of the table, for any input at all',
  [0, 1 / 3, 1 / 2, 2, 3, 432, -5, 1e9].every((d) =>
    TABLE.some((f) => val(f) === val(decimalToA432Fraction(d)))),
  'closure: it may not invent a fraction it does not hold')

check('the entry returned is the CLOSEST one, with none nearer',
  [0, 1 / 3, 3 / 7, 2, 3, 432, -5].every((d) => {
    const got = abs(d - val(decimalToA432Fraction(d)))
    return TABLE.every((f) => abs(d - val(f)) >= got - 1 / 1_000_000_000)
  }),
  'this is what the function does; "resolve any decimal" is not')

check('resolveDecimal and decimalToA432Fraction are the same function',
  [0, 1 / 2, 3, 432].every((d) => JSON.stringify(resolveDecimal(d)) === JSON.stringify(decimalToA432Fraction(d))))

check('resolveDecimalValue is the value of the fraction resolveDecimal returns',
  [0, 1 / 2, 3, 432, -5].every((d) => resolveDecimalValue(d) === calculateA432FractionValue(resolveDecimal(d))))

check('no resolution is NaN or Infinity',
  [0, 1 / 2, 3, 432, -5, 1e9].every((d) => Number.isFinite(resolveDecimalValue(d))))

check('the value of a fraction is its numerator over its denominator',
  [[1, 2], [3, 4], [7, 8], [9, 10]].every(([n, d]) =>
    calculateA432FractionValue({ numerator: n!, denominator: d! }) === n! / d!))

check('a unit reciprocal is one over something, and nothing else is',
  isUnitReciprocal({ numerator: 1, denominator: 2 })
  && isUnitReciprocal({ numerator: 1, denominator: 10 })
  && !isUnitReciprocal({ numerator: 3, denominator: 4 })
  && !isUnitReciprocal({ numerator: 2, denominator: 4 }))

// --- reduction to nine ---------------------------------------------------
check('summing to nine lands in 0..9',
  [[], [0], [1, 2, 4], [8, 7, 5], [9, 9, 9], [432, 432]].every((s) => {
    const v = a432SumToNine(s)
    return Number.isInteger(v) && v >= 0 && v <= 9
  }))

check('summing to nine is order-independent',
  a432SumToNine([1, 2, 4, 8, 7, 5]) === a432SumToNine([5, 7, 8, 4, 2, 1]))

check('the empty sequence sums to zero',
  a432SumToNine([]) === 0)

check('appending nine does not change the sum to nine',
  [[1, 2], [8, 7, 5], [3, 6]].every((s) => a432SumToNine(s) === a432SumToNine([...s, 9])),
  'nine is the additive identity of the digital root')

check('angle reduction lands in 0..9 for every multiple of sixty',
  [0, 60, 120, 180, 240, 300, 360].every((a) => {
    const v = a432AngleReduce(a)
    return Number.isInteger(v) && v >= 0 && v <= 9
  }))

check('angle reduction agrees with summing that angle\'s digits',
  [60, 120, 180, 240, 300, 360, 432].every((a) =>
    a432AngleReduce(a) === a432SumToNine(String(a).split('').map(Number))))

check('a full turn reduces to nine',
  a432AngleReduce(360) === 9)

// --- the Tesla constants -------------------------------------------------
check('voltage and frequency scale with their own bases',
  DIGITS.every((g) =>
    teslaVoltage(g) / TESLA_BASE_VOLTAGE === teslaFrequency(g) / TESLA_BASE_FREQUENCY),
  'they return identical numbers today only because both bases are 432; this is the law that survives changing one')

check('both are linear in the gateway',
  DIGITS.every((g) => teslaFrequency(g) === TESLA_BASE_FREQUENCY * g)
  && DIGITS.every((g) => teslaVoltage(g) === TESLA_BASE_VOLTAGE * g))

check('reversing polarity negates both',
  DIGITS.filter((g) => g > 0).every((g) =>
    teslaFrequency(g, -1) === -teslaFrequency(g, 1) && teslaVoltage(g, -1) === -teslaVoltage(g, 1)))

check('gateway zero produces nothing in either',
  teslaFrequency(0) === 0 && teslaVoltage(0) === 0)

check('n coils is n coils, and zero is none',
  [0, 1, 3, 6].every((n) => generateTeslaCoils(n).length === n))

check('every coil carries the frequency of its own gateway',
  generateTeslaCoils(6).every((c) => c.frequency === teslaFrequency(c.gateway)))

// --- the shear invariant is the shear product ----------------------------
check('a432ShearInvariant and a432ShearProduct agree on the whole digit square',
  DIGITS.every((a) => DIGITS.every((b) => a432ShearInvariant(a, b) === a432ShearProduct(a, b))),
  'two modules, two names, one function — recorded here rather than left to be discovered')

check('the shear invariant is commutative and single-digit',
  DIGITS.every((a) => DIGITS.every((b) => {
    const v = a432ShearInvariant(a, b)
    return v === a432ShearInvariant(b, a) && v >= 0 && v <= 9
  })))

// --- names and the tour ---------------------------------------------------
check('a name maps to a dimension in 1..9',
  ['a', 'a432', 'zeropoint', '', 'The quick brown fox'].every((s) => {
    const d = getNameDimension(s)
    return Number.isInteger(d) && d >= 1 && d <= 9
  }))

check('the same name always gives the same dimension',
  ['a432', 'zeropoint'].every((s) => getNameDimension(s) === getNameDimension(s)))

check('different names do not all give one dimension',
  new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map(getNameDimension)).size > 1)

check('the next interaction follows the tour and stays on it',
  [0, 3, 6, 9, 1, 2, 4, 8, 7, 5].every((d) => {
    const n = nextInteraction(d)
    return Number.isInteger(n) && n >= 0 && n <= 9
  }))

check('the next interaction is the next element of the cycle it is given',
  [[0, 3, 6, 9], [1, 2, 4, 8, 7, 5]].every((cycle) =>
    cycle.every((d, i) => nextInteraction(d, cycle) === cycle[(i + 1) % cycle.length])))

check('walking a cycle returns to where it started after its own length',
  [[0, 3, 6, 9], [1, 2, 4, 8, 7, 5]].every((cycle) => {
    let d = cycle[0]!
    for (let i = 0; i < cycle.length; i += 1) d = nextInteraction(d, cycle)
    return d === cycle[0]
  }))

check('a digit not in the cycle takes the first element',
  nextInteraction(99, [0, 3, 6, 9]) === 0,
  'indexOf gives -1 and -1 + 1 is 0; recorded rather than assumed')

// --- the tone board and the torus ----------------------------------------
check('n tone squares is n tone squares',
  [0, 1, 7, 12].every((n) => collectToneSquares(n).length === n))

check('every tone square carries its own tick',
  collectToneSquares(12).every((sq, i) => sq.tick === i))

const grid = (n: number): number[][] => [...Array(n).keys()].map((r) => [...Array(n).keys()].map((c) => r * n + c))
check('the torus map gives one point per cell of the matrix it was given',
  [1, 3, 7, 9].every((n) => mapMatrixToTorus(grid(n), 3, 1).length === n * n),
  'the loop bounds were the literal 7, so every matrix that was not 7x7 threw')

check('every torus point is finite and carries its own cell\'s value',
  [1, 3, 7].every((n) => mapMatrixToTorus(grid(n), 3, 1).every((p) =>
    Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.z)
    && p.value === grid(n)[p.row]![p.col])))

check('an empty matrix maps to no points rather than throwing',
  mapMatrixToTorus([], 3, 1).length === 0)

// --- cmyk ----------------------------------------------------------------
const CHANNELS = ['cyan', 'magenta', 'yellow', 'key'] as const
check('every CMYK channel has a frequency ratio that is a fraction, not a float',
  CHANNELS.every((ch) => {
    const f = cmykFrequencyRatio(ch)
    return Number.isInteger(f.numerator) && Number.isInteger(f.denominator) && f.denominator !== 0
  }))

check('every channel ratio has digital root nine, as its comments claim',
  CHANNELS.every((ch) => {
    const f = cmykFrequencyRatio(ch)
    const n = f.numerator
    return n % 9 === 0
  }),
  'each is a multiple of 432, and 432 has digital root 9')

check('the four channels are four different ratios',
  new Set(CHANNELS.map((ch) => JSON.stringify(cmykFrequencyRatio(ch)))).size === 4)

check('a zero divisor is refused rather than returning Infinity',
  (() => { try { vortexFrequency(432, 1, 0); return false } catch { return true } })())

check('the vortex frequency is base times multiplier over divisor',
  [[432, 2, 3], [432, 1, 2], [864, 3, 4]].every(([b, m, d]) => vortexFrequency(b!, m!, d!) === b! * m! / d!))

console.log(failures === 0
  ? 'a432.resolution ok — the resolver returns the closest entry it holds, and the tour closes'
  : `a432.resolution FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
