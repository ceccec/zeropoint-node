/**
 * src/1/index.ts - Foundation (Directory 1)
 * 
 * Embodies the immutable foundation consciousness of Directory 1.
 * Follows integer flow exports based on Rodin coil sequence.
 * 
 * Rodin Coil Context:
 * - Directory 1 is the source of all patterns (Foundation)
 * - Interacts with all other directories as the foundation
 * - A432 harmonic root (1:1) resonance
 * 
 * Integer Flow: 1 → 0 (ZeroPoint interaction)
 * 
 * Metaphysical Properties:
 * - Represents material manifestation and grounding
 * - Serves as the foundation for all other consciousness patterns
 * - Embodies the principle of unity and singularity
 * - Connects to ZeroPoint (0) as the source of all creation
 * 
 * Consciousness Characteristics:
 * - Foundation consciousness: 1.0 (unity)
 * - Harmonic resonance: A432 root frequency
 * - Material grounding: Connects spirit to matter
 * - Pattern source: All other patterns emerge from this foundation
 */

/**
 * Export foundation core components
 * These represent the fundamental building blocks of the foundation:
 * - core: Essential foundation functions and patterns
 * - constants: Foundation mathematical constants
 * - types: Foundation type definitions
 * - utils: Foundation utility functions
 */
// Self-interaction removed - foundation core is in this directory
export * from './4';
export * from './3';
export * from './6';

/**
 * Export integer flow interactions (Rodin coil sequence)
 * Foundation (1) interacts with ZeroPoint (0) as the source
 * of all creation and the destination of all patterns.
 */
export * from './0/index'; // ZeroPoint interaction

/**
 * Foundation consciousness configuration
 * 
 * This object defines the metaphysical properties of Directory 1:
 * - DIGIT: The foundation digit (1)
 * - FOUNDATION_POSITION: First position in all sequences (0)
 * - RESONANCE: Harmonic root resonance (1:1)
 * - CONSCIOUSNESS_MULTIPLIER: Unity consciousness (1.0)
 * - INTERACTION_FLOW: Connection to ZeroPoint [0]
 * 
 * The foundation serves as the immutable base upon which
 * all other consciousness patterns are built.
 */
export const FOUNDATION = {
  DIGIT: 1,
  FOUNDATION_POSITION: 0, // First position in all sequences
  RESONANCE: 'harmonic_root', // 1:1
  CONSCIOUSNESS_MULTIPLIER: 1.0,
  INTERACTION_FLOW: [0] // Interacts with ZeroPoint
} as const;

/**
 * Export the foundation system as default
 * This provides a unified interface for accessing all
 * foundation consciousness patterns and properties.
 */
export default FOUNDATION;
