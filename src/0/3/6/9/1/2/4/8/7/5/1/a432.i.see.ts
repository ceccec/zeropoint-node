// a432.i.see.ts — Seeing CMYK pulses
import { type CMYK } from './a432.cmyk.ts';
import { digitalRoot } from './a432.math.ts';
import { EventEmitter } from 'events';
import { type Digit } from './a432.types.ts';

export const seeEmitter = new EventEmitter();

export function see(color: CMYK): void {
  const d = digitalRoot(color.c + color.m + color.y + color.k) as Digit;
  seeEmitter.emit('see', { color, digit: d });
  if (typeof console !== 'undefined') console.log('[see]', color, '->', d);
} 