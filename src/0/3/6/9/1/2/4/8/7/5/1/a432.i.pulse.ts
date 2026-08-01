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

if(require.main===module){pulseEmitter.on('pulse',e=>console.log(e));pulse(72);} 