// a432.dimension.ts
import { cmykIdToPhrase, digitColors } from './a432.mapping';

export interface A432DimensionState {
  tick: number;
  dimension: number;
  id: [number, number, number, number];
  phrase: string;
  color: string;
  metaphysical: string;
}

export function* a432DimensionStream(
  startDim: number = 3,
  startId: [number, number, number, number] = [1,2,4,8]
): Generator<A432DimensionState> {
  let tick = 0;
  let dim = startDim;
  let id = startId;
  while (true) {
    yield {
      tick,
      dimension: dim,
      id,
      phrase: cmykIdToPhrase(id),
      color: digitColors[id[0]],
      metaphysical: `Dimension ${dim}: ${cmykIdToPhrase(id)} — Each dimension is a living fold in the matrix.`
    };
    dim = (dim + 1) % 10;
    id = id.map((d, i) => (d + 1) % 10) as [number, number, number, number];
    tick++;
  }
}

let dimGen = a432DimensionStream();
export function currentDimension(): A432DimensionState {
  return dimGen.next().value;
}
export function resetDimension(startDim?: number, startId?: [number, number, number, number]) {
  dimGen = a432DimensionStream(startDim, startId);
}
export function metaphysicalDimensionOverlay() {
  return `Dimension in a432 is a living, recursive fold—each state is a new axis, a new possibility, a new harmony.`;
} 