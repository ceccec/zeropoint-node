// a432.infinity.ts — Infinity lemma stream
import { EventEmitter } from 'events';
import { digitalRoot } from './a432.math';
import { registerSource } from './a432.bus';
import { Digit } from './a432.types';
import { digitAngleToCMYK, asAngle } from './a432.math';

export const infinityEmitter = new EventEmitter();
const name = 'infinity';
const seed = digitalRoot([...name].reduce((a,c)=>a+c.charCodeAt(0),0)) as Digit;
const cmyk = digitAngleToCMYK(seed, asAngle(seed*60));

infinityEmitter.emit('inf', { digit: seed, cmyk });
registerSource(name, infinityEmitter, 'inf', p => (p as any).digit as Digit, 'mind'); 