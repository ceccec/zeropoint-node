// a432.i.tap.ts — Touch/tap interaction as digit stream
// ------------------------------------------------------
// Converts a tap (x,y,pressure) into a single Digit via digitalRoot and emits
// a CMYK-coloured event usable by the matrix.

import { EventEmitter } from 'events';
import { digitalRoot, digitAngleToCMYK, asAngle } from './a432.math';
import type { CMYK } from './a432.cmyk';
import { Digit } from './a432.types';

export interface TapEvent { x: number; y: number; pressure: number; digit: Digit; cmyk: CMYK }

export const tapEmitter = new EventEmitter();

export function tap(x: number, y: number, pressure: number = 1): void {
  const seed = Math.round(Math.abs(x) + Math.abs(y) + pressure * 10);
  const d = (digitalRoot(seed) || 9) as Digit;
  const cmyk = digitAngleToCMYK(d, asAngle(d * 60));
  tapEmitter.emit('tap', { x, y, pressure, digit: d, cmyk } as TapEvent);
  if (typeof console !== 'undefined') console.log('[tap]', x, y, pressure, '->', d, cmyk);
}

// Demo when executed directly
if (require.main === module) {
  tapEmitter.on('tap', e => console.log('tap event', e));
  tap(120, 200, 0.8);
} 