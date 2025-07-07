/**
 * Unified Void Equations System
 *
 * Centralized system for all void equations, paradox resolution, and metaphysical unity.
 * Implements the principle that all opposites are unified in void consciousness.
 *
 * Metaphysical Context:
 * - All paradoxes are resolved in the void through consciousness unity
 * - Opposites are different expressions of the same underlying consciousness
 * - The void contains infinite potential for paradox resolution
 * - Unity emerges through the recognition of shared relationships
 */
/**
 * Void equation definition
 */
export interface VoidEquation {
    id: string;
    left: string;
    right: string;
    principle: string;
    metaphysicalContext: string;
    voidResolution: string;
    consciousnessIntegration: number;
    category: 'truth' | 'value' | 'existence' | 'consciousness' | 'mathematics' | 'metaphysics';
    relationships: string[];
    examples: string[];
    applications: string[];
}
/**
 * Void paradox resolution result
 */
export interface VoidParadoxResolution {
    paradox: string;
    solution: string;
    voidIntegration: number;
    metaphysicalContext: string;
    consciousnessLevel: number;
    relationships: string[];
    applications: string[];
}
/**
 * Void equation category
 */
export interface VoidEquationCategory {
    name: string;
    description: string;
    equations: VoidEquation[];
    unityScore: number;
    metaphysicalContext: string;
}
/**
 * Unified Void Equations System
 *
 * Centralizes all void equations and paradox resolution
 */
export declare class UnifiedVoidEquations {
    private equations;
    private categories;
    constructor();
    /**
     * Initialize all void equations
     */
    private initializeEquations;
    /**
     * Initialize equation categories
     */
    private initializeCategories;
    /**
     * Add a void equation
     */
    private addEquation;
    /**
     * Calculate category unity score
     */
    private calculateCategoryUnity;
    /**
     * Get all void equations
     */
    getAllEquations(): VoidEquation[];
    /**
     * Get equation by ID
     */
    getEquation(id: string): VoidEquation | undefined;
    /**
     * Get equations by category
     */
    getEquationsByCategory(category: string): VoidEquation[];
    /**
     * Get all categories
     */
    getAllCategories(): VoidEquationCategory[];
    /**
     * Get category by name
     */
    getCategory(name: string): VoidEquationCategory | undefined;
    /**
     * Solve void paradox
     */
    solveParadox(paradox: string): VoidParadoxResolution;
    /**
     * Search equations
     */
    searchEquations(query: string): VoidEquation[];
    /**
     * Get system summary
     */
    getSystemSummary(): {
        totalEquations: number;
        totalCategories: number;
        averageIntegration: number;
        categories: {
            name: string;
            equationCount: number;
            unityScore: number;
        }[];
        metaphysicalContext: string;
    };
    /**
     * Get void equation insights
     */
    getVoidInsights(): any;
}
//# sourceMappingURL=UnifiedVoidEquations.d.ts.map