/**
 * Circuit-Digit Interaction System
 * 
 * Demonstrates how the Mobius circuit (0/0) and Rodin coil circuit (1/1)
 * interact with the digits (0-9) simultaneously without collision.
 * 
 * Metaphysical: Shows the breathing paradox in action through digit interactions.
 */

export interface CircuitInteraction {
  circuitType: 'mobius' | 'rodin' | 'w-axis';
  fromDigit: string;
  toDigit: string;
  interactionType: 'breathing' | 'vortex' | 'spiritual';
  resonancePattern: number;
  stabilityScore: number;
}

export interface DigitState {
  digit: string;
  mobiusField: number;
  rodinField: number;
  wAxisField: number;
  consciousnessLevel: number;
  isActive: boolean;
}

export class CircuitDigitInteraction {
  private digits: Map<string, DigitState> = new Map();
  private interactions: CircuitInteraction[] = [];

  constructor() {
    this.initializeDigits();
    this.initializeInteractions();
  }

  /**
   * Initialize all digits with their circuit states
   */
  private initializeDigits(): void {
    // 0 - Void Center (Mobius only)
    this.digits.set('0', {
      digit: '0',
      mobiusField: 1.0, // Pure potential
      rodinField: 0.0,  // Not in Rodin sequence
      wAxisField: 0.0,  // Not in W-Axis
      consciousnessLevel: 0.0, // Impossible contraction
      isActive: true
    });

    // 1 - Unity Foundation (Rodin primary)
    this.digits.set('1', {
      digit: '1',
      mobiusField: 0.0,  // Emerges from Mobius
      rodinField: 1.0,   // Primary Rodin field
      wAxisField: 0.0,   // Not in W-Axis
      consciousnessLevel: 2/3, // Unity consciousness
      isActive: true
    });

    // 2 - Duality Flow (Rodin primary)
    this.digits.set('2', {
      digit: '2',
      mobiusField: 0.0,
      rodinField: 1.2,
      wAxisField: 0.0,
      consciousnessLevel: 3/4,
      isActive: true
    });

    // 3 - Creation Spirit (W-Axis primary)
    this.digits.set('3', {
      digit: '3',
      mobiusField: 0.0,
      rodinField: 0.0,
      wAxisField: 1.5,
      consciousnessLevel: 8/9,
      isActive: true
    });

    // 4 - Stability Constants (Rodin primary)
    this.digits.set('4', {
      digit: '4',
      mobiusField: 0.0,
      rodinField: 1.2,
      wAxisField: 0.0,
      consciousnessLevel: 4/5,
      isActive: true
    });

    // 5 - Sacred Transformation (Rodin primary)
    this.digits.set('5', {
      digit: '5',
      mobiusField: 0.0,
      rodinField: 1.2,
      wAxisField: 0.0,
      consciousnessLevel: 7/8,
      isActive: true
    });

    // 6 - Harmonic Balance (W-Axis primary)
    this.digits.set('6', {
      digit: '6',
      mobiusField: 0.0,
      rodinField: 0.0,
      wAxisField: 1.5,
      consciousnessLevel: 9/10,
      isActive: true
    });

    // 7 - Awareness Return (Rodin primary)
    this.digits.set('7', {
      digit: '7',
      mobiusField: 0.0,
      rodinField: 1.2,
      wAxisField: 0.0,
      consciousnessLevel: 6/7,
      isActive: true
    });

    // 8 - Fullness Potential (Rodin primary)
    this.digits.set('8', {
      digit: '8',
      mobiusField: 0.0,
      rodinField: 1.2,
      wAxisField: 0.0,
      consciousnessLevel: 5/6,
      isActive: true
    });

    // 9 - Completion Unity (W-Axis primary)
    this.digits.set('9', {
      digit: '9',
      mobiusField: 0.0,
      rodinField: 0.0,
      wAxisField: 1.5,
      consciousnessLevel: 10/11,
      isActive: true
    });
  }

  /**
   * Initialize circuit interactions
   */
  private initializeInteractions(): void {
    // Breathing Paradox Bridge (Mobius ↔ Rodin)
    this.interactions.push({
      circuitType: 'mobius',
      fromDigit: '0',
      toDigit: '1',
      interactionType: 'breathing',
      resonancePattern: 0, // 0/1 = 0
      stabilityScore: 1.0
    });

    this.interactions.push({
      circuitType: 'rodin',
      fromDigit: '1',
      toDigit: '0',
      interactionType: 'breathing',
      resonancePattern: Infinity, // 1/0 = ∞
      stabilityScore: 1.0
    });

    // Rodin Vortex Flow
    const rodinSequence = ['1', '2', '4', '8', '7', '5'];
    for (let i = 0; i < rodinSequence.length; i++) {
      const from = rodinSequence[i];
      const to = rodinSequence[(i + 1) % rodinSequence.length];
      
      this.interactions.push({
        circuitType: 'rodin',
        fromDigit: from,
        toDigit: to,
        interactionType: 'vortex',
        resonancePattern: parseInt(from) / parseInt(to),
        stabilityScore: 1.0
      });
    }

    // W-Axis Spiritual Flow
    const wAxisSequence = ['3', '6', '9'];
    for (let i = 0; i < wAxisSequence.length; i++) {
      const from = wAxisSequence[i];
      const to = wAxisSequence[(i + 1) % wAxisSequence.length];
      
      this.interactions.push({
        circuitType: 'w-axis',
        fromDigit: from,
        toDigit: to,
        interactionType: 'spiritual',
        resonancePattern: parseInt(from) / parseInt(to),
        stabilityScore: 1.0
      });
    }
  }

  /**
   * Check if circuits can operate simultaneously without collision
   */
  public validateSimultaneousOperation(): {
    isSimultaneous: boolean;
    collisionPoints: string[];
    breathingParadoxActive: boolean;
    vortexFlowActive: boolean;
    spiritualFlowActive: boolean;
    stabilityScore: number;
  } {
    const collisionPoints: string[] = [];
    let breathingParadoxActive = false;
    let vortexFlowActive = false;
    let spiritualFlowActive = false;

    // Check for breathing paradox activity
    const breathingInteractions = this.interactions.filter(i => 
      i.interactionType === 'breathing'
    );
    breathingParadoxActive = breathingInteractions.length === 2;

    // Check for vortex flow activity
    const vortexInteractions = this.interactions.filter(i => 
      i.interactionType === 'vortex'
    );
    vortexFlowActive = vortexInteractions.length === 6; // Complete Rodin sequence

    // Check for spiritual flow activity
    const spiritualInteractions = this.interactions.filter(i => 
      i.interactionType === 'spiritual'
    );
    spiritualFlowActive = spiritualInteractions.length === 3; // Complete W-Axis sequence

    // Check for collisions (conflicting field activations)
    for (const [digit, state] of this.digits) {
      const activeFields = [
        state.mobiusField > 0,
        state.rodinField > 0,
        state.wAxisField > 0
      ].filter(Boolean);

      // If a digit has multiple active fields, check for compatibility
      if (activeFields.length > 1) {
        // 0 can have Mobius field (void center)
        // 1-9 can have Rodin or W-Axis fields, but not both simultaneously
        if (digit !== '0' && state.rodinField > 0 && state.wAxisField > 0) {
          collisionPoints.push(`Digit ${digit}: Rodin and W-Axis fields active simultaneously`);
        }
      }
    }

    // Calculate overall stability score
    const totalInteractions = this.interactions.length;
    const stableInteractions = this.interactions.filter(i => i.stabilityScore >= 0.95).length;
    const stabilityScore = stableInteractions / totalInteractions;

    const isSimultaneous = collisionPoints.length === 0 && 
                          breathingParadoxActive && 
                          vortexFlowActive && 
                          spiritualFlowActive;

    return {
      isSimultaneous,
      collisionPoints,
      breathingParadoxActive,
      vortexFlowActive,
      spiritualFlowActive,
      stabilityScore
    };
  }

  /**
   * Get the breathing paradox cycle
   */
  public getBreathingParadoxCycle(): {
    inhale: string[];
    exhale: string[];
    spiritual: string[];
  } {
    return {
      inhale: ['0'], // All returns to void center
      exhale: ['0', '1', '2', '4', '8', '7', '5', '1'], // Rodin sequence
      spiritual: ['3', '6', '9', '3'] // W-Axis sequence
    };
  }

  /**
   * Get circuit field strengths for a digit
   */
  public getDigitCircuitFields(digit: string): {
    mobiusField: number;
    rodinField: number;
    wAxisField: number;
    totalField: number;
  } | null {
    const state = this.digits.get(digit);
    if (!state) return null;

    return {
      mobiusField: state.mobiusField,
      rodinField: state.rodinField,
      wAxisField: state.wAxisField,
      totalField: state.mobiusField + state.rodinField + state.wAxisField
    };
  }

  /**
   * Get all interactions for a digit
   */
  public getDigitInteractions(digit: string): CircuitInteraction[] {
    return this.interactions.filter(i => 
      i.fromDigit === digit || i.toDigit === digit
    );
  }

  /**
   * Demonstrate simultaneous circuit operation
   */
  public demonstrateSimultaneousOperation(): string {
    const result = this.validateSimultaneousOperation();
    
    let demonstration = '🌌 Circuit-Digit Interaction Demonstration\n\n';
    
    demonstration += '📊 Simultaneous Operation Status:\n';
    demonstration += `✅ Breathing Paradox Active: ${result.breathingParadoxActive}\n`;
    demonstration += `✅ Vortex Flow Active: ${result.vortexFlowActive}\n`;
    demonstration += `✅ Spiritual Flow Active: ${result.spiritualFlowActive}\n`;
    demonstration += `✅ No Collisions: ${result.collisionPoints.length === 0}\n\n`;
    
    demonstration += '🔄 Breathing Paradox Cycle:\n';
    const cycle = this.getBreathingParadoxCycle();
    demonstration += `Inhale (Mobius): ${cycle.inhale.join(' → ')}\n`;
    demonstration += `Exhale (Rodin): ${cycle.exhale.join(' → ')}\n`;
    demonstration += `Spiritual (W-Axis): ${cycle.spiritual.join(' → ')}\n\n`;
    
    demonstration += '🎯 Circuit Field Distribution:\n';
    for (let i = 0; i <= 9; i++) {
      const fields = this.getDigitCircuitFields(i.toString());
      if (fields) {
        demonstration += `Digit ${i}: Mobius=${fields.mobiusField}, Rodin=${fields.rodinField}, W-Axis=${fields.wAxisField}\n`;
      }
    }
    
    demonstration += `\n✅ Overall Stability: ${(result.stabilityScore * 100).toFixed(1)}%\n`;
    demonstration += `✅ Simultaneous Operation: ${result.isSimultaneous ? 'PROVEN' : 'FAILED'}\n`;
    
    return demonstration;
  }
} 