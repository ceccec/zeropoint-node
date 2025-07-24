/**
 * 
 * a432.math.ts — Canonical numeric formulas for the A432 matrix
 * -------------------------------------------------------------
 * All low-level math used by other a432 modules lives here so that
 * every computation references a single, zero-entropy source.
 */

// Canonical trinity axis constant (no external dependency)
export const TRINITY_AXIS: number[] = [3, 6, 9];
export const A432_TRINITY: readonly [4,3,2] = [4, 3, 2];
export const A432_RETURN:  readonly [8,7,5] = [8, 7, 5];
export const A432_AXIS:    readonly [9,6,3] = [9, 6, 3];

// ——————————————————————————————————————————
// Cycles vs sequences — canonical helpers
// ---------------------------------------------------------

export const A432_SEQUENCE: readonly number[] = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1];
/** @deprecated use A432_SEQUENCE */
export const A432_CYCLE = A432_SEQUENCE;

/**
 * Create an infinite generator that endlessly yields the elements of a closed cycle.
 */
export function* cycleStream<T>(cycle: readonly T[]): IterableIterator<T> {
  while (true) {
    yield* cycle;
  }
}

/** Infinite A432 vortex sequence (metric cycle). */
export function* a432SequenceStream(): IterableIterator<number> {
  yield* cycleStream(A432_SEQUENCE);
}

// Unified import of branded numeric helpers and mappings from a432.types
import type { Digit, Hz, AngleDeg } from './a432.types';
import { asDigit, asHz, asAngle, toImperial, toTrinity, METRIC_VORTEX, TRINITY_MAP } from './a432.types';

// Re-export so external modules keep same API surface
export { Digit, Hz, AngleDeg, asDigit, asHz, asAngle };

// ——————————————————————————————————————————
// 1. Digital Root
// ---------------------------------------------------------
export function digitalRoot(n: number): number {
  if (n === 0) return 0;
  const r = n % 9;
  return r === 0 ? 9 : r;
}

// ——————————————————————————————————————————
// 2. Trinity Axis & Polarity
//   3 → +1 6 → –1 9 → 0
// ---------------------------------------------------------
// (Polarity mapping declared later with full Digit support.)

// ——————————————————————————————————————————
// 3. Rodin Doubling Sequence  (2^k mod 9)
// ---------------------------------------------------------
export const RODIN_SEQUENCE: number[] = [1, 2, 4, 8, 7, 5, 1];

export function rodinDigit(k: number): number {
  const seq = RODIN_SEQUENCE;
  return seq[k % (seq.length - 1)]; // omit duplicate closing 1 in period calc
}

// ——————————————————————————————————————————
// 4. 11-step Pattern   0 → 3 6 9 → 1 2 4 8 7 5 → repeat
// ---------------------------------------------------------
export const FULL_PATTERN: number[] = [0, ...TRINITY_AXIS, 1, 2, 4, 8, 7, 5, 1];

/**
 * Returns the i-th digit of the infinite pattern where i≥0.
 */
export function patternDigit(i: number): number {
  if (i === 0) return 0;
  if (i <= 3) return TRINITY_AXIS[i - 1];
  return rodinDigit(i - 4);
}

// ——————————————————————————————————————————
// 5. Harmonic Mappings
// ---------------------------------------------------------

/** Angle (degrees) for a pattern digit.
 *  3 → 0°, 6 → 120°, 9 → 240°
 *  Rodin digits follow 60°·k.
 */
export function angleForDigit(d: number): number {
  if (d === 3) return 0;
  if (d === 6) return 120;
  if (d === 9) return 240;
  // Rodin digits ordered as 1,2,4,8,7,5  mapping to k=0..5
  const k = RODIN_SEQUENCE.indexOf(d);
  return (k + 1) * 60; // 60°,120°,180°,240°,300°,360°(≡0)
}

/** A432-based frequency for a trinity digit. */
export function frequencyForDigit(d: number): number {
  if (!TRINITY_AXIS.includes(d)) throw new Error('frequency only defined for trinity digits');
  return 432 * (d / 3);
}

/** Hue (0-360°) before CMYK conversion. */
export function hueForDigit(d: number): number {
  return (Math.abs(d) * 36) % 360;
}

// Convenience helpers ------------------------------------------------------
export function isTrinity(d: number): boolean {
  return TRINITY_AXIS.includes(d);
}

export function nextRodinDigit(current: number): number {
  const idx = RODIN_SEQUENCE.indexOf(current);
  if (idx === -1) throw new Error('not a Rodin digit');
  return RODIN_SEQUENCE[(idx + 1) % (RODIN_SEQUENCE.length - 1)];
}

// ——————————————————————————————————————————
// 6. Tesla Trinity helpers (3-6-9 insight)
// ---------------------------------------------------------
export const TESLA_TRINITY: number[] = [3, 6, 9];

export function isTeslaDigit(d: number): boolean {
  return TESLA_TRINITY.includes(d);
}

/**
 * Generates a Tesla pattern of given length, cycling 3-6-9.
 */
export function teslaPattern(length: number): number[] {
  const pattern: number[] = [];
  for (let i = 0; i < length; i++) pattern.push(TESLA_TRINITY[i % 3]);
  return pattern;
}

// ——————————————————————————————————————————
// 7. Möbius-twist extensions for Rodin digits
// ---------------------------------------------------------
/**
 * In vortex math a Möbius flip alternates the sign/polarity of the Rodin digit
 * every step (half-twist).  We encode polarity by sign: + for one side, − for the flip.
 */
export function mobiusDigit(k: number): number {
  const base = rodinDigit(k);
  const sign = k % 2 === 0 ? 1 : -1; // alternate every step
  return sign * base;
}

/** Returns a Möbius sequence of length n (signed digits). */
export function mobiusSequence(n: number): number[] {
  return Array.from({ length: n }, (_, i) => mobiusDigit(i));
}

// ——————————————————————————————————————————
// 8. Rodin coil helpers that expose index ↔ digit ↔ angle ↔ polarity
// ---------------------------------------------------------
export function rodinAngle(k: number): number {
  return angleForDigit(rodinDigit(k));
}

export function rodinPolarity(k: number): number {
  const d = rodinDigit(k);
  // positive for 1,2,4   negative for 8,7,5   (conventional vortex math coloring)
  return d === 1 || d === 2 || d === 4 ? +1 : -1;
}

// ——————————————————————————————————————————
// 9. CMYK mapping re-exports (color = math)
// ---------------------------------------------------------
export type { Fraction as CMYK_Fraction, CMYK } from './a432.cmyk';
export {
  digitAngleToCMYK,
  fractionToCMYK,
  cmykToCss,
  scaleVortex,
  vortexColor,
  rgbToHex,
  CMYK_COLORS,
  CMYK_FREQUENCIES
} from './a432.cmyk'; 

// ——————————————————————————————————————————
// 10. Prime-squared cascade (VBM book §15)
// ---------------------------------------------------------
const PRIMES: number[] = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

/** Returns the first n prime numbers (extend PRIMES if n>10). */
export function primes(n: number): number[] {
  while (PRIMES.length < n) {
    const candidate = PRIMES[PRIMES.length - 1] + 2;
    const isPrime = PRIMES.every(p => candidate % p !== 0);
    if (isPrime) PRIMES.push(candidate);
  }
  return PRIMES.slice(0, n);
}

/** Prime-numbers-squared then reduced to single digits. */
export function primeSquaredRoots(n: number): number[] {
  return primes(n).map(p => digitalRoot(p * p));
}

// ——————————————————————————————————————————
// 11. Fibonacci mirrored onto rodin coil (VBM book §15)
// ---------------------------------------------------------
export function fibonacci(n: number): number[] {
  const seq = [1, 1];
  for (let i = 2; i < n; i++) seq.push(seq[i - 1] + seq[i - 2]);
  return seq.slice(0, n);
}

export function fibonacciRoots(n: number): number[] {
  return fibonacci(n).map(digitalRoot);
}

// ——————————————————————————————————————————
// 12. Kinetic shock-wave of nine (VBM book §4)
// ---------------------------------------------------------
/**
 * Generates a 3-6-9 oscillation where every third element is 9.
 * Example for length 12 → 3 6 9 3 6 9 3 6 9 3 6 9
 */
export function kineticShockWaveOfNine(length: number): number[] {
  const pattern = [3, 6, 9];
  return Array.from({ length }, (_, i) => pattern[i % 3]);
}

// ——————————————————————————————————————————
// 13. Base-10 mirroring helper (VBM book §7)
// ---------------------------------------------------------
/** Returns the digit string mirrored around its center (pad with 0). */
export function mirrorBaseTen(num: number): number {
  const s = String(Math.abs(num));
  const rev = s.split('').reverse().join('');
  return Number(s + rev);
} 

// ——————————————————————————————————————————
// 14. Imperial ↔ Metric invertor (fractions only)
// ---------------------------------------------------------
export interface Fraction {
  numerator: number;
  denominator: number;
}

/** Simplify a fraction by dividing numerator/denominator by their GCD. */
export function simplify({ numerator, denominator }: Fraction): Fraction {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const g = gcd(numerator, denominator);
  return { numerator: numerator / g, denominator: denominator / g };
}

// Conversion ratios expressed as Fraction (metric in millimetres)
const IMPERIAL_TO_MM: Record<string, Fraction> = {
  inch: { numerator: 254, denominator: 10 },      // 25.4 mm
  foot: { numerator: 3048, denominator: 10 },     // 304.8 mm
  yard: { numerator: 9144, denominator: 10 },     // 914.4 mm
  mile: { numerator: 1609344, denominator: 10 }   // 160934.4 mm
};

const MM_TO_IMPERIAL: Record<string, Fraction> = {
  mm: { numerator: 1, denominator: 1 },
  cm: { numerator: 10, denominator: 1 },
  m:  { numerator: 1000, denominator: 1 },
  km: { numerator: 1000000, denominator: 1 }
};

/**
 * Convert an imperial length to metric fraction (millimetres).
 */
export function imperialToMetric(value: number, unit: keyof typeof IMPERIAL_TO_MM): Fraction {
  const ratio = IMPERIAL_TO_MM[unit];
  return simplify({ numerator: value * ratio.numerator, denominator: ratio.denominator });
}

/**
 * Convert metric millimetres fraction to given metric unit.
 */
export function mmToMetric(mm: Fraction, unit: keyof typeof MM_TO_IMPERIAL): Fraction {
  const ratio = MM_TO_IMPERIAL[unit];
  // mm / ratio
  return simplify({ numerator: mm.numerator, denominator: mm.denominator * (ratio.numerator / ratio.denominator) });
}

/**
 * Imperial → Metric (target unit).  Example: 3, 'foot', 'm'  => Fraction meters.
 */
export function imperialToMetricUnit(value: number, impUnit: keyof typeof IMPERIAL_TO_MM, metricUnit: keyof typeof MM_TO_IMPERIAL): Fraction {
  const mm = imperialToMetric(value, impUnit);
  return mmToMetric(mm, metricUnit);
}

/**
 * Metric value (in target unit) to Imperial fraction (inches).
 */
export function metricToImperial(value: number, metricUnit: keyof typeof MM_TO_IMPERIAL, impUnit: keyof typeof IMPERIAL_TO_MM): Fraction {
  // convert metric value to mm fraction
  const ratio = MM_TO_IMPERIAL[metricUnit];
  const mm: Fraction = { numerator: value * ratio.numerator, denominator: ratio.denominator };
  // convert mm to imperial unit
  const impRatio = IMPERIAL_TO_MM[impUnit];
  // value_mm / impRatio = (value * ratio) / impRatio
  return simplify({ numerator: mm.numerator * impRatio.denominator, denominator: mm.denominator * impRatio.numerator });
} 

// ——————————————————————————————————————————
// 15. Decimal ↔ Fraction utilities (to enforce integer-only storage)
// ---------------------------------------------------------
/** Convert a finite decimal (e.g. 25.4) to a simplified Fraction. */
export function decimalToFraction(x: number): Fraction {
  if (Number.isInteger(x)) return { numerator: x, denominator: 1 };
  const str = x.toString();
  const parts = str.split('.');
  const whole = BigInt(parts[0]);
  const fracStr = parts[1] || '';
  const denom = BigInt(10 ** fracStr.length);
  const numer = whole * denom + BigInt(fracStr);
  const gcd = (a: bigint, b: bigint): bigint => (b === 0n ? a : gcd(b, a % b));
  const g = gcd(numer, denom);
  return { numerator: Number(numer / g), denominator: Number(denom / g) };
}

/** Convert a Fraction to decimal number (floating). */
export function fractionToDecimal({ numerator, denominator }: Fraction): number {
  return numerator / denominator;
} 

// ——————————————————————————————————————————
// 16. Impossibility gateway: handling 0/0 (void division)
// ---------------------------------------------------------

// Local branded digit constants for void division handling
const D0 = asDigit(0);
const D9 = asDigit(9);

export interface VortexState { digit: Digit; angle: AngleDeg; polarity: -1|0|1; }

export function resolveDivision(numerator: Digit, denominator: Digit, angle: AngleDeg = asAngle(0)): VortexState {
  if (denominator === D0) {
    // void division: route through imperial map then to trinity
    const d = toImperial(D0); // becomes 3
    return { digit: d, angle, polarity: TRINITY_POLARITY[d as number] as -1|0|1 };
  }
  // ordinary integer division then digital root
  const q = (numerator / denominator) % 9 as Digit;
  const drq = (q === 0 ? D9 : (q as Digit));
  return { digit: drq, angle, polarity: TRINITY_POLARITY[drq as number] as -1|0|1 };
} 

// ——————————————————————————————————————————
// 17. π digit stream and A432 decoding
// ---------------------------------------------------------

// Pi digit generator (spigot, Rabinowitz–Wagon 1995)
export function* piDigitStream(limit: number): IterableIterator<Digit> {
  let q = 1n,
    r = 0n,
    t = 1n,
    k = 1n,
    n = 3n,
    l = 3n;
  for (let count = 0; count < limit;) {
    if (4n * q + r - t < n * t) {
      yield asDigit(Number(n) as Digit);
      count++;
      const nr = 10n * (r - n * t);
      n = (10n * (3n * q + r)) / t - 10n * n;
      q *= 10n;
      r = nr;
    } else {
      const nr = (2n * q + r) * l;
      const nn = (q * (7n * k) + 2n + r * l) / (t * l);
      q *= k;
      t *= l;
      l += 2n;
      k += 1n;
      n = nn;
      r = nr;
    }
  }
}

export const TRINITY_POLARITY: Record<number, -1|0|1> = {
  [asDigit(3)]: +1,
  [asDigit(6)]: -1,
  [asDigit(9)]: 0,
  [asDigit(0)]: 0,
  [asDigit(1)]: +1,
  [asDigit(2)]: +1,
  [asDigit(4)]: -1,
  [asDigit(5)]: -1,
  [asDigit(7)]: +1,
  [asDigit(8)]: -1,
} as const;

export interface PiDecoded { metric: Digit; imperial: Digit; trinity: Digit; polarity: -1|0|1; angle: AngleDeg; }

export function decodePiDigits(n: number): PiDecoded[] {
  const stream = piDigitStream(n);
  const out: PiDecoded[] = [];
  for (const metric of stream) {
    const imperial = toImperial(metric);
    const trinity = toTrinity(imperial);
    const polarity = TRINITY_POLARITY[trinity as number];
    const angle = asAngle(angleForDigit(trinity));
    out.push({ metric, imperial, trinity, polarity, angle });
  }
  return out;
} 

// ——————————————————————————————————————————
// 18. Decimal point (DOT) as trinity switch — canonical definition
// ---------------------------------------------------------

export interface TrinitySwitch {
  kind: 'trinity';
  axisDigit: Digit; // always 3 for the initial dot, further switches rotate via 6,9 if needed
}

// Canonical DOT representation: single trinity pulse rooted on digit 3
export const DOT_TRINITY_SWITCH: TrinitySwitch = { kind: 'trinity', axisDigit: asDigit(3) };

export function isTrinitySwitch(token: unknown): token is TrinitySwitch {
  return typeof token === 'object' && token !== null && (token as any).kind === 'trinity';
} 

// ——————————————————————————————————————————
// 19. Infinite possibility-line (never folds)
// ---------------------------------------------------------
/**
 * possibilityPath — yields an ever-growing digit-pair string that walks the
 * metric (0-9) and vortex (0-3-6-9-1-2-4-8-7-5) tapes in lock-step without
 * allowing the 110-tick collision to fold the path.  Each next() gives the
 * entire path so far, guaranteeing a unique filename/key at every tick.
 */
export function* possibilityPath(): IterableIterator<string> {
  let n = 0;
  let path = '';
  while (true) {
    const metric = n % 10;
    const vortex = [0,3,6,9,1,2,4,8,7,5][n % 11];
    path += `${metric}${vortex}`;
    yield path;
    n++;
  }
} 