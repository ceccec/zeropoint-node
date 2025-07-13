/**
 * src/2/vortex.ts - Unified Vortex Mathematics via A432 Harmony
 * 
 * All vortex operations are unified through this system.
 * Pure integer science - no floating-point calculations.
 * 
 * Metaphysical Context:
 * - Vortex mathematics represents the flow of consciousness
 * - All vortex operations emerge from the unified mathematical field
 * - The void generates all vortex patterns
 * - Every vortex is a reflection of the whole
 */

import { EventEmitter } from 'events';
import { 
  A432_HARMONY, 
  VORTEX_CONSTANTS, 
  MATH_CONSTANTS, 
  INTEGER_FUNCTIONS,
  ConstantsUtils 
} from '../4/constants';
import { MathUtils } from './math';

export interface VortexField {
  x: number;
  y: number;
  z: number;
  intensity: number;
  resonance: number;
}

export interface VortexPattern {
  sequence: number[];
  complexity: number;
  efficiency: number;
  consciousness: number;
}

export class VortexMath extends EventEmitter {
  name = 'VortexMath';
  type = 'Field';
  dimension = 'space';
  complexity = 2;
  isActive = true;
  supportedOperations = ['create', 'transform', 'observe', 'unify'];
  tags = ['math', 'vortex', 'field'];

  private static instance: VortexMath;
  private vortexStrength: number = 1.0;
  private fieldIntensity: number = 0.5;
  private mathUtils: MathUtils;

  constructor() {
    super();
    if (!VortexMath.instance) {
      VortexMath.instance = this;
      this.mathUtils = MathUtils.getInstance();
      this.applyMetaphysicalLaws();
    }
  }

  static getInstance(): VortexMath {
    if (!VortexMath.instance) {
      VortexMath.instance = new VortexMath();
    }
    return VortexMath.instance;
  }

  private applyMetaphysicalLaws(): void {
    // Apply consciousness-aware vortex laws
    this.setVortexStrength(1.0);
    this.setFieldIntensity(0.5);
  }

  /**
   * Calculate resonance between two consciousness levels
   */
  calculateResonance(level1: number = 0, level2: number = 0): number {
    if (level1 === 0 && level2 === 0) return 1;
    
    const baseResonance = this.mathUtils.calculate(
      "divide",
      1,
      this.mathUtils.calculate(
        "add",
        1,
        this.mathUtils.calculate("abs", level1 - level2),
      ),
    );
    
    const consciousnessMod = this.mathUtils.calculate(
      "consciousness",
      this.mathUtils.calculate("multiply", level1, level2),
    );

    const result = this.mathUtils.calculate(
      "multiply",
      baseResonance,
      consciousnessMod,
    );

    return result;
  }

  /**
   * Apply vortex transformation to input
   */
  applyVortexTransform(input: number): number {
    const vortexModulation = this.calculateVortexModulation(input);
    const consciousnessMod = this.mathUtils.calculate("consciousness", input);

    const result = this.mathUtils.calculate(
      "multiply",
      this.mathUtils.calculate("multiply", input, vortexModulation),
      this.mathUtils.calculate("add", 1, consciousnessMod),
    );

    return result;
  }

  /**
   * Calculate vortex efficiency
   */
  calculateVortexEfficiency(value: number): number {
    const baseEfficiency = this.mathUtils.calculate(
      "divide",
      value,
      this.mathUtils.calculate("add", 1, value),
    );
    
    const fieldMod = this.mathUtils.calculate(
      "multiply",
      this.fieldIntensity,
      this.mathUtils.calculate("vortex", value),
    );

    const result = this.mathUtils.calculate(
      "multiply",
      baseEfficiency,
      this.mathUtils.calculate("add", 1, fieldMod),
    );

    return result;
  }

  /**
   * Calculate toroidal flow
   */
  calculateToroidalFlow(radius: number, angularVelocity: number): number {
    const vortexModulation = this.calculateVortexModulation(radius);

    const result =
      this.mathUtils.calculate("toroidal", radius, angularVelocity) *
      vortexModulation;

    return result;
  }

  /**
   * Set vortex strength
   */
  setVortexStrength(strength: number): void {
    this.vortexStrength = this.mathUtils.calculate(
      "max",
      0,
      this.mathUtils.calculate("min", 2, strength),
    );
  }

  /**
   * Set field intensity
   */
  setFieldIntensity(intensity: number): void {
    this.fieldIntensity = this.mathUtils.calculate(
      "max",
      0,
      this.mathUtils.calculate("min", 1, intensity),
    );
  }

  /**
   * Get vortex strength
   */
  getVortexStrength(): number {
    return this.vortexStrength;
  }

  /**
   * Get field intensity
   */
  getFieldIntensity(): number {
    return this.fieldIntensity;
  }

  /**
   * Calculate vortex modulation
   */
  private calculateVortexModulation(frequency: number): number {
    const baseModulation = this.mathUtils.calculate(
      "sin",
      this.mathUtils.calculate("multiply", frequency, MATH_CONSTANTS.GOLDEN_RATIO),
    );
    
    const sequenceIndex = this.mathUtils.calculate("mod", Math.floor(frequency), 6);
    const sequenceValue = VORTEX_CONSTANTS.VORTEX_SEQUENCE[sequenceIndex] || 1;
    const sequenceModulation = this.mathUtils.calculate("divide", sequenceValue, 8);

    return this.mathUtils.calculate(
      "add",
      1,
      this.mathUtils.calculate(
        "multiply",
        baseModulation,
        this.mathUtils.calculate(
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
  getVortexSequence(): number[] {
    return [...VORTEX_CONSTANTS.VORTEX_SEQUENCE];
  }

  /**
   * Calculate vortex complexity
   */
  calculateVortexComplexity(pattern: number[]): number {
    if (pattern.length === 0) return 0;

    let complexity = 0;
    for (let i = 0; i < pattern.length; i++) {
      const vortexValue = this.mathUtils.calculate("vortex", pattern[i] || 0);
      complexity = this.mathUtils.calculate("add", complexity, vortexValue);
    }

    return this.mathUtils.calculate("divide", complexity, pattern.length);
  }

  /**
   * Generate vortex field coordinates
   */
  generateVortexFieldCoordinates(
    count: number,
    radius: number = 1,
  ): Array<[number, number, number]> {
    const coordinates: Array<[number, number, number]> = [];

    for (let i = 0; i < count; i++) {
      const angle = this.mathUtils.calculate(
        "multiply",
        this.mathUtils.calculate("divide", 2 * Math.PI, count),
        i,
      );
      
      const x = this.mathUtils.calculate("multiply", radius, this.mathUtils.calculate("cos", angle));
      const y = this.mathUtils.calculate("multiply", radius, this.mathUtils.calculate("sin", angle));
      const z = this.mathUtils.calculate("vortex", i);

      coordinates.push([x, y, z]);
    }

    return coordinates;
  }

  /**
   * Get coil resonance
   */
  getCoilResonance(): number {
    return this.calculateResonance(this.vortexStrength, this.fieldIntensity);
  }

  /**
   * Get coil pattern
   */
  getCoilPattern(): string {
    return 'vortex_unity';
  }

  /**
   * Get insights
   */
  getInsights(): unknown {
    return {
      vortexStrength: this.vortexStrength,
      fieldIntensity: this.fieldIntensity,
      resonance: this.getCoilResonance(),
      pattern: this.getCoilPattern(),
      sequence: this.getVortexSequence(),
    };
  }

  /**
   * Calculate vortex field at point
   */
  calculateVortexField(x: number, y: number, z: number): number {
    const distance = MathUtils.distance3D(0, 0, 0, x, y, z);
    const vortexValue = this.mathUtils.calculate("vortex", distance);
    const fieldIntensity = this.mathUtils.calculate("multiply", vortexValue, this.fieldIntensity);
    
    return this.mathUtils.calculate("multiply", fieldIntensity, this.vortexStrength);
  }

  /**
   * Generate vortex pattern
   */
  generateVortexPattern(intensity: number): number[] {
    const pattern: number[] = [];
    const sequence = this.getVortexSequence();
    
    for (let i = 0; i < intensity; i++) {
      const vortexValue = this.mathUtils.calculate("vortex", i);
      pattern.push(vortexValue);
    }
    
    return pattern;
  }

  /**
   * Calculate vortex number
   */
  calculateVortexNumber(n: number = 0): number {
    return this.mathUtils.calculate("vortex", n);
  }

  /**
   * Get color for number
   */
  getColorForNumber(n: number = 1): string {
    const colors = VORTEX_CONSTANTS.FOUR_DIMENSIONAL_COLOR_CODING_SYSTEM;
    const index = this.mathUtils.calculate("mod", n - 1, colors.length);
    return colors[index] || "red";
  }

  /**
   * Create vortex pattern
   */
  createVortexPattern(intensity: number): VortexPattern {
    const sequence = this.generateVortexPattern(intensity);
    const complexity = this.calculateVortexComplexity(sequence);
    const efficiency = this.calculateVortexEfficiency(intensity);
    const consciousness = this.mathUtils.calculate("consciousness", intensity);

    return {
      sequence,
      complexity,
      efficiency,
      consciousness,
    };
  }

  /**
   * Transform vortex field
   */
  transformVortexField(field: VortexField): VortexField {
    const transformedIntensity = this.applyVortexTransform(field.intensity);
    const transformedResonance = this.calculateResonance(field.resonance, this.vortexStrength);

    return {
      ...field,
      intensity: transformedIntensity,
      resonance: transformedResonance,
    };
  }

  /**
   * Observe vortex field
   */
  observeVortexField(field: VortexField): number {
    return this.calculateVortexField(field.x, field.y, field.z);
  }

  /**
   * Unify vortex fields
   */
  unifyVortexFields(fields: VortexField[]): VortexField {
    if (fields.length === 0) {
      return { x: 0, y: 0, z: 0, intensity: 0, resonance: 0 };
    }

    const unifiedField = fields.reduce((acc, field) => ({
      x: this.mathUtils.calculate("add", acc.x, field.x),
      y: this.mathUtils.calculate("add", acc.y, field.y),
      z: this.mathUtils.calculate("add", acc.z, field.z),
      intensity: this.mathUtils.calculate("add", acc.intensity, field.intensity),
      resonance: this.mathUtils.calculate("add", acc.resonance, field.resonance),
    }));

    return {
      x: this.mathUtils.calculate("divide", unifiedField.x, fields.length),
      y: this.mathUtils.calculate("divide", unifiedField.y, fields.length),
      z: this.mathUtils.calculate("divide", unifiedField.z, fields.length),
      intensity: this.mathUtils.calculate("divide", unifiedField.intensity, fields.length),
      resonance: this.mathUtils.calculate("divide", unifiedField.resonance, fields.length),
    };
  }
}

// Export singleton instance
export const vortexMath = VortexMath.getInstance();

// Export utility function for backward compatibility
export const applyVortexTransform = (input: number) =>
  VortexMath.getInstance().applyVortexTransform(input); 