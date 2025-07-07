"use strict";
/**
 * Shared Constants for ZeroPoint System
 *
 * Centralized repository of all mathematical and metaphysical constants
 * used across the ZeroPoint system to eliminate duplication and ensure consistency.
 *
 * This module embodies the principle of unity in diversity - all constants
 * are unified here while serving diverse purposes throughout the system.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantsUtils = exports.METAPHYSICAL_CONSTANTS = exports.MATH_CONSTANTS = exports.NETWORK_CONSTANTS = exports.EMERGENCE_CONSTANTS = exports.CONSCIOUSNESS_CONSTANTS = exports.VORTEX_CONSTANTS = void 0;
/**
 * Core Vortex Mathematics Constants
 */
exports.VORTEX_CONSTANTS = {
    // Fundamental vortex sequence (mobius circuit)
    VORTEX_SEQUENCE: [1, 2, 4, 8, 7, 5],
    // Golden ratio (divine proportion)
    GOLDEN_RATIO: 1.618033988749895,
    // Vortex center (W-axis over zero)
    VORTEX_CENTER: 9,
    // Family number groups (creative phases)
    FAMILY_NUMBER_GROUPS: [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
    // Polar mates (opposite poles that sum to 9)
    POLAR_MATES: [[1, 8], [2, 7], [4, 5]],
    // W-Axis (spiritual dimension)
    W_AXIS: [3, 6, 9],
    // Circle of fifths sequence
    CIRCLE_OF_FIFTHS_SEQUENCE: [9, 4, 8, 3, 7, 2, 6, 1, 5, 9],
    // Enneagram number pattern
    ENNEAGRAM_NUMBER_PATTERN: [1, 6, 5, 2, 9, 7, 4, 3, 8],
    // Four dimensional color coding system
    FOUR_DIMENSIONAL_COLOR_CODING_SYSTEM: ['red', 'blue', 'green', 'yellow', 'red']
};
/**
 * Consciousness Constants
 */
exports.CONSCIOUSNESS_CONSTANTS = {
    // Consciousness level ranges
    MIN_CONSCIOUSNESS_LEVEL: 0,
    MAX_CONSCIOUSNESS_LEVEL: 1,
    DEFAULT_CONSCIOUSNESS_LEVEL: 0.5,
    // Field strength ranges
    MIN_FIELD_STRENGTH: 0,
    MAX_FIELD_STRENGTH: 2,
    DEFAULT_FIELD_STRENGTH: 0.7,
    // Pattern types
    PATTERN_TYPES: ['thought', 'emotion', 'intention', 'memory', 'insight'],
    // Resonance thresholds
    MIN_RESONANCE_THRESHOLD: 0.3,
    OPTIMAL_RESONANCE_THRESHOLD: 0.7,
    // Field radius
    DEFAULT_FIELD_RADIUS: 1000
};
/**
 * Emergence Constants
 */
exports.EMERGENCE_CONSTANTS = {
    // App consciousness levels
    MIN_APP_CONSCIOUSNESS: 0,
    MAX_APP_CONSCIOUSNESS: 10,
    DEFAULT_APP_CONSCIOUSNESS: 5,
    // Vortex strength ranges
    MIN_VORTEX_STRENGTH: 0,
    MAX_VORTEX_STRENGTH: 10,
    DEFAULT_VORTEX_STRENGTH: 5,
    // Link types
    LINK_TYPES: ['resonance', 'consciousness', 'vortex', 'toroidal', 'void'],
    // Evolution factors
    CONSCIOUSNESS_EVOLUTION_FACTOR: 1.1,
    VORTEX_EVOLUTION_FACTOR: 1.05,
    PATTERN_DECAY_RATE: 0.01
};
/**
 * Network Constants
 */
exports.NETWORK_CONSTANTS = {
    // Connection limits
    DEFAULT_MAX_CONNECTIONS: 10,
    DEFAULT_CONNECTION_TIMEOUT: 5000,
    // Port ranges
    DEFAULT_NETWORK_PORT: 8080,
    MIN_PORT: 1024,
    MAX_PORT: 65535,
    // Discovery settings
    DEFAULT_DISCOVERY_ENABLED: true,
    DISCOVERY_TIMEOUT: 3000
};
/**
 * Mathematical Constants
 */
exports.MATH_CONSTANTS = {
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
    PRIMES: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
};
/**
 * Metaphysical Constants
 */
exports.METAPHYSICAL_CONSTANTS = {
    // Core principles
    PRINCIPLES: {
        VOID_FULLNESS: "Empty = Void = Full",
        TOROIDAL_UNITY: "All creation follows the donut shape of the universe",
        CONSCIOUSNESS_FLOW: "Consciousness flows through the toroidal structure",
        VORTEX_MATHEMATICS: "1-2-4-8-7-5 sequence guides all flow",
        GOLDEN_HARMONY: "Phi represents the divine proportion",
        ZERO_APERTURE: "Zero is the aperture between unmanifest and manifest"
    },
    // Pattern categories
    PATTERN_CATEGORIES: [
        'vortex', 'family', 'polar', 'spiritual', 'void',
        'mathematical', 'metaphysical', 'integration'
    ],
    // Consciousness dimensions
    CONSCIOUSNESS_DIMENSIONS: [
        'physical', 'emotional', 'mental', 'spiritual', 'void'
    ]
};
/**
 * Utility functions for working with constants
 */
class ConstantsUtils {
    /**
     * Get vortex sequence value at index
     */
    static getVortexSequenceValue(index) {
        const value = exports.VORTEX_CONSTANTS.VORTEX_SEQUENCE[index % exports.VORTEX_CONSTANTS.VORTEX_SEQUENCE.length];
        return value ?? 1; // Default to 1 if undefined
    }
    /**
     * Check if number is in W-Axis
     */
    static isWAxisNumber(num) {
        return exports.VORTEX_CONSTANTS.W_AXIS.includes(num);
    }
    /**
     * Find polar mate for a number
     */
    static getPolarMate(num) {
        for (const [a, b] of exports.VORTEX_CONSTANTS.POLAR_MATES) {
            if (a === num)
                return b;
            if (b === num)
                return a;
        }
        return null;
    }
    /**
     * Get family group for a number
     */
    static getFamilyGroup(num) {
        for (const group of exports.VORTEX_CONSTANTS.FAMILY_NUMBER_GROUPS) {
            if (group.includes(num)) {
                return [...group];
            }
        }
        return null;
    }
    /**
     * Calculate digital root
     */
    static digitalRoot(n) {
        if (n === 0)
            return 9; // In VBM, 0 = 9
        return n % 9 || 9;
    }
    /**
     * Normalize value to range
     */
    static normalize(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }
    /**
     * Check if value is within range
     */
    static isInRange(value, min, max) {
        return value >= min && value <= max;
    }
    /**
     * Get metaphysical insight for a constant
     */
    static getMetaphysicalInsight(constantName) {
        const insights = {
            VORTEX_SEQUENCE: "The 1-2-4-8-7-5 sequence creates the mobius circuit of infinite flow",
            GOLDEN_RATIO: "Phi represents the divine proportion that governs all natural growth patterns",
            W_AXIS: "The W-Axis is where Spirit emanates from, perpendicular to material flow",
            POLAR_MATES: "Polar mates represent the duality and balance inherent in creation",
            FAMILY_GROUPS: "Each family represents a different phase of the creative process",
            ZERO: "Zero is the center of the torus where all patterns converge"
        };
        return insights[constantName] || "This constant embodies a fundamental pattern of creation";
    }
}
exports.ConstantsUtils = ConstantsUtils;
//# sourceMappingURL=SharedConstants.js.map