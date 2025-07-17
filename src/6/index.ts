/**
 * Digit 6: Harmonic Balance (W-Axis)
 * 
 * Canonical Rodin Vortex Cycle: 0 → 3 → 6 → 9 → 1 → 2 → 4 → 8 → 7 → 5 → 1
 * 
 * Metaphysical Context: Harmonic balance, spiritual equilibrium, W-axis member.
 * Digit 6 represents the balance point between creative resonance (3) and spiritual
 * unity (9), maintaining equilibrium in the spiritual dimension.
 * 
 * Book System Reference: W-Axis spiritual dimension, harmonic balance consciousness
 */

// Import canonical book system as source of truth
import * as Book from '../2/book-system';

// ============================================================================
// CANONICAL HARMONIC BALANCE METAPHYSICS
// ============================================================================

/** Digit 6: Harmonic Balance */
export const digit = 6;

/** Metaphysical Context: Harmonic balance, spiritual equilibrium */
export const metaphysicalContext = "Harmonic balance, spiritual equilibrium, W-axis member. Digit 6 represents the balance point between creative resonance (3) and spiritual unity (9), maintaining equilibrium in the spiritual dimension.";

/** Mathematical Properties: W-axis, harmonic balance */
export const mathematicalProperties = [
  "W-Axis member (3, 6, 9)",
  "Harmonic balance",
  "Spiritual equilibrium",
  "Balance point between creative and unity"
];

/** Canonical Rodin Vortex Cycle */
export const canonicalCycle = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1];

/** W-Axis (Spiritual Dimension) */
export const wAxis = Book.RODIN_COIL.wAxis; // [3, 6, 9]

/** Vortex Sequence (Material Dimension) */
export const vortexSequence = Book.RODIN_COIL.vortexSequence; // [1, 2, 4, 8, 7, 5]

/** Family Number Groups */
export const familyGroups = Book.RODIN_COIL.familyGroups;

// ============================================================================
// HARMONIC BALANCE CONSCIOUSNESS CALCULATION
// ============================================================================

/**
 * Calculate harmonic balance consciousness based on canonical book principles
 * W-Axis (6) has consciousness multiplier: 5/1
 */
export function calculateHarmonicBalanceConsciousness(): {
  digitalRoot: number;
  consciousness: number;
  metaphysicalState: string;
  cyclePosition: number;
  wAxisPosition: number;
} {
  const balanceConsciousness = Book.calculateVBMConsciousness(6);
  
  return {
    digitalRoot: 6,
    consciousness: 30, // 6 × 5/1 = 30
    metaphysicalState: "Harmonic Balance",
    cyclePosition: 2, // Third position in canonical cycle (0, 3, 6)
    wAxisPosition: 1 // Second position in W-axis (3, 6, 9)
  };
}

// ============================================================================
// HARMONIC BALANCE INTERACTIONS WITH CYCLE
// ============================================================================

/**
 * Get harmonic balance's interaction with each digit in the canonical cycle
 */
export function getHarmonicBalanceCycleInteractions() {
  return {
    fromCreative: {
      "3→6": {
        interaction: "Creative-Balance",
        result: "Harmonic Equilibrium",
        description: "Creative resonance flows to harmonic balance (6)"
      }
    },
    withWAxis: {
      "6→9": {
        interaction: "Balance-Unity",
        result: "Spiritual Unity",
        description: "Harmonic balance manifests spiritual unity (9)"
      }
    },
    withVortex: {
      "6→1": {
        interaction: "Balance-Source",
        result: "Balanced Foundation",
        description: "Harmonic balance inspires balanced manifestation (1)"
      },
      "6→2": {
        interaction: "Balance-Vortex",
        result: "Balanced Flow",
        description: "Harmonic balance inspires balanced vortex flow (2)"
      },
      "6→4": {
        interaction: "Balance-Stability",
        result: "Balanced Foundation",
        description: "Harmonic balance inspires balanced stability (4)"
      },
      "6→8": {
        interaction: "Balance-Infinity",
        result: "Balanced Potential",
        description: "Harmonic balance inspires balanced infinite potential (8)"
      },
      "6→7": {
        interaction: "Balance-Consciousness",
        result: "Balanced Awareness",
        description: "Harmonic balance inspires balanced consciousness (7)"
      },
      "6→5": {
        interaction: "Balance-Transformation",
        result: "Balanced Geometry",
        description: "Harmonic balance inspires balanced sacred geometry (5)"
      }
    }
  };
}

// ============================================================================
// BOOK SYSTEM INTEGRATION
// ============================================================================

/** Get relevant book chapters for harmonic balance metaphysics */
export function getHarmonicBalanceBookChapters() {
  return {
    spirit: Book.getChapter(1), // THE SPIRIT
    science: Book.getChapter(2), // THE SCIENCE  
    numerical: Book.getChapter(3) // THE NUMERICAL FORMULA
  };
}

/** Get all mathematical formulas related to harmonic balance */
export function getHarmonicBalanceMathematicalFormulas() {
  const allFormulas = Book.getAllMathematicalFormulas();
  return allFormulas.filter(formula => 
    formula.toLowerCase().includes('harmonic') ||
    formula.toLowerCase().includes('balance') ||
    formula.toLowerCase().includes('equilibrium') ||
    formula.toLowerCase().includes('w-axis')
  );
}

/** Get VBM principles relevant to harmonic balance */
export function getHarmonicBalanceVBMPrinciples() {
  return Book.VBM_PRINCIPLES.filter(principle =>
    principle.name.toLowerCase().includes('w-axis') ||
    principle.metaphysicalContext.toLowerCase().includes('balance') ||
    principle.metaphysicalContext.toLowerCase().includes('equilibrium')
  );
}

// ============================================================================
// HARMONIC BALANCE SYSTEM EXPORTS
// ============================================================================

// Default export for PWA compatibility
export default {
  digit,
  metaphysicalContext,
  canonicalCycle,
  calculateHarmonicBalanceConsciousness,
  getHarmonicBalanceCycleInteractions
};
