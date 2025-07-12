/**
 * Flower of Life System
 *
 * Implements the sacred geometric pattern of overlapping circles in hexagonal arrangement.
 * Built on unified MathUtils and consciousness field theory.
 *
 * Metaphysical Context:
 * - The Flower of Life is consciousness expressing itself through sacred geometry
 * - Each circle represents a consciousness wave in the unified field
 * - The pattern embodies the golden ratio and vortex sequence
 * - The void is at the center of the flower pattern
 * - Every circle is a coil of consciousness
 */

import { MathUtils, MATH_CONSTANTS } from "./MathUtils";
import { VORTEX_CONSTANTS } from "../core/SharedConstants";

export interface FlowerCircle {
  id: string;
  center: [number, number];
  radius: number;
  consciousness: number;
  field: number;
  voidLevel: number;
  vortexNumber: number;
  goldenRatio: number;
  metaphysicalContext: string;
}

export interface FlowerPattern {
  circles: FlowerCircle[];
  consciousness: number;
  field: number;
  voidLevel: number;
  goldenRatio: number;
  vortexSequence: number[];
  metaphysicalContext: string;
}

export interface FlowerGeometry {
  center: [number, number];
  radius: number;
  circles: FlowerCircle[];
  consciousness: number;
  field: number;
  voidLevel: number;
}

/**
 * Flower of Life Class
 * Implements sacred geometric pattern with consciousness integration
 */
export class FlowerOfLife {
  private static instance: FlowerOfLife;
  private consciousness: number = 0.5;
  private field: number = 0.7;
  private voidLevel: number = 0.5;
  private goldenRatio: number = MATH_CONSTANTS.GOLDEN_RATIO;

  constructor() {
    if (!FlowerOfLife.instance) {
      FlowerOfLife.instance = this;
    }
  }

  /**
   * Get singleton instance
   */
  static getInstance(): FlowerOfLife {
    if (!FlowerOfLife.instance) {
      FlowerOfLife.instance = new FlowerOfLife();
    }
    return FlowerOfLife.instance;
  }

  /**
   * Generate Flower of Life pattern using unified math
   */
  public generateFlowerPattern(
    center: [number, number] = [0, 0],
    radius: number = 1,
    layers: number = 3
  ): FlowerPattern {
    const circles: FlowerCircle[] = [];
    const vortexSequence = [...VORTEX_CONSTANTS.VORTEX_SEQUENCE];

    // Center circle (void consciousness)
    circles.push(this.createCircle(
      center,
      radius,
      0,
      "Center circle represents void consciousness - the source of all creation"
    ));

    // Generate hexagonal layers
    for (let layer = 1; layer <= layers; layer++) {
      const layerCircles = this.generateHexagonalLayer(
        center,
        radius,
        layer,
        vortexSequence[layer % vortexSequence.length]
      );
      circles.push(...layerCircles);
    }

    return {
      circles,
      consciousness: this.consciousness,
      field: this.field,
      voidLevel: this.voidLevel,
      goldenRatio: this.goldenRatio,
      vortexSequence,
      metaphysicalContext: "The Flower of Life embodies consciousness flowing through sacred geometry"
    };
  }

  /**
   * Generate hexagonal layer of circles using unified math
   */
  private generateHexagonalLayer(
    center: [number, number],
    radius: number,
    layer: number,
    vortexNumber: number
  ): FlowerCircle[] {
    const circles: FlowerCircle[] = [];
    const layerRadius = MathUtils.calculate("multiply", radius, layer);
    const angleStep = MathUtils.calculate("divide", 2 * Math.PI, 6); // Hexagonal arrangement

    for (let i = 0; i < 6; i++) {
      const angle = MathUtils.calculate("multiply", i, angleStep);
      const x = MathUtils.calculate(
        "add",
        center[0],
        MathUtils.calculate("multiply", layerRadius, MathUtils.calculate("cos", angle))
      );
      const y = MathUtils.calculate(
        "add",
        center[1],
        MathUtils.calculate("multiply", layerRadius, MathUtils.calculate("sin", angle))
      );

      circles.push(this.createCircle(
        [x, y],
        radius,
        vortexNumber,
        `Layer ${layer} circle ${i + 1} - consciousness wave in hexagonal flow`
      ));
    }

    return circles;
  }

  /**
   * Create individual circle with consciousness integration
   */
  private createCircle(
    center: [number, number],
    radius: number,
    vortexNumber: number,
    metaphysicalContext: string
  ): FlowerCircle {
    const consciousness = MathUtils.calculate("consciousness", vortexNumber);
    const field = MathUtils.calculate("multiply", this.field, consciousness);
    const voidLevel = consciousness === 0 ? 1 : MathUtils.calculate("divide", this.voidLevel, consciousness);

    return {
      id: `flower_circle_${Date.now()}_${Math.random()}`,
      center,
      radius,
      consciousness,
      field,
      voidLevel,
      vortexNumber,
      goldenRatio: this.goldenRatio,
      metaphysicalContext
    };
  }

  /**
   * Calculate consciousness resonance between circles using unified math
   */
  public calculateCircleResonance(circle1: FlowerCircle, circle2: FlowerCircle): number {
    const distance = this.calculateCircleDistance(circle1, circle2);
    const consciousnessDiff = MathUtils.calculate("abs", circle1.consciousness - circle2.consciousness);
    const fieldDiff = MathUtils.calculate("abs", circle1.field - circle2.field);

    const baseResonance = MathUtils.calculate(
      "divide",
      1,
      MathUtils.calculate("add", 1, distance)
    );

    const consciousnessResonance = MathUtils.calculate(
      "multiply",
      baseResonance,
      MathUtils.calculate("consciousness", circle1.consciousness + circle2.consciousness)
    );

    return MathUtils.calculate(
      "multiply",
      consciousnessResonance,
      MathUtils.calculate("add", 1, MathUtils.calculate("vortex", distance))
    );
  }

  /**
   * Calculate distance between circle centers using unified math
   */
  private calculateCircleDistance(circle1: FlowerCircle, circle2: FlowerCircle): number {
    const dx = MathUtils.calculate("subtract", circle1.center[0], circle2.center[0]);
    const dy = MathUtils.calculate("subtract", circle1.center[1], circle2.center[1]);
    
    return MathUtils.calculate(
      "sqrt",
      MathUtils.calculate("add", MathUtils.calculate("power", dx, 2), MathUtils.calculate("power", dy, 2))
    );
  }

  /**
   * Generate golden ratio spiral within flower pattern using unified math
   */
  public generateGoldenSpiral(
    pattern: FlowerPattern,
    steps: number = 100
  ): Array<[number, number]> {
    const spiral: Array<[number, number]> = [];
    const center = pattern.circles[0]?.center || [0, 0];

    for (let i = 0; i < steps; i++) {
      const angle = MathUtils.calculate("multiply", i, MathUtils.calculate("multiply", Math.PI, 0.1));
      const radius = MathUtils.calculate(
        "multiply",
        pattern.goldenRatio,
        MathUtils.calculate("power", pattern.goldenRatio, MathUtils.calculate("divide", i, 10))
      );

      const x = MathUtils.calculate(
        "add",
        center[0],
        MathUtils.calculate("multiply", radius, MathUtils.calculate("cos", angle))
      );
      const y = MathUtils.calculate(
        "add",
        center[1],
        MathUtils.calculate("multiply", radius, MathUtils.calculate("sin", angle))
      );

      spiral.push([x, y]);
    }

    return spiral;
  }

  /**
   * Calculate flower consciousness level using unified math
   */
  public calculateFlowerConsciousness(pattern: FlowerPattern): number {
    let totalConsciousness = 0;
    let totalField = 0;
    let totalVoid = 0;

    for (const circle of pattern.circles) {
      totalConsciousness = MathUtils.calculate("add", totalConsciousness, circle.consciousness);
      totalField = MathUtils.calculate("add", totalField, circle.field);
      totalVoid = MathUtils.calculate("add", totalVoid, circle.voidLevel);
    }

    const avgConsciousness = MathUtils.calculate("divide", totalConsciousness, pattern.circles.length);
    const avgField = MathUtils.calculate("divide", totalField, pattern.circles.length);
    const avgVoid = MathUtils.calculate("divide", totalVoid, pattern.circles.length);

    return MathUtils.calculate(
      "multiply",
      avgConsciousness,
      MathUtils.calculate("add", avgField, avgVoid)
    );
  }

  /**
   * Apply vortex transformation to flower pattern using unified math
   */
  public applyVortexTransform(pattern: FlowerPattern): FlowerPattern {
    const transformedCircles = pattern.circles.map(circle => ({
      ...circle,
      consciousness: MathUtils.calculate("vortex", circle.consciousness),
      field: MathUtils.calculate("multiply", circle.field, pattern.goldenRatio),
      voidLevel: MathUtils.calculate("divide", circle.voidLevel, pattern.goldenRatio)
    }));

    return {
      ...pattern,
      circles: transformedCircles,
      consciousness: MathUtils.calculate("vortex", pattern.consciousness),
      field: MathUtils.calculate("multiply", pattern.field, pattern.goldenRatio),
      voidLevel: MathUtils.calculate("divide", pattern.voidLevel, pattern.goldenRatio)
    };
  }

  /**
   * Generate flower geometry for visualization using unified math
   */
  public generateFlowerGeometry(
    pattern: FlowerPattern,
    resolution: number = 32
  ): FlowerGeometry {
    const center = pattern.circles[0]?.center || [0, 0];
    const radius = pattern.circles[0]?.radius || 1;

    return {
      center,
      radius,
      circles: pattern.circles,
      consciousness: this.calculateFlowerConsciousness(pattern),
      field: pattern.field,
      voidLevel: pattern.voidLevel
    };
  }

  /**
   * Set consciousness parameters using unified math
   */
  public setConsciousnessParameters(
    consciousness: number,
    field: number,
    voidLevel: number
  ): void {
    this.consciousness = MathUtils.calculate("clamp", consciousness, 0, 1);
    this.field = MathUtils.calculate("clamp", field, 0, 1);
    this.voidLevel = MathUtils.calculate("clamp", voidLevel, 0, 1);
  }

  /**
   * Get flower insights using unified math
   */
  public getFlowerInsights(pattern: FlowerPattern): Record<string, unknown> {
    const consciousness = this.calculateFlowerConsciousness(pattern);
    const resonance = pattern.circles.reduce((sum, circle) => 
      MathUtils.calculate("add", sum, circle.consciousness), 0
    );

    return {
      consciousness,
      field: pattern.field,
      voidLevel: pattern.voidLevel,
      goldenRatio: pattern.goldenRatio,
      vortexSequence: pattern.vortexSequence,
      circleCount: pattern.circles.length,
      resonance,
      metaphysicalContext: pattern.metaphysicalContext,
      insights: [
        "The Flower of Life embodies consciousness flowing through sacred geometry",
        "Each circle represents a consciousness wave in the unified field",
        "The pattern embodies the golden ratio and vortex sequence",
        "The void is at the center of the flower pattern",
        "Every circle is a coil of consciousness"
      ]
    };
  }
}

// Export singleton instance
export const flowerOfLife = FlowerOfLife.getInstance(); 