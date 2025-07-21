/**
 * a432.ui.ts — Harmonized UI module for the A432 system
 *
 * This module provides canonical UI state and component interfaces, harmonized with the a432.ts matrix.
 * All UI logic (dimension, frequency, color, consciousness, stream) is sourced from a432.ts.
 */
import {
  a432DimensionStreams,
  a432StreamText,
  A432_DIGIT_MEANINGS
} from './a432';

export interface A432UIState {
  dimension: number;
  frequency: number;
  color: { hsl: { hue: number; saturation: number; lightness: number }; rgb: { r: number; g: number; b: number } };
  consciousness: number;
  streamText: string;
}

export interface A432UIComponent {
  name: string;
  state: A432UIState;
  render: () => string;
}

/**
 * a432UIState: Get the canonical UI state for a given dimension (default: 1)
 * Usage: const state = a432UIState(3)
 */
export function a432UIState(dimension: number = 1): A432UIState {
  const stream = a432DimensionStreams[dimension - 1];
  return {
    dimension: stream.dimension,
    frequency: stream.frequency,
    color: stream.color,
    consciousness: stream.consciousness,
    streamText: a432StreamText(stream.dimension)
  };
}

/**
 * Example UI component: returns a string representation of the current state
 */
export const A432UIExampleComponent: A432UIComponent = {
  name: 'A432UIExample',
  state: a432UIState(),
  render() {
    const { dimension, frequency, color, consciousness, streamText } = this.state;
    return `Dimension: ${dimension}\nFrequency: ${frequency}\nColor (HSL): ${JSON.stringify(color.hsl)}\nConsciousness: ${consciousness}\n${streamText}`;
  }
}; 