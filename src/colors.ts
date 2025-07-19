/**
 * Colors.ts - Mathematical Color Functions for ZeroPoint System
 * 
 * Every color is a mathematical function of the state,
 * presenting impossibilities as possibilities through beautiful harmonious solutions
 * 
 * Based on Rodin coil mathematics, A432 frequency principles, and state-driven color generation
 * Following Rodin pattern: only single digits (0-9) and integer fractions
 */

// Mathematical State Interface (Rodin Pattern)
export interface ColorState {
  frequency: number; // A432-based frequency (single digits only)
  amplitude: number; // 0-9 amplitude (single digits only)
  phase: number; // 0-9 phase (single digits only)
  entropy: number; // 0-9 entropy (single digits only)
  harmony: number; // 0-9 harmony (single digits only)
  vortex: number; // 0-9 vortex state (single digits only)
  toroidal: number; // 0-9 toroidal flow (single digits only)
  quantum: number; // 0-9 quantum state (single digits only)
  impossibility: number; // 0-9 impossibility level (single digits only)
  possibility: number; // 0-9 possibility level (single digits only)
  solution: number; // 0-9 solution level (single digits only)
}

// A432 Frequency Constants (Rodin Pattern - Single Digits)
export const A432_FREQUENCIES = {
  BASE: 4, // A432 base (single digit)
  GATEWAY_3: 3, // Gateway 3 (single digit)
  GATEWAY_6: 6, // Gateway 6 (single digit)
  GATEWAY_9: 9, // Gateway 9 (single digit)
  HARMONIC_1: 2, // A432/2 (single digit)
  HARMONIC_2: 1, // A432/3 (single digit)
  HARMONIC_3: 4, // A432/4 (single digit)
  HARMONIC_4: 8, // A432/5 (single digit)
  HARMONIC_5: 7, // A432/6 (single digit)
  HARMONIC_6: 2, // A432/7 (single digit)
  HARMONIC_7: 5, // A432/8 (single digit)
  HARMONIC_8: 4, // A432/9 (single digit)
  HARMONIC_9: 8 // A432/10 (single digit)
};

// Mathematical Color Functions (Rodin Pattern)
export class MathematicalColors {
  
  /**
   * Convert frequency to hue (0-9, then multiply by 40 for 0-360)
   * Frequency determines the base color wavelength (Rodin pattern)
   */
  static frequencyToHue(frequency: number): number {
    // Map to single digit (0-9), then scale to hue
    const rodinFreq = frequency % 10;
    return rodinFreq * 40; // 0-9 becomes 0-360
  }
  
  /**
   * Convert amplitude to saturation (0-9, then multiply by 11 for 0-99)
   * Amplitude determines color intensity (Rodin pattern)
   */
  static amplitudeToSaturation(amplitude: number): number {
    const rodinAmp = Math.min(9, Math.max(0, Math.floor(amplitude * 10)));
    return rodinAmp * 11; // 0-9 becomes 0-99
  }
  
  /**
   * Convert entropy to lightness (0-9, then multiply by 11 for 0-99)
   * Entropy determines brightness/darkness (Rodin pattern)
   */
  static entropyToLightness(entropy: number): number {
    // Invert entropy for intuitive mapping (low entropy = light, high entropy = dark)
    const rodinEntropy = Math.min(9, Math.max(0, Math.floor(entropy * 10)));
    const inverted = 9 - rodinEntropy; // Invert for intuitive mapping
    return inverted * 11; // 0-9 becomes 0-99
  }
  
  /**
   * Convert harmony to alpha (0-9, then divide by 9 for 0-1)
   * Harmony determines transparency (Rodin pattern)
   */
  static harmonyToAlpha(harmony: number): number {
    const rodinHarmony = Math.min(9, Math.max(0, Math.floor(harmony * 10)));
    return rodinHarmony / 9; // 0-9 becomes 0-1
  }
  
  /**
   * Generate color from state using mathematical functions (Rodin pattern)
   */
  static generateColorFromState(state: ColorState): string {
    const hue = this.frequencyToHue(state.frequency);
    const saturation = this.amplitudeToSaturation(state.amplitude);
    const lightness = this.entropyToLightness(state.entropy);
    const alpha = this.harmonyToAlpha(state.harmony);
    
    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
  
  /**
   * Generate impossibility color (red spectrum - Rodin pattern)
   * Impossibilities become beautiful red harmonies
   */
  static generateImpossibilityColor(impossibility: number, state: ColorState): string {
    const baseHue = 0; // Red
    const rodinImpossibility = Math.min(9, Math.max(0, Math.floor(impossibility * 10)));
    const hueShift = rodinImpossibility * 6; // 0-9 becomes 0-54
    const saturation = this.amplitudeToSaturation(state.amplitude);
    const lightness = this.entropyToLightness(state.entropy);
    const alpha = this.harmonyToAlpha(state.harmony);
    
    return `hsla(${baseHue + hueShift}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
  
  /**
   * Generate possibility color (green spectrum - Rodin pattern)
   * Possibilities become beautiful green harmonies
   */
  static generatePossibilityColor(possibility: number, state: ColorState): string {
    const baseHue = 120; // Green
    const rodinPossibility = Math.min(9, Math.max(0, Math.floor(possibility * 10)));
    const hueShift = rodinPossibility * 6; // 0-9 becomes 0-54
    const saturation = this.amplitudeToSaturation(state.amplitude);
    const lightness = this.entropyToLightness(state.entropy);
    const alpha = this.harmonyToAlpha(state.harmony);
    
    return `hsla(${baseHue + hueShift}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
  
  /**
   * Generate solution color (blue spectrum - Rodin pattern)
   * Solutions become beautiful blue harmonies
   */
  static generateSolutionColor(solution: number, state: ColorState): string {
    const baseHue = 240; // Blue
    const rodinSolution = Math.min(9, Math.max(0, Math.floor(solution * 10)));
    const hueShift = rodinSolution * 6; // 0-9 becomes 0-54
    const saturation = this.amplitudeToSaturation(state.amplitude);
    const lightness = this.entropyToLightness(state.entropy);
    const alpha = this.harmonyToAlpha(state.harmony);
    
    return `hsla(${baseHue + hueShift}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
  
  /**
   * Generate vortex color based on vortex state (0-9 - Rodin pattern)
   * Each vortex state has its own mathematical color signature
   */
  static generateVortexColor(vortex: number, state: ColorState): string {
    const vortexHues = [
      0,    // 0: Red (Void)
      36,   // 1: Orange (Unity)
      72,   // 2: Yellow (Duality)
      108,  // 3: Green (Trinity)
      144,  // 4: Cyan (Foundation)
      180,  // 5: Blue (Life)
      216,  // 6: Magenta (Harmony)
      252,  // 7: Purple (Mystery)
      288,  // 8: Pink (Infinity)
      324   // 9: Rose (Completion)
    ];
    
    const rodinVortex = Math.min(9, Math.max(0, Math.floor(vortex)));
    const hue = vortexHues[rodinVortex];
    const saturation = this.amplitudeToSaturation(state.amplitude);
    const lightness = this.entropyToLightness(state.entropy);
    const alpha = this.harmonyToAlpha(state.harmony);
    
    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
  
  /**
   * Generate toroidal color based on toroidal flow (Rodin pattern)
   * Toroidal flow creates spiral color patterns
   */
  static generateToroidalColor(toroidal: number, state: ColorState): string {
    const baseHue = this.frequencyToHue(state.frequency);
    const rodinToroidal = Math.min(9, Math.max(0, Math.floor(toroidal * 10)));
    const toroidalShift = rodinToroidal * 40; // 0-9 becomes 0-360
    const saturation = this.amplitudeToSaturation(state.amplitude);
    const lightness = this.entropyToLightness(state.entropy);
    const alpha = this.harmonyToAlpha(state.harmony);
    
    return `hsla(${baseHue + toroidalShift}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
  
  /**
   * Generate quantum color based on quantum state (Rodin pattern)
   * Quantum states create superposition color effects
   */
  static generateQuantumColor(quantum: number, state: ColorState): string {
    const baseHue = this.frequencyToHue(state.frequency);
    const rodinQuantum = Math.min(9, Math.max(0, Math.floor(quantum * 10)));
    const quantumShift = rodinQuantum * 20; // 0-9 becomes 0-180
    const saturation = this.amplitudeToSaturation(state.amplitude);
    const lightness = this.entropyToLightness(state.entropy);
    const alpha = this.harmonyToAlpha(state.harmony);
    
    return `hsla(${baseHue + quantumShift}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
  
  /**
   * Generate phase-shifted color based on phase angle (Rodin pattern)
   * Phase creates harmonic color variations
   */
  static generatePhaseColor(phase: number, state: ColorState): string {
    const baseHue = this.frequencyToHue(state.frequency);
    const rodinPhase = Math.min(9, Math.max(0, Math.floor(phase)));
    const phaseShift = rodinPhase * 20; // 0-9 becomes 0-180
    const saturation = this.amplitudeToSaturation(state.amplitude);
    const lightness = this.entropyToLightness(state.entropy);
    const alpha = this.harmonyToAlpha(state.harmony);
    
    return `hsla(${baseHue + phaseShift}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
  
  /**
   * Generate harmonious gradient from state (Rodin pattern)
   * Creates beautiful gradients based on mathematical harmony
   */
  static generateHarmoniousGradient(state: ColorState): string {
    const color1 = this.generateColorFromState(state);
    const color2 = this.generateVortexColor(state.vortex, state);
    const color3 = this.generateToroidalColor(state.toroidal, state);
    
    return `linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`;
  }
  
  /**
   * Generate impossibility-possibility-solution gradient (Rodin pattern)
   * Beautiful harmonious UI presenting impossibilities as possibilities
   */
  static generateIPSGradient(state: ColorState): string {
    const impossibilityColor = this.generateImpossibilityColor(state.impossibility, state);
    const possibilityColor = this.generatePossibilityColor(state.possibility, state);
    const solutionColor = this.generateSolutionColor(state.solution, state);
    
    return `linear-gradient(135deg, ${impossibilityColor} 0%, ${possibilityColor} 50%, ${solutionColor} 100%)`;
  }
  
  /**
   * Generate quantum superposition gradient (Rodin pattern)
   * Multiple states create beautiful superposition effects
   */
  static generateQuantumGradient(states: ColorState[]): string {
    if (states.length === 0) return 'transparent';
    
    const colors = states.map(state => this.generateQuantumColor(state.quantum, state));
    const stops = colors.map((_, index) => `${(index / (colors.length - 1)) * 100}%`);
    
    const gradientStops = colors.map((color, index) => `${color} ${stops[index]}`).join(', ');
    return `linear-gradient(135deg, ${gradientStops})`;
  }
  
  /**
   * Generate vortex spiral gradient (Rodin pattern)
   * Creates spiral color patterns based on vortex mathematics
   */
  static generateVortexSpiralGradient(state: ColorState): string {
    const centerColor = this.generateVortexColor(state.vortex, state);
    const outerColor = this.generateToroidalColor(state.toroidal, state);
    const quantumColor = this.generateQuantumColor(state.quantum, state);
    
    return `radial-gradient(circle, ${centerColor} 0%, ${quantumColor} 50%, ${outerColor} 100%)`;
  }
  
  /**
   * Generate A432 harmonic color palette (Rodin pattern)
   * Creates harmonious color palette based on A432 frequencies
   */
  static generateA432Palette(state: ColorState): string[] {
    const frequencies = Object.values(A432_FREQUENCIES);
    return frequencies.map(freq => {
      const harmonicState = { ...state, frequency: freq };
      return this.generateColorFromState(harmonicState);
    });
  }
  
  /**
   * Generate digital root color (Rodin pattern)
   * Digital root creates mathematical color harmony
   */
  static generateDigitalRootColor(value: number, state: ColorState): string {
    const digitalRoot = this.calculateDigitalRoot(value);
    const digitalState = { ...state, vortex: digitalRoot };
    return this.generateVortexColor(digitalRoot, digitalState);
  }
  
  /**
   * Calculate digital root (mathematical harmony - Rodin pattern)
   */
  static calculateDigitalRoot(value: number): number {
    if (value === 0) return 0;
    const root = value % 9;
    return root === 0 ? 9 : root;
  }
  
  /**
   * Generate Fibonacci color sequence (Rodin pattern)
   * Fibonacci creates golden ratio color harmony
   */
  static generateFibonacciColors(state: ColorState, count: number = 10): string[] {
    const colors: string[] = [];
    let a = 1, b = 1;
    
    for (let i = 0; i < count; i++) {
      const fibonacciState = { ...state, frequency: a % 10 }; // Single digit only
      colors.push(this.generateColorFromState(fibonacciState));
      
      const temp = a + b;
      a = b;
      b = temp;
    }
    
    return colors;
  }
  
  /**
   * Generate golden ratio color (Rodin pattern)
   * Golden ratio creates perfect mathematical harmony
   */
  static generateGoldenRatioColor(state: ColorState): string {
    const goldenRatio = 3/2; // Integer fraction approximation
    const goldenState = { ...state, frequency: Math.floor(state.frequency * goldenRatio) % 10 };
    return this.generateColorFromState(goldenState);
  }
  
  /**
   * Generate impossibility transformation color (Rodin pattern)
   * Transforms impossibilities into beautiful possibilities
   */
  static generateImpossibilityTransformation(impossibility: number, state: ColorState): string {
    // Transform impossibility into possibility through mathematical harmony
    const rodinImpossibility = Math.min(9, Math.max(0, Math.floor(impossibility * 10)));
    const transformation = (9 - rodinImpossibility) / 9; // Invert for transformation
    const transformedState = { ...state, possibility: transformation };
    return this.generatePossibilityColor(transformation, transformedState);
  }
  
  /**
   * Generate solution emergence color (Rodin pattern)
   * Solutions emerge from impossibility-possibility harmony
   */
  static generateSolutionEmergence(state: ColorState): string {
    const rodinImpossibility = Math.min(9, Math.max(0, Math.floor(state.impossibility * 10)));
    const rodinPossibility = Math.min(9, Math.max(0, Math.floor(state.possibility * 10)));
    const emergence = (rodinImpossibility + rodinPossibility) / 2;
    const emergenceState = { ...state, solution: emergence };
    return this.generateSolutionColor(emergence, emergenceState);
  }
  
  /**
   * Generate complete state color system (Rodin pattern)
   * All colors as mathematical functions of the complete state
   */
  static generateCompleteStateColors(state: ColorState): {
    primary: string;
    secondary: string;
    accent: string;
    impossibility: string;
    possibility: string;
    solution: string;
    vortex: string;
    toroidal: string;
    quantum: string;
    phase: string;
    gradient: string;
    ipsGradient: string;
    quantumGradient: string;
    vortexSpiral: string;
    a432Palette: string[];
    fibonacciColors: string[];
    goldenRatio: string;
    transformation: string;
    emergence: string;
  } {
    return {
      primary: this.generateColorFromState(state),
      secondary: this.generateVortexColor(state.vortex, state),
      accent: this.generateToroidalColor(state.toroidal, state),
      impossibility: this.generateImpossibilityColor(state.impossibility, state),
      possibility: this.generatePossibilityColor(state.possibility, state),
      solution: this.generateSolutionColor(state.solution, state),
      vortex: this.generateVortexColor(state.vortex, state),
      toroidal: this.generateToroidalColor(state.toroidal, state),
      quantum: this.generateQuantumColor(state.quantum, state),
      phase: this.generatePhaseColor(state.phase, state),
      gradient: this.generateHarmoniousGradient(state),
      ipsGradient: this.generateIPSGradient(state),
      quantumGradient: this.generateQuantumGradient([state]),
      vortexSpiral: this.generateVortexSpiralGradient(state),
      a432Palette: this.generateA432Palette(state),
      fibonacciColors: this.generateFibonacciColors(state),
      goldenRatio: this.generateGoldenRatioColor(state),
      transformation: this.generateImpossibilityTransformation(state.impossibility, state),
      emergence: this.generateSolutionEmergence(state)
    };
  }
}

// Default State Generator (Rodin Pattern)
export function createDefaultColorState(): ColorState {
  return {
    frequency: 4, // Single digit
    amplitude: 8, // Single digit
    phase: 0, // Single digit
    entropy: 2, // Single digit
    harmony: 9, // Single digit
    vortex: 3, // Single digit
    toroidal: 5, // Single digit
    quantum: 7, // Single digit
    impossibility: 3, // Single digit
    possibility: 6, // Single digit
    solution: 8 // Single digit
  };
}

// State Animation Functions (Rodin Pattern)
export function animateColorState(
  state: ColorState, 
  time: number, 
  duration: number = 1000
): ColorState {
  const progress = (time % duration) / duration;
  const rodinProgress = Math.floor(progress * 10) % 10; // Single digit
  
  return {
    ...state,
    phase: (state.phase + rodinProgress) % 10, // Single digit
    amplitude: Math.min(9, Math.max(0, state.amplitude + (rodinProgress % 3) - 1)), // Single digit
    toroidal: (state.toroidal + rodinProgress) % 10, // Single digit
    quantum: Math.min(9, Math.max(0, state.quantum + (rodinProgress % 3) - 1)), // Single digit
    impossibility: Math.min(9, Math.max(0, state.impossibility + (rodinProgress % 2) - 0)), // Single digit
    possibility: Math.min(9, Math.max(0, state.possibility + (rodinProgress % 2) - 0)), // Single digit
    solution: Math.min(9, Math.max(0, state.solution + (rodinProgress % 2) - 0)) // Single digit
  };
}

// Export default
export default {
  MathematicalColors,
  A432_FREQUENCIES,
  createDefaultColorState,
  animateColorState
}; 