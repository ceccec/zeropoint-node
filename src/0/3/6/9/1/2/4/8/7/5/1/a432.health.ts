import { legacyDigitalRoot } from './a432.roots.ts'
// a432.health.ts — Self-health analytics for the A432 matrix
// ----------------------------------------------------------
// Consumes digit events from matrixEmitter and breathEmitter,
// maintains a sliding window, and periodically emits health
// metrics (harmony, entropy, resonance) using a432HarmonicAnalytics.

import { EventEmitter } from 'events';
import { matrixEmitter, type MatrixEvent } from './a432.self.ts';
import { breathEmitter } from './a432.breathe.ts';
import { type Digit } from './a432.types.ts';

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
  return simpleHarmonicAnalytics(WINDOW);
}

// Canonical local analytics: harmony (mean), entropy (unique/total), resonance (digital root of sum)
function simpleHarmonicAnalytics(digits: Digit[]): HealthMetrics {
  if (digits.length === 0) return { harmony: 0, entropy: 1, resonance: 0 };
  const harmony = digits.map(Number).reduce((a, b) => a + b, 0) / digits.length;
  const unique = new Set(digits).size;
  const entropy = unique / digits.length;
  const sum = digits.map(Number).reduce((a, b) => a + b, 0);
  const resonance = sum === 0 ? 0 : (legacyDigitalRoot(sum));
  return { harmony, entropy, resonance };
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