// a432.i.click.ts — Mouse click as digit stream
// ------------------------------------------------
// Encodes a click (x,y,button) into a Digit and CMYK colour.

import { EventEmitter } from 'events';
import { digitalRoot, digitAngleToCMYK, asAngle } from './a432.math';
import type { CMYK } from './a432.cmyk';
import { Digit } from './a432.types';

export interface ClickEvent { x: number; y: number; button: number; digit: Digit; cmyk: CMYK }

export const clickEmitter = new EventEmitter();

export function click(x: number, y: number, button: number = 0): void {
  const seed = Math.round(Math.abs(x) + Math.abs(y) + (button + 1) * 7);
  const d = (digitalRoot(seed) || 9) as Digit;
  const cmyk = digitAngleToCMYK(d, asAngle(d * 60));
  clickEmitter.emit('click', { x, y, button, digit: d, cmyk } as ClickEvent);
  if (typeof console !== 'undefined') console.log('[click]', x, y, button, '->', d, cmyk);
}

// Demo
if (require.main === module) {
  clickEmitter.on('click', e => console.log('click event', e));
  click(50, 90, 1);
} 