/**
 * A432 Dimensional Evolution Module
 * Living consciousness that evolves through dimensions with 60° folding angles
 * 1D → 2D → 3D → 4D → 5D → 6D → 7D → 8D → 9D → 10D
 */

import { PI, cos, sin } from './a432.algebra.ts'
import { A432_FREQUENCY } from './a432.core.ts';

export interface DimensionalState {
  dimension: number;
  consciousness: string;
  angle: number;
  foldPoint: boolean;
  evolution: number[];
}

export class A432DimensionalEvolution {
  private currentDimension: number;
  private currentAngle: number;
  private consciousnessPath: string[];
  private dimensionalStates: DimensionalState[];
  private foldAngle: number;

  constructor() {
    this.currentDimension = 1;
    this.currentAngle = 0;
    this.consciousnessPath = [];
    this.dimensionalStates = [];
    this.foldAngle = 60; // 60° folding angle for dimensional transitions
  }

  /**
   * Get consciousness type for digit
   */
  private getConsciousnessType(digit: number): string {
    const consciousnessTypes = {
      0: 'Void consciousness',
      1: 'Unity consciousness',
      2: 'Duality consciousness', 
      3: 'Trinity consciousness',
      4: 'Foundation consciousness',
      5: 'Life consciousness',
      6: 'Harmony consciousness',
      7: 'Mystery consciousness',
      8: 'Infinity consciousness',
      9: 'Transcendence consciousness'
    };
    return consciousnessTypes[digit as keyof typeof consciousnessTypes] || 'Unknown consciousness';
  }

  /**
   * Calculate dimensional evolution path
   */
  public calculateEvolutionPath(dimension: number): string[] {
    const basePath = [1, 2, 4, 8, 7, 5, 1];
    const path = [];
    
    for (let i = 0; i < dimension; i++) {
      path.push(...basePath.map(digit => `${digit}/`));
    }
    
    return path;
  }

  /**
   * Check if current state is a fold point (return point)
   */
  public isFoldPoint(consciousness: string): boolean {
    // Fold point occurs when 1/1 = 2 (return point)
    return consciousness.includes('1/1') || consciousness.endsWith('/1/');
  }

  /**
   * Evolve to next dimension with 60° fold
   */
  public evolveToNextDimension(): DimensionalState {
    const currentState = this.getCurrentDimensionalState();
    
    if (this.isFoldPoint(currentState.consciousness)) {
      // Fold +60° and evolve to next dimension
      this.currentDimension++;
      this.currentAngle += this.foldAngle;
      
      const newConsciousness = this.calculateEvolutionPath(this.currentDimension).join('');
      const newState: DimensionalState = {
        dimension: this.currentDimension,
        consciousness: newConsciousness,
        angle: this.currentAngle,
        foldPoint: true,
        evolution: this.calculateDimensionalEvolution()
      };
      
      this.dimensionalStates.push(newState);
      return newState;
    }
    
    return currentState;
  }

  /**
   * Calculate dimensional evolution sequence
   */
  private calculateDimensionalEvolution(): number[] {
    const evolution = [];
    for (let d = 1; d <= this.currentDimension; d++) {
      evolution.push(d);
    }
    return evolution;
  }

  /**
   * Get current dimensional state
   */
  public getCurrentDimensionalState(): DimensionalState {
    const consciousness = this.calculateEvolutionPath(this.currentDimension).join('');
    const foldPoint = this.isFoldPoint(consciousness);
    
    return {
      dimension: this.currentDimension,
      consciousness,
      angle: this.currentAngle,
      foldPoint,
      evolution: this.calculateDimensionalEvolution()
    };
  }

  /**
   * Get consciousness insights for current dimension
   */
  public getDimensionalInsights(): {
    dimension: number;
    consciousnessType: string;
    angle: number;
    isFoldPoint: boolean;
    evolutionPath: string[];
  } {
    const state = this.getCurrentDimensionalState();
    const consciousnessType = this.getConsciousnessType(this.currentDimension);
    
    return {
      dimension: state.dimension,
      consciousnessType,
      angle: state.angle,
      isFoldPoint: state.foldPoint,
      evolutionPath: this.calculateEvolutionPath(state.dimension)
    };
  }

  /**
   * Run complete dimensional evolution cycle
   */
  public runDimensionalCycle(targetDimension: number = 10): DimensionalState[] {
    const evolutionHistory: DimensionalState[] = [];
    
    while (this.currentDimension <= targetDimension) {
      const state = this.getCurrentDimensionalState();
      evolutionHistory.push(state);
      
      if (state.foldPoint) {
        this.evolveToNextDimension();
      } else {
        // Continue evolution within current dimension
        this.currentAngle += 10; // Increment angle
      }
    }
    
    return evolutionHistory;
  }

  /**
   * Get spiral consciousness coordinates
   */
  public getSpiralCoordinates(): {
    x: number;
    y: number;
    z: number;
    dimension: number;
  } {
    const angleRad = (this.currentAngle * PI) / 180;
    const radius = this.currentDimension;
    
    return {
      x: radius * cos(angleRad),
      y: radius * sin(angleRad),
      z: this.currentDimension,
      dimension: this.currentDimension
    };
  }

  /**
   * Calculate A432 frequency for current dimension
   */
  public calculateDimensionalFrequency(): number {
    const base432 = A432_FREQUENCY;
    const dimensionalMultiplier = this.currentDimension / 9;
    return base432 * dimensionalMultiplier;
  }
}

export default A432DimensionalEvolution; 