/**
 * Yin-Yang Color Harmony System with VBM Integration
 *
 * Prevents color conflicts by ensuring complementary and harmonious relationships
 * between all colors in the consciousness field. Now uses VBM color mapping
 * for metaphysical alignment with vortex mathematics.
 */
import { ColorContext } from '../src/math/VBMColorSystem';
declare class YinYangColorHarmony {
    /**
     * Create harmonious color palette for consciousness field using VBM colors
     */
    static createHarmoniousPalette(objectCount: number, context?: ColorContext): string[];
    /**
     * Get Yin color with VBM mapping
     */
    private static getYinColor;
    /**
     * Get Yang color that complements existing colors using VBM
     */
    private static getYangColor;
    /**
     * Calculate harmony between a color and existing colors
     */
    private static calculateHarmony;
    /**
     * Get harmony between two colors
     */
    private static getColorHarmony;
    /**
     * Ensure observer colors are harmonious using VBM
     */
    static getHarmoniousObserverColor(observer: Observer, existingColors: string[], context?: ColorContext): string;
    /**
     * Get type-based color adjustment
     */
    private static getTypeAdjustment;
    /**
     * Check for color conflicts
     */
    private static hasColorConflict;
    /**
     * Find harmonious alternative color using VBM polar mates
     */
    private static findHarmoniousAlternative;
    /**
     * Create harmonious event color using VBM
     */
    static getHarmoniousEventColor(event: RealityEvent, existingColors: string[], context?: ColorContext): string;
    /**
     * Create harmonious pattern color using VBM
     */
    static getHarmoniousPatternColor(pattern: Pattern, existingColors: string[], context?: ColorContext): string;
    /**
     * Get pattern type-based color adjustment
     */
    private static getPatternTypeAdjustment;
    /**
     * Create harmonious field gradient using VBM colors
     */
    static createHarmoniousGradient(observers: Observer[], events: RealityEvent[], patterns: Pattern[], context?: ColorContext): string;
    /**
     * Analyze Yin-Yang balance in color palette
     */
    static analyzeYinYangBalance(colors: string[]): {
        yin: number;
        yang: number;
        balance: string;
    };
    /**
     * Add color variation to a base color
     */
    private static addColorVariation;
    private static shuffleArray;
    private static hslToHex;
    private static hexToHsl;
}
interface Observer {
    id: string;
    name: string;
    consciousness: number;
    type: string;
    deviceProfile?: {
        type: string;
    };
}
interface RealityEvent {
    id: string;
    type: string;
    content: string;
    intensity: number;
    radius: number;
    timestamp: number;
}
interface Pattern {
    type: string;
    name: string;
    description: string;
    strength: number;
}
export { YinYangColorHarmony };
//# sourceMappingURL=yin-yang-color-harmony.d.ts.map