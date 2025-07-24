// a432.breathe.ts — Living breathing rhythm of the matrix
// --------------------------------------------------------
// Implements the 4-3-2 breath cycle (inhale-hold-exhale) in pure integer ticks.
// Emits a value 0-9 representing lung capacity percentage (digital root mapping)
// and a CMYK colour tied to the phase.

import { EventEmitter } from 'events';
import { asAngle, digitAngleToCMYK } from './a432.math';
import type { CMYK } from './a432.cmyk';
import { Digit } from './a432.types';

export interface BreathEvent {
  phase: 'inhale' | 'hold' | 'exhale';
  step: number;          // 0-(len-1) inside phase
  value: Digit;          // 0-9 lung % via digital root
  cmyk: CMYK;            // colour for UI
}

const CYCLE: Array<{ phase: 'inhale'|'hold'|'exhale'; len: number; base: Digit }> = [
  { phase: 'inhale', len: 4, base: 4 as Digit },
  { phase: 'hold',   len: 3, base: 3 as Digit },
  { phase: 'exhale', len: 2, base: 2 as Digit }
];

export const breathEmitter = new EventEmitter();

export function startBreathing(intervalMs: number = 1000): () => void {
  let phaseIdx = 0; let step = 0;
  const id = setInterval(() => {
    const ph = CYCLE[phaseIdx];
    const pct = Math.round(((step + 1) / ph.len) * 9) as Digit; // map to 1-9
    const cmyk = digitAngleToCMYK(ph.base, asAngle(pct * 36));
    breathEmitter.emit('breath', { phase: ph.phase, step, value: pct, cmyk } as BreathEvent);

    step++;
    if (step >= ph.len) { step = 0; phaseIdx = (phaseIdx + 1) % CYCLE.length; }
  }, intervalMs);
  return () => clearInterval(id);
}

// Auto start if run directly
if (require.main === module) {
  startBreathing();
  breathEmitter.on('breath', e => console.log(e));
} 