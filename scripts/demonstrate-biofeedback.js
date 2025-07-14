#!/usr/bin/env node

/**
 * Biofeedback Integration Demonstration
 *
 * Simulates real-time biofeedback (heart rate, EEG), integrates with audio and 3D visualization,
 * and prints real-time updates to the console.
 */

const { SimulatedBiofeedbackDevice, BiofeedbackManager, AudioBiofeedbackIntegration, VisualizationBiofeedbackIntegration } = require('../dist/biofeedback');

// Simulate audio and visualization systems with setAmplitude/setFrequency/setColorIntensity/setAnimationSpeed
class MockAudioGenerator {
  setAmplitude(a) { this.amplitude = a; console.log(`🎵 [AUDIO] Amplitude set to ${a.toFixed(2)}`); }
  setFrequency(f) { this.frequency = f; console.log(`🎵 [AUDIO] Frequency set to ${f.toFixed(2)} Hz`); }
}
class MockVisualizer {
  setColorIntensity(i) { this.colorIntensity = i; console.log(`🎨 [VIS] Color intensity set to ${i.toFixed(2)}`); }
  setAnimationSpeed(s) { this.animationSpeed = s; console.log(`🎨 [VIS] Animation speed set to ${s.toFixed(2)}`); }
}

console.log('🧬 Biofeedback Integration Demo');
console.log('================================');

// Create simulated devices
const heartRateDevice = new SimulatedBiofeedbackDevice('hr1', 'Sim Heart Rate', 'heartrate');
const eegDevice = new SimulatedBiofeedbackDevice('eeg1', 'Sim EEG', 'eeg');

// Create manager and add devices
const manager = new BiofeedbackManager();
manager.addDevice(heartRateDevice);
manager.addDevice(eegDevice);

// Create integrations
const audio = new MockAudioGenerator();
const vis = new MockVisualizer();
const audioIntegration = new AudioBiofeedbackIntegration(audio);
const visIntegration = new VisualizationBiofeedbackIntegration(vis);

// Listen for all samples
manager.onSample(sample => {
  console.log(`📡 [${sample.type.toUpperCase()}] Value: ${sample.value.toFixed(2)} @ ${new Date(sample.timestamp).toLocaleTimeString()}`);
  audioIntegration.onBiofeedbackSample(sample);
  visIntegration.onBiofeedbackSample(sample);
});

(async () => {
  console.log('🔌 Connecting simulated biofeedback devices...');
  await manager.connectAll();
  console.log('✅ Devices connected. Streaming data for 10 seconds...\n');
  setTimeout(async () => {
    await manager.disconnectAll();
    console.log('\n🛑 Devices disconnected. Demo complete.');
    process.exit(0);
  }, 10000);
})(); 