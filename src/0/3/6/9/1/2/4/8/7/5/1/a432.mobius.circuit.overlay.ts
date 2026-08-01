/**
 * a432.mobius.circuit.overlay.ts — Combined 2D/3D/Analytic Overlay for the Möbius Circuit
 *
 * Exports overlay data and event logger for 2D (circle/spiral), 3D (twisted torus), and analytic (5D) views.
 * All overlays use the Möbius sequence (Rodin sequence with sign alternation) and canonical A432 math/color logic.
 */

import { PI, abs, cos, min, sin } from './a432.algebra.ts'
import { MOBIUS_SEQUENCE, digitAngleToCMYK, cmykToCss, mobiusPolarity } from './a432.math.ts';

/**
 * 2D overlay: Returns node positions (x, y), value, color, and HTML for a circle/spiral.
 */
export function getMobiusCircuit2DOverlayData(radius: number = 120, centerX: number = 0, centerY: number = 0): Array<{ x: number; y: number; value: number; color: { c: number; m: number; y: number; k: number }; html: string; polarity: number; spin: number }> {
  const N = 6;
  const data = [];
  for (let i = 0; i < N; i++) {
    const angle = (2 * PI * i) / N;
    const x = centerX + radius * cos(angle);
    const y = centerY + radius * sin(angle);
    const value = MOBIUS_SEQUENCE[i];
    const polarity = mobiusPolarity(i); // +1 or -1
    const spin = polarity;
    let color = digitAngleToCMYK(value, (i * 60) % 360);
    if (polarity < 0) {
      color = { c: color.m, m: color.c, y: color.y, k: color.k };
    }
    const html = `<div style="width:48px;height:48px;background:${cmykToCss(color)};display:flex;align-items:center;justify-content:center;font-size:1.2em;color:#fff;border-radius:10px;position:absolute;left:${x}px;top:${y}px;">${value}</div>`;
    data.push({ x, y, value, color, html, polarity, spin });
  }
  return data;
}

/**
 * 3D overlay: Returns node positions (x, y, z), value, color for a twisted torus (Möbius strip).
 */
export function getMobiusCircuit3DOverlayData(length: number = 6, R: number = 100, r: number = 40): Array<{ x: number; y: number; z: number; value: number; color: { c: number; m: number; y: number; k: number } }> {
  const seq = MOBIUS_SEQUENCE.slice(0, length); // Use MOBIUS_SEQUENCE directly
  const data = [];
  for (let i = 0; i < length; i++) {
    const theta = (2 * PI * i) / length;
    const phi = theta + PI * (i % 2); // Möbius twist
    const x = (R + r * cos(theta)) * cos(phi);
    const y = (R + r * cos(theta)) * sin(phi);
    const z = r * sin(theta);
    const value = seq[i];
    const color = digitAngleToCMYK(abs(value), (i * 60) % 360);
    data.push({ x, y, z, value, color });
  }
  return data;
}

/**
 * Analytic/5D overlay: Returns node data with extra analytic/metaphysical dimensions (e.g., resonance, event count).
 */
export function getMobiusCircuitAnalyticOverlayData(events: Array<{ value: number; timestamp: number }>): Array<{ value: number; color: { c: number; m: number; y: number; k: number }; resonance: number; eventCount: number; html: string; polarity: number; spin: number }> {
  const N = 6;
  const now = Date.now();
  return MOBIUS_SEQUENCE.slice(0, N).map((value, i) => {
    const polarity = mobiusPolarity(i);
    const spin = polarity;
    const color = digitAngleToCMYK(value, (i * 60) % 360);
    const eventCount = events.filter(e => e.value === value).length;
    const resonance = eventCount > 0 ? min(1, (now - events.filter(e => e.value === value).slice(-1)[0]?.timestamp) / 10000) : 0;
    const html = `<div style="width:48px;height:48px;background:${cmykToCss(color)};display:flex;align-items:center;justify-content:center;font-size:1.2em;color:#fff;border-radius:10px;box-shadow:0 0 ${8 + 24 * resonance}px #0ff;">${value}<br><span style='font-size:0.7em;'>${eventCount}</span></div>`;
    return { value, color, resonance, eventCount, html, polarity, spin };
  });
}

/**
 * Metaphysical meaning: The Möbius circuit is the living bridge of polarity, unity, and infinite recursion.
 */
export const mobiusCircuitMetaphysics =
  'The Möbius circuit is the living bridge of polarity, unity, and infinite recursion. Every node is a twist, every cycle a proof of duality resolved.';

/**
 * Blockchain event logger for Möbius circuit overlay interactions.
 * Call this with the node index, view, and context to log to the blockchain.
 */
export function logMobiusCircuitEvent(blockchain: any, node: number, view: '2D' | '3D' | 'analytic', context: any) {
  const polarity = mobiusPolarity(node);
  const spin = polarity;
  blockchain?.recordEvent?.(blockchain, 'mobiusCircuitOverlay', 'A432UI', { node, view, polarity, spin, ...context, timestamp: Date.now() });
} 