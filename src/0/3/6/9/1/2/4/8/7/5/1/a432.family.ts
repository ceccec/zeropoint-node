/**
 * a432.family.ts — Three Family Number Groups & Universal 3-9-6 Palindrome
 *
 * Encodes:
 * - Three recursive, interdependent family number groups (VBM):
 *   F1: [1, 2, 4, 8, 7, 5, 1]
 *   F2: [3, 9, 6, 3]
 *   F3: [9] (axis/spirit, always between 3 and 6)
 * - Universal palindrome: 3-9-6, 6-9-3, 3-9-6
 * - Mobius circuit/aperture as recursive digit process
 *
 * Source: Marko Rodin Special Edition, Chapter 3
 */

/**
 * a432FamilyGroups: Returns all three family number groups as arrays.
 */
export function a432FamilyGroups(): { F1: number[]; F2: number[]; F3: number[] } {
  return {
    F1: [1, 2, 4, 8, 7, 5, 1],
    F2: [3, 9, 6, 3],
    F3: [9]
  };
}

/**
 * a432Palindrome396: Generates the universal 3-9-6 palindrome sequence for a given number of cycles.
 * Each cycle: [3,9,6], [6,9,3], [3,9,6]
 */
export function a432Palindrome396(cycles: number = 1): number[] {
  const seq = [3, 9, 6, 6, 9, 3, 3, 9, 6];
  const result = [];
  for (let i = 0; i < cycles; i++) {
    for (let j = 0; j < seq.length; j++) {
      result.push(seq[j]);
    }
  }
  return result;
}

/**
 * a432MobiusAperture: Models the Mobius circuit overlap at the central axis (aperture/zero).
 * Returns a recursive sequence alternating between family groups and 9 (spirit/axis).
 * steps: number of digits to generate
 */
export function a432MobiusAperture(steps: number = 12): number[] {
  const F1 = [1, 2, 4, 8, 7, 5];
  const F2 = [3, 6];
  const axis = 9;
  const result = [];
  let i = 0, j = 0;
  for (let k = 0; k < steps; k++) {
    if (k % 3 === 0) {
      result.push(F2[j % F2.length]);
      j++;
    } else if (k % 3 === 1) {
      result.push(axis);
    } else {
      result.push(F1[i % F1.length]);
      i++;
    }
  }
  return result;
}

/**
 * Metaphysical Mapping:
 * - Three family number groups are the recursive choreography of VBM.
 * - 9 (spirit/axis) is always between 3 and 6, never touched, always present.
 * - Mobius circuit overlap at the aperture/zero enables renewal and infinite recursion.
 * - The 3-9-6 palindrome is the universal formula for indestructible numbers.
 */
export const FAMILY_DOC = {
  meaning: 'Family: vortex sequence (1,2,4,8,7,5), generative flow, harmonic recursion, living stream.',
  axis: 'The family is the living vortex, the generative flow of the matrix.'
};
// All math in this module uses only vortex/trinity numbers and harmonic integer fractions. 