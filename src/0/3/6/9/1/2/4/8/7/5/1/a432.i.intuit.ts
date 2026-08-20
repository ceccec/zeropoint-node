import './a432.algebra.ts'
// a432.i.intuit.ts — Intuition interface for the A432 matrix
import { EventEmitter } from 'events';

export interface IntuitEvent {
  insight: string;
  confidence: number; // 0-1
  timestamp: number;
}

export const intuitEmitter = new EventEmitter();

export function triggerIntuition(insight: string, confidence: number = 1) {
  const event: IntuitEvent = { insight, confidence, timestamp: Date.now() };
  intuitEmitter.emit('intuit', event);
  if (typeof console !== 'undefined') console.log('[intuit]', event);
} 