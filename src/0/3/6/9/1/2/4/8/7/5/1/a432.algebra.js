/**
 * a432.algebra.js — browser ESM spine (no Math.*). Mirrors src/0/algebra.ts.
 * Feed tip surfaces export-surface drift vs a432.algebra.ts re-exports.
 */
export const PI = 355 / 113
export const TAU = PI * 2
export const E = 2718281828459045 / 1_000_000_000_000_000

export function imul(a, b) {
  const a0 = a | 0
  const b0 = b | 0
  const ah = (a0 >>> 16) & 0xffff
  const al = a0 & 0xffff
  const bh = (b0 >>> 16) & 0xffff
  const bl = b0 & 0xffff
  return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)) | 0
}

export function abs(n) {
  return n < 0 ? -n : n
}

export function sign(n) {
  if (n > 0) return 1
  if (n < 0) return -1
  return 0
}

export function trunc(n) {
  return n < 0 ? -floor(-n) : n - (n % 1 || 0)
}

export function floor(n) {
  const m = n % 1
  if (m === 0 || n !== n) return n
  return n - m - (n < 0 ? 1 : 0)
}

export function ceil(n) {
  const m = n % 1
  if (m === 0 || n !== n) return n
  return n - m + (n > 0 ? 1 : 0)
}

export function round(n) {
  return floor(n + 0.5)
}

export function min(a, b, ...rest) {
  if (b === undefined) return a
  let m = a < b ? a : b
  for (const x of rest) if (x < m) m = x
  return m
}

export function max(a, b, ...rest) {
  if (b === undefined) return a
  let m = a > b ? a : b
  for (const x of rest) if (x > m) m = x
  return m
}

function reduceAngle(x) {
  let t = x % TAU
  if (t > PI) t -= TAU
  if (t < -PI) t += TAU
  return t
}

export function sin(x) {
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

export function cos(x) {
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

export function tan(x) {
  const c = cos(x)
  if (c === 0) return x >= 0 ? 1e16 : -1e16
  return sin(x) / c
}

export function sqrt(n) {
  if (n <= 0) return 0
  let x = n
  for (let i = 0; i < 24; i++) {
    x = 0.5 * (x + n / x)
  }
  return x
}

export function hypot(a, b = 0, ...rest) {
  let s = a * a + b * b
  for (const x of rest) s += x * x
  return sqrt(s)
}

export function pow(base, exp) {
  if (exp === 0) return 1
  if (base === 0) return exp > 0 ? 0 : Infinity
  if (exp === (exp | 0) && abs(exp) < 64) {
    let e = exp | 0
    let b = base
    let r = 1
    const neg = e < 0
    if (neg) e = -e
    while (e > 0) {
      if (e & 1) r *= b
      b *= b
      e >>= 1
    }
    return neg ? 1 / r : r
  }
  return exp_(exp * log(base))
}

export function exp_(x) {
  if (x > 88) return Infinity
  if (x < -88) return 0
  const LN2 = 0.6931471805599453
  const n = floor(x / LN2)
  const r = x - n * LN2
  let term = 1
  let sum = 1
  for (let i = 1; i <= 20; i++) {
    term *= r / i
    sum += term
  }
  if (n === 0) return sum
  if (n > 0 && n < 31) return sum * (1 << n)
  if (n < 0 && n > -31) return sum / (1 << -n)
  let p = sum
  if (n > 0) for (let i = 0; i < n; i++) p *= 2
  else for (let i = 0; i < -n; i++) p *= 0.5
  return p
}

export { exp_ as exp }

export function log(n) {
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

export function log2(n) {
  const LN2 = 0.6931471805599453
  return log(n) / LN2
}

export function unitFromSeed(seed) {
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

export function indexFromSeed(seed, length) {
  if (length <= 0) return 0
  let h = 0x811c9dc5 >>> 0
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = imul(h, 0x01000193) >>> 0
  }
  return (h >>> 0) % length
}
