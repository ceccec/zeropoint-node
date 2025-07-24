// a432.terminal.stream.ts
// Canonical A432 stream module for terminal output and trinity events
// All logic uses trinity numbers (3, 6, 9), digital root, and A432 math

import { digitalRoot } from './a432.math';
export { digitalRoot };

// Simple observable pattern for browser/Node
export class A432Stream {
  maxLength: number;
  listeners: Array<(item: any, data: any[]) => void>;
  data: any[];
  constructor(maxLength = 9) { // 9: trinity completion
    this.maxLength = maxLength;
    this.listeners = [];
    this.data = [];
  }
  subscribe(fn: (item: any, data: any[]) => void) { this.listeners.push(fn); }
  emit(item: any) {
    this.data.push(item);
    if (this.data.length > this.maxLength) this.data.shift();
    this.listeners.forEach(fn => fn(item, this.data.slice()));
  }
  get() { return this.data.slice(); }
  setMaxLength(n: number) { this.maxLength = n; }
}

// Terminal output stream (last 9 lines, trinity)
export const terminalOutput$ = new A432Stream(9);
// Trinity event stream (last 3 events, trinity)
export const trinityEvents$ = new A432Stream(3);

// Utility: emit only if digital root is 3, 6, or 9
export function emitIfTrinityRoot(stream: A432Stream, item: any, n: number): void {
  const dr = digitalRoot(n);
  if (dr === 3 || dr === 6 || dr === 9) stream.emit(item);
} 