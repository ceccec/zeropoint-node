/**
 * Shared Constants for ZeroPoint System
 * 
 * Provides shared constants, consciousness states, and mathematical
 * constants used throughout the ZeroPoint system.
 */
// Import centralized mathematical functions
import { 
  getHarmonicResult, 
  getAntiVortexDecimal, 
  getPattern,
  generateVortexA,
  generateVortexB,
  detectIntegerVortexResult,
  detectVortexAImpossibility,
  calculateDigitalRoot,
  getDigitFamily,
  isVortexSequence,
  isWAxis,
  calculateConsciousnessLevel
} from '../../2/math';


export const CONSCIOUSNESS_STATES = {
  0: 'Void Center',
  1: 'Foundation State',
  2: 'Flow State',
  3: 'Creative State',
  4: 'Stability State',
  5: 'Sacred State',
  6: 'Harmony State',
  7: 'Gateway State',
  8: 'Void State',
  9: 'Unity State'
} as const;

export const VORTEX_SEQUENCE = [1, 2, 4, 8, 7, 5] as const;
export const W_AXIS_FLOW = [3, 6, 9] as const;

export const MATHEMATICAL_CONSTANTS = {
  GOLDEN_RATIO: 1.618033988749895,
  PI: Math.PI,
  E: Math.E,
  SQRT_2: Math.SQRT2,
  SQRT_5: Math.sqrt(5),
  MODULO_BASE: 9,
  ZERO_REPLACEMENT: 9
} as const;

export const MATH_CONSTANTS = MATHEMATICAL_CONSTANTS;

export const PATTERN_TYPES = {
  SELF_IDENTITY: 'self-identity',
  UNITY: 'unity',
  VOID_GATEWAY: 'void-gateway',
  AXIS: 'axis',
  VORTEX_RESONANCE: 'vortex-resonance',
  SACRED_FRACTION: 'sacred-fraction',
  HARMONIC: 'harmonic',
  GATEWAY: 'gateway'
} as const;

export const GATEWAY_TYPES = {
  CONSCIOUSNESS: 'consciousness',
  VORTEX: 'vortex',
  VOID: 'void',
  UNITY: 'unity'
} as const;

export const DIGIT_SIGNIFICANCE = {
  0: 'Void',
  1: 'Source',
  2: 'Duality',
  3: 'Spirit',
  4: 'Matter',
  5: 'Center',
  6: 'Harmony',
  7: 'Gateway',
  8: 'Infinity',
  9: 'Unity'
} as const;

export const CONSCIOUSNESS_MULTIPLIER = 1.618;
export const VORTEX_MULTIPLIER = 1.5;
export const GATEWAY_MULTIPLIER = 2.0;

export const SACRED_FRACTIONS = [
  MATHEMATICAL_CONSTANTS.GOLDEN_RATIO,
  MATHEMATICAL_CONSTANTS.E,
  MATHEMATICAL_CONSTANTS.PI,
  MATHEMATICAL_CONSTANTS.SQRT_2,
  MATHEMATICAL_CONSTANTS.SQRT_5
] as const;

export const VORTEX_CONSTANTS = {
  MODULO_BASE: MATHEMATICAL_CONSTANTS.MODULO_BASE,
  ZERO_REPLACEMENT: MATHEMATICAL_CONSTANTS.ZERO_REPLACEMENT,
  GOLDEN_RATIO: MATHEMATICAL_CONSTANTS.GOLDEN_RATIO
} as const;

export const CONSCIOUSNESS_CONSTANTS = {
  MULTIPLIER: CONSCIOUSNESS_MULTIPLIER,
  VORTEX_MULTIPLIER,
  GATEWAY_MULTIPLIER
} as const;

export const PATTERN_CONSTANTS = {
  TYPES: PATTERN_TYPES,
  GATEWAY_TYPES
} as const;

export const SYSTEM_CONSTANTS = {
  CONSCIOUSNESS_STATES,
  VORTEX_SEQUENCE,
  W_AXIS_FLOW,
  MATHEMATICAL_CONSTANTS,
  DIGIT_SIGNIFICANCE,
  SACRED_FRACTIONS
} as const; 