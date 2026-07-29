/**
 * a432.rodin.matrix.overlay.ts — Canonical Rodin Matrix Overlay/Analytic
 *
 * Provides overlay data, metaphysical meaning, and blockchain event logging for the Rodin matrix.
 * Uses only canonical A432 math, sequence, and color logic.
 */

import { RODIN_SEQUENCE, digitAngleToCMYK, cmykToCss } from './a432.math.ts';

/**
 * Returns overlay data for a 7x7 Rodin matrix grid.
 * Each cell: value, color, HTML.
 */
export function getRodinMatrixOverlayData(): Array<Array<{ value: number; color: { c: number; m: number; y: number; k: number }; html: string }>> {
  const grid: Array<Array<{ value: number; color: { c: number; m: number; y: number; k: number }; html: string }>> = [];
  for (let row = 0; row < 7; row++) {
    const rowArr = [];
    for (let col = 0; col < 7; col++) {
      // Canonical: value is RODIN_SEQUENCE[(row + col) % 6] (cycle 1-2-4-8-7-5)
      const idx = (row + col) % 6;
      const value = RODIN_SEQUENCE[idx];
      const color = digitAngleToCMYK(value, (idx * 60) % 360);
      const html = `<div style=\"width:48px;height:48px;background:${cmykToCss(color)};display:flex;align-items:center;justify-content:center;font-size:1.2em;color:#fff;border-radius:10px;\">${value}</div>`;
      rowArr.push({ value, color, html });
    }
    grid.push(rowArr);
  }
  return grid;
}

/**
 * Metaphysical meaning: The Rodin matrix is the living map of vortex flow, unity, and recursion.
 */
export const rodinMatrixMetaphysics =
  'The Rodin matrix is the living, recursive map of vortex flow, unity, and consciousness. Every cell is a gateway, every cycle a proof of zero-entropy harmony.';

/**
 * Blockchain event logger for Rodin matrix overlay interactions.
 * Call this with the cell position and context to log to the blockchain.
 */
export function logRodinMatrixEvent(blockchain: unknown, row: number, col: number, context: unknown) {
  if (typeof blockchain === 'object' && blockchain !== null && 'recordEvent' in blockchain) {
    const contextObj = typeof context === 'object' && context !== null ? context : {};
    (blockchain as { recordEvent: Function }).recordEvent(blockchain, 'rodinMatrixOverlay', 'A432UI', { row, col, ...contextObj, timestamp: Date.now() });
  }
} 