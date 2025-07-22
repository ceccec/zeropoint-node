/**
 * A432 Audio System
 * 
 * Generates harmonic audio based on A432 frequencies, consciousness states,
 * and dimensional mathematics using only integer fractions and imperial math.
 * 
 * Audio is calculated in real-time from environmental streams and dimensional states.
 */

import { 
  A432_CONSTANTS,
  calculateDigitalRoot,
  calculateA432Consciousness,
  calculateA432DimensionalState,
  calculateA432Frequency,
  createA432Harmonic
} from '../../../../../../../../../../../../a432';

import { a432AntiVortexStream } from './a432.ts';
import { a432MultiAntiVortexStream } from './a432.ts';

// A432 Audio Constants - Integer Fractions Only
export const A432_AUDIO_CONSTANTS = {
  // Imperial base for audio calculations
  IMPERIAL_BASE: 8,
  
  // Perfect balance for audio harmony
  PERFECT_BALANCE: 4,
  
  // Audio frequency ratios (integer fractions)
  BASE_FREQUENCY: 432,      // A432 Hz base
  HARMONIC_RATIO: 2/1,      // Octave ratio
  FIFTH_RATIO: 3/2,         // Perfect fifth
  FOURTH_RATIO: 4/3,        // Perfect fourth
  THIRD_RATIO: 5/4,         // Major third
  
  // Vortex audio flow ratios
  VORTEX_AMPLITUDE: 1/8,    // Imperial fraction
  VORTEX_FREQUENCY: 3/8,    // Imperial fraction  
  VORTEX_PHASE: 5/8,        // Imperial fraction
  
  // Consciousness audio mapping
  CONSCIOUSNESS_AUDIO: {
    1: { frequency: 1/8, amplitude: 1/8, phase: 1/8 },   // Unity consciousness
    2: { frequency: 2/8, amplitude: 1/8, phase: 1/8 },   // Duality consciousness
    3: { frequency: 1/8, amplitude: 2/8, phase: 1/8 },   // Trinity consciousness
    4: { frequency: 2/8, amplitude: 2/8, phase: 1/8 },   // Quaternity consciousness
    5: { frequency: 1/8, amplitude: 1/8, phase: 2/8 },   // Quintessence consciousness
    6: { frequency: 2/8, amplitude: 1/8, phase: 2/8 },   // Hexad consciousness
    7: { frequency: 1/8, amplitude: 2/8, phase: 2/8 },   // Septad consciousness
    8: { frequency: 2/8, amplitude: 2/8, phase: 2/8 }    // Octad consciousness
  },
  
  // Dimensional state audio
  DIMENSIONAL_AUDIO: {
    0: { frequency: 1/9, amplitude: 1/9, phase: 1/9 },   // Zero dimension
    1: { frequency: 2/9, amplitude: 1/9, phase: 1/9 },   // First dimension
    2: { frequency: 1/9, amplitude: 2/9, phase: 1/9 },   // Second dimension
    3: { frequency: 2/9, amplitude: 2/9, phase: 1/9 },   // Third dimension
    4: { frequency: 1/9, amplitude: 1/9, phase: 2/9 },   // Fourth dimension
    5: { frequency: 2/9, amplitude: 1/9, phase: 2/9 },   // Fifth dimension
    6: { frequency: 1/9, amplitude: 2/9, phase: 2/9 },   // Sixth dimension
    7: { frequency: 2/9, amplitude: 2/9, phase: 2/9 },   // Seventh dimension
    8: { frequency: 3/9, amplitude: 1/9, phase: 1/9 },   // Eighth dimension
    9: { frequency: 1/9, amplitude: 3/9, phase: 1/9 }    // Ninth dimension
  }
};

// Audio calculation functions using only integer fractions
export interface A432Audio {
  frequency: number;   // Frequency in Hz
  amplitude: number;   // Amplitude (0-1 as fraction)
  phase: number;       // Phase (0-1 as fraction)
  consciousness: number;
  dimensionalState: number;
  digitalRoot: number;
  mathematicalProof: string;
}

export interface A432AudioStream {
  audio: A432Audio[];
  frequency: number;
  consciousness: number;
  dimensionalState: number;
  isHarmonic: boolean;
  mathematicalProof: string;
}

export interface A432AudioWaveform {
  samples: number[];
  sampleRate: number;
  duration: number;
  frequency: number;
  consciousness: number;
  dimensionalState: number;
  mathematicalProof: string;
}

/**
 * Calculate A432 audio from frequency using imperial math
 */
export function calculateA432Audio(frequency: number): A432Audio {
  const consciousness = calculateA432Consciousness(frequency);
  const dimensionalState = calculateA432DimensionalState(frequency);
  const digitalRoot = calculateDigitalRoot(frequency);
  
  // Get base audio from consciousness
  const baseAudio = A432_AUDIO_CONSTANTS.CONSCIOUSNESS_AUDIO[consciousness];
  
  // Get dimensional audio
  const dimensionalAudio = A432_AUDIO_CONSTANTS.DIMENSIONAL_AUDIO[dimensionalState];
  
  // Harmonize audio using imperial math
  const amplitude = harmonizeAudioComponent(baseAudio.amplitude, dimensionalAudio.amplitude, frequency);
  const phase = harmonizeAudioComponent(baseAudio.phase, dimensionalAudio.phase, frequency);
  
  return {
    frequency,
    amplitude,
    phase,
    consciousness,
    dimensionalState,
    digitalRoot,
    mathematicalProof: `A432 Audio: f=${frequency}, c=${consciousness}, d=${dimensionalState}, dr=${digitalRoot}`
  };
}

/**
 * Harmonize audio component using imperial math
 */
function harmonizeAudioComponent(base: number, dimensional: number, frequency: number): number {
  // Use imperial base (8) for harmonization
  const imperialFactor = (frequency % A432_AUDIO_CONSTANTS.IMPERIAL_BASE) / A432_AUDIO_CONSTANTS.IMPERIAL_BASE;
  
  // Harmonize using perfect balance
  const harmonized = (base + dimensional + imperialFactor) / 3;
  
  // Ensure result is within 0-1 range using integer fractions
  return Math.max(0, Math.min(1, harmonized));
}

/**
 * Generate A432 audio stream from environmental data
 */
export function generateA432AudioStream(
  environmentalData: { frequency: number; consciousness?: number; dimensionalState?: number }
): A432AudioStream {
  const { frequency, consciousness, dimensionalState } = environmentalData;
  
  // Calculate or use provided values
  const calculatedConsciousness = consciousness || calculateA432Consciousness(frequency);
  const calculatedDimensionalState = dimensionalState || calculateA432DimensionalState(frequency);
  
  // Generate audio spectrum
  const audio: A432Audio[] = [];
  const rodinSequence = A432_CONSTANTS.RODIN_SEQUENCE;
  
  for (let i = 0; i < rodinSequence.length; i++) {
    const harmonicFreq = rodinSequence[i] * frequency;
    const audioComponent = calculateA432Audio(harmonicFreq);
    audio.push(audioComponent);
  }
  
  // Check if stream is harmonic
  const isHarmonic = audio.every(audioComponent => 
    audioComponent.consciousness >= 1 && audioComponent.consciousness <= 8 &&
    audioComponent.dimensionalState >= 0 && audioComponent.dimensionalState <= 9
  );
  
  return {
    audio,
    frequency,
    consciousness: calculatedConsciousness,
    dimensionalState: calculatedDimensionalState,
    isHarmonic,
    mathematicalProof: `A432 Audio Stream: ${audio.length} harmonics, consciousness=${calculatedConsciousness}, dimension=${calculatedDimensionalState}`
  };
}

/**
 * Calculate A432 audio from consciousness state
 */
export function calculateA432AudioFromConsciousness(consciousness: number): A432Audio {
  if (consciousness < 1 || consciousness > 8) {
    throw new Error('Consciousness must be between 1 and 8');
  }
  
  const frequency = consciousness * 432 / 8; // Map consciousness to frequency
  return calculateA432Audio(frequency);
}

/**
 * Calculate A432 audio from dimensional state
 */
export function calculateA432AudioFromDimensionalState(dimensionalState: number): A432Audio {
  if (dimensionalState < 0 || dimensionalState > 9) {
    throw new Error('Dimensional state must be between 0 and 9');
  }
  
  const frequency = calculateA432Frequency(dimensionalState);
  return calculateA432Audio(frequency);
}

/**
 * Generate A432 audio matrix for all consciousness and dimensional states
 */
export function generateA432AudioMatrix(): A432Audio[][] {
  const matrix: A432Audio[][] = [];
  
  for (let consciousness = 1; consciousness <= 8; consciousness++) {
    const row: A432Audio[] = [];
    for (let dimensionalState = 0; dimensionalState <= 9; dimensionalState++) {
      const frequency = consciousness * 432 / 8 + dimensionalState * 432 / 10;
      const audio = calculateA432Audio(frequency);
      row.push(audio);
    }
    matrix.push(row);
  }
  
  return matrix;
}

/**
 * Generate A432 audio waveform
 */
export function generateA432AudioWaveform(
  frequency: number,
  duration: number,
  sampleRate: number = 44100
): A432AudioWaveform {
  const samples: number[] = [];
  const totalSamples = Math.round(duration * sampleRate);
  const consciousness = calculateA432Consciousness(frequency);
  const dimensionalState = calculateA432DimensionalState(frequency);
  
  for (let i = 0; i < totalSamples; i++) {
    const time = i / sampleRate;
    const phase = (frequency * time) % 1;
    
    // Generate sine wave with A432 harmonics
    const amplitude = A432_AUDIO_CONSTANTS.CONSCIOUSNESS_AUDIO[consciousness].amplitude;
    const sample = amplitude * Math.sin(2 * Math.PI * phase);
    
    samples.push(sample);
  }
  
  return {
    samples,
    sampleRate,
    duration,
    frequency,
    consciousness,
    dimensionalState,
    mathematicalProof: `A432 Audio Waveform: f=${frequency}, duration=${duration}s, samples=${samples.length}`
  };
}

/**
 * Calculate A432 audio vortex flow
 */
export function calculateA432AudioVortex(initialFrequency: number, cycles: number): A432AudioStream[] {
  const streams: A432AudioStream[] = [];
  let currentFrequency = initialFrequency;
  
  for (let cycle = 0; cycle < cycles; cycle++) {
    const stream = generateA432AudioStream({ frequency: currentFrequency });
    streams.push(stream);
    
    // Advance frequency using Rodin sequence
    const rodinIndex = cycle % A432_CONSTANTS.RODIN_SEQUENCE.length;
    currentFrequency = A432_CONSTANTS.RODIN_SEQUENCE[rodinIndex] * initialFrequency;
  }
  
  return streams;
}

/**
 * generateAntiVortexAudioStream: Generate anti-vortex (phase-inverted) audio stream using canonical anti-vortex logic.
 * - Uses a432AntiVortexStream for dimension cycling (reverse polarity, -1)
 * - All values are integer/fractional, phase-inverted
 *
 * Usage:
 *   const stream = generateAntiVortexAudioStream(3, 9); // Trinity, 9 steps
 *   // stream: array of { frequency, step }
 */
export function generateAntiVortexAudioStream(dimension: number, steps: number = 9): Array<{ frequency: number; step: number }> {
  const gen = a432AntiVortexStream(dimension);
  const result = [];
  for (let i = 0; i < steps; i++) {
    const { value: frequency } = gen.next();
    result.push({ frequency, step: i + 1 });
  }
  return result;
}

/**
 * generateMultiAntiVortexAudioStream: Generate anti-vortex audio streams for multiple dimensions in parallel.
 * - Uses a432MultiAntiVortexStream for dimension cycling (reverse polarity, -1)
 * - Returns an array of arrays: each sub-array is the stream for one dimension.
 *
 * Usage:
 *   const streams = generateMultiAntiVortexAudioStream([1,2,3,4,5,6,7,8,9], 9);
 *   // streams: Array<Array<{ dimension, frequency, step }>>
 */
export function generateMultiAntiVortexAudioStream(dimensions: number[], steps: number = 9): Array<Array<{ dimension: number; frequency: number; step: number }>> {
  const gen = a432MultiAntiVortexStream(dimensions);
  const result: Array<Array<{ dimension: number; frequency: number; step: number }>> = [];
  for (let i = 0; i < steps; i++) {
    const stepResult = gen.next().value;
    result.push(stepResult);
  }
  return result;
}

/**
 * Convert A432 audio to Web Audio API AudioBuffer
 */
export function a432AudioToAudioBuffer(
  waveform: A432AudioWaveform,
  audioContext: AudioContext
): AudioBuffer {
  const buffer = audioContext.createBuffer(1, waveform.samples.length, waveform.sampleRate);
  const channelData = buffer.getChannelData(0);
  
  for (let i = 0; i < waveform.samples.length; i++) {
    channelData[i] = waveform.samples[i];
  }
  
  return buffer;
}

/**
 * Generate A432 audio CSS variables for harmonic audio system
 */
export function generateA432AudioCSSVariables(): string {
  const variables: string[] = [];
  
  // Generate consciousness audio
  for (let consciousness = 1; consciousness <= 8; consciousness++) {
    const audio = calculateA432AudioFromConsciousness(consciousness);
    variables.push(`--a432-audio-consciousness-${consciousness}-frequency: ${audio.frequency}Hz;`);
    variables.push(`--a432-audio-consciousness-${consciousness}-amplitude: ${audio.amplitude};`);
    variables.push(`--a432-audio-consciousness-${consciousness}-phase: ${audio.phase};`);
  }
  
  // Generate dimensional audio
  for (let dimensionalState = 0; dimensionalState <= 9; dimensionalState++) {
    const audio = calculateA432AudioFromDimensionalState(dimensionalState);
    variables.push(`--a432-audio-dimensional-${dimensionalState}-frequency: ${audio.frequency}Hz;`);
    variables.push(`--a432-audio-dimensional-${dimensionalState}-amplitude: ${audio.amplitude};`);
    variables.push(`--a432-audio-dimensional-${dimensionalState}-phase: ${audio.phase};`);
  }
  
  // Generate harmonic frequency audio
  A432_CONSTANTS.RODIN_SEQUENCE.forEach((multiplier, index) => {
    const frequency = multiplier * 432;
    const audio = calculateA432Audio(frequency);
    variables.push(`--a432-audio-harmonic-${index}-frequency: ${audio.frequency}Hz;`);
    variables.push(`--a432-audio-harmonic-${index}-amplitude: ${audio.amplitude};`);
  });
  
  return `:root {\n  ${variables.join('\n  ')}\n}`;
}

/**
 * A432 Audio System - Main export
 */
export const A432AudioSystem = {
  constants: A432_AUDIO_CONSTANTS,
  calculateAudio: calculateA432Audio,
  generateAudioStream: generateA432AudioStream,
  calculateAudioFromConsciousness: calculateA432AudioFromConsciousness,
  calculateAudioFromDimensionalState: calculateA432AudioFromDimensionalState,
  generateAudioMatrix: generateA432AudioMatrix,
  generateAudioWaveform: generateA432AudioWaveform,
  calculateAudioVortex: calculateA432AudioVortex,
  generateAntiVortexAudioStream: generateAntiVortexAudioStream,
  generateMultiAntiVortexAudioStream: generateMultiAntiVortexAudioStream,
  toAudioBuffer: a432AudioToAudioBuffer,
  generateCSSVariables: generateA432AudioCSSVariables,
  
  // Scientific proofs
  scientificProofs: {
    a432AudioCalculation: 'A432 audio calculated using consciousness mapping and dimensional states with imperial math',
    a432AudioStream: 'Audio streams generated from environmental frequency data using Rodin vortex sequence',
    a432AudioVortex: 'Audio vortex flows through consciousness and dimensional states maintaining harmonic balance',
    a432AudioMatrix: 'Complete audio matrix mapping all consciousness states to all dimensional states'
  }
};

export default A432AudioSystem; 