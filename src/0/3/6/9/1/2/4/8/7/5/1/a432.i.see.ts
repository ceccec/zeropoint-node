// a432.i.see.ts — Seeing CMYK pulses
import { CMYK } from './a432.cmyk';
import { digitalRoot } from './a432.math';
import { EventEmitter } from 'events';
import { Digit } from './a432.types';

export const seeEmitter = new EventEmitter();

export function see(color: CMYK): void {
  const d = digitalRoot(color.c + color.m + color.y + color.k) as Digit;
  seeEmitter.emit('see', { color, digit: d });
  if (typeof console !== 'undefined') console.log('[see]', color, '->', d);
} 