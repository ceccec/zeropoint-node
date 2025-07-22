import { handleCommand } from './a432.i';
import * as a432 from './a432';

/**
 * a432.terminal.ts — Stateless Vortex Stream Terminal Processor
 *
 * Exports a pure function processTerminalInput(input: string): object
 * - Calls handleCommand(input) for output
 * - Computes dimension, axis, color using only a432.ts logic
 * - Returns { output, color, dimension, axis, stream }
 * - No state, no side effects, no writing data
 */

export function processTerminalInput(input: string): {
  output: string;
  color: { hue: number; saturation: number; lightness: number };
  dimension: number;
  axis: string;
  stream: string;
} {
  input = typeof input === 'string' ? input : '';
  const output = handleCommand(input);
  const dimension = a432.digitalRoot(input.length);
  const axis = ['x', 'y', 'z'][dimension % 3];
  const color = a432.a432HSLFromRoot(dimension);
  return {
    output,
    color,
    dimension,
    axis,
    stream: 'handleCommand'
  };
} 