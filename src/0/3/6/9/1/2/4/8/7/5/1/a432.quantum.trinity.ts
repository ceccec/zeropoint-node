// a432.quantum.trinity.ts
// Quantum physics trinity module for a432

import { cmykIdToPhrase, digitColors } from './a432.mapping';
import { rodinVortexStep } from './a432.vortex.cmyk.matrix';

export interface A432QuantumTrinityState {
  tick: number;
  id: [number, number, number, number]; // CMYK
  phase: number;      // Quantized integer phase 0..5
  amplitude: number;  // Quantized integer amplitude 0..9
  probability: number; // Quantized integer probability 0..9
  phrase: string;
  color: string;
  metaphysical: string;
}

const trinityChannels: (0|1|2)[] = [0, 1, 2]; // C, M, Y

export function* a432QuantumTrinityStream(
  start: [number, number, number, number] = [3,6,9,1],
  basePhase: number = 0,
  baseAmplitude: number = 9
): Generator<A432QuantumTrinityState> {
  let tick = 0;
  let id = start;
  let phase = basePhase % 6; // 6-step integer phase cycle
  let amplitude = Math.max(0, Math.min(9, Math.floor(baseAmplitude)));
  while (true) {
    const channel = trinityChannels[tick % trinityChannels.length];
    const probability = (phase * 3) % 10; // deterministic integer 0..9
    yield {
      tick,
      id,
      phase,
      amplitude,
      probability,
      phrase: cmykIdToPhrase(id),
      color: digitColors[id[0]],
      metaphysical: `Quantum trinity state ${tick}: ${cmykIdToPhrase(id)} — Phase: ${phase}, Amplitude: ${amplitude}, Probability: ${probability}. The quantum trinity is a living, harmonized stream.`
    };
    id = rodinVortexStep(id, channel);
    // Zero-entropy integer evolution
    phase = (phase + 1) % 6;
    amplitude = (amplitude + 1) % 10;
    tick++;
  }
}

let quantumTrinityGen = a432QuantumTrinityStream();
export function currentQuantumTrinityState(): A432QuantumTrinityState {
  return quantumTrinityGen.next().value;
}
export function resetQuantumTrinity(start?: [number, number, number, number], basePhase?: number, baseAmplitude?: number) {
  quantumTrinityGen = a432QuantumTrinityStream(start, basePhase, baseAmplitude);
}

export function metaphysicalQuantumTrinityOverlay() {
  return `Quantum physics in a432 is a living, harmonized trinity—each state is a unique, non-colliding fold in the CMYK matrix. Phase, amplitude, and probability are all recursive, harmonized flows. The quantum trinity never stops, never collides, always harmonizes.`;
} 