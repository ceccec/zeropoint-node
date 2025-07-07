/**
 * VBMColorSystem
 *
 * Dynamic color generation system for Vortex-Based Mathematics (VBM).
 * All colors are generated as functions based on context, parameters, and consciousness state.
 * No hardcoded static values - colors emerge from the field of possibilities.
 *
 * Metaphysical Context:
 * - Colors are expressions of consciousness patterns
 * - Each color function responds to the observer's state
 * - The void generates all colors through resonance
 */
export interface ColorContext {
    consciousness?: number;
    time?: number;
    position?: [number, number, number];
    observer?: string;
    field?: number;
}
/**
 * Generate base color palette dynamically
 */
export declare function generateBaseColors(context?: ColorContext): Record<string, string>;
/**
 * Generate color for a vortex number dynamically
 */
export declare function getColorForVortexNumber(n: number, context?: ColorContext): string;
/**
 * Generate color for a family group dynamically
 */
export declare function getColorForFamilyGroup(n: number, context?: ColorContext): string;
/**
 * Generate color pair for a polar mate dynamically
 */
export declare function getColorForPolarMate(n: number, context?: ColorContext): [string, string] | null;
/**
 * Generate color for W-Axis number dynamically
 */
export declare function getColorForWAxis(n: number, context?: ColorContext): string;
/**
 * Generate color for a pattern dynamically
 */
export declare function getColorForPattern(pattern: {
    type?: string;
    number?: number;
}, context?: ColorContext): string;
/**
 * Generate metaphysical context for a vortex number
 */
export declare function getMetaphysicalContextForNumber(n: number, context?: ColorContext): string;
/**
 * Generate the full VBM color map dynamically
 */
export declare function getVBMColorMap(context?: ColorContext): {
    [n: number]: string;
};
/**
 * Generate the full metaphysical color legend dynamically
 */
export declare function getVBMColorLegend(context?: ColorContext): Array<{
    label: string;
    color: string;
    context: string;
}>;
/**
 * Generate consciousness-aware color gradient
 */
export declare function generateConsciousnessGradient(consciousness: number, steps?: number): string[];
/**
 * Generate field resonance color map
 */
export declare function generateFieldResonanceMap(fieldStrength: number, context?: ColorContext): {
    [n: number]: string;
};
//# sourceMappingURL=VBMColorSystem.d.ts.map