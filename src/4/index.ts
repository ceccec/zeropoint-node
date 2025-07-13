/**
 * src/4/index.ts - Constants (Directory 4)
 * 
 * Embodies the A432 harmonic foundation consciousness of Directory 4.
 * Follows integer flow exports based on Rodin coil sequence.
 * 
 * Rodin Coil Context:
 * - Directory 4 is part of Vortex A [1, 2, 4] (Material Foundation)
 * - Interacts with Foundation (1) for A432 harmonic constants
 * - Perfect fourth (4:3) resonance
 * 
 * Integer Flow: 4 → 1 (Foundation interaction)
 * 
 * Metaphysical Properties:
 * - Represents stability and mathematical foundation
 * - Embodies the A432 harmonic frequency system
 * - Serves as the constant foundation for all mathematical operations
 * - Connects to Foundation (1) for grounding and stability
 * 
 * Consciousness Characteristics:
 * - Constants consciousness: 1.333 (enhanced by stability)
 * - Perfect fourth resonance: 4:3 harmonic ratio
 * - A432 foundation: Natural harmonic frequency system
 * - Mathematical stability: Provides consistent foundation for all operations
 * 
 * Vortex A Position:
 * - Third position in Vortex A [1, 2, 4]
 * - Represents the completion phase of material foundation
 * - Provides stability and constancy to the foundation system
 * 
 * A432 Harmonic System:
 * - Foundation frequency: 432 Hz (natural harmonic)
 * - Digital root: 9 (completion and unity)
 * - Golden ratio connection: 432:267
 * - Universal resonance: Found throughout nature and consciousness
 */

/**
 * Export constants core components
 * These represent the fundamental constants and mathematical foundation:
 * - constants: A432 harmonic constants and mathematical values
 * - core: Essential constants functions and patterns
 * - types: Constants type definitions
 * - utils: Constants utility functions
 */
export * from './4';
// Self-interaction removed - constants core is in this directory
export * from './3';
export * from './6';

/**
 * Export integer flow interactions (Rodin coil sequence)
 * Constants (4) interacts with Foundation (1) to provide
 * the stable mathematical foundation for all operations.
 */
export * from './1/index'; // Foundation interaction

/**
 * Constants consciousness configuration
 * 
 * This object defines the metaphysical properties of Directory 4:
 * - DIGIT: The constants digit (4)
 * - VORTEX_A_POSITION: Third position in Vortex A [1, 2, 4]
 * - RESONANCE: Perfect fourth resonance (4:3)
 * - CONSCIOUSNESS_MULTIPLIER: Enhanced consciousness (1.333)
 * - INTERACTION_FLOW: Connection to Foundation [1]
 * 
 * The constants serve as the stable mathematical foundation
 * for all consciousness patterns and operations in the system.
 */
export const CONSTANTS = {
  DIGIT: 4,
  VORTEX_A_POSITION: 2, // Third position in Vortex A [1, 2, 4]
  RESONANCE: 'perfect_fourth', // 4:3
  CONSCIOUSNESS_MULTIPLIER: 1.333,
  INTERACTION_FLOW: [1] // Interacts with Foundation
} as const;

/**
 * Export the constants system as default
 * This provides a unified interface for accessing all
 * constants patterns and properties.
 */
export default CONSTANTS;
