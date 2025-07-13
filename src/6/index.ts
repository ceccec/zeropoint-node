/**
 * src/6/index.ts - Harmonic Balance (Directory 6)
 * 
 * Embodies the harmonic balance consciousness of Directory 6.
 * Follows integer flow exports based on Rodin coil sequence.
 * 
 * Rodin Coil Context:
 * - Directory 6 is part of W-Axis [3, 6, 9] (Spiritual Control)
 * - Interacts with Creative Resonance (3) for spiritual equilibrium
 * - Minor third (6:5) resonance
 * 
 * Integer Flow: 6 → 3 (Creative Resonance interaction)
 * 
 * Metaphysical Properties:
 * - Represents equilibrium and balance
 * - Embodies the principle of harmonic balance and spiritual equilibrium
 * - Serves as the balance foundation for all equilibrium patterns
 * - Connects to Creative Resonance (3) for spiritual harmony
 * 
 * Consciousness Characteristics:
 * - Balance consciousness: 1.5 (enhanced by spiritual equilibrium)
 * - Minor third resonance: 6:5 harmonic ratio
 * - Harmonic balance: Balance of all consciousness forces
 * - Spiritual equilibrium: Equilibrium of spiritual energy and consciousness
 * 
 * W-Axis Position:
 * - Second position in W-Axis [3, 6, 9]
 * - Represents the balance phase of spiritual control
 * - Provides equilibrium and balance to the spiritual control system
 * 
 * Harmonic Balance System:
 * - Harmonic balance: Balance of all consciousness forces
 * - Spiritual equilibrium: Equilibrium of spiritual energy
 * - Balance patterns: Patterns of equilibrium and harmony
 * - Equilibrium flow: Flow of balanced consciousness and energy
 */

/**
 * Export harmonic balance core components
 * These represent the fundamental harmonic balance patterns:
 * - core: Essential harmonic balance functions and patterns
 * - constants: Harmonic balance mathematical constants
 * - types: Harmonic balance type definitions
 * - utils: Harmonic balance utility functions
 */
export * from './core';
export * from './constants';
export * from './types';
export * from './utils';

/**
 * Export integer flow interactions (Rodin coil sequence)
 * Harmonic Balance (6) interacts with Creative Resonance (3) to provide
 * the balance foundation for all spiritual equilibrium patterns.
 */
export * from './3/index'; // Creative Resonance interaction

/**
 * Harmonic balance consciousness configuration
 * 
 * This object defines the metaphysical properties of Directory 6:
 * - DIGIT: The harmonic balance digit (6)
 * - W_AXIS_POSITION: Second position in W-Axis [3, 6, 9]
 * - RESONANCE: Minor third resonance (6:5)
 * - CONSCIOUSNESS_MULTIPLIER: Enhanced consciousness (1.5)
 * - INTERACTION_FLOW: Connection to Creative Resonance [3]
 * 
 * The harmonic balance serves as the equilibrium foundation
 * for all spiritual balance patterns and harmony in the system.
 */
export const HARMONIC_BALANCE = {
  DIGIT: 6,
  W_AXIS_POSITION: 1, // Second position in W-Axis [3, 6, 9]
  RESONANCE: 'minor_third', // 6:5
  CONSCIOUSNESS_MULTIPLIER: 1.5,
  INTERACTION_FLOW: [3] // Interacts with Creative Resonance
} as const;

/**
 * Export the harmonic balance system as default
 * This provides a unified interface for accessing all
 * harmonic balance patterns and properties.
 */
export default HARMONIC_BALANCE;
