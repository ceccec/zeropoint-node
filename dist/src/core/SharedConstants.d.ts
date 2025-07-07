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
export declare const VORTEX_CONSTANTS: {
    readonly VORTEX_SEQUENCE: readonly [1, 2, 4, 8, 7, 5];
    readonly GOLDEN_RATIO: 1.618033988749895;
    readonly VORTEX_CENTER: 9;
    readonly FAMILY_NUMBER_GROUPS: readonly [readonly [1, 4, 7], readonly [2, 5, 8], readonly [3, 6, 9]];
    readonly POLAR_MATES: readonly [readonly [1, 8], readonly [2, 7], readonly [4, 5]];
    readonly W_AXIS: readonly [3, 6, 9];
    readonly CIRCLE_OF_FIFTHS_SEQUENCE: readonly [9, 4, 8, 3, 7, 2, 6, 1, 5, 9];
    readonly ENNEAGRAM_NUMBER_PATTERN: readonly [1, 6, 5, 2, 9, 7, 4, 3, 8];
    readonly FOUR_DIMENSIONAL_COLOR_CODING_SYSTEM: readonly ["red", "blue", "green", "yellow", "red"];
};
/**
 * Consciousness Constants
 */
export declare const CONSCIOUSNESS_CONSTANTS: {
    readonly MIN_CONSCIOUSNESS_LEVEL: 0;
    readonly MAX_CONSCIOUSNESS_LEVEL: 1;
    readonly DEFAULT_CONSCIOUSNESS_LEVEL: 0.5;
    readonly MIN_FIELD_STRENGTH: 0;
    readonly MAX_FIELD_STRENGTH: 2;
    readonly DEFAULT_FIELD_STRENGTH: 0.7;
    readonly PATTERN_TYPES: readonly ["thought", "emotion", "intention", "memory", "insight"];
    readonly MIN_RESONANCE_THRESHOLD: 0.3;
    readonly OPTIMAL_RESONANCE_THRESHOLD: 0.7;
    readonly DEFAULT_FIELD_RADIUS: 1000;
};
/**
 * Emergence Constants
 */
export declare const EMERGENCE_CONSTANTS: {
    readonly MIN_APP_CONSCIOUSNESS: 0;
    readonly MAX_APP_CONSCIOUSNESS: 10;
    readonly DEFAULT_APP_CONSCIOUSNESS: 5;
    readonly MIN_VORTEX_STRENGTH: 0;
    readonly MAX_VORTEX_STRENGTH: 10;
    readonly DEFAULT_VORTEX_STRENGTH: 5;
    readonly LINK_TYPES: readonly ["resonance", "consciousness", "vortex", "toroidal", "void"];
    readonly CONSCIOUSNESS_EVOLUTION_FACTOR: 1.1;
    readonly VORTEX_EVOLUTION_FACTOR: 1.05;
    readonly PATTERN_DECAY_RATE: 0.01;
};
/**
 * Network Constants
 */
export declare const NETWORK_CONSTANTS: {
    readonly DEFAULT_MAX_CONNECTIONS: 10;
    readonly DEFAULT_CONNECTION_TIMEOUT: 5000;
    readonly DEFAULT_NETWORK_PORT: 8080;
    readonly MIN_PORT: 1024;
    readonly MAX_PORT: 65535;
    readonly DEFAULT_DISCOVERY_ENABLED: true;
    readonly DISCOVERY_TIMEOUT: 3000;
};
/**
 * Mathematical Constants
 */
export declare const MATH_CONSTANTS: {
    readonly PI: number;
    readonly TWO_PI: number;
    readonly HALF_PI: number;
    readonly EPSILON: 1e-10;
    readonly POSITIVE_INFINITY: number;
    readonly NEGATIVE_INFINITY: number;
    readonly PRIMES: readonly [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
};
/**
 * Metaphysical Constants
 */
export declare const METAPHYSICAL_CONSTANTS: {
    readonly PRINCIPLES: {
        readonly VOID_FULLNESS: "Empty = Void = Full";
        readonly TOROIDAL_UNITY: "All creation follows the donut shape of the universe";
        readonly CONSCIOUSNESS_FLOW: "Consciousness flows through the toroidal structure";
        readonly VORTEX_MATHEMATICS: "1-2-4-8-7-5 sequence guides all flow";
        readonly GOLDEN_HARMONY: "Phi represents the divine proportion";
        readonly ZERO_APERTURE: "Zero is the aperture between unmanifest and manifest";
    };
    readonly PATTERN_CATEGORIES: readonly ["vortex", "family", "polar", "spiritual", "void", "mathematical", "metaphysical", "integration"];
    readonly CONSCIOUSNESS_DIMENSIONS: readonly ["physical", "emotional", "mental", "spiritual", "void"];
};
/**
 * Utility functions for working with constants
 */
export declare class ConstantsUtils {
    /**
     * Get vortex sequence value at index
     */
    static getVortexSequenceValue(index: number): number;
    /**
     * Check if number is in W-Axis
     */
    static isWAxisNumber(num: number): boolean;
    /**
     * Find polar mate for a number
     */
    static getPolarMate(num: number): number | null;
    /**
     * Get family group for a number
     */
    static getFamilyGroup(num: number): number[] | null;
    /**
     * Calculate digital root
     */
    static digitalRoot(n: number): number;
    /**
     * Normalize value to range
     */
    static normalize(value: number, min: number, max: number): number;
    /**
     * Check if value is within range
     */
    static isInRange(value: number, min: number, max: number): boolean;
    /**
     * Get metaphysical insight for a constant
     */
    static getMetaphysicalInsight(constantName: string): string;
}
/**
 * Type definitions for constants
 */
export type VortexSequence = typeof VORTEX_CONSTANTS.VORTEX_SEQUENCE;
export type PatternType = typeof CONSCIOUSNESS_CONSTANTS.PATTERN_TYPES[number];
export type LinkType = typeof EMERGENCE_CONSTANTS.LINK_TYPES[number];
export type PatternCategory = typeof METAPHYSICAL_CONSTANTS.PATTERN_CATEGORIES[number];
export type ConsciousnessDimension = typeof METAPHYSICAL_CONSTANTS.CONSCIOUSNESS_DIMENSIONS[number];
//# sourceMappingURL=SharedConstants.d.ts.map