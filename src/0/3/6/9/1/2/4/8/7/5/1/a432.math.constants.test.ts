/**
 * Producer and predicate check each other.
 *
 * This module exports functions that PRODUCE ratios and functions that DECIDE
 * whether a number is one. Nothing called either. The strong law available here
 * is that the two must agree — isGoldenRatio(goldenRatioPower(1)) and
 * isFibonacciRatio(calculateFibonacciRatio(n)) — because that is two
 * independent exports testing each other rather than one asserting about
 * itself.
 *
 * calculateOctaveFrequency is the function 1.4.6 renamed out of a collision
 * with a432.math.ts's calculateA432Frequency. Its law is the octave: doubling
 * the frequency raises it one octave, exactly, at every step.
 */
import {
  GOLDEN_RATIO, GOLDEN_RATIO_RECIPROCAL, GOLDEN_RATIO_SQUARED,
  FIBONACCI_SEQUENCE, FIBONACCI_RATIOS,
  A432_BASE_FREQUENCY, A432_TRINITY_MULTIPLIER, A432_VORTEX_MULTIPLIER,
  calculateFibonacciRatio, calculateOctaveFrequency, calculateTrinityFrequency,
  calculateVortexFrequency, goldenRatioPower, isFibonacciRatio, isGoldenRatio,
  isA432Harmonic, calculateDigitalRoot,
} from './a432.math.constants.ts'
import { abs } from './a432.algebra.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// --- the octave ----------------------------------------------------------
check('an octave up is exactly twice the frequency',
  [-3, -2, -1, 0, 1, 2, 3, 4, 5].every((n) => calculateOctaveFrequency(n + 1) === 2 * calculateOctaveFrequency(n)))

check('octave zero is the base frequency',
  calculateOctaveFrequency(0) === A432_BASE_FREQUENCY)

check('going up an octave and back down returns the same number',
  [0, 1, 2, 3].every((n) => calculateOctaveFrequency(n + 1) / 2 === calculateOctaveFrequency(n)))

check('every octave of 432 is an A432 harmonic, by the module\'s own predicate',
  [-2, -1, 0, 1, 2, 3, 4].every((n) => isA432Harmonic(calculateOctaveFrequency(n))),
  'producer and predicate must agree')

check('a frequency between two octaves is NOT a harmonic',
  [3 / 2, 3, 5].every((k) => !isA432Harmonic(A432_BASE_FREQUENCY * k)),
  'the predicate must be able to say no, or it says nothing')

// --- the multipliers -----------------------------------------------------
check('the trinity frequency is the base times three',
  A432_TRINITY_MULTIPLIER === 3 && DIGITS.every((d) => calculateTrinityFrequency(d) === d * 3))

check('the vortex frequency is the base times nine',
  A432_VORTEX_MULTIPLIER === 9 && DIGITS.every((d) => calculateVortexFrequency(d) === d * 9))

check('trinity applied twice is vortex applied once',
  DIGITS.every((d) => calculateTrinityFrequency(calculateTrinityFrequency(d)) === calculateVortexFrequency(d)),
  '3 * 3 = 9, so the axis composes')

check('both multipliers are linear',
  DIGITS.every((a) => DIGITS.every((b) =>
    calculateTrinityFrequency(a + b) === calculateTrinityFrequency(a) + calculateTrinityFrequency(b))))

// --- the golden ratio ----------------------------------------------------
check('phi to the first power is phi, and the predicate agrees',
  goldenRatioPower(1) === GOLDEN_RATIO && isGoldenRatio(goldenRatioPower(1)))

check('phi to the zero is one',
  goldenRatioPower(0) === 1)

check('phi squared is phi plus one, to within the module\'s own tolerance',
  abs(goldenRatioPower(2) - (GOLDEN_RATIO + 1)) < 1 / 1_000_000_000,
  'the defining property of phi')

check('the recorded square and reciprocal agree with the power function',
  goldenRatioPower(2) === GOLDEN_RATIO_SQUARED && goldenRatioPower(-1) === GOLDEN_RATIO_RECIPROCAL)

check('phi times its reciprocal is one',
  abs(GOLDEN_RATIO * GOLDEN_RATIO_RECIPROCAL - 1) < 1 / 1_000_000_000)

check('the predicate refuses numbers that are not phi',
  !isGoldenRatio(1) && !isGoldenRatio(2) && !isGoldenRatio(GOLDEN_RATIO + 1))

// --- Fibonacci -----------------------------------------------------------
check('every Fibonacci number is the sum of the two before it',
  FIBONACCI_SEQUENCE.slice(2).every((v, i) => v === FIBONACCI_SEQUENCE[i] + FIBONACCI_SEQUENCE[i + 1]))

const inRange = [...Array(FIBONACCI_SEQUENCE.length - 2).keys()].slice(1)
check('every ratio the function produces is one the predicate recognises',
  inRange.every((n) => isFibonacciRatio(calculateFibonacciRatio(n))),
  'producer and predicate must agree')

check('the ratio is F(n+1) over F(n) and nothing is divided by zero',
  inRange.every((n) => {
    const r = calculateFibonacciRatio(n)
    return Number.isFinite(r) && r === FIBONACCI_SEQUENCE[n + 1] / FIBONACCI_SEQUENCE[n]
  }))

check('index zero returns zero rather than Infinity',
  calculateFibonacciRatio(0) === 0,
  'F(0) is 0, and dividing by it is how this used to return Infinity')

check('out of range returns zero, never NaN or Infinity',
  [-5, -1, 20, 100].every((n) => calculateFibonacciRatio(n) === 0))

check('no recorded ratio is Infinity',
  FIBONACCI_RATIOS.every((r) => Number.isFinite(r)))

check('the ratios converge on phi',
  isGoldenRatio(FIBONACCI_RATIOS[FIBONACCI_RATIOS.length - 1]),
  'the last Fibonacci ratio must satisfy the golden-ratio predicate')

// --- digital root --------------------------------------------------------
check('digital root is idempotent',
  [...Array(200).keys()].every((n) => calculateDigitalRoot(calculateDigitalRoot(n)) === calculateDigitalRoot(n)))

check('digital root is invariant under adding nine',
  [...Array(100).keys()].slice(1).every((n) => calculateDigitalRoot(n) === calculateDigitalRoot(n + 9)))

console.log(failures === 0
  ? 'a432.math.constants ok — the octave doubles, the axis composes, and every producer satisfies its own predicate'
  : `a432.math.constants FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
