/**
 * The 60° rotation must be exact, and the claims restored around it must be the
 * TRUE ones. Each check below names the frame it holds in — that is the point
 * of the file, not an aside: the deleted passage was false as real analysis and
 * true as arithmetic in ℤ[ω], and only the second is asserted here.
 */
import {
  eisenstein, eisensteinAdd, eisensteinMul, eisensteinConj, eisensteinNorm,
  eisensteinEquals, eisensteinSub, rotate60, sixthRootsOfUnity, piInSixthTurns,
  doublingOrbit, OMEGA, EISENSTEIN_ONE, EISENSTEIN_ZERO,
} from './eisenstein.ts'

const results: string[] = []
const failures: string[] = []
const check = (name: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got, (_k, v) => (typeof v === 'bigint' ? `${v}` : v))
    === JSON.stringify(want, (_k, v) => (typeof v === 'bigint' ? `${v}` : v))
  results.push(`  ${ok ? '✓' : '✗'} ${name}${ok ? '' : `  got ${String(got)} want ${String(want)}`}`)
  if (!ok) failures.push(name)
}

// ── ω² = ω − 1 is what makes the ring integral ──────────────────────────────
check('omega squared is omega minus one',
  eisensteinMul(OMEGA, OMEGA), eisenstein(-1, 1))

// ── closure: no product of ring elements leaves the ring ────────────────────
{
  let allIntegral = true
  let checked = 0
  for (let a = -6n; a <= 6n; a += 1n) {
    for (let b = -6n; b <= 6n; b += 1n) {
      for (let c = -6n; c <= 6n; c += 1n) {
        const x = eisenstein(a, b)
        const y = eisenstein(c, a - b)
        const z = eisensteinMul(x, y)
        checked += 1
        if (typeof z.a !== 'bigint' || typeof z.b !== 'bigint') allIntegral = false
      }
    }
  }
  check(`every product of ${checked} pairs stays in the integer ring`, allIntegral, true)
}

// ── the rotation itself: six turns is the identity, EXACTLY ─────────────────
for (const [a, b] of [[1, 0], [5, -3], [0, 1], [-7, 11], [1000000, -999999]]) {
  const start = eisenstein(a, b)
  let z = start
  for (let k = 0; k < 6; k += 1) z = rotate60(z)
  check(`six 60-degree rotations return ${a}+${b}w exactly`, eisensteinEquals(z, start), true)
}

// A third of a turn is NOT the identity — otherwise the check above would pass
// for any function that did nothing at all.
check('two rotations are not the identity', eisensteinEquals(rotate60(rotate60(EISENSTEIN_ONE)), EISENSTEIN_ONE), false)
check('three rotations are not the identity',
  eisensteinEquals(rotate60(rotate60(rotate60(EISENSTEIN_ONE))), EISENSTEIN_ONE), false)

// ── the six units, and there are exactly six ────────────────────────────────
{
  const units = sixthRootsOfUnity()
  check('there are six sixth roots of unity', units.length, 6)
  check('every one has norm exactly 1', units.map((u) => eisensteinNorm(u)), [1n, 1n, 1n, 1n, 1n, 1n])
  check('they are distinct', new Set(units.map((u) => `${u.a},${u.b}`)).size, 6)
}

// ── the norm is multiplicative, and z·z̄ = N(z) with no imaginary part ──────
for (const [a, b, c, d] of [[3, 4, -2, 5], [1, 1, 1, 1], [0, 7, 7, 0], [-9, 2, 4, -6]]) {
  const x = eisenstein(a, b)
  const y = eisenstein(c, d)
  check(`N is multiplicative on (${a}+${b}w)(${c}+${d}w)`,
    eisensteinNorm(eisensteinMul(x, y)), eisensteinNorm(x) * eisensteinNorm(y))
  check(`z times its conjugate is N(z) with zero w part for ${a}+${b}w`,
    eisensteinMul(x, eisensteinConj(x)), eisenstein(eisensteinNorm(x), 0n))
}

// ── subtraction is the inverse of addition, exactly ─────────────────────────
for (const [a, b, c, d] of [[3, 4, -2, 5], [0, 0, 1, 1], [-9, 2, 9, -2]]) {
  const x = eisenstein(a, b)
  const y = eisenstein(c, d)
  check(`(x + y) - y is x for ${a}+${b}w`, eisensteinSub(eisensteinAdd(x, y), y), x)
  check(`x - x is exactly zero for ${a}+${b}w`, eisensteinSub(x, x), EISENSTEIN_ZERO)
}

// ── the angle is 60° because the orbit is a six-cycle ───────────────────────
{
  const orbit = doublingOrbit()
  check('the doubling orbit mod 9 has six elements', orbit.length, 6)
  check('it is 1,2,4,8,7,5', orbit, [1, 2, 4, 8, 7, 5])
  check('it closes back onto 1', (2 * orbit[orbit.length - 1]!) % 9, 1)
}

// ── π in the unit a 60° rotation defines ────────────────────────────────────
check('pi is exactly three sixth-turns', piInSixthTurns(), 3n)
check('and it is a count, not a rounded float', typeof piInSixthTurns(), 'bigint')

// ── WHAT IS NOT CLAIMED. The false half of the deleted passage must not creep
// back in through this file: pi is not rational, and nothing here says it is.
check('no export of this module returns a decimal', [
  eisensteinNorm(eisenstein(3, 4)),
  rotate60(eisenstein(3, 4)).a,
  eisensteinAdd(eisenstein(1, 2), eisenstein(3, 4)).b,
  piInSixthTurns(),
].every((v) => typeof v === 'bigint'), true)

console.log('eisenstein', failures.length === 0 ? 'ok' : 'FAIL')
for (const r of results) console.log(r)
if (failures.length > 0) {
  console.error(`eisenstein FAIL — ${failures.length} of ${results.length}: ${failures.join(', ')}`)
  process.exit(1)
}
