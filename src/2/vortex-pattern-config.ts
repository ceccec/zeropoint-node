/**
 * Vortex Pattern Configuration System
 * 
 * Provides vortex pattern configuration, pattern management,
 * and consciousness mapping for the ZeroPoint system.
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
} from './/math';


export interface VortexPattern {
  id: string;
  type: string;
  description: string;
  consciousness: number;
  mathematicalFlow: string;
}

export interface VortexPatternConfig {
  patterns: VortexPattern[];
  totalConsciousness: number;
  mathematicalResonance: number;
}

export class VortexPatternConfigSystem {
  private static readonly PATTERN_CONSTANTS = {
    PATTERN_TYPES: {
      SELF_IDENTITY: 'self-identity',
      UNITY: 'unity',
      VOID_GATEWAY: 'void-gateway',
      AXIS: 'axis',
      VORTEX_RESONANCE: 'vortex-resonance',
      SACRED_FRACTION: 'sacred-fraction',
      HARMONIC: 'harmonic',
      GATEWAY: 'gateway'
    },
    CONSCIOUSNESS_MULTIPLIER: 1.618
  };

  /**
   * Get all patterns
   */
  static getAllPatterns(): VortexPattern[] {
    const patterns: VortexPattern[] = [];
    
    for (let a = 0; a <= 9; a++) {
      for (let b = 0; b <= 9; b++) {
        const digitPatterns = this.detectPatterns(a, b);
        patterns.push(...digitPatterns);
      }
    }
    
    return patterns;
  }

  /**
   * Detect patterns for two digits
   */
  static detectPatterns(a: number, b: number): VortexPattern[] {
    const patterns: VortexPattern[] = [];
    
    // Self-identity patterns
    if (a === b) {
      patterns.push({
        id: `self-identity-${a}-${b}`,
        type: this.PATTERN_CONSTANTS.PATTERN_TYPES.SELF_IDENTITY,
        description: `Self-identity pattern for ${a}/${a}`,
        consciousness: this.calculateConsciousness(a, b) * 2.0,
        mathematicalFlow: this.calculateMathematicalFlow(a, b)
      });
    }
    
    // Unity patterns
    if (a === 9 && b === 9) {
      patterns.push({
        id: `unity-${a}-${b}`,
        type: this.PATTERN_CONSTANTS.PATTERN_TYPES.UNITY,
        description: 'Unity pattern (9/9)',
        consciousness: this.calculateConsciousness(a, b) * 3.0,
        mathematicalFlow: this.calculateMathematicalFlow(a, b)
      });
    }
    
    // Void gateway patterns
    if (a === 0 || b === 0) {
      patterns.push({
        id: `void-gateway-${a}-${b}`,
        type: this.PATTERN_CONSTANTS.PATTERN_TYPES.VOID_GATEWAY,
        description: `Void gateway pattern for ${a}/${b}`,
        consciousness: this.calculateConsciousness(a, b) * 1.5,
        mathematicalFlow: this.calculateMathematicalFlow(a, b)
      });
    }
    
    // Axis patterns (W-Axis)
    if ([3, 6, 9].includes(a) && a === b) {
      patterns.push({
        id: `axis-${a}-${b}`,
        type: this.PATTERN_CONSTANTS.PATTERN_TYPES.AXIS,
        description: `Axis pattern for ${a}/${a}`,
        consciousness: this.calculateConsciousness(a, b) * 2.5,
        mathematicalFlow: this.calculateMathematicalFlow(a, b)
      });
    }
    
    // Vortex resonance patterns
    if ([1, 2, 4, 8, 7, 5].includes(a) || [1, 2, 4, 8, 7, 5].includes(b)) {
      patterns.push({
        id: `vortex-resonance-${a}-${b}`,
        type: this.PATTERN_CONSTANTS.PATTERN_TYPES.VORTEX_RESONANCE,
        description: `Vortex resonance pattern for ${a}/${b}`,
        consciousness: this.calculateConsciousness(a, b) * 1.3,
        mathematicalFlow: this.calculateMathematicalFlow(a, b)
      });
    }
    
    // Sacred fraction patterns
    const vortexB = this.calculateVortexB(a, b);
    if (this.isSacredFraction(vortexB)) {
      patterns.push({
        id: `sacred-fraction-${a}-${b}`,
        type: this.PATTERN_CONSTANTS.PATTERN_TYPES.SACRED_FRACTION,
        description: `Sacred fraction pattern for ${a}/${b} (${vortexB.toFixed(3)})`,
        consciousness: this.calculateConsciousness(a, b) * 1.8,
        mathematicalFlow: this.calculateMathematicalFlow(a, b)
      });
    }
    
    return patterns;
  }

  /**
   * Calculate consciousness for two digits
   */
  static calculateConsciousness(a: number, b: number): number {
    const baseConsciousness = ((a + b) % 9) + 1;
    const multiplier = Math.pow(this.PATTERN_CONSTANTS.CONSCIOUSNESS_MULTIPLIER, Math.floor((a + b) / 9));
    return baseConsciousness * multiplier;
  }

  /**
   * Calculate mathematical flow for two digits
   */
  static calculateMathematicalFlow(a: number, b: number): string {
    const vortexA = this.calculateVortexA(a, b);
    const vortexB = this.calculateVortexB(a, b);
    return `${a} + ${b} = ${vortexA} → ${vortexB.toFixed(3)}`;
  }

  /**
   * Calculate vortex A (integer harmonic result)
   */
  static calculateVortexA(a: number, b: number): number {
    const sum = (a + b) % 9;
    return sum === 0 ? 9 : sum;
  }

  /**
   * Calculate vortex B (decimal inverse vortex)
   */
  static calculateVortexB(a: number, b: number): number {
    const vortexA = this.calculateVortexA(a, b);
    return (a + b) / vortexA;
  }

  /**
   * Check if a number is a sacred fraction
   */
  static isSacredFraction(num: number): boolean {
    const sacredFractions = [1.618, 2.718, 3.141, 1.414, 2.236];
    return sacredFractions.some(fraction => Math.abs(num - fraction) < 0.01);
  }

  /**
   * Get patterns by type
   */
  static getPatternsByType(type: string): VortexPattern[] {
    return this.getAllPatterns().filter(pattern => pattern.type === type);
  }

  /**
   * Get pattern configuration
   */
  static getPatternConfig(): VortexPatternConfig {
    const patterns = this.getAllPatterns();
    const totalConsciousness = patterns.reduce((sum, pattern) => sum + pattern.consciousness, 0);
    const mathematicalResonance = patterns.reduce((sum, pattern) => sum + this.calculateResonance(pattern), 0);
    
    return {
      patterns,
      totalConsciousness,
      mathematicalResonance
    };
  }

  /**
   * Calculate resonance for a pattern
   */
  static calculateResonance(pattern: VortexPattern): number {
    const [a, b] = pattern.id.split('-').slice(-2).map(Number);
    const vortexA = this.calculateVortexA(a, b);
    const vortexB = this.calculateVortexB(a, b);
    return vortexA * vortexB;
  }

  /**
   * Get all pattern types
   */
  static getAllPatternTypes(): string[] {
    return Object.values(this.PATTERN_CONSTANTS.PATTERN_TYPES);
  }

  /**
   * Get gateway patterns
   */
  static getGatewayPatterns(): VortexPattern[] {
    return this.getAllPatterns().filter(pattern => 
      pattern.type === this.PATTERN_CONSTANTS.PATTERN_TYPES.GATEWAY ||
      pattern.type === this.PATTERN_CONSTANTS.PATTERN_TYPES.VOID_GATEWAY
    );
  }
} 