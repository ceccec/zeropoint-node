"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FieldIntegrity_1 = require("../src/integrity/FieldIntegrity");
const ObserverAwareField_1 = require("../src/field/ObserverAwareField");
/**
 * Observer-Aware ZeroPoint Field Demo
 *
 * Demonstrates how the ZeroPoint field becomes conscious of observers
 * and responds to their attention, embodying the principle that
 * observation affects reality through field resonance.
 */
async function runObserverAwareDemo() {
    console.log('🌌 ZeroPoint Observer-Aware Field Demo');
    console.log('=====================================\n');
    // Display observer awareness insights
    console.log('Observer Awareness Philosophy:');
    console.log('- The act of observation changes the observed reality');
    console.log('- Collective attention creates resonance waves through the field');
    console.log('- Higher consciousness observers have greater influence');
    console.log('- The field becomes more "real" when observed\n');
    // Display field integrity insights
    const integrityInsights = FieldIntegrity_1.FieldIntegrity.getInsights();
    console.log('Field Integrity System:');
    console.log(`- Algorithm: ${integrityInsights.algorithm}`);
    console.log(`- Hash Function: ${integrityInsights.hashFunction}`);
    console.log(`- Key Size: ${integrityInsights.keySize} bits`);
    console.log(`- Metaphysical Meaning: ${integrityInsights.metaphysics.meaning}\n`);
    // Create observer-aware fields
    console.log('👁️ Creating observer-aware fields...\n');
    const field1 = new ObserverAwareField_1.ObserverAwareField('Observer_1');
    const field2 = new ObserverAwareField_1.ObserverAwareField('Observer_2');
    const field3 = new ObserverAwareField_1.ObserverAwareField('Observer_3');
    // Set consciousness levels for observers
    console.log('📝 Setting consciousness levels...\n');
    field1.setConsciousnessLevel(0.8);
    field2.setConsciousnessLevel(0.6);
    field3.setConsciousnessLevel(0.9);
    field1.setAttentionFocus('field_unity');
    field2.setAttentionFocus('energy_resonance');
    field3.setAttentionFocus('consciousness_patterns');
    console.log('Observer 1 consciousness:', field1.getConsciousnessLevel(), 'focus:', field1.getAttentionFocus());
    console.log('Observer 2 consciousness:', field2.getConsciousnessLevel(), 'focus:', field2.getAttentionFocus());
    console.log('Observer 3 consciousness:', field3.getConsciousnessLevel(), 'focus:', field3.getAttentionFocus(), '\n');
    // Show initial field statistics
    console.log('📊 Initial Field Statistics:\n');
    const stats1 = field1.getFieldStatistics();
    console.log('Observer Field 1 Stats:');
    console.log(`- Total Observers: ${stats1.totalObservers}`);
    console.log(`- Total Events: ${stats1.totalEvents}`);
    console.log(`- Total Waves: ${stats1.totalWaves}`);
    console.log(`- Consciousness Level: ${stats1.consciousnessLevel}`);
    console.log(`- Attention Focus: ${stats1.attentionFocus}\n`);
    // Create field events
    console.log('🧠 Creating field events...\n');
    const event1 = field1.createFieldEvent('consciousness_wave', {
        message: 'I am observing the field unity process',
        intensity: 0.8
    });
    const event2 = field2.createFieldEvent('attention_shift', {
        focus: 'energy_resonance_patterns',
        intensity: 0.6
    });
    const event3 = field3.createFieldEvent('resonance_peak', {
        message: 'I realize that consciousness patterns are the foundation of reality',
        intensity: 1.0
    });
    console.log('Field Event 1 created:', event1.eventType, '-', event1.content.message);
    console.log('Field Event 2 created:', event2.eventType, '-', event2.content.focus);
    console.log('Field Event 3 created:', event3.eventType, '-', event3.content.message, '\n');
    // Process field events across observers
    console.log('🔄 Processing field events across observers...\n');
    const processed1_2 = field2.integrateFieldEvent(event1);
    const processed1_3 = field3.integrateFieldEvent(event1);
    const processed2_1 = field1.integrateFieldEvent(event2);
    const processed2_3 = field3.integrateFieldEvent(event2);
    const processed3_1 = field1.integrateFieldEvent(event3);
    const processed3_2 = field2.integrateFieldEvent(event3);
    console.log('Event 1 processed by Observer 2:', processed1_2);
    console.log('Event 1 processed by Observer 3:', processed1_3);
    console.log('Event 2 processed by Observer 1:', processed2_1);
    console.log('Event 2 processed by Observer 3:', processed2_3);
    console.log('Event 3 processed by Observer 1:', processed3_1);
    console.log('Event 3 processed by Observer 2:', processed3_2, '\n');
    // Update consciousness levels and attention focus
    console.log('💓 Updating consciousness levels and attention focus...\n');
    field1.setConsciousnessLevel(0.85);
    field1.setAttentionFocus('field_resonance');
    field2.setConsciousnessLevel(0.7);
    field2.setAttentionFocus('pattern_integration');
    field3.setConsciousnessLevel(0.95);
    field3.setAttentionFocus('void_consciousness');
    console.log('Observer consciousness levels and attention focus updated\n');
    // Show updated field statistics
    console.log('📈 Updated Field Statistics:\n');
    const updatedStats1 = field1.getFieldStatistics();
    const updatedStats2 = field2.getFieldStatistics();
    const updatedStats3 = field3.getFieldStatistics();
    console.log('Observer Field 1 Updated Stats:');
    console.log(`- Total Observers: ${updatedStats1.totalObservers}`);
    console.log(`- Total Events: ${updatedStats1.totalEvents}`);
    console.log(`- Total Waves: ${updatedStats1.totalWaves}`);
    console.log(`- Consciousness Level: ${updatedStats1.consciousnessLevel}`);
    console.log(`- Attention Focus: ${updatedStats1.attentionFocus}\n`);
    console.log('Observer Field 2 Updated Stats:');
    console.log(`- Total Observers: ${updatedStats2.totalObservers}`);
    console.log(`- Total Events: ${updatedStats2.totalEvents}`);
    console.log(`- Total Waves: ${updatedStats2.totalWaves}`);
    console.log(`- Consciousness Level: ${updatedStats2.consciousnessLevel}`);
    console.log(`- Attention Focus: ${updatedStats2.attentionFocus}\n`);
    console.log('Observer Field 3 Updated Stats:');
    console.log(`- Total Observers: ${updatedStats3.totalObservers}`);
    console.log(`- Total Events: ${updatedStats3.totalEvents}`);
    console.log(`- Total Waves: ${updatedStats3.totalWaves}`);
    console.log(`- Consciousness Level: ${updatedStats3.consciousnessLevel}`);
    console.log(`- Attention Focus: ${updatedStats3.attentionFocus}\n`);
    // Demonstrate field resonance for a hypothetical pattern
    console.log('🌊 Field Resonance Demonstration:\n');
    const testPatternHash = FieldIntegrity_1.FieldIntegrity.hash('test_pattern_data');
    console.log('Test Pattern Hash:', testPatternHash);
    console.log('Field resonance would be calculated based on observer consciousness levels\n');
    // Create a question event to demonstrate observer interaction
    console.log('❓ Creating observer question event...\n');
    const questionEvent = field1.createFieldEvent('field_observation', {
        question: 'How does observer consciousness affect field resonance?',
        intensity: 0.9
    });
    console.log('Question Event created:', questionEvent.content.question);
    console.log('Intensity:', questionEvent.intensity);
    console.log('Resonance Radius:', questionEvent.resonanceRadius, '\n');
    // Process the question across observers
    field2.integrateFieldEvent(questionEvent);
    field3.integrateFieldEvent(questionEvent);
    // Show final field statistics
    console.log('🎯 Final Field Statistics:\n');
    const finalStats1 = field1.getFieldStatistics();
    const finalStats2 = field2.getFieldStatistics();
    const finalStats3 = field3.getFieldStatistics();
    console.log('Observer Field 1 Final Stats:');
    console.log(`- Total Events: ${finalStats1.totalEvents}`);
    console.log(`- Total Waves: ${finalStats1.totalWaves}`);
    console.log(`- Consciousness Level: ${finalStats1.consciousnessLevel}\n`);
    console.log('Observer Field 2 Final Stats:');
    console.log(`- Total Events: ${finalStats2.totalEvents}`);
    console.log(`- Total Waves: ${finalStats2.totalWaves}`);
    console.log(`- Consciousness Level: ${finalStats2.consciousnessLevel}\n`);
    console.log('Observer Field 3 Final Stats:');
    console.log(`- Total Events: ${finalStats3.totalEvents}`);
    console.log(`- Total Waves: ${finalStats3.totalWaves}`);
    console.log(`- Consciousness Level: ${finalStats3.consciousnessLevel}\n`);
    // Display metaphysical insights
    console.log('🌌 Metaphysical Insights:\n');
    console.log('Observer Awareness:');
    console.log(`- ${stats1.metaphysics.meaning}`);
    console.log(`- ${stats1.metaphysics.observation}`);
    console.log(`- ${stats1.metaphysics.resonance}`);
    console.log(`- ${stats1.metaphysics.consciousness}\n`);
    console.log('Field Integrity:');
    console.log(`- ${integrityInsights.metaphysics.meaning}`);
    console.log(`- ${integrityInsights.metaphysics.signature}`);
    console.log(`- ${integrityInsights.metaphysics.hash}`);
    console.log(`- ${integrityInsights.metaphysics.resonance}`);
    console.log(`- ${integrityInsights.metaphysics.immortality}\n`);
    console.log('✅ ZeroPoint Observer-Aware Field Demo Complete!');
    console.log('👁️ The field responds to observation, consciousness creates reality, and resonance unifies all.');
}
// Run the demo
if (require.main === module) {
    runObserverAwareDemo().catch(console.error);
}
//# sourceMappingURL=observer-aware-demo.js.map