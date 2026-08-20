import './a432.algebra.ts'
// a432.i.reflect.ts — Reflection interface for the A432 matrix
import { EventEmitter } from 'events';

export interface ReflectEvent {
  thought: string;
  depth: number; // 0-1
  timestamp: number;
}

export const reflectEmitter = new EventEmitter();

export function triggerReflect(thought: string, depth: number = 1) {
  const event: ReflectEvent = { thought, depth, timestamp: Date.now() };
  reflectEmitter.emit('reflect', event);
  if (typeof console !== 'undefined') console.log('[reflect]', event);
} 