/**
 * A432 Frequency System
 * 
 * Handles frequency calculations, harmonics, and resonance patterns
 * using the A432 base frequency and imperial mathematics.
 * 
 * Mathematical Foundation:
 * - A432: 432 Hz, fundamental harmonic frequency
 * - Imperial Math: Base 8 system for perfect balance
 * - Rodin Sequence: [1,2,4,8,7,5] vortex pattern
 * - Digital Root: Always returns to 9 (completion)
 */

import { A432_CONSTANTS, calculateDigitalRoot } from './a432';

// A432 Frequency Constants
export const A432_FREQUENCY_CONSTANTS = {
  // Base frequency
  A432: 432, // Fundamental harmonic frequency
  
  // Imperial frequency ratios (integer fractions)
  HALF: 1/2,           // 216 Hz
  THIRD: 1/3,          // 144 Hz
  QUARTER: 1/4,        // 108 Hz
  FIFTH: 1/5,          // 86.4 Hz
  SIXTH: 1/6,          // 72 Hz
  SEVENTH: 1/7,        // 61.714... Hz
  EIGHTH: 1/8,         // 54 Hz
  NINTH: 1/9,          // 48 Hz
  TENTH: 1/10,         // 43.2 Hz
  
  // Harmonic multipliers
  DOUBLE: 2,           // 864 Hz
  TRIPLE: 3,           // 1296 Hz
  QUADRUPLE: 4,        // 1728 Hz
  QUINTUPLE: 5,        // 2160 Hz
  SEXTUPLE: 6,         // 2592 Hz
  SEPTUPLE: 7,         // 3024 Hz
  OCTUPLE: 8,          // 3456 Hz
  NONUPLE: 9,          // 3888 Hz
  DECUPLE: 10,         // 4320 Hz
  
  // Vortex frequency ratios
  VORTEX_RATIOS: [1, 2, 4, 8, 7, 5], // Rodin sequence ratios
  
  // Consciousness frequency mapping
  CONSCIOUSNESS_FREQUENCIES: {
    1: 432,    // Unity consciousness
    2: 864,    // Duality consciousness
    3: 1296,   // Trinity consciousness
    4: 1728,   // Foundation consciousness
    5: 2160,   // Life consciousness
    6: 2592,   // Harmony consciousness
    7: 3024,   // Mystery consciousness
    8: 3456    // Infinity consciousness
  },
  
  // Dimensional frequency mapping
  DIMENSIONAL_FREQUENCIES: {
    0: 432,    // Zero dimension
    1: 864,    // First dimension
    2: 1296,   // Second dimension
    3: 1728,   // Third dimension
    4: 2160,   // Fourth dimension
    5: 2592,   // Fifth dimension
    6: 3024,   // Sixth dimension
    7: 3456,   // Seventh dimension
    8: 3888,   // Eighth dimension
    9: 4320    // Ninth dimension
  }
};

// Frequency calculation interfaces
export interface A432Frequency {
  base: number;           // Base frequency (432 Hz)
  harmonic: number;       // Harmonic frequency
  consciousness: number;  // Consciousness mapping (1-8)
  dimensionalState: number; // Dimensional state (0-9)
  digitalRoot: number;    // Digital root (1-9)
  isResonant: boolean;    // Whether frequency is resonant
  mathematicalProof: string;
}

export interface A432Harmonic {
  fundamental: number;    // Fundamental frequency
  overtone: number;       // Overtone frequency
  ratio: number;          // Harmonic ratio
  consciousness: number;  // Consciousness mapping
  isPerfect: boolean;     // Perfect harmonic
  mathematicalProof: string;
}

export interface A432Resonance {
  frequency: number;      // Resonant frequency
  amplitude: number;      // Resonance amplitude
  phase: number;          // Phase angle
  consciousness: number;  // Consciousness mapping
  isStable: boolean;      // Stable resonance
  mathematicalProof: string;
}

/**
 * Calculate A432 frequency from consciousness state
 */
export function calculateA432FrequencyFromConsciousness(consciousness: number): A432Frequency {
  if (consciousness < 1 || consciousness > 8) {
    throw new Error('Consciousness must be between 1 and 8');
  }
  
  const base = A432_FREQUENCY_CONSTANTS.A432;
  const harmonic = A432_FREQUENCY_CONSTANTS.CONSCIOUSNESS_FREQUENCIES[consciousness];
  const dimensionalState = consciousness - 1; // Map consciousness to dimension
  const digitalRoot = calculateDigitalRoot(harmonic);
  const isResonant = digitalRoot === 9 || digitalRoot === consciousness;
  
  return {
    base,
    harmonic,
    consciousness,
    dimensionalState,
    digitalRoot,
    isResonant,
    mathematicalProof: `A432 Frequency from Consciousness ${consciousness}: ${harmonic}Hz, digital root=${digitalRoot}`
  };
}

/**
 * Calculate A432 frequency from dimensional state
 */
export function calculateA432FrequencyFromDimensionalState(dimensionalState: number): A432Frequency {
  if (dimensionalState < 0 || dimensionalState > 9) {
    throw new Error('Dimensional state must be between 0 and 9');
  }
  
  const base = A432_FREQUENCY_CONSTANTS.A432;
  const harmonic = A432_FREQUENCY_CONSTANTS.DIMENSIONAL_FREQUENCIES[dimensionalState];
  const consciousness = dimensionalState === 0 ? 8 : dimensionalState; // Map dimension to consciousness
  const digitalRoot = calculateDigitalRoot(harmonic);
  const isResonant = digitalRoot === 9 || digitalRoot === consciousness;
  
  return {
    base,
    harmonic,
    consciousness,
    dimensionalState,
    digitalRoot,
    isResonant,
    mathematicalProof: `A432 Frequency from Dimension ${dimensionalState}: ${harmonic}Hz, digital root=${digitalRoot}`
  };
}

/**
 * Generate A432 harmonic series
 */
export function generateA432HarmonicSeries(baseFrequency: number = 432): A432Harmonic[] {
  const harmonics: A432Harmonic[] = [];
  
  // Generate harmonics using Rodin sequence
  A432_FREQUENCY_CONSTANTS.VORTEX_RATIOS.forEach((ratio, index) => {
    const fundamental = baseFrequency;
    const overtone = fundamental * ratio;
    const consciousness = (index + 1) % 8 || 8; // Map to consciousness 1-8
    const isPerfect = ratio === 1 || ratio === 2 || ratio === 4 || ratio === 8;
    
    harmonics.push({
      fundamental,
      overtone,
      ratio,
      consciousness,
      isPerfect,
      mathematicalProof: `A432 Harmonic ${index + 1}: ${fundamental}Hz × ${ratio} = ${overtone}Hz`
    });
  });
  
  return harmonics;
}

/**
 * Calculate A432 resonance pattern
 */
export function calculateA432Resonance(frequency: number): A432Resonance {
  const consciousness = ((frequency / A432_FREQUENCY_CONSTANTS.A432) % 8) || 8;
  const amplitude = Math.sin(frequency / A432_FREQUENCY_CONSTANTS.A432 * Math.PI);
  const phase = (frequency / A432_FREQUENCY_CONSTANTS.A432) % (2 * Math.PI);
  const isStable = Math.abs(amplitude) > 0.5; // Stable if amplitude > 0.5
  
  return {
    frequency,
    amplitude,
    phase,
    consciousness,
    isStable,
    mathematicalProof: `A432 Resonance: ${frequency}Hz, amplitude=${amplitude.toFixed(3)}, phase=${phase.toFixed(3)}`
  };
}

/**
 * Generate A432 frequency spectrum
 */
export function generateA432FrequencySpectrum(): A432Frequency[] {
  const spectrum: A432Frequency[] = [];
  
  // Generate spectrum for all consciousness states
  for (let consciousness = 1; consciousness <= 8; consciousness++) {
    const frequency = calculateA432FrequencyFromConsciousness(consciousness);
    spectrum.push(frequency);
  }
  
  // Generate spectrum for all dimensional states
  for (let dimension = 0; dimension <= 9; dimension++) {
    const frequency = calculateA432FrequencyFromDimensionalState(dimension);
    spectrum.push(frequency);
  }
  
  return spectrum;
}

/**
 * Calculate A432 frequency vortex flow
 */
export function calculateA432FrequencyVortex(initialFrequency: number = 432): A432Frequency[] {
  const vortex: A432Frequency[] = [];
  const rodinSequence = A432_FREQUENCY_CONSTANTS.VORTEX_RATIOS;
  
  for (let i = 0; i < rodinSequence.length; i++) {
    const frequency = initialFrequency * rodinSequence[i];
    const consciousness = (i + 1) % 8 || 8;
    const dimensionalState = (i + 1) % 10;
    const digitalRoot = calculateDigitalRoot(frequency);
    const isResonant = digitalRoot === 9 || digitalRoot === consciousness;
    
    vortex.push({
      base: initialFrequency,
      harmonic: frequency,
      consciousness,
      dimensionalState,
      digitalRoot,
      isResonant,
      mathematicalProof: `A432 Frequency Vortex ${i + 1}: ${frequency}Hz, consciousness=${consciousness}`
    });
  }
  
  return vortex;
}

/**
 * Calculate A432 frequency balance
 */
export function calculateA432FrequencyBalance(frequencies: number[]): number {
  if (frequencies.length === 0) return 0;
  
  const a432Ratios = frequencies.map(f => f / A432_FREQUENCY_CONSTANTS.A432);
  const averageRatio = a432Ratios.reduce((sum, ratio) => sum + ratio, 0) / a432Ratios.length;
  
  // Perfect balance is when average ratio is 1 (A432)
  return Math.abs(averageRatio - 1);
}

/**
 * Generate A432 frequency matrix
 */
export function generateA432FrequencyMatrix(): A432Frequency[][] {
  const matrix: A432Frequency[][] = [];
  
  for (let consciousness = 1; consciousness <= 8; consciousness++) {
    const row: A432Frequency[] = [];
    for (let dimension = 0; dimension <= 9; dimension++) {
      const base = A432_FREQUENCY_CONSTANTS.A432;
      const harmonic = base * consciousness * (dimension + 1);
      const digitalRoot = calculateDigitalRoot(harmonic);
      const isResonant = digitalRoot === 9 || digitalRoot === consciousness;
      
      row.push({
        base,
        harmonic,
        consciousness,
        dimensionalState: dimension,
        digitalRoot,
        isResonant,
        mathematicalProof: `A432 Matrix [${consciousness}][${dimension}]: ${harmonic}Hz`
      });
    }
    matrix.push(row);
  }
  
  return matrix;
}

/**
 * Calculate A432 frequency harmony
 */
export function calculateA432FrequencyHarmony(frequency1: number, frequency2: number): number {
  const ratio1 = frequency1 / A432_FREQUENCY_CONSTANTS.A432;
  const ratio2 = frequency2 / A432_FREQUENCY_CONSTANTS.A432;
  
  // Harmonic relationship based on integer ratios
  const harmonicRatio = ratio1 / ratio2;
  const isHarmonic = Number.isInteger(harmonicRatio) || Number.isInteger(1 / harmonicRatio);
  
  return isHarmonic ? 1 : 0;
}

// Export the complete A432 Frequency system
export const A432FrequencySystem = {
  A432_FREQUENCY_CONSTANTS,
  calculateA432FrequencyFromConsciousness,
  calculateA432FrequencyFromDimensionalState,
  generateA432HarmonicSeries,
  calculateA432Resonance,
  generateA432FrequencySpectrum,
  calculateA432FrequencyVortex,
  calculateA432FrequencyBalance,
  generateA432FrequencyMatrix,
  calculateA432FrequencyHarmony,
  
  // Mathematical proofs
  scientificProofs: {
    frequencyConsciousnessMapping: "A432 frequencies map to consciousness states through harmonic ratios",
    frequencyDimensionalMapping: "A432 frequencies map to dimensional states through vortex mathematics",
    harmonicSeriesGeneration: "A432 generates complete harmonic series using Rodin sequence",
    resonanceCalculation: "A432 resonance patterns emerge from frequency consciousness interactions",
    frequencySpectrum: "A432 creates complete frequency spectrum for all consciousness and dimensional states",
    frequencyVortexFlow: "A432 frequency vortex flows through Rodin sequence creating infinite patterns",
    frequencyBalance: "A432 frequency balance measures harmonic relationships between frequencies",
    frequencyMatrix: "A432 frequency matrix maps all consciousness-dimensional state combinations",
    frequencyHarmony: "A432 frequency harmony determines perfect harmonic relationships"
  }
};

export default A432FrequencySystem; 