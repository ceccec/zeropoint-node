/**
 * 🌌 Mathematics System - src/4/mathematics.ts
 * 
 * Core mathematical functions integrated from scripts:
 * - harmony-patterns.js
 * - metatron-cube-harmony-analysis.js  
 * - universe-generator.js
 */

import { ZEROPOINT_CONFIG } from './config';

// 🌌 DIGIT ARCHETYPES
export const DIGIT_ARCHETYPES = {
  0: 'Void',
  1: 'Source', 
  2: 'Vortex',  3: 'Resonance',
  4: 'Ath',
  5: 'Center',
  6: 'Harmony',
  7: 'Gateway',
  8: 'Infinity',
  9: 'Axis'
};

// 🌌 VORTEX SEQUENCES
export const VORTEX_SEQUENCES = {
  PRIMARY: [1,24, 87, 5],
  SPIRITUAL_AXIS: [3, 6, 9],
  COMPLETE: [0, 1, 2, 3, 4, 67, 9]
};

// 🌌 METATRONS CUBE STRUCTURE
export const METATRON_CUBE = {
  CIRCLES: 13,
  CONNECTING_LINES: 78,
  SACRED_SHAPES: {
    TETRAHEDRON: 4,
    CUBE: 6,
    OCTAHEDRON: 8,
    DODECAHEDRON: 12,
    ICOSAHEDRON: 20
  }
};

// 🌌 HARMONY PATTERN TYPES
export const HARMONY_PATTERNS = { 
  SELF_IDENTITY: 'self-identity', 
  UNITY: 'unity',
  VOID_GATEWAY: 'void-gateway',
  AXIS: 'axis',
  VORTEX_RESONANCE: 'vortex-resonance'
};

/**
 * Generate vortex A (integer harmonic result)
 */
export function generateVortexA(a: number, b: number): number { 
  const sum = (a + b) % ZEROPOINT_CONFIG.MODULO_BASE;
  return sum === 0 ? ZEROPOINT_CONFIG.ZERO_REPLACEMENT : sum;
}

/**
 * Generate vortex B (decimal inverse vortex)
 */
export function generateVortexB(a: number, b: number): number {
  const vortexA = generateVortexA(a, b);
  return (a + b) / vortexA;
}

/**
 * Generate polarity switching (negative to positive)
 */
export function generatePolaritySwitch(negative: number): number { 
  const positive = negative % ZEROPOINT_CONFIG.MODULO_BASE;
  return positive === 0 ? ZEROPOINT_CONFIG.ZERO_REPLACEMENT : positive;
}

/**
 * Detect harmony patterns between two digits
 */
export function detectHarmonyPatterns(a: number, b: number): Array<{
  name: string;
  type: string;
  description: string;
  mathematicalFlow: string;
  consciousnessMultiplier: number;
  harmonicOpportunity: string;
}> { 
  const patterns = [];
  
  // Self-identity patterns (a = b)
  if (a === b) {
    patterns.push({
      name: 'Self-Identity Harmony',
      type: HARMONY_PATTERNS.SELF_IDENTITY,
      description: 'Perfect self-reflection creates infinite resonance',
      mathematicalFlow: a + ' = ' + b + ' → ∞ resonance',
      consciousnessMultiplier: 20,
      harmonicOpportunity: 'Gateway to transcendental consciousness'
    });
  }
  
  // Unity patterns (a + b = 9)
  if ((a + b) % ZEROPOINT_CONFIG.MODULO_BASE === 0) {
    patterns.push({
      name: 'Unity Harmony',
      type: HARMONY_PATTERNS.UNITY,
      description: 'Polar opposites create perfect unity',
      mathematicalFlow: a + ' + ' + b + ' = 9',
      consciousnessMultiplier: 10.8,
      harmonicOpportunity: 'Access to unified field consciousness'
    });
  }
  
  // Void gateway patterns (a = 0 or b = 0)
  if (a === 0 || b === 0) {
    patterns.push({
      name: 'Void Gateway Harmony',
      type: HARMONY_PATTERNS.VOID_GATEWAY,
      description: 'Void creates infinite potential for creation',
      mathematicalFlow: a + '/' + b + ' -> void gateway',
      consciousnessMultiplier: 10.5,
      harmonicOpportunity: 'Direct access to source consciousness'
    });
  }
  
  // Axis patterns (a = 3, 6, 9 or b = 3, 6, 9)
  if (VORTEX_SEQUENCES.SPIRITUAL_AXIS.includes(a) || VORTEX_SEQUENCES.SPIRITUAL_AXIS.includes(b)) {
    patterns.push({
      name: 'Axis Harmony',
      type: HARMONY_PATTERNS.AXIS,
      description: 'Spiritual axis creates dimensional transcendence',
      mathematicalFlow: a + '/' + b + ' -> axis transcendence',
      consciousnessMultiplier: 10.6,
      harmonicOpportunity: 'Access to higher dimensional consciousness'
    });
  }
  
  // Vortex resonance patterns (a or b in vortex sequence)
  if (VORTEX_SEQUENCES.PRIMARY.includes(a) || VORTEX_SEQUENCES.PRIMARY.includes(b)) {
    patterns.push({
      name: 'Vortex Resonance Harmony',
      type: HARMONY_PATTERNS.VORTEX_RESONANCE,
      description: 'Vortex sequence creates material manifestation flow',
      mathematicalFlow: a + '/' + b + ' -> vortex flow',
      consciousnessMultiplier: 10.3,
      harmonicOpportunity: 'Enhanced material consciousness flow'
    });
  }
  
  return patterns;
}

/**
 * Get enhanced mathematical properties
 */
export function getEnhancedMathematicalProperties(a: number, b: number): {
  position: string;
  archetypes: string;
  vortexA: number;
  vortexB: number;
  harmonyPatterns: any[];
  consciousnessMultiplier: number;
} {
  const vortexA = generateVortexA(a, b);
  const vortexB = generateVortexB(a, b);
  const harmonyPatterns = detectHarmonyPatterns(a, b);
  
  // Calculate total consciousness multiplier
  const totalMultiplier = harmonyPatterns.reduce((mult, pattern) => 
    mult * pattern.consciousnessMultiplier, 10
  );

  return {
    position: a + '/' + b,
    archetypes: DIGIT_ARCHETYPES[a] + '/' + DIGIT_ARCHETYPES[b],
    vortexA,
    vortexB,
    harmonyPatterns,
    consciousnessMultiplier: totalMultiplier
  };
}

/**
 * Analyze Metatron's Cube alignment with zeropoint system
 */
export function analyzeMetatronCubeAlignment(): boolean { 
  const totalZeropointCircles = VORTEX_SEQUENCES.COMPLETE.length + VORTEX_SEQUENCES.SPIRITUAL_AXIS.length;
  return totalZeropointCircles === METATRON_CUBE.CIRCLES;
}

/**
 * Map zeropoint circles to Metatrons Cube positions
 */
export function mapZeropointToMetatronCube(): Record<string, any> { 
  return {
    1: { position: 'Source Circle', archetype: DIGIT_ARCHETYPES[1], vortex: 'Vortex A Start' },
    2: { position: 'Vortex Circle', archetype: DIGIT_ARCHETYPES[2], vortex: 'Vortex A Flow' },
    3: { position: 'Resonance Circle', archetype: DIGIT_ARCHETYPES[3], vortex: 'W-Axis Spiritual' },
    4: { position: 'Math Circle', archetype: DIGIT_ARCHETYPES[4], vortex: 'Vortex A Foundation' },
    5: { position: 'Center Circle', archetype: DIGIT_ARCHETYPES[5], vortex: 'Vortex A Center' },
    6: { position: 'Harmony Circle', archetype: DIGIT_ARCHETYPES[6], vortex: 'W-Axis Spiritual' },
    7: { position: 'Gateway Circle', archetype: DIGIT_ARCHETYPES[7], vortex: 'Vortex A Gateway' },
    8: { position: 'Infinity Circle', archetype: DIGIT_ARCHETYPES[8], vortex: 'Vortex A Power' },
    9: { position: 'Axis Circle', archetype: DIGIT_ARCHETYPES[9], vortex: 'W-Axis Spiritual' },
    0: { position: 'Void Circle', archetype: DIGIT_ARCHETYPES[0], vortex: 'Source/Return' }
  };
}

/**
 * Generate interaction name
 */
export function generateInteractionName(a: number, b: number): string { 
  const vortexA = generateVortexA(a, b);
  const nameA = DIGIT_ARCHETYPES[a] || a.toString();
  const nameB = DIGIT_ARCHETYPES[b] || b.toString();
  const nameC = DIGIT_ARCHETYPES[vortexA] || vortexA.toString();
  return nameA + '-' + nameB + '-' + nameC + ' (' + a + '/' + b + '=' + vortexA + ')';
}

/**
 * Generate all universe interactions
 */
export function generateUniverse(): {
  metadata: any;
  digitArchetypes: Record<number, string[]>;
  interactions: any[];
  polaritySwitching: any[];
  vortexSequences: any[];
  consciousnessFlows: any[];
} { 
  const universe = {
    metadata: {
      title: 'Complete Vortex Universe',
      description: 'All possible digit interactions, vortex results, and consciousness flows',
      generated: new Date().toISOString(),
      totalInteractions: 100,
      totalResults: 200
    },
    digitArchetypes: Object.fromEntries(
      Object.entries(DIGIT_ARCHETYPES).map(([k, v]) => [k, [v, 'Archetype description']])
    ),
    interactions: [],
    polaritySwitching: [],
    vortexSequences: [],
    consciousnessFlows: []
  };

  // Generate all digit interactions (0 x0-9)
  for (let a = 0; a <= 9; a++) {
    for (let b = 0; b <= 9; b++) {
      const vortexA = generateVortexA(a, b);
      const vortexB = generateVortexB(a, b);
      const name = generateInteractionName(a, b);
      const archetypeA = DIGIT_ARCHETYPES[a] || a.toString();
      const archetypeB = DIGIT_ARCHETYPES[b] || b.toString();
      const archetypeC = DIGIT_ARCHETYPES[vortexA] || vortexA.toString();

      universe.interactions.push({
        a,
        b,
        vortexA,
        vortexB: vortexB.toFixed(2),
        name,
        archetypes: {
          a: archetypeA,
          b: archetypeB,
          result: archetypeC
        },
        paths: {
          vortexA: a + ' -> ' + b + ' -> ' + vortexA,
          vortexB: '(' + a + ' + ' + b + ') / ' + vortexA + ' = ' + vortexB.toFixed(2)
        },
        consciousness: {
          impossible: vortexB !== 1.0 && vortexB !== 0.00,
          walkable: Number.isInteger(vortexA),
          dimensional: vortexB !== 1.00
        }
      });
    }
  }

  // Generate polarity switching (negative to positive)
  for (let negative = -9; negative <= -1; negative++) {
    const positive = generatePolaritySwitch(negative);
    const negativeArchetype = DIGIT_ARCHETYPES[Math.abs(negative)] || Math.abs(negative).toString();
    const positiveArchetype = DIGIT_ARCHETYPES[positive] || positive.toString();

    universe.polaritySwitching.push({
      negative,
      positive,
      archetypes: {
        negative: negativeArchetype,
        positive: positiveArchetype
      },
      conversion: negative + ' -> ' + positive,
      consciousness: {
        impossible: true,
        walkable: true,
        conversion: 'negative to positive'
      }
    });
  }

  // Generate vortex sequences
  universe.vortexSequences = [
    {
      name: 'Primary Vortex',
      sequence: VORTEX_SEQUENCES.PRIMARY,
      description: 'Main vortex consciousness flow'
    },
    {
      name: 'Spiritual Axis',
      sequence: VORTEX_SEQUENCES.SPIRITUAL_AXIS,
      description: 'Control and axis digits'
    },
    {
      name: 'Complete Sequence',
      sequence: VORTEX_SEQUENCES.COMPLETE,
      description: 'Complete digit consciousness flow'
    }
  ];

  // Generate consciousness flows
  universe.consciousnessFlows = universe.interactions
    .filter((interaction: any) => interaction.consciousness.walkable)
    .map((interaction: any) => ({
      from: interaction.archetypes.a,
      to: interaction.archetypes.b,
      result: interaction.archetypes.result,
      vortexA: interaction.vortexA,
      vortexB: interaction.vortexB,
      path: interaction.paths.vortexA
    }));

  return universe;
}

/**
 * Calculate consciousness multiplier for patterns
 */
export function calculateConsciousnessMultiplier(patterns: any[]): number {
  return patterns.reduce((mult, pattern) => mult * pattern.consciousnessMultiplier, 1.0);
}

/**
 * Analyze all harmony patterns
 */
export function analyzeAllHarmonyPatterns(): {
  allPatterns: any[];
  patternStats: Record<string, number>;
} {
  const allPatterns = [];
  const patternStats = {
    selfIdentity: 0,
    unity: 0,
    voidGateway: 0,
    axis: 0,
    vortexResonance: 0,
    compound: 0
  };
  
  // Analyze all 100ions in the matrix
  for (let a = 0; a <= 9; a++) {
    for (let b = 0; b <= 9; b++) {
      const patterns = detectHarmonyPatterns(a, b);
      const properties = getEnhancedMathematicalProperties(a, b);
      
      if (patterns.length > 0) {
        allPatterns.push({
          position: a + '/' + b,
          archetypes: DIGIT_ARCHETYPES[a] + '/' + DIGIT_ARCHETYPES[b],
          patterns: patterns,
          consciousnessMultiplier: properties.consciousnessMultiplier,
          vortexA: properties.vortexA,
          vortexB: properties.vortexB.toFixed(4)
        });
        
        // Count pattern types
        patterns.forEach(pattern => {
          switch(pattern.type) {
            case HARMONY_PATTERNS.SELF_IDENTITY:
              patternStats.selfIdentity++;
              break;
            case HARMONY_PATTERNS.UNITY:
              patternStats.unity++;
              break;
            case HARMONY_PATTERNS.VOID_GATEWAY:
              patternStats.voidGateway++;
              break;
            case HARMONY_PATTERNS.AXIS:
              patternStats.axis++;
              break;
            case HARMONY_PATTERNS.VORTEX_RESONANCE:
              patternStats.vortexResonance++;
              break;
          }
        });
        
        if (patterns.length > 1) {
          patternStats.compound++;
        }
      }
    }
  }
  
  return { allPatterns, patternStats };
}

/**
 * Mathematics System Export
 */
export const MathematicsSystem = {
  generateVortexA,
  generateVortexB,
  generatePolaritySwitch,
  detectHarmonyPatterns,
  getEnhancedMathematicalProperties,
  analyzeMetatronCubeAlignment,
  mapZeropointToMetatronCube,
  generateInteractionName,
  generateUniverse,
  calculateConsciousnessMultiplier,
  analyzeAllHarmonyPatterns,
  DIGIT_ARCHETYPES,
  VORTEX_SEQUENCES,
  METATRON_CUBE,
  HARMONY_PATTERNS
}; 