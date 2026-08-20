import { pathToFileURL } from 'node:url'
import { abs, round } from './a432.algebra.ts'
// a432.i.click.ts — Mouse click as digit stream
// ------------------------------------------------
// Encodes a click (x,y,button) into a Digit and CMYK colour.

import { EventEmitter } from 'events';
import { digitalRoot, digitAngleToCMYK, asAngle } from './a432.math.ts';
import type { CMYK } from './a432.cmyk.ts';
import { type Digit } from './a432.types.ts';

export interface ClickEvent { x: number; y: number; button: number; digit: Digit; cmyk: CMYK }

export const clickEmitter = new EventEmitter();

export function click(x: number, y: number, button: number = 0): void {
  const seed = round(abs(x) + abs(y) + (button + 1) * 7);
  const d = (digitalRoot(seed) || 9) as Digit;
  const cmyk = digitAngleToCMYK(d, asAngle(d * 60));
  clickEmitter.emit('click', { x, y, button, digit: d, cmyk } as ClickEvent);
  if (typeof console !== 'undefined') console.log('[click]', x, y, button, '->', d, cmyk);
}

// Demo
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
  clickEmitter.on('click', e => console.log('click event', e));
  click(50, 90, 1);
} 