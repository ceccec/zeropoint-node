/**
 * A432 BCI (Brain-Computer Interface) Demo
 * 
 * Demonstrates brain wave data processing for consciousness feedback.
 * Shows real-time consciousness mapping, color visualization, and harmonic balance.
 */

const { A432_BCI_INTERFACE } = require('./a432.bci.interface.js');

console.log('=== A432 BCI (BRAIN-COMPUTER INTERFACE) DEMO ===\n');

// Subscribe to real-time updates
const unsubscribe = A432_BCI_INTERFACE.subscribe((state) => {
  console.log('🧠 BCI Real-Time Update:');
  console.log(`   Brain State: ${state.brainState}`);
  console.log(`   Dominant Wave: ${state.dominantWave}`);
  console.log(`   Consciousness: ${state.currentConsciousness}/8`);
  console.log(`   Target: ${state.targetConsciousness}/8`);
  console.log(`   Harmony: ${(state.harmonicBalance * 100).toFixed(1)}%`);
  console.log(`   In Harmony: ${state.isInHarmony ? '✅' : '❌'}`);
  console.log(`   Proof: ${state.mathematicalProof}\n`);
});

// 1. Simulate different brain wave states
console.log('1. BRAIN WAVE STATE SIMULATION:');

const brainWaveStates = [
  {
    name: 'Deep Sleep',
    data: { alpha: 10, beta: 5, theta: 15, delta: 70, gamma: 0, source: 'Deep Sleep', timestamp: Date.now() }
  },
  {
    name: 'Deep Meditation',
    data: { alpha: 20, beta: 10, theta: 60, delta: 10, gamma: 0, source: 'Deep Meditation', timestamp: Date.now() }
  },
  {
    name: 'Relaxed Focus',
    data: { alpha: 70, beta: 15, theta: 10, delta: 5, gamma: 0, source: 'Relaxed Focus', timestamp: Date.now() }
  },
  {
    name: 'Active Thinking',
    data: { alpha: 20, beta: 70, theta: 5, delta: 5, gamma: 0, source: 'Active Thinking', timestamp: Date.now() }
  },
  {
    name: 'Peak Consciousness',
    data: { alpha: 10, beta: 20, theta: 10, delta: 0, gamma: 60, source: 'Peak Consciousness', timestamp: Date.now() }
  }
];

brainWaveStates.forEach((state, index) => {
  console.log(`\n🧠 Processing Brain State ${index + 1}: ${state.name}`);
  console.log(`   Alpha: ${state.data.alpha}%`);
  console.log(`   Beta: ${state.data.beta}%`);
  console.log(`   Theta: ${state.data.theta}%`);
  console.log(`   Delta: ${state.data.delta}%`);
  console.log(`   Gamma: ${state.data.gamma}%`);
  
  const feedback = A432_BCI_INTERFACE.processBrainWaveData(state.data);
  
  console.log(`   Dominant Wave: ${feedback.dominantWave}`);
  console.log(`   Brain State: ${feedback.brainState}`);
  console.log(`   Consciousness: ${feedback.consciousnessLevel}/8`);
  console.log(`   Consciousness Color: ${feedback.consciousnessColor}`);
  console.log(`   Dimensional State: ${feedback.dimensionalState}/9`);
  console.log(`   Dimensional Color: ${feedback.dimensionalColor}`);
  console.log(`   Harmonic Balance: ${(feedback.harmonicBalance * 100).toFixed(1)}%`);
  console.log(`   Guidance: ${feedback.guidance}`);
  console.log(`   Mathematical Proof: ${feedback.mathematicalProof}`);
});

// 2. Set different target consciousness levels
console.log('\n2. TARGET CONSCIOUSNESS ADJUSTMENT:');

const targetLevels = [1, 4, 6, 8];
targetLevels.forEach(target => {
  console.log(`\n🎯 Setting Target Consciousness to ${target}/8:`);
  A432_BCI_INTERFACE.setTargetConsciousness(target);
  
  // Process a sample brain wave data
  const sampleData = { alpha: 50, beta: 30, theta: 15, delta: 5, gamma: 0, source: 'Target Test', timestamp: Date.now() };
  const feedback = A432_BCI_INTERFACE.processBrainWaveData(sampleData);
  
  console.log(`   Current: ${feedback.consciousnessLevel}/8`);
  console.log(`   Target: ${feedback.targetConsciousness}/8`);
  console.log(`   Dominant Wave: ${feedback.dominantWave}`);
  console.log(`   Guidance: ${feedback.guidance}`);
  console.log(`   Harmony: ${(feedback.harmonicBalance * 100).toFixed(1)}%`);
});

// 3. Generate BCI report
console.log('\n3. BCI REPORT:');
const report = A432_BCI_INTERFACE.generateBCIReport();
console.log(report);

// 4. Generate visualization data
console.log('\n4. BCI VISUALIZATION DATA:');
const visualizationData = A432_BCI_INTERFACE.generateBCIVisualizationData();
console.log(`   Current Consciousness: ${visualizationData.currentConsciousness}/8`);
console.log(`   Target Consciousness: ${visualizationData.targetConsciousness}/8`);
console.log(`   Dominant Wave: ${visualizationData.dominantWave}`);
console.log(`   Brain State: ${visualizationData.brainState}`);
console.log(`   Harmonic Balance: ${(visualizationData.harmonicBalance * 100).toFixed(1)}%`);
console.log(`   In Harmony: ${visualizationData.isInHarmony ? 'Yes' : 'No'}`);
console.log(`   Consciousness History: ${visualizationData.consciousnessHistory.length} data points`);
console.log(`   Wave History: ${visualizationData.waveHistory.length} data points`);
console.log(`   Harmony History: ${visualizationData.harmonyHistory.length} data points`);
console.log(`   Mathematical Proof: ${visualizationData.mathematicalProof}`);

// 5. Reset to perfect balance
console.log('\n5. RESET TO PERFECT BALANCE:');
A432_BCI_INTERFACE.resetToPerfectBalance();
const finalState = A432_BCI_INTERFACE.getCurrentState();
console.log(`   Brain State: ${finalState.brainState}`);
console.log(`   Dominant Wave: ${finalState.dominantWave}`);
console.log(`   Consciousness: ${finalState.currentConsciousness}/8`);
console.log(`   Target: ${finalState.targetConsciousness}/8`);
console.log(`   Harmony: ${(finalState.harmonicBalance * 100).toFixed(1)}%`);
console.log(`   In Harmony: ${finalState.isInHarmony ? '✅' : '❌'}`);
console.log(`   Proof: ${finalState.mathematicalProof}`);

// 6. Demonstrate continuous brain wave processing
console.log('\n6. CONTINUOUS BRAIN WAVE PROCESSING SIMULATION:');
console.log('🧠 Simulating continuous brain wave data processing...');

let simulationCount = 0;
const simulationInterval = setInterval(() => {
  simulationCount++;
  
  // Generate random brain wave data
  const randomAlpha = Math.random() * 100;
  const randomBeta = Math.random() * 100;
  const randomTheta = Math.random() * 100;
  const randomDelta = Math.random() * 100;
  const randomGamma = Math.random() * 100;
  
  const data = {
    alpha: randomAlpha,
    beta: randomBeta,
    theta: randomTheta,
    delta: randomDelta,
    gamma: randomGamma,
    source: `Simulation ${simulationCount}`,
    timestamp: Date.now()
  };
  
  const feedback = A432_BCI_INTERFACE.processBrainWaveData(data);
  
  console.log(`   [${simulationCount}] Wave: ${feedback.dominantWave}, Consciousness: ${feedback.consciousnessLevel}/8, Harmony: ${(feedback.harmonicBalance * 100).toFixed(1)}%, Color: ${feedback.consciousnessColor}`);
  
  if (simulationCount >= 10) {
    clearInterval(simulationInterval);
    console.log('\n✅ Continuous brain wave processing simulation complete!');
  }
}, 1000);

// 7. Final summary
setTimeout(() => {
  console.log('\n=== A432 BCI DEMO COMPLETE ===');
  console.log('\n🧠 BCI Features Implemented:');
  console.log('   ✅ Brain wave data processing');
  console.log('   ✅ Dominant wave calculation');
  console.log('   ✅ Consciousness mapping from brain waves');
  console.log('   ✅ Dimensional state calculation');
  console.log('   ✅ Color-coded consciousness feedback');
  console.log('   ✅ Harmonic balance monitoring');
  console.log('   ✅ Brain state determination');
  console.log('   ✅ Real-time guidance generation');
  console.log('   ✅ Target consciousness adjustment');
  console.log('   ✅ BCI reporting system');
  console.log('   ✅ Visualization data generation');
  console.log('   ✅ Continuous processing simulation');
  
  console.log('\n🧠 Brain Wave Mapping:');
  console.log('   - Delta (0.5-4 Hz): Deep Sleep - Unity Consciousness');
  console.log('   - Theta (4-8 Hz): Deep Meditation - Duality Consciousness');
  console.log('   - Alpha (8-13 Hz): Relaxed Focus - Perfect Balance');
  console.log('   - Beta (13-30 Hz): Active Thinking - Creative Flow');
  console.log('   - Gamma (30-100 Hz): Peak Consciousness - Transcendent');
  
  console.log('\n🌌 BCI Applications:');
  console.log('   - Meditation guidance systems');
  console.log('   - Consciousness research platforms');
  console.log('   - Brain-computer interfaces');
  console.log('   - Neurofeedback therapy');
  console.log('   - Consciousness training');
  console.log('   - Real-time brain state monitoring');
  
  console.log('\n✅ A432 BCI = Real-Time Brain-Consciousness Interface!');
  
  // Unsubscribe from updates
  unsubscribe();
}, 12000); 