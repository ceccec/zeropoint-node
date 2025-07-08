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
import { ZeroPoint } from '../core/ZeroPoint';
export interface KnowledgePattern {
    id: string;
    name: string;
    category: 'vortex' | 'family' | 'polar' | 'spiritual' | 'void' | 'mathematical' | 'metaphysical' | 'integration' | 'git';
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
    private gitPatterns;
    private zeroPoint?;
    private static readonly KNOWLEDGE_PATTERNS;
    private static readonly EXTRA_PATTERNS;
    constructor(zeroPoint?: ZeroPoint);
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
    /**
     * Get question by ID
     */
    getQuestionById(id: string): Question | undefined;
    /**
     * Get the most recent git-related knowledge patterns
     * @param n Number of patterns to retrieve
     */
    getRecentGitPatterns(n: number): KnowledgePattern[];
    /**
     * Ask a Git-related question and get comprehensive answers
     */
    askGitQuestion(question: string): Promise<{
        answer: string;
        gitData: any;
        patterns: KnowledgePattern[];
        insights: string[];
        recommendations: string[];
    }>;
    /**
     * Get live Git data including status, recent commits, and changes
     */
    private getLiveGitData;
    /**
     * Generate contextual answers for Git-related questions
     */
    private generateGitAnswer;
    /**
     * Answer questions about recent commits
     */
    private answerRecentCommits;
    /**
     * Answer questions about what changed
     */
    private answerWhatChanged;
    /**
     * Answer questions about development patterns
     */
    private answerDevelopmentPatterns;
    /**
     * Answer questions about file evolution
     */
    private answerFileEvolution;
    /**
     * Answer questions about learning progress
     */
    private answerLearningProgress;
    /**
     * Answer general Git questions
     */
    private answerGeneralGitQuestion;
    /**
     * Extract insights from Git data and patterns
     */
    private extractGitInsights;
    /**
     * Generate recommendations based on Git data
     */
    private generateGitRecommendations;
    /**
     * Get comprehensive Git development insights
     */
    getGitDevelopmentInsights(): Promise<{
        activity: any;
        patterns: KnowledgePattern[];
        insights: string[];
        recommendations: string[];
        evolution: any;
    }>;
    /**
     * Analyze code evolution from Git patterns
     */
    private analyzeCodeEvolution;
    private handleGitEvent;
}
//# sourceMappingURL=KnowledgeSystem.d.ts.map