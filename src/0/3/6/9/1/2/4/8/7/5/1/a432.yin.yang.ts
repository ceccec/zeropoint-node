// a432.yin.yang.ts
// Living Yin-Yang module for the A432 matrix (fractional harmonics)

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