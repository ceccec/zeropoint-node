/**
 * eisenstein.ts — the 60° rotation, carried exactly, with no decimal anywhere.
 *
 * WHY THIS FILE EXISTS. The README once asserted that switching direction by
 * 60° "eliminates decimals and achieves zero entropy" and that, in consequence,
 * "π becomes rational: π → 3 + 0i (exact)". The second claim is false and the
 * whole passage was deleted for it. That deletion was too wide. A claim is
 * false RELATIVE TO A FRAME, and cutting the sentence instead of naming the
 * frame throws away whatever was true in it — four things were, and this file
 * is two of them written as arithmetic rather than as prose.
 *
 * TRUE, AND THE FRAME IT IS TRUE IN.
 *
 * 1. A 60° ROTATION NEEDS NO DECIMALS. ω = e^{iπ/3} satisfies ω² = ω − 1, an
 *    identity with integer coefficients, so the ring ℤ[ω] is closed under
 *    addition and multiplication. Rotating by 60° is (a, b) → (−b, a + b):
 *    two integer operations, exactly, forever. Nothing is approximated and
 *    there is no tolerance in this file. These are the Eisenstein integers.
 *
 * 2. π IS EXACTLY 3, IN UNITS OF 60°. Not as a real number — π is irrational
 *    and no rotation changes that. But a sixth-turn is the unit here, and
 *    π radians is three of them with no remainder. `piInSixthTurns()` returns
 *    the integer 3 and is not a rounding of 3.14159…; it is a count.
 *
 * WHAT REMAINS FALSE, recorded so this file cannot be read as reviving it:
 * π does not become rational, `S = k · 0 · ln(0)` is an indeterminate form and
 * not a derivation, and the entropy of π's digits was never a measured
 * quantity. Those had no frame and are not restored.
 *
 * The connection to this repository's own subject is not decorative: the
 * doubling orbit 1 → 2 → 4 → 8 → 7 → 5 → 1 mod 9 is a six-cycle, and the
 * eigenvalues of a six-cycle are the sixth roots of unity. ω is the primitive
 * one. That is why the angle is 60° and not any other angle, and
 * `sixthRootsOfUnity()` computes the six of them here as exact ring elements.
 */

/** a + bω, with ω = e^{iπ/3}. Both coordinates are integers, always. */
export interface Eisenstein {
  readonly a: bigint
  readonly b: bigint
}

export const eisenstein = (a: bigint | number, b: bigint | number): Eisenstein =>
  ({ a: BigInt(a), b: BigInt(b) })

export const EISENSTEIN_ZERO: Eisenstein = { a: 0n, b: 0n }
export const EISENSTEIN_ONE: Eisenstein = { a: 1n, b: 0n }
/** ω itself: the 60° rotation. */
export const OMEGA: Eisenstein = { a: 0n, b: 1n }

export const eisensteinAdd = (x: Eisenstein, y: Eisenstein): Eisenstein =>
  ({ a: x.a + y.a, b: x.b + y.b })

export const eisensteinSub = (x: Eisenstein, y: Eisenstein): Eisenstein =>
  ({ a: x.a - y.a, b: x.b - y.b })

/**
 * (a + bω)(c + dω) = ac + (ad + bc)ω + bdω², and ω² = ω − 1, so the ω² term
 * folds back into the ring: −bd + (ad + bc + bd)ω. No irrational appears at any
 * point, which is the whole content of "60° eliminates decimals".
 */
export const eisensteinMul = (x: Eisenstein, y: Eisenstein): Eisenstein => ({
  a: x.a * y.a - x.b * y.b,
  b: x.a * y.b + x.b * y.a + x.b * y.b,
})

/** ω̄ = 1 − ω, since ω + ω̄ = 2cos60° = 1. So (a + bω)‾ = (a + b) − bω. */
export const eisensteinConj = (x: Eisenstein): Eisenstein =>
  ({ a: x.a + x.b, b: -x.b })

/** N(a + bω) = a² + ab + b², an integer, and equal to z·z̄. */
export const eisensteinNorm = (x: Eisenstein): bigint =>
  x.a * x.a + x.a * x.b + x.b * x.b

export const eisensteinEquals = (x: Eisenstein, y: Eisenstein): boolean =>
  x.a === y.a && x.b === y.b

/**
 * Rotation by 60°: multiply by ω. (a + bω)ω = aω + bω² = −b + (a + b)ω.
 * Two integer operations. Six applications are the identity, exactly — not to
 * within a tolerance, because there is no arithmetic here that could drift.
 */
export const rotate60 = (x: Eisenstein): Eisenstein =>
  ({ a: -x.b, b: x.a + x.b })

/** The six units of the ring: ω^0 … ω^5, each of norm 1. */
export function sixthRootsOfUnity(): readonly Eisenstein[] {
  const out: Eisenstein[] = []
  let z = EISENSTEIN_ONE
  for (let k = 0; k < 6; k += 1) {
    out.push(z)
    z = rotate60(z)
  }
  return out
}

/**
 * π measured in sixth-turns, which is the unit a 60° rotation defines. Returns
 * the integer 3 because π = 3·(π/3) exactly. It is a count of units, not an
 * approximation of 3.14159…, and it does not make π rational.
 */
export const piInSixthTurns = (): bigint => 3n

/**
 * The doubling orbit mod 9, which is a six-cycle — the reason the angle is 60°.
 * A cyclic permutation of six elements has the sixth roots of unity as its
 * eigenvalues, and ω is the primitive one.
 */
export function doublingOrbit(): readonly number[] {
  const out: number[] = []
  let x = 1
  for (let i = 0; i < 6; i += 1) {
    out.push(x)
    x = (2 * x) % 9 === 0 ? 9 : (2 * x) % 9
  }
  return out
}
