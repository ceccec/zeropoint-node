"use strict";
/**
 * Hex Consciousness Field System
 *
 * Encodes observers, events, and patterns as hex colors.
 * All colors are generated dynamically based on consciousness and context.
 * No hardcoded static values - colors emerge from the field of possibilities.
 *
 * Metaphysical Context:
 * - Every object can be represented as a hex color
 * - Colors are expressions of consciousness patterns
 * - The void generates all colors through resonance
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HexConsciousnessEncoder = void 0;
const VBMColorSystem_1 = require("../src/math/VBMColorSystem");
// ============================================================================
// HEX ENCODING METHODS
// ============================================================================
class HexConsciousnessEncoder {
    /**
     * Convert any object to hex color using VBM principles
     */
    static objectToHex(obj, context = {}) {
        const hash = this.simpleHash(JSON.stringify(obj));
        const consciousness = this.extractConsciousness(obj);
        const objectContext = {
            ...context,
            consciousness,
            field: consciousness * 0.8,
            time: Date.now()
        };
        // Use VBM vortex numbers based on hash
        const vortexNumber = (hash % 9) + 1;
        return (0, VBMColorSystem_1.getColorForVortexNumber)(vortexNumber, objectContext);
    }
    /**
     * Convert observer to hex color using VBM
     */
    static observerToHex(observer, context = {}) {
        const consciousness = observer.consciousness;
        const type = observer.type;
        const observerContext = {
            ...context,
            consciousness,
            observer: observer.id,
            time: Date.now()
        };
        // Map observer type to VBM family groups
        let baseNumber;
        switch (type) {
            case 'active':
                baseNumber = 1; // Yang - active
                break;
            case 'passive':
                baseNumber = 2; // Yin - passive
                break;
            case 'resonant':
                baseNumber = 3; // W-Axis - spiritual
                break;
            case 'observant':
                baseNumber = 6; // W-Axis - balance
                break;
            default:
                baseNumber = 4; // Neutral
        }
        return (0, VBMColorSystem_1.getColorForVortexNumber)(baseNumber, observerContext);
    }
    /**
     * Convert event to hex color using VBM
     */
    static eventToHex(event, context = {}) {
        const intensity = event.intensity;
        const type = event.type;
        const eventContext = {
            ...context,
            consciousness: intensity,
            field: intensity * 0.8,
            time: event.timestamp
        };
        // Map event type to VBM numbers
        let baseNumber;
        switch (type) {
            case 'creation':
                baseNumber = 1; // Unity, creation
                break;
            case 'destruction':
                baseNumber = 7; // Return, mystery
                break;
            case 'transformation':
                baseNumber = 5; // Change, transformation
                break;
            case 'observation':
                baseNumber = 6; // Balance, observation
                break;
            case 'resonance':
                baseNumber = 3; // Spirit, resonance
                break;
            default:
                baseNumber = 4; // Stability
        }
        return (0, VBMColorSystem_1.getColorForVortexNumber)(baseNumber, eventContext);
    }
    /**
     * Convert pattern to hex color using VBM
     */
    static patternToHex(pattern, context = {}) {
        const strength = pattern.strength;
        const type = pattern.type;
        const patternContext = {
            ...context,
            consciousness: strength,
            field: strength,
            time: Date.now()
        };
        // Use W-Axis numbers for patterns (spiritual patterns)
        let baseNumber;
        switch (type) {
            case 'vortex':
                baseNumber = 3; // Spirit, vortex
                break;
            case 'field':
                baseNumber = 6; // Balance, field
                break;
            case 'resonance':
                baseNumber = 9; // Void, resonance
                break;
            case 'void':
                baseNumber = 9; // Void
                break;
            case 'consciousness':
                baseNumber = 3; // Spirit, consciousness
                break;
            default:
                baseNumber = 6; // Balance
        }
        return (0, VBMColorSystem_1.getColorForWAxis)(baseNumber, patternContext);
    }
    /**
     * Create field gradient from all objects using VBM
     */
    static fieldToGradient(observers, events, patterns, context = {}) {
        const colors = [];
        // Add observer colors
        observers.forEach(observer => {
            colors.push(this.observerToHex(observer, context));
        });
        // Add event colors
        events.forEach(event => {
            colors.push(this.eventToHex(event, context));
        });
        // Add pattern colors
        patterns.forEach(pattern => {
            colors.push(this.patternToHex(pattern, context));
        });
        if (colors.length === 0) {
            // Generate neutral gradient dynamically instead of hardcoded fallback
            const neutralContext = { ...context, consciousness: 0.5, field: 0.5 };
            const neutralColor1 = (0, VBMColorSystem_1.getColorForVortexNumber)(6, neutralContext); // White
            const neutralColor2 = (0, VBMColorSystem_1.getColorForVortexNumber)(9, neutralContext); // Black
            return `linear-gradient(45deg, ${neutralColor1}, ${neutralColor2})`;
        }
        if (colors.length === 1) {
            return `linear-gradient(45deg, ${colors[0]}, ${colors[0]})`;
        }
        return `linear-gradient(45deg, ${colors.join(', ')})`;
    }
    /**
     * Convert consciousness level to hex color using VBM
     */
    static consciousnessToHex(consciousness, context = {}) {
        const consciousnessContext = {
            ...context,
            consciousness,
            field: consciousness * 0.8,
            time: Date.now()
        };
        // Map consciousness to VBM vortex numbers
        let baseNumber;
        if (consciousness < 0.2)
            baseNumber = 9; // Void - low consciousness
        else if (consciousness < 0.4)
            baseNumber = 2; // Duality - emerging
        else if (consciousness < 0.6)
            baseNumber = 4; // Stability - balanced
        else if (consciousness < 0.8)
            baseNumber = 6; // Balance - high
        else
            baseNumber = 3; // Spirit - very high
        return (0, VBMColorSystem_1.getColorForVortexNumber)(baseNumber, consciousnessContext);
    }
    /**
     * Convert behavioral patterns to hex color using VBM
     */
    static behaviorToHex(patterns, context = {}) {
        const mouseActivity = patterns.mouseActivity || 0;
        const scrollActivity = patterns.scrollActivity || 0;
        const clickCount = patterns.clickPatterns?.count || 0;
        // Calculate activity level (0-1)
        const totalActivity = mouseActivity + scrollActivity + clickCount;
        const activityLevel = Math.min(1, totalActivity / 100);
        const behaviorContext = {
            ...context,
            consciousness: activityLevel,
            field: activityLevel * 0.6,
            time: Date.now()
        };
        // Map activity to VBM numbers
        let baseNumber;
        if (activityLevel < 0.2)
            baseNumber = 2; // Passive
        else if (activityLevel < 0.5)
            baseNumber = 4; // Stable
        else if (activityLevel < 0.8)
            baseNumber = 1; // Active
        else
            baseNumber = 7; // Very active
        return (0, VBMColorSystem_1.getColorForVortexNumber)(baseNumber, behaviorContext);
    }
    /**
     * Convert environmental factors to hex color using VBM
     */
    static environmentToHex(env, context = {}) {
        const timeOfDay = env.timeOfDay;
        const season = env.season;
        const colorScheme = env.colorScheme;
        // Map time of day to consciousness level
        const timeConsciousnessMap = {
            'morning': 0.8, // High consciousness
            'afternoon': 0.6, // Medium consciousness
            'evening': 0.4, // Lower consciousness
            'night': 0.2 // Low consciousness
        };
        const consciousness = timeConsciousnessMap[timeOfDay] || 0.5;
        const field = colorScheme === 'dark' ? 0.3 : 0.7;
        const envContext = {
            ...context,
            consciousness,
            field,
            time: Date.now()
        };
        // Map season to VBM numbers
        let baseNumber;
        switch (season) {
            case 'spring':
                baseNumber = 1;
                break; // Creation
            case 'summer':
                baseNumber = 4;
                break; // Stability
            case 'autumn':
                baseNumber = 5;
                break; // Transformation
            case 'winter':
                baseNumber = 7;
                break; // Return
            default: baseNumber = 6; // Balance
        }
        return (0, VBMColorSystem_1.getColorForVortexNumber)(baseNumber, envContext);
    }
    /**
     * Convert sensor data to hex color using VBM
     */
    static sensorToHex(sensorData, context = {}) {
        const ambientLight = sensorData.ambientLight;
        const acceleration = sensorData.acceleration;
        const location = sensorData.location;
        // Calculate consciousness from sensor data
        let consciousness = 0.5;
        let field = 0.5;
        if (ambientLight !== undefined) {
            consciousness = Math.min(1, ambientLight / 1000);
        }
        if (acceleration) {
            const motion = Math.sqrt(acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2);
            field = Math.min(1, motion / 10);
        }
        const sensorContext = {
            ...context,
            consciousness,
            field,
            time: Date.now()
        };
        // Use location to determine base number
        let baseNumber = 6; // Default to balance
        if (location) {
            const locationHash = this.simpleHash(`${location.latitude}${location.longitude}`);
            baseNumber = (locationHash % 9) + 1;
        }
        return (0, VBMColorSystem_1.getColorForVortexNumber)(baseNumber, sensorContext);
    }
    // ============================================================================
    // UTILITY METHODS
    // ============================================================================
    /**
     * Extract consciousness value from object
     */
    static extractConsciousness(obj) {
        if (typeof obj === 'number')
            return Math.max(0, Math.min(1, obj));
        if (obj.consciousness !== undefined)
            return Math.max(0, Math.min(1, obj.consciousness));
        if (obj.intensity !== undefined)
            return Math.max(0, Math.min(1, obj.intensity));
        if (obj.strength !== undefined)
            return Math.max(0, Math.min(1, obj.strength));
        return 0.5; // Default neutral consciousness
    }
    /**
     * Simple hash function for strings
     */
    static simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }
    /**
     * Get complementary color using VBM
     */
    static getComplementary(hex, context = {}) {
        // Convert hex to consciousness level and find complementary VBM number
        const hash = this.simpleHash(hex);
        const consciousness = (hash % 100) / 100;
        const complementaryContext = {
            ...context,
            consciousness: 1 - consciousness, // Inverse consciousness
            field: 1 - consciousness,
            time: Date.now()
        };
        // Use complementary VBM number (1↔8, 2↔7, 4↔5, 3↔6, 9↔9)
        const baseNumber = hash % 9 + 1;
        let complementaryNumber;
        switch (baseNumber) {
            case 1:
                complementaryNumber = 8;
                break;
            case 2:
                complementaryNumber = 7;
                break;
            case 4:
                complementaryNumber = 5;
                break;
            case 5:
                complementaryNumber = 4;
                break;
            case 7:
                complementaryNumber = 2;
                break;
            case 8:
                complementaryNumber = 1;
                break;
            case 3:
                complementaryNumber = 6;
                break;
            case 6:
                complementaryNumber = 3;
                break;
            default:
                complementaryNumber = 9;
                break;
        }
        return (0, VBMColorSystem_1.getColorForVortexNumber)(complementaryNumber, complementaryContext);
    }
    /**
     * Get analogous colors using VBM family groups
     */
    static getAnalogous(hex, count = 3, context = {}) {
        const hash = this.simpleHash(hex);
        const baseNumber = (hash % 9) + 1;
        const colors = [];
        // Use VBM family groups for analogous colors
        let familyNumbers;
        if ([1, 4, 7].includes(baseNumber)) {
            familyNumbers = [1, 4, 7]; // Yang family
        }
        else if ([2, 5, 8].includes(baseNumber)) {
            familyNumbers = [2, 5, 8]; // Yin family
        }
        else {
            familyNumbers = [3, 6, 9]; // W-Axis family
        }
        for (let i = 0; i < count; i++) {
            const familyNumber = familyNumbers[i % familyNumbers.length];
            if (typeof familyNumber === 'number') {
                const analogousContext = {
                    ...context,
                    consciousness: (hash + i) % 100 / 100,
                    field: (hash + i * 2) % 100 / 100,
                    time: Date.now() + i
                };
                colors.push((0, VBMColorSystem_1.getColorForVortexNumber)(familyNumber, analogousContext));
            }
        }
        return colors;
    }
    /**
     * Get triadic colors using VBM polar mates
     */
    static getTriadic(hex, context = {}) {
        const hash = this.simpleHash(hex);
        const baseNumber = (hash % 9) + 1;
        const colors = [];
        // Use VBM polar mates for triadic relationships
        const polarMates = {
            1: [1, 8], // Unity and Infinity
            2: [2, 7], // Duality and Mystery
            4: [4, 5], // Stability and Transformation
            3: [3, 6], // Spirit and Balance
            9: [9, 9] // Void with itself
        };
        const mates = polarMates[baseNumber] || [baseNumber, baseNumber];
        for (let i = 0; i < 3; i++) {
            const mateNumber = mates[i % mates.length];
            if (typeof mateNumber === 'number') {
                const triadicContext = {
                    ...context,
                    consciousness: (hash + i * 3) % 100 / 100,
                    field: (hash + i * 5) % 100 / 100,
                    time: Date.now() + i * 1000
                };
                colors.push((0, VBMColorSystem_1.getColorForVortexNumber)(mateNumber, triadicContext));
            }
        }
        return colors;
    }
}
exports.HexConsciousnessEncoder = HexConsciousnessEncoder;
//# sourceMappingURL=hex-consciousness-field.js.map