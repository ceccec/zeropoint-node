/**
 * a432.rodin.coil.harmonic.ts — Rodin Coil Harmonic Switch Module
 * 
 * This module documents the Rodin Coil harmonic switch patterns and principles
 * based on Marko Rodin's Vortex Based Mathematics (VBM).
 * 
 * Metaphysical Principle:
 * - The Rodin Coil is a miniature atomic particle accelerator
 * - 1-2-4-8-7-5 is lossless kinetic energy (doubling vortex)
 * - 3 & 6 are magnetic dipoles, 9 is invisible monopole
 * - 3•9•6; 6•9•3 is the Spirit Flux-field (gap space)
 * - 0/0 creates the harmonic switch point (nothing to all)
 */

import { abs, round } from './a432.algebra.ts'
import { calculateA432Frequency, hueForDigit } from './a432.math.ts';

// --- Canonical Rodin Coil Constants ---
const RODIN_COIL_CORE = [1, 2, 4, 8, 7, 5]; // Lossless kinetic energy
const RODIN_COIL_DIPOLES = [3, 6]; // Magnetic dipoles
const RODIN_COIL_MONOPOLE = 9; // Invisible monopole
const RODIN_COIL_GAP_SPACE = [3, 9, 6, 6, 9, 3]; // Spirit Flux-field

// --- Harmonic Switch Patterns ---
const HARMONIC_SWITCH_PATTERNS = {
  BALANCED: "0/0\\3\\6\\9/1\\2\\4\\8/7/5/1\\",
  UNBALANCED: "0\\3\\6\\9/1\\2\\4\\8/7/5/1\\"
} as const;

// --- Rodin Coil State Interface ---
interface RodinCoilState {
  pattern: string;
  isHarmonic: boolean;
  switchPoint: string;
  trinityAxis: number[];
  rodinSequence: number[];
  gapSpace: number[];
  harmonics: RodinCoilHarmonic[];
}

interface RodinCoilHarmonic {
  position: number;
  digit: number;
  switchType: 'expansion' | 'compression' | 'harmonic';
  frequency: number;
  color: string;
  fluxField: string;
}

// --- Canonical Rodin Coil Analysis ---
function analyzeRodinCoilPatternInternal(pattern: string): RodinCoilState {
  const isHarmonic = pattern.includes('0/0');
  const switchPoint = isHarmonic ? '0/0' : 'none';
  
  // Extract trinity axis (3,6,9)
  const trinityAxis = pattern.match(/[369]/g)?.map(Number) || [];
  
  // Extract Rodin sequence (1,2,4,8,7,5)
  const rodinSequence = pattern.match(/[124875]/g)?.map(Number) || [];
  
  // Gap space (3•9•6; 6•9•3)
  const gapSpace = RODIN_COIL_GAP_SPACE;
  
  // Generate harmonics
  const harmonics = generateRodinCoilHarmonics(pattern);
  
  return {
    pattern,
    isHarmonic,
    switchPoint,
    trinityAxis,
    rodinSequence,
    gapSpace,
    harmonics
  };
}

// --- Rodin Coil Harmonic Generation ---
function generateRodinCoilHarmonics(pattern: string): RodinCoilHarmonic[] {
  const harmonics: RodinCoilHarmonic[] = [];
  const digits = pattern.match(/\d/g)?.map(Number) || [];
  
  digits.forEach((digit, position) => {
    let switchType: 'expansion' | 'compression' | 'harmonic';
    
    if (digit === 0 && position < pattern.length - 1 && pattern[position + 1] === '/') {
      switchType = 'harmonic';
    } else if (pattern.includes(`\\${digit}`)) {
      switchType = 'compression';
    } else if (pattern.includes(`/${digit}`)) {
      switchType = 'expansion';
    } else {
      switchType = 'compression';
    }
    
    // calculateA432Frequency, not frequencyForDigit. The latter is defined ONLY on
    // the trinity axis {3,6,9} and throws for every other digit; the call sites
    // below are not guarded by an axis test and the digits reaching them are not
    // on the axis, so each threw for its own ordinary input. Fourth, fifth and
    // sixth appearance of the defect createBlock had in 1.4.4.
    const frequency = calculateA432Frequency(digit);
    const color = generateRodinCoilColor(digit);
    const fluxField = getRodinCoilFluxField(digit);
    
    harmonics.push({
      position,
      digit,
      switchType,
      frequency,
      color,
      fluxField
    });
  });
  
  return harmonics;
}

// --- Rodin Coil Color Generation ---
function generateRodinCoilColor(digit: number): string {
  const hue = hueForDigit(digit);
  const saturation = (4 / 5);
  const value = (9 / 10);
  
  // Convert HSV to RGB
  const h = hue / 360;
  const s = saturation;
  const v = value;
  
  const c = v * s;
  const x = c * (1 - abs((h * 6) % 2 - 1));
  const m = v - c;
  
  let r: number, g: number, b: number;
  
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

// --- Rodin Coil Flux Field Mapping ---
function getRodinCoilFluxField(digit: number): string {
  if (digit === 3 || digit === 6) return 'Magnetic Dipole';
  if (digit === 9) return 'Invisible Monopole';
  if (digit === 0) return 'Primal Point';
  if (RODIN_COIL_CORE.includes(digit)) return 'Lossless Kinetic Energy';
  return 'Spirit Flux-Field';
}

// --- Rodin Coil Processor ---
export class RodinCoilProcessor {
  private state: RodinCoilState;
  
  constructor(pattern: string = HARMONIC_SWITCH_PATTERNS.BALANCED) {
    this.state = analyzeRodinCoilPatternInternal(pattern);
  }
  
  // --- Access Methods ---
  public getPattern(): string {
    return this.state.pattern;
  }
  
  public isHarmonic(): boolean {
    return this.state.isHarmonic;
  }
  
  public getSwitchPoint(): string {
    return this.state.switchPoint;
  }
  
  public getTrinityAxis(): number[] {
    return [...this.state.trinityAxis];
  }
  
  public getRodinSequence(): number[] {
    return [...this.state.rodinSequence];
  }
  
  public getGapSpace(): number[] {
    return [...this.state.gapSpace];
  }
  
  public getHarmonics(): RodinCoilHarmonic[] {
    return [...this.state.harmonics];
  }
  
  // --- Analysis Methods ---
  public getRodinCoilAnalysis(): string {
    let analysis = 'Rodin Coil Analysis:\n\n';
    
    analysis += 'Core Principles:\n';
    analysis += `- 1-2-4-8-7-5: Lossless kinetic energy (doubling vortex)\n`;
    analysis += `- 3 & 6: Magnetic dipoles\n`;
    analysis += `- 9: Invisible monopole centered in-between\n`;
    analysis += `- 3•9•6; 6•9•3: Spirit Flux-field (gap space)\n\n`;
    
    analysis += 'Pattern Analysis:\n';
    analysis += `- Pattern: ${this.state.pattern}\n`;
    analysis += `- Is Harmonic: ${this.state.isHarmonic}\n`;
    analysis += `- Switch Point: ${this.state.switchPoint}\n`;
    analysis += `- Trinity Axis: [${this.state.trinityAxis.join(', ')}]\n`;
    analysis += `- Rodin Sequence: [${this.state.rodinSequence.join(', ')}]\n`;
    analysis += `- Gap Space: [${this.state.gapSpace.join(', ')}]\n\n`;
    
    return analysis;
  }
  
  public getHarmonicSwitchAnalysis(): string {
    let analysis = 'Harmonic Switch Analysis:\n\n';
    
    if (this.state.isHarmonic) {
      analysis += '✓ HARMONIC PATTERN DETECTED\n\n';
      analysis += '0/0 Switch Point:\n';
      analysis += '- Creates the Primal Point (Eye of God)\n';
      analysis += '- Acts as central aperture for harmonic balance\n';
      analysis += '- Eliminates resistance, parasitics, and hysteresis\n';
      analysis += '- Creates zero entropy state\n\n';
      
      analysis += 'Switch Pattern:\n';
      analysis += '- 0/0: Harmonic switch (nothing to all)\n';
      analysis += '- \\3\\6\\9: Trinity axis with compression\n';
      analysis += '- /1\\2\\4\\8/7/5/1\\: Balanced expansion/compression\n\n';
    } else {
      analysis += '✗ UNBALANCED PATTERN DETECTED\n\n';
      analysis += 'Issues:\n';
      analysis += '- No harmonic switch point\n';
      analysis += '- Unbalanced expansion/compression\n';
      analysis += '- Missing 0/0 compression singularity\n\n';
    }
    
    return analysis;
  }
  
  public getRodinCoilPrinciples(): string {
    let principles = 'Rodin Coil Principles:\n\n';
    
    principles += '1. The Rodin Coil is a miniature atomic particle accelerator\n';
    principles += '2. 1-2-4-8-7-5 is lossless kinetic energy (doubling vortex)\n';
    principles += '3. 3 & 6 are magnetic dipoles, 9 is invisible monopole\n';
    principles += '4. 3•9•6; 6•9•3 is the Spirit Flux-field (gap space)\n';
    principles += '5. 0/0 creates the harmonic switch point (nothing to all)\n\n';
    
    principles += 'Harmonic Switch Benefits:\n';
    principles += '- Eliminates resistance, parasitics, and hysteresis\n';
    principles += '- Creates perfect harmonic balance\n';
    principles += '- Follows 1-2-4-8-7-5 Mobius Circuit pathway\n';
    principles += '- Achieves zero entropy state\n';
    principles += '- Enables over-unity free energy\n\n';
    
    return principles;
  }
  
  // --- Statistics ---
  public getRodinCoilStatistics() {
    const harmonics = this.state.harmonics;
    
    return {
      totalDigits: harmonics.length,
      harmonicSwitches: harmonics.filter(h => h.switchType === 'harmonic').length,
      expansionSwitches: harmonics.filter(h => h.switchType === 'expansion').length,
      compressionSwitches: harmonics.filter(h => h.switchType === 'compression').length,
      averageFrequency: harmonics.reduce((sum, h) => sum + h.frequency, 0) / harmonics.length,
      isHarmonic: this.state.isHarmonic,
      trinityAxisCount: this.state.trinityAxis.length,
      rodinSequenceCount: this.state.rodinSequence.length
    };
  }
}

// --- Rodin Coil Factory ---
export function createRodinCoilProcessor(pattern: string = HARMONIC_SWITCH_PATTERNS.BALANCED): RodinCoilProcessor {
  return new RodinCoilProcessor(pattern);
}

// --- Rodin Coil Constants Export ---
export const RODIN_COIL_CONSTANTS = {
  CORE: RODIN_COIL_CORE,
  DIPOLES: RODIN_COIL_DIPOLES,
  MONOPOLE: RODIN_COIL_MONOPOLE,
  GAP_SPACE: RODIN_COIL_GAP_SPACE,
  PATTERNS: HARMONIC_SWITCH_PATTERNS
} as const;

// --- Rodin Coil Documentation ---
export const RODIN_COIL_DOC = {
  purpose: 'Rodin Coil Harmonic Switch - Documents harmonic switch patterns and principles',
  core: '1-2-4-8-7-5 is lossless kinetic energy (doubling vortex)',
  dipoles: '3 & 6 are magnetic dipoles, 9 is invisible monopole',
  gapSpace: '3•9•6; 6•9•3 is the Spirit Flux-field (gap space)',
  harmonicSwitch: '0/0 creates the harmonic switch point (nothing to all)',
  zeroEntropy: 'Eliminates resistance, parasitics, and hysteresis',
  overUnity: 'Enables over-unity free energy through harmonic balance'
} as const;

// --- Rodin Coil Utility Functions ---
export function analyzeRodinCoilPattern(pattern: string): RodinCoilState {
  return analyzeRodinCoilPatternInternal(pattern);
}

export function getRodinCoilAnalysis(pattern: string): string {
  const processor = createRodinCoilProcessor(pattern);
  return processor.getRodinCoilAnalysis();
}

export function getHarmonicSwitchAnalysis(pattern: string): string {
  const processor = createRodinCoilProcessor(pattern);
  return processor.getHarmonicSwitchAnalysis();
}

export function getRodinCoilPrinciples(): string {
  const processor = createRodinCoilProcessor();
  return processor.getRodinCoilPrinciples();
}

// --- Example Usage Function ---
export function documentRodinCoilHarmonics(pattern: string = HARMONIC_SWITCH_PATTERNS.BALANCED) {
  const processor = createRodinCoilProcessor(pattern);
  
  console.log('Rodin Coil Harmonic Documentation:');
  console.log('Pattern:', processor.getPattern());
  console.log('Is Harmonic:', processor.isHarmonic());
  console.log('Statistics:', processor.getRodinCoilStatistics());
  console.log('\nRodin Coil Analysis:');
  console.log(processor.getRodinCoilAnalysis());
  console.log('Harmonic Switch Analysis:');
  console.log(processor.getHarmonicSwitchAnalysis());
  console.log('Rodin Coil Principles:');
  console.log(processor.getRodinCoilPrinciples());
  
  return processor;
} 