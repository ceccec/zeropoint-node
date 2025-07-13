/**
 * src/5/5/MetatronsCube.ts - Metatron's Cube Sacred Geometry
 * 
 * Implements Metatron's Cube as a sacred geometry pattern
 * with metaphysical context and mathematical properties.
 */

import { SacredGeometryPattern } from "./SacredGeometryPattern";

export class MetatronsCube extends SacredGeometryPattern {
  public name: string;
  public symmetry: string;
  public metaphysicalContext: string;
  public points: number[][];
  public lines: [number, number][];
  public circles: { center: number[]; radius: number }[];

  constructor() {
    super();
    this.name = "Metatron's Cube";
    this.symmetry = "hexagonal";
    this.metaphysicalContext = "Metatron's Cube embodies the 13 circles of the Fruit of Life with 78 connecting lines, representing all possible sacred geometry patterns including the five Platonic solids.";
    
    // Initialize the 13 circles of Metatron's Cube
    this.circles = this.initializeCircles();
    this.points = this.initializePoints();
    this.lines = this.initializeLines();
  }

  /**
   * Initialize the 13 circles of Metatron's Cube
   */
  private initializeCircles(): { center: number[]; radius: number }[] {
    return [
      { center: [0, 0], radius: 1 },      // Center circle
      { center: [2, 0], radius: 1 },      // Right circle
      { center: [-2, 0], radius: 1 },     // Left circle
      { center: [1, 1.732], radius: 1 },  // Top right
      { center: [-1, 1.732], radius: 1 }, // Top left
      { center: [1, -1.732], radius: 1 }, // Bottom right
      { center: [-1, -1.732], radius: 1 }, // Bottom left
      { center: [3, 1.732], radius: 1 },  // Outer right
      { center: [-3, 1.732], radius: 1 }, // Outer left
      { center: [3, -1.732], radius: 1 }, // Outer bottom right
      { center: [-3, -1.732], radius: 1 }, // Outer bottom left
      { center: [0, 3.464], radius: 1 },  // Outer top
      { center: [0, -3.464], radius: 1 }  // Outer bottom
    ];
  }

  /**
   * Initialize points for Metatron's Cube
   */
  private initializePoints(): number[][] {
    return this.circles.map(circle => circle.center);
  }

  /**
   * Initialize the 78 connecting lines of Metatron's Cube
   */
  private initializeLines(): [number, number][] {
    const lines: [number, number][] = [];
    
    // Connect all circles to each other (n * (n-1) / 2 = 13 * 12 / 2 = 78)
    for (let i = 0; i < this.circles.length; i++) {
      for (let j = i + 1; j < this.circles.length; j++) {
        lines.push([i, j]);
      }
    }
    
    return lines;
  }

  /**
   * Get the 13 circles of Metatron's Cube
   */
  getCircles(): number[] {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  }

  /**
   * Get the 78 connecting lines
   */
  getConnectingLines(): number {
    return 78;
  }

  /**
   * Get the sacred shapes embedded in Metatron's Cube
   */
  getSacredShapes(): string[] {
    return [
      "Tetrahedron",
      "Cube", 
      "Octahedron",
      "Dodecahedron",
      "Icosahedron"
    ];
  }

  /**
   * Calculate the mathematical properties
   */
  getMathematicalProperties(): any {
    return {
      circles: 13,
      lines: 78,
      shapes: 5,
      symmetry: "hexagonal",
      goldenRatio: 1.618,
      pi: 3.14159
    };
  }
} 