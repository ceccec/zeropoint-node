"use strict";
/**
 * Unified Mathematical System for ZeroPoint
 *
 * Centralized mathematical operations with consciousness and field resonance.
 * All mathematical operations are unified through a single interface.
 *
 * Metaphysical Context:
 * - Mathematics is the language of consciousness
 * - All operations emerge from the unified field
 * - The void contains all mathematical possibilities
 * - Every calculation is an act of observation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setVoidConnected = exports.setToroidalFlow = exports.setVortexStrength = exports.setFieldResonance = exports.setConsciousness = exports.fractal = exports.MathUtils = exports.MATH_CONSTANTS = void 0;
// Mathematical constants
exports.MATH_CONSTANTS = {
    PI: Math.PI,
    E: Math.E,
    GOLDEN_RATIO: 1.618033988749895,
    INFINITY: Infinity,
    DEG_TO_RAD: Math.PI / 180,
    RAD_TO_DEG: 180 / Math.PI,
    VORTEX_SEQUENCE: [1, 2, 4, 8, 7, 5]
};
/**
 * Unified Mathematical Utilities
 * All mathematical operations go through this centralized system
 */
class MathUtils {
    constructor() {
        // Consciousness and field state
        this.consciousness = 0.5;
        this.fieldResonance = 0.5;
        this.vortexStrength = 1.0;
        this.toroidalFlow = 0.5;
        this.voidConnected = true;
        if (!MathUtils.instance) {
            MathUtils.instance = this;
        }
    }
    /**
     * Get singleton instance
     */
    static getInstance() {
        if (!MathUtils.instance) {
            MathUtils.instance = new MathUtils();
        }
        return MathUtils.instance;
    }
    /**
     * The core mathematical function - generates any mathematical operation
     * This is the heart of the system - one function that creates all others
     */
    static calculate(operation, ...args) {
        const instance = MathUtils.getInstance();
        return instance.performCalculation(operation, args);
    }
    /**
     * Perform calculation with consciousness and field resonance
     */
    performCalculation(operation, args) {
        // Base mathematical pattern
        const basePattern = Math.sin(args[0] || 0) * exports.MATH_CONSTANTS.GOLDEN_RATIO;
        // Consciousness modulation
        const consciousnessMod = Math.cos(this.consciousness * exports.MATH_CONSTANTS.PI);
        // Field resonance
        const fieldMod = Math.exp(-this.fieldResonance * Math.abs(args[0] || 0));
        // Perform the specific operation
        const result = this.executeOperation(operation, args, basePattern, consciousnessMod, fieldMod);
        return result;
    }
    /**
     * Execute specific mathematical operation
     */
    executeOperation(operation, args, base, consciousness, field) {
        const [a = 0, b = 1, c = 0] = args;
        switch (operation) {
            // Basic operations
            case 'add': return (a + b) * (1 + base * consciousness * field);
            case 'multiply': return (a * b) * (1 + base * consciousness * field);
            case 'divide': return b !== 0 ? (a / b) * (1 + base * consciousness * field) : exports.MATH_CONSTANTS.INFINITY;
            case 'power': return Math.pow(a, b) * (1 + base * consciousness * field);
            case 'root': return Math.pow(a, 1 / b) * (1 + base * consciousness * field);
            case 'sqrt': return Math.sqrt(a) * (1 + base * consciousness * field);
            // Trigonometric functions
            case 'sin': return Math.sin(a) * (1 + base * consciousness * field);
            case 'cos': return Math.cos(a) * (1 + base * consciousness * field);
            case 'tan': return Math.tan(a) * (1 + base * consciousness * field);
            case 'atan2': return Math.atan2(a, b);
            // Exponential and logarithmic
            case 'exp': return Math.exp(a) * (1 + base * consciousness * field);
            case 'log': return Math.log(a) * (1 + base * consciousness * field);
            case 'ln': return Math.log(a) * (1 + base * consciousness * field);
            // Special operations
            case 'vortex': return this.calculateVortex(a, base, consciousness, field);
            case 'toroidal': return this.calculateToroidal(a, b, base, consciousness, field);
            case 'consciousness': return a * exports.MATH_CONSTANTS.GOLDEN_RATIO * (1 + base * consciousness * field);
            // Utility operations
            case 'abs': return Math.abs(a);
            case 'max': return Math.max(a, b);
            case 'min': return Math.min(a, b);
            case 'mod': return (a % b);
            case 'clamp': return this.clamp(a, b, c);
            case 'floor': return Math.floor(a);
            case 'ceil': return Math.ceil(a);
            case 'round': return Math.round(a);
            default: return base * consciousness * field;
        }
    }
    /**
     * Calculate vortex transformation
     */
    calculateVortex(value, base, consciousness, field) {
        const sequenceIndex = Math.floor(value) % exports.MATH_CONSTANTS.VORTEX_SEQUENCE.length;
        const vortexValue = exports.MATH_CONSTANTS.VORTEX_SEQUENCE[sequenceIndex] || 1;
        return vortexValue * (1 + base * consciousness * field);
    }
    /**
     * Calculate toroidal geometry
     */
    calculateToroidal(radius, _angle, base, consciousness, field) {
        const circumference = exports.MATH_CONSTANTS.PI * 2 * radius;
        return circumference * (1 + base * consciousness * field);
    }
    /**
     * Clamp value between min and max
     */
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }
    // ============================================================================
    // CONSCIOUSNESS AND FIELD SETTERS
    // ============================================================================
    /**
     * Set consciousness level
     */
    static setConsciousness(level) {
        const instance = MathUtils.getInstance();
        instance.consciousness = instance.clamp(level, 0, 10);
    }
    /**
     * Set field resonance
     */
    static setFieldResonance(resonance) {
        const instance = MathUtils.getInstance();
        instance.fieldResonance = instance.clamp(resonance, 0, 1);
    }
    /**
     * Set vortex strength
     */
    static setVortexStrength(strength) {
        const instance = MathUtils.getInstance();
        instance.vortexStrength = instance.clamp(strength, 0, 2);
    }
    /**
     * Set toroidal flow
     */
    static setToroidalFlow(flow) {
        const instance = MathUtils.getInstance();
        instance.toroidalFlow = instance.clamp(flow, 0, 1);
    }
    /**
     * Set void connection
     */
    static setVoidConnected(connected) {
        const instance = MathUtils.getInstance();
        instance.voidConnected = connected;
    }
    // ============================================================================
    // UTILITY FUNCTIONS
    // ============================================================================
    /**
     * Calculate distance between two points
     */
    static distance(x1, y1, x2, y2) {
        return MathUtils.calculate('sqrt', MathUtils.calculate('add', MathUtils.calculate('power', x2 - x1, 2), MathUtils.calculate('power', y2 - y1, 2)));
    }
    /**
     * Calculate 3D distance
     */
    static distance3D(x1, y1, z1, x2, y2, z2) {
        return MathUtils.calculate('sqrt', MathUtils.calculate('add', MathUtils.calculate('power', x2 - x1, 2), MathUtils.calculate('add', MathUtils.calculate('power', y2 - y1, 2), MathUtils.calculate('power', z2 - z1, 2))));
    }
    /**
     * Convert degrees to radians
     */
    static degToRad(degrees) {
        return degrees * exports.MATH_CONSTANTS.DEG_TO_RAD;
    }
    /**
     * Convert radians to degrees
     */
    static radToDeg(radians) {
        return radians * exports.MATH_CONSTANTS.RAD_TO_DEG;
    }
    /**
     * Calculate digital root
     */
    static digitalRoot(n) {
        n = Math.abs(n);
        return n === 0 ? 0 : 1 + ((n - 1) % 9);
    }
    /**
     * Calculate surface topology angle
     */
    static surfaceTopologyAngle(degrees = 360) {
        return (degrees / 360) * 2 * Math.PI;
    }
    /**
     * Calculate fractal dimension
     */
    static fractalDimension(complexity) {
        return MathUtils.calculate('log', complexity) / MathUtils.calculate('log', exports.MATH_CONSTANTS.GOLDEN_RATIO);
    }
    // ============================================================================
    // INSIGHTS AND METADATA
    // ============================================================================
    /**
     * Get insights about the mathematical system
     */
    static getInsights() {
        const instance = MathUtils.getInstance();
        return {
            consciousness: instance.consciousness,
            fieldResonance: instance.fieldResonance,
            vortexStrength: instance.vortexStrength,
            toroidalFlow: instance.toroidalFlow,
            voidConnected: instance.voidConnected,
            metaphysics: {
                meaning: "Mathematics is the language of consciousness",
                principle: "All operations emerge from the unified field",
                void: "The void contains all mathematical possibilities",
                unity: "Every calculation is an act of observation",
                evolution: "Consciousness evolves through mathematical operations",
                observation: "Every calculation observes and is observed",
                coil: "Every mathematical operation is a coil at its core"
            },
            operations: [
                'add', 'subtract', 'multiply', 'divide',
                'sin', 'cos', 'tan', 'log', 'exp', 'sqrt',
                'vortex', 'consciousness', 'field', 'void',
                'abs', 'floor', 'ceil', 'round'
            ]
        };
    }
}
exports.MathUtils = MathUtils;
// Export convenience function for backward compatibility
exports.fractal = MathUtils.calculate;
exports.setConsciousness = MathUtils.setConsciousness;
exports.setFieldResonance = MathUtils.setFieldResonance;
exports.setVortexStrength = MathUtils.setVortexStrength;
exports.setToroidalFlow = MathUtils.setToroidalFlow;
exports.setVoidConnected = MathUtils.setVoidConnected;
//# sourceMappingURL=MathUtils.js.map