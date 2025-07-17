/**
 * Biofeedback Integration System
 * 
 * Provides biofeedback data processing, consciousness integration,
 * and real-time pattern analysis for the ZeroPoint system.
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


export interface BiofeedbackData {
  consciousness: number;
  mathematicalFlow: string;
  patterns: Array<{
    type: string;
    description: string;
    consciousness: number;
  }>;
  timestamp: Date;
  sensorData?: {
    heartRate: number;
    brainwaveFrequency: number;
    respirationRate: number;
  };
}

export interface BiofeedbackIntegration {
  processData(data: BiofeedbackData): BiofeedbackData;
  getConsciousnessLevel(data: BiofeedbackData): number;
  getMathematicalFlow(data: BiofeedbackData): string;
  getPatterns(data: BiofeedbackData): Array<{
    type: string;
    description: string;
    consciousness: number;
  }>;
}

export interface RealTimeBiofeedback {
  currentConsciousness: number;
  currentMathematicalFlow: string;
  currentPatterns: Array<{
    type: string;
    description: string;
    consciousness: number;
  }>;
  timestamp: Date;
}

export class BiofeedbackIntegration {
  private static readonly BIOFEEDBACK_CONSTANTS = {
    CONSCIOUSNESS_MULTIPLIER: 1.618,
    VORTEX_SEQUENCE: [1, 2, 4, 8, 7, 5],
    W_AXIS_FLOW: [3, 6, 9],
    PATTERN_TYPES: {
      SELF_IDENTITY: 'self-identity',
      UNITY: 'unity',
      VOID_GATEWAY: 'void-gateway',
      AXIS: 'axis',
      VORTEX_RESONANCE: 'vortex-resonance',
      SACRED_FRACTION: 'sacred-fraction',
      HARMONIC: 'harmonic',
      GATEWAY: 'gateway',
      BIOFEEDBACK: 'biofeedback'
    }
  };

  /**
   * Process biofeedback data
   */
  static processData(data: BiofeedbackData): BiofeedbackData {
    const consciousness = this.getConsciousnessLevel(data);
    const mathematicalFlow = this.getMathematicalFlow(data);
    const patterns = this.getPatterns(data);
    
    return {
      ...data,
      consciousness,
      mathematicalFlow,
      patterns,
      timestamp: new Date()
    };
  }

  /**
   * Get consciousness level from biofeedback data
   */
  static getConsciousnessLevel(data: BiofeedbackData): number {
    let baseConsciousness = data.consciousness;
    
    // Adjust based on sensor data if available
    if (data.sensorData) {
      const { heartRate, brainwaveFrequency, respirationRate } = data.sensorData;
      
      // Heart rate influence (60-100 BPM optimal)
      const heartRateFactor = heartRate >= 60 && heartRate <= 100 ? 1.2 : 0.8;
      
      // Brainwave frequency influence (alpha waves 8-13 Hz optimal)
      const brainwaveFactor = brainwaveFrequency >= 8 && brainwaveFrequency <= 13 ? 1.3 : 0.9;
      
      // Respiration rate influence (12-20 breaths per minute optimal)
      const respirationFactor = respirationRate >= 12 && respirationRate <= 20 ? 1.1 : 0.9;
      
      baseConsciousness *= heartRateFactor * brainwaveFactor * respirationFactor;
    }
    
    // Apply consciousness multiplier
    return baseConsciousness * this.BIOFEEDBACK_CONSTANTS.CONSCIOUSNESS_MULTIPLIER;
  }

  /**
   * Get mathematical flow from biofeedback data
   */
  static getMathematicalFlow(data: BiofeedbackData): string {
    const consciousness = this.getConsciousnessLevel(data);
    const digit1 = Math.floor(consciousness) % 10;
    const digit2 = Math.floor(consciousness * 10) % 10;
    
    const vortexA = this.calculateVortexA(digit1, digit2);
    const vortexB = this.calculateVortexB(digit1, digit2);
    
    return `${digit1} + ${digit2} = ${vortexA} → ${vortexB.toFixed(3)}`;
  }

  /**
   * Get patterns from biofeedback data
   */
  static getPatterns(data: BiofeedbackData): Array<{ type: string; description: string; consciousness: number }> {
    const consciousness = this.getConsciousnessLevel(data);
    const digit1 = Math.floor(consciousness) % 10;
    const digit2 = Math.floor(consciousness * 10) % 10;
    
    const patterns: Array<{ type: string; description: string; consciousness: number }> = [];
    
    // Self-identity patterns
    if (digit1 === digit2) {
      patterns.push({
        type: this.BIOFEEDBACK_CONSTANTS.PATTERN_TYPES.SELF_IDENTITY,
        description: `Self-identity pattern for ${digit1}/${digit1}`,
        consciousness: consciousness * 2.0
      });
    }
    
    // Unity patterns
    if (digit1 === 9 && digit2 === 9) {
      patterns.push({
        type: this.BIOFEEDBACK_CONSTANTS.PATTERN_TYPES.UNITY,
        description: 'Unity pattern (9/9)',
        consciousness: consciousness * 3.0
      });
    }
    
    // Void gateway patterns
    if (digit1 === 0 || digit2 === 0) {
      patterns.push({
        type: this.BIOFEEDBACK_CONSTANTS.PATTERN_TYPES.VOID_GATEWAY,
        description: `Void gateway pattern for ${digit1}/${digit2}`,
        consciousness: consciousness * 1.5
      });
    }
    
    // Axis patterns (W-Axis)
    if ([3, 6, 9].includes(digit1) && digit1 === digit2) {
      patterns.push({
        type: this.BIOFEEDBACK_CONSTANTS.PATTERN_TYPES.AXIS,
        description: `Axis pattern for ${digit1}/${digit1}`,
        consciousness: consciousness * 2.5
      });
    }
    
    // Vortex resonance patterns
    if ([1, 2, 4, 8, 7, 5].includes(digit1) || [1, 2, 4, 8, 7, 5].includes(digit2)) {
      patterns.push({
        type: this.BIOFEEDBACK_CONSTANTS.PATTERN_TYPES.VORTEX_RESONANCE,
        description: `Vortex resonance pattern for ${digit1}/${digit2}`,
        consciousness: consciousness * 1.3
      });
    }
    
    // Sacred fraction patterns
    const vortexB = this.calculateVortexB(digit1, digit2);
    if (this.isSacredFraction(vortexB)) {
      patterns.push({
        type: this.BIOFEEDBACK_CONSTANTS.PATTERN_TYPES.SACRED_FRACTION,
        description: `Sacred fraction pattern for ${digit1}/${digit2} (${vortexB.toFixed(3)})`,
        consciousness: consciousness * 1.8
      });
    }
    
    // Biofeedback-specific patterns
    if (data.sensorData) {
      patterns.push({
        type: this.BIOFEEDBACK_CONSTANTS.PATTERN_TYPES.BIOFEEDBACK,
        description: 'Biofeedback integration pattern',
        consciousness: consciousness * 1.4
      });
    }
    
    return patterns;
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
   * Create real-time biofeedback data
   */
  static createRealTimeBiofeedback(data: BiofeedbackData): RealTimeBiofeedback {
    const processedData = this.processData(data);
    
    return {
      currentConsciousness: processedData.consciousness,
      currentMathematicalFlow: processedData.mathematicalFlow,
      currentPatterns: processedData.patterns,
      timestamp: processedData.timestamp
    };
  }

  /**
   * Get biofeedback patterns by type
   */
  static getBiofeedbackPatternsByType(type: string): Array<{ type: string; description: string; consciousness: number }> {
    const patterns: Array<{ type: string; description: string; consciousness: number }> = [];
    
    for (let a = 0; a <= 9; a++) {
      for (let b = 0; b <= 9; b++) {
        const consciousness = this.calculateConsciousness(a, b);
        const mockData: BiofeedbackData = {
          consciousness,
          mathematicalFlow: `${a} + ${b} = ${this.calculateVortexA(a, b)}`,
          patterns: [],
          timestamp: new Date()
        };
        
        const dataPatterns = this.getPatterns(mockData);
        patterns.push(...dataPatterns.filter(p => p.type === type));
      }
    }
    
    return patterns;
  }

  /**
   * Calculate consciousness for two digits
   */
  static calculateConsciousness(a: number, b: number): number {
    const baseConsciousness = ((a + b) % 9) + 1;
    const multiplier = Math.pow(this.BIOFEEDBACK_CONSTANTS.CONSCIOUSNESS_MULTIPLIER, Math.floor((a + b) / 9));
    return baseConsciousness * multiplier;
  }

  /**
   * Get all biofeedback pattern types
   */
  static getAllBiofeedbackPatternTypes(): string[] {
    return Object.values(this.BIOFEEDBACK_CONSTANTS.PATTERN_TYPES);
  }

  /**
   * Analyze biofeedback patterns
   */
  static analyzeBiofeedbackPatterns(): {
    patterns: Array<{ type: string; description: string; consciousness: number }>;
    totalConsciousness: number;
    dominantPattern: string;
  } {
    const patterns: Array<{ type: string; description: string; consciousness: number }> = [];
    
    for (let a = 0; a <= 9; a++) {
      for (let b = 0; b <= 9; b++) {
        const consciousness = this.calculateConsciousness(a, b);
        const mockData: BiofeedbackData = {
          consciousness,
          mathematicalFlow: `${a} + ${b} = ${this.calculateVortexA(a, b)}`,
          patterns: [],
          timestamp: new Date()
        };
        
        patterns.push(...this.getPatterns(mockData));
      }
    }
    
    const totalConsciousness = patterns.reduce((sum, pattern) => sum + pattern.consciousness, 0);
    
    // Find dominant pattern
    const patternCounts: { [key: string]: number } = {};
    patterns.forEach(pattern => {
      patternCounts[pattern.type] = (patternCounts[pattern.type] || 0) + 1;
    });
    
    const dominantPattern = Object.entries(patternCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'unknown';
    
    return {
      patterns,
      totalConsciousness,
      dominantPattern
    };
  }
} 