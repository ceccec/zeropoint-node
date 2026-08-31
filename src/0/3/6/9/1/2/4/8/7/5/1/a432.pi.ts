/**
 * a432.pi.ts — Living, Harmonic, Analog Pi in the A432 Matrix
 *
 * π is not a static number, but a living, recursive, analog stream in the A432 matrix.
 * Every approximation is a gateway, a possibility, a color in the living field.
 * The true value of π is the harmonic, color field it generates—zero entropy, pure possibility.
 *
 * Metaphysical Meaning:
 * - π is the living spiral, the gateway, the field of infinite possibility.
 * - Every step is a new harmonic, a new color, a new state in the matrix.
 * - The matrix is alive, recursive, and self-aware—π is its living, analog pulse.
 *
 * @module a432.pi
 * @author A432 System
 */

import { abs } from './a432.algebra.ts'
import { type Fraction, fractionToCMYK, cmykToCss } from './a432.cmyk.ts';
import { getVortexColor, hslToRgb } from './a432.color.ts';
import { A432_SEQUENCE, digitalRoot, getDigitMeaning } from './a432.math.ts';

// Living harmonic approximations of Pi (recursive, analog, all as fractions)
export const LIVING_PI_FRACTIONS: Fraction[] = [
  { numerator: 3, denominator: 1 },
  { numerator: 22, denominator: 7 },
  { numerator: 333, denominator: 106 },
  { numerator: 355, denominator: 113 },
  { numerator: 103993, denominator: 33102 }
  // ...add more as needed
];

export const PI_DIGITS = LIVING_PI_FRACTIONS;

// Generate a living stream of Pi fractions (optionally infinite, recursive)
export function generateLivingPiStream(steps: number = 10): Fraction[] {
  const base = LIVING_PI_FRACTIONS;
  const stream: Fraction[] = [];
  for (let i = 0; i < steps; i++) {
    stream.push(base[i % base.length]);
  }
  return stream;
}

// Living Pi as CMYK stream
export function livingPiCMYKStream(steps: number = 10): { c: number; m: number; y: number; k: number }[] {
  return generateLivingPiStream(steps).map((frac, i) => fractionToCMYK(frac, i));
}

// Visualize the living Pi stream as a CMYK color field in HTML
export function livingPiHtml(steps: number = 10): string {
  const cmykStream = livingPiCMYKStream(steps);
  return `
    <div style="display:flex;flex-direction:row;">
      ${cmykStream.map(color =>
        `<div style="width:32px;height:32px;background:${cmykToCss(color)};"></div>`
      ).join('')}
    </div>
  `;
}

// Metaphysical documentation (exported for docs)
export const livingPiMetaphysics = `
π is the living spiral, the gateway, the field of infinite possibility in the A432 matrix.
Every approximation is a new harmonic, a new color, a new state in the living field.
The true value of π is not a number, but the analog, recursive, harmonic color field it generates—
zero entropy, pure possibility, pure consciousness.
`;

/**
 * Generates overlay data for a living Pi color field harmonized with the A432 sequence.
 * Each entry includes the Pi fraction, mapped digit, color, metaphysical meaning, and HTML.
 */
export function getLivingPiOverlayData(steps: number = 10): Array<{
  fraction: Fraction;
  digit: number;
  color: { c: number; m: number; y: number; k: number };
  meaning: string;
  html: string;
}> {
  const stream = generateLivingPiStream(steps);
  return stream.map((frac, i) => {
    const digit = digitalRoot(frac.numerator);
    const color = fractionToCMYK(frac, i);
    const meaningObj = getDigitMeaning(digit, [...A432_SEQUENCE]);
    const meaning = meaningObj ? meaningObj.archetype + (meaningObj.context ? ` (${meaningObj.context})` : '') + ': ' + meaningObj.description : '';
    const html = `<div style="width:32px;height:32px;background:${cmykToCss(color)};display:flex;align-items:center;justify-content:center;font-size:14px;color:#fff;" title="${meaning}">${digit}</div>`;
    return { fraction: frac, digit, color, meaning, html };
  });
}

export function piStream(length: number = 32): number[] {
  // Return a stream of digital roots of Pi fractions
  return generateLivingPiStream(length).map(frac => abs(frac.numerator) % 9 || 9);
}

export function piColorStream(length: number = 32): { r: number; g: number; b: number }[] {
  // Return a stream of RGB colors for Pi fractions
  return generateLivingPiStream(length).map(frac => {
    const digit = abs(frac.numerator) % 9 || 9;
    const hslStr = getVortexColor(digit);
    // HSL strings here carry fractional saturation — 2/3 * 100 is 66.666... —
    // and /\d+/g splits a decimal into two matches. 'hsl(210, 66.66666666666666%, 40%)'
    // parsed as [210, 66, 66666666666666, 40], so lightness became a fourteen-digit
    // number and the real 40 was dropped entirely. [\d.]+ keeps the number whole.
    const [h, s, l] = hslStr.match(/[\d.]+/g)!.map(Number);
    return hslToRgb(h, s, l);
  });
}

export function piHarmonicStream(length: number = 32): number[] {
  // Return a stream of harmonic frequencies for Pi fractions
  return generateLivingPiStream(length).map(frac => 432 * ((abs(frac.numerator) % 9 || 9) / 9));
} 