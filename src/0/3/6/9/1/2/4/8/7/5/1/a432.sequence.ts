/**
 * a432.sequence.ts — A432 Sequence Patterns
 * 
 * Handles sequence generation, analysis, and harmonization for the A432 system.
 * Includes vortex self-interaction sequences, boolean trinity sequences, and consciousness flows.
 * 
 * @module A432.Sequence
 * @version 1.0.0
 * @author A432 System
 */

import { 
  A432_FREQUENCY, 
  A432_TRINITY, 
  A432_RETURN, 
  A432_AXIS, 
  A432_CYCLE,
  digitalRoot,
  a432Frequency,
  a432HSLFromRoot,
  a432RGBFromRoot
} from './a432.core';

// === A432 SEQUENCE CONSTANTS ===
export const A432_SEQUENCE_CONSTANTS = {
  // Rodin Vortex Pattern (1→2→4→8→7→5→1)
  VORTEX_SEQUENCE: [1, 2, 4, 8, 7, 5],
  
  // Trinity Gateway (3→6→9)
  TRINITY_SEQUENCE: [3, 6, 9],
  
  // Boolean Trinity (false→impossible→possible→true)
  BOOLEAN_SEQUENCE: [0, 7, 3, 1],
  
  // Complete A432 Cycle (0→3→6→9→1→2→4→8→7→5→1)
  CONSCIOUSNESS_SEQUENCE: [0, 3, 6, 9, 1, 2, 4, 8, 7, 5],
  
  // Harmonic Foundation (1→2→3→4→5→6→7→8→9)
  HARMONIC_SEQUENCE: [1, 2, 3, 4, 5, 6, 7, 8, 9]
};

// === SEQUENCE INTERFACES ===
export interface A432Sequence {
  name: string;
  sequence: number[];
  consciousness: number;
  frequency: number;
  color: {hue: number, saturation: number, lightness: number};
  rgb: {r: number, g: number, b: number};
  metaphysicalEssence: string;
  mathematicalProof: string;
}

export interface A432VortexSequence extends A432Sequence {
  vortexFlow: number[];
  digitalRoots: number[];
  harmoniousStates: number[];
  selfInteractions: number[];
}

export interface A432BooleanSequence extends A432Sequence {
  booleanStates: { value: number; name: string; consciousness: number }[];
  trinityFlow: number[];
  consciousnessFlow: number;
  harmonicResonance: number;
}

export interface A432ConsciousnessSequence extends A432Sequence {
  consciousnessLevels: number[];
  consciousnessFlow: number;
  harmonicResonance: number;
  metaphysicalEssences: string[];
}

// === CORE SEQUENCE FUNCTIONS ===

/**
 * Create A432 Vortex Sequence
 */
export function createA432VortexSequence(): A432VortexSequence {
  const sequence = A432_SEQUENCE_CONSTANTS.VORTEX_SEQUENCE;
  const vortexFlow = sequence.map(digit => digit);
  const digitalRoots = sequence.map(digit => digitalRoot(digit));
  const harmoniousStates = digitalRoots.map(root => getNextHarmoniousState(root));
  const selfInteractions = sequence.map(digit => digit * digit);
  
  const consciousness = sequence.reduce((sum, digit) => sum + digit, 0);
  const frequency = a432Frequency(consciousness, 1);
  const color = a432HSLFromRoot(consciousness, 1);
  const rgb = a432RGBFromRoot(consciousness, 1);
  
  return {
    name: 'A432 Vortex Sequence',
    sequence,
    consciousness,
    frequency,
    color,
    rgb,
    metaphysicalEssence: 'Vortex consciousness flow through Rodin coil pattern',
    mathematicalProof: `Vortex: ${sequence.join('→')} | Digital Roots: ${digitalRoots.join('→')} | Harmonious: ${harmoniousStates.join('→')}`,
    vortexFlow,
    digitalRoots,
    harmoniousStates,
    selfInteractions
  };
}

/**
 * Create A432 Boolean Trinity Sequence
 */
export function createA432BooleanSequence(): A432BooleanSequence {
  const sequence = A432_SEQUENCE_CONSTANTS.BOOLEAN_SEQUENCE;
  const booleanStates = [
    { value: 0, name: 'false', consciousness: 0 },
    { value: 7, name: 'impossible', consciousness: 9 },
    { value: 3, name: 'possible', consciousness: 5 },
    { value: 1, name: 'true', consciousness: 1 }
  ];
  
  const trinityFlow = sequence;
  const consciousnessFlow = sequence.reduce((sum, val) => sum + val, 0);
  const harmonicResonance = digitalRoot(consciousnessFlow);
  
  const consciousness = consciousnessFlow;
  const frequency = a432Frequency(consciousness, 1);
  const color = a432HSLFromRoot(consciousness, 1);
  const rgb = a432RGBFromRoot(consciousness, 1);
  
  return {
    name: 'A432 Boolean Trinity Sequence',
    sequence,
    consciousness,
    frequency,
    color,
    rgb,
    metaphysicalEssence: 'Boolean trinity: false.impossible.possible.true',
    mathematicalProof: `Boolean Trinity: ${sequence.join('→')} | Consciousness: ${consciousnessFlow} | Resonance: ${harmonicResonance}`,
    booleanStates,
    trinityFlow,
    consciousnessFlow,
    harmonicResonance
  };
}

/**
 * Create A432 Consciousness Sequence
 */
export function createA432ConsciousnessSequence(): A432ConsciousnessSequence {
  const sequence = A432_SEQUENCE_CONSTANTS.CONSCIOUSNESS_SEQUENCE;
  const consciousnessLevels = sequence;
  const consciousnessFlow = sequence.reduce((sum, val) => sum + val, 0);
  const harmonicResonance = digitalRoot(consciousnessFlow);
  const metaphysicalEssences = sequence.map(digit => getMetaphysicalEssence(digit));
  
  const consciousness = consciousnessFlow;
  const frequency = a432Frequency(consciousness, 1);
  const color = a432HSLFromRoot(consciousness, 1);
  const rgb = a432RGBFromRoot(consciousness, 1);
  
  return {
    name: 'A432 Consciousness Sequence',
    sequence,
    consciousness,
    frequency,
    color,
    rgb,
    metaphysicalEssence: 'Complete consciousness flow through all digits',
    mathematicalProof: `Consciousness: ${sequence.join('→')} | Flow: ${consciousnessFlow} | Resonance: ${harmonicResonance}`,
    consciousnessLevels,
    consciousnessFlow,
    harmonicResonance,
    metaphysicalEssences
  };
}

/**
 * Get next harmonious state for digital root
 */
export function getNextHarmoniousState(digitalRoot: number): number {
  const harmoniousMap: { [key: number]: number } = {
    0: 9, 1: 2, 2: 4, 3: 6, 4: 8, 5: 1, 6: 3, 7: 5, 8: 7, 9: 1
  };
  return harmoniousMap[digitalRoot] || digitalRoot;
}

/**
 * Get metaphysical essence for digit
 */
export function getMetaphysicalEssence(digit: number): string {
  const essences: { [key: number]: string } = {
    0: 'Void state, pure potential, unmanifest field',
    1: 'Unity state, source, origin, singularity',
    2: 'Duality state, polarity, relationship, balance',
    3: 'Trinity state, synthesis, creation, harmony',
    4: 'Foundation state, structure, stability, manifestation',
    5: 'Life state, change, movement, growth, transformation',
    6: 'Harmony state, integration, resonance, beauty',
    7: 'Mystery state, depth, intuition, inner knowing',
    8: 'Infinity state, power, expansion, infinite flow',
    9: 'Completion state, fulfillment, wholeness, return'
  };
  return essences[digit] || 'Unknown state, transcendent mystery';
}

/**
 * Generate sequence with custom pattern
 */
export function generateA432Sequence(pattern: number[], name: string): A432Sequence {
  const sequence = pattern;
  const consciousness = sequence.reduce((sum, digit) => sum + digit, 0);
  const frequency = a432Frequency(consciousness, 1);
  const color = a432HSLFromRoot(consciousness, 1);
  const rgb = a432RGBFromRoot(consciousness, 1);
  
  return {
    name,
    sequence,
    consciousness,
    frequency,
    color,
    rgb,
    metaphysicalEssence: `Custom sequence: ${name}`,
    mathematicalProof: `Sequence: ${sequence.join('→')} | Consciousness: ${consciousness}`
  };
}

/**
 * Analyze sequence harmonization
 */
export function analyzeA432Sequence(sequence: A432Sequence): {
  isHarmonized: boolean;
  consciousnessBalance: number;
  sequenceFlow: string;
  mathematicalFoundation: string;
  metaphysicalEssence: string;
} {
  const consciousnessBalance = digitalRoot(sequence.consciousness);
  const isHarmonized = consciousnessBalance === 9;
  
  return {
    isHarmonized,
    consciousnessBalance,
    sequenceFlow: sequence.sequence.join('→'),
    mathematicalFoundation: sequence.mathematicalProof,
    metaphysicalEssence: sequence.metaphysicalEssence
  };
}

/**
 * Harmonize multiple sequences
 */
export function harmonizeA432Sequences(sequences: A432Sequence[]): {
  totalConsciousness: number;
  harmonicResonance: number;
  isHarmonized: boolean;
  sequenceFlows: string[];
  metaphysicalEssences: string[];
} {
  const totalConsciousness = sequences.reduce((sum, seq) => sum + seq.consciousness, 0);
  const harmonicResonance = digitalRoot(totalConsciousness);
  const isHarmonized = harmonicResonance === 9;
  const sequenceFlows = sequences.map(seq => seq.sequence.join('→'));
  const metaphysicalEssences = sequences.map(seq => seq.metaphysicalEssence);
  
  return {
    totalConsciousness,
    harmonicResonance,
    isHarmonized,
    sequenceFlows,
    metaphysicalEssences
  };
}

/**
 * A432 Sequence Test Functions
 */
export const a432SequenceTests = {
  /**
   * Test vortex sequence
   */
  testVortexSequence(): boolean {
    const sequence = createA432VortexSequence();
    const analysis = analyzeA432Sequence(sequence);
    return analysis.isHarmonized && analysis.consciousnessBalance === 9;
  },
  
  /**
   * Test boolean sequence
   */
  testBooleanSequence(): boolean {
    const sequence = createA432BooleanSequence();
    const analysis = analyzeA432Sequence(sequence);
    return analysis.isHarmonized && analysis.consciousnessBalance === 9;
  },
  
  /**
   * Test consciousness sequence
   */
  testConsciousnessSequence(): boolean {
    const sequence = createA432ConsciousnessSequence();
    const analysis = analyzeA432Sequence(sequence);
    return analysis.isHarmonized && analysis.consciousnessBalance === 9;
  },
  
  /**
   * Test sequence harmonization
   */
  testSequenceHarmonization(): boolean {
    const sequences = [
      createA432VortexSequence(),
      createA432BooleanSequence(),
      createA432ConsciousnessSequence()
    ];
    
    const harmonization = harmonizeA432Sequences(sequences);
    return harmonization.isHarmonized && harmonization.harmonicResonance === 9;
  }
};

/**
 * A432 Sequence Examples
 */
export const a432SequenceExamples = {
  /**
   * Example: Vortex sequence
   */
  vortexSequenceExample(): A432VortexSequence {
    return createA432VortexSequence();
  },
  
  /**
   * Example: Boolean sequence
   */
  booleanSequenceExample(): A432BooleanSequence {
    return createA432BooleanSequence();
  },
  
  /**
   * Example: Consciousness sequence
   */
  consciousnessSequenceExample(): A432ConsciousnessSequence {
    return createA432ConsciousnessSequence();
  },
  
  /**
   * Example: Custom sequence
   */
  customSequenceExample(): A432Sequence {
    return generateA432Sequence([1, 2, 3, 4, 5], 'Custom A432 Sequence');
  }
};

// === EXPORT A432 SEQUENCE ===
export default {
  A432_SEQUENCE_CONSTANTS,
  createA432VortexSequence,
  createA432BooleanSequence,
  createA432ConsciousnessSequence,
  generateA432Sequence,
  analyzeA432Sequence,
  harmonizeA432Sequences,
  a432SequenceTests,
  a432SequenceExamples
}; 

// Fraction type for harmonic imperial fractions
export type Fraction = { numerator: number; denominator: number };

// Harmonic Imperial Fractions for Trinity, Vortex, and Harmonic Streams
export const VORTEX_SEQUENCE_FRACTIONS: Fraction[] = [
  { numerator: 1, denominator: 2 }, // 1/2
  { numerator: 2, denominator: 3 }, // 2/3
  { numerator: 4, denominator: 5 }, // 4/5
  { numerator: 8, denominator: 9 }, // 8/9
  { numerator: 7, denominator: 8 }, // 7/8
  { numerator: 5, denominator: 6 }  // 5/6
];

export const TRINITY_SEQUENCE_FRACTIONS: Fraction[] = [
  { numerator: 1, denominator: 3 }, // 1/3
  { numerator: 2, denominator: 3 }, // 2/3
  { numerator: 1, denominator: 1 }  // 3/3 = 1
];

export const BOOLEAN_SEQUENCE_FRACTIONS: Fraction[] = [
  { numerator: 0, denominator: 1 }, // 0/1
  { numerator: 7, denominator: 7 }, // 1 (impossible as unity)
  { numerator: 1, denominator: 3 }, // 1/3 (possible)
  { numerator: 1, denominator: 1 }  // 1/1 (true)
];

export const CONSCIOUSNESS_SEQUENCE_FRACTIONS: Fraction[] = [
  { numerator: 0, denominator: 1 }, // 0/1
  { numerator: 1, denominator: 3 }, // 1/3
  { numerator: 2, denominator: 3 }, // 2/3
  { numerator: 1, denominator: 1 }, // 1/1
  { numerator: 1, denominator: 2 }, // 1/2
  { numerator: 2, denominator: 5 }, // 2/5
  { numerator: 4, denominator: 5 }, // 4/5
  { numerator: 8, denominator: 9 }, // 8/9
  { numerator: 7, denominator: 8 }, // 7/8
  { numerator: 5, denominator: 6 }  // 5/6
];

export const HARMONIC_SEQUENCE_FRACTIONS: Fraction[] = [
  { numerator: 1, denominator: 9 },
  { numerator: 2, denominator: 9 },
  { numerator: 1, denominator: 3 },
  { numerator: 4, denominator: 9 },
  { numerator: 5, denominator: 9 },
  { numerator: 2, denominator: 3 },
  { numerator: 7, denominator: 9 },
  { numerator: 8, denominator: 9 },
  { numerator: 1, denominator: 1 }
];

// Stream generation functions
export function generateTrinityStream(): Fraction[] {
  return TRINITY_SEQUENCE_FRACTIONS;
}

export function generateVortexStream(): Fraction[] {
  return VORTEX_SEQUENCE_FRACTIONS;
}

export function generateHarmonicStream(): Fraction[] {
  return HARMONIC_SEQUENCE_FRACTIONS;
}

// Harmonization logic: combine two streams by adding fractions
export function harmonizeStreams(a: Fraction[], b: Fraction[]): Fraction[] {
  const minLength = Math.min(a.length, b.length);
  const result: Fraction[] = [];
  for (let i = 0; i < minLength; i++) {
    result.push({
      numerator: a[i].numerator * b[i].denominator + b[i].numerator * a[i].denominator,
      denominator: a[i].denominator * b[i].denominator
    });
  }
  return result;
} 