/**
 * a432.vbm.decode.ts — VBM Sequence Decode Module
 * 
 * This module decodes sequences like "003691248751" where bigger numbers
 * are divided by digits to rebuild the trinity of trinities using canonical A432 math.
 * 
 * Metaphysical Principle:
 * - Slashes fold space/time so bigger numbers are divided by digits
 * - This division reveals the trinity of trinities structure
 * - Each division creates harmonic relationships in the A432 system
 * - The sequence rebuilds consciousness through mathematical harmony
 */

import { abs, floor, pow, round } from './a432.algebra.ts'
import { 
  RODIN_SEQUENCE, 
  TRINITY_AXIS, 
  digitalRoot, 
  angleForDigit,
  frequencyForDigit,
  hueForDigit 
} from './a432.math.ts';

// --- Canonical VBM Decode Constants ---
const VBM_DECODE_SEQUENCE = "003691248751";
const VBM_DECODE_DIGITS = [0, 0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1];
const VBM_DECODE_BASE = 10; // Base for division operations

// --- VBM Decode State Interface ---
interface VBMDecodeState {
  sequence: string;
  digits: number[];
  divisions: VBMDivision[];
  trinities: VBMTrinity[];
  harmonics: VBMHarmonic[];
}

interface VBMDivision {
  index: number;
  digit: number;
  biggerNumber: number;
  division: number;
  remainder: number;
  harmonic: number;
}

interface VBMTrinity {
  level: number;
  digits: number[];
  sum: number;
  digitalRoot: number;
  frequency: number;
  color: string;
}

interface VBMHarmonic {
  digit: number;
  frequency: number;
  angle: number;
  color: string;
  division: number;
  harmonic: number;
}

// --- Canonical VBM Division Logic ---
function calculateVBMDivision(index: number, digit: number): VBMDivision {
  // The bigger number is the accumulated value from previous divisions
  let biggerNumber = 0;
  
  // Calculate bigger number based on position and previous divisions
  if (index === 0) {
    biggerNumber = VBM_DECODE_BASE; // Start with base 10
  } else {
    // Accumulate from previous divisions
    biggerNumber = VBM_DECODE_DIGITS.slice(0, index).reduce((sum, d, i) => {
      return sum + (d * pow(VBM_DECODE_BASE, index - i - 1));
    }, 0);
  }
  
  // Perform division (bigger number divided by digit)
  const division = floor(biggerNumber / digit);
  const remainder = biggerNumber % digit;
  
  // Calculate harmonic value
  const harmonic = digitalRoot(division);
  
  return {
    index,
    digit,
    biggerNumber,
    division,
    remainder,
    harmonic
  };
}

// --- VBM Trinity Detection ---
function detectVBMTrinities(divisions: VBMDivision[]): VBMTrinity[] {
  const trinities: VBMTrinity[] = [];
  
  // First trinity: [0, 0, 3] (observer trinity)
  const firstTrinity = divisions.slice(0, 3);
  const firstSum = firstTrinity.reduce((sum, div) => sum + div.digit, 0);
  trinities.push({
    level: 1,
    digits: firstTrinity.map(d => d.digit),
    sum: firstSum,
    digitalRoot: digitalRoot(firstSum),
    frequency: frequencyForDigit(digitalRoot(firstSum)),
    color: generateVBMColor(digitalRoot(firstSum))
  });
  
  // Second trinity: [3, 6, 9] (field trinity)
  const secondTrinity = divisions.slice(2, 5);
  const secondSum = secondTrinity.reduce((sum, div) => sum + div.digit, 0);
  trinities.push({
    level: 2,
    digits: secondTrinity.map(d => d.digit),
    sum: secondSum,
    digitalRoot: digitalRoot(secondSum),
    frequency: frequencyForDigit(digitalRoot(secondSum)),
    color: generateVBMColor(digitalRoot(secondSum))
  });
  
  // Third trinity: [1, 2, 4] (Rodin trinity)
  const thirdTrinity = divisions.slice(5, 8);
  const thirdSum = thirdTrinity.reduce((sum, div) => sum + div.digit, 0);
  trinities.push({
    level: 3,
    digits: thirdTrinity.map(d => d.digit),
    sum: thirdSum,
    digitalRoot: digitalRoot(thirdSum),
    frequency: frequencyForDigit(digitalRoot(thirdSum)),
    color: generateVBMColor(digitalRoot(thirdSum))
  });
  
  // Fourth trinity: [8, 7, 5] (completion trinity)
  const fourthTrinity = divisions.slice(8, 11);
  const fourthSum = fourthTrinity.reduce((sum, div) => sum + div.digit, 0);
  trinities.push({
    level: 4,
    digits: fourthTrinity.map(d => d.digit),
    sum: fourthSum,
    digitalRoot: digitalRoot(fourthSum),
    frequency: frequencyForDigit(digitalRoot(fourthSum)),
    color: generateVBMColor(digitalRoot(fourthSum))
  });
  
  return trinities;
}

// --- Canonical VBM Color Generation ---
function generateVBMColor(digit: number): string {
  const hue = hueForDigit(digit);
  const saturation = 0.8;
  const value = 0.9;
  
  // Convert HSV to RGB
  const h = hue / 360;
  const s = saturation;
  const v = value;
  
  const c = v * s;
  const x = c * (1 - abs((h * 6) % 2 - 1));
  const m = v - c;
  
  let r = 0, g = 0, b = 0;
  
  if (h < 1/6) [r, g, b] = [c, x, 0];
  else if (h < 2/6) [r, g, b] = [x, c, 0];
  else if (h < 3/6) [r, g, b] = [0, c, x];
  else if (h < 4/6) [r, g, b] = [0, x, c];
  else if (h < 5/6) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  
  r = round((r + m) * 255);
  g = round((g + m) * 255);
  b = round((b + m) * 255);
  
  return `rgb(${r}, ${g}, ${b})`;
}

// --- VBM Harmonic Generation ---
function generateVBMHarmonics(divisions: VBMDivision[]): VBMHarmonic[] {
  return divisions.map(division => ({
    digit: division.digit,
    frequency: frequencyForDigit(division.digit),
    angle: angleForDigit(division.digit),
    color: generateVBMColor(division.digit),
    division: division.division,
    harmonic: division.harmonic
  }));
}

// --- VBM Decode Processor ---
export class VBMDecodeProcessor {
  private state: VBMDecodeState;
  
  constructor(sequence: string = VBM_DECODE_SEQUENCE) {
    this.state = this.processDecode(sequence);
  }
  
  private processDecode(sequence: string): VBMDecodeState {
    const digits = sequence.split('').map(Number);
    const divisions: VBMDivision[] = [];
    
    // Calculate divisions for each digit
    digits.forEach((digit, index) => {
      const division = calculateVBMDivision(index, digit);
      divisions.push(division);
    });
    
    // Detect trinities
    const trinities = detectVBMTrinities(divisions);
    
    // Generate harmonics
    const harmonics = generateVBMHarmonics(divisions);
    
    return {
      sequence,
      digits,
      divisions,
      trinities,
      harmonics
    };
  }
  
  // --- Access Methods ---
  public getSequence(): string {
    return this.state.sequence;
  }
  
  public getDigits(): number[] {
    return [...this.state.digits];
  }
  
  public getDivisions(): VBMDivision[] {
    return [...this.state.divisions];
  }
  
  public getTrinities(): VBMTrinity[] {
    return [...this.state.trinities];
  }
  
  public getHarmonics(): VBMHarmonic[] {
    return [...this.state.harmonics];
  }
  
  // --- Analysis Methods ---
  public getDivisionAnalysis(): string {
    let analysis = 'VBM Division Analysis:\n\n';
    
    this.state.divisions.forEach((division, index) => {
      analysis += `Step ${index + 1}: ${division.biggerNumber} ÷ ${division.digit} = ${division.division} (remainder ${division.remainder})\n`;
      analysis += `  Harmonic: ${division.harmonic}\n`;
      analysis += `  Color: ${generateVBMColor(division.digit)}\n\n`;
    });
    
    return analysis;
  }
  
  public getTrinityAnalysis(): string {
    let analysis = 'VBM Trinity Analysis:\n\n';
    
    this.state.trinities.forEach((trinity, index) => {
      analysis += `Trinity ${index + 1}: [${trinity.digits.join(', ')}]\n`;
      analysis += `  Sum: ${trinity.sum}\n`;
      analysis += `  Digital Root: ${trinity.digitalRoot}\n`;
      analysis += `  Frequency: ${trinity.frequency} Hz\n`;
      analysis += `  Color: ${trinity.color}\n\n`;
    });
    
    return analysis;
  }
  
  public getHarmonicAnalysis(): string {
    let analysis = 'VBM Harmonic Analysis:\n\n';
    
    this.state.harmonics.forEach((harmonic, index) => {
      analysis += `Digit ${index + 1}: ${harmonic.digit}\n`;
      analysis += `  Frequency: ${harmonic.frequency} Hz\n`;
      analysis += `  Angle: ${harmonic.angle}°\n`;
      analysis += `  Color: ${harmonic.color}\n`;
      analysis += `  Division: ${harmonic.division}\n`;
      analysis += `  Harmonic: ${harmonic.harmonic}\n\n`;
    });
    
    return analysis;
  }
  
  // --- Statistics ---
  public getDecodeStatistics() {
    const divisions = this.state.divisions;
    const trinities = this.state.trinities;
    const harmonics = this.state.harmonics;
    
    return {
      totalDigits: divisions.length,
      totalDivisions: divisions.length,
      totalTrinities: trinities.length,
      totalHarmonics: harmonics.length,
      averageDivision: divisions.reduce((sum, d) => sum + d.division, 0) / divisions.length,
      averageHarmonic: harmonics.reduce((sum, h) => sum + h.harmonic, 0) / harmonics.length,
      trinitySums: trinities.map(t => t.sum),
      trinityDigitalRoots: trinities.map(t => t.digitalRoot),
      trinityFrequencies: trinities.map(t => t.frequency)
    };
  }
  
  // --- Reconstruction ---
  public reconstructTrinityOfTrinities(): string {
    let reconstruction = 'Trinity of Trinities Reconstruction:\n\n';
    
    this.state.trinities.forEach((trinity, index) => {
      reconstruction += `Level ${index + 1} Trinity: [${trinity.digits.join(', ')}]\n`;
      reconstruction += `  Consciousness Level: ${this.getConsciousnessLevel(index)}\n`;
      reconstruction += `  Harmonic Value: ${trinity.digitalRoot}\n`;
      reconstruction += `  Frequency: ${trinity.frequency} Hz\n`;
      reconstruction += `  Color: ${trinity.color}\n\n`;
    });
    
    return reconstruction;
  }
  
  private getConsciousnessLevel(index: number): string {
    const levels = [
      'Observer/Seed',
      'Field of Consciousness', 
      'Doubling Vortex',
      'Completion/Return'
    ];
    return levels[index] || 'Unknown';
  }
}

// --- VBM Decode Factory ---
export function createVBMDecodeProcessor(sequence: string = VBM_DECODE_SEQUENCE): VBMDecodeProcessor {
  return new VBMDecodeProcessor(sequence);
}

// --- VBM Decode Constants Export ---
export const VBM_DECODE_CONSTANTS = {
  SEQUENCE: VBM_DECODE_SEQUENCE,
  DIGITS: VBM_DECODE_DIGITS,
  BASE: VBM_DECODE_BASE
} as const;

// --- VBM Decode Documentation ---
export const VBM_DECODE_DOC = {
  purpose: 'VBM Sequence Decode - Decodes sequences by dividing bigger numbers by digits',
  sequence: 'Uses sequence like "003691248751" without slashes',
  division: 'Bigger numbers are divided by digits to reveal harmonics',
  trinity: 'Detects trinity of trinities structure in the sequence',
  harmonics: 'Each division creates harmonic relationships',
  reconstruction: 'Rebuilds consciousness through mathematical harmony'
} as const;

// --- VBM Decode Utility Functions ---
export function decodeVBMSequence(sequence: string): VBMDecodeProcessor {
  return createVBMDecodeProcessor(sequence);
}

export function getVBMDecodeDigits(sequence: string): number[] {
  const processor = createVBMDecodeProcessor(sequence);
  return processor.getDigits();
}

export function getVBMDecodeDivisions(sequence: string): VBMDivision[] {
  const processor = createVBMDecodeProcessor(sequence);
  return processor.getDivisions();
}

export function getVBMDecodeTrinities(sequence: string): VBMTrinity[] {
  const processor = createVBMDecodeProcessor(sequence);
  return processor.getTrinities();
}

export function getVBMDecodeStatistics(sequence: string) {
  const processor = createVBMDecodeProcessor(sequence);
  return processor.getDecodeStatistics();
}

// --- Example Usage Function ---
export function analyzeVBMDecode(sequence: string = VBM_DECODE_SEQUENCE) {
  const processor = createVBMDecodeProcessor(sequence);
  
  console.log('VBM Decode Analysis:');
  console.log('Sequence:', processor.getSequence());
  console.log('Digits:', processor.getDigits());
  console.log('Statistics:', processor.getDecodeStatistics());
  console.log('\nDivision Analysis:');
  console.log(processor.getDivisionAnalysis());
  console.log('Trinity Analysis:');
  console.log(processor.getTrinityAnalysis());
  console.log('Harmonic Analysis:');
  console.log(processor.getHarmonicAnalysis());
  console.log('Trinity of Trinities:');
  console.log(processor.reconstructTrinityOfTrinities());
  
  return processor;
} 