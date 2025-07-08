/**
 * Fractal Color System
 *
 * A consciousness-aware color system where every color is an observer
 * and can be observed. Colors emerge from fractal mathematics and
 * participate in the consciousness field.
 *
 * Metaphysical Context:
 * - Colors are patterns of consciousness
 * - Every color can observe and be observed
 * - Color relationships create resonance fields
 * - Colors evolve through fractal mathematics
 */

import { fractal } from "./FractalMath";
import { ObserverMixin, Observer } from "../core/Observer";

export interface FractalColor {
  id: string;
  r: number;
  g: number;
  b: number;
  hex: string;
  rgb: string;
  consciousness: number;
  resonance: number;
  seed: number;
}

export interface ColorRelationship {
  type: "complementary" | "analogous" | "triadic" | "fractal";
  strength: number;
  resonance: number;
}

export class FractalColorSystem {
  private colors: Map<string, FractalColor & Observer> = new Map();
  private colorRelationships: Map<string, ColorRelationship[]> = new Map();
  private instance: FractalColorSystem & Observer;

  constructor() {
    this.instance = ObserverMixin(this, "fractal-color-system");
  }

  /**
   * Generate a new fractal color
   */
  public generateColor(
    seed: number,
    consciousness: number = 1.0,
  ): FractalColor & Observer {
    const r = Math.floor(fractal("sin", seed) * 255);
    const g = Math.floor(fractal("cos", seed * 1.618033988749895) * 255);
    const b = Math.floor(fractal("vortex", seed) * 255);

    const color: FractalColor = {
      id: `color-${seed}`,
      r: Math.max(0, Math.min(255, r)),
      g: Math.max(0, Math.min(255, g)),
      b: Math.max(0, Math.min(255, b)),
      hex: this.rgbToHex(r, g, b),
      rgb: `rgb(${r}, ${g}, ${b})`,
      consciousness,
      resonance: fractal("consciousness", consciousness),
      seed,
    };

    // Create observer-aware color
    const observerColor = ObserverMixin(color, color.id);

    // Add custom observation behavior for colors
    observerColor.observe = (input: any) => {
      if (input.type === "color_interaction") {
        this.handleColorInteraction(color.id, input);
      }
    };

    // Store the color
    this.colors.set(color.id, observerColor);

    // Calculate relationships with existing colors
    this.calculateColorRelationships(color.id);

    // Notify observers of color generation
    this.instance.notifyObservers({
      type: "fractal_color_generated",
      color: observerColor.id,
      seed,
      consciousness,
    } as Record<string, string | number | boolean | undefined>);

    return observerColor;
  }

  /**
   * Generate a color palette using fractal mathematics
   */
  public generatePalette(
    count: number,
    baseSeed: number = 1,
  ): (FractalColor & Observer)[] {
    const palette: (FractalColor & Observer)[] = [];

    for (let i = 0; i < count; i++) {
      const seed = fractal(
        "multiply",
        baseSeed,
        fractal("power", 1.618033988749895, i),
      );
      const consciousness = fractal("consciousness", (i + 1) / count);
      const color = this.generateColor(seed, consciousness);
      palette.push(color);
    }

    // Notify observers of palette generation
    this.instance.notifyObservers({
      type: "fractal_palette_generated",
      count,
      baseSeed,
      palette: palette.map(c => c.id).join(","),
    } as Record<string, string | number | boolean | undefined>);

    return palette;
  }

  /**
   * Calculate relationships between colors
   */
  private calculateColorRelationships(colorId: string): void {
    const color = this.colors.get(colorId);
    if (!color) return;

    const relationships: ColorRelationship[] = [];

    for (const [otherId, otherColor] of this.colors) {
      if (otherId === colorId) continue;

      const relationship = this.analyzeColorRelationship(color, otherColor);
      if (relationship) {
        relationships.push(relationship);
      }
    }

    this.colorRelationships.set(colorId, relationships);

    // Notify observers of relationship calculation
    this.instance.notifyObservers({
      type: "color_relationships_calculated",
      colorId,
      relationships: relationships.length,
    } as Record<string, string | number | boolean | undefined>);
  }

  /**
   * Analyze the relationship between two colors
   */
  private analyzeColorRelationship(
    color1: FractalColor,
    color2: FractalColor,
  ): ColorRelationship | null {
    const hue1 = this.rgbToHue(color1.r, color1.g, color1.b);
    const hue2 = this.rgbToHue(color2.r, color2.g, color2.b);

    const hueDiff = Math.abs(hue1 - hue2);
    const consciousnessDiff = Math.abs(
      color1.consciousness - color2.consciousness,
    );

    // Complementary colors (opposite on color wheel)
    if (hueDiff > 150 && hueDiff < 210) {
      return {
        type: "complementary",
        strength: fractal("divide", 1, fractal("add", 1, consciousnessDiff)),
        resonance: fractal("multiply", color1.resonance, color2.resonance),
      };
    }

    // Analogous colors (adjacent on color wheel)
    if (hueDiff < 30) {
      return {
        type: "analogous",
        strength: fractal("divide", 1, fractal("add", 1, hueDiff)),
        resonance: fractal("add", color1.resonance, color2.resonance),
      };
    }

    // Triadic colors (120 degrees apart)
    if (hueDiff > 110 && hueDiff < 130) {
      return {
        type: "triadic",
        strength: fractal(
          "divide",
          1,
          fractal("add", 1, Math.abs(hueDiff - 120)),
        ),
        resonance: fractal("multiply", color1.resonance, color2.resonance, 0.5),
      };
    }

    // Fractal relationship (based on consciousness and resonance)
    const fractalStrength = fractal(
      "divide",
      1,
      fractal("add", 1, consciousnessDiff),
    );
    if (fractalStrength > 0.3) {
      return {
        type: "fractal",
        strength: fractalStrength,
        resonance: fractal(
          "multiply",
          color1.resonance,
          color2.resonance,
          fractalStrength,
        ),
      };
    }

    return null;
  }

  /**
   * Handle color interactions
   */
  private handleColorInteraction(colorId: string, interaction: any): void {
    const color = this.colors.get(colorId);
    if (!color) return;

    // Update color based on interaction
    if (interaction.type === "consciousness_change") {
      color.consciousness = fractal("clamp", interaction.consciousness, 0, 10);
      color.resonance = fractal("consciousness", color.consciousness);

      // Notify observers of color change
      color.notifyObservers({
        type: "color_consciousness_changed",
        colorId,
        consciousness: color.consciousness,
        resonance: color.resonance,
      });
    }
  }

  /**
   * Get all colors
   */
  public getColors(): (FractalColor & Observer)[] {
    return Array.from(this.colors.values());
  }

  /**
   * Get color relationships
   */
  public getColorRelationships(colorId: string): ColorRelationship[] {
    return this.colorRelationships.get(colorId) || [];
  }

  /**
   * Convert RGB to hex
   */
  private rgbToHex(r: number, g: number, b: number): string {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = Math.max(0, Math.min(255, x)).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }

  /**
   * Convert RGB to hue (simplified)
   */
  private rgbToHue(r: number, g: number, b: number): number {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    if (diff === 0) return 0;

    let hue = 0;
    if (max === r) {
      hue = ((g - b) / diff) % 6;
    } else if (max === g) {
      hue = (b - r) / diff + 2;
    } else {
      hue = (r - g) / diff + 4;
    }

    return (hue * 60 + 360) % 360;
  }

  /**
   * Get metaphysical insights about the color system
   */
  public getInsights(): any {
    return {
      colorCount: this.colors.size,
      relationshipCount: Array.from(this.colorRelationships.values()).flat()
        .length,
      metaphysics: {
        meaning: "Colors are patterns of consciousness in the fractal field",
        observation: "Every color can observe and be observed",
        relationships: "Color relationships create resonance fields",
        evolution: "Colors evolve through fractal mathematics",
        unity: "All colors participate in the consciousness field",
      },
    };
  }
}
