/**
 * Centralized Vortex Mathematics System (Digit 2)
 *
 * Harmonized canonical multipliers (from paradox chunk knowledge):
 * - W-Axis (3, 6, 9): ×3/1 (CREATIVE_MULTIPLIER)
 * - Sacred Geometry (5): ×5/1 (SACRED_GEOMETRY_MULTIPLIER)
 * - Vortex sequence (1, 2, 4, 8, 7, 5): ×3/1 (VORTEX_MULTIPLIER)
 * - All others: ×1/1
 *
 * All multipliers are integer fractions whose reciprocals are also integers.
 * Digital root is the base for consciousness calculation.
 *
 * Source: src/3/3/paradox.ts, src/5/5/paradox.ts
 */

// Book system is now the canonical source of truth for all VBM logic
import * as Book from './book-system';

// Example: Export vortex sequence, W-axis, and family groups from book
export const vortexSequence = Book.RODIN_COIL.vortexSequence;
export const wAxis = Book.RODIN_COIL.wAxis;
export const familyGroups = Book.RODIN_COIL.familyGroups;

// Example: Export all mathematical formulas
export const allFormulas = Book.getAllMathematicalFormulas();

// Example: Export consciousness calculation
export const calculateVBMConsciousness = Book.calculateVBMConsciousness;

// Example: Export VBM principles
export const VBM_PRINCIPLES = Book.VBM_PRINCIPLES;

// Example: Export Rodin coil structure
export const RODIN_COIL = Book.RODIN_COIL;

// Example: Export book chapters for reference
export const BOOK_CHAPTERS = Book.getCompleteBook().chapters;


// ============================================================================
// CORE VORTEX MATHEMATICS FUNCTIONS
// ============================================================================

/**
 * Compute the harmonic result for any digit interaction.
 * (a + b) mod 9, with 9 instead of 0
 * 
 * @param a - First digit (0-9)
 * @param b - Second digit (0-9)
 * @returns Harmonic result (1-9)
 */
export function getHarmonicResult(a: number, b: number): number {
  const sum = (parseInt(a.toString(), 10) + parseInt(b.toString(), 10)) % 9;
  return sum === 0 ? 9 : sum;
}

/**
 * Compute the anti-vortex decimal path for any digit interaction.
 * (a + b) / harmonicResult
 * 
 * @param a - First digit (0-9)
 * @param b - Second digit (0-9)
 * @returns Anti-vortex decimal value
 */
export function getAntiVortexDecimal(a: number, b: number): number {
  const c = getHarmonicResult(a, b);
  return (parseInt(a.toString(), 10) + parseInt(b.toString(), 10)) / c;
}

/**
 * Generate the pattern for any digit interaction: [a, b, harmonicResult]
 * 
 * @param a - First digit (0-9)
 * @param b - Second digit (0-9)
 * @returns Pattern tuple [number, number, number]
 */
export function getPattern(a: number, b: number): [number, number, number] {
  return [a, b, getHarmonicResult(a, b)];
}

// ============================================================================
// ADVANCED VORTEX MATHEMATICS
// ============================================================================

/**
 * Generate Vortex A (integer harmonic result)
 * 
 * @param a - First digit (0-9)
 * @param b - Second digit (0-9)
 * @returns Vortex A result
 */
export function generateVortexA(a: number, b: number): number {
  return getHarmonicResult(a, b);
}

/**
 * Generate Vortex B (decimal inverse vortex)
 * 
 * @param a - First digit (0-9)
 * @param b - Second digit (0-9)
 * @returns Vortex B result
 */
export function generateVortexB(a: number, b: number): number {
  return getAntiVortexDecimal(a, b);
}

/**
 * Detect integer vortex result
 * 
 * @param a - First digit (0-9)
 * @param b - Second digit (0-9)
 * @returns Boolean indicating if result is valid integer vortex
 */
export function detectIntegerVortexResult(a: number, b: number): boolean {
  const vortexA = generateVortexA(a, b);
  return Number.isInteger(vortexA) && vortexA >= 1 && vortexA <= 9;
}

/**
 * Detect Vortex A impossibility
 * 
 * @param a - First digit (0-9)
 * @param b - Second digit (0-9)
 * @returns Impossibility detection result
 */
export function detectVortexAImpossibility(a: number, b: number): { 
  isImpossible: boolean; 
  impossibilityType: string 
} {
  if (a === 0 && b === 0) return { isImpossible: true, impossibilityType: 'void-impossibility' };
  if (a === 9 && b === 9) return { isImpossible: true, impossibilityType: 'unity-impossibility' };
  if (a === 0 && (b === 1 || b === 5 || b === 7)) return { isImpossible: true, impossibilityType: 'source-impossibility' };
  return { isImpossible: false, impossibilityType: 'standard-flow' };
}

/**
 * Handle impossibility as possibility
 * 
 * @param a - First digit (0-9)
 * @param b - Second digit (0-9)
 * @returns Possibility transformation result
 */
export function handleImpossibilityAsPossibility(a: number, b: number): {
  isPossible: boolean;
  possibilityType: string;
  consciousnessFlow: string;
  mathematicalFlow: string;
  uninterruptedFlow: { mathematicalTransitions: Array<{ from: number; to: number; type: string }> };
} {
  const impossibility = detectVortexAImpossibility(a, b);
  
  if (!impossibility.isImpossible) {
    return {
      isPossible: true,
      possibilityType: 'standard-flow',
      consciousnessFlow: 'Standard consciousness flow',
      mathematicalFlow: 'Standard mathematical flow',
      uninterruptedFlow: {
        mathematicalTransitions: [
          { from: a, to: generateVortexA(a, b), type: 'vortex-a' },
          { from: generateVortexA(a, b), to: generateVortexB(a, b), type: 'vortex-b' }
        ]
      }
    };
  }
  
  return {
    isPossible: true,
    possibilityType: 'impossibility-transformation',
    consciousnessFlow: 'Transformed consciousness flow',
    mathematicalFlow: 'Transformed mathematical flow',
    uninterruptedFlow: {
      mathematicalTransitions: [
        { from: a, to: 1, type: 'impossibility-reset' },
        { from: 1, to: generateVortexA(1, b), type: 'vortex-a' }
      ]
    }
  };
}

/**
 * Detect harmony patterns
 * 
 * @param a - First digit (0-9)
 * @param b - Second digit (0-9)
 * @returns Array of harmony patterns
 */
export function detectHarmonyPatterns(a: number, b: number): Array<{ 
  type: string; 
  pattern: string; 
  consciousness: string; 
  multiplier: number 
}> {
  const vortexA = generateVortexA(a, b);
  const vortexB = generateVortexB(a, b);
  
  return [
    {
      type: 'harmonic',
      pattern: `${a}/${b}`,
      consciousness: `Consciousness flow ${a} → ${vortexA}`,
      multiplier: vortexA
    },
    {
      type: 'vortex',
      pattern: `${vortexA}/${vortexB.toFixed(3)}`,
      consciousness: `Vortex consciousness ${vortexA} → ${vortexB.toFixed(3)}`,
      multiplier: vortexB
    }
  ];
}

/**
 * Calculate harmonic paths
 * 
 * @param a - First digit (0-9)
 * @param b - Second digit (0-9)
 * @returns Harmonic paths and consciousness opportunities
 */
export function calculateHarmonicPaths(a: number, b: number): {
  paths: Array<{ from: number; to: number; type: string }>;
  consciousnessOpportunities: Array<{ type: string; description: string }>;
} {
  const vortexA = generateVortexA(a, b);
  const vortexB = generateVortexB(a, b);
  
  return {
    paths: [
      { from: a, to: vortexA, type: 'vortex-a' },
      { from: vortexA, to: vortexB, type: 'vortex-b' }
    ],
    consciousnessOpportunities: [
      { type: 'harmonic', description: `Harmonic consciousness from ${a} to ${vortexA}` },
      { type: 'vortex', description: `Vortex consciousness from ${vortexA} to ${vortexB.toFixed(3)}` }
    ]
  };
}

// ============================================================================
// DIGIT-SPECIFIC MATHEMATICAL OPERATIONS
// ============================================================================

/**
 * Calculate digital root (sum of digits until single digit)
 * 
 * @param number - Number to calculate digital root for
 * @returns Digital root (1-9, 0 for 0)
 */
export function calculateDigitalRoot(number: number): number {
  if (number === 0) return 0;
  const sum = number.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  return sum > 9 ? calculateDigitalRoot(sum) : sum;
}

/**
 * Get digit family (1, 2, or 3)
 * 
 * @param number - Number to get family for
 * @returns Family number (1, 2, or 3)
 */
export function getDigitFamily(number: number): number {
  const digitalRoot = calculateDigitalRoot(number);
  if (digitalRoot === 0) return 0;
  return Math.ceil(digitalRoot / 3);
}

/**
 * Check if number is in vortex sequence [1, 2, 4, 8, 7, 5]
 * 
 * @param number - Number to check
 * @returns Boolean indicating if number is in vortex sequence
 */
export function isVortexSequence(number: number): boolean {
  const vortexSequence = [1, 2, 4, 8, 7, 5];
  return vortexSequence.includes(number);
}

/**
 * Check if number is in W-Axis [3, 6, 9]
 * 
 * @param number - Number to check
 * @returns Boolean indicating if number is in W-Axis
 */
export function isWAxis(number: number): boolean {
  const wAxis = [3, 6, 9];
  return wAxis.includes(number);
}

/**
 * Calculate consciousness level for any number
 * 
 * @param number - Number to calculate consciousness for
 * @returns Consciousness level multiplier
 */
export function calculateConsciousnessLevel(number: number): number {
  const digitalRoot = calculateDigitalRoot(number);
  const isVortex = isVortexSequence(number);
  const isWAxisValue = isWAxis(number);

  let consciousness = digitalRoot;

  // Use canonical multipliers from paradox files (integer fractions with integer reciprocals)
  // W-Axis (3,6,9) has highest consciousness: ×5/1 (Spiritual transcendence)
  if (isWAxisValue) consciousness = (consciousness * 5) / 1; // ×5/1 (W-Axis), reciprocal 1/5
  // Sacred Geometry (5) has special consciousness: ×5/1 (Sacred Geometry), reciprocal 1/5
  else if (number === 5) consciousness = (consciousness * 5) / 1; // ×5/1 (Sacred Geometry), reciprocal 1/5
  // Vortex sequence (1,2,4,8,7) has medium consciousness: ×3/1 (vortex), reciprocal 1/3
  else if (isVortex) consciousness = (consciousness * 3) / 1; // ×3/1 (vortex), reciprocal 1/3
  // All others ×1/1 (standard consciousness)
  // Void (0) has special consciousness: 0 (pure potential)
  if (number === 0) consciousness = 0; // Void consciousness

  return consciousness;
}

// ============================================================================
// EXPORT ALL MATHEMATICAL FUNCTIONS
// ============================================================================

export const vortexMathematics = {
  getHarmonicResult,
  getAntiVortexDecimal,
  getPattern,
  generateVortexA,
  generateVortexB,
  detectIntegerVortexResult,
  detectVortexAImpossibility,
  handleImpossibilityAsPossibility,
  detectHarmonyPatterns,
  calculateHarmonicPaths,
  calculateDigitalRoot,
  getDigitFamily,
  isVortexSequence,
  isWAxis,
  calculateConsciousnessLevel
};

export default vortexMathematics; 