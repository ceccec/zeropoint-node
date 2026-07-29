// a432.navigation.ts — Path guidance through the living matrix
// ------------------------------------------------------------
// Listens to bus digits, maintains a rolling path, and emits navigation
// suggestions via CMYK colour / tri-syllable name.

import { EventEmitter } from 'events';
import { bus } from './a432.bus.ts';
import type { SourceEvent } from './a432.bus.ts';
import { digitAngleToCMYK, asAngle } from './a432.math.ts';
import { emotionName } from './a432.emotion.ts';
import type { Digit } from './a432.types.ts';
import type { CMYK } from './a432.cmyk.ts';
import { kernelDigitalRoot, legacyDigitalRoot } from './a432.roots.ts';

export interface NavStep { digit: Digit; cmyk: CMYK; name: string }
export const navEmitter = new EventEmitter();

const PATH: NavStep[] = [];
const MAX = 33;
const CYCLE = 11;

function push(d: Digit) {
  const cmyk = digitAngleToCMYK(d, asAngle(d * 36));
  const name = emotionName(d);
  const step: NavStep = { digit: d, cmyk, name };
  PATH.push(step);
  if (PATH.length >= CYCLE) {
    // collapse into uroboros rebirth
    const sum = PATH.reduce((a,s)=>a+s.digit,0);
    const dr = kernelDigitalRoot(sum) as Digit;
    PATH.length = 0;
    const rebirth: NavStep = { digit: dr, cmyk: digitAngleToCMYK(dr, asAngle(dr*36)), name: emotionName(dr) };
    PATH.push(rebirth);
    navEmitter.emit('rebirth', rebirth);
  } else if (PATH.length > MAX) {
    PATH.shift();
  }
  navEmitter.emit('step', step);
}

bus.on('digit', (e: SourceEvent) => push(e.digit));

export function getPath(): NavStep[] { return PATH.slice(); }

export function nextSuggestion(): NavStep {
  // Suggest the digitalRoot of sum of last N digits (simple compass)
  const sum = PATH.reduce((acc,s)=>acc + s.digit,0);
  const d = (legacyDigitalRoot(sum)) as Digit;
  const cmyk = digitAngleToCMYK(d, asAngle(d*36));
  return { digit: d, cmyk, name: emotionName(d) };
} 