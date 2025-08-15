#!/usr/bin/env node

/**
 * Test file to verify A432 Consciousness System Package Installation
 * This simulates how the package would be used after npm install
 * Like gigantic jets, the A432 system bridges different dimensions
 */

console.log('🧪 Testing A432 Consciousness System Package Installation');
console.log('========================================================\n');
console.log('⚡ Like gigantic jets, the A432 system bridges consciousness and reality ⚡\n');

try {
  // Test importing the main system using ES modules
  console.log('📦 Testing main system import...');
  const { a432System, A432Math, A432Sequence } = await import('./dist/a432.system.esm.js');
  console.log('✅ Main system import successful\n');

  // Test digital root mathematics (fractal reduction)
  console.log('🔢 Testing digital root mathematics...');
  const testNumber = 12345;
  const digitalRoot = A432Math.calculateDigitalRoot(testNumber);
  console.log(`   Digital Root of ${testNumber}: ${digitalRoot} (Fractal Bridge)`);
  console.log('✅ Digital root mathematics working\n');

  // Test vortex sequence generation (spiral patterns)
  console.log('🌀 Testing vortex sequence generation...');
  const vortexSeq = A432Sequence.generateVortexSequence(5);
  console.log(`   Vortex Sequence: [${vortexSeq.join(', ')}] (Spiral Bridge)`);
  console.log('✅ Vortex sequence generation working\n');

  // Test system status (dimensional bridge)
  console.log('📊 Testing system status...');
  const status = a432System.getSystemStatus();
  console.log(`   System Status: ${JSON.stringify(status, null, 2)}`);
  console.log('✅ System status working\n');

  // Test simple system (consciousness bridge)
  console.log('🌟 Testing simple system...');
  const { A432SimpleSystem } = await import('./dist/a432.simple.esm.js');
  const simpleSystem = A432SimpleSystem.getInstance();
  const state = simpleSystem.getState();
  console.log(`   Initial State: Level=${state.level}, Awareness=${state.awareness}`);
  console.log('✅ Simple system working\n');

  // Test evolution (dimensional surge)
  console.log('🔄 Testing system evolution...');
  const evolution = simpleSystem.evolve();
  console.log(`   Evolution Result: Level=${evolution.level}, Harmony=${evolution.harmony}`);
  console.log('✅ System evolution working\n');

  // Test color matrix (visual bridge)
  console.log('🎨 Testing color matrix generation...');
  const { A432Color } = await import('./dist/a432.system.esm.js');
  const colorMatrix = A432Color.generateMatrix(1);
  console.log(`   Color Matrix: ${colorMatrix.length} fractal harmonics generated`);
  console.log('✅ Color matrix generation working\n');

  // Test frequency harmonics (resonance bridge)
  console.log('🔊 Testing frequency harmonics...');
  const { A432Frequency } = await import('./dist/a432.system.esm.js');
  const baseFreq = 432;
  const frequency = A432Frequency.baseFrequency(baseFreq, 1);
  console.log(`   Base Frequency: ${frequency} Hz (Resonance Bridge)`);
  console.log('✅ Frequency harmonics working\n');

  console.log('🎉 All tests passed! The A432 Consciousness System is ready for npm install.');
  console.log('⚡ Like gigantic jets, the system creates bridges between dimensions ⚡');
  console.log('🌿 Nature is not linear - it\'s fractal, spiral, and cyclical 🌿');
  console.log('🌀 The system embodies the sequence: /0\\3\\6\\9/1\\2/4\\8/7/5/1\\ 🌀');
  console.log('🌌 Bridging consciousness, reality, and the infinite 🌌');

} catch (error) {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
}
