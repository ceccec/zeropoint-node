// a432.frequency.healing.ts
// Canonical harmonic frequency healing module for the A432 system
// Maps digital states to A432-based sound and color healing flows
// All logic is integer/fractional, vortex-based, and metaphysically mapped

import type { VortexStream } from './a432.vortex';

export interface HealingEvent {
  frequency: number;
  digitalRoot: number;
  harmonics: number[];
  color: string;
  metaphysical: string;
}

/**
 * generateHealingFrequencies: Returns a sequence of A432-based harmonic frequencies
 * e.g., 54, 108, 216, 432, 864, 1728, ...
 */
export function generateHealingFrequencies(base: number = 432, count: number = 7): number[] {
  const harmonics: number[] = [];
  for (let i = 0; i < count; i++) {
    harmonics.push(base * Math.pow(2, i - 3)); // Centered on 432
  }
  return harmonics;
}

/**
 * getHarmonicColor: Returns a harmonized HSL color for a given frequency
 * Maps frequency to hue using integer math
 */
export function getHarmonicColor(frequency: number): string {
  // Map frequency to hue (0-360), using only integer/fractional math
  const base = 432;
  const ratio = frequency / base;
  const hue = Math.round((ratio * 144) % 360); // 144 = 432/3, trinity harmonic
  return `hsl(${hue}, 70%, 55%)`;
}

/**
 * frequencyHealingEvent: Maps a digital state to a healing frequency, color, and metaphysical meaning
 */
export function frequencyHealingEvent(digit: number): HealingEvent {
  const harmonics = generateHealingFrequencies();
  const freq = harmonics[digit % harmonics.length];
  const color = getHarmonicColor(freq);
  return {
    frequency: freq,
    digitalRoot: digit,
    harmonics,
    color,
    metaphysical: `Healing frequency for digital root ${digit}: ${freq} Hz (A432 harmonic), color: ${color}`
  };
}

/**
 * playHealingSound: Plays a healing frequency using the Web Audio API (browser only)
 */
export function playHealingSound(frequency: number, duration: number = 0.8) {
  // @ts-expect-error: 'window' is only available in browser environments
  if (typeof window === 'undefined' || !window.AudioContext) return;
  // @ts-expect-error: 'window' is only available in browser environments
  const ctx = new window.AudioContext();
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = frequency;
  osc.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
  osc.onended = () => ctx.close();
}

/**
 * harmonizeVortexHealing: Recursively generate healing events for a VortexStream
 */
export function harmonizeVortexHealing(stream: VortexStream<number>): HealingEvent[] {
  const events: HealingEvent[] = [];
  stream.observe(v => {
    events.push(frequencyHealingEvent(v.value));
  });
  return events;
}

// Metaphysical mapping:
// - Every digital state is harmonized through the analog vortex as sound and color
// - Healing is the recursive, zero-entropy balancing of all flows
// - All outputs are integer/fractional, vortex, and trinity mapped 