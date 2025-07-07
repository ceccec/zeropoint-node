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
import { ColorContext } from '../src/math/VBMColorSystem';
export declare class HexConsciousnessEncoder {
    /**
     * Convert any object to hex color using VBM principles
     */
    static objectToHex(obj: any, context?: ColorContext): string;
    /**
     * Convert observer to hex color using VBM
     */
    static observerToHex(observer: Observer, context?: ColorContext): string;
    /**
     * Convert event to hex color using VBM
     */
    static eventToHex(event: RealityEvent, context?: ColorContext): string;
    /**
     * Convert pattern to hex color using VBM
     */
    static patternToHex(pattern: Pattern, context?: ColorContext): string;
    /**
     * Create field gradient from all objects using VBM
     */
    static fieldToGradient(observers: Observer[], events: RealityEvent[], patterns: Pattern[], context?: ColorContext): string;
    /**
     * Convert consciousness level to hex color using VBM
     */
    static consciousnessToHex(consciousness: number, context?: ColorContext): string;
    /**
     * Convert behavioral patterns to hex color using VBM
     */
    static behaviorToHex(patterns: BehavioralPatterns, context?: ColorContext): string;
    /**
     * Convert environmental factors to hex color using VBM
     */
    static environmentToHex(env: EnvironmentalFactors, context?: ColorContext): string;
    /**
     * Convert sensor data to hex color using VBM
     */
    static sensorToHex(sensorData: SensorData, context?: ColorContext): string;
    /**
     * Extract consciousness value from object
     */
    private static extractConsciousness;
    /**
     * Simple hash function for strings
     */
    private static simpleHash;
    /**
     * Get complementary color using VBM
     */
    static getComplementary(hex: string, context?: ColorContext): string;
    /**
     * Get analogous colors using VBM family groups
     */
    static getAnalogous(hex: string, count?: number, context?: ColorContext): string[];
    /**
     * Get triadic colors using VBM polar mates
     */
    static getTriadic(hex: string, context?: ColorContext): string[];
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
interface BehavioralPatterns {
    mouseActivity?: number;
    scrollActivity?: number;
    clickPatterns?: {
        count: number;
    };
}
interface EnvironmentalFactors {
    timeOfDay: string;
    season: string;
    colorScheme: string;
}
interface SensorData {
    ambientLight?: number;
    acceleration?: {
        x: number;
        y: number;
        z: number;
    };
    location?: {
        latitude: number;
        longitude: number;
    };
}
export {};
//# sourceMappingURL=hex-consciousness-field.d.ts.map