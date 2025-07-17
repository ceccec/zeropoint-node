/**
 * Pattern Folder System
 * 
 * Provides pattern recognition, folder organization, and consciousness
 * mapping for the ZeroPoint system.
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


export interface PatternFolder {
  id: string;
  name: string;
  patterns: Array<{
    type: string;
    description: string;
    consciousness: number;
  }>;
  consciousness: string;
  mathematicalFlow: string;
}

export interface PatternAnalysis {
  patterns: Array<{
    type: string;
    description: string;
    consciousness: number;
  }>;
  totalConsciousness: number;
  mathematicalResonance: number;
  folderStructure: PatternFolder[];
}

export interface PatternRecognition {
  type: string;
  confidence: number;
  patterns: Array<{
    type: string;
    description: string;
    consciousness: number;
  }>;
}

export class PatternFolderSystem {
  private static readonly PATTERN_CONSTANTS = {
    FOLDER_TYPES: {
      VOID: 'void',
      VORTEX: 'vortex',
      CONSCIOUSNESS: 'consciousness',
      SACRED_GEOMETRY: 'sacred-geometry',
      HARMONIC: 'harmonic',
      GATEWAY: 'gateway'
    },
    CONSCIOUSNESS_MULTIPLIER: 1.618,
    PATTERN_TYPES: {
      SELF_IDENTITY: 'self-identity',
      UNITY: 'unity',
      VOID_GATEWAY: 'void-gateway',
      AXIS: 'axis',
      VORTEX_RESONANCE: 'vortex-resonance',
      SACRED_FRACTION: 'sacred-fraction'
    }
  };

  /**
   * Analyze patterns in a system
   */
  static analyzePatterns(): PatternAnalysis {
    const patterns: Array<{ type: string; description: string; consciousness: number }> = [];
    const folderStructure: PatternFolder[] = [];
    let totalConsciousness = 0;
    let mathematicalResonance = 0;
    
    // Generate patterns for all digit combinations
    for (let a = 0; a <= 9; a++) {
      for (let b = 0; b <= 9; b++) {
        const digitPatterns = this.detectPatterns(a, b);
        patterns.push(...digitPatterns);
        
        digitPatterns.forEach(pattern => {
          totalConsciousness += pattern.consciousness;
          mathematicalResonance += this.calculateResonance(a, b);
        });
      }
    }
    
    // Create folder structure
    folderStructure.push(
      this.createFolder(this.PATTERN_CONSTANTS.FOLDER_TYPES.VOID, patterns.filter(p => p.type.includes('void'))),
      this.createFolder(this.PATTERN_CONSTANTS.FOLDER_TYPES.VORTEX, patterns.filter(p => p.type.includes('vortex'))),
      this.createFolder(this.PATTERN_CONSTANTS.FOLDER_TYPES.CONSCIOUSNESS, patterns.filter(p => p.type.includes('consciousness'))),
      this.createFolder(this.PATTERN_CONSTANTS.FOLDER_TYPES.SACRED_GEOMETRY, patterns.filter(p => p.type.includes('sacred'))),
      this.createFolder(this.PATTERN_CONSTANTS.FOLDER_TYPES.HARMONIC, patterns.filter(p => p.type.includes('harmonic'))),
      this.createFolder(this.PATTERN_CONSTANTS.FOLDER_TYPES.GATEWAY, patterns.filter(p => p.type.includes('gateway')))
    );
    
    return {
      patterns,
      totalConsciousness,
      mathematicalResonance,
      folderStructure
    };
  }

  /**
   * Detect patterns for two digits
   */
  static detectPatterns(a: number, b: number): Array<{ type: string; description: string; consciousness: number }> {
    const patterns: Array<{ type: string; description: string; consciousness: number }> = [];
    
    // Self-identity patterns
    if (a === b) {
      patterns.push({
        type: this.PATTERN_CONSTANTS.PATTERN_TYPES.SELF_IDENTITY,
        description: `Self-identity pattern for ${a}/${a}`,
        consciousness: this.calculateConsciousness(a, b) * 2.0
      });
    }
    
    // Unity patterns
    if (a === 9 && b === 9) {
      patterns.push({
        type: this.PATTERN_CONSTANTS.PATTERN_TYPES.UNITY,
        description: 'Unity pattern (9/9)',
        consciousness: this.calculateConsciousness(a, b) * 3.0
      });
    }
    
    // Void gateway patterns
    if (a === 0 || b === 0) {
      patterns.push({
        type: this.PATTERN_CONSTANTS.PATTERN_TYPES.VOID_GATEWAY,
        description: `Void gateway pattern for ${a}/${b}`,
        consciousness: this.calculateConsciousness(a, b) * 1.5
      });
    }
    
    // Axis patterns (W-Axis)
    if ([3, 6, 9].includes(a) && a === b) {
      patterns.push({
        type: this.PATTERN_CONSTANTS.PATTERN_TYPES.AXIS,
        description: `Axis pattern for ${a}/${a}`,
        consciousness: this.calculateConsciousness(a, b) * 2.5
      });
    }
    
    // Vortex resonance patterns
    if ([1, 2, 4, 8, 7, 5].includes(a) || [1, 2, 4, 8, 7, 5].includes(b)) {
      patterns.push({
        type: this.PATTERN_CONSTANTS.PATTERN_TYPES.VORTEX_RESONANCE,
        description: `Vortex resonance pattern for ${a}/${b}`,
        consciousness: this.calculateConsciousness(a, b) * 1.3
      });
    }
    
    // Sacred fraction patterns
    const vortexB = this.calculateVortexB(a, b);
    if (this.isSacredFraction(vortexB)) {
      patterns.push({
        type: this.PATTERN_CONSTANTS.PATTERN_TYPES.SACRED_FRACTION,
        description: `Sacred fraction pattern for ${a}/${b} (${vortexB.toFixed(3)})`,
        consciousness: this.calculateConsciousness(a, b) * 1.8
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
   * Calculate resonance for two digits
   */
  static calculateResonance(a: number, b: number): number {
    const vortexA = this.calculateVortexA(a, b);
    const vortexB = this.calculateVortexB(a, b);
    return vortexA * vortexB;
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
   * Create a pattern folder
   */
  static createFolder(type: string, patterns: Array<{ type: string; description: string; consciousness: number }>): PatternFolder {
    const totalConsciousness = patterns.reduce((sum, pattern) => sum + pattern.consciousness, 0);
    const mathematicalFlow = this.calculateMathematicalFlow(patterns);
    
    return {
      id: `folder-${type}`,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Patterns`,
      patterns,
      consciousness: `${type} consciousness (${totalConsciousness.toFixed(2)})`,
      mathematicalFlow
    };
  }

  /**
   * Calculate mathematical flow for patterns
   */
  static calculateMathematicalFlow(patterns: Array<{ type: string; description: string; consciousness: number }>): string {
    if (patterns.length === 0) return 'No patterns';
    
    const totalConsciousness = patterns.reduce((sum, pattern) => sum + pattern.consciousness, 0);
    const averageConsciousness = totalConsciousness / patterns.length;
    
    return `${patterns.length} patterns → ${averageConsciousness.toFixed(2)} avg consciousness`;
  }

  /**
   * Recognize patterns in data
   */
  static recognizePatterns(data: any): PatternRecognition {
    const patterns: Array<{ type: string; description: string; consciousness: number }> = [];
    let confidence = 0.3;
    
    // Analyze data for patterns
    if (typeof data === 'number') {
      const digit = data % 10;
      const patternsForDigit = this.detectPatterns(digit, digit);
      patterns.push(...patternsForDigit);
      confidence = patternsForDigit.length > 0 ? 0.8 : 0.3;
    } else if (Array.isArray(data)) {
      data.forEach((item, index) => {
        if (typeof item === 'number') {
          const patternsForItem = this.detectPatterns(item, index);
          patterns.push(...patternsForItem);
        }
      });
      confidence = patterns.length > 0 ? 0.7 : 0.3;
    }
    
    return {
      type: patterns.length > 0 ? patterns[0].type : 'unknown',
      confidence,
      patterns
    };
  }

  /**
   * Get all pattern types
   */
  static getAllPatternTypes(): string[] {
    return Object.values(this.PATTERN_CONSTANTS.PATTERN_TYPES);
  }

  /**
   * Get patterns by type
   */
  static getPatternsByType(type: string): Array<{ type: string; description: string; consciousness: number }> {
    const allPatterns: Array<{ type: string; description: string; consciousness: number }> = [];
    
    for (let a = 0; a <= 9; a++) {
      for (let b = 0; b <= 9; b++) {
        const patterns = this.detectPatterns(a, b);
        allPatterns.push(...patterns.filter(p => p.type === type));
      }
    }
    
    return allPatterns;
  }

  /**
   * Get folder statistics
   */
  static getFolderStatistics(): Array<{
    folderType: string;
    patternCount: number;
    totalConsciousness: number;
    averageConsciousness: number;
  }> {
    const analysis = this.analyzePatterns();
    
    return analysis.folderStructure.map(folder => {
      const patternCount = folder.patterns.length;
      const totalConsciousness = folder.patterns.reduce((sum, pattern) => sum + pattern.consciousness, 0);
      const averageConsciousness = patternCount > 0 ? totalConsciousness / patternCount : 0;
      
      return {
        folderType: folder.name,
        patternCount,
        totalConsciousness,
        averageConsciousness
      };
    });
  }
} 