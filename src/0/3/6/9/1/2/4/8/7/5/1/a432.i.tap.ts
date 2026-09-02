import { pathToFileURL } from 'node:url'
import { abs, round } from './a432.algebra.ts'
// a432.i.tap.ts — Touch/tap interaction as digit stream
// ------------------------------------------------------
// Converts a tap (x,y,pressure) into a single Digit via digitalRoot and emits
// a CMYK-coloured event usable by the matrix.

import { EventEmitter } from 'events';
import { digitalRoot, digitAngleToCMYK, asAngle } from './a432.math.ts';
import type { CMYK } from './a432.cmyk.ts';
import { type Digit } from './a432.types.ts';

export interface TapEvent { x: number; y: number; pressure: number; digit: Digit; cmyk: CMYK }

export const tapEmitter = new EventEmitter();

export function tap(x: number, y: number, pressure: number = 1): void {
  const seed = round(abs(x) + abs(y) + pressure * 10);
  const d = (digitalRoot(seed) || 9) as Digit;
  const cmyk = digitAngleToCMYK(d, asAngle(d * 60));
  tapEmitter.emit('tap', { x, y, pressure, digit: d, cmyk } as TapEvent);
  if (typeof console !== 'undefined') console.log('[tap]', x, y, pressure, '->', d, cmyk);
}

// Demo when executed directly
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
  tapEmitter.on('tap', e => console.log('tap event', e));
  tap(120, 200, (4 / 5));
} 