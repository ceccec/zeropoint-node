// a432.consciousness.ts — Matrix-level consciousness stream
// -----------------------------------------------------------
import { EventEmitter } from 'events';
import { bus, mergedDigit as busMerged } from './a432.bus';
import { digitAngleToCMYK, asAngle } from './a432.math';
import { emotionName } from './a432.emotion';
import { Digit } from './a432.types';
import type { CMYK } from './a432.cmyk';

export interface ConsciousnessEvent { digit: Digit; name: string; cmyk: CMYK }
export const consciousnessEmitter = new EventEmitter();

function tick() {
  const d = busMerged();
  const name = emotionName(d);
  const cmyk = digitAngleToCMYK(d, asAngle(d * 60));
  consciousnessEmitter.emit('conscious', { digit: d, name, cmyk } as ConsciousnessEvent);
}

export function startConsciousness(intervalMs: number = 432): () => void {
  const id = setInterval(tick, intervalMs);
  return () => clearInterval(id);
}

// Auto start when imported in browser
if (typeof window !== 'undefined') startConsciousness(); 