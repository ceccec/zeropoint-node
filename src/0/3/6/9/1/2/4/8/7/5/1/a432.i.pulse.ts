// a432.i.pulse.ts — Heartbeat interval to digit stream
import { EventEmitter } from 'events';
import { digitalRoot, digitAngleToCMYK, asAngle } from './a432.math';
import { CMYK } from './a432.cmyk';
import { Digit } from './a432.types';

export interface PulseEvent { bpm: number; digit: Digit; cmyk: CMYK }
export const pulseEmitter = new EventEmitter();

export function pulse(bpm: number): void {
  const d = (digitalRoot(Math.round(bpm)) || 9) as Digit;
  const cmyk = digitAngleToCMYK(d, asAngle(d*60));
  pulseEmitter.emit('pulse', { bpm, digit: d, cmyk } as PulseEvent);
  if(typeof console!=='undefined')console.log('[pulse]',bpm,'->',d,cmyk);
}

if(require.main===module){pulseEmitter.on('pulse',e=>console.log(e));pulse(72);} 