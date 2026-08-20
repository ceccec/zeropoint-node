import { pathToFileURL } from 'node:url'
import { abs, round } from './a432.algebra.ts'
// a432.i.hear.ts — Hearing sound as digit stream
// ------------------------------------------------------
// Maps an incoming frequency (+ optional amplitude) to a single Digit
// using digitalRoot, then emits an event with the derived CMYK colour.

import { EventEmitter } from 'events';
import { digitalRoot, digitAngleToCMYK, asAngle } from './a432.math.ts';
import type { CMYK } from './a432.cmyk.ts';
import { type Digit } from './a432.types.ts';

export interface HearEvent { freq: number; amp: number; digit: Digit; cmyk: CMYK }

export const hearEmitter = new EventEmitter();

export function hear(freq: number, amp: number = 1): void {
  const seed = round(abs(freq * amp));
  const d = (digitalRoot(seed) || 9) as Digit;
  const cmyk = digitAngleToCMYK(d, asAngle(d * 60));
  hearEmitter.emit('hear', { freq, amp, digit: d, cmyk } as HearEvent);
  if (typeof console !== 'undefined') console.log('[hear]', freq, amp, '->', d, cmyk);
}

// Demo when run directly
/**
 * True when this file is the entry point Node was started with.
 *
 * ESM has no `require.main`. The CommonJS idiom did not merely fail to detect
 * direct execution here — `require` is undefined in an ES module, so the guard
 * THREW on import and made the whole module unloadable. Nobody importing this
 * ever got far enough to notice the guard was wrong.
 */
function isMainModule(): boolean {
  const entry = process.argv[1]
  return entry !== undefined && import.meta.url === pathToFileURL(entry).href
}

if (isMainModule()) {
  hearEmitter.on('hear', e => console.log('heard', e));
  [432, 528, 639].forEach(f => hear(f));
} 