import { EventEmitter } from 'events';
/**
 * Consciousness Field Implementation
 *
 * Manages the consciousness field for each ZeroPoint device,
 * including field strength, consciousness level, and pattern integration.
 */
export interface ConsciousnessPattern {
    id: string;
    type: 'thought' | 'emotion' | 'intention' | 'memory' | 'insight';
    intensity: number;
    frequency: number;
    timestamp: number;
    data?: any;
}
export declare class ConsciousnessField extends EventEmitter {
    private consciousnessLevel;
    private fieldStrength;
    private fieldRadius;
    private patterns;
    private isInitialized;
    /**
     * Initialize the consciousness field
     */
    initialize(): Promise<void>;
    /**
     * Get current consciousness level
     */
    getConsciousnessLevel(): number;
    /**
     * Set consciousness level
     */
    setConsciousnessLevel(level: number): void;
    /**
     * Get field strength
     */
    getFieldStrength(): number;
    /**
     * Set field strength
     */
    setFieldStrength(strength: number): void;
    /**
     * Add a consciousness pattern
     */
    addPattern(pattern: Omit<ConsciousnessPattern, 'id' | 'timestamp'>): string;
    /**
     * Remove a consciousness pattern
     */
    removePattern(patternId: string): boolean;
    /**
     * Get all patterns
     */
    getPatterns(): ConsciousnessPattern[];
    /**
     * Get patterns by type
     */
    getPatternsByType(type: ConsciousnessPattern['type']): ConsciousnessPattern[];
    /**
     * Integrate a pattern from another device
     */
    integratePattern(externalPattern: any): void;
    /**
     * Calculate field density at a specific point
     */
    calculateFieldDensity(x: number, y: number, z: number): number;
    /**
     * Evolve consciousness field
     */
    evolve(deltaTime?: number): void;
    /**
     * Get consciousness insights
     */
    getInsights(): any;
    /**
     * Shutdown the consciousness field
     */
    shutdown(): Promise<void>;
    /**
     * Generate unique pattern ID
     */
    private generatePatternId;
    /**
     * Create initial consciousness patterns
     */
    private createInitialPatterns;
    /**
     * Update consciousness level based on a pattern
     */
    private updateConsciousnessFromPattern;
    /**
     * Calculate pattern resonance with current field
     */
    private calculatePatternResonance;
    /**
     * Calculate pattern contribution to field density
     */
    private calculatePatternContribution;
    /**
     * Update consciousness level based on overall pattern state
     */
    private updateConsciousnessLevel;
}
//# sourceMappingURL=ConsciousnessField.d.ts.map