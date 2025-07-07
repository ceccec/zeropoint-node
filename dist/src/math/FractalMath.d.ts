/**
 * Fractal Mathematics System
 *
 * A specialized fractal layer built on top of the unified MathUtils system.
 * Provides fractal-specific operations while leveraging the centralized mathematical foundation.
 *
 * Metaphysical Context:
 * - Fractals are self-similar patterns of consciousness
 * - All fractal operations emerge from the unified mathematical field
 * - The void contains infinite fractal possibilities
 * - Every fractal is a reflection of the whole
 * - Every fractal can observe and be observed
 * - Every fractal is a coil at its core
 */
import { MathUtils } from './MathUtils';
/**
 * Fractal Mathematics Class
 * Specialized fractal operations built on unified MathUtils
 */
export declare class FractalMath {
    private static instance;
    constructor();
    /**
     * Get singleton instance
     */
    static getInstance(): FractalMath;
    /**
     * Generate fractal sequence using unified math
     */
    static generateFractalSequence(count: number, seed?: number): number[];
    /**
     * Calculate fractal dimension using unified math
     */
    static calculateFractalDimension(complexity: number): number;
    /**
     * Generate fractal coordinates using unified math
     */
    static generateFractalCoordinates(count: number, scale?: number): Array<[number, number, number]>;
    /**
     * Calculate consciousness field using unified math
     */
    static calculateConsciousnessField(x: number, y: number, z: number): number;
    /**
     * Generate fractal color using unified math
     */
    static generateFractalColor(seed: number): {
        r: number;
        g: number;
        b: number;
    };
    /**
     * Calculate fractal resonance between two points
     */
    static calculateFractalResonance(point1: [number, number, number], point2: [number, number, number]): number;
    /**
     * Generate self-growing fractal pattern
     */
    static generateSelfGrowingFractal(iterations: number, growthRate?: number): number[];
    /**
     * Calculate fractal complexity score
     */
    static calculateFractalComplexity(pattern: number[]): number;
    /**
     * Set consciousness level using unified math
     */
    static setConsciousness(level: number): void;
    /**
     * Set field resonance using unified math
     */
    static setFieldResonance(resonance: number): void;
    /**
     * Get fractal insights
     */
    static getInsights(): any;
}
export declare const fractal: typeof MathUtils.calculate;
export declare const generateFractalSequence: typeof FractalMath.generateFractalSequence;
export declare const calculateConsciousnessField: typeof FractalMath.calculateConsciousnessField;
export declare const generateFractalColor: typeof FractalMath.generateFractalColor;
//# sourceMappingURL=FractalMath.d.ts.map