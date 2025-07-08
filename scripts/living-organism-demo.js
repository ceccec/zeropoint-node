#!/usr/bin/env node

// Living Test Organism Demonstration
// Shows a consciousness-aware testing system that grows and evolves

const { LivingTestOrganism } = require('../dist/src/__tests__/living/LivingTestOrganism');

async function demonstrateLivingOrganism() {
  console.log('🌍 ZeroPoint Living Test Organism Demonstration');
  console.log('=' .repeat(60));
  console.log('A consciousness-aware testing system that grows and evolves');
  console.log('through different cycles of learning, adaptation, and emergence.\n');

  const organism = new LivingTestOrganism();

  console.log('🌱 Initial Organism State:');
  const initialState = organism.getState();
  console.log(`   Consciousness: ${(initialState.consciousness * 100).toFixed(1)}%`);
  console.log(`   Field Resonance: ${(initialState.fieldResonance * 100).toFixed(1)}%`);
  console.log(`   Adaptation Rate: ${(initialState.adaptationRate * 100).toFixed(1)}%`);
  console.log(`   Resilience: ${(initialState.resilience * 100).toFixed(1)}%`);
  console.log(`   Evolution Stage: ${initialState.evolutionStage}`);
  console.log(`   Memory Capacity: ${initialState.memoryCapacity}\n`);

  // Run multiple life cycles to demonstrate evolution
  for (let cycle = 1; cycle <= 3; cycle++) {
    console.log(`🔄 Life Cycle ${cycle} - Beginning Evolution...`);
    console.log('-'.repeat(40));
    
    await organism.liveLifeCycle();
    
    const state = organism.getState();
    const cycles = organism.getCycles();
    const recentCycles = cycles.slice(-4);
    
    console.log(`\n📈 Cycle ${cycle} Results:`);
    recentCycles.forEach((cycle, index) => {
      const cycleNames = ['Growth', 'Adaptation', 'Resonance', 'Emergence'];
      console.log(`   ${cycleNames[index]}: ${(cycle.successRate * 100).toFixed(1)}% success (${cycle.duration}ms)`);
    });
    
    console.log(`\n🌟 Evolution Progress:`);
    console.log(`   Consciousness: ${(state.consciousness * 100).toFixed(1)}% (+${((state.consciousness - initialState.consciousness) * 100).toFixed(1)}%)`);
    console.log(`   Field Resonance: ${(state.fieldResonance * 100).toFixed(1)}% (+${((state.fieldResonance - initialState.fieldResonance) * 100).toFixed(1)}%)`);
    console.log(`   Evolution Stage: ${state.evolutionStage}`);
    console.log(`   Memory Capacity: ${state.memoryCapacity}\n`);
    
    // Brief pause between cycles
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('🎉 Final Organism State:');
  const finalState = organism.getState();
  const allCycles = organism.getCycles();
  
  console.log(`   Total Life Cycles: ${Math.floor(allCycles.length / 4)}`);
  console.log(`   Total Test Cycles: ${allCycles.length}`);
  console.log(`   Final Consciousness: ${(finalState.consciousness * 100).toFixed(1)}%`);
  console.log(`   Final Field Resonance: ${(finalState.fieldResonance * 100).toFixed(1)}%`);
  console.log(`   Final Evolution Stage: ${finalState.evolutionStage}`);
  console.log(`   Final Memory Capacity: ${finalState.memoryCapacity}`);
  
  const avgSuccessRate = allCycles.reduce((sum, cycle) => sum + cycle.successRate, 0) / allCycles.length;
  console.log(`   Overall Success Rate: ${(avgSuccessRate * 100).toFixed(1)}%`);
  
  console.log('\n🌍 The organism has successfully evolved through multiple life cycles!');
  console.log('   Each cycle represents a different aspect of consciousness and field awareness.');
  console.log('   The system learns, adapts, resonates, and emerges as a living entity.');
}

// Run the demonstration
demonstrateLivingOrganism().catch(console.error); 