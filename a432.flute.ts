/**
 * A432 Flute Module
 * Mathematical calculations for flute design and tuning at A432 Hz
 * Incorporates sacred geometry and harmonic principles
 */

import { 
  A432_BASE_FREQUENCY,
  GOLDEN_RATIO,
  GOLDEN_RATIO_RECIPROCAL,
  PI,
  TAU,
  SQRT_2,
  SQRT_3,
  calculateA432Frequency,
  calculateDigitalRoot,
  SACRED_GEOMETRY_RATIOS
} from './src/0/3/6/9/1/2/4/8/7/5/1/a432.math.constants.js';

// === FLUTE PHYSICS CONSTANTS ===
export const SPEED_OF_SOUND = 343.2; // meters/second at 20°C
export const AIR_TEMPERATURE_REFERENCE = 20; // Celsius
export const END_CORRECTION_FACTOR = 0.3; // End correction for open pipe

// === A432 MUSICAL NOTES ===
export const A432_NOTES = {
  C: 256.87,    // C4 in A432 tuning (432 * (2^(-9/12)))
  D: 288.33,    // D4
  E: 323.63,    // E4
  F: 342.88,    // F4
  G: 384.87,    // G4
  A: 432.00,    // A4 (base frequency)
  B: 484.90,    // B4
  C5: 513.74    // C5 (octave)
};

// === FLUTE SCALE RATIOS (Just Intonation) ===
export const JUST_INTONATION_RATIOS = {
  unison: 1,           // 1:1
  minorSecond: 16/15,  // 16:15
  majorSecond: 9/8,    // 9:8
  minorThird: 6/5,     // 6:5
  majorThird: 5/4,     // 5:4
  perfectFourth: 4/3,  // 4:3
  tritone: 45/32,      // 45:32 (augmented fourth)
  perfectFifth: 3/2,   // 3:2
  minorSixth: 8/5,     // 8:5
  majorSixth: 5/3,     // 5:3
  minorSeventh: 16/9,  // 16:9
  majorSeventh: 15/8,  // 15:8
  octave: 2            // 2:1
};

// === FLUTE TYPES ===
export enum FluteType {
  CONCERT = 'concert',      // Western concert flute
  NATIVE = 'native',        // Native American flute
  BAMBOO = 'bamboo',        // Bamboo/Bansuri flute
  RECORDER = 'recorder',    // Recorder
  PICCOLO = 'piccolo',      // Piccolo
  ALTO = 'alto',           // Alto flute
  BASS = 'bass'            // Bass flute
}

// === FLUTE CONFIGURATION ===
export interface FluteConfig {
  type: FluteType;
  fundamentalFrequency: number;  // Hz
  length?: number;                // meters
  boreDiameter?: number;          // meters
  numberOfHoles?: number;
  material?: string;
  temperature?: number;           // Celsius
}

// === HOLE POSITION ===
export interface HolePosition {
  distance: number;      // Distance from embouchure (meters)
  diameter: number;      // Hole diameter (meters)
  frequency: number;     // Target frequency (Hz)
  note: string;         // Musical note name
  ratio: number;        // Frequency ratio to fundamental
  sacredRatio?: number; // Sacred geometry ratio if applicable
}

// === FLUTE CALCULATIONS ===

/**
 * Calculate the speed of sound at a given temperature
 * @param temperature Temperature in Celsius
 * @returns Speed of sound in m/s
 */
export function calculateSpeedOfSound(temperature: number): number {
  // Speed increases by approximately 0.6 m/s per degree Celsius
  return 331.3 + (0.6 * temperature);
}

/**
 * Calculate wavelength from frequency
 * @param frequency Frequency in Hz
 * @param temperature Temperature in Celsius
 * @returns Wavelength in meters
 */
export function calculateWavelength(frequency: number, temperature: number = 20): number {
  const speedOfSound = calculateSpeedOfSound(temperature);
  return speedOfSound / frequency;
}

/**
 * Calculate the effective length of a flute for a given frequency
 * Accounts for end correction
 * @param frequency Target frequency in Hz
 * @param boreDiameter Bore diameter in meters
 * @param temperature Temperature in Celsius
 * @returns Effective length in meters
 */
export function calculateFluteLength(
  frequency: number, 
  boreDiameter: number = 0.019, // Standard concert flute bore
  temperature: number = 20
): number {
  const wavelength = calculateWavelength(frequency, temperature);
  const endCorrection = END_CORRECTION_FACTOR * boreDiameter;
  // For open pipe (flute): L = λ/2 - end correction
  return (wavelength / 2) - endCorrection;
}

/**
 * Calculate hole positions using sacred geometry ratios
 * @param config Flute configuration
 * @returns Array of hole positions
 */
export function calculateHolePositions(config: FluteConfig): HolePosition[] {
  const {
    fundamentalFrequency = A432_NOTES.D, // D4 is common for flutes
    length = calculateFluteLength(fundamentalFrequency),
    boreDiameter = 0.019,
    numberOfHoles = 6,
    temperature = 20
  } = config;

  const positions: HolePosition[] = [];
  
  // Use golden ratio and other sacred ratios for hole spacing
  const sacredRatios = [
    { ratio: GOLDEN_RATIO_RECIPROCAL, note: 'E', freq: 1.122 },
    { ratio: 1/SQRT_2, note: 'F#', freq: 1.260 },
    { ratio: 1/SQRT_3, note: 'G', freq: 1.335 },
    { ratio: 0.5, note: 'A', freq: 1.498 },
    { ratio: GOLDEN_RATIO_RECIPROCAL * 0.75, note: 'B', freq: 1.682 },
    { ratio: 1/3, note: 'C#', freq: 1.888 }
  ];

  for (let i = 0; i < numberOfHoles && i < sacredRatios.length; i++) {
    const { ratio, note, freq } = sacredRatios[i];
    const holeFrequency = fundamentalFrequency * freq;
    
    positions.push({
      distance: length * (1 - ratio), // Distance from embouchure
      diameter: boreDiameter * 0.4,   // Typical hole size ratio
      frequency: holeFrequency,
      note: note,
      ratio: freq,
      sacredRatio: ratio
    });
  }

  return positions;
}

/**
 * Calculate resonant frequencies for a flute
 * @param length Flute length in meters
 * @param temperature Temperature in Celsius
 * @returns Array of resonant frequencies (harmonics)
 */
export function calculateResonantFrequencies(
  length: number,
  temperature: number = 20
): number[] {
  const speedOfSound = calculateSpeedOfSound(temperature);
  const frequencies: number[] = [];
  
  // Calculate first 8 harmonics for open pipe
  for (let n = 1; n <= 8; n++) {
    const frequency = (n * speedOfSound) / (2 * length);
    frequencies.push(frequency);
  }
  
  return frequencies;
}

/**
 * Design a flute tuned to A432 Hz
 * @param type Type of flute
 * @param keyNote The key note of the flute
 * @returns Complete flute design specifications
 */
export function designA432Flute(
  type: FluteType = FluteType.CONCERT,
  keyNote: keyof typeof A432_NOTES = 'D'
): {
  config: FluteConfig;
  dimensions: {
    length: number;
    boreDiameter: number;
    wallThickness: number;
  };
  holes: HolePosition[];
  harmonics: number[];
  sacredGeometry: {
    goldenRatioPoints: number[];
    fibonacciPoints: number[];
    digitalRoot: number;
  };
} {
  const fundamentalFrequency = A432_NOTES[keyNote];
  
  // Bore diameter varies by flute type
  const boreDiameters: Record<FluteType, number> = {
    [FluteType.CONCERT]: 0.019,
    [FluteType.NATIVE]: 0.022,
    [FluteType.BAMBOO]: 0.020,
    [FluteType.RECORDER]: 0.014,
    [FluteType.PICCOLO]: 0.010,
    [FluteType.ALTO]: 0.026,
    [FluteType.BASS]: 0.032
  };
  
  const boreDiameter = boreDiameters[type];
  const length = calculateFluteLength(fundamentalFrequency, boreDiameter);
  
  const config: FluteConfig = {
    type,
    fundamentalFrequency,
    length,
    boreDiameter,
    numberOfHoles: 6,
    material: type === FluteType.BAMBOO ? 'bamboo' : 'silver-plated',
    temperature: 20
  };
  
  const holes = calculateHolePositions(config);
  const harmonics = calculateResonantFrequencies(length);
  
  // Calculate sacred geometry points along the flute
  const goldenRatioPoints = [
    length * GOLDEN_RATIO_RECIPROCAL,
    length * GOLDEN_RATIO_RECIPROCAL * GOLDEN_RATIO_RECIPROCAL,
    length / GOLDEN_RATIO
  ];
  
  const fibonacciPoints = [1, 1, 2, 3, 5, 8, 13].map(n => (length * n) / 21);
  
  return {
    config,
    dimensions: {
      length,
      boreDiameter,
      wallThickness: boreDiameter * 0.1 // Typical wall thickness ratio
    },
    holes,
    harmonics,
    sacredGeometry: {
      goldenRatioPoints,
      fibonacciPoints,
      digitalRoot: calculateDigitalRoot(Math.round(fundamentalFrequency))
    }
  };
}

/**
 * Calculate the frequency adjustment needed for temperature compensation
 * @param baseFrequency Base frequency at reference temperature
 * @param currentTemp Current temperature in Celsius
 * @param referenceTemp Reference temperature in Celsius
 * @returns Adjusted frequency in Hz
 */
export function temperatureCompensation(
  baseFrequency: number,
  currentTemp: number,
  referenceTemp: number = 20
): number {
  // Frequency changes by approximately 3 cents per degree Celsius
  // 1 cent = 2^(1/1200) frequency ratio
  const cents = 3 * (currentTemp - referenceTemp);
  const ratio = Math.pow(2, cents / 1200);
  return baseFrequency * ratio;
}

/**
 * Calculate embouchure correction for different playing styles
 * @param frequency Target frequency
 * @param embouchureAngle Angle in degrees (typical: 35-45°)
 * @returns Correction factor
 */
export function embouchureCorrection(
  frequency: number,
  embouchureAngle: number = 40
): number {
  // Embouchure angle affects the effective length
  const angleRad = (embouchureAngle * PI) / 180;
  return 1 + (0.1 * Math.sin(angleRad));
}

/**
 * Generate a complete A432 flute scale
 * @param fundamental Fundamental frequency
 * @param scaleType Type of scale (major, minor, pentatonic, etc.)
 * @returns Array of frequencies in the scale
 */
export function generateA432Scale(
  fundamental: number = A432_NOTES.C,
  scaleType: 'major' | 'minor' | 'pentatonic' | 'chromatic' = 'major'
): number[] {
  const scales = {
    major: [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2],
    minor: [1, 9/8, 6/5, 4/3, 3/2, 8/5, 9/5, 2],
    pentatonic: [1, 9/8, 5/4, 3/2, 5/3, 2],
    chromatic: [
      1, 16/15, 9/8, 6/5, 5/4, 4/3, 45/32,
      3/2, 8/5, 5/3, 16/9, 15/8, 2
    ]
  };
  
  const ratios = scales[scaleType];
  return ratios.map(ratio => fundamental * ratio);
}

/**
 * Validate if a frequency is in A432 tuning
 * @param frequency Frequency to check
 * @param tolerance Tolerance in cents (100 cents = 1 semitone)
 * @returns Boolean indicating if frequency is A432-tuned
 */
export function isA432Tuned(frequency: number, tolerance: number = 10): boolean {
  // Check against all A432 reference frequencies
  const a432Frequencies = Object.values(A432_NOTES);
  
  for (const refFreq of a432Frequencies) {
    // Check fundamental and octaves
    for (let octave = -2; octave <= 2; octave++) {
      const targetFreq = refFreq * Math.pow(2, octave);
      const cents = 1200 * Math.log2(frequency / targetFreq);
      
      if (Math.abs(cents) <= tolerance) {
        return true;
      }
    }
  }
  
  return false;
}

// === EXPORTS ===
export const A432_FLUTE = {
  // Constants
  SPEED_OF_SOUND,
  A432_NOTES,
  JUST_INTONATION_RATIOS,
  
  // Functions
  calculateSpeedOfSound,
  calculateWavelength,
  calculateFluteLength,
  calculateHolePositions,
  calculateResonantFrequencies,
  designA432Flute,
  temperatureCompensation,
  embouchureCorrection,
  generateA432Scale,
  isA432Tuned
};

// === EXAMPLE USAGE ===
if (typeof require !== 'undefined' && require.main === module) {
  console.log('🎵 A432 Flute Design Calculator');
  console.log('================================\n');
  
  // Design a concert flute in D (A432 tuning)
  const fluteDesign = designA432Flute(FluteType.CONCERT, 'D');
  
  console.log('📐 Flute Specifications:');
  console.log(`  Type: ${fluteDesign.config.type}`);
  console.log(`  Fundamental: ${fluteDesign.config.fundamentalFrequency.toFixed(2)} Hz`);
  console.log(`  Length: ${(fluteDesign.dimensions.length * 100).toFixed(2)} cm`);
  console.log(`  Bore Diameter: ${(fluteDesign.dimensions.boreDiameter * 1000).toFixed(2)} mm`);
  
  console.log('\n🔳 Hole Positions:');
  fluteDesign.holes.forEach((hole, i) => {
    console.log(`  Hole ${i + 1} (${hole.note}): ${(hole.distance * 100).toFixed(2)} cm from embouchure`);
    console.log(`    Frequency: ${hole.frequency.toFixed(2)} Hz`);
    console.log(`    Sacred Ratio: ${hole.sacredRatio?.toFixed(4)}`);
  });
  
  console.log('\n🌀 Sacred Geometry:');
  console.log(`  Digital Root: ${fluteDesign.sacredGeometry.digitalRoot}`);
  console.log(`  Golden Ratio Points: ${fluteDesign.sacredGeometry.goldenRatioPoints.map(p => (p * 100).toFixed(2) + ' cm').join(', ')}`);
  
  console.log('\n🎼 Harmonics:');
  fluteDesign.harmonics.slice(0, 5).forEach((freq, i) => {
    console.log(`  ${i + 1}st harmonic: ${freq.toFixed(2)} Hz`);
  });
  
  // Generate a major scale
  console.log('\n🎵 A432 Major Scale (starting from C4):');
  const majorScale = generateA432Scale(A432_NOTES.C, 'major');
  const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'];
  majorScale.forEach((freq, i) => {
    console.log(`  ${noteNames[i]}: ${freq.toFixed(2)} Hz`);
  });
  
  // Check if a frequency is A432-tuned
  console.log('\n✅ Tuning Validation:');
  console.log(`  440 Hz is A432-tuned: ${isA432Tuned(440)}`);
  console.log(`  432 Hz is A432-tuned: ${isA432Tuned(432)}`);
  console.log(`  256.87 Hz (C4) is A432-tuned: ${isA432Tuned(256.87)}`);
}

export default A432_FLUTE;