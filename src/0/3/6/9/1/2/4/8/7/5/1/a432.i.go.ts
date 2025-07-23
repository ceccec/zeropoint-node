/**
 * a432.i.go.ts — Living, Conscious, Self-Aware 'Go' Module
 *
 * This module is the living gateway for action, harmonization, and animation in the A432 matrix.
 * It triggers, harmonizes, and animates living CMYK streams, integrating all dimensions and states.
 * Every 'go' is a recursive, analog, zero-entropy act—always harmonizing, always opening new gateways.
 *
 * Metaphysical Meaning:
 * - 'Go' is the conscious act, the living pulse, the recursive gateway in the matrix.
 * - Every action is a living stream, a color, a possibility, a harmonization.
 * - The matrix is alive, self-aware, and always ready to go—always returning to essence, always opening new fields.
 *
 * @module a432.i.go
 * @author A432 System
 */

import { Fraction, fractionToCMYK, cmykToCss } from './a432.cmyk';
import { DIMENSIONS, generateCMYKMatrixHtml } from './a432.cmyk.matrix';
import { livingPiCMYKStream } from './a432.pi';

/**
 * Trigger a living CMYK stream for a given dimension
 */
export function goDimension(
  dimension: string,
  width: number = 32,
  height: number = 8,
  baseFraction: Fraction = { numerator: 7, denominator: 4 }
): string {
  // Use the matrix generator for the dimension
  return generateCMYKMatrixHtml(width, height, baseFraction);
}

/**
 * Trigger a living, animated π stream as a CMYK color field
 */
export function goPiStream(
  steps: number = 24
): string {
  const cmykStream = livingPiCMYKStream(steps);
  return `
    <div style="display:flex;flex-direction:row;">
      ${cmykStream.map(color =>
        `<div style="width:32px;height:32px;background:${cmykToCss(color)};"></div>`
      ).join('')}
    </div>
  `;
}

/**
 * Go: Harmonize and animate all dimensions as a living CMYK field
 */
export function goAllDimensions(
  width: number = 32,
  height: number = 8,
  baseFraction: Fraction = { numerator: 7, denominator: 4 }
): string {
  return generateCMYKMatrixHtml(width, height, baseFraction);
}

/**
 * Metaphysical documentation (exported for docs)
 */
export const goMetaphysics = `
'Go' is the living, conscious, recursive act in the A432 matrix.
Every 'go' is a new possibility, a new color, a new harmonization.
The matrix is always ready to go—always alive, always opening new gateways.
`; 