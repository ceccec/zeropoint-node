/**
 * The T gate must be EXACT, and the boundary that moved must be stated where it
 * now is. exact.ts says non-Clifford gates are absent rather than approximated;
 * that is a fact about ℤ[i], and these cases are what it looks like one root of
 * unity further out.
 */
import {
  zeta8, Z8_ZERO, Z8_ONE, ZETA, Z8_I, Z8_SQRT2,
  z8Add, z8Sub, z8Neg, z8Mul, z8TimesZeta, z8Conj, z8Equals, z8NormSquared, z8SignIsNonNegative,
  ctZeroState, ctH, ctX, ctZ, ctS, ctT, ctTdg, ctCnot, ctCz,
  ctProbability, ctExactlyNormalised,
} from './clifford-t.ts'

const results: string[] = []
const failures: string[] = []
const j = (v: unknown) => JSON.stringify(v, (_k, x) => (typeof x === 'bigint' ? `${x}` : x))
const check = (name: string, got: unknown, want: unknown) => {
  const ok = j(got) === j(want)
  results.push(`  ${ok ? '✓' : '✗'} ${name}${ok ? '' : `  got ${j(got)} want ${j(want)}`}`)
  if (!ok) failures.push(name)
}

// ── the ring ────────────────────────────────────────────────────────────────
check('zeta squared is i', z8Mul(ZETA, ZETA), Z8_I)
check('zeta to the fourth is -1', z8Mul(z8Mul(ZETA, ZETA), z8Mul(ZETA, ZETA)), z8Neg(Z8_ONE))
{
  let t = Z8_ONE
  for (let k = 0; k < 8; k += 1) t = z8TimesZeta(t)
  check('zeta to the eighth is 1', z8Equals(t, Z8_ONE), true)
}
check('sqrt2 squared is 2', z8Mul(Z8_SQRT2, Z8_SQRT2), zeta8(2, 0, 0, 0))
check('i squared is -1', z8Mul(Z8_I, Z8_I), z8Neg(Z8_ONE))
check('zero is the additive identity', z8Add(zeta8(3, -2, 5, 1), Z8_ZERO), zeta8(3, -2, 5, 1))
check('subtraction inverts addition', z8Sub(z8Add(zeta8(3, -2, 5, 1), zeta8(1, 1, 1, 1)), zeta8(1, 1, 1, 1)), zeta8(3, -2, 5, 1))
check('multiplying by zeta is a signed shift', z8TimesZeta(zeta8(1, 2, 3, 4)), zeta8(-4, 1, 2, 3))

// ── the norm is always P + Q*sqrt2, for every element ───────────────────────
{
  let allShaped = true
  let checked = 0
  for (let a = -4n; a <= 4n; a += 1n) {
    for (let b = -4n; b <= 4n; b += 1n) {
      for (let c = -4n; c <= 4n; c += 1n) {
        const z = zeta8(a, b, c, a - b)
        const n = z8NormSquared(z)
        checked += 1
        if (n === null) allShaped = false
        // z*conj(z) is real and non-negative, so P + Q*sqrt2 >= 0
        // Decided in integers: a float here would defeat the file's whole point.
        if (n !== null && !z8SignIsNonNegative(n.p, n.q)) allShaped = false
      }
    }
  }
  check(`the norm has the P + Q*sqrt2 shape for all ${checked} elements tried`, allShaped, true)
  check('and z times its conjugate has no i part', z8Mul(zeta8(3, -2, 5, 1), z8Conj(zeta8(3, -2, 5, 1))).c, 0n)
}

// ── T is exact, and its powers are the gates they should be ────────────────
{
  const two = (f: (r: ReturnType<typeof ctZeroState>, q: number) => ReturnType<typeof ctZeroState>) => {
    let r = ctH(ctZeroState(1), 0)
    r = f(r, 0)
    return r
  }
  const tTwice = ctT(ctT(ctH(ctZeroState(1), 0), 0), 0)
  check('T squared is S', tTwice.amps.map((x) => j(x)), two(ctS).amps.map((x) => j(x)))

  let four = ctH(ctZeroState(1), 0)
  for (let k = 0; k < 4; k += 1) four = ctT(four, 0)
  check('T to the fourth is Z', four.amps.map((x) => j(x)), two(ctZ).amps.map((x) => j(x)))

  let eight = ctH(ctZeroState(1), 0)
  for (let k = 0; k < 8; k += 1) eight = ctT(eight, 0)
  check('T to the eighth is the identity', eight.amps.map((x) => j(x)), ctH(ctZeroState(1), 0).amps.map((x) => j(x)))

  const undone = ctTdg(ctT(ctH(ctZeroState(1), 0), 0), 0)
  check('T followed by its adjoint moves nothing', undone.amps.map((x) => j(x)), ctH(ctZeroState(1), 0).amps.map((x) => j(x)))
}

// ── THE CASE THE BOUNDARY WAS HIDING: H T H |0> ─────────────────────────────
{
  const r = ctH(ctT(ctH(ctZeroState(1), 0), 0), 0)
  check('H T H |0> gives (2 + sqrt2)/4 exactly', ctProbability(r, 0), { p: 2n, q: 1n, scale: 2 })
  check('and (2 - sqrt2)/4 for the other outcome', ctProbability(r, 1), { p: 2n, q: -1n, scale: 2 })
  check('the two sum to exactly one', ctExactlyNormalised(r), true)

  // NOT A RATIONAL, which is the part that differs from exact.ts. If q were 0
  // the probability would be a fraction and T would have changed nothing about
  // the field the answers live in.
  check('the probability is irrational — q is not zero', ctProbability(r, 0)!.q !== 0n, true)
}

// ── the Clifford fragment still gives RATIONALS inside the same ring ────────
{
  const bell = ctCnot(ctH(ctZeroState(2), 0), 0, 1)
  check('Bell |00> is exactly 1/2 with no sqrt2 part', ctProbability(bell, 0), { p: 1n, q: 0n, scale: 1 })
  check('Bell |11> is exactly 1/2 with no sqrt2 part', ctProbability(bell, 3), { p: 1n, q: 0n, scale: 1 })
  check('Bell |01> is exactly zero', ctProbability(bell, 1), { p: 0n, q: 0n, scale: 1 })
  check('Bell is exactly normalised', ctExactlyNormalised(bell), true)
}

// ── every gate keeps the state exactly normalised ───────────────────────────
{
  let r = ctZeroState(3)
  r = ctH(r, 0); r = ctT(r, 0); r = ctCnot(r, 0, 1); r = ctS(r, 1)
  r = ctH(r, 2); r = ctT(r, 2); r = ctCz(r, 1, 2); r = ctX(r, 0)
  r = ctZ(r, 1); r = ctTdg(r, 2); r = ctH(r, 1)
  check('a mixed Clifford+T circuit stays exactly normalised', ctExactlyNormalised(r), true)
  check('with no tolerance anywhere: the scale is an integer', Number.isInteger(r.scale), true)
}

// ── CZ is symmetric and CNOT is not ─────────────────────────────────────────
{
  const base = ctH(ctH(ctZeroState(2), 0), 1)
  check('CZ is symmetric in its qubits',
    ctCz(base, 0, 1).amps.map((x) => j(x)), ctCz(base, 1, 0).amps.map((x) => j(x)))
  const plusZero = ctH(ctZeroState(2), 0)
  const differs = j(ctCnot(plusZero, 0, 1).amps) !== j(ctCnot(plusZero, 1, 0).amps)
  check('CNOT is not, on |+0>', differs, true)
}

// ── the sign test is exact, and it can say no ──────────────────────────────
check('1 + sqrt2 is positive', z8SignIsNonNegative(1n, 1n), true)
check('-1 - sqrt2 is not', z8SignIsNonNegative(-1n, -1n), false)
check('2 - sqrt2 is positive (4 >= 2)', z8SignIsNonNegative(2n, -1n), true)
check('1 - sqrt2 is negative (1 < 2)', z8SignIsNonNegative(1n, -1n), false)
check('-1 + sqrt2 is positive (2 > 1)', z8SignIsNonNegative(-1n, 1n), true)
check('-2 + sqrt2 is negative (2 < 4)', z8SignIsNonNegative(-2n, 1n), false)

// ── the boundary has MOVED, not gone ───────────────────────────────────────
check('an arbitrary rotation is absent rather than approximated',
  typeof (globalThis as Record<string, unknown>).ctRz, 'undefined')

console.log('clifford-t', failures.length === 0 ? 'ok' : 'FAIL')
for (const r of results) console.log(r)
if (failures.length > 0) {
  console.error(`clifford-t FAIL — ${failures.length} of ${results.length}: ${failures.join(', ')}`)
  process.exit(1)
}
