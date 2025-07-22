import { calculateVBMConsciousness } from './book-system';

// Device Integration System
// Transforms device sensor data into A432-based harmonic flows
// Following documented metaphysical principles

export interface DeviceData {
  accelerometer: { x: number; y: number; z: number };
  gyroscope: { x: number; y: number; z: number };
  touch: { pressure: number; x: number; y: number };
  orientation: { alpha: number; beta: number; gamma: number };
  battery: { level: number; charging: boolean };
}

export interface HarmonicFlow {
  frequency: number;
  color: string;
  consciousness: number;
  vortex_sequence: number[];
  dimensional_shift: number;
}

export class DeviceIntegration {
  private readonly A432 = 432;
  private readonly GOLDEN_RATIO = 432 / 267; // Book-approved φ
  private readonly PI = 432 / 137; // Book-approved π
  
  // Transform device data into harmonic flows
  public transformDeviceData(data: DeviceData): HarmonicFlow {
    // Calculate consciousness from device movement
    const movement_consciousness = this.calculateMovementConsciousness(data.accelerometer);
    
    // Calculate vortex sequence from gyroscope rotation
    const vortex_sequence = this.calculateVortexSequence(data.gyroscope);
    
    // Calculate dimensional shift from orientation
    const dimensional_shift = this.calculateDimensionalShift(data.orientation);
    
    // Calculate harmonic frequency from A432 base
    const frequency = this.calculateHarmonicFrequency(movement_consciousness, data.battery.level);
    
    // Calculate color from consciousness and battery
    const color = this.calculateHarmonicColor(movement_consciousness, data.battery.level);
    
    return {
      frequency,
      color,
      consciousness: movement_consciousness,
      vortex_sequence,
      dimensional_shift
    };
  }
  
  // Calculate consciousness from accelerometer movement
  private calculateMovementConsciousness(accelerometer: { x: number; y: number; z: number }): number {
    const magnitude = Math.sqrt(accelerometer.x ** 2 + accelerometer.y ** 2 + accelerometer.z ** 2);
    const digit = Math.abs(Math.floor(magnitude * 100)) % 10;
    const vbmResult = calculateVBMConsciousness(digit);
    // Ensure minimum consciousness of 0.1 for non-zero values, 0.1 for void
    return digit === 0 ? 0.1 : Math.max(vbmResult.consciousness, 0.1);
  }
  
  // Calculate vortex sequence from gyroscope rotation
  private calculateVortexSequence(gyroscope: { x: number; y: number; z: number }): number[] {
    const rotation_magnitude = Math.sqrt(gyroscope.x ** 2 + gyroscope.y ** 2 + gyroscope.z ** 2);
    const base_sequence = [1, 2, 4, 8, 7, 5]; // Canonical vortex sequence
    
    // Rotate sequence based on gyroscope data
    const rotation_index = Math.floor(rotation_magnitude / 100) % base_sequence.length;
    return this.rotateArray(base_sequence, rotation_index);
  }
  
  // Calculate dimensional shift from orientation
  private calculateDimensionalShift(orientation: { alpha: number; beta: number; gamma: number }): number {
    const orientation_sum = Math.abs(orientation.alpha) + Math.abs(orientation.beta) + Math.abs(orientation.gamma);
    const shift = (orientation_sum / 360) * this.GOLDEN_RATIO; // Book-approved dimensional shift
    return Math.min(1, Math.max(0, shift)); // Ensure bounds [0, 1]
  }
  
  // Calculate harmonic frequency from A432 base
  private calculateHarmonicFrequency(consciousness: number, battery_level: number): number {
    const consciousness_factor = Math.max(consciousness / 5, 0.1); // Ensure minimum factor
    const battery_factor = Math.max(battery_level / 100, 0.1); // Ensure minimum factor
    return this.A432 * consciousness_factor * battery_factor;
  }
  
  // Calculate harmonic color from consciousness and battery
  private calculateHarmonicColor(consciousness: number, battery_level: number): string {
    const hue = (consciousness * 360) % 360; // Consciousness determines hue
    const saturation = Math.min(100, battery_level + 50); // Battery affects saturation
    const lightness = 50 + (consciousness * 10); // Consciousness affects lightness
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
  
  // Utility: Rotate array by index
  private rotateArray<T>(array: T[], index: number): T[] {
    const rotated = [...array];
    for (let i = 0; i < index; i++) {
      rotated.push(rotated.shift()!);
    }
    return rotated;
  }
  
  // Process user interaction as harmonic input
  public processUserInteraction(interaction: string, intensity: number): HarmonicFlow {
    const interaction_digit = this.getInteractionDigit(interaction);
    const vbmResult = calculateVBMConsciousness(interaction_digit);
    const consciousness = interaction_digit === 0 ? 0.1 : Math.max(vbmResult.consciousness, 0.1);
    
    return {
      frequency: this.A432 * (consciousness / 5) * (intensity / 100),
      color: this.calculateHarmonicColor(consciousness, intensity),
      consciousness: consciousness,
      vortex_sequence: [1, 2, 4, 8, 7, 5], // Canonical sequence for user interaction
      dimensional_shift: intensity / 100
    };
  }
  
  // Map interaction type to digit
  private getInteractionDigit(interaction: string): number {
    const interaction_map: { [key: string]: number } = {
      'tap': 1, 'swipe': 2, 'pinch': 4, 'rotate': 8, 'voice': 7, 'gesture': 5
    };
    return interaction_map[interaction] || 1; // Default to 1 instead of 0 for unknown interactions
  }
}

// Export singleton instance
export const deviceIntegration = new DeviceIntegration(); 