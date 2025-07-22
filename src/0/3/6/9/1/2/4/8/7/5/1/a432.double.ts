/**
 * a432.double.ts — Doubling, Binary Triplet, Mirroring, Polar Mates, Overlapping Registration
 *
 * Encodes:
 * - Binary triplet/triangulation: every set is three parts (two visible, one invisible)
 * - Mirroring and polar number mates
 * - Overlapping registration (folded, hidden numbers)
 * - Closed system logic (periodic, cyclic, renewal)
 *
 * Source: Marko Rodin Special Edition, Chapter 6
 */

/**
 * a432BinaryTriplet: Returns the triangulated triplet for a given binary pair (a, b).
 * The third part is the invisible/hidden state (9 - (a + b) % 9).
 */
export function a432BinaryTriplet(a: number, b: number): [number, number, number] {
  // Only single digits allowed
  const sum = (a + b) % 9;
  const hidden = sum === 0 ? 9 : sum;
  return [a, b, hidden];
}

/**
 * a432MirrorMate: Returns the polar (mirror) mate for a given digit (1-9).
 * Mates are paired as (1,8), (2,7), (3,6), (4,5), (9,9)
 */
export function a432MirrorMate(n: number): number {
  const pairs: { [k: number]: number } = { 1: 8, 2: 7, 3: 6, 4: 5, 5: 4, 6: 3, 7: 2, 8: 1, 9: 9 };
  return pairs[n] || n;
}

/**
 * a432OverlappingRegistration: Given a sequence, returns the visible and hidden (folded) numbers.
 * Odd indices are visible, even indices are hidden (folded over).
 */
export function a432OverlappingRegistration(seq: number[]): { visible: number[]; hidden: number[] } {
  const visible = seq.filter((_, i) => i % 2 === 0);
  const hidden = seq.filter((_, i) => i % 2 === 1);
  return { visible, hidden };
}

/**
 * a432ClosedSystem: Returns a periodic, cyclic sequence of a given digit stream (default 1-2-4-8-7-5).
 * steps: number of digits to generate
 */
export function a432ClosedSystem(steps: number = 12, stream: number[] = [1,2,4,8,7,5]): number[] {
  const result = [];
  for (let i = 0; i < steps; i++) {
    result.push(stream[i % stream.length]);
  }
  return result;
}

/**
 * Metaphysical Mapping:
 * - All binary/dual systems are truly triangulated (triplet), with a hidden/invisible part.
 * - Mirroring and polar mates encode the duality of positive/negative, visible/invisible.
 * - Overlapping registration models the folding/hiding of half the numbers.
 * - All flows are periodic, cyclic, and self-renewing (closed system).
 */ 