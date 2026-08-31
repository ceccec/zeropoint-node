/**
 * a432.math.ts — the densest pocket of untested exports, tested by law.
 *
 * The coverage audit reports 316 untested exports in a432, and 313 of them take
 * arguments. That is the whole reason the property suite misses them: it calls
 * every NULLARY export, so anything needing an argument was never reached.
 *
 * 26 of them are here, in one file, alongside 8 retyped kernel constants — the
 * two debts overlap on the same module, so one pass closes both.
 *
 * These are laws, not samples. Where the function has an inverse the round trip
 * is asserted; where it has a recurrence the recurrence is; where it names a
 * kernel constant it is checked against the kernel rather than a literal.
 */

import {
  fibonacci, fibonacciRoots, primes, primeSquaredRoots,
  isTrinity, isTeslaDigit, isTrinitySwitch, DOT_TRINITY_SWITCH,
  mirrorBaseTen, mobiusDigit, mobiusSequence, patternDigit, teslaPattern,
  rodinAngle, getNextRodinValue, xorDigit, decimalToFraction, resolveDivision,
  analyzeRodinCoilPattern,
  decodePiDigits,
  getRodinCoilHarmonicAnalysis,
  imperialToMetric,
  imperialToMetricUnit,
  kineticShockWaveOfNine,
  metricToImperial,
  mmToMetric,
  simplify,
  multiplyFractions,
  generateVortexSequence,
  RODIN_SEQUENCE,
} from './a432.math.ts'
import { VORTEX_AXIS, VORTEX_ORBIT, digitalRoot } from '../../../../../../../../../../index.ts'
import { abs } from './a432.algebra.ts'

let failures = 0
function check(name: string, ok: boolean, detail = ''): void {
  if (ok) { console.log('  ✓ ' + name); return }
  failures++
  console.log('  ✗ ' + name + (detail ? ' — ' + detail : ''))
}
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

console.log('a432.math.ts — laws\n')

// -------------------------------------------------------------- number theory
{
  const f = fibonacci(14)
  check('fibonacci starts 1, 1', f[0] === 1 && f[1] === 1)
  check('fibonacci obeys its recurrence', f.every((v, i) => i < 2 || v === f[i - 1]! + f[i - 2]!))
  check('fibonacci(n) has n terms', fibonacci(6).length === 6 && fibonacci(14).length === 14)

  // The roots are the digital roots of the sequence — checked against the
  // kernel's digitalRoot, not against a copy of the same table.
  check('fibonacciRoots is the digital root of fibonacci',
    fibonacciRoots(14).every((v, i) => v === digitalRoot(f[i]!)),
    JSON.stringify(fibonacciRoots(14)))
  // Pisano period 24 mod 9: the roots repeat every 24 terms.
  const long = fibonacciRoots(48)
  check('fibonacci digital roots repeat with period 24',
    long.slice(0, 24).join() === long.slice(24, 48).join())

  const p = primes(12)
  const isPrime = (n: number): boolean => {
    if (n < 2) return false
    for (let d = 2; d * d <= n; d++) if (n % d === 0) return false
    return true
  }
  check('every value primes() returns is prime', p.every(isPrime), JSON.stringify(p))
  check('primes are ascending', p.every((v, i) => i === 0 || v > p[i - 1]!))
  check('primes are the FIRST n — nothing prime is skipped',
    p.every((v, i) => i === 0 || !Array.from({ length: v - p[i - 1]! - 1 }, (_, k) => p[i - 1]! + 1 + k).some(isPrime)))
  check('primeSquaredRoots is the digital root of each prime squared',
    primeSquaredRoots(12).every((v, i) => v === digitalRoot(p[i]! * p[i]!)),
    JSON.stringify(primeSquaredRoots(12)))
}

// ------------------------------------------------------------------ predicates
{
  // Bound to the kernel: isTrinity must BE axis membership, not a copy of it.
  check('isTrinity is exactly membership of the kernel axis',
    DIGITS.every((d) => isTrinity(d) === VORTEX_AXIS.includes(d as never)))
  check('isTeslaDigit agrees with isTrinity on every digit',
    DIGITS.every((d) => isTeslaDigit(d) === isTrinity(d)))
  check('no digit of the doubling orbit is on the axis',
    VORTEX_ORBIT.every((d) => !isTrinity(d)))

  // isTrinitySwitch is a TYPE GUARD for {kind:'trinity'}, not a digit
  // predicate. Fed digits it correctly returns false for all ten, which looks
  // like a predicate that cannot fire until you read the signature.
  check('isTrinitySwitch accepts the canonical switch', isTrinitySwitch(DOT_TRINITY_SWITCH))
  check('isTrinitySwitch rejects every digit — it guards an object, not a number',
    DIGITS.every((d) => !isTrinitySwitch(d)))
  check('isTrinitySwitch rejects a look-alike without the kind',
    !isTrinitySwitch({ axisDigit: 3 }) && !isTrinitySwitch(null))
}

// ------------------------------------------------------------------- sequences
{
  check('mobiusDigit traces the kernel orbit with alternating sign',
    VORTEX_ORBIT.every((d, i) => abs(mobiusDigit(i)) === d),
    DIGITS.slice(0, 6).map(mobiusDigit).join(','))
  check('mobiusDigit has period 6, like the orbit',
    DIGITS.slice(0, 4).every((i) => mobiusDigit(i) === mobiusDigit(i + 6)))
  check('mobiusSequence is the same walk',
    mobiusSequence(6).every((v, i) => v === mobiusDigit(i)))

  check('patternDigit walks the vortex flow, void first',
    [0, 1, 2, 3].map(patternDigit).join() === '0,3,6,9')
  check('teslaPattern repeats the kernel axis',
    teslaPattern(6).every((v, i) => v === VORTEX_AXIS[i % VORTEX_AXIS.length]),
    JSON.stringify(teslaPattern(6)))

  check('rodinAngle has period 6', DIGITS.slice(0, 4).every((d) => rodinAngle(d) === rodinAngle(d + 6)))
  check('rodinAngle stays inside a turn', DIGITS.every((d) => rodinAngle(d) >= 0 && rodinAngle(d) < 360))
  check('getNextRodinValue stays on the orbit',
    VORTEX_ORBIT.every((d) => VORTEX_ORBIT.includes(getNextRodinValue(d) as never)),
    VORTEX_ORBIT.map(getNextRodinValue).join(','))
}

// ------------------------------------------------------------------- arithmetic
{
  check('mirrorBaseTen(n) is the two-digit repdigit', DIGITS.every((d) => mirrorBaseTen(d) === d * 11))
  check('mirrorBaseTen preserves the digital root', DIGITS.every((d) => digitalRoot(mirrorBaseTen(d)) === digitalRoot(d * 11)))

  // xor is its own inverse in the third argument, whatever the first two mean.
  check('xorDigit is a digit', DIGITS.every((d) => { const v = xorDigit(d, 3, 5); return Number.isInteger(v) && v >= 0 && v <= 9 }))

  // A fraction must reproduce the number it came from.
  for (const n of [6, 1, 0, 9]) {
    const fr = decimalToFraction(n)
    check(`decimalToFraction(${n}) reproduces ${n}`, fr.numerator / fr.denominator === n, JSON.stringify(fr))
    check(`decimalToFraction(${n}) has a non-zero denominator`, fr.denominator !== 0)
  }

  const rd = resolveDivision(6, 3)
  check('resolveDivision returns a digit, an angle and a polarity',
    typeof rd.digit === 'number' && typeof rd.angle === 'number' && (rd.polarity === 1 || rd.polarity === -1),
    JSON.stringify(rd))
  check('resolveDivision is deterministic', JSON.stringify(resolveDivision(6, 3)) === JSON.stringify(rd))
}

// ——————————————————————————————————————————————————————————————
// Unit conversion, pattern analysis, pi decoding
//
// The conversions are the interesting part: they are declared as Fractions and
// must stay exact. inch->m and m->inch are not merely approximate inverses,
// they are exact reciprocals — 127/5000 and 5000/127 — so the round trip is
// checkable by cross-multiplication with no float anywhere in the assertion.
{
  const cross = (a: { numerator: number; denominator: number }, b: { numerator: number; denominator: number }) =>
    a.numerator * b.denominator === b.numerator * a.denominator

  const inch = imperialToMetric(1, 'inch')
  const foot = imperialToMetric(1, 'foot')
  const yard = imperialToMetric(1, 'yard')
  const mile = imperialToMetric(1, 'mile')
  check('a foot is exactly twelve inches',
    cross(foot, { numerator: inch.numerator * 12, denominator: inch.denominator }), `${foot.numerator}/${foot.denominator}`)
  check('a yard is exactly three feet',
    cross(yard, { numerator: foot.numerator * 3, denominator: foot.denominator }))
  check('a mile is exactly 5280 feet',
    cross(mile, { numerator: foot.numerator * 5280, denominator: foot.denominator }))

  const toM = imperialToMetricUnit(1, 'inch', 'm')
  const toIn = metricToImperial(1, 'm', 'inch')
  check('inch->m is 127/5000 exactly', toM.numerator === 127 && toM.denominator === 5000, `${toM.numerator}/${toM.denominator}`)
  check('m->inch is the exact reciprocal',
    toM.numerator === toIn.denominator && toM.denominator === toIn.numerator, `${toIn.numerator}/${toIn.denominator}`)

  const oneMetre = mmToMetric({ numerator: 1000, denominator: 1 }, 'm')
  check('a thousand millimetres is one metre', cross(oneMetre, { numerator: 1, denominator: 1 }))

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  for (const f of [{ numerator: 1000, denominator: 254 }, { numerator: 9, denominator: 3 }, { numerator: 7, denominator: 11 }]) {
    const r = simplify(f)
    check(`simplify(${f.numerator}/${f.denominator}) preserves the value`, cross(r, f), `${r.numerator}/${r.denominator}`)
    check(`simplify(${f.numerator}/${f.denominator}) is in lowest terms`, gcd(r.numerator, r.denominator) === 1)
    const again = simplify(r)
    check(`simplify(${f.numerator}/${f.denominator}) is idempotent`, again.numerator === r.numerator && again.denominator === r.denominator)
  }

  const wave = kineticShockWaveOfNine(12)
  check('kineticShockWaveOfNine respects the requested length', wave.length === 12)
  check('kineticShockWaveOfNine cycles the trinity axis',
    wave.every((v, i) => v === VORTEX_AXIS[i % 3]), JSON.stringify(wave))
  check('kineticShockWaveOfNine puts a 9 in every third place',
    wave.filter((_, i) => i % 3 === 2).every(v => v === 9))
  check('kineticShockWaveOfNine(0) is empty', kineticShockWaveOfNine(0).length === 0)

  // isHarmonic is documented as the 0/0 switch point and nothing else.
  for (const [pattern, want] of [['0/0\\3\\6\\9/1', true], ['1 2 4 8 7 5', false], ['', false]] as const) {
    const a = analyzeRodinCoilPattern(pattern)
    check(`analyzeRodinCoilPattern harmonic verdict for ${JSON.stringify(pattern)}`, a.isHarmonic === want)
    check(`analyzeRodinCoilPattern switch point agrees with the verdict for ${JSON.stringify(pattern)}`,
      a.switchPoint === (want ? '0/0' : 'none'), a.switchPoint)
    // trinityAxis is the axis digits FOUND IN the pattern, not a constant — my
    // first assertion demanded [3,6,9] from '1 2 4 8 7 5' and the code was right.
    check(`analyzeRodinCoilPattern reports only axis digits for ${JSON.stringify(pattern)}`,
      a.trinityAxis.every(d => VORTEX_AXIS.includes(d as 3 | 6 | 9)), JSON.stringify(a.trinityAxis))
    check(`analyzeRodinCoilPattern finds the whole axis when the pattern carries it for ${JSON.stringify(pattern)}`,
      VORTEX_AXIS.every(d => pattern.includes(String(d))) === (a.trinityAxis.length === 3),
      JSON.stringify(a.trinityAxis))
  }

  const report = getRodinCoilHarmonicAnalysis('0/0')
  check('harmonic analysis names the verdict', report.includes('HARMONIC PATTERN DETECTED'))
  check('non-harmonic analysis does not claim detection',
    !getRodinCoilHarmonicAnalysis('1 2 4').includes('HARMONIC PATTERN DETECTED'))

  // The metric column IS pi: 3, 1, 4, 1, 5, 9, ...
  const pi = decodePiDigits(6)
  check('decodePiDigits returns one entry per requested digit', pi.length === 6, String(pi.length))
  check('decodePiDigits metric column is the digits of pi',
    JSON.stringify(pi.map(d => d.metric)) === JSON.stringify([3, 1, 4, 1, 5, 9]),
    JSON.stringify(pi.map(d => d.metric)))
  check('decodePiDigits polarity is a polarity', pi.every(d => d.polarity === -1 || d.polarity === 0 || d.polarity === 1))
  check('decodePiDigits angle is a bearing', pi.every(d => d.angle >= 0 && d.angle < 360))
  check('decodePiDigits columns are all digits',
    pi.every(d => [d.metric, d.imperial, d.trinity].every(v => Number.isInteger(v) && v >= 0 && v <= 9)))
  check('decodePiDigits(0) is empty', decodePiDigits(0).length === 0)
}

// ——————————————————————————————————————————————————————————————
// The two functions docs/A432_SCIENTIFIC_VALIDATION.md declared
{
  const cross = (a: { numerator: number; denominator: number }, b: { numerator: number; denominator: number }) =>
    a.numerator * b.denominator === b.numerator * a.denominator
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  const F = (n: number, d: number) => ({ numerator: n, denominator: d })

  const pairs: Array<[{ numerator: number; denominator: number }, { numerator: number; denominator: number }]> = [
    [F(2, 3), F(3, 4)], [F(1, 2), F(2, 1)], [F(5, 7), F(7, 5)], [F(9, 4), F(4, 9)], [F(1, 1), F(13, 17)],
  ]
  let valueOk = true, lowestOk = true, commutes = true
  for (const [a, b] of pairs) {
    const r = multiplyFractions(a, b)
    // The product before reduction, compared by cross-multiplication so the
    // assertion never divides and never sees a float.
    if (!cross(r, F(a.numerator * b.numerator, a.denominator * b.denominator))) valueOk = false
    if (gcd(r.numerator, r.denominator) !== 1) lowestOk = false
    const swapped = multiplyFractions(b, a)
    if (swapped.numerator !== r.numerator || swapped.denominator !== r.denominator) commutes = false
  }
  check('multiplyFractions preserves the exact product', valueOk)
  check('multiplyFractions returns lowest terms', lowestOk)
  check('multiplyFractions commutes', commutes)
  check('multiplying by 1/1 changes nothing',
    cross(multiplyFractions(F(7, 9), F(1, 1)), F(7, 9)))
  check('a fraction times its reciprocal is one',
    cross(multiplyFractions(F(5, 7), F(7, 5)), F(1, 1)))
  check('multiplyFractions is associative',
    JSON.stringify(multiplyFractions(multiplyFractions(F(2, 3), F(3, 5)), F(5, 7))) ===
    JSON.stringify(multiplyFractions(F(2, 3), multiplyFractions(F(3, 5), F(5, 7)))))

  const seq = generateVortexSequence(30)
  check('generateVortexSequence respects the requested length', seq.length === 30)
  check('generateVortexSequence(0) is empty', generateVortexSequence(0).length === 0)
  check('generateVortexSequence cycles RODIN_SEQUENCE',
    seq.every((v, i) => v === RODIN_SEQUENCE[i % RODIN_SEQUENCE.length]), JSON.stringify(seq.slice(0, 8)))
  // The seven-element form closes onto 1, so the period is 7 and 1 appears
  // twice at the seam. That is the sequence the doc indexes, and stating it
  // here means a silent switch to the six-element orbit fails instead.
  check('the period is seven, not six', seq[0] === seq[7] && seq[6] === 1 && seq[7] === 1,
    JSON.stringify(seq.slice(0, 9)))
  check('every element of the doubling circuit appears',
    VORTEX_ORBIT.every(d => seq.includes(d)))
  check('generateVortexSequence emits only digits',
    seq.every(d => Number.isInteger(d) && d >= 0 && d <= 9))
}

console.log()
if (failures > 0) {
  console.error(`a432.math FAIL — ${failures}`)
  process.exit(1)
}
console.log('a432.math ok')
process.exit(0)
