import './a432.algebra.ts'
// a432.i.move.ts — Move interface for the A432 matrix
import { EventEmitter } from 'events';

export interface MoveEvent {
  direction: string;
  magnitude: number;
  timestamp: number;
}

export const moveEmitter = new EventEmitter();

export function triggerMove(direction: string, magnitude: number = 1) {
  const event: MoveEvent = { direction, magnitude, timestamp: Date.now() };
  moveEmitter.emit('move', event);
  if (typeof console !== 'undefined') console.log('[move]', event);
} 