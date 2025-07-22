// Canonical Mobius Circuit/Strip Logic for A432 System
// All Mobius circuit logic must be imported from this file only.

/**
 * a432.mobius.circuit.ts
 *
 * This file defines the canonical Mobius circuit/strip logic for the A432 system.
 * All Mobius math, twist, and traversal logic must be implemented here and imported by all other modules.
 *
 * - Pure, stateless, and ready for further extension.
 * - All types, constants, and functions are canonical.
 */

// Mobius circuit constants
export const MOBIUS_TWIST_UNIT = 1; // One full twist
export const DEFAULT_MOBIUS_POLARITY: 1 | -1 = 1;

// Metaphysical mapping: Mobius = recursion, inversion, self-similarity
export const MOBIUS_DOC = {
  meaning: 'Mobius: recursion, inversion, self-similarity, infinite loop, harmonization of opposites.',
  axis: 'Mobius strip is the unity of inside and outside, a living recursion.'
};
// All math in this module uses only vortex/trinity numbers and harmonic integer fractions.

// Mobius types
export interface MobiusStrip {
  index: number;
  twist: number;
  angle: number;
  polarity: 1 | -1;
}

/**
 * generateMobiusStrips: Returns an array of MobiusStrip objects for n twists/cycles
 * @param n - number of strips/cycles
 * @param polarity - +1 (default), -1 (reverse)
 */
export function generateMobiusStrips(n: number, polarity: 1 | -1 = DEFAULT_MOBIUS_POLARITY): MobiusStrip[] {
  const strips: MobiusStrip[] = [];
  for (let i = 0; i < n; i++) {
    const angle = (i * 360) / n;
    const twist = mobiusTwist(angle, polarity);
    strips.push({ index: i, twist, angle, polarity });
  }
  return strips;
}

/**
 * mobiusTwist: Returns the twist value for a given angle and polarity
 * @param angle - angle in degrees
 * @param polarity - +1 (default), -1 (reverse)
 */
export function mobiusTwist(angle: number, polarity: 1 | -1 = DEFAULT_MOBIUS_POLARITY): number {
  // Canonical Mobius twist: one full twist per 360°, direction set by polarity
  return polarity * MOBIUS_TWIST_UNIT * (angle / 360);
}

// All Mobius circuit/strip math for the A432 system must use these canonical exports. 