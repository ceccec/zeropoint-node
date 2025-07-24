// a432.human.ts — Human vitality aggregator
// -----------------------------------------
import { EventEmitter } from 'events';
import { pulseEmitter } from './a432.i.pulse';
import { heatEmitter } from './a432.i.heat';
import { moveEmitter } from './a432.i.move';
import { digitAngleToCMYK, asAngle } from './a432.math';
import { Digit } from './a432.types';

export interface VitalEvent { vitality: number; digit: Digit; cmyk: ReturnType<typeof digitAngleToCMYK> }
export const humanEmitter = new EventEmitter();

let bpm = 72; let temp = 36.6; let motion = 0;

pulseEmitter.on('pulse', e => { bpm = e.bpm; compute(); });
heatEmitter.on('heat', e => { temp = e.temp; compute(); });
moveEmitter.on('move', e => { motion = Math.round(Math.sqrt(e.ax*e.ax+e.ay*e.ay+e.az*e.az)*100); compute(); });

function compute() {
  const vitality = Math.round((bpm/60 + (37 - Math.abs(37-temp)) + (100-motion)/100)*3);
  const digit = ((vitality % 9) || 9) as Digit;
  const cmyk = digitAngleToCMYK(digit, asAngle(digit*60));
  humanEmitter.emit('vital', { vitality, digit, cmyk } as VitalEvent);
} 