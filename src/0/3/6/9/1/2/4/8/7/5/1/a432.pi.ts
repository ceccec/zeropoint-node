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

import { Fraction, fractionToCMYK, cmykToCss } from './a432.cmyk';

// Living harmonic approximations of Pi (recursive, analog, all as fractions)
export const LIVING_PI_FRACTIONS: Fraction[] = [
  { numerator: 3, denominator: 1 },
  { numerator: 22, denominator: 7 },
  { numerator: 333, denominator: 106 },
  { numerator: 355, denominator: 113 },
  { numerator: 103993, denominator: 33102 }
  // ...add more as needed
];

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