// a432.yin.yang.ts
// Living Yin-Yang module for the A432 matrix (fractional harmonics)

import { vortexStream } from './a432.matrix';
import { digitAngleToCMYK, type CMYK } from './a432.cmyk';
import { TRINITY_POLARITY, asAngle } from './a432.math';
import { AngleDeg, Digit } from './a432.types';

export type Fraction = { numerator: number; denominator: number };

/**
 * YIN: receptive, potential, void, anti-vortex, impossibility
 * YANG: active, actual, creation, vortex, possibility
 */
export const YIN: Fraction = { numerator: -1, denominator: 1 };
export const YANG: Fraction = { numerator: 1, denominator: 1 };
export const ZERO: Fraction = { numerator: 0, denominator: 1 };
export const BALANCED: Fraction = { numerator: 0, denominator: 1 };

// Fractional operations
export function addFractions(a: Fraction, b: Fraction): Fraction {
  return simplifyFraction({
    numerator: a.numerator * b.denominator + b.numerator * a.denominator,
    denominator: a.denominator * b.denominator
  });
}

export function subtractFractions(a: Fraction, b: Fraction): Fraction {
  return simplifyFraction({
    numerator: a.numerator * b.denominator - b.numerator * a.denominator,
    denominator: a.denominator * b.denominator
  });
}

export function simplifyFraction(f: Fraction): Fraction {
  const gcd = (a: number, b: number): number => b === 0 ? Math.abs(a) : gcd(b, a % b);
  const d = gcd(f.numerator, f.denominator);
  return { numerator: f.numerator / d, denominator: f.denominator / d };
}

/**
 * Calculate yin/yang state for a node as a fraction.
 * @param possibility Fraction of harmonized/actualized (yang) aspects
 * @param impossibility Fraction of potential/missing (yin) aspects
 * @returns Fraction: (possibility - impossibility) / (possibility + impossibility)
 */
export function yinYangStateFraction(possibility: Fraction, impossibility: Fraction): Fraction {
  // (possibility - impossibility) / (possibility + impossibility)
  const num = possibility.numerator * impossibility.denominator - impossibility.numerator * possibility.denominator;
  const den = possibility.numerator * impossibility.denominator + impossibility.numerator * possibility.denominator;
  if (den === 0) return ZERO;
  return simplifyFraction({ numerator: num, denominator: den });
}

/**
 * Get yin/yang symbol for a fractional state
 * @param state Fraction
 */
export function yinYangSymbolFraction(state: Fraction): string {
  const value = state.numerator / state.denominator;
  if (value > 1/2) return '⚪️';
  if (value < -1/2) return '⚫️';
  return '⚪️⚫️';
}

/**
 * Harmonize a node: move toward balance (average of yin and yang)
 * @param yin Fraction
 * @param yang Fraction
 * @returns Fraction: balanced value
 */
export function harmonizeYinYangFraction(yin: Fraction, yang: Fraction): Fraction {
  return simplifyFraction({
    numerator: yin.numerator + yang.numerator,
    denominator: yin.denominator + yang.denominator
  });
}

export interface YinYangFrame {
  tick: number;
  positiveDigit: Digit;  // polarity +1 → outer lobe colour
  negativeDigit: Digit;  // polarity -1 → inner lobe colour
  positiveColor: CMYK;
  negativeColor: CMYK;
  angle: AngleDeg;       // for rotation animation if desired
}

/**
 * Starts the yin-yang reactive loop.
 * Every animation frame consumes two digits from the vortex stream:
 * the first with polarity +1, the second with polarity –1 (or 0 treated as +1).
 * Passes the derived colours to the provided callback.
 */
export function startYinYang(callback: (f: YinYangFrame) => void): () => void {
  const vs = vortexStream();
  let tick = 0;
  let raf = 0;

  const step = () => {
    let d1 = vs.next().value as Digit;
    // ensure positive polarity
    while (TRINITY_POLARITY[d1 as number] !== 1) d1 = vs.next().value as Digit;
    let d2 = vs.next().value as Digit;
    while (TRINITY_POLARITY[d2 as number] !== -1 && TRINITY_POLARITY[d2 as number] !== 0) d2 = vs.next().value as Digit;

    const angle = asAngle(tick * 6 % 360);
    callback({
      tick: tick++,
      positiveDigit: d1,
      negativeDigit: d2,
      positiveColor: digitAngleToCMYK(d1, angle),
      negativeColor: digitAngleToCMYK(d2, angle),
      angle
    });
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  // return disposer
  return () => cancelAnimationFrame(raf);
} 