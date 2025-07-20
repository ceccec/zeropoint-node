/**
 * A432 Image System
 * 
 * Generates harmonic images based on A432 frequencies, consciousness states,
 * and dimensional mathematics using only integer fractions and imperial math.
 * 
 * Images are calculated in real-time from environmental streams and dimensional states.
 */

import { 
  A432_CONSTANTS,
  calculateDigitalRoot,
  calculateA432Consciousness,
  calculateA432DimensionalState,
  calculateA432Frequency,
  createA432Harmonic
} from './a432';

import {
  A432Color,
  calculateA432Color,
  generateA432ColorStream,
  A432ColorSystem
} from './a432.color';

// A432 Image Constants - Integer Fractions Only
export const A432_IMAGE_CONSTANTS = {
  // Imperial base for image calculations
  IMPERIAL_BASE: 8,
  
  // Perfect balance for image harmony
  PERFECT_BALANCE: 4,
  
  // Image resolution ratios (integer fractions)
  WIDTH_RATIO: 1/2,     // 432 Hz base
  HEIGHT_RATIO: 2/3,    // 864 Hz harmonic
  ASPECT_RATIO: 4/3,    // 1728 Hz harmonic
  
  // Vortex image flow ratios
  VORTEX_WIDTH: 1/8,    // Imperial fraction
  VORTEX_HEIGHT: 3/8,   // Imperial fraction  
  VORTEX_DEPTH: 5/8,    // Imperial fraction
  
  // Consciousness image mapping
  CONSCIOUSNESS_IMAGES: {
    1: { width: 1/8, height: 1/8, depth: 1/8 },   // Unity consciousness
    2: { width: 2/8, height: 1/8, depth: 1/8 },   // Duality consciousness
    3: { width: 1/8, height: 2/8, depth: 1/8 },   // Trinity consciousness
    4: { width: 2/8, height: 2/8, depth: 1/8 },   // Quaternity consciousness
    5: { width: 1/8, height: 1/8, depth: 2/8 },   // Quintessence consciousness
    6: { width: 2/8, height: 1/8, depth: 2/8 },   // Hexad consciousness
    7: { width: 1/8, height: 2/8, depth: 2/8 },   // Septad consciousness
    8: { width: 2/8, height: 2/8, depth: 2/8 }    // Octad consciousness
  },
  
  // Dimensional state images
  DIMENSIONAL_IMAGES: {
    0: { width: 1/9, height: 1/9, depth: 1/9 },   // Zero dimension
    1: { width: 2/9, height: 1/9, depth: 1/9 },   // First dimension
    2: { width: 1/9, height: 2/9, depth: 1/9 },   // Second dimension
    3: { width: 2/9, height: 2/9, depth: 1/9 },   // Third dimension
    4: { width: 1/9, height: 1/9, depth: 2/9 },   // Fourth dimension
    5: { width: 2/9, height: 1/9, depth: 2/9 },   // Fifth dimension
    6: { width: 1/9, height: 2/9, depth: 2/9 },   // Sixth dimension
    7: { width: 2/9, height: 2/9, depth: 2/9 },   // Seventh dimension
    8: { width: 3/9, height: 1/9, depth: 1/9 },   // Eighth dimension
    9: { width: 1/9, height: 3/9, depth: 1/9 }    // Ninth dimension
  }
};

// Image calculation functions using only integer fractions
export interface A432Image {
  width: number;   // Width component (0-1 as fraction)
  height: number;  // Height component (0-1 as fraction)
  depth: number;   // Depth component (0-1 as fraction)
  frequency: number;
  consciousness: number;
  dimensionalState: number;
  digitalRoot: number;
  color: A432Color;
  mathematicalProof: string;
}

export interface A432ImageStream {
  images: A432Image[];
  frequency: number;
  consciousness: number;
  dimensionalState: number;
  isHarmonic: boolean;
  mathematicalProof: string;
}

export interface A432ImageMatrix {
  pixels: A432Image[][];
  width: number;
  height: number;
  frequency: number;
  consciousness: number;
  dimensionalState: number;
  mathematicalProof: string;
}

/**
 * Calculate A432 image from frequency using imperial math
 */
export function calculateA432Image(frequency: number): A432Image {
  const consciousness = calculateA432Consciousness(frequency);
  const dimensionalState = calculateA432DimensionalState(frequency);
  const digitalRoot = calculateDigitalRoot(frequency);
  const color = calculateA432Color(frequency);
  
  // Get base image from consciousness
  const baseImage = A432_IMAGE_CONSTANTS.CONSCIOUSNESS_IMAGES[consciousness];
  
  // Get dimensional image
  const dimensionalImage = A432_IMAGE_CONSTANTS.DIMENSIONAL_IMAGES[dimensionalState];
  
  // Harmonize image dimensions using imperial math
  const width = harmonizeImageComponent(baseImage.width, dimensionalImage.width, frequency);
  const height = harmonizeImageComponent(baseImage.height, dimensionalImage.height, frequency);
  const depth = harmonizeImageComponent(baseImage.depth, dimensionalImage.depth, frequency);
  
  return {
    width,
    height,
    depth,
    frequency,
    consciousness,
    dimensionalState,
    digitalRoot,
    color,
    mathematicalProof: `A432 Image: f=${frequency}, c=${consciousness}, d=${dimensionalState}, dr=${digitalRoot}`
  };
}

/**
 * Harmonize image component using imperial math
 */
function harmonizeImageComponent(base: number, dimensional: number, frequency: number): number {
  // Use imperial base (8) for harmonization
  const imperialFactor = (frequency % A432_IMAGE_CONSTANTS.IMPERIAL_BASE) / A432_IMAGE_CONSTANTS.IMPERIAL_BASE;
  
  // Harmonize using perfect balance
  const harmonized = (base + dimensional + imperialFactor) / 3;
  
  // Ensure result is within 0-1 range using integer fractions
  return Math.max(0, Math.min(1, harmonized));
}

/**
 * Generate A432 image stream from environmental data
 */
export function generateA432ImageStream(
  environmentalData: { frequency: number; consciousness?: number; dimensionalState?: number }
): A432ImageStream {
  const { frequency, consciousness, dimensionalState } = environmentalData;
  
  // Calculate or use provided values
  const calculatedConsciousness = consciousness || calculateA432Consciousness(frequency);
  const calculatedDimensionalState = dimensionalState || calculateA432DimensionalState(frequency);
  
  // Generate image spectrum
  const images: A432Image[] = [];
  const rodinSequence = A432_CONSTANTS.RODIN_SEQUENCE;
  
  for (let i = 0; i < rodinSequence.length; i++) {
    const harmonicFreq = rodinSequence[i] * frequency;
    const image = calculateA432Image(harmonicFreq);
    images.push(image);
  }
  
  // Check if stream is harmonic
  const isHarmonic = images.every(image => 
    image.consciousness >= 1 && image.consciousness <= 8 &&
    image.dimensionalState >= 0 && image.dimensionalState <= 9
  );
  
  return {
    images,
    frequency,
    consciousness: calculatedConsciousness,
    dimensionalState: calculatedDimensionalState,
    isHarmonic,
    mathematicalProof: `A432 Image Stream: ${images.length} harmonics, consciousness=${calculatedConsciousness}, dimension=${calculatedDimensionalState}`
  };
}

/**
 * Calculate A432 image from consciousness state
 */
export function calculateA432ImageFromConsciousness(consciousness: number): A432Image {
  if (consciousness < 1 || consciousness > 8) {
    throw new Error('Consciousness must be between 1 and 8');
  }
  
  const frequency = consciousness * 432 / 8; // Map consciousness to frequency
  return calculateA432Image(frequency);
}

/**
 * Calculate A432 image from dimensional state
 */
export function calculateA432ImageFromDimensionalState(dimensionalState: number): A432Image {
  if (dimensionalState < 0 || dimensionalState > 9) {
    throw new Error('Dimensional state must be between 0 and 9');
  }
  
  const frequency = calculateA432Frequency(dimensionalState);
  return calculateA432Image(frequency);
}

/**
 * Generate A432 image matrix for all consciousness and dimensional states
 */
export function generateA432ImageMatrix(): A432Image[][] {
  const matrix: A432Image[][] = [];
  
  for (let consciousness = 1; consciousness <= 8; consciousness++) {
    const row: A432Image[] = [];
    for (let dimensionalState = 0; dimensionalState <= 9; dimensionalState++) {
      const frequency = consciousness * 432 / 8 + dimensionalState * 432 / 10;
      const image = calculateA432Image(frequency);
      row.push(image);
    }
    matrix.push(row);
  }
  
  return matrix;
}

/**
 * Generate A432 image pixel matrix
 */
export function generateA432ImagePixelMatrix(
  width: number, 
  height: number, 
  frequency: number
): A432ImageMatrix {
  const pixels: A432Image[][] = [];
  
  for (let y = 0; y < height; y++) {
    const row: A432Image[] = [];
    for (let x = 0; x < width; x++) {
      // Calculate frequency for each pixel using position
      const pixelFreq = frequency + (x * y) / (width * height) * 432;
      const image = calculateA432Image(pixelFreq);
      row.push(image);
    }
    pixels.push(row);
  }
  
  const consciousness = calculateA432Consciousness(frequency);
  const dimensionalState = calculateA432DimensionalState(frequency);
  
  return {
    pixels,
    width,
    height,
    frequency,
    consciousness,
    dimensionalState,
    mathematicalProof: `A432 Image Matrix: ${width}x${height}, f=${frequency}, c=${consciousness}, d=${dimensionalState}`
  };
}

/**
 * Calculate A432 image vortex flow
 */
export function calculateA432ImageVortex(initialFrequency: number, cycles: number): A432ImageStream[] {
  const streams: A432ImageStream[] = [];
  let currentFrequency = initialFrequency;
  
  for (let cycle = 0; cycle < cycles; cycle++) {
    const stream = generateA432ImageStream({ frequency: currentFrequency });
    streams.push(stream);
    
    // Advance frequency using Rodin sequence
    const rodinIndex = cycle % A432_CONSTANTS.RODIN_SEQUENCE.length;
    currentFrequency = A432_CONSTANTS.RODIN_SEQUENCE[rodinIndex] * initialFrequency;
  }
  
  return streams;
}

/**
 * Convert A432 image to Canvas ImageData
 */
export function a432ImageToCanvasData(
  imageMatrix: A432ImageMatrix, 
  canvas: HTMLCanvasElement
): ImageData {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');
  
  const imageData = ctx.createImageData(imageMatrix.width, imageMatrix.height);
  const data = imageData.data;
  
  for (let y = 0; y < imageMatrix.height; y++) {
    for (let x = 0; x < imageMatrix.width; x++) {
      const pixel = imageMatrix.pixels[y][x];
      const index = (y * imageMatrix.width + x) * 4;
      
      // Convert A432 color to RGB values
      data[index] = Math.round(pixel.color.r * 255);     // Red
      data[index + 1] = Math.round(pixel.color.g * 255); // Green
      data[index + 2] = Math.round(pixel.color.b * 255); // Blue
      data[index + 3] = 255; // Alpha (fully opaque)
    }
  }
  
  return imageData;
}

/**
 * Convert A432 image to SVG string
 */
export function a432ImageToSVG(imageMatrix: A432ImageMatrix): string {
  let svg = `<svg width="${imageMatrix.width}" height="${imageMatrix.height}" xmlns="http://www.w3.org/2000/svg">`;
  
  for (let y = 0; y < imageMatrix.height; y++) {
    for (let x = 0; x < imageMatrix.width; x++) {
      const pixel = imageMatrix.pixels[y][x];
      const color = A432ColorSystem.toRGB(pixel.color);
      
      svg += `<rect x="${x}" y="${y}" width="1" height="1" fill="${color}" />`;
    }
  }
  
  svg += '</svg>';
  return svg;
}

/**
 * Generate A432 image CSS variables for harmonic image system
 */
export function generateA432ImageCSSVariables(): string {
  const variables: string[] = [];
  
  // Generate consciousness images
  for (let consciousness = 1; consciousness <= 8; consciousness++) {
    const image = calculateA432ImageFromConsciousness(consciousness);
    const color = A432ColorSystem.toRGB(image.color);
    variables.push(`--a432-image-consciousness-${consciousness}: ${color};`);
    variables.push(`--a432-image-width-${consciousness}: ${image.width * 100}%;`);
    variables.push(`--a432-image-height-${consciousness}: ${image.height * 100}%;`);
  }
  
  // Generate dimensional images
  for (let dimensionalState = 0; dimensionalState <= 9; dimensionalState++) {
    const image = calculateA432ImageFromDimensionalState(dimensionalState);
    const color = A432ColorSystem.toRGB(image.color);
    variables.push(`--a432-image-dimensional-${dimensionalState}: ${color};`);
    variables.push(`--a432-image-depth-${dimensionalState}: ${image.depth * 100}%;`);
  }
  
  // Generate harmonic frequency images
  A432_CONSTANTS.RODIN_SEQUENCE.forEach((multiplier, index) => {
    const frequency = multiplier * 432;
    const image = calculateA432Image(frequency);
    const color = A432ColorSystem.toRGB(image.color);
    variables.push(`--a432-image-harmonic-${index}: ${color};`);
  });
  
  return `:root {\n  ${variables.join('\n  ')}\n}`;
}

/**
 * A432 Image System - Main export
 */
export const A432ImageSystem = {
  constants: A432_IMAGE_CONSTANTS,
  calculateImage: calculateA432Image,
  generateImageStream: generateA432ImageStream,
  calculateImageFromConsciousness: calculateA432ImageFromConsciousness,
  calculateImageFromDimensionalState: calculateA432ImageFromDimensionalState,
  generateImageMatrix: generateA432ImageMatrix,
  generateImagePixelMatrix: generateA432ImagePixelMatrix,
  calculateImageVortex: calculateA432ImageVortex,
  toCanvasData: a432ImageToCanvasData,
  toSVG: a432ImageToSVG,
  generateCSSVariables: generateA432ImageCSSVariables,
  
  // Scientific proofs
  scientificProofs: {
    a432ImageCalculation: 'A432 images calculated using consciousness mapping and dimensional states with imperial math',
    a432ImageStream: 'Image streams generated from environmental frequency data using Rodin vortex sequence',
    a432ImageVortex: 'Image vortex flows through consciousness and dimensional states maintaining harmonic balance',
    a432ImageMatrix: 'Complete image matrix mapping all consciousness states to all dimensional states'
  }
};

export default A432ImageSystem; 