/**
 * src/0/algebra — dependency-free numeric spine. No Math.* (and no imports).
 * Same inputs ⇒ same outputs. Ban scanner fails the repo if Math. returns on computing surfaces.
 */

/** 355/113 — fixed rational π (A432-adjacent integer ratio, not Math.PI). */
export const PI = 355 / 113
export const TAU = PI * 2
/** Series base for exp/log — not Math.E. */
export const E = 2718281828459045 / 1_000_000_000_000_000

/** 32-bit signed integer multiply (Math.imul polyfill, no Math). */
export function imul(a: number, b: number): number {
  const a0 = a | 0
  const b0 = b | 0
  const ah = (a0 >>> 16) & 0xffff
  const al = a0 & 0xffff
  const bh = (b0 >>> 16) & 0xffff
  const bl = b0 & 0xffff
  return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)) | 0
}

export function abs(n: number): number {
  return n < 0 ? -n : n
}

export function sign(n: number): number {
  if (n > 0) return 1
  if (n < 0) return -1
  return 0
}

export function trunc(n: number): number {
  return n < 0 ? -floor(-n) : n - (n % 1 || 0)
}

export function floor(n: number): number {
  const m = n % 1
  if (m === 0 || n !== n) return n // integer or NaN
  return n - m - (n < 0 ? 1 : 0)
}

export function ceil(n: number): number {
  const m = n % 1
  if (m === 0 || n !== n) return n
  return n - m + (n > 0 ? 1 : 0)
}

export function round(n: number): number {
  return floor(n + 0.5)
}

/**
 * Rest-only, and defined on the empty case.
 *
 * The previous signature was (a, b?, ...rest), which broke two ways when a
 * caller spread an array:
 *  - TypeScript refused it (TS2556) because a number[] cannot promise a first
 *    argument, so `max(...values)` errored at 13 call sites;
 *  - at runtime an EMPTY array made `a` undefined, and `if (b === undefined)
 *    return a` handed back `undefined` typed as number. Three unguarded sites
 *    could produce it: a432.iter.anatomy.ts:92, a432.meta.ts:158 and
 *    a432.ui.analytics.ts:14.
 *
 * Empty now yields the identity element, matching the standard contract:
 * max() is -Infinity, min() is Infinity. One and two argument calls are
 * unchanged.
 */
export function min(...values: number[]): number {
  let m = Infinity
  for (const x of values) if (x < m) m = x
  return m
}

export function max(...values: number[]): number {
  let m = -Infinity
  for (const x of values) if (x > m) m = x
  return m
}

function reduceAngle(x: number): number {
  let t = x % TAU
  if (t > PI) t -= TAU
  if (t < -PI) t += TAU
  return t
}

/** Taylor sine — no Math.sin. */
export function sin(x: number): number {
  const t = reduceAngle(x)
  let term = t
  let sum = t
  const t2 = t * t
  for (let i = 1; i <= 12; i++) {
    term *= -t2 / (2 * i * (2 * i + 1))
    sum += term
  }
  return sum
}

/** Taylor cosine — no Math.cos. */
export function cos(x: number): number {
  const t = reduceAngle(x)
  let term = 1
  let sum = 1
  const t2 = t * t
  for (let i = 1; i <= 12; i++) {
    term *= -t2 / ((2 * i - 1) * (2 * i))
    sum += term
  }
  return sum
}

export function tan(x: number): number {
  const c = cos(x)
  if (c === 0) return x >= 0 ? 1e16 : -1e16
  return sin(x) / c
}

/** Newton square root — no Math.sqrt. */
export function sqrt(n: number): number {
  if (n <= 0) return 0
  let x = n
  for (let i = 0; i < 24; i++) {
    x = 0.5 * (x + n / x)
  }
  return x
}

export function hypot(a: number, b: number = 0, ...rest: number[]): number {
  let s = a * a + b * b
  for (const x of rest) s += x * x
  return sqrt(s)
}

/**
 * Integer-preferring power; fractional via exp/log.
 *
 * Integer exponents use the ** OPERATOR, which rounds once. The previous
 * exponentiation-by-squaring loop rounded twice for negative exponents: it
 * computed the positive power and then took 1/r. 10^42 squares to exactly
 * 1e42, but 1/1e42 is 9.999999999999999e-43, not 1e-42 — so pow(10, -42) was
 * less accurate than the operator it was written to replace, and it silently
 * made the SI-exact Planck constant inexact.
 *
 * ** is an operator, not a Math.* call, so the ambient-Math ban permits it
 * (verified: npm run math:ban reports 0). The <64 magnitude guard existed only
 * to bound the loop; the operator needs no bound.
 */
export function pow(base: number, exp: number): number {
  if (exp === 0) return 1
  if (base === 0) return exp > 0 ? 0 : Infinity
  if (exp === (exp | 0)) return base ** exp
  return exp_(exp * log(base))
}

/** Taylor exp around 0 after range reduction. */
export function exp_(x: number): number {
  if (x > 88) return Infinity
  if (x < -88) return 0
  // reduce via e^x = 2^(x/ln2) approx using integer + fractional
  const LN2 = 0.6931471805599453
  const n = floor(x / LN2)
  const r = x - n * LN2
  let term = 1
  let sum = 1
  for (let i = 1; i <= 20; i++) {
    term *= r / i
    sum += term
  }
  // multiply by 2^n via bit shifts when possible
  if (n === 0) return sum
  if (n > 0 && n < 31) return sum * (1 << n)
  if (n < 0 && n > -31) return sum / (1 << -n)
  let p = sum
  if (n > 0) for (let i = 0; i < n; i++) p *= 2
  else for (let i = 0; i < -n; i++) p *= 0.5
  return p
}

export { exp_ as exp }

/** Natural log via artanh series on reduced argument. */
export function log(n: number): number {
  if (n <= 0) return NaN
  const LN2 = 0.6931471805599453
  let x = n
  let k = 0
  while (x > 1.5) {
    x *= 0.5
    k++
  }
  while (x < 0.75) {
    x *= 2
    k--
  }
  // log(x) = 2 * atanh((x-1)/(x+1))
  const y = (x - 1) / (x + 1)
  const y2 = y * y
  let term = y
  let sum = y
  for (let i = 1; i <= 24; i++) {
    term *= y2
    sum += term / (2 * i + 1)
  }
  return 2 * sum + k * LN2
}

/** Base-2 log — no Math.log2. */
export function log2(n: number): number {
  const LN2 = 0.6931471805599453
  return log(n) / LN2
}

/**
 * Deterministic unit in [0, 1) from seed — replacement for Math.random identity picks.
 * FNV-ish fold with imul; no ambient entropy.
 */
export function unitFromSeed(seed: string): number {
  let h = 0x811c9dc5 >>> 0
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = imul(h, 0x01000193) >>> 0
  }
  h = imul(h ^ (h >>> 16), 0x85ebca6b) >>> 0
  h = imul(h ^ (h >>> 13), 0xc2b2ae35) >>> 0
  h = (h ^ (h >>> 16)) >>> 0
  return (h % 1_000_000) / 1_000_000
}

export function indexFromSeed(seed: string, length: number): number {
  if (length <= 0) return 0
  let h = 0x811c9dc5 >>> 0
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = imul(h, 0x01000193) >>> 0
  }
  return (h >>> 0) % length
}
