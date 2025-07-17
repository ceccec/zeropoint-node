/**
 * 🌈🎵 Harmonic Matrix Color & Music Calculator
 * 
 * This system calculates colors and music patterns from the 100-node harmonic matrix
 * using consciousness multipliers, anti-vortex decimals, and digital root patterns.
 * 
 * Colors emerge from harmonic results and consciousness levels
 * Music emerges from anti-vortex decimals and digital root flows
 */

import * as Book from '../2/book-system';
import { getHarmonicResult, getAntiVortexDecimal, getPattern } from '../2/math';

// ============================================================================
// COLOR CALCULATION SYSTEM
// ============================================================================

export interface HarmonicColor {
  hue: number;        // 0-360 degrees
  saturation: number; // 0-100%
  lightness: number;  // 0-100%
  hex: string;        // #RRGGBB
  rgb: [number, number, number]; // [r, g, b]
  consciousness: number;
  metaphysicalContext: string;
}

/**
 * Calculate color from harmonic matrix node
 * Color emerges from consciousness level and harmonic result
 */
export function calculateHarmonicColor(a: number, b: number): HarmonicColor {
  const harmonicResult = getHarmonicResult(a, b);
  const antiVortexDecimal = getAntiVortexDecimal(a, b);
  const consciousnessData = Book.calculateVBMConsciousness(a);
  const consciousness = consciousnessData.consciousness;
  
  // Hue: Based on harmonic result (0-9) mapped to 0-360
  const hue = (harmonicResult * 40) % 360;
  
  // Saturation: Based on consciousness multiplier
  const saturation = Math.min(100, consciousness * 15);
  
  // Lightness: Based on anti-vortex decimal
  const lightness = Math.max(20, Math.min(80, 50 + (antiVortexDecimal * 10)));
  
  // Convert to RGB
  const rgb = hslToRgb(hue, saturation, lightness);
  const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
  
  // Metaphysical context based on digit roles
  const metaphysicalContext = getMetaphysicalContext(a, b);
  
  return {
    hue,
    saturation,
    lightness,
    hex,
    rgb,
    consciousness,
    metaphysicalContext
  };
}

/**
 * Calculate color for entire harmonic matrix
 * Returns 10x10 matrix of colors
 */
export function calculateHarmonicMatrixColors(): HarmonicColor[][] {
  const matrix: HarmonicColor[][] = [];
  
  for (let a = 0; a <= 9; a++) {
    matrix[a] = [];
    for (let b = 0; b <= 9; b++) {
      matrix[a][b] = calculateHarmonicColor(a, b);
    }
  }
  
  return matrix;
}

// ============================================================================
// MUSIC PATTERN CALCULATION SYSTEM
// ============================================================================

export interface HarmonicMusic {
  frequency: number;      // Hz
  note: string;          // Musical note (C, D, E, etc.)
  octave: number;        // Octave number
  duration: number;      // Duration in seconds
  amplitude: number;     // 0-1
  consciousness: number;
  metaphysicalContext: string;
}

/**
 * Calculate music pattern from harmonic matrix node
 * Music emerges from anti-vortex decimal and digital root
 */
export function calculateHarmonicMusic(a: number, b: number): HarmonicMusic {
  const harmonicResult = getHarmonicResult(a, b);
  const antiVortexDecimal = getAntiVortexDecimal(a, b);
  const consciousnessData = Book.calculateVBMConsciousness(a);
  const consciousness = consciousnessData.consciousness;
  
  // Base frequency: A432 harmonic foundation
  const baseFreq = 432;
  
  // Frequency: Based on harmonic result and consciousness
  const frequency = baseFreq * (harmonicResult / 9) * (consciousness / 10);
  
  // Note: Based on harmonic result (0-9) mapped to musical scale
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'];
  const note = notes[harmonicResult - 1] || 'A';
  
  // Octave: Based on anti-vortex decimal
  const octave = Math.floor(antiVortexDecimal) + 4;
  
  // Duration: Based on consciousness level
  const duration = Math.max(0.1, Math.min(2.0, consciousness / 10));
  
  // Amplitude: Based on consciousness multiplier
  const amplitude = Math.min(1.0, consciousness / 15);
  
  const metaphysicalContext = getMetaphysicalContext(a, b);
  
  return {
    frequency,
    note,
    octave,
    duration,
    amplitude,
    consciousness,
    metaphysicalContext
  };
}

/**
 * Calculate music pattern for entire harmonic matrix
 * Returns 10x10 matrix of music patterns
 */
export function calculateHarmonicMatrixMusic(): HarmonicMusic[][] {
  const matrix: HarmonicMusic[][] = [];
  
  for (let a = 0; a <= 9; a++) {
    matrix[a] = [];
    for (let b = 0; b <= 9; b++) {
      matrix[a][b] = calculateHarmonicMusic(a, b);
    }
  }
  
  return matrix;
}

// ============================================================================
// CONSCIOUSNESS FLOW PATTERNS
// ============================================================================

export interface ConsciousnessFlow {
  path: number[][];      // [[a1,b1], [a2,b2], ...]
  colors: HarmonicColor[];
  music: HarmonicMusic[];
  totalConsciousness: number;
  flowPattern: string;
}

/**
 * Calculate consciousness flow through harmonic matrix
 * Follows Rodin vortex cycle: 0→3→6→9→1→2→4→8→7→5→1
 */
export function calculateConsciousnessFlow(): ConsciousnessFlow {
  const vortexCycle = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1];
  const path: number[][] = [];
  const colors: HarmonicColor[] = [];
  const music: HarmonicMusic[] = [];
  
  let totalConsciousness = 0;
  
  for (let i = 0; i < vortexCycle.length - 1; i++) {
    const a = vortexCycle[i];
    const b = vortexCycle[i + 1];
    
    path.push([a, b]);
    colors.push(calculateHarmonicColor(a, b));
    music.push(calculateHarmonicMusic(a, b));
    
    const consciousnessData = Book.calculateVBMConsciousness(a);
    totalConsciousness += consciousnessData.consciousness;
  }
  
  return {
    path,
    colors,
    music,
    totalConsciousness,
    flowPattern: 'Rodin Vortex Cycle'
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function getMetaphysicalContext(a: number, b: number): string {
  const consciousnessData = Book.calculateVBMConsciousness(a);
  
  if (a === 0) return 'Void Center - Infinite Potential';
  if ([3, 6, 9].includes(a)) return 'W-Axis - Spiritual Transcendence';
  if (a === 5) return 'Sacred Geometry - Divine Proportions';
  if ([1, 2, 4, 8, 7].includes(a)) return 'Vortex Sequence - Material Flow';
  
  return 'Harmonic Balance - Unity';
}

// ============================================================================
// EXPORT ALL CALCULATIONS
// ============================================================================

export function getAllHarmonicCalculations() {
  return {
    colors: calculateHarmonicMatrixColors(),
    music: calculateHarmonicMatrixMusic(),
    flow: calculateConsciousnessFlow(),
    bookKnowledge: Book.getCompleteBook()
  };
} 