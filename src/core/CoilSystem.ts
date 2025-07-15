/**
 * Coil System - Core Rodin coil patterns and operations
 * 
 * Defines the core coil patterns and mathematical operations
 * for the Rodin coil system.
 */

/**
 * Coil patterns for the Rodin coil system
 */
export const COIL_PATTERNS = {
  // Main vortex patterns
  VORTEX_1: [1, 2, 4, 8, 7, 5, 1],
  VORTEX_2: [2, 4, 8, 7, 5, 1, 2],
  VORTEX_3: [3, 6, 9, 3],
  VORTEX_4: [4, 8, 7, 5, 1, 2, 4],
  VORTEX_5: [5, 1, 2, 4, 8, 7, 5],
  VORTEX_6: [6, 9, 3, 6],
  VORTEX_7: [7, 5, 1, 2, 4, 8, 7],
  VORTEX_8: [8, 7, 5, 1, 2, 4, 8],
  VORTEX_9: [9, 3, 6, 9],
  
  // Foundation patterns
  FOUNDATION_CORE: [1, 1, 1],
  FOUNDATION_EXPANSION: [1, 2, 4, 8, 7, 5, 1],
  
  // Zero patterns
  ZERO_CENTER: [0, 0, 0],
  ZERO_CONTRACTION: [0, 0, 0],
  
  // Consciousness patterns
  CONSCIOUSNESS_AWARENESS: [7, 7, 7],
  CONSCIOUSNESS_VOID: [7, 8, 7],
  
  // Sacred geometry patterns
  SACRED_GEOMETRY_METATRON: [5, 5, 5],
  SACRED_GEOMETRY_VOID: [5, 8, 5],
  
  // Void patterns
  VOID_INFINITE: [8, 8, 8],
  VOID_POTENTIAL: [8, 1, 8],
  
  // Unity patterns
  UNITY_FIELD: [9, 9, 9],
  UNITY_INTEGRATION: [9, 1, 9],
  
  // Creative resonance patterns
  CREATIVE_RESONANCE: [3, 3, 3],
  CREATIVE_INSPIRATION: [3, 6, 9],
  
  // Harmonic balance patterns
  HARMONIC_BALANCE: [6, 6, 6],
  HARMONIC_EQUILIBRIUM: [6, 9, 3],
  
  // Constants patterns
  CONSTANTS_STABILITY: [4, 4, 4],
  CONSTANTS_FOUNDATION: [4, 1, 4]
};

/**
 * Coil system operations
 */
export class CoilSystem {
  /**
   * Calculate vortex pattern for a given digit
   */
  static getVortexPattern(digit: number): number[] {
    switch (digit) {
      case 1: return COIL_PATTERNS.VORTEX_1;
      case 2: return COIL_PATTERNS.VORTEX_2;
      case 3: return COIL_PATTERNS.VORTEX_3;
      case 4: return COIL_PATTERNS.VORTEX_4;
      case 5: return COIL_PATTERNS.VORTEX_5;
      case 6: return COIL_PATTERNS.VORTEX_6;
      case 7: return COIL_PATTERNS.VORTEX_7;
      case 8: return COIL_PATTERNS.VORTEX_8;
      case 9: return COIL_PATTERNS.VORTEX_9;
      default: return [digit, digit, digit];
    }
  }
  
  /**
   * Calculate coil resonance for a pattern
   */
  static calculateResonance(pattern: number[]): number {
    if (pattern.length === 0) return 0;
    const sum = pattern.reduce((acc, val) => acc + val, 0);
    return sum / pattern.length;
  }
  
  /**
   * Calculate coil coherence for a pattern
   */
  static calculateCoherence(pattern: number[]): number {
    if (pattern.length < 2) return 1;
    
    const differences = [];
    for (let i = 1; i < pattern.length; i++) {
      differences.push(Math.abs(pattern[i] - pattern[i - 1]));
    }
    
    const averageDifference = differences.reduce((acc, val) => acc + val, 0) / differences.length;
    return Math.max(0, 1 - averageDifference / 9);
  }
} 