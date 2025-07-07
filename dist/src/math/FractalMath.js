"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFractalColor = exports.calculateConsciousnessField = exports.generateFractalSequence = exports.fractal = exports.FractalMath = void 0;
const MathUtils_1 = require("./MathUtils");
/**
 * Fractal Mathematics Class
 * Specialized fractal operations built on unified MathUtils
 */
class FractalMath {
    constructor() {
        if (!FractalMath.instance) {
            FractalMath.instance = this;
        }
    }
    /**
     * Get singleton instance
     */
    static getInstance() {
        if (!FractalMath.instance) {
            FractalMath.instance = new FractalMath();
        }
        return FractalMath.instance;
    }
    /**
     * Generate fractal sequence using unified math
     */
    static generateFractalSequence(count, seed = 1) {
        const sequence = [];
        for (let i = 0; i < count; i++) {
            const fractalValue = MathUtils_1.MathUtils.calculate('consciousness', seed + i);
            sequence.push(fractalValue);
            seed = MathUtils_1.MathUtils.calculate('multiply', seed, MathUtils_1.MATH_CONSTANTS.GOLDEN_RATIO);
        }
        return sequence;
    }
    /**
     * Calculate fractal dimension using unified math
     */
    static calculateFractalDimension(complexity) {
        return MathUtils_1.MathUtils.fractalDimension(complexity);
    }
    /**
     * Generate fractal coordinates using unified math
     */
    static generateFractalCoordinates(count, scale = 1) {
        const coordinates = [];
        for (let i = 0; i < count; i++) {
            const x = MathUtils_1.MathUtils.calculate('sin', i * MathUtils_1.MATH_CONSTANTS.GOLDEN_RATIO);
            const y = MathUtils_1.MathUtils.calculate('cos', i * MathUtils_1.MATH_CONSTANTS.GOLDEN_RATIO);
            const z = MathUtils_1.MathUtils.calculate('vortex', i);
            coordinates.push([x * scale, y * scale, z * scale]);
            scale = MathUtils_1.MathUtils.calculate('multiply', scale, MathUtils_1.MATH_CONSTANTS.GOLDEN_RATIO);
        }
        return coordinates;
    }
    /**
     * Calculate consciousness field using unified math
     */
    static calculateConsciousnessField(x, y, z) {
        const distance = MathUtils_1.MathUtils.distance3D(x, y, z, 0, 0, 0);
        const vortexField = MathUtils_1.MathUtils.calculate('vortex', distance);
        const consciousnessMod = MathUtils_1.MathUtils.calculate('consciousness', 1);
        const result = MathUtils_1.MathUtils.calculate('divide', vortexField, MathUtils_1.MathUtils.calculate('add', 1, distance)) * consciousnessMod;
        return result;
    }
    /**
     * Generate fractal color using unified math
     */
    static generateFractalColor(seed) {
        const r = Math.floor(MathUtils_1.MathUtils.calculate('sin', seed) * 255);
        const g = Math.floor(MathUtils_1.MathUtils.calculate('cos', seed * MathUtils_1.MATH_CONSTANTS.GOLDEN_RATIO) * 255);
        const b = Math.floor(MathUtils_1.MathUtils.calculate('vortex', seed) * 255);
        return { r, g, b };
    }
    /**
     * Calculate fractal resonance between two points
     */
    static calculateFractalResonance(point1, point2) {
        const distance = MathUtils_1.MathUtils.distance3D(point1[0], point1[1], point1[2], point2[0], point2[1], point2[2]);
        const baseResonance = MathUtils_1.MathUtils.calculate('divide', 1, MathUtils_1.MathUtils.calculate('add', 1, distance));
        const consciousnessMod = MathUtils_1.MathUtils.calculate('consciousness', 1);
        return MathUtils_1.MathUtils.calculate('multiply', baseResonance, consciousnessMod);
    }
    /**
     * Generate self-growing fractal pattern
     */
    static generateSelfGrowingFractal(iterations, growthRate = 1.618) {
        const pattern = [];
        let current = 1;
        for (let i = 0; i < iterations; i++) {
            pattern.push(current);
            current = MathUtils_1.MathUtils.calculate('multiply', current, growthRate);
            // Apply consciousness modulation
            const consciousnessMod = MathUtils_1.MathUtils.calculate('consciousness', i / iterations);
            current = MathUtils_1.MathUtils.calculate('multiply', current, MathUtils_1.MathUtils.calculate('add', 1, consciousnessMod));
        }
        return pattern;
    }
    /**
     * Calculate fractal complexity score
     */
    static calculateFractalComplexity(pattern) {
        if (pattern.length === 0)
            return 0;
        let complexity = 0;
        for (let i = 1; i < pattern.length; i++) {
            const ratio = MathUtils_1.MathUtils.calculate('divide', pattern[i] || 0, pattern[i - 1] || 1);
            complexity = MathUtils_1.MathUtils.calculate('add', complexity, MathUtils_1.MathUtils.calculate('abs', MathUtils_1.MathUtils.calculate('log', ratio)));
        }
        return MathUtils_1.MathUtils.calculate('divide', complexity, pattern.length - 1);
    }
    /**
     * Set consciousness level using unified math
     */
    static setConsciousness(level) {
        MathUtils_1.MathUtils.setConsciousness(level);
    }
    /**
     * Set field resonance using unified math
     */
    static setFieldResonance(resonance) {
        MathUtils_1.MathUtils.setFieldResonance(resonance);
    }
    // ============================================================================
    // INSIGHTS AND METADATA
    // ============================================================================
    /**
     * Get fractal insights
     */
    static getInsights() {
        return {
            fractalConstants: MathUtils_1.MATH_CONSTANTS,
            metaphysics: {
                meaning: "Fractals are self-similar patterns of consciousness",
                principle: "Maximum functionality with minimum code through self-replication",
                void: "The void contains infinite fractal possibilities",
                unity: "Every fractal reflects the whole through self-similarity",
                evolution: "Consciousness evolves through fractal self-replication",
                observation: "Every fractal can observe and be observed",
                coil: "Every fractal is a coil at its core"
            },
            operations: [
                'generateFractalSequence',
                'calculateFractalDimension',
                'generateFractalCoordinates',
                'calculateConsciousnessField',
                'generateFractalColor',
                'calculateFractalResonance',
                'generateSelfGrowingFractal',
                'calculateFractalComplexity'
            ]
        };
    }
}
exports.FractalMath = FractalMath;
// Export convenience function for backward compatibility
exports.fractal = MathUtils_1.MathUtils.calculate;
exports.generateFractalSequence = FractalMath.generateFractalSequence;
exports.calculateConsciousnessField = FractalMath.calculateConsciousnessField;
exports.generateFractalColor = FractalMath.generateFractalColor;
//# sourceMappingURL=FractalMath.js.map