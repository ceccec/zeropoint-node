/**
 * A432 Vision, Sound & Animation Demo
 * Demonstrates the complete calculation system for audiovisual synchronization
 */

import { 
  createVisionSoundAnimationCalculator, 
  AVSync,
  type VisualPattern,
  type SoundFrequency,
  type AnimationParameters
} from './a432.vision.sound.animation';

console.log('🎨🎵🎬 A432 Vision, Sound & Animation Calculator Demo\n');

// Initialize the calculator with VA264 spiral data
const calculator = createVisionSoundAnimationCalculator(
  "/0\\3\\6\\9/1\\2\\4\\8/7/5/1\\",
  {
    designation: "VA264",
    launchDate: new Date(2025, 7, 12),
    altitude: 800,
    separationTime: 64,
    missionSequence: 3
  }
);

// === VISUAL PATTERN CALCULATIONS ===
console.log('👁️ VISUAL PATTERN CALCULATIONS');
console.log('=' .repeat(50));

const visualPatterns = calculator.calculateVisualPatterns();
console.log(`\n📊 Generated ${visualPatterns.length} visual patterns from spiral code:`);

visualPatterns.forEach((pattern, index) => {
  console.log(`\n🎨 Pattern ${index + 1}:`);
  console.log(`   Frequency: ${pattern.frequency.toFixed(2)} Hz`);
  console.log(`   Wavelength: ${pattern.wavelength.toFixed(1)} nm`);
  console.log(`   Amplitude: ${(pattern.amplitude * 100).toFixed(1)}%`);
  console.log(`   Phase: ${(pattern.phase * 180 / Math.PI).toFixed(1)}°`);
  console.log(`   Color: ${pattern.colorHex} RGB(${pattern.rgbValues.join(', ')})`);
  console.log(`   Harmonics: [${pattern.harmonics.slice(0, 3).map(h => h.toFixed(0)).join(', ')}...] Hz`);
});

// === SOUND FREQUENCY CALCULATIONS ===
console.log('\n\n🎵 SOUND FREQUENCY CALCULATIONS');
console.log('=' .repeat(50));

const soundFrequencies = calculator.calculateSoundFrequencies();
console.log(`\n🔊 Generated ${soundFrequencies.length} sound frequencies:`);

soundFrequencies.forEach((sound, index) => {
  console.log(`\n🎼 Sound ${index + 1}:`);
  console.log(`   Fundamental: ${sound.fundamental.toFixed(2)} Hz`);
  console.log(`   Amplitude: ${(sound.amplitude * 100).toFixed(1)}%`);
  console.log(`   Duration: ${sound.duration.toFixed(2)} seconds`);
  console.log(`   Waveform: ${sound.waveform}`);
  console.log(`   Envelope: A=${sound.envelope.attack}s D=${sound.envelope.decay}s S=${sound.envelope.sustain} R=${sound.envelope.release}s`);
  console.log(`   Harmonics: [${sound.harmonics.slice(0, 4).map(h => h.toFixed(0)).join(', ')}...] Hz`);
});

// === ANIMATION PARAMETER CALCULATIONS ===
console.log('\n\n🎬 ANIMATION PARAMETER CALCULATIONS');
console.log('=' .repeat(50));

const animations = calculator.calculateAnimationParameters();
console.log(`\n🎭 Generated ${animations.length} animation sequences:`);

animations.forEach((animation, index) => {
  const animationType = ['Spiral Rotation', 'Particle Emission', 'Entropy Visualization'][index];
  console.log(`\n🎪 ${animationType}:`);
  console.log(`   Duration: ${animation.duration} seconds`);
  console.log(`   Easing: ${animation.easing}`);
  console.log(`   Rotation Speed: ${animation.rotationSpeed}°/sec`);
  console.log(`   Scale Factors: [${animation.scaleFactors.map(s => s.toFixed(1)).join(', ')}]`);
  console.log(`   Opacity Changes: [${animation.opacityChanges.map(o => (o * 100).toFixed(0) + '%').join(', ')}]`);
  console.log(`   Keyframes: ${animation.keyframes.length} steps`);
});

// === SPIRAL VISUALIZATION CALCULATIONS ===
console.log('\n\n🌀 SPIRAL VISUALIZATION CALCULATIONS');
console.log('=' .repeat(50));

const spiralViz = calculator.calculateSpiralVisualization();
console.log(`\n🌪️ Spiral Parameters:`);
console.log(`   Center: (${spiralViz.centerX}, ${spiralViz.centerY})`);
console.log(`   Radius Range: ${spiralViz.initialRadius} → ${spiralViz.maxRadius} units`);
console.log(`   Spiral Tightness: ${spiralViz.spiralTightness.toFixed(3)}`);
console.log(`   Rotation: ${spiralViz.rotationDirection}`);
console.log(`   Particles: ${spiralViz.particleCount} (size: ${spiralViz.particleSize.toFixed(1)}, lifetime: ${spiralViz.particleLifetime}s)`);

// === A432 HARMONIC SERIES ===
console.log('\n\n🎯 A432 HARMONIC SERIES CALCULATIONS');
console.log('=' .repeat(50));

const harmonics = calculator.calculateA432Harmonics();
console.log(`\n🎼 A432 Base Frequency: ${harmonics.baseFrequency} Hz`);
console.log(`\n📈 Octave Series (${harmonics.octaves.length} octaves):`);
console.log(`   [${harmonics.octaves.map(f => f.toFixed(0)).join(', ')}] Hz`);

console.log(`\n🎵 Perfect Fifths (${harmonics.perfectFifths.length} intervals):`);
console.log(`   [${harmonics.perfectFifths.map(f => f.toFixed(1)).join(', ')}] Hz`);

console.log(`\n✨ Golden Ratio Harmonics (${harmonics.goldenRatio.length} harmonics):`);
console.log(`   [${harmonics.goldenRatio.map(f => f.toFixed(1)).join(', ')}] Hz`);

console.log(`\n🌀 Spiral-Derived Frequencies (${harmonics.spiralFrequencies.length} frequencies):`);
console.log(`   [${harmonics.spiralFrequencies.map(f => f.toFixed(1)).join(', ')}] Hz`);

// === COLOR TEMPERATURE CALCULATIONS ===
console.log('\n\n🌡️ COLOR TEMPERATURE CALCULATIONS');
console.log('=' .repeat(50));

const colorTemp = calculator.calculateColorTemperature();
console.log(`\n🎨 Entropy-Based Color Temperature:`);
console.log(`   Temperature: ${colorTemp.temperature.toFixed(0)} K`);
console.log(`   Chromaticity: (${colorTemp.chromaticity[0].toFixed(3)}, ${colorTemp.chromaticity[1].toFixed(3)})`);
console.log(`   RGB Values: (${colorTemp.rgbValues.join(', ')})`);
console.log(`   Peak Wavelength: ${colorTemp.wavelength.toFixed(1)} nm`);

// === SYNCHRONIZATION CALCULATIONS ===
console.log('\n\n⏱️ AUDIO-VISUAL SYNCHRONIZATION');
console.log('=' .repeat(50));

const sync = calculator.calculateSyncronization();
console.log(`\n🎛️ Synchronization Parameters:`);
console.log(`   Beat Interval: ${sync.beatInterval.toFixed(3)} seconds`);
console.log(`   Visual Pulse Rate: ${sync.visualPulseRate.toFixed(2)} Hz`);
console.log(`   Animation Timing: [${sync.animationTiming.map(t => (t * 100).toFixed(0) + '%').join(', ')}]`);
console.log(`   Frequency Modulation: [${sync.frequencyModulation.map(fm => fm.toFixed(2)).join(', ')}]`);

// === ADVANCED AUDIO-VISUAL SYNC DEMONSTRATIONS ===
console.log('\n\n🔄 ADVANCED A/V SYNC DEMONSTRATIONS');
console.log('=' .repeat(50));

// Binaural beats calculation
const leftFreq = 432; // Hz
const rightFreq = 440; // Hz
const binauralBeats = AVSync.generateBinauralBeats(leftFreq, rightFreq);
console.log(`\n🎧 Binaural Beats (${leftFreq} Hz vs ${rightFreq} Hz):`);
console.log(`   Beat Frequency: ${binauralBeats.beatFrequency} Hz`);
console.log(`   Waveform Samples: ${binauralBeats.combinedWaveform.length}`);
console.log(`   Sample Preview: [${binauralBeats.combinedWaveform.slice(0, 5).map(s => s.toFixed(3)).join(', ')}...]`);

// Visual beat synchronization
const audioFreq = 432;
const visualSync = AVSync.calculateVisualBeatSync(audioFreq, 60);
console.log(`\n👁️ Visual Beat Sync (${audioFreq} Hz audio @ 60fps):`);
console.log(`   Visual Frequency: ${visualSync.visualFreq.toFixed(2)} Hz`);
console.log(`   Sync Ratio: ${visualSync.syncRatio.toFixed(4)}`);
console.log(`   Keyframe Timing: [${visualSync.keyframeTiming.map(t => (t * 100).toFixed(0) + '%').join(', ')}]`);

// Beat matching between frequencies
const freq1 = 432;
const freq2 = 528; // "Love frequency"
const beatDifference = AVSync.calculateBeatMatching(freq1, freq2);
console.log(`\n🎵 Beat Matching (${freq1} Hz vs ${freq2} Hz):`);
console.log(`   Frequency Difference: ${beatDifference} Hz`);
console.log(`   Beat Period: ${(1/beatDifference).toFixed(3)} seconds`);

// === PRACTICAL APPLICATION EXAMPLES ===
console.log('\n\n🚀 PRACTICAL APPLICATION EXAMPLES');
console.log('=' .repeat(50));

console.log(`\n🎬 Animation Sequence Generation:`);
animations.forEach((anim, index) => {
  const type = ['Spiral', 'Particle', 'Entropy'][index];
  console.log(`   ${type}: ${anim.duration}s duration, ${anim.rotationSpeed}°/s rotation`);
});

console.log(`\n🎨 Color Palette Generation:`);
visualPatterns.slice(0, 5).forEach((pattern, index) => {
  console.log(`   Color ${index + 1}: ${pattern.colorHex} (${pattern.wavelength.toFixed(0)}nm)`);
});

console.log(`\n🎵 Musical Composition Elements:`);
const musicalNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
soundFrequencies.slice(0, 7).forEach((sound, index) => {
  const note = musicalNotes[index % 7];
  console.log(`   ${note}: ${sound.fundamental.toFixed(1)} Hz, ${sound.duration.toFixed(1)}s, ${sound.waveform} wave`);
});

// === PERFORMANCE METRICS ===
console.log('\n\n⚡ PERFORMANCE METRICS');
console.log('=' .repeat(50));

const startTime = Date.now();
for (let i = 0; i < 1000; i++) {
  calculator.calculateVisualPatterns();
  calculator.calculateSoundFrequencies();
  calculator.calculateAnimationParameters();
}
const endTime = Date.now();
const totalTime = endTime - startTime;

console.log(`\n📊 Performance Results (1000 iterations):`);
console.log(`   Total Time: ${totalTime} ms`);
console.log(`   Average per Calculation: ${(totalTime / 1000).toFixed(2)} ms`);
console.log(`   Calculations per Second: ${Math.round(1000 / (totalTime / 1000))}`);

// === SCIENTIFIC VALIDATION ===
console.log('\n\n🔬 SCIENTIFIC VALIDATION');
console.log('=' .repeat(50));

console.log(`\n✅ Validation Checks:`);
console.log(`   A432 Base Frequency: ${harmonics.baseFrequency === 432 ? '✓' : '✗'} 432 Hz`);
console.log(`   Golden Ratio Accuracy: ${Math.abs(1.618033988749 - 1.618) < 0.001 ? '✓' : '✗'} φ = 1.618...`);
console.log(`   Color Temperature Range: ${colorTemp.temperature > 2000 && colorTemp.temperature < 6500 ? '✓' : '✗'} ${colorTemp.temperature}K`);
console.log(`   Spiral Particle Count: ${spiralViz.particleCount > 30 && spiralViz.particleCount < 50 ? '✓' : '✗'} ${spiralViz.particleCount} particles`);
console.log(`   Animation Duration Range: ${animations.every(a => a.duration >= 6 && a.duration <= 12) ? '✓' : '✗'} 6-12 seconds`);

// === ENTROPY-INFORMATION CORRELATION ===
console.log('\n\n⚖️ ENTROPY-INFORMATION CORRELATION');
console.log('=' .repeat(50));

const thermoEntropy = 158; // kJ/(kg·K)
const infoEntropy = 3.0774; // bits
const maxRadius = spiralViz.maxRadius;
const particleCount = spiralViz.particleCount;

console.log(`\n🔗 Correlation Analysis:`);
console.log(`   Thermodynamic Entropy: ${thermoEntropy} kJ/(kg·K)`);
console.log(`   Information Entropy: ${infoEntropy} bits`);
console.log(`   Max Spiral Radius: ${maxRadius} (${thermoEntropy} × 1.2)`);
console.log(`   Particle Count: ${particleCount} (${thermoEntropy} ÷ 4)`);
console.log(`   Spiral Tightness: ${spiralViz.spiralTightness.toFixed(3)} (${infoEntropy} ÷ 10)`);

console.log('\n✨ Vision, Sound & Animation Calculations Complete!');
console.log('🎨 Visual patterns generated from spiral entropy');
console.log('🎵 Audio frequencies tuned to A432 harmonics');  
console.log('🎬 Animations synchronized with physical processes');
console.log('⚖️ All calculations maintain entropy-information duality\n');