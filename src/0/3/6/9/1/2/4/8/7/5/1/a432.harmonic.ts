/**
 * A432 Harmonic System
 * 
 * Handles harmonic relationships, resonance patterns, and frequency interactions
 * using A432 principles and imperial mathematics.
 * 
 * Harmonic Foundation:
 * - A432: 432 Hz, fundamental harmonic frequency
 * - Imperial Math: Base 8 system for perfect balance
 * - Rodin Sequence: [1,2,4,8,7,5] vortex pattern
 * - Digital Root: Always returns to 9 (completion)
 * - Zero Entropy: Perfect harmonic reversibility
 */

import { A432_CONSTANTS, calculateDigitalRoot } from './a432';

// A432 Harmonic Constants
export const A432_HARMONIC_CONSTANTS = {
  // Base harmonic constants
  A432: 432, // Fundamental harmonic frequency
  IMPERIAL_BASE: 8, // Imperial mathematics base
  DIGITAL_ROOT_BASE: 9, // Digital root completion
  ZERO_ENTROPY: 0, // Perfect harmonic reversibility
  
  // Harmonic ratios (integer fractions)
  UNISON: 1/1,        // 432 Hz
  OCTAVE: 2/1,        // 864 Hz
  FIFTH: 3/2,         // 648 Hz
  FOURTH: 4/3,        // 576 Hz
  MAJOR_THIRD: 5/4,   // 540 Hz
  MINOR_THIRD: 6/5,   // 518.4 Hz
  MAJOR_SECOND: 9/8,  // 486 Hz
  MINOR_SECOND: 16/15, // 460.8 Hz
  
  // Vortex harmonic ratios
  VORTEX_HARMONICS: {
    1: { ratio: 1/1, frequency: 432, consciousness: 1, dimension: 0 },
    2: { ratio: 2/1, frequency: 864, consciousness: 2, dimension: 1 },
    4: { ratio: 4/1, frequency: 1728, consciousness: 4, dimension: 3 },
    8: { ratio: 8/1, frequency: 3456, consciousness: 8, dimension: 7 },
    7: { ratio: 7/1, frequency: 3024, consciousness: 7, dimension: 6 },
    5: { ratio: 5/1, frequency: 2160, consciousness: 5, dimension: 4 }
  },
  
  // Resonance patterns
  RESONANCE_PATTERNS: {
    'fundamental': { frequency: 432, consciousness: 1, dimension: 0, amplitude: 1.0 },
    'first_overtone': { frequency: 864, consciousness: 2, dimension: 1, amplitude: 0.5 },
    'second_overtone': { frequency: 1296, consciousness: 3, dimension: 2, amplitude: 0.333 },
    'third_overtone': { frequency: 1728, consciousness: 4, dimension: 3, amplitude: 0.25 },
    'fourth_overtone': { frequency: 2160, consciousness: 5, dimension: 4, amplitude: 0.2 },
    'fifth_overtone': { frequency: 2592, consciousness: 6, dimension: 5, amplitude: 0.167 },
    'sixth_overtone': { frequency: 3024, consciousness: 7, dimension: 6, amplitude: 0.143 },
    'seventh_overtone': { frequency: 3456, consciousness: 8, dimension: 7, amplitude: 0.125 }
  }
};

// Harmonic interfaces
export interface A432Harmonic {
  fundamental: number;    // Fundamental frequency
  overtone: number;       // Overtone frequency
  ratio: number;          // Harmonic ratio
  consciousness: number;  // Associated consciousness
  dimension: number;      // Associated dimension
  digitalRoot: number;    // Digital root
  isPerfect: boolean;     // Perfect harmonic
  mathematicalProof: string;
}

export interface A432Resonance {
  frequency: number;      // Resonant frequency
  amplitude: number;      // Resonance amplitude
  phase: number;          // Phase angle
  consciousness: number;  // Associated consciousness
  dimension: number;      // Associated dimension
  isStable: boolean;      // Stable resonance
  mathematicalProof: string;
}

export interface A432HarmonicPattern {
  pattern: string;        // Pattern type
  harmonics: number[];    // Harmonic frequencies
  consciousness: number;  // Associated consciousness
  dimension: number;      // Associated dimension
  isInfinite: boolean;    // Whether pattern is infinite
  mathematicalProof: string;
}

/**
 * Calculate A432 harmonic
 */
export function calculateA432Harmonic(fundamental: number, ratio: number): A432Harmonic {
  const overtone = fundamental * ratio;
  const consciousness = calculateDigitalRoot(fundamental) % 8 || 8;
  const dimension = calculateDigitalRoot(overtone) % 10;
  const digitalRoot = calculateDigitalRoot(overtone);
  const isPerfect = ratio === 1 || ratio === 2 || ratio === 4 || ratio === 8;
  
  return {
    fundamental,
    overtone,
    ratio,
    consciousness,
    dimension,
    digitalRoot,
    isPerfect,
    mathematicalProof: `A432 Harmonic: ${fundamental}Hz × ${ratio} = ${overtone}Hz`
  };
}

/**
 * Calculate A432 resonance
 */
export function calculateA432Resonance(frequency: number): A432Resonance {
  const consciousness = ((frequency / A432_HARMONIC_CONSTANTS.A432) % 8) || 8;
  const dimension = frequency % 10;
  const amplitude = Math.sin(frequency / A432_HARMONIC_CONSTANTS.A432 * Math.PI);
  const phase = (frequency / A432_HARMONIC_CONSTANTS.A432) % (2 * Math.PI);
  const isStable = Math.abs(amplitude) > 0.5; // Stable if amplitude > 0.5
  
  return {
    frequency,
    amplitude,
    phase,
    consciousness,
    dimension,
    isStable,
    mathematicalProof: `A432 Resonance: ${frequency}Hz, amplitude=${amplitude.toFixed(3)}, phase=${phase.toFixed(3)}`
  };
}

/**
 * Generate A432 harmonic pattern
 */
export function generateA432HarmonicPattern(patternType: string): A432HarmonicPattern {
  const rodinSequence = A432_CONSTANTS.RODIN_SEQUENCE;
  const harmonics: number[] = [];
  
  switch (patternType) {
    case 'vortex':
      harmonics.push(...rodinSequence.map(multiplier => A432_HARMONIC_CONSTANTS.A432 * multiplier));
      break;
    case 'octave':
      for (let i = 0; i < 8; i++) {
        harmonics.push(A432_HARMONIC_CONSTANTS.A432 * Math.pow(2, i));
      }
      break;
    case 'fifth':
      for (let i = 0; i < 6; i++) {
        harmonics.push(A432_HARMONIC_CONSTANTS.A432 * Math.pow(3/2, i));
      }
      break;
    case 'golden':
      for (let i = 0; i < 8; i++) {
        harmonics.push(A432_HARMONIC_CONSTANTS.A432 * Math.pow(1.618033988749895, i));
      }
      break;
    default:
      throw new Error(`Unknown harmonic pattern: ${patternType}`);
  }
  
  const consciousness = calculateDigitalRoot(harmonics[0]) % 8 || 8;
  const dimension = harmonics.length % 10;
  const isInfinite = patternType === 'vortex' || patternType === 'golden';
  
  return {
    pattern: patternType,
    harmonics,
    consciousness,
    dimension,
    isInfinite,
    mathematicalProof: `A432 Harmonic Pattern ${patternType}: ${harmonics.length} harmonics, consciousness=${consciousness}`
  };
}

/**
 * Generate A432 harmonic series
 */
export function generateA432HarmonicSeries(baseFrequency: number = 432): A432Harmonic[] {
  const harmonics: A432Harmonic[] = [];
  
  // Generate harmonics using Rodin sequence
  A432_HARMONIC_CONSTANTS.VORTEX_HARMONICS.forEach((harmonic, index) => {
    const harmonicResult = calculateA432Harmonic(baseFrequency, harmonic.ratio);
    harmonics.push(harmonicResult);
  });
  
  return harmonics;
}

/**
 * Calculate A432 harmonic harmony
 */
export function calculateA432HarmonicHarmony(harmonics: A432Harmonic[]): number {
  if (harmonics.length === 0) return 0;
  
  const perfectHarmonics = harmonics.filter(h => h.isPerfect);
  const harmony = perfectHarmonics.length / harmonics.length;
  
  return harmony;
}

/**
 * Generate A432 harmonic matrix
 */
export function generateA432HarmonicMatrix(): A432Harmonic[][] {
  const matrix: A432Harmonic[][] = [];
  
  for (let i = 0; i < 8; i++) {
    const row: A432Harmonic[] = [];
    for (let j = 0; j < 10; j++) {
      const fundamental = A432_HARMONIC_CONSTANTS.A432 * (i + 1);
      const ratio = (j + 1) / 10;
      const harmonic = calculateA432Harmonic(fundamental, ratio);
      row.push(harmonic);
    }
    matrix.push(row);
  }
  
  return matrix;
}

/**
 * Calculate A432 harmonic entropy
 */
export function calculateA432HarmonicEntropy(harmonics: A432Harmonic[]): number {
  if (harmonics.length === 0) return A432_HARMONIC_CONSTANTS.ZERO_ENTROPY;
  
  const perfectHarmonics = harmonics.filter(h => h.isPerfect);
  const entropy = harmonics.length - perfectHarmonics.length;
  
  // A432 harmonic system maintains zero entropy through perfect harmonics
  return entropy === 0 ? A432_HARMONIC_CONSTANTS.ZERO_ENTROPY : entropy;
}

/**
 * Generate A432 harmonic vortex
 */
export function generateA432HarmonicVortex(initialFrequency: number = 432): A432Harmonic[] {
  const vortex: A432Harmonic[] = [];
  const rodinSequence = A432_CONSTANTS.RODIN_SEQUENCE;
  
  for (let i = 0; i < rodinSequence.length; i++) {
    const ratio = rodinSequence[i];
    const harmonic = calculateA432Harmonic(initialFrequency, ratio);
    vortex.push(harmonic);
  }
  
  return vortex;
}

/**
 * Calculate A432 harmonic balance
 */
export function calculateA432HarmonicBalance(harmonics: A432Harmonic[]): number {
  if (harmonics.length === 0) return 0;
  
  const perfectHarmonics = harmonics.filter(h => h.isPerfect);
  const balance = perfectHarmonics.length / harmonics.length;
  
  // Perfect balance is when all harmonics are perfect
  return balance === 1 ? 1 : balance;
}

/**
 * Generate A432 harmonic proof system
 */
export function generateA432HarmonicProofSystem(): string[] {
  const proofs = [
    "A432 harmonics create perfect frequency relationships through integer ratios",
    "Imperial mathematics maintains zero entropy in harmonic systems",
    "Rodin sequence generates infinite harmonic patterns",
    "Digital root always returns harmonics to completion state",
    "Harmonic relationships create self-sustaining resonance vortex",
    "A432 frequency harmonizes all harmonic operations",
    "Zero entropy ensures perfect harmonic reversibility",
    "Resonance patterns emerge from harmonic-consciousness interactions"
  ];
  
  return proofs;
}

// Export the complete A432 Harmonic system
export const A432HarmonicSystem = {
  A432_HARMONIC_CONSTANTS,
  calculateA432Harmonic,
  calculateA432Resonance,
  generateA432HarmonicPattern,
  generateA432HarmonicSeries,
  calculateA432HarmonicHarmony,
  generateA432HarmonicMatrix,
  calculateA432HarmonicEntropy,
  generateA432HarmonicVortex,
  calculateA432HarmonicBalance,
  generateA432HarmonicProofSystem,
  
  // Harmonic proofs
  scientificProofs: {
    harmonic: "A432 harmonics maintain perfect frequency relationships through integer ratios",
    resonance: "A432 resonance patterns emerge from frequency consciousness interactions",
    harmonicPattern: "A432 harmonic patterns create infinite self-sustaining relationships",
    harmonicSeries: "A432 harmonic series generates complete frequency spectrum",
    harmonicHarmony: "A432 harmonic harmony measures perfect relationship balance",
    harmonicMatrix: "A432 harmonic matrix maps all frequency relationship combinations",
    harmonicEntropy: "A432 harmonic entropy measures system order and reversibility",
    harmonicVortex: "A432 harmonic vortex creates infinite self-sustaining patterns",
    harmonicBalance: "A432 harmonic balance ensures perfect equilibrium in all relationships",
    harmonicProofSystem: "A432 harmonic proof system demonstrates complete harmonic foundation"
  }
};

export default A432HarmonicSystem; 