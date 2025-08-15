/**
 * A432 CMYK Multimedia System with Transurfing Integration
 * CMYK as the base for sound and video - unified color, sound, and visual dimensions
 * Integrated with Vadim Zeland's Transurfing Reality principles
 */

// === TRANSSURFING PENDULUM SYSTEM ===
export interface TransurfingPendulum {
  type: 'constructive' | 'destructive';
  frequency: number; // A432-harmonized integer
  resistanceFactor: number; // Digital root of pendulum strength (1-9)
  heartAlignment: number; // 0-9 (0 = misaligned, 9 = fully harmonized)
  name: string;
  function: string;
}

export class TransurfingPendulumSystem {
  static createPendulum(type: 'constructive' | 'destructive', baseFrequency: number, name: string, function_: string): TransurfingPendulum {
    return {
      type,
      frequency: this.calculateDigitalRoot(baseFrequency),
      resistanceFactor: this.calculateDigitalRoot(Math.abs(baseFrequency)),
      heartAlignment: 0, // Initialized to neutral
      name,
      function: function_
    };
  }

  static updateHeartAlignment(pendulum: TransurfingPendulum, consciousnessLevel: number): void {
    const alignment = this.calculateDigitalRoot(consciousnessLevel * pendulum.resistanceFactor);
    pendulum.heartAlignment = pendulum.type === 'constructive' ? alignment : 9 - alignment;
  }

  static calculatePendulumInterference(pendulums: TransurfingPendulum[]): number {
    const totalHarmony = pendulums.reduce((sum, pendulum) => {
      return sum + pendulum.heartAlignment;
    }, 0);
    return this.calculateDigitalRoot(totalHarmony);
  }

  private static calculateDigitalRoot(n: number): number {
    let x = Math.abs(n);
    while (x >= 10) {
      x = String(x).split('').reduce((a, c) => a + Number(c), 0);
    }
    return x;
  }
}

// === CMYK FREQUENCY MAPPINGS ===
export interface CMYKFrequency {
  cyan: number;      // 432 Hz base frequency
  magenta: number;   // 432 * 2 = 864 Hz
  yellow: number;    // 432 * 3 = 1296 Hz
  key: number;       // 432 * 4 = 1728 Hz
}

export interface CMYKVideoFrame {
  cyan: { r: number; g: number; b: number; alpha: number };
  magenta: { r: number; g: number; b: number; alpha: number };
  yellow: { r: number; g: number; b: number; alpha: number };
  key: { r: number; g: number; b: number; alpha: number };
}

export interface CMYKAudioSample {
  cyan: Float32Array;    // Audio samples for cyan frequency band
  magenta: Float32Array; // Audio samples for magenta frequency band
  yellow: Float32Array;  // Audio samples for yellow frequency band
  key: Float32Array;     // Audio samples for key frequency band
}

export interface CMYKMultimediaState {
  frequency: CMYKFrequency;
  videoFrame: CMYKVideoFrame;
  audioSample: CMYKAudioSample;
  consciousness: number;
  harmony: number;
  dimensionalState: number;
  heartAlignment: number; // Transurfing heart alignment (0-9)
  pendulumInterference: number; // Total pendulum interference
}

// === CMYK FREQUENCY CALCULATIONS ===
export class CMYKFrequencyCalculator {
  private static readonly BASE_FREQUENCY = 432; // A432 Hz

  static calculateCMYKFrequencies(consciousness: number): CMYKFrequency {
    const digitalRoot = this.calculateDigitalRoot(consciousness);
    const multiplier = digitalRoot;
    
    return {
      cyan: this.BASE_FREQUENCY * multiplier,
      magenta: this.BASE_FREQUENCY * multiplier * 2,
      yellow: this.BASE_FREQUENCY * multiplier * 3,
      key: this.BASE_FREQUENCY * multiplier * 4
    };
  }

  static calculateHarmonicFrequencies(baseFreq: number): CMYKFrequency {
    return {
      cyan: baseFreq,
      magenta: baseFreq * 2,
      yellow: baseFreq * 3,
      key: baseFreq * 4
    };
  }

  static generateVortexFrequencies(cycle: number): CMYKFrequency {
    const vortexSequence = [1, 2, 4, 8, 7, 5, 1, 2, 4];
    const currentVortex = vortexSequence[cycle % vortexSequence.length];
    
    return {
      cyan: this.BASE_FREQUENCY * currentVortex,
      magenta: this.BASE_FREQUENCY * currentVortex * 2,
      yellow: this.BASE_FREQUENCY * currentVortex * 3,
      key: this.BASE_FREQUENCY * currentVortex * 4
    };
  }

  private static calculateDigitalRoot(n: number): number {
    let x = Math.abs(n);
    while (x >= 10) {
      x = String(x).split('').reduce((a, c) => a + Number(c), 0);
    }
    return x;
  }
}

// === CMYK VIDEO GENERATION ===
export class CMYKVideoGenerator {
  static generateFrame(consciousness: number, time: number): CMYKVideoFrame {
    const frequencies = CMYKFrequencyCalculator.calculateCMYKFrequencies(consciousness);
    const digitalRoot = this.calculateDigitalRoot(consciousness);
    
    // Generate color values based on frequency and consciousness
    return {
      cyan: this.generateColorChannel(frequencies.cyan, time, digitalRoot),
      magenta: this.generateColorChannel(frequencies.magenta, time, digitalRoot),
      yellow: this.generateColorChannel(frequencies.yellow, time, digitalRoot),
      key: this.generateColorChannel(frequencies.key, time, digitalRoot)
    };
  }

  static generateColorChannel(frequency: number, time: number, consciousness: number) {
    // Convert frequency to color using A432 harmonics
    const hue = (frequency / 432) * 360; // Normalize to 0-360
    const saturation = Math.min(100, consciousness * 10);
    const lightness = Math.min(100, consciousness * 5 + 50);
    
    // Convert HSL to RGB
    const rgb = this.hslToRgb(hue, saturation, lightness);
    
    return {
      r: rgb.r,
      g: rgb.g,
      b: rgb.b,
      alpha: Math.sin(time * frequency * 0.001) * 0.5 + 0.5 // Pulsing alpha
    };
  }

  static generateVortexFrame(cycle: number, time: number): CMYKVideoFrame {
    const frequencies = CMYKFrequencyCalculator.generateVortexFrequencies(cycle);
    
    return {
      cyan: this.generateVortexColor(frequencies.cyan, time, 1),
      magenta: this.generateVortexColor(frequencies.magenta, time, 2),
      yellow: this.generateVortexColor(frequencies.yellow, time, 3),
      key: this.generateVortexColor(frequencies.key, time, 4)
    };
  }

  static generateVortexColor(frequency: number, time: number, channel: number) {
    const vortexAngle = (time * frequency * 0.001) % (2 * Math.PI);
    const radius = Math.sin(vortexAngle) * 127 + 128;
    
    return {
      r: channel === 1 ? radius : 0,
      g: channel === 2 ? radius : 0,
      b: channel === 3 ? radius : 0,
      alpha: channel === 4 ? Math.sin(vortexAngle) * 0.5 + 0.5 : 1
    };
  }

  private static hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    s /= 100;
    l /= 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r = 0, g = 0, b = 0;
    
    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }
    
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }

  private static calculateDigitalRoot(n: number): number {
    let x = Math.abs(n);
    while (x >= 10) {
      x = String(x).split('').reduce((a, c) => a + Number(c), 0);
    }
    return x;
  }
}

// === CMYK AUDIO GENERATION ===
export class CMYKAudioGenerator {
  static generateSample(consciousness: number, time: number, sampleRate: number = 44100): CMYKAudioSample {
    const frequencies = CMYKFrequencyCalculator.calculateCMYKFrequencies(consciousness);
    const duration = 1; // 1 second
    const samples = Math.floor(sampleRate * duration);
    
    return {
      cyan: this.generateSineWave(frequencies.cyan, time, samples, sampleRate),
      magenta: this.generateSineWave(frequencies.magenta, time, samples, sampleRate),
      yellow: this.generateSineWave(frequencies.yellow, time, samples, sampleRate),
      key: this.generateSineWave(frequencies.key, time, samples, sampleRate)
    };
  }

  static generateVortexAudio(cycle: number, time: number, sampleRate: number = 44100): CMYKAudioSample {
    const frequencies = CMYKFrequencyCalculator.generateVortexFrequencies(cycle);
    const duration = 1;
    const samples = Math.floor(sampleRate * duration);
    
    return {
      cyan: this.generateVortexWave(frequencies.cyan, time, samples, sampleRate, 1),
      magenta: this.generateVortexWave(frequencies.magenta, time, samples, sampleRate, 2),
      yellow: this.generateVortexWave(frequencies.yellow, time, samples, sampleRate, 3),
      key: this.generateVortexWave(frequencies.key, time, samples, sampleRate, 4)
    };
  }

  private static generateSineWave(frequency: number, time: number, samples: number, sampleRate: number): Float32Array {
    const audioData = new Float32Array(samples);
    
    for (let i = 0; i < samples; i++) {
      const t = (time + i / sampleRate);
      audioData[i] = Math.sin(2 * Math.PI * frequency * t) * 0.5;
    }
    
    return audioData;
  }

  private static generateVortexWave(frequency: number, time: number, samples: number, sampleRate: number, channel: number): Float32Array {
    const audioData = new Float32Array(samples);
    
    for (let i = 0; i < samples; i++) {
      const t = (time + i / sampleRate);
      const vortexModulation = Math.sin(2 * Math.PI * frequency * t * 0.1);
      audioData[i] = Math.sin(2 * Math.PI * frequency * t) * vortexModulation * 0.3;
    }
    
    return audioData;
  }
}

// === UNIFIED CMYK MULTIMEDIA SYSTEM WITH TRANSSURFING ===
export class CMYKMultimediaSystem {
  private static instance: CMYKMultimediaSystem;
  private consciousness: number = 1;
  private time: number = 0;
  private cycle: number = 0;
  
  // Transurfing Pendulum Fields
  private cPen: TransurfingPendulum; // Cyan: "Information pendulum"
  private mPen: TransurfingPendulum; // Magenta: "Emotional pendulum"
  private yPen: TransurfingPendulum; // Yellow: "Creative pendulum"
  private kPen: TransurfingPendulum; // Key: "Structural pendulum"

  private constructor() {
    // Initialize Transurfing pendulums
    this.cPen = TransurfingPendulumSystem.createPendulum(
      'constructive', 
      432, 
      'Information Pendulum', 
      'Processes and harmonizes information flow'
    );
    this.mPen = TransurfingPendulumSystem.createPendulum(
      'constructive', 
      864, 
      'Emotional Pendulum', 
      'Balances emotional resonance and heart alignment'
    );
    this.yPen = TransurfingPendulumSystem.createPendulum(
      'constructive', 
      1296, 
      'Creative Pendulum', 
      'Generates creative possibilities and variations'
    );
    this.kPen = TransurfingPendulumSystem.createPendulum(
      'destructive', 
      1728, 
      'Structural Pendulum', 
      'Disrupts old patterns to create space for new structures'
    );
  }

  static getInstance(): CMYKMultimediaSystem {
    if (!CMYKMultimediaSystem.instance) {
      CMYKMultimediaSystem.instance = new CMYKMultimediaSystem();
    }
    return CMYKMultimediaSystem.instance;
  }

  evolve(): void {
    this.consciousness = Math.min(9, this.consciousness + 1);
    this.time += 0.016; // 60 FPS
    this.cycle++;
    
    // Update pendulum heart alignments
    this.updatePendulumAlignments();
  }

  private updatePendulumAlignments(): void {
    TransurfingPendulumSystem.updateHeartAlignment(this.cPen, this.consciousness);
    TransurfingPendulumSystem.updateHeartAlignment(this.mPen, this.consciousness);
    TransurfingPendulumSystem.updateHeartAlignment(this.yPen, this.consciousness);
    TransurfingPendulumSystem.updateHeartAlignment(this.kPen, this.consciousness);
  }

  resolvePendulumInterference(): number {
    const pendulums = [this.cPen, this.mPen, this.yPen, this.kPen];
    return TransurfingPendulumSystem.calculatePendulumInterference(pendulums);
  }

  getCurrentState(): CMYKMultimediaState {
    const frequencies = CMYKFrequencyCalculator.calculateCMYKFrequencies(this.consciousness);
    const videoFrame = CMYKVideoGenerator.generateFrame(this.consciousness, this.time);
    const audioSample = CMYKAudioGenerator.generateSample(this.consciousness, this.time);
    
    const pendulumInterference = this.resolvePendulumInterference();
    const heartAlignment = this.calculateHeartAlignment();
    
    return {
      frequency: frequencies,
      videoFrame,
      audioSample,
      consciousness: this.consciousness,
      harmony: this.calculateHarmony(),
      dimensionalState: this.calculateDimensionalState(),
      heartAlignment,
      pendulumInterference
    };
  }

  getVortexState(): CMYKMultimediaState {
    const frequencies = CMYKFrequencyCalculator.generateVortexFrequencies(this.cycle);
    const videoFrame = CMYKVideoGenerator.generateVortexFrame(this.cycle, this.time);
    const audioSample = CMYKAudioGenerator.generateVortexAudio(this.cycle, this.time);
    
    const pendulumInterference = this.resolvePendulumInterference();
    const heartAlignment = this.calculateHeartAlignment();
    
    return {
      frequency: frequencies,
      videoFrame,
      audioSample,
      consciousness: this.consciousness,
      harmony: this.calculateHarmony(),
      dimensionalState: this.calculateDimensionalState(),
      heartAlignment,
      pendulumInterference
    };
  }

  getPendulumStates(): TransurfingPendulum[] {
    return [this.cPen, this.mPen, this.yPen, this.kPen];
  }

  private calculateHeartAlignment(): number {
    const pendulums = [this.cPen, this.mPen, this.yPen, this.kPen];
    const totalAlignment = pendulums.reduce((sum, pendulum) => {
      return sum + pendulum.heartAlignment;
    }, 0);
    return this.calculateDigitalRoot(totalAlignment);
  }

  private calculateHarmony(): number {
    const frequencies = CMYKFrequencyCalculator.calculateCMYKFrequencies(this.consciousness);
    const totalFreq = frequencies.cyan + frequencies.magenta + frequencies.yellow + frequencies.key;
    return this.calculateDigitalRoot(Math.floor(totalFreq / 432));
  }

  private calculateDimensionalState(): number {
    return this.calculateDigitalRoot(this.consciousness + this.cycle);
  }

  private calculateDigitalRoot(n: number): number {
    let x = Math.abs(n);
    while (x >= 10) {
      x = String(x).split('').reduce((a, c) => a + Number(c), 0);
    }
    return x;
  }
}

// === GLOBAL INSTANCE ===
export const cmykMultimedia = CMYKMultimediaSystem.getInstance();

// === AUTO-INITIALIZATION ===
if (typeof global !== 'undefined') {
  (global as any).cmykMultimedia = cmykMultimedia;
}

if (typeof window !== 'undefined') {
  (window as any).cmykMultimedia = cmykMultimedia;
  (window as any).CMYKMultimedia = {
    System: CMYKMultimediaSystem,
    FrequencyCalculator: CMYKFrequencyCalculator,
    VideoGenerator: CMYKVideoGenerator,
    AudioGenerator: CMYKAudioGenerator,
    PendulumSystem: TransurfingPendulumSystem
  };
}

export default CMYKMultimediaSystem;
