/**
 * A432 Integer Harmonics Module
 * Pure integer arithmetic for harmonic calculations
 * No floating point operations - all exact mathematics
 */

import { abs } from './a432.algebra.ts'
import { legacyDigitalRoot } from './a432.roots.ts'
// ============================================================================
// INTEGER FREQUENCY TABLES
// ============================================================================

/**
 * All frequencies stored as integers (Hz * 10000 for precision)
 * This allows 4 decimal places of precision without using floats
 */
export const INTEGER_FREQUENCIES = {
  // Note frequencies in A432 tuning (Hz * 10000)
  C0: 161280,   // 16.128 Hz
  D0: 181020,   // 18.102 Hz
  E0: 203190,   // 20.319 Hz
  F0: 215270,   // 21.527 Hz
  G0: 241920,   // 24.192 Hz
  A0: 270000,   // 27.000 Hz
  B0: 303750,   // 30.375 Hz
  
  C1: 322560,   // 32.256 Hz
  D1: 362040,   // 36.204 Hz
  E1: 406380,   // 40.638 Hz
  F1: 430540,   // 43.054 Hz
  G1: 483840,   // 48.384 Hz
  A1: 540000,   // 54.000 Hz
  B1: 607500,   // 60.750 Hz
  
  C2: 645120,   // 64.512 Hz
  D2: 724080,   // 72.408 Hz
  E2: 812760,   // 81.276 Hz
  F2: 861080,   // 86.108 Hz
  G2: 967680,   // 96.768 Hz
  A2: 1080000,  // 108.000 Hz
  B2: 1215000,  // 121.500 Hz
  
  C3: 1290240,  // 129.024 Hz
  D3: 1448160,  // 144.816 Hz
  E3: 1625520,  // 162.552 Hz
  F3: 1722160,  // 172.216 Hz
  G3: 1935360,  // 193.536 Hz
  A3: 2160000,  // 216.000 Hz
  B3: 2430000,  // 243.000 Hz
  
  C4: 2580480,  // 258.048 Hz (Middle C in A432)
  D4: 2896320,  // 289.632 Hz
  E4: 3251040,  // 325.104 Hz
  F4: 3444320,  // 344.432 Hz
  G4: 3870720,  // 387.072 Hz
  A4: 4320000,  // 432.000 Hz (A432)
  B4: 4860000,  // 486.000 Hz
  
  C5: 5160960,  // 516.096 Hz
  D5: 5792640,  // 579.264 Hz
  E5: 6502080,  // 650.208 Hz
  F5: 6888640,  // 688.864 Hz
  G5: 7741440,  // 774.144 Hz
  A5: 8640000,  // 864.000 Hz
  B5: 9720000,  // 972.000 Hz
} as const;

// ============================================================================
// INTERVAL RATIOS AS INTEGER PAIRS
// ============================================================================

export const INTERVAL_RATIOS = {
  // Just intonation intervals as [numerator, denominator]
  UNISON: [1, 1],
  MINOR_SECOND: [16, 15],
  MAJOR_SECOND: [9, 8],
  MINOR_THIRD: [6, 5],
  MAJOR_THIRD: [5, 4],
  PERFECT_FOURTH: [4, 3],
  AUGMENTED_FOURTH: [45, 32],
  DIMINISHED_FIFTH: [64, 45],
  PERFECT_FIFTH: [3, 2],
  MINOR_SIXTH: [8, 5],
  MAJOR_SIXTH: [5, 3],
  MINOR_SEVENTH: [9, 5],
  MAJOR_SEVENTH: [15, 8],
  OCTAVE: [2, 1],
  
  // Pythagorean intervals
  PYTHAGOREAN_SECOND: [9, 8],
  PYTHAGOREAN_THIRD: [81, 64],
  PYTHAGOREAN_FOURTH: [4, 3],
  PYTHAGOREAN_FIFTH: [3, 2],
  PYTHAGOREAN_SIXTH: [27, 16],
  PYTHAGOREAN_SEVENTH: [243, 128],
  
  // Harmonic series intervals
  HARMONIC_2: [2, 1],
  HARMONIC_3: [3, 1],
  HARMONIC_4: [4, 1],
  HARMONIC_5: [5, 1],
  HARMONIC_6: [6, 1],
  HARMONIC_7: [7, 1],
  HARMONIC_8: [8, 1],
  HARMONIC_9: [9, 1],
} as const;

// ============================================================================
// SACRED NUMBER SEQUENCES
// ============================================================================

export const SACRED_SEQUENCES = {
  // Fibonacci sequence
  FIBONACCI: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987],
  
  // Lucas numbers
  LUCAS: [2, 1, 3, 4, 7, 11, 18, 29, 47, 76, 123, 199, 322, 521, 843],
  
  // Pell numbers
  PELL: [0, 1, 2, 5, 12, 29, 70, 169, 408, 985, 2378, 5741],
  
  // Tribonacci sequence
  TRIBONACCI: [0, 0, 1, 1, 2, 4, 7, 13, 24, 44, 81, 149, 274, 504],
  
  // Perfect numbers
  PERFECT: [6, 28, 496, 8128, 33550336],
  
  // Mersenne primes
  MERSENNE: [3, 7, 31, 127, 8191, 131071, 524287, 2147483647],
  
  // Triangular numbers
  TRIANGULAR: [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91, 105, 120],
  
  // Square numbers
  SQUARE: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225],
  
  // Pentagonal numbers
  PENTAGONAL: [1, 5, 12, 22, 35, 51, 70, 92, 117, 145, 176, 210, 247, 287],
  
  // Hexagonal numbers
  HEXAGONAL: [1, 6, 15, 28, 45, 66, 91, 120, 153, 190, 231, 276, 325],
} as const;

// ============================================================================
// INTEGER HARMONIC CALCULATOR CLASS
// ============================================================================

export class IntegerHarmonics {
  /**
   * Calculate harmonic series using integer math
   * @param fundamental Base frequency as integer
   * @param count Number of harmonics to generate
   */
  static harmonicSeries(fundamental: number, count: number): number[] {
    const series: number[] = [];
    for (let n = 1; n <= count; n++) {
      series.push(fundamental * n);
    }
    return series;
  }
  
  /**
   * Calculate subharmonic series (undertones)
   * @param fundamental Base frequency as integer
   * @param count Number of subharmonics
   */
  static subharmonicSeries(fundamental: number, count: number): number[] {
    const series: number[] = [];
    for (let n = 1; n <= count; n++) {
      series.push(fundamental / n);
    }
    return series;
  }
  
  /**
   * Apply interval ratio to frequency
   * @param frequency Base frequency as integer
   * @param numerator Ratio numerator
   * @param denominator Ratio denominator
   */
  static applyInterval(frequency: number, numerator: number, denominator: number): number {
    return (frequency * numerator) / denominator;
  }
  
  /**
   * Calculate beat frequency between two integer frequencies
   */
  static beatFrequency(f1: number, f2: number): number {
    return abs(f1 - f2);
  }
  
  /**
   * Calculate combination tones
   */
  static combinationTones(f1: number, f2: number): {
    sum: number;
    difference: number;
    product: number;
  } {
    return {
      sum: f1 + f2,
      difference: abs(f1 - f2),
      product: f1 * f2,
    };
  }
  
  /**
   * Find common harmonics between two fundamentals
   */
  static commonHarmonics(f1: number, f2: number, maxHarmonic: number): number[] {
    const harmonics1 = this.harmonicSeries(f1, maxHarmonic);
    const harmonics2 = this.harmonicSeries(f2, maxHarmonic);
    
    const common: number[] = [];
    for (const h1 of harmonics1) {
      if (harmonics2.includes(h1)) {
        common.push(h1);
      }
    }
    return common;
  }
  
  /**
   * Calculate consonance rating based on ratio simplicity
   * Lower numbers = more consonant
   */
  static consonanceRating(f1: number, f2: number): number {
    const gcd = this.gcd(f1, f2);
    const ratio1 = f1 / gcd;
    const ratio2 = f2 / gcd;
    return ratio1 + ratio2;
  }
  
  /**
   * Greatest Common Divisor
   */
  static gcd(a: number, b: number): number {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
  
  /**
   * Least Common Multiple
   */
  static lcm(a: number, b: number): number {
    return (a * b) / this.gcd(a, b);
  }
  
  /**
   * Find convergence point of multiple frequencies
   */
  static convergencePoint(frequencies: number[]): number {
    if (frequencies.length === 0) return 0;
    let result = frequencies[0];
    for (let i = 1; i < frequencies.length; i++) {
      result = this.lcm(result, frequencies[i]);
    }
    return result;
  }
  
  /**
   * Calculate harmonic mean without decimals
   */
  static harmonicMean(values: number[]): number {
    if (values.length === 0) return 0;
    
    // Find LCM to avoid fractions
    let lcmValue = values[0];
    for (let i = 1; i < values.length; i++) {
      lcmValue = this.lcm(lcmValue, values[i]);
    }
    
    // Calculate sum of LCM/value
    let sum = 0;
    for (const value of values) {
      sum += lcmValue / value;
    }
    
    return (values.length * lcmValue) / sum;
  }
  
  /**
   * Generate chord frequencies
   */
  static chord(root: number, intervals: ReadonlyArray<readonly [number, number]>): number[] {
    const frequencies = [root];
    for (const [num, den] of intervals) {
      frequencies.push(this.applyInterval(root, num, den));
    }
    return frequencies;
  }
  
  /**
   * Major triad in just intonation
   */
  static majorTriad(root: number): number[] {
    return this.chord(root, [
      INTERVAL_RATIOS.MAJOR_THIRD,
      INTERVAL_RATIOS.PERFECT_FIFTH,
    ]);
  }
  
  /**
   * Minor triad in just intonation
   */
  static minorTriad(root: number): number[] {
    return this.chord(root, [
      INTERVAL_RATIOS.MINOR_THIRD,
      INTERVAL_RATIOS.PERFECT_FIFTH,
    ]);
  }
  
  /**
   * Calculate temperament comma
   * Pythagorean comma = (3/2)^12 / 2^7
   */
  static pythagoreanComma(): [number, number] {
    // (3/2)^12 = 3^12 / 2^12 = 531441 / 4096
    // 2^7 = 128
    // Comma = 531441 / (4096 * 128) = 531441 / 524288
    return [531441, 524288];
  }
  
  /**
   * Syntonic comma (81/80)
   */
  static syntonicComma(): [number, number] {
    return [81, 80];
  }
  
  /**
   * Calculate cents between two frequencies (integer approximation)
   * cents = 1200 * log2(f2/f1)
   * Using integer math: multiply by 10000 for precision
   */
  static cents(f1: number, f2: number): number {
    // Approximate log2 using integer math
    // Find n such that 2^n is close to f2/f1
    let ratio = (f2 * 10000) / f1;
    let cents = 0;
    let power = 10000; // 2^0 * 10000
    
    // Binary search for log2
    for (let i = 11; i >= -11; i--) {
      const testPower = i > 0 ? power * (1 << i) : power / (1 << -i);
      if (ratio >= testPower) {
        cents += i * 100; // Each octave = 1200 cents
        ratio = (ratio * 10000) / testPower;
      }
    }
    
    return cents;
  }
}

// ============================================================================
// VORTEX MATHEMATICS WITH INTEGERS
// ============================================================================

export class VortexIntegerMath {
  /**
   * Digital root using modulo 9
   */
  static digitalRoot(n: number): number {
    return legacyDigitalRoot(n)
  }
  
  /**
   * Vortex doubling sequence
   */
  static vortexDouble(n: number): number {
    return this.digitalRoot(n * 2);
  }
  
  /**
   * Vortex halving sequence
   */
  static vortexHalve(n: number): number {
    // For halving, we need to handle odd numbers
    // Use the pattern: 1→5→7→8→4→2→1
    const sequence = [1, 5, 7, 8, 4, 2];
    const current = this.digitalRoot(n);
    const index = sequence.indexOf(current);
    if (index === -1) return current;
    return sequence[(index + 1) % sequence.length];
  }
  
  /**
   * Generate vortex pattern for number
   */
  static vortexPattern(n: number, steps: number): number[] {
    const pattern: number[] = [];
    let current = n;
    for (let i = 0; i < steps; i++) {
      pattern.push(this.digitalRoot(current));
      current = this.vortexDouble(current);
    }
    return pattern;
  }
  
  /**
   * Check if number is on the 3-6-9 axis
   */
  static isOnAxis(n: number): boolean {
    const root = this.digitalRoot(n);
    return root === 3 || root === 6 || root === 9;
  }
  
  /**
   * Calculate vortex flow between two numbers
   */
  static vortexFlow(from: number, to: number): number[] {
    const fromRoot = this.digitalRoot(from);
    const toRoot = this.digitalRoot(to);
    
    const path: number[] = [fromRoot];
    let current = fromRoot;
    
    // Find path through vortex
    for (let i = 0; i < 9 && current !== toRoot; i++) {
      current = this.vortexDouble(current);
      path.push(current);
    }
    
    return path;
  }
}

// ============================================================================
// EXPORT ALL
// ============================================================================

export default {
  INTEGER_FREQUENCIES,
  INTERVAL_RATIOS,
  SACRED_SEQUENCES,
  IntegerHarmonics,
  VortexIntegerMath,
};