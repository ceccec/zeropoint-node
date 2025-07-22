/**
 * a432.shear.ts — Shears, World Boundary Conditions, Multiplicative Invariance, Triangulation, Gap Space
 *
 * Encodes:
 * - Recursive modeling of shears (1, 4, 7) and world boundary conditions
 * - Multiplicative invariance across shears
 * - Triangulation and squaring logic
 * - Recursive gap space logic
 *
 * Source: Marko Rodin Special Edition, Chapter 8
 */

/**
 * a432Shears: Returns the three harmonic shears (1, 4, 7).
 */
export function a432Shears(): number[] {
  return [1, 4, 7];
}

/**
 * a432ShearProduct: Multiplies two numbers across a shear and reduces to a single digit (digital root).
 * Always yields the shear value (1, 4, or 7) for valid pairs.
 */
export function a432ShearProduct(a: number, b: number): number {
  const product = a * b;
  let sum = product;
  while (sum > 9) {
    sum = sum.toString().split('').reduce((acc, c) => acc + parseInt(c, 10), 0);
  }
  return sum;
}

/**
 * a432ShearCycle: Returns the next shear in the cycle (1 → 4 → 7 → 1).
 */
export function a432ShearCycle(n: number): number {
  const shears = [1, 4, 7];
  const idx = shears.indexOf(n);
  return shears[(idx + 1) % shears.length];
}

/**
 * a432ShearTriangulation: Given a starting shear, returns the triangulated cycle [n, next, next].
 */
export function a432ShearTriangulation(start: number): number[] {
  const shears = [start];
  let n = start;
  for (let i = 0; i < 2; i++) {
    n = a432ShearCycle(n);
    shears.push(n);
  }
  return shears;
}

/**
 * a432GapSpace: Returns a recursive array representing the single gap space connecting all shears.
 * steps: number of recursions
 */
export function a432GapSpace(steps: number = 9): number[] {
  // All gaps connect in the interior; cycle through shears
  const shears = [1, 4, 7];
  const result = [];
  for (let i = 0; i < steps; i++) {
    result.push(shears[i % 3]);
  }
  return result;
}

/**
 * Metaphysical Mapping:
 * - Shears are natural, harmonic boundaries and insulators in the torus.
 * - Multiplicative invariance across shears encodes the recursive, triangulated structure.
 * - All gaps connect in the interior, forming a single recursive gap space.
 */ 