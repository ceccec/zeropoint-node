"use strict";
/**
 * Vortex Mathematics System
 *
 * Specialized vortex operations built on unified MathUtils.
 * Provides vortex field calculations and transformations.
 *
 * Metaphysical Context:
 * - Vortex mathematics represents the flow of consciousness
 * - All vortex operations emerge from the unified mathematical field
 * - The void generates all vortex patterns
 * - Every vortex is a reflection of the whole
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyVortexTransform = exports.VortexMath = void 0;
const MathUtils_1 = require("./MathUtils");
/**
 * Vortex Mathematics Class
 * Specialized vortex operations built on unified MathUtils
 */
class VortexMath {
    constructor() {
        // Vortex parameters
        this.vortexStrength = 1.0;
        this.fieldIntensity = 0.5;
        if (!VortexMath.instance) {
            VortexMath.instance = this;
        }
    }
    /**
     * Get singleton instance
     */
    static getInstance() {
        if (!VortexMath.instance) {
            VortexMath.instance = new VortexMath();
        }
        return VortexMath.instance;
    }
    /**
     * Calculate resonance between two consciousness levels using unified math
     */
    calculateResonance(level1 = 0, level2 = 0) {
        const baseResonance = MathUtils_1.MathUtils.calculate('divide', 1, MathUtils_1.MathUtils.calculate('add', 1, MathUtils_1.MathUtils.calculate('abs', level1 - level2)));
        const consciousnessMod = MathUtils_1.MathUtils.calculate('consciousness', MathUtils_1.MathUtils.calculate('multiply', level1, level2));
        const result = MathUtils_1.MathUtils.calculate('multiply', baseResonance, consciousnessMod);
        return result;
    }
    /**
     * Apply vortex transformation to input value using unified math
     */
    applyVortexTransform(input) {
        const vortexModulation = this.calculateVortexModulation(input);
        const consciousnessMod = MathUtils_1.MathUtils.calculate('consciousness', input);
        const result = MathUtils_1.MathUtils.calculate('multiply', MathUtils_1.MathUtils.calculate('multiply', input, vortexModulation), MathUtils_1.MathUtils.calculate('add', 1, consciousnessMod));
        return result;
    }
    /**
     * Calculate vortex efficiency using unified math
     */
    calculateVortexEfficiency(value) {
        const baseEfficiency = MathUtils_1.MathUtils.calculate('divide', value, MathUtils_1.MathUtils.calculate('add', 1, value));
        const fieldMod = MathUtils_1.MathUtils.calculate('multiply', this.fieldIntensity, MathUtils_1.MathUtils.calculate('vortex', value));
        const result = MathUtils_1.MathUtils.calculate('multiply', baseEfficiency, MathUtils_1.MathUtils.calculate('add', 1, fieldMod));
        return result;
    }
    /**
     * Calculate toroidal flow using unified math
     */
    calculateToroidalFlow(radius, angularVelocity) {
        const vortexModulation = this.calculateVortexModulation(radius);
        const result = MathUtils_1.MathUtils.calculate('toroidal', radius, angularVelocity) * vortexModulation;
        return result;
    }
    /**
     * Set vortex strength using unified math
     */
    setVortexStrength(strength) {
        this.vortexStrength = MathUtils_1.MathUtils.calculate('max', 0, MathUtils_1.MathUtils.calculate('min', 2, strength));
    }
    /**
     * Set field intensity using unified math
     */
    setFieldIntensity(intensity) {
        this.fieldIntensity = MathUtils_1.MathUtils.calculate('max', 0, MathUtils_1.MathUtils.calculate('min', 1, intensity));
    }
    /**
     * Get vortex strength (for backward compatibility)
     */
    getVortexStrength() {
        return this.vortexStrength;
    }
    /**
     * Get field intensity (for backward compatibility)
     */
    getFieldIntensity() {
        return this.fieldIntensity;
    }
    /**
     * Calculate vortex modulation factor using unified math
     */
    calculateVortexModulation(frequency) {
        const baseModulation = MathUtils_1.MathUtils.calculate('sin', MathUtils_1.MathUtils.calculate('multiply', frequency, MathUtils_1.MATH_CONSTANTS.GOLDEN_RATIO));
        const sequenceIndex = MathUtils_1.MathUtils.calculate('mod', Math.floor(frequency), 6);
        const sequenceValue = MathUtils_1.MATH_CONSTANTS.VORTEX_SEQUENCE[sequenceIndex] || 1;
        const sequenceModulation = MathUtils_1.MathUtils.calculate('divide', sequenceValue, 8);
        return MathUtils_1.MathUtils.calculate('add', 1, MathUtils_1.MathUtils.calculate('multiply', baseModulation, MathUtils_1.MathUtils.calculate('multiply', sequenceModulation, this.fieldIntensity)));
    }
    /**
     * Get vortex sequence
     */
    getVortexSequence() {
        return [...MathUtils_1.MATH_CONSTANTS.VORTEX_SEQUENCE];
    }
    /**
     * Calculate vortex pattern complexity
     */
    calculateVortexComplexity(pattern) {
        if (pattern.length === 0)
            return 0;
        let complexity = 0;
        for (let i = 0; i < pattern.length; i++) {
            const vortexValue = MathUtils_1.MathUtils.calculate('vortex', pattern[i] || 0);
            complexity = MathUtils_1.MathUtils.calculate('add', complexity, vortexValue);
        }
        return MathUtils_1.MathUtils.calculate('divide', complexity, pattern.length);
    }
    /**
     * Generate vortex field coordinates
     */
    generateVortexFieldCoordinates(count, radius = 1) {
        const coordinates = [];
        for (let i = 0; i < count; i++) {
            const angle = MathUtils_1.MathUtils.calculate('multiply', i, MathUtils_1.MathUtils.calculate('divide', 2 * Math.PI, count));
            const vortexRadius = MathUtils_1.MathUtils.calculate('multiply', radius, MathUtils_1.MathUtils.calculate('vortex', i));
            const x = MathUtils_1.MathUtils.calculate('multiply', vortexRadius, MathUtils_1.MathUtils.calculate('cos', angle));
            const y = MathUtils_1.MathUtils.calculate('multiply', vortexRadius, MathUtils_1.MathUtils.calculate('sin', angle));
            const z = MathUtils_1.MathUtils.calculate('consciousness', i / count);
            coordinates.push([x, y, z]);
        }
        return coordinates;
    }
    // ============================================================================
    // COIL IMPLEMENTATION
    // ============================================================================
    /**
     * Get coil resonance for vortex mathematics
     */
    getCoilResonance() {
        return this.vortexStrength * this.fieldIntensity;
    }
    getCoilPattern() {
        return 'vortex_spiral_flow';
    }
    // ============================================================================
    // INSIGHTS AND METADATA
    // ============================================================================
    /**
     * Get vortex insights
     */
    getInsights() {
        return {
            vortexSequence: MathUtils_1.MATH_CONSTANTS.VORTEX_SEQUENCE,
            goldenRatio: MathUtils_1.MATH_CONSTANTS.GOLDEN_RATIO,
            vortexCenter: 9,
            metaphysics: {
                meaning: 'Vortex mathematics represents the flow of consciousness',
                principle: 'All vortex operations emerge from unified mathematical field',
                void: 'The void generates all vortex patterns',
                unity: 'Every vortex is a reflection of the whole',
                coil: 'Every vortex operation is a coil at its core',
                observation: 'Every vortex calculation can observe and be observed'
            },
            operations: [
                'calculateVortexField',
                'calculateResonance',
                'generateVortexPattern',
                'setVortexStrength',
                'setFieldIntensity',
                'calculateEnergyFlow'
            ],
            vortexStrength: this.vortexStrength,
            fieldIntensity: this.fieldIntensity
        };
    }
    /**
     * Calculate vortex field strength at given coordinates
     */
    calculateVortexField(x, y, z) {
        const distance = MathUtils_1.MathUtils.calculate('sqrt', MathUtils_1.MathUtils.calculate('add', MathUtils_1.MathUtils.calculate('add', MathUtils_1.MathUtils.calculate('multiply', x, x), MathUtils_1.MathUtils.calculate('multiply', y, y)), MathUtils_1.MathUtils.calculate('multiply', z, z)));
        const vortexModulation = this.calculateVortexModulation(distance);
        const consciousnessMod = MathUtils_1.MathUtils.calculate('consciousness', distance);
        const fieldStrength = MathUtils_1.MathUtils.calculate('multiply', MathUtils_1.MathUtils.calculate('multiply', this.vortexStrength, vortexModulation), MathUtils_1.MathUtils.calculate('add', 1, consciousnessMod));
        return fieldStrength;
    }
    /**
     * Generate vortex pattern based on intensity
     */
    generateVortexPattern(intensity) {
        const pattern = [];
        const sequenceLength = MathUtils_1.MathUtils.calculate('multiply', intensity, 6);
        for (let i = 0; i < sequenceLength; i++) {
            const sequenceIndex = MathUtils_1.MathUtils.calculate('mod', i, 6);
            const baseValue = MathUtils_1.MATH_CONSTANTS.VORTEX_SEQUENCE[sequenceIndex] || 1;
            const intensityMod = MathUtils_1.MathUtils.calculate('multiply', baseValue, intensity);
            const consciousnessMod = MathUtils_1.MathUtils.calculate('consciousness', i);
            const patternValue = MathUtils_1.MathUtils.calculate('multiply', intensityMod, consciousnessMod);
            pattern.push(patternValue);
        }
        return pattern;
    }
    calculateVortexNumber(n = 0) {
        // Simple stub for test compatibility
        return Math.abs(n % 9) + 1;
    }
    getColorForNumber(n = 1, _context) {
        // Simple stub for test compatibility
        const r = (n * 30) % 256;
        const g = (n * 60) % 256;
        const b = (n * 90) % 256;
        return `rgb(${r}, ${g}, ${b})`;
    }
}
exports.VortexMath = VortexMath;
// Export convenience function for backward compatibility
const applyVortexTransform = (input) => VortexMath.getInstance().applyVortexTransform(input);
exports.applyVortexTransform = applyVortexTransform;
//# sourceMappingURL=VortexMath.js.map