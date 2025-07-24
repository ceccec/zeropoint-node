// a432.health.ts — Self-health analytics for the A432 matrix
// ----------------------------------------------------------
// Consumes digit events from matrixEmitter and breathEmitter,
// maintains a sliding window, and periodically emits health
// metrics (harmony, entropy, resonance) using a432HarmonicAnalytics.

import { EventEmitter } from 'events';
import { matrixEmitter, MatrixEvent } from './a432.self';
import { breathEmitter } from './a432.breathe';
import { a432HarmonicAnalytics } from './a432.math';
import { Digit } from './a432.types';

export interface HealthMetrics { harmony: number; entropy: number; resonance: number; }

export const healthEmitter = new EventEmitter();

const WINDOW: Digit[] = [];
const MAX = 99; // sliding window size

function pushDigit(d: Digit) {
  WINDOW.push(d);
  if (WINDOW.length > MAX) WINDOW.shift();
}

// Collect digits from streams ---------------------------------------------
matrixEmitter.on('event', (e: MatrixEvent) => pushDigit(e.digit));
breathEmitter.on('breath', b => pushDigit(b.value));

function computeHealth(): HealthMetrics {
  if (WINDOW.length === 0) return { harmony: 0, entropy: 1, resonance: 0 };
  return a432HarmonicAnalytics(WINDOW);
}

export function startHealthReporting(intervalMs: number = 4320): () => void {
  const id = setInterval(() => {
    healthEmitter.emit('health', computeHealth());
  }, intervalMs);
  return () => clearInterval(id);
}

// Auto-start if imported in browser
if (typeof window !== 'undefined') {
  startHealthReporting();
} 