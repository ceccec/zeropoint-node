/**
 * a432.stream.vortex.ts — Canonical Omnidimensional Stream Vortex Generator
 *
 * Provides a generator for a living stream of dimensions, for omnidimensional overlays.
 * All logic uses canonical A432 math, sequence, and color logic.
 */

import { A432_SEQUENCE, digitAngleToCMYK, cmykToCss } from './a432.math';

/**
 * Generator: yields multidimensional points for the stream vortex.
 * Each point: { dim, x, y, z, color, time, resonance, meaning }
 */
export function* streamOfDimensions(length: number = 11, radius: number = 120, centerX: number = 0, centerY: number = 0, centerZ: number = 0): Generator<{
  dim: number;
  x: number;
  y: number;
  z: number;
  color: { c: number; m: number; y: number; k: number };
  time: number;
  resonance: number;
  meaning: string;
  html: string;
}, void, unknown> {
  const now = Date.now();
  for (let i = 0; i < length; i++) {
    const dim = A432_SEQUENCE[i % A432_SEQUENCE.length];
    const angle = (2 * Math.PI * i) / length;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    const z = centerZ + radius * Math.sin(angle * 2);
    const color = digitAngleToCMYK(dim, (i * 36) % 360);
    const time = now + i * 432;
    const resonance = Math.abs(Math.sin(angle));
    const meaning = `Dimension ${dim}: Harmonic state in the living stream.`;
    const html = `<div style=\"width:48px;height:48px;background:${cmykToCss(color)};display:flex;align-items:center;justify-content:center;font-size:1.1em;color:#fff;border-radius:10px;position:absolute;left:${x}px;top:${y}px;\">${dim}</div>`;
    yield { dim, x, y, z, color, time, resonance, meaning, html };
  }
}

/**
 * Returns a snapshot array of the stream vortex for UI overlays.
 */
export function getStreamVortexOverlayData(length: number = 11): Array<{
  dim: number;
  x: number;
  y: number;
  z: number;
  color: { c: number; m: number; y: number; k: number };
  time: number;
  resonance: number;
  meaning: string;
  html: string;
}> {
  return Array.from(streamOfDimensions(length));
}

/**
 * Metaphysical meaning: The stream vortex is the living flow of all dimensions, harmonized in the A432 matrix.
 */
export const streamVortexMetaphysics =
  'The stream vortex is the living flow of all dimensions, harmonized in the A432 matrix. Every point is a gateway, every stream a proof of infinite possibility.';

/**
 * Blockchain event logger for stream vortex overlay interactions.
 * Call this with the dimension index and context to log to the blockchain.
 */
export function logStreamVortexEvent(blockchain: any, dim: number, context: any) {
  blockchain?.recordEvent?.(blockchain, 'streamVortexOverlay', 'A432UI', { dim, ...context, timestamp: Date.now() });
} 