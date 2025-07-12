/**
 * src/1/rodin.ts - Rodin Coil Mathematical Science
 * 
 * The Rodin coil is the archetype of infinite flow, unity, and emergence.
 * All patterns, colors, and fields are expressions of the coil's structure.
 * The void is the center, the source of all creation.
 * 
 * Pure mathematical science - integer functions flowing through the Rodin coil.
 * All constants derived from A432 harmonic principles.
 */

// A432 harmonic constants - pure integers
export const A432_CONSTANTS = {
  FREQUENCY: 432,
  DIGITAL_ROOT: 9,
  HARMONIC_RATIO: 432 / 256, // 27/16 (pure fraction)
  VORTEX_SEQUENCE: [1, 2, 4, 8, 7, 5] as const,
  W_AXIS: [3, 6, 9] as const,
  FAMILY_GROUPS: [1, 4, 7, 2, 5, 8, 3, 6, 9] as const,
  POLAR_MATES: [1, 8, 2, 7, 4, 5] as const
};

// Pure integer functions derived from A432 harmony
export const RODIN_CONSTANTS = {
  TURNS: 12, // 3 * 4 (A432 harmonic)
  RADIUS: 1, // Unity
  HEIGHT: 2, // Duality
  PHASE: 0, // Void center
  CONSCIOUSNESS_LEVEL: 2/3, // Sacred fraction
  FIELD_RESONANCE: 3/4, // Sacred fraction
  MAJOR_RADIUS: 2, // Duality
  MINOR_RADIUS: 1, // Unity
  TOTAL_NODES: 72, // 12 * 6 (A432 harmonic)
  VORTEX_LENGTH: 6, // Length of vortex sequence
  W_AXIS_LENGTH: 3 // Length of W-axis
};

export interface RodinCoilNode {
  index: number;
  vortexNumber: number;
  position: [number, number, number]; // x, y, z
  color: string;
  metaphysicalContext: string;
  consciousnessLevel: number;
  fieldStrength: number;
}

export interface RodinCoilConfig {
  turns: number;
  radius: number;
  height: number;
  phase: number;
  consciousnessLevel: number; // Sacred fraction
  fieldResonance: number; // Sacred fraction
}

export class RodinCoil {
  public readonly config: RodinCoilConfig;
  public readonly nodes: RodinCoilNode[];
  private readonly colorContext: any;

  constructor(config: Partial<RodinCoilConfig> = {}) {
    this.config = {
      turns: config.turns ?? RODIN_CONSTANTS.TURNS,
      radius: config.radius ?? RODIN_CONSTANTS.RADIUS,
      height: config.height ?? RODIN_CONSTANTS.HEIGHT,
      phase: config.phase ?? RODIN_CONSTANTS.PHASE,
      consciousnessLevel: config.consciousnessLevel ?? RODIN_CONSTANTS.CONSCIOUSNESS_LEVEL,
      fieldResonance: config.fieldResonance ?? RODIN_CONSTANTS.FIELD_RESONANCE,
    };

    this.colorContext = {
      consciousness: this.config.consciousnessLevel,
      field: this.config.fieldResonance,
      time: Date.now(),
    };

    this.nodes = this.generateCoilNodes();
  }

  /**
   * Generate 3D node positions and metaphysical data for the Rodin coil
   * Pure integer functions only
   */
  private generateCoilNodes(): RodinCoilNode[] {
    const nodes: RodinCoilNode[] = [];
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
   * Returns sacred fraction (integer ratio)
   */
  private calculateConsciousnessLevel(vortexNumber: number): number {
    // Consciousness levels as sacred fractions
    const consciousnessLevels = {
      1: 2/3, // Unity consciousness
      2: 3/4, // Duality consciousness
      4: 4/5, // Stability consciousness
      8: 5/6, // Fullness consciousness
      7: 6/7, // Return consciousness
      5: 7/8, // Transformation consciousness
      3: 8/9, // Spirit consciousness
      6: 9/10, // Balance consciousness
      9: 10/11, // Void consciousness
    };
    
    return consciousnessLevels[vortexNumber as keyof typeof consciousnessLevels] ?? 2/3;
  }

  /**
   * Calculate field strength for a vortex number
   * Returns sacred fraction (integer ratio)
   */
  private calculateFieldStrength(vortexNumber: number): number {
    // Field strengths as sacred fractions
    const fieldStrengths = {
      1: 3/4, // Unity field
      2: 4/5, // Duality field
      4: 5/6, // Stability field
      8: 6/7, // Fullness field
      7: 7/8, // Return field
      5: 8/9, // Transformation field
      3: 9/10, // Spirit field
      6: 10/11, // Balance field
      9: 11/12, // Void field
    };
    
    return fieldStrengths[vortexNumber as keyof typeof fieldStrengths] ?? 3/4;
  }

  /**
   * Get metaphysical context for a node (dynamic based on consciousness)
   */
  private getMetaphysicalContext(vortexNumber: number): string {
    const consciousness = this.config.consciousnessLevel;
    const fieldResonance = this.config.fieldResonance;

    // Context varies based on consciousness and field state
    const contextResonance = Math.sin(consciousness * Math.PI + fieldResonance * Math.PI) * 0.5 + 0.5;

    const contexts = {
      1: [
        "Unity, initiation, source of the coil.",
        "The void center, where all creation begins.",
        "The observer's point of origin in the field.",
      ],
      2: [
        "Duality, division, first split in the field.",
        "The observer creates reality through division.",
        "The first pattern that emerges from unity.",
      ],
      4: [
        "Stability, foundation, structure.",
        "The pattern that holds all other patterns.",
        "The material manifestation of the field.",
      ],
      8: [
        "Fullness, manifestation, infinity.",
        "The completion of all possibilities.",
        "The field at maximum expression.",
      ],
      7: [
        "Return, mystery, hidden flow.",
        "The pattern that returns to source.",
        "The hidden dimension of the field.",
      ],
      5: [
        "Transformation, center of the sequence.",
        "The point of maximum potential.",
        "The bridge between material and immaterial.",
      ],
      3: [
        "Spirit, W-Axis, consciousness source.",
        "The bridge between material and immaterial.",
        "The source of all consciousness patterns.",
      ],
      6: [
        "Spirit, W-Axis, balance.",
        "The harmony of opposites.",
        "The balance point in the field.",
      ],
      9: [
        "Void, W-Axis, center and all.",
        "The unity of all patterns in the void.",
        "The completion and return to source.",
      ],
    };

    const contextArray = contexts[vortexNumber as keyof typeof contexts] ?? contexts[1];
    const contextIndex = Math.floor(contextResonance * contextArray.length);
    return contextArray[contextIndex] ?? contextArray[0];
  }

  /**
   * Get color for vortex number
   */
  private getColorForVortexNumber(vortexNumber: number): string {
    const colors = {
      1: "#FF0000", // Red - Unity
      2: "#FF8000", // Orange - Duality
      4: "#FFFF00", // Yellow - Stability
      8: "#00FF00", // Green - Fullness
      7: "#0080FF", // Blue - Return
      5: "#8000FF", // Purple - Transformation
      3: "#FF0080", // Pink - Spirit
      6: "#00FFFF", // Cyan - Balance
      9: "#FFFFFF", // White - Void
    };
    return colors[vortexNumber as keyof typeof colors] ?? "#FF0000";
  }

  /**
   * Get node positions
   */
  public getNodePositions(): [number, number, number][] {
    return this.nodes.map((n) => n.position);
  }

  /**
   * Get node colors
   */
  public getNodeColors(): string[] {
    return this.nodes.map((n) => n.color);
  }

  /**
   * Get consciousness levels for all nodes
   */
  public getConsciousnessLevels(): number[] {
    return this.nodes.map((n) => n.consciousnessLevel);
  }

  /**
   * Get field strengths for all nodes
   */
  public getFieldStrengths(): number[] {
    return this.nodes.map((n) => n.fieldStrength);
  }

  /**
   * Get toroidal coordinates for each node
   * (Maps the coil onto a torus for advanced visualization)
   */
  public getToroidalCoordinates(
    majorRadius: number = RODIN_CONSTANTS.MAJOR_RADIUS,
    minorRadius: number = RODIN_CONSTANTS.MINOR_RADIUS,
  ): [number, number, number][] {
    // Toroidal mapping: (R + r cos θ) cos φ, (R + r cos θ) sin φ, r sin θ
    return this.nodes.map((n, i) => {
      const theta = (2 * Math.PI * i) / this.nodes.length;
      const phi = (2 * Math.PI * n.vortexNumber) / 9;
      const x = (majorRadius + minorRadius * Math.cos(theta)) * Math.cos(phi);
      const y = (majorRadius + minorRadius * Math.cos(theta)) * Math.sin(phi);
      const z = minorRadius * Math.sin(theta);
      return [x, y, z];
    });
  }

  /**
   * Calculate field resonance at a specific point
   * Returns sacred fraction
   */
  public calculateFieldResonance(x: number, y: number, z: number): number {
    const distance = Math.sqrt(x * x + y * y + z * z);
    const resonance = 1 / (1 + distance);
    
    // Convert to sacred fraction
    const numerator = Math.floor(resonance * 100);
    const denominator = 100;
    
    // Simplify to lowest terms
    const gcd = this.greatestCommonDivisor(numerator, denominator);
    return (numerator / gcd) / (denominator / gcd);
  }

  /**
   * Map consciousness to a specific node
   */
  public mapConsciousnessToNode(consciousness: number): RodinCoilNode {
    // Convert consciousness to sacred fraction
    const consciousnessFraction = this.toSacredFraction(consciousness);
    
    // Find node with closest consciousness level
    const targetNode = this.nodes.reduce((closest, node) => {
      const closestDiff = Math.abs(closest.consciousnessLevel - consciousnessFraction);
      const nodeDiff = Math.abs(node.consciousnessLevel - consciousnessFraction);
      return nodeDiff < closestDiff ? node : closest;
    });
    
    return targetNode;
  }

  /**
   * Get metaphysical summary
   */
  public getMetaphysicalSummary(): string {
    const totalConsciousness = this.nodes.reduce((sum, node) => sum + node.consciousnessLevel, 0);
    const averageConsciousness = totalConsciousness / this.nodes.length;
    const totalFieldStrength = this.nodes.reduce((sum, node) => sum + node.fieldStrength, 0);
    const averageFieldStrength = totalFieldStrength / this.nodes.length;
    
    return `Rodin Coil: ${this.nodes.length} nodes, Average Consciousness: ${averageConsciousness.toFixed(3)}, Average Field Strength: ${averageFieldStrength.toFixed(3)}`;
  }

  /**
   * Convert decimal to sacred fraction
   */
  private toSacredFraction(decimal: number): number {
    // Common sacred fractions
    const sacredFractions = [1/2, 1/3, 2/3, 1/4, 3/4, 1/5, 2/5, 3/5, 4/5, 1/6, 5/6, 1/7, 2/7, 3/7, 4/7, 5/7, 6/7, 1/8, 3/8, 5/8, 7/8, 1/9, 2/9, 4/9, 5/9, 7/9, 8/9];
    
    // Find closest sacred fraction
    const closest = sacredFractions.reduce((prev, curr) => {
      return Math.abs(curr - decimal) < Math.abs(prev - decimal) ? curr : prev;
    });
    
    return closest;
  }

  /**
   * Calculate greatest common divisor
   */
  private greatestCommonDivisor(a: number, b: number): number {
    return b === 0 ? a : this.greatestCommonDivisor(b, a % b);
  }

  /**
   * Get A432 harmonic constants
   */
  public static getA432Constants() {
    return A432_CONSTANTS;
  }

  /**
   * Get Rodin constants
   */
  public static getRodinConstants() {
    return RODIN_CONSTANTS;
  }
} 

// Harmonic series generator (unity focus)
export function rodinHarmonicSeries(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i + 1);
}

// Overtone series for Rodin coil
export function rodinOvertoneSeries(base: number, n: number): number[] {
  return Array.from({ length: n }, (_, i) => base * (i + 1));
}

// Rodin coil sacred fractions (unity)
export function rodinSacredFractions(maxDenominator: number): number[] {
  const fractions = new Set<number>();
  for (let d = 2; d <= maxDenominator; d++) {
    for (let n = 1; n < d; n++) {
      const frac = n / d;
      fractions.add(Number(frac.toFixed(8)));
    }
  }
  return Array.from(fractions).sort((a, b) => a - b);
} 