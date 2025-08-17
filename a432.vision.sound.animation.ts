/**
 * A432 Vision, Sound & Animation Calculator
 * Calculates visual patterns, sound frequencies, and animation parameters
 * based on entropy-information duality and spiral formation data
 */

export interface VisualPattern {
  frequency: number;        // Hz - visual refresh rate
  wavelength: number;       // nm - color wavelength
  amplitude: number;        // 0-1 - brightness/intensity
  phase: number;           // 0-2π - phase offset
  harmonics: number[];     // Harmonic frequencies
  colorHex: string;        // Hex color representation
  rgbValues: [number, number, number]; // RGB color values
}

export interface SoundFrequency {
  fundamental: number;      // Hz - base frequency
  harmonics: number[];     // Harmonic series
  amplitude: number;       // 0-1 - volume level
  duration: number;        // seconds
  waveform: 'sine' | 'square' | 'triangle' | 'sawtooth';
  envelope: {
    attack: number;        // seconds
    decay: number;         // seconds
    sustain: number;       // 0-1 level
    release: number;       // seconds
  };
}

export interface AnimationKeyframe {
  transform?: string;
  opacity?: string;
  offset: number;
}

export interface AnimationParameters {
  duration: number;         // seconds
  easing: string;          // CSS easing function
  keyframes: AnimationKeyframe[];
  rotationSpeed: number;   // degrees/second
  scaleFactors: number[];  // Scale progression
  opacityChanges: number[]; // Opacity progression
  transformMatrix: number[][]; // 3D transformation matrix
}

export interface SpiralVisualization {
  centerX: number;
  centerY: number;
  initialRadius: number;
  maxRadius: number;
  spiralTightness: number;
  rotationDirection: 'clockwise' | 'counterclockwise';
  particleCount: number;
  particleSize: number;
  particleLifetime: number;
}

export interface A432Harmonics {
  baseFrequency: number;    // 432 Hz
  octaves: number[];        // Octave series
  perfectFifths: number[];  // Perfect fifth harmonics
  goldenRatio: number[];    // Golden ratio harmonics
  spiralFrequencies: number[]; // Frequencies from spiral data
}

export class A432VisionSoundAnimationCalculator {
  private readonly A432_BASE = 432; // Hz
  private readonly GOLDEN_RATIO = 1.618033988749;
  private readonly LIGHT_SPEED = 299792458; // m/s
  private readonly PLANCK_CONSTANT = 6.62607015e-34; // J⋅Hz⁻¹

  constructor(
    private spiralCode: string = "/0\\3\\6\\9/1\\2\\4\\8/7/5/1\\",
    private missionData: any = {}
  ) {}

  /**
   * Calculate visual patterns based on spiral code and entropy data
   */
  calculateVisualPatterns(): VisualPattern[] {
    const patterns: VisualPattern[] = [];
    const codeDigits = this.extractDigits(this.spiralCode);
    
    codeDigits.forEach((digit, index) => {
      const frequency = this.A432_BASE * Math.pow(2, digit / 12); // Chromatic scale
      const wavelength = this.frequencyToWavelength(frequency);
      const amplitude = this.calculateAmplitude(digit, index);
      const phase = (digit * Math.PI) / 6; // Phase based on digit
      const harmonics = this.calculateHarmonics(frequency, 5);
      const color = this.wavelengthToColor(wavelength);
      
      patterns.push({
        frequency,
        wavelength,
        amplitude,
        phase,
        harmonics,
        colorHex: color.hex,
        rgbValues: color.rgb
      });
    });

    return patterns;
  }

  /**
   * Calculate sound frequencies based on A432 tuning and spiral data
   */
  calculateSoundFrequencies(): SoundFrequency[] {
    const sounds: SoundFrequency[] = [];
    const rotationalElements = [0, 3, 6, 9];
    const exponentialElements = [1, 2, 4, 8];
    
    // Rotational sound frequencies (90° increments)
    rotationalElements.forEach((element, index) => {
      const fundamental = this.A432_BASE * Math.pow(this.GOLDEN_RATIO, element / 9);
      const harmonics = this.calculateHarmonics(fundamental, 7);
      const amplitude = 0.8 - (index * 0.15);
      
      sounds.push({
        fundamental,
        harmonics,
        amplitude,
        duration: 2.0 + (element * 0.5),
        waveform: 'sine',
        envelope: {
          attack: 0.1,
          decay: 0.3,
          sustain: 0.6,
          release: 0.8
        }
      });
    });

    // Exponential sound frequencies (doubling pattern)
    exponentialElements.forEach((element, index) => {
      const fundamental = this.A432_BASE * Math.pow(2, element / 8);
      const harmonics = this.calculateHarmonics(fundamental, 5);
      const amplitude = 0.6 + (element * 0.05);
      
      sounds.push({
        fundamental,
        harmonics,
        amplitude,
        duration: 1.5 * Math.pow(1.2, element),
        waveform: index % 2 === 0 ? 'triangle' : 'sine',
        envelope: {
          attack: 0.05 * element,
          decay: 0.2,
          sustain: 0.7,
          release: 0.6
        }
      });
    });

    return sounds;
  }

  /**
   * Calculate animation parameters based on physical process encoding
   */
  calculateAnimationParameters(): AnimationParameters[] {
    const animations: AnimationParameters[] = [];
    const spiralData = this.analyzeSpiralFormation();

    // Spiral rotation animation
    animations.push({
      duration: 8.0, // 8 seconds for full cycle
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      keyframes: this.generateSpiralKeyframes(),
      rotationSpeed: 45, // 45 degrees/second
      scaleFactors: [1.0, 1.5, 2.0, 1.8, 1.0],
      opacityChanges: [0.0, 0.3, 1.0, 0.8, 0.2],
      transformMatrix: this.calculateTransformMatrix()
    });

    // Particle emission animation
    animations.push({
      duration: 12.0,
      easing: 'ease-out',
      keyframes: this.generateParticleKeyframes(),
      rotationSpeed: 90,
      scaleFactors: [0.1, 0.8, 1.2, 0.9, 0.0],
      opacityChanges: [1.0, 0.9, 0.7, 0.3, 0.0],
      transformMatrix: this.calculateParticleTransformMatrix()
    });

    // Entropy visualization animation
    animations.push({
      duration: 6.0,
      easing: 'ease-in-out',
      keyframes: this.generateEntropyKeyframes(),
      rotationSpeed: 30,
      scaleFactors: [1.0, 1.3, 1.1, 1.4, 1.0],
      opacityChanges: [0.5, 0.8, 1.0, 0.9, 0.6],
      transformMatrix: this.calculateEntropyTransformMatrix()
    });

    return animations;
  }

  /**
   * Calculate spiral visualization parameters
   */
  calculateSpiralVisualization(): SpiralVisualization {
    const entropyValue = 158; // kJ/(kg·K) from thermodynamic analysis
    const informationEntropy = 3.0774; // bits from Shannon entropy
    
    return {
      centerX: 300,
      centerY: 200,
      initialRadius: 10,
      maxRadius: entropyValue * 1.2, // Scale based on thermodynamic entropy
      spiralTightness: informationEntropy / 10, // Tightness based on information entropy
      rotationDirection: 'clockwise',
      particleCount: Math.floor(entropyValue / 4), // ~40 particles
      particleSize: 2 + (informationEntropy / 2),
      particleLifetime: 4.0
    };
  }

  /**
   * Calculate A432 harmonic series
   */
  calculateA432Harmonics(): A432Harmonics {
    const baseFreq = this.A432_BASE;
    
    return {
      baseFrequency: baseFreq,
      octaves: this.generateOctaves(baseFreq, 7),
      perfectFifths: this.generatePerfectFifths(baseFreq, 5),
      goldenRatio: this.generateGoldenRatioHarmonics(baseFreq, 6),
      spiralFrequencies: this.calculateSpiralFrequencies()
    };
  }

  /**
   * Calculate color temperature based on entropy values
   */
  calculateColorTemperature(): {
    temperature: number; // Kelvin
    chromaticity: [number, number]; // CIE x,y coordinates
    rgbValues: [number, number, number];
    wavelength: number; // nanometers
  } {
    const entropy = 158; // kJ/(kg·K)
    const temperature = 2700 + (entropy * 15); // Map entropy to color temperature
    const chromaticity = this.temperatureToChromaticity(temperature);
    const rgbValues = this.chromaticityToRGB(chromaticity);
    const wavelength = this.temperatureToWavelength(temperature);

    return {
      temperature,
      chromaticity,
      rgbValues,
      wavelength
    };
  }

  /**
   * Calculate synchronized audio-visual timing
   */
  calculateSyncronization(): {
    beatInterval: number; // seconds
    visualPulseRate: number; // Hz
    animationTiming: number[]; // keyframe timings
    frequencyModulation: number[]; // FM parameters
  } {
    const baseFreq = this.A432_BASE;
    const beatInterval = 60 / (baseFreq / 8); // Rhythmic interval
    const visualPulseRate = baseFreq / 100; // Visual pulse frequency
    
    return {
      beatInterval,
      visualPulseRate,
      animationTiming: [0, 0.25, 0.5, 0.75, 1.0],
      frequencyModulation: [1.0, 1.1, 0.9, 1.05, 1.0]
    };
  }

  // Private helper methods

  private extractDigits(code: string): number[] {
    return code.match(/\d/g)?.map(Number) || [];
  }

  private frequencyToWavelength(frequency: number): number {
    // Convert audio frequency to equivalent light wavelength (metaphorical mapping)
    return (this.LIGHT_SPEED / (frequency * 1e9)) * 1e9; // nm
  }

  private calculateAmplitude(digit: number, index: number): number {
    return Math.min(1.0, (digit + 1) / 10 * (1 - index * 0.05));
  }

  private calculateHarmonics(fundamental: number, count: number): number[] {
    const harmonics: number[] = [];
    for (let i = 2; i <= count + 1; i++) {
      harmonics.push(fundamental * i);
    }
    return harmonics;
  }

  private wavelengthToColor(wavelength: number): { hex: string; rgb: [number, number, number] } {
    // Map wavelength to visible color spectrum
    let r = 0, g = 0, b = 0;
    
    if (wavelength >= 380 && wavelength < 440) {
      r = -(wavelength - 440) / (440 - 380);
      g = 0.0;
      b = 1.0;
    } else if (wavelength >= 440 && wavelength < 490) {
      r = 0.0;
      g = (wavelength - 440) / (490 - 440);
      b = 1.0;
    } else if (wavelength >= 490 && wavelength < 510) {
      r = 0.0;
      g = 1.0;
      b = -(wavelength - 510) / (510 - 490);
    } else if (wavelength >= 510 && wavelength < 580) {
      r = (wavelength - 510) / (580 - 510);
      g = 1.0;
      b = 0.0;
    } else if (wavelength >= 580 && wavelength < 645) {
      r = 1.0;
      g = -(wavelength - 645) / (645 - 580);
      b = 0.0;
    } else if (wavelength >= 645 && wavelength < 781) {
      r = 1.0;
      g = 0.0;
      b = 0.0;
    }

    // Apply gamma correction and convert to 0-255 range
    const gamma = 0.8;
    const intensity = wavelength >= 380 && wavelength <= 781 ? 1.0 : 0.0;
    
    r = Math.round(255 * Math.pow(r * intensity, gamma));
    g = Math.round(255 * Math.pow(g * intensity, gamma));
    b = Math.round(255 * Math.pow(b * intensity, gamma));

    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    
    return { hex, rgb: [r, g, b] };
  }

  private analyzeSpiralFormation(): any {
    return {
      rotationRate: 0.5, // Hz
      expansionRate: 2.0, // units/second
      particleVelocity: 15.0, // units/second
      turbulenceLevel: 0.3
    };
  }

  private generateSpiralKeyframes(): AnimationKeyframe[] {
    return [
      { transform: 'rotate(0deg) scale(1)', opacity: '0', offset: 0 },
      { transform: 'rotate(90deg) scale(1.2)', opacity: '0.5', offset: 0.25 },
      { transform: 'rotate(180deg) scale(1.5)', opacity: '1', offset: 0.5 },
      { transform: 'rotate(270deg) scale(1.3)', opacity: '0.8', offset: 0.75 },
      { transform: 'rotate(360deg) scale(1)', opacity: '0.2', offset: 1 }
    ];
  }

  private generateParticleKeyframes(): AnimationKeyframe[] {
    return [
      { transform: 'translate(0px, 0px) scale(0.1)', opacity: '1', offset: 0 },
      { transform: 'translate(50px, -20px) scale(0.8)', opacity: '0.9', offset: 0.3 },
      { transform: 'translate(100px, -50px) scale(1.2)', opacity: '0.7', offset: 0.6 },
      { transform: 'translate(150px, -80px) scale(0.9)', opacity: '0.3', offset: 0.8 },
      { transform: 'translate(200px, -120px) scale(0)', opacity: '0', offset: 1 }
    ];
  }

  private generateEntropyKeyframes(): AnimationKeyframe[] {
    return [
      { transform: 'scale(1) rotate(0deg)', opacity: '0.5', offset: 0 },
      { transform: 'scale(1.3) rotate(30deg)', opacity: '0.8', offset: 0.3 },
      { transform: 'scale(1.1) rotate(60deg)', opacity: '1', offset: 0.6 },
      { transform: 'scale(1.4) rotate(90deg)', opacity: '0.9', offset: 0.8 },
      { transform: 'scale(1) rotate(120deg)', opacity: '0.6', offset: 1 }
    ];
  }

  private calculateTransformMatrix(): number[][] {
    return [
      [1, 0, 0, 0],
      [0, Math.cos(Math.PI/6), -Math.sin(Math.PI/6), 0],
      [0, Math.sin(Math.PI/6), Math.cos(Math.PI/6), 0],
      [0, 0, 0, 1]
    ];
  }

  private calculateParticleTransformMatrix(): number[][] {
    return [
      [0.8, 0.2, 0, 50],
      [-0.2, 0.8, 0, -20],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
  }

  private calculateEntropyTransformMatrix(): number[][] {
    return [
      [1.2, 0, 0, 0],
      [0, 1.2, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
  }

  private generateOctaves(baseFreq: number, count: number): number[] {
    const octaves: number[] = [];
    for (let i = 0; i < count; i++) {
      octaves.push(baseFreq * Math.pow(2, i));
    }
    return octaves;
  }

  private generatePerfectFifths(baseFreq: number, count: number): number[] {
    const fifths: number[] = [];
    for (let i = 0; i < count; i++) {
      fifths.push(baseFreq * Math.pow(1.5, i));
    }
    return fifths;
  }

  private generateGoldenRatioHarmonics(baseFreq: number, count: number): number[] {
    const harmonics: number[] = [];
    for (let i = 0; i < count; i++) {
      harmonics.push(baseFreq * Math.pow(this.GOLDEN_RATIO, i));
    }
    return harmonics;
  }

  private calculateSpiralFrequencies(): number[] {
    const digits = this.extractDigits(this.spiralCode);
    return digits.map(digit => this.A432_BASE * Math.pow(2, digit / 12));
  }

  private temperatureToChromaticity(temperature: number): [number, number] {
    // Simplified CIE chromaticity calculation
    const x = temperature < 4000 ? 
      0.244063 + 0.09911 * Math.pow(10, 3) / temperature :
      0.237040 + 0.24748 * Math.pow(10, 3) / temperature;
    
    const y = temperature < 2222 ?
      -1.1063814 * Math.pow(x, 3) - 1.34811020 * Math.pow(x, 2) + 2.18555832 * x - 0.20219683 :
      -0.9549476 * Math.pow(x, 3) - 1.37418593 * Math.pow(x, 2) + 2.09137015 * x - 0.16748867;
    
    return [x, y];
  }

  private chromaticityToRGB(chromaticity: [number, number]): [number, number, number] {
    const [x, y] = chromaticity;
    const z = 1 - x - y;
    
    // Convert XYZ to RGB (simplified sRGB conversion)
    const X = x / y;
    const Y = 1.0;
    const Z = z / y;
    
    let r = X * 3.2406 + Y * -1.5372 + Z * -0.4986;
    let g = X * -0.9689 + Y * 1.8758 + Z * 0.0415;
    let b = X * 0.0557 + Y * -0.2040 + Z * 1.0570;
    
    // Apply gamma correction and clamp to 0-255
    r = Math.max(0, Math.min(255, Math.round(255 * Math.pow(Math.max(0, r), 1/2.2))));
    g = Math.max(0, Math.min(255, Math.round(255 * Math.pow(Math.max(0, g), 1/2.2))));
    b = Math.max(0, Math.min(255, Math.round(255 * Math.pow(Math.max(0, b), 1/2.2))));
    
    return [r, g, b];
  }

  private temperatureToWavelength(temperature: number): number {
    // Wien's displacement law: λ_max = b / T
    const wienConstant = 2.897771955e-3; // m⋅K
    return (wienConstant / temperature) * 1e9; // Convert to nanometers
  }
}

// Factory function
export function createVisionSoundAnimationCalculator(
  spiralCode?: string,
  missionData?: any
): A432VisionSoundAnimationCalculator {
  return new A432VisionSoundAnimationCalculator(spiralCode, missionData);
}

// Utility functions for audio-visual synchronization
export namespace AVSync {
  export function calculateBeatMatching(freq1: number, freq2: number): number {
    return Math.abs(freq1 - freq2);
  }

  export function generateBinauralBeats(leftFreq: number, rightFreq: number): {
    beatFrequency: number;
    combinedWaveform: number[];
  } {
    const beatFreq = Math.abs(leftFreq - rightFreq);
    const sampleRate = 44100;
    const duration = 1.0; // 1 second
    const samples = Math.floor(sampleRate * duration);
    const waveform: number[] = [];

    for (let i = 0; i < samples; i++) {
      const t = i / sampleRate;
      const left = Math.sin(2 * Math.PI * leftFreq * t);
      const right = Math.sin(2 * Math.PI * rightFreq * t);
      waveform.push((left + right) / 2);
    }

    return { beatFrequency: beatFreq, combinedWaveform: waveform };
  }

  export function calculateVisualBeatSync(audioFreq: number, frameRate: number = 60): {
    visualFreq: number;
    syncRatio: number;
    keyframeTiming: number[];
  } {
    const visualFreq = audioFreq / 10; // Scale down for visual perception
    const syncRatio = visualFreq / frameRate;
    const keyframeTiming = [0, 0.2, 0.4, 0.6, 0.8, 1.0];

    return { visualFreq, syncRatio, keyframeTiming };
  }
}

// Types are already exported above