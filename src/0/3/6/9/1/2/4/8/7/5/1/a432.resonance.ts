/**
 * a432.resonance.ts — Resonance & Frequency Modules
 * 
 * Resonance and frequency modules for the A432 system.
 * Implements frequency resonance, color resonance, and harmonic alignment.
 * Zero entropy: define once, harmonize everywhere.
 */

import { A432CoreState, createA432CoreState, A432_FREQUENCY } from './a432.core';
import { a432ModuleRegistry, A432Module, A432ModuleCategory } from './a432.modules';

// === RESONANCE INTERFACES ===
export interface A432ResonanceState {
  frequency: FrequencyResonance;
  color: ColorResonance;
  harmonic: HarmonicResonance;
  alignment: AlignmentResonance;
}

export interface FrequencyResonance {
  base: number;      // 432 Hz
  current: number;   // Current frequency
  harmonic: number;  // Harmonic number (1, 2, 3, etc.)
  resonance: number; // 0-9: Resonance strength
  stability: number; // 0-9: Frequency stability
  color: string;
  sound: number;
}

export interface ColorResonance {
  hue: number;       // 0-360 degrees
  saturation: number; // 0-100%
  lightness: number;  // 0-100%
  frequency: number;  // Color frequency
  resonance: number;  // 0-9: Color resonance
  harmony: number;    // 0-9: Color harmony
  color: string;
}

export interface HarmonicResonance {
  fundamental: number;
  overtones: number[];
  harmonics: number[];
  resonance: number;
  purity: number;
  color: string;
  frequency: number;
}

export interface AlignmentResonance {
  primary: number;
  secondary: number;
  tertiary: number;
  alignment: number;
  coherence: number;
  color: string;
  frequency: number;
}

// === CORE RESONANCE FUNCTIONS ===
export function createFrequencyResonance(base: number = A432_FREQUENCY): FrequencyResonance {
  const current = base;
  const harmonic = Math.floor(current / base);
  const resonance = Math.min(9, Math.floor(current / 48));
  const stability = Math.max(0, 9 - Math.abs(resonance - 5));
  const color = `hsl(${current % 360}, 70%, ${50 + stability * 5}%)`;
  const sound = current;
  
  return { base, current, harmonic, resonance, stability, color, sound };
}

export function createColorResonance(hue: number = 216): ColorResonance {
  const saturation = 70;
  const lightness = 50;
  const frequency = hue * 1.2; // Convert hue to frequency
  const resonance = Math.floor(frequency / 48) % 9;
  const harmony = Math.max(0, 9 - Math.abs(resonance - 5));
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  
  return { hue, saturation, lightness, frequency, resonance, harmony, color };
}

export function createHarmonicResonance(fundamental: number = A432_FREQUENCY): HarmonicResonance {
  const overtones = [fundamental * 2, fundamental * 3, fundamental * 4];
  const harmonics = [fundamental, ...overtones];
  const resonance = Math.min(9, Math.floor(fundamental / 48));
  const purity = Math.max(0, 9 - Math.abs(resonance - 5));
  const color = `hsl(${fundamental % 360}, 70%, ${50 + purity * 5}%)`;
  const frequency = fundamental;
  
  return { fundamental, overtones, harmonics, resonance, purity, color, frequency };
}

export function createAlignmentResonance(primary: number = 4, secondary: number = 3, tertiary: number = 2): AlignmentResonance {
  const alignment = (primary + secondary + tertiary) % 9;
  const coherence = Math.max(0, 9 - Math.abs(alignment - 5));
  const color = `hsl(${alignment * 40}, 70%, ${50 + coherence * 5}%)`;
  const frequency = 432 * (alignment / 9);
  
  return { primary, secondary, tertiary, alignment, coherence, color, frequency };
}

// === RESONANCE STATE MANAGEMENT ===
export function createA432ResonanceState(): A432ResonanceState {
  return {
    frequency: createFrequencyResonance(),
    color: createColorResonance(),
    harmonic: createHarmonicResonance(),
    alignment: createAlignmentResonance()
  };
}

export function harmonizeA432Resonance(): A432ResonanceState {
  const state = createA432ResonanceState();
  
  // Harmonize frequency with color
  state.frequency.current = state.color.frequency;
  state.color.hue = state.frequency.current % 360;
  
  // Harmonize harmonic with alignment
  state.harmonic.fundamental = state.alignment.frequency;
  state.alignment.primary = state.harmonic.resonance;
  
  return state;
}

// === RESONANCE MODULES ===
const frequencyModule: A432Module = {
  name: 'a432.resonance.frequency',
  category: 'resonance',
  version: '1.0.0',
  description: 'Frequency resonance: Harmonic alignment at 432 Hz',
  dependencies: ['a432.core'],
  exports: ['createFrequencyResonance', 'harmonizeFrequency'],
  getState: () => createFrequencyResonance(),
  harmonize: () => {
    const resonance = createFrequencyResonance();
    // Frequency harmonization logic
    return resonance;
  },
  getOverlays: () => ['Frequency Resonance', '432 Hz Alignment', 'Harmonic Stability'],
  getMeta: () => 'Frequency resonance: Harmonic alignment at 432 Hz'
};

const colorModule: A432Module = {
  name: 'a432.resonance.color',
  category: 'resonance',
  version: '1.0.0',
  description: 'Color resonance: Visual frequency harmonization',
  dependencies: ['a432.core', 'a432.resonance.frequency'],
  exports: ['createColorResonance', 'harmonizeColor'],
  getState: () => createColorResonance(),
  harmonize: () => {
    const resonance = createColorResonance();
    // Color harmonization logic
    return resonance;
  },
  getOverlays: () => ['Color Resonance', 'Visual Frequency', 'Harmonization'],
  getMeta: () => 'Color resonance: Visual frequency harmonization'
};

const harmonicModule: A432Module = {
  name: 'a432.resonance.harmonic',
  category: 'resonance',
  version: '1.0.0',
  description: 'Harmonic resonance: Overtone and harmonic alignment',
  dependencies: ['a432.core', 'a432.resonance.color'],
  exports: ['createHarmonicResonance', 'harmonizeHarmonic'],
  getState: () => createHarmonicResonance(),
  harmonize: () => {
    const resonance = createHarmonicResonance();
    // Harmonic harmonization logic
    return resonance;
  },
  getOverlays: () => ['Harmonic Resonance', 'Overtone Alignment', 'Purity'],
  getMeta: () => 'Harmonic resonance: Overtone and harmonic alignment'
};

const alignmentModule: A432Module = {
  name: 'a432.resonance.alignment',
  category: 'resonance',
  version: '1.0.0',
  description: 'Alignment resonance: Coherent frequency alignment',
  dependencies: ['a432.core', 'a432.resonance.harmonic'],
  exports: ['createAlignmentResonance', 'harmonizeAlignment'],
  getState: () => createAlignmentResonance(),
  harmonize: () => {
    const resonance = createAlignmentResonance();
    // Alignment harmonization logic
    return resonance;
  },
  getOverlays: () => ['Alignment Resonance', 'Coherent Frequency', 'Alignment'],
  getMeta: () => 'Alignment resonance: Coherent frequency alignment'
};

// === MODULE REGISTRATION ===
export function registerA432ResonanceModules(): void {
  a432ModuleRegistry.register(frequencyModule);
  a432ModuleRegistry.register(colorModule);
  a432ModuleRegistry.register(harmonicModule);
  a432ModuleRegistry.register(alignmentModule);
}

// === RESONANCE UTILITIES ===
export function getResonanceStats(): { total: number; resonant: number; dissonant: number } {
  const state = createA432ResonanceState();
  const total = 4; // frequency, color, harmonic, alignment
  const resonant = [
    state.frequency.resonance >= 7,
    state.color.resonance >= 7,
    state.harmonic.resonance >= 7,
    state.alignment.alignment >= 7
  ].filter(Boolean).length;
  
  return { total, resonant, dissonant: total - resonant };
}

export function harmonizeAllResonance(): A432ResonanceState {
  return harmonizeA432Resonance();
}

// Auto-register resonance modules
registerA432ResonanceModules(); 