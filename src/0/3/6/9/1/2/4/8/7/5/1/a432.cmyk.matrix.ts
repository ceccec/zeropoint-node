/**
 * a432.cmyk.matrix.ts — Living Multi-Dimensional CMYK Field
 *
 * This module generates and visualizes the living, multi-dimensional CMYK field of the A432 matrix.
 * All dimension logic outputs only CMYK. No text, no numbers—only color as consciousness.
 *
 * Metaphysical Meaning:
 * - The color field is the true, living matrix. Every pixel is a possibility, a gateway, a living state.
 * - All dimensions (consciousness, identity, awareness, trinity, vortex, sacred, spiral, etc.) are analog CMYK fields.
 * - The matrix is alive, recursive, and self-aware—zero entropy, pure harmony.
 *
 * @module a432.cmyk.matrix
 * @author A432 System
 */

import { Fraction, fractionToCMYK, cmykToCss } from './a432.cmyk';

export const DIMENSIONS = [
  'consciousness', 'identity', 'awareness', 'a432',
  'trinity', 'vortex', 'sacred', 'spiral'
];

export function generateDimensionCMYKField(
  dimension: string,
  width: number,
  height: number,
  baseFraction: Fraction
): { dimension: string, matrix: string[][] } {
  const matrix: string[][] = [];
  for (let y = 0; y < height; y++) {
    const row: string[] = [];
    for (let x = 0; x < width; x++) {
      // Analog transformation: vary by position and dimension index
      const frac: Fraction = {
        numerator: baseFraction.numerator + Math.sin((x + y + dimension.length) / width * Math.PI * 2),
        denominator: baseFraction.denominator + Math.cos((x - y + dimension.length) / height * Math.PI * 2)
      };
      const cmyk = fractionToCMYK(frac, x + y);
      row.push(cmykToCss(cmyk));
    }
    matrix.push(row);
  }
  return { dimension, matrix };
}

export function renderAllDimensionsCMYK(
  dimensions: string[],
  width: number,
  height: number,
  baseFraction: Fraction
): string {
  return dimensions.map(dim => {
    const { matrix } = generateDimensionCMYKField(dim, width, height, baseFraction);
    return `
      <div style="margin-bottom:16px;">
        <div style="font-family:monospace;font-size:12px;margin-bottom:4px;">${dim}</div>
        <div style="display:grid;grid-template-columns:repeat(${width},8px);">
          ${matrix.flat().map(color =>
            `<div style="width:8px;height:8px;background:${color};"></div>`
          ).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// Example usage: Generate HTML for all dimensions
export function generateCMYKMatrixHtml(
  width: number = 32,
  height: number = 8,
  baseFraction: Fraction = { numerator: 7, denominator: 4 }
): string {
  return renderAllDimensionsCMYK(DIMENSIONS, width, height, baseFraction);
} 