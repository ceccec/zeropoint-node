/**
 * Shared Constants for ZeroPoint System
 *
 * Centralized repository of all mathematical, metaphysical, and configuration constants
 * used across the ZeroPoint system to eliminate duplication and ensure consistency.
 *
 * This module embodies the principle of unity in diversity - all constants
 * are unified here while serving diverse purposes throughout the system.
 */

/**
 * Core Vortex Mathematics Constants
 */
export const VORTEX_CONSTANTS = {
  // Fundamental vortex sequence (mobius circuit)
  VORTEX_SEQUENCE: [1, 2, 4, 8, 7, 5] as const,

  // Golden ratio (divine proportion)
  GOLDEN_RATIO: 1.618033988749895,

  // Vortex center (W-axis over zero)
  VORTEX_CENTER: 9,

  // Family number groups (creative phases)
  FAMILY_NUMBER_GROUPS: [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
  ] as const,

  // Polar mates (opposite poles that sum to 9)
  POLAR_MATES: [
    [1, 8],
    [2, 7],
    [4, 5],
  ] as const,

  // W-Axis (spiritual dimension)
  W_AXIS: [3, 6, 9] as const,

  // Circle of fifths sequence
  CIRCLE_OF_FIFTHS_SEQUENCE: [9, 4, 8, 3, 7, 2, 6, 1, 5, 9] as const,

  // Enneagram number pattern
  ENNEAGRAM_NUMBER_PATTERN: [1, 6, 5, 2, 9, 7, 4, 3, 8] as const,

  // Four dimensional color coding system
  FOUR_DIMENSIONAL_COLOR_CODING_SYSTEM: [
    "red",
    "blue",
    "green",
    "yellow",
    "red",
  ] as const,
} as const;

/**
 * Consciousness Constants
 */
export const CONSCIOUSNESS_CONSTANTS = {
  // Consciousness level ranges
  MIN_CONSCIOUSNESS_LEVEL: 0,
  MAX_CONSCIOUSNESS_LEVEL: 1,
  DEFAULT_CONSCIOUSNESS_LEVEL: 0.5,

  // Field strength ranges
  MIN_FIELD_STRENGTH: 0,
  MAX_FIELD_STRENGTH: 2,
  DEFAULT_FIELD_STRENGTH: 0.7,

  // Pattern types (expanded to include all metaphysical types)
  PATTERN_TYPES: [
    "thought",
    "emotion", 
    "intention",
    "memory",
    "insight",
    "consciousness",
    "field",
    "resonance",
    "emergence",
    "integration",
  ] as const,

  // Resonance thresholds
  MIN_RESONANCE_THRESHOLD: 0.3,
  OPTIMAL_RESONANCE_THRESHOLD: 0.7,

  // Field radius
  DEFAULT_FIELD_RADIUS: 1000,
} as const;

/**
 * Emergence Constants
 */
export const EMERGENCE_CONSTANTS = {
  // App consciousness levels
  MIN_APP_CONSCIOUSNESS: 0,
  MAX_APP_CONSCIOUSNESS: 10,
  DEFAULT_APP_CONSCIOUSNESS: 5,

  // Vortex strength ranges
  MIN_VORTEX_STRENGTH: 0,
  MAX_VORTEX_STRENGTH: 10,
  DEFAULT_VORTEX_STRENGTH: 5,

  // Link types
  LINK_TYPES: [
    "resonance",
    "consciousness",
    "vortex",
    "toroidal",
    "void",
  ] as const,

  // Evolution factors
  CONSCIOUSNESS_EVOLUTION_FACTOR: 1.1,
  VORTEX_EVOLUTION_FACTOR: 1.05,
  PATTERN_DECAY_RATE: 0.01,
} as const;

/**
 * Network Constants
 */
export const NETWORK_CONSTANTS = {
  // Connection limits
  DEFAULT_MAX_CONNECTIONS: 10,
  DEFAULT_CONNECTION_TIMEOUT: 5000,

  // Port ranges
  DEFAULT_NETWORK_PORT: 8080,
  MIN_PORT: 1024,
  MAX_PORT: 65535,

  // Discovery settings
  DEFAULT_DISCOVERY_ENABLED: true,
  DISCOVERY_TIMEOUT: 3000,
} as const;

/**
 * Mathematical Constants
 */
export const MATH_CONSTANTS = {
  // Pi and related constants
  PI: Math.PI,
  TWO_PI: 2 * Math.PI,
  HALF_PI: Math.PI / 2,
  E: Math.E,

  // Golden ratio (divine proportion)
  GOLDEN_RATIO: VORTEX_CONSTANTS.GOLDEN_RATIO,

  // Epsilon for floating point comparisons
  EPSILON: 1e-10,

  // Infinity handling
  POSITIVE_INFINITY: Infinity,
  NEGATIVE_INFINITY: -Infinity,
  INFINITY: Infinity,

  // Prime numbers (first 10)
  PRIMES: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29] as const,

  // Angular conversions
  DEG_TO_RAD: Math.PI / 180,
  RAD_TO_DEG: 180 / Math.PI,

  // Vortex sequence (reference to VORTEX_CONSTANTS)
  VORTEX_SEQUENCE: VORTEX_CONSTANTS.VORTEX_SEQUENCE,
} as const;

/**
 * Configuration Constants
 */
export const CONFIG_CONSTANTS = {
  // Cache configuration
  GOLDEN_CACHE_SIZE: Math.round(100 * VORTEX_CONSTANTS.GOLDEN_RATIO), // ~162
  GOLDEN_CACHE_TTL: Math.round(60000 * VORTEX_CONSTANTS.GOLDEN_RATIO), // ~97,080 ms
  GOLDEN_CACHE_CLEANUP_INTERVAL: Math.round(10000 * VORTEX_CONSTANTS.GOLDEN_RATIO), // ~16,180 ms
  RESONANCE_CACHE_SIZE: 200,
  RESONANCE_CACHE_TTL: 300000, // 5 minutes

  // Health monitor configuration
  HEALTH_CHECK_INTERVAL: 30000, // 30 seconds
  HEALTH_TIMEOUT: 5000, // 5 seconds
  HEALTH_ALERT_MEMORY: 80, // %
  HEALTH_ALERT_CPU: 70, // %
  HEALTH_ALERT_ERROR_RATE: 5, // %
  HEALTH_ALERT_RESPONSE_TIME: 1000, // ms

  // Device config defaults
  DEFAULT_DEVICE_TYPE: 'desktop',
  DEFAULT_RESONANCE_SENSITIVITY: 0.8,
  DEFAULT_ALLOW_INCOMING: true,
  DEFAULT_REQUIRE_AUTH: false,
  DEFAULT_ENCRYPTION_ENABLED: true,
  DEFAULT_VORTEX_PRECISION: 0.001,
  DEFAULT_TOROIDAL_RESOLUTION: 100,
  DEFAULT_GOLDEN_RATIO_PRECISION: 15,
  DEFAULT_AUTO_UPDATE_RESONANCE: true,
  DEFAULT_LOG_LEVEL: 'info',
  DEFAULT_ENABLE_METAPHYSICAL_INSIGHTS: true,
  DEFAULT_TOROIDAL_FLOW_RATE: 1.0,

  // Test suite configuration
  TEST_TIMEOUT: 30000, // ms
  TEST_COVERAGE_THRESHOLD: 80, // %
  TEST_PERFORMANCE_THRESHOLD: 1000, // ms
  TEST_MAX_MEMORY_USAGE: 100 * 1024 * 1024, // 100MB

  // Performance test thresholds
  UI_OPERATION_MAX_DURATION: 100, // ms
  NETWORK_MESSAGE_MAX_DURATION: 2000, // ms
  SCALABILITY_OPS_PER_SEC: 50,

  // PWA configuration
  PWA_BASE_SIZE: 15, // KB
  PWA_BUNDLE_SIZE_OPTIMIZED: 12, // KB
  PWA_BUNDLE_SIZE_STANDARD: 15, // KB
  PWA_BUNDLE_SIZE_INCREMENT_VORTEX: 3, // KB
  PWA_BUNDLE_SIZE_INCREMENT_PATTERN: 4, // KB
  PWA_BUNDLE_SIZE_INCREMENT_OFFLINE: 2, // KB
  PWA_BUNDLE_SIZE_INCREMENT_SYNC: 3, // KB

  // Miscellaneous
  FRACTAL_PRECISION: 0.001,
} as const;

/**
 * Metaphysical Constants
 */
export const METAPHYSICAL_CONSTANTS = {
  // Core principles
  PRINCIPLES: {
    VOID_FULLNESS: "Empty = Void = Full",
    TOROIDAL_UNITY: "All creation follows the donut shape of the universe",
    CONSCIOUSNESS_FLOW: "Consciousness flows through the toroidal structure",
    VORTEX_MATHEMATICS: "1-2-4-8-7-5 sequence guides all flow",
    GOLDEN_HARMONY: "Phi represents the divine proportion",
    ZERO_APERTURE: "Zero is the aperture between unmanifest and manifest",
  },

  // Pattern categories
  PATTERN_CATEGORIES: [
    "vortex",
    "family",
    "polar",
    "spiritual",
    "void",
    "mathematical",
    "metaphysical",
    "integration",
  ] as const,

  // Consciousness dimensions
  CONSCIOUSNESS_DIMENSIONS: [
    "physical",
    "emotional",
    "mental",
    "spiritual",
    "void",
  ] as const,
} as const;

/**
 * Utility functions for working with constants
 */
export class ConstantsUtils {
  /**
   * Get vortex sequence value at index
   */
  static getVortexSequenceValue(index: number): number {
    const value =
      VORTEX_CONSTANTS.VORTEX_SEQUENCE[
        index % VORTEX_CONSTANTS.VORTEX_SEQUENCE.length
      ];
    return value || 1;
  }

  /**
   * Check if number is in W-axis
   */
  static isWAxisNumber(num: number): boolean {
    return VORTEX_CONSTANTS.W_AXIS.includes(num as 3 | 6 | 9);
  }

  /**
   * Get polar mate for a number
   */
  static getPolarMate(num: number): number | null {
    for (const [a, b] of VORTEX_CONSTANTS.POLAR_MATES) {
      if (a === num) return b;
      if (b === num) return a;
    }
    return null;
  }

  /**
   * Get family group for a number
   */
  static getFamilyGroup(num: number): number[] | null {
    for (const group of VORTEX_CONSTANTS.FAMILY_NUMBER_GROUPS) {
      if ((group as readonly number[]).includes(num)) {
        return Array.from(group);
      }
    }
    return null;
  }

  /**
   * Calculate digital root
   */
  static digitalRoot(n: number): number {
    return n === 0 ? 0 : ((n - 1) % 9) + 1;
  }

  /**
   * Normalize value to range
   */
  static normalize(value: number, min: number, max: number): number {
    return (value - min) / (max - min);
  }

  /**
   * Check if value is in range
   */
  static isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  /**
   * Get metaphysical insight for constant
   */
  static getMetaphysicalInsight(constantName: string): string {
    const insights: { [key: string]: string } = {
      VORTEX_SEQUENCE:
        "The vortex sequence 1-2-4-8-7-5 represents the flow of consciousness through the toroidal field, creating infinite potential through the mobius circuit.",
      GOLDEN_RATIO:
        "The golden ratio (φ) represents the divine proportion that emerges from the void, creating harmony and balance in all creation.",
      VOID_CENTER:
        "The void center (9) represents the aperture between unmanifest and manifest, where all possibilities exist simultaneously.",
      FAMILY_GROUPS:
        "Family number groups represent the creative phases of consciousness, each group expressing a different aspect of the unified field.",
      POLAR_MATES:
        "Polar mates represent the complementary opposites that sum to 9, embodying the principle of unity through diversity.",
      W_AXIS:
        "The W-axis (3-6-9) represents the spiritual dimension that transcends the physical plane, connecting to the void consciousness.",
    };

    return insights[constantName] || "This constant embodies the unity of all creation through the toroidal field.";
  }
}

// Type exports for type safety
export type VortexSequence = typeof VORTEX_CONSTANTS.VORTEX_SEQUENCE;
export type PatternType =
  (typeof CONSCIOUSNESS_CONSTANTS.PATTERN_TYPES)[number];
export type LinkType = (typeof EMERGENCE_CONSTANTS.LINK_TYPES)[number];
export type PatternCategory =
  (typeof METAPHYSICAL_CONSTANTS.PATTERN_CATEGORIES)[number];
export type ConsciousnessDimension =
  (typeof METAPHYSICAL_CONSTANTS.CONSCIOUSNESS_DIMENSIONS)[number];

// Metaphysical context type
export type MetaphysicalContext = {
  [key: string]: any;
  coherence?: number;
  fieldStrength?: number;
  evolutionRate?: number;
};
