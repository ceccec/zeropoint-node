/**
 * A432 Flute - Sacred Sound Synthesis
 * 
 * Generates flute-like tones tuned to A432Hz and its harmonic ratios
 * Integrates with the sacred geometry and mathematical patterns of the A432 system
 */

export interface FluteNote {
  frequency: number;
  duration: number;
  amplitude: number;
  harmonic: number;
}

export interface FluteScale {
  name: string;
  frequencies: number[];
  ratios: number[];
}

export class A432Flute {
  private audioContext: AudioContext;
  private masterGain: GainNode;
  private baseFrequency: number = 432; // A432Hz
  private currentOscillators: OscillatorNode[] = [];

  // Sacred ratios for natural harmonic series
  private readonly sacredRatios = [
    1,        // Fundamental (A432)
    9/8,      // Major 2nd
    5/4,      // Major 3rd
    4/3,      // Perfect 4th
    3/2,      // Perfect 5th
    5/3,      // Major 6th
    15/8,     // Major 7th
    2,        // Octave
  ];

  // Pentatonic scale ratios for meditative qualities
  private readonly pentatonicRatios = [
    1,        // Root
    9/8,      // 2nd
    5/4,      // 3rd
    3/2,      // 5th
    5/3,      // 6th
    2,        // Octave
  ];

  constructor() {
    this.audioContext = new AudioContext();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.connect(this.audioContext.destination);
    this.masterGain.gain.value = 0.3;
  }

  /**
   * Generate A432-based scale frequencies
   */
  generateScale(type: 'chromatic' | 'pentatonic' | 'sacred' = 'pentatonic'): FluteScale {
    const ratios = type === 'pentatonic' ? this.pentatonicRatios : this.sacredRatios;
    const frequencies = ratios.map(ratio => this.baseFrequency * ratio);
    
    return {
      name: `A432 ${type} Scale`,
      frequencies,
      ratios
    };
  }

  /**
   * Create a flute-like tone with natural harmonics
   */
  private createFluteTone(frequency: number, startTime: number, duration: number): OscillatorNode {
    // Primary oscillator (fundamental)
    const fundamental = this.audioContext.createOscillator();
    fundamental.type = 'sine';
    fundamental.frequency.value = frequency;

    // Add harmonic overtones for flute-like timbre
    const harmonics = [
      { freq: frequency * 2, gain: 0.3 },    // 2nd harmonic
      { freq: frequency * 3, gain: 0.15 },   // 3rd harmonic
      { freq: frequency * 4, gain: 0.08 },   // 4th harmonic
      { freq: frequency * 5, gain: 0.04 },   // 5th harmonic
    ];

    // Create gain envelope for natural attack/decay
    const envelope = this.audioContext.createGain();
    envelope.gain.value = 0;
    
    // Natural flute attack and decay
    envelope.gain.setValueAtTime(0, startTime);
    envelope.gain.linearRampToValueAtTime(0.8, startTime + 0.1);
    envelope.gain.exponentialRampToValueAtTime(0.6, startTime + duration * 0.3);
    envelope.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    // Connect fundamental
    fundamental.connect(envelope);
    envelope.connect(this.masterGain);

    // Add harmonics
    harmonics.forEach(harmonic => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = harmonic.freq;
      gain.gain.value = harmonic.gain;
      
      osc.connect(gain);
      gain.connect(envelope);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
      
      this.currentOscillators.push(osc);
    });

    fundamental.start(startTime);
    fundamental.stop(startTime + duration);
    
    this.currentOscillators.push(fundamental);
    return fundamental;
  }

  /**
   * Play a single note
   */
  playNote(frequency: number, duration: number = 1.0, delay: number = 0): Promise<void> {
    return new Promise((resolve) => {
      const startTime = this.audioContext.currentTime + delay;
      this.createFluteTone(frequency, startTime, duration);
      
      setTimeout(() => {
        resolve();
      }, (delay + duration) * 1000);
    });
  }

  /**
   * Play a sequence of notes
   */
  async playSequence(notes: FluteNote[], interval: number = 0.1): Promise<void> {
    let currentTime = 0;
    
    for (const note of notes) {
      this.createFluteTone(
        note.frequency, 
        this.audioContext.currentTime + currentTime, 
        note.duration
      );
      currentTime += note.duration + interval;
    }

    // Wait for sequence to complete
    return new Promise(resolve => {
      setTimeout(resolve, currentTime * 1000);
    });
  }

  /**
   * Play ascending scale
   */
  async playScale(type: 'chromatic' | 'pentatonic' | 'sacred' = 'pentatonic', noteDuration: number = 0.5): Promise<void> {
    const scale = this.generateScale(type);
    const notes: FluteNote[] = scale.frequencies.map(freq => ({
      frequency: freq,
      duration: noteDuration,
      amplitude: 0.7,
      harmonic: freq / this.baseFrequency
    }));

    return this.playSequence(notes, 0.1);
  }

  /**
   * Create meditative drone with A432 base
   */
  createDrone(duration: number = 10): Promise<void> {
    return new Promise((resolve) => {
      const startTime = this.audioContext.currentTime;
      
      // Base A432 drone
      const drone1 = this.createFluteTone(this.baseFrequency, startTime, duration);
      
      // Perfect fifth harmony (A432 * 3/2 = 648Hz)
      const drone2 = this.createFluteTone(this.baseFrequency * 3/2, startTime, duration);
      
      // Octave harmony (A432 * 2 = 864Hz)
      const drone3 = this.createFluteTone(this.baseFrequency * 2, startTime, duration);
      
      setTimeout(() => {
        resolve();
      }, duration * 1000);
    });
  }

  /**
   * Generate sacred geometry-inspired melody
   * Based on Fibonacci sequence and golden ratio
   */
  async playSacredMelody(): Promise<void> {
    const goldenRatio = 1.618033988749;
    const fibonacci = [1, 1, 2, 3, 5, 8, 13];
    
    const notes: FluteNote[] = fibonacci.map((fib, index) => {
      const ratio = Math.pow(goldenRatio, (fib % 8) / 8);
      const frequency = this.baseFrequency * ratio;
      
      return {
        frequency,
        duration: 0.8,
        amplitude: 0.6,
        harmonic: ratio
      };
    });

    return this.playSequence(notes, 0.3);
  }

  /**
   * Generate frequencies based on Rodin coil mathematics (3-6-9 pattern)
   */
  generateRodinFrequencies(): number[] {
    const rodinPattern = [3, 6, 9, 1, 2, 4, 8, 7, 5];
    return rodinPattern.map(num => this.baseFrequency * (num / 9) * 2);
  }

  /**
   * Play Rodin coil inspired sequence
   */
  async playRodinSequence(): Promise<void> {
    const frequencies = this.generateRodinFrequencies();
    const notes: FluteNote[] = frequencies.map(freq => ({
      frequency: freq,
      duration: 0.6,
      amplitude: 0.5,
      harmonic: freq / this.baseFrequency
    }));

    return this.playSequence(notes, 0.2);
  }

  /**
   * Stop all current sounds
   */
  stopAll(): void {
    this.currentOscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscillator may already be stopped
      }
    });
    this.currentOscillators = [];
  }

  /**
   * Set master volume
   */
  setVolume(volume: number): void {
    this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
  }

  /**
   * Get current A432 base frequency
   */
  getBaseFrequency(): number {
    return this.baseFrequency;
  }

  /**
   * Set base frequency (maintains A432 relationships)
   */
  setBaseFrequency(frequency: number): void {
    this.baseFrequency = frequency;
  }

  /**
   * Calculate frequency for musical interval
   */
  getInterval(semitones: number): number {
    return this.baseFrequency * Math.pow(2, semitones / 12);
  }

  /**
   * Generate healing frequencies based on Solfeggio scale
   */
  getSolfeggioFrequencies(): number[] {
    // Traditional Solfeggio frequencies adjusted to A432 tuning
    const baseRatios = [
      174/440, 285/440, 396/440, 417/440, 528/440, 639/440, 741/440, 852/440, 963/440
    ];
    
    return baseRatios.map(ratio => ratio * this.baseFrequency);
  }

  /**
   * Dispose of audio resources
   */
  dispose(): void {
    this.stopAll();
    this.audioContext.close();
  }
}

// Export utility functions
export const createA432Flute = (): A432Flute => new A432Flute();

export const frequencyToNote = (frequency: number): string => {
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const a4 = 432; // A432 tuning
  const c0 = a4 * Math.pow(2, -4.75); // C0 frequency in A432 tuning
  
  const h = Math.round(12 * Math.log2(frequency / c0));
  const octave = Math.floor(h / 12);
  const n = h % 12;
  
  return noteNames[n] + octave;
};

export const noteToFrequency = (note: string, octave: number): number => {
  const noteOffsets: { [key: string]: number } = {
    'C': -9, 'C#': -8, 'D': -7, 'D#': -6, 'E': -5, 'F': -4,
    'F#': -3, 'G': -2, 'G#': -1, 'A': 0, 'A#': 1, 'B': 2
  };
  
  const a4 = 432; // A432 tuning
  const semitoneOffset = noteOffsets[note] + (octave - 4) * 12;
  
  return a4 * Math.pow(2, semitoneOffset / 12);
};

// Default export
export default A432Flute;