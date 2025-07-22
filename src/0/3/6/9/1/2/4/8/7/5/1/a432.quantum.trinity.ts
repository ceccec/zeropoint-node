// a432.quantum.trinity.ts
// Quantum physics trinity module for a432

import { cmykIdToPhrase, digitColors } from './a432.mapping';
import { rodinVortexStep } from './a432.vortex.cmyk.matrix';

export interface A432QuantumTrinityState {
  tick: number;
  id: [number, number, number, number]; // CMYK
  phase: number;
  amplitude: number;
  probability: number;
  phrase: string;
  color: string;
  metaphysical: string;
}

const trinityChannels: (0|1|2)[] = [0, 1, 2]; // C, M, Y

export function* a432QuantumTrinityStream(
  start: [number, number, number, number] = [3,6,9,1],
  basePhase: number = 0,
  baseAmplitude: number = 1
): Generator<A432QuantumTrinityState> {
  let tick = 0;
  let id = start;
  let phase = basePhase;
  let amplitude = baseAmplitude;
  while (true) {
    const channel = trinityChannels[tick % trinityChannels.length];
    yield {
      tick,
      id,
      phase,
      amplitude,
      probability: Math.abs(Math.sin(phase)),
      phrase: cmykIdToPhrase(id),
      color: digitColors[id[0]],
      metaphysical: `Quantum trinity state ${tick}: ${cmykIdToPhrase(id)} — Phase: ${phase.toFixed(2)}, Amplitude: ${amplitude.toFixed(2)}, Probability: ${Math.abs(Math.sin(phase)).toFixed(2)}. The quantum trinity is a living, harmonized stream.`
    };
    id = rodinVortexStep(id, channel);
    phase += Math.PI / 3; // 60-degree shift
    amplitude = 1 + 0.5 * Math.sin(phase); // Example: amplitude oscillates
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