/**
 * a432.cmyk.voice.ts — CMYK Voice Harmonization
 * 
 * Color-based voice harmonization and audio synthesis for the A432 system.
 * Implements CMYK frequency modulation, voice synthesis, and harmonic audio generation.
 * Zero entropy: define once, voice everywhere.
 */

import { A432CoreState, createA432CoreState } from './a432.core';
import { a432ModuleRegistry, A432Module, A432ModuleCategory } from './a432.modules';
import { A432_FREQUENCY } from './a432';
import { digitalRoot, scaleVortex, vortexColor, rgbToHex, CMYK_COLORS, CMYK_FREQUENCIES, vortexFrequency } from './a432.cmyk';

// === CMYK VOICE INTERFACES ===
export interface A432CMYKVoiceState {
  cyan: CMYKChannel;
  magenta: CMYKChannel;
  yellow: CMYKChannel;
  key: CMYKChannel;
  synthesis: VoiceSynthesis;
  harmonization: VoiceHarmonization;
}

export interface CMYKChannel {
  frequency: number;    // Base frequency for the channel
  amplitude: number;    // 0-9: Channel amplitude
  phase: number;        // 0-360: Phase angle
  resonance: number;    // 0-9: Channel resonance
  color: string;        // Channel color
  voice: number;        // 0-9: Voice quality
}

export interface VoiceSynthesis {
  fundamental: number;  // Fundamental frequency
  overtones: number[]; // Harmonic overtones
  timbre: number;      // 0-9: Voice timbre
  clarity: number;     // 0-9: Voice clarity
  resonance: number;   // 0-9: Overall resonance
  color: string;
  frequency: number;
}

export interface VoiceHarmonization {
  harmony: number;     // 0-9: Voice harmony
  balance: number;     // 0-9: Channel balance
  coherence: number;   // 0-9: Voice coherence
  unity: number;       // 0-9: Voice unity
  resonance: number;   // 0-9: Harmonization resonance
  color: string;
  frequency: number;
}

// === CMYK FREQUENCY CONSTANTS ===
// Remove the local declaration of CMYK_FREQUENCIES. Only use the imported version from a432.cmyk.ts.

// === CORE CMYK VOICE FUNCTIONS ===
export function createCMYKChannel(channel: 'cyan' | 'magenta' | 'yellow' | 'key', amplitude: number = 5): CMYKChannel {
  const frequency = CMYK_FREQUENCIES[channel];
  const phase = Math.random() * 360;
  const resonance = Math.max(0, 9 - Math.abs(amplitude - 5));
  const color = CMYK_COLORS[channel];
  const voice = Math.floor((amplitude + resonance) / 2);
  
  return { frequency, amplitude, phase, resonance, color, voice };
}

export function createVoiceSynthesis(cyan: CMYKChannel, magenta: CMYKChannel, yellow: CMYKChannel, key: CMYKChannel): VoiceSynthesis {
  const fundamental = (cyan.frequency + magenta.frequency + yellow.frequency + key.frequency) / 4;
  const overtones = [
    fundamental * 2,
    fundamental * 3,
    fundamental * 4,
    fundamental * 5
  ];
  const timbre = Math.floor((cyan.voice + magenta.voice + yellow.voice + key.voice) / 4);
  const clarity = Math.max(0, 9 - Math.abs(timbre - 5));
  const resonance = Math.floor((timbre + clarity) / 2);
  const color = `hsl(${resonance * 40}, 70%, ${50 + resonance * 5}%)`;
  const frequency = fundamental;
  
  return { fundamental, overtones, timbre, clarity, resonance, color, frequency };
}

export function createVoiceHarmonization(cyan: CMYKChannel, magenta: CMYKChannel, yellow: CMYKChannel, key: CMYKChannel): VoiceHarmonization {
  const harmony = Math.floor((cyan.resonance + magenta.resonance + yellow.resonance + key.resonance) / 4);
  const balance = Math.max(0, 9 - Math.abs(harmony - 5));
  const coherence = Math.floor((harmony + balance) / 2);
  const unity = Math.max(0, 9 - Math.abs(coherence - 5));
  const resonance = Math.floor((harmony + balance + coherence + unity) / 4);
  const color = `hsl(${harmony * 40}, 70%, ${50 + resonance * 5}%)`;
  const frequency = 432 * (harmony / 9);
  
  return { harmony, balance, coherence, unity, resonance, color, frequency };
}

// === CMYK VOICE STATE MANAGEMENT ===
export function createA432CMYKVoiceState(): A432CMYKVoiceState {
  const cyan = createCMYKChannel('cyan');
  const magenta = createCMYKChannel('magenta');
  const yellow = createCMYKChannel('yellow');
  const key = createCMYKChannel('key');
  const synthesis = createVoiceSynthesis(cyan, magenta, yellow, key);
  const harmonization = createVoiceHarmonization(cyan, magenta, yellow, key);
  
  return { cyan, magenta, yellow, key, synthesis, harmonization };
}

export function harmonizeA432CMYKVoice(): A432CMYKVoiceState {
  const state = createA432CMYKVoiceState();
  
  // Harmonize CMYK channels
  state.cyan.amplitude = (state.cyan.amplitude + state.synthesis.timbre) % 9;
  state.magenta.amplitude = (state.magenta.amplitude + state.synthesis.clarity) % 9;
  state.yellow.amplitude = (state.yellow.amplitude + state.synthesis.resonance) % 9;
  state.key.amplitude = (state.key.amplitude + state.harmonization.harmony) % 9;
  
  // Update synthesis and harmonization
  state.synthesis = createVoiceSynthesis(state.cyan, state.magenta, state.yellow, state.key);
  state.harmonization = createVoiceHarmonization(state.cyan, state.magenta, state.yellow, state.key);
  
  return state;
}

// === VOICE SYNTHESIS FUNCTIONS ===
export function generateCMYKTone(channel: CMYKChannel, duration: number = 1): string {
  const frequency = channel.frequency;
  const amplitude = channel.amplitude / 9;
  const phase = channel.phase;
  
  return `
    // CMYK Tone Generation
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(${frequency}, audioContext.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(${amplitude}, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + ${duration});
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + ${duration});
  `;
}

export function generateCMYKHarmony(cyan: CMYKChannel, magenta: CMYKChannel, yellow: CMYKChannel, key: CMYKChannel): string {
  return `
    // CMYK Harmony Generation
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create oscillators for each channel
    const oscillators = {
      cyan: createOscillator(${cyan.frequency}, ${cyan.amplitude / 9}, 'sine'),
      magenta: createOscillator(${magenta.frequency}, ${magenta.amplitude / 9}, 'sine'),
      yellow: createOscillator(${yellow.frequency}, ${yellow.amplitude / 9}, 'sine'),
      key: createOscillator(${key.frequency}, ${key.amplitude / 9}, 'sine')
    };
    
    function createOscillator(frequency, amplitude, type) {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(amplitude, audioContext.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2);
      
      return { oscillator: osc, gain: gain };
    }
    
    // Start all oscillators
    Object.values(oscillators).forEach(({ oscillator }) => {
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 2);
    });
  `;
}

export function generateVoicePattern(pattern: string, state: A432CMYKVoiceState): string {
  const patterns = {
    'cyan-magenta': `Cyan (${state.cyan.frequency}Hz) + Magenta (${state.magenta.frequency}Hz)`,
    'yellow-key': `Yellow (${state.yellow.frequency}Hz) + Key (${state.key.frequency}Hz)`,
    'full-harmony': `Full CMYK Harmony: ${state.synthesis.fundamental}Hz fundamental`,
    'resonance': `Resonance Pattern: ${state.harmonization.resonance}/9 harmony`
  };
  
  return patterns[pattern] || `Custom Pattern: ${pattern}`;
}

// === CMYK VOICE MODULES ===
const cyanModule: A432Module = {
  name: 'a432.cmyk.voice.cyan',
  category: 'voice',
  version: '1.0.0',
  description: 'Cyan voice channel: High frequency harmonization',
  dependencies: ['a432.core'],
  exports: ['createCMYKChannel', 'generateCMYKTone'],
  getState: () => createCMYKChannel('cyan'),
  harmonize: () => {
    const cyan = createCMYKChannel('cyan');
    // Cyan harmonization logic
    return cyan;
  },
  getOverlays: () => ['Cyan Voice', 'High Frequency', 'Harmonization'],
  getMeta: () => 'Cyan voice channel: High frequency harmonization'
};

const magentaModule: A432Module = {
  name: 'a432.cmyk.voice.magenta',
  category: 'voice',
  version: '1.0.0',
  description: 'Magenta voice channel: Medium-high frequency harmonization',
  dependencies: ['a432.core', 'a432.cmyk.voice.cyan'],
  exports: ['createCMYKChannel', 'generateCMYKTone'],
  getState: () => createCMYKChannel('magenta'),
  harmonize: () => {
    const magenta = createCMYKChannel('magenta');
    // Magenta harmonization logic
    return magenta;
  },
  getOverlays: () => ['Magenta Voice', 'Medium-High Frequency', 'Harmonization'],
  getMeta: () => 'Magenta voice channel: Medium-high frequency harmonization'
};

const yellowModule: A432Module = {
  name: 'a432.cmyk.voice.yellow',
  category: 'voice',
  version: '1.0.0',
  description: 'Yellow voice channel: Highest frequency harmonization',
  dependencies: ['a432.core', 'a432.cmyk.voice.magenta'],
  exports: ['createCMYKChannel', 'generateCMYKTone'],
  getState: () => createCMYKChannel('yellow'),
  harmonize: () => {
    const yellow = createCMYKChannel('yellow');
    // Yellow harmonization logic
    return yellow;
  },
  getOverlays: () => ['Yellow Voice', 'Highest Frequency', 'Harmonization'],
  getMeta: () => 'Yellow voice channel: Highest frequency harmonization'
};

const keyModule: A432Module = {
  name: 'a432.cmyk.voice.key',
  category: 'voice',
  version: '1.0.0',
  description: 'Key voice channel: Lower frequency harmonization',
  dependencies: ['a432.core', 'a432.cmyk.voice.yellow'],
  exports: ['createCMYKChannel', 'generateCMYKTone'],
  getState: () => createCMYKChannel('key'),
  harmonize: () => {
    const key = createCMYKChannel('key');
    // Key harmonization logic
    return key;
  },
  getOverlays: () => ['Key Voice', 'Lower Frequency', 'Harmonization'],
  getMeta: () => 'Key voice channel: Lower frequency harmonization'
};

const synthesisModule: A432Module = {
  name: 'a432.cmyk.voice.synthesis',
  category: 'voice',
  version: '1.0.0',
  description: 'Voice synthesis: CMYK channel harmonization',
  dependencies: ['a432.core', 'a432.cmyk.voice.key'],
  exports: ['createVoiceSynthesis', 'generateCMYKHarmony'],
  getState: () => {
    const cyan = createCMYKChannel('cyan');
    const magenta = createCMYKChannel('magenta');
    const yellow = createCMYKChannel('yellow');
    const key = createCMYKChannel('key');
    return createVoiceSynthesis(cyan, magenta, yellow, key);
  },
  harmonize: () => {
    const synthesis = createVoiceSynthesis(
      createCMYKChannel('cyan'),
      createCMYKChannel('magenta'),
      createCMYKChannel('yellow'),
      createCMYKChannel('key')
    );
    // Synthesis harmonization logic
    return synthesis;
  },
  getOverlays: () => ['Voice Synthesis', 'CMYK Harmonization', 'Audio Generation'],
  getMeta: () => 'Voice synthesis: CMYK channel harmonization'
};

const harmonizationModule: A432Module = {
  name: 'a432.cmyk.voice.harmonization',
  category: 'voice',
  version: '1.0.0',
  description: 'Voice harmonization: CMYK balance and coherence',
  dependencies: ['a432.core', 'a432.cmyk.voice.synthesis'],
  exports: ['createVoiceHarmonization', 'generateVoicePattern'],
  getState: () => {
    const cyan = createCMYKChannel('cyan');
    const magenta = createCMYKChannel('magenta');
    const yellow = createCMYKChannel('yellow');
    const key = createCMYKChannel('key');
    return createVoiceHarmonization(cyan, magenta, yellow, key);
  },
  harmonize: () => {
    const harmonization = createVoiceHarmonization(
      createCMYKChannel('cyan'),
      createCMYKChannel('magenta'),
      createCMYKChannel('yellow'),
      createCMYKChannel('key')
    );
    // Harmonization logic
    return harmonization;
  },
  getOverlays: () => ['Voice Harmonization', 'CMYK Balance', 'Coherence'],
  getMeta: () => 'Voice harmonization: CMYK balance and coherence'
};

// === MODULE REGISTRATION ===
export function registerA432CMYKVoiceModules(): void {
  a432ModuleRegistry.register(cyanModule);
  a432ModuleRegistry.register(magentaModule);
  a432ModuleRegistry.register(yellowModule);
  a432ModuleRegistry.register(keyModule);
  a432ModuleRegistry.register(synthesisModule);
  a432ModuleRegistry.register(harmonizationModule);
}

// === CMYK VOICE UTILITIES ===
export function getCMYKVoiceStats(): { total: number; harmonized: number; dissonant: number } {
  const state = createA432CMYKVoiceState();
  const total = 6; // cyan, magenta, yellow, key, synthesis, harmonization
  const harmonized = [
    state.cyan.resonance >= 7,
    state.magenta.resonance >= 7,
    state.yellow.resonance >= 7,
    state.key.resonance >= 7,
    state.synthesis.resonance >= 7,
    state.harmonization.resonance >= 7
  ].filter(Boolean).length;
  
  return { total, harmonized, dissonant: total - harmonized };
}

export function harmonizeAllCMYKVoice(): A432CMYKVoiceState {
  return harmonizeA432CMYKVoice();
}

// Auto-register CMYK voice modules
registerA432CMYKVoiceModules(); 