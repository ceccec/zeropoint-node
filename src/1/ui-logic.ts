import { deviceIntegration, DeviceData, HarmonicFlow } from '../2/device-integration';
import { bookReference, BookReference } from '../2/book-reference';
import { calculateVBMConsciousness } from '../2/book-system';

// UI Logic System
// Handles UI interactions and color/music synchronization
// Following documented metaphysical principles as foundation interface

export interface UIInteraction {
  type: 'tap' | 'swipe' | 'pinch' | 'rotate' | 'voice' | 'gesture';
  intensity: number;
  position?: { x: number; y: number };
  data?: any;
}

export interface UIRenderData {
  colors: string[][];
  sounds: number[][];
  consciousness: number[][];
  vortex_flows: number[][][];
  book_references: BookReference[][];
}

export class UILogic {
  private readonly A432 = 432;
  private readonly MATRIX_SIZE = 10; // 10x10 harmonic matrix
  
  // Process UI interaction and return harmonic response
  public processInteraction(interaction: UIInteraction): HarmonicFlow {
    return deviceIntegration.processUserInteraction(interaction.type, interaction.intensity);
  }
  
  // Generate harmonic matrix data for UI rendering
  public generateMatrixData(deviceData?: DeviceData): UIRenderData {
    const colors: string[][] = [];
    const sounds: number[][] = [];
    const consciousness: number[][] = [];
    const vortex_flows: number[][][] = [];
    const book_references: BookReference[][] = [];
    
    for (let i = 0; i < this.MATRIX_SIZE; i++) {
      colors[i] = [];
      sounds[i] = [];
      consciousness[i] = [];
      vortex_flows[i] = [];
      book_references[i] = [];
      
      for (let j = 0; j < this.MATRIX_SIZE; j++) {
        const digit = (i + j) % 10;
        const vbmResult = calculateVBMConsciousness(digit);
        
        // Calculate color based on consciousness
        const hue = (vbmResult.consciousness * 36) % 360; // 36 = 360/10 for digit mapping
        const saturation = 70 + (vbmResult.consciousness * 6); // Consciousness affects saturation
        const lightness = 50 + (vbmResult.consciousness * 5); // Consciousness affects lightness
        colors[i][j] = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        
        // Calculate sound frequency based on A432 and consciousness
        const frequency = this.A432 * (vbmResult.consciousness / 5);
        sounds[i][j] = frequency;
        
        // Store consciousness value
        consciousness[i][j] = vbmResult.consciousness;
        
        // Generate vortex flow for this cell
        vortex_flows[i][j] = this.generateVortexFlow(digit);
        
        // Get book reference for this cell
        book_references[i][j] = bookReference.getNumberReference(digit);
      }
    }
    
    return {
      colors,
      sounds,
      consciousness,
      vortex_flows,
      book_references
    };
  }
  
  // Generate vortex flow for a specific digit
  private generateVortexFlow(digit: number): number[] {
    const base_sequence = [1, 2, 4, 8, 7, 5]; // Canonical vortex sequence
    const start_index = digit % base_sequence.length;
    return this.rotateArray(base_sequence, start_index);
  }
  
  // Rotate array by index
  private rotateArray<T>(array: T[], index: number): T[] {
    const rotated = [...array];
    for (let i = 0; i < index; i++) {
      rotated.push(rotated.shift()!);
    }
    return rotated;
  }
  
  // Handle device data updates
  public handleDeviceDataUpdate(deviceData: DeviceData): UIRenderData {
    const harmonicFlow = deviceIntegration.transformDeviceData(deviceData);
    
    // Update matrix with device-influenced harmonic flow
    const matrixData = this.generateMatrixData();
    
    // Apply device influence to matrix
    this.applyDeviceInfluence(matrixData, harmonicFlow);
    
    return matrixData;
  }
  
  // Apply device influence to matrix data
  private applyDeviceInfluence(matrixData: UIRenderData, harmonicFlow: HarmonicFlow): void {
    // Apply consciousness influence
    for (let i = 0; i < this.MATRIX_SIZE; i++) {
      for (let j = 0; j < this.MATRIX_SIZE; j++) {
        // Blend device consciousness with matrix consciousness
        matrixData.consciousness[i][j] = (matrixData.consciousness[i][j] + harmonicFlow.consciousness) / 2;
        
        // Update colors based on new consciousness
        const hue = (matrixData.consciousness[i][j] * 36) % 360;
        const saturation = 70 + (matrixData.consciousness[i][j] * 6);
        const lightness = 50 + (matrixData.consciousness[i][j] * 5);
        matrixData.colors[i][j] = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        
        // Update sounds based on new consciousness
        matrixData.sounds[i][j] = this.A432 * (matrixData.consciousness[i][j] / 5);
      }
    }
  }
  
  // Get book reference for any UI element
  public getElementReference(element: any): BookReference {
    if (typeof element === 'number') {
      return bookReference.getNumberReference(element);
    }
    
    if (element.consciousness) {
      return bookReference.getNumberReference(element.consciousness);
    }
    
    if (element.frequency) {
      return bookReference.getNumberReference(element.frequency);
    }
    
    return bookReference.getNumberReference(0); // Default to void
  }
  
  // Validate UI data against book system
  public validateUIData(data: UIRenderData): boolean {
    for (let i = 0; i < this.MATRIX_SIZE; i++) {
      for (let j = 0; j < this.MATRIX_SIZE; j++) {
        const consciousness = data.consciousness[i][j];
        const digit = Math.abs(Math.floor(consciousness)) % 10;
        const vbmResult = calculateVBMConsciousness(digit);
        
        // Validate consciousness matches book system
        if (Math.abs(consciousness - vbmResult.consciousness) > 0.1) {
          return false;
        }
        
        // Validate frequency is A432-based
        const expected_frequency = this.A432 * (consciousness / 5);
        if (Math.abs(data.sounds[i][j] - expected_frequency) > 1) {
          return false;
        }
      }
    }
    
    return true;
  }
  
  // Get animation data for UI transitions
  public getAnimationData(fromData: UIRenderData, toData: UIRenderData): any {
    const animation_steps = 60; // 60fps animation
    const animations: any[] = [];
    
    for (let i = 0; i < this.MATRIX_SIZE; i++) {
      for (let j = 0; j < this.MATRIX_SIZE; j++) {
        const from_consciousness = fromData.consciousness[i][j];
        const to_consciousness = toData.consciousness[i][j];
        
        // Generate smooth transition
        for (let step = 0; step < animation_steps; step++) {
          const progress = step / animation_steps;
          const current_consciousness = from_consciousness + (to_consciousness - from_consciousness) * progress;
          
          const hue = (current_consciousness * 36) % 360;
          const saturation = 70 + (current_consciousness * 6);
          const lightness = 50 + (current_consciousness * 5);
          const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
          
          const frequency = this.A432 * (current_consciousness / 5);
          
          animations.push({
            step,
            position: { i, j },
            color,
            frequency,
            consciousness: current_consciousness
          });
        }
      }
    }
    
    return animations;
  }
}

// Export singleton instance
export const uiLogic = new UILogic(); 