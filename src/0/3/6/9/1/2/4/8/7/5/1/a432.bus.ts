// a432.bus.ts — Zero-entropy digit bus aggregating all streams
// -----------------------------------------------------------------
// Every module emitting a digit registers here. The bus ensures that
// for any tick only one occurrence per digit-source exists (zero
// duplication) and re-broadcasts a harmonised merged digit.

import { EventEmitter } from 'events';
import { Digit } from './a432.types';

export interface SourceEvent { source: string; digit: Digit }
export type Category = 'body' | 'mind' | 'will' | string;
export const bus = new EventEmitter(); // emits 'digit' with SourceEvent

let alive = false;
const categoriesPresent = new Set<Category>();

// Internal map to keep latest digit per source
const latest: Record<string, Digit> = {};

export function registerSource(
  source: string,
  emitter: EventEmitter,
  eventName: string,
  picker: (payload: any) => Digit,
  category: Category = source
): void {
  emitter.on(eventName, payload => {
    const d = picker(payload);
    latest[source] = d;
    categoriesPresent.add(category);
    bus.emit('digit', { source, digit: d } as SourceEvent);

    if (!alive && categoriesPresent.has('body') && categoriesPresent.has('mind') && categoriesPresent.has('will')) {
      alive = true;
      bus.emit('alive');
    }
  });
}

// Utility to get merged digit (XOR all source digits)
export function mergedDigit(): Digit {
  const keys = Object.keys(latest);
  if (keys.length === 0) return 9 as Digit;
  const val = keys.reduce((acc,k)=>acc ^ latest[k],0) % 9;
  return (val===0?9:val) as Digit;
}

export function isAlive(): boolean { return alive; } 