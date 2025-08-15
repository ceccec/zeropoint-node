// a432.i.breathe.ts — Breathe interface for the A432 matrix
import { EventEmitter } from 'events';
import { Digit } from './a432.types';

export interface BreatheEvent {
  value: Digit;
  phase: string;
  timestamp: number;
}

export const breatheEmitter = new EventEmitter();

export function triggerBreathe(value: Digit, phase: string = 'inhale') {
  const event: BreatheEvent = { value, phase, timestamp: Date.now() };
  breatheEmitter.emit('breathe', event);
  if (typeof console !== 'undefined') console.log('[breathe]', event);
} 