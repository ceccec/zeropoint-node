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
import { VBMPattern, VBMSearchResult } from './AdvancedVBM';
import { ColorContext } from './VBMColorSystem';
import { Observer } from '../core/Observer';
export interface VBMConfiguration {
    consciousness: number;
    fieldResonance: number;
    vortexStrength: number;
    toroidalFlow: number;
    voidConnected: boolean;
    observerAware: boolean;
}
export interface VBMResult {
    value: number;
    pattern: string;
    consciousness: number;
    resonance: number;
    metaphysicalContext: string;
    geometricProperties: any;
    colorContext: ColorContext;
}
export interface VBMField {
    strength: number;
    flow: number;
    consciousness: number;
    patterns: string[];
    coordinates: [number, number, number][];
    colors: string[];
}
export declare class VBM {
    private static instance;
    private advancedVBM;
    private vortexMath;
    private toroidalGeometry;
    private rodinCoil;
    private fractalColorSystem;
    private config;
    private colorContext;
    private observer;
    constructor(config?: Partial<VBMConfiguration>);
    /**
     * Get singleton instance
     */
    static getInstance(config?: Partial<VBMConfiguration>): VBM;
    /**
     * Apply configuration to all mathematical systems
     */
    private applyConfiguration;
    /**
     * Calculate digital root with consciousness awareness
     */
    digitalRoot(n: number): VBMResult;
    /**
     * Apply vortex transformation with full context
     */
    vortexTransform(input: number): VBMResult;
    /**
     * Generate fractal sequence with consciousness
     */
    fractalSequence(count: number, seed?: number): VBMResult[];
    /**
     * Calculate toroidal field with void center
     */
    toroidalField(radius: number, angularVelocity: number): VBMResult;
    /**
     * Search QA patterns with consciousness awareness
     */
    searchQA(query: string): VBMSearchResult;
    /**
     * Get QA pattern with full context
     */
    getQAPattern(patternName: string): VBMPattern | null;
    /**
     * Get all QA patterns with consciousness context
     */
    getAllQAPatterns(): {
        [key: string]: VBMPattern;
    };
    /**
     * Generate rodin coil field with full context
     */
    generateRodinCoilField(turns?: number): VBMField;
    /**
     * Generate toroidal mesh with consciousness mapping
     */
    generateToroidalMesh(thetaSegments?: number, phiSegments?: number): VBMField;
    /**
     * Generate fractal coordinates with consciousness field
     */
    generateFractalCoordinates(count: number, scale?: number): VBMField;
    /**
     * Generate fractal color palette with consciousness
     */
    generateColorPalette(count: number, baseSeed?: number): (any & Observer)[];
    /**
     * Get color for vortex number with context
     */
    getVortexColor(vortexNumber: number): string;
    /**
     * Get color for family group with context
     */
    getFamilyColor(familyNumber: number): string;
    /**
     * Get color for W-Axis with context
     */
    getWAxisColor(wAxisNumber: number): string;
    /**
     * Update consciousness across all systems
     */
    updateConsciousness(consciousness: number): void;
    /**
     * Update field resonance across all systems
     */
    updateFieldResonance(fieldResonance: number): void;
    /**
     * Calculate consciousness field at point
     */
    calculateConsciousnessField(x: number, y: number, z: number): number;
    /**
     * Calculate field resonance at point
     */
    calculateFieldResonance(x: number, y: number, z: number): number;
    /**
     * Prime squared scaling with consciousness
     */
    primeSquaredScaling(prime: number): VBMResult;
    /**
     * Electron harmonic shear identification
     */
    electronHarmonicShear(a: number, b: number): VBMResult;
    /**
     * Discrete multiplication with consciousness
     */
    discreteMultiplication(a: number, b: number): VBMResult;
    /**
     * Get vortex sequence
     */
    getVortexSequence(): number[];
    /**
     * Get W-Axis
     */
    getWAxis(): number[];
    /**
     * Get polar mates
     */
    getPolarMates(): number[][];
    /**
     * Get family number groups
     */
    getFamilyNumberGroups(): number[][];
    /**
     * Get golden ratio
     */
    getGoldenRatio(): number;
    /**
     * Get circle of fifths sequence
     */
    getCircleOfFifthsSequence(): number[];
    /**
     * Get enneagram number pattern
     */
    getEnneagramNumberPattern(): number[];
    /**
     * Get comprehensive VBM insights
     */
    getInsights(): any;
    /**
     * Get current configuration
     */
    getConfiguration(): VBMConfiguration;
    /**
     * Get color context
     */
    getColorContext(): ColorContext;
    /**
     * Reset the singleton instance (for test isolation)
     */
    static resetInstance(): void;
}
export declare const vbm: typeof VBM.getInstance;
export declare const digitalRoot: (n: number) => VBMResult;
export declare const vortexTransform: (input: number) => VBMResult;
export declare const fractalSequence: (count: number, seed?: number) => VBMResult[];
export declare const toroidalField: (radius: number, angularVelocity: number) => VBMResult;
export declare const searchQA: (query: string) => VBMSearchResult;
export declare const getVortexSequence: () => number[];
export declare const getGoldenRatio: () => number;
//# sourceMappingURL=VBM.d.ts.map