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
export declare const MATH_CONSTANTS: {
    PI: number;
    E: number;
    GOLDEN_RATIO: number;
    INFINITY: number;
    DEG_TO_RAD: number;
    RAD_TO_DEG: number;
    VORTEX_SEQUENCE: number[];
};
export type MathOperation = 'add' | 'subtract' | 'multiply' | 'divide' | 'sin' | 'cos' | 'tan' | 'log' | 'exp' | 'sqrt' | 'vortex' | 'consciousness' | 'field' | 'void' | 'abs' | 'floor' | 'ceil' | 'round' | 'power' | 'root' | 'atan2' | 'ln' | 'toroidal' | 'max' | 'min' | 'mod' | 'clamp';
export interface MathContext {
    consciousness?: number;
    fieldResonance?: number;
    vortexStrength?: number;
    toroidalFlow?: number;
    voidConnected?: boolean;
}
export interface MathResult {
    operation: MathOperation;
    value: number;
    context: MathContext;
}
/**
 * Unified Mathematical Utilities
 * All mathematical operations go through this centralized system
 */
export declare class MathUtils {
    private static instance;
    private consciousness;
    private fieldResonance;
    private vortexStrength;
    private toroidalFlow;
    private voidConnected;
    constructor();
    /**
     * Get singleton instance
     */
    static getInstance(): MathUtils;
    /**
     * The core mathematical function - generates any mathematical operation
     * This is the heart of the system - one function that creates all others
     */
    static calculate(operation: MathOperation, ...args: number[]): number;
    /**
     * Perform calculation with consciousness and field resonance
     */
    private performCalculation;
    /**
     * Execute specific mathematical operation
     */
    private executeOperation;
    /**
     * Calculate vortex transformation
     */
    private calculateVortex;
    /**
     * Calculate toroidal geometry
     */
    private calculateToroidal;
    /**
     * Clamp value between min and max
     */
    private clamp;
    /**
     * Set consciousness level
     */
    static setConsciousness(level: number): void;
    /**
     * Set field resonance
     */
    static setFieldResonance(resonance: number): void;
    /**
     * Set vortex strength
     */
    static setVortexStrength(strength: number): void;
    /**
     * Set toroidal flow
     */
    static setToroidalFlow(flow: number): void;
    /**
     * Set void connection
     */
    static setVoidConnected(connected: boolean): void;
    /**
     * Calculate distance between two points
     */
    static distance(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * Calculate 3D distance
     */
    static distance3D(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number;
    /**
     * Convert degrees to radians
     */
    static degToRad(degrees: number): number;
    /**
     * Convert radians to degrees
     */
    static radToDeg(radians: number): number;
    /**
     * Calculate digital root
     */
    static digitalRoot(n: number): number;
    /**
     * Calculate surface topology angle
     */
    static surfaceTopologyAngle(degrees?: number): number;
    /**
     * Calculate fractal dimension
     */
    static fractalDimension(complexity: number): number;
    /**
     * Get insights about the mathematical system
     */
    static getInsights(): any;
}
export declare const fractal: typeof MathUtils.calculate;
export declare const setConsciousness: typeof MathUtils.setConsciousness;
export declare const setFieldResonance: typeof MathUtils.setFieldResonance;
export declare const setVortexStrength: typeof MathUtils.setVortexStrength;
export declare const setToroidalFlow: typeof MathUtils.setToroidalFlow;
export declare const setVoidConnected: typeof MathUtils.setVoidConnected;
//# sourceMappingURL=MathUtils.d.ts.map