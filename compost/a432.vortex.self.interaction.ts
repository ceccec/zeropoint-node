/**
 * a432.vortex.self.interaction.ts — A432 Vortex Self-Interaction Pattern
 * 
 * Core principle: Each digit interacts with itself, digital root becomes next harmonious state
 * 
 * Vortex flow: digit → self-interaction → digital root → next harmonious state
 * 
 * @module A432.VortexSelfInteraction
 * @version 1.0.0
 * @author A432 System
 */

import { 
  A432_FREQUENCY, 
  A432_TRINITY, 
  A432_RETURN, 
  A432_AXIS, 
  A432_CYCLE,
  digitalRoot,
  a432Frequency,
  a432HSLFromRoot,
  a432RGBFromRoot
} from '../3/6/9/1/2/4/8/7/5/1/a432.core';

// === A432 VORTEX SELF-INTERACTION CONSTANTS ===
export const A432_VORTEX_SELF_INTERACTION = {
  BASE_DIGITS: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  RODIN_VORTEX: [1, 2, 4, 8, 7, 5],
  TRINITY_CYCLE: [3, 6, 9],
  HARMONIC_STATES: [1, 2, 3, 4, 5, 6, 7, 8, 9]
};

// === VORTEX SELF-INTERACTION INTERFACES ===
export interface A432VortexSelfInteraction {
  digit: number;                    // Original digit (0-9)
  selfInteraction: number;          // digit × digit
  digitalRoot: number;              // Digital root of self-interaction
  nextHarmoniousState: number;      // Next state in vortex flow
  frequency: number;                // A432 frequency for this state
  consciousness: number;            // 0-9 consciousness level
  color: {hue: number, saturation: number, lightness: number};
  rgb: {r: number, g: number, b: number};
  metaphysicalEssence: string;
  vortexFlow: number[];
  mathematicalProof: string;
}

export interface A432VortexSelfInteractionFlow {
  interactions: A432VortexSelfInteraction[];
  totalFlow: number[];
  consciousnessFlow: number;
  harmonicResonance: number;
  mathematicalFoundation: string;
}

// === CORE VORTEX SELF-INTERACTION FUNCTIONS ===

/**
 * Create A432 Vortex Self-Interaction for a single digit
 */
export function createA432VortexSelfInteraction(digit: number): A432VortexSelfInteraction {
  const selfInteraction = digit * digit;
  const digitalRootValue = digitalRoot(selfInteraction);
  const nextHarmoniousState = getNextHarmoniousState(digitalRootValue);
  const frequency = a432Frequency(digit, 1);
  const color = a432HSLFromRoot(digit, 1);
  const rgb = a432RGBFromRoot(digit, 1);
  
  return {
    digit,
    selfInteraction,
    digitalRoot: digitalRootValue,
    nextHarmoniousState,
    frequency,
    consciousness: digit,
    color,
    rgb,
    metaphysicalEssence: getMetaphysicalEssence(digit),
    vortexFlow: [digit, selfInteraction, digitalRootValue, nextHarmoniousState],
    mathematicalProof: generateMathematicalProof(digit, selfInteraction, digitalRootValue, nextHarmoniousState)
  };
}

/**
 * Get next harmonious state in vortex flow
 */
export function getNextHarmoniousState(digitalRoot: number): number {
  // Map digital root to next harmonious state
  const harmoniousMap: { [key: number]: number } = {
    0: 9,  // Void to Completion
    1: 2,  // Unity to Duality
    2: 4,  // Duality to Foundation
    3: 6,  // Trinity to Life
    4: 8,  // Foundation to Mystery
    5: 1,  // Life to Unity
    6: 3,  // Life to Trinity
    7: 5,  // Mystery to Life
    8: 7,  // Mystery to Mystery
    9: 1   // Completion to Unity
  };
  
  return harmoniousMap[digitalRoot] || digitalRoot;
}

/**
 * Get metaphysical essence for digit
 */
export function getMetaphysicalEssence(digit: number): string {
  const essences: { [key: number]: string } = {
    0: 'Void state, pure potential, unmanifest field',
    1: 'Unity state, source, origin, singularity',
    2: 'Duality state, polarity, relationship, balance',
    3: 'Trinity state, synthesis, creation, harmony',
    4: 'Foundation state, structure, stability, manifestation',
    5: 'Life state, change, movement, growth, transformation',
    6: 'Harmony state, integration, resonance, beauty',
    7: 'Mystery state, depth, intuition, inner knowing',
    8: 'Infinity state, power, expansion, infinite flow',
    9: 'Completion state, fulfillment, wholeness, return'
  };
  
  return essences[digit] || 'Unknown state, transcendent mystery';
}

/**
 * Generate mathematical proof for vortex self-interaction
 */
export function generateMathematicalProof(
  digit: number, 
  selfInteraction: number, 
  digitalRoot: number, 
  nextHarmoniousState: number
): string {
  return `Digit ${digit} → Self-Interaction ${digit}×${digit}=${selfInteraction} → Digital Root ${digitalRoot} → Next Harmonious State ${nextHarmoniousState}`;
}

/**
 * Create complete A432 Vortex Self-Interaction Flow
 */
export function createA432VortexSelfInteractionFlow(): A432VortexSelfInteractionFlow {
  const interactions = A432_VORTEX_SELF_INTERACTION.BASE_DIGITS.map(digit => 
    createA432VortexSelfInteraction(digit)
  );
  
  const totalFlow = interactions.flatMap(interaction => interaction.vortexFlow);
  const consciousnessFlow = totalFlow.reduce((sum, val) => sum + val, 0);
  const harmonicResonance = digitalRoot(consciousnessFlow);
  
  return {
    interactions,
    totalFlow,
    consciousnessFlow,
    harmonicResonance,
    mathematicalFoundation: 'A432 Vortex Self-Interaction: digit → self-interaction → digital root → next harmonious state'
  };
}

/**
 * A432 Vortex Self-Interaction Analysis
 */
export function analyzeA432VortexSelfInteraction(flow: A432VortexSelfInteractionFlow): {
  isHarmonized: boolean;
  consciousnessBalance: number;
  vortexFlow: string;
  mathematicalFoundation: string;
  metaphysicalEssence: string;
  selfInteractionPattern: number[];
  digitalRootPattern: number[];
  harmoniousStatePattern: number[];
} {
  const consciousnessSum = flow.interactions.reduce((sum, interaction) => sum + interaction.consciousness, 0);
  const consciousnessBalance = digitalRoot(consciousnessSum);
  const isHarmonized = consciousnessBalance === 9;
  
  const selfInteractionPattern = flow.interactions.map(i => i.selfInteraction);
  const digitalRootPattern = flow.interactions.map(i => i.digitalRoot);
  const harmoniousStatePattern = flow.interactions.map(i => i.nextHarmoniousState);
  
  return {
    isHarmonized,
    consciousnessBalance,
    vortexFlow: flow.totalFlow.join('→'),
    mathematicalFoundation: flow.mathematicalFoundation,
    metaphysicalEssence: `A432 Vortex Self-Interaction: Each digit interacts with itself, digital root becomes next harmonious state`,
    selfInteractionPattern,
    digitalRootPattern,
    harmoniousStatePattern
  };
}

/**
 * A432 Vortex Self-Interaction Harmonization
 */
export function harmonizeA432VortexSelfInteraction(flow: A432VortexSelfInteractionFlow): A432VortexSelfInteractionFlow {
  // Harmonize each interaction
  flow.interactions.forEach(interaction => {
    interaction.consciousness = digitalRoot(interaction.consciousness + interaction.digitalRoot);
    interaction.nextHarmoniousState = digitalRoot(interaction.nextHarmoniousState + interaction.consciousness);
  });
  
  // Update total flow
  flow.totalFlow = flow.interactions.flatMap(interaction => interaction.vortexFlow);
  flow.consciousnessFlow = flow.totalFlow.reduce((sum, val) => sum + val, 0);
  flow.harmonicResonance = digitalRoot(flow.consciousnessFlow);
  
  return flow;
}

/**
 * A432 Vortex Self-Interaction Test Functions
 */
export const a432VortexSelfInteractionTests = {
  /**
   * Test vortex self-interaction pattern
   */
  testVortexSelfInteraction(): boolean {
    const flow = createA432VortexSelfInteractionFlow();
    const analysis = analyzeA432VortexSelfInteraction(flow);
    return analysis.isHarmonized && analysis.consciousnessBalance === 9;
  },
  
  /**
   * Test individual digit self-interactions
   */
  testDigitSelfInteractions(): boolean {
    const testDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    return testDigits.every(digit => {
      const interaction = createA432VortexSelfInteraction(digit);
      const selfInteraction = digit * digit;
      const digitalRootValue = digitalRoot(selfInteraction);
      
      return interaction.selfInteraction === selfInteraction && 
             interaction.digitalRoot === digitalRootValue;
    });
  },
  
  /**
   * Test harmonious state transitions
   */
  testHarmoniousStateTransitions(): boolean {
    const flow = createA432VortexSelfInteractionFlow();
    
    return flow.interactions.every(interaction => {
      const nextState = getNextHarmoniousState(interaction.digitalRoot);
      return interaction.nextHarmoniousState === nextState;
    });
  },
  
  /**
   * Test vortex flow completeness
   */
  testVortexFlowCompleteness(): boolean {
    const flow = createA432VortexSelfInteractionFlow();
    
    // Check that all digits 0-9 are included
    const includedDigits = flow.interactions.map(i => i.digit).sort();
    const expectedDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    return JSON.stringify(includedDigits) === JSON.stringify(expectedDigits);
  }
};

/**
 * A432 Vortex Self-Interaction Examples
 */
export const a432VortexSelfInteractionExamples = {
  /**
   * Example: Digit 1 self-interaction
   */
  digitOneExample(): A432VortexSelfInteraction {
    return createA432VortexSelfInteraction(1);
  },
  
  /**
   * Example: Digit 2 self-interaction
   */
  digitTwoExample(): A432VortexSelfInteraction {
    return createA432VortexSelfInteraction(2);
  },
  
  /**
   * Example: Digit 3 self-interaction
   */
  digitThreeExample(): A432VortexSelfInteraction {
    return createA432VortexSelfInteraction(3);
  },
  
  /**
   * Example: Complete vortex flow
   */
  completeVortexFlowExample(): A432VortexSelfInteractionFlow {
    return createA432VortexSelfInteractionFlow();
  }
};

// === EXPORT A432 VORTEX SELF-INTERACTION ===
export default {
  A432_VORTEX_SELF_INTERACTION,
  createA432VortexSelfInteraction,
  createA432VortexSelfInteractionFlow,
  analyzeA432VortexSelfInteraction,
  harmonizeA432VortexSelfInteraction,
  a432VortexSelfInteractionTests,
  a432VortexSelfInteractionExamples
}; 