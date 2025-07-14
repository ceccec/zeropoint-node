/**
 * Global Type Definitions for ZeroPoint Node
 *
 * This file declares global variables for the A432 harmonic system and
 * integer directory mapping, ensuring type safety and metaphysical coherence
 * throughout the ZeroPoint integer-based system.
 */

declare global {
  var A432_HARMONICS: {
    base: number;
    digitalRoot: number;
    primeFactors: number[];
    harmonicRatios: number[];
  };
  var INTEGER_DIRECTORIES: { [key: number]: string };
}

export {}; 