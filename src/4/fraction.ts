// Fraction module for digit 4: digit-based fraction logic

/**
 * Fraction logic in vortex mathematics: only single digits/functions
 */

export interface Fraction {
  numerator: number;
  denominator: number;
  value: number;
}

export function makeFraction(n: number, d: number): Fraction {
  // Only allow single digits
  const numerator = n % 9 || 9;
  const denominator = d % 9 || 9;
  return {
    numerator,
    denominator,
    value: numerator / denominator
  };
} 