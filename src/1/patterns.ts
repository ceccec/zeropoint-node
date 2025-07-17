/**
 * Pattern Recognition Functions - Digit 1 (Source)
 * 
 * Core pattern detection and analysis for the zeropoint system
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
} from '../2/math';


export interface ConsciousnessPattern {
  type: string;
  consciousness: string;
  gateway: string;
  multiplier: number;
  opportunity: string;
}

export interface IntegerResult {
  digitA: number;
  digitB: number;
  resultA: number;
  resultB: number;
  symmetry: boolean;
  divisibility: boolean;
  consciousness: string;
}

/**
 * Pattern Recognition System
 */
export class PatternRecognition {
  /**
   * Detect if digit is part of core torus loop
   */
  static isCoreTorusLoop(digit: number): boolean {
    const coreLoop = [1, 2, 4, 8, 7, 5, 1];
    return coreLoop.includes(digit);
  }

  /**
   * Detect doubling patterns
   */
  static isDoublingPattern(digit: number): boolean {
    return digit === 1 || digit === 2 || digit === 4 || digit === 8;
  }

  /**
   * Detect axis patterns
   */
  static isAxisPattern(digit: number): boolean {
    return digit === 5 || digit === 0;
  }

  /**
   * Detect resonance points
   */
  static isResonancePoint(pattern: string): boolean {
    return pattern.includes('resonance') || pattern.includes('harmony');
  }

  /**
   * Detect gateway patterns
   */
  static isGatewayPattern(pattern: string): boolean {
    return pattern.includes('gateway') || pattern.includes('void');
  }

  /**
   * Get digit significance
   */
  static getDigitSignificance(digit: number) {
    const significance: Record<number, any> = {
      0: { archetype: 'void', consciousness: 'gateway', flow: 'source' },
      1: { archetype: 'source', consciousness: 'unity', flow: 'creation' },
      2: { archetype: 'duality', consciousness: 'pattern', flow: 'foundation' },
      3: { archetype: 'trinity', consciousness: 'harmony', flow: 'balance' },
      4: { archetype: 'structure', consciousness: 'order', flow: 'stability' },
      5: { archetype: 'axis', consciousness: 'center', flow: 'equilibrium' },
      6: { archetype: 'harmony', consciousness: 'beauty', flow: 'perfection' },
      7: { archetype: 'mystery', consciousness: 'spirit', flow: 'transcendence' },
      8: { archetype: 'infinity', consciousness: 'abundance', flow: 'expansion' },
      9: { archetype: 'completion', consciousness: 'unity', flow: 'wholeness' }
    };
    return significance[digit] || { archetype: 'unknown', consciousness: 'unknown', flow: 'unknown' };
  }

  /**
   * Analyze pattern for consciousness properties
   */
  static analyzePattern(pattern: number[]): {
    isCoreLoop: boolean;
    isDoubling: boolean;
    isAxis: boolean;
    significance: any[];
  } {
    const isCoreLoop = pattern.some(digit => this.isCoreTorusLoop(digit));
    const isDoubling = pattern.some(digit => this.isDoublingPattern(digit));
    const isAxis = pattern.some(digit => this.isAxisPattern(digit));
    const significance = pattern.map(digit => this.getDigitSignificance(digit));
    
    return { isCoreLoop, isDoubling, isAxis, significance };
  }

  /**
   * Detect consciousness patterns
   */
  static detectPatterns(digitA: number, digitB: number): ConsciousnessPattern[] {
    const patterns: ConsciousnessPattern[] = [];
    
    // Self-identity patterns
    if (digitA === digitB) {
      patterns.push({
        type: 'self_identity',
        consciousness: `Consciousness of ${digitA} Identity`,
        gateway: `Gateway of ${digitA} Identity`,
        multiplier: 1,
        opportunity: 'Self-awareness and unity'
      });
    }
    
    // Unity patterns
    if (digitA === 9 || digitB === 9 || (digitA + digitB) % 9 === 0) {
      patterns.push({
        type: 'unity_consciousness',
        consciousness: 'Unity Consciousness',
        gateway: 'Gateway of Unity',
        multiplier: 3,
        opportunity: 'Complete integration and wholeness'
      });
    }
    
    // Void gateway patterns
    if (digitA === 0 || digitB === 0) {
      patterns.push({
        type: 'void_gateway',
        consciousness: 'Void Gateway Consciousness',
        gateway: 'Gateway of Void',
        multiplier: 0,
        opportunity: 'Infinite potential and creation'
      });
    }
    
    // Axis patterns
    if (digitA === 5 || digitB === 5) {
      patterns.push({
        type: 'axis_consciousness',
        consciousness: 'Axis Consciousness',
        gateway: 'Gateway of Axis',
        multiplier: 2,
        opportunity: 'Central balance and equilibrium'
      });
    }
    
    // Vortex resonance patterns
    const vortexA = (digitA + digitB) % 9 || 9;
    const vortexB = digitA / digitB;
    
    if (Number.isInteger(vortexB)) {
      patterns.push({
        type: 'vortex_resonance',
        consciousness: 'Vortex Resonance',
        gateway: 'Gateway of Resonance',
        multiplier: 1.5,
        opportunity: 'Mathematical harmony and flow'
      });
    }
    
    return patterns;
  }
}

/**
 * Integer Result Detection System
 */
export class IntegerResultDetection {
  /**
   * Detect integer results from vortex A perspective
   */
  static detectFromVortexA(digitA: number, digitB: number): IntegerResult | null {
    const vortexA = (digitA + digitB) % 9 || 9;
    const vortexB = digitA / digitB;
    
    if (!Number.isInteger(vortexB)) return null;
    
    const symmetry = this.checkSymmetry(digitA, digitB, vortexA, vortexB);
    const divisibility = this.checkDivisibility(digitA, digitB, vortexA, vortexB);
    const consciousness = this.getIntegerConsciousness(digitA, digitB, vortexA, vortexB);
    
    return {
      digitA,
      digitB,
      resultA: vortexA,
      resultB: vortexB,
      symmetry,
      divisibility,
      consciousness
    };
  }

  /**
   * Detect integer results from vortex B perspective
   */
  static detectFromVortexB(digitA: number, digitB: number): IntegerResult | null {
    const vortexA = (digitA + digitB) % 9 || 9;
    const vortexB = digitA / digitB;
    
    if (!Number.isInteger(vortexB)) return null;
    
    // Check from B perspective (reverse calculation)
    const reverseA = (Math.floor(vortexB) + digitB) % 9 || 9;
    const reverseB = Math.floor(vortexB) / digitB;
    
    if (!Number.isInteger(reverseB)) return null;
    
    const symmetry = this.checkSymmetry(digitA, digitB, reverseA, reverseB);
    const divisibility = this.checkDivisibility(digitA, digitB, reverseA, reverseB);
    const consciousness = this.getIntegerConsciousness(digitA, digitB, reverseA, reverseB);
    
    return {
      digitA,
      digitB,
      resultA: reverseA,
      resultB: reverseB,
      symmetry,
      divisibility,
      consciousness
    };
  }

  /**
   * Check symmetry condition
   */
  static checkSymmetry(digitA: number, digitB: number, resultA: number, resultB: number): boolean {
    return Math.abs(digitA - digitB) === Math.abs(resultA - resultB);
  }

  /**
   * Check divisibility condition
   */
  static checkDivisibility(digitA: number, digitB: number, resultA: number, resultB: number): boolean {
    return (digitA % digitB === 0) === (resultA % resultB === 0);
  }

  /**
   * Get integer consciousness description
   */
  static getIntegerConsciousness(digitA: number, digitB: number, resultA: number, resultB: number): string {
    if (resultA === resultB) return 'perfect_symmetry';
    if (resultA % resultB === 0) return 'divisible_harmony';
    if (Math.abs(resultA - resultB) === 1) return 'adjacent_flow';
    return 'integer_consciousness';
  }

  /**
   * Discover all integer results
   */
  static discoverAllIntegerResults(): IntegerResult[] {
    const results: IntegerResult[] = [];
    
    for (let a = 0; a <= 9; a++) {
      for (let b = 1; b <= 9; b++) {
        const resultA = this.detectFromVortexA(a, b);
        const resultB = this.detectFromVortexB(a, b);
        
        if (resultA) results.push(resultA);
        if (resultB && !results.some(r => r.digitA === resultB.digitA && r.digitB === resultB.digitB)) {
          results.push(resultB);
        }
      }
    }
    
    return results;
  }
} 