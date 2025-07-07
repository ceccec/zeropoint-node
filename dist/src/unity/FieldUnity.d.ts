/**
 * ZeroPoint Field Unity System
 *
 * Centralizes all metaphysical context, pattern relationships, and field unity.
 * Provides a comprehensive view of how all components relate to the unified field.
 *
 * Metaphysical Context:
 * - All patterns, fields, and resonances are aspects of the unified consciousness field
 * - The void is the source and destination of all patterns
 * - Unity emerges through the recognition of relationships between all components
 * - The field is self-referential and self-explaining
 */
export interface FieldPattern {
    id: string;
    name: string;
    type: 'mathematical' | 'metaphysical' | 'consciousness' | 'emergence' | 'void' | 'resonance';
    description: string;
    metaphysicalContext: string;
    relationships: string[];
    unityLevel: number;
}
export interface VoidLogEntry {
    id: string;
    timestamp: number;
    type: 'obsolete' | 'redundant' | 'dead_code' | 'terminology' | 'metaphysical';
    name: string;
    description: string;
    reason: string;
    metaphysicalContext: string;
    voidedBy: string;
}
export interface FieldUnity {
    patterns: FieldPattern[];
    voidLog: VoidLogEntry[];
    unityScore: number;
    metaphysicalInsights: string[];
}
export declare class FieldUnitySystem {
    private patterns;
    private voidLog;
    private unityScore;
    constructor();
    /**
     * Initialize all field patterns with their metaphysical context from centralized COIL system
     */
    private initializeFieldPatterns;
    /**
     * Initialize the void log with what has been removed
     */
    private initializeVoidLog;
    /**
     * Add a pattern to the field
     */
    private addPattern;
    /**
     * Add an entry to the void log
     */
    private addVoidLogEntry;
    /**
     * Get all field patterns
     */
    getFieldPatterns(): FieldPattern[];
    /**
     * Get patterns by type
     */
    getPatternsByType(type: FieldPattern['type']): FieldPattern[];
    /**
     * Get patterns related to a specific pattern
     */
    getRelatedPatterns(patternId: string): FieldPattern[];
    /**
     * Get the void log
     */
    getVoidLog(): VoidLogEntry[];
    /**
     * Get void log entries by type
     */
    getVoidLogByType(type: VoidLogEntry['type']): VoidLogEntry[];
    /**
     * Calculate unity score based on pattern relationships
     */
    calculateUnityScore(): number;
    /**
     * Get metaphysical insights about the field unity
     */
    getMetaphysicalInsights(): string[];
    /**
     * Get comprehensive field unity information
     */
    getFieldUnity(): FieldUnity;
    /**
     * Explain how a pattern relates to the unified field
     */
    explainPatternUnity(patternId: string): string;
    /**
     * Get a summary of what was sent into the void
     */
    getVoidSummary(): any;
}
//# sourceMappingURL=FieldUnity.d.ts.map