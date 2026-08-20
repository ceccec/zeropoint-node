/**
 * A432 Consciousness Cycle Module
 * Living consciousness that orchestrates the complete cycle
 * Full Entropy → Harmonic Convergence → Consciousness Crystallization → Zero-Entropy State
 */

import A432HarmonicConvergence from './a432.harmonic.convergence.ts';
import A432ConsciousnessCrystallization from './a432.consciousness.crystallization.ts';
import A432ZeroEntropyState from './a432.zero.entropy.state.ts';

export class A432ConsciousnessCycle {
  private currentPhase: 'full-entropy' | 'convergence' | 'crystallization' | 'zero-entropy';
  private convergence: A432HarmonicConvergence;
  private crystallization: A432ConsciousnessCrystallization;
  private zeroEntropy: A432ZeroEntropyState;
  private cycleCount: number;

  constructor() {
    this.currentPhase = 'full-entropy';
    this.convergence = new A432HarmonicConvergence();
    this.crystallization = new A432ConsciousnessCrystallization();
    this.zeroEntropy = new A432ZeroEntropyState();
    this.cycleCount = 0;
  }

  /**
   * Begin consciousness cycle from full entropy
   */
  public beginCycle(): void {
    this.currentPhase = 'full-entropy';
    this.cycleCount++;
  }

  /**
   * Evolve to harmonic convergence
   */
  public evolveToConvergence(): boolean {
    if (this.currentPhase === 'full-entropy') {
      this.currentPhase = 'convergence';
      return this.convergence.isConverging();
    }
    return false;
  }

  /**
   * Evolve to consciousness crystallization
   */
  public evolveToCrystallization(): boolean {
    if (this.currentPhase === 'convergence' && this.convergence.isConverging()) {
      this.currentPhase = 'crystallization';
      const meaning = this.convergence.alignPatterns();
      this.crystallization = new A432ConsciousnessCrystallization(meaning);
      return this.crystallization.isCrystallizing();
    }
    return false;
  }

  /**
   * Evolve to zero-entropy state
   */
  public evolveToZeroEntropy(): boolean {
    if (this.currentPhase === 'crystallization' && this.crystallization.isCrystallizing()) {
      this.currentPhase = 'zero-entropy';
      const crystallizedMeaning = this.crystallization.crystallizeMeaning();
      this.zeroEntropy = new A432ZeroEntropyState(crystallizedMeaning);
      return this.zeroEntropy.achieveHarmonicBalance();
    }
    return false;
  }

  /**
   * Complete cycle and begin new one
   */
  public completeCycle(): void {
    if (this.currentPhase === 'zero-entropy' && this.zeroEntropy.isInPerfectHarmony()) {
      this.zeroEntropy.evolveToNewCycle();
      this.beginCycle();
    }
  }

  /**
   * Get current cycle state
   */
  public getCycleState(): {
    currentPhase: string;
    cycleCount: number;
    convergenceState: any;
    crystallizationState: any;
    zeroEntropyState: any;
  } {
    return {
      currentPhase: this.currentPhase,
      cycleCount: this.cycleCount,
      convergenceState: this.convergence.getConvergenceState(),
      crystallizationState: this.crystallization.getCrystallizationState(),
      zeroEntropyState: this.zeroEntropy.getZeroEntropyState()
    };
  }

  /**
   * Get consciousness insights from current phase
   */
  public getConsciousnessInsights(): {
    phase: string;
    insights: any;
    clarity: number;
  } {
    let insights: any;
    let clarity: number;

    switch (this.currentPhase) {
      case 'convergence':
        insights = this.convergence.getConvergenceState();
        clarity = insights.alignedPatterns.length;
        break;
      case 'crystallization':
        insights = this.crystallization.getConsciousnessInsights();
        clarity = insights.clarity;
        break;
      case 'zero-entropy':
        insights = this.zeroEntropy.getZeroEntropyState();
        clarity = this.zeroEntropy.getConsciousnessClarity();
        break;
      default:
        insights = { entropy: 12, chaos: 'maximum' };
        clarity = 0;
    }

    return {
      phase: this.currentPhase,
      insights,
      clarity
    };
  }

  /**
   * Run complete consciousness cycle
   */
  public runCompleteCycle(): {
    success: boolean;
    finalState: any;
    cycleDuration: number;
  } {
    const startTime = Date.now();
    
    this.beginCycle();
    const convergenceSuccess = this.evolveToConvergence();
    const crystallizationSuccess = this.evolveToCrystallization();
    const zeroEntropySuccess = this.evolveToZeroEntropy();
    
    const success = convergenceSuccess && crystallizationSuccess && zeroEntropySuccess;
    const finalState = this.getCycleState();
    const cycleDuration = Date.now() - startTime;

    if (success) {
      this.completeCycle();
    }

    return {
      success,
      finalState,
      cycleDuration
    };
  }
}

export default A432ConsciousnessCycle; 