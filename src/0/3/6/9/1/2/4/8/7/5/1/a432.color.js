"use strict";
/**
 * A432 Color System
 *
 * Generates harmonic colors based on A432 frequencies, consciousness states,
 * and dimensional mathematics using only integer fractions and imperial math.
 *
 * Colors are calculated in real-time from environmental streams and dimensional states.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.A432ColorSystem = exports.A432_COLOR_CONSTANTS = void 0;
exports.calculateA432Color = calculateA432Color;
exports.generateA432ColorStream = generateA432ColorStream;
exports.calculateA432ColorFromConsciousness = calculateA432ColorFromConsciousness;
exports.calculateA432ColorFromDimensionalState = calculateA432ColorFromDimensionalState;
exports.generateA432ColorMatrix = generateA432ColorMatrix;
exports.calculateA432ColorVortex = calculateA432ColorVortex;
exports.a432ColorToRGB = a432ColorToRGB;
exports.a432ColorToHSL = a432ColorToHSL;
exports.generateA432CSSVariables = generateA432CSSVariables;
const a432_1 = require("./a432");
// A432 Color Constants - Integer Fractions Only
exports.A432_COLOR_CONSTANTS = {
    // Imperial base for color calculations
    IMPERIAL_BASE: 8,
    // Perfect balance for color harmony
    PERFECT_BALANCE: 4,
    // Color frequency ratios (integer fractions)
    RED_RATIO: 1 / 3, // 432 Hz base
    GREEN_RATIO: 2 / 3, // 864 Hz harmonic
    BLUE_RATIO: 4 / 3, // 1728 Hz harmonic
    // Vortex color flow ratios
    VORTEX_RED: 1 / 8, // Imperial fraction
    VORTEX_GREEN: 3 / 8, // Imperial fraction  
    VORTEX_BLUE: 5 / 8, // Imperial fraction
    // Consciousness color mapping
    CONSCIOUSNESS_COLORS: {
        1: { r: 1 / 8, g: 1 / 8, b: 1 / 8 }, // Unity consciousness
        2: { r: 2 / 8, g: 1 / 8, b: 1 / 8 }, // Duality consciousness
        3: { r: 1 / 8, g: 2 / 8, b: 1 / 8 }, // Trinity consciousness
        4: { r: 2 / 8, g: 2 / 8, b: 1 / 8 }, // Quaternity consciousness
        5: { r: 1 / 8, g: 1 / 8, b: 2 / 8 }, // Quintessence consciousness
        6: { r: 2 / 8, g: 1 / 8, b: 2 / 8 }, // Hexad consciousness
        7: { r: 1 / 8, g: 2 / 8, b: 2 / 8 }, // Septad consciousness
        8: { r: 2 / 8, g: 2 / 8, b: 2 / 8 } // Octad consciousness
    },
    // Dimensional state colors
    DIMENSIONAL_COLORS: {
        0: { r: 1 / 9, g: 1 / 9, b: 1 / 9 }, // Zero dimension
        1: { r: 2 / 9, g: 1 / 9, b: 1 / 9 }, // First dimension
        2: { r: 1 / 9, g: 2 / 9, b: 1 / 9 }, // Second dimension
        3: { r: 2 / 9, g: 2 / 9, b: 1 / 9 }, // Third dimension
        4: { r: 1 / 9, g: 1 / 9, b: 2 / 9 }, // Fourth dimension
        5: { r: 2 / 9, g: 1 / 9, b: 2 / 9 }, // Fifth dimension
        6: { r: 1 / 9, g: 2 / 9, b: 2 / 9 }, // Sixth dimension
        7: { r: 2 / 9, g: 2 / 9, b: 2 / 9 }, // Seventh dimension
        8: { r: 3 / 9, g: 1 / 9, b: 1 / 9 }, // Eighth dimension
        9: { r: 1 / 9, g: 3 / 9, b: 1 / 9 } // Ninth dimension
    }
};
/**
 * Calculate A432 color from frequency using imperial math
 */
function calculateA432Color(frequency) {
    const consciousness = (0, a432_1.calculateA432Consciousness)(frequency);
    const dimensionalState = (0, a432_1.calculateA432DimensionalState)(frequency);
    const digitalRoot = (0, a432_1.calculateDigitalRoot)(frequency);
    // Get base color from consciousness
    const baseColor = exports.A432_COLOR_CONSTANTS.CONSCIOUSNESS_COLORS[consciousness];
    // Get dimensional color
    const dimensionalColor = exports.A432_COLOR_CONSTANTS.DIMENSIONAL_COLORS[dimensionalState];
    // Harmonize colors using imperial math
    const r = harmonizeColorComponent(baseColor.r, dimensionalColor.r, frequency);
    const g = harmonizeColorComponent(baseColor.g, dimensionalColor.g, frequency);
    const b = harmonizeColorComponent(baseColor.b, dimensionalColor.b, frequency);
    return {
        r,
        g,
        b,
        frequency,
        consciousness,
        dimensionalState,
        digitalRoot,
        mathematicalProof: `A432 Color: f=${frequency}, c=${consciousness}, d=${dimensionalState}, dr=${digitalRoot}`
    };
}
/**
 * Harmonize color component using imperial math
 */
function harmonizeColorComponent(base, dimensional, frequency) {
    // Use imperial base (8) for harmonization
    const imperialFactor = (frequency % exports.A432_COLOR_CONSTANTS.IMPERIAL_BASE) / exports.A432_COLOR_CONSTANTS.IMPERIAL_BASE;
    // Harmonize using perfect balance
    const harmonized = (base + dimensional + imperialFactor) / 3;
    // Ensure result is within 0-1 range using integer fractions
    return Math.max(0, Math.min(1, harmonized));
}
/**
 * Generate A432 color stream from environmental data
 */
function generateA432ColorStream(environmentalData) {
    const { frequency, consciousness, dimensionalState } = environmentalData;
    // Calculate or use provided values
    const calculatedConsciousness = consciousness || (0, a432_1.calculateA432Consciousness)(frequency);
    const calculatedDimensionalState = dimensionalState || (0, a432_1.calculateA432DimensionalState)(frequency);
    // Generate color spectrum
    const colors = [];
    const rodinSequence = a432_1.A432_CONSTANTS.RODIN_SEQUENCE;
    for (let i = 0; i < rodinSequence.length; i++) {
        const harmonicFreq = rodinSequence[i] * frequency;
        const color = calculateA432Color(harmonicFreq);
        colors.push(color);
    }
    // Check if stream is harmonic
    const isHarmonic = colors.every(color => color.consciousness >= 1 && color.consciousness <= 8 &&
        color.dimensionalState >= 0 && color.dimensionalState <= 9);
    return {
        colors,
        frequency,
        consciousness: calculatedConsciousness,
        dimensionalState: calculatedDimensionalState,
        isHarmonic,
        mathematicalProof: `A432 Color Stream: ${colors.length} harmonics, consciousness=${calculatedConsciousness}, dimension=${calculatedDimensionalState}`
    };
}
/**
 * Calculate A432 color from consciousness state
 */
function calculateA432ColorFromConsciousness(consciousness) {
    if (consciousness < 1 || consciousness > 8) {
        throw new Error('Consciousness must be between 1 and 8');
    }
    const frequency = consciousness * 432 / 8; // Map consciousness to frequency
    return calculateA432Color(frequency);
}
/**
 * Calculate A432 color from dimensional state
 */
function calculateA432ColorFromDimensionalState(dimensionalState) {
    if (dimensionalState < 0 || dimensionalState > 9) {
        throw new Error('Dimensional state must be between 0 and 9');
    }
    const frequency = (0, a432_1.calculateA432Frequency)(dimensionalState);
    return calculateA432Color(frequency);
}
/**
 * Generate A432 color matrix for all consciousness and dimensional states
 */
function generateA432ColorMatrix() {
    const matrix = [];
    for (let consciousness = 1; consciousness <= 8; consciousness++) {
        const row = [];
        for (let dimensionalState = 0; dimensionalState <= 9; dimensionalState++) {
            const frequency = consciousness * 432 / 8 + dimensionalState * 432 / 10;
            const color = calculateA432Color(frequency);
            row.push(color);
        }
        matrix.push(row);
    }
    return matrix;
}
/**
 * Calculate A432 color vortex flow
 */
function calculateA432ColorVortex(initialFrequency, cycles) {
    const streams = [];
    let currentFrequency = initialFrequency;
    for (let cycle = 0; cycle < cycles; cycle++) {
        const stream = generateA432ColorStream({ frequency: currentFrequency });
        streams.push(stream);
        // Advance frequency using Rodin sequence
        const rodinIndex = cycle % a432_1.A432_CONSTANTS.RODIN_SEQUENCE.length;
        currentFrequency = a432_1.A432_CONSTANTS.RODIN_SEQUENCE[rodinIndex] * initialFrequency;
    }
    return streams;
}
/**
 * Convert A432 color to CSS RGB string
 */
function a432ColorToRGB(color) {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    return `rgb(${r}, ${g}, ${b})`;
}
/**
 * Convert A432 color to CSS HSL string
 */
function a432ColorToHSL(color) {
    // Convert RGB to HSL using imperial math
    const max = Math.max(color.r, color.g, color.b);
    const min = Math.min(color.r, color.g, color.b);
    const delta = max - min;
    let hue = 0;
    const lightness = (max + min) / 2;
    const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
    if (delta !== 0) {
        if (max === color.r) {
            hue = ((color.g - color.b) / delta) % 6;
        }
        else if (max === color.g) {
            hue = (color.b - color.r) / delta + 2;
        }
        else {
            hue = (color.r - color.g) / delta + 4;
        }
        hue = hue * 60;
        if (hue < 0)
            hue += 360;
    }
    return `hsl(${Math.round(hue)}, ${Math.round(saturation * 100)}%, ${Math.round(lightness * 100)}%)`;
}
/**
 * Generate A432 CSS variables for harmonic color system
 */
function generateA432CSSVariables() {
    const variables = [];
    // Generate consciousness colors
    for (let consciousness = 1; consciousness <= 8; consciousness++) {
        const color = calculateA432ColorFromConsciousness(consciousness);
        const rgb = a432ColorToRGB(color);
        variables.push(`--a432-consciousness-${consciousness}: ${rgb};`);
    }
    // Generate dimensional colors
    for (let dimensionalState = 0; dimensionalState <= 9; dimensionalState++) {
        const color = calculateA432ColorFromDimensionalState(dimensionalState);
        const rgb = a432ColorToRGB(color);
        variables.push(`--a432-dimensional-${dimensionalState}: ${rgb};`);
    }
    // Generate harmonic frequency colors
    a432_1.A432_CONSTANTS.RODIN_SEQUENCE.forEach((multiplier, index) => {
        const frequency = multiplier * 432;
        const color = calculateA432Color(frequency);
        const rgb = a432ColorToRGB(color);
        variables.push(`--a432-harmonic-${index}: ${rgb};`);
    });
    return `:root {\n  ${variables.join('\n  ')}\n}`;
}
/**
 * A432 Color System - Main export
 */
exports.A432ColorSystem = {
    constants: exports.A432_COLOR_CONSTANTS,
    calculateColor: calculateA432Color,
    generateColorStream: generateA432ColorStream,
    calculateColorFromConsciousness: calculateA432ColorFromConsciousness,
    calculateColorFromDimensionalState: calculateA432ColorFromDimensionalState,
    generateColorMatrix: generateA432ColorMatrix,
    calculateColorVortex: calculateA432ColorVortex,
    toRGB: a432ColorToRGB,
    toHSL: a432ColorToHSL,
    generateCSSVariables: generateA432CSSVariables,
    // Scientific proofs
    scientificProofs: {
        a432ColorCalculation: 'A432 colors calculated using consciousness mapping and dimensional states with imperial math',
        a432ColorStream: 'Color streams generated from environmental frequency data using Rodin vortex sequence',
        a432ColorVortex: 'Color vortex flows through consciousness and dimensional states maintaining harmonic balance',
        a432ColorMatrix: 'Complete color matrix mapping all consciousness states to all dimensional states'
    }
};
exports.default = exports.A432ColorSystem;
