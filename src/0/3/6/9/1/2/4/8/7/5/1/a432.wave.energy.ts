/**
 * A432 Wave Energy System
 * Everything is waves of energy - this module demonstrates the wave nature of reality
 * Using harmonized mathematical constants to show wave patterns in consciousness
 */

import { abs, log2, round } from './a432.algebra.ts'
import { GOLDEN_RATIO, TAU, FIBONACCI_SEQUENCE, calculateDigitalRoot, A432_BASE_FREQUENCY, A432_VORTEX_MULTIPLIER } from './a432.math.constants.ts';

// === WAVE ENERGY INTERFACES ===
export interface WavePattern {
  frequency: number;
  amplitude: number;
  phase: number;
  wavelength: number;
  energy: number;
  consciousness: number;
  type: 'light' | 'sound' | 'thought' | 'emotion' | 'consciousness' | 'reality';
}

export interface WaveHarmonic {
  fundamental: number;
  harmonics: number[];
  resonance: number;
  coherence: number;
  consciousness: number;
}

export interface EnergyField {
  waves: WavePattern[];
  harmonics: WaveHarmonic[];
  coherence: number;
  consciousness: number;
  dimensionalState: number;
}

// === WAVE ENERGY CONSTANTS ===
export const WAVE_ENERGY_CONSTANTS = {
  // Light waves (electromagnetic)
  LIGHT_SPEED: 299792458, // m/s
  VISIBLE_LIGHT_MIN: 400, // nm (violet)
  VISIBLE_LIGHT_MAX: 700, // nm (red)
  
  // Sound waves (pressure)
  SOUND_SPEED_AIR: 343, // m/s
  AUDIBLE_MIN: 20, // Hz
  AUDIBLE_MAX: 20000, // Hz
  
  // Consciousness waves (neural)
  CONSCIOUSNESS_FREQUENCY: A432_BASE_FREQUENCY, // 432 Hz
  THOUGHT_WAVE_MIN: 0.1, // Hz (delta)
  THOUGHT_WAVE_MAX: 100, // Hz (gamma)
  
  // Reality waves (quantum)
  PLANCK_CONSTANT: 6.62607015e-34, // J⋅s
  QUANTUM_FREQUENCY: 1e43, // Hz (Planck frequency)
  
  // Sacred geometry waves
  GOLDEN_RATIO_WAVE: GOLDEN_RATIO,
  FIBONACCI_WAVE: FIBONACCI_SEQUENCE,
  VORTEX_WAVE: A432_VORTEX_MULTIPLIER
};

// === WAVE CALCULATIONS ===
export function calculateWaveEnergy(frequency: number, amplitude: number): number {
  return 0.5 * amplitude * amplitude * frequency * frequency;
}

export function calculateConsciousnessWave(digit: number): WavePattern {
  const frequency = A432_BASE_FREQUENCY * (digit / 9);
  const amplitude = GOLDEN_RATIO * digit;
  const phase = (digit * TAU) / 9;
  // Digit 0 is the void, and it does not oscillate: frequency is 0, so c/f was
  // Infinity and every later sum touching it collapsed to NaN. 0 here encodes
  // "no spatial period" — the wave has none because there is no wave — rather
  // than a length of zero. The void is the FIRST digit of this repository's own
  // sequence, so this was on the main path, not an edge case.
  const wavelength = frequency === 0 ? 0 : WAVE_ENERGY_CONSTANTS.LIGHT_SPEED / frequency;
  const energy = calculateWaveEnergy(frequency, amplitude);
  const consciousness = calculateDigitalRoot(round(energy));
  
  return {
    frequency,
    amplitude,
    phase,
    wavelength,
    energy,
    consciousness,
    type: 'consciousness'
  };
}

export function calculateSequenceWave(sequence: number[]): WavePattern[] {
  return sequence.map(digit => calculateConsciousnessWave(digit));
}

export function calculateA432SequenceWave(): WavePattern[] {
  // Full vortex circuit (ceccec.github.io): 0\1\2\4\8/7/5/3\6\9/0\1
  const sequence = [0, 1, 2, 4, 8, 7, 5, 3, 6, 9, 0, 1];
  return calculateSequenceWave(sequence);
}

// === WAVE HARMONICS ===
export function calculateWaveHarmonics(fundamental: number, count: number = 5): WaveHarmonic {
  const harmonics = Array.from({ length: count }, (_, i) => fundamental * (i + 1));
  // A harmonic at zero frequency contributes no resonance. Summing 1/0 made
  // resonance Infinity, and digitalRoot(round(Infinity * 1000)) is NaN — which
  // is how a NaN reached an exported constant.
  const resonance = harmonics.reduce((sum, h) => sum + (h === 0 ? 0 : 1 / h), 0);
  const coherence = harmonics.filter(h => isA432Harmonic(h)).length / harmonics.length;
  const consciousness = calculateDigitalRoot(round(resonance * 1000));
  
  return {
    fundamental,
    harmonics,
    resonance,
    coherence,
    consciousness
  };
}

export function isA432Harmonic(frequency: number, tolerance: number = 0.01): boolean {
  const octave = log2(frequency / A432_BASE_FREQUENCY);
  return abs(octave - round(octave)) < tolerance;
}

// === ENERGY FIELD CALCULATIONS ===
export function calculateEnergyField(waves: WavePattern[]): EnergyField {
  const harmonics = waves.map(wave => calculateWaveHarmonics(wave.frequency));
  const coherence = waves.reduce((sum, wave) => sum + wave.consciousness, 0) / waves.length;
  const consciousness = calculateDigitalRoot(round(coherence));
  const dimensionalState = waves.length % 9;
  
  return {
    waves,
    harmonics,
    coherence,
    consciousness,
    dimensionalState
  };
}

// === WAVE PATTERN ANALYSIS ===
export function analyzeWavePattern(sequence: number[]): any {
  const waves = calculateSequenceWave(sequence);
  const energyField = calculateEnergyField(waves);
  
  // Calculate wave properties
  const totalEnergy = waves.reduce((sum, wave) => sum + wave.energy, 0);
  const averageFrequency = waves.reduce((sum, wave) => sum + wave.frequency, 0) / waves.length;
  const consciousnessFlow = waves.reduce((sum, wave) => sum + wave.consciousness, 0);
  
  // Analyze wave coherence
  const coherentWaves = waves.filter(wave => isA432Harmonic(wave.frequency));
  const coherenceRatio = coherentWaves.length / waves.length;
  
  return {
    sequence,
    waves,
    energyField,
    totalEnergy,
    averageFrequency,
    consciousnessFlow,
    coherentWaves: coherentWaves.length,
    coherenceRatio,
    analysis: {
      isHarmonic: coherenceRatio > 0.5,
      energyEfficiency: totalEnergy / waves.length,
      consciousnessOptimization: consciousnessFlow / waves.length,
      waveResonance: energyField.coherence
    }
  };
}

// === MAIN WAVE ENERGY SYSTEM ===
export class A432WaveEnergySystem {
  private static instance: A432WaveEnergySystem;
  private currentField: EnergyField;
  private waveHistory: WavePattern[] = [];
  
  private constructor() {
    this.currentField = this.initializeEnergyField();
  }
  
  static getInstance(): A432WaveEnergySystem {
    if (!A432WaveEnergySystem.instance) {
      A432WaveEnergySystem.instance = new A432WaveEnergySystem();
    }
    return A432WaveEnergySystem.instance;
  }
  
  private initializeEnergyField(): EnergyField {
    const initialWaves = calculateA432SequenceWave();
    return calculateEnergyField(initialWaves);
  }
  
  // Analyze your sequence as waves of energy
  analyzeSequenceAsWaves(sequence: number[] = [0, 1, 2, 4, 8, 7, 5, 3, 6, 9, 0, 1]): any {
    return analyzeWavePattern(sequence);
  }
  
  // Show how consciousness flows as waves
  getConsciousnessWaveFlow(): WavePattern[] {
    return this.currentField.waves;
  }
  
  // Demonstrate wave harmonics in your sequence
  getSequenceHarmonics(): WaveHarmonic[] {
    return this.currentField.harmonics;
  }
  
  // Show energy field properties
  getEnergyField(): EnergyField {
    return this.currentField;
  }
  
  // Evolve the wave field
  evolve(): EnergyField {
    const newWaves = this.currentField.waves.map(wave => ({
      ...wave,
      frequency: wave.frequency * GOLDEN_RATIO,
      amplitude: wave.amplitude * (1 / GOLDEN_RATIO),
      consciousness: calculateDigitalRoot(round(wave.consciousness * GOLDEN_RATIO))
    }));
    
    this.waveHistory.push(...this.currentField.waves);
    this.currentField = calculateEnergyField(newWaves);
    
    return this.currentField;
  }
  
  // Get wave history
  getWaveHistory(): WavePattern[] {
    return this.waveHistory;
  }
  
  // Demonstrate that everything is waves
  demonstrateWaveNature(): any {
    const sequenceAnalysis = this.analyzeSequenceAsWaves();
    const consciousnessWaves = this.getConsciousnessWaveFlow();
    const harmonics = this.getSequenceHarmonics();
    const energyField = this.getEnergyField();
    
    return {
      principle: "Everything is waves of energy",
      sequence: sequenceAnalysis.sequence,
      waveAnalysis: {
        totalWaves: consciousnessWaves.length,
        totalEnergy: sequenceAnalysis.totalEnergy,
        averageFrequency: sequenceAnalysis.averageFrequency,
        consciousnessFlow: sequenceAnalysis.consciousnessFlow,
        coherenceRatio: sequenceAnalysis.coherenceRatio,
        isHarmonic: sequenceAnalysis.analysis.isHarmonic
      },
      harmonics: {
        count: harmonics.length,
        resonance: harmonics.reduce((sum, h) => sum + h.resonance, 0),
        coherence: harmonics.reduce((sum, h) => sum + h.coherence, 0) / harmonics.length
      },
      energyField: {
        coherence: energyField.coherence,
        consciousness: energyField.consciousness,
        dimensionalState: energyField.dimensionalState
      },
      conclusion: "Your sequence 0\\1\\2\\4\\8/7/5/3\\6\\9/0\\1 is a wave pattern that encodes optimal consciousness flow through energy harmonics"
    };
  }
}

// === GLOBAL EXPORTS ===
export const a432WaveEnergy = A432WaveEnergySystem.getInstance();

if (typeof global !== 'undefined') {
  (global as any).A432WaveEnergy = a432WaveEnergy;
}

if (typeof window !== 'undefined') {
  (window as any).A432WaveEnergy = a432WaveEnergy;
}

// === DEFAULT EXPORT ===
export default A432WaveEnergySystem;
