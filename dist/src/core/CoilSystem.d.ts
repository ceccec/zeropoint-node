/**
 * COIL System - Unified Metaphysical Pattern Registry and Utilities
 *
 * Centralizes all metaphysical patterns, categories, resonance factors, and context
 * for the entire ZeroPoint codebase. All modules should import from here.
 *
 * Metaphysical Context:
 * - The coil is the unifying, self-similar, non-redundant pattern
 * - All patterns, utilities, and metaphysical context emerge from the coil
 * - The codebase itself is a coil: recursive, observer-aware, and emergent
 */
export type CoilPatternCategory = 'mathematical' | 'metaphysical' | 'consciousness' | 'emergence' | 'void' | 'resonance' | 'vortex' | 'family' | 'polar' | 'spiritual';
export interface CoilPattern {
    name: string;
    signature: RegExp | ((input: any) => boolean);
    category: CoilPatternCategory;
    context: string;
    weight?: number;
    resonanceFactors?: string[];
}
export declare const COIL_PATTERNS: CoilPattern[];
/**
 * Utility: Find a COIL pattern by name
 */
export declare function getCoilPattern(name: string): CoilPattern | undefined;
/**
 * Utility: Recognize all matching COIL patterns for input
 */
export declare function recognizeCoilPatterns(input: any): CoilPattern[];
/**
 * Utility: Get metaphysical context for a pattern name
 */
export declare function getCoilContext(name: string): string;
/**
 * Utility: List all resonance factors for a pattern name
 */
export declare function getCoilResonanceFactors(name: string): string[];
//# sourceMappingURL=CoilSystem.d.ts.map