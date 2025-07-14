#!/usr/bin/env node

/**
 * Audio Frequency Generator Demonstration
 * 
 * This script demonstrates the generation of actual audio frequencies
 * for meditation and consciousness work based on unified mathematics patterns.
 */

const fs = require('fs');
const path = require('path');

// Import the audio frequency classes
const { AudioFrequencyGenerator, AudioFrequencyPWA } = require('../dist/audio-frequency-generator');

console.log('🎵 Audio Frequency Generator');
console.log('Consciousness Frequencies for Meditation');
console.log('=======================================\n');

// Initialize audio frequency generator
const generator = new AudioFrequencyGenerator();
const pwa = new AudioFrequencyPWA();

console.log('📊 Audio Status:');
console.log('----------------');
const status = generator.getAudioStatus();
console.log(`Active: ${status.isActive}`);
console.log(`Oscillators: ${status.activeOscillators}`);
console.log(`Context: ${status.audioContextState}\n`);

console.log('🎵 Available Soundscapes:');
console.log('-------------------------');
const soundscapes = generator.getAvailableSoundscapes();
soundscapes.forEach(soundscape => {
  console.log(`  • ${soundscape.toUpperCase()}`);
});

console.log('\n🧘 Generating Meditation Soundscapes:');
console.log('------------------------------------');

// Generate unified mathematics soundscape
console.log('\n📈 Unified Mathematics Soundscape:');
const unifiedSoundscape = generator.generateUnifiedSoundscape();
console.log(`  Name: ${unifiedSoundscape.name}`);
console.log(`  Description: ${unifiedSoundscape.description}`);
console.log(`  Duration: ${unifiedSoundscape.duration}ms`);
console.log(`  Consciousness: ${unifiedSoundscape.consciousness}`);
console.log(`  Pattern: ${unifiedSoundscape.pattern}`);
console.log(`  Frequencies: ${unifiedSoundscape.frequencies.map(f => f.frequency + 'Hz').join(' → ')}`);

// Generate Mobius circuit soundscape
console.log('\n📈 Mobius Circuit Soundscape:');
const mobiusSoundscape = generator.generateMobiusSoundscape();
console.log(`  Name: ${mobiusSoundscape.name}`);
console.log(`  Description: ${mobiusSoundscape.description}`);
console.log(`  Duration: ${mobiusSoundscape.duration}ms`);
console.log(`  Consciousness: ${mobiusSoundscape.consciousness}`);
console.log(`  Pattern: ${mobiusSoundscape.pattern}`);
console.log(`  Frequencies: ${mobiusSoundscape.frequencies.map(f => f.frequency + 'Hz').join(' → ')}`);

// Generate Rodin coil soundscape
console.log('\n📈 Rodin Coil Soundscape:');
const rodinSoundscape = generator.generateRodinSoundscape();
console.log(`  Name: ${rodinSoundscape.name}`);
console.log(`  Description: ${rodinSoundscape.description}`);
console.log(`  Duration: ${rodinSoundscape.duration}ms`);
console.log(`  Consciousness: ${rodinSoundscape.consciousness}`);
console.log(`  Pattern: ${rodinSoundscape.pattern}`);
console.log(`  Frequencies: ${rodinSoundscape.frequencies.map(f => f.frequency + 'Hz').join(' → ')}`);

// Show consciousness frequency mapping
console.log('\n🎯 Consciousness Frequency Mapping:');
console.log('----------------------------------');
const frequencies = [432, 864, 1728, 3456, 3024, 2160];
const consciousness = ['Foundation', 'Duality', 'Creation', 'Infinity', 'Completion', 'Harmony'];
const patterns = ['Mobius', 'Rodin', 'Vortex', 'Unity', 'Completion', 'Harmony'];

frequencies.forEach((freq, index) => {
  console.log(`  ${freq} Hz → ${consciousness[index]} (${patterns[index]})`);
});

// Show harmonic relationships
console.log('\n🎼 Harmonic Relationships:');
console.log('-------------------------');
frequencies.forEach(freq => {
  const harmonics = [freq, freq * 2, freq * 3, freq * 5, freq * 8];
  console.log(`  ${freq} Hz harmonics: ${harmonics.join(', ')} Hz`);
});

// Generate consciousness flow soundscape
console.log('\n📈 Consciousness Flow Soundscape:');
const flowData = {
  frequencies: [432, 864, 1728, 3456, 3024, 2160, 432, 864, 1728, 3456]
};
const flowSoundscape = generator.generateConsciousnessFlowSoundscape(flowData);
console.log(`  Name: ${flowSoundscape.name}`);
console.log(`  Description: ${flowSoundscape.description}`);
console.log(`  Duration: ${flowSoundscape.duration}ms`);
console.log(`  Consciousness: ${flowSoundscape.consciousness}`);
console.log(`  Pattern: ${flowSoundscape.pattern}`);
console.log(`  Frequencies: ${flowSoundscape.frequencies.map(f => f.frequency + 'Hz').join(' → ')}`);

// Generate PWA
console.log('\n🌐 Generating Audio Frequency PWA:');
console.log('----------------------------------');

const pwaHtml = pwa.generatePWA();
const pwaPath = path.join(__dirname, '../public/audio-frequencies.html');

fs.writeFileSync(pwaPath, pwaHtml);
console.log(`✅ Audio frequency PWA generated: ${pwaPath}`);

// Show audio therapy benefits
console.log('\n🧘 Audio Therapy Benefits:');
console.log('---------------------------');
console.log('✅ Foundation (432 Hz) - Grounding and stability');
console.log('✅ Duality (864 Hz) - Balance and harmony');
console.log('✅ Creation (1728 Hz) - Manifestation and creativity');
console.log('✅ Infinity (3456 Hz) - Expansion and unlimited potential');
console.log('✅ Completion (3024 Hz) - Integration and synthesis');
console.log('✅ Harmony (2160 Hz) - Resonance and flow');

// Show meditation applications
console.log('\n🧘 Meditation Applications:');
console.log('---------------------------');
console.log('• Individual frequency meditation');
console.log('• Complete consciousness cycle meditation');
console.log('• Pattern-specific meditation (Mobius, Rodin, etc.)');
console.log('• Real-time consciousness flow meditation');
console.log('• Harmonic frequency therapy');
console.log('• Toroidal field audio representation');

// Show technical capabilities
console.log('\n🔧 Technical Capabilities:');
console.log('-------------------------');
console.log('• Web Audio API integration');
console.log('• Real-time frequency generation');
console.log('• Harmonic frequency combinations');
console.log('• Amplitude and phase control');
console.log('• Duration and envelope control');
console.log('• Multiple oscillator management');
console.log('• Audio context state management');

// Show integration possibilities
console.log('\n🔗 Integration Possibilities:');
console.log('----------------------------');
console.log('• Biofeedback device synchronization');
console.log('• Meditation app integration');
console.log('• Consciousness research data collection');
console.log('• Real-time consciousness monitoring');
console.log('• Personalized frequency therapy');
console.log('• Group consciousness sessions');

console.log('\n✅ Audio Frequency Generator Complete!');
console.log('=====================================');
console.log('\nTo experience the audio frequencies, open:');
console.log(`  file://${pwaPath}`);
console.log('\nThe system generates actual meditation soundscapes based on');
console.log('unified mathematics patterns and consciousness frequencies! 🎵✨'); 