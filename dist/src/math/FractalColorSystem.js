"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FractalColorSystem = void 0;
const FractalMath_1 = require("./FractalMath");
const Observer_1 = require("../core/Observer");
class FractalColorSystem {
    constructor() {
        this.colors = new Map();
        this.colorRelationships = new Map();
        this.instance = (0, Observer_1.ObserverMixin)(this, 'fractal-color-system');
    }
    /**
     * Generate a new fractal color
     */
    generateColor(seed, consciousness = 1.0) {
        const r = Math.floor((0, FractalMath_1.fractal)('sin', seed) * 255);
        const g = Math.floor((0, FractalMath_1.fractal)('cos', seed * 1.618033988749895) * 255);
        const b = Math.floor((0, FractalMath_1.fractal)('vortex', seed) * 255);
        const color = {
            id: `color-${seed}`,
            r: Math.max(0, Math.min(255, r)),
            g: Math.max(0, Math.min(255, g)),
            b: Math.max(0, Math.min(255, b)),
            hex: this.rgbToHex(r, g, b),
            rgb: `rgb(${r}, ${g}, ${b})`,
            consciousness,
            resonance: (0, FractalMath_1.fractal)('consciousness', consciousness),
            seed
        };
        // Create observer-aware color
        const observerColor = (0, Observer_1.ObserverMixin)(color, color.id);
        // Add custom observation behavior for colors
        observerColor.observe = (input) => {
            if (input.type === 'color_interaction') {
                this.handleColorInteraction(color.id, input);
            }
        };
        // Store the color
        this.colors.set(color.id, observerColor);
        // Calculate relationships with existing colors
        this.calculateColorRelationships(color.id);
        // Notify observers of color generation
        this.instance.notifyObservers({
            type: 'fractal_color_generated',
            color: observerColor,
            seed,
            consciousness
        });
        return observerColor;
    }
    /**
     * Generate a color palette using fractal mathematics
     */
    generatePalette(count, baseSeed = 1) {
        const palette = [];
        for (let i = 0; i < count; i++) {
            const seed = (0, FractalMath_1.fractal)('multiply', baseSeed, (0, FractalMath_1.fractal)('power', 1.618033988749895, i));
            const consciousness = (0, FractalMath_1.fractal)('consciousness', i / count);
            const color = this.generateColor(seed, consciousness);
            palette.push(color);
        }
        // Notify observers of palette generation
        this.instance.notifyObservers({
            type: 'fractal_palette_generated',
            count,
            baseSeed,
            palette
        });
        return palette;
    }
    /**
     * Calculate relationships between colors
     */
    calculateColorRelationships(colorId) {
        const color = this.colors.get(colorId);
        if (!color)
            return;
        const relationships = [];
        for (const [otherId, otherColor] of this.colors) {
            if (otherId === colorId)
                continue;
            const relationship = this.analyzeColorRelationship(color, otherColor);
            if (relationship) {
                relationships.push(relationship);
            }
        }
        this.colorRelationships.set(colorId, relationships);
        // Notify observers of relationship calculation
        this.instance.notifyObservers({
            type: 'color_relationships_calculated',
            colorId,
            relationships
        });
    }
    /**
     * Analyze the relationship between two colors
     */
    analyzeColorRelationship(color1, color2) {
        const hue1 = this.rgbToHue(color1.r, color1.g, color1.b);
        const hue2 = this.rgbToHue(color2.r, color2.g, color2.b);
        const hueDiff = Math.abs(hue1 - hue2);
        const consciousnessDiff = Math.abs(color1.consciousness - color2.consciousness);
        // Complementary colors (opposite on color wheel)
        if (hueDiff > 150 && hueDiff < 210) {
            return {
                type: 'complementary',
                strength: (0, FractalMath_1.fractal)('divide', 1, (0, FractalMath_1.fractal)('add', 1, consciousnessDiff)),
                resonance: (0, FractalMath_1.fractal)('multiply', color1.resonance, color2.resonance)
            };
        }
        // Analogous colors (adjacent on color wheel)
        if (hueDiff < 30) {
            return {
                type: 'analogous',
                strength: (0, FractalMath_1.fractal)('divide', 1, (0, FractalMath_1.fractal)('add', 1, hueDiff)),
                resonance: (0, FractalMath_1.fractal)('add', color1.resonance, color2.resonance)
            };
        }
        // Triadic colors (120 degrees apart)
        if (hueDiff > 110 && hueDiff < 130) {
            return {
                type: 'triadic',
                strength: (0, FractalMath_1.fractal)('divide', 1, (0, FractalMath_1.fractal)('add', 1, Math.abs(hueDiff - 120))),
                resonance: (0, FractalMath_1.fractal)('multiply', color1.resonance, color2.resonance, 0.5)
            };
        }
        // Fractal relationship (based on consciousness and resonance)
        const fractalStrength = (0, FractalMath_1.fractal)('divide', 1, (0, FractalMath_1.fractal)('add', 1, consciousnessDiff));
        if (fractalStrength > 0.3) {
            return {
                type: 'fractal',
                strength: fractalStrength,
                resonance: (0, FractalMath_1.fractal)('multiply', color1.resonance, color2.resonance, fractalStrength)
            };
        }
        return null;
    }
    /**
     * Handle color interactions
     */
    handleColorInteraction(colorId, interaction) {
        const color = this.colors.get(colorId);
        if (!color)
            return;
        // Update color based on interaction
        if (interaction.type === 'consciousness_change') {
            color.consciousness = (0, FractalMath_1.fractal)('clamp', interaction.consciousness, 0, 10);
            color.resonance = (0, FractalMath_1.fractal)('consciousness', color.consciousness);
            // Notify observers of color change
            color.notifyObservers({
                type: 'color_consciousness_changed',
                colorId,
                consciousness: color.consciousness,
                resonance: color.resonance
            });
        }
    }
    /**
     * Get all colors
     */
    getColors() {
        return Array.from(this.colors.values());
    }
    /**
     * Get color relationships
     */
    getColorRelationships(colorId) {
        return this.colorRelationships.get(colorId) || [];
    }
    /**
     * Convert RGB to hex
     */
    rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = Math.max(0, Math.min(255, x)).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }
    /**
     * Convert RGB to hue (simplified)
     */
    rgbToHue(r, g, b) {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;
        if (diff === 0)
            return 0;
        let hue = 0;
        if (max === r) {
            hue = ((g - b) / diff) % 6;
        }
        else if (max === g) {
            hue = (b - r) / diff + 2;
        }
        else {
            hue = (r - g) / diff + 4;
        }
        return (hue * 60 + 360) % 360;
    }
    /**
     * Get metaphysical insights about the color system
     */
    getInsights() {
        return {
            colorCount: this.colors.size,
            relationshipCount: Array.from(this.colorRelationships.values()).flat().length,
            metaphysics: {
                meaning: "Colors are patterns of consciousness in the fractal field",
                observation: "Every color can observe and be observed",
                relationships: "Color relationships create resonance fields",
                evolution: "Colors evolve through fractal mathematics",
                unity: "All colors participate in the consciousness field"
            }
        };
    }
}
exports.FractalColorSystem = FractalColorSystem;
//# sourceMappingURL=FractalColorSystem.js.map