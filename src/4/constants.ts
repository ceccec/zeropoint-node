/**
 * Vortex Constants - Core vortex mathematical constants
 * 
 * Defines the core mathematical constants for the vortex system,
 * including frequency ratios, multipliers, and patterns.
 */

/**
 * Vortex mathematical constants
 */
export const VORTEX_CONSTANTS = {
  // Base frequency (432 Hz)
  BASE_FREQUENCY: 432,
  
  // Vortex multipliers
  VORTEX_1_MULTIPLIER: 1,
  VORTEX_2_MULTIPLIER: 2,
  VORTEX_3_MULTIPLIER: 3,
  VORTEX_4_MULTIPLIER: 4,
  VORTEX_5_MULTIPLIER: 5,
  VORTEX_6_MULTIPLIER: 6,
  VORTEX_7_MULTIPLIER: 7,
  VORTEX_8_MULTIPLIER: 8,
  VORTEX_9_MULTIPLIER: 9,
  
  // Fraction multipliers (using fraction notation)
  FOUNDATION_MULTIPLIER: 11/10, // 1.1
  VOID_MULTIPLIER: 8/7, // 1.143
  CONSCIOUSNESS_MULTIPLIER: 1,
  SACRED_GEOMETRY_MULTIPLIER: 5/4, // 1.25
  UNITY_MULTIPLIER: 1,
  CREATIVE_RESONANCE_MULTIPLIER: 3,
  HARMONIC_BALANCE_MULTIPLIER: 6,
  CONSTANTS_MULTIPLIER: 4,
  
  // Vortex sequence (Rodin coil pattern)
  VORTEX_SEQUENCE: [1, 2, 4, 8, 7, 5, 1],
  
  // Vortex patterns
  VORTEX_PATTERNS: {
    VORTEX_1: [1, 2, 4, 8, 7, 5, 1],
    VORTEX_2: [2, 4, 8, 7, 5, 1, 2],
    VORTEX_3: [3, 6, 9, 3],
    VORTEX_4: [4, 8, 7, 5, 1, 2, 4],
    VORTEX_5: [5, 1, 2, 4, 8, 7, 5],
    VORTEX_6: [6, 9, 3, 6],
    VORTEX_7: [7, 5, 1, 2, 4, 8, 7],
    VORTEX_8: [8, 7, 5, 1, 2, 4, 8],
    VORTEX_9: [9, 3, 6, 9]
  },
  
  // Frequency ratios
  FREQUENCY_RATIOS: {
    FOUNDATION: 1/1, // 1.0
    VOID: 8/7, // 1.143
    CONSCIOUSNESS: 7/7, // 1.0
    SACRED_GEOMETRY: 5/4, // 1.25
    UNITY: 9/9, // 1.0
    CREATIVE_RESONANCE: 3/3, // 1.0
    HARMONIC_BALANCE: 6/6, // 1.0
    CONSTANTS: 4/4 // 1.0
  },
  
  // Mathematical constants
  GOLDEN_RATIO: (1 + Math.sqrt(5)) / 2, // φ ≈ 1.618
  SILVER_RATIO: 1 + Math.sqrt(2), // δ ≈ 2.414
  BRONZE_RATIO: (3 + Math.sqrt(13)) / 2, // ψ ≈ 3.303
  
  // Vortex mathematical operations
  VORTEX_OPERATIONS: {
    ADD: (a: number, b: number) => (a + b) % 9 || 9,
    MULTIPLY: (a: number, b: number) => (a * b) % 9 || 9,
    DIVIDE: (a: number, b: number) => b === 0 ? 0 : (a / b) % 9 || 9,
    SUBTRACT: (a: number, b: number) => (a - b + 9) % 9 || 9
  }
}; 