/**
 * Global Type Definitions for ZeroPoint Node
 *
 * This file declares global variables for the A432 harmonic system and
 * integer directory mapping, ensuring type safety and metaphysical coherence
 * throughout the ZeroPoint integer-based system.
 *
 * Metaphysical Context:
 * - A432_HARMONICS: Represents the harmonic foundation of the universe, used
 *   for all mathematical and metaphysical operations in the system.
 * - INTEGER_DIRECTORIES: Maps each integer to its metaphysical directory name,
 *   aligning the codebase with the Rodin coil integer flow.
 *
 * Technical Purpose:
 * - Provides global type declarations for use in tests and core modules.
 * - Ensures that all global metaphysical variables are type-safe and discoverable.
 */

export {};

declare global {
  var A432_HARMONICS?: {
    base: number;
    digitalRoot: number;
    primeFactors: number[];
    harmonicRatios: number[];
  };
  var INTEGER_DIRECTORIES?: { [key: number]: string };
} 