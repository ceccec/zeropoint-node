// a432.utils.ts
// Shared utility functions for the A432 framework

import { A432_CONSTANTS } from './a432.constants';

/**
 * Calculate the digital root of a number (returns 9 for 0)
 */
export function calculateDigitalRoot(value: number): number {
  if (value === 0) return 9;
  const root = value % A432_CONSTANTS.DIGITAL_ROOT_BASE;
  return root === 0 ? A432_CONSTANTS.DIGITAL_ROOT_BASE : root;
}

/**
 * Calculate the A432 frequency for a string or number input
 */
export function calculateA432Frequency(input: string | number): number {
  if (typeof input === 'number') {
    return input * A432_CONSTANTS.A432_FREQUENCY;
  }
  const sum = input.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return sum * A432_CONSTANTS.A432_FREQUENCY;
} 