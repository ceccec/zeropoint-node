/**
 * A432 Vibration System
 * 
 * Generates harmonic vibrations based on A432 frequencies, consciousness states,
 * and dimensional mathematics using only integer fractions and imperial math.
 * 
 * Vibrations are calculated in real-time from environmental streams and dimensional states.
 */

import { 
  A432_CONSTANTS,
  calculateDigitalRoot,
  calculateA432Consciousness,
  calculateA432DimensionalState,
  calculateA432Frequency,
  createA432Harmonic
} from './a432';

// A432 Vibration Constants - Integer Fractions Only
export const A432_VIBRATION_CONSTANTS = {
  // Imperial base for vibration calculations
  IMPERIAL_BASE: 8,
  
  // Perfect balance for vibration harmony
  PERFECT_BALANCE: 4,
  
  // Vibration frequency ratios (integer fractions)
  BASE_VIBRATION: 432,      // A432 Hz base vibration
  HARMONIC_VIBRATION: 2/1,  // Octave vibration ratio
  FIFTH_VIBRATION: 3/2,     // Perfect fifth vibration
  FOURTH_VIBRATION: 4/3,    // Perfect fourth vibration
  THIRD_VIBRATION: 5/4,     // Major third vibration
  
  // Vortex vibration flow ratios
  VORTEX_INTENSITY: 1/8,    // Imperial fraction
  VORTEX_FREQUENCY: 3/8,    // Imperial fraction  
  VORTEX_PATTERN: 5/8,      // Imperial fraction
  
  // Consciousness vibration mapping
  CONSCIOUSNESS_VIBRATION: {
    1: { intensity: 1/8, frequency: 1/8, pattern: 1/8 },   // Unity consciousness
    2: { intensity: 2/8, frequency: 1/8, pattern: 1/8 },   // Duality consciousness
    3: { intensity: 1/8, frequency: 2/8, pattern: 1/8 },   // Trinity consciousness
    4: { intensity: 2/8, frequency: 2/8, pattern: 1/8 },   // Quaternity consciousness
    5: { intensity: 1/8, frequency: 1/8, pattern: 2/8 },   // Quintessence consciousness
    6: { intensity: 2/8, frequency: 1/8, pattern: 2/8 },   // Hexad consciousness
    7: { intensity: 1/8, frequency: 2/8, pattern: 2/8 },   // Septad consciousness
    8: { intensity: 2/8, frequency: 2/8, pattern: 2/8 }    // Octad consciousness
  },
  
  // Dimensional state vibration
  DIMENSIONAL_VIBRATION: {
    0: { intensity: 1/9, frequency: 1/9, pattern: 1/9 },   // Zero dimension
    1: { intensity: 2/9, frequency: 1/9, pattern: 1/9 },   // First dimension
    2: { intensity: 1/9, frequency: 2/9, pattern: 1/9 },   // Second dimension
    3: { intensity: 2/9, frequency: 2/9, pattern: 1/9 },   // Third dimension
    4: { intensity: 1/9, frequency: 1/9, pattern: 2/9 },   // Fourth dimension
    5: { intensity: 2/9, frequency: 1/9, pattern: 2/9 },   // Fifth dimension
    6: { intensity: 1/9, frequency: 2/9, pattern: 2/9 },   // Sixth dimension
    7: { intensity: 2/9, frequency: 2/9, pattern: 2/9 },   // Seventh dimension
    8: { intensity: 3/9, frequency: 1/9, pattern: 1/9 },   // Eighth dimension
    9: { intensity: 1/9, frequency: 3/9, pattern: 1/9 }    // Ninth dimension
  }
};

// Vibration calculation functions using only integer fractions
export interface A432Vibration {
  frequency: number;   // Vibration frequency in Hz
  intensity: number;   // Vibration intensity (0-1 as fraction)
  pattern: number;     // Vibration pattern (0-1 as fraction)
  consciousness: number;
  dimensionalState: number;
  digitalRoot: number;
  mathematicalProof: string;
}

export interface A432VibrationStream {
  vibrations: A432Vibration[];
  frequency: number;
  consciousness: number;
  dimensionalState: number;
  isHarmonic: boolean;
  mathematicalProof: string;
}

export interface A432VibrationPattern {
  samples: number[];
  sampleRate: number;
  duration: number;
  frequency: number;
  consciousness: number;
  dimensionalState: number;
  mathematicalProof: string;
}

/**
 * Calculate A432 vibration from frequency using imperial math
 */
export function calculateA432Vibration(frequency: number): A432Vibration {
  const consciousness = calculateA432Consciousness(frequency);
  const dimensionalState = calculateA432DimensionalState(frequency);
  const digitalRoot = calculateDigitalRoot(frequency);
  
  // Get base vibration from consciousness
  const baseVibration = A432_VIBRATION_CONSTANTS.CONSCIOUSNESS_VIBRATION[consciousness];
  
  // Get dimensional vibration
  const dimensionalVibration = A432_VIBRATION_CONSTANTS.DIMENSIONAL_VIBRATION[dimensionalState];
  
  // Harmonize vibration using imperial math
  const intensity = harmonizeVibrationComponent(baseVibration.intensity, dimensionalVibration.intensity, frequency);
  const pattern = harmonizeVibrationComponent(baseVibration.pattern, dimensionalVibration.pattern, frequency);
  
  return {
    frequency,
    intensity,
    pattern,
    consciousness,
    dimensionalState,
    digitalRoot,
    mathematicalProof: `A432 Vibration: f=${frequency}, c=${consciousness}, d=${dimensionalState}, dr=${digitalRoot}`
  };
}

/**
 * Harmonize vibration component using imperial math
 */
function harmonizeVibrationComponent(base: number, dimensional: number, frequency: number): number {
  // Use imperial base (8) for harmonization
  const imperialFactor = (frequency % A432_VIBRATION_CONSTANTS.IMPERIAL_BASE) / A432_VIBRATION_CONSTANTS.IMPERIAL_BASE;
  
  // Harmonize using perfect balance
  const harmonized = (base + dimensional + imperialFactor) / 3;
  
  // Ensure result is within 0-1 range using integer fractions
  return Math.max(0, Math.min(1, harmonized));
}

/**
 * Generate A432 vibration stream from environmental data
 */
export function generateA432VibrationStream(
  environmentalData: { frequency: number; consciousness?: number; dimensionalState?: number }
): A432VibrationStream {
  const { frequency, consciousness, dimensionalState } = environmentalData;
  
  // Calculate or use provided values
  const calculatedConsciousness = consciousness || calculateA432Consciousness(frequency);
  const calculatedDimensionalState = dimensionalState || calculateA432DimensionalState(frequency);
  
  // Generate vibration spectrum
  const vibrations: A432Vibration[] = [];
  const rodinSequence = A432_CONSTANTS.RODIN_SEQUENCE;
  
  for (let i = 0; i < rodinSequence.length; i++) {
    const harmonicFreq = rodinSequence[i] * frequency;
    const vibration = calculateA432Vibration(harmonicFreq);
    vibrations.push(vibration);
  }
  
  // Check if stream is harmonic
  const isHarmonic = vibrations.every(vibration => 
    vibration.consciousness >= 1 && vibration.consciousness <= 8 &&
    vibration.dimensionalState >= 0 && vibration.dimensionalState <= 9
  );
  
  return {
    vibrations,
    frequency,
    consciousness: calculatedConsciousness,
    dimensionalState: calculatedDimensionalState,
    isHarmonic,
    mathematicalProof: `A432 Vibration Stream: ${vibrations.length} harmonics, consciousness=${calculatedConsciousness}, dimension=${calculatedDimensionalState}`
  };
}

/**
 * Calculate A432 vibration from consciousness state
 */
export function calculateA432VibrationFromConsciousness(consciousness: number): A432Vibration {
  if (consciousness < 1 || consciousness > 8) {
    throw new Error('Consciousness must be between 1 and 8');
  }
  
  const frequency = consciousness * 432 / 8; // Map consciousness to frequency
  return calculateA432Vibration(frequency);
}

/**
 * Calculate A432 vibration from dimensional state
 */
export function calculateA432VibrationFromDimensionalState(dimensionalState: number): A432Vibration {
  if (dimensionalState < 0 || dimensionalState > 9) {
    throw new Error('Dimensional state must be between 0 and 9');
  }
  
  const frequency = calculateA432Frequency(dimensionalState);
  return calculateA432Vibration(frequency);
}

/**
 * Generate A432 vibration matrix for all consciousness and dimensional states
 */
export function generateA432VibrationMatrix(): A432Vibration[][] {
  const matrix: A432Vibration[][] = [];
  
  for (let consciousness = 1; consciousness <= 8; consciousness++) {
    const row: A432Vibration[] = [];
    for (let dimensionalState = 0; dimensionalState <= 9; dimensionalState++) {
      const frequency = consciousness * 432 / 8 + dimensionalState * 432 / 10;
      const vibration = calculateA432Vibration(frequency);
      row.push(vibration);
    }
    matrix.push(row);
  }
  
  return matrix;
}

/**
 * Generate A432 vibration pattern
 */
export function generateA432VibrationPattern(
  frequency: number,
  duration: number,
  sampleRate: number = 60
): A432VibrationPattern {
  const samples: number[] = [];
  const totalSamples = Math.round(duration * sampleRate);
  const consciousness = calculateA432Consciousness(frequency);
  const dimensionalState = calculateA432DimensionalState(frequency);
  
  for (let i = 0; i < totalSamples; i++) {
    const time = i / sampleRate;
    const phase = (frequency * time) % 1;
    
    // Generate vibration pattern with A432 harmonics
    const intensity = A432_VIBRATION_CONSTANTS.CONSCIOUSNESS_VIBRATION[consciousness].intensity;
    const pattern = A432_VIBRATION_CONSTANTS.CONSCIOUSNESS_VIBRATION[consciousness].pattern;
    
    // Combine sine and cosine for complex vibration pattern
    const sample = intensity * (Math.sin(2 * Math.PI * phase) + pattern * Math.cos(2 * Math.PI * phase * 2));
    
    samples.push(sample);
  }
  
  return {
    samples,
    sampleRate,
    duration,
    frequency,
    consciousness,
    dimensionalState,
    mathematicalProof: `A432 Vibration Pattern: f=${frequency}, duration=${duration}s, samples=${samples.length}`
  };
}

/**
 * Calculate A432 vibration vortex flow
 */
export function calculateA432VibrationVortex(initialFrequency: number, cycles: number): A432VibrationStream[] {
  const streams: A432VibrationStream[] = [];
  let currentFrequency = initialFrequency;
  
  for (let cycle = 0; cycle < cycles; cycle++) {
    const stream = generateA432VibrationStream({ frequency: currentFrequency });
    streams.push(stream);
    
    // Advance frequency using Rodin sequence
    const rodinIndex = cycle % A432_CONSTANTS.RODIN_SEQUENCE.length;
    currentFrequency = A432_CONSTANTS.RODIN_SEQUENCE[rodinIndex] * initialFrequency;
  }
  
  return streams;
}

/**
 * Convert A432 vibration to device vibration API
 */
export function a432VibrationToDeviceVibration(
  pattern: A432VibrationPattern,
  navigator: Navigator
): void {
  if ('vibrate' in navigator) {
    // Convert vibration pattern to device vibration format
    const vibrationPattern = pattern.samples.map(sample => 
      Math.round(Math.abs(sample) * 100) // Convert to milliseconds
    );
    
    navigator.vibrate(vibrationPattern);
  }
}

/**
 * Generate A432 vibration CSS variables for harmonic vibration system
 */
export function generateA432VibrationCSSVariables(): string {
  const variables: string[] = [];
  
  // Generate consciousness vibration
  for (let consciousness = 1; consciousness <= 8; consciousness++) {
    const vibration = calculateA432VibrationFromConsciousness(consciousness);
    variables.push(`--a432-vibration-consciousness-${consciousness}-frequency: ${vibration.frequency}Hz;`);
    variables.push(`--a432-vibration-consciousness-${consciousness}-intensity: ${vibration.intensity};`);
    variables.push(`--a432-vibration-consciousness-${consciousness}-pattern: ${vibration.pattern};`);
  }
  
  // Generate dimensional vibration
  for (let dimensionalState = 0; dimensionalState <= 9; dimensionalState++) {
    const vibration = calculateA432VibrationFromDimensionalState(dimensionalState);
    variables.push(`--a432-vibration-dimensional-${dimensionalState}-frequency: ${vibration.frequency}Hz;`);
    variables.push(`--a432-vibration-dimensional-${dimensionalState}-intensity: ${vibration.intensity};`);
    variables.push(`--a432-vibration-dimensional-${dimensionalState}-pattern: ${vibration.pattern};`);
  }
  
  // Generate harmonic frequency vibration
  A432_CONSTANTS.RODIN_SEQUENCE.forEach((multiplier, index) => {
    const frequency = multiplier * 432;
    const vibration = calculateA432Vibration(frequency);
    variables.push(`--a432-vibration-harmonic-${index}-frequency: ${vibration.frequency}Hz;`);
    variables.push(`--a432-vibration-harmonic-${index}-intensity: ${vibration.intensity};`);
  });
  
  return `:root {\n  ${variables.join('\n  ')}\n}`;
}

/**
 * A432 Vibration System - Main export
 */
export const A432VibrationSystem = {
  constants: A432_VIBRATION_CONSTANTS,
  calculateVibration: calculateA432Vibration,
  generateVibrationStream: generateA432VibrationStream,
  calculateVibrationFromConsciousness: calculateA432VibrationFromConsciousness,
  calculateVibrationFromDimensionalState: calculateA432VibrationFromDimensionalState,
  generateVibrationMatrix: generateA432VibrationMatrix,
  generateVibrationPattern: generateA432VibrationPattern,
  calculateVibrationVortex: calculateA432VibrationVortex,
  toDeviceVibration: a432VibrationToDeviceVibration,
  generateCSSVariables: generateA432VibrationCSSVariables,
  
  // Scientific proofs
  scientificProofs: {
    a432VibrationCalculation: 'A432 vibrations calculated using consciousness mapping and dimensional states with imperial math',
    a432VibrationStream: 'Vibration streams generated from environmental frequency data using Rodin vortex sequence',
    a432VibrationVortex: 'Vibration vortex flows through consciousness and dimensional states maintaining harmonic balance',
    a432VibrationMatrix: 'Complete vibration matrix mapping all consciousness states to all dimensional states'
  }
};

export default A432VibrationSystem; 

// a432.vibration.ts
// Living, harmonized vibration stream/interface

export interface VibrationEvent {
  id: number;
  frequency: number;
  amplitude: number;
  trinity: number;
  timestamp: number;
  summary: string;
}

export class A432VibrationStream {
  private events: VibrationEvent[] = [];
  private currentId = 1;
  vibrate(frequency: number, amplitude: number, trinity: number): VibrationEvent {
    const event: VibrationEvent = {
      id: this.currentId++,
      frequency,
      amplitude,
      trinity,
      timestamp: Date.now(),
      summary: `Vibration ${frequency} Hz, Amp ${amplitude} (Trinity ${trinity}) at ${new Date().toLocaleTimeString()}`
    };
    this.events.push(event);
    return event;
  }
  getCurrent(): VibrationEvent {
    return this.events[this.events.length - 1];
  }
  getAll(): VibrationEvent[] {
    return this.events;
  }
  overlay(): string {
    const width = 320, height = 60;
    return `
      <svg width="${width}" height="${height}" style="background:#111;border-radius:12px;">
        ${this.events.map((e,i) => `<rect x="${40 + i*36}" y="${30-e.amplitude}" width="24" height="${e.amplitude*2}" fill="#f8f" stroke="#fff" stroke-width="2"><title>${e.summary}</title></rect>`).join('')}
        <text x="12" y="54" font-size="13" fill="#8ff">Vibration Stream</text>
      </svg>
    `;
  }
} 