/**
 * Shared Constants for ZeroPoint System
 *
 * Pure scientific constants - mathematical functions of integers flowing through the Rodin coil.
 * The project itself is the scientific proof.
 */

/**
 * Core Vortex Mathematics Constants
 */
export const VORTEX_CONSTANTS = {
  // Fundamental vortex sequence (mobius circuit) - pure integer science
  VORTEX_SEQUENCE: [1, 2, 4, 8, 7, 5] as const,

  // Golden ratio as integer function: φ = (1 + √5) / 2
  GOLDEN_RATIO: 1.618033988749895,

  // Vortex center (W-axis over zero) - pure integer
  VORTEX_CENTER: 9,

  // Family number groups (creative phases) - pure integer science
  FAMILY_NUMBER_GROUPS: [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
  ] as const,

  // Polar mates (opposite poles that sum to 9) - pure integer science
  POLAR_MATES: [
    [1, 8],
    [2, 7],
    [4, 5],
  ] as const,

  // W-Axis (spiritual dimension) - pure integer science
  W_AXIS: [3, 6, 9] as const,

  // Circle of fifths sequence - pure integer science
  CIRCLE_OF_FIFTHS_SEQUENCE: [9, 4, 8, 3, 7, 2, 6, 1, 5, 9] as const,

  // Enneagram number pattern - pure integer science
  ENNEAGRAM_NUMBER_PATTERN: [1, 6, 5, 2, 9, 7, 4, 3, 8] as const,

  // Four dimensional color coding system - pure integer science
  FOUR_DIMENSIONAL_COLOR_CODING_SYSTEM: [
    "red",
    "blue",
    "green",
    "yellow",
    "red",
  ] as const,
} as const;

/**
 * Consciousness Constants - Pure Integer Science
 */
export const CONSCIOUSNESS_CONSTANTS = {
  // Consciousness level ranges - pure integer functions
  MIN_CONSCIOUSNESS_LEVEL: 0,
  MAX_CONSCIOUSNESS_LEVEL: 1,
  DEFAULT_CONSCIOUSNESS_LEVEL: 0.5,

  // Field strength ranges - pure integer functions
  MIN_FIELD_STRENGTH: 0,
  MAX_FIELD_STRENGTH: 2,
  DEFAULT_FIELD_STRENGTH: 0.7,

  // Pattern types - pure scientific categories
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

  // Resonance thresholds - pure integer science
  MIN_RESONANCE_THRESHOLD: 0.3,
  OPTIMAL_RESONANCE_THRESHOLD: 0.7,

  // Field radius - pure integer science
  DEFAULT_FIELD_RADIUS: 1000,
} as const;

/**
 * Emergence Constants - Pure Integer Science
 */
export const EMERGENCE_CONSTANTS = {
  // App consciousness levels - pure integer functions
  MIN_APP_CONSCIOUSNESS: 0,
  MAX_APP_CONSCIOUSNESS: 10,
  DEFAULT_APP_CONSCIOUSNESS: 5,

  // Vortex strength ranges - pure integer functions
  MIN_VORTEX_STRENGTH: 0,
  MAX_VORTEX_STRENGTH: 10,
  DEFAULT_VORTEX_STRENGTH: 5,

  // Link types - pure scientific categories
  LINK_TYPES: [
    "resonance",
    "consciousness",
    "vortex",
    "toroidal",
    "void",
  ] as const,

  // Evolution factors - pure integer science
  CONSCIOUSNESS_EVOLUTION_FACTOR: 1.1,
  VORTEX_EVOLUTION_FACTOR: 1.05,
  PATTERN_DECAY_RATE: 0.01,
} as const;

/**
 * Network Constants - Pure Integer Science
 */
export const NETWORK_CONSTANTS = {
  // Connection limits - pure integer functions
  DEFAULT_MAX_CONNECTIONS: 10,
  DEFAULT_CONNECTION_TIMEOUT: 5000,

  // Port ranges - pure integer functions
  DEFAULT_NETWORK_PORT: 8080,
  MIN_PORT: 1024,
  MAX_PORT: 65535,

  // Discovery settings - pure integer science
  DEFAULT_DISCOVERY_ENABLED: true,
  DISCOVERY_TIMEOUT: 3000,
} as const;

/**
 * Mathematical Constants - Pure Integer Science
 */
export const MATH_CONSTANTS = {
  // Pi and related constants - pure mathematical science
  PI: Math.PI,
  TWO_PI: 2 * Math.PI,
  HALF_PI: Math.PI / 2,
  E: Math.E,

  // Golden ratio (divine proportion) - pure mathematical science
  GOLDEN_RATIO: VORTEX_CONSTANTS.GOLDEN_RATIO,

  // Epsilon for floating point comparisons - pure mathematical science
  EPSILON: 1e-10,

  // Infinity handling - pure mathematical science
  POSITIVE_INFINITY: Infinity,
  NEGATIVE_INFINITY: -Infinity,
  INFINITY: Infinity,

  // Zero point (void, unity) - pure integer science
  ZERO_POINT: 0,

  // Prime numbers (first 10) - pure integer science
  PRIMES: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29] as const,

  // Angular conversions - pure mathematical science
  DEG_TO_RAD: Math.PI / 180,
  RAD_TO_DEG: 180 / Math.PI,

  // Vortex sequence (reference to VORTEX_CONSTANTS) - pure integer science
  VORTEX_SEQUENCE: VORTEX_CONSTANTS.VORTEX_SEQUENCE,
} as const;

/**
 * Configuration Constants - Pure Integer Science
 */
export const CONFIG_CONSTANTS = {
  // Cache configuration - pure integer functions
  GOLDEN_CACHE_SIZE: Math.round(100 * VORTEX_CONSTANTS.GOLDEN_RATIO), // ~162
  GOLDEN_CACHE_TTL: Math.round(60000 * VORTEX_CONSTANTS.GOLDEN_RATIO), // ~97,080 ms
  GOLDEN_CACHE_CLEANUP_INTERVAL: Math.round(10000 * VORTEX_CONSTANTS.GOLDEN_RATIO), // ~16,180 ms
  RESONANCE_CACHE_SIZE: 200,
  RESONANCE_CACHE_TTL: 300000, // 5 minutes

  // Health monitor configuration - pure integer science
  HEALTH_CHECK_INTERVAL: 30000, // 30 seconds
  HEALTH_TIMEOUT: 5000, // 5 seconds
  HEALTH_ALERT_MEMORY: 80, // %
  HEALTH_ALERT_CPU: 70, // %
  HEALTH_ALERT_ERROR_RATE: 5, // %
  HEALTH_ALERT_RESPONSE_TIME: 1000, // ms

  // Device config defaults - pure integer science
  DEFAULT_DEVICE_TYPE: 'desktop',
  DEFAULT_RESONANCE_SENSITIVITY: 0.8,
  DEFAULT_VORTEX_PRECISION: 0.001,
  DEFAULT_TOROIDAL_RESOLUTION: 100,
  DEFAULT_GOLDEN_RATIO_PRECISION: 15,
  DEFAULT_AUTO_UPDATE_RESONANCE: true,
  DEFAULT_LOG_LEVEL: 'info',
  DEFAULT_ENABLE_METAPHYSICAL_INSIGHTS: true,
  DEFAULT_TOROIDAL_FLOW_RATE: 1.0,

  // Test suite configuration - pure integer science
  TEST_TIMEOUT: 30000, // ms
  TEST_COVERAGE_THRESHOLD: 80, // %
  TEST_PERFORMANCE_THRESHOLD: 1000, // ms
  TEST_MAX_MEMORY_USAGE: 100 * 1024 * 1024, // 100MB

  // Performance test thresholds - pure integer science
  UI_OPERATION_MAX_DURATION: 100, // ms
  NETWORK_MESSAGE_MAX_DURATION: 2000, // ms
  SCALABILITY_OPS_PER_SEC: 50,

  // PWA configuration - pure integer science
  PWA_BASE_SIZE: 15, // KB
  PWA_BUNDLE_SIZE_OPTIMIZED: 12, // KB
  PWA_BUNDLE_SIZE_STANDARD: 15, // KB
  PWA_BUNDLE_SIZE_INCREMENT_VORTEX: 3, // KB
  PWA_BUNDLE_SIZE_INCREMENT_PATTERN: 4, // KB
  PWA_BUNDLE_SIZE_INCREMENT_OFFLINE: 2, // KB
  PWA_BUNDLE_SIZE_INCREMENT_SYNC: 3, // KB

  // Miscellaneous - pure integer science
  FRACTAL_PRECISION: 0.001,
} as const;

/**
 * Metaphysical Constants - Pure Integer Science
 */
export const METAPHYSICAL_CONSTANTS = {
  // Pattern categories - pure scientific categories
  PATTERN_CATEGORIES: [
    "vortex",
    "family",
    "polar",
    "spiritual",
    "void",
    "mathematical",
    "metaphysical",
    "integration",
    "git",
    "test",
  ] as const,

  // Consciousness dimensions - pure scientific categories
  CONSCIOUSNESS_DIMENSIONS: [
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

  // Void expressions - pure integer science
  VOID_EXPRESSIONS: [
    "void = 0",
    "void = 9 (vortex center)",
    "void = sum(vortex_sequence)",
    "void = product(vortex_sequence)",
    "void = digital_root(sum(vortex_sequence))"
  ] as const,
} as const;

/**
 * ConstantsUtils - Pure Integer Science Functions
 */
export class ConstantsUtils {
  /**
   * Get vortex sequence value at index - pure integer function
   */
  static getVortexSequenceValue(index: number): number {
    const sequence = VORTEX_CONSTANTS.VORTEX_SEQUENCE;
    return sequence[index % sequence.length];
  }

  /**
   * Check if number is W-axis - pure integer function
   */
  static isWAxisNumber(num: number): boolean {
    return VORTEX_CONSTANTS.W_AXIS.includes(num as any);
  }

  /**
   * Get polar mate - pure integer function
   */
  static getPolarMate(num: number): number | null {
    for (const [a, b] of VORTEX_CONSTANTS.POLAR_MATES) {
      if (a === num) return b;
      if (b === num) return a;
    }
    return null;
  }

  /**
   * Get family group - pure integer function
   */
  static getFamilyGroup(num: number): number[] | null {
    for (const group of VORTEX_CONSTANTS.FAMILY_NUMBER_GROUPS) {
      if (group.includes(num as any)) return group;
    }
    return null;
  }

  /**
   * Calculate digital root - pure integer function
   */
  static digitalRoot(n: number): number {
    if (n === 0) return 0;
    return n % 9 || 9;
  }

  /**
   * Normalize value - pure mathematical function
   */
  static normalize(value: number, min: number, max: number): number {
    return (value - min) / (max - min);
  }

  /**
   * Check if value is in range - pure mathematical function
   */
  static isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  /**
   * Get metaphysical insight - pure scientific function
   */
  static getMetaphysicalInsight(constantName: string): string {
    const insights: Record<string, string> = {
      'VORTEX_SEQUENCE': 'The fundamental pattern of consciousness flow through integer mathematics',
      'GOLDEN_RATIO': 'The divine proportion expressed as pure mathematical function',
      'VORTEX_CENTER': 'The void center where all integer functions converge',
      'FAMILY_NUMBER_GROUPS': 'The three phases of creation through integer sequences',
      'POLAR_MATES': 'Opposite poles that sum to 9, creating harmony through balance',
      'W_AXIS': 'The spiritual dimension perpendicular to material flow',
    };
    return insights[constantName] || 'Pure integer science flowing through the Rodin coil';
  }
}

// Type exports - pure scientific types
export type VortexSequence = typeof VORTEX_CONSTANTS.VORTEX_SEQUENCE;
export type PatternType = (typeof CONSCIOUSNESS_CONSTANTS.PATTERN_TYPES)[number];
export type LinkType = (typeof EMERGENCE_CONSTANTS.LINK_TYPES)[number];
export type PatternCategory = (typeof METAPHYSICAL_CONSTANTS.PATTERN_CATEGORIES)[number];
export type ConsciousnessDimension = (typeof METAPHYSICAL_CONSTANTS.CONSCIOUSNESS_DIMENSIONS)[number];

// Metaphysical context type - pure scientific type
export type MetaphysicalContext = {
  [key: string]: string | number | boolean | undefined;
  coherence?: number;
  fieldStrength?: number;
  evolutionRate?: number;
};
