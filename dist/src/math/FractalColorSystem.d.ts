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
import { Observer } from '../core/Observer';
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
    type: 'complementary' | 'analogous' | 'triadic' | 'fractal';
    strength: number;
    resonance: number;
}
export declare class FractalColorSystem {
    private colors;
    private colorRelationships;
    private instance;
    constructor();
    /**
     * Generate a new fractal color
     */
    generateColor(seed: number, consciousness?: number): FractalColor & Observer;
    /**
     * Generate a color palette using fractal mathematics
     */
    generatePalette(count: number, baseSeed?: number): (FractalColor & Observer)[];
    /**
     * Calculate relationships between colors
     */
    private calculateColorRelationships;
    /**
     * Analyze the relationship between two colors
     */
    private analyzeColorRelationship;
    /**
     * Handle color interactions
     */
    private handleColorInteraction;
    /**
     * Get all colors
     */
    getColors(): (FractalColor & Observer)[];
    /**
     * Get color relationships
     */
    getColorRelationships(colorId: string): ColorRelationship[];
    /**
     * Convert RGB to hex
     */
    private rgbToHex;
    /**
     * Convert RGB to hue (simplified)
     */
    private rgbToHue;
    /**
     * Get metaphysical insights about the color system
     */
    getInsights(): any;
}
//# sourceMappingURL=FractalColorSystem.d.ts.map