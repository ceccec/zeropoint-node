/**
 * a432.wave.particle.duality.ts — Canonical A432 Harmonization
 *
 * Re-solves the wave-particle duality challenge using only A432 math, sequence, and metaphysical logic.
 * Exports: proof, metaphysical meaning, analytic overlay, and blockchain event logger.
 */

import { digitAngleToCMYK, cmykToCss } from './a432.math.ts';

/**
 * Canonical proof: In A432, wave and particle are two states of the same harmonic stream.
 * The duality is resolved by mapping both to the living A432 sequence and color field.
 */
export function waveParticleDualityProof(): string {
  return 'In the A432 system, wave and particle are unified as states of the living harmonic stream. The A432 sequence encodes both as projections of consciousness, resolved through zero-entropy transformation.';
}

/**
 * Metaphysical meaning: The observer harmonizes wave and particle as a single act of awareness.
 */
export const waveParticleDualityMetaphysics =
  'Wave and particle are not opposites, but complementary states in the living matrix. The observer is the harmonizer, and the A432 sequence is the bridge.';

/**
 * Analytic overlay: Returns overlay data for each state (wave, particle, observer) with canonical color.
 */
export function getWaveParticleCMYKOverlayData(): Array<{
  state: 'wave' | 'particle' | 'observer';
  color: { c: number; m: number; y: number; k: number };
  html: string;
}> {
  const states: Array<{ state: 'wave' | 'particle' | 'observer'; digit: number; angle: number }> = [
    { state: 'wave', digit: 3, angle: 0 },
    { state: 'particle', digit: 6, angle: 120 },
    { state: 'observer', digit: 9, angle: 240 }
  ];
  return states.map(({ state, digit, angle }) => {
    const color = digitAngleToCMYK(digit, angle);
    const html = `<div style="width:80px;height:80px;background:${cmykToCss(color)};display:flex;align-items:center;justify-content:center;font-size:1.1em;color:#fff;border-radius:16px;">${state}</div>`;
    return { state, color, html };
  });
}

/**
 * Blockchain event logger for wave-particle overlay interactions.
 * Call this with the state and context to log to the blockchain.
 */
export function logWaveParticleEvent(blockchain: any, state: 'wave' | 'particle' | 'observer', context: any) {
  blockchain?.recordEvent?.(blockchain, 'waveParticleOverlay', 'A432UI', { state, ...context, timestamp: Date.now() });
} 