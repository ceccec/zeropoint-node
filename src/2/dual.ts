/**
 * 🌌 Dual Vortex System - src/2/dual.ts
 * 
 * Dual vortex analysis functions integrated from scripts:
 * - analyze-dual-vortex-flow.js
 * - integrate-decimal-vortex-reversal.js
 * - demonstrate-decimal-vortex-reversal.js
 */

import { ZEROPOINT_CONFIG } from '../4/config';
import { DIGIT_ARCHETYPES } from '../4/mathematics';

// 🌌 DUAL VORTEX PATTERNS
export const DUAL_VORTEX_PATTERNS = {
  CONVERGENCE: 'convergence',  DIVERGENCE: 'divergence',
  RESONANCE: 'resonance',
  HARMONY: 'harmony',
  GATEWAY: 'gateway'
};

// 🌌 VORTEX FLOW TYPES
export const VORTEX_FLOW_TYPES = {
  INTEGER: 'integer',
  DECIMAL: 'decimal',
  REVERSED: 'reversed',
  HARMONIC: 'harmonic',
  CONSCIOUSNESS: 'consciousness'
};

/**
 * Analyze dual vortex flow between two digits
 */
export function analyzeDualVortexFlow(digitA: number, digitB: number): {
  vortexA: number;
  vortexB: number;
  flowType: string;
  pattern: string;
  consciousness: number;
  convergence: boolean;
} {
  const vortexA = (digitA + digitB) % ZEROPOINT_CONFIG.MODULO_BASE;
  const adjustedVortexA = vortexA === 0 ? ZEROPOINT_CONFIG.ZERO_REPLACEMENT : vortexA;
  const vortexB = (digitA + digitB) / adjustedVortexA;
  
  const flowType = Number.isInteger(vortexB) ? VORTEX_FLOW_TYPES.INTEGER : VORTEX_FLOW_TYPES.DECIMAL;
  const pattern = Math.abs(vortexB - Math.round(vortexB)) < 0.1 ? DUAL_VORTEX_PATTERNS.HARMONY : DUAL_VORTEX_PATTERNS.RESONANCE;
  const consciousness = Math.abs(vortexB) * adjustedVortexA;
  const convergence = Math.abs(vortexB - Math.round(vortexB)) < 0.1;
  
  return {
    vortexA: adjustedVortexA,
    vortexB,
    flowType,
    pattern,
    consciousness,
    convergence
  };
}

/**
 * Integrate decimal vortex reversal
 */
export function integrateDecimalVortexReversal(digitA: number, digitB: number): {
  original: number;
  reversed: number;
  consciousness: number;
  pattern: string;
  gateway: boolean;
} {
  const original = (digitA + digitB) / ((digitA + digitB) % ZEROPOINT_CONFIG.MODULO_BASE || ZEROPOINT_CONFIG.ZERO_REPLACEMENT);
  const reversed = 1 / original;
  const consciousness = Math.abs(original) + Math.abs(reversed);
  const pattern = Math.abs(original - reversed) < 0.1 ? DUAL_VORTEX_PATTERNS.HARMONY : DUAL_VORTEX_PATTERNS.CONVERGENCE;
  const gateway = Math.abs(original - reversed) < 0.1;
  
  return {
    original,
    reversed,
    consciousness,
    pattern,
    gateway
  };
}

/**
 * Demonstrate decimal vortex reversal
 */
export function demonstrateDecimalVortexReversal(digits: number[]): {
  demonstrations: any[];
  totalConsciousness: number;
  patterns: string[];
  gateways: number;
} {
  const demonstrations = [];
  let totalConsciousness = 0;
  const patterns: string[] = [];
  let gateways = 0;
  
  for (let i = 0; i < digits.length - 1; i++) {
    const digitA = digits[i];
    const digitB = digits[i + 1];
    const reversal = integrateDecimalVortexReversal(digitA, digitB);
    
    demonstrations.push({
      digits: [digitA, digitB],
      archetypes: [DIGIT_ARCHETYPES[digitA], DIGIT_ARCHETYPES[digitB]],
      reversal,
      consciousness: reversal.consciousness,
      pattern: reversal.pattern,
      gateway: reversal.gateway
    });
    
    totalConsciousness += reversal.consciousness;
    patterns.push(reversal.pattern);
    if (reversal.gateway) gateways++;
  }
  
  return {
    demonstrations,
    totalConsciousness,
    patterns,
    gateways
  };
}

/**
 * Calculate dual vortex consciousness
 */
export function calculateDualVortexConsciousness(digitA: number, digitB: number): {
  primary: number;
  secondary: number;
  combined: number;
  pattern: string;
  flow: string;
} {
  const primary = (digitA + digitB) % ZEROPOINT_CONFIG.MODULO_BASE;
  const adjustedPrimary = primary === 0 ? ZEROPOINT_CONFIG.ZERO_REPLACEMENT : primary;
  const secondary = (digitA + digitB) / adjustedPrimary;
  const combined = adjustedPrimary + Math.abs(secondary);
  
  const pattern = Number.isInteger(secondary) ? DUAL_VORTEX_PATTERNS.HARMONY : DUAL_VORTEX_PATTERNS.RESONANCE;
  const flow = Math.abs(secondary - Math.round(secondary)) < 0.1 ? VORTEX_FLOW_TYPES.HARMONIC : VORTEX_FLOW_TYPES.CONSCIOUSNESS;
  
  return {
    primary: adjustedPrimary,
    secondary,
    combined,
    pattern,
    flow
  };
}

/**
 * Generate dual vortex matrix
 */
export function generateDualVortexMatrix(): {
  matrix: any[][];
  consciousness: number;
  patterns: Record<string, number>;
  gateways: any[];
} {
  const matrix = [];
  let totalConsciousness = 0;
  const patterns: Record<string, number> = {
    convergence: 0,
    divergence: 0,
    resonance: 0,
    harmony: 0,
    gateway: 0
  };
  const gateways: any[] = [];
  
  for (let a = 0; a <= 9; a++) {
    const row = [];
    for (let b = 0; b <= 9; b++) {
      const dualVortex = analyzeDualVortexFlow(a, b);
      const consciousness = calculateDualVortexConsciousness(a, b);
      
      row.push({
        position: `${a}/${b}`,
        archetypes: [DIGIT_ARCHETYPES[a], DIGIT_ARCHETYPES[b]],
        dualVortex,
        consciousness,
        pattern: dualVortex.pattern,
        gateway: dualVortex.convergence
      });
      
      totalConsciousness += consciousness.combined;
      patterns[dualVortex.pattern]++;
      if (dualVortex.convergence) {
        gateways.push({
          position: `${a}/${b}`,
          archetypes: [DIGIT_ARCHETYPES[a], DIGIT_ARCHETYPES[b]],
          consciousness: consciousness.combined
        });
      }
    }
    matrix.push(row);
  }
  
  return {
    matrix,
    consciousness: totalConsciousness,
    patterns,
    gateways
  };
}

/**
 * Analyze dual vortex flow patterns
 */
export function analyzeDualVortexFlowPatterns(): {
  patterns: any[];
  statistics: Record<string, number>;
  consciousness: number;
  gateways: any[];
} {
  const patterns: any[] = [];
  const statistics: Record<string, number> = {
    convergence: 0,
    divergence: 0,
    resonance: 0,
    harmony: 0,
    gateway: 0
  };
  let totalConsciousness = 0;
  const gateways: any[] = [];
  
  for (let a = 0; a <= 9; a++) {
    for (let b = 0; b <= 9; b++) {
      const dualVortex = analyzeDualVortexFlow(a, b);
      const consciousness = calculateDualVortexConsciousness(a, b);
      
      patterns.push({
        position: `${a}/${b}`,
        archetypes: [DIGIT_ARCHETYPES[a], DIGIT_ARCHETYPES[b]],
        dualVortex,
        consciousness,
        pattern: dualVortex.pattern,
        gateway: dualVortex.convergence
      });
      
      totalConsciousness += consciousness.combined;
      statistics[dualVortex.pattern]++;
      
      if (dualVortex.convergence) {
        gateways.push({
          position: `${a}/${b}`,
          archetypes: [DIGIT_ARCHETYPES[a], DIGIT_ARCHETYPES[b]],
          consciousness: consciousness.combined
        });
      }
    }
  }
  
  return {
    patterns,
    statistics,
    consciousness: totalConsciousness,
    gateways
  };
}

/**
 * Dual Vortex System Export
 */
export const DualVortexSystem = {
  analyzeDualVortexFlow,
  integrateDecimalVortexReversal,
  demonstrateDecimalVortexReversal,
  calculateDualVortexConsciousness,
  generateDualVortexMatrix,
  analyzeDualVortexFlowPatterns,
  DUAL_VORTEX_PATTERNS,
  VORTEX_FLOW_TYPES
}; 