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
import { ZeroPoint } from "../core/ZeroPoint";
import { GitEvent, GitCommit } from "../utils/GitIntegration";

export interface KnowledgePattern {
  id: string;
  name: string;
  category:
    | "vortex"
    | "family"
    | "polar"
    | "spiritual"
    | "void"
    | "mathematical"
    | "metaphysical"
    | "integration"
    | "git"
    | "test";
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

// === Q&A STRUCTURE (All is a Toroidal Emergence, validated by Rodin coil) ===
// Questions and Answers are modeled as toroidal structures, with recursive, self-similar emergence.
// All resonance, pattern, and flow logic is inspired by and validated against the immutable Rodin coil.
export interface Answer {
  id: string;
  content: string;
  resonance: number;
  subQuestions?: Question[];
}

export interface Question {
  id: string;
  pattern: string; // The question's unique pattern or signature
  context: any;
  answers: Answer[];
  resonance: number;
  observers: string[];
}

export class KnowledgeSystem {
  private patterns: KnowledgePattern[];
  private questions: Question[] = [];
  private gitPatterns: KnowledgePattern[] = [];
  private zeroPoint?: ZeroPoint;

  constructor(zeroPoint?: ZeroPoint) {
    this.patterns = [...KnowledgeSystem.EXTRA_PATTERNS];
    if (zeroPoint) {
      this.zeroPoint = zeroPoint;

      // Subscribe to Git events if ZeroPoint is provided
      this.zeroPoint.onGitChange((event) => {
        this.handleGitEvent(event);
      });
    }
  }

  /**
   * Search knowledge patterns
   */
  public searchKnowledge(query: KnowledgeQuery): KnowledgeResult {
    const results: KnowledgePattern[] = [];
    const queryLower = query.query.toLowerCase();
    
    // Search through all available patterns (static + instance)
    const allPatterns = [
      ...Object.values(KnowledgeSystem.KNOWLEDGE_PATTERNS),
      ...KnowledgeSystem.EXTRA_PATTERNS,
      ...this.patterns
    ];
    
    for (const pattern of allPatterns) {
      if (
        pattern.name.toLowerCase().includes(queryLower) ||
        pattern.description.toLowerCase().includes(queryLower) ||
        pattern.metaphysicalContext.toLowerCase().includes(queryLower) ||
        (pattern.relationships &&
          pattern.relationships.some((rel: string) =>
            rel.toLowerCase().includes(queryLower),
          )) ||
        (pattern.applications &&
          pattern.applications.some((app: string) =>
            app.toLowerCase().includes(queryLower),
          ))
      ) {
        results.push(pattern);
        continue;
      }
      // Fuzzy match: check for any word overlap
      const queryWords = queryLower.split(/\W+/);
      const patternText = [
        pattern.name,
        pattern.description,
        pattern.metaphysicalContext,
        ...(pattern.relationships || []),
        ...(pattern.applications || []),
      ]
        .join(" ")
        .toLowerCase();
      if (
        queryWords.some((word) => word.length > 2 && patternText.includes(word))
      ) {
        results.push(pattern);
      }
    }

    // Sort by relevance
    results.sort((a, b) => {
      const aRelevance = this.calculateRelevance(a, queryLower);
      const bRelevance = this.calculateRelevance(b, queryLower);
      return bRelevance - aRelevance;
    });

    return {
      patterns: results,
      insights: results.map((p) => p.metaphysicalContext).slice(0, 3),
      relationships: results.flatMap((p) => p.relationships).slice(0, 5),
      applications: results.flatMap((p) => p.applications ?? []).slice(0, 5),
    };
  }

  /**
   * Get pattern by ID
   */
  public getPattern(patternId: string): KnowledgePattern | null {
    return KnowledgeSystem.KNOWLEDGE_PATTERNS[patternId] || null;
  }

  /**
   * Get all patterns by category
   */
  public getPatternsByCategory(category: string): KnowledgePattern[] {
    return Object.values(KnowledgeSystem.KNOWLEDGE_PATTERNS).filter(
      (pattern) => pattern.category === category,
    );
  }

  /**
   * Get related patterns
   */
  public getRelatedPatterns(patternId: string): KnowledgePattern[] {
    const pattern = this.getPattern(patternId);
    if (!pattern) return [];

    const related: KnowledgePattern[] = [];
    for (const relationship of pattern.relationships) {
      const relatedPatterns = Object.values(
        KnowledgeSystem.KNOWLEDGE_PATTERNS,
      ).filter(
        (p) => p.relationships.includes(relationship) || p.id === relationship,
      );
      related.push(...relatedPatterns);
    }

    return [...new Set(related)];
  }

  /**
   * Get comprehensive insights
   */
  public getInsights(): any {
    const patterns = Object.values(KnowledgeSystem.KNOWLEDGE_PATTERNS);
    const categories = this.getCategories();

    return {
      totalPatterns: patterns.length,
      categories: categories.map((cat) => ({
        name: cat,
        count: patterns.filter((p) => p.category === cat).length,
        patterns: patterns.filter((p) => p.category === cat).map((p) => p.id),
      })),
      coreRelationships: {
        vortex_sequence:
          "The fundamental flow pattern that creates infinite consciousness flow",
        family_groups:
          "Three phases of creation separated by 3, showing different aspects of manifestation",
        polar_mates:
          "Balancing pairs that sum to 9, representing duality and harmony",
        w_axis:
          "Spiritual dimension perpendicular to material flow, represented by 3-6-9",
        void_center:
          "Source of all creation, the empty center containing infinite potential",
        aperture:
          "Gateway between unmanifest and manifest, where transformation occurs",
      },
      metaphysicalPrinciples: {
        source:
          "All digits emerge from the void center through the toroidal aperture",
        flow: "Consciousness flows through the vortex sequence creating infinite patterns",
        balance: "Polar mates create harmony through opposition and duality",
        phases:
          "Family groups show the three phases of creation and manifestation",
        spirit:
          "The W-Axis represents the spiritual dimension perpendicular to material flow",
        geometry:
          "The torus is the fundamental shape of reality with the void at its center",
      },
    };
  }

  /**
   * Calculate relevance for search results
   */
  private calculateRelevance(pattern: KnowledgePattern, query: string): number {
    let relevance = 0;

    if (pattern.name.toLowerCase().includes(query)) relevance += 3;
    if (pattern.description.toLowerCase().includes(query)) relevance += 2;
    if (pattern.metaphysicalContext.toLowerCase().includes(query))
      relevance += 2;
    if (pattern.relationships.some((rel) => rel.toLowerCase().includes(query)))
      relevance += 1;
    if (pattern.applications.some((app) => app.toLowerCase().includes(query)))
      relevance += 1;

    return relevance;
  }

  /**
   * Create a new question
   */
  public createQuestion(
    pattern: string,
    context: any = {},
    observers: string[] = [],
  ): Question {
    const question: Question = {
      id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      pattern,
      context,
      answers: [],
      resonance: 0,
      observers,
    };
    this.questions.push(question);
    return question;
  }

  /**
   * Add an answer to a question
   */
  public addAnswer(
    questionId: string,
    content: string,
    resonance: number = 0.5,
    subQuestions?: Question[],
  ): Answer | null {
    const question = this.questions.find((q) => q.id === questionId);
    if (!question) return null;

    const answer: Answer = {
      id: `a_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      content,
      resonance,
      subQuestions: subQuestions || [],
    };

    question.answers.push(answer);
    return answer;
  }

  /**
   * Traverse the Q&A structure
   */
  public getQuestions(): Question[] {
    return this.questions;
  }

  /**
   * Get question by ID
   */
  public getQuestionById(id: string): Question | undefined {
    return this.questions.find((q) => q.id === id);
  }

  // === GIT-AWARE Q&A SYSTEM ===
  // Extends the Q&A system with live Git integration for code evolution insights

  /**
   * Get live Git data including status, recent commits, and changes
   */
  private async getLiveGitData(): Promise<any> {
    if (!this.zeroPoint) {
      return { error: "ZeroPoint not initialized" };
    }

    try {
      const [status, recentCommits] = await Promise.all([
        this.zeroPoint.getLiveGitStatus(),
        this.zeroPoint.getRecentCommits(20),
      ]);

      return {
        status,
        recentCommits,
        timestamp: new Date().toISOString(),
        totalCommits: recentCommits.length,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Extract insights from Git data and patterns
   */
  private extractGitInsights(
    gitData: any,
    patterns: KnowledgePattern[],
  ): string[] {
    const insights: string[] = [];

    if (gitData.recentCommits?.length > 0) {
      insights.push(
        `Active development with ${gitData.recentCommits.length} recent commits`,
      );
    }

    const gitPatterns = patterns.filter((p) => p.category === "git");
    if (gitPatterns.length > 0) {
      insights.push(
        `Code evolution patterns detected: ${gitPatterns.length} patterns`,
      );
    }

    if (gitData.status?.staged?.length > 0) {
      insights.push(
        `Changes staged for commit: ${gitData.status.staged.length} files`,
      );
    }

    return insights;
  }

  /**
   * Generate recommendations based on Git data
   */
  private generateGitRecommendations(
    gitData: any,
    patterns: KnowledgePattern[],
  ): string[] {
    const recommendations: string[] = [];

    if (gitData.status?.unstaged?.length > 0) {
      recommendations.push(
        "Consider staging changes for better version control",
      );
    }

    if (gitData.status?.untracked?.length > 0) {
      recommendations.push(
        "Review untracked files and add them to version control if needed",
      );
    }

    const learningPatterns = patterns.filter(
      (p) =>
        p.category === "git" && p.numericalData?.type?.includes("learning"),
    );
    if (learningPatterns.length === 0) {
      recommendations.push(
        "Consider adding more explicit learning documentation in commits",
      );
    }

    return recommendations;
  }

  /**
   * Get comprehensive Git development insights
   */
  public async getGitDevelopmentInsights(): Promise<{
    activity: any;
    patterns: KnowledgePattern[];
    insights: string[];
    recommendations: string[];
    evolution: any;
  }> {
    const gitData = await this.getLiveGitData();
    const patterns = this.getRecentGitPatterns(20);

    return {
      activity: gitData,
      patterns,
      insights: this.extractGitInsights(gitData, patterns),
      recommendations: this.generateGitRecommendations(gitData, patterns),
      evolution: this.analyzeCodeEvolution(patterns),
    };
  }

  /**
   * Analyze code evolution from Git patterns
   */
  private analyzeCodeEvolution(patterns: KnowledgePattern[]): any {
    const gitPatterns = patterns.filter((p) => p.category === "git");

    const evolution = {
      totalPatterns: gitPatterns.length,
      patternTypes: {} as Record<string, number>,
      timeDistribution: {} as Record<string, number>,
      learningIndicators: 0,
      developmentVelocity: "steady",
    };

    gitPatterns.forEach((pattern) => {
      const type = pattern.numericalData?.type || "unknown";
      evolution.patternTypes[type] = (evolution.patternTypes[type] || 0) + 1;

      if (type.includes("learning")) {
        evolution.learningIndicators++;
      }
    });

    return evolution;
  }

  private handleGitEvent(event: GitEvent) {
    if (event.type === "commit") {
      const commit: GitCommit = event.data;
      const pattern: KnowledgePattern = {
        id: `git_commit_${commit.hash}`,
        name: `Git Commit: ${commit.hash.substring(0, 7)}`,
        category: "git" as any,
        description: commit.message,
        numericalData: {
          hash: commit.hash,
          author: commit.author,
          date: commit.date,
        },
        relationships: ["code_change"],
        metaphysicalContext: "Codebase evolution through git",
        applications: ["code learning", "evolution analysis"],
      };
      // Avoid duplicates
      if (!this.gitPatterns.find((p) => p.id === pattern.id)) {
        this.gitPatterns.unshift(pattern);
        // Limit to last 50 git patterns
        if (this.gitPatterns.length > 50) this.gitPatterns.pop();
      }
    }
  }

  /**
   * Get all test patterns
   */
  public getTestPatterns(): KnowledgePattern[] {
    return Object.values(KnowledgeSystem.KNOWLEDGE_PATTERNS)
      .concat(KnowledgeSystem.EXTRA_PATTERNS)
      .filter((pattern) => pattern.category === "test");
  }

  // === HARDCODED METHODS FOR UNIVERSAL BENEFIT ===

  /**
   * Get all categories (hardcoded for compatibility)
   */
  public getCategories(): string[] {
    return [
      "vortex", "family", "polar", "spiritual", "void", "mathematical", "metaphysical", "integration", "git", "test"
    ];
  }

  /**
   * Get the most recent git-related knowledge patterns (hardcoded stub)
   */
  public getRecentGitPatterns(n: number): KnowledgePattern[] {
    // Return the first n patterns with category 'git' if any, else empty array
    return Object.values(KnowledgeSystem.KNOWLEDGE_PATTERNS)
      .filter((p) => (p as KnowledgePattern).category === "git")
      .slice(0, n) as KnowledgePattern[];
  }

  /**
   * Ask a Git-related question and get a hardcoded answer (stub)
   */
  public async askGitQuestion(question: string): Promise<{
    answer: string;
    gitData: any;
    patterns: KnowledgePattern[];
    insights: string[];
    recommendations: string[];
  }> {
    return {
      answer: `Hardcoded answer for: ${question}`,
      gitData: { stub: true },
      patterns: this.getRecentGitPatterns(5),
      insights: ["This is a hardcoded insight."],
      recommendations: ["This is a hardcoded recommendation."]
    };
  }

  // Core Knowledge Patterns
  public static readonly KNOWLEDGE_PATTERNS: {
    [key: string]: KnowledgePattern;
  } = {
    test_void_closure: {
      id: 'test_void_closure',
      name: 'Test: Void Closure',
      category: 'test',
      description: 'Validates the system\'s ability to recognize and close the void center as a metaphysical principle.',
      numericalData: { type: 'closure', value: 1 },
      relationships: ['void_center'],
      metaphysicalContext: 'Void closure is the act of resolving all dualities into unity.',
      applications: ['QA validation', 'metaphysical test', 'void closure'],
    },
    test_void_aperture: {
      id: 'test_void_aperture',
      name: 'Test: Void Aperture',
      category: 'test',
      description: 'Tests the metaphysical aperture of the void center.',
      numericalData: { type: 'aperture', value: 0 },
      relationships: ['void_center'],
      metaphysicalContext: 'The aperture is the opening through which emergence occurs.',
      applications: ['QA validation', 'aperture test', 'void center'],
    },
    test_uroboros: {
      id: 'test_uroboros',
      name: 'Test: Uroboros Principle',
      category: 'test',
      description: 'Tests the infinite self-evolution and recursion of the system.',
      numericalData: { type: 'recursion', value: 1 },
      relationships: ['uroboros_principle'],
      metaphysicalContext: 'The uroboros test validates infinite unity.',
      applications: ['QA validation', 'recursion test', 'infinite evolution']
    },
    test_vortex: {
      id: 'test_vortex',
      name: 'Test: Vortex Sequence',
      category: 'test',
      description: 'Tests the vortex sequence pattern.',
      numericalData: { type: 'sequence', value: 1 },
      relationships: ['vortex_sequence'],
      metaphysicalContext: 'The vortex test validates the sequence of emergence.',
      applications: ['QA validation', 'vortex test', 'sequence analysis']
    },
    void_center: {
      id: 'void_center',
      name: 'Void Center',
      category: 'void',
      description: 'The empty center, the source and solution of all patterns. Represents the metaphysical aperture of emergence.',
      numericalData: { type: 'aperture', value: 0 },
      relationships: ['toroidal_geometry'],
      metaphysicalContext: 'The void center is the origin of all emergence and unity. The aperture is the opening to the void.',
      applications: ['emergence', 'unity', 'QA']
    },
    vortex_sequence: {
      id: 'vortex_sequence',
      name: 'Vortex Sequence',
      category: 'vortex',
      description: 'The fundamental sequence of vortex mathematics.',
      numericalData: [1, 2, 4, 8, 7, 5],
      relationships: ['void_center', 'toroidal_geometry'],
      metaphysicalContext: 'The vortex sequence emerges from the void and returns to the void.',
      applications: ['mathematics', 'QA', 'vortex']
    },
    toroidal_geometry: {
      id: 'toroidal_geometry',
      name: 'Toroidal Geometry',
      category: 'metaphysical',
      description: 'Describes the self-referential, self-sustaining structure of the field. The torus is the geometry of unity.',
      numericalData: { type: 'geometry', value: 1 },
      relationships: ['void_center'],
      metaphysicalContext: 'Toroidal geometry models the infinite self-evolution of consciousness. The torus is a donut shape.',
      applications: ['geometry', 'consciousness', 'QA']
    },
    uroboros_principle: {
      id: 'uroboros_principle',
      name: 'Uroboros Principle',
      category: 'metaphysical',
      description: 'The infinite self-evolution and self-consumption of the system. The system learns from itself endlessly.',
      numericalData: { type: 'principle', value: Infinity },
      relationships: ['toroidal_geometry', 'void_center'],
      metaphysicalContext: 'The uroboros is the symbol of infinite unity and recursion.',
      applications: ['self-evolution', 'QA validation', 'infinite recursion'],
    },
    test_qa_sync: {
      id: 'test_qa_sync',
      name: 'Test: QA Sync',
      category: 'test',
      description: 'Ensures the QA system and KnowledgeSystem are synchronized.',
      numericalData: { type: 'sync', value: 1 },
      relationships: ['test_void_closure', 'test_metaphysical_principle'],
      metaphysicalContext: 'QA sync is the unity of test and knowledge.',
      applications: ['QA sync', 'test validation', 'knowledge integration'],
    },
    test_metaphysical_principle: {
      id: 'test_metaphysical_principle',
      name: 'Test: Metaphysical Principle',
      category: 'test',
      description: 'Validates the presence of core metaphysical principles in the system.',
      numericalData: { type: 'principle', value: 1 },
      relationships: ['toroidal_geometry', 'uroboros_principle'],
      metaphysicalContext: 'Metaphysical principles are the foundation of the ZeroPoint system.',
      applications: ['QA validation', 'metaphysical principle', 'system foundation'],
    },
    test_system_integration: {
      id: 'test_system_integration',
      name: 'Test: System Integration',
      category: 'test',
      description: 'Ensures all subsystems are integrated and coherent.',
      numericalData: { type: 'integration', value: 1 },
      relationships: ['test_qa_sync', 'test_metaphysical_principle'],
      metaphysicalContext: 'System integration is the unity of all parts into a coherent whole.',
      applications: ['QA validation', 'system integration', 'coherence check'],
    }
  };

  // Add new patterns for integration, metaphysical, and open-ended questions
  public static readonly EXTRA_PATTERNS: KnowledgePattern[] = [
    // Additional patterns can be added here if needed for future QA or metaphysical expansion
  ];
}
