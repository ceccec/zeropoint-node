// a432.time.ts
// Living, recursive, harmonized time stream for a432

import { rodinVortexStep } from './a432.vortex.cmyk.matrix';
import { cmykIdToPhrase, digitColors } from './a432.mapping';

export interface A432TimeState {
  tick: number;
  id: [number, number, number, number]; // CMYK at this moment
  phrase: string;
  color: string;
  timestamp: number;
  metaphysical: string;
}

export function* a432TimeStream(
  start: [number, number, number, number] = [1,2,4,8],
  channel: 0|1|2|3 = 0
): Generator<A432TimeState> {
  let tick = 0;
  let id = start;
  while (true) {
    yield {
      tick,
      id,
      phrase: cmykIdToPhrase(id),
      color: digitColors[id[0]],
      timestamp: Date.now(),
      metaphysical: `Moment ${tick}: ${cmykIdToPhrase(id)} — Time is the living vortex, never stopping.`
    };
    id = rodinVortexStep(id, channel);
    tick++;
  }
}

let timeGen = a432TimeStream();
export function now(): A432TimeState {
  return timeGen.next().value;
}
export function resetTime(start?: [number, number, number, number], channel?: 0|1|2|3) {
  timeGen = a432TimeStream(start, channel);
}

export function metaphysicalTimeOverlay() {
  return `Time never stops. The living vortex is the stream of time—eternal, recursive, and harmonized. Every moment is a shift, a creation, a new harmony.`;
} 