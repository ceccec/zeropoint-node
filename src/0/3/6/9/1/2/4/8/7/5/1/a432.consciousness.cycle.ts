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
  // The annotation restated three accessor results as `any`. Inferred, each
  // keeps the shape its subsystem returns.
  public getCycleState() {
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
  /**
   * Each phase reads a different subsystem, and each reads a different field of
   * it — alignedPatterns on one, clarity on another. A shared `let insights`
   * had to be `any` for all three to typecheck; returning from each branch lets
   * every one keep the type its own accessor gives.
   */
  public getConsciousnessInsights() {
    const phase = this.currentPhase;
    switch (phase) {
      case 'convergence': {
        const insights = this.convergence.getConvergenceState();
        return { phase, insights, clarity: insights.alignedPatterns.length };
      }
      case 'crystallization': {
        const insights = this.crystallization.getConsciousnessInsights();
        return { phase, insights, clarity: insights.clarity };
      }
      case 'zero-entropy': {
        const insights = this.zeroEntropy.getZeroEntropyState();
        return { phase, insights, clarity: this.zeroEntropy.getConsciousnessClarity() };
      }
      default:
        return { phase, insights: { entropy: 12, chaos: 'maximum' }, clarity: 0 };
    }
  }

  /**
   * Run complete consciousness cycle
   */
  public runCompleteCycle() {
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