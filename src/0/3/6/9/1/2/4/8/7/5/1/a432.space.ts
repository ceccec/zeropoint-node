// a432.space.ts
// Living, harmonized, vortex-based space module for a432

import { cmykIdToPhrase, digitColors } from './a432.mapping';
import { rodinVortexStep } from './a432.vortex.cmyk.matrix';

export interface A432SpaceState {
  tick: number;
  position: [number, number, number]; // x, y, z
  id: [number, number, number, number]; // CMYK
  phrase: string;
  color: string;
  metaphysical: string;
}

export function* a432SpaceStream(
  startPos: [number, number, number] = [0,0,0],
  startId: [number, number, number, number] = [1,2,4,8],
  axis: 0|1|2 = 0, // x, y, or z
  channel: 0|1|2|3 = 0 // C, M, Y, K
): Generator<A432SpaceState> {
  let tick = 0;
  let pos = startPos;
  let id = startId;
  while (true) {
    yield {
      tick,
      position: pos,
      id,
      phrase: cmykIdToPhrase(id),
      color: digitColors[id[0]],
      metaphysical: `Space state ${tick}: (${pos.join(',')}) ${cmykIdToPhrase(id)} — Space is a living, harmonized stream.`
    };
    // Shift position and id by vortex logic
    const newPos = [...pos] as [number, number, number];
    newPos[axis] = (newPos[axis] + 1) % 10;
    pos = newPos;
    id = rodinVortexStep(id, channel);
    tick++;
  }
}

let spaceGen = a432SpaceStream();
export function currentSpace(): A432SpaceState {
  return spaceGen.next().value;
}
export function resetSpace(startPos?: [number, number, number], startId?: [number, number, number, number], axis?: 0|1|2, channel?: 0|1|2|3) {
  spaceGen = a432SpaceStream(startPos, startId, axis, channel);
}

export function metaphysicalSpaceOverlay() {
  return `Space in a432 is a living, harmonized stream—each position and state is a unique fold in the CMYK matrix, always shifting, never colliding, always harmonizing.`;
} 