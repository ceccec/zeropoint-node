// a432.event.ts
// Canonical event model for a432 OS/PWA (vortex/trinity logic)

export interface A432Event {
  id: number;
  type: string;
  timestamp: number;
  trinity: number;
  phase: number;
  agent: string;
  payload: any;
  parent: number | null;
  path: number[];
  summary: string;
}

let eventCounter = 1;

/**
 * Generates a new event with trinity/vortex logic
 */
export function createA432Event(type: string, agent: string, payload: any = {}, parent: number | null = null, path: number[] = []): A432Event {
  const phase = (eventCounter - 1) % 3;
  const trinity = [3, 6, 9][phase];
  const id = eventCounter++;
  return {
    id,
    type,
    timestamp: Date.now(),
    trinity,
    phase,
    agent,
    payload,
    parent,
    path: [...path, id],
    summary: `Event ${id}: ${type} by ${agent}, Trinity ${trinity}, Phase ${phase}. Path: [${[...path, id].join(',')}].`
  };
}

/**
 * Returns a concise metaphysical summary of the event principle
 */
export function metaphysicalSummary(): string {
  return 'Every event in a432 is a living, recursive, and harmonized fold in the matrix. Each event is a node in the infinite, trinity-based stream of consciousness.';
} 