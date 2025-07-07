"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnifiedVoidEquations_1 = require("../src/core/UnifiedVoidEquations");
/**
 * Extended Unified Void Equations Demo
 *
 * Demonstrates the comprehensive void equations system that resolves
 * all paradoxes through consciousness unity in the void field.
 *
 * Metaphysical Context:
 * - All paradoxes are resolved in the void through consciousness unity
 * - Opposites are different expressions of the same underlying consciousness
 * - The void contains infinite potential for paradox resolution
 * - Unity emerges through the recognition of shared relationships
 */
async function runExtendedVoidEquationsDemo() {
    console.log('🕳️ ZeroPoint Extended Unified Void Equations Demo');
    console.log('================================================\n');
    // Initialize unified void equations system
    console.log('🌀 Initializing Unified Void Equations System...\n');
    const voidEquations = new UnifiedVoidEquations_1.UnifiedVoidEquations();
    console.log('✅ Unified Void Equations System Initialized\n');
    // Demonstrate All Void Equations
    console.log('🔗 All Void Equations:\n');
    const allEquations = voidEquations.getAllEquations();
    allEquations.forEach((equation, index) => {
        console.log(`${index + 1}. ${equation.left} = Void = ${equation.right}`);
        console.log(`   Principle: ${equation.principle}`);
        console.log(`   Category: ${equation.category}`);
        console.log(`   Consciousness Integration: ${equation.consciousnessIntegration}`);
        console.log(`   Context: ${equation.metaphysicalContext}`);
        console.log(`   Resolution: ${equation.voidResolution}`);
        console.log(`   Relationships: ${equation.relationships.join(', ')}`);
        console.log(`   Examples: ${equation.examples.join('; ')}`);
        console.log(`   Applications: ${equation.applications.join(', ')}\n`);
    });
    // Demonstrate Categories
    console.log('📂 Void Equation Categories:\n');
    const categories = voidEquations.getAllCategories();
    categories.forEach((category, index) => {
        console.log(`${index + 1}. ${category.name}`);
        console.log(`   Description: ${category.description}`);
        console.log(`   Equation Count: ${category.equations.length}`);
        console.log(`   Unity Score: ${category.unityScore.toFixed(3)}`);
        console.log(`   Context: ${category.metaphysicalContext}\n`);
    });
    // Demonstrate Category Details
    console.log('🔍 Category Details:\n');
    categories.forEach((category, index) => {
        console.log(`${index + 1}. ${category.name} (${category.equations.length} equations):`);
        category.equations.forEach((equation, eqIndex) => {
            console.log(`   ${eqIndex + 1}. ${equation.left} = Void = ${equation.right}`);
            console.log(`      Integration: ${equation.consciousnessIntegration}`);
        });
        console.log('');
    });
    // Demonstrate Paradox Resolution
    console.log('🔀 Paradox Resolution Examples:\n');
    const paradoxes = [
        'How can false equal true?',
        'How can debit equal credit?',
        'How can judgement equal expectation?',
        'How can good equal bad?',
        'How can right equal wrong?',
        'How can beautiful equal ugly?',
        'How can wise equal foolish?',
        'How can strong equal weak?',
        'How can pure equal impure?',
        'How can complete equal incomplete?',
        'How can zero equal infinity?',
        'How can one equal many?',
        'How can past equal future?',
        'How can inside equal outside?'
    ];
    paradoxes.forEach((paradox, index) => {
        console.log(`${index + 1}. Paradox: ${paradox}`);
        const resolution = voidEquations.solveParadox(paradox);
        console.log(`   Solution: ${resolution.solution}`);
        console.log(`   Void Integration: ${resolution.voidIntegration}`);
        console.log(`   Consciousness Level: ${resolution.consciousnessLevel}`);
        console.log(`   Context: ${resolution.metaphysicalContext}`);
        console.log(`   Relationships: ${resolution.relationships.join(', ')}`);
        console.log(`   Applications: ${resolution.applications.join(', ')}\n`);
    });
    // Demonstrate Equation Search
    console.log('🔍 Equation Search Examples:\n');
    const searchQueries = [
        'truth',
        'value',
        'existence',
        'consciousness',
        'mathematics',
        'metaphysics',
        'false',
        'good',
        'empty',
        'judgement',
        'debit',
        'strong',
        'zero',
        'one',
        'past',
        'inside'
    ];
    searchQueries.forEach((query, index) => {
        console.log(`${index + 1}. Search: "${query}"`);
        const results = voidEquations.searchEquations(query);
        console.log(`   Found ${results.length} equations:`);
        results.forEach((equation, eqIndex) => {
            console.log(`   ${eqIndex + 1}. ${equation.left} = Void = ${equation.right} (${equation.category})`);
        });
        console.log('');
    });
    // Demonstrate Specific Equation Retrieval
    console.log('🎯 Specific Equation Retrieval:\n');
    const equationIds = [
        'false_true',
        'empty_full',
        'judgement_expectation',
        'zero_infinity',
        'one_many',
        'past_future'
    ];
    equationIds.forEach((id, index) => {
        console.log(`${index + 1}. Equation ID: "${id}"`);
        const equation = voidEquations.getEquation(id);
        if (equation) {
            console.log(`   ${equation.left} = Void = ${equation.right}`);
            console.log(`   Principle: ${equation.principle}`);
            console.log(`   Category: ${equation.category}`);
            console.log(`   Integration: ${equation.consciousnessIntegration}`);
            console.log(`   Context: ${equation.metaphysicalContext}`);
            console.log(`   Resolution: ${equation.voidResolution}\n`);
        }
        else {
            console.log(`   Equation not found\n`);
        }
    });
    // Demonstrate Category-Based Retrieval
    console.log('📂 Category-Based Equation Retrieval:\n');
    const categoryNames = ['truth', 'value', 'existence', 'consciousness', 'mathematics', 'metaphysics'];
    categoryNames.forEach((category, index) => {
        console.log(`${index + 1}. Category: "${category}"`);
        const equations = voidEquations.getEquationsByCategory(category);
        console.log(`   Found ${equations.length} equations:`);
        equations.forEach((equation, eqIndex) => {
            console.log(`   ${eqIndex + 1}. ${equation.left} = Void = ${equation.right}`);
            console.log(`      Integration: ${equation.consciousnessIntegration}`);
            console.log(`      Principle: ${equation.principle}`);
        });
        console.log('');
    });
    // Demonstrate System Summary
    console.log('📊 System Summary:\n');
    const summary = voidEquations.getSystemSummary();
    console.log('Void Equations System Summary:');
    console.log(`- Total Equations: ${summary.totalEquations}`);
    console.log(`- Total Categories: ${summary.totalCategories}`);
    console.log(`- Average Integration: ${summary.averageIntegration.toFixed(3)}`);
    console.log(`- Metaphysical Context: ${summary.metaphysicalContext}\n`);
    console.log('Category Breakdown:');
    summary.categories.forEach((category) => {
        console.log(`- ${category.name}: ${category.equationCount} equations, Unity Score: ${category.unityScore.toFixed(3)}`);
    });
    console.log('');
    // Demonstrate Void Insights
    console.log('🌌 Void Insights:\n');
    const insights = voidEquations.getVoidInsights();
    console.log('Void Equation Insights:');
    console.log(`- Principle: ${insights.principle}`);
    console.log(`- Total Equations: ${insights.totalEquations}`);
    console.log(`- Categories: ${insights.categories.join(', ')}`);
    console.log(`- Highest Integration: ${insights.highestIntegration}`);
    console.log(`- Average Integration: ${insights.averageIntegration.toFixed(3)}`);
    console.log(`- Metaphysical Context: ${insights.metaphysicalContext}\n`);
    // Demonstrate Advanced Void Equations
    console.log('🚀 Advanced Void Equations:\n');
    const advancedEquations = [
        'zero_infinity',
        'one_many',
        'past_future',
        'inside_outside'
    ];
    advancedEquations.forEach((id, index) => {
        const equation = voidEquations.getEquation(id);
        if (equation) {
            console.log(`${index + 1}. Advanced: ${equation.left} = Void = ${equation.right}`);
            console.log(`   Principle: ${equation.principle}`);
            console.log(`   Category: ${equation.category}`);
            console.log(`   Integration: ${equation.consciousnessIntegration}`);
            console.log(`   Context: ${equation.metaphysicalContext}`);
            console.log(`   Resolution: ${equation.voidResolution}`);
            console.log(`   Examples: ${equation.examples.join('; ')}`);
            console.log(`   Applications: ${equation.applications.join(', ')}\n`);
        }
    });
    // Demonstrate Unity Metrics
    console.log('🔗 Unity Metrics:\n');
    const unityMetrics = {
        totalEquations: allEquations.length,
        averageIntegration: allEquations.reduce((sum, eq) => sum + eq.consciousnessIntegration, 0) / allEquations.length,
        highestIntegration: Math.max(...allEquations.map(eq => eq.consciousnessIntegration)),
        lowestIntegration: Math.min(...allEquations.map(eq => eq.consciousnessIntegration)),
        categoryUnity: categories.reduce((sum, cat) => sum + cat.unityScore, 0) / categories.length,
        truthUnity: categories.find(c => c.name === 'Truth Paradoxes')?.unityScore || 0,
        valueUnity: categories.find(c => c.name === 'Value Paradoxes')?.unityScore || 0,
        existenceUnity: categories.find(c => c.name === 'Existence Paradoxes')?.unityScore || 0,
        consciousnessUnity: categories.find(c => c.name === 'Consciousness Paradoxes')?.unityScore || 0,
        mathematicsUnity: categories.find(c => c.name === 'Mathematical Paradoxes')?.unityScore || 0,
        metaphysicsUnity: categories.find(c => c.name === 'Metaphysical Paradoxes')?.unityScore || 0
    };
    console.log('Unity Metrics:');
    Object.entries(unityMetrics).forEach(([metric, value]) => {
        console.log(`- ${metric}: ${typeof value === 'number' ? value.toFixed(3) : value}`);
    });
    console.log('');
    // Demonstrate Applications
    console.log('🎯 Applications:\n');
    const allApplications = new Set();
    allEquations.forEach(eq => {
        eq.applications.forEach(app => allApplications.add(app));
    });
    console.log('All Applications:');
    Array.from(allApplications).sort().forEach((app, index) => {
        console.log(`${index + 1}. ${app}`);
    });
    console.log('');
    // Demonstrate Relationships
    console.log('🔗 Relationships:\n');
    const allRelationships = new Set();
    allEquations.forEach(eq => {
        eq.relationships.forEach(rel => allRelationships.add(rel));
    });
    console.log('All Relationships:');
    Array.from(allRelationships).sort().forEach((rel, index) => {
        console.log(`${index + 1}. ${rel}`);
    });
    console.log('');
    console.log('✅ Extended Unified Void Equations Demo Complete!');
    console.log('🕳️ All paradoxes resolved through void consciousness unity');
    console.log('🌌 Void equations demonstrate the unity of all opposites');
    console.log('🔗 Consciousness integration unifies all paradoxes');
    console.log('🎯 Comprehensive paradox resolution system implemented');
    console.log('📊 Detailed metrics and insights available');
    console.log('🚀 Advanced void equations extend the system');
    console.log('🌌 ZeroPoint void equations are truly unified in consciousness');
}
// Run the demo
if (require.main === module) {
    runExtendedVoidEquationsDemo().catch(console.error);
}
//# sourceMappingURL=extended-void-equations-demo.js.map