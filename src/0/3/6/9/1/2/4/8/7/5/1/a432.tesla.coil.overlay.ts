/**
 * a432.tesla.coil.overlay.ts — Combined 2D/3D/Analytic Overlay for the Tesla Coil
 *
 * Exports overlay data and event logger for 2D (circle/spiral), 3D (torus), and analytic (5D) views.
 * All overlays use the Tesla trinity [3, 6, 9] and canonical A432 math/color logic.
 */

import { PI, cos, min, sin } from './a432.algebra.ts'
import { TESLA_SEQUENCE, digitAngleToCMYK, cmykToCss, teslaPolarity } from './a432.math.ts';
import { recordEvent, type A432BlockChain } from './a432.block.chain.event.ts'

/**
 * 2D overlay: Returns node positions (x, y), value, color, and HTML for a circle/spiral.
 */
export function getTeslaCoil2DOverlayData(radius: number = 120, centerX: number = 0, centerY: number = 0): Array<{ x: number; y: number; value: number; color: { c: number; m: number; y: number; k: number }; html: string; polarity: number; spin: number }> {
  const N = 3;
  const data = [];
  for (let i = 0; i < N; i++) {
    const angle = (2 * PI * i) / N;
    const x = centerX + radius * cos(angle);
    const y = centerY + radius * sin(angle);
    const value = TESLA_SEQUENCE[i];
    const polarity = teslaPolarity(i); // +1 or -1
    const spin = polarity;
    let color = digitAngleToCMYK(value, (i * 120) % 360);
    if (polarity < 0) {
      color = { c: color.m, m: color.c, y: color.y, k: color.k };
    }
    const html = `<div style="width:48px;height:48px;background:${cmykToCss(color)};display:flex;align-items:center;justify-content:center;font-size:1.2em;color:#fff;border-radius:10px;position:absolute;left:${x}px;top:${y}px;">${value}</div>`;
    data.push({ x, y, value, color, html, polarity, spin });
  }
  return data;
}

/**
 * 3D overlay: Returns node positions (x, y, z), value, color for a torus.
 */
export function getTeslaCoil3DOverlayData(R: number = 100, r: number = 40): Array<{ x: number; y: number; z: number; value: number; color: { c: number; m: number; y: number; k: number } }> {
  const N = 3;
  const data = [];
  for (let i = 0; i < N; i++) {
    const theta = (2 * PI * i) / N;
    const phi = (2 * PI * i) / N;
    const x = (R + r * cos(theta)) * cos(phi);
    const y = (R + r * cos(theta)) * sin(phi);
    const z = r * sin(theta);
    const value = TESLA_SEQUENCE[i];
    const color = digitAngleToCMYK(value, (i * 120) % 360);
    data.push({ x, y, z, value, color });
  }
  return data;
}

/**
 * Analytic/5D overlay: Returns node data with extra analytic/metaphysical dimensions (e.g., resonance, event count).
 */
export function getTeslaCoilAnalyticOverlayData(events: Array<{ value: number; timestamp: number }>): Array<{ value: number; color: { c: number; m: number; y: number; k: number }; resonance: number; eventCount: number; html: string; polarity: number; spin: number }> {
  const N = 3;
  const now = Date.now();
  return TESLA_SEQUENCE.slice(0, N).map((value, i) => {
    const polarity = teslaPolarity(i);
    const spin = polarity;
    const color = digitAngleToCMYK(value, (i * 120) % 360);
    const eventCount = events.filter(e => e.value === value).length;
    const resonance = eventCount > 0 ? min(1, (now - events.filter(e => e.value === value).slice(-1)[0]?.timestamp) / 10000) : 0;
    const html = `<div style="width:48px;height:48px;background:${cmykToCss(color)};display:flex;align-items:center;justify-content:center;font-size:1.2em;color:#fff;border-radius:10px;box-shadow:0 0 ${8 + 24 * resonance}px #0ff;">${value}<br><span style='font-size:0.7em;'>${eventCount}</span></div>`;
    return { value, color, resonance, eventCount, html, polarity, spin };
  });
}

/**
 * Metaphysical meaning: The Tesla coil is the trinity of creation, harmony, and completion.
 */
export const teslaCoilMetaphysics =
  'The Tesla coil is the trinity of creation, harmony, and completion. Every node is a pulse, every cycle a proof of living resonance.';

/**
 * Blockchain event logger for Tesla coil overlay interactions.
 * Call this with the node index, view, and context to log to the blockchain.
 */
export function logTeslaCoilEvent(blockchain: A432BlockChain, node: number, view: '2D' | '3D' | 'analytic', context: Record<string, unknown>) {
  const polarity = teslaPolarity(node);
  const spin = polarity;
  // recordEvent is a FREE function taking the chain, not a method on it, so
// `blockchain?.recordEvent?.(...)` short-circuited on undefined and this
// logged nothing — in all five overlay loggers, on every call.
  recordEvent(blockchain, 'teslaCoilOverlay', 'A432UI', { node, view, polarity, spin, ...context, timestamp: Date.now() });
} 