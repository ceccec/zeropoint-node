/**
 * Unified Mathematical Utilities for ZeroPoint System
 *
 * Centralized mathematical operations and calculations used across
 * all ZeroPoint modules to eliminate duplication and ensure consistency.
 *
 * This module embodies the principle of mathematical unity - all
 * calculations follow the same underlying patterns and principles.
 */

import {
  VORTEX_CONSTANTS,
  MATH_CONSTANTS,
  ConstantsUtils,
} from "./SharedConstants";

/**
 * Core mathematical operations
 */
export class MathUtils {
  /**
   * Calculate distance between two points in 3D space
   */
  static distance3D(
    x1: number,
    y1: number,
    z1: number,
    x2: number,
    y2: number,
    z2: number,
  ): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  /**
   * Calculate distance between two points in 2D space
   */
  static distance2D(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Calculate angle between two points
   */
  static angleBetweenPoints(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ): number {
    return Math.atan2(y2 - y1, x2 - x1);
  }

  /**
   * Normalize angle to 0-2π range
   */
  static normalizeAngle(angle: number): number {
    while (angle < 0) angle += MATH_CONSTANTS.TWO_PI;
    while (angle >= MATH_CONSTANTS.TWO_PI) angle -= MATH_CONSTANTS.TWO_PI;
    return angle;
  }

  /**
   * Convert degrees to radians
   */
  static degreesToRadians(degrees: number): number {
    return degrees * (MATH_CONSTANTS.PI / 180);
  }

  /**
   * Convert radians to degrees
   */
  static radiansToDegrees(radians: number): number {
    return radians * (180 / MATH_CONSTANTS.PI);
  }

  /**
   * Calculate exponential decay
   */
  static exponentialDecay(
    value: number,
    decayRate: number,
    time: number,
  ): number {
    return value * Math.exp(-decayRate * time);
  }

  /**
   * Calculate harmonic resonance between two frequencies
   */
  static harmonicResonance(
    freq1: number,
    freq2: number,
    strength: number = 1.0,
  ): number {
    const beatFrequency = Math.abs(freq1 - freq2);
    return Math.exp(-beatFrequency) * strength;
  }

  /**
   * Apply vortex transform to a value
   */
  static applyVortexTransform(value: number): number {
    const sequenceValue = Math.floor(value % 9);

    if (sequenceValue === 0) return VORTEX_CONSTANTS.VORTEX_CENTER;
    if (sequenceValue <= 6) {
      return VORTEX_CONSTANTS.VORTEX_SEQUENCE[sequenceValue - 1] || 1;
    }

    return VORTEX_CONSTANTS.VORTEX_SEQUENCE[sequenceValue - 4] || 1;
  }

  /**
   * Calculate vortex field strength at a point
   */
  static calculateVortexField(
    x: number,
    y: number,
    z: number,
    vortexStrength: number = 1.0,
    fieldIntensity: number = 0.5,
  ): number {
    const distance = Math.sqrt(x * x + y * y + z * z);
    const angle = Math.atan2(y, x);

    const sequenceIndex = Math.floor(angle / (MATH_CONSTANTS.PI / 3)) % 6;
    const sequenceValue = VORTEX_CONSTANTS.VORTEX_SEQUENCE[sequenceIndex] || 1;

    const baseField = vortexStrength / (1 + distance * distance);
    const vortexModulation = Math.sin(sequenceValue * angle) * fieldIntensity;

    return baseField * (1 + vortexModulation);
  }

  /**
   * Calculate toroidal flow rate
   */
  static calculateToroidalFlow(
    radius: number,
    angularVelocity: number,
    vortexModulation: number = 1.0,
  ): number {
    const circumference = MATH_CONSTANTS.TWO_PI * radius;
    return circumference * angularVelocity * vortexModulation;
  }

  /**
   * Calculate Fibonacci sequence up to n terms
   */
  static fibonacciSequence(n: number): number[] {
    if (n <= 0) return [];
    if (n === 1) return [1];
    if (n === 2) return [1, 1];

    const sequence = [1, 1];
    for (let i = 2; i < n; i++) {
      const prev1 = sequence[i - 1];
      const prev2 = sequence[i - 2];
      if (prev1 !== undefined && prev2 !== undefined) {
        sequence.push(prev1 + prev2);
      }
    }
    return sequence;
  }

  /**
   * Calculate prime squared value
   */
  static primeSquared(prime: number): number {
    return prime * prime;
  }

  /**
   * Calculate discrete multiplication (VBM style)
   */
  static discreteMultiplication(n: number): number {
    return ConstantsUtils.digitalRoot(n * n);
  }

  /**
   * Calculate electron harmonic shear identification
   */
  static electronHarmonicShearIdentification(a: number, b: number): number {
    const product = a * b;
    const digitalRoot = ConstantsUtils.digitalRoot(product);
    return digitalRoot * VORTEX_CONSTANTS.GOLDEN_RATIO;
  }

  /**
   * Calculate surface topology angle
   */
  static surfaceTopologyAngle(degrees: number = 360): number {
    const radians = this.degreesToRadians(degrees);
    return Math.sin(radians) * VORTEX_CONSTANTS.GOLDEN_RATIO;
  }

  /**
   * Generate vortex pattern
   */
  static generateVortexPattern(complexity: number = 1.0): number[] {
    const pattern: number[] = [];
    const steps = Math.floor(complexity * 100);

    for (let i = 0; i < steps; i++) {
      const angle = (i / steps) * MATH_CONSTANTS.TWO_PI;
      const sequenceIndex = Math.floor((angle / MATH_CONSTANTS.TWO_PI) * 6) % 6;
      const baseValue = VORTEX_CONSTANTS.VORTEX_SEQUENCE[sequenceIndex] || 1;

      const goldenModulation = Math.sin(angle * VORTEX_CONSTANTS.GOLDEN_RATIO);
      const patternValue = baseValue * (1 + goldenModulation * 0.1);

      pattern.push(patternValue);
    }

    return pattern;
  }

  /**
   * Calculate energy flow through vortex
   */
  static calculateEnergyFlow(
    input: number,
    vortexEfficiency: number = 0.8,
  ): number {
    const vortexTransform = this.applyVortexTransform(input);
    const energyOutput = vortexTransform * vortexEfficiency;
    return energyOutput * VORTEX_CONSTANTS.GOLDEN_RATIO;
  }

  /**
   * Calculate resonance between two consciousness levels
   */
  static calculateConsciousnessResonance(
    level1: number,
    level2: number,
    vortexStrength: number = 1.0,
  ): number {
    const normalized1 = ConstantsUtils.normalize(level1, 0, 1);
    const normalized2 = ConstantsUtils.normalize(level2, 0, 1);

    const frequency1 = normalized1 * VORTEX_CONSTANTS.GOLDEN_RATIO;
    const frequency2 = normalized2 * VORTEX_CONSTANTS.GOLDEN_RATIO;

    const beatFrequency = Math.abs(frequency1 - frequency2);
    const resonance = Math.exp(-beatFrequency) * vortexStrength;

    return ConstantsUtils.normalize(resonance, 0, 1);
  }

  /**
   * Calculate field density at a point
   */
  static calculateFieldDensity(
    x: number,
    y: number,
    z: number,
    fieldStrength: number,
    fieldRadius: number,
    patternContributions: number[] = [],
  ): number {
    const distance = this.distance3D(0, 0, 0, x, y, z);

    if (distance > fieldRadius) {
      return 0;
    }

    let density = fieldStrength * (1 - distance / fieldRadius);

    for (const contribution of patternContributions) {
      density += contribution;
    }

    return Math.max(0, density);
  }

  /**
   * Interpolate between two values
   */
  static interpolate(value1: number, value2: number, factor: number): number {
    return value1 + (value2 - value1) * factor;
  }

  /**
   * Clamp value to range
   */
  static clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  /**
   * Check if two numbers are approximately equal
   */
  static approximatelyEqual(
    a: number,
    b: number,
    epsilon: number = MATH_CONSTANTS.EPSILON,
  ): boolean {
    return Math.abs(a - b) < epsilon;
  }

  /**
   * Calculate weighted average
   */
  static weightedAverage(values: number[], weights: number[]): number {
    if (values.length !== weights.length || values.length === 0) {
      return 0;
    }

    let sum = 0;
    let weightSum = 0;

    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      const weight = weights[i];
      if (value !== undefined && weight !== undefined) {
        sum += value * weight;
        weightSum += weight;
      }
    }

    return weightSum > 0 ? sum / weightSum : 0;
  }

  /**
   * Calculate standard deviation
   */
  static standardDeviation(values: number[]): number {
    if (values.length === 0) return 0;

    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance =
      values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      values.length;

    return Math.sqrt(variance);
  }

  /**
   * Generate random number in range
   */
  static randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * Generate random integer in range
   */
  static randomIntInRange(min: number, max: number): number {
    return Math.floor(this.randomInRange(min, max + 1));
  }

  /**
   * Calculate factorial
   */
  static factorial(n: number): number {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;

    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  /**
   * Calculate combinations (n choose k)
   */
  static combinations(n: number, k: number): number {
    if (k > n || k < 0) return 0;
    if (k === 0 || k === n) return 1;

    return this.factorial(n) / (this.factorial(k) * this.factorial(n - k));
  }

  /**
   * Calculate permutations (n permute k)
   */
  static permutations(n: number, k: number): number {
    if (k > n || k < 0) return 0;

    return this.factorial(n) / this.factorial(n - k);
  }
}
