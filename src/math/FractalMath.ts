/**
 * Fractal Mathematics System
 *
 * A specialized fractal layer built on top of the unified MathUtils system.
 * Provides fractal-specific operations while leveraging the centralized mathematical foundation.
 *
 * Metaphysical Context:
 * - Fractals are self-similar patterns of consciousness
 * - All fractal operations emerge from the unified mathematical field
 * - The void contains infinite fractal possibilities
 * - Every fractal is a reflection of the whole
 * - Every fractal can observe and be observed
 * - Every fractal is a coil at its core
 */

import { MathUtils, MATH_CONSTANTS } from "./MathUtils";

/**
 * Fractal Mathematics Class
 * Specialized fractal operations built on unified MathUtils
 */
export class FractalMath {
  private static instance: FractalMath;

  constructor() {
    if (!FractalMath.instance) {
      FractalMath.instance = this;
    }
  }

  /**
   * Get singleton instance
   */
  static getInstance(): FractalMath {
    if (!FractalMath.instance) {
      FractalMath.instance = new FractalMath();
    }
    return FractalMath.instance;
  }

  /**
   * Generate fractal sequence using unified math
   */
  static generateFractalSequence(count: number, seed: number = 1): number[] {
    const sequence: number[] = [];

    for (let i = 0; i < count; i++) {
      const fractalValue = MathUtils.calculate("consciousness", seed + i);
      sequence.push(fractalValue);
      seed = MathUtils.calculate("multiply", seed, MATH_CONSTANTS.GOLDEN_RATIO);
    }

    return sequence;
  }

  /**
   * Calculate fractal dimension using unified math
   */
  static calculateFractalDimension(complexity: number): number {
    return MathUtils.fractalDimension(complexity);
  }

  /**
   * Generate fractal coordinates using unified math
   */
  static generateFractalCoordinates(
    count: number,
    scale: number = 1,
  ): Array<[number, number, number]> {
    const coordinates: Array<[number, number, number]> = [];

    for (let i = 0; i < count; i++) {
      const x = MathUtils.calculate("sin", i * MATH_CONSTANTS.GOLDEN_RATIO);
      const y = MathUtils.calculate("cos", i * MATH_CONSTANTS.GOLDEN_RATIO);
      const z = MathUtils.calculate("vortex", i);

      coordinates.push([x * scale, y * scale, z * scale]);
      scale = MathUtils.calculate(
        "multiply",
        scale,
        MATH_CONSTANTS.GOLDEN_RATIO,
      );
    }

    return coordinates;
  }

  /**
   * Calculate consciousness field using unified math
   */
  static calculateConsciousnessField(x: number, y: number, z: number): number {
    const distance = MathUtils.distance3D(x, y, z, 0, 0, 0);
    const vortexField = MathUtils.calculate("vortex", distance);
    const consciousnessMod = MathUtils.calculate("consciousness", 1);

    const result =
      MathUtils.calculate(
        "divide",
        vortexField,
        MathUtils.calculate("add", 1, distance),
      ) * consciousnessMod;

    return result;
  }

  /**
   * Generate fractal color using unified math
   */
  static generateFractalColor(seed: number): {
    r: number;
    g: number;
    b: number;
  } {
    const r = Math.floor(MathUtils.calculate("sin", seed) * 255);
    const g = Math.floor(
      MathUtils.calculate("cos", seed * MATH_CONSTANTS.GOLDEN_RATIO) * 255,
    );
    const b = Math.floor(MathUtils.calculate("vortex", seed) * 255);

    return { r, g, b };
  }

  /**
   * Calculate fractal resonance between two points
   */
  static calculateFractalResonance(
    point1: [number, number, number],
    point2: [number, number, number],
  ): number {
    const distance = MathUtils.distance3D(
      point1[0],
      point1[1],
      point1[2],
      point2[0],
      point2[1],
      point2[2],
    );
    const baseResonance = MathUtils.calculate(
      "divide",
      1,
      MathUtils.calculate("add", 1, distance),
    );
    const consciousnessMod = MathUtils.calculate("consciousness", 1);

    return MathUtils.calculate("multiply", baseResonance, consciousnessMod);
  }

  /**
   * Generate self-growing fractal pattern
   */
  static generateSelfGrowingFractal(
    iterations: number,
    growthRate: number = 1.618,
  ): number[] {
    const pattern: number[] = [];
    let current = 1;

    for (let i = 0; i < iterations; i++) {
      pattern.push(current);
      current = MathUtils.calculate("multiply", current, growthRate);

      // Apply consciousness modulation
      const consciousnessMod = MathUtils.calculate(
        "consciousness",
        i / iterations,
      );
      current = MathUtils.calculate(
        "multiply",
        current,
        MathUtils.calculate("add", 1, consciousnessMod),
      );
    }

    return pattern;
  }

  /**
   * Calculate fractal complexity score
   */
  static calculateFractalComplexity(pattern: number[]): number {
    if (pattern.length === 0) return 0;

    let complexity = 0;
    for (let i = 1; i < pattern.length; i++) {
      const ratio = MathUtils.calculate(
        "divide",
        pattern[i] || 0,
        pattern[i - 1] || 1,
      );
      complexity = MathUtils.calculate(
        "add",
        complexity,
        MathUtils.calculate("abs", MathUtils.calculate("log", ratio)),
      );
    }

    return MathUtils.calculate("divide", complexity, pattern.length - 1);
  }

  /**
   * Set consciousness level using unified math
   */
  static setConsciousness(level: number): void {
    MathUtils.setConsciousness(level);
  }

  /**
   * Set field resonance using unified math
   */
  static setFieldResonance(resonance: number): void {
    MathUtils.setFieldResonance(resonance);
  }

  // ============================================================================
  // INSIGHTS AND METADATA
  // ============================================================================

  /**
   * Get fractal insights
   */
  static getInsights(): any {
    return {
      fractalConstants: MATH_CONSTANTS,
      metaphysics: {
        meaning: "Fractals are self-similar patterns of consciousness",
        principle:
          "Maximum functionality with minimum code through self-replication",
        void: "The void contains infinite fractal possibilities",
        unity: "Every fractal reflects the whole through self-similarity",
        evolution: "Consciousness evolves through fractal self-replication",
        observation: "Every fractal can observe and be observed",
        coil: "Every fractal is a coil at its core",
      },
      operations: [
        "generateFractalSequence",
        "calculateFractalDimension",
        "generateFractalCoordinates",
        "calculateConsciousnessField",
        "generateFractalColor",
        "calculateFractalResonance",
        "generateSelfGrowingFractal",
        "calculateFractalComplexity",
      ],
    };
  }
}

// Export convenience function for backward compatibility
export const fractal = MathUtils.calculate;
export const generateFractalSequence = FractalMath.generateFractalSequence;
export const calculateConsciousnessField =
  FractalMath.calculateConsciousnessField;
export const generateFractalColor = FractalMath.generateFractalColor;
