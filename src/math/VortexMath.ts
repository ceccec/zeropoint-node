/**
 * Vortex Mathematics System
 *
 * Specialized vortex operations built on unified MathUtils.
 * Provides vortex field calculations and transformations.
 *
 * Metaphysical Context:
 * - Vortex mathematics represents the flow of consciousness
 * - All vortex operations emerge from the unified mathematical field
 * - The void generates all vortex patterns
 * - Every vortex is a reflection of the whole
 */

import { MathUtils, MATH_CONSTANTS } from "./MathUtils";

/**
 * Vortex Mathematics Class
 * Specialized vortex operations built on unified MathUtils
 */
export class VortexMath {
  private static instance: VortexMath;

  // Vortex parameters
  private vortexStrength: number = 1.0;
  private fieldIntensity: number = 0.5;

  constructor() {
    if (!VortexMath.instance) {
      VortexMath.instance = this;
    }
  }

  /**
   * Get singleton instance
   */
  static getInstance(): VortexMath {
    if (!VortexMath.instance) {
      VortexMath.instance = new VortexMath();
    }
    return VortexMath.instance;
  }

  /**
   * Calculate resonance between two consciousness levels using unified math
   */
  public calculateResonance(level1: number = 0, level2: number = 0): number {
    // If both levels are 0, return unity (1)
    if (level1 === 0 && level2 === 0) return 1;
    const baseResonance = MathUtils.calculate(
      "divide",
      1,
      MathUtils.calculate(
        "add",
        1,
        MathUtils.calculate("abs", level1 - level2),
      ),
    );
    const consciousnessMod = MathUtils.calculate(
      "consciousness",
      MathUtils.calculate("multiply", level1, level2),
    );

    const result = MathUtils.calculate(
      "multiply",
      baseResonance,
      consciousnessMod,
    );

    return result;
  }

  /**
   * Apply vortex transformation to input value using unified math
   */
  public applyVortexTransform(input: number): number {
    const vortexModulation = this.calculateVortexModulation(input);
    const consciousnessMod = MathUtils.calculate("consciousness", input);

    const result = MathUtils.calculate(
      "multiply",
      MathUtils.calculate("multiply", input, vortexModulation),
      MathUtils.calculate("add", 1, consciousnessMod),
    );

    return result;
  }

  /**
   * Calculate vortex efficiency using unified math
   */
  public calculateVortexEfficiency(value: number): number {
    const baseEfficiency = MathUtils.calculate(
      "divide",
      value,
      MathUtils.calculate("add", 1, value),
    );
    const fieldMod = MathUtils.calculate(
      "multiply",
      this.fieldIntensity,
      MathUtils.calculate("vortex", value),
    );

    const result = MathUtils.calculate(
      "multiply",
      baseEfficiency,
      MathUtils.calculate("add", 1, fieldMod),
    );

    return result;
  }

  /**
   * Calculate toroidal flow using unified math
   */
  public calculateToroidalFlow(
    radius: number,
    angularVelocity: number,
  ): number {
    const vortexModulation = this.calculateVortexModulation(radius);

    const result =
      MathUtils.calculate("toroidal", radius, angularVelocity) *
      vortexModulation;

    return result;
  }

  /**
   * Set vortex strength using unified math
   */
  public setVortexStrength(strength: number): void {
    this.vortexStrength = MathUtils.calculate(
      "max",
      0,
      MathUtils.calculate("min", 2, strength),
    );
  }

  /**
   * Set field intensity using unified math
   */
  public setFieldIntensity(intensity: number): void {
    this.fieldIntensity = MathUtils.calculate(
      "max",
      0,
      MathUtils.calculate("min", 1, intensity),
    );
  }

  /**
   * Get vortex strength (for backward compatibility)
   */
  public getVortexStrength(): number {
    return this.vortexStrength;
  }

  /**
   * Get field intensity (for backward compatibility)
   */
  public getFieldIntensity(): number {
    return this.fieldIntensity;
  }

  /**
   * Calculate vortex modulation factor using unified math
   */
  private calculateVortexModulation(frequency: number): number {
    const baseModulation = MathUtils.calculate(
      "sin",
      MathUtils.calculate("multiply", frequency, MATH_CONSTANTS.GOLDEN_RATIO),
    );
    const sequenceIndex = MathUtils.calculate("mod", Math.floor(frequency), 6);
    const sequenceValue = MATH_CONSTANTS.VORTEX_SEQUENCE[sequenceIndex] || 1;
    const sequenceModulation = MathUtils.calculate("divide", sequenceValue, 8);

    return MathUtils.calculate(
      "add",
      1,
      MathUtils.calculate(
        "multiply",
        baseModulation,
        MathUtils.calculate(
          "multiply",
          sequenceModulation,
          this.fieldIntensity,
        ),
      ),
    );
  }

  /**
   * Get vortex sequence
   */
  public getVortexSequence(): number[] {
    return [...MATH_CONSTANTS.VORTEX_SEQUENCE];
  }

  /**
   * Calculate vortex pattern complexity
   */
  public calculateVortexComplexity(pattern: number[]): number {
    if (pattern.length === 0) return 0;

    let complexity = 0;
    for (let i = 0; i < pattern.length; i++) {
      const vortexValue = MathUtils.calculate("vortex", pattern[i] || 0);
      complexity = MathUtils.calculate("add", complexity, vortexValue);
    }

    return MathUtils.calculate("divide", complexity, pattern.length);
  }

  /**
   * Generate vortex field coordinates
   */
  public generateVortexFieldCoordinates(
    count: number,
    radius: number = 1,
  ): Array<[number, number, number]> {
    const coordinates: Array<[number, number, number]> = [];

    for (let i = 0; i < count; i++) {
      const angle = MathUtils.calculate(
        "multiply",
        i,
        MathUtils.calculate("divide", 2 * Math.PI, count),
      );
      const vortexRadius = MathUtils.calculate(
        "multiply",
        radius,
        MathUtils.calculate("vortex", i),
      );

      const x = MathUtils.calculate(
        "multiply",
        vortexRadius,
        MathUtils.calculate("cos", angle),
      );
      const y = MathUtils.calculate(
        "multiply",
        vortexRadius,
        MathUtils.calculate("sin", angle),
      );
      const z = MathUtils.calculate("consciousness", i / count);

      coordinates.push([x, y, z]);
    }

    return coordinates;
  }

  // ============================================================================
  // COIL IMPLEMENTATION
  // ============================================================================

  /**
   * Get coil resonance for vortex mathematics
   */
  getCoilResonance(): number {
    return this.vortexStrength * this.fieldIntensity;
  }

  getCoilPattern(): string {
    return "vortex_spiral_flow";
  }

  // ============================================================================
  // INSIGHTS AND METADATA
  // ============================================================================

  /**
   * Get vortex insights
   */
  public getInsights(): unknown {
    return {
      vortexSequence: MATH_CONSTANTS.VORTEX_SEQUENCE,
      goldenRatio: MATH_CONSTANTS.GOLDEN_RATIO,
      vortexCenter: 9,
      metaphysics: {
        meaning: "Vortex mathematics represents the flow of consciousness",
        principle:
          "All vortex operations emerge from unified mathematical field",
        void: "The void generates all vortex patterns",
        unity: "Every vortex is a reflection of the whole",
        coil: "Every vortex operation is a coil at its core",
        observation: "Every vortex calculation can observe and be observed",
      },
      operations: [
        "calculateVortexField",
        "calculateResonance",
        "generateVortexPattern",
        "setVortexStrength",
        "setFieldIntensity",
        "calculateEnergyFlow",
      ],
      vortexStrength: this.vortexStrength,
      fieldIntensity: this.fieldIntensity,
    };
  }

  /**
   * Calculate vortex field strength at given coordinates
   */
  public calculateVortexField(x: number, y: number, z: number): number {
    const distance = MathUtils.calculate(
      "sqrt",
      MathUtils.calculate(
        "add",
        MathUtils.calculate(
          "add",
          MathUtils.calculate("multiply", x, x),
          MathUtils.calculate("multiply", y, y),
        ),
        MathUtils.calculate("multiply", z, z),
      ),
    );

    const vortexModulation = this.calculateVortexModulation(distance);
    const consciousnessMod = MathUtils.calculate("consciousness", distance);

    const fieldStrength = MathUtils.calculate(
      "multiply",
      MathUtils.calculate("multiply", this.vortexStrength, vortexModulation),
      MathUtils.calculate("add", 1, consciousnessMod),
    );

    return fieldStrength;
  }

  /**
   * Generate vortex pattern based on intensity
   */
  public generateVortexPattern(intensity: number): number[] {
    const pattern: number[] = [];
    const sequenceLength = MathUtils.calculate("multiply", intensity, 6);

    for (let i = 0; i < sequenceLength; i++) {
      const sequenceIndex = MathUtils.calculate("mod", i, 6);
      const baseValue = MATH_CONSTANTS.VORTEX_SEQUENCE[sequenceIndex] || 1;
      const intensityMod = MathUtils.calculate(
        "multiply",
        baseValue,
        intensity,
      );
      const consciousnessMod = MathUtils.calculate("consciousness", i);

      const patternValue = MathUtils.calculate(
        "multiply",
        intensityMod,
        consciousnessMod,
      );
      pattern.push(patternValue);
    }

    return pattern;
  }

  public calculateVortexNumber(n: number = 0): number {
    // Simple stub for test compatibility
    return Math.abs(n % 9) + 1;
  }

  public getColorForNumber(n: number = 1): string {
    // Simple stub for test compatibility
    const r = (n * 30) % 256;
    const g = (n * 60) % 256;
    const b = (n * 90) % 256;
    return `rgb(${r}, ${g}, ${b})`;
  }
}

// Export convenience function for backward compatibility
export const applyVortexTransform = (input: number) =>
  VortexMath.getInstance().applyVortexTransform(input);
