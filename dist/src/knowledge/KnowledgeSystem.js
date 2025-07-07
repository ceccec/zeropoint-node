"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeSystem = void 0;
class KnowledgeSystem {
    constructor() {
        this.questions = [];
        // Initialize with base patterns if any (empty for now)
        this.patterns = [];
        this.patterns = [...this.patterns, ...KnowledgeSystem.EXTRA_PATTERNS];
    }
    /**
     * Search knowledge patterns
     */
    searchKnowledge(query) {
        const results = [];
        const queryLower = query.query.toLowerCase();
        for (const pattern of this.patterns) {
            if (pattern.name.toLowerCase().includes(queryLower) ||
                pattern.description.toLowerCase().includes(queryLower) ||
                pattern.metaphysicalContext.toLowerCase().includes(queryLower) ||
                (pattern.relationships && pattern.relationships.some((rel) => rel.toLowerCase().includes(queryLower)))) {
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
    getPattern(patternId) {
        return KnowledgeSystem.KNOWLEDGE_PATTERNS[patternId] || null;
    }
    /**
     * Get all patterns by category
     */
    getPatternsByCategory(category) {
        return Object.values(KnowledgeSystem.KNOWLEDGE_PATTERNS)
            .filter(pattern => pattern.category === category);
    }
    /**
     * Get related patterns
     */
    getRelatedPatterns(patternId) {
        const pattern = this.getPattern(patternId);
        if (!pattern)
            return [];
        const related = [];
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
    getCategories() {
        const categories = new Set(Object.values(KnowledgeSystem.KNOWLEDGE_PATTERNS)
            .map(pattern => pattern.category));
        return Array.from(categories);
    }
    /**
     * Get comprehensive insights
     */
    getInsights() {
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
    calculateRelevance(pattern, query) {
        let relevance = 0;
        if (pattern.name.toLowerCase().includes(query))
            relevance += 3;
        if (pattern.description.toLowerCase().includes(query))
            relevance += 2;
        if (pattern.metaphysicalContext.toLowerCase().includes(query))
            relevance += 2;
        if (pattern.relationships.some(rel => rel.toLowerCase().includes(query)))
            relevance += 1;
        if (pattern.applications.some(app => app.toLowerCase().includes(query)))
            relevance += 1;
        return relevance;
    }
    /**
     * Create a new question
     */
    createQuestion(pattern, context = {}, observers = []) {
        const question = {
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
    addAnswer(questionId, content, resonance = 0.5, subQuestions) {
        const question = this.questions.find(q => q.id === questionId);
        if (!question)
            return null;
        const answer = {
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
    getQuestions() {
        return this.questions;
    }
    getQuestionById(id) {
        return this.questions.find(q => q.id === id);
    }
}
exports.KnowledgeSystem = KnowledgeSystem;
// Core Knowledge Patterns
KnowledgeSystem.KNOWLEDGE_PATTERNS = {
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
KnowledgeSystem.EXTRA_PATTERNS = [
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
        numericalData: [3, 6, 9],
        relationships: ['vortex sequence', 'family groups'],
        metaphysicalContext: 'The W-Axis is the axis of spirit, perpendicular to material flow.',
        applications: ['spiritual practice', 'energy work', 'field alignment']
    },
    {
        id: 'metaphysical_4',
        name: 'Polar Harmony',
        category: 'metaphysical',
        description: 'Polar mates create harmony through opposition, summing to 9.',
        numericalData: [[1, 8], [2, 7], [4, 5]],
        relationships: ['family groups', 'vortex sequence'],
        metaphysicalContext: 'Opposites are necessary for balance and flow in the toroidal field.',
        applications: ['conflict resolution', 'system balance', 'creative tension']
    }
];
//# sourceMappingURL=KnowledgeSystem.js.map