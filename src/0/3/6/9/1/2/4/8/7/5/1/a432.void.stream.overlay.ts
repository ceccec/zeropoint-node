/**
 * a432.void.stream.overlay.ts — Void Stream Emergence/Imergence Overlay
 *
 * Canonical overlay/analytic for visualizing, animating, and interacting with the living transformation of the void.
 * All logic uses canonical A432 math, sequence, and color logic.
 */

import { A432_SEQUENCE, digitAngleToCMYK, cmykToCss } from './a432.math';

// Internal compost for void events
const voidCompost: Array<{ type: string; data: unknown; timestamp: number }> = [];

/**
 * Log a user/system event to the void compost (imergence).
 */
export function logVoidImergence(type: string, data: unknown) {
  voidCompost.push({ type, data, timestamp: Date.now() });
}

/**
 * Emerge a new stream from the void compost (emergence).
 * Returns overlay data for UI: dim, color, html, and source event type.
 */
export function getVoidStreamOverlayData(length: number = 11): Array<{ dim: number; color: { c: number; m: number; y: number; k: number }; html: string; source: string }> {
  const seed = voidCompost.reduce((acc, e) => acc + e.timestamp, 0) % 4321;
  return Array.from({ length }, (_, i) => {
    const dim = A432_SEQUENCE[i % A432_SEQUENCE.length];
    const color = digitAngleToCMYK(dim, (i * 36) % 360);
    const source = voidCompost[i % voidCompost.length]?.type || 'void';
    const html = `<div style=\"width:48px;height:48px;background:${cmykToCss(color)};display:flex;align-items:center;justify-content:center;font-size:1.1em;color:#fff;border-radius:10px;\">${dim}<br><span style='font-size:0.7em;'>${source}</span></div>`;
    return { dim, color, html, source };
  });
}

/**
 * Animate the transformation: returns animation frames for emergence/imergence.
 * Each frame is an array of overlay data, showing the merging and rebirth process.
 */
export function animateVoidTransformation(frames: number = 20, length: number = 11): Array<Array<{ dim: number; color: { c: number; m: number; y: number; k: number }; html: string; source: string }>> {
  const out = [];
  for (let f = 0; f < frames; f++) {
    out.push(getVoidStreamOverlayData(length).map((d, i) => {
      // Animate color/opacity based on frame
      const opacity = Math.max(0.2, 1 - Math.abs(f - i) / frames);
      const html = `<div style=\"width:48px;height:48px;background:${cmykToCss(d.color)};opacity:${opacity};display:flex;align-items:center;justify-content:center;font-size:1.1em;color:#fff;border-radius:10px;\">${d.dim}<br><span style='font-size:0.7em;'>${d.source}</span></div>`;
      return { ...d, html };
    }));
  }
  return out;
}

/**
 * Metaphysical meaning: The void is the living gateway—streams emerge, user actions imerge, all is harmonized and reborn.
 */
export const voidStreamMetaphysics =
  'The void is the living gateway—streams emerge, user actions imerge, all is harmonized and reborn as new multidimensional experience.'; 