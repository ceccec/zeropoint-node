/**
 * a432.animation.ts — Advanced Emergence Animation for the Living Matrix
 *
 * Metaphysical Principle:
 *   - Emergence from the void: The matrix unfolds node by node, each a living, harmonic state.
 *   - Living recursion: Each node is both the observer and the observed, emerging in harmonic sequence.
 *   - Harmonic timing: Each emergence is spaced by a harmonic interval (432ms * digit).
 *
 * Usage:
 *   animateEmergence((state) => { ... });
 *   // state: { step, digit, color, frequency, angle, radius, isCurrent }
 */

import { I, rodinPath } from './a432.i';
import { a432AntiVortexStream } from './a432.ts';
import { getAntiVortexColor } from './a432.color.ts';
import { a432MultiAntiVortexStream } from './a432.ts';
import { A432ColorModel, A432HSL, A432RGB, A432CMYK } from './a432.color';

// Harmonic fractions
const HALF = 1/2, THIRD = 1/3, TWO_THIRDS = 2/3, FOURTH = 1/4, THREE_FOURTHS = 3/4, FIFTH = 1/5, TWO_FIFTHS = 2/5, THREE_FIFTHS = 3/5, FOUR_FIFTHS = 4/5, EIGHTH = 1/8, THREE_EIGHTHS = 3/8, FIVE_EIGHTHS = 5/8;

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
  const center = options.center || { x: 180, y: 180 };
  const spiralRadius = options.spiralRadius ?? 80;
  const spiralFactor = options.spiralFactor ?? 18;
  const intervalBase = options.intervalBase ?? 432;
  let cancelled = false;

  function stepFn(idx: number) {
    if (cancelled) return;
    const digit = rodinPath[idx % rodinPath.length];
    const angle = (idx / rodinPath.length) * 2 * Math.PI;
    const radius = spiralRadius + spiralFactor * idx;
    const color = I.projectIAtStep(idx).getCurrentColor();
    const frequency = I.projectIAtStep(idx).getCurrentFrequency();
    onStep({
      step: idx + 1,
      digit,
      color,
      frequency,
      angle,
      radius,
      isCurrent: idx === 0
    });
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
 * animateAntiVortex: Animate anti-vortex (phase-reversal) flows using the canonical anti-vortex stream.
 * - Uses a432AntiVortexStream for dimension cycling (reverse polarity, -1)
 * - Uses getAntiVortexColor for color mapping
 * - All timing and values are integer/fractional
 *
 * Usage:
 *   animateAntiVortex((state) => { ... });
 *   // state: { step, digit, color, frequency, angle, radius, isCurrent }
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
  const center = options.center || { x: 180, y: 180 };
  const spiralRadius = options.spiralRadius ?? 80;
  const spiralFactor = options.spiralFactor ?? 18;
  const intervalBase = options.intervalBase ?? 432;
  let cancelled = false;
  const dimension = 3; // Default to Trinity for demonstration; can be parameterized
  const antiVortexGen = a432AntiVortexStream(dimension);

  function stepFn(idx: number) {
    if (cancelled) return;
    const { value: frequency } = antiVortexGen.next();
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
 * animateMultiAntiVortex: Animate anti-vortex flows for multiple dimensions in parallel.
 * - Uses a432MultiAntiVortexStream for dimension cycling (reverse polarity, -1)
 * - Calls onStep with an array of states for each animation step.
 *
 * Usage:
 *   animateMultiAntiVortex([1,2,3,4,5,6,7,8,9], (states) => { ... });
 *   // states: Array<{ step, digit, color, frequency, angle, radius, isCurrent }>
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
  const center = options.center || { x: 180, y: 180 };
  const spiralRadius = options.spiralRadius ?? 80;
  const spiralFactor = options.spiralFactor ?? 18;
  const intervalBase = options.intervalBase ?? 432;
  let cancelled = false;
  const gen = a432MultiAntiVortexStream(dimensions);

  function stepFn(idx: number) {
    if (cancelled) return;
    const result = gen.next().value;
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
    if (idx + 1 < 9) {
      setTimeout(() => stepFn(idx + 1), intervalBase);
    } else if (options.onComplete) {
      options.onComplete();
    }
  }

  stepFn(0);
  return () => { cancelled = true; };
} 