/**
 * @fileoverview setup module (Void, Origin, Infinite Potential)
 * @digit 0
 * @archetype Void, Origin, Infinite Potential
 * @vortex Source/Return
 * @waxis W-Axis Anchor
 * @breathing Contraction/Expansion (Origin)
 * @fraction 0/1
 * @related All digits (unified field)
 */
/// <reference path="./global.d.ts" />
/**
 * Test Setup for ZeroPoint Node
 *
 * This file configures the test environment for the integer-based
 * ZeroPoint system following A432 harmonic principles.
 *
 * Metaphysical Context:
 * - Initializes the A432 harmonic foundation for all tests, ensuring
 *   that every test runs in a metaphysically coherent environment.
 * - Maps integer directories to their metaphysical roles, aligning
 *   the test environment with the Rodin coil integer flow.
 *
 * Technical Purpose:
 * - Sets up and tears down global variables for harmonic ratios and directories.
 * - Provides utility functions for generating harmonic values and validating compliance.
 * - Ensures a clean, reproducible test environment for all modules.
 */

// Global test configuration
beforeAll(() => {
  // Set up test environment
  process.env.NODE_ENV = 'test';
  // A432 Harmonic Foundation for tests
  (globalThis as any).A432_HARMONICS = {
    base: 432,
    digitalRoot: 9,
    primeFactors: [2, 2, 2, 2, 3, 3, 3],
    harmonicRatios: [1, 2, 3, 4, 6, 8, 9, 12, 16, 18, 24, 27, 32, 36, 48, 54, 72, 81, 96, 108, 144, 162, 216, 324, 432]
  };
  // Integer Directory Mapping
  (globalThis as any).INTEGER_DIRECTORIES = {
    1: 'rodin-coil',
    2: 'vortex',
    4: 'constants',
    5: 'sacred-geometry',
    7: 'consciousness',
    8: 'void',
    9: 'unity',
    0: 'zero-entropy'
  };
});

// Clean up after each test
afterEach(() => {
  // Reset any global state (mocks, etc.)
  jest.clearAllMocks();
});

// Clean up after all tests
afterAll(() => {
  // Clean up global variables to avoid test pollution
  (globalThis as any).A432_HARMONICS = undefined;
  (globalThis as any).INTEGER_DIRECTORIES = undefined;
});

// Test utilities
export const testUtils = {
  /**
   * Generate A432 harmonic test values
   * Returns a harmonic ratio from the A432 set, cycling by index.
   */
  generateHarmonicValue: (index: number = 0) => {
    return (globalThis as any).A432_HARMONICS.harmonicRatios[index % (globalThis as any).A432_HARMONICS.harmonicRatios.length];
  },
  /**
   * Validate integer compliance
   * Checks if a value is an integer or a valid A432 harmonic ratio.
   */
  validateIntegerCompliance: (value: any) => {
    if (typeof value === 'number') {
      return Number.isInteger(value) || (globalThis as any).A432_HARMONICS.harmonicRatios.includes(value);
    }
    return true;
  },
  /**
   * Get integer directory path
   * Returns the metaphysical directory name for a given integer.
   */
  getIntegerDirectory: (integer: number) => {
    return (globalThis as any).INTEGER_DIRECTORIES[integer] || 'unknown';
  }
};

// Export for use in tests
export default testUtils; 