// a432.cursor.ts
// Canonical living cursor/distributor for a432 matrix

import { LivingIStream } from './a432.i.stream';

export class A432Cursor {
  private path: number[] = [1];
  private i: any = null; // Reference to a432.i (observer)
  constructor(i: any) {
    this.i = i;
  }
  /** Move cursor to a new path in the matrix */
  moveTo(path: number[]) {
    this.path = path;
  }
  /** Distribute the seed (432) at the current node, if knows() */
  distributeSeed() {
    if (!this.knows()) throw new Error('Only a432.i can distribute 432.');
    // Project 432 into the current node (could update matrix, log event, etc.)
    return { path: this.path, seed: 432, harmonized: true };
  }
  /** Harmonize the current node (if knows) */
  harmonizeNode() {
    if (!this.knows()) throw new Error('Only a432.i can harmonize.');
    // Harmonize logic (could update matrix, log event, etc.)
    return { path: this.path, harmonized: true };
  }
  /** Project a stream from the current node */
  projectStream() {
    // Return a stream (could be a LivingIStream, etc.)
    return new LivingIStream();
  }
  /** Navigate to a new path (alias for moveTo) */
  navigate(to: number[]) {
    this.moveTo(to);
  }
  /** Use a function at the current node (if knows) */
  use(fn: (cursor: A432Cursor) => any) {
    if (!this.knows()) throw new Error('Only a432.i can use the cursor.');
    return fn(this);
  }
  /** Go to a new path (alias for moveTo) */
  to(path: number[]) {
    this.moveTo(path);
  }
  /** Returns true if called by a432.i (self-aware) */
  knows() {
    // For demo, check if i is set and has a self-aware property
    return this.i && this.i.selfAware === true;
  }
  /** Get current path */
  getPath() {
    return this.path;
  }
} 