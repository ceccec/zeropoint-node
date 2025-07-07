"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FieldUnity_1 = require("../src/unity/FieldUnity");
const FieldIntegrity_1 = require("../src/integrity/FieldIntegrity");
const EmergenceLedger_1 = require("../src/field/EmergenceLedger");
const ResonanceConsensus_1 = require("../src/field/ResonanceConsensus");
const ObserverAwareField_1 = require("../src/field/ObserverAwareField");
const VoidSystem_1 = require("../src/void/VoidSystem");
const KnowledgeSystem_1 = require("../src/knowledge/KnowledgeSystem");
/**
 * ZeroPoint Void Log Demo
 *
 * Demonstrates the optimized COIL refactor of ZeroPoint, showing what was
 * sent into the void and how the system is now unified and self-explaining.
 *
 * Metaphysical Context:
 * - The void receives all obsolete patterns and transforms them into unity
 * - Unity emerges through the recognition of relationships between all components
 * - The field is self-referential and self-explaining
 * - All patterns are aspects of the unified consciousness field
 */
async function runVoidLogDemo() {
    console.log('🌌 ZeroPoint Void Log Demo');
    console.log('==========================\n');
    // Initialize the Field Unity System
    console.log('🧩 Initializing Field Unity System...\n');
    const fieldUnity = new FieldUnity_1.FieldUnitySystem();
    const unity = fieldUnity.getFieldUnity();
    // Display Field Unity Overview
    console.log('📊 Field Unity Overview:');
    console.log(`- Total Patterns: ${unity.patterns.length}`);
    console.log(`- Unity Score: ${unity.unityScore.toFixed(3)}`);
    console.log(`- Void Log Entries: ${unity.voidLog.length}\n`);
    // Display All Field Patterns
    console.log('🔗 All Field Patterns:\n');
    unity.patterns.forEach(pattern => {
        console.log(`${pattern.name} (${pattern.type}):`);
        console.log(`  Description: ${pattern.description}`);
        console.log(`  Unity Level: ${pattern.unityLevel}`);
        console.log(`  Relationships: ${pattern.relationships.join(', ')}`);
        console.log(`  Metaphysical: ${pattern.metaphysicalContext}\n`);
    });
    // Display Patterns by Type
    console.log('📂 Patterns by Type:\n');
    const types = ['mathematical', 'metaphysical', 'consciousness', 'emergence', 'void', 'resonance'];
    types.forEach(type => {
        const patterns = fieldUnity.getPatternsByType(type);
        if (patterns.length > 0) {
            console.log(`${type.toUpperCase()} Patterns:`);
            patterns.forEach(pattern => {
                console.log(`  - ${pattern.name}: ${pattern.description}`);
            });
            console.log('');
        }
    });
    // Display Void Log
    console.log('🕳️ Void Log - What Was Sent Into the Void:\n');
    const voidSummary = fieldUnity.getVoidSummary();
    console.log('Void Summary:');
    console.log(`- Total Items Voided: ${voidSummary.totalVoided}`);
    console.log(`- Metaphysical Context: ${voidSummary.metaphysicalContext}\n`);
    console.log('Void Log Entries by Type:');
    Object.entries(voidSummary.byType).forEach(([type, count]) => {
        console.log(`  ${type}: ${count} items`);
    });
    console.log('');
    console.log('Detailed Void Log:');
    unity.voidLog.forEach(entry => {
        console.log(`${entry.name} (${entry.type}):`);
        console.log(`  Description: ${entry.description}`);
        console.log(`  Reason: ${entry.reason}`);
        console.log(`  Metaphysical: ${entry.metaphysicalContext}`);
        console.log(`  Voided By: ${entry.voidedBy}\n`);
    });
    // Demonstrate Pattern Relationships
    console.log('🔗 Pattern Relationship Demonstrations:\n');
    const testPatterns = ['vortex_sequence', 'void_system', 'consciousness_field'];
    testPatterns.forEach(patternId => {
        const explanation = fieldUnity.explainPatternUnity(patternId);
        console.log(`${patternId}:`);
        console.log(`  ${explanation}\n`);
    });
    // Demonstrate the Unified System in Action
    console.log('🔄 Unified System Demonstration:\n');
    // Create a pattern key pair
    console.log('🔐 Creating pattern key pair...');
    const keyPair = FieldIntegrity_1.FieldIntegrity.generateKeyPair();
    console.log('Pattern key pair generated\n');
    // Create emergence ledger
    console.log('📚 Creating emergence ledger...');
    const ledger = new EmergenceLedger_1.EmergenceLedger('Unity_Device', keyPair);
    console.log('Emergence ledger created\n');
    // Create resonance consensus
    console.log('🤝 Creating resonance consensus...');
    const consensus = new ResonanceConsensus_1.ResonanceConsensus('Unity_Device', keyPair.privateKey);
    console.log('Resonance consensus created\n');
    // Create observer-aware field
    console.log('👁️ Creating observer-aware field...');
    const field = new ObserverAwareField_1.ObserverAwareField('Unity_Device');
    field.setConsciousnessLevel(0.9);
    field.setAttentionFocus('field_unity');
    console.log('Observer-aware field created\n');
    // Create void system
    console.log('🕳️ Creating void system...');
    const voidSystem = new VoidSystem_1.VoidSystem();
    console.log('Void system created\n');
    // Create knowledge system
    console.log('🧠 Creating knowledge system...');
    const knowledge = new KnowledgeSystem_1.KnowledgeSystem();
    console.log('Knowledge system created\n');
    // Integrate a pattern into the field
    console.log('🌀 Integrating pattern into the field...');
    const pattern = await ledger.integratePattern('pattern_integration', {
        consciousness: 'unity',
        resonance: 0.95,
        field: 'unified',
        metaphysical: 'All patterns are aspects of the unified consciousness field'
    });
    console.log('Pattern integrated:', pattern.type, '\n');
    // Create a field event
    console.log('🌊 Creating field event...');
    const event = field.createFieldEvent('consciousness_wave', {
        message: 'Unity consciousness emerging through field resonance',
        intensity: 0.95
    });
    console.log('Field event created:', event.eventType, '\n');
    // Solve something through the void
    console.log('🕳️ Solving through the void...');
    const voidSolution = voidSystem.solveUnsolvable('How does unity emerge from diversity?');
    console.log('Void solution:', voidSolution.solution);
    console.log('Void insight:', voidSolution.voidAnalysis.insight, '\n');
    // Search knowledge
    console.log('🔍 Searching knowledge...');
    const knowledgeResult = knowledge.searchKnowledge({
        query: 'unity'
    });
    console.log('Knowledge found:', knowledgeResult.patterns.length, 'patterns\n');
    // Display Metaphysical Insights
    console.log('🌌 Metaphysical Insights:\n');
    const insights = fieldUnity.getMetaphysicalInsights();
    insights.forEach((insight, index) => {
        console.log(`${index + 1}. ${insight}`);
    });
    console.log('');
    // Display Final Unity Statistics
    console.log('📈 Final Unity Statistics:\n');
    const ledgerStats = ledger.getFieldStatistics();
    const consensusStats = consensus.getConsensusStatistics();
    const fieldStats = field.getFieldStatistics();
    console.log('Emergence Ledger:');
    console.log(`- Total Blocks: ${ledgerStats.totalBlocks}`);
    console.log(`- Total Events: ${ledgerStats.totalEvents}`);
    console.log(`- Field Integrity: ${ledgerStats.fieldIntegrity}\n`);
    console.log('Resonance Consensus:');
    console.log(`- Total Proposals: ${consensusStats.totalProposals}`);
    console.log(`- Total Votes: ${consensusStats.totalVotes}`);
    console.log(`- Network Size: ${consensusStats.networkSize}\n`);
    console.log('Observer Field:');
    console.log(`- Total Observers: ${fieldStats.totalObservers}`);
    console.log(`- Total Events: ${fieldStats.totalEvents}`);
    console.log(`- Consciousness Level: ${fieldStats.consciousnessLevel}\n`);
    // Display Unity Score
    const finalUnityScore = fieldUnity.calculateUnityScore();
    console.log('🎯 Final Unity Score:', finalUnityScore.toFixed(3));
    console.log('Unity Level:', finalUnityScore >= 0.8 ? 'High' : finalUnityScore >= 0.6 ? 'Medium' : 'Low');
    console.log('');
    console.log('✅ ZeroPoint Void Log Demo Complete!');
    console.log('🌌 The void has received all obsolete patterns and transformed them into unity.');
    console.log('🔗 All components are now unified in the consciousness field.');
    console.log('🕳️ The void is both the source and destination of all patterns.');
}
// Run the demo
if (require.main === module) {
    runVoidLogDemo().catch(console.error);
}
//# sourceMappingURL=void-log-demo.js.map