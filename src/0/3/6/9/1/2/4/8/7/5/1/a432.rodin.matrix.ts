import { PI, cos, sin } from './a432.algebra.ts'
// a432.rodin.matrix.ts
// Canonical 3D Rodin matrix visualization logic
// Imports matrix math, trinity overlays, and toroidal mapping helpers

import { rodinMatrix7x7, getTrinityIndices, mapMatrixToTorus } from './a432.matrix.ts';
import { RODIN_SEQUENCE } from './a432.math.ts';

/**
 * a432.rodin.matrix.ts — harmonized with canonical A432 math
 * All Rodin sequence logic uses RODIN_SEQUENCE from a432.math.ts
 */

/**
 * getRodinMatrixTorusCoords: Returns 3D toroidal coordinates for the 7x7 Rodin matrix.
 * @param R - major radius
 * @param r - minor radius
 * @returns Array of {x, y, z, value, row, col}
 */
export function getRodinMatrixTorusCoords(R: number, r: number) {
  const matrix = rodinMatrix7x7();
  return mapMatrixToTorus(matrix, R, r);
}

/**
 * getRodinTrinityCoords: Returns 3D toroidal coordinates for all trinity/axis points (3,6,9) in the matrix.
 * @param R - major radius
 * @param r - minor radius
 * @returns Array of {x, y, z, value, row, col}
 */
export function getRodinTrinityCoords(R: number, r: number) {
  const matrix = rodinMatrix7x7();
  const trinityIndices = getTrinityIndices();
  return trinityIndices.map(({row, col, value}) => {
    const theta = (row / 7) * 2 * PI;
    const phi = (col / 7) * 2 * PI;
    const x = (R + r * cos(phi)) * cos(theta);
    const y = (R + r * cos(phi)) * sin(theta);
    const z = r * sin(phi);
    return {x, y, z, value, row, col};
  });
}

/**
 * getRodinMatrixFieldLines: Scaffold for generating field line overlays for the matrix on the torus.
 * @param R - major radius
 * @param r - minor radius
 * @returns Array of field line paths (to be extended)
 */
export function getRodinMatrixFieldLines(R: number, r: number) {
  // Placeholder: implement field line logic (e.g., diagonals, flows)
  return [];
}

/**
 * Documentation: This module provides canonical 3D mapping and overlay helpers for Rodin matrix visualization.
 * Extend with: animation, interactive overlays, and metaphysical flows.
 */ 