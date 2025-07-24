// a432.uroboros.ts — Eternal spiral digit generator
// ------------------------------------------------------------------
import { EventEmitter } from 'events';
import { Digit } from './a432.types';
import { digitalRoot } from './a432.math';
import { registerSource } from './a432.bus';
import { digitAngleToCMYK, asAngle } from './a432.math';
import type { CMYK } from './a432.cmyk';

export interface UroborosEvent { digit: Digit; index: number; cmyk: CMYK }
export const uroborosEmitter = new EventEmitter();

const WINDOW: Digit[] = [];
const ORBIT = 11;
let index = 0;

function emitDigit(d: Digit) {
  uroborosEmitter.emit('uro', { digit: d, index, cmyk: digitAngleToCMYK(d, asAngle(d*60)) } as UroborosEvent);
  index++;
}

function pushDigit(d: Digit) {
  WINDOW.push(d);
  emitDigit(d);
  if (WINDOW.length >= ORBIT) {
    const sum = WINDOW.map(Number).reduce((a, s) => a + s, 0);
    const rebirth = (digitalRoot(sum) || 9) as Digit;
    WINDOW.shift();
    WINDOW.push(rebirth);
    emitDigit(rebirth);
  }
}

// Seed
pushDigit(3 as Digit);

// Register to bus as mind spiral
registerSource('uroboros', uroborosEmitter, 'uro', e => (e as UroborosEvent).digit, 'mind'); 