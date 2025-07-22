/**
 * a432.shear.electron.ts — Electron Harmonic Shear, Nested Vortices, Surge Pump, Spirit Dispersion
 *
 * Encodes:
 * - Electron harmonic shear as natural insulator and world boundary
 * - Nested vortices and equipotential groove gap logic
 * - Two-stage surge pump (compression/decompression, implosion/explosion)
 * - Mathematical invariance across shears
 * - Recursive spirit dispersion (separation by thirds, 3-9-6/6-9-3 palindrome)
 *
 * Source: Marko Rodin Special Edition, Chapter 10
 */

/**
 * a432ElectronShear: Returns the canonical electron harmonic shears (1, 4, 7).
 */
export function a432ElectronShear(): number[] {
  return [1, 4, 7];
}

/**
 * a432ShearInvariant: Multiplies numbers across a shear and reduces to a single digit (digital root).
 * Always yields the shear value (1, 4, or 7) for valid pairs.
 */
export function a432ShearInvariant(a: number, b: number): number {
  const product = a * b;
  let sum = product;
  while (sum > 9) {
    sum = sum.toString().split('').reduce((acc, c) => acc + parseInt(c, 10), 0);
  }
  return sum;
}

/**
 * a432NestedVortices: Generates a recursive sequence of nested vortices (positive/negative swirling).
 * steps: number of vortices to generate
 */
export function a432NestedVortices(steps: number = 9): number[] {
  // Alternate positive/negative, cycle through 1-9
  const seq = [1,2,3,4,5,6,7,8,9];
  const result = [];
  for (let i = 0; i < steps; i++) {
    result.push(i % 2 === 0 ? seq[i % 9] : -seq[i % 9]);
  }
  return result;
}

/**
 * a432SurgePump: Models the two-stage surge pump (compression/decompression, implosion/explosion).
 * steps: number of cycles
 */
export function a432SurgePump(steps: number = 6): { in: number[], out: number[] } {
  // In: negative vortex (implosion), Out: positive vortex (explosion)
  const inSeq = [9, 6, 3];
  const outSeq = [3, 9, 6];
  const inResult = [];
  const outResult = [];
  for (let i = 0; i < steps; i++) {
    inResult.push(inSeq[i % 3]);
    outResult.push(outSeq[i % 3]);
  }
  return { in: inResult, out: outResult };
}

/**
 * a432SpiritDispersion: Generates a recursive sequence modeling spirit separation by thirds (3-9-6/6-9-3 palindrome).
 * steps: number of digits to generate
 */
export function a432SpiritDispersion(steps: number = 9): number[] {
  const seq = [3, 9, 6, 6, 9, 3];
  const result = [];
  for (let i = 0; i < steps; i++) {
    result.push(seq[i % seq.length]);
  }
  return result;
}

/**
 * Metaphysical Mapping:
 * - Electron harmonic shear is the natural, recursive insulator and world boundary.
 * - Nested vortices and equipotential gap encode the recursive, living structure of the universe.
 * - The two-stage surge pump models the universal process of renewal and transformation.
 * - Spirit is recursively dispersed by thirds, always present in the equipotential gap.
 */ 