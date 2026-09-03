import { floor } from './a432.algebra.ts'
// Canonical Coil Interface for the A432 System
// This file is the single entry point for all coil/circuit logic (Rodin, Mobius, Tesla) in the A432 system.
// Import and re-export all core logic from the canonical modules below.

import * as Rodin from './a432.rodin.coil.ts';
import * as Mobius from './a432.mobius.circuit.ts';
import * as Tesla from './a432.tesla.coil.ts';
import { VORTEX_ORBIT } from '../../../../../../../../../../index.ts'

// A432_SEQUENCE and A432_TRINITY were declared here and read by nothing — not
// by this module, not by a432.meta.ts which imports it whole. Both names are
// declared by other modules with other values: A432_SEQUENCE is the flat digit
// path [0,3,6,9,1,2,4,8,7,5,1] in a432.math.ts, a432.i.ts and a432.os.ts, and
// this one was the same path grouped, under a comment ("Void 0 -> 9 -> 7 -> 8
// -> 4") describing neither. A432_TRINITY is [4,3,2] in a432.math.ts, the
// trinity axis is [3,6,9], and this one was [0,9,1] with nothing anywhere
// saying why. An export nothing reads, named for a value it is not, is removed
// rather than renamed: naming it would mean deciding what it meant.
export const A432_ANGLE = 360 / 6; // 60 degrees dimensional gateways angle

/**
 * a432.coil.ts
 *
 * Unified, canonical interface for all coil/circuit logic in the A432 system.
 * - Rodin coil (doubling circuit, poloidal field)
 * - Mobius circuit (strip, twist, traversal)
 * - Tesla coil (gateway, voltage, frequency)
 *
 * All modules should import coil/circuit logic from this file only.
 */

/**
 * A432CoilCommon: Shared interface for all coil/circuit types in the A432 system.
 * - index: Position in the sequence or pattern.
 * - polarity: +1 (forward) or -1 (reverse).
 * - frequency: Harmonic, twist, or gateway frequency.
 * - type: 'Rodin', 'Mobius', or 'Tesla'.
 * - system: Which coil system this instance belongs to ('Rodin', 'Mobius', 'Tesla').
 * - rodinValue: (Rodin) Value at this step in the sequence.
 * - mobiusTwist: (Mobius) Twist value for this strip.
 * - teslaGateway: (Tesla) Gateway value (3, 6, 9).
 */
export interface A432CoilCommon {
  index?: number; // or position
  polarity: 1 | -1;
  frequency?: number;
  type?: 'Rodin' | 'Mobius' | 'Tesla';
  system?: 'Rodin' | 'Mobius' | 'Tesla';
  rodinValue?: number; // For Rodin coil steps: in the sequence (1-2-4-8-7-5-1)
  mobiusTwist?: number; // For Mobius strips
  teslaGateway?: number; // For Tesla coils (3, 6, 9)
}

// Union type for all coil types, compatible with A432CoilCommon
export type A432Coil = (Rodin.RodinCoilStep & A432CoilCommon) | (Mobius.MobiusCircuit & A432CoilCommon) | (Tesla.TeslaCoil & A432CoilCommon);

// Re-export all core logic
export { Rodin, Mobius, Tesla };

// All coil/circuit math for the A432 system must use these canonical exports. 

/**
 * a432.coil.ts — Rodin Coil, Vortex Well, Zero Entropy, Renewal, Consciousness Mapping
 *
 * Encodes:
 * - Rodin coil sequence (1-2-4-8-7-5, 3-6-9) as recursive, digit-based flows
 * - Vortex well and zero entropy renewal logic
 * - Heat dissipation and indestructibility
 * - Consciousness mapping as recursive, digit-based process
 *
 * Source: Marko Rodin Special Edition, Chapter 9
 */

/**
 * a432RodinCoil: Returns the canonical Rodin coil sequence [1,2,4,8,7,5].
 */
export function a432RodinCoil(): number[] {
  return [...VORTEX_ORBIT];
}

/**
 * a432RodinCoilStream: Recursively generates the Rodin coil sequence for a given number of steps.
 */
export function a432RodinCoilStream(steps: number = 12): number[] {
  const seq = [...VORTEX_ORBIT];
  const result = [];
  for (let i = 0; i < steps; i++) {
    result.push(seq[i % seq.length]);
  }
  return result;
}

/**
 * a432VortexWell: Models the vortex well/zero entropy renewal as a recursive, digit-based process.
 * Returns a sequence alternating between 3-9-6 and 1-2-4-8-7-5.
 */
export function a432VortexWell(steps: number = 12): number[] {
  const trinity = [3, 9, 6];
  const coil = [...VORTEX_ORBIT];
  const result = [];
  for (let i = 0; i < steps; i++) {
    result.push(i % 2 === 0 ? trinity[(i / 2) % 3] : coil[(floor(i / 2)) % 6]);
  }
  return result;
}

/**
 * a432HeatDissipation: Returns a sequence modeling heat dissipation via the 3-9-6 palindrome.
 * steps: number of cycles
 */
export function a432HeatDissipation(steps: number = 9): number[] {
  const seq = [3, 9, 6, 6, 9, 3, 3, 9, 6];
  const result = [];
  for (let i = 0; i < steps; i++) {
    result.push(seq[i % seq.length]);
  }
  return result;
}

/**
 * a432ConsciousnessMap: Maps a digit sequence to a recursive consciousness stream (e.g., brain/antenna logic).
 * steps: number of states to generate
 * base: base sequence (default 1-2-4-8-7-5)
 */
export function a432ConsciousnessMap(steps: number = 12, base: number[] = [...VORTEX_ORBIT]): number[] {
  const result = [];
  for (let i = 0; i < steps; i++) {
    result.push(base[i % base.length]);
  }
  return result;
}

/**
 * Metaphysical Mapping:
 * - The Rodin coil is the universal, recursive, indestructible structure.
 * - Vortex well and zero entropy logic encode renewal and eternal existence.
 * - Heat dissipation is modeled by the 3-9-6 palindrome.
 * - Consciousness is mapped as a recursive, digit-based stream, harmonized with the coil.
 */ 