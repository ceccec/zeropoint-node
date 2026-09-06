/**
 * clifford-t.ts — the T gate, exactly, in ℤ[ζ₈].
 *
 * WHY THIS FILE EXISTS. `exact.ts` carries the Clifford fragment with no floats
 * and says, in its own words, that non-Clifford gates are ABSENT rather than
 * approximated. That sentence is true and it is not about exactness — it is
 * about ℤ[i]. Clifford amplitudes are (x + yi)/√2^k, and T = diag(1, e^{iπ/4})
 * leaves that ring, so within it the only honest options are absence or
 * approximation. One root of unity further out the choice disappears.
 *
 * The negation was the address, not the end of the matter. It is ledgered as
 * such by `npm run withdrawn`, which is where this file was owed.
 *
 * THE RING. ζ = e^{iπ/4} satisfies ζ⁴ = −1, so every element is a + bζ + cζ² +
 * dζ³ with integer coefficients, and ζ² = i sits inside it — ℤ[i] is a
 * subring, which is why everything exact.ts does still works here. Two facts
 * make the arithmetic close:
 *
 *   multiplying by ζ is (a, b, c, d) → (−d, a, b, c), a signed shift
 *   √2 = ζ − ζ³, so dividing by √2 is a change of scale and not of kind
 *
 * Amplitudes are therefore (a + bζ + cζ² + dζ³)/√2^scale with integer
 * coefficients and an integer scale. Nothing is rounded and there is no
 * tolerance anywhere in this file.
 *
 * WHAT CHANGES, AND IT IS NOT NOTHING. In the Clifford fragment probabilities
 * are RATIONAL — exact.ts returns 1/2 as a fraction. Here they are not.
 * z·z̄ has zero ζ² part and b = −d for every z, so it equals P + Q√2 with P and
 * Q integers, and a probability is (P + Q√2)/2^scale. Still exact, still no
 * float, but living in ℤ[√2] rather than ℚ. H·T·H on |0⟩ gives (2 + √2)/4,
 * which is exact here and is not a rational number.
 *
 * WHAT IS STILL ABSENT, and absent rather than approximated for the same
 * reason as before: rx, ry and rz at an arbitrary angle. Clifford+T is
 * universal only in the sense that it APPROXIMATES an arbitrary rotation to
 * any desired accuracy, and an approximation is what this file exists not to
 * do. The boundary has moved; it has not gone.
 */

/** a + bζ + cζ² + dζ³, with ζ = e^{iπ/4} and ζ⁴ = −1. */
export interface Zeta8 {
  readonly a: bigint
  readonly b: bigint
  readonly c: bigint
  readonly d: bigint
}

export const zeta8 = (a: bigint | number, b: bigint | number, c: bigint | number, d: bigint | number): Zeta8 =>
  ({ a: BigInt(a), b: BigInt(b), c: BigInt(c), d: BigInt(d) })

export const Z8_ZERO: Zeta8 = { a: 0n, b: 0n, c: 0n, d: 0n }
export const Z8_ONE: Zeta8 = { a: 1n, b: 0n, c: 0n, d: 0n }
/** ζ itself — the eighth root of unity, and the T gate's whole content. */
export const ZETA: Zeta8 = { a: 0n, b: 1n, c: 0n, d: 0n }
/** ζ² = i, so the Gaussian integers are a subring. */
export const Z8_I: Zeta8 = { a: 0n, b: 0n, c: 1n, d: 0n }
/** √2 = ζ − ζ³. Real, and inside the ring. */
export const Z8_SQRT2: Zeta8 = { a: 0n, b: 1n, c: 0n, d: -1n }

export const z8Add = (x: Zeta8, y: Zeta8): Zeta8 =>
  ({ a: x.a + y.a, b: x.b + y.b, c: x.c + y.c, d: x.d + y.d })

export const z8Sub = (x: Zeta8, y: Zeta8): Zeta8 =>
  ({ a: x.a - y.a, b: x.b - y.b, c: x.c - y.c, d: x.d - y.d })

export const z8Neg = (x: Zeta8): Zeta8 => ({ a: -x.a, b: -x.b, c: -x.c, d: -x.d })

/**
 * Multiply, then fold the overflow with ζ⁴ = −1: ζ⁴ → −1, ζ⁵ → −ζ, ζ⁶ → −ζ².
 * No irrational appears at any step, which is the content of the claim.
 */
export function z8Mul(x: Zeta8, y: Zeta8): Zeta8 {
  const p = [x.a, x.b, x.c, x.d]
  const q = [y.a, y.b, y.c, y.d]
  const r = [0n, 0n, 0n, 0n, 0n, 0n, 0n]
  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < 4; j += 1) r[i + j] += p[i]! * q[j]!
  }
  return { a: r[0]! - r[4]!, b: r[1]! - r[5]!, c: r[2]! - r[6]!, d: r[3]! }
}

/** Multiplying by ζ is a signed shift — the T gate costs four moves. */
export const z8TimesZeta = (x: Zeta8): Zeta8 => ({ a: -x.d, b: x.a, c: x.b, d: x.c })

/** ζ̄ = ζ⁷ = −ζ³, ζ²‾ = −ζ², ζ³‾ = −ζ. */
export const z8Conj = (x: Zeta8): Zeta8 => ({ a: x.a, b: -x.d, c: -x.c, d: -x.b })

export const z8Equals = (x: Zeta8, y: Zeta8): boolean =>
  x.a === y.a && x.b === y.b && x.c === y.c && x.d === y.d

/**
 * |z|² = z·z̄, which is always P + Q√2 with P and Q integers — the ζ² part
 * cancels and the ζ³ part is the negative of the ζ part, for every z. That is
 * checked rather than assumed: a value that did not have this shape would mean
 * the ring arithmetic above is wrong, and this returns null instead of a
 * plausible number.
 */
export function z8NormSquared(x: Zeta8): { p: bigint; q: bigint } | null {
  const n = z8Mul(x, z8Conj(x))
  if (n.c !== 0n || n.b !== -n.d) return null
  return { p: n.a, q: n.b }
}

/** Amplitudes are amps[i] / √2^scale. */
export interface CliffordTRegister {
  readonly n: number
  readonly amps: readonly Zeta8[]
  readonly scale: number
}

export function ctZeroState(n: number): CliffordTRegister {
  const amps = new Array<Zeta8>(1 << n).fill(Z8_ZERO)
  amps[0] = Z8_ONE
  return { n, amps, scale: 0 }
}

const mapPairs = (
  r: CliffordTRegister,
  q: number,
  f: (lo: Zeta8, hi: Zeta8) => readonly [Zeta8, Zeta8],
  scaleDelta = 0,
): CliffordTRegister => {
  const amps = [...r.amps]
  const bit = 1 << q
  for (let i = 0; i < amps.length; i += 1) {
    if ((i & bit) !== 0) continue
    const [lo, hi] = f(amps[i]!, amps[i | bit]!)
    amps[i] = lo
    amps[i | bit] = hi
  }
  return { n: r.n, amps, scale: r.scale + scaleDelta }
}

/** H is (x, y) → (x + y, x − y) with the scale up by one. Exactly as in ℤ[i]. */
export const ctH = (r: CliffordTRegister, q: number): CliffordTRegister =>
  mapPairs(r, q, (x, y) => [z8Add(x, y), z8Sub(x, y)], 1)

export const ctX = (r: CliffordTRegister, q: number): CliffordTRegister =>
  mapPairs(r, q, (x, y) => [y, x])

export const ctZ = (r: CliffordTRegister, q: number): CliffordTRegister =>
  mapPairs(r, q, (x, y) => [x, z8Neg(y)])

/** S = diag(1, i) = diag(1, ζ²). */
export const ctS = (r: CliffordTRegister, q: number): CliffordTRegister =>
  mapPairs(r, q, (x, y) => [x, z8TimesZeta(z8TimesZeta(y))])

/**
 * T = diag(1, ζ). THE GATE THIS FILE IS FOR. One signed shift on the half of
 * the register whose qubit is set, and nothing else.
 */
export const ctT = (r: CliffordTRegister, q: number): CliffordTRegister =>
  mapPairs(r, q, (x, y) => [x, z8TimesZeta(y)])

/** T† = diag(1, ζ⁷) = diag(1, −ζ³): seven shifts, or one the other way. */
export const ctTdg = (r: CliffordTRegister, q: number): CliffordTRegister =>
  mapPairs(r, q, (x, y) => [x, z8Mul(y, { a: 0n, b: 0n, c: 0n, d: -1n })])

export function ctCnot(r: CliffordTRegister, control: number, target: number): CliffordTRegister {
  const amps = [...r.amps]
  const cb = 1 << control
  const tb = 1 << target
  for (let i = 0; i < amps.length; i += 1) {
    if ((i & cb) === 0 || (i & tb) !== 0) continue
    const j = i | tb
    const t = amps[i]!
    amps[i] = amps[j]!
    amps[j] = t
  }
  return { n: r.n, amps, scale: r.scale }
}

export function ctCz(r: CliffordTRegister, a: number, b: number): CliffordTRegister {
  const amps = [...r.amps]
  const ab = 1 << a
  const bb = 1 << b
  for (let i = 0; i < amps.length; i += 1) if ((i & ab) !== 0 && (i & bb) !== 0) amps[i] = z8Neg(amps[i]!)
  return { n: r.n, amps, scale: r.scale }
}

/**
 * The probability of one outcome, as (p + q√2)/2^scale. Not a rational: the
 * Clifford fragment's probabilities are, and T is exactly what takes them out
 * of ℚ and into ℤ[√2].
 */
export function ctProbability(r: CliffordTRegister, index: number): { p: bigint; q: bigint; scale: number } | null {
  const n = z8NormSquared(r.amps[index]!)
  if (n === null) return null
  return { p: n.p, q: n.q, scale: r.scale }
}

/**
 * Exactly normalised, with NO TOLERANCE. The probabilities sum to
 * (Σp + Σq√2)/2^scale, and that is 1 exactly when Σp = 2^scale and Σq = 0 —
 * two integer equalities, because √2 is irrational and so the rational and
 * irrational parts must match separately.
 */
export function ctExactlyNormalised(r: CliffordTRegister): boolean {
  let p = 0n
  let q = 0n
  for (let i = 0; i < r.amps.length; i += 1) {
    const n = z8NormSquared(r.amps[i]!)
    if (n === null) return false
    p += n.p
    q += n.q
  }
  return q === 0n && p === 2n ** BigInt(r.scale)
}

/**
 * Is P + Q√2 non-negative? Decided in integers, because deciding it in floats
 * would put a float in the one file whose subject is not having any. √2 is
 * irrational, so P + Q√2 is never zero unless P and Q both are, and the sign
 * follows from comparing squares with the sign of each part accounted for.
 *
 * The first version of this compared `Number(p) + Number(q) * Math.SQRT2` and
 * math:ban rejected it, correctly: a module that carries exact arithmetic and
 * then reaches for Math.SQRT2 to say something ABOUT that arithmetic has
 * smuggled the thing back in through the description.
 */
export function z8SignIsNonNegative(p: bigint, q: bigint): boolean {
  if (p >= 0n && q >= 0n) return true
  if (p < 0n && q < 0n) return false
  // Opposite signs: compare P² against 2Q², which is exact in integers.
  return p >= 0n ? p * p >= 2n * q * q : 2n * q * q > p * p
}
