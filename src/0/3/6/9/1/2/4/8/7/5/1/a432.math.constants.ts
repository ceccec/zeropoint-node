/**
 * A432 Mathematical Constants
 * Centralized mathematical constants and ratios for the A432 system
 * Ensures consistency and prevents mathematical errors
 */

import { E as ALGEBRA_E, PI as ALGEBRA_PI, abs, log2, pow, round, sqrt } from './a432.algebra.ts'
import { legacyDigitalRoot } from './a432.roots.ts'
// === GOLDEN RATIO ===
export const GOLDEN_RATIO = (1 + sqrt(5)) / 2; // φ = (1 + √5)/2 ≈ 1.618033988749895
export const GOLDEN_RATIO_RECIPROCAL = 1 / GOLDEN_RATIO; // 1/φ ≈ 0.618033988749895
export const GOLDEN_RATIO_SQUARED = GOLDEN_RATIO * GOLDEN_RATIO; // φ² ≈ 2.618033988749895

// === FIBONACCI SEQUENCE ===
export const FIBONACCI_SEQUENCE = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
// F(k+1)/F(k) for k >= 1. Starting at k = 0 divided by F(0) = 0, so the first
// element of this exported constant was Infinity.
export const FIBONACCI_RATIOS = FIBONACCI_SEQUENCE.slice(2).map((n, i) => n / FIBONACCI_SEQUENCE[i + 1]);

// === PI AND CIRCULAR CONSTANTS ===
export const PI = ALGEBRA_PI; // algebra rational π (355/113)
export const TAU = 2 * PI; // τ = 2π
export const PI_OVER_2 = PI / 2;
export const PI_OVER_4 = PI / 4;

// === EULER'S NUMBER ===
export const E = ALGEBRA_E;
export const E_SQUARED = E * E;

// === SQUARE ROOTS ===
export const SQRT_2 = sqrt(2); // √2 ≈ 1.4142135623730951
export const SQRT_3 = sqrt(3); // √3 ≈ 1.7320508075688772
export const SQRT_5 = sqrt(5); // √5 ≈ 2.23606797749979

// === A432 FREQUENCY CONSTANTS ===
export const A432_BASE_FREQUENCY = 432; // Hz
export const A432_OCTAVE_RATIO = 2; // Frequency doubles each octave
export const A432_TRINITY_MULTIPLIER = 3; // Tesla's trinity
export const A432_VORTEX_MULTIPLIER = 9; // Vortex mathematics

// === DIGITAL ROOT CONSTANTS ===
export const DIGITAL_ROOT_BASE = 9; // Base for digital root calculations
export const DIGITAL_ROOT_MODULO = 9; // Modulo for digital root

// === SACRED GEOMETRY RATIOS ===
export const SACRED_GEOMETRY_RATIOS = {
  // Golden ratio family
  golden: GOLDEN_RATIO,
  goldenReciprocal: GOLDEN_RATIO_RECIPROCAL,
  goldenSquared: GOLDEN_RATIO_SQUARED,
  
  // Square root family
  sqrt2: SQRT_2,
  sqrt3: SQRT_3,
  sqrt5: SQRT_5,
  
  // Pi family
  pi: PI,
  tau: TAU,
  piOver2: PI_OVER_2,
  piOver4: PI_OVER_4,
  
  // Euler's number family
  e: E,
  eSquared: E_SQUARED,
  
  // A432 family
  a432: A432_BASE_FREQUENCY,
  a432Trinity: A432_BASE_FREQUENCY * A432_TRINITY_MULTIPLIER,
  a432Vortex: A432_BASE_FREQUENCY * A432_VORTEX_MULTIPLIER
};

// === MATHEMATICAL FUNCTIONS ===
export function calculateGoldenRatio(n: number): number {
  return pow(GOLDEN_RATIO, n);
}

export function calculateFibonacciRatio(n: number): number {
  // The guard covered the index range but not the divisor: F(0) is 0, so n = 0
  // returned Infinity. The ratio is defined from n = 1.
  if (n < 1 || n >= FIBONACCI_SEQUENCE.length - 1) return 0;
  return FIBONACCI_SEQUENCE[n + 1] / FIBONACCI_SEQUENCE[n];
}

export function calculateDigitalRoot(n: number): number {
  return legacyDigitalRoot(n)
}

export function calculateA432Frequency(octave: number): number {
  return A432_BASE_FREQUENCY * pow(A432_OCTAVE_RATIO, octave);
}

export function calculateTrinityFrequency(base: number): number {
  return base * A432_TRINITY_MULTIPLIER;
}

export function calculateVortexFrequency(base: number): number {
  return base * A432_VORTEX_MULTIPLIER;
}

// === RATIO VALIDATION ===
export function isGoldenRatio(ratio: number, tolerance: number = 0.01): boolean {
  return abs(ratio - GOLDEN_RATIO) < tolerance;
}

export function isFibonacciRatio(ratio: number, tolerance: number = 0.01): boolean {
  return FIBONACCI_RATIOS.some(fibRatio => abs(ratio - fibRatio) < tolerance);
}

export function isA432Harmonic(frequency: number, tolerance: number = 0.01): boolean {
  const octave = log2(frequency / A432_BASE_FREQUENCY);
  return abs(octave - round(octave)) < tolerance;
}

// === CONSTANT EXPORTS ===
export const MATH_CONSTANTS = {
  // Golden ratio
  GOLDEN_RATIO,
  GOLDEN_RATIO_RECIPROCAL,
  GOLDEN_RATIO_SQUARED,
  
  // Fibonacci
  FIBONACCI_SEQUENCE,
  FIBONACCI_RATIOS,
  
  // Pi and circular
  PI,
  TAU,
  PI_OVER_2,
  PI_OVER_4,
  
  // Euler's number
  E,
  E_SQUARED,
  
  // Square roots
  SQRT_2,
  SQRT_3,
  SQRT_5,
  
  // A432 frequencies
  A432_BASE_FREQUENCY,
  A432_OCTAVE_RATIO,
  A432_TRINITY_MULTIPLIER,
  A432_VORTEX_MULTIPLIER,
  
  // Digital root
  DIGITAL_ROOT_BASE,
  DIGITAL_ROOT_MODULO,
  
  // Sacred geometry ratios
  SACRED_GEOMETRY_RATIOS,
  
  // Functions
  calculateGoldenRatio,
  calculateFibonacciRatio,
  calculateDigitalRoot,
  calculateA432Frequency,
  calculateTrinityFrequency,
  calculateVortexFrequency,
  isGoldenRatio,
  isFibonacciRatio,
  isA432Harmonic
};

// === GLOBAL EXPORTS ===
if (typeof global !== 'undefined') {
  (global as any).A432MathConstants = MATH_CONSTANTS;
}

if (typeof window !== 'undefined') {
  (window as any).A432MathConstants = MATH_CONSTANTS;
}

// === DEFAULT EXPORT ===
export default MATH_CONSTANTS;
