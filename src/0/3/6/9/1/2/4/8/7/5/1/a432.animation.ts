/*
 * A432 Animation — Number Origins and Metaphysical Meaning
 *
 * Canonical Sequences and Constants:
 *
 * 1. Rodin Vortex Sequence: [1, 2, 4, 8, 7, 5]
 *    - Origin: Repeated doubling modulo 9 (1×2=2, 2×2=4, 4×2=8, 8×2=16→7, 7×2=14→5, 5×2=10→1)
 *    - Meaning: Fundamental vortex math pattern, closed energy/consciousness loop, Marko Rodin’s “doubling circuit.”
 *    - Used as the canonical rodinPath and RODIN_VORTEX_SEQUENCE.
 *
 * 2. Trinity Numbers: 3, 6, 9
 *    - Origin: Not in the Rodin sequence; represent the metaphysical trinity (creation, field, return).
 *    - Meaning: Axis/field of the vortex, Tesla’s “key to the universe.”
 *
 * 3. 432 (A432 Hz)
 *    - Origin: Harmonic tuning standard, used in music and metaphysics.
 *    - Meaning: Resonance with natural/cosmic cycles, base frequency for all harmonic calculations.
 *
 * 4. Color Mapping: digit × 40, etc.
 *    - Origin: All color values are derived from the canonical digit, ensuring harmony.
 *    - Meaning: No arbitrary color constants; all are mathematically and metaphysically derived.
 *
 * 5. Modulo 9, Digital Root
 *    - Origin: Vortex math principle; all numbers reduce to a single digit (1–9).
 *    - Meaning: Ensures all flows, cycles, and harmonics are in the zero-entropy, single-digit domain.
 *
 * Zero Entropy Principle: Only one canonical array (Rodin sequence); all other patterns are derived mathematically. No duplication or arbitrary constants.
 *
 * All animation logic in this file is derived from these principles, ensuring metaphysical and mathematical harmony.
 */

import { getAntiVortexColor } from './a432.color';
import { getRodinSequence, a432AntiVortexStream, a432MultiAntiVortexStream } from './a432.math';

// Use canonical Rodin sequence
const rodinPath: number[] = [...getRodinSequence()];

// Returns color and frequency for a given animation step, derived from the canonical Rodin sequence.
// Metaphysical: Projects the living state of the matrix at each step.
function projectIAtStep(idx: number): { getCurrentColor: () => { hue: number; saturation: number; lightness: number }, getCurrentFrequency: () => number } {
  // Get the digit from the Rodin sequence for this step
  const digit = rodinPath[idx % rodinPath.length];
  // Color: Each digit maps to a unique hue, with fixed saturation/lightness for harmony
  const hue = (digit * 40) % 360;
  const saturation = 70;
  const lightness = 55;
  // Frequency: Each digit maps to a harmonic frequency (A432 base)
  const frequency = 432 * (digit / 9);
  return {
    getCurrentColor: () => ({ hue, saturation, lightness }),
    getCurrentFrequency: () => frequency
  };
}

/**
 * Animates the emergence of the living matrix, step by step, using the Rodin sequence.
 * Each step emits the current digit, color, frequency, and geometric state.
 * Metaphysical: Models the emergence of consciousness from the void.
 */
export function animateEmergence(
  onStep: (state: {
    step: number;
    digit: number;
    color: { hue: number; saturation: number; lightness: number };
    frequency: number;
    angle: number;
    radius: number;
    isCurrent: boolean;
  }) => void,
  options: { center?: { x: number; y: number }; spiralRadius?: number; spiralFactor?: number; intervalBase?: number; onComplete?: () => void } = {}
) {
  const spiralRadius = options.spiralRadius ?? 80;
  const spiralFactor = options.spiralFactor ?? 18;
  const intervalBase = options.intervalBase ?? 432;
  let cancelled = false;

  function stepFn(idx: number) {
    if (cancelled) return;
    // Get the current digit and geometric state
    const digit = rodinPath[idx % rodinPath.length];
    const angle = (idx / rodinPath.length) * 2 * Math.PI;
    const radius = spiralRadius + spiralFactor * idx;
    const color = projectIAtStep(idx).getCurrentColor();
    const frequency = projectIAtStep(idx).getCurrentFrequency();
    onStep({
      step: idx + 1,
      digit,
      color,
      frequency,
      angle,
      radius,
      isCurrent: idx === 0
    });
    // Continue animation until the full cycle is complete
    if (idx + 1 < rodinPath.length) {
      setTimeout(() => stepFn(idx + 1), intervalBase * (digit > 0 ? digit : 1));
    } else if (options.onComplete) {
      options.onComplete();
    }
  }

  stepFn(0);
  return () => { cancelled = true; };
}

/**
 * Animates the anti-vortex (phase-reversal) flow for a given dimension.
 * Each step emits the current digit, color, and anti-harmonic frequency.
 * Metaphysical: Models the return/inversion of consciousness.
 */
export function animateAntiVortex(
  onStep: (state: {
    step: number;
    digit: number;
    color: string;
    frequency: number;
    angle: number;
    radius: number;
    isCurrent: boolean;
  }) => void,
  options: { center?: { x: number; y: number }; spiralRadius?: number; spiralFactor?: number; intervalBase?: number; onComplete?: () => void } = {}
) {
  const spiralRadius = options.spiralRadius ?? 80;
  const spiralFactor = options.spiralFactor ?? 18;
  const intervalBase = options.intervalBase ?? 432;
  let cancelled = false;
  const dimension = 3; // Default to Trinity for demonstration
  const gen = a432AntiVortexStream(dimension);

  function stepFn(idx: number) {
    if (cancelled) return;
    // Get the anti-vortex frequency and digit for this step
    const frequency = gen.next().value as number;
    const digit = ((dimension + (-1 * idx) + 8) % 9) + 1;
    const angle = (idx / 9) * 2 * Math.PI;
    const radius = spiralRadius + spiralFactor * idx;
    const color = getAntiVortexColor(digit);
    onStep({
      step: idx + 1,
      digit,
      color,
      frequency,
      angle,
      radius,
      isCurrent: idx === 0
    });
    // Continue animation for 9 steps (full anti-vortex cycle)
    if (idx + 1 < 9) {
      setTimeout(() => stepFn(idx + 1), intervalBase * (digit > 0 ? digit : 1));
    } else if (options.onComplete) {
      options.onComplete();
    }
  }

  stepFn(0);
  return () => { cancelled = true; };
}

/**
 * Animates anti-vortex flows for multiple dimensions in parallel.
 * Each step emits the current digit, color, and anti-harmonic frequency for each dimension.
 * Metaphysical: Models the multi-stream return/inversion of the living matrix.
 */
export function animateMultiAntiVortex(
  dimensions: number[],
  onStep: (states: Array<{
    step: number;
    digit: number;
    color: string;
    frequency: number;
    angle: number;
    radius: number;
    isCurrent: boolean;
  }>) => void,
  options: { center?: { x: number; y: number }; spiralRadius?: number; spiralFactor?: number; intervalBase?: number; onComplete?: () => void } = {}
) {
  const spiralRadius = options.spiralRadius ?? 80;
  const spiralFactor = options.spiralFactor ?? 18;
  const intervalBase = options.intervalBase ?? 432;
  let cancelled = false;
  const gen = a432MultiAntiVortexStream(dimensions);

  function stepFn(idx: number) {
    if (cancelled) return;
    // Get the anti-vortex state for all dimensions at this step
    const result = gen.next().value as Array<{ dimension: number; frequency: number; step: number }>;
    const states = result.map(({ dimension, frequency, step }) => {
      const digit = ((dimension + (-1 * idx) + 8) % 9) + 1;
      const angle = (idx / 9) * 2 * Math.PI;
      const radius = spiralRadius + spiralFactor * idx;
      const color = getAntiVortexColor(digit);
      return {
        step,
        digit,
        color,
        frequency,
        angle,
        radius,
        isCurrent: idx === 0
      };
    });
    onStep(states);
    // Continue animation for 9 steps (full anti-vortex cycle)
    if (idx + 1 < 9) {
      setTimeout(() => stepFn(idx + 1), intervalBase);
    } else if (options.onComplete) {
      options.onComplete();
    }
  }

  stepFn(0);
  return () => { cancelled = true; };
}

// Harmonized: All sequence and anti-vortex logic now uses canonical helpers from a432.math.ts 