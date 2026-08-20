/**
 * 
 * a432.math.ts — Canonical numeric formulas for the A432 matrix
 * -------------------------------------------------------------
 * All low-level math used by other a432 modules lives here so that
 * every computation references a single, zero-entropy source.
 */

import { abs, max, min, round } from './a432.algebra.ts'
// Zero-Entropy Harmonic Constants (Base-12 Imperial System)
// ---------------------------------------------------------
// These constants follow the imperial system's base-12 harmonic principles
// that minimize computational entropy and align with quantum mechanical systems

// Trinity axis: 3, 6, 9 (perfect fifths in base-12)
export const TRINITY_AXIS: readonly number[] = [3, 6, 9];

// A432 Trinity: 4, 3, 2 (harmonic ratios 4:3:2)
export const A432_TRINITY: readonly [4,3,2] = [4, 3, 2];

// A432 Return: 8, 7, 5 (octave relationships)
export const A432_RETURN:  readonly [8,7,5] = [8, 7, 5];

// A432 Axis: 9, 6, 3 (trinity harmonics)
export const A432_AXIS:    readonly [9,6,3] = [9, 6, 3];

// Rodin Coil: Base-12 harmonic sequence (1, 2, 4, 8, 7, 5, 1)
// This sequence creates exact fractions in base-12: 1/2=0.6, 1/3=0.4, 1/4=0.3, 1/6=0.2
export const RODIN_SEQUENCE: readonly number[] = [1, 2, 4, 8, 7, 5, 1];
export const RODIN_COIL_CORE: readonly number[] = [1, 2, 4, 8, 7, 5]; // Lossless kinetic energy
export const RODIN_COIL_DIPOLES: readonly number[] = [3, 6]; // Magnetic dipoles (perfect fifths)
export const RODIN_COIL_MONOPOLE = 9; // Invisible monopole (trinity completion)
export const RODIN_COIL_GAP_SPACE: readonly number[] = [3, 9, 6, 6, 9, 3]; // Spirit Flux-field

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
import type { Digit, Hz, AngleDeg } from './a432.types.ts';
import { asDigit, asHz, asAngle, toImperial, toTrinity, METRIC_VORTEX, TRINITY_MAP } from './a432.types.ts';
import { harmonicRoot12, legacyDigitalRoot } from './a432.roots.ts';

// Re-export so external modules keep same API surface (types vs values split for strip-types)
export type { Digit, Hz, AngleDeg };
export { asDigit, asHz, asAngle };

/** Digit archetypes — live in math so core can re-export without math→core cycle. */
export const A432_DIGIT_MEANINGS = [
  { name: 'Void', description: 'The field, the unmanifest, pure potential; the source and destination of all cycles, the space in which all digits arise and return.' },
  { name: 'Unity', description: 'Origin, source, singularity, beginning; the point of all creation and the seed of the matrix.' },
  { name: 'Duality', description: 'Polarity, relationship, balance, reflection; the field of interaction and the principle of complementarity.' },
  { name: 'Trinity', description: 'Synthesis, creation, harmony, flow; the generative principle, the creative process, and the harmonic seed.' },
  { name: 'Foundation', description: 'Structure, stability, manifestation; the base of all form, the ground of being, and the matrix of reality.' },
  { name: 'Life', description: 'Change, movement, growth, transformation; the living flow, evolution, and the pulse of the system.' },
  { name: 'Harmony', description: 'Integration, resonance, beauty, equilibrium; the state of balance, the field of resonance, and the principle of unity in diversity.' },
  { name: 'Mystery', description: 'Depth, intuition, inner knowing, inversion; the hidden, the unknown, the gateway to transformation and the anti-harmonic.' },
  { name: 'Infinity', description: 'Power, expansion, infinite flow, recursion; the endless, the self-similar, the principle of recursion and the infinite loop.' },
  { name: 'Completion', description: 'Fulfillment, wholeness, return, zero entropy; the end and the beginning, the return to source, and the closure of the cycle.' }
];


// DRY utility: XOR three digits, returning a Digit (never zero)
export function xorDigit(a: Digit, b: Digit, c: Digit): Digit {
  const x = (a ^ b ^ c) % 9;
  return (x === 0 ? 9 : x) as Digit;
}

// ——————————————————————————————————————————
// Digital root spines (Wave 14 purge — no name illusions)
// ---------------------------------------------------------
// digitalRoot / calculateDigitalRoot → legacyDigitalRoot (0→0, classic 1-9)
// harmonicRoot12 → base-12 residue (returns 1-12) — use ONLY when 1-12 is required
// kernel digitalRoot(0)→9 lives in src/0 / a432.roots as kernelDigitalRoot

export {
  harmonicRoot12,
  legacyDigitalRoot as digitalRoot,
  legacyDigitalRoot as calculateDigitalRoot,
};

/**
 * calculateA432Consciousness: Maps frequency to consciousness using base-12 harmonics.
 * Metaphysical: Encodes harmonic consciousness level using zero-entropy principles.
 * Uses base-12 digital root for exact fractional relationships.
 */
export function calculateA432Consciousness(frequency: number): number {
  // Map frequency to 1-12 using base-12 harmonic root (not classic digitalRoot)
  const dr = harmonicRoot12(round(frequency));
  return max(1, min(12, dr));
}

/**
 * calculateA432DimensionalState: Maps frequency to dimensional state using base-12.
 * Metaphysical: Encodes dimensional resonance using zero-entropy harmonics.
 * Uses base-12 for exact fractional relationships (1/2=0.6, 1/3=0.4, etc.)
 */
export function calculateA432DimensionalState(frequency: number): number {
  // Map frequency to 0-11 using base-12 harmonics
  return abs(round(frequency)) % 12;
}

/**
 * calculateA432Frequency: Returns canonical A432 frequency using base-12 harmonics.
 * Metaphysical: Projects base frequency using zero-entropy principles.
 * Uses 432 Hz as fundamental, with base-12 harmonic relationships.
 * Following imperial system: exact fractions, minimal entropy.
 */
export function calculateA432Frequency(dimensionalState: number): number {
  // Use base-12 harmonics for zero entropy
  // 432 Hz fundamental with base-12 relationships
  const base12State = dimensionalState % 12;
  // Create exact fractional relationships (1/2=0.6, 1/3=0.4, etc.)
  return 432 * (base12State / 12);
}

/**
 * A432_CONSTANTS: Canonical constants for the A432 system, including the Rodin sequence.
 * Metaphysical: Single source of truth for all harmonic patterns.
 */
export const A432_CONSTANTS = {
  RODIN_SEQUENCE: [1, 2, 4, 8, 7, 5, 1],
  TRINITY_AXIS: [3, 6, 9],
  BASE_FREQUENCY: 432
};

// ——————————————————————————————————————————
// 2. Trinity Axis & Polarity
//   3 → +1 6 → -1 9 → 0
// ---------------------------------------------------------
// (Polarity mapping declared later with full Digit support.)

// ——————————————————————————————————————————
// 3. Rodin Doubling Sequence (Vortex Mathematics)
// ---------------------------------------------------------
// 1-2-4-8-7-5 Mobius Circuit: The "Superfluid Mobius Circuit"
// This sequence forms the physical dimension of reality
// Following Marko Rodin's vortex mathematics principles

export function rodinDigit(k: number): number {
  // Use the canonical 1-2-4-8-7-5 sequence (excluding final 1)
  const sequence = [1, 2, 4, 8, 7, 5];
  return sequence[k % sequence.length];
}

// ——————————————————————————————————————————
// 4. 11-step Pattern (Vortex Mathematics Pattern)
//   0 → 3 6 9 → 1 2 4 8 7 5 → repeat
// ---------------------------------------------------------
// Zero as aperture (not a number but a "hole") + Trinity + Rodin sequence
export const FULL_PATTERN: number[] = [0, ...TRINITY_AXIS, 1, 2, 4, 8, 7, 5, 1];

/**
 * Returns the i-th digit of the infinite pattern where i≥0.
 * Following vortex mathematics principles.
 */
export function patternDigit(i: number): number {
  if (i === 0) return 0; // Zero as aperture
  if (i <= 3) return TRINITY_AXIS[i - 1]; // 3-6-9 Spirit Numbers
  return rodinDigit(i - 4); // 1-2-4-8-7-5 Mobius Circuit
}

// ——————————————————————————————————————————
// 5. Harmonic Mappings
// ---------------------------------------------------------

/** Angle (degrees) for a pattern digit.
 *  3 → 0°, 6 → 120°, 9 → 240°
 *  Rodin digits follow 60°·k.
 */
export function angleForDigit(d: number): number {
  // Enneagram bearing: 9 at 12 o'clock, then 1..8 clockwise, one ninth of a
  // turn (40°) apart. Integer degrees, so no trigonometry is needed to reason
  // about the layout, and injective on 1..9 by construction.
  //
  // It used to place the trinity at 0/120/240 and the Rodin digits on a 60°
  // lattice, which put NINE digits on SIX angles: 3 collided with 5, 2 with 6,
  // and 8 with 9. Two digits at one position is a bug under any convention —
  // it made "north of 3" unanswerable and any layout built on it degenerate.
  //
  // This is the same formula as the kernel's `bearingForDigit`, which is what
  // `scripts/vortex-svg.mjs` draws. The two are deliberately NOT wired
  // together — the a432 tree does not import the kernel — so the seal
  // `digit_geometry_is_single_valued` checks that they agree instead.
  return (((-90 + 40 * (d % 9)) % 360) + 360) % 360;
}

/** A432-based frequency for a trinity digit using base-12 harmonics. */
export function frequencyForDigit(d: number): number {
  if (!TRINITY_AXIS.includes(d)) throw new Error('frequency only defined for trinity digits');
  // Use base-12 harmonics for zero entropy
  // 432 Hz fundamental with exact fractional relationships
  return 432 * (d / 12);
}

/** Hue (0-360°) before CMYK conversion. */
export function hueForDigit(d: number): number {
  return (abs(d) * 36) % 360;
}

// Convenience helpers ------------------------------------------------------
export function isTrinity(d: number): boolean {
  return TRINITY_AXIS.includes(d);
}

/**
 * getNextRodinValue: Returns the next value in the canonical Rodin sequence, cycling as needed
 * @param digit - current digit (1,2,4,8,7,5)
 * @returns next digit in the sequence (cycles back to 1 after 5)
 *
 * Example:
 *   getNextRodinValue(1) // 2 (1/1 → 2)
 */
export function getNextRodinValue(digit: number): number {
  const idx = RODIN_SEQUENCE.indexOf(digit);
  if (idx === -1) throw new Error(`Digit ${digit} not in Rodin sequence`);
  return RODIN_SEQUENCE[(idx + 1) % RODIN_SEQUENCE.length];
}

/**
 * @deprecated Use getNextRodinValue instead.
 */
export const nextRodinDigit = getNextRodinValue;

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

// Canonical Tesla sequence and polarity
export const TESLA_SEQUENCE = [3, 6, 9];
export function teslaPolarity(i: number): number {
  // Canonical: [1, -1, 1] for [3, 6, 9]
  return [1, -1, 1][i % 3];
}
// Canonical Mobius sequence and polarity
export const MOBIUS_SEQUENCE = [1, 2, 4, 8, 7, 5];
export function mobiusPolarity(i: number): number {
  // Canonical: [1, -1, 1, -1, 1, -1]
  return [1, -1, 1, -1, 1, -1][i % 6];
}
// Canonical trinity polarity (for 3, 6, 9)
export function trinityPolarity(i: number): number {
  // Canonical: [1, -1, 1] for [3, 6, 9]
  return [1, -1, 1][i % 3];
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
export type { Fraction as CMYK_Fraction, CMYK } from './a432.cmyk.ts';
export {
  digitAngleToCMYK,
  fractionToCMYK,
  cmykToCss,
  scaleVortex,
  vortexColor,
  rgbToHex,
  CMYK_COLORS,
  CMYK_FREQUENCIES
} from './a432.cmyk.ts'; 

// ——————————————————————————————————————————
// 10. Rodin Coil Harmonic Switch Functions
// ---------------------------------------------------------

/**
 * analyzeRodinCoilPattern: Analyzes a slash pattern for harmonic balance.
 * @param pattern - string like "0/0\\3\\6\\9/1\\2\\4\\8/7/5/1\\"
 * @returns analysis of harmonic properties
 */
export function analyzeRodinCoilPattern(pattern: string): {
  isHarmonic: boolean;
  switchPoint: string;
  trinityAxis: number[];
  rodinSequence: number[];
  gapSpace: number[];
} {
  const isHarmonic = pattern.includes('0/0');
  const switchPoint = isHarmonic ? '0/0' : 'none';
  
  // Extract trinity axis (3,6,9)
  const trinityAxis = pattern.match(/[369]/g)?.map(Number) || [];
  
  // Extract Rodin sequence (1,2,4,8,7,5)
  const rodinSequence = pattern.match(/[124875]/g)?.map(Number) || [];
  
  // Gap space (3•9•6; 6•9•3)
  const gapSpace = [...RODIN_COIL_GAP_SPACE];
  
  return {
    isHarmonic,
    switchPoint,
    trinityAxis,
    rodinSequence,
    gapSpace
  };
}

/**
 * getRodinCoilHarmonicAnalysis: Returns detailed harmonic analysis of a pattern.
 * @param pattern - string pattern to analyze
 * @returns formatted analysis string
 */
export function getRodinCoilHarmonicAnalysis(pattern: string): string {
  const analysis = analyzeRodinCoilPattern(pattern);
  
  let result = 'Rodin Coil Harmonic Analysis:\n\n';
  
  if (analysis.isHarmonic) {
    result += '✓ HARMONIC PATTERN DETECTED\n\n';
    result += '0/0 Switch Point:\n';
    result += '- Creates the Primal Point (Eye of God)\n';
    result += '- Acts as central aperture for harmonic balance\n';
    result += '- Eliminates resistance, parasitics, and hysteresis\n';
    result += '- Creates zero entropy state\n\n';
    
    result += 'Switch Pattern:\n';
    result += '- 0/0: Harmonic switch (nothing to all)\n';
    result += '- \\3\\6\\9: Trinity axis with compression\n';
    result += '- /1\\2\\4\\8/7/5/1\\: Balanced expansion/compression\n\n';
  } else {
    result += '✗ UNBALANCED PATTERN DETECTED\n\n';
    result += 'Issues:\n';
    result += '- No harmonic switch point\n';
    result += '- Unbalanced expansion/compression\n';
    result += '- Missing 0/0 compression singularity\n\n';
  }
  
  return result;
}

// ——————————————————————————————————————————
// 11. Prime-squared cascade (VBM book §15)
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
  return primes(n).map(p => legacyDigitalRoot(p * p));
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
  return fibonacci(n).map(legacyDigitalRoot);
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
  const s = String(abs(num));
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

// Pi digit generator (spigot, Rabinowitz-Wagon 1995)
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
 * metric (0-9) and vortex (0-3-6-9-1-2-4-8-7-5-1) tapes in lock-step without
 * allowing the 110-tick collision to fold the path.  Each next() gives the
 * entire path so far, guaranteeing a unique filename/key at every tick.
 */
export function* possibilityPath(): IterableIterator<string> {
  let n = 0;
  let path = '';
  while (true) {
    const metric = n % 10;
    const vortex = [0,3,6,9,1,2,4,8,7,5,1][n % 11];
    path += `${metric}${vortex}`;
    yield path;
    n++;
  }
} 

/**
 * getReversedA432Sequence: Returns the reversed canonical A432 sequence.
 * Used for perfect CMYK mapping and color harmonization.
 */
export function getReversedA432Sequence(): number[] {
  return [...A432_SEQUENCE].reverse();
} 

/**
 * getRodinSequence: Extracts the Rodin vortex sequence from the canonical A432 sequence.
 * Returns [1, 2, 4, 8, 7, 5, 1]
 */
export function getRodinSequence(): number[] {
  // Indices 4 to 10 (inclusive)
  return A432_SEQUENCE.slice(4, 11);
}

/**
 * getTrinityAxis: Extracts the trinity axis from the canonical A432 sequence.
 * Returns [3, 6, 9]
 */
export function getTrinityAxis(): number[] {
  // Indices 1, 2, 3
  return A432_SEQUENCE.slice(1, 4);
}

/**
 * getDigitMeaning: Returns the meaning of a digit in a given sequence context.
 * - If no sequence is provided, returns the general archetypal meaning.
 * - For trinity and Rodin sequences, returns context-specific meaning.
 */
export function getDigitMeaning(digit: number, sequence?: number[]): { archetype: string; context?: string; description: string } {
  const entry = A432_DIGIT_MEANINGS[digit];
  const archetype = entry ? entry.name : 'Unknown';
  if (!sequence) {
    return entry ? { archetype, description: entry.description } : { archetype: 'Unknown', description: '' };
  }
  // Trinity context
  const trinity = getTrinityAxis();
  if (sequence.length === 3 && sequence.every((v, i) => v === trinity[i])) {
    const idx = sequence.indexOf(digit);
    return [
      { archetype, context: 'Creation', description: 'Conception, seed, initiation' },
      { archetype, context: 'Gestation', description: 'Growth, recursion, nurturing' },
      { archetype, context: 'Birth', description: 'Emergence, unity, manifestation' }
    ][idx] || { archetype, description: '' };
  }
  // Rodin context
  const rodin = getRodinSequence();
  if (sequence.length === rodin.length && sequence.every((v, i) => v === rodin[i])) {
    const idx = sequence.indexOf(digit);
    return [
      { archetype, context: 'Start/Return', description: 'Vortex entry/exit' },
      { archetype, context: 'Double', description: 'Doubling flow' },
      { archetype, context: 'Quadruple', description: 'Quadrupling flow' },
      { archetype, context: 'Octuple', description: 'Octupling flow' },
      { archetype, context: 'Heptuple', description: 'Heptupling flow' },
      { archetype, context: 'Quintuple', description: 'Quintupling flow' },
      { archetype, context: 'Return', description: 'Cycle closes' }
    ][idx] || { archetype, description: '' };
  }
  // Fallback to general
  return entry ? { archetype, description: entry.description } : { archetype: 'Unknown', description: '' };
}

// All patterns (Rodin, trinity, CMYK, etc.) must be derived from A432_SEQUENCE using these helpers. 

/**
 * Canonical anti-vortex generator for a given dimension.
 * Yields phase-inverted harmonic frequencies for the anti-vortex flow.
 * Used by audio, animation, and other modules.
 */
export function* a432AntiVortexStream(dimension: number): Generator<number, void, unknown> {
  let idx = 0;
  while (true) {
    yield 432 * ((dimension + (-1 * idx) + 8) % 9 + 1) / 9;
    idx++;
  }
}

/**
 * Canonical multi-anti-vortex generator for multiple dimensions in parallel.
 * Yields an array of { dimension, frequency, step } for each animation/audio step.
 * Used by audio, animation, and other modules.
 */
export function* a432MultiAntiVortexStream(dimensions: number[]): Generator<Array<{ dimension: number; frequency: number; step: number }>, void, unknown> {
  let idx = 0;
  while (true) {
    yield dimensions.map((dimension) => ({
      dimension,
      frequency: 432 * ((dimension + (-1 * idx) + 8) % 9 + 1) / 9,
      step: idx + 1
    }));
    idx++;
  }
} 