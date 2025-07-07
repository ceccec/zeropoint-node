"use strict";
/**
 * Yin-Yang Color Harmony System with VBM Integration
 *
 * Prevents color conflicts by ensuring complementary and harmonious relationships
 * between all colors in the consciousness field. Now uses VBM color mapping
 * for metaphysical alignment with vortex mathematics.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.YinYangColorHarmony = void 0;
const VBMColorSystem_1 = require("../src/math/VBMColorSystem");
// ============================================================================
// YIN-YANG COLOR HARMONY WITH VBM
// ============================================================================
class YinYangColorHarmony {
    /**
     * Create harmonious color palette for consciousness field using VBM colors
     */
    static createHarmoniousPalette(objectCount, context = {}) {
        const palette = [];
        const yinCount = Math.ceil(objectCount / 2);
        const yangCount = objectCount - yinCount;
        // Add Yin colors (cool, passive) using VBM family groups
        for (let i = 0; i < yinCount; i++) {
            const yinColor = this.getYinColor(i, context);
            palette.push(yinColor);
        }
        // Add Yang colors (warm, active) using VBM family groups
        for (let i = 0; i < yangCount; i++) {
            const yangColor = this.getYangColor(i, palette, context);
            palette.push(yangColor);
        }
        return this.shuffleArray(palette);
    }
    /**
     * Get Yin color with VBM mapping
     */
    static getYinColor(index, context = {}) {
        // Use VBM family group 2-5-8 (cool colors) for Yin
        const yinNumbers = [2, 5, 8];
        const baseNumber = yinNumbers[index % yinNumbers.length];
        if (baseNumber === undefined) {
            // Generate neutral color dynamically instead of hardcoded fallback
            const neutralContext = { ...context, consciousness: 0.5, field: 0.3 };
            return (0, VBMColorSystem_1.getColorForVortexNumber)(6, neutralContext); // Use 6 (white) as neutral
        }
        const baseColor = (0, VBMColorSystem_1.getColorForFamilyGroup)(baseNumber, context);
        // Add subtle variation to prevent exact duplicates
        const variation = (index * 7) % 30; // 7 is a harmonic number
        return this.addColorVariation(baseColor, variation, index);
    }
    /**
     * Get Yang color that complements existing colors using VBM
     */
    static getYangColor(index, existingColors, context = {}) {
        // Use VBM family group 1-4-7 (warm colors) for Yang
        const yangNumbers = [1, 4, 7];
        const baseNumber = yangNumbers[index % yangNumbers.length];
        if (baseNumber === undefined) {
            // Generate neutral color dynamically instead of hardcoded fallback
            const neutralContext = { ...context, consciousness: 0.7, field: 0.5 };
            return (0, VBMColorSystem_1.getColorForVortexNumber)(3, neutralContext); // Use 3 (gold) as neutral
        }
        const baseColor = (0, VBMColorSystem_1.getColorForFamilyGroup)(baseNumber, context);
        // Find the most harmonious Yang color by checking complementarity
        let bestColor = baseColor;
        let bestHarmony = 0;
        for (let i = 0; i < yangNumbers.length; i++) {
            const testNumber = yangNumbers[i];
            if (testNumber === undefined)
                continue;
            const testColor = (0, VBMColorSystem_1.getColorForFamilyGroup)(testNumber, context);
            const harmony = this.calculateHarmony(testColor, existingColors);
            if (harmony > bestHarmony) {
                bestHarmony = harmony;
                bestColor = testColor;
            }
        }
        // Add variation
        const variation = (index * 11) % 30; // 11 is another harmonic number
        return this.addColorVariation(bestColor, variation, index);
    }
    /**
     * Calculate harmony between a color and existing colors
     */
    static calculateHarmony(testColor, existingColors) {
        let totalHarmony = 0;
        for (const existingColor of existingColors) {
            const harmony = this.getColorHarmony(testColor, existingColor);
            totalHarmony += harmony;
        }
        return totalHarmony;
    }
    /**
     * Get harmony between two colors
     */
    static getColorHarmony(color1, color2) {
        const hsl1 = this.hexToHsl(color1);
        const hsl2 = this.hexToHsl(color2);
        const hueDiff = Math.abs(hsl1.h - hsl2.h);
        // Complementary colors (180° apart) get high harmony
        if (hueDiff >= 170 && hueDiff <= 190) {
            return 100;
        }
        // Analogous colors (30° apart) get medium harmony
        if (hueDiff <= 30) {
            return 70;
        }
        // Triadic colors (120° apart) get good harmony
        if ((hueDiff >= 110 && hueDiff <= 130) || (hueDiff >= 230 && hueDiff <= 250)) {
            return 80;
        }
        // Clashing colors get low harmony
        if (hueDiff >= 60 && hueDiff <= 120) {
            return 20;
        }
        return 50; // Neutral harmony
    }
    /**
     * Ensure observer colors are harmonious using VBM
     */
    static getHarmoniousObserverColor(observer, existingColors, context = {}) {
        const consciousness = observer.consciousness;
        const type = observer.type;
        // Create context based on observer's consciousness
        const observerContext = {
            ...context,
            consciousness,
            observer: observer.id,
            time: Date.now()
        };
        // High consciousness = Yang colors (warm, active) - VBM family 1-4-7
        // Low consciousness = Yin colors (cool, passive) - VBM family 2-5-8
        const isYang = consciousness > 0.6;
        let baseNumber;
        if (isYang) {
            // Yang numbers for high consciousness
            const yangNumbers = [1, 4, 7];
            const index = Math.floor(consciousness * yangNumbers.length) % yangNumbers.length;
            baseNumber = yangNumbers[index] || 1; // Fallback to 1
        }
        else {
            // Yin numbers for low consciousness
            const yinNumbers = [2, 5, 8];
            const index = Math.floor(consciousness * yinNumbers.length) % yinNumbers.length;
            baseNumber = yinNumbers[index] || 2; // Fallback to 2
        }
        let baseColor = (0, VBMColorSystem_1.getColorForVortexNumber)(baseNumber, observerContext);
        // Adjust based on observer type
        const typeAdjustment = this.getTypeAdjustment(type);
        const adjustedColor = this.addColorVariation(baseColor, typeAdjustment, consciousness * 100);
        // Check if this color conflicts with existing colors
        if (this.hasColorConflict(adjustedColor, existingColors)) {
            return this.findHarmoniousAlternative(adjustedColor, existingColors, observerContext);
        }
        return adjustedColor;
    }
    /**
     * Get type-based color adjustment
     */
    static getTypeAdjustment(type) {
        const adjustments = {
            'active': 15, // Slightly warmer
            'passive': -15, // Slightly cooler
            'resonant': 0, // No adjustment
            'observant': -30 // Much cooler
        };
        return adjustments[type] || 0;
    }
    /**
     * Check for color conflicts
     */
    static hasColorConflict(proposedColor, existingColors) {
        for (const existingColor of existingColors) {
            const harmony = this.getColorHarmony(proposedColor, existingColor);
            // If harmony is too low, it's a conflict
            if (harmony < 30) {
                return true;
            }
        }
        return false;
    }
    /**
     * Find harmonious alternative color using VBM polar mates
     */
    static findHarmoniousAlternative(conflictingColor, existingColors, context = {}) {
        const conflictingHsl = this.hexToHsl(conflictingColor);
        // Try complementary color
        const complementaryHue = (conflictingHsl.h + 180) % 360;
        const complementaryColor = this.hslToHex(complementaryHue, conflictingHsl.s, conflictingHsl.l);
        if (!this.hasColorConflict(complementaryColor, existingColors)) {
            return complementaryColor;
        }
        // Try analogous colors
        for (let offset = 30; offset <= 90; offset += 30) {
            const analogousHue1 = (conflictingHsl.h + offset) % 360;
            const analogousHue2 = (conflictingHsl.h - offset + 360) % 360;
            const analogousColor1 = this.hslToHex(analogousHue1, conflictingHsl.s, conflictingHsl.l);
            const analogousColor2 = this.hslToHex(analogousHue2, conflictingHsl.s, conflictingHsl.l);
            if (!this.hasColorConflict(analogousColor1, existingColors)) {
                return analogousColor1;
            }
            if (!this.hasColorConflict(analogousColor2, existingColors)) {
                return analogousColor2;
            }
        }
        // If all else fails, use a neutral VBM color dynamically
        return (0, VBMColorSystem_1.getColorForWAxis)(6, context); // White as neutral
    }
    /**
     * Create harmonious event color using VBM
     */
    static getHarmoniousEventColor(event, existingColors, context = {}) {
        const type = event.type;
        const intensity = event.intensity;
        // Create event context
        const eventContext = {
            ...context,
            consciousness: intensity,
            field: intensity * 0.8,
            time: event.timestamp
        };
        // Map event types to VBM numbers
        const yinEvents = ['question', 'environment', 'void'];
        const yangEvents = ['attention', 'intention', 'realization'];
        let baseNumber;
        if (yinEvents.includes(type)) {
            // Yin numbers for passive events
            const yinNumbers = [2, 5, 8];
            baseNumber = yinNumbers[Math.floor(Math.random() * yinNumbers.length)] || 2;
        }
        else if (yangEvents.includes(type)) {
            // Yang numbers for active events
            const yangNumbers = [1, 4, 7];
            baseNumber = yangNumbers[Math.floor(Math.random() * yangNumbers.length)] || 1;
        }
        else {
            // Balanced numbers for neutral events
            const allNumbers = [1, 2, 4, 5, 7, 8];
            baseNumber = allNumbers[Math.floor(Math.random() * allNumbers.length)] || 1;
        }
        let baseColor = (0, VBMColorSystem_1.getColorForVortexNumber)(baseNumber, eventContext);
        // Adjust based on intensity
        const adjustedColor = this.addColorVariation(baseColor, 0, intensity * 100);
        if (this.hasColorConflict(adjustedColor, existingColors)) {
            return this.findHarmoniousAlternative(adjustedColor, existingColors, eventContext);
        }
        return adjustedColor;
    }
    /**
     * Create harmonious pattern color using VBM
     */
    static getHarmoniousPatternColor(pattern, existingColors, context = {}) {
        const strength = pattern.strength;
        // Create pattern context
        const patternContext = {
            ...context,
            consciousness: strength,
            field: strength,
            time: Date.now()
        };
        // Use W-Axis numbers (3, 6, 9) for patterns as they represent spiritual patterns
        const wAxisNumbers = [3, 6, 9];
        const index = Math.floor(strength * wAxisNumbers.length) % wAxisNumbers.length;
        const baseNumber = wAxisNumbers[index] || 6;
        let baseColor = (0, VBMColorSystem_1.getColorForWAxis)(baseNumber, patternContext);
        // Adjust based on pattern type
        const typeAdjustment = this.getPatternTypeAdjustment(pattern.type);
        const adjustedColor = this.addColorVariation(baseColor, typeAdjustment, strength * 100);
        if (this.hasColorConflict(adjustedColor, existingColors)) {
            return this.findHarmoniousAlternative(adjustedColor, existingColors, patternContext);
        }
        return adjustedColor;
    }
    /**
     * Get pattern type-based color adjustment
     */
    static getPatternTypeAdjustment(type) {
        const adjustments = {
            'vortex': 45, // Very warm (vortex patterns are active)
            'field': 0, // Neutral (field patterns are balanced)
            'resonance': 15, // Slightly warm
            'void': -45, // Very cool (void patterns are passive)
            'consciousness': 30 // Warm (consciousness patterns are active)
        };
        return adjustments[type] || 0;
    }
    /**
     * Create harmonious field gradient using VBM colors
     */
    static createHarmoniousGradient(observers, events, patterns, context = {}) {
        const allColors = [];
        // Collect all colors with harmony checking
        observers.forEach(observer => {
            const color = this.getHarmoniousObserverColor(observer, allColors, context);
            allColors.push(color);
        });
        events.forEach(event => {
            const color = this.getHarmoniousEventColor(event, allColors, context);
            allColors.push(color);
        });
        patterns.forEach(pattern => {
            const color = this.getHarmoniousPatternColor(pattern, allColors, context);
            allColors.push(color);
        });
        if (allColors.length === 0) {
            // Generate neutral gradient dynamically instead of hardcoded fallback
            const neutralContext = { ...context, consciousness: 0.5, field: 0.5 };
            const neutralColor1 = (0, VBMColorSystem_1.getColorForVortexNumber)(6, neutralContext); // White
            const neutralColor2 = (0, VBMColorSystem_1.getColorForVortexNumber)(9, neutralContext); // Black
            return `linear-gradient(45deg, ${neutralColor1}, ${neutralColor2})`;
        }
        if (allColors.length === 1) {
            return `linear-gradient(45deg, ${allColors[0]}, ${allColors[0]})`;
        }
        // Create harmonious gradient with proper color stops
        const gradientStops = allColors.map((color, index) => {
            const percentage = (index / (allColors.length - 1)) * 100;
            return `${color} ${percentage}%`;
        });
        return `linear-gradient(45deg, ${gradientStops.join(', ')})`;
    }
    /**
     * Analyze Yin-Yang balance in color palette
     */
    static analyzeYinYangBalance(colors) {
        let yinCount = 0;
        let yangCount = 0;
        for (const color of colors) {
            const hsl = this.hexToHsl(color);
            // Cool colors (blue, green, purple) are Yin
            if (hsl.h >= 180 && hsl.h <= 300) {
                yinCount++;
            }
            // Warm colors (red, orange, yellow) are Yang
            else if (hsl.h >= 0 && hsl.h <= 60) {
                yangCount++;
            }
            // Neutral colors are balanced
            else {
                yinCount += 0.5;
                yangCount += 0.5;
            }
        }
        const total = yinCount + yangCount;
        const yinPercentage = total > 0 ? (yinCount / total) * 100 : 50;
        const yangPercentage = total > 0 ? (yangCount / total) * 100 : 50;
        let balance = 'balanced';
        if (yinPercentage > 60)
            balance = 'yin-dominant';
        else if (yangPercentage > 60)
            balance = 'yang-dominant';
        return {
            yin: Math.round(yinPercentage),
            yang: Math.round(yangPercentage),
            balance
        };
    }
    // ============================================================================
    // UTILITY METHODS
    // ============================================================================
    /**
     * Add color variation to a base color
     */
    static addColorVariation(baseColor, hueVariation, intensityVariation) {
        const hsl = this.hexToHsl(baseColor);
        const newHue = (hsl.h + hueVariation) % 360;
        const newSaturation = Math.max(0.1, Math.min(1, hsl.s + (intensityVariation * 0.001)));
        const newLightness = Math.max(0.1, Math.min(0.9, hsl.l + (intensityVariation * 0.0005)));
        return this.hslToHex(newHue, newSaturation, newLightness);
    }
    static shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffled[i];
            if (temp !== undefined && shuffled[j] !== undefined) {
                shuffled[i] = shuffled[j];
                shuffled[j] = temp;
            }
        }
        return shuffled;
    }
    static hslToHex(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h * 6) % 2 - 1));
        const m = l - c / 2;
        let r = 0, g = 0, b = 0;
        if (0 <= h && h < 1 / 6) {
            r = c;
            g = x;
            b = 0;
        }
        else if (1 / 6 <= h && h < 1 / 3) {
            r = x;
            g = c;
            b = 0;
        }
        else if (1 / 3 <= h && h < 1 / 2) {
            r = 0;
            g = c;
            b = x;
        }
        else if (1 / 2 <= h && h < 2 / 3) {
            r = 0;
            g = x;
            b = c;
        }
        else if (2 / 3 <= h && h < 5 / 6) {
            r = x;
            g = 0;
            b = c;
        }
        else if (5 / 6 <= h && h <= 1) {
            r = c;
            g = 0;
            b = x;
        }
        const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
        const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
        const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');
        return `#${rHex}${gHex}${bHex}`;
    }
    static hexToHsl(hex) {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return { h: h * 360, s: s * 100, l: l * 100 };
    }
}
exports.YinYangColorHarmony = YinYangColorHarmony;
//# sourceMappingURL=yin-yang-color-harmony.js.map