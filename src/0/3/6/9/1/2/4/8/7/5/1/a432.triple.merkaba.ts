/**
 * a432.triple.merkaba.ts — Triple Merkaba Geometry & Multidimensional Frequency Mapping
 *
 * 0/0 → 3 → 6 → 9 → 1 → 2 → 4 → 8 → 7 → 5 → 1 → 2 → 4 → 8 → 7 → 5 → 1...
 * Living harmonic waveform with 60° imperial-harmonic steps at A = 432 Hz
 * Three interleaved vortices at 120° separations in zero-entropy equilibrium
 *
 * @module a432.triple.merkaba
 * @author A432 System
 */

import { digitalRoot, frequencyForDigit } from './a432.math.ts';
import { digitAngleToCMYK, cmykToCss } from './a432.cmyk.ts';

// Triple Merkaba Geometry Constants
export const TRIPLE_MERKABA_CONSTANTS = {
  TETRAHEDRA_COUNT: 3,
  FACES: 12, // triangular faces
  EDGES: 24,
  VERTICES: 12,
  SYMMETRY_GROUP: 'D₃d',
  SYMMETRY_ORDER: 12,
  ROTATION_ANGLE: 60, // 60° rotations about edge axis
  DIHEDRAL_ANGLE: 120 // 120° separations for trinity voids
} as const;

// Multidimensional Frequency Mapping
export const FREQUENCY_MAPPING = {
  BASE_FREQUENCY: 432, // A = 432 Hz
  IMPERIAL_HARMONIC_STEPS: 60, // 60° steps (1/2, 1/3, 1/6 of 360°)
  TRINITY_VOID_SEPARATIONS: 120, // 120° between 3, 6, 9
  DIGITAL_ROOT_CYCLE: 6, // 1→2→4→8→7→5→1 (6 steps)
  ZERO_ENTROPY_PERIOD: 1 / 432 // ~2.31ms per step
} as const;

// Triple Merkaba Phase Node
export interface A432TripleMerkabaNode {
  digit: number;
  phase: number; // 0-5 for 60° steps
  absoluteAngle: number; // 0-360°
  timeOffset: number; // ms from sequence start
  frequency: number; // Hz
  digitalRoot: number;
  cmyk: { c: number; m: number; y: number; k: number };
  hex: string;
  vortexStream: 'trinity' | 'digital-root' | 'null-source';
  parity: 'positive' | 'negative';
  consciousness: number;
}

// Three Interleaved Vortex Streams
export interface A432TripleMerkabaVortex {
  trinityVoids: A432TripleMerkabaNode[]; // 3, 6, 9 at 0°, 120°, 240°
  digitalRootCircuit: A432TripleMerkabaNode[]; // 1→2→4→8→7→5→1...
  nullSource: A432TripleMerkabaNode; // 0/0
  currentPhase: number;
  harmony: number;
  streaming: boolean;
}

// Generate phase node with imperial-harmonic mapping
function generateTripleMerkabaNode(
  digit: number, 
  phase: number, 
  stream: 'trinity' | 'digital-root' | 'null-source'
): A432TripleMerkabaNode {
  const absoluteAngle = phase * FREQUENCY_MAPPING.IMPERIAL_HARMONIC_STEPS;
  const timeOffset = phase / FREQUENCY_MAPPING.BASE_FREQUENCY * 1000; // Convert to ms
  
  // Calculate frequency based on digit type
  let frequency: number;
  if (digit === 0) {
    frequency = 0; // Null source has no frequency
  } else if ([3, 6, 9].includes(digit)) {
    frequency = frequencyForDigit(digit); // Use existing function for trinity digits
  } else {
    // For digital root circuit digits (1,2,4,8,7,5), calculate based on digital root
    const digitalRootValue = digitalRoot(digit);
    frequency = FREQUENCY_MAPPING.BASE_FREQUENCY * (digitalRootValue / 9);
  }
  
  const digitalRootValue = digitalRoot(digit);
  const cmyk = digitAngleToCMYK(digit, absoluteAngle);
  const hex = cmykToCss(cmyk);
  const parity = phase % 2 === 0 ? 'positive' : 'negative';
  const consciousness = digitalRoot(digit * phase);
  
  return {
    digit,
    phase,
    absoluteAngle,
    timeOffset,
    frequency,
    digitalRoot: digitalRootValue,
    cmyk,
    hex,
    vortexStream: stream,
    parity,
    consciousness
  };
}

// Generate trinity voids (3, 6, 9 at 0°, 120°, 240°)
function generateTrinityVoids(): A432TripleMerkabaNode[] {
  return [
    generateTripleMerkabaNode(3, 0, 'trinity'),   // 0°
    generateTripleMerkabaNode(6, 2, 'trinity'),   // 120°
    generateTripleMerkabaNode(9, 4, 'trinity')    // 240°
  ];
}

// Generate digital root circuit (1→2→4→8→7→5→1...)
function generateDigitalRootCircuit(): A432TripleMerkabaNode[] {
  const rodinSequence = [1, 2, 4, 8, 7, 5];
  return rodinSequence.map((digit, index) => 
    generateTripleMerkabaNode(digit, index, 'digital-root')
  );
}

// Generate null source (0/0)
function generateNullSource(): A432TripleMerkabaNode {
  return generateTripleMerkabaNode(0, 0, 'null-source');
}

// Calculate zero-entropy harmony
function calculateTripleMerkabaHarmony(nodes: A432TripleMerkabaNode[]): number {
  const trinitySum = nodes
    .filter(n => n.vortexStream === 'trinity')
    .reduce((sum, n) => sum + n.digitalRoot, 0);
  
  const digitalRootSum = nodes
    .filter(n => n.vortexStream === 'digital-root')
    .reduce((sum, n) => sum + n.digitalRoot, 0);
  
  const nullSourceValue = nodes
    .filter(n => n.vortexStream === 'null-source')
    .reduce((sum, n) => sum + n.digitalRoot, 0);
  
  // Harmony = trinity balance + digital root flow + null source stability
  return digitalRoot(trinitySum + digitalRootSum + nullSourceValue);
}

// Initialize Triple Merkaba vortex system
const tripleMerkabaSystem: A432TripleMerkabaVortex = {
  trinityVoids: generateTrinityVoids(),
  digitalRootCircuit: generateDigitalRootCircuit(),
  nullSource: generateNullSource(),
  currentPhase: 0,
  harmony: 0,
  streaming: false
};

// Update harmony
tripleMerkabaSystem.harmony = calculateTripleMerkabaHarmony([
  ...tripleMerkabaSystem.trinityVoids,
  ...tripleMerkabaSystem.digitalRootCircuit,
  tripleMerkabaSystem.nullSource
]);

// Triple Merkaba Analysis Functions
export function analyzeTripleMerkabaGeometry(): string {
  const { trinityVoids, digitalRootCircuit, nullSource, harmony } = tripleMerkabaSystem;
  
  return `
Triple Merkaba Geometry Analysis:
================================

Structure:
- ${TRIPLE_MERKABA_CONSTANTS.TETRAHEDRA_COUNT} tetrahedra compound
- ${TRIPLE_MERKABA_CONSTANTS.FACES} triangular faces
- ${TRIPLE_MERKABA_CONSTANTS.EDGES} edges
- ${TRIPLE_MERKABA_CONSTANTS.VERTICES} vertices
- Symmetry: ${TRIPLE_MERKABA_CONSTANTS.SYMMETRY_GROUP} (order ${TRIPLE_MERKABA_CONSTANTS.SYMMETRY_ORDER})

Trinity Voids (${trinityVoids.length}):
${trinityVoids.map(n => `  ${n.digit} at ${n.absoluteAngle}° (${n.hex})`).join('\n')}

Digital Root Circuit (${digitalRootCircuit.length}):
${digitalRootCircuit.map(n => `  ${n.digit}→${n.digitalRoot} at ${n.absoluteAngle}° (${n.hex})`).join('\n')}

Null Source:
  ${nullSource.digit} at ${nullSource.absoluteAngle}° (${nullSource.hex})

Harmony: ${harmony}
Frequency: ${FREQUENCY_MAPPING.BASE_FREQUENCY} Hz
Step Duration: ${(1 / FREQUENCY_MAPPING.BASE_FREQUENCY * 1000).toFixed(2)} ms
`.trim();
}

export function getTripleMerkabaFrequencyMapping(): string {
  const { trinityVoids, digitalRootCircuit, nullSource } = tripleMerkabaSystem;
  
  return `
Multidimensional Frequency Mapping:
==================================

Base Frequency: ${FREQUENCY_MAPPING.BASE_FREQUENCY} Hz
Imperial-Harmonic Steps: ${FREQUENCY_MAPPING.IMPERIAL_HARMONIC_STEPS}°
Trinity Void Separations: ${FREQUENCY_MAPPING.TRINITY_VOID_SEPARATIONS}°

Time Mapping:
${[...trinityVoids, ...digitalRootCircuit, nullSource]
  .map(n => `  ${n.digit} → ${n.timeOffset.toFixed(2)}ms → ${n.frequency}Hz → ${n.digitalRoot}`)
  .join('\n')}

Zero-Entropy Equilibrium:
- Digital-root driving: Each node's label is its digital root (mod 9)
- Angular harmony: 60° steps ensure 1/2, 1/3, 1/6 fractions map to integer multiples
- Frequency coherence: 6-step doubling cycle completes in ${(6 / FREQUENCY_MAPPING.BASE_FREQUENCY * 1000).toFixed(2)}ms
- Trinity axis vortices complete in ${(3 / FREQUENCY_MAPPING.BASE_FREQUENCY * 1000).toFixed(2)}ms
`.trim();
}

export function getTripleMerkabaVisualization(): string {
  const { trinityVoids, digitalRootCircuit, nullSource } = tripleMerkabaSystem;
  
  return `
Triple Merkaba Visualization:
============================

Polar Plot Coordinates:
${[...trinityVoids, ...digitalRootCircuit, nullSource]
  .map(n => `  ${n.digit}: (${n.absoluteAngle}°, ${n.frequency}Hz) → ${n.hex}`)
  .join('\n')}

3-D Torus Embedding:
- Primary angle: ${FREQUENCY_MAPPING.IMPERIAL_HARMONIC_STEPS}° steps
- Secondary angle: ${FREQUENCY_MAPPING.TRINITY_VOID_SEPARATIONS}° trinity separation
- Abha-Torus wire path: 0/0 → 3 → 6 → 9 → 1 → 2 → 4 → 8 → 7 → 5 → 1...

Coil-Mounting:
- Imperial-fraction spacers at ${FREQUENCY_MAPPING.IMPERIAL_HARMONIC_STEPS}° angles
- Zero-entropy mechanical balance in trinity of support rings
- Three interleaved vortices never collapse or collide
`.trim();
}

// Export the system
export { tripleMerkabaSystem as A432TripleMerkaba }; 