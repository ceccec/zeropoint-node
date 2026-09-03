/**
 * The coil closes, and it did not.
 *
 * rodinPosition and rodinVortexCycle cycled RODIN_SEQUENCE — `[...VORTEX_ORBIT, 1]`,
 * the orbit with its return to 1 appended. Taken modulo its own length that is
 * a seven-step walk with 1 repeated at the seam, and the law below is what
 * found it: digitalRoot(2 * 1) is 2, so a doubling circuit cannot produce 1
 * twice in a row.
 *
 * The consequence was not cosmetic. rodinCoilPattern pairs each value with
 * rodinAngle(i), which is six-periodic, so from index 7 the pattern carried
 * every digit at the previous digit's angle and never resynchronised.
 *
 * These are the laws, not "it returns an array": the orbit doubles, it closes
 * after six, reversing it is an involution, and the pattern's angle is the
 * angle of the digit standing at that position.
 */
import { rodinVortexCycle, rodinPosition, rodinCoilPattern, rodinCoilStream } from './a432.rodin.coil.ts'
import { rodinDigit, rodinAngle } from './a432.math.ts'
import { VORTEX_ORBIT } from '../../../../../../../../../../index.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}
const dr = (n: number): number => ((n - 1) % 9) + 1
const N = [...Array(41).keys()]

// --- the doubling circuit ------------------------------------------------
check('each step is the digital root of twice the last',
  N.slice(0, 40).every((i) => rodinPosition(i + 1) === dr(2 * rodinPosition(i))),
  N.slice(0, 12).map((i) => rodinPosition(i)).join(' '))

check('the walk closes after six, not seven',
  N.every((i) => rodinPosition(i + 6) === rodinPosition(i))
  && rodinPosition(0) !== rodinPosition(1))

check('no digit ever follows itself',
  N.slice(0, 40).every((i) => rodinPosition(i) !== rodinPosition(i + 1)))

check('every value is in the orbit {1,2,4,8,7,5}',
  N.every((i) => (VORTEX_ORBIT as readonly number[]).includes(rodinPosition(i))))

check('the walk visits all six and no more',
  new Set(N.slice(0, 6).map((i) => rodinPosition(i))).size === 6
  && new Set(N.map((i) => rodinPosition(i))).size === 6)

check('it agrees with the canonical rodinDigit at every index',
  N.every((i) => rodinPosition(i) === rodinDigit(i)),
  'a432.math.ts is the canonical one; this module used to disagree from index 6')

check('a negative index still lands in the orbit',
  [-1, -6, -7, -13].every((i) => (VORTEX_ORBIT as readonly number[]).includes(rodinPosition(i))))

// --- polarity is an involution -------------------------------------------
check('reversing twice is the identity',
  N.every((i) => rodinPosition(i, 1) === rodinVortexCycle(8, 1)[i]))

check('reverse polarity walks the same orbit backwards',
  rodinVortexCycle(1, -1).join(',') === [...VORTEX_ORBIT].reverse().join(','))

check('reverse halves the doubling: each step is the root of half the last',
  rodinVortexCycle(2, -1).slice(0, 11).every((v, i, a) => i === 0 || dr(2 * v) === a[i - 1]))

// --- cycles --------------------------------------------------------------
check('n cycles is exactly n times six values',
  [0, 1, 2, 5].every((n) => rodinVortexCycle(n).length === n * 6))

check('cycle two is cycle one twice',
  rodinVortexCycle(2).join(',') === rodinVortexCycle(1).concat(rodinVortexCycle(1)).join(','))

// --- the pattern ---------------------------------------------------------
const pattern = rodinCoilPattern(3)
check('the pattern has one step per value',
  pattern.length === rodinVortexCycle(3).length)

check('every step carries the angle of the digit standing at its position',
  pattern.every((s) => s.angle === rodinAngle(s.position)),
  'this is what desynchronised from index 7')

check('the value at each position is the value the walk gives there',
  pattern.every((s) => s.value === rodinPosition(s.position)))

check('the digital root of an orbit digit is itself',
  pattern.every((s) => s.digitalRoot === s.value),
  'every element of {1,2,4,8,7,5} is its own digital root')

check('positions are consecutive from zero',
  pattern.every((s, i) => s.position === i))

// --- the stream ----------------------------------------------------------
const stream = rodinCoilStream()
check('the stream carries the orbit it walks',
  (stream.sequence as readonly number[]).join(',') === [...VORTEX_ORBIT].join(','))

check('the stream defaults to two cycles and reports what it used',
  stream.cycles === 2 && stream.pattern.length === 12 && stream.polarity === 1)

check('the stream honours a requested cycle count',
  [1, 3, 4].every((n) => rodinCoilStream(n).pattern.length === n * 6))

console.log(failures === 0
  ? 'a432.rodin.coil ok — the orbit doubles, closes after six, and every angle matches its digit'
  : `a432.rodin.coil FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
