/**
 * 🌌 Directory 0 Types - Zero Entropy Type Definitions
 *
 * This module contains type definitions for the zero entropy state of the
 * ZeroPoint system. These types represent the metaphysical foundation of
 * pure potential, infinite possibility, and perfect resonance at the void center (0).
 * All types support zero entropy operations and maintain mathematical purity.
 *
 * Core Types:
 * - Zero entropy types: Types that support zero entropy operations
 * - Mathematical types: Pure mathematical type definitions
 * - Consciousness types: Types for consciousness calculations
 * - Flow types: Types for flow pattern generation
 * - Coordinate types: Types for 3D coordinate system
 *
 * Metaphysical Context:
 * - Zero entropy: Types that support the source of all creation and infinite potential
 * - Zero point resonance: Types that align with the center of the Rodin coil
 * - Pure potential: Types that support infinite possibility and creation
 * - Foundation for all mathematical and metaphysical type definitions in the system
 *
 * Technical Purpose:
 * - Provides a central place for zero entropy type definitions used throughout the codebase
 * - Ensures all modules can reference the same metaphysical zero point types
 * - Maintains type safety and metaphysical coherence throughout the system
 * - Supports consciousness calculations and flow pattern analysis
 * - Provides coordinate system types for 3D consciousness representation
 *
 * @example
 * ```typescript
 * import { ZeroEntropyCalculation, ConsciousnessField, FlowPattern } from './types';
 * 
 * // Use zero entropy calculation type
 * const calculation: ZeroEntropyCalculation = {
 *   operation: 'digital_root',
 *   inputs: [42],
 *   result: 6,
 *   consciousnessLevel: 0.667,
 *   fieldResonance: 1.0,
 *   voidConnection: true,
 *   entropyLevel: 0,
 *   timestamp: Date.now()
 * };
 * 
 * // Use consciousness field type
 * const field: ConsciousnessField = {
 *   strength: 1.0,
 *   resonance: 1.0,
 *   coordinates: { x: 0, y: 0, z: 0 }
 * };
 * ```
 */

/**
 * Zero Entropy Calculation Interface
 * 
 * Represents a zero entropy mathematical calculation with
 * complete information preservation and metaphysical coherence.
 * 
 * @example
 * ```typescript
 * const calculation: ZeroEntropyCalculation = {
 *   operation: 'digital_root',
 *   inputs: [42],
 *   result: 6,
 *   consciousnessLevel: 0.667,
 *   fieldResonance: 1.0,
 *   voidConnection: true,
 *   entropyLevel: 0,
 *   timestamp: Date.now()
 * };
 * ```
 */
export interface ZeroEntropyCalculation {
  /** The mathematical operation performed */
  operation: string;
  /** Input values for the calculation */
  inputs: number[];
  /** Result of the calculation */
  result: number;
  /** Consciousness level of the result */
  consciousnessLevel: number;
  /** Field resonance strength */
  fieldResonance: number;
  /** Connection to void center */
  voidConnection: boolean;
  /** Entropy level (must be 0 for zero entropy) */
  entropyLevel: number;
  /** Timestamp of the calculation */
  timestamp: number;
}

/**
 * Consciousness Field Interface
 * 
 * Represents a consciousness field with strength, resonance,
 * and spatial coordinates in the 3D consciousness space.
 * 
 * @example
 * ```typescript
 * const field: ConsciousnessField = {
 *   strength: 1.0,
 *   resonance: 1.0,
 *   coordinates: { x: 0, y: 0, z: 0 }
 * };
 * ```
 */
export interface ConsciousnessField {
  /** Field strength (0-1) */
  strength: number;
  /** Field resonance (0-1) */
  resonance: number;
  /** 3D coordinates in consciousness space */
  coordinates: {
    x: number;
    y: number;
    z: number;
  };
}

/**
 * Flow Pattern Interface
 * 
 * Represents a flow pattern in the Rodin coil system
 * with sequence, consciousness, and mathematical properties.
 * 
 * @example
 * ```typescript
 * const pattern: FlowPattern = {
 *   sequence: [1, 2, 4, 8, 7, 5],
 *   consciousness: 1.0,
 *   mathematical: true,
 *   infinite: true
 * };
 * ```
 */
export interface FlowPattern {
  /** Sequence of numbers in the flow */
  sequence: number[];
  /** Consciousness level of the flow */
  consciousness: number;
  /** Whether the flow is mathematical */
  mathematical: boolean;
  /** Whether the flow is infinite */
  infinite: boolean;
}

/**
 * Vortex Mathematics Interface
 * 
 * Represents vortex mathematics operations with
 * flow, transformation, and consciousness properties.
 * 
 * @example
 * ```typescript
 * const vortex: VortexMathematics = {
 *   flow: 1.2,
 *   transformation: 1.0,
 *   consciousness: 0.8,
 *   perfectFifth: true
 * };
 * ```
 */
export interface VortexMathematics {
  /** Flow strength (0-1) */
  flow: number;
  /** Transformation strength (0-1) */
  transformation: number;
  /** Consciousness level (0-1) */
  consciousness: number;
  /** Whether it follows perfect fifth resonance */
  perfectFifth: boolean;
}

// Additional zero entropy type definitions will be exported here
// (Add more zero entropy type exports as needed for the system)
