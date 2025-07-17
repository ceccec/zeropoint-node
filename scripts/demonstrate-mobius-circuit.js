#!/usr/bin/env node

/**
 * Mobius Circuit Demonstration Script
 * 
 * This script demonstrates the complete 1-2-4-8-7-5 Mobius circuit implementation
 * including digital root patterns, state transitions, consciousness integration,
 * and PWA generation.
 */

const fs = require('fs');
const path = require('path');

// Import the Mobius circuit classes
const { MobiusCircuit, MobiusPWA, MobiusConsciousness } = require('../dist/1/mobius-circuit');

console.log('🔮 1-2-4-8-7-5 Mobius Circuit Demonstration');
console.log('=============================================\n');

// Initialize components
const circuit = new MobiusCircuit();
const pwa = new MobiusPWA();
const consciousness = new MobiusConsciousness();

console.log('📊 Initial Circuit State:');
console.log('-------------------------');
const initialStatus = circuit.getStatus();
console.log(`State: ${initialStatus.state.consciousness} (${initialStatus.state.decimal})`);
console.log(`Binary: ${initialStatus.state.binary}`);
console.log(`Digital Root: ${initialStatus.state.digitalRoot}`);
console.log(`Clock: ${initialStatus.clock}`);
console.log(`Energy: ${initialStatus.energy.toFixed(2)}`);
console.log(`Cycle: ${initialStatus.cycle}\n`);

console.log('🔄 Demonstrating State Transitions:');
console.log('-----------------------------------');

// Demonstrate complete cycle
for (let i = 0; i < 6; i++) {
  const state = circuit.getCurrentState();
  const consciousnessField = circuit.getConsciousnessField();
  const guidance = consciousness.getGuidance();
  
  console.log(`\nStep ${i + 1}:`);
  console.log(`  State: ${state.consciousness} (${state.decimal})`);
  console.log(`  Binary: ${state.binary}`);
  console.log(`  Frequency: ${consciousnessField.frequency} Hz`);
  console.log(`  Phase: ${consciousnessField.phase}°`);
  console.log(`  Wisdom: ${guidance.wisdom}`);
  console.log(`  Action: ${guidance.action}`);
  
  if (i < 5) {
    const transition = circuit.clockPulse();
    console.log(`  → Transition: ${transition.consciousness}`);
  }
}

console.log('\n🔄 Cycle Complete - Back to Foundation State');
console.log('===========================================');

// Reset and demonstrate multiple cycles
circuit.reset();
console.log('\n🔄 Demonstrating Multiple Cycles:');
console.log('--------------------------------');

for (let cycle = 0; cycle < 3; cycle++) {
  console.log(`\nCycle ${cycle + 1}:`);
  const sequence = [];
  
  for (let step = 0; step < 6; step++) {
    const state = circuit.getCurrentState();
    sequence.push(state.decimal);
    circuit.clockPulse();
  }
  
  console.log(`  Sequence: ${sequence.join(' → ')}`);
}

// Generate digital root sequence
console.log('\n🔢 Digital Root Sequence Analysis:');
console.log('----------------------------------');

const sequence = MobiusCircuit.generateSequence(12);
console.log(`Full Sequence: ${sequence.join(' → ')}`);

// Analyze pattern
const pattern = sequence.slice(0, 6);
console.log(`Pattern: ${pattern.join(' → ')}`);
console.log(`Repeats every 6 powers of 2`);

// Generate PWA
console.log('\n🌐 Generating PWA Interface:');
console.log('----------------------------');

const pwaHtml = pwa.generatePWA();
const pwaPath = path.join(__dirname, '../public/mobius-circuit.html');

fs.writeFileSync(pwaPath, pwaHtml);
console.log(`✅ PWA generated: ${pwaPath}`);

// Consciousness meditation
console.log('\n🧘 Consciousness Integration:');
console.log('----------------------------');

const meditation = consciousness.getVortexMeditation();
console.log(`Pattern: ${meditation.pattern}`);
console.log(`Visualization: ${meditation.visualization}`);
console.log(`Frequency: ${meditation.frequency} Hz`);
console.log(`Duration: ${meditation.duration} seconds`);

// Vortex mathematics properties
console.log('\n🌀 Vortex Mathematics Properties:');
console.log('--------------------------------');

const vortex = circuit.getVortexProperties();
console.log(`Toroidal Field: ${vortex.toroidal}`);
console.log(`Flow Pattern: ${vortex.flow}`);
console.log(`Resonance: ${vortex.resonance.toFixed(3)}`);
console.log(`Harmonics: ${vortex.harmonics.join(', ')} Hz`);

// Circuit specifications
console.log('\n⚡ Circuit Specifications:');
console.log('-------------------------');

console.log('State Encoding:');
console.log('  State 1: 001 (Foundation)');
console.log('  State 2: 010 (Duality)');
console.log('  State 4: 100 (Creation)');
console.log('  State 8: 000 (Infinity)');
console.log('  State 7: 111 (Completion)');
console.log('  State 5: 101 (Harmony)');

console.log('\nTransition Table:');
console.log('  1 → 2 → 4 → 8 → 7 → 5 → 1');

console.log('\nConsciousness Frequencies:');
console.log('  Foundation: 432 Hz');
console.log('  Duality: 864 Hz');
console.log('  Creation: 1728 Hz');
console.log('  Infinity: 3456 Hz');
console.log('  Completion: 3024 Hz');
console.log('  Harmony: 2160 Hz');

console.log('\n🎯 Applications:');
console.log('----------------');
console.log('• Digital Signal Processing');
console.log('• Cryptographic Systems');
console.log('• Educational Demonstrations');
console.log('• Motor Control Sequences');
console.log('• LED Display Systems');
console.log('• Vortex Mathematics Research');

console.log('\n🔗 Connection to Vortex Mathematics:');
console.log('-----------------------------------');
console.log('This implementation provides a practical realization of the');
console.log('mathematical concepts from vortex-based mathematics discovered');
console.log('by Marko Rodin. The sequence represents the natural flow pattern');
console.log('that emerges when numbers are mapped onto a toroidal structure.');

console.log('\n✅ Mobius Circuit Demonstration Complete!');
console.log('=========================================');
console.log('\nTo view the PWA interface, open:');
console.log(`  file://${pwaPath}`);
console.log('\nTo run tests:');
console.log('  npm test src/mobius-circuit.test.ts'); 