import { MetaphysicalArtifact } from '../artifacts/MetaphysicalArtifact';
import { MetaphysicalLawRegistry } from '../laws/MetaphysicalLawRegistry';

/**
 * Base class for resonance devices
 * Devices that amplify, harmonize, or transform metaphysical energies
 */
export abstract class ResonanceDevice extends MetaphysicalArtifact {
  public resonanceFrequency: number;
  public amplificationFactor: number;
  public harmonicMultipliers: number[];
  public targetFrequencies: number[];
  
  constructor(name: string, description: string, type: string) {
    super(name, description, type);
    this.resonanceFrequency = 0;
    this.amplificationFactor = 1;
    this.harmonicMultipliers = [1, 2, 3, 5, 8]; // Golden ratio harmonics
    this.targetFrequencies = [];
  }
  
  /**
   * Tune the device to a specific frequency
   */
  public tuneTo(frequency: number): void {
    this.resonanceFrequency = frequency;
    this.targetFrequencies = this.harmonicMultipliers.map(mult => frequency * mult);
    this.amplificationFactor = this.calculateAmplificationFactor();
  }
  
  /**
   * Calculate amplification factor based on resonance alignment
   */
  protected calculateAmplificationFactor(): number {
    const baseAmplification = 1.5;
    return baseAmplification;
  }
  
  /**
   * Amplify a target's vibrational frequency
   */
  public amplify(target: any): number {
    const targetFrequency = (target as any).vibrationalFrequency || 1;
    const resonance = this.calculateResonance(targetFrequency);
    return targetFrequency * this.amplificationFactor * resonance;
  }
  
  /**
   * Calculate resonance between device and target frequency
   */
  public calculateResonance(targetFrequency: number): number {
    const frequencyDiff = Math.abs(this.resonanceFrequency - targetFrequency);
    const maxDiff = Math.max(this.resonanceFrequency, targetFrequency);
    return Math.max(0, 1 - (frequencyDiff / maxDiff));
  }
  
  /**
   * Harmonize multiple frequencies
   */
  public harmonize(frequencies: number[]): number {
    if (frequencies.length === 0) return 0;
    
    const harmonicMean = frequencies.reduce((sum, freq) => sum + (1 / freq), 0);
    const harmonizedFrequency = frequencies.length / harmonicMean;
    
    return this.amplify({ vibrationalFrequency: harmonizedFrequency });
  }
  
  /**
   * Create a resonance field around the device
   */
  public createResonanceField(radius: number): any {
    return {
      center: this,
      radius,
      frequency: this.resonanceFrequency,
      amplification: this.amplificationFactor,
      harmonics: this.targetFrequencies,
      fieldStrength: this.calculateFieldStrength(radius)
    };
  }
  
  /**
   * Calculate field strength at a given radius
   */
  protected calculateFieldStrength(radius: number): number {
    const baseStrength = this.powerLevel * this.consciousnessResonance;
    return baseStrength / (1 + radius * 0.1); // Inverse square law approximation
  }
  
  /**
   * Get device resonance signature
   */
  public getResonanceSignature(): any {
    return {
      ...this.getMetaphysicalSignature(),
      resonanceFrequency: this.resonanceFrequency,
      amplificationFactor: this.amplificationFactor,
      harmonicMultipliers: this.harmonicMultipliers,
      targetFrequencies: this.targetFrequencies
    };
  }
} 