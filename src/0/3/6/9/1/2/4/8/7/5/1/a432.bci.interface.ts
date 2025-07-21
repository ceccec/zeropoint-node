/**
 * A432 BCI (Brain-Computer Interface) Implementation
 * 
 * Processes brain wave data to provide real-time consciousness feedback.
 * Maps brain wave frequencies to consciousness states using A432 mathematical foundation.
 * Provides color-coded feedback, consciousness guidance, and harmonic balance monitoring.
 */

import { A432ColorSystem } from './a432.color';
import { A432_CONSTANTS } from './a432.constants';

// ============================================================================
// A432 BCI INTERFACES
// ============================================================================

export interface A432BrainWaveData {
  alpha: number;    // 8-13 Hz - Relaxed focus
  beta: number;     // 13-30 Hz - Active thinking
  theta: number;    // 4-8 Hz - Deep meditation
  delta: number;    // 0.5-4 Hz - Deep sleep
  gamma: number;    // 30-100 Hz - Peak consciousness
  timestamp: number;
  source: string;
}

export interface A432BCIFeedback {
  dominantWave: string;
  consciousnessLevel: number;
  consciousnessColor: string;
  dimensionalState: number;
  dimensionalColor: string;
  harmonicBalance: number;
  guidance: string;
  brainState: string;
  mathematicalProof: string;
}

export interface A432BCIState {
  brainWaveHistory: A432BrainWaveData[];
  consciousnessHistory: A432BCIFeedback[];
  currentConsciousness: number;
  targetConsciousness: number;
  dominantWave: string;
  brainState: string;
  harmonicBalance: number;
  isInHarmony: boolean;
  mathematicalProof: string;
}

// ============================================================================
// A432 BCI IMPLEMENTATION
// ============================================================================

export class A432BCIInterface {
  private state: A432BCIState;
  private updateCallbacks: ((state: A432BCIState) => void)[] = [];

  constructor() {
    this.state = this.createInitialState();
  }

  private createInitialState(): A432BCIState {
    return {
      brainWaveHistory: [],
      consciousnessHistory: [],
      currentConsciousness: 4, // Perfect balance
      targetConsciousness: 4,  // Perfect balance
      dominantWave: 'alpha',
      brainState: 'Relaxed Focus',
      harmonicBalance: 1.0,    // Perfect harmony
      isInHarmony: true,
      mathematicalProof: 'A432 BCI: Initialized with perfect balance'
    };
  }

  /**
   * Process brain wave data
   */
  public processBrainWaveData(data: A432BrainWaveData): A432BCIFeedback {
    // Determine dominant brain wave
    const dominantWave = this.calculateDominantWave(data);
    
    // Calculate consciousness from brain wave patterns
    const consciousnessLevel = this.calculateConsciousnessFromBrainWaves(data);
    
    // Calculate dimensional state from brain wave complexity
    const dimensionalState = this.calculateDimensionalStateFromBrainWaves(data);
    
    // Generate consciousness color
    const consciousnessColor = A432ColorSystem.calculateColorFromConsciousness(consciousnessLevel);
    
    // Generate dimensional color
    const dimensionalColor = A432ColorSystem.calculateColorFromDimensionalState(dimensionalState);
    
    // Calculate harmonic balance
    const harmonicBalance = this.calculateHarmonicBalance(consciousnessLevel, dimensionalState);
    
    // Determine brain state
    const brainState = this.determineBrainState(dominantWave, consciousnessLevel);
    
    // Generate guidance
    const guidance = this.generateBCIGuidance(consciousnessLevel, this.state.targetConsciousness, dominantWave);
    
    // Create feedback
    const feedback: A432BCIFeedback = {
      dominantWave,
      consciousnessLevel,
      consciousnessColor: A432ColorSystem.toRGB(consciousnessColor),
      dimensionalState,
      dimensionalColor: A432ColorSystem.toRGB(dimensionalColor),
      harmonicBalance,
      guidance,
      brainState,
      mathematicalProof: `A432 BCI: wave=${dominantWave}, consciousness=${consciousnessLevel}, dimension=${dimensionalState}, harmony=${harmonicBalance}`
    };

    // Update state
    this.updateState(data, feedback);

    return feedback;
  }

  /**
   * Calculate dominant brain wave
   */
  private calculateDominantWave(data: A432BrainWaveData): string {
    const waves = [
      { name: 'delta', value: data.delta },
      { name: 'theta', value: data.theta },
      { name: 'alpha', value: data.alpha },
      { name: 'beta', value: data.beta },
      { name: 'gamma', value: data.gamma }
    ];
    
    const dominant = waves.reduce((max, wave) => 
      wave.value > max.value ? wave : max
    );
    
    return dominant.name;
  }

  /**
   * Calculate consciousness from brain wave patterns
   */
  private calculateConsciousnessFromBrainWaves(data: A432BrainWaveData): number {
    // Map brain wave patterns to consciousness levels
    const consciousnessMap = {
      delta: 1,   // Deep sleep - Unity consciousness
      theta: 2,   // Deep meditation - Duality consciousness
      alpha: 4,   // Relaxed focus - Perfect balance
      beta: 6,    // Active thinking - Creative flow
      gamma: 8    // Peak consciousness - Transcendent
    };
    
    const dominantWave = this.calculateDominantWave(data);
    return consciousnessMap[dominantWave] || 4; // Default to perfect balance
  }

  /**
   * Calculate dimensional state from brain wave complexity
   */
  private calculateDimensionalStateFromBrainWaves(data: A432BrainWaveData): number {
    // Calculate complexity based on multiple wave presence
    const totalAmplitude = data.delta + data.theta + data.alpha + data.beta + data.gamma;
    const complexity = (data.beta + data.gamma) / totalAmplitude; // Higher frequencies = higher complexity
    
    // Map complexity to dimensional state (0-9)
    const dimensionalState = Math.round(complexity * 9);
    return Math.max(0, Math.min(9, dimensionalState));
  }

  /**
   * Calculate harmonic balance
   */
  private calculateHarmonicBalance(consciousness: number, dimensionalState: number): number {
    // Perfect balance when consciousness = 4 and dimensional state = 4
    const consciousnessBalance = Math.abs(consciousness - 4) / 4;
    const dimensionalBalance = Math.abs(dimensionalState - 4) / 4;
    
    const totalBalance = (consciousnessBalance + dimensionalBalance) / 2;
    return Math.max(0, 1 - totalBalance);
  }

  /**
   * Determine brain state
   */
  private determineBrainState(dominantWave: string, consciousness: number): string {
    const brainStates = {
      delta: 'Deep Sleep',
      theta: 'Deep Meditation',
      alpha: 'Relaxed Focus',
      beta: 'Active Thinking',
      gamma: 'Peak Consciousness'
    };
    
    return brainStates[dominantWave] || 'Unknown State';
  }

  /**
   * Generate BCI guidance
   */
  private generateBCIGuidance(consciousness: number, target: number, dominantWave: string): string {
    if (consciousness === target) {
      return `Perfect balance achieved - maintain ${dominantWave} wave state`;
    } else if (consciousness < target) {
      const difference = target - consciousness;
      return `Elevate consciousness by ${difference} level(s) - focus on higher frequency waves`;
    } else {
      const difference = consciousness - target;
      return `Ground consciousness by ${difference} level(s) - focus on lower frequency waves`;
    }
  }

  /**
   * Update internal state
   */
  private updateState(brainWaveData: A432BrainWaveData, feedback: A432BCIFeedback): void {
    // Add brain wave data to history
    this.state.brainWaveHistory.push(brainWaveData);
    
    // Keep only last 100 data points
    if (this.state.brainWaveHistory.length > 100) {
      this.state.brainWaveHistory = this.state.brainWaveHistory.slice(-100);
    }
    
    // Add consciousness feedback to history
    this.state.consciousnessHistory.push(feedback);
    
    // Keep only last 50 feedback points
    if (this.state.consciousnessHistory.length > 50) {
      this.state.consciousnessHistory = this.state.consciousnessHistory.slice(-50);
    }
    
    // Update current state
    this.state.currentConsciousness = feedback.consciousnessLevel;
    this.state.dominantWave = feedback.dominantWave;
    this.state.brainState = feedback.brainState;
    this.state.harmonicBalance = feedback.harmonicBalance;
    this.state.isInHarmony = feedback.harmonicBalance >= 0.8;
    
    // Update mathematical proof
    this.state.mathematicalProof = `A432 BCI State: wave=${feedback.dominantWave}, consciousness=${feedback.consciousnessLevel}, brainState=${feedback.brainState}, harmony=${feedback.harmonicBalance}`;
    
    // Notify callbacks
    this.notifyCallbacks();
  }

  /**
   * Set target consciousness level
   */
  public setTargetConsciousness(target: number): void {
    if (target >= 1 && target <= 8) {
      this.state.targetConsciousness = target;
      this.state.mathematicalProof = `A432 BCI Target Set: consciousness=${target}`;
      this.notifyCallbacks();
    }
  }

  /**
   * Get current state
   */
  public getCurrentState(): A432BCIState {
    return { ...this.state };
  }

  /**
   * Subscribe to state updates
   */
  public subscribe(callback: (state: A432BCIState) => void): () => void {
    this.updateCallbacks.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.updateCallbacks.indexOf(callback);
      if (index > -1) {
        this.updateCallbacks.splice(index, 1);
      }
    };
  }

  /**
   * Notify all callbacks
   */
  private notifyCallbacks(): void {
    this.updateCallbacks.forEach(callback => callback({ ...this.state }));
  }

  /**
   * Generate BCI report
   */
  public generateBCIReport(): string {
    const state = this.state;
    const history = state.consciousnessHistory;
    
    if (history.length === 0) {
      return "No BCI data available";
    }
    
    const averageConsciousness = history.reduce((sum, h) => sum + h.consciousnessLevel, 0) / history.length;
    const averageHarmony = history.reduce((sum, h) => sum + h.harmonicBalance, 0) / history.length;
    const waveDistribution = this.calculateWaveDistribution();
    
    return `
A432 BCI Report
===============
Current Brain State: ${state.brainState}
Dominant Wave: ${state.dominantWave}
Current Consciousness: ${state.currentConsciousness}/8
Target Consciousness: ${state.targetConsciousness}/8
Harmonic Balance: ${(state.harmonicBalance * 100).toFixed(1)}%
In Harmony: ${state.isInHarmony ? 'Yes' : 'No'}

Averages (Last ${history.length} readings):
- Average Consciousness: ${averageConsciousness.toFixed(1)}/8
- Average Harmony: ${(averageHarmony * 100).toFixed(1)}%

Wave Distribution:
${waveDistribution}

Mathematical Proof: ${state.mathematicalProof}
    `.trim();
  }

  /**
   * Calculate wave distribution
   */
  private calculateWaveDistribution(): string {
    const history = this.state.consciousnessHistory;
    const waveCounts = {
      delta: 0,
      theta: 0,
      alpha: 0,
      beta: 0,
      gamma: 0
    };
    
    history.forEach(feedback => {
      waveCounts[feedback.dominantWave]++;
    });
    
    return Object.entries(waveCounts)
      .map(([wave, count]) => `  ${wave}: ${count} (${((count / history.length) * 100).toFixed(1)}%)`)
      .join('\n');
  }

  /**
   * Generate BCI visualization data
   */
  public generateBCIVisualizationData(): any {
    const state = this.state;
    const history = state.consciousnessHistory;
    
    return {
      currentConsciousness: state.currentConsciousness,
      targetConsciousness: state.targetConsciousness,
      dominantWave: state.dominantWave,
      brainState: state.brainState,
      harmonicBalance: state.harmonicBalance,
      isInHarmony: state.isInHarmony,
      consciousnessHistory: history.map(h => ({
        consciousness: h.consciousnessLevel,
        color: h.consciousnessColor,
        wave: h.dominantWave,
        timestamp: Date.now()
      })),
      waveHistory: history.map(h => ({
        wave: h.dominantWave,
        brainState: h.brainState,
        timestamp: Date.now()
      })),
      harmonyHistory: history.map(h => ({
        harmony: h.harmonicBalance,
        timestamp: Date.now()
      })),
      mathematicalProof: state.mathematicalProof
    };
  }

  /**
   * Reset to perfect balance
   */
  public resetToPerfectBalance(): void {
    this.state.currentConsciousness = 4;
    this.state.targetConsciousness = 4;
    this.state.dominantWave = 'alpha';
    this.state.brainState = 'Relaxed Focus';
    this.state.harmonicBalance = 1.0;
    this.state.isInHarmony = true;
    this.state.mathematicalProof = 'A432 BCI Reset: Perfect balance restored';
    this.notifyCallbacks();
  }
}

// ============================================================================
// A432 BCI INSTANCE
// ============================================================================

export const A432_BCI_INTERFACE = new A432BCIInterface();

// ============================================================================
// A432 BCI EXPORTS
// ============================================================================

export default A432_BCI_INTERFACE; 