import { abs } from './a432.algebra.ts'
// The rAF shim, not the bare global. Bare requestAnimationFrame is undefined
// under Node, so every function below it threw the moment anything outside a
// browser called it — which is how a432.yin.yang's startYinYang was found.
import { raf, craf } from './a432.raf.ts'
// a432.yin.yang.ts
// Living Yin-Yang module for the A432 matrix (fractional harmonics)

import { vortexStream } from './a432.matrix.ts';
import { digitAngleToCMYK, type CMYK } from './a432.cmyk.ts';
import { TRINITY_POLARITY, asAngle } from './a432.math.ts';
import { type AngleDeg, type Digit } from './a432.types.ts';

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

/**
 * Lowest terms, with the sign in the numerator.
 *
 * Two things were wrong with the previous version and both are the kind that a
 * law finds and a spot check does not.
 *
 * A ZERO DENOMINATOR produced a fraction of NaNs: gcd(0, 0) is 0, so 0/0 came
 * back as { NaN, NaN } and every arithmetic operation downstream carried it
 * silently. finite:check never saw it because it does not construct a Fraction
 * to pass in. A zero denominator is not a fraction and now says so.
 *
 * THE SIGN WAS NOT CANONICAL: 2/-4 simplified to 1/-2 and -2/4 to -1/2, so two
 * fractions of the same value simplified to different fields, and comparing
 * simplified fractions by their fields gave the wrong answer. Simplify is a
 * canonical form now, which is the only thing that makes it worth having.
 */
export function simplifyFraction(f: Fraction): Fraction {
  if (f.denominator === 0) throw new Error(`a fraction cannot have denominator 0 (got ${f.numerator}/0)`)
  const gcd = (a: number, b: number): number => b === 0 ? abs(a) : gcd(b, a % b);
  const d = gcd(f.numerator, f.denominator);
  const sign = f.denominator < 0 ? -1 : 1;
  return { numerator: (sign * f.numerator) / d, denominator: (sign * f.denominator) / d };
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
 * Harmonize a node: move toward balance.
 *
 * This is the MEDIANT (n1+n2)/(d1+d2), not the average. The two are different —
 * the mediant of 1/2 and 1/3 is 2/5 where the average is 5/12 — and the comment
 * here said "average" until a law was written for it. The mediant does lie
 * strictly between its two inputs, which is what "move toward balance" means,
 * so the value is kept and the name of the operation corrected.
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
  let frame: unknown = 0;

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
    frame = raf(step);
  };
  frame = raf(step);
  // return disposer
  return () => craf(frame);
}

export function getYinYangOverlayData(): Array<{ value: number; polarity: number; spin: number; color: { c: number; m: number; y: number; k: number } }> {
  // Canonical: 1 = yang (+1), 9 = yin (-1)
  const seq = [1, 9];
  return seq.map((value, i) => {
    const polarity = value === 1 ? 1 : -1;
    const spin = polarity;
    let color = digitAngleToCMYK(value, i * 180);
    if (polarity < 0) {
      color = { c: color.m, m: color.c, y: color.y, k: color.k };
    }
    return { value, polarity, spin, color };
  });
} 