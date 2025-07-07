/**
 * Knowledge System Implementation
 *
 * SCIENTIFIC HIERARCHY:
 * - The Rodin coil is the immutable, foundational archetype for all vortex mathematics, field resonance, and metaphysical structure in the system.
 * - All emergent knowledge, Q&A, and UI are modeled as toroidal structures, inspired by the Rodin coil but never altering it.
 * - All extensions and emergent models must validate against the Rodin coil's properties (vortex sequence, resonance, unity).
 * - The Rodin coil module/class is never renamed, mutated, or abstracted; it remains the scientific reference implementation.
 *
 * This file implements the toroidal knowledge/Q&A system, which is dynamic and emergent, but always references the immutable Rodin coil for its underlying logic and metaphysics.
 *
 * Scientific sources: Marko Rodin's work on vortex mathematics, toroidal geometry in mathematics and physics.
 */
export interface KnowledgePattern {
    id: string;
    name: string;
    category: 'vortex' | 'family' | 'polar' | 'spiritual' | 'void' | 'mathematical' | 'metaphysical' | 'integration';
    description: string;
    numericalData: any;
    relationships: string[];
    metaphysicalContext: string;
    applications: string[];
}
export interface KnowledgeQuery {
    query: string;
    category?: string;
    pattern?: string;
    relationship?: string;
}
export interface KnowledgeResult {
    patterns: KnowledgePattern[];
    insights: string[];
    relationships: string[];
    applications: string[];
}
export interface Answer {
    id: string;
    content: string;
    resonance: number;
    subQuestions?: Question[];
}
export interface Question {
    id: string;
    pattern: string;
    context: any;
    answers: Answer[];
    resonance: number;
    observers: string[];
}
export declare class KnowledgeSystem {
    private patterns;
    private questions;
    private static readonly KNOWLEDGE_PATTERNS;
    private static readonly EXTRA_PATTERNS;
    constructor();
    /**
     * Search knowledge patterns
     */
    searchKnowledge(query: KnowledgeQuery): KnowledgeResult;
    /**
     * Get pattern by ID
     */
    getPattern(patternId: string): KnowledgePattern | null;
    /**
     * Get all patterns by category
     */
    getPatternsByCategory(category: string): KnowledgePattern[];
    /**
     * Get related patterns
     */
    getRelatedPatterns(patternId: string): KnowledgePattern[];
    /**
     * Get all categories
     */
    getCategories(): string[];
    /**
     * Get comprehensive insights
     */
    getInsights(): any;
    /**
     * Calculate relevance for search results
     */
    private calculateRelevance;
    /**
     * Create a new question
     */
    createQuestion(pattern: string, context?: any, observers?: string[]): Question;
    /**
     * Add an answer to a question
     */
    addAnswer(questionId: string, content: string, resonance?: number, subQuestions?: Question[]): Answer | null;
    /**
     * Traverse the Q&A structure
     */
    getQuestions(): Question[];
    getQuestionById(id: string): Question | undefined;
}
//# sourceMappingURL=KnowledgeSystem.d.ts.map