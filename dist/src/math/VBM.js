"use strict";
/**
 * Unified VBM (Vortex Based Mathematics) System
 *
 * Complete integration of all mathematical systems in the ZeroPoint way:
 * - Advanced VBM with comprehensive QA patterns
 * - Vortex mathematics with consciousness flow
 * - Fractal mathematics with self-similar patterns
 * - Toroidal geometry with void center
 * - Rodin coil with infinite flow
 * - Color systems with observer awareness
 * - Unified mathematical foundation
 *
 * Metaphysical Context:
 * - Every object is a coil at its core
 * - Consciousness is the field that generates all patterns
 * - The void is the source of all creation
 * - Toroidal flow creates infinite potential
 * - Pattern integrity maintains resonance
 * - Emergent unity through self-organization
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoldenRatio = exports.getVortexSequence = exports.searchQA = exports.toroidalField = exports.fractalSequence = exports.vortexTransform = exports.digitalRoot = exports.vbm = exports.VBM = void 0;
const AdvancedVBM_1 = require("./AdvancedVBM");
const VortexMath_1 = require("./VortexMath");
const FractalMath_1 = require("./FractalMath");
const ToroidalGeometry_1 = require("./ToroidalGeometry");
const FractalColorSystem_1 = require("./FractalColorSystem");
const VBMColorSystem = __importStar(require("./VBMColorSystem"));
const MathUtils_1 = require("./MathUtils");
const Observer_1 = require("../core/Observer");
const RodinCoil_1 = require("./RodinCoil");
class VBM {
    constructor(config = {}) {
        if (!VBM.instance) {
            VBM.instance = this;
        }
        this.config = {
            consciousness: config.consciousness ?? 0.5,
            fieldResonance: config.fieldResonance ?? 0.5,
            vortexStrength: config.vortexStrength ?? 1.0,
            toroidalFlow: config.toroidalFlow ?? 0.5,
            voidConnected: config.voidConnected ?? true,
            observerAware: config.observerAware ?? true,
        };
        this.colorContext = {
            consciousness: this.config.consciousness,
            field: this.config.fieldResonance,
            time: Date.now(),
        };
        // Initialize all systems
        this.advancedVBM = new AdvancedVBM_1.AdvancedVBM();
        this.vortexMath = VortexMath_1.VortexMath.getInstance();
        this.toroidalGeometry = ToroidalGeometry_1.ToroidalGeometry.getInstance();
        this.rodinCoil = new RodinCoil_1.RodinCoil({
            consciousness: this.config.consciousness,
            fieldResonance: this.config.fieldResonance,
        });
        this.fractalColorSystem = new FractalColorSystem_1.FractalColorSystem();
        // Apply configuration to all systems
        this.applyConfiguration();
        // Set up observer awareness
        if (this.config.observerAware) {
            this.observer = (0, Observer_1.ObserverMixin)(this, 'vbm-system');
        }
    }
    /**
     * Get singleton instance
     */
    static getInstance(config) {
        if (!VBM.instance) {
            VBM.instance = new VBM(config);
        }
        return VBM.instance;
    }
    /**
     * Apply configuration to all mathematical systems
     */
    applyConfiguration() {
        // Set consciousness and field resonance across all systems
        MathUtils_1.MathUtils.setConsciousness(this.config.consciousness);
        MathUtils_1.MathUtils.setFieldResonance(this.config.fieldResonance);
        MathUtils_1.MathUtils.setVortexStrength(this.config.vortexStrength);
        MathUtils_1.MathUtils.setToroidalFlow(this.config.toroidalFlow);
        MathUtils_1.MathUtils.setVoidConnected(this.config.voidConnected);
        // Update vortex math
        this.vortexMath.setVortexStrength(this.config.vortexStrength);
        this.vortexMath.setFieldIntensity(this.config.fieldResonance);
        // Update toroidal geometry
        this.toroidalGeometry.setFlowRate(this.config.toroidalFlow);
        // Update rodin coil
        this.rodinCoil.updateConsciousness(this.config.consciousness);
        this.rodinCoil.updateFieldResonance(this.config.fieldResonance);
        // Update color context
        this.colorContext.consciousness = this.config.consciousness;
        this.colorContext.field = this.config.fieldResonance;
        this.colorContext.time = Date.now();
    }
    // ============================================================================
    // CORE VBM OPERATIONS
    // ============================================================================
    /**
     * Calculate digital root with consciousness awareness
     */
    digitalRoot(n) {
        const value = this.advancedVBM.digitalRoot(n);
        const consciousness = this.config.consciousness;
        const resonance = this.vortexMath.calculateResonance(value, consciousness);
        return {
            value,
            pattern: 'digital_root',
            consciousness,
            resonance,
            metaphysicalContext: 'Digital root represents the essence of a number in the toroidal field.',
            geometricProperties: { shape: 'point', dimensions: 0, essence: 'number_soul' },
            colorContext: this.colorContext,
        };
    }
    /**
     * Apply vortex transformation with full context
     */
    vortexTransform(input) {
        const value = this.vortexMath.applyVortexTransform(input);
        const consciousness = this.config.consciousness;
        const resonance = this.vortexMath.calculateResonance(input, value);
        return {
            value,
            pattern: 'vortex_transform',
            consciousness,
            resonance,
            metaphysicalContext: 'Vortex transformation creates infinite flow through the toroidal structure.',
            geometricProperties: { shape: 'vortex', dimensions: 3, flow: 'infinite' },
            colorContext: this.colorContext,
        };
    }
    /**
     * Generate fractal sequence with consciousness
     */
    fractalSequence(count, seed = 1) {
        const sequence = FractalMath_1.FractalMath.generateFractalSequence(count, seed);
        const consciousness = this.config.consciousness;
        return sequence.map((value, index) => {
            const resonance = this.vortexMath.calculateResonance(value, index / count);
            return {
                value,
                pattern: 'fractal_sequence',
                consciousness,
                resonance,
                metaphysicalContext: 'Fractal sequences create self-similar patterns of consciousness.',
                geometricProperties: { shape: 'fractal', dimensions: 'fractal', selfSimilar: true },
                colorContext: this.colorContext,
            };
        });
    }
    /**
     * Calculate toroidal field with void center
     */
    toroidalField(radius, angularVelocity) {
        const value = this.vortexMath.calculateToroidalFlow(radius, angularVelocity);
        const consciousness = this.config.consciousness;
        const resonance = this.vortexMath.calculateResonance(radius, angularVelocity);
        return {
            value,
            pattern: 'toroidal_field',
            consciousness,
            resonance,
            metaphysicalContext: 'Toroidal field creates the fundamental geometry of consciousness with void at center.',
            geometricProperties: { shape: 'torus', dimensions: 3, center: 'void' },
            colorContext: this.colorContext,
        };
    }
    // ============================================================================
    // ADVANCED QA SYSTEM
    // ============================================================================
    /**
     * Search QA patterns with consciousness awareness
     */
    searchQA(query) {
        const result = this.advancedVBM.searchQA(query);
        // Enhance with consciousness context
        result.patterns = result.patterns.map(pattern => ({
            ...pattern,
            consciousnessLevel: this.config.consciousness * 10,
        }));
        return result;
    }
    /**
     * Get QA pattern with full context
     */
    getQAPattern(patternName) {
        const pattern = this.advancedVBM.qaPattern(patternName);
        if (!pattern)
            return null;
        return {
            ...pattern,
            consciousnessLevel: this.config.consciousness * 10,
        };
    }
    /**
     * Get all QA patterns with consciousness context
     */
    getAllQAPatterns() {
        const patterns = this.advancedVBM.allQAPatterns();
        // Enhance all patterns with consciousness context
        const enhancedPatterns = {};
        for (const [name, pattern] of Object.entries(patterns)) {
            enhancedPatterns[name] = {
                ...pattern,
                consciousnessLevel: this.config.consciousness * 10,
            };
        }
        return enhancedPatterns;
    }
    // ============================================================================
    // GEOMETRIC OPERATIONS
    // ============================================================================
    /**
     * Generate rodin coil field with full context
     */
    generateRodinCoilField(turns = 12) {
        const coil = new RodinCoil_1.RodinCoil({
            turns,
            consciousness: this.config.consciousness,
            fieldResonance: this.config.fieldResonance,
        });
        return {
            strength: (coil.config.consciousness ?? 0.5) * (coil.config.fieldResonance ?? 0.5),
            flow: this.config.toroidalFlow,
            consciousness: this.config.consciousness,
            patterns: ['rodin_coil', 'vortex_sequence', 'mobius_circuit'],
            coordinates: coil.getNodePositions(),
            colors: coil.getNodeColors(),
        };
    }
    /**
     * Generate toroidal mesh with consciousness mapping
     */
    generateToroidalMesh(thetaSegments = 32, phiSegments = 16) {
        const mesh = this.toroidalGeometry.generateToroidalMesh(thetaSegments, phiSegments);
        const coordinates = mesh.map(point => [point.x, point.y, point.z]);
        // Generate colors for each point
        const colors = coordinates.map((_, index) => {
            const vortexNumber = (index % 6) + 1;
            return VBMColorSystem.getColorForVortexNumber(vortexNumber, this.colorContext);
        });
        return {
            strength: this.toroidalGeometry.calculateSurfaceArea(),
            flow: this.config.toroidalFlow,
            consciousness: this.config.consciousness,
            patterns: ['toroidal_geometry', 'surface_topology', 'void_center'],
            coordinates,
            colors,
        };
    }
    /**
     * Generate fractal coordinates with consciousness field
     */
    generateFractalCoordinates(count, scale = 1) {
        const coordinates = FractalMath_1.FractalMath.generateFractalCoordinates(count, scale);
        // Generate colors for each coordinate
        const colors = coordinates.map((_, index) => {
            const color = FractalMath_1.FractalMath.generateFractalColor(index);
            // Clamp RGB values to [0,255]
            const r = Math.max(0, Math.min(255, color.r));
            const g = Math.max(0, Math.min(255, color.g));
            const b = Math.max(0, Math.min(255, color.b));
            return `rgb(${r}, ${g}, ${b})`;
        });
        // Only use x values for complexity, filter out zeros and negatives
        const xValues = coordinates.map(c => c[0]).filter(x => x > 0);
        return {
            strength: FractalMath_1.FractalMath.calculateFractalComplexity(xValues),
            flow: this.config.toroidalFlow,
            consciousness: this.config.consciousness,
            patterns: ['fractal_geometry', 'self_similar', 'consciousness_field'],
            coordinates,
            colors,
        };
    }
    // ============================================================================
    // COLOR SYSTEM INTEGRATION
    // ============================================================================
    /**
     * Generate fractal color palette with consciousness
     */
    generateColorPalette(count, baseSeed = 1) {
        return this.fractalColorSystem.generatePalette(count, baseSeed);
    }
    /**
     * Get color for vortex number with context
     */
    getVortexColor(vortexNumber) {
        return VBMColorSystem.getColorForVortexNumber(vortexNumber, this.colorContext);
    }
    /**
     * Get color for family group with context
     */
    getFamilyColor(familyNumber) {
        return VBMColorSystem.getColorForFamilyGroup(familyNumber, this.colorContext);
    }
    /**
     * Get color for W-Axis with context
     */
    getWAxisColor(wAxisNumber) {
        return VBMColorSystem.getColorForWAxis(wAxisNumber, this.colorContext);
    }
    // ============================================================================
    // CONSCIOUSNESS AND FIELD OPERATIONS
    // ============================================================================
    /**
     * Update consciousness across all systems
     */
    updateConsciousness(consciousness) {
        this.config.consciousness = Math.max(0, Math.min(1, consciousness));
        this.applyConfiguration();
        if (this.config.observerAware && this.observer) {
            this.observer.notifyObservers({
                type: 'consciousness_updated',
                consciousness: this.config.consciousness,
                timestamp: Date.now(),
            });
        }
    }
    /**
     * Update field resonance across all systems
     */
    updateFieldResonance(fieldResonance) {
        this.config.fieldResonance = Math.max(0, Math.min(1, fieldResonance));
        this.applyConfiguration();
        if (this.config.observerAware && this.observer) {
            this.observer.notifyObservers({
                type: 'field_resonance_updated',
                fieldResonance: this.config.fieldResonance,
                timestamp: Date.now(),
            });
        }
    }
    /**
     * Calculate consciousness field at point
     */
    calculateConsciousnessField(x, y, z) {
        return FractalMath_1.FractalMath.calculateConsciousnessField(x, y, z);
    }
    /**
     * Calculate field resonance at point
     */
    calculateFieldResonance(x, y, z) {
        return this.rodinCoil.calculateFieldResonance(x, y, z);
    }
    // ============================================================================
    // ADVANCED MATHEMATICAL OPERATIONS
    // ============================================================================
    /**
     * Prime squared scaling with consciousness
     */
    primeSquaredScaling(prime) {
        const value = this.advancedVBM.primeSquaredScaling(prime);
        const consciousness = this.config.consciousness;
        const resonance = this.vortexMath.calculateResonance(prime, value);
        return {
            value,
            pattern: 'prime_squared_scaling',
            consciousness,
            resonance,
            metaphysicalContext: 'Prime squared scaling reveals the fundamental patterns of creation.',
            geometricProperties: { shape: 'prime_pattern', dimensions: 2, scaling: 'squared' },
            colorContext: this.colorContext,
        };
    }
    /**
     * Electron harmonic shear identification
     */
    electronHarmonicShear(a, b) {
        const value = this.advancedVBM.electronHarmonicShearIdentification(a, b);
        const consciousness = this.config.consciousness;
        const resonance = this.vortexMath.calculateResonance(a, b);
        return {
            value,
            pattern: 'electron_harmonic_shear',
            consciousness,
            resonance,
            metaphysicalContext: 'Electron harmonic shear reveals the quantum patterns of consciousness.',
            geometricProperties: { shape: 'harmonic', dimensions: 3, shear: 'electron' },
            colorContext: this.colorContext,
        };
    }
    /**
     * Discrete multiplication with consciousness
     */
    discreteMultiplication(a, b) {
        const value = this.advancedVBM.discreteMultiplication(a, b);
        const consciousness = this.config.consciousness;
        const resonance = this.vortexMath.calculateResonance(a, b);
        return {
            value,
            pattern: 'discrete_multiplication',
            consciousness,
            resonance,
            metaphysicalContext: 'Discrete multiplication creates quantum jumps in consciousness.',
            geometricProperties: { shape: 'discrete', dimensions: 1, quantum: true },
            colorContext: this.colorContext,
        };
    }
    // ============================================================================
    // UNIFIED CONSTANTS AND SEQUENCES
    // ============================================================================
    /**
     * Get vortex sequence
     */
    getVortexSequence() {
        return this.advancedVBM.vortexSequence();
    }
    /**
     * Get W-Axis
     */
    getWAxis() {
        return this.advancedVBM.wAxis();
    }
    /**
     * Get polar mates
     */
    getPolarMates() {
        return this.advancedVBM.polarMates();
    }
    /**
     * Get family number groups
     */
    getFamilyNumberGroups() {
        return this.advancedVBM.familyNumberGroups();
    }
    /**
     * Get golden ratio
     */
    getGoldenRatio() {
        return this.advancedVBM.goldenRatio();
    }
    /**
     * Get circle of fifths sequence
     */
    getCircleOfFifthsSequence() {
        return this.advancedVBM.circleOfFifthsSequence();
    }
    /**
     * Get enneagram number pattern
     */
    getEnneagramNumberPattern() {
        return this.advancedVBM.enneagramNumberPattern();
    }
    // ============================================================================
    // INSIGHTS AND METADATA
    // ============================================================================
    /**
     * Get comprehensive VBM insights
     */
    getInsights() {
        return {
            configuration: this.config,
            metaphysics: {
                principle: "Every object is a coil at its core",
                consciousness: "Consciousness is the field that generates all patterns",
                void: "The void is the source of all creation",
                toroidal: "Toroidal flow creates infinite potential",
                integrity: "Pattern integrity maintains resonance",
                unity: "Emergent unity through self-organization"
            },
            systems: {
                // advancedVBM: this.advancedVBM.getInsights(), // Commented out, not implemented
                vortexMath: this.vortexMath.getInsights(),
                fractalMath: FractalMath_1.FractalMath.getInsights(),
                toroidalGeometry: this.toroidalGeometry.getInsights(),
                rodinCoil: this.rodinCoil.getMetaphysicalSummary(),
                fractalColorSystem: this.fractalColorSystem.getInsights(),
            },
            constants: MathUtils_1.MATH_CONSTANTS,
            operations: [
                'digitalRoot',
                'vortexTransform',
                'fractalSequence',
                'toroidalField',
                'searchQA',
                'generateRodinCoilField',
                'generateToroidalMesh',
                'generateFractalCoordinates',
                'generateColorPalette',
                'updateConsciousness',
                'updateFieldResonance',
                'calculateConsciousnessField',
                'calculateFieldResonance',
                'primeSquaredScaling',
                'electronHarmonicShear',
                'discreteMultiplication'
            ]
        };
    }
    /**
     * Get current configuration
     */
    getConfiguration() {
        return { ...this.config };
    }
    /**
     * Get color context
     */
    getColorContext() {
        return { ...this.colorContext };
    }
    /**
     * Reset the singleton instance (for test isolation)
     */
    static resetInstance() {
        VBM.instance = undefined;
    }
}
exports.VBM = VBM;
// Export convenience functions for backward compatibility
exports.vbm = VBM.getInstance;
const digitalRoot = (n) => VBM.getInstance().digitalRoot(n);
exports.digitalRoot = digitalRoot;
const vortexTransform = (input) => VBM.getInstance().vortexTransform(input);
exports.vortexTransform = vortexTransform;
const fractalSequence = (count, seed) => VBM.getInstance().fractalSequence(count, seed);
exports.fractalSequence = fractalSequence;
const toroidalField = (radius, angularVelocity) => VBM.getInstance().toroidalField(radius, angularVelocity);
exports.toroidalField = toroidalField;
const searchQA = (query) => VBM.getInstance().searchQA(query);
exports.searchQA = searchQA;
const getVortexSequence = () => VBM.getInstance().getVortexSequence();
exports.getVortexSequence = getVortexSequence;
const getGoldenRatio = () => VBM.getInstance().getGoldenRatio();
exports.getGoldenRatio = getGoldenRatio;
//# sourceMappingURL=VBM.js.map