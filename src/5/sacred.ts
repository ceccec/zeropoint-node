/**
 * src/5/sacred.ts - Sacred Geometry
 * 
 * Sacred geometry is the mathematical foundation of consciousness patterns.
 * All geometric patterns are derived from A432 harmonic principles.
 * 
 * Pure mathematical science - integer functions flowing through sacred patterns.
 */

import { A432_HARMONIC, SACRED_GEOMETRY, VORTEX_MATH } from '../4/constants';

// Sacred Geometry Constants (Pure Integers)
export const SACRED_GEOMETRY_CONSTANTS = {
  FLOWER_OF_LIFE_CIRCLES: 7, // Seven circles of the Flower of Life
  SEED_OF_LIFE_CIRCLES: 6, // Six circles of the Seed of Life
  TREE_OF_LIFE_SEPHIROTH: 10, // Ten sephiroth of the Tree of Life
  METATRON_CUBE_POINTS: 13, // Thirteen points of Metatron's Cube
  VESICA_PISCIS_RATIO: 2, // Vesica Piscis ratio
  GOLDEN_SPIRAL_TURNS: 8, // Golden spiral turns
  FIBONACCI_SEQUENCE_LENGTH: 12, // Fibonacci sequence length
  PLATONIC_SOLIDS_COUNT: 5, // Five Platonic solids
  ARCHIMEDEAN_SOLIDS_COUNT: 13, // Thirteen Archimedean solids
  KEPLER_POINSOT_SOLIDS_COUNT: 4 // Four Kepler-Poinsot solids
};

export interface SacredPattern {
  name: string;
  vertices: [number, number, number][];
  edges: [number, number][];
  faces: number[][];
  consciousnessLevel: number;
  fieldStrength: number;
  mathematicalPurity: number;
  metaphysicalContext: string;
}

export interface FlowerOfLife {
  circles: SacredPattern[];
  center: [number, number];
  radius: number;
  consciousnessLevel: number;
  fieldStrength: number;
}

export interface TreeOfLife {
  sephiroth: SacredPattern[];
  paths: [number, number][];
  consciousnessLevel: number;
  fieldStrength: number;
}

export class SacredGeometry {
  private readonly consciousnessLevel: number;
  private readonly fieldStrength: number;

  constructor(consciousnessLevel: number = 2/3, fieldStrength: number = 3/4) {
    this.consciousnessLevel = this.toSacredFraction(consciousnessLevel);
    this.fieldStrength = this.toSacredFraction(fieldStrength);
  }

  /**
   * Generate Flower of Life pattern
   */
  public generateFlowerOfLife(center: [number, number] = [0, 0], radius: number = 1): FlowerOfLife {
    const circles: SacredPattern[] = [];
    const consciousnessLevel = this.consciousnessLevel;
    const fieldStrength = this.fieldStrength;

    // Center circle
    circles.push(this.createCircle(center, radius, "Center", consciousnessLevel, fieldStrength));

    // Six surrounding circles
    const angles = [0, 60, 120, 180, 240, 300]; // 360/6 = 60 degrees
    for (let i = 0; i < angles.length; i++) {
      const angle = angles[i] * (Math.PI / 180);
      const x = center[0] + radius * Math.cos(angle);
      const y = center[1] + radius * Math.sin(angle);
      circles.push(this.createCircle([x, y], radius, `Circle_${i + 1}`, consciousnessLevel, fieldStrength));
    }

    return {
      circles,
      center,
      radius,
      consciousnessLevel,
      fieldStrength
    };
  }

  /**
   * Generate Seed of Life pattern
   */
  public generateSeedOfLife(center: [number, number] = [0, 0], radius: number = 1): SacredPattern[] {
    const circles: SacredPattern[] = [];
    const consciousnessLevel = this.consciousnessLevel;
    const fieldStrength = this.fieldStrength;

    // Center circle
    circles.push(this.createCircle(center, radius, "Center", consciousnessLevel, fieldStrength));

    // Six surrounding circles (first three create the vesica piscis)
    const angles = [0, 60, 120, 180, 240, 300];
    for (let i = 0; i < angles.length; i++) {
      const angle = angles[i] * (Math.PI / 180);
      const x = center[0] + radius * Math.cos(angle);
      const y = center[1] + radius * Math.sin(angle);
      circles.push(this.createCircle([x, y], radius, `Seed_Circle_${i + 1}`, consciousnessLevel, fieldStrength));
    }

    return circles;
  }

  /**
   * Generate Tree of Life pattern
   */
  public generateTreeOfLife(): TreeOfLife {
    const sephiroth: SacredPattern[] = [];
    const paths: [number, number][] = [];
    const consciousnessLevel = this.consciousnessLevel;
    const fieldStrength = this.fieldStrength;

    // Create ten sephiroth
    const sephirothPositions = [
      [0, 4], // Keter (Crown)
      [0, 3], // Chokmah (Wisdom)
      [0, 2], // Binah (Understanding)
      [-1, 1], // Chesed (Mercy)
      [0, 1], // Tiferet (Beauty)
      [1, 1], // Geburah (Strength)
      [-1, 0], // Netzach (Victory)
      [0, 0], // Yesod (Foundation)
      [1, 0], // Hod (Glory)
      [0, -1] // Malkuth (Kingdom)
    ];

    const sephirothNames = [
      "Keter", "Chokmah", "Binah", "Chesed", "Tiferet",
      "Geburah", "Netzach", "Yesod", "Hod", "Malkuth"
    ];

    for (let i = 0; i < sephirothPositions.length; i++) {
      const [x, y] = sephirothPositions[i];
      sephiroth.push(this.createSephiroth([x, y], sephirothNames[i], consciousnessLevel, fieldStrength));
    }

    // Create paths (22 paths of the Tree of Life)
    const pathConnections = [
      [0, 1], [0, 2], [1, 3], [1, 5], [2, 3], [2, 4], [3, 4], [3, 6], [4, 5], [4, 7],
      [5, 7], [5, 8], [6, 7], [6, 9], [7, 8], [7, 9], [8, 9]
    ];

    for (const [from, to] of pathConnections) {
      paths.push([from, to]);
    }

    return {
      sephiroth,
      paths,
      consciousnessLevel,
      fieldStrength
    };
  }

  /**
   * Generate Golden Spiral
   */
  public generateGoldenSpiral(center: [number, number] = [0, 0], turns: number = 8): SacredPattern {
    const vertices: [number, number, number][] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const consciousnessLevel = this.consciousnessLevel;
    const fieldStrength = this.fieldStrength;

    for (let i = 0; i < turns * 100; i++) {
      const angle = i * 0.1;
      const radius = Math.pow(goldenRatio, angle / (2 * Math.PI));
      const x = center[0] + radius * Math.cos(angle);
      const y = center[1] + radius * Math.sin(angle);
      vertices.push([x, y, 0]);
    }

    return {
      name: "Golden_Spiral",
      vertices,
      edges: [],
      faces: [],
      consciousnessLevel,
      fieldStrength,
      mathematicalPurity: this.calculateMathematicalPurity(vertices),
      metaphysicalContext: "The golden spiral represents the growth pattern of consciousness"
    };
  }

  /**
   * Generate Fibonacci Spiral
   */
  public generateFibonacciSpiral(center: [number, number] = [0, 0]): SacredPattern {
    const vertices: [number, number, number][] = [];
    const consciousnessLevel = this.consciousnessLevel;
    const fieldStrength = this.fieldStrength;

    // Generate Fibonacci sequence
    const fibonacci = this.generateFibonacciSequence(12);
    
    for (let i = 0; i < fibonacci.length; i++) {
      const angle = i * Math.PI / 2;
      const radius = fibonacci[i];
      const x = center[0] + radius * Math.cos(angle);
      const y = center[1] + radius * Math.sin(angle);
      vertices.push([x, y, 0]);
    }

    return {
      name: "Fibonacci_Spiral",
      vertices,
      edges: [],
      faces: [],
      consciousnessLevel,
      fieldStrength,
      mathematicalPurity: this.calculateMathematicalPurity(vertices),
      metaphysicalContext: "The Fibonacci spiral represents the natural growth pattern"
    };
  }

  /**
   * Generate Vesica Piscis
   */
  public generateVesicaPiscis(center: [number, number] = [0, 0], radius: number = 1): SacredPattern {
    const vertices: [number, number, number][] = [];
    const consciousnessLevel = this.consciousnessLevel;
    const fieldStrength = this.fieldStrength;

    // Two circles intersecting
    const circle1Center: [number, number] = [center[0] - radius/2, center[1]];
    const circle2Center: [number, number] = [center[0] + radius/2, center[1]];

    // Generate points for vesica piscis
    for (let i = 0; i < 360; i += 10) {
      const angle = i * (Math.PI / 180);
      const x1 = circle1Center[0] + radius * Math.cos(angle);
      const y1 = circle1Center[1] + radius * Math.sin(angle);
      const x2 = circle2Center[0] + radius * Math.cos(angle);
      const y2 = circle2Center[1] + radius * Math.sin(angle);
      
      vertices.push([x1, y1, 0]);
      vertices.push([x2, y2, 0]);
    }

    return {
      name: "Vesica_Piscis",
      vertices,
      edges: [],
      faces: [],
      consciousnessLevel,
      fieldStrength,
      mathematicalPurity: this.calculateMathematicalPurity(vertices),
      metaphysicalContext: "The vesica piscis represents the intersection of two worlds"
    };
  }

  /**
   * Create a circle pattern
   */
  private createCircle(center: [number, number], radius: number, name: string, consciousnessLevel: number, fieldStrength: number): SacredPattern {
    const vertices: [number, number, number][] = [];
    const edges: [number, number][] = [];

    // Generate circle vertices
    for (let i = 0; i < 36; i++) {
      const angle = i * 10 * (Math.PI / 180);
      const x = center[0] + radius * Math.cos(angle);
      const y = center[1] + radius * Math.sin(angle);
      vertices.push([x, y, 0]);
    }

    // Create edges
    for (let i = 0; i < vertices.length; i++) {
      edges.push([i, (i + 1) % vertices.length]);
    }

    return {
      name,
      vertices,
      edges,
      faces: [],
      consciousnessLevel,
      fieldStrength,
      mathematicalPurity: this.calculateMathematicalPurity(vertices),
      metaphysicalContext: "The circle represents unity and wholeness"
    };
  }

  /**
   * Create a sephiroth pattern
   */
  private createSephiroth(center: [number, number], name: string, consciousnessLevel: number, fieldStrength: number): SacredPattern {
    const vertices: [number, number, number][] = [];
    const edges: [number, number][] = [];

    // Create decagon (10-sided polygon)
    for (let i = 0; i < 10; i++) {
      const angle = i * 36 * (Math.PI / 180);
      const x = center[0] + 0.5 * Math.cos(angle);
      const y = center[1] + 0.5 * Math.sin(angle);
      vertices.push([x, y, 0]);
    }

    // Create edges
    for (let i = 0; i < vertices.length; i++) {
      edges.push([i, (i + 1) % vertices.length]);
    }

    return {
      name,
      vertices,
      edges,
      faces: [],
      consciousnessLevel,
      fieldStrength,
      mathematicalPurity: this.calculateMathematicalPurity(vertices),
      metaphysicalContext: `The sephiroth ${name} represents a specific aspect of consciousness`
    };
  }

  /**
   * Generate Fibonacci sequence
   */
  private generateFibonacciSequence(length: number): number[] {
    const sequence = [1, 1];
    for (let i = 2; i < length; i++) {
      sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
  }

  /**
   * Calculate mathematical purity
   */
  private calculateMathematicalPurity(vertices: [number, number, number][]): number {
    // Purity based on integer coordinates and sacred ratios
    const integerCount = vertices.filter(v => Number.isInteger(v[0]) && Number.isInteger(v[1])).length;
    const totalCount = vertices.length;
    return integerCount / totalCount;
  }

  /**
   * Convert decimal to sacred fraction
   */
  private toSacredFraction(decimal: number): number {
    const sacredFractions = [1/2, 1/3, 2/3, 1/4, 3/4, 1/5, 2/5, 3/5, 4/5, 1/6, 5/6, 1/7, 2/7, 3/7, 4/7, 5/7, 6/7, 1/8, 3/8, 5/8, 7/8, 1/9, 2/9, 4/9, 5/9, 7/9, 8/9];
    
    const closest = sacredFractions.reduce((prev, curr) => {
      return Math.abs(curr - decimal) < Math.abs(prev - decimal) ? curr : prev;
    });
    
    return closest;
  }

  /**
   * Get consciousness level
   */
  public getConsciousnessLevel(): number {
    return this.consciousnessLevel;
  }

  /**
   * Get field strength
   */
  public getFieldStrength(): number {
    return this.fieldStrength;
  }

  /**
   * Get sacred geometry constants
   */
  public static getSacredGeometryConstants() {
    return SACRED_GEOMETRY_CONSTANTS;
  }
} 

// Generate sacred fractions (geometry focus)
export function sacredFractions(maxDenominator: number): number[] {
  const fractions = new Set<number>();
  for (let d = 2; d <= maxDenominator; d++) {
    for (let n = 1; n < d; n++) {
      const frac = n / d;
      fractions.add(Number(frac.toFixed(8)));
    }
  }
  return Array.from(fractions).sort((a, b) => a - b);
}

// Generate regular polygon vertices
export function regularPolygonVertices(sides: number, radius: number = 1): [number, number][] {
  return Array.from({ length: sides }, (_, i) => {
    const angle = (2 * Math.PI * i) / sides;
    return [radius * Math.cos(angle), radius * Math.sin(angle)];
  });
} 