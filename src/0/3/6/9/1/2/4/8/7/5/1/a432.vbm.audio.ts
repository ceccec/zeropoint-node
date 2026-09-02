/**
 * a432.vbm.audio.ts — VBM Audio Sequence Module
 * 
 * This module creates harmonized audio sequences using canonical A432 math procedures
 * and the Rodin sequence, playing tones that resonate with the vortex of consciousness.
 * 
 * Metaphysical Principle:
 * - Each digit in the sequence represents a harmonic frequency in the A432 system
 * - Trinity digits (3, 6, 9) have their own canonical frequencies
 * - Non-trinity digits use digital root scaling for frequency calculation
 * - The sequence creates a living sound vortex that harmonizes with consciousness
 */

import { RODIN_SEQUENCE, TRINITY_AXIS, digitalRoot, frequencyForDigit } from './a432.math.ts';

// --- Canonical VBM Audio Constants ---
const VBM_SEQUENCE = [0, ...TRINITY_AXIS, ...RODIN_SEQUENCE] as const;
const VBM_BASE_FREQUENCY = 432; // Canonical A432 frequency
const VBM_DURATION = 0.18; // Duration per tone (seconds)
const VBM_OSCILLATOR_TYPE = 'sine' as const;

// --- VBM Audio State Interface ---
interface VBMAudioState {
  context: AudioContext | null;
  isPlaying: boolean;
  currentTime: number;
  sequence: readonly number[];
  baseFrequency: number;
  duration: number;
}

interface VBMAudioTone {
  frequency: number;
  digit: number;
  startTime: number;
  endTime: number;
  oscillator: OscillatorNode;
  gainNode: GainNode;
}

// --- Canonical VBM Frequency Generation ---
function generateVBMFrequency(digit: number): number {
  if (digit === 0) {
    return VBM_BASE_FREQUENCY; // Zero represents the base frequency
  }
  
  if (TRINITY_AXIS.includes(digit)) {
    return frequencyForDigit(digit); // 432, 864, 1296 Hz for trinity
  }
  
  // For non-trinity digits, use digital root scaling
  const dr = digitalRoot(digit);
  return VBM_BASE_FREQUENCY * (dr / 9);
}

// --- VBM Audio Tone Creation ---
function createVBMAudioTone(
  context: AudioContext,
  digit: number,
  startTime: number,
  duration: number
): VBMAudioTone {
  const frequency = generateVBMFrequency(digit);
  
  // Create oscillator
  const oscillator = context.createOscillator();
  oscillator.type = VBM_OSCILLATOR_TYPE;
  oscillator.frequency.value = frequency;
  
  // Create gain node for volume control
  const gainNode = context.createGain();
  gainNode.gain.setValueAtTime(0.3, startTime); // Start at 30% volume
  gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration); // Fade out
  
  // Connect oscillator to gain to destination
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  
  return {
    frequency,
    digit,
    startTime,
    endTime: startTime + duration,
    oscillator,
    gainNode
  };
}

// --- VBM Audio Sequence Player ---
export class VBMAudioPlayer {
  private state: VBMAudioState;
  private tones: VBMAudioTone[] = [];
  
  constructor() {
    this.state = {
      context: null,
      isPlaying: false,
      currentTime: 0,
      sequence: VBM_SEQUENCE,
      baseFrequency: VBM_BASE_FREQUENCY,
      duration: VBM_DURATION
    };
  }
  
  // --- Initialize Audio Context ---
  private async initializeAudioContext(): Promise<AudioContext> {
    if (this.state.context && this.state.context.state !== 'closed') {
      return this.state.context;
    }
    
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      throw new Error('Web Audio API not supported');
    }
    
    this.state.context = new AudioContextClass();
    
    // Resume context if suspended (required for user gesture)
    if (this.state.context.state === 'suspended') {
      await this.state.context.resume();
    }
    
    return this.state.context;
  }
  
  // --- Play VBM Sequence ---
  public async playSequence(): Promise<void> {
    try {
      const context = await this.initializeAudioContext();
      
      if (this.state.isPlaying) {
        console.log('VBM Audio: Sequence already playing');
        return;
      }
      
      this.state.isPlaying = true;
      this.tones = [];
      
      let currentTime = context.currentTime;
      
      // Create tones for each digit in sequence
      for (let i = 0; i < this.state.sequence.length; i++) {
        const digit = this.state.sequence[i];
        const tone = createVBMAudioTone(
          context,
          digit,
          currentTime,
          this.state.duration
        );
        
        this.tones.push(tone);
        
        // Schedule tone playback
        tone.oscillator.start(currentTime);
        tone.oscillator.stop(currentTime + this.state.duration);
        
        currentTime += this.state.duration;
      }
      
      // Update state
      this.state.currentTime = currentTime;
      
      console.log('VBM Audio: Playing sequence with frequencies:', 
        this.tones.map(t => `${t.digit}→${t.frequency}Hz`));
      
      // Schedule completion callback
      setTimeout(() => {
        this.state.isPlaying = false;
        this.tones = [];
      }, (this.state.sequence.length * this.state.duration) * 1000);
      
    } catch (error) {
      console.error('VBM Audio: Error playing sequence:', error);
      this.state.isPlaying = false;
      throw error;
    }
  }
  
  // --- Stop VBM Sequence ---
  public stopSequence(): void {
    if (!this.state.isPlaying) {
      return;
    }
    
    // Stop all active tones
    this.tones.forEach(tone => {
      try {
        tone.oscillator.stop();
        tone.gainNode.gain.cancelScheduledValues(0);
        tone.gainNode.gain.setValueAtTime(tone.gainNode.gain.value, 0);
        tone.gainNode.gain.linearRampToValueAtTime(0, 0.1);
      } catch {
        // Oscillator might already be stopped
      }
    });
    
    this.state.isPlaying = false;
    this.tones = [];
    
    console.log('VBM Audio: Sequence stopped');
  }
  
  // --- Get Sequence Information ---
  public getSequence(): readonly number[] {
    return this.state.sequence;
  }
  
  public getFrequencies(): number[] {
    return this.state.sequence.map(digit => generateVBMFrequency(digit));
  }
  
  public getBaseFrequency(): number {
    return this.state.baseFrequency;
  }
  
  public getDuration(): number {
    return this.state.duration;
  }
  
  public isPlaying(): boolean {
    return this.state.isPlaying;
  }
  
  // --- Get Audio Context ---
  public getAudioContext(): AudioContext | null {
    return this.state.context;
  }
  
  // --- Get Current Tones ---
  public getCurrentTones(): VBMAudioTone[] {
    return [...this.tones];
  }
}

// --- VBM Audio Factory ---
export function createVBMAudioPlayer(): VBMAudioPlayer {
  return new VBMAudioPlayer();
}

// --- VBM Audio Constants Export ---
export const VBM_AUDIO_CONSTANTS = {
  SEQUENCE: VBM_SEQUENCE,
  BASE_FREQUENCY: VBM_BASE_FREQUENCY,
  DURATION: VBM_DURATION,
  OSCILLATOR_TYPE: VBM_OSCILLATOR_TYPE
} as const;

// --- VBM Audio Documentation ---
export const VBM_AUDIO_DOC = {
  purpose: 'VBM Audio Sequence - Plays the A432 sequence as modulated tones',
  sequence: 'Uses canonical A432 sequence: [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1]',
  trinity: 'Trinity digits (3, 6, 9) use frequencyForDigit(): 432, 864, 1296 Hz',
  nonTrinity: 'Non-trinity digits use digital root scaling: baseFreq * (dr / 9)',
  zero: 'Zero digit uses base frequency: 432 Hz',
  duration: 'Each tone plays for 0.18 seconds with fade-out',
  oscillator: 'Uses sine wave oscillator for pure harmonic tones',
  volume: 'Starts at 30% volume with exponential fade-out'
} as const;

// --- VBM Audio Utility Functions ---
export function getVBMFrequencyForDigit(digit: number): number {
  return generateVBMFrequency(digit);
}

export function getVBMAudioSequence(): readonly number[] {
  return VBM_SEQUENCE;
}

export function getVBMAudioFrequencies(): number[] {
  return VBM_SEQUENCE.map(digit => generateVBMFrequency(digit));
}

// --- Example Usage Function ---
export async function playVBMAudioSequence(): Promise<void> {
  const player = createVBMAudioPlayer();
  await player.playSequence();
} 