/**
 * Shared Constants for ZeroPoint System
 *
 * Centralized repository of all mathematical and metaphysical constants
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

  // Pattern types
  PATTERN_TYPES: [
    "thought",
    "emotion",
    "intention",
    "memory",
    "insight",
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

  // Epsilon for floating point comparisons
  EPSILON: 1e-10,

  // Infinity handling
  POSITIVE_INFINITY: Infinity,
  NEGATIVE_INFINITY: -Infinity,

  // Prime numbers (first 10)
  PRIMES: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29] as const,
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
    return value ?? 1; // Default to 1 if undefined
  }

  /**
   * Check if number is in W-Axis
   */
  static isWAxisNumber(num: number): boolean {
    return VORTEX_CONSTANTS.W_AXIS.includes(num as any);
  }

  /**
   * Find polar mate for a number
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
    for (const group of VORTEX_CONSTANTS.FAMILY_NUMBER_GROUPS as unknown as number[][]) {
      if (group.includes(num)) {
        return [...group];
      }
    }
    return null;
  }

  /**
   * Calculate digital root
   */
  static digitalRoot(n: number): number {
    if (n === 0) return 9; // In VBM, 0 = 9
    return n % 9 || 9;
  }

  /**
   * Normalize value to range
   */
  static normalize(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  /**
   * Check if value is within range
   */
  static isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  /**
   * Get metaphysical insight for a constant
   */
  static getMetaphysicalInsight(constantName: string): string {
    const insights: { [key: string]: string } = {
      VORTEX_SEQUENCE:
        "The 1-2-4-8-7-5 sequence creates the mobius circuit of infinite flow",
      GOLDEN_RATIO:
        "Phi represents the divine proportion that governs all natural growth patterns",
      W_AXIS:
        "The W-Axis is where Spirit emanates from, perpendicular to material flow",
      POLAR_MATES:
        "Polar mates represent the duality and balance inherent in creation",
      FAMILY_GROUPS:
        "Each family represents a different phase of the creative process",
      ZERO: "Zero is the center of the torus where all patterns converge",
    };

    return (
      insights[constantName] ||
      "This constant embodies a fundamental pattern of creation"
    );
  }
}

/**
 * Type definitions for constants
 */
export type VortexSequence = typeof VORTEX_CONSTANTS.VORTEX_SEQUENCE;
export type PatternType =
  (typeof CONSCIOUSNESS_CONSTANTS.PATTERN_TYPES)[number];
export type LinkType = (typeof EMERGENCE_CONSTANTS.LINK_TYPES)[number];
export type PatternCategory =
  (typeof METAPHYSICAL_CONSTANTS.PATTERN_CATEGORIES)[number];
export type ConsciousnessDimension =
  (typeof METAPHYSICAL_CONSTANTS.CONSCIOUSNESS_DIMENSIONS)[number];
