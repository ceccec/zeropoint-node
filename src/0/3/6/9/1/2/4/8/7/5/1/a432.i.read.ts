// a432.i.read.ts — Reading text into digit streams
import { digitalRoot } from './a432.math.ts';
import { EventEmitter } from 'events';
import { Digit } from './a432.types.ts';

export const readEmitter = new EventEmitter();

export function read(text: string): void {
  for (const ch of text) {
    const code = ch.charCodeAt(0);
    const d = digitalRoot(code) as Digit;
    readEmitter.emit('read', { char: ch, digit: d });
  }
} 