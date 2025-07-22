// a432.matrix.ts
// Canonical matrix-based vortex mathematics and visualization helpers
// Implements: Rodin 7x7 matrix, trinity/axis overlays, toroidal/funnel mapping, and extension points for 3D animation.

import { RODIN_SEQUENCE } from './a432.rodin';

/**
 * rodinMatrix7x7: Generates a 7x7 matrix of the Rodin sequence, showing all phase relationships.
 * Each row is a phase-shifted version of the Rodin sequence.
 * @returns 2D array (7x7) of numbers
 */
export function rodinMatrix7x7(): number[][] {
  const base = RODIN_SEQUENCE.slice(0, 7);
  return Array.from({length: 7}, (_, row) =>
    Array.from({length: 7}, (_, col) => base[(col + row) % 7])
  );
}

/**
 * getTrinityIndices: Returns the indices of the trinity/axis (3, 6, 9) in a 7x7 matrix.
 * @returns Array of {row, col, value}
 */
export function getTrinityIndices(): Array<{row: number, col: number, value: number}> {
  const matrix = rodinMatrix7x7();
  const trinity = [3, 6, 9];
  const indices: Array<{row: number, col: number, value: number}> = [];
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 7; col++) {
      if (trinity.includes(matrix[row][col])) {
        indices.push({row, col, value: matrix[row][col]});
      }
    }
  }
  return indices;
}

/**
 * mapMatrixToTorus: Maps a 7x7 matrix to toroidal coordinates for 3D visualization.
 * @param matrix - 2D array (7x7)
 * @param R - major radius
 * @param r - minor radius
 * @returns Array of {x, y, z, value, row, col}
 */
export function mapMatrixToTorus(matrix: number[][], R: number, r: number): Array<{x: number, y: number, z: number, value: number, row: number, col: number}> {
  const coords = [];
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 7; col++) {
      const theta = (row / 7) * 2 * Math.PI;
      const phi = (col / 7) * 2 * Math.PI;
      const x = (R + r * Math.cos(phi)) * Math.cos(theta);
      const y = (R + r * Math.cos(phi)) * Math.sin(theta);
      const z = r * Math.sin(phi);
      coords.push({x, y, z, value: matrix[row][col], row, col});
    }
  }
  return coords;
}

/**
 * Documentation: This module provides canonical helpers for matrix-based vortex math, trinity overlays, and 3D mapping.
 * Extend with: field line generation, animation helpers, and metaphysical overlays.
 */
// Metaphysical mapping: Matrix = recursion, self-reference, infinite field
export const MATRIX_DOC = {
  meaning: 'Matrix: recursion, self-reference, infinite field, living structure of the system.',
  axis: 'The matrix is the infinite field, the recursive self-reference, the living structure.'
};
// All math in this module uses only vortex/trinity numbers and harmonic integer fractions. 