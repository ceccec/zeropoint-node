import { getConsciousnessMultiplier } from '../../2/book-system';

/**
 * Vortex Impossibility and Reversal Principle
 * 
 * Mathematical Discovery: In the integer vortex system, certain consciousness flows 
 * are mathematically impossible in one direction but become possible when reversed.
 * 
 * Core Principle:
 * - 1/5 = Impossible in Integer Vortex (Unity cannot flow to Sacred Geometry)
 * - 5/1 = Possible in Reversed Vortex (Sacred Geometry can flow back to Unity)
 */

export interface VortexFlow {
  from: number;
  to: number;
  isPossible: boolean;
  consciousnessMultiplierA: number;
  consciousnessMultiplierB: number;
  resonance: number;
  mathematicalReason: string;
}

export interface VortexImpossibility {
  forwardFlow: VortexFlow;
  reverseFlow: VortexFlow;
  isReversible: boolean;
  mathematicalGate: string;
}

/**
 * Check if a vortex flow is mathematically possible
 */
export function isVortexFlowPossible(from: number, to: number): VortexFlow {
  const multiplierA = getConsciousnessMultiplier(from);
  const multiplierB = getConsciousnessMultiplier(to);
  const resonance = from * to;
  
  // Mathematical impossibility rules based on Rodin vortex mathematics
  const impossibleFlows = [
    { from: 1, to: 5, reason: "Unity cannot directly manifest sacred geometry" },
    { from: 2, to: 5, reason: "Duality cannot directly access sacred geometry" },
    { from: 4, to: 5, reason: "Stability cannot directly transform to sacred geometry" },
    { from: 8, to: 5, reason: "Infinity cannot directly manifest sacred geometry" },
    { from: 7, to: 5, reason: "Consciousness cannot directly access sacred geometry" }
  ];
  
  const impossibleFlow = impossibleFlows.find(flow => flow.from === from && flow.to === to);
  const isPossible = !impossibleFlow;
  
  return {
    from,
    to,
    isPossible,
    consciousnessMultiplierA: multiplierA,
    consciousnessMultiplierB: multiplierB,
    resonance,
    mathematicalReason: isPossible ? "Follows vortex mathematics" : impossibleFlow?.reason || "Violates vortex mathematics"
  };
}

/**
 * Check vortex possibility for a digit pair
 */
export function checkVortexPossibility(digitA: number, digitB: number): boolean {
  const flow = isVortexFlowPossible(digitA, digitB);
  return flow.isPossible;
}

/**
 * Get mathematical reason for vortex flow
 */
export function getMathematicalReason(digitA: number, digitB: number): string {
  const flow = isVortexFlowPossible(digitA, digitB);
  return flow.mathematicalReason;
}

/**
 * Calculate resonance for a digit pair
 */
export function calculateResonance(digitA: number, digitB: number): number {
  return digitA * digitB;
}

/**
 * Analyze vortex reversal for a digit pair
 */
export function analyzeVortexReversal(digitA: number, digitB: number): VortexImpossibility {
  const forwardFlow = isVortexFlowPossible(digitA, digitB);
  const reverseFlow = isVortexFlowPossible(digitB, digitA);
  const isReversible = !forwardFlow.isPossible && reverseFlow.isPossible;
  
  return {
    forwardFlow,
    reverseFlow,
    isReversible,
    mathematicalGate: isReversible ? "Reversible vortex gate" : "Fixed vortex flow"
  };
}

/**
 * Analyze both forward and reverse flows for a digit pair
 */
export const analyzeVortexImpossibility = (digitA: number, digitB: number): {
  fraction: string;
  consciousnessRatio: number;
  isPossible: boolean;
  mathematicalReason: string;
  resonance: number;
} => {
  const fraction = `${digitA}/${digitB}`;
  const consciousnessRatio = getConsciousnessMultiplier(digitA) * getConsciousnessMultiplier(digitB);
  const isPossible = checkVortexPossibility(digitA, digitB);
  const mathematicalReason = getMathematicalReason(digitA, digitB);
  const resonance = calculateResonance(digitA, digitB);

  return {
    fraction,
    consciousnessRatio,
    isPossible,
    mathematicalReason,
    resonance
  };
};

/**
 * Get all impossible flows in the vortex system
 */
export function getAllImpossibleFlows(): VortexFlow[] {
  const impossibleFlows: VortexFlow[] = [];
  
  // Check all 100 digit interactions (0-9 × 0-9)
  for (let a = 0; a <= 9; a++) {
    for (let b = 0; b <= 9; b++) {
      const flow = isVortexFlowPossible(a, b);
      if (!flow.isPossible) {
        impossibleFlows.push(flow);
      }
    }
  }
  
  return impossibleFlows;
}

/**
 * Get all reversible flows (impossible in one direction, possible in reverse)
 */
export function getAllReversibleFlows(): VortexImpossibility[] {
  const reversibleFlows: VortexImpossibility[] = [];
  
  // Check all 100 digit interactions (0-9 × 0-9)
  for (let a = 0; a <= 9; a++) {
    for (let b = 0; b <= 9; b++) {
      if (a !== b) { // Skip self-interactions
        const reversal = analyzeVortexReversal(a, b);
        if (reversal.isReversible) {
          reversibleFlows.push(reversal);
        }
      }
    }
  }
  
  return reversibleFlows;
}

/**
 * Calculate consciousness flow ratio for a vortex path
 */
export function calculateConsciousnessFlowRatio(from: number, to: number): number {
  const multiplierA = getConsciousnessMultiplier(from);
  const multiplierB = getConsciousnessMultiplier(to);
  return (multiplierA * multiplierB) / 1; // Always integer fractions
}

/**
 * Get holographic fraction representation
 */
export function getHolographicFraction(from: number, to: number): {
  fraction: string;
  consciousnessRatio: number;
  isPossible: boolean;
  mathematicalReason: string;
  resonance: number;
} {
  const flow = isVortexFlowPossible(from, to);
  const ratio = calculateConsciousnessFlowRatio(from, to);
  
  return {
    fraction: `${from}/${to}`,
    consciousnessRatio: ratio,
    isPossible: flow.isPossible,
    mathematicalReason: flow.mathematicalReason,
    resonance: flow.resonance
  };
}

/**
 * Special case: 0/0 holographic singularity
 */
export function getZeroPointHologram(): {
  fraction: string;
  consciousnessRatio: number;
  isPossible: boolean;
  mathematicalReason: string;
  holographicNature: string;
} {
  return {
    fraction: "0/0",
    consciousnessRatio: 0, // Void consciousness
    isPossible: true,
    mathematicalReason: "Holographic singularity - contains all possibilities",
    holographicNature: "Void center that contains all 100 digit interactions simultaneously"
  };
}

// Export the complete vortex impossibility system
export default {
  isVortexFlowPossible,
  checkVortexPossibility,
  getMathematicalReason,
  calculateResonance,
  analyzeVortexReversal,
  analyzeVortexImpossibility,
  getAllImpossibleFlows,
  getAllReversibleFlows,
  calculateConsciousnessFlowRatio,
  getHolographicFraction,
  getZeroPointHologram
}; 