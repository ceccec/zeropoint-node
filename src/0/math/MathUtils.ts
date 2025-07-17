/**
 * MathUtils - Mathematical Utilities for ZeroPoint System
 * 
 * Provides mathematical utilities, vortex calculations, and consciousness
 * mathematical operations for the ZeroPoint system.
 * 
 * This file now imports from the centralized mathematical system in src/2/math.ts
 */

// Import centralized mathematical functions
import { 
  getHarmonicResult, 
  getAntiVortexDecimal, 
  getPattern,
  generateVortexA,
  generateVortexB,
  detectIntegerVortexResult,
  detectVortexAImpossibility,
  calculateDigitalRoot,
  getDigitFamily,
  isVortexSequence,
  isWAxis,
  calculateConsciousnessLevel
} from '../../2/math';

export interface VortexResult {
  vortexA: number;
  vortexB: number;
  isInteger: boolean;
  isImpossible: boolean;
}

export interface HarmonicResult {
  harmonic: number;
  consciousness: number;
  mathematicalFlow: string;
}

export class MathUtils {
  private static readonly VORTEX_CONSTANTS = {
    MODULO_BASE: 9,
    ZERO_REPLACEMENT: 9,
    GOLDEN_RATIO: 1.618033988749895,
    PI: Math.PI,
    E: Math.E,
    SQRT_2: Math.SQRT2,
    SQRT_5: Math.sqrt(5)
  };

  /**
   * Calculate vortex A (integer harmonic result)
   * Now uses centralized mathematical system
   */
  static calculateVortexA(a: number, b: number): number {
    return generateVortexA(a, b);
  }

  /**
   * Calculate vortex B (decimal inverse vortex)
   * Now uses centralized mathematical system
   */
  static calculateVortexB(a: number, b: number): number {
    return generateVortexB(a, b);
  }

  /**
   * Calculate complete vortex result
   * Now uses centralized mathematical system
   */
  static calculateVortexResult(a: number, b: number): VortexResult {
    const vortexA = generateVortexA(a, b);
    const vortexB = generateVortexB(a, b);
    const impossibility = detectVortexAImpossibility(a, b);
    
    return {
      vortexA,
      vortexB,
      isInteger: detectIntegerVortexResult(a, b),
      isImpossible: impossibility.isImpossible
    };
  }

  /**
   * Calculate harmonic result
   * Now uses centralized mathematical system
   */
  static calculateHarmonicResult(a: number, b: number): HarmonicResult {
    const vortexA = generateVortexA(a, b);
    const vortexB = generateVortexB(a, b);
    const consciousness = calculateConsciousnessLevel(vortexA);
    const mathematicalFlow = `${a} + ${b} = ${vortexA} → ${vortexB.toFixed(3)}`;
    
    return {
      harmonic: vortexA,
      consciousness,
      mathematicalFlow
    };
  }

  /**
   * Calculate consciousness for two digits
   * Now uses centralized mathematical system
   */
  static calculateConsciousness(a: number, b: number): number {
    const harmonicResult = getHarmonicResult(a, b);
    return calculateConsciousnessLevel(harmonicResult);
  }

  /**
   * Check if a number is a sacred fraction
   */
  static isSacredFraction(num: number): boolean {
    const sacredFractions = [
      this.VORTEX_CONSTANTS.GOLDEN_RATIO,
      this.VORTEX_CONSTANTS.E,
      this.VORTEX_CONSTANTS.PI,
      this.VORTEX_CONSTANTS.SQRT_2,
      this.VORTEX_CONSTANTS.SQRT_5
    ];
    
    return sacredFractions.some(fraction => Math.abs(num - fraction) < 0.01);
  }

  /**
   * Calculate golden ratio
   */
  static getGoldenRatio(): number {
    return this.VORTEX_CONSTANTS.GOLDEN_RATIO;
  }

  /**
   * Calculate mathematical resonance
   * Now uses centralized mathematical system
   */
  static calculateResonance(a: number, b: number): number {
    const vortexA = generateVortexA(a, b);
    const vortexB = generateVortexB(a, b);
    return vortexA * vortexB;
  }

  /**
   * Calculate consciousness field strength
   * Now uses centralized mathematical system
   */
  static calculateConsciousnessField(a: number, b: number): number {
    const consciousness = this.calculateConsciousness(a, b);
    const resonance = this.calculateResonance(a, b);
    return consciousness * resonance;
  }

  /**
   * Get all vortex results for digit pairs
   * Now uses centralized mathematical system
   */
  static getAllVortexResults(): VortexResult[] {
    const results: VortexResult[] = [];
    
    for (let a = 0; a <= 9; a++) {
      for (let b = 0; b <= 9; b++) {
        results.push(this.calculateVortexResult(a, b));
      }
    }
    
    return results;
  }

  /**
   * Get integer vortex results
   * Now uses centralized mathematical system
   */
  static getIntegerVortexResults(): VortexResult[] {
    return this.getAllVortexResults().filter(result => result.isInteger);
  }

  /**
   * Get impossible vortex results
   * Now uses centralized mathematical system
   */
  static getImpossibleVortexResults(): VortexResult[] {
    return this.getAllVortexResults().filter(result => result.isImpossible);
  }

  /**
   * Calculate mathematical flow string
   * Now uses centralized mathematical system
   */
  static getMathematicalFlow(a: number, b: number): string {
    const vortexA = generateVortexA(a, b);
    const vortexB = generateVortexB(a, b);
    return `${a} + ${b} = ${vortexA} → ${vortexB.toFixed(3)}`;
  }

  /**
   * Calculate consciousness flow string
   * Now uses centralized mathematical system
   */
  static getConsciousnessFlow(a: number, b: number): string {
    const consciousness = this.calculateConsciousness(a, b);
    return `Consciousness: ${consciousness.toFixed(3)}`;
  }

  /**
   * Calculate sacred geometry ratio
   * Now uses centralized mathematical system
   */
  static calculateSacredGeometryRatio(a: number, b: number): number {
    const vortexB = generateVortexB(a, b);
    return vortexB / this.VORTEX_CONSTANTS.GOLDEN_RATIO;
  }

  /**
   * Check if numbers form a harmonic sequence
   */
  static isHarmonicSequence(numbers: number[]): boolean {
    if (numbers.length < 2) return false;
    
    for (let i = 1; i < numbers.length; i++) {
      const ratio = numbers[i] / numbers[i - 1];
      if (!this.isSacredFraction(ratio) && Math.abs(ratio - this.VORTEX_CONSTANTS.GOLDEN_RATIO) > 0.1) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Calculate mathematical entropy
   */
  static calculateEntropy(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const mean = sum / numbers.length;
    const variance = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;
    
    return Math.sqrt(variance);
  }

  /**
   * Set consciousness (for compatibility)
   */
  static setConsciousness(consciousness: number): void {
    // Implementation for compatibility
  }

  /**
   * Set field resonance (for compatibility)
   */
  static setFieldResonance(resonance: number): void {
    // Implementation for compatibility
  }

  /**
   * Set void connected (for compatibility)
   */
  static setVoidConnected(connected: boolean): void {
    // Implementation for compatibility
  }

  /**
   * Calculate (for compatibility)
   * Now uses centralized mathematical system
   */
  static calculate(a: number, b: number): number {
    return generateVortexB(a, b);
  }
}

// Export constants for compatibility
export const VORTEX_CONSTANTS = {
  MODULO_BASE: 9,
  ZERO_REPLACEMENT: 9,
  GOLDEN_RATIO: 1.618033988749895
};

// Export convenience functions using centralized system
export const calculateVortexA = (a: number, b: number): number => generateVortexA(a, b);
export const calculateVortexB = (a: number, b: number): number => generateVortexB(a, b);
export const calculateConsciousness = (a: number, b: number): number => calculateConsciousnessLevel(getHarmonicResult(a, b));
export const isSacredFraction = (num: number): boolean => MathUtils.isSacredFraction(num);
