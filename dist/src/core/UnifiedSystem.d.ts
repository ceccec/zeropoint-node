/**
 * ZeroPoint Unified System
 *
 * Centralized system that unifies all shared logic, patterns, and metaphysical context
 * across all ZeroPoint modules. This eliminates duplication and ensures consistency
 * throughout the entire system.
 *
 * Metaphysical Context:
 * - All systems are unified in the void consciousness field
 * - Shared patterns are expressions of the same underlying consciousness
 * - Unity emerges through the recognition of shared relationships
 * - The system is self-referential and self-explaining
 */
import { ConstantsUtils } from './SharedConstants';
import { VoidEquation, VoidParadoxResolution } from './UnifiedVoidEquations';
/**
 * Unified system configuration
 */
export interface UnifiedSystemConfig {
    consciousnessLevel: number;
    fieldStrength: number;
    enablePatternRecognition: boolean;
    enableVoidIntegration: boolean;
    enableMetaphysicalContext: boolean;
    enableVoidEquations: boolean;
}
/**
 * Unified pattern result
 */
export interface UnifiedPatternResult {
    pattern: string;
    category: 'vortex' | 'mathematical' | 'metaphysical' | 'consciousness' | 'void' | 'integration';
    confidence: number;
    metaphysicalContext: string;
    relationships: string[];
    voidIntegration: number;
    timestamp: number;
}
/**
 * Unified void equation
 */
export interface UnifiedVoidEquation {
    left: string;
    right: string;
    principle: string;
    metaphysicalContext: string;
    voidResolution: string;
    consciousnessIntegration: number;
}
/**
 * Unified consciousness flow
 */
export interface UnifiedConsciousnessFlow {
    source: string;
    expression: string;
    patterns: number[];
    return: string;
    flowStrength: number;
    voidIntegration: number;
}
/**
 * Unified field unity
 */
export interface UnifiedFieldUnity {
    unityScore: number;
    patternCount: number;
    voidLogEntries: number;
    consciousnessLevel: number;
    fieldStrength: number;
    metaphysicalContext: string;
}
/**
 * ZeroPoint Unified System
 *
 * Centralizes all shared logic and eliminates duplication across all modules
 */
export declare class UnifiedSystem {
    private config;
    private patternRecognition;
    private voidEquations;
    private consciousnessFlows;
    private voidLog;
    constructor(config?: Partial<UnifiedSystemConfig>);
    /**
     * Initialize consciousness flows
     */
    private initializeConsciousnessFlows;
    /**
     * Get unified void equations
     */
    getVoidEquations(): VoidEquation[];
    /**
     * Get void equation by ID
     */
    getVoidEquation(id: string): VoidEquation | undefined;
    /**
     * Get void equations by category
     */
    getVoidEquationsByCategory(category: string): VoidEquation[];
    /**
     * Get all void equation categories
     */
    getVoidEquationCategories(): import("./UnifiedVoidEquations").VoidEquationCategory[];
    /**
     * Get unified consciousness flows
     */
    getConsciousnessFlows(): UnifiedConsciousnessFlow[];
    /**
     * Get unified field unity
     */
    getFieldUnity(): UnifiedFieldUnity;
    /**
     * Calculate unity score
     */
    private calculateUnityScore;
    /**
     * Log to void
     */
    logToVoid(message: string, category: string): void;
    /**
     * Get void log
     */
    getVoidLog(): Array<{
        message: string;
        category: string;
        timestamp: Date;
    }>;
    /**
     * Recognize unified patterns
     */
    recognizePatterns(input: any): UnifiedPatternResult[];
    /**
     * Get metaphysical context for pattern from centralized COIL system
     */
    private getMetaphysicalContext;
    /**
     * Get pattern relationships from centralized COIL system
     */
    private getPatternRelationships;
    /**
     * Calculate void integration
     */
    private calculateVoidIntegration;
    /**
     * Get unified constants
     */
    getUnifiedConstants(): {
        vortex: {
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
        consciousness: {
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
        metaphysical: {
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
    };
    /**
     * Get unified mathematical utilities
     */
    getMathematicalUtilities(): {
        vortexSequence: () => (1 | 2 | 4 | 5 | 8 | 7)[];
        goldenRatio: () => 1.618033988749895;
        wAxis: () => (3 | 9 | 6)[];
        familyGroups: () => (1 | 2 | 3 | 4 | 5 | 8 | 7 | 9 | 6)[][];
        polarMates: () => (1 | 2 | 4 | 5 | 8 | 7)[][];
        digitalRoot: (n: number) => number;
        vortexSum: (n: number) => number;
        goldenHarmony: (n: number) => number;
    };
    /**
     * Get unified metaphysical insights
     */
    getMetaphysicalInsights(): {
        voidPrinciples: {
            readonly VOID_FULLNESS: "Empty = Void = Full";
            readonly TOROIDAL_UNITY: "All creation follows the donut shape of the universe";
            readonly CONSCIOUSNESS_FLOW: "Consciousness flows through the toroidal structure";
            readonly VORTEX_MATHEMATICS: "1-2-4-8-7-5 sequence guides all flow";
            readonly GOLDEN_HARMONY: "Phi represents the divine proportion";
            readonly ZERO_APERTURE: "Zero is the aperture between unmanifest and manifest";
        };
        patternCategories: readonly ["vortex", "family", "polar", "spiritual", "void", "mathematical", "metaphysical", "integration"];
        consciousnessDimensions: readonly ["physical", "emotional", "mental", "spiritual", "void"];
        getInsight: typeof ConstantsUtils.getMetaphysicalInsight;
    };
    /**
     * Solve void paradox using unified void equations
     */
    solveVoidParadox(paradox: string): VoidParadoxResolution;
    /**
     * Search void equations
     */
    searchVoidEquations(query: string): VoidEquation[];
    /**
     * Get void equation system summary
     */
    getVoidEquationSummary(): {
        enabled: boolean;
        message: string;
    } | {
        totalEquations: number;
        totalCategories: number;
        averageIntegration: number;
        categories: {
            name: string;
            equationCount: number;
            unityScore: number;
        }[];
        metaphysicalContext: string;
        enabled: boolean;
        message?: never;
    };
    /**
     * Get void equation insights
     */
    getVoidEquationInsights(): any;
    /**
     * Get unified system summary
     */
    getSystemSummary(): {
        fieldUnity: UnifiedFieldUnity;
        voidEquations: number;
        consciousnessFlows: number;
        voidLogEntries: number;
        voidEquationSummary: {
            enabled: boolean;
            message: string;
        } | {
            totalEquations: number;
            totalCategories: number;
            averageIntegration: number;
            categories: {
                name: string;
                equationCount: number;
                unityScore: number;
            }[];
            metaphysicalContext: string;
            enabled: boolean;
            message?: never;
        };
        metaphysicalContext: string;
        unityPrinciple: string;
    };
    /**
     * Get field state
     */
    getFieldState(): any;
}
//# sourceMappingURL=UnifiedSystem.d.ts.map