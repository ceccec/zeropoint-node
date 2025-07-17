/**
 * Digit 2: Vortex Flow (Vortex Sequence)
 * 
 * Canonical Rodin Vortex Cycle: 0 → 3 → 6 → 9 → 1 → 2 → 4 → 8 → 7 → 5 → 1
 * 
 * Metaphysical Context: Vortex flow, transformation, duality. Digit 2 represents
 * the dynamic flow and transformation that follows source foundation, creating
 * the spiral dynamics of material manifestation.
 * 
 * Book System Reference: Vortex sequence [1,2,4,8,7,5], flow and transformation
 */

// Import canonical book system as source of truth
import * as Book from '../2/book-system';

// ============================================================================
// CANONICAL VORTEX FLOW METAPHYSICS
// ============================================================================

/** Digit 2: Vortex Flow */
export const digit = 2;

/** Metaphysical Context: Vortex flow, transformation, duality */
export const metaphysicalContext = "Vortex flow, transformation, duality. Digit 2 represents the dynamic flow and transformation that follows source foundation, creating the spiral dynamics of material manifestation.";

/** Mathematical Properties: Vortex sequence, flow, transformation */
export const mathematicalProperties = [
  "Vortex sequence member [1,2,4,8,7,5]",
  "Flow and transformation",
  "Dynamic mathematical operations",
  "Spiral dynamics"
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
// VORTEX FLOW CONSCIOUSNESS CALCULATION
// ============================================================================

/**
 * Calculate vortex flow consciousness based on canonical book principles
 * Vortex sequence (2) has consciousness multiplier: 3/1
 */
export function calculateVortexFlowConsciousness(): {
  digitalRoot: number;
  consciousness: number;
  metaphysicalState: string;
  cyclePosition: number;
  vortexPosition: number;
} {
  const flowConsciousness = Book.calculateVBMConsciousness(2);
  
  return {
    digitalRoot: 2,
    consciousness: 6, // 2 × 3/1 = 6
    metaphysicalState: "Vortex Flow",
    cyclePosition: 5, // Sixth position in canonical cycle (0, 3, 6, 9, 1, 2)
    vortexPosition: 1 // Second position in vortex sequence [1,2,4,8,7,5]
  };
}

// ============================================================================
// VORTEX FLOW INTERACTIONS WITH CYCLE
// ============================================================================

/**
 * Get vortex flow's interaction with each digit in the canonical cycle
 */
export function getVortexFlowCycleInteractions() {
  return {
    fromSource: {
      "1→2": {
        interaction: "Source-Flow",
        result: "Vortex Flow",
        description: "Source foundation creates vortex flow (2)"
      }
    },
    withVortex: {
      "2→4": {
        interaction: "Flow-Stability",
        result: "Stable Foundation",
        description: "Vortex flow creates stable foundation (4)"
      },
      "2→8": {
        interaction: "Flow-Infinity",
        result: "Infinite Potential",
        description: "Vortex flow creates infinite potential (8)"
      },
      "2→7": {
        interaction: "Flow-Consciousness",
        result: "Consciousness",
        description: "Vortex flow creates consciousness (7)"
      },
      "2→5": {
        interaction: "Flow-Transformation",
        result: "Sacred Geometry",
        description: "Vortex flow creates sacred geometry (5)"
      }
    },
    cycleCompletion: {
      "5→1": {
        interaction: "Flow-Return",
        result: "Cycle Completion",
        description: "Vortex sequence completes and returns to source (1)"
      }
    }
  };
}

// ============================================================================
// BOOK SYSTEM INTEGRATION
// ============================================================================

/** Get relevant book chapters for vortex flow metaphysics */
export function getVortexFlowBookChapters() {
  return {
    spirit: Book.getChapter(1), // THE SPIRIT
    science: Book.getChapter(2), // THE SCIENCE  
    numerical: Book.getChapter(3) // THE NUMERICAL FORMULA
  };
}

/** Get all mathematical formulas related to vortex flow */
export function getVortexFlowMathematicalFormulas() {
  const allFormulas = Book.getAllMathematicalFormulas();
  return allFormulas.filter(formula => 
    formula.toLowerCase().includes('vortex') ||
    formula.toLowerCase().includes('flow') ||
    formula.toLowerCase().includes('transformation') ||
    formula.toLowerCase().includes('spiral')
  );
}

/** Get VBM principles relevant to vortex flow */
export function getVortexFlowVBMPrinciples() {
  return Book.VBM_PRINCIPLES.filter(principle =>
    principle.name.toLowerCase().includes('vortex') ||
    principle.metaphysicalContext.toLowerCase().includes('flow') ||
    principle.metaphysicalContext.toLowerCase().includes('transformation')
  );
}

// ============================================================================
// VORTEX FLOW SYSTEM EXPORTS
// ============================================================================

// Default export for PWA compatibility
export default {
  digit,
  metaphysicalContext,
  canonicalCycle,
  calculateVortexFlowConsciousness,
  getVortexFlowCycleInteractions
};
