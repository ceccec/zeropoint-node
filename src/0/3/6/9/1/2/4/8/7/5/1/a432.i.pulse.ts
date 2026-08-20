import { pathToFileURL } from 'node:url'
import { round } from './a432.algebra.ts'
// a432.i.pulse.ts — Heartbeat interval to digit stream
import { EventEmitter } from 'events';
import { digitalRoot, digitAngleToCMYK, asAngle } from './a432.math.ts';
import { type CMYK } from './a432.cmyk.ts';
import { type Digit } from './a432.types.ts';

export interface PulseEvent { bpm: number; digit: Digit; cmyk: CMYK }
export const pulseEmitter = new EventEmitter();

export function pulse(bpm: number): void {
  const d = (digitalRoot(round(bpm)) || 9) as Digit;
  const cmyk = digitAngleToCMYK(d, asAngle(d*60));
  pulseEmitter.emit('pulse', { bpm, digit: d, cmyk } as PulseEvent);
  if(typeof console!=='undefined')console.log('[pulse]',bpm,'->',d,cmyk);
}

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

if(isMainModule()){pulseEmitter.on('pulse',e=>console.log(e));pulse(72);} 