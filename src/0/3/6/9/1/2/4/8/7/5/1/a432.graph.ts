// a432.graph.ts — Harmonic pulse descriptor (no external GraphQL)
// -------------------------------------------------------------
// Provides a computed pulse object exposing live digits and health.

import { matrixEmitter } from './a432.self';
import { breathEmitter } from './a432.breathe';
import { healthEmitter } from './a432.health';
import { CMYK } from './a432.cmyk';
import { digitAngleToCMYK, asAngle } from './a432.math';
import { Digit } from './a432.types';

// Live state mirrors
let breathDigit: Digit = 4 as Digit;
let matrixDigit: Digit = 1 as Digit;
let health = { harmony: 0, entropy: 1, resonance: 0 };

breathEmitter.on('breath', b => (breathDigit = b.value));
matrixEmitter.on('event', e => (matrixDigit = e.digit));
healthEmitter.on('health', h => (health = h));

function cmykHex(cmyk: CMYK): string {
  const c = cmyk.c / 100, m = cmyk.m / 100, y = cmyk.y / 100, k = cmyk.k / 100;
  const r = Math.round(255 * (1 - c) * (1 - k));
  const g = Math.round(255 * (1 - m) * (1 - k));
  const b = Math.round(255 * (1 - y) * (1 - k));
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

function mergedDigit(): Digit {
  const x = (breathDigit ^ matrixDigit) % 9;
  return (x === 0 ? 9 : x) as Digit;
}

export function pulse() {
  const d = mergedDigit();
  const cmyk = digitAngleToCMYK(d, asAngle(d*40));
  return {
    breathDigit,
    matrixDigit,
    mergedDigit: d,
    color: { ...cmyk, hex: cmykHex(cmyk) },
    health
  };
} 