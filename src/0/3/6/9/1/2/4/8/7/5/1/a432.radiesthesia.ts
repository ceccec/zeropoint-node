/**
 * a432.radiesthesia.ts — the conventions of radiesthesia as exact arithmetic.
 *
 * Radiesthesia is dowsing: a pendulum or rod, a scale to read it against, and a
 * colour wheel to name what was read. This module carries the three conventions
 * a practitioner actually computes with — the pendulum's period, the Bovis
 * scale, and the twelve-ray equator of the Chaumery–de Bélizal universal
 * pendulum — and nothing else.
 *
 * WHAT THIS MEASURES: nothing. No field is detected, no substance is rated, no
 * effect on anything is asserted. The kernel's honesty ledger refuses exactly
 * those claims and this module does not reopen them. What is here is the
 * bookkeeping the practice uses, written so an outsider can recompute it.
 *
 * WHAT IS PHYSICS AND WHAT IS CONVENTION, kept apart by name:
 *
 *   pendulum*   ordinary mechanics. The period of a simple pendulum is
 *               T = 2π·√(L/g). In the frame g = π² — the seconds pendulum, the
 *               1790 proposal for the metre — that is T = 2·√L with no decimal
 *               anywhere, and it is EXACT whenever L is a rational square. The
 *               frame is named in SECONDS_PENDULUM_FRAME and a length that is
 *               not a rational square is refused rather than rounded.
 *
 *   bovis*      a convention. 6500 is the neutral point of the Bovis biometer
 *               (Simoneton, Radiations des aliments, 1949) and the four classes
 *               are his. They are integers on a scale, not measurements.
 *
 *   ray*        a convention. Twelve names at 30 degree steps around the
 *               equator of the universal pendulum, positive green at north and
 *               red at west, negative green diametrically opposite positive
 *               green, infrared beside red, ultraviolet beside violet. The
 *               order pinned here is the one the pendulum's own meridian
 *               listing gives (Centre Amyris, pendule universel); sources
 *               differ on whether ultraviolet sits before or after violet, and
 *               the tests pin the adjacency, not the side.
 *
 * Fractions, not floats: every pendulum quantity is a Fraction from a432.math,
 * reduced by its simplify, and every ray angle is an integer of degrees.
 */

import { type Fraction, simplify } from './a432.math.ts'
import { legacyDigitalRoot, harmonicRoot12 } from './a432.roots.ts'
import { A432_FREQUENCY } from './a432.core.ts'
import { floor } from './a432.algebra.ts'

// ─── the universal pendulum's equator ────────────────────────────────────────

/** Degrees between neighbouring rays: twelve rays close the circle. */
export const RAY_STEP_DEGREES = 30
export const RAY_COUNT = 12

/**
 * The twelve rays in equatorial order, index 0 at north, advancing clockwise.
 * Symbols are the French ones the literature uses: J jaune, Bc blanc, N noir.
 */
export const UNIVERSAL_PENDULUM_EQUATOR: readonly { readonly name: string; readonly symbol: string }[] = [
  { name: 'positive green', symbol: 'V+' },
  { name: 'blue', symbol: 'Bl' },
  { name: 'indigo', symbol: 'I' },
  { name: 'ultraviolet', symbol: 'UV' },
  { name: 'violet', symbol: 'Vi' },
  { name: 'white', symbol: 'Bc' },
  { name: 'negative green', symbol: 'V-' },
  { name: 'black', symbol: 'N' },
  { name: 'infrared', symbol: 'IR' },
  { name: 'red', symbol: 'R' },
  { name: 'orange', symbol: 'O' },
  { name: 'yellow', symbol: 'J' },
]

export interface RadiesthesiaRay {
  readonly name: string
  readonly symbol: string
  /** Degrees clockwise from north (positive green). */
  readonly angle: number
  /** Position on the base-12 wheel, 1..12, through the a432 harmonic root. */
  readonly harmonic: number
  readonly opposite: string
}

function rayIndex(name: string): number {
  const key = name.trim().toLowerCase()
  const i = UNIVERSAL_PENDULUM_EQUATOR.findIndex((r) => r.name === key || r.symbol.toLowerCase() === key)
  if (i === -1) throw new RangeError(`not a ray of the universal pendulum: ${JSON.stringify(name)}`)
  return i
}

/** Degrees clockwise from north for a ray, by name or symbol. */
export function rayAngle(name: string): number {
  return rayIndex(name) * RAY_STEP_DEGREES
}

/**
 * The ray at an integer angle. A pendulum reads a position; this refuses to
 * round one, so an angle that is not a multiple of the step is an error rather
 * than the nearest ray.
 */
export function rayAt(angleDeg: number): string {
  if (!Number.isInteger(angleDeg)) throw new RangeError(`angle must be an integer of degrees, got ${angleDeg}`)
  const full = RAY_STEP_DEGREES * RAY_COUNT
  const a = ((angleDeg % full) + full) % full
  if (a % RAY_STEP_DEGREES !== 0) throw new RangeError(`${angleDeg} degrees lies between rays`)
  return UNIVERSAL_PENDULUM_EQUATOR[a / RAY_STEP_DEGREES]!.name
}

/** The ray diametrically opposite: six steps, half a turn. */
export function rayOpposite(name: string): string {
  const i = rayIndex(name)
  return UNIVERSAL_PENDULUM_EQUATOR[(i + RAY_COUNT / 2) % RAY_COUNT]!.name
}

/** The ray's place on the base-12 wheel, 1..12 — the a432 harmonic root of its ordinal. */
export function rayHarmonic(name: string): number {
  return harmonicRoot12(rayIndex(name) + 1)
}

/** The whole equator, each ray with its angle, harmonic and opposite. */
export function universalPendulum(): readonly RadiesthesiaRay[] {
  return UNIVERSAL_PENDULUM_EQUATOR.map((r) => ({
    name: r.name,
    symbol: r.symbol,
    angle: rayAngle(r.name),
    harmonic: rayHarmonic(r.name),
    opposite: rayOpposite(r.name),
  }))
}

// ─── the Bovis scale ─────────────────────────────────────────────────────────

/** The biometer's neutral point. Integers on a scale; not a measurement of anything. */
export const BOVIS_NEUTRAL = 6500

/**
 * Simoneton's four classes, as half-open bands over the non-negative integers.
 * `max` is exclusive; the last band is unbounded, and says so with null rather
 * than Infinity, which no exported value here may carry. Together they
 * partition the scale — the test asserts that, so a fifth band cannot arrive
 * with a gap.
 */
export const BOVIS_CLASSES: readonly { readonly name: string; readonly min: number; readonly max: number | null }[] = [
  { name: 'dead', min: 0, max: 1 },
  { name: 'inferior', min: 1, max: 3000 },
  { name: 'support', min: 3000, max: BOVIS_NEUTRAL },
  { name: 'superior', min: BOVIS_NEUTRAL, max: null },
]

function bovisUnits(units: number): number {
  if (!Number.isInteger(units) || units < 0) throw new RangeError(`Bovis units are non-negative integers, got ${units}`)
  return units
}

/** Which of Simoneton's classes an integer reading falls in. */
export function bovisClass(units: number): string {
  const u = bovisUnits(units)
  const band = BOVIS_CLASSES.find((b) => u >= b.min && (b.max === null || u < b.max))
  if (!band) throw new RangeError(`no Bovis class holds ${units}`)
  return band.name
}

/** -1 below the neutral point, 0 at it, 1 above. */
export function bovisRelativeToNeutral(units: number): -1 | 0 | 1 {
  const u = bovisUnits(units)
  return u < BOVIS_NEUTRAL ? -1 : u === BOVIS_NEUTRAL ? 0 : 1
}

/** The reading folded to a digit by the legacy root (0 stays 0). */
export function bovisDigit(units: number): number {
  return legacyDigitalRoot(bovisUnits(units))
}

// ─── the pendulum ────────────────────────────────────────────────────────────

/**
 * The frame every pendulum* function computes in. With g = π² the 2π and the
 * √g cancel and T = 2·√L; the pendulum of length 1 beats seconds. Outside this
 * frame the same lengths give periods a factor π/√g away — about 0.3% in SI.
 */
export const SECONDS_PENDULUM_FRAME = 'g = π²: T = 2·√L, exact when L is a rational square; the pendulum of length 1 has period 2'

/**
 * The exact integer square root, or null when n is not a perfect square.
 * Integer Newton descent; the final equality is what makes it exact rather
 * than close.
 */
export function exactIntegerSqrt(n: number): number | null {
  if (!Number.isSafeInteger(n) || n < 0) return null
  if (n < 2) return n
  let x = n
  let y = floor((x + 1) / 2)
  while (y < x) {
    x = y
    y = floor((x + floor(n / x)) / 2)
  }
  return x * x === n ? x : null
}

function positiveFraction(f: Fraction, what: string): { p: number; q: number } {
  if (typeof f !== 'object' || f === null) throw new TypeError(`${what} must be a Fraction`)
  const { numerator: p, denominator: q } = f
  if (!Number.isSafeInteger(p) || !Number.isSafeInteger(q)) throw new RangeError(`${what} must be a ratio of safe integers, got ${p}/${q}`)
  if (p <= 0 || q <= 0) throw new RangeError(`${what} must be positive, got ${p}/${q}`)
  return { p, q }
}

/** √(p/q) = √(p·q)/q, so the length is a rational square exactly when p·q is a perfect square. */
export function isRationalSquare(f: Fraction): boolean {
  const { p, q } = positiveFraction(f, 'value')
  if (!Number.isSafeInteger(p * q)) return false
  return exactIntegerSqrt(p * q) !== null
}

function rootOfLength(length: Fraction): { root: number; q: number } {
  const { p, q } = positiveFraction(length, 'length')
  if (!Number.isSafeInteger(p * q)) throw new RangeError(`length ${p}/${q} is too large to root exactly`)
  const root = exactIntegerSqrt(p * q)
  if (root === null) throw new RangeError(`length ${p}/${q} is not a rational square, so its period is not a fraction in the ${SECONDS_PENDULUM_FRAME.split(':')[0]} frame`)
  return { root, q }
}

/** Period T = 2·√L, as a reduced fraction. Refuses a length that is not a rational square. */
export function pendulumPeriod(length: Fraction): Fraction {
  const { root, q } = rootOfLength(length)
  return simplify({ numerator: 2 * root, denominator: q })
}

/** Frequency 1/T = 1/(2·√L). */
export function pendulumFrequency(length: Fraction): Fraction {
  const { root, q } = rootOfLength(length)
  return simplify({ numerator: q, denominator: 2 * root })
}

/** The inverse: L = T²/4, exact for every positive period. */
export function pendulumLengthForPeriod(period: Fraction): Fraction {
  const { p, q } = positiveFraction(period, 'period')
  return simplify({ numerator: p * p, denominator: 4 * q * q })
}

/** How many cycles of A432 pass in one swing: 432·T. The seconds pendulum gives 864. */
export function pendulumA432Ratio(length: Fraction): Fraction {
  const { root, q } = rootOfLength(length)
  return simplify({ numerator: A432_FREQUENCY * 2 * root, denominator: q })
}
