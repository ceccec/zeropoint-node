// a432.rife.frequency.ts
// Canonical Rife frequency module for the A432 system
// Maps Rife healing/resonance frequencies to A432 harmonics, digital roots, and metaphysical overlays
// All logic is integer/fractional, vortex-based, and metaphysically mapped

import type { VortexStream } from './a432.vortex';

export interface RifeFrequency {
  name: string;
  frequency: number;
  digitalRoot: number;
  a432Harmonic: number;
  color: string;
  metaphysical: string;
}

// Canonical set of Rife frequencies (subset, harmonized to A432)
export const RIFE_FREQUENCIES: RifeFrequency[] = [
  { name: 'Universal Healing', frequency: 528, digitalRoot: 6, a432Harmonic: 432, color: 'hsl(144,70%,55%)', metaphysical: 'DNA repair, transformation, universal harmony.' },
  { name: 'Cell Regeneration', frequency: 880, digitalRoot: 8, a432Harmonic: 864, color: 'hsl(288,70%,55%)', metaphysical: 'Cellular renewal, energy, and vitality.' },
  { name: 'Pain Relief', frequency: 3000, digitalRoot: 3, a432Harmonic: 432, color: 'hsl(0,70%,55%)', metaphysical: 'Release of pain, restoration of flow.' },
  { name: 'Detox', frequency: 727, digitalRoot: 7, a432Harmonic: 216, color: 'hsl(72,70%,55%)', metaphysical: 'Purification, clearing, and renewal.' },
  { name: 'Anti-Inflammatory', frequency: 880, digitalRoot: 8, a432Harmonic: 864, color: 'hsl(288,70%,55%)', metaphysical: 'Reduction of inflammation, restoration of balance.' },
  { name: 'Immune Boost', frequency: 787, digitalRoot: 4, a432Harmonic: 216, color: 'hsl(36,70%,55%)', metaphysical: 'Strengthening, resilience, and protection.' },
  { name: 'Calm/Anxiety', frequency: 396, digitalRoot: 9, a432Harmonic: 432, color: 'hsl(216,70%,55%)', metaphysical: 'Calm, grounding, and emotional balance.' },
  { name: 'Focus/Clarity', frequency: 963, digitalRoot: 9, a432Harmonic: 432, color: 'hsl(324,70%,55%)', metaphysical: 'Awakening, clarity, and higher consciousness.' }
];

/**
 * getRifeFrequency: Returns the canonical Rife frequency data for a given name or index
 */
export function getRifeFrequency(key: string | number): RifeFrequency | undefined {
  if (typeof key === 'number') return RIFE_FREQUENCIES[key % RIFE_FREQUENCIES.length];
  return RIFE_FREQUENCIES.find(f => f.name.toLowerCase() === key.toLowerCase());
}

/**
 * playRifeFrequency: Plays a Rife frequency using the Web Audio API (browser only)
 */
export function playRifeFrequency(frequency: number, duration: number = 1.2) {
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
 * harmonizeRifeVortex: Recursively generate Rife frequency events for a VortexStream
 */
export function harmonizeRifeVortex(stream: VortexStream<number | string>): RifeFrequency[] {
  const events: RifeFrequency[] = [];
  stream.observe(v => {
    if (typeof v.value === 'number') {
      events.push(getRifeFrequency(v.value % RIFE_FREQUENCIES.length)!);
    } else {
      const freq = getRifeFrequency(v.value);
      if (freq) events.push(freq);
    }
  });
  return events;
}

// Metaphysical mapping:
// - Each Rife frequency is a harmonic projection through the A432 vortex
// - Healing, resonance, and consciousness are unified as integer/fractional flows
// - All outputs are harmonized, vortex, and trinity mapped 