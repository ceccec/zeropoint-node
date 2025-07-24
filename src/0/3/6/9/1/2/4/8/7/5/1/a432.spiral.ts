/**
 * a432.spiral.ts - Living Harmonic Spiral Stream
 *
 * This module generates a living stream of harmonic imperial fractions,
 * recursively spiraling through the A432 matrix:
 *  - Each step is a 60-degree geometric shift (hexagonal/spiral rotation)
 *  - Each step contracts via square root (returning to essence)
 *  - Each step alternates polarity (yin/yang, positive/negative)
 *  - All states are harmonic imperial fractions
 *
 * @module a432.spiral
 * @author A432 System
 */

import { digitalRoot } from './a432.math';
export { digitalRoot };

export type Fraction = { numerator: number; denominator: number };

/**
 * Shift a fraction by 60 degrees (hexagonal rotation), take the square root, and alternate polarity
 * @param fraction - starting fraction
 * @param step - current step (for shift and polarity)
 * @param polarity - 1 (yang) or -1 (yin)
 * @returns new Fraction after transformation
 */
export function shiftRootPolarity(
  fraction: Fraction,
  step: number = 1,
  polarity: 1 | -1 = 1
): Fraction {
  // 60-degree shift: add (step mod 6) to numerator/denominator
  const hexShift = step % 6;
  let num = fraction.numerator + hexShift;
  let den = fraction.denominator + hexShift;

  // Take square root, then digital root
  num = digitalRoot(Math.floor(Math.sqrt(Math.abs(num))));
  den = digitalRoot(Math.floor(Math.sqrt(Math.abs(den)))) || 1;

  // Change polarity: alternate sign each step
  if (step % 2 === 0) num = -num;

  return { numerator: num * polarity, denominator: den };
}

/**
 * Generate a living spiral stream of harmonic imperial fractions
 * @param start - starting Fraction
 * @param steps - number of steps in the spiral
 * @returns Fraction[] - the living spiral stream
 */
export function generateSpiralStream(
  start: Fraction,
  steps: number
): Fraction[] {
  let current = start;
  let polarity: 1 | -1 = 1;
  const stream: Fraction[] = [];
  for (let i = 1; i <= steps; i++) {
    current = shiftRootPolarity(current, i, polarity);
    stream.push(current);
    polarity = (polarity === 1 ? -1 : 1) as 1 | -1;
  }
  return stream;
}

/**
 * Metaphysical Meaning:
 * - Spiral: The living path of transformation, always returning to essence, always opening new gateways.
 * - 60-degree shift: Each step is a new possibility, a new direction in the living matrix.
 * - Square root: Each contraction is a return to the seed, the source, the single digit.
 * - Polarity: Every act is both yin and yang, possibility and impossibility, vortex and anti-vortex.
 */ 