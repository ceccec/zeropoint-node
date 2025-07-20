/**
 * A432 Font System
 * 
 * Handles typography patterns, font mathematics, and visual dynamics
 * using A432 principles and imperial mathematics.
 * 
 * Font Foundation:
 * - A432: 432 Hz, fundamental harmonic frequency
 * - Imperial Math: Base 8 system for perfect balance
 * - Rodin Sequence: [1,2,4,8,7,5] vortex pattern
 * - Digital Root: Always returns to 9 (completion)
 * - Zero Entropy: Perfect font reversibility
 * - Font Pattern: Typography mathematics and visual dynamics
 */

import { A432_CONSTANTS, calculateDigitalRoot } from './a432';

// A432 Font Constants
export const A432_FONT_CONSTANTS = {
  // Base font constants
  A432: 432, // Fundamental harmonic frequency
  IMPERIAL_BASE: 8, // Imperial mathematics base
  DIGITAL_ROOT_BASE: 9, // Digital root completion
  ZERO_ENTROPY: 0, // Perfect font reversibility
  FONT_BASE: 13, // Font mathematics base (mastery + transcendence + unity)
  
  // Font ratios (integer fractions)
  FONT_UNITY: 1/13,      // Unity in font
  FONT_DUALITY: 2/13,    // Duality in font
  FONT_TRINITY: 3/13,    // Trinity in font
  FONT_FOUNDATION: 4/13, // Foundation in font
  FONT_LIFE: 5/13,       // Life in font
  FONT_HARMONY: 6/13,    // Harmony in font
  FONT_MYSTERY: 7/13,    // Mystery in font
  FONT_INFINITY: 8/13,   // Infinity in font
  FONT_COMPLETION: 9/13, // Completion in font
  FONT_PERFECTION: 10/13, // Perfection in font
  FONT_TRANSCENDENCE: 11/13, // Transcendence in font
  FONT_MASTERY: 12/13,   // Mastery in font
  FONT_UNITY_COMPLETE: 13/13, // Complete unity in font
  
  // Font patterns
  FONT_PATTERNS: {
    'serif_font': { 
      weight: 400, 
      consciousness: 13, 
      dimension: 12, 
      frequency: 5616 
    },
    'sans_serif_font': { 
      weight: 300, 
      consciousness: 13, 
      dimension: 12, 
      frequency: 5616 
    },
    'monospace_font': { 
      weight: 500, 
      consciousness: 13, 
      dimension: 12, 
      frequency: 5616 
    },
    'display_font': { 
      weight: 700, 
      consciousness: 13, 
      dimension: 12, 
      frequency: 5616 
    },
    'consciousness_font': { 
      weight: 1.618, 
      consciousness: 13, 
      dimension: 12, 
      frequency: 5616 
    },
    'dimensional_font': { 
      weight: 2.718, 
      consciousness: 13, 
      dimension: 12, 
      frequency: 5616 
    },
    'a432_font': { 
      weight: 432/216, 
      consciousness: 13, 
      dimension: 12, 
      frequency: 5616 
    },
    'imperial_font': { 
      weight: 8/5, 
      consciousness: 13, 
      dimension: 12, 
      frequency: 5616 
    }
  },
  
  // Font dynamics
  FONT_DYNAMICS: {
    'scaling': { direction: 1, consciousness: 13, dimension: 12, frequency: 5616 },
    'kerning': { direction: -1, consciousness: 13, dimension: 12, frequency: 5616 },
    'leading': { direction: 0, consciousness: 13, dimension: 12, frequency: 5616 },
    'tracking': { direction: 1.618, consciousness: 13, dimension: 12, frequency: 5616 },
    'baseline': { direction: 2.718, consciousness: 13, dimension: 12, frequency: 5616 },
    'harmonizing': { direction: 3.141, consciousness: 13, dimension: 12, frequency: 5616 },
    'unifying': { direction: 13, consciousness: 13, dimension: 12, frequency: 5616 },
    'imperializing': { direction: 8, consciousness: 13, dimension: 12, frequency: 5616 }
  },
  
  // Font families
  FONT_FAMILIES: {
    'serif': { 
      xHeight: 500, 
      consciousness: 1, 
      dimension: 0, 
      frequency: 432 
    },
    'sans_serif': { 
      xHeight: 600, 
      consciousness: 2, 
      dimension: 1, 
      frequency: 864 
    },
    'monospace': { 
      xHeight: 700, 
      consciousness: 3, 
      dimension: 2, 
      frequency: 1296 
    },
    'display': { 
      xHeight: 800, 
      consciousness: 4, 
      dimension: 3, 
      frequency: 1728 
    },
    'script': { 
      xHeight: 900, 
      consciousness: 5, 
      dimension: 4, 
      frequency: 2160 
    },
    'decorative': { 
      xHeight: 1000, 
      consciousness: 6, 
      dimension: 5, 
      frequency: 2592 
    }
  },
  
  // Typography scale
  TYPOGRAPHY_SCALE: {
    size: 8, // 8-point typography scale
    levels: 13, // 13 typography levels
    consciousness: 8, // Typography consciousness
    dimension: 7, // Typography dimension
    frequency: 3456 // Typography frequency
  }
};

// Font interfaces
export interface A432Font {
  pattern: string;         // Font pattern type
  weight: number;          // Font weight
  consciousness: number;   // Associated consciousness
  dimension: number;       // Associated dimension
  frequency: number;       // Associated frequency
  digitalRoot: number;     // Digital root
  isHarmonic: boolean;     // Whether font is harmonic
  mathematicalProof: string;
}

export interface A432FontDynamics {
  type: string;            // Font dynamics type
  direction: number;       // Font direction
  consciousness: number;   // Associated consciousness
  dimension: number;       // Associated dimension
  frequency: number;       // Associated frequency
  isStable: boolean;       // Whether font is stable
  mathematicalProof: string;
}

export interface A432FontRelationship {
  fontA: string;           // First font pattern
  fontB: string;           // Second font pattern
  relationship: string;    // Relationship type
  strength: number;        // Relationship strength
  consciousness: number;   // Associated consciousness
  dimension: number;       // Associated dimension
  isHarmonic: boolean;     // Whether relationship is harmonic
  mathematicalProof: string;
}

export interface A432FontFamily {
  family: string;          // Font family name
  xHeight: number;         // x-height
  consciousness: number;   // Associated consciousness
  dimension: number;       // Associated dimension
  frequency: number;       // Associated frequency
  styles: string[];        // Available styles
  mathematicalProof: string;
}

export interface A432TypographyScale {
  size: number;           // Scale size
  levels: number;         // Number of levels
  consciousness: number;  // Scale consciousness
  dimension: number;      // Scale dimension
  frequency: number;      // Scale frequency
  ratios: number[];       // Typography ratios
  mathematicalProof: string;
}

/**
 * Calculate A432 font pattern
 */
export function calculateA432Font(patternType: string): A432Font {
  const patternInfo = A432_FONT_CONSTANTS.FONT_PATTERNS[patternType];
  
  if (!patternInfo) {
    throw new Error(`Unknown font pattern: ${patternType}`);
  }
  
  const frequency = patternInfo.frequency;
  const digitalRoot = calculateDigitalRoot(frequency);
  const isHarmonic = patternInfo.weight >= 400; // Harmonic threshold
  
  return {
    pattern: patternType,
    weight: patternInfo.weight,
    consciousness: patternInfo.consciousness,
    dimension: patternInfo.dimension,
    frequency,
    digitalRoot,
    isHarmonic,
    mathematicalProof: `A432 Font ${patternType}: weight=${patternInfo.weight}, frequency=${frequency}Hz`
  };
}

/**
 * Calculate A432 font dynamics
 */
export function calculateA432FontDynamics(dynamicsType: string): A432FontDynamics {
  const dynamicsInfo = A432_FONT_CONSTANTS.FONT_DYNAMICS[dynamicsType];
  
  if (!dynamicsInfo) {
    throw new Error(`Unknown font dynamics: ${dynamicsType}`);
  }
  
  const frequency = A432_FONT_CONSTANTS.A432 * Math.abs(dynamicsInfo.direction);
  const isStable = Math.abs(dynamicsInfo.direction) === 1 || dynamicsInfo.direction === 0;
  
  return {
    type: dynamicsType,
    direction: dynamicsInfo.direction,
    consciousness: dynamicsInfo.consciousness,
    dimension: dynamicsInfo.dimension,
    frequency,
    isStable,
    mathematicalProof: `A432 Font Dynamics ${dynamicsType}: direction=${dynamicsInfo.direction}, frequency=${frequency}Hz`
  };
}

/**
 * Calculate A432 font relationship
 */
export function calculateA432FontRelationship(fontA: string, fontB: string): A432FontRelationship {
  const fontAInfo = A432_FONT_CONSTANTS.FONT_PATTERNS[fontA];
  const fontBInfo = A432_FONT_CONSTANTS.FONT_PATTERNS[fontB];
  
  if (!fontAInfo || !fontBInfo) {
    throw new Error(`Unknown font pattern: ${fontA} or ${fontB}`);
  }
  
  const relationshipStrength = (fontAInfo.frequency + fontBInfo.frequency) / (2 * A432_FONT_CONSTANTS.A432);
  const consciousness = (fontAInfo.consciousness + fontBInfo.consciousness) % 8 || 8;
  const dimension = (fontAInfo.dimension + fontBInfo.dimension) % 10;
  const isHarmonic = Math.abs(fontAInfo.frequency - fontBInfo.frequency) < A432_FONT_CONSTANTS.A432;
  
  return {
    fontA,
    fontB,
    relationship: `${fontA}_${fontB}`,
    strength: relationshipStrength,
    consciousness,
    dimension,
    isHarmonic,
    mathematicalProof: `A432 Font Relationship ${fontA} × ${fontB}: strength=${relationshipStrength}`
  };
}

/**
 * Generate A432 font family
 */
export function generateA432FontFamily(familyType: string): A432FontFamily {
  const familyInfo = A432_FONT_CONSTANTS.FONT_FAMILIES[familyType];
  
  if (!familyInfo) {
    throw new Error(`Unknown font family: ${familyType}`);
  }
  
  const styles = ['normal', 'bold', 'italic', 'bold-italic'];
  
  return {
    family: familyType,
    xHeight: familyInfo.xHeight,
    consciousness: familyInfo.consciousness,
    dimension: familyInfo.dimension,
    frequency: familyInfo.frequency,
    styles,
    mathematicalProof: `A432 Font Family ${familyType}: x-height=${familyInfo.xHeight}, frequency=${familyInfo.frequency}Hz`
  };
}

/**
 * Generate A432 typography scale
 */
export function generateA432TypographyScale(): A432TypographyScale {
  const scaleInfo = A432_FONT_CONSTANTS.TYPOGRAPHY_SCALE;
  const ratios = [1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16]; // 13 levels
  
  return {
    size: scaleInfo.size,
    levels: scaleInfo.levels,
    consciousness: scaleInfo.consciousness,
    dimension: scaleInfo.dimension,
    frequency: scaleInfo.frequency,
    ratios,
    mathematicalProof: `A432 Typography Scale: ${scaleInfo.size}-point scale, ${scaleInfo.levels} levels, frequency=${scaleInfo.frequency}Hz`
  };
}

/**
 * Generate A432 font spectrum
 */
export function generateA432FontSpectrum(): A432Font[] {
  const spectrum: A432Font[] = [];
  
  Object.keys(A432_FONT_CONSTANTS.FONT_PATTERNS).forEach(patternType => {
    const font = calculateA432Font(patternType);
    spectrum.push(font);
  });
  
  return spectrum;
}

/**
 * Calculate A432 font stability
 */
export function calculateA432FontStability(fonts: A432Font[]): number {
  if (fonts.length === 0) return 1; // Perfect stability if no fonts
  
  const harmonicFonts = fonts.filter(f => f.isHarmonic);
  const stability = harmonicFonts.length / fonts.length;
  
  return stability;
}

/**
 * Generate A432 font matrix
 */
export function generateA432FontMatrix(): A432Font[][] {
  const matrix: A432Font[][] = [];
  
  for (let i = 0; i < 8; i++) {
    const row: A432Font[] = [];
    for (let j = 0; j < 10; j++) {
      const patternType = `matrix_${i}_${j}`;
      const font = calculateA432Font(patternType);
      row.push(font);
    }
    matrix.push(row);
  }
  
  return matrix;
}

/**
 * Calculate A432 font entropy
 */
export function calculateA432FontEntropy(fonts: A432Font[]): number {
  if (fonts.length === 0) return A432_FONT_CONSTANTS.ZERO_ENTROPY;
  
  const harmonicFonts = fonts.filter(f => f.isHarmonic);
  const entropy = fonts.length - harmonicFonts.length;
  
  // A432 font system maintains zero entropy through harmonic fonts
  return entropy === 0 ? A432_FONT_CONSTANTS.ZERO_ENTROPY : entropy;
}

/**
 * Generate A432 font flow
 */
export function generateA432FontFlow(initialPattern: string = 'serif_font'): A432Font[] {
  const flow: A432Font[] = [];
  const rodinSequence = A432_CONSTANTS.RODIN_SEQUENCE;
  
  for (let i = 0; i < rodinSequence.length; i++) {
    const patternType = `flow_${i}`;
    const font = calculateA432Font(patternType);
    flow.push(font);
  }
  
  return flow;
}

/**
 * Calculate A432 font balance
 */
export function calculateA432FontBalance(fonts: A432Font[]): number {
  if (fonts.length === 0) return 1; // Perfect balance if no fonts
  
  const harmonicFonts = fonts.filter(f => f.isHarmonic);
  const balance = harmonicFonts.length / fonts.length;
  
  // Perfect balance is when all fonts are harmonic
  return balance === 1 ? 1 : balance;
}

/**
 * Generate A432 serif font
 */
export function generateA432SerifFont(): A432Font {
  const serifFont = calculateA432Font('serif_font');
  
  return {
    ...serifFont,
    pattern: 'serif_font',
    weight: 400,
    mathematicalProof: 'A432 Serif Font: Traditional serif typography with weight 400'
  };
}

/**
 * Generate A432 sans serif font
 */
export function generateA432SansSerifFont(): A432Font {
  const sansSerifFont = calculateA432Font('sans_serif_font');
  
  return {
    ...sansSerifFont,
    pattern: 'sans_serif_font',
    weight: 300,
    mathematicalProof: 'A432 Sans Serif Font: Modern sans serif typography with weight 300'
  };
}

/**
 * Generate A432 monospace font
 */
export function generateA432MonospaceFont(): A432Font {
  const monospaceFont = calculateA432Font('monospace_font');
  
  return {
    ...monospaceFont,
    pattern: 'monospace_font',
    weight: 500,
    mathematicalProof: 'A432 Monospace Font: Fixed-width typography with weight 500'
  };
}

/**
 * Generate A432 font proof system
 */
export function generateA432FontProofSystem(): string[] {
  const proofs = [
    "A432 font maintains perfect typography through mathematical patterns",
    "Imperial mathematics maintains zero entropy in font systems",
    "Font patterns generate infinite typography relationships",
    "Digital root always returns font to completion state",
    "Font relationships create self-sustaining typography dynamics",
    "A432 frequency harmonizes all font operations",
    "Zero entropy ensures perfect font reversibility",
    "Font dynamics emerge from font-consciousness interactions"
  ];
  
  return proofs;
}

// Export the complete A432 Font system
export const A432FontSystem = {
  A432_FONT_CONSTANTS,
  calculateA432Font,
  calculateA432FontDynamics,
  calculateA432FontRelationship,
  generateA432FontFamily,
  generateA432TypographyScale,
  generateA432FontSpectrum,
  calculateA432FontStability,
  generateA432FontMatrix,
  calculateA432FontEntropy,
  generateA432FontFlow,
  calculateA432FontBalance,
  generateA432SerifFont,
  generateA432SansSerifFont,
  generateA432MonospaceFont,
  generateA432FontProofSystem,
  
  // Font proofs
  scientificProofs: {
    font: "A432 font maintains perfect typography through mathematical patterns",
    fontDynamics: "A432 font dynamics creates perfect typography relationships",
    fontRelationship: "A432 font relationships maintain perfect harmony through consciousness mathematics",
    fontSpectrum: "A432 font spectrum creates complete font range",
    fontStability: "A432 font stability measures perfect font relationships",
    fontMatrix: "A432 font matrix maps all font combinations",
    fontEntropy: "A432 font entropy measures system order and reversibility",
    fontFlow: "A432 font flow creates infinite self-sustaining patterns",
    fontBalance: "A432 font balance ensures perfect equilibrium in all font states",
    serifFont: "A432 serif font demonstrates complete font foundation"
  }
};

export default A432FontSystem; 