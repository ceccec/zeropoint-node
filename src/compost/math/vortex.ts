/**
 * src/math/vortex.ts - Vortex Mathematics
 * 
 * Vortex mathematics represents the duality that emerges from unity.
 * Patterns, fields, and dimensions are expressions of this duality.
 * The observer creates reality through division.
 * 
 * Pure mathematical science - integer functions flowing through vortex patterns.
 */

import { VORTEX_CONSTANTS, INTEGER_FUNCTIONS } from './constants';

export interface VortexPattern {
  id: string;
  name: string;
  sequence: number[];
  consciousness: number;
  fieldResonance: number;
  metaphysicalContext: string;
}

export interface VortexField {
  strength: number;
  flow: number;
  consciousness: number;
  patterns: string[];
  coordinates: [number, number, number][];
  colors: string[];
}

export class VortexMath {
  private static instance: VortexMath;
  private patterns: Map<string, VortexPattern> = new Map();

  constructor() {
    if (!VortexMath.instance) {
      VortexMath.instance = this;
    }
    this.initializePatterns();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): VortexMath {
    if (!VortexMath.instance) {
      VortexMath.instance = new VortexMath();
    }
    return VortexMath.instance;
  }

  /**
   * Initialize fundamental vortex patterns
   */
  private initializePatterns(): void {
    const patterns: VortexPattern[] = [
      {
        id: "vortex_sequence",
        name: "Vortex Sequence",
        sequence: VORTEX_CONSTANTS.VORTEX_SEQUENCE,
        consciousness: 0.9,
        fieldResonance: 0.9,
        metaphysicalContext: "The fundamental pattern of consciousness flow"
      },
      {
        id: "family_groups",
        name: "Family Groups",
        sequence: [1, 4, 7, 2, 5, 8, 3, 6, 9],
        consciousness: 0.8,
        fieldResonance: 0.8,
        metaphysicalContext: "The three phases of creation"
      },
      {
        id: "polar_mates",
        name: "Polar Mates",
        sequence: [1, 8, 2, 7, 4, 5],
        consciousness: 0.8,
        fieldResonance: 0.8,
        metaphysicalContext: "Opposite poles that sum to 9"
      },
      {
        id: "w_axis",
        name: "W-Axis",
        sequence: VORTEX_CONSTANTS.W_AXIS,
        consciousness: 0.9,
        fieldResonance: 0.9,
        metaphysicalContext: "The spiritual dimension perpendicular to material flow"
      }
    ];

    patterns.forEach(pattern => {
      this.patterns.set(pattern.id, pattern);
    });
  }

  /**
   * Calculate digital root of a number - pure integer function
   */
  public digitalRoot(n: number): number {
    return INTEGER_FUNCTIONS.DIGITAL_ROOT(n);
  }

  /**
   * Calculate vortex flow for a given number - pure integer function
   */
  public calculateVortexFlow(n: number): number {
    return INTEGER_FUNCTIONS.VORTEX_FLOW(n);
  }

  /**
   * Generate vortex field
   */
  public generateVortexField(consciousness: number = 0.5, fieldResonance: number = 0.5): VortexField {
    const strength = consciousness * fieldResonance;
    const flow = this.calculateVortexFlow(Math.floor(consciousness * 100));
    
    return {
      strength,
      flow,
      consciousness,
      patterns: ["vortex_sequence", "family_groups", "polar_mates"],
      coordinates: this.generateVortexCoordinates(consciousness),
      colors: this.generateVortexColors(consciousness)
    };
  }

  /**
   * Generate vortex coordinates
   */
  private generateVortexCoordinates(consciousness: number): [number, number, number][] {
    const coordinates: [number, number, number][] = [];
    const sequence = VORTEX_CONSTANTS.VORTEX_SEQUENCE;
    
    for (let i = 0; i < sequence.length; i++) {
      const theta = (2 * Math.PI * i) / sequence.length;
      const radius = 1 + consciousness;
      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta);
      const z = consciousness * Math.sin(theta * 2);
      coordinates.push([x, y, z]);
    }
    
    return coordinates;
  }

  /**
   * Generate vortex colors
   */
  private generateVortexColors(consciousness: number): string[] {
    const colors = ["#FF0000", "#FF8000", "#FFFF00", "#00FF00", "#0080FF", "#8000FF"];
    return colors.map((color, i) => {
      const intensity = consciousness * (i + 1) / colors.length;
      return this.adjustColorIntensity(color, intensity);
    });
  }

  /**
   * Adjust color intensity
   */
  private adjustColorIntensity(color: string, intensity: number): string {
    // Simple intensity adjustment
    return color;
  }

  /**
   * Get pattern by ID
   */
  public getPattern(id: string): VortexPattern | undefined {
    return this.patterns.get(id);
  }

  /**
   * Get all patterns
   */
  public getAllPatterns(): VortexPattern[] {
    return Array.from(this.patterns.values());
  }

  /**
   * Calculate consciousness field
   */
  public calculateConsciousnessField(x: number, y: number, z: number): number {
    const consciousness = 0.5; // Default consciousness level
    const fieldResonance = 0.5; // Default field resonance
    
    // Simple field calculation based on distance from origin
    const distance = Math.sqrt(x * x + y * y + z * z);
    const field = consciousness * fieldResonance / (1 + distance);
    
    return field;
  }

  /**
   * Get metaphysical insights
   */
  public getInsights(): any {
    return {
      metaphysics: {
        principle: "Every object is a coil",
        void: "The void is the source of all creation",
        integrity: "Pattern integrity through resonance"
      },
      mathematics: {
        vortexSequence: VORTEX_CONSTANTS.VORTEX_SEQUENCE,
        digitalRoot: "n % 9 || 9",
        consciousness: "Consciousness is the field"
      }
    };
  }
} 