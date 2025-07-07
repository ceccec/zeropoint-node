"use strict";
/**
 * Knowledge System Demo
 *
 * Demonstrates the comprehensive knowledge base capturing all the
 * metaphysical and mathematical patterns discovered from the ZeroPoint system.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runKnowledgeSystemDemo = runKnowledgeSystemDemo;
const KnowledgeSystem_1 = require("../src/knowledge/KnowledgeSystem");
async function runKnowledgeSystemDemo() {
    console.log('🧠 ZeroPoint Knowledge System Demo');
    console.log('=====================================\n');
    const knowledgeSystem = new KnowledgeSystem_1.KnowledgeSystem();
    // 1. SYSTEM OVERVIEW
    console.log('1. KNOWLEDGE SYSTEM OVERVIEW');
    console.log('----------------------------');
    const insights = knowledgeSystem.getInsights();
    console.log(`Total Knowledge Patterns: ${insights.totalPatterns}`);
    console.log(`Categories: ${insights.categories.map((c) => `${c.name} (${c.count})`).join(', ')}`);
    console.log('\nCore Relationships:');
    Object.entries(insights.coreRelationships).forEach(([key, value]) => {
        console.log(`  ${key}: ${value}`);
    });
    console.log('\nMetaphysical Principles:');
    Object.entries(insights.metaphysicalPrinciples).forEach(([key, value]) => {
        console.log(`  ${key}: ${value}`);
    });
    // 2. VORTEX PATTERNS
    console.log('\n\n2. VORTEX PATTERNS');
    console.log('------------------');
    const vortexPatterns = knowledgeSystem.getPatternsByCategory('vortex');
    for (const pattern of vortexPatterns) {
        console.log(`\n${pattern.name}:`);
        console.log(`  Description: ${pattern.description}`);
        console.log(`  Data: ${JSON.stringify(pattern.numericalData)}`);
        console.log(`  Relationships: ${pattern.relationships.join(', ')}`);
        console.log(`  Applications: ${pattern.applications.join(', ')}`);
        console.log(`  Metaphysics: ${pattern.metaphysicalContext}`);
    }
    // 3. FAMILY PATTERNS
    console.log('\n\n3. FAMILY PATTERNS');
    console.log('------------------');
    const familyPatterns = knowledgeSystem.getPatternsByCategory('family');
    for (const pattern of familyPatterns) {
        console.log(`\n${pattern.name}:`);
        console.log(`  Description: ${pattern.description}`);
        console.log(`  Data: ${JSON.stringify(pattern.numericalData)}`);
        console.log(`  Relationships: ${pattern.relationships.join(', ')}`);
        console.log(`  Applications: ${pattern.applications.join(', ')}`);
        console.log(`  Metaphysics: ${pattern.metaphysicalContext}`);
    }
    // 4. POLAR PATTERNS
    console.log('\n\n4. POLAR PATTERNS');
    console.log('------------------');
    const polarPatterns = knowledgeSystem.getPatternsByCategory('polar');
    for (const pattern of polarPatterns) {
        console.log(`\n${pattern.name}:`);
        console.log(`  Description: ${pattern.description}`);
        console.log(`  Data: ${JSON.stringify(pattern.numericalData)}`);
        console.log(`  Relationships: ${pattern.relationships.join(', ')}`);
        console.log(`  Applications: ${pattern.applications.join(', ')}`);
        console.log(`  Metaphysics: ${pattern.metaphysicalContext}`);
    }
    // 5. SPIRITUAL PATTERNS
    console.log('\n\n5. SPIRITUAL PATTERNS');
    console.log('---------------------');
    const spiritualPatterns = knowledgeSystem.getPatternsByCategory('spiritual');
    for (const pattern of spiritualPatterns) {
        console.log(`\n${pattern.name}:`);
        console.log(`  Description: ${pattern.description}`);
        console.log(`  Data: ${JSON.stringify(pattern.numericalData)}`);
        console.log(`  Relationships: ${pattern.relationships.join(', ')}`);
        console.log(`  Applications: ${pattern.applications.join(', ')}`);
        console.log(`  Metaphysics: ${pattern.metaphysicalContext}`);
    }
    // 6. VOID PATTERNS
    console.log('\n\n6. VOID PATTERNS');
    console.log('----------------');
    const voidPatterns = knowledgeSystem.getPatternsByCategory('void');
    for (const pattern of voidPatterns) {
        console.log(`\n${pattern.name}:`);
        console.log(`  Description: ${pattern.description}`);
        console.log(`  Data: ${JSON.stringify(pattern.numericalData)}`);
        console.log(`  Relationships: ${pattern.relationships.join(', ')}`);
        console.log(`  Applications: ${pattern.applications.join(', ')}`);
        console.log(`  Metaphysics: ${pattern.metaphysicalContext}`);
    }
    // 7. MATHEMATICAL PATTERNS
    console.log('\n\n7. MATHEMATICAL PATTERNS');
    console.log('------------------------');
    const mathematicalPatterns = knowledgeSystem.getPatternsByCategory('mathematical');
    for (const pattern of mathematicalPatterns) {
        console.log(`\n${pattern.name}:`);
        console.log(`  Description: ${pattern.description}`);
        console.log(`  Data: ${JSON.stringify(pattern.numericalData)}`);
        console.log(`  Relationships: ${pattern.relationships.join(', ')}`);
        console.log(`  Applications: ${pattern.applications.join(', ')}`);
        console.log(`  Metaphysics: ${pattern.metaphysicalContext}`);
    }
    // 8. METAPHYSICAL PATTERNS
    console.log('\n\n8. METAPHYSICAL PATTERNS');
    console.log('------------------------');
    const metaphysicalPatterns = knowledgeSystem.getPatternsByCategory('metaphysical');
    for (const pattern of metaphysicalPatterns) {
        console.log(`\n${pattern.name}:`);
        console.log(`  Description: ${pattern.description}`);
        console.log(`  Data: ${JSON.stringify(pattern.numericalData)}`);
        console.log(`  Relationships: ${pattern.relationships.join(', ')}`);
        console.log(`  Applications: ${pattern.applications.join(', ')}`);
        console.log(`  Metaphysics: ${pattern.metaphysicalContext}`);
    }
    // 9. SEARCH FUNCTIONALITY
    console.log('\n\n9. KNOWLEDGE SEARCH');
    console.log('-------------------');
    const searchQueries = [
        'vortex',
        'family',
        'polar',
        'spiritual',
        'void',
        'consciousness',
        'flow',
        'balance',
        'creation',
        'transformation'
    ];
    for (const query of searchQueries) {
        console.log(`\nSearch for "${query}":`);
        const result = knowledgeSystem.searchKnowledge({ query });
        console.log(`  Found ${result.patterns.length} patterns`);
        if (result.patterns.length > 0 && result.patterns[0]) {
            console.log(`  Top result: ${result.patterns[0].name}`);
            console.log(`  Categories: ${[...new Set(result.patterns.map(p => p.category))].join(', ')}`);
            console.log(`  Relationships: ${result.relationships.slice(0, 5).join(', ')}`);
            console.log(`  Applications: ${result.applications.slice(0, 5).join(', ')}`);
        }
    }
    // 10. RELATIONSHIP ANALYSIS
    console.log('\n\n10. RELATIONSHIP ANALYSIS');
    console.log('-------------------------');
    const keyPatterns = ['vortex_sequence', 'family_groups', 'polar_mates', 'w_axis', 'void_center'];
    for (const patternId of keyPatterns) {
        console.log(`\nRelated patterns for "${patternId}":`);
        const related = knowledgeSystem.getRelatedPatterns(patternId);
        console.log(`  Found ${related.length} related patterns`);
        for (const pattern of related.slice(0, 3)) {
            console.log(`    - ${pattern.name} (${pattern.category})`);
        }
    }
    // 11. CATEGORY ANALYSIS
    console.log('\n\n11. CATEGORY ANALYSIS');
    console.log('---------------------');
    const categories = knowledgeSystem.getCategories();
    for (const category of categories) {
        console.log(`\n${category.toUpperCase()} CATEGORY:`);
        const patterns = knowledgeSystem.getPatternsByCategory(category);
        console.log(`  Total patterns: ${patterns.length}`);
        console.log(`  Pattern names: ${patterns.map(p => p.name).join(', ')}`);
        // Show relationships within category
        const relationships = new Set();
        patterns.forEach(p => p.relationships.forEach(r => relationships.add(r)));
        console.log(`  Key relationships: ${Array.from(relationships).slice(0, 5).join(', ')}`);
    }
    // 12. INTEGRATION INSIGHTS
    console.log('\n\n12. INTEGRATION INSIGHTS');
    console.log('------------------------');
    console.log('\nKey Integration Points:');
    console.log('• The vortex sequence [1,2,4,8,7,5] flows through all patterns');
    console.log('• Family groups [1,4,7], [2,5,8], [3,6,9] show creation phases');
    console.log('• Polar mates [1,8], [2,7], [4,5] create balance through opposition');
    console.log('• W-Axis [3,6,9] represents spiritual dimension perpendicular to material');
    console.log('• Void center contains infinite potential at coordinates [0,0,0,0]');
    console.log('• Aperture (zero) is the gateway between unmanifest and manifest');
    console.log('• Golden ratio φ ≈ 1.618 governs natural growth and consciousness evolution');
    console.log('• Digital root shows how all numbers cycle through the vortex sequence');
    console.log('• Toroidal geometry is the fundamental shape of reality');
    console.log('• Consciousness flows through the toroidal structure following vortex patterns');
    console.log('\n\n✅ Knowledge System Demo Complete!');
    console.log('\nThe Knowledge System now contains:');
    console.log(`• ${insights.totalPatterns} comprehensive knowledge patterns`);
    console.log(`• ${categories.length} categories of understanding`);
    console.log('• Complete relationship mapping between all patterns');
    console.log('• Metaphysical context for each pattern');
    console.log('• Practical applications for each concept');
    console.log('• Advanced search and discovery capabilities');
    console.log('• Integration with the entire ZeroPoint system');
}
// Run the demo
if (require.main === module) {
    runKnowledgeSystemDemo().catch(console.error);
}
//# sourceMappingURL=knowledge-system-demo.js.map