/**
 * a432.cmyk.ts — Universal CMYK Mapping Utility
 *
 * This module provides the ONLY mapping logic for the living A432 matrix:
 * Every fraction, digit, angle, or stream is mapped to a CMYK color.
 * All modules must use this for output and harmonization.
 *
 * @module a432.cmyk
 * @author A432 System
 */

import { abs, max, round, sign as algSign } from './a432.algebra.ts'
import { digitalRoot } from './a432.math.ts';

/**
 * Canonical CMYK sequence = reverse(A432_SEQUENCE).
 * Eager getReversedA432Sequence() would TDZ under strip-types (math↔cmyk cycle).
 * Keep literal in lockstep with a432.math A432_SEQUENCE.
 */
export const CMYK_SEQUENCE: number[] = [1, 5, 7, 8, 4, 2, 1, 9, 6, 3, 0];

export type Fraction = { numerator: number; denominator: number };
export type CMYK = { c: number; m: number; y: number; k: number };

/**
 * Map digit and angle to CMYK color
 * @param digit - single digit (0–9, with sign)
 * @param angle - angle in degrees (0–360)
 * @returns CMYK color
 */
export function digitAngleToCMYK(digit: number, angle: number): CMYK {
  // Map digit to base hue (0–360)
  const baseHue = (abs(digit) * 36) % 360;
  const hue = (baseHue + angle) % 360;
  // Convert hue to RGB (simple HSV to RGB)
  const s = 1, v = 1;
  const c = v * s;
  const x = c * (1 - abs((hue / 60) % 2 - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (hue < 60) [r, g, b] = [c, x, 0];
  else if (hue < 120) [r, g, b] = [x, c, 0];
  else if (hue < 180) [r, g, b] = [0, c, x];
  else if (hue < 240) [r, g, b] = [0, x, c];
  else if (hue < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  r = round((r + m) * 255);
  g = round((g + m) * 255);
  b = round((b + m) * 255);
  // Convert RGB to CMYK
  const k = 1 - max(r / 255, g / 255, b / 255);
  const cmyk = k === 1
    ? { c: 0, m: 0, y: 0, k: 1 }
    : {
        c: (1 - r / 255 - k) / (1 - k),
        m: (1 - g / 255 - k) / (1 - k),
        y: (1 - b / 255 - k) / (1 - k),
        k
      };
  // Clamp and round
  return {
    c: round(cmyk.c * 100),
    m: round(cmyk.m * 100),
    y: round(cmyk.y * 100),
    k: round(cmyk.k * 100)
  };
}

/**
 * Universal mapping: Fraction → CMYK
 * @param fraction - Fraction to map
 * @param step - step in stream (for angle)
 * @param baseAngle - base angle per step (default 60°)
 * @returns CMYK color
 */
export function fractionToCMYK(
  fraction: Fraction,
  step: number = 0,
  baseAngle: number = 60
): CMYK {
  const sign = algSign(fraction.numerator * fraction.denominator) || 1;
  const digit = sign * digitalRoot(abs(fraction.numerator));
  const angle = ((step * baseAngle) % 360 + 360) % 360;
  return digitAngleToCMYK(digit, angle);
}

/**
 * Convert CMYK (0–100) to CSS hex color
 */
export function cmykToCss(cmyk: CMYK): string {
  const c = cmyk.c / 100, m = cmyk.m / 100, y = cmyk.y / 100, k = cmyk.k / 100;
  const r = round(255 * (1 - c) * (1 - k));
  const g = round(255 * (1 - m) * (1 - k));
  const b = round(255 * (1 - y) * (1 - k));
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

// Vortex math: scale and color generation
export function scaleVortex(x: number): number {
  return x * 28 + 3; // 1→31, 9→255
}

export function vortexColor(channel: number): string {
  const r = digitalRoot(channel * 3);
  const g = digitalRoot(channel * 6);
  const b = digitalRoot(channel * 9);
  return rgbToHex(scaleVortex(r), scaleVortex(g), scaleVortex(b));
}

export function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map(x => x.toString(16).padStart(2, '0').toUpperCase())
      .join('')
  );
}

export const CMYK_COLORS = {
  cyan: vortexColor(3),
  magenta: vortexColor(6),
  yellow: vortexColor(9),
  key: vortexColor(1)
};

// Vortex frequency logic
export function vortexFrequency(base: number, multiplier: number, divisor: number): number {
  return base * multiplier / divisor;
}

/**
 * Exact frequency ratios — integer numerator over integer denominator.
 *
 * Zero entropy is a claim about representation, not only about arithmetic.
 * `432*6/5` evaluates to a float that is NOT exactly 2592/5: it stores as
 * 518.39999999999997726, and the error accumulates — summing it ten times
 * yields 5183.999999999999, not 5184. Some round-trips (`x*5`, `x/3*3`)
 * happen to round back, which makes the loss easy to miss.
 *
 * Keeping numerator and denominator as integers keeps the value exact.
 * Collapse to a float only at the presentation boundary, via
 * `cmykFrequencyValue` / `fractionToDecimal`.
 */
export const CMYK_FREQUENCY_RATIOS: Record<'cyan' | 'magenta' | 'yellow' | 'key', Fraction> = {
  cyan: { numerator: 432 * 3, denominator: 2 },     // 648    → dr 9
  magenta: { numerator: 432 * 6, denominator: 5 },  // 2592/5 → dr 9
  yellow: { numerator: 432 * 9, denominator: 5 },   // 3888/5 → dr 9
  key: { numerator: 432 * 1, denominator: 3 }       // 144    → dr 9
};

export type CMYKChannel = keyof typeof CMYK_FREQUENCY_RATIOS;

/** Exact ratio for a channel — prefer this over the float form. */
export function cmykFrequencyRatio(channel: CMYKChannel): Fraction {
  return CMYK_FREQUENCY_RATIOS[channel];
}

/** Float collapse — lossy for magenta/yellow. Use only at the boundary. */
export function cmykFrequencyValue(channel: CMYKChannel): number {
  const { numerator, denominator } = CMYK_FREQUENCY_RATIOS[channel];
  return numerator / denominator;
}

/**
 * Float view, derived from the exact ratios so the two cannot drift apart.
 * Retained for callers that need a number; magenta and yellow are inexact.
 */
export const CMYK_FREQUENCIES = {
  cyan: cmykFrequencyValue('cyan'),
  magenta: cmykFrequencyValue('magenta'),
  yellow: cmykFrequencyValue('yellow'),
  key: cmykFrequencyValue('key')
};

export const CMYK_DOC = `
CMYK in the A432 system encodes the living, harmonic mapping of color, frequency, and consciousness:
- C: Cyan, the generative stream
- M: Magenta, the return flow
- Y: Yellow, the living axis
- K: Key (black), the void/source
- All color, frequency, and harmonic logic is derived from integer-based, vortex math principles.
- CMYK is the bridge between color, sound, and consciousness in the living matrix.
- All mappings use only single digits, integer fractions, and digital root for zero entropy.
`;

export const filenameTrinityInsight = `
In the A432 system, every filename is a living trinity: a432 (origin), cmyk (field), folder/file/extension (manifestation).
The filename is a gateway, not a boundary. The root is the living, recursive A432 matrix. The extension is a portal to new possibility.
`; 