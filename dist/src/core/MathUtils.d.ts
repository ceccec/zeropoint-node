/**
 * Unified Mathematical Utilities for ZeroPoint System
 *
 * Centralized mathematical operations and calculations used across
 * all ZeroPoint modules to eliminate duplication and ensure consistency.
 *
 * This module embodies the principle of mathematical unity - all
 * calculations follow the same underlying patterns and principles.
 */
/**
 * Core mathematical operations
 */
export declare class MathUtils {
    /**
     * Calculate distance between two points in 3D space
     */
    static distance3D(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number;
    /**
     * Calculate distance between two points in 2D space
     */
    static distance2D(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * Calculate angle between two points
     */
    static angleBetweenPoints(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * Normalize angle to 0-2π range
     */
    static normalizeAngle(angle: number): number;
    /**
     * Convert degrees to radians
     */
    static degreesToRadians(degrees: number): number;
    /**
     * Convert radians to degrees
     */
    static radiansToDegrees(radians: number): number;
    /**
     * Calculate exponential decay
     */
    static exponentialDecay(value: number, decayRate: number, time: number): number;
    /**
     * Calculate harmonic resonance between two frequencies
     */
    static harmonicResonance(freq1: number, freq2: number, strength?: number): number;
    /**
     * Apply vortex transform to a value
     */
    static applyVortexTransform(value: number): number;
    /**
     * Calculate vortex field strength at a point
     */
    static calculateVortexField(x: number, y: number, z: number, vortexStrength?: number, fieldIntensity?: number): number;
    /**
     * Calculate toroidal flow rate
     */
    static calculateToroidalFlow(radius: number, angularVelocity: number, vortexModulation?: number): number;
    /**
     * Calculate Fibonacci sequence up to n terms
     */
    static fibonacciSequence(n: number): number[];
    /**
     * Calculate prime squared value
     */
    static primeSquared(prime: number): number;
    /**
     * Calculate discrete multiplication (VBM style)
     */
    static discreteMultiplication(n: number): number;
    /**
     * Calculate electron harmonic shear identification
     */
    static electronHarmonicShearIdentification(a: number, b: number): number;
    /**
     * Calculate surface topology angle
     */
    static surfaceTopologyAngle(degrees?: number): number;
    /**
     * Generate vortex pattern
     */
    static generateVortexPattern(complexity?: number): number[];
    /**
     * Calculate energy flow through vortex
     */
    static calculateEnergyFlow(input: number, vortexEfficiency?: number): number;
    /**
     * Calculate resonance between two consciousness levels
     */
    static calculateConsciousnessResonance(level1: number, level2: number, vortexStrength?: number): number;
    /**
     * Calculate field density at a point
     */
    static calculateFieldDensity(x: number, y: number, z: number, fieldStrength: number, fieldRadius: number, patternContributions?: number[]): number;
    /**
     * Interpolate between two values
     */
    static interpolate(value1: number, value2: number, factor: number): number;
    /**
     * Clamp value to range
     */
    static clamp(value: number, min: number, max: number): number;
    /**
     * Check if two numbers are approximately equal
     */
    static approximatelyEqual(a: number, b: number, epsilon?: number): boolean;
    /**
     * Calculate weighted average
     */
    static weightedAverage(values: number[], weights: number[]): number;
    /**
     * Calculate standard deviation
     */
    static standardDeviation(values: number[]): number;
    /**
     * Generate random number in range
     */
    static randomInRange(min: number, max: number): number;
    /**
     * Generate random integer in range
     */
    static randomIntInRange(min: number, max: number): number;
    /**
     * Calculate factorial
     */
    static factorial(n: number): number;
    /**
     * Calculate combinations (n choose k)
     */
    static combinations(n: number, k: number): number;
    /**
     * Calculate permutations (n permute k)
     */
    static permutations(n: number, k: number): number;
}
//# sourceMappingURL=MathUtils.d.ts.map