/**
 * a432.trinity.ts — 3-9-6 Trinity & Family Number Group
 *
 * Encodes the core trinity of Vortex Based Mathematics: [3, 9, 6].
 * - 3: Creative flow, generative principle
 * - 9: Axis, invisible monopole, spiritual center
 * - 6: Return flow, receptive principle
 *
 * The family number group is the recursive stream: [1, 2, 4, 8, 7, 5, 1]
 * All flows are digit-based, recursive, and harmonically self-similar.
 *
 * Source: Marko Rodin Special Edition, Chapter 3 (The Numerical Formula of Spirit)
 */

/**
 * a432TrinityCycle: Returns the next digit in the 3-9-6 trinity cycle.
 * Usage: a432TrinityCycle(3) // 9
 */
export function a432TrinityCycle(n: number): number {
  const cycle = [3, 9, 6];
  const idx = cycle.indexOf(n);
  return cycle[(idx + 1) % cycle.length];
}

/**
 * a432FamilyGroup: Returns the next digit in the family number group [1,2,4,8,7,5,1].
 * Usage: a432FamilyGroup(1) // 2
 */
export function a432FamilyGroup(n: number): number {
  const group = [1, 2, 4, 8, 7, 5, 1];
  const idx = group.indexOf(n);
  return group[(idx + 1) % group.length];
}

/**
 * a432TrinityStream: Recursively generates a stream of the trinity digits.
 * steps: number of digits to generate
 * start: starting digit (default 3)
 */
export function a432TrinityStream(steps: number, start: number = 3): number[] {
  const result = [];
  let n = start;
  for (let i = 0; i < steps; i++) {
    result.push(n);
    n = a432TrinityCycle(n);
  }
  return result;
}

/**
 * a432FamilyStream: Recursively generates a stream of the family number group digits.
 * steps: number of digits to generate
 * start: starting digit (default 1)
 */
export function a432FamilyStream(steps: number, start: number = 1): number[] {
  const result = [];
  let n = start;
  for (let i = 0; i < steps; i++) {
    result.push(n);
    n = a432FamilyGroup(n);
  }
  return result;
}

/**
 * Metaphysical Mapping:
 * - 3-9-6 is the generative/return trinity, the axis of all vortex flows.
 * - The family number group is the living stream, the recursive pulse of creation.
 * - All digit flows are self-similar, recursive, and harmonically balanced.
 */
// Metaphysical mapping: Trinity = generative seed, axis, field
export const TRINITY_DOC = {
  meaning: 'Trinity: generative seed, axis, field, creation, harmonic balance.',
  axis: 'Trinity is the generative principle, the field of creation, and the harmonic seed.'
};
// All math in this module uses only vortex/trinity numbers and harmonic integer fractions. 