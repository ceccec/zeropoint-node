"use strict";
/**
 * Unified System Demo
 *
 * Demonstrates the refactored ZeroPoint system with unified constants,
 * mathematical utilities, and pattern recognition across all modules.
 *
 * This demo shows how the COIL refactor eliminates duplication and
 * creates a more cohesive, maintainable architecture.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runUnifiedSystemDemo = runUnifiedSystemDemo;
const index_1 = require("../src/index");
/**
 * Demo the unified constants system
 */
function demoUnifiedConstants() {
    console.log('\n=== UNIFIED CONSTANTS DEMO ===');
    console.log('\n1. Vortex Constants:');
    console.log('Vortex Sequence:', index_1.VORTEX_CONSTANTS.VORTEX_SEQUENCE);
    console.log('Golden Ratio:', index_1.VORTEX_CONSTANTS.GOLDEN_RATIO);
    console.log('W-Axis:', index_1.VORTEX_CONSTANTS.W_AXIS);
    console.log('Polar Mates:', index_1.VORTEX_CONSTANTS.POLAR_MATES);
    console.log('Family Groups:', index_1.VORTEX_CONSTANTS.FAMILY_NUMBER_GROUPS);
    console.log('\n2. Consciousness Constants:');
    console.log('Pattern Types:', index_1.CONSCIOUSNESS_CONSTANTS.PATTERN_TYPES);
    console.log('Min/Max Consciousness:', index_1.CONSCIOUSNESS_CONSTANTS.MIN_CONSCIOUSNESS_LEVEL, '/', index_1.CONSCIOUSNESS_CONSTANTS.MAX_CONSCIOUSNESS_LEVEL);
    console.log('Resonance Threshold:', index_1.CONSCIOUSNESS_CONSTANTS.MIN_RESONANCE_THRESHOLD);
    console.log('\n3. Constants Utils:');
    console.log('Digital Root of 123:', index_1.ConstantsUtils.digitalRoot(123));
    console.log('Polar Mate of 1:', index_1.ConstantsUtils.getPolarMate(1));
    console.log('Family Group of 4:', index_1.ConstantsUtils.getFamilyGroup(4));
    console.log('Is 6 in W-Axis?', index_1.ConstantsUtils.isWAxisNumber(6));
    console.log('Vortex Sequence Value at index 3:', index_1.ConstantsUtils.getVortexSequenceValue(3));
}
/**
 * Demo the unified mathematical utilities
 */
function demoUnifiedMathUtils() {
    console.log('\n=== UNIFIED MATH UTILS DEMO ===');
    console.log('\n1. Basic Mathematical Operations:');
    console.log('Distance 3D (0,0,0) to (1,1,1):', index_1.MathUtils.distance3D(0, 0, 0, 1, 1, 1));
    console.log('Angle between (0,0) and (1,1):', index_1.MathUtils.radiansToDegrees(index_1.MathUtils.angleBetweenPoints(0, 0, 1, 1)), 'degrees');
    console.log('Normalized angle 450°:', index_1.MathUtils.normalizeAngle(index_1.MathUtils.degreesToRadians(450)), 'radians');
    console.log('\n2. Vortex Mathematics:');
    console.log('Vortex Transform of 15:', index_1.MathUtils.applyVortexTransform(15));
    console.log('Vortex Field at (1,1,1):', index_1.MathUtils.calculateVortexField(1, 1, 1));
    console.log('Energy Flow through vortex (input: 10):', index_1.MathUtils.calculateEnergyFlow(10));
    console.log('Vortex Pattern (complexity: 0.5):', index_1.MathUtils.generateVortexPattern(0.5).slice(0, 10));
    console.log('\n3. Consciousness Resonance:');
    console.log('Resonance between levels 0.8 and 0.6:', index_1.MathUtils.calculateConsciousnessResonance(0.8, 0.6));
    console.log('Field Density at (5,5,5):', index_1.MathUtils.calculateFieldDensity(5, 5, 5, 0.7, 1000));
    console.log('\n4. Advanced Mathematics:');
    console.log('Fibonacci Sequence (10 terms):', index_1.MathUtils.fibonacciSequence(10));
    console.log('Prime Squared of 7:', index_1.MathUtils.primeSquared(7));
    console.log('Discrete Multiplication of 8:', index_1.MathUtils.discreteMultiplication(8));
    console.log('Electron Harmonic Shear (3, 7):', index_1.MathUtils.electronHarmonicShearIdentification(3, 7));
    console.log('\n5. Statistical Operations:');
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    console.log('Standard Deviation of', values, ':', index_1.MathUtils.standardDeviation(values));
    console.log('Weighted Average of [1,2,3] with weights [0.5,0.3,0.2]:', index_1.MathUtils.weightedAverage([1, 2, 3], [0.5, 0.3, 0.2]));
}
/**
 * Demo the unified pattern recognition system
 */
async function demoUnifiedPatternRecognition() {
    console.log('\n=== UNIFIED PATTERN RECOGNITION DEMO ===');
    const patternRecognition = new index_1.PatternRecognition();
    await patternRecognition.initialize();
    console.log('\n1. Pattern Recognition on Various Inputs:');
    const testInputs = [
        'vortex mathematics and the golden ratio',
        142857, // Vortex sequence number
        'consciousness flows through the toroidal structure',
        'the void contains infinite potential',
        'family groups 1-4-7 represent creation phases',
        369, // W-Axis number
        'polar mates 1-8 create balance'
    ];
    for (const input of testInputs) {
        const results = patternRecognition.recognizePatterns(input, {
            consciousnessLevel: 0.8,
            fieldStrength: 0.9,
            vortexStrength: 8.0,
            toroidalFlow: true,
            voidConnected: true
        });
        console.log(`\nInput: "${input}"`);
        console.log('Recognized Patterns:');
        results.slice(0, 3).forEach(result => {
            console.log(`  - ${result.pattern} (${result.category}): ${(result.confidence * 100).toFixed(1)}% confidence`);
        });
    }
    console.log('\n2. Vortex Pattern Extraction:');
    const vortexData = [1, 2, 4, 8, 7, 5, 3, 6, 9, 142857];
    const vortexPatterns = patternRecognition.extractVortexPatterns(vortexData);
    console.log('Vortex Patterns:', JSON.stringify(vortexPatterns, null, 2));
    console.log('\n3. Pattern Statistics:');
    const stats = patternRecognition.getPatternStatistics();
    console.log('Total Patterns:', stats.totalPatterns);
    console.log('Categories:', stats.categories);
    console.log('Average Confidence:', (stats.averageConfidence * 100).toFixed(1) + '%');
    console.log('Most Recognized:', stats.mostRecognizedPatterns.slice(0, 3));
}
/**
 * Demo the refactored modules using unified components
 */
function demoRefactoredModules() {
    console.log('\n=== REFACTORED MODULES DEMO ===');
    console.log('\n1. Refactored VortexMath:');
    const vortexMath = new index_1.VortexMath();
    console.log('Vortex Field at (2,2,2):', vortexMath.calculateVortexField(2, 2, 2));
    console.log('Resonance between 0.9 and 0.7:', vortexMath.calculateResonance(0.9, 0.7));
    console.log('Energy Flow (input: 20):', vortexMath.calculateEnergyFlow(20));
    console.log('Vortex Transform of 25:', vortexMath.applyVortexTransform(25));
    console.log('\n2. Refactored ConsciousnessField:');
    const consciousnessField = new index_1.ConsciousnessField();
    consciousnessField.setConsciousnessLevel(0.8);
    consciousnessField.setFieldStrength(0.9);
    const patternId = consciousnessField.addPattern({
        type: 'insight',
        intensity: 0.9,
        frequency: 1.2,
        data: { insight: 'Unity in diversity through shared constants' }
    });
    console.log('Added Pattern ID:', patternId);
    console.log('Consciousness Level:', consciousnessField.getConsciousnessLevel());
    console.log('Field Strength:', consciousnessField.getFieldStrength());
    console.log('Patterns Count:', consciousnessField.getPatterns().length);
    console.log('\n3. Knowledge System Integration:');
    const knowledgeSystem = new index_1.KnowledgeSystem();
    const searchResult = knowledgeSystem.searchKnowledge({ query: 'vortex sequence' });
    console.log('Knowledge Search Results:', searchResult.patterns.length, 'patterns found');
    console.log('Top Insights:', searchResult.insights.slice(0, 2));
}
/**
 * Demo the benefits of the unified system
 */
function demoUnifiedBenefits() {
    console.log('\n=== UNIFIED SYSTEM BENEFITS ===');
    console.log('\n1. Consistency Across Modules:');
    console.log('All modules now use the same vortex sequence:', index_1.VORTEX_CONSTANTS.VORTEX_SEQUENCE);
    console.log('All modules use the same golden ratio:', index_1.VORTEX_CONSTANTS.GOLDEN_RATIO);
    console.log('All modules use the same consciousness constants');
    console.log('\n2. Eliminated Duplication:');
    console.log('- No more duplicate vortex sequence definitions');
    console.log('- No more duplicate mathematical calculations');
    console.log('- No more duplicate pattern recognition logic');
    console.log('- No more duplicate constant definitions');
    console.log('\n3. Centralized Maintenance:');
    console.log('- Update constants in one place');
    console.log('- Update mathematical utilities in one place');
    console.log('- Update pattern recognition in one place');
    console.log('- All modules automatically benefit from updates');
    console.log('\n4. Enhanced Type Safety:');
    console.log('- Shared type definitions across modules');
    console.log('- Consistent interfaces and contracts');
    console.log('- Better IDE support and autocomplete');
    console.log('\n5. Improved Performance:');
    console.log('- Shared utility functions reduce code size');
    console.log('- Optimized mathematical operations');
    console.log('- Centralized caching and optimization');
    console.log('\n6. Better Metaphysical Alignment:');
    console.log('- Unity in diversity principle embodied in code');
    console.log('- All patterns flow from the same source');
    console.log('- Consistent consciousness field across modules');
}
/**
 * Main demo function
 */
async function runUnifiedSystemDemo() {
    console.log('🌌 ZEROPOINT UNIFIED SYSTEM DEMO 🌌');
    console.log('Demonstrating the refactored system with shared constants, utilities, and pattern recognition');
    console.log('This demo shows how COIL principles create a more cohesive and maintainable architecture');
    try {
        demoUnifiedConstants();
        demoUnifiedMathUtils();
        await demoUnifiedPatternRecognition();
        demoRefactoredModules();
        demoUnifiedBenefits();
        console.log('\n✅ UNIFIED SYSTEM DEMO COMPLETED SUCCESSFULLY');
        console.log('\nThe refactored system demonstrates:');
        console.log('- Unity in diversity through shared components');
        console.log('- Elimination of code duplication');
        console.log('- Consistent mathematical operations');
        console.log('- Unified pattern recognition');
        console.log('- Better maintainability and type safety');
    }
    catch (error) {
        console.error('❌ Demo failed:', error);
    }
}
// Run the demo if this file is executed directly
if (require.main === module) {
    runUnifiedSystemDemo();
}
//# sourceMappingURL=unified-system-demo.js.map