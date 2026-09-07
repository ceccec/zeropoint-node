/**
 * Radiesthesia's three conventions, held to the laws they actually have.
 *
 * The pendulum is the only physics here and it is held to the square-root law
 * in both directions: quadrupling the length must double the period, and the
 * suite also shows that a linear impostor — T = 2L, which agrees with the
 * seconds pendulum at L = 1 — FAILS the same check. A check that only the real
 * law passes is a check; one that an impostor also passes is a mood.
 *
 * The Bovis classes and the twelve rays are conventions, so the laws are
 * structural: the classes partition the scale, the rays close the circle,
 * opposite is an involution, and what the sources state is pinned: positive
 * green at north opposite negative green, red at west opposite violet (the
 * electric meridian), infrared between black and red, ultraviolet between
 * violet and white.
 *
 * Nothing here asserts that any of it detects anything.
 */
import {
  RAY_STEP_DEGREES, RAY_COUNT, UNIVERSAL_PENDULUM_EQUATOR,
  rayAngle, rayAt, rayOpposite, rayHarmonic, universalPendulum,
  BOVIS_NEUTRAL, BOVIS_CLASSES, bovisClass, bovisRelativeToNeutral, bovisDigit,
  SECONDS_PENDULUM_FRAME, exactIntegerSqrt, isRationalSquare,
  pendulumPeriod, pendulumFrequency, pendulumLengthForPeriod, pendulumA432Ratio,
} from './a432.radiesthesia.ts'
import type { Fraction } from './a432.math.ts'
import { legacyDigitalRoot } from './a432.roots.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}
const throws = (f: () => unknown): boolean => { try { f(); return false } catch { return true } }
const fr = (numerator: number, denominator = 1): Fraction => ({ numerator, denominator })
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
const reduced = (f: Fraction): boolean => f.denominator > 0 && gcd(f.numerator, f.denominator) === 1
const eq = (a: Fraction, b: Fraction): boolean => a.numerator * b.denominator === b.numerator * a.denominator
const times = (f: Fraction, k: number): Fraction => fr(f.numerator * k, f.denominator)
const mul = (a: Fraction, b: Fraction): Fraction => fr(a.numerator * b.numerator, a.denominator * b.denominator)

// --- the equator closes ---------------------------------------------------
const NAMES = UNIVERSAL_PENDULUM_EQUATOR.map((r) => r.name)
check('twelve rays at thirty degrees close the circle',
  RAY_COUNT === 12 && RAY_STEP_DEGREES * RAY_COUNT === 360 && NAMES.length === RAY_COUNT)

check('every ray has a distinct name and a distinct symbol',
  new Set(NAMES).size === RAY_COUNT && new Set(UNIVERSAL_PENDULUM_EQUATOR.map((r) => r.symbol)).size === RAY_COUNT)

check('the angles are the twelve multiples of the step, each used once',
  new Set(NAMES.map(rayAngle)).size === RAY_COUNT && NAMES.every((n) => rayAngle(n) % RAY_STEP_DEGREES === 0 && rayAngle(n) >= 0 && rayAngle(n) < 360))

check('rayAt inverts rayAngle, a full turn later too, and from a negative angle',
  NAMES.every((n) => rayAt(rayAngle(n)) === n && rayAt(rayAngle(n) + 360) === n && rayAt(rayAngle(n) - 720) === n))

check('an angle between rays is refused rather than rounded',
  throws(() => rayAt(15)) && throws(() => rayAt(359)) && throws(() => rayAt(1 / 2)) && throws(() => rayAt(NaN)))

check('opposite is an involution that moves half a turn',
  NAMES.every((n) => rayOpposite(rayOpposite(n)) === n && rayOpposite(n) !== n
    && (rayAngle(rayOpposite(n)) - rayAngle(n) + 360) % 360 === 180))

check('positive green is at north and negative green is diametrically opposite it',
  rayAngle('positive green') === 0 && rayOpposite('positive green') === 'negative green')

check('red is at west', rayAngle('red') === 270)

const adjacent = (a: string, b: string): boolean => {
  const d = (rayAngle(a) - rayAngle(b) + 360) % 360
  return d === RAY_STEP_DEGREES || d === 360 - RAY_STEP_DEGREES
}
check('red is diametrically opposite violet: the electric meridian crosses the equator at both',
  rayOpposite('red') === 'violet' && rayOpposite('violet') === 'red')

check('infrared sits between black and red, ultraviolet between violet and white',
  adjacent('infrared', 'red') && adjacent('infrared', 'black')
  && adjacent('ultraviolet', 'violet') && adjacent('ultraviolet', 'white'),
  'the order the pendulum\'s own 24-point listing gives; one vendor page swaps UV and violet and contradicts its own red–violet meridian')

check('symbols and names reach the same ray, whatever the case',
  rayAngle('V+') === rayAngle('positive green') && rayAngle('V-') === rayAngle('negative green')
  && rayAngle('RED') === rayAngle('red') && rayHarmonic(' ir ') === rayHarmonic('infrared'))

check('the harmonic places the twelve rays bijectively on 1..12',
  new Set(NAMES.map(rayHarmonic)).size === RAY_COUNT && NAMES.every((n) => rayHarmonic(n) >= 1 && rayHarmonic(n) <= 12 && Number.isInteger(rayHarmonic(n))))

check('a name that is not a ray is refused',
  ['puce', '', 'V*', 'green'].every((n) => throws(() => rayAngle(n)) && throws(() => rayOpposite(n)) && throws(() => rayHarmonic(n))))

const wheel = universalPendulum()
check('universalPendulum agrees with the functions and with itself',
  wheel.length === RAY_COUNT
  && wheel.every((r) => r.angle === rayAngle(r.name) && r.harmonic === rayHarmonic(r.name) && r.opposite === rayOpposite(r.name))
  && JSON.stringify(wheel) === JSON.stringify(universalPendulum()))

// --- the Bovis classes partition the scale ---------------------------------
check('the neutral point is 6500 and it opens the superior class',
  BOVIS_NEUTRAL === 6500 && bovisClass(BOVIS_NEUTRAL) === 'superior' && bovisRelativeToNeutral(BOVIS_NEUTRAL) === 0)

check('one unit either side of neutral is below or above it',
  bovisClass(BOVIS_NEUTRAL - 1) === 'support' && bovisRelativeToNeutral(BOVIS_NEUTRAL - 1) === -1
  && bovisRelativeToNeutral(BOVIS_NEUTRAL + 1) === 1 && bovisClass(BOVIS_NEUTRAL + 1) === 'superior')

check('the bands are contiguous from zero and the last is unbounded',
  BOVIS_CLASSES[0]!.min === 0 && BOVIS_CLASSES[BOVIS_CLASSES.length - 1]!.max === null
  && BOVIS_CLASSES.every((b, i) => i === 0 || b.min === BOVIS_CLASSES[i - 1]!.max))

check('every reading up to twelve thousand falls in exactly one band, and bovisClass names it',
  (() => {
    for (let u = 0; u <= 12000; u++) {
      const holders = BOVIS_CLASSES.filter((b) => u >= b.min && (b.max === null || u < b.max))
      if (holders.length !== 1 || bovisClass(u) !== holders[0]!.name) return false
    }
    return true
  })())

check('the class never falls as the reading rises',
  (() => {
    const order = BOVIS_CLASSES.map((b) => b.name)
    let last = -1
    for (let u = 0; u <= 12000; u += 7) {
      const i = order.indexOf(bovisClass(u))
      if (i < last) return false
      last = i
    }
    return true
  })())

check('zero is dead and one is not',
  bovisClass(0) === 'dead' && bovisClass(1) === 'inferior')

check('a reading that is not a non-negative integer is refused by all three',
  [-1, 1 / 2, NaN, Infinity, -6500].every((u) =>
    throws(() => bovisClass(u)) && throws(() => bovisRelativeToNeutral(u)) && throws(() => bovisDigit(u))))

check('the digit is the legacy root of the reading: zero stays zero, 6500 folds to 2, 9 and 18 to 9',
  bovisDigit(0) === 0 && bovisDigit(BOVIS_NEUTRAL) === 2 && bovisDigit(9) === 9 && bovisDigit(18) === 9 && bovisDigit(12345) === 6
  && [1, 9, 18, 3000, 6499, BOVIS_NEUTRAL, 10000, 12345].every((u) => bovisDigit(u) === legacyDigitalRoot(u)),
  'the shared root is the oracle, not a second copy of it')

// --- the pendulum, in its frame ------------------------------------------
check('the frame is stated', SECONDS_PENDULUM_FRAME.includes('g = π²') && SECONDS_PENDULUM_FRAME.includes('2·√L'))

check('exactIntegerSqrt is exact on every square below two thousand squared',
  (() => { for (let r = 0; r < 2000; r++) if (exactIntegerSqrt(r * r) !== r) return false; return true })())

check('exactIntegerSqrt is null on non-squares, negatives and non-integers',
  [2, 3, 5, 8, 99, 1000001].every((n) => exactIntegerSqrt(n) === null)
  && exactIntegerSqrt(-4) === null && exactIntegerSqrt(1 / 4) === null && exactIntegerSqrt(NaN) === null)

check('exactIntegerSqrt stays exact where a float root would not: (2^26 + 1)^2',
  exactIntegerSqrt(67108865 * 67108865) === 67108865 && exactIntegerSqrt(67108865 * 67108865 + 1) === null)

check('the pendulum of length 1 beats seconds: period 2, frequency 1/2, 864 cycles of A432 per swing',
  eq(pendulumPeriod(fr(1)), fr(2)) && eq(pendulumFrequency(fr(1)), fr(1, 2)) && eq(pendulumA432Ratio(fr(1)), fr(864)))

const SQUARES: Fraction[] = [fr(1), fr(4), fr(9), fr(1, 4), fr(9, 4), fr(9, 16), fr(2, 8), fr(25, 36), fr(49), fr(1, 100)]
check('period is 2 root L on the rational squares, reduced',
  eq(pendulumPeriod(fr(4)), fr(4)) && eq(pendulumPeriod(fr(1, 4)), fr(1)) && eq(pendulumPeriod(fr(9, 4)), fr(3))
  && eq(pendulumPeriod(fr(9, 16)), fr(3, 2)) && eq(pendulumPeriod(fr(2, 8)), fr(1))
  && SQUARES.every((L) => reduced(pendulumPeriod(L)) && reduced(pendulumFrequency(L)) && reduced(pendulumA432Ratio(L))))

check('quadrupling the length doubles the period — the square-root law',
  SQUARES.every((L) => eq(pendulumPeriod(times(L, 4)), times(pendulumPeriod(L), 2))))

check('a linear impostor, T = 2L, agrees at length 1 and FAILS the quadrupling law',
  eq(times(fr(1), 2), pendulumPeriod(fr(1)))
  && !SQUARES.every((L) => eq(pendulumPeriod(times(L, 4)), times(pendulumPeriod(L), 4))),
  'this is the negative arm: the check can tell the law from something that merely matches the seconds pendulum')

check('frequency times period is exactly one',
  SQUARES.every((L) => eq(mul(pendulumFrequency(L), pendulumPeriod(L)), fr(1))))

check('the A432 ratio is 432 times the period',
  SQUARES.every((L) => eq(pendulumA432Ratio(L), times(pendulumPeriod(L), 432))))

check('length for period inverts period for length, both ways',
  SQUARES.every((L) => eq(pendulumLengthForPeriod(pendulumPeriod(L)), L))
  && [fr(1), fr(2), fr(3, 2), fr(7, 5), fr(1, 3), fr(11)].every((T) => eq(pendulumPeriod(pendulumLengthForPeriod(T)), T) && reduced(pendulumLengthForPeriod(T))))

check('isRationalSquare says yes to the squares and no to the rest',
  SQUARES.every(isRationalSquare) && [fr(2), fr(1, 2), fr(3), fr(5, 4), fr(8, 3)].every((f) => !isRationalSquare(f)))

check('a length that is not a rational square is refused, not rounded',
  [fr(2), fr(1, 2), fr(3), fr(8, 3)].every((L) =>
    throws(() => pendulumPeriod(L)) && throws(() => pendulumFrequency(L)) && throws(() => pendulumA432Ratio(L))))

check('zero, negative, non-integer and non-fraction lengths are refused',
  [fr(0), fr(-1), fr(1, 0), fr(1, -4), fr(1 / 2, 1), fr(NaN), fr(1, Infinity)].every((L) =>
    throws(() => pendulumPeriod(L)) && throws(() => pendulumLengthForPeriod(L)) && throws(() => isRationalSquare(L)))
  && throws(() => pendulumPeriod(0 as unknown as Fraction)) && throws(() => pendulumPeriod(null as unknown as Fraction)))

check('the pendulum is a function of its length',
  SQUARES.every((L) => JSON.stringify(pendulumPeriod(L)) === JSON.stringify(pendulumPeriod({ ...L }))))

console.log(failures === 0
  ? 'a432.radiesthesia ok — the seconds pendulum beats seconds, the linear impostor fails the quadrupling law, the classes partition and the equator closes'
  : `a432.radiesthesia FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
