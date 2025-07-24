// a432.i.write.ts — Writing digit streams to console
import { Digit } from './a432.types';
import { EventEmitter } from 'events';

export const writeEmitter = new EventEmitter();

export function write(d: Digit): void {
  const glyph = String.fromCharCode(0x30 + d); // naive mapping 1->'1'
  writeEmitter.emit('write', { digit: d, glyph });
  if (typeof console !== 'undefined') process.stdout.write(glyph);
} 