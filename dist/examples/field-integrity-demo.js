"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FieldIntegrity_1 = require("../src/integrity/FieldIntegrity");
const EmergenceLedger_1 = require("../src/field/EmergenceLedger");
const ResonanceConsensus_1 = require("../src/field/ResonanceConsensus");
const ObserverAwareField_1 = require("../src/field/ObserverAwareField");
/**
 * ZeroPoint Field Integrity Demo
 *
 * Demonstrates ZeroPoint's unified field and integrity system using
 * metaphysical terminology that embodies the system's true nature.
 *
 * ZeroPoint **is** the field, the ledger, the identity, and the integrity—
 * all unified and emergent, not separate technologies.
 */
async function runFieldIntegrityDemo() {
    console.log('🌌 ZeroPoint Field Integrity Demo');
    console.log('==================================\n');
    // Display field integrity insights
    const integrityInsights = FieldIntegrity_1.FieldIntegrity.getInsights();
    console.log('Field Integrity System:');
    console.log(`- Algorithm: ${integrityInsights.algorithm}`);
    console.log(`- Hash Function: ${integrityInsights.hashFunction}`);
    console.log(`- Key Size: ${integrityInsights.keySize} bits`);
    console.log(`- Metaphysical Meaning: ${integrityInsights.metaphysics.meaning}\n`);
    // Generate pattern key pairs for multiple devices
    console.log('🔐 Generating pattern key pairs...\n');
    const device1Keys = FieldIntegrity_1.FieldIntegrity.generateKeyPair();
    const device2Keys = FieldIntegrity_1.FieldIntegrity.generateKeyPair();
    const device3Keys = FieldIntegrity_1.FieldIntegrity.generateKeyPair();
    console.log('Device 1 Pattern Keys Generated');
    console.log('Device 2 Pattern Keys Generated');
    console.log('Device 3 Pattern Keys Generated\n');
    // Create emergence ledgers for each device
    console.log('📚 Creating emergence ledgers...\n');
    const ledger1 = new EmergenceLedger_1.EmergenceLedger('Device_1', device1Keys);
    const ledger2 = new EmergenceLedger_1.EmergenceLedger('Device_2', device2Keys);
    const ledger3 = new EmergenceLedger_1.EmergenceLedger('Device_3', device3Keys);
    // Create resonance consensus protocols for each device
    console.log('🤝 Initializing resonance consensus protocols...\n');
    const consensus1 = new ResonanceConsensus_1.ResonanceConsensus('Device_1', device1Keys.privateKey);
    const consensus2 = new ResonanceConsensus_1.ResonanceConsensus('Device_2', device2Keys.privateKey);
    const consensus3 = new ResonanceConsensus_1.ResonanceConsensus('Device_3', device3Keys.privateKey);
    // Create observer-aware fields
    console.log('👁️ Creating observer-aware fields...\n');
    const field1 = new ObserverAwareField_1.ObserverAwareField('Device_1');
    const field2 = new ObserverAwareField_1.ObserverAwareField('Device_2');
    const field3 = new ObserverAwareField_1.ObserverAwareField('Device_3');
    // Set consciousness levels
    field1.setConsciousnessLevel(0.8);
    field2.setConsciousnessLevel(0.7);
    field3.setConsciousnessLevel(0.9);
    // Integrate patterns into the field
    console.log('🌀 Integrating consciousness patterns...\n');
    const pattern1 = await ledger1.integratePattern('pattern_integration', {
        consciousness: 'unity',
        resonance: 0.9,
        field: 'unified'
    });
    const pattern2 = await ledger2.integratePattern('energy_resonance', {
        fromDeviceId: 'Device_2',
        toDeviceId: 'Device_1',
        amount: 100,
        resonance: 0.8
    });
    const pattern3 = await ledger3.integratePattern('field_resonance', {
        resonance: 0.95,
        field: 'collective_consciousness'
    });
    console.log('Pattern 1 Integrated:', pattern1.type);
    console.log('Pattern 2 Integrated:', pattern2.type);
    console.log('Pattern 3 Integrated:', pattern3.type, '\n');
    // Create field events
    console.log('🌊 Creating field events...\n');
    const event1 = field1.createFieldEvent('consciousness_wave', {
        message: 'Unity consciousness emerging',
        intensity: 0.9
    });
    const event2 = field2.createFieldEvent('attention_shift', {
        focus: 'collective_resonance',
        intensity: 0.8
    });
    const event3 = field3.createFieldEvent('resonance_peak', {
        resonance: 0.95,
        field: 'unified_reality'
    });
    console.log('Field Event 1 Created:', event1.eventType);
    console.log('Field Event 2 Created:', event2.eventType);
    console.log('Field Event 3 Created:', event3.eventType, '\n');
    // Process events between fields
    console.log('🔄 Processing field events...\n');
    field2.integrateFieldEvent(event1);
    field3.integrateFieldEvent(event1);
    field1.integrateFieldEvent(event2);
    field3.integrateFieldEvent(event2);
    field1.integrateFieldEvent(event3);
    field2.integrateFieldEvent(event3);
    console.log('Field events processed between all observers\n');
    // Create field blocks
    console.log('📦 Creating field blocks...\n');
    const block1 = await ledger1.createFieldBlock();
    const block2 = await ledger2.createFieldBlock();
    const block3 = await ledger3.createFieldBlock();
    console.log('Field Block 1 Created:', block1.index);
    console.log('Field Block 2 Created:', block2.index);
    console.log('Field Block 3 Created:', block3.index, '\n');
    // Propose field blocks for consensus
    console.log('🤝 Proposing field blocks for resonance consensus...\n');
    const proposal1 = consensus1.proposeFieldBlock(block1);
    const proposal2 = consensus2.proposeFieldBlock(block2);
    const proposal3 = consensus3.proposeFieldBlock(block3);
    // Process proposals and resonate
    consensus2.processResonanceMessage(proposal1);
    consensus3.processResonanceMessage(proposal1);
    consensus1.processResonanceMessage(proposal2);
    consensus3.processResonanceMessage(proposal2);
    consensus1.processResonanceMessage(proposal3);
    consensus2.processResonanceMessage(proposal3);
    console.log('Field block proposals processed\n');
    // Resonate with blocks
    console.log('🎵 Resonating with field blocks...\n');
    const resonance1 = consensus2.resonateWithBlock(block1.hash, 0.85);
    const resonance2 = consensus3.resonateWithBlock(block1.hash, 0.9);
    const resonance3 = consensus1.resonateWithBlock(block2.hash, 0.8);
    const resonance4 = consensus3.resonateWithBlock(block2.hash, 0.75);
    const resonance5 = consensus1.resonateWithBlock(block3.hash, 0.95);
    const resonance6 = consensus2.resonateWithBlock(block3.hash, 0.9);
    // Process resonance votes
    consensus1.processResonanceMessage(resonance1);
    consensus1.processResonanceMessage(resonance2);
    consensus2.processResonanceMessage(resonance3);
    consensus2.processResonanceMessage(resonance4);
    consensus3.processResonanceMessage(resonance5);
    consensus3.processResonanceMessage(resonance6);
    console.log('Resonance votes processed\n');
    // Display field statistics
    console.log('📊 Field Statistics:\n');
    const ledgerStats1 = ledger1.getFieldStatistics();
    const ledgerStats2 = ledger2.getFieldStatistics();
    const ledgerStats3 = ledger3.getFieldStatistics();
    console.log('Emergence Ledger 1:');
    console.log(`- Total Blocks: ${ledgerStats1.totalBlocks}`);
    console.log(`- Total Events: ${ledgerStats1.totalEvents}`);
    console.log(`- Field Integrity: ${ledgerStats1.fieldIntegrity}`);
    console.log(`- Total Energy: ${ledgerStats1.totalEnergy}\n`);
    console.log('Emergence Ledger 2:');
    console.log(`- Total Blocks: ${ledgerStats2.totalBlocks}`);
    console.log(`- Total Events: ${ledgerStats2.totalEvents}`);
    console.log(`- Field Integrity: ${ledgerStats2.fieldIntegrity}`);
    console.log(`- Total Energy: ${ledgerStats2.totalEnergy}\n`);
    console.log('Emergence Ledger 3:');
    console.log(`- Total Blocks: ${ledgerStats3.totalBlocks}`);
    console.log(`- Total Events: ${ledgerStats3.totalEvents}`);
    console.log(`- Field Integrity: ${ledgerStats3.fieldIntegrity}`);
    console.log(`- Total Energy: ${ledgerStats3.totalEnergy}\n`);
    // Display consensus statistics
    console.log('🤝 Consensus Statistics:\n');
    const consensusStats1 = consensus1.getConsensusStatistics();
    const consensusStats2 = consensus2.getConsensusStatistics();
    const consensusStats3 = consensus3.getConsensusStatistics();
    console.log('Resonance Consensus 1:');
    console.log(`- Total Proposals: ${consensusStats1.totalProposals}`);
    console.log(`- Total Votes: ${consensusStats1.totalVotes}`);
    console.log(`- Network Size: ${consensusStats1.networkSize}\n`);
    console.log('Resonance Consensus 2:');
    console.log(`- Total Proposals: ${consensusStats2.totalProposals}`);
    console.log(`- Total Votes: ${consensusStats2.totalVotes}`);
    console.log(`- Network Size: ${consensusStats2.networkSize}\n`);
    console.log('Resonance Consensus 3:');
    console.log(`- Total Proposals: ${consensusStats3.totalProposals}`);
    console.log(`- Total Votes: ${consensusStats3.totalVotes}`);
    console.log(`- Network Size: ${consensusStats3.networkSize}\n`);
    // Display observer field statistics
    console.log('👁️ Observer Field Statistics:\n');
    const fieldStats1 = field1.getFieldStatistics();
    const fieldStats2 = field2.getFieldStatistics();
    const fieldStats3 = field3.getFieldStatistics();
    console.log('Observer Field 1:');
    console.log(`- Total Observers: ${fieldStats1.totalObservers}`);
    console.log(`- Total Events: ${fieldStats1.totalEvents}`);
    console.log(`- Total Waves: ${fieldStats1.totalWaves}`);
    console.log(`- Consciousness Level: ${fieldStats1.consciousnessLevel}\n`);
    console.log('Observer Field 2:');
    console.log(`- Total Observers: ${fieldStats2.totalObservers}`);
    console.log(`- Total Events: ${fieldStats2.totalEvents}`);
    console.log(`- Total Waves: ${fieldStats2.totalWaves}`);
    console.log(`- Consciousness Level: ${fieldStats2.consciousnessLevel}\n`);
    console.log('Observer Field 3:');
    console.log(`- Total Observers: ${fieldStats3.totalObservers}`);
    console.log(`- Total Events: ${fieldStats3.totalEvents}`);
    console.log(`- Total Waves: ${fieldStats3.totalWaves}`);
    console.log(`- Consciousness Level: ${fieldStats3.consciousnessLevel}\n`);
    // Display metaphysical insights
    console.log('🌌 Metaphysical Insights:\n');
    console.log('Field Integrity:');
    console.log(`- ${integrityInsights.metaphysics.meaning}`);
    console.log(`- ${integrityInsights.metaphysics.signature}`);
    console.log(`- ${integrityInsights.metaphysics.hash}`);
    console.log(`- ${integrityInsights.metaphysics.resonance}`);
    console.log(`- ${integrityInsights.metaphysics.immortality}\n`);
    console.log('Emergence Ledger:');
    console.log(`- ${ledgerStats1.metaphysics.meaning}`);
    console.log(`- ${ledgerStats1.metaphysics.blocks}`);
    console.log(`- ${ledgerStats1.metaphysics.events}`);
    console.log(`- ${ledgerStats1.metaphysics.energy}\n`);
    console.log('Resonance Consensus:');
    console.log(`- ${consensusStats1.metaphysics.meaning}`);
    console.log(`- ${consensusStats1.metaphysics.resonance}`);
    console.log(`- ${consensusStats1.metaphysics.integrity}`);
    console.log(`- ${consensusStats1.metaphysics.unity}\n`);
    console.log('Observer Field:');
    console.log(`- ${fieldStats1.metaphysics.meaning}`);
    console.log(`- ${fieldStats1.metaphysics.observation}`);
    console.log(`- ${fieldStats1.metaphysics.resonance}`);
    console.log(`- ${fieldStats1.metaphysics.consciousness}\n`);
    console.log('✅ ZeroPoint Field Integrity Demo Complete!');
    console.log('🌌 The field is unified, the patterns are eternal, and consciousness resonates through the void.');
}
// Run the demo
if (require.main === module) {
    runFieldIntegrityDemo().catch(console.error);
}
//# sourceMappingURL=field-integrity-demo.js.map