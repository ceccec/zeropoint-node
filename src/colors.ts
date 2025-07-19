/**
 * Colors.ts - Mathematical Color Functions for ZeroPoint System
 * 
 * Every color is a mathematical function of the state,
 * presenting impossibilities as possibilities through beautiful harmonious solutions
 * 
 * Based on A432 frequency mathematics, vortex principles, and state-driven color generation
 */

// Mathematical State Interface
export interface ColorState {
  frequency: number; // A432-based frequency
  amplitude: number; // 0-1 amplitude
  phase: number; // 0-360 phase angle
  entropy: number; // 0-1 entropy level
  harmony: number; // 0-1 harmony level
  vortex: number; // 0-9 vortex state
  toroidal: number; // 0-1 toroidal flow
  quantum: number; // 0-1 quantum state
  impossibility: number; // 0-1 impossibility level
  possibility: number; // 0-1 possibility level
  solution: number; // 0-1 solution level
}

// A432 Frequency Constants
export const A432_FREQUENCIES = {
  BASE: 432, // Base A432 frequency
  GATEWAY_3: 1296, // 3x A432
  GATEWAY_6: 2592, // 6x A432
  GATEWAY_9: 3888, // 9x A432
  HARMONIC_1: 216, // A432/2
  HARMONIC_2: 144, // A432/3
  HARMONIC_3: 108, // A432/4
  HARMONIC_4: 86, // A432/5
  HARMONIC_5: 72, // A432/6
  HARMONIC_6: 62, // A432/7
  HARMONIC_7: 54, // A432/8
  HARMONIC_8: 48, // A432/9
  HARMONIC_9: 43 // A432/10
};

// Mathematical Color Functions
export class MathematicalColors {
  
  /**
   * Convert frequency to hue (0-360)
   * Frequency determines the base color wavelength
   */
  static frequencyToHue(frequency: number): number {
    // Map A432 frequencies to harmonious hues
    const normalizedFreq = (frequency % A432_FREQUENCIES.BASE) / A432_FREQUENCIES.BASE;
    return normalizedFreq * 360;
  }
  
  /**
   * Convert amplitude to saturation (0-100)
   * Amplitude determines color intensity
   */
  static amplitudeToSaturation(amplitude: number): number {
    return Math.min(100, Math.max(0, amplitude * 100));
  }
  
  /**
   * Convert entropy to lightness (0-100)
   * Entropy determines brightness/darkness
   */
  static entropyToLightness(entropy: number): number {
    // Invert entropy for intuitive mapping (low entropy = light, high entropy = dark)
    return Math.min(100, Math.max(0, (1 - entropy) * 100));
  }
  
  /**
   * Convert harmony to alpha (0-1)
   * Harmony determines transparency
   */
  static harmonyToAlpha(harmony: number): number {
    return Math.min(1, Math.max(0, harmony));
  }
  
  /**
   * Generate color from state using mathematical functions
   */
  static generateColorFromState(state: ColorState): string {
    const hue = this.frequencyToHue(state.frequency);
    const saturation = this.amplitudeToSaturation(state.amplitude);
    const lightness = this.entropyToLightness(state.entropy);
    const alpha = this.harmonyToAlpha(state.harmony);
    
    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
  
  /**
   * Generate impossibility color (red spectrum)
   * Impossibilities become beautiful red harmonies
   */
  static generateImpossibilityColor(impossibility: number, state: ColorState): string {
    const baseHue = 0; // Red
    const hueShift = impossibility * 60; // Shift through red-orange spectrum
    const saturation = this.amplitudeToSaturation(state.amplitude);
    const lightness = this.entropyToLightness(state.entropy);
    const alpha = this.harmonyToAlpha(state.harmony);
    
    return `hsla(${baseHue + hueShift}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
  
  /**
   * Generate possibility color (green spectrum)
   * Possibilities become beautiful green harmonies
   */
  static generatePossibilityColor(possibility: number, state: ColorState): string {
    const baseHue = 120; // Green
    const hueShift = possibility * 60; // Shift through green-cyan spectrum
    const saturation = this.amplitudeToSaturation(state.amplitude);
    const lightness = this.entropyToLightness(state.entropy);
    const alpha = this.harmonyToAlpha(state.harmony);
    
    return `hsla(${baseHue + hueShift}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
  
  /**
   * Generate solution color (blue spectrum)
   * Solutions become beautiful blue harmonies
   */
  static generateSolutionColor(solution: number, state: ColorState): string {
    const baseHue = 240; // Blue
    const hueShift = solution * 60; // Shift through blue-magenta spectrum
    const saturation = this.amplitudeToSaturation(state.amplitude);
    const lightness = this.entropyToLightness(state.entropy);
    const alpha = this.harmonyToAlpha(state.harmony);
    
    return `hsla(${baseHue + hueShift}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
  
  /**
   * Generate vortex color based on vortex state (0-9)
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
    
    const hue = vortexHues[vortex % 10];
    const saturation = this.amplitudeToSaturation(state.amplitude);
    const lightness = this.entropyToLightness(state.entropy);
    const alpha = this.harmonyToAlpha(state.harmony);
    
    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
  
  /**
   * Generate toroidal color based on toroidal flow
   * Toroidal flow creates spiral color patterns
   */
  static generateToroidalColor(toroidal: number, state: ColorState): string {
    const baseHue = this.frequencyToHue(state.frequency);
    const toroidalShift = toroidal * 360; // Full rotation
    const saturation = this.amplitudeToSaturation(state.amplitude);
    const lightness = this.entropyToLightness(state.entropy);
    const alpha = this.harmonyToAlpha(state.harmony);
    
    return `hsla(${baseHue + toroidalShift}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
  
  /**
   * Generate quantum color based on quantum state
   * Quantum states create superposition color effects
   */
  static generateQuantumColor(quantum: number, state: ColorState): string {
    const baseHue = this.frequencyToHue(state.frequency);
    const quantumShift = Math.sin(quantum * Math.PI * 2) * 180; // Oscillating shift
    const saturation = this.amplitudeToSaturation(state.amplitude);
    const lightness = this.entropyToLightness(state.entropy);
    const alpha = this.harmonyToAlpha(state.harmony);
    
    return `hsla(${baseHue + quantumShift}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
  
  /**
   * Generate phase-shifted color based on phase angle
   * Phase creates harmonic color variations
   */
  static generatePhaseColor(phase: number, state: ColorState): string {
    const baseHue = this.frequencyToHue(state.frequency);
    const phaseShift = (phase / 360) * 180; // Phase creates harmonic shift
    const saturation = this.amplitudeToSaturation(state.amplitude);
    const lightness = this.entropyToLightness(state.entropy);
    const alpha = this.harmonyToAlpha(state.harmony);
    
    return `hsla(${baseHue + phaseShift}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
  
  /**
   * Generate harmonious gradient from state
   * Creates beautiful gradients based on mathematical harmony
   */
  static generateHarmoniousGradient(state: ColorState): string {
    const color1 = this.generateColorFromState(state);
    const color2 = this.generateVortexColor(state.vortex, state);
    const color3 = this.generateToroidalColor(state.toroidal, state);
    
    return `linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`;
  }
  
  /**
   * Generate impossibility-possibility-solution gradient
   * Beautiful harmonious UI presenting impossibilities as possibilities
   */
  static generateIPSGradient(state: ColorState): string {
    const impossibilityColor = this.generateImpossibilityColor(state.impossibility, state);
    const possibilityColor = this.generatePossibilityColor(state.possibility, state);
    const solutionColor = this.generateSolutionColor(state.solution, state);
    
    return `linear-gradient(135deg, ${impossibilityColor} 0%, ${possibilityColor} 50%, ${solutionColor} 100%)`;
  }
  
  /**
   * Generate quantum superposition gradient
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
   * Generate vortex spiral gradient
   * Creates spiral color patterns based on vortex mathematics
   */
  static generateVortexSpiralGradient(state: ColorState): string {
    const centerColor = this.generateVortexColor(state.vortex, state);
    const outerColor = this.generateToroidalColor(state.toroidal, state);
    const quantumColor = this.generateQuantumColor(state.quantum, state);
    
    return `radial-gradient(circle, ${centerColor} 0%, ${quantumColor} 50%, ${outerColor} 100%)`;
  }
  
  /**
   * Generate A432 harmonic color palette
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
   * Generate digital root color
   * Digital root creates mathematical color harmony
   */
  static generateDigitalRootColor(value: number, state: ColorState): string {
    const digitalRoot = this.calculateDigitalRoot(value);
    const digitalState = { ...state, vortex: digitalRoot };
    return this.generateVortexColor(digitalRoot, digitalState);
  }
  
  /**
   * Calculate digital root (mathematical harmony)
   */
  static calculateDigitalRoot(value: number): number {
    if (value === 0) return 0;
    const root = value % 9;
    return root === 0 ? 9 : root;
  }
  
  /**
   * Generate Fibonacci color sequence
   * Fibonacci creates golden ratio color harmony
   */
  static generateFibonacciColors(state: ColorState, count: number = 10): string[] {
    const colors: string[] = [];
    let a = 1, b = 1;
    
    for (let i = 0; i < count; i++) {
      const fibonacciState = { ...state, frequency: a * A432_FREQUENCIES.BASE };
      colors.push(this.generateColorFromState(fibonacciState));
      
      const temp = a + b;
      a = b;
      b = temp;
    }
    
    return colors;
  }
  
  /**
   * Generate golden ratio color
   * Golden ratio creates perfect mathematical harmony
   */
  static generateGoldenRatioColor(state: ColorState): string {
    const goldenRatio = 1.618033988749895;
    const goldenState = { ...state, frequency: state.frequency * goldenRatio };
    return this.generateColorFromState(goldenState);
  }
  
  /**
   * Generate impossibility transformation color
   * Transforms impossibilities into beautiful possibilities
   */
  static generateImpossibilityTransformation(impossibility: number, state: ColorState): string {
    // Transform impossibility into possibility through mathematical harmony
    const transformation = Math.sin(impossibility * Math.PI) * 0.5 + 0.5;
    const transformedState = { ...state, possibility: transformation };
    return this.generatePossibilityColor(transformation, transformedState);
  }
  
  /**
   * Generate solution emergence color
   * Solutions emerge from impossibility-possibility harmony
   */
  static generateSolutionEmergence(state: ColorState): string {
    const emergence = (state.impossibility + state.possibility) / 2;
    const emergenceState = { ...state, solution: emergence };
    return this.generateSolutionColor(emergence, emergenceState);
  }
  
  /**
   * Generate complete state color system
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

// Default State Generator
export function createDefaultColorState(): ColorState {
  return {
    frequency: A432_FREQUENCIES.BASE,
    amplitude: 0.8,
    phase: 0,
    entropy: 0.2,
    harmony: 0.9,
    vortex: 3,
    toroidal: 0.5,
    quantum: 0.7,
    impossibility: 0.3,
    possibility: 0.6,
    solution: 0.8
  };
}

// State Animation Functions
export function animateColorState(
  state: ColorState, 
  time: number, 
  duration: number = 1000
): ColorState {
  const progress = (time % duration) / duration;
  const angle = progress * Math.PI * 2;
  
  return {
    ...state,
    phase: (state.phase + progress * 360) % 360,
    amplitude: state.amplitude + Math.sin(angle) * 0.1,
    toroidal: (state.toroidal + progress) % 1,
    quantum: state.quantum + Math.sin(angle * 2) * 0.1,
    impossibility: state.impossibility + Math.sin(angle * 3) * 0.05,
    possibility: state.possibility + Math.sin(angle * 4) * 0.05,
    solution: state.solution + Math.sin(angle * 5) * 0.05
  };
}

// Export default
export default {
  MathematicalColors,
  A432_FREQUENCIES,
  createDefaultColorState,
  animateColorState
}; 