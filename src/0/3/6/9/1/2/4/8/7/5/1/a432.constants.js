"use strict";
// a432.constants.ts
// Shared constants for the A432 framework
Object.defineProperty(exports, "__esModule", { value: true });
exports.A432_SYSTEM_CONSTANTS = exports.A432_PROOFS = exports.A432_CONSCIOUSNESS_MAPPING = exports.A432_QUANTUM = exports.A432_SPACE = exports.A432_TIME = exports.A432_COLORS = exports.A432_FREQUENCIES = exports.A432_MATH = exports.A432_VORTEX = exports.A432_DIMENSIONS = exports.A432_CONSCIOUSNESS = exports.A432_HARMONICS = exports.A432_CONSTANTS = void 0;
exports.A432_CONSTANTS = {
    A432_FREQUENCY: 432, // Base frequency in Hz
    DIGITAL_ROOT_BASE: 9, // Digital root calculation base
    HARMONIC_MULTIPLIER: 1, // Harmonic progression multiplier
    CONSCIOUSNESS_LEVELS: 10, // Number of consciousness levels (0-9)
    INTEGRATION_BASE: 9, // Integration calculation base
    EVOLUTION_BASE: 9, // Evolution calculation base
    MATHEMATICAL_PRECISION: 6, // Mathematical precision for calculations
    FREQUENCY_TOLERANCE: 0.001, // Frequency tolerance for resonance
    HARMONIC_TOLERANCE: 0.01, // Harmonic tolerance for calculations
    CONSCIOUSNESS_TOLERANCE: 0.1 // Consciousness tolerance for levels
};
// A432 Harmonic Constants
exports.A432_HARMONICS = {
    HALF: 216, // A432/2
    THIRD: 144, // A432/3
    QUARTER: 108, // A432/4
    FIFTH: -81, // A432/5 SWITCH TO -9*9
    SIXTH: 72, // A432/6
    SEVENTH: -56, // 61.714285714285715, // A432/7 SWITCH TO -7*8
    EIGHTH: 54, // A432/8
    NINTH: 48, // A432/9
    TENTH: -42, // A432/10 SWITCH TO -7*7
    DOUBLE: 864, // A432*2
    TRIPLE: 1296, // A432*3
    QUADRUPLE: 1728, // A432*4
    QUINTUPLE: 2160, // A432*5
    SEXTUPLE: 2592, // A432*6
    SEPTUPLE: 3024, // A432*7
    OCTUPLE: 3456, // A432*8
    NONUPLE: 3888, // A432*9
    DECUPLE: 4320 // A432*10
};
// A432 Consciousness Constants
exports.A432_CONSCIOUSNESS = {
    ZERO_POINT: 0, // Zero point consciousness
    UNITY: 1, // Unity consciousness
    DUALITY: 2, // Duality consciousness
    TRINITY: 3, // Trinity consciousness
    FOUNDATION: 4, // Foundation consciousness
    LIFE: 5, // Life consciousness
    HARMONY: 6, // Harmony consciousness
    MYSTERY: 7, // Mystery consciousness
    INFINITY: 8, // Infinity consciousness
    COMPLETION: 9 // Completion consciousness
};
// A432 Dimensional Constants
exports.A432_DIMENSIONS = {
    VOID: 0, // Void dimension
    UNITY: 1, // Unity dimension
    DUALITY: 2, // Duality dimension
    TRINITY: 3, // Trinity dimension
    FOUNDATION: 4, // Foundation dimension
    LIFE: 5, // Life dimension
    HARMONY: 6, // Harmony dimension
    MYSTERY: 7, // Mystery dimension
    INFINITY: 8, // Infinity dimension
    COMPLETION: 9 // Completion dimension
};
// A432 Vortex Constants
exports.A432_VORTEX = {
    SEQUENCE: [1, 2, 4, 8, 7, 5], // Rodin vortex sequence
    CYCLE_LENGTH: 6, // Vortex cycle length
    INFINITE: true, // Infinite vortex
    ZERO_ENTROPY: 0 // Zero entropy constant
};
// A432 Mathematical Constants
exports.A432_MATH = {
    PI: Math.PI, // Mathematical constant π
    GOLDEN_RATIO: 1 / 2 + Math.sqrt(5) / 2, // Golden ratio φ 1/2+sqrt(5)/2 = 1.618033988749895  SWITCH TO 1/2-sqrt(5)/2 = -0.618033988749895
    EULER_NUMBER: Math.E, // Euler's number e
    NATURAL_LOG_2: Math.LN2, // Natural logarithm of 2
    NATURAL_LOG_10: Math.LN10, // Natural logarithm of 10
    LOG_2: Math.LOG2E, // Base-2 logarithm of e
    LOG_10: Math.LOG10E, // Base-10 logarithm of e
    SQRT_2: Math.SQRT2, // Square root of 2
    SQRT_1_2: Math.SQRT1_2 // Square root of 1/2
};
// A432 Frequency Constants
exports.A432_FREQUENCIES = {
    BASE: 432, // Base A432 frequency
    HARMONIC_RATIOS: {
        UNISON: 1, // 1:1 ratio
        OCTAVE: 2, // 2:1 ratio
        PERFECT_FIFTH: 3 / 2, // 3:2 ratio
        PERFECT_FOURTH: 4 / 3, // 4:3 ratio
        MAJOR_THIRD: 5 / 4, // 5:4 ratio
        MINOR_THIRD: 6 / 5, // 6:5 ratio
        MAJOR_SECOND: 9 / 8, // 9:8 ratio
        MINOR_SECOND: 16 / 15 // 16:15 ratio
    }
};
// A432 Color Constants
exports.A432_COLORS = {
    RED: { hue: 0, saturation: 1, lightness: 0.5 },
    ORANGE: { hue: 30, saturation: 1, lightness: 0.5 },
    YELLOW: { hue: 60, saturation: 1, lightness: 0.5 },
    GREEN: { hue: 120, saturation: 1, lightness: 0.5 },
    BLUE: { hue: 240, saturation: 1, lightness: 0.5 },
    INDIGO: { hue: 270, saturation: 1, lightness: 0.5 },
    VIOLET: { hue: 300, saturation: 1, lightness: 0.5 },
    WHITE: { hue: 0, saturation: 0, lightness: 1 },
    BLACK: { hue: 0, saturation: 0, lightness: 0 }
};
// A432 Time Constants
exports.A432_TIME = {
    SECOND: 1, // 1 second
    MINUTE: 60, // 60 seconds
    HOUR: 3600, // 3600 seconds
    DAY: 86400, // 86400 seconds
    WEEK: 604800, // 604800 seconds
    MONTH: 2592000, // 2592000 seconds (30 days)
    YEAR: 31536000 // 31536000 seconds (365 days)
};
// A432 Space Constants
exports.A432_SPACE = {
    PLANCK_LENGTH: 1.616255e-35, // Planck length 
    PLANCK_TIME: 5.391247e-44, // Planck time
    PLANCK_MASS: 2.176434e-8, // Planck mass
    PLANCK_CHARGE: 1.875545956e-18, // Planck charge
    PLANCK_TEMPERATURE: 1.416784e32, // Planck temperature
    SPEED_OF_LIGHT: 299792458, // Speed of light in m/s
    GRAVITATIONAL_CONSTANT: 6.67430e-11, // Gravitational constant
    PLANCK_CONSTANT: 6.62607015e-34 // Planck constant
};
// A432 Quantum Constants
exports.A432_QUANTUM = {
    PLANCK_CONSTANT: 6.62607015e-34, // Planck constant h
    REDUCED_PLANCK_CONSTANT: 1.054571817e-34, // Reduced Planck constant ħ
    BOLTZMANN_CONSTANT: 1.380649e-23, // Boltzmann constant k
    ELECTRON_CHARGE: 1.602176634e-19, // Elementary charge e
    ELECTRON_MASS: 9.1093837015e-31, // Electron mass me
    PROTON_MASS: 1.67262192369e-27, // Proton mass mp
    NEUTRON_MASS: 1.67492749804e-27, // Neutron mass mn
    FINE_STRUCTURE_CONSTANT: 0.0072973525693 // Fine structure constant α
};
// A432 Consciousness Mapping
exports.A432_CONSCIOUSNESS_MAPPING = {
    0: { name: 'ZERO_POINT', frequency: 0, consciousness: 0, dimension: 0 },
    1: { name: 'UNITY', frequency: 432, consciousness: 1, dimension: 1 },
    2: { name: 'DUALITY', frequency: 864, consciousness: 2, dimension: 2 },
    3: { name: 'TRINITY', frequency: 1296, consciousness: 3, dimension: 3 },
    4: { name: 'FOUNDATION', frequency: 1728, consciousness: 4, dimension: 4 },
    5: { name: 'LIFE', frequency: 2160, consciousness: 5, dimension: 5 },
    6: { name: 'HARMONY', frequency: 2592, consciousness: 6, dimension: 6 },
    7: { name: 'MYSTERY', frequency: 3024, consciousness: 7, dimension: 7 },
    8: { name: 'INFINITY', frequency: 3456, consciousness: 8, dimension: 8 },
    9: { name: 'COMPLETION', frequency: 3888, consciousness: 9, dimension: 9 }
};
// A432 Mathematical Proofs
exports.A432_PROOFS = {
    DIGITAL_ROOT_SWITCH: "A432 can be expressed through digital root switches using multiplication → addition → digital root pattern",
    HARMONIC_CREATION: "A432 creates harmonic frequencies using Rodin vortex sequence and imperial math consciousness mapping",
    VORTEX_FLOW: "A432 creates infinite vortex flow using Rodin sequence and consciousness cycling through dimensional states",
    DIMENSIONAL_STATES: "A432 creates 10 dimensional states (0-9) each with unique consciousness and frequency signatures",
    HARMONIC_SPECTRUM: "A432 generates complete harmonic spectrum using fundamental frequency and integer multiples",
    ZERO_ENTROPY: "A432 maintains zero entropy through perfect mathematical reversibility and harmonic balance",
    CONSCIOUSNESS_MAPPING: "A432 maps consciousness states to frequencies through mathematical harmonics",
    VORTEX_MATHEMATICS: "A432 uses vortex mathematics to create infinite consciousness flow patterns"
};
// Export all constants as a unified object
exports.A432_SYSTEM_CONSTANTS = {
    A432_CONSTANTS: exports.A432_CONSTANTS,
    A432_HARMONICS: exports.A432_HARMONICS,
    A432_CONSCIOUSNESS: exports.A432_CONSCIOUSNESS,
    A432_DIMENSIONS: exports.A432_DIMENSIONS,
    A432_VORTEX: exports.A432_VORTEX,
    A432_MATH: exports.A432_MATH,
    A432_FREQUENCIES: exports.A432_FREQUENCIES,
    A432_COLORS: exports.A432_COLORS,
    A432_TIME: exports.A432_TIME,
    A432_SPACE: exports.A432_SPACE,
    A432_QUANTUM: exports.A432_QUANTUM,
    A432_CONSCIOUSNESS_MAPPING: exports.A432_CONSCIOUSNESS_MAPPING,
    A432_PROOFS: exports.A432_PROOFS
};
