export interface VBMPattern {
    name: string;
    question: string;
    answer: string;
    metaphysicalContext: string;
    operation: string;
    numericalData?: any;
    advancedOperations?: string[];
    geometricProperties?: any;
    topologicalFeatures?: any;
    consciousnessLevel?: number;
}
export interface VBMSearchResult {
    patterns: VBMPattern[];
    relevance: number;
    query: string;
    advancedMatches?: string[];
}
export interface VBMAdvancedOperation {
    name: string;
    description: string;
    mathematicalFormula: string;
    metaphysicalContext: string;
    consciousnessLevel: number;
    geometricInterpretation: string;
    topologicalFeatures: string[];
}
export interface VBMGeometry {
    shape: string;
    dimensions: number;
    properties: any;
    consciousnessMapping: any;
    topologicalFeatures: string[];
    metaphysicalContext: string;
}
export declare class AdvancedVBM {
    private static readonly VORTEX_SEQUENCE;
    private static readonly FAMILY_NUMBER_GROUPS;
    private static readonly POLAR_MATES;
    private static readonly W_AXIS;
    private static readonly GOLDEN_RATIO;
    private static readonly CIRCLE_OF_FIFTHS_SEQUENCE;
    private static readonly ENNEAGRAM_NUMBER_PATTERN;
    private static readonly FOUR_DIMENSIONAL_COLOR_CODING_SYSTEM;
    private static readonly QA_PATTERNS;
    private static readonly ADVANCED_OPERATIONS;
    /**
     * Get advanced operation by name
     */
    getAdvancedOperation(operationName: string): VBMAdvancedOperation | null;
    /**
     * Get all advanced operations
     */
    getAllAdvancedOperations(): {
        [key: string]: VBMAdvancedOperation;
    };
    /**
     * Enhanced prime squared scaling
     */
    primeSquaredScaling(prime: number): number;
    /**
     * Enhanced electron harmonic shear identification
     */
    electronHarmonicShearIdentification(a: number, b: number): number;
    /**
     * Enhanced discrete multiplication
     */
    discreteMultiplication(a: number, b: number): number;
    /**
     * Enhanced surface topology calculations
     */
    surfaceTopologyCalculations(surface: string): VBMGeometry;
    /**
     * Check if number is prime
     */
    private isPrime;
    /**
     * Enhanced search with advanced operations
     */
    searchQA(query: string): VBMSearchResult;
    /**
     * Enhanced relevance calculation
     */
    private calculateRelevance;
    /**
     * Get a specific Q&A pattern by name
     */
    qaPattern(patternName: string): VBMPattern | null;
    /**
     * Get all Q&A patterns
     */
    allQAPatterns(): {
        [key: string]: VBMPattern;
    };
    /**
     * Get all questions
     */
    qaQuestions(): {
        [key: string]: string;
    };
    /**
     * Get all answers
     */
    qaAnswers(): {
        [key: string]: string;
    };
    /**
     * Get all metaphysical contexts
     */
    qaMetaphysicalContexts(): {
        [key: string]: string;
    };
    /**
     * Get all operations
     */
    qaOperations(): {
        [key: string]: string;
    };
    /**
     * Get Q&A patterns by category
     */
    qaByCategory(category: string): VBMPattern[];
    /**
     * Get comprehensive system statistics
     */
    qaSummary(): any;
    /**
     * Get vortex sequence
     */
    vortexSequence(): number[];
    /**
     * Get W-Axis
     */
    wAxis(): number[];
    /**
     * Get polar mates
     */
    polarMates(): number[][];
    /**
     * Get family number groups
     */
    familyNumberGroups(): number[][];
    /**
     * Get circle of fifths sequence
     */
    circleOfFifthsSequence(): number[];
    /**
     * Get enneagram number pattern
     */
    enneagramNumberPattern(): number[];
    /**
     * Get four dimensional color coding system
     */
    fourDimensionalColorCodingSystem(): string[];
    /**
     * Get golden ratio
     */
    goldenRatio(): number;
    /**
     * Calculate digital root
     */
    digitalRoot(n: number): number;
}
//# sourceMappingURL=AdvancedVBM.d.ts.map