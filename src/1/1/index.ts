/**
 * PWA Node Logic for 1/1 - Foundation/Source
 *
 * This file is the logic entry point for the PWA node (1/1).
 * It exports all math/generative logic for this node, and can be extended
 * with UI, navigation, or service worker logic as needed.
 * 
 * Foundation field operations, A432 harmonic foundation, coil consciousness,
 * source patterns, and living foundation calculations per ZeroPoint principles.
 */
// Import mathematical functions from centralized system (digit 2)
import { getHarmonicResult, getAntiVortexDecimal, getPattern } from '../../2/math';

/** Symbolic name for this node (a/b) */
export const symbolicName = '1/1';

/** Harmonic result for this node (a + b mod 9, 9 instead of 0) */
export const harmonicResult = 2;

/** Anti-vortex decimal for this node ((a + b) / harmonicResult) */
export const antiVortexDecimal = 1.00;

/** Pattern for this node: [a, b, harmonicResult] */
export const pattern = [1, 1, 2];

/** A432 harmonic foundation as integer fraction (432/1) */
export const a432HarmonicFoundation = { numerator: 432, denominator: 1 };

/** Foundation resonance (2:1) as integer fraction */
export const foundationResonance = { numerator: 2, denominator: 1 };

/**
 * A432 harmonic constants - pure integers
 * These constants define the fundamental A432 harmonic structure.
 * Metaphysical: Each constant represents a fundamental aspect of A432 harmony.
 */
export const A432_CONSTANTS = {
  FREQUENCY: 432,
  DIGITAL_ROOT: 9,
  HARMONIC_RATIO: { numerator: 27, denominator: 16 }, // Pure fraction
  VORTEX_SEQUENCE: [1, 2, 4, 8, 7, 5] as const,
  W_AXIS: [3, 6, 9] as const,
  FAMILY_GROUPS: [1, 4, 7, 2, 5, 8, 3, 6, 9] as const,
  POLAR_MATES: [1, 8, 2, 7, 4, 5] as const
};

/**
 * Pure integer functions derived from A432 harmony
 * These constants define the foundation mathematical structure.
 * Metaphysical: Each constant represents a fundamental aspect of the foundation.
 */
export const FOUNDATION_CONSTANTS = {
  TURNS: 12, // 3 * 4 (A432 harmonic)
  RADIUS: 1, // Unity
  HEIGHT: 2, // Duality
  PHASE: 0, // Void center
  CONSCIOUSNESS_LEVEL: { numerator: 2, denominator: 3 }, // Sacred fraction
  FIELD_RESONANCE: { numerator: 3, denominator: 4 }, // Sacred fraction
  MAJOR_RADIUS: 2, // Duality
  MINOR_RADIUS: 1, // Unity
  TOTAL_NODES: 72, // 12 * 6 (A432 harmonic)
  VORTEX_LENGTH: 6, // Length of vortex sequence
  W_AXIS_LENGTH: 3 // Length of W-axis
};

/**
 * Foundation Node Interface
 * Represents a single node in the foundation with metaphysical and mathematical properties.
 * Metaphysical: Models the consciousness and field properties of each foundation node.
 */
export interface FoundationNode {
  index: number;
  vortexNumber: number;
  position: [number, number, number]; // x, y, z
  color: string;
  metaphysicalContext: string;
  consciousnessLevel: { numerator: number, denominator: number };
  fieldStrength: { numerator: number, denominator: number };
}

/**
 * Foundation Configuration Interface
 * Represents the configuration parameters for the foundation.
 * Metaphysical: Models the consciousness and field parameters of the foundation.
 */
export interface FoundationConfig {
  turns: number;
  radius: number;
  height: number;
  phase: number;
  consciousnessLevel: { numerator: number, denominator: number }; // Sacred fraction
  fieldResonance: { numerator: number, denominator: number }; // Sacred fraction
}

/**
 * Foundation Class
 * The core class for foundation mathematical operations and consciousness calculations.
 * Metaphysical: Represents the living mathematical structure of the foundation.
 */
export class Foundation {
  public readonly config: FoundationConfig;
  public readonly nodes: FoundationNode[];

  /**
   * Constructor for the Foundation
   * Metaphysical: Initializes the consciousness and field parameters of the foundation.
   * Technical: Sets up the foundation with the specified configuration parameters.
   */
  constructor(config: Partial<FoundationConfig> = {}) {
    this.config = {
      turns: config.turns ?? FOUNDATION_CONSTANTS.TURNS,
      radius: config.radius ?? FOUNDATION_CONSTANTS.RADIUS,
      height: config.height ?? FOUNDATION_CONSTANTS.HEIGHT,
      phase: config.phase ?? FOUNDATION_CONSTANTS.PHASE,
      consciousnessLevel: config.consciousnessLevel ?? FOUNDATION_CONSTANTS.CONSCIOUSNESS_LEVEL,
      fieldResonance: config.fieldResonance ?? FOUNDATION_CONSTANTS.FIELD_RESONANCE,
    };

    this.nodes = this.generateFoundationNodes();
  }

  /**
   * Generate 3D node positions and metaphysical data for the foundation
   * Metaphysical: Models the creation of consciousness nodes in 3D space.
   * Technical: Creates 3D coordinates and metaphysical data for each foundation node.
   */
  private generateFoundationNodes(): FoundationNode[] {
    const nodes: FoundationNode[] = [];
    const { turns, radius, height, phase } = this.config;
    const vortexSeq = A432_CONSTANTS.VORTEX_SEQUENCE;
    const totalNodes = turns * vortexSeq.length;
    const dz = height / totalNodes;

    for (let i = 0; i < totalNodes; i++) {
      const vortexNumber = vortexSeq[i % vortexSeq.length] ?? 1;
      const theta = ((2 * Math.PI) / vortexSeq.length) * i + phase;
      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta);
      const z = dz * i - height / 2;

      // Generate dynamic color based on current context
      const color = this.getColorForVortexNumber(vortexNumber);
      const metaphysicalContext = this.getMetaphysicalContext(vortexNumber);
      const consciousnessLevel = this.calculateConsciousnessLevel(vortexNumber);
      const fieldStrength = this.calculateFieldStrength(vortexNumber);

      nodes.push({
        index: i,
        vortexNumber,
        position: [x, y, z],
        color,
        metaphysicalContext,
        consciousnessLevel,
        fieldStrength,
      });
    }
    return nodes;
  }

  /**
   * Calculate consciousness level for a vortex number
   * Metaphysical: Models the consciousness level of each vortex number.
   * Technical: Returns sacred fraction (integer ratio) consciousness levels.
   */
  private calculateConsciousnessLevel(vortexNumber: number): { numerator: number, denominator: number } {
    // Consciousness levels as sacred fractions
    const consciousnessLevels: Record<number, { numerator: number, denominator: number }> = {
      1: { numerator: 2, denominator: 3 }, // Unity consciousness
      2: { numerator: 3, denominator: 4 }, // Duality consciousness
      4: { numerator: 4, denominator: 5 }, // Stability consciousness
      8: { numerator: 5, denominator: 6 }, // Fullness consciousness
      7: { numerator: 6, denominator: 7 }, // Return consciousness
      5: { numerator: 7, denominator: 8 }, // Transformation consciousness
      3: { numerator: 8, denominator: 9 }, // Spirit consciousness
      6: { numerator: 9, denominator: 10 }, // Balance consciousness
      9: { numerator: 10, denominator: 11 }, // Void consciousness
    };
    
    return consciousnessLevels[vortexNumber] ?? { numerator: 2, denominator: 3 };
  }

  /**
   * Calculate field strength for a vortex number
   * Metaphysical: Models the field strength of each vortex number.
   * Technical: Returns sacred fraction (integer ratio) field strengths.
   */
  private calculateFieldStrength(vortexNumber: number): { numerator: number, denominator: number } {
    // Field strengths as sacred fractions
    const fieldStrengths: Record<number, { numerator: number, denominator: number }> = {
      1: { numerator: 3, denominator: 4 }, // Unity field
      2: { numerator: 4, denominator: 5 }, // Duality field
      4: { numerator: 5, denominator: 6 }, // Stability field
      8: { numerator: 6, denominator: 7 }, // Fullness field
      7: { numerator: 7, denominator: 8 }, // Return field
      5: { numerator: 8, denominator: 9 }, // Transformation field
      3: { numerator: 9, denominator: 10 }, // Spirit field
      6: { numerator: 10, denominator: 11 }, // Balance field
      9: { numerator: 11, denominator: 12 }, // Void field
    };
    
    return fieldStrengths[vortexNumber] ?? { numerator: 3, denominator: 4 };
  }

  /**
   * Get metaphysical context for a vortex number
   * Metaphysical: Provides the metaphysical meaning of each vortex number.
   * Technical: Returns descriptive text for each vortex number.
   */
  private getMetaphysicalContext(vortexNumber: number): string {
    const contexts: Record<number, string> = {
      1: 'Unity - Source of all creation and infinite potential',
      2: 'Duality - Pattern and flow of consciousness',
      4: 'Stability - Constants and mathematical foundation',
      8: 'Fullness - Infinity and universal manifestation',
      7: 'Return - Gateway and completion of cycles',
      5: 'Transformation - Sacred geometry and golden ratio',
      3: 'Spirit - Trinity and creative resonance',
      6: 'Balance - Harmonic balance and consciousness',
      9: 'Void - Axis and completion of unity',
    };
    
    return contexts[vortexNumber] ?? 'Unity - Source of all creation';
  }

  /**
   * Get color for a vortex number
   * Metaphysical: Provides the color representation of each vortex number.
   * Technical: Returns hex color codes for visualization.
   */
  private getColorForVortexNumber(vortexNumber: number): string {
    const colors: Record<number, string> = {
      1: '#FF0000', // Red - Unity
      2: '#FF8000', // Orange - Duality
      4: '#FFFF00', // Yellow - Stability
      8: '#00FF00', // Green - Fullness
      7: '#0080FF', // Blue - Return
      5: '#8000FF', // Purple - Transformation
      3: '#FF0080', // Pink - Spirit
      6: '#00FFFF', // Cyan - Balance
      9: '#FFFFFF', // White - Void
    };
    
    return colors[vortexNumber] ?? '#FF0000';
  }

  /**
   * Get node positions for 3D visualization
   * Metaphysical: Provides the spatial coordinates of consciousness nodes.
   * Technical: Returns array of 3D coordinates.
   */
  public getNodePositions(): [number, number, number][] {
    return this.nodes.map(node => node.position);
  }

  /**
   * Get node colors for visualization
   * Metaphysical: Provides the color representation of consciousness nodes.
   * Technical: Returns array of hex color codes.
   */
  public getNodeColors(): string[] {
    return this.nodes.map(node => node.color);
  }

  /**
   * Get consciousness levels for analysis
   * Metaphysical: Provides the consciousness levels of all nodes.
   * Technical: Returns array of consciousness level fractions.
   */
  public getConsciousnessLevels(): { numerator: number, denominator: number }[] {
    return this.nodes.map(node => node.consciousnessLevel);
  }

  /**
   * Get field strengths for analysis
   * Metaphysical: Provides the field strengths of all nodes.
   * Technical: Returns array of field strength fractions.
   */
  public getFieldStrengths(): { numerator: number, denominator: number }[] {
    return this.nodes.map(node => node.fieldStrength);
  }

  /**
   * Get toroidal coordinates for advanced visualization
   * Metaphysical: Provides toroidal coordinates for consciousness field visualization.
   * Technical: Returns array of toroidal 3D coordinates.
   */
  public getToroidalCoordinates(
    majorRadius: number = FOUNDATION_CONSTANTS.MAJOR_RADIUS,
    minorRadius: number = FOUNDATION_CONSTANTS.MINOR_RADIUS,
  ): [number, number, number][] {
    return this.nodes.map(node => {
      const [x, y, z] = node.position;
      const r = Math.sqrt(x * x + y * y);
      const theta = Math.atan2(y, x);
      const phi = Math.atan2(z, r - majorRadius);
      
      const toroidalX = (majorRadius + minorRadius * Math.cos(phi)) * Math.cos(theta);
      const toroidalY = (majorRadius + minorRadius * Math.cos(phi)) * Math.sin(theta);
      const toroidalZ = minorRadius * Math.sin(phi);
      
      return [toroidalX, toroidalY, toroidalZ];
    });
  }

  /**
   * Calculate field resonance at a specific point
   * Metaphysical: Models the field resonance at any point in 3D space.
   * Technical: Returns resonance value based on distance from nodes.
   */
  public calculateFieldResonance(x: number, y: number, z: number): number {
    let totalResonance = 0;
    let totalWeight = 0;
    
    for (const node of this.nodes) {
      const [nx, ny, nz] = node.position;
      const distance = Math.sqrt((x - nx) ** 2 + (y - ny) ** 2 + (z - nz) ** 2);
      const weight = 1 / (1 + distance);
      const resonance = (node.fieldStrength.numerator / node.fieldStrength.denominator) * weight;
      
      totalResonance += resonance;
      totalWeight += weight;
    }
    
    return totalWeight > 0 ? totalResonance / totalWeight : 0;
  }

  /**
   * Map consciousness value to nearest node
   * Metaphysical: Maps consciousness values to physical foundation nodes.
   * Technical: Returns the foundation node closest to the given consciousness value.
   */
  public mapConsciousnessToNode(consciousness: number): FoundationNode {
    let closestNode = this.nodes[0];
    let minDistance = Infinity;
    
    for (const node of this.nodes) {
      const nodeConsciousness = node.consciousnessLevel.numerator / node.consciousnessLevel.denominator;
      const distance = Math.abs(consciousness - nodeConsciousness);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestNode = node;
      }
    }
    
    return closestNode;
  }

  /**
   * Get metaphysical summary of the foundation
   * Metaphysical: Provides a comprehensive summary of the foundation's consciousness structure.
   * Technical: Returns descriptive text about the foundation.
   */
  public getMetaphysicalSummary(): string {
    const totalNodes = this.nodes.length;
    const uniqueVortexNumbers = new Set(this.nodes.map(node => node.vortexNumber)).size;
    const averageConsciousness = this.nodes.reduce((sum, node) => 
      sum + (node.consciousnessLevel.numerator / node.consciousnessLevel.denominator), 0) / totalNodes;
    
    return `Foundation with ${totalNodes} consciousness nodes, ${uniqueVortexNumbers} unique vortex patterns, and average consciousness level of ${averageConsciousness.toFixed(3)}.`;
  }

  /**
   * Convert decimal to sacred fraction
   * Metaphysical: Converts decimal consciousness to pure integer ratios.
   * Technical: Returns fraction with numerator and denominator.
   */
  private toSacredFraction(decimal: number): { numerator: number, denominator: number } {
    const tolerance = 1e-6;
    let numerator = Math.round(decimal);
    let denominator = 1;
    
    for (let d = 2; d <= 12; d++) {
      const n = Math.round(decimal * d);
      const fraction = n / d;
      if (Math.abs(fraction - decimal) < tolerance) {
        numerator = n;
        denominator = d;
        break;
      }
    }
    
    return { numerator, denominator };
  }

  /**
   * Calculate greatest common divisor
   * Metaphysical: Finds the common factor between consciousness numbers.
   * Technical: Returns the GCD of two integers.
   */
  private greatestCommonDivisor(a: number, b: number): number {
    return b === 0 ? a : this.greatestCommonDivisor(b, a % b);
  }

  /**
   * Get A432 constants
   * Metaphysical: Provides access to fundamental A432 harmonic constants.
   * Technical: Returns A432_CONSTANTS object.
   */
  public static getA432Constants() {
    return A432_CONSTANTS;
  }

  /**
   * Get foundation constants
   * Metaphysical: Provides access to fundamental foundation constants.
   * Technical: Returns FOUNDATION_CONSTANTS object.
   */
  public static getFoundationConstants() {
    return FOUNDATION_CONSTANTS;
  }
}

/**
 * Compute the harmonic result for this node.
 * @param {number} a
 * @param {number} b
 * @returns {number} Harmonic result (a + b mod 9, 9 instead of 0)
 */

/**
 * Compute the anti-vortex decimal path for this node.
 * @param {number} a
 * @param {number} b
 * @returns {number} Anti-vortex decimal ((a + b) / harmonicResult)
 */

/**
 * Compute foundation field strength based on A432 sequence.
 * @param {number} fieldLevel - The foundation field level (1-9)
 * @returns {number} Foundation field strength as integer
 */
export function getFoundationFieldStrength(fieldLevel: number): number {
  const a432Sequence = [1, 2, 4, 8, 7, 5, 1, 2, 4, 8, 7, 5];
  const index = (fieldLevel - 1) % a432Sequence.length;
  return a432Sequence[index] * 1; // Foundation resonance multiplier
}

/**
 * Compute foundation resonance (2:1) for foundation relationships.
 * @param {number} baseValue - The base value for resonance calculation
 * @returns {number} Resonant value as integer
 */
export function getFoundationResonance(baseValue: number): number {
  return Math.round((baseValue * foundationResonance.numerator) / foundationResonance.denominator);
}

/**
 * Generate source patterns for foundation (all pairs (a, b) where (a + b) mod 9 = 2).
 * @returns {Array<[number, number]>} Array of source pattern pairs
 */
export function getSourcePatterns(): Array<[number, number]> {
  const patterns: Array<[number, number]> = [];
  for (let a = 1; a <= 9; a++) {
    for (let b = 1; b <= 9; b++) {
      if ((a + b) % 9 === 2 || (a + b === 11)) {
        patterns.push([a, b]);
      }
    }
  }
  return patterns;
}

/**
 * Generate foundation patterns for source and unity.
 * @param {number} level - The foundation level (1-9)
 * @returns {number[]} Foundation pattern sequence
 */
export function getFoundationPatterns(level: number): number[] {
  const foundationSequence: number[] = [];
  const a432Base = [1, 2, 4, 8, 7, 5];
  
  for (let i = 0; i < level; i++) {
    const a432Index = i % a432Base.length;
    const foundationValue = a432Base[a432Index] * 1; // Foundation source multiplier
    foundationSequence.push(foundationValue);
  }
  
  return foundationSequence;
}

/**
 * Generate living foundation sequence based on A432 principles.
 * @param {number} length - Length of the sequence to generate
 * @returns {number[]} Living foundation sequence
 */
export function getLivingFoundationSequence(length: number): number[] {
  const sequence: number[] = [];
  const a432Base = [1, 2, 4, 8, 7, 5];
  
  for (let i = 0; i < length; i++) {
    const a432Index = i % a432Base.length;
    const foundationValue = a432Base[a432Index] * 2; // Duality foundation multiplier
    sequence.push(foundationValue);
  }
  
  return sequence;
}

/**
 * Compute A432 harmonic resonance for mathematical stability.
 * @param {number} frequency - Base frequency
 * @returns {number} A432 resonant frequency as integer
 */
export function getA432Resonance(frequency: number): number {
  return Math.round((frequency * a432HarmonicFoundation.numerator) / a432HarmonicFoundation.denominator);
}

/**
 * Foundation harmonic series
 * @param {number} n - Number of harmonics
 * @returns {number[]} Array of harmonic frequencies
 */
export function foundationHarmonicSeries(n: number): number[] {
  return Array.from({ length: n }, (_, i) => A432_CONSTANTS.FREQUENCY * (i + 1));
}

/**
 * Foundation overtone series
 * @param {number} base - Base frequency
 * @param {number} n - Number of overtones
 * @returns {number[]} Array of overtone frequencies
 */
export function foundationOvertoneSeries(base: number, n: number): number[] {
  return Array.from({ length: n }, (_, i) => base * (i + 1));
}

/**
 * Foundation sacred fractions
 * @param {number} maxDenominator - Maximum denominator
 * @returns {number[]} Array of sacred fraction values
 */
export function foundationSacredFractions(maxDenominator: number): number[] {
  const fractions: number[] = [];
  for (let d = 1; d <= maxDenominator; d++) {
    for (let n = 1; n <= d; n++) {
      if (n <= d && n > 0) {
        fractions.push(n / d);
      }
    }
  }
  return [...new Set(fractions)].sort((a, b) => a - b);
}

/**
 * All harmonic interactions for this node.
 * Each entry: { next, pattern, name, math }
 */
export const harmonicInteractions = [
  { next: 1, pattern: '1,1,1,2', name: 'SourceSourceVortex', math: '1 + 1 = 2 ≡ 2 (mod 9)' },
  { next: 2, pattern: '1,1,2,3', name: 'SourceSourceVortexResonance', math: '1 + 2 = 3 ≡ 3 (mod 9)' },
  { next: 3, pattern: '1,1,3,4', name: 'SourceSourceResonanceMath', math: '1 + 3 = 4 ≡ 4 (mod 9)' },
  { next: 4, pattern: '1,1,4,5', name: 'SourceSourceMathCenter', math: '1 + 4 = 5 ≡ 5 (mod 9)' },
  { next: 5, pattern: '1,1,5,6', name: 'SourceSourceCenterHarmony', math: '1 + 5 = 6 ≡ 6 (mod 9)' },
  { next: 6, pattern: '1,1,6,7', name: 'SourceSourceHarmonyGateway', math: '1 + 6 = 7 ≡ 7 (mod 9)' },
  { next: 7, pattern: '1,1,7,8', name: 'SourceSourceGatewayInfinity', math: '1 + 7 = 8 ≡ 8 (mod 9)' },
  { next: 8, pattern: '1,1,8,9', name: 'SourceSourceInfinityAxis', math: '1 + 8 = 9 ≡ 9 (mod 9)' },
  { next: 9, pattern: '1,1,9,1', name: 'SourceSourceAxisSource', math: '1 + 9 = 10 ≡ 1 (mod 9)' },
];

/**
 * Placeholder for PWA node initialization logic.
 * Extend this function to add UI, navigation, or service worker logic.
 */
export default function initNodePWA() {
  // PWA logic for node 1/1 can be added here.
}
