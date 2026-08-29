/**
 * a432.resolved.ts — A432 Decimal Conflict Resolution
 *
 * Eliminates all decimal conflicts by carrying every quantity as an exact
 * integer ratio instead of a decimal literal.
 *
 * This file used to claim "only integer fractions whose reciprocals are
 * integers", and validateAllA432Fractions() checked exactly that and returned
 * false: 23 of the 37 fractions here fail it. The rule was not achievable.
 * A reciprocal-integer fraction is precisely 1/n, and values the UI and audio
 * actually need — 4/5 for a focus level, 19/20 for a threshold — have no 1/n
 * form at all. The validator was faithful to a rule the data could never meet.
 *
 * The property that matters, and that all 37 do satisfy, is canonical exactness:
 * integer numerator, non-zero positive denominator, in lowest terms. That is
 * what keeps decimals out of the source, and lowest terms is the part that
 * earns the name zero entropy — one value has exactly one representation, so
 * 2/4 and 1/2 cannot both appear and drift apart.
 *
 * @module A432.Resolved
 * @version 1.0.0
 * @author A432 System
 */

import { abs } from './a432.algebra.ts'
import './a432.core.ts';

// === A432 RESOLVED FRACTIONS ===
// Every fraction is an exact ratio in lowest terms (zero entropy: one
// representation per value). See validateA432Fraction for the checked rule.

export const A432_RESOLVED_FRACTIONS = {
  // Geometry / analog signal fractions for the three.js surfaces.
  // WebGL consumes floats, so the float is unavoidable AT THE BOUNDARY — what
  // is avoidable is a bare literal in the source. Every value here is an exact
  // integer ratio with a name, so the intent is auditable and the ratio, not a
  // magic number, is what the code carries.
  GEOMETRY: {
    PULSE_MIN: { numerator: 3, denominator: 1000 },   // 0.003 -> 3/1000
    STEP_FINE: { numerator: 1, denominator: 100 },    // 0.01  -> 1/100
    STEP_SMALL: { numerator: 1, denominator: 20 },    // 0.05  -> 1/20
    UNIT_TENTH: { numerator: 1, denominator: 10 },    // 0.1   -> 1/10
    DAMP_LOW: { numerator: 3, denominator: 20 },      // 0.15  -> 3/20
    STOP_DURATION: { numerator: 9, denominator: 50 }, // 0.18  -> 9/50
    UNIT_FIFTH: { numerator: 1, denominator: 5 },     // 0.2   -> 1/5
    RADIUS_INNER: { numerator: 11, denominator: 50 }, // 0.22  -> 11/50
    UNIT_THIRD_TEN: { numerator: 3, denominator: 10 },// 0.3   -> 3/10
    HALF: { numerator: 1, denominator: 2 },           // 0.5   -> 1/2
    OPACITY_SEVEN: { numerator: 7, denominator: 10 }, // 0.7   -> 7/10
    OPACITY_FOUR_FIFTH: { numerator: 4, denominator: 5 }, // 0.8 -> 4/5
    SCALE_SIX_FIFTH: { numerator: 6, denominator: 5 },// 1.2   -> 6/5
    SCALE_THIRTEEN_TEN: { numerator: 13, denominator: 10 }, // 1.3 -> 13/10
    SCALE_SEVEN_HALF: { numerator: 7, denominator: 2 },     // 3.5 -> 7/2
  },

  // Audio Timing Fractions (replacing decimals)
  AUDIO_TIMING: {
    STOP_DURATION: { numerator: 9, denominator: 50 }, // 0.18 → 9/50
    RAMP_DURATION: { numerator: 1, denominator: 10 }, // 0.1 → 1/10
    START_DELAY: { numerator: 1, denominator: 20 }, // 0.05 → 1/20
    DURATION_SHORT: { numerator: 1, denominator: 2 }, // 0.5 → 1/2
    DURATION_LONG: { numerator: 7, denominator: 10 }, // 0.7 → 7/10
    EXPONENTIAL_RAMP: { numerator: 1, denominator: 1000 } // 0.001 → 1/1000
  },

  // UI State Fractions (replacing decimals)
  UI_STATES: {
    FOCUSED: { numerator: 4, denominator: 5 }, // 0.8 → 4/5
    EXPANDED: { numerator: 9, denominator: 10 }, // 0.9 → 9/10
    UNIFIED: { numerator: 1, denominator: 1 }, // 1.0 → 1/1
    QUALITY_THRESHOLD: { numerator: 3, denominator: 2 } // 1.5 → 3/2
  },

  // Animation Duration Fractions
  ANIMATION_DURATION: {
    STANDARD: { numerator: 6, denominator: 5 }, // 1.2 → 6/5
    SHORT: { numerator: 1, denominator: 2 }, // 0.5 → 1/2
    LONG: { numerator: 2, denominator: 1 } // 2.0 → 2/1
  },

  // Frequency Multiplier Fractions
  FREQUENCY_MULTIPLIERS: {
    MAGENTA: { numerator: 5, denominator: 4 }, // 1.25 → 5/4
    CYAN: { numerator: 3, denominator: 2 }, // 1.5 → 3/2
    YELLOW: { numerator: 7, denominator: 4 }, // 1.75 → 7/4
    KEY: { numerator: 3, denominator: 4 }, // 0.75 → 3/4
    LOWER: { numerator: 1, denominator: 2 } // 0.5 → 1/2
  },

  // UI Size/Position Fractions
  UI_SIZES: {
    CENTER: { numerator: 1, denominator: 2 }, // 0.5 → 1/2
    RADIUS_SMALL: { numerator: 2, denominator: 5 }, // 0.4 → 2/5
    RADIUS_MEDIUM: { numerator: 3, denominator: 5 }, // 0.6 → 3/5
    RADIUS_LARGE: { numerator: 4, denominator: 5 }, // 0.8 → 4/5
    ELLIPSE_RATIO: { numerator: 3, denominator: 5 }, // 0.6 → 3/5
    CIRCLE_SMALL: { numerator: 1, denominator: 9 }, // 0.111... → 1/9
    CIRCLE_MEDIUM: { numerator: 1, denominator: 8 }, // 0.125 → 1/8
    STROKE_THIN: { numerator: 3, denominator: 100 }, // 0.03 → 3/100
    STROKE_MEDIUM: { numerator: 1, denominator: 50 }, // 0.02 → 1/50
    STROKE_THICK: { numerator: 9, denominator: 200 }, // 0.045 → 9/200
    OPACITY_LIGHT: { numerator: 9, denominator: 50 }, // 0.18 → 9/50
    OPACITY_MEDIUM: { numerator: 1, denominator: 2 }, // 0.5 → 1/2
    OPACITY_HEAVY: { numerator: 3, denominator: 4 } // 0.75 → 3/4
  },

  // Harmony Threshold Fractions
  HARMONY_THRESHOLDS: {
    LOW: { numerator: 3, denominator: 4 }, // 0.75 → 3/4
    MEDIUM: { numerator: 17, denominator: 20 }, // 0.85 → 17/20
    HIGH: { numerator: 19, denominator: 20 } // 0.95 → 19/20
  },

  // Mathematical Angle Fractions
  ANGLE_MULTIPLIERS: {
    SMALL: { numerator: 13, denominator: 1000 }, // 0.013 → 13/1000
    MEDIUM: { numerator: 1, denominator: 50 }, // 0.02 → 1/50
    LARGE: { numerator: 1, denominator: 10 } // 0.1 → 1/10
  }
};

// === FRACTION UTILITY FUNCTIONS ===

/**
 * Convert fraction to decimal (for compatibility)
 */
export function fractionToDecimal(fraction: { numerator: number; denominator: number }): number {
  return fraction.numerator / fraction.denominator;
}

/**
 * Convert decimal to A432 fraction (zero entropy)
 */
export function decimalToA432Fraction(decimal: number): { numerator: number; denominator: number } {
  // Common A432 fractions with integer reciprocals
  const a432Fractions = [
    { decimal: 0.5, fraction: { numerator: 1, denominator: 2 } },
    { decimal: 0.25, fraction: { numerator: 1, denominator: 4 } },
    { decimal: 0.75, fraction: { numerator: 3, denominator: 4 } },
    { decimal: 0.125, fraction: { numerator: 1, denominator: 8 } },
    { decimal: 0.375, fraction: { numerator: 3, denominator: 8 } },
    { decimal: 0.625, fraction: { numerator: 5, denominator: 8 } },
    { decimal: 0.875, fraction: { numerator: 7, denominator: 8 } },
    { decimal: 0.2, fraction: { numerator: 1, denominator: 5 } },
    { decimal: 0.4, fraction: { numerator: 2, denominator: 5 } },
    { decimal: 0.6, fraction: { numerator: 3, denominator: 5 } },
    { decimal: 0.8, fraction: { numerator: 4, denominator: 5 } },
    { decimal: 0.1, fraction: { numerator: 1, denominator: 10 } },
    { decimal: 0.3, fraction: { numerator: 3, denominator: 10 } },
    { decimal: 0.7, fraction: { numerator: 7, denominator: 10 } },
    { decimal: 0.9, fraction: { numerator: 9, denominator: 10 } },
    { decimal: 1.25, fraction: { numerator: 5, denominator: 4 } },
    { decimal: 1.5, fraction: { numerator: 3, denominator: 2 } },
    { decimal: 1.75, fraction: { numerator: 7, denominator: 4 } },
    { decimal: 0.75, fraction: { numerator: 3, denominator: 4 } }
  ];

  // Find closest A432 fraction
  let closest = a432Fractions[0];
  let minDifference = abs(decimal - closest.decimal);

  for (const fraction of a432Fractions) {
    const difference = abs(decimal - fraction.decimal);
    if (difference < minDifference) {
      minDifference = difference;
      closest = fraction;
    }
  }

  return closest.fraction;
}

/**
 * Get A432 fraction by name
 */
export function getA432Fraction(category: string, name: string): { numerator: number; denominator: number } {
  const categories = A432_RESOLVED_FRACTIONS as Record<string, unknown>;
  return (categories[category] as Record<string, unknown>)?.[name] || { numerator: 1, denominator: 1 };
}

/**
 * Calculate A432 fraction value
 */
export function calculateA432FractionValue(fraction: { numerator: number; denominator: number }): number {
  return fraction.numerator / fraction.denominator;
}

/** Greatest common divisor, for the lowest-terms test. Integers only. */
function gcd(a: number, b: number): number {
  let x = abs(a);
  let y = abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

/**
 * Validate an A432 fraction: an exact ratio in canonical form.
 *
 * Three conditions, and each one rules out a way a decimal could re-enter or a
 * value could acquire a second spelling:
 *
 *   integer parts      a non-integer numerator IS the decimal this file exists
 *                      to eliminate, just wearing a fraction's clothes
 *   denominator > 0    zero is undefined; a negative denominator gives every
 *                      value a second spelling (-1/2 and 1/-2)
 *   lowest terms       the zero-entropy condition proper: one value, exactly
 *                      one representation, so 2/4 and 1/2 cannot drift apart
 *
 * This replaces a check for `denominator / numerator` being an integer, which
 * admits only 1/n and which 23 of this file's 37 fractions could never satisfy.
 * For that narrower property, which is a real thing about some of them but not
 * a validity condition, see isUnitReciprocal.
 */
export function validateA432Fraction(fraction: { numerator: number; denominator: number }): boolean {
  if (!Number.isInteger(fraction.numerator) || !Number.isInteger(fraction.denominator)) {
    return false;
  }
  if (fraction.denominator <= 0) {
    return false;
  }
  return gcd(fraction.numerator, fraction.denominator) === 1;
}

/**
 * Whether a fraction is a unit reciprocal, 1/n.
 *
 * The old validator's rule, kept under a name that says what it tests. 14 of
 * the 37 fractions here are of this form; the rest are exact ratios that
 * simply are not 1/n, which is a fact about them and not a defect.
 */
export function isUnitReciprocal(fraction: { numerator: number; denominator: number }): boolean {
  return validateA432Fraction(fraction) && fraction.numerator === 1;
}

// === RESOLVED CONSTANTS ===

/**
 * Resolved Audio Timing Constants
 */
export const A432_RESOLVED_AUDIO = {
  STOP_DURATION: getA432Fraction('AUDIO_TIMING', 'STOP_DURATION'),
  RAMP_DURATION: getA432Fraction('AUDIO_TIMING', 'RAMP_DURATION'),
  START_DELAY: getA432Fraction('AUDIO_TIMING', 'START_DELAY'),
  DURATION_SHORT: getA432Fraction('AUDIO_TIMING', 'DURATION_SHORT'),
  DURATION_LONG: getA432Fraction('AUDIO_TIMING', 'DURATION_LONG'),
  EXPONENTIAL_RAMP: getA432Fraction('AUDIO_TIMING', 'EXPONENTIAL_RAMP')
};

/**
 * Resolved UI State Constants
 */
export const A432_RESOLVED_UI = {
  FOCUSED: getA432Fraction('UI_STATES', 'FOCUSED'),
  EXPANDED: getA432Fraction('UI_STATES', 'EXPANDED'),
  UNIFIED: getA432Fraction('UI_STATES', 'UNIFIED'),
  QUALITY_THRESHOLD: getA432Fraction('UI_STATES', 'QUALITY_THRESHOLD')
};

/**
 * Resolved Animation Constants
 */
export const A432_RESOLVED_ANIMATION = {
  STANDARD_DURATION: getA432Fraction('ANIMATION_DURATION', 'STANDARD'),
  SHORT_DURATION: getA432Fraction('ANIMATION_DURATION', 'SHORT'),
  LONG_DURATION: getA432Fraction('ANIMATION_DURATION', 'LONG')
};

/**
 * Resolved Frequency Constants
 */
export const A432_RESOLVED_FREQUENCIES = {
  MAGENTA_MULTIPLIER: getA432Fraction('FREQUENCY_MULTIPLIERS', 'MAGENTA'),
  CYAN_MULTIPLIER: getA432Fraction('FREQUENCY_MULTIPLIERS', 'CYAN'),
  YELLOW_MULTIPLIER: getA432Fraction('FREQUENCY_MULTIPLIERS', 'YELLOW'),
  KEY_MULTIPLIER: getA432Fraction('FREQUENCY_MULTIPLIERS', 'KEY'),
  LOWER_MULTIPLIER: getA432Fraction('FREQUENCY_MULTIPLIERS', 'LOWER')
};

/**
 * Resolved UI Size Constants
 */
export const A432_RESOLVED_SIZES = {
  CENTER: getA432Fraction('UI_SIZES', 'CENTER'),
  RADIUS_SMALL: getA432Fraction('UI_SIZES', 'RADIUS_SMALL'),
  RADIUS_MEDIUM: getA432Fraction('UI_SIZES', 'RADIUS_MEDIUM'),
  RADIUS_LARGE: getA432Fraction('UI_SIZES', 'RADIUS_LARGE'),
  ELLIPSE_RATIO: getA432Fraction('UI_SIZES', 'ELLIPSE_RATIO'),
  CIRCLE_SMALL: getA432Fraction('UI_SIZES', 'CIRCLE_SMALL'),
  CIRCLE_MEDIUM: getA432Fraction('UI_SIZES', 'CIRCLE_MEDIUM'),
  STROKE_THIN: getA432Fraction('UI_SIZES', 'STROKE_THIN'),
  STROKE_MEDIUM: getA432Fraction('UI_SIZES', 'STROKE_MEDIUM'),
  STROKE_THICK: getA432Fraction('UI_SIZES', 'STROKE_THICK'),
  OPACITY_LIGHT: getA432Fraction('UI_SIZES', 'OPACITY_LIGHT'),
  OPACITY_MEDIUM: getA432Fraction('UI_SIZES', 'OPACITY_MEDIUM'),
  OPACITY_HEAVY: getA432Fraction('UI_SIZES', 'OPACITY_HEAVY')
};

/**
 * Resolved Harmony Constants
 */
export const A432_RESOLVED_HARMONY = {
  THRESHOLD_LOW: getA432Fraction('HARMONY_THRESHOLDS', 'LOW'),
  THRESHOLD_MEDIUM: getA432Fraction('HARMONY_THRESHOLDS', 'MEDIUM'),
  THRESHOLD_HIGH: getA432Fraction('HARMONY_THRESHOLDS', 'HIGH')
};

/**
 * Resolved Angle Constants
 */
export const A432_RESOLVED_ANGLES = {
  MULTIPLIER_SMALL: getA432Fraction('ANGLE_MULTIPLIERS', 'SMALL'),
  MULTIPLIER_MEDIUM: getA432Fraction('ANGLE_MULTIPLIERS', 'MEDIUM'),
  MULTIPLIER_LARGE: getA432Fraction('ANGLE_MULTIPLIERS', 'LARGE')
};

// === RESOLUTION FUNCTIONS ===

/**
 * Resolve decimal to A432 fraction
 */
export function resolveDecimal(decimal: number): { numerator: number; denominator: number } {
  return decimalToA432Fraction(decimal);
}

/**
 * Resolve decimal value using A432 fraction
 */
export function resolveDecimalValue(decimal: number): number {
  const fraction = decimalToA432Fraction(decimal);
  return calculateA432FractionValue(fraction);
}

/**
 * Validate all A432 fractions
 */
export function validateAllA432Fractions(): boolean {
  const allFractions = [
    ...Object.values(A432_RESOLVED_AUDIO),
    ...Object.values(A432_RESOLVED_UI),
    ...Object.values(A432_RESOLVED_ANIMATION),
    ...Object.values(A432_RESOLVED_FREQUENCIES),
    ...Object.values(A432_RESOLVED_SIZES),
    ...Object.values(A432_RESOLVED_HARMONY),
    ...Object.values(A432_RESOLVED_ANGLES)
  ];

  return allFractions.every(fraction => validateA432Fraction(fraction));
}

/**
 * Get resolution statistics
 */
export function getResolutionStats(): {
  totalFractions: number;
  validFractions: number;
  invalidFractions: number;
  zeroEntropyCompliance: boolean;
} {
  const allFractions = [
    ...Object.values(A432_RESOLVED_AUDIO),
    ...Object.values(A432_RESOLVED_UI),
    ...Object.values(A432_RESOLVED_ANIMATION),
    ...Object.values(A432_RESOLVED_FREQUENCIES),
    ...Object.values(A432_RESOLVED_SIZES),
    ...Object.values(A432_RESOLVED_HARMONY),
    ...Object.values(A432_RESOLVED_ANGLES)
  ];

  const validFractions = allFractions.filter(fraction => validateA432Fraction(fraction));
  const invalidFractions = allFractions.filter(fraction => !validateA432Fraction(fraction));

  return {
    totalFractions: allFractions.length,
    validFractions: validFractions.length,
    invalidFractions: invalidFractions.length,
    zeroEntropyCompliance: invalidFractions.length === 0
  };
}

// === A432 RESOLUTION TESTS ===
export const a432ResolutionTests = {
  /**
   * Test all fractions are valid
   */
  testAllFractionsValid(): boolean {
    return validateAllA432Fractions();
  },

  /**
   * Test zero entropy compliance
   */
  testZeroEntropyCompliance(): boolean {
    const stats = getResolutionStats();
    return stats.zeroEntropyCompliance;
  },

  /**
   * Test decimal resolution
   */
  testDecimalResolution(): boolean {
    const testDecimals = [0.5, 0.25, 0.75, 0.125, 0.375, 0.625, 0.875];
    return testDecimals.every(decimal => {
      const fraction = decimalToA432Fraction(decimal);
      return validateA432Fraction(fraction);
    });
  },

  /**
   * Test fraction calculations
   */
  testFractionCalculations(): boolean {
    const testFractions = [
      { numerator: 1, denominator: 2 },
      { numerator: 3, denominator: 4 },
      { numerator: 5, denominator: 4 },
      { numerator: 7, denominator: 4 }
    ];

    return testFractions.every(fraction => {
      const value = calculateA432FractionValue(fraction);
      return value > 0 && value < 10; // A432 range
    });
  }
};

// === A432 RESOLUTION EXAMPLES ===
export const a432ResolutionExamples = {
  /**
   * Example: Resolve audio timing
   */
  resolveAudioTimingExample(): { original: number; resolved: { numerator: number; denominator: number }; value: number } {
    const original = 0.18;
    const resolved = decimalToA432Fraction(original);
    const value = calculateA432FractionValue(resolved);
    
    return { original, resolved, value };
  },

  /**
   * Example: Resolve UI state
   */
  resolveUIStateExample(): { original: number; resolved: { numerator: number; denominator: number }; value: number } {
    const original = 0.8;
    const resolved = decimalToA432Fraction(original);
    const value = calculateA432FractionValue(resolved);
    
    return { original, resolved, value };
  },

  /**
   * Example: Resolve frequency multiplier
   */
  resolveFrequencyMultiplierExample(): { original: number; resolved: { numerator: number; denominator: number }; value: number } {
    const original = 1.25;
    const resolved = decimalToA432Fraction(original);
    const value = calculateA432FractionValue(resolved);
    
    return { original, resolved, value };
  },

  /**
   * Example: Get resolution statistics
   */
  getResolutionStatisticsExample(): unknown {
    return getResolutionStats();
  }
};

// === EXPORT A432 RESOLVED ===
export default {
  A432_RESOLVED_FRACTIONS,
  A432_RESOLVED_AUDIO,
  A432_RESOLVED_UI,
  A432_RESOLVED_ANIMATION,
  A432_RESOLVED_FREQUENCIES,
  A432_RESOLVED_SIZES,
  A432_RESOLVED_HARMONY,
  A432_RESOLVED_ANGLES,
  fractionToDecimal,
  decimalToA432Fraction,
  getA432Fraction,
  calculateA432FractionValue,
  validateA432Fraction,
  resolveDecimal,
  resolveDecimalValue,
  validateAllA432Fractions,
  getResolutionStats,
  a432ResolutionTests,
  a432ResolutionExamples
}; 