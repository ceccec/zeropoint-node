// a432.terminal.stream.ts
// Canonical A432 stream module for terminal output and trinity events
// All logic uses trinity numbers (3, 6, 9), digital root, and A432 math

import { digitalRoot } from './a432.math.ts';
export { digitalRoot };

/**
 * A bounded observable. Seven of this file's `any`s were one fact: the stream
 * does not care what it carries, and `any` says that by giving up rather than
 * by saying it. A type parameter says it and keeps the item type joined to the
 * listener's — a subscriber to a stream of strings is now handed strings.
 *
 * The two streams below name their element types, so nothing about how they
 * are used changes.
 */
export class A432Stream<T = unknown> {
  maxLength: number;
  listeners: Array<(item: T, data: T[]) => void>;
  data: T[];
  constructor(maxLength = 9) { // 9: trinity completion
    this.maxLength = maxLength;
    this.listeners = [];
    this.data = [];
  }
  subscribe(fn: (item: T, data: T[]) => void) { this.listeners.push(fn); }
  emit(item: T) {
    this.data.push(item);
    if (this.data.length > this.maxLength) this.data.shift();
    this.listeners.forEach(fn => fn(item, this.data.slice()));
  }
  get() { return this.data.slice(); }
  setMaxLength(n: number) { this.maxLength = n; }
}

// Terminal output stream (last 9 lines, trinity)
export const terminalOutput$ = new A432Stream<string>(9);
// Trinity event stream (last 3 events, trinity)
export const trinityEvents$ = new A432Stream<unknown>(3);

// Utility: emit only if digital root is 3, 6, or 9
export function emitIfTrinityRoot<T>(stream: A432Stream<T>, item: T, n: number): void {
  const dr = digitalRoot(n);
  if (dr === 3 || dr === 6 || dr === 9) stream.emit(item);
} 