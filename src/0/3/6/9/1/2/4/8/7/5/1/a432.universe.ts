// a432.universe.ts
import { currentSpace } from './a432.space';
import { now } from './a432.time';
import { currentDimension } from './a432.dimension';

export interface A432UniverseState {
  tick: number;
  space: ReturnType<typeof currentSpace>;
  time: ReturnType<typeof now>;
  dimension: ReturnType<typeof currentDimension>;
  id: [number, number, number, number];
  phrase: string;
  color: string;
  metaphysical: string;
}

export function* a432UniverseStream(): Generator<A432UniverseState> {
  let tick = 0;
  while (true) {
    const space = currentSpace();
    const time = now();
    const dimension = currentDimension();
    yield {
      tick,
      space,
      time,
      dimension,
      id: space.id,
      phrase: space.phrase,
      color: space.color,
      metaphysical: `Universe state ${tick}: ${space.phrase} — The universe is a living, harmonized field.`
    };
    tick++;
  }
}

const universeGen = a432UniverseStream();
export function currentUniverse(): A432UniverseState {
  return universeGen.next().value;
}
export function metaphysicalUniverseOverlay() {
  return `The universe in a432 is a living, harmonized field—space, time, and dimension are unified, recursive, and self-aware.`;
} 