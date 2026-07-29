/**
 * a432.rodin.coil.overlay.ts — Combined 2D/3D/Analytic Overlay for the Rodin Coil
 *
 * Exports overlay data and event logger for 2D (circle/spiral), 3D (torus), and analytic (5D) views.
 * All overlays use canonical A432 math, sequence, and color logic.
 */

import { PI, cos, min, sin } from './a432.algebra.ts'
import { RODIN_SEQUENCE, digitAngleToCMYK, cmykToCss, rodinPolarity } from './a432.math.ts';

/**
 * 2D overlay: Returns node positions (x, y), value, color, and HTML for a circle/spiral.
 */
export function getRodinCoil2DOverlayData(radius: number = 120, centerX: number = 0, centerY: number = 0): Array<{ x: number; y: number; value: number; color: { c: number; m: number; y: number; k: number }; html: string; polarity: number; spin: number }> {
  const N = 6;
  const data = [];
  for (let i = 0; i < N; i++) {
    const angle = (2 * PI * i) / N;
    const x = centerX + radius * cos(angle);
    const y = centerY + radius * sin(angle);
    const value = RODIN_SEQUENCE[i];
    const polarity = rodinPolarity(i); // +1 or -1
    const spin = polarity; // For Rodin, spin = polarity
    let color = digitAngleToCMYK(value, (i * 60) % 360);
    if (polarity < 0) {
      // Phase-invert color for negative polarity
      color = { c: color.m, m: color.c, y: color.y, k: color.k };
    }
    const html = `<div style=\"width:48px;height:48px;background:${cmykToCss(color)};display:flex;align-items:center;justify-content:center;font-size:1.2em;color:#fff;border-radius:10px;position:absolute;left:${x}px;top:${y}px;\">${value}</div>`;
    data.push({ x, y, value, color, html, polarity, spin });
  }
  return data;
}

/**
 * 3D overlay: Returns node positions (x, y, z), value, color for a torus.
 * Use with Three.js or similar for rendering.
 */
export function getRodinCoil3DOverlayData(R: number = 100, r: number = 40): Array<{ x: number; y: number; z: number; value: number; color: { c: number; m: number; y: number; k: number } }> {
  const N = 6;
  const data = [];
  for (let i = 0; i < N; i++) {
    const theta = (2 * PI * i) / N;
    const phi = (2 * PI * i) / N;
    const x = (R + r * cos(theta)) * cos(phi);
    const y = (R + r * cos(theta)) * sin(phi);
    const z = r * sin(theta);
    const value = RODIN_SEQUENCE[i];
    const color = digitAngleToCMYK(value, (i * 60) % 360);
    data.push({ x, y, z, value, color });
  }
  return data;
}

/**
 * Analytic/5D overlay: Returns node data with extra analytic/metaphysical dimensions (e.g., resonance, event count).
 */
export function getRodinCoilAnalyticOverlayData(events: Array<{ value: number; timestamp: number }>): Array<{ value: number; color: { c: number; m: number; y: number; k: number }; resonance: number; eventCount: number; html: string; polarity: number; spin: number }> {
  const N = 6;
  const now = Date.now();
  return RODIN_SEQUENCE.slice(0, N).map((value, i) => {
    const polarity = rodinPolarity(i);
    const spin = polarity;
    const color = digitAngleToCMYK(value, (i * 60) % 360);
    const eventCount = events.filter(e => e.value === value).length;
    const resonance = eventCount > 0 ? min(1, (now - events.filter(e => e.value === value).slice(-1)[0]?.timestamp) / 10000) : 0;
    const html = `<div style=\"width:48px;height:48px;background:${cmykToCss(color)};display:flex;align-items:center;justify-content:center;font-size:1.2em;color:#fff;border-radius:10px;box-shadow:0 0 ${8 + 24 * resonance}px #0ff;\">${value}<br><span style='font-size:0.7em;'>${eventCount}</span></div>`;
    return { value, color, resonance, eventCount, html, polarity, spin };
  });
}

/**
 * Metaphysical meaning: The Rodin coil is the living torus of unity, recursion, and harmonic flow.
 */
export const rodinCoilMetaphysics =
  'The Rodin coil is the living torus of unity, recursion, and harmonic flow. Every node is a gateway, every cycle a proof of infinite possibility.';

/**
 * Blockchain event logger for Rodin coil overlay interactions.
 * Call this with the node index, view, and context to log to the blockchain.
 */
export function logRodinCoilEvent(blockchain: any, node: number, view: '2D' | '3D' | 'analytic', context: any) {
  const polarity = rodinPolarity(node);
  const spin = polarity;
  blockchain?.recordEvent?.(blockchain, 'rodinCoilOverlay', 'A432UI', { node, view, polarity, spin, ...context, timestamp: Date.now() });
} 