// a432.i.hear.ts — Hearing sound as digit stream
// ------------------------------------------------------
// Maps an incoming frequency (+ optional amplitude) to a single Digit
// using digitalRoot, then emits an event with the derived CMYK colour.

import { EventEmitter } from 'events';
import { digitalRoot, digitAngleToCMYK, asAngle } from './a432.math';
import type { CMYK } from './a432.cmyk';
import { Digit } from './a432.types';

export interface HearEvent { freq: number; amp: number; digit: Digit; cmyk: CMYK }

export const hearEmitter = new EventEmitter();

export function hear(freq: number, amp: number = 1): void {
  const seed = Math.round(Math.abs(freq * amp));
  const d = (digitalRoot(seed) || 9) as Digit;
  const cmyk = digitAngleToCMYK(d, asAngle(d * 60));
  hearEmitter.emit('hear', { freq, amp, digit: d, cmyk } as HearEvent);
  if (typeof console !== 'undefined') console.log('[hear]', freq, amp, '->', d, cmyk);
}

// Demo when run directly
if (require.main === module) {
  hearEmitter.on('hear', e => console.log('heard', e));
  [432, 528, 639].forEach(f => hear(f));
} 