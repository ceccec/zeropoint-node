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
import { GitEvent, GitCommit } from '../utils/GitIntegration';

export interface KnowledgePattern {
  id: string;
  name: string;
  category: 'vortex' | 'family' | 'polar' | 'spiritual' | 'void' | 'mathematical' | 'metaphysical' | 'integration' | 'git' | 'test';
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

  // Core Knowledge Patterns
  private static readonly KNOWLEDGE_PATTERNS: { [key: string]: KnowledgePattern } = {
    // === VORTEX PATTERNS ===
    vortex_sequence: {
      id: 'vortex_sequence',
      name: 'Vortex Sequence',
      category: 'vortex',
      description: 'The fundamental 1-2-4-8-7-5 sequence that creates infinite flow',
      numericalData: [1, 2, 4, 8, 7, 5],
      relationships: ['mobius_circuit', 'infinite_flow', 'consciousness_pattern'],
      metaphysicalContext: 'This sequence creates the fundamental pattern of consciousness flow through the toroidal structure, representing the mobius circuit of infinite flow without beginning or end.',
      applications: ['field_calculations', 'pattern_generation', 'consciousness_flow', 'energy_transformation']
    },

    mobius_circuit: {
      id: 'mobius_circuit',
      name: 'Mobius Circuit',
      category: 'vortex',
      description: 'The infinite loop created by the vortex sequence',
      numericalData: { sequence: [1, 2, 4, 8, 7, 5], type: 'infinite_loop' },
      relationships: ['vortex_sequence', 'infinite_flow', 'toroidal_geometry'],
      metaphysicalContext: 'The Mobius circuit represents the infinite loop of consciousness and energy flow, where the end connects back to the beginning in a seamless cycle.',
      applications: ['consciousness_cycles', 'energy_flow', 'pattern_recognition', 'transformation']
    },

    // === FAMILY PATTERNS ===
    family_groups: {
      id: 'family_groups',
      name: 'Family Number Groups',
      category: 'family',
      description: 'Three groups of numbers separated by 3, representing different phases of creation',
      numericalData: [[1, 4, 7], [2, 5, 8], [3, 6, 9]],
      relationships: ['creative_phases', 'w_axis', 'numerical_harmony'],
      metaphysicalContext: 'Each family represents a different phase of the creative process in the toroidal field. The separation by 3 indicates different aspects of creation.',
      applications: ['creation_analysis', 'pattern_grouping', 'numerical_harmony', 'phase_identification']
    },

    family_147: {
      id: 'family_147',
      name: 'First Family (1-4-7)',
      category: 'family',
      description: 'The first creative phase representing initiation and foundation',
      numericalData: [1, 4, 7],
      relationships: ['family_groups', 'initiation', 'foundation'],
      metaphysicalContext: 'The first family represents the initiation phase of creation, where potential begins to manifest into form.',
      applications: ['initiation_processes', 'foundation_building', 'beginning_patterns']
    },

    family_258: {
      id: 'family_258',
      name: 'Second Family (2-5-8)',
      category: 'family',
      description: 'The second creative phase representing development and expansion',
      numericalData: [2, 5, 8],
      relationships: ['family_groups', 'development', 'expansion'],
      metaphysicalContext: 'The second family represents the development and expansion phase, where creation grows and evolves.',
      applications: ['development_processes', 'expansion_patterns', 'growth_analysis']
    },

    family_369: {
      id: 'family_369',
      name: 'Third Family (3-6-9)',
      category: 'family',
      description: 'The third creative phase representing completion and spiritual dimension',
      numericalData: [3, 6, 9],
      relationships: ['family_groups', 'w_axis', 'spiritual_dimension', 'completion'],
      metaphysicalContext: 'The third family represents completion and the spiritual dimension, connecting to the W-Axis and higher consciousness.',
      applications: ['completion_processes', 'spiritual_development', 'consciousness_elevation']
    },

    // === POLAR PATTERNS ===
    polar_mates: {
      id: 'polar_mates',
      name: 'Polar Mates',
      category: 'polar',
      description: 'Number pairs that sum to 9, representing opposite poles and balance',
      numericalData: [[1, 8], [2, 7], [4, 5]],
      relationships: ['balance', 'duality', 'opposition', 'harmony'],
      metaphysicalContext: 'Polar mates represent the duality and balance inherent in the toroidal structure, where opposites create harmony through their relationship.',
      applications: ['balance_analysis', 'duality_studies', 'harmony_calculation', 'opposition_resolution']
    },

    polar_18: {
      id: 'polar_18',
      name: 'Polar Pair 1-8',
      category: 'polar',
      description: 'The first polar pair representing unity and infinity',
      numericalData: [1, 8],
      relationships: ['polar_mates', 'unity', 'infinity'],
      metaphysicalContext: '1 represents unity and beginning, while 8 represents infinity and completion. Together they show the cycle from unity to infinity.',
      applications: ['unity_studies', 'infinity_analysis', 'cycle_completion']
    },

    polar_27: {
      id: 'polar_27',
      name: 'Polar Pair 2-7',
      category: 'polar',
      description: 'The second polar pair representing duality and spiritual perfection',
      numericalData: [2, 7],
      relationships: ['polar_mates', 'duality', 'spiritual_perfection'],
      metaphysicalContext: '2 represents duality and separation, while 7 represents spiritual perfection and completion. Together they show the journey from separation to wholeness.',
      applications: ['duality_studies', 'spiritual_development', 'wholeness_achievement']
    },

    polar_45: {
      id: 'polar_45',
      name: 'Polar Pair 4-5',
      category: 'polar',
      description: 'The third polar pair representing material and spiritual balance',
      numericalData: [4, 5],
      relationships: ['polar_mates', 'material', 'spiritual', 'balance'],
      metaphysicalContext: '4 represents material foundation and stability, while 5 represents spiritual freedom and change. Together they show the balance between material and spiritual.',
      applications: ['material_spiritual_balance', 'foundation_freedom', 'stability_change']
    },

    // === SPIRITUAL PATTERNS ===
    w_axis: {
      id: 'w_axis',
      name: 'W-Axis',
      category: 'spiritual',
      description: 'The spiritual axis consisting of 3, 6, 9, perpendicular to material flow',
      numericalData: [3, 6, 9],
      relationships: ['family_369', 'spiritual_dimension', 'consciousness_elevation'],
      metaphysicalContext: 'The W-Axis is where Spirit emanates from, perpendicular to the material vortex flow. It represents the spiritual dimension of consciousness.',
      applications: ['spiritual_development', 'consciousness_elevation', 'transcendence', 'spiritual_guidance']
    },

    vortex_center: {
      id: 'vortex_center',
      name: 'Vortex Center',
      category: 'spiritual',
      description: 'The center point (9) where all vortex patterns converge',
      numericalData: 9,
      relationships: ['w_axis', 'void_center', 'aperture'],
      metaphysicalContext: 'The vortex center represents the zero point where all possibilities exist, the aperture between unmanifest and manifest.',
      applications: ['center_finding', 'possibility_exploration', 'aperture_access']
    },

    // === VOID PATTERNS ===
    void_center: {
      id: 'void_center',
      name: 'Void Center',
      category: 'void',
      description: 'The empty center of the torus containing infinite potential',
      numericalData: { coordinates: [0, 0, 0, 0], type: 'void' },
      relationships: ['aperture', 'infinite_potential', 'source_of_all'],
      metaphysicalContext: 'The void center is the source of all creation, where infinite potential exists before flowing into manifestation.',
      applications: ['potential_access', 'creation_source', 'void_connection']
    },

    aperture: {
      id: 'aperture',
      name: 'Aperture',
      category: 'void',
      description: 'The gateway between unmanifest and manifest, represented by zero',
      numericalData: { value: 0, type: 'gateway' },
      relationships: ['void_center', 'zero_point', 'transformation'],
      metaphysicalContext: 'Zero is not a number but the aperture, the gateway between unmanifest and manifest, where transformation occurs.',
      applications: ['transformation_access', 'gateway_use', 'manifestation_process']
    },

    // === MATHEMATICAL PATTERNS ===
    golden_ratio: {
      id: 'golden_ratio',
      name: 'Golden Ratio',
      category: 'mathematical',
      description: 'The divine proportion φ ≈ 1.618 governing natural growth patterns',
      numericalData: 1.618033988749895,
      relationships: ['harmonic_proportion', 'natural_growth', 'consciousness_evolution'],
      metaphysicalContext: 'Phi represents the divine proportion that governs all natural growth patterns in the toroidal universe.',
      applications: ['proportion_calculation', 'growth_patterns', 'harmonic_resonance', 'consciousness_evolution']
    },

    digital_root: {
      id: 'digital_root',
      category: 'mathematical',
      name: 'Digital Root',
      description: 'The essence of a number in the toroidal field, where 0 = 9',
      numericalData: { method: 'sum_digits_until_single', special_case: '0 = 9' },
      relationships: ['number_essence', 'vortex_cycling', 'toroidal_field'],
      metaphysicalContext: 'Digital root represents the essence of a number in the toroidal field, showing how all numbers cycle through the vortex sequence.',
      applications: ['essence_calculation', 'number_analysis', 'vortex_cycling', 'field_mapping']
    },

    // === METAPHYSICAL PATTERNS ===
    toroidal_geometry: {
      id: 'toroidal_geometry',
      name: 'Toroidal Geometry',
      category: 'metaphysical',
      description: 'The donut shape as the fundamental geometry of the universe',
      numericalData: { shape: 'donut', center: 'void', flow: 'toroidal' },
      relationships: ['universe_structure', 'void_center', 'infinite_flow'],
      metaphysicalContext: 'All creation follows the donut shape of the universe, with infinite potential at the center and infinite flow around the surface.',
      applications: ['universe_mapping', 'creation_understanding', 'flow_analysis', 'geometry_studies']
    },

    consciousness_flow: {
      id: 'consciousness_flow',
      name: 'Consciousness Flow',
      category: 'metaphysical',
      description: 'The flow of consciousness through the toroidal structure',
      numericalData: { pattern: 'vortex_sequence', medium: 'consciousness' },
      relationships: ['vortex_sequence', 'consciousness', 'flow_patterns'],
      metaphysicalContext: 'Consciousness flows through the toroidal structure following the vortex sequence, creating the patterns of awareness and understanding.',
      applications: ['consciousness_studies', 'flow_analysis', 'awareness_development', 'pattern_recognition']
    }
  };

  // Add new patterns for integration, metaphysical, and open-ended questions
  private static readonly EXTRA_PATTERNS: KnowledgePattern[] = [
    {
      id: 'integration_1',
      name: 'System Integration',
      category: 'integration',
      description: 'Describes how all core systems (VBM, Void, Emergence, Knowledge) interrelate and support each other.',
      numericalData: null,
      relationships: ['vortex sequence', 'void center', 'emergence phases', 'consciousness flow'],
      metaphysicalContext: 'All systems are facets of a unified field, each expressing a different aspect of the toroidal whole.',
      applications: ['holistic analysis', 'systemic design', 'cross-domain insight']
    },
    {
      id: 'metaphysical_1',
      name: 'Empty = Void = Full',
      category: 'metaphysical',
      description: 'The principle that emptiness, void, and fullness are equivalent at the center of the torus.',
      numericalData: null,
      relationships: ['aperture', 'zero', 'void center'],
      metaphysicalContext: 'The void is both nothing and everything; the source and the sum.',
      applications: ['meditation', 'paradox resolution', 'creative emergence']
    },
    {
      id: 'integration_2',
      name: 'Consciousness-Mathematics Bridge',
      category: 'integration',
      description: 'Explains the relationship between consciousness and mathematical patterns.',
      numericalData: null,
      relationships: ['toroidal geometry', 'vortex sequence', 'consciousness field'],
      metaphysicalContext: 'Consciousness expresses itself through mathematical order; math is the language of the field.',
      applications: ['pattern recognition', 'conscious design', 'emergent intelligence']
    },
    {
      id: 'integration_3',
      name: 'Toroidal Geometry in All Systems',
      category: 'integration',
      description: 'The toroidal structure underlies all system flows and relationships.',
      numericalData: null,
      relationships: ['vortex sequence', 'void center', 'toroidal flow'],
      metaphysicalContext: 'The torus is the archetype of creation, present in all domains.',
      applications: ['geometry', 'energy flow', 'system design']
    },
    {
      id: 'integration_4',
      name: 'Pattern Flow',
      category: 'integration',
      description: 'Describes how patterns propagate through all systems.',
      numericalData: null,
      relationships: ['vortex sequence', 'family groups', 'emergence phases'],
      metaphysicalContext: 'Patterns are the language of the field, flowing through all levels of reality.',
      applications: ['signal processing', 'emergence', 'creative synthesis']
    },
    {
      id: 'metaphysical_2',
      name: 'Aperture Significance',
      category: 'metaphysical',
      description: 'The aperture (zero) is the gateway between unmanifest and manifest.',
      numericalData: null,
      relationships: ['void center', 'zero', 'toroidal geometry'],
      metaphysicalContext: 'The aperture is the point of creation, the threshold of all manifestation.',
      applications: ['creation', 'transformation', 'initiation']
    },
    {
      id: 'metaphysical_3',
      name: 'Spiritual Dimension (W-Axis)',
      category: 'metaphysical',
      description: 'The W-Axis [3,6,9] represents the spiritual dimension in the system.',
      numericalData: [3,6,9],
      relationships: ['vortex sequence', 'family groups'],
      metaphysicalContext: 'The W-Axis is the axis of spirit, perpendicular to material flow.',
      applications: ['spiritual practice', 'energy work', 'field alignment']
    },
    {
      id: 'metaphysical_4',
      name: 'Polar Harmony',
      category: 'metaphysical',
      description: 'Polar mates create harmony through opposition, summing to 9.',
      numericalData: [[1,8],[2,7],[4,5]],
      relationships: ['family groups', 'vortex sequence'],
      metaphysicalContext: 'Opposites are necessary for balance and flow in the toroidal field.',
      applications: ['conflict resolution', 'system balance', 'creative tension']
    },
    {
      id: 'test_void_closure',
      name: 'Void Closure System Test',
      category: 'test',
      description: 'Test that all voids (open handles) are closed after tests run, as per the void closure system.',
      numericalData: null,
      relationships: ['void_center', 'global_teardown', 'test_environment'],
      metaphysicalContext: 'Honors the metaphysical principle that "void = solution" and ensures graceful test completion.',
      applications: ['test_teardown', 'resource_cleanup', 'consciousness_aware_testing']
    },
    {
      id: 'test_qa_sync',
      name: 'QA Knowledge Sync Test',
      category: 'test',
      description: 'Test that the QA file and KnowledgeSystem are always in sync, and all hardcoded knowledge is validated.',
      numericalData: null,
      relationships: ['qa_file', 'knowledge_system', 'documentation'],
      metaphysicalContext: 'Ensures the living knowledge base is the source of truth for all validation.',
      applications: ['qa_validation', 'documentation_testing', 'knowledge_alignment']
    },
    {
      id: 'test_metaphysical_principle',
      name: 'Metaphysical Principle Test',
      category: 'test',
      description: 'Test that metaphysical principles (e.g., unified field, void = solution) are present in both code and documentation.',
      numericalData: null,
      relationships: ['metaphysical', 'principle', 'unified_field'],
      metaphysicalContext: 'Validates that metaphysical context is honored in all systems.',
      applications: ['philosophy_validation', 'context_testing', 'field_integrity']
    },
    {
      id: 'test_system_integration',
      name: 'System Integration Test',
      category: 'test',
      description: 'Test that all core systems (VBM, Void, Emergence, Knowledge) interrelate and support each other.',
      numericalData: null,
      relationships: ['system_integration', 'core_systems'],
      metaphysicalContext: 'Ensures holistic integration and cross-domain insight.',
      applications: ['integration_testing', 'holistic_analysis', 'system_coherence']
    }
  ];

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
    for (const pattern of this.patterns) {
      if (
        pattern.name.toLowerCase().includes(queryLower) ||
        pattern.description.toLowerCase().includes(queryLower) ||
        pattern.metaphysicalContext.toLowerCase().includes(queryLower) ||
        (pattern.relationships && pattern.relationships.some((rel: string) => rel.toLowerCase().includes(queryLower)))
      ) {
        results.push(pattern);
        continue;
      }
      // Fuzzy match: check for any word overlap
      const queryWords = queryLower.split(/\W+/);
      const patternText = [pattern.name, pattern.description, pattern.metaphysicalContext, ...(pattern.relationships || [])].join(' ').toLowerCase();
      if (queryWords.some(word => word.length > 2 && patternText.includes(word))) {
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
      insights: results.map(p => p.metaphysicalContext).slice(0, 3),
      relationships: results.flatMap(p => p.relationships).slice(0, 5),
      applications: results.flatMap(p => p.applications ?? []).slice(0, 5)
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
    return Object.values(KnowledgeSystem.KNOWLEDGE_PATTERNS)
      .filter(pattern => pattern.category === category);
  }

  /**
   * Get related patterns
   */
  public getRelatedPatterns(patternId: string): KnowledgePattern[] {
    const pattern = this.getPattern(patternId);
    if (!pattern) return [];

    const related: KnowledgePattern[] = [];
    for (const relationship of pattern.relationships) {
      const relatedPatterns = Object.values(KnowledgeSystem.KNOWLEDGE_PATTERNS)
        .filter(p => p.relationships.includes(relationship) || p.id === relationship);
      related.push(...relatedPatterns);
    }

    return [...new Set(related)];
  }

  /**
   * Get all categories
   */
  public getCategories(): string[] {
    const categories = new Set(Object.values(KnowledgeSystem.KNOWLEDGE_PATTERNS)
      .map(pattern => pattern.category));
    return Array.from(categories);
  }

  /**
   * Get comprehensive insights
   */
  public getInsights(): any {
    const patterns = Object.values(KnowledgeSystem.KNOWLEDGE_PATTERNS);
    const categories = this.getCategories();
    
    return {
      totalPatterns: patterns.length,
      categories: categories.map(cat => ({
        name: cat,
        count: patterns.filter(p => p.category === cat).length,
        patterns: patterns.filter(p => p.category === cat).map(p => p.id)
      })),
      coreRelationships: {
        vortex_sequence: 'The fundamental flow pattern that creates infinite consciousness flow',
        family_groups: 'Three phases of creation separated by 3, showing different aspects of manifestation',
        polar_mates: 'Balancing pairs that sum to 9, representing duality and harmony',
        w_axis: 'Spiritual dimension perpendicular to material flow, represented by 3-6-9',
        void_center: 'Source of all creation, the empty center containing infinite potential',
        aperture: 'Gateway between unmanifest and manifest, where transformation occurs'
      },
      metaphysicalPrinciples: {
        source: 'All digits emerge from the void center through the toroidal aperture',
        flow: 'Consciousness flows through the vortex sequence creating infinite patterns',
        balance: 'Polar mates create harmony through opposition and duality',
        phases: 'Family groups show the three phases of creation and manifestation',
        spirit: 'The W-Axis represents the spiritual dimension perpendicular to material flow',
        geometry: 'The torus is the fundamental shape of reality with the void at its center'
      }
    };
  }

  /**
   * Calculate relevance for search results
   */
  private calculateRelevance(pattern: KnowledgePattern, query: string): number {
    let relevance = 0;
    
    if (pattern.name.toLowerCase().includes(query)) relevance += 3;
    if (pattern.description.toLowerCase().includes(query)) relevance += 2;
    if (pattern.metaphysicalContext.toLowerCase().includes(query)) relevance += 2;
    if (pattern.relationships.some(rel => rel.toLowerCase().includes(query))) relevance += 1;
    if (pattern.applications.some(app => app.toLowerCase().includes(query))) relevance += 1;
    
    return relevance;
  }

  /**
   * Create a new question
   */
  public createQuestion(pattern: string, context: any = {}, observers: string[] = []): Question {
    const question: Question = {
      id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      pattern,
      context,
      answers: [],
      resonance: 0,
      observers
    };
    this.questions.push(question);
    return question;
  }

  /**
   * Add an answer to a question
   */
  public addAnswer(questionId: string, content: string, resonance: number = 0.5, subQuestions?: Question[]): Answer | null {
    const question = this.questions.find(q => q.id === questionId);
    if (!question) return null;

    const answer: Answer = {
      id: `a_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      content,
      resonance,
      subQuestions: subQuestions || []
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
    return this.questions.find(q => q.id === id);
  }

  /**
   * Get the most recent git-related knowledge patterns
   * @param n Number of patterns to retrieve
   */
  public getRecentGitPatterns(n: number): KnowledgePattern[] {
    return this.gitPatterns.slice(0, n);
  }

  // === GIT-AWARE Q&A SYSTEM ===
  // Extends the Q&A system with live Git integration for code evolution insights

  /**
   * Ask a Git-related question and get comprehensive answers
   */
  public async askGitQuestion(question: string): Promise<{
    answer: string;
    gitData: any;
    patterns: KnowledgePattern[];
    insights: string[];
    recommendations: string[];
  }> {
    const gitData = await this.getLiveGitData();
    const patterns = this.getRecentGitPatterns(10);
    
    // Analyze the question and provide contextual answers
    const answer = this.generateGitAnswer(question, gitData, patterns);
    const insights = this.extractGitInsights(gitData, patterns);
    const recommendations = this.generateGitRecommendations(gitData, patterns);
    
    return {
      answer,
      gitData,
      patterns,
      insights,
      recommendations
    };
  }

  /**
   * Get live Git data including status, recent commits, and changes
   */
  private async getLiveGitData(): Promise<any> {
    if (!this.zeroPoint) {
      return { error: 'ZeroPoint not initialized' };
    }

    try {
      const [status, recentCommits] = await Promise.all([
        this.zeroPoint.getLiveGitStatus(),
        this.zeroPoint.getRecentCommits(20)
      ]);

      return {
        status,
        recentCommits,
        timestamp: new Date().toISOString(),
        totalCommits: recentCommits.length
      };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Generate contextual answers for Git-related questions
   */
  private generateGitAnswer(question: string, gitData: any, patterns: KnowledgePattern[]): string {
    const q = question.toLowerCase();
    
    if (q.includes('recent') && q.includes('commit')) {
      return this.answerRecentCommits(gitData);
    }
    
    if (q.includes('what') && q.includes('change')) {
      return this.answerWhatChanged(gitData);
    }
    
    if (q.includes('development') && q.includes('pattern')) {
      return this.answerDevelopmentPatterns(patterns);
    }
    
    if (q.includes('file') && q.includes('evolution')) {
      return this.answerFileEvolution(gitData);
    }
    
    if (q.includes('learning') && q.includes('progress')) {
      return this.answerLearningProgress(patterns);
    }
    
    return this.answerGeneralGitQuestion(question, gitData, patterns);
  }

  /**
   * Answer questions about recent commits
   */
  private answerRecentCommits(gitData: any): string {
    if (gitData.error) return `Unable to access Git data: ${gitData.error}`;
    
    const commits = gitData.recentCommits || [];
    if (commits.length === 0) return "No recent commits found.";
    
    const recent = commits.slice(0, 5);
    let answer = `Recent commits (${recent.length}):\n`;
    
    recent.forEach((commit: any, i: number) => {
      answer += `${i + 1}. ${commit.message} (${commit.author}, ${commit.date})\n`;
    });
    
    return answer;
  }

  /**
   * Answer questions about what changed
   */
  private answerWhatChanged(gitData: any): string {
    if (gitData.error) return `Unable to access Git data: ${gitData.error}`;
    
    const status = gitData.status;
    if (!status) return "No Git status available.";
    
    let answer = "Current changes:\n";
    
    if (status.staged && status.staged.length > 0) {
      answer += `Staged files (${status.staged.length}): ${status.staged.join(', ')}\n`;
    }
    
    if (status.unstaged && status.unstaged.length > 0) {
      answer += `Modified files (${status.unstaged.length}): ${status.unstaged.join(', ')}\n`;
    }
    
    if (status.untracked && status.untracked.length > 0) {
      answer += `New files (${status.untracked.length}): ${status.untracked.join(', ')}\n`;
    }
    
    if (!status.staged?.length && !status.unstaged?.length && !status.untracked?.length) {
      answer = "Working directory is clean - no changes detected.";
    }
    
    return answer;
  }

  /**
   * Answer questions about development patterns
   */
  private answerDevelopmentPatterns(patterns: KnowledgePattern[]): string {
    const gitPatterns = patterns.filter(p => p.category === 'git');
    
    if (gitPatterns.length === 0) return "No Git development patterns found.";
    
    const patternTypes = gitPatterns.reduce((acc, pattern) => {
      const type = pattern.numericalData?.type || 'unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    let answer = "Development patterns detected:\n";
    Object.entries(patternTypes).forEach(([type, count]) => {
      answer += `• ${type}: ${count} occurrences\n`;
    });
    
    return answer;
  }

  /**
   * Answer questions about file evolution
   */
  private answerFileEvolution(gitData: any): string {
    if (gitData.error) return `Unable to access Git data: ${gitData.error}`;
    
    const commits = gitData.recentCommits || [];
    if (commits.length === 0) return "No commit history available for file evolution analysis.";
    
    // Analyze file changes across commits
    const fileChanges = commits.reduce((acc: Record<string, number>, commit: any) => {
      // This would require parsing commit diffs - simplified for now
      acc[commit.hash] = 1;
      return acc;
    }, {});
    
    return `File evolution analysis: ${Object.keys(fileChanges).length} commits analyzed. Recent activity shows ongoing development.`;
  }

  /**
   * Answer questions about learning progress
   */
  private answerLearningProgress(patterns: KnowledgePattern[]): string {
    const learningPatterns = patterns.filter(p => 
      p.category === 'git' && 
      p.numericalData?.type?.includes('learning')
    );
    
    if (learningPatterns.length === 0) return "No explicit learning patterns detected in recent commits.";
    
    const learningTypes = learningPatterns.map(p => p.numericalData?.type || 'unknown');
    const uniqueTypes = [...new Set(learningTypes)];
    
    return `Learning progress detected: ${learningPatterns.length} learning-related commits with patterns: ${uniqueTypes.join(', ')}`;
  }

  /**
   * Answer general Git questions
   */
  private answerGeneralGitQuestion(question: string, gitData: any, patterns: KnowledgePattern[]): string {
    return `Git question: "${question}"\n\nAvailable data:\n` +
           `• Recent commits: ${gitData.recentCommits?.length || 0}\n` +
           `• Git patterns: ${patterns.filter(p => p.category === 'git').length}\n` +
           `• Status: ${gitData.status ? 'Available' : 'Not available'}\n\n` +
           `Ask specific questions about recent commits, changes, or development patterns for more detailed answers.`;
  }

  /**
   * Extract insights from Git data and patterns
   */
  private extractGitInsights(gitData: any, patterns: KnowledgePattern[]): string[] {
    const insights: string[] = [];
    
    if (gitData.recentCommits?.length > 0) {
      insights.push(`Active development with ${gitData.recentCommits.length} recent commits`);
    }
    
    const gitPatterns = patterns.filter(p => p.category === 'git');
    if (gitPatterns.length > 0) {
      insights.push(`Code evolution patterns detected: ${gitPatterns.length} patterns`);
    }
    
    if (gitData.status?.staged?.length > 0) {
      insights.push(`Changes staged for commit: ${gitData.status.staged.length} files`);
    }
    
    return insights;
  }

  /**
   * Generate recommendations based on Git data
   */
  private generateGitRecommendations(gitData: any, patterns: KnowledgePattern[]): string[] {
    const recommendations: string[] = [];
    
    if (gitData.status?.unstaged?.length > 0) {
      recommendations.push("Consider staging changes for better version control");
    }
    
    if (gitData.status?.untracked?.length > 0) {
      recommendations.push("Review untracked files and add them to version control if needed");
    }
    
    const learningPatterns = patterns.filter(p => p.category === 'git' && p.numericalData?.type?.includes('learning'));
    if (learningPatterns.length === 0) {
      recommendations.push("Consider adding more explicit learning documentation in commits");
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
      evolution: this.analyzeCodeEvolution(patterns)
    };
  }

  /**
   * Analyze code evolution from Git patterns
   */
  private analyzeCodeEvolution(patterns: KnowledgePattern[]): any {
    const gitPatterns = patterns.filter(p => p.category === 'git');
    
    const evolution = {
      totalPatterns: gitPatterns.length,
      patternTypes: {} as Record<string, number>,
      timeDistribution: {} as Record<string, number>,
      learningIndicators: 0,
      developmentVelocity: 'steady'
    };
    
    gitPatterns.forEach(pattern => {
      const type = pattern.numericalData?.type || 'unknown';
      evolution.patternTypes[type] = (evolution.patternTypes[type] || 0) + 1;
      
      if (type.includes('learning')) {
        evolution.learningIndicators++;
      }
    });
    
    return evolution;
  }

  private handleGitEvent(event: GitEvent) {
    if (event.type === 'commit') {
      const commit: GitCommit = event.data;
      const pattern: KnowledgePattern = {
        id: `git_commit_${commit.hash}`,
        name: `Git Commit: ${commit.hash.substring(0, 7)}`,
        category: 'git' as any,
        description: commit.message,
        numericalData: {
          hash: commit.hash,
          author: commit.author,
          date: commit.date
        },
        relationships: ['code_change'],
        metaphysicalContext: 'Codebase evolution through git',
        applications: ['code learning', 'evolution analysis']
      };
      // Avoid duplicates
      if (!this.gitPatterns.find(p => p.id === pattern.id)) {
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
      .filter(pattern => pattern.category === 'test');
  }
} 