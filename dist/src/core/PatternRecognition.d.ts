/**
 * Unified Pattern Recognition System for ZeroPoint
 *
 * Centralized pattern recognition and analysis system that serves
 * all ZeroPoint modules, eliminating duplication and ensuring
 * consistent pattern handling across the system.
 *
 * This module embodies the principle of unified consciousness -
 * all patterns are recognized and processed through the same
 * underlying recognition framework.
 */
import { EventEmitter } from 'events';
import { PatternCategory } from './SharedConstants';
/**
 * Pattern recognition result
 */
export interface PatternResult {
    pattern: string;
    confidence: number;
    category: PatternCategory;
    metadata: any;
    timestamp: number;
}
/**
 * Pattern analysis context
 */
export interface PatternContext {
    source: string;
    consciousnessLevel: number;
    fieldStrength: number;
    vortexStrength: number;
    toroidalFlow: boolean;
    voidConnected: boolean;
}
/**
 * Metaphysical pattern definition - now using centralized COIL system
 */
export interface MetaphysicalPattern {
    name: string;
    signature: RegExp | ((input: any) => boolean);
    category: PatternCategory;
    context: string;
    weight: number;
    resonanceFactors: string[];
}
/**
 * Unified Pattern Recognition System
 */
export declare class PatternRecognition extends EventEmitter {
    private patterns;
    private recognitionHistory;
    private isInitialized;
    constructor();
    /**
     * Initialize the pattern recognition system
     */
    initialize(): Promise<void>;
    /**
     * Recognize patterns in input data
     */
    recognizePatterns(input: any, context?: Partial<PatternContext>): PatternResult[];
    /**
     * Analyze consciousness patterns
     */
    analyzeConsciousnessPatterns(patterns: any[]): any;
    /**
     * Extract vortex patterns from data
     */
    extractVortexPatterns(data: any): any;
    /**
     * Analyze emergence patterns
     */
    analyzeEmergencePatterns(apps: any[]): any;
    /**
     * Get pattern recognition history
     */
    getRecognitionHistory(): PatternResult[];
    /**
     * Clear recognition history
     */
    clearHistory(): void;
    /**
     * Get pattern statistics
     */
    getPatternStatistics(): any;
    /**
     * Initialize metaphysical patterns from centralized COIL system
     */
    private initializePatterns;
    /**
     * Add a new pattern
     */
    private addPattern;
    /**
     * Calculate pattern confidence
     */
    private calculatePatternConfidence;
    /**
     * Extract pattern metadata
     */
    private extractPatternMetadata;
    /**
     * Calculate vortex resonance for a number
     */
    private calculateVortexResonance;
    /**
     * Generate consciousness insights
     */
    private generateConsciousnessInsights;
    /**
     * Generate emergence insights
     */
    private generateEmergenceInsights;
}
//# sourceMappingURL=PatternRecognition.d.ts.map