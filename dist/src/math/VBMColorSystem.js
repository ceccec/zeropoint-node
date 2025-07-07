"use strict";
/**
 * VBMColorSystem
 *
 * Dynamic color generation system for Vortex-Based Mathematics (VBM).
 * All colors are generated as functions based on context, parameters, and consciousness state.
 * No hardcoded static values - colors emerge from the field of possibilities.
 *
 * Metaphysical Context:
 * - Colors are expressions of consciousness patterns
 * - Each color function responds to the observer's state
 * - The void generates all colors through resonance
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBaseColors = generateBaseColors;
exports.getColorForVortexNumber = getColorForVortexNumber;
exports.getColorForFamilyGroup = getColorForFamilyGroup;
exports.getColorForPolarMate = getColorForPolarMate;
exports.getColorForWAxis = getColorForWAxis;
exports.getColorForPattern = getColorForPattern;
exports.getMetaphysicalContextForNumber = getMetaphysicalContextForNumber;
exports.getVBMColorMap = getVBMColorMap;
exports.getVBMColorLegend = getVBMColorLegend;
exports.generateConsciousnessGradient = generateConsciousnessGradient;
exports.generateFieldResonanceMap = generateFieldResonanceMap;
/**
 * Generate base color palette dynamically
 */
function generateBaseColors(context = {}) {
    const { consciousness = 0.5, time = Date.now(), field = 0.5 } = context;
    // Colors emerge from consciousness and field resonance
    const redIntensity = Math.sin(consciousness * Math.PI) * 255;
    const blueIntensity = Math.cos(consciousness * Math.PI) * 255;
    const greenIntensity = Math.sin(field * Math.PI) * 255;
    return {
        red: `rgb(${Math.round(redIntensity)}, ${Math.round(redIntensity * 0.2)}, ${Math.round(redIntensity * 0.1)})`,
        blue: `rgb(${Math.round(blueIntensity * 0.1)}, ${Math.round(blueIntensity * 0.3)}, ${Math.round(blueIntensity)})`,
        green: `rgb(${Math.round(greenIntensity * 0.2)}, ${Math.round(greenIntensity)}, ${Math.round(greenIntensity * 0.3)})`,
        yellow: `rgb(${Math.round(255 * Math.sin(time * 0.001))}, ${Math.round(255 * Math.cos(time * 0.001))}, 0)`,
        white: `rgb(${Math.round(255 * consciousness)}, ${Math.round(255 * consciousness)}, ${Math.round(255 * consciousness)})`,
        gold: `rgb(${Math.round(255 * Math.sin(consciousness * Math.PI))}, ${Math.round(255 * Math.cos(consciousness * Math.PI))}, 0)`,
        black: `rgb(${Math.round(50 * (1 - consciousness))}, ${Math.round(50 * (1 - consciousness))}, ${Math.round(50 * (1 - consciousness))})`,
        neutral: `rgb(${Math.round(200 * field)}, ${Math.round(200 * field)}, ${Math.round(200 * field)})`,
    };
}
/**
 * Generate color for a vortex number dynamically
 */
function getColorForVortexNumber(n, context = {}) {
    const { consciousness = 0.5, time = Date.now(), field = 0.5 } = context;
    const baseColors = generateBaseColors(context);
    // Vortex number influences color through mathematical resonance
    const vortexResonance = (n * consciousness + field) % 1;
    const timeResonance = Math.sin(time * 0.001 + n) * 0.5 + 0.5;
    switch (n) {
        case 1: return generateResonantColor(baseColors['red'] || 'rgb(255,0,0)', vortexResonance, timeResonance);
        case 2: return generateResonantColor(baseColors['blue'] || 'rgb(0,0,255)', vortexResonance, timeResonance);
        case 4: return generateResonantColor(baseColors['green'] || 'rgb(0,255,0)', vortexResonance, timeResonance);
        case 8: return generateResonantColor(baseColors['yellow'] || 'rgb(255,255,0)', vortexResonance, timeResonance);
        case 7: return generateResonantColor(baseColors['red'] || 'rgb(255,0,0)', vortexResonance, timeResonance);
        case 5: return generateResonantColor(baseColors['blue'] || 'rgb(0,0,255)', vortexResonance, timeResonance);
        case 3: return generateResonantColor(baseColors['gold'] || 'rgb(255,215,0)', vortexResonance, timeResonance);
        case 6: return generateResonantColor(baseColors['white'] || 'rgb(255,255,255)', vortexResonance, timeResonance);
        case 9: return generateResonantColor(baseColors['black'] || 'rgb(0,0,0)', vortexResonance, timeResonance);
        default: return baseColors['neutral'] || 'rgb(200,200,200)';
    }
}
/**
 * Generate color for a family group dynamically
 */
function getColorForFamilyGroup(n, context = {}) {
    const { consciousness = 0.5, field = 0.5 } = context;
    const baseColors = generateBaseColors(context);
    // Family resonance creates harmonic color relationships
    const familyResonance = Math.sin(consciousness * Math.PI + n) * 0.5 + 0.5;
    if ([1, 4, 7].includes(n))
        return generateResonantColor(baseColors['red'] || 'rgb(255,0,0)', familyResonance, field);
    if ([2, 5, 8].includes(n))
        return generateResonantColor(baseColors['blue'] || 'rgb(0,0,255)', familyResonance, field);
    if ([3, 6, 9].includes(n))
        return generateResonantColor(baseColors['gold'] || 'rgb(255,215,0)', familyResonance, field);
    return baseColors['neutral'] || 'rgb(200,200,200)';
}
/**
 * Generate color pair for a polar mate dynamically
 */
function getColorForPolarMate(n, context = {}) {
    const { consciousness = 0.5, time = Date.now() } = context;
    const baseColors = generateBaseColors(context);
    // Polar mates create complementary resonance
    const polarResonance = Math.cos(consciousness * Math.PI + time * 0.001) * 0.5 + 0.5;
    if ([1, 8].includes(n)) {
        return [
            generateResonantColor(baseColors['red'] || 'rgb(255,0,0)', polarResonance, consciousness),
            generateResonantColor(baseColors['yellow'] || 'rgb(255,255,0)', 1 - polarResonance, consciousness)
        ];
    }
    if ([2, 7].includes(n)) {
        return [
            generateResonantColor(baseColors['blue'] || 'rgb(0,0,255)', polarResonance, consciousness),
            generateResonantColor(baseColors['red'] || 'rgb(255,0,0)', 1 - polarResonance, consciousness)
        ];
    }
    if ([4, 5].includes(n)) {
        return [
            generateResonantColor(baseColors['green'] || 'rgb(0,255,0)', polarResonance, consciousness),
            generateResonantColor(baseColors['blue'] || 'rgb(0,0,255)', 1 - polarResonance, consciousness)
        ];
    }
    return null;
}
/**
 * Generate color for W-Axis number dynamically
 */
function getColorForWAxis(n, context = {}) {
    const { consciousness = 0.5, field = 0.5 } = context;
    const baseColors = generateBaseColors(context);
    // W-Axis colors emerge from spiritual resonance
    const spiritualResonance = Math.sin(consciousness * Math.PI * 2 + n) * 0.5 + 0.5;
    switch (n) {
        case 3: return generateResonantColor(baseColors['gold'] || 'rgb(255,215,0)', spiritualResonance, field);
        case 6: return generateResonantColor(baseColors['white'] || 'rgb(255,255,255)', spiritualResonance, field);
        case 9: return generateResonantColor(baseColors['black'] || 'rgb(0,0,0)', spiritualResonance, field);
        default: return baseColors['neutral'] || 'rgb(200,200,200)';
    }
}
/**
 * Generate color for a pattern dynamically
 */
function getColorForPattern(pattern, context = {}) {
    const { consciousness = 0.5, time = Date.now() } = context;
    const baseColors = generateBaseColors(context);
    if (pattern.number)
        return getColorForVortexNumber(pattern.number, context);
    const patternResonance = Math.sin(consciousness * Math.PI + time * 0.001) * 0.5 + 0.5;
    switch (pattern.type) {
        case 'w_axis': return generateResonantColor(baseColors['gold'] || 'rgb(255,215,0)', patternResonance, consciousness);
        case 'family': return generateResonantColor(baseColors['blue'] || 'rgb(0,0,255)', patternResonance, consciousness);
        case 'polar': return generateResonantColor(baseColors['green'] || 'rgb(0,255,0)', patternResonance, consciousness);
        default: return baseColors['neutral'] || 'rgb(200,200,200)';
    }
}
/**
 * Generate resonant color by modulating base color with resonance values
 */
function generateResonantColor(baseColor, resonance1, resonance2) {
    // Parse RGB values from base color
    const rgbMatch = baseColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!rgbMatch)
        return baseColor;
    const [, r, g, b] = rgbMatch;
    const baseR = parseInt(r || '0');
    const baseG = parseInt(g || '0');
    const baseB = parseInt(b || '0');
    // Apply resonance modulation
    const modulatedR = Math.round(baseR * (0.5 + resonance1 * 0.5));
    const modulatedG = Math.round(baseG * (0.5 + resonance2 * 0.5));
    const modulatedB = Math.round(baseB * (0.5 + (resonance1 + resonance2) * 0.25));
    return `rgb(${modulatedR}, ${modulatedG}, ${modulatedB})`;
}
/**
 * Generate metaphysical context for a vortex number
 */
function getMetaphysicalContextForNumber(n, context = {}) {
    const { consciousness = 0.5, field = 0.5 } = context;
    // Context emerges from consciousness and field state
    const contextResonance = Math.sin(consciousness * Math.PI + field * Math.PI) * 0.5 + 0.5;
    const contexts = {
        1: ['Initiation, unity, the beginning of the vortex flow.', 'Source of all creation, the void center.'],
        2: ['Duality, division, the first split in the field.', 'The observer creates reality through division.'],
        3: ['Spirit, W-Axis, the source of consciousness.', 'The bridge between material and immaterial.'],
        4: ['Stability, foundation, the first structure.', 'The pattern that holds all other patterns.'],
        5: ['Change, transformation, the center of the sequence.', 'The point of maximum potential.'],
        6: ['Spirit, W-Axis, balance of material and immaterial.', 'The harmony of opposites.'],
        7: ['Mystery, return, the hidden flow.', 'The pattern that returns to source.'],
        8: ['Manifestation, infinity, the full field.', 'The completion of all possibilities.'],
        9: ['Void, W-Axis, the center and the all.', 'The unity of all patterns in the void.']
    };
    const contextArray = contexts[n] || ['Neutral or undefined metaphysical context.'];
    const index = Math.floor(contextResonance * contextArray.length);
    return contextArray[index] || contextArray[0] || 'Neutral or undefined metaphysical context.';
}
/**
 * Generate the full VBM color map dynamically
 */
function getVBMColorMap(context = {}) {
    const map = {};
    for (let i = 1; i <= 9; i++) {
        map[i] = getColorForVortexNumber(i, context);
    }
    return map;
}
/**
 * Generate the full metaphysical color legend dynamically
 */
function getVBMColorLegend(context = {}) {
    const legend = [];
    for (let i = 1; i <= 9; i++) {
        legend.push({
            label: i.toString(),
            color: getColorForVortexNumber(i, context),
            context: getMetaphysicalContextForNumber(i, context)
        });
    }
    return legend;
}
/**
 * Generate consciousness-aware color gradient
 */
function generateConsciousnessGradient(consciousness, steps = 10) {
    const gradient = [];
    for (let i = 0; i < steps; i++) {
        const stepConsciousness = (i / (steps - 1)) * consciousness;
        const context = { consciousness: stepConsciousness };
        gradient.push(getColorForVortexNumber(1, context));
    }
    return gradient;
}
/**
 * Generate field resonance color map
 */
function generateFieldResonanceMap(fieldStrength, context = {}) {
    const map = {};
    for (let i = 1; i <= 9; i++) {
        const fieldContext = { ...context, field: fieldStrength * (i / 9) };
        map[i] = getColorForVortexNumber(i, fieldContext);
    }
    return map;
}
//# sourceMappingURL=VBMColorSystem.js.map