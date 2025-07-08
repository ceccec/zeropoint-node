/**
 * COIL System - Unified Metaphysical Pattern Registry and Utilities
 *
 * Centralizes all metaphysical patterns, categories, resonance factors, and context
 * for the entire ZeroPoint codebase. All modules should import from here.
 *
 * Metaphysical Context:
 * - The coil is the unifying, self-similar, non-redundant pattern
 * - All patterns, utilities, and metaphysical context emerge from the coil
 * - The codebase itself is a coil: recursive, observer-aware, and emergent
 */

export type CoilPatternCategory =
  | "mathematical"
  | "metaphysical"
  | "consciousness"
  | "emergence"
  | "void"
  | "resonance"
  | "vortex"
  | "family"
  | "polar"
  | "spiritual";

export interface CoilPattern {
  name: string;
  signature: RegExp | ((input: any) => boolean);
  category: CoilPatternCategory;
  context: string;
  weight?: number;
  resonanceFactors?: string[];
}

export const COIL_PATTERNS: CoilPattern[] = [
  {
    name: "void",
    signature: /void|empty|zero|nothing/i,
    category: "void",
    context:
      "Infinite potential, source of all creation, emptiness as fullness.",
    weight: 1.0,
    resonanceFactors: [
      "infinite_potential",
      "source_creation",
      "emptiness_fullness",
    ],
  },
  {
    name: "toroidal",
    signature: /torus|toroidal|donut|aperture/i,
    category: "mathematical",
    context: "Toroidal geometry, donut shape, unity of center and periphery.",
    weight: 0.9,
    resonanceFactors: ["toroidal_flow", "center_periphery", "unified_geometry"],
  },
  {
    name: "vortex",
    signature: /vortex|spiral|spin|mobius|sequence|1-2-4-8-7-5/i,
    category: "vortex",
    context: "Vortex mathematics, spiral flow, mobius circuit, Rodin sequence.",
    weight: 0.9,
    resonanceFactors: ["vortex_strength", "field_intensity", "golden_ratio"],
  },
  {
    name: "golden_ratio",
    signature: /golden\s*ratio|phi|fibonacci|harmonic|1\.618/i,
    category: "mathematical",
    context: "Golden ratio, harmonic proportion, Fibonacci sequence.",
    weight: 0.8,
    resonanceFactors: [
      "harmonic_resonance",
      "divine_proportion",
      "natural_growth",
    ],
  },
  {
    name: "consciousness",
    signature: /consciousness|awareness|mind|spirit|cycle|pattern/i,
    category: "metaphysical",
    context: "Consciousness, awareness, cycles, patterns of mind and spirit.",
    weight: 0.8,
    resonanceFactors: [
      "consciousness_level",
      "awareness_patterns",
      "spiritual_cycles",
    ],
  },
  {
    name: "aperture",
    signature: /aperture|center|singularity|gateway/i,
    category: "void",
    context:
      "Aperture as gateway, singularity at the center, transformation point.",
    weight: 0.9,
    resonanceFactors: [
      "transformation_point",
      "gateway_void",
      "singularity_center",
    ],
  },
  {
    name: "uroboros",
    signature: /uroboros|ouroboros|infinite|return|loop/i,
    category: "metaphysical",
    context: "Uroboros cycle, infinite return, self-consuming loop.",
    weight: 0.7,
    resonanceFactors: ["infinite_cycle", "self_consuming", "eternal_return"],
  },
  {
    name: "binary",
    signature: /binary|duality|up|down|two|pair|double/i,
    category: "metaphysical",
    context: "Binary patterns, duality, up/down, two-ness.",
    weight: 0.6,
    resonanceFactors: ["duality_patterns", "binary_opposites", "two_ness"],
  },
  {
    name: "unity",
    signature: /unity|oneness|singularity|wholeness/i,
    category: "metaphysical",
    context: "Unity, oneness, singularity, wholeness.",
    weight: 0.8,
    resonanceFactors: ["oneness", "singularity", "wholeness"],
  },
  {
    name: "family_groups",
    signature: (input: any) => {
      if (typeof input === "number") {
        // Placeholder for family group logic
        return [1, 4, 7, 2, 5, 8, 3, 6, 9].includes(input);
      }
      return /family|group|1-4-7|2-5-8|3-6-9/i.test(String(input));
    },
    category: "family",
    context: "Family number groups representing different phases of creation.",
    weight: 0.7,
    resonanceFactors: ["creative_phases", "family_patterns", "number_groups"],
  },
  {
    name: "polar_mates",
    signature: (input: any) => {
      if (typeof input === "number") {
        // Placeholder for polar mate logic
        return [1, 8, 2, 7, 4, 5].includes(input);
      }
      return /polar|mate|opposite|1-8|2-7|4-5/i.test(String(input));
    },
    category: "polar",
    context: "Polar mates representing opposite poles that sum to 9.",
    weight: 0.7,
    resonanceFactors: ["opposite_poles", "balance_duality", "sum_to_nine"],
  },
  {
    name: "w_axis",
    signature: (input: any) => {
      if (typeof input === "number") {
        // Placeholder for W-Axis logic
        return [3, 6, 9].includes(input);
      }
      return /w.?axis|spirit|3-6-9|spiritual/i.test(String(input));
    },
    category: "spiritual",
    context: "W-Axis numbers representing the spiritual dimension.",
    weight: 0.8,
    resonanceFactors: ["spiritual_dimension", "w_axis", "spirit_flow"],
  },
];

/**
 * Utility: Find a COIL pattern by name
 */
export function getCoilPattern(name: string): CoilPattern | undefined {
  return COIL_PATTERNS.find((p) => p.name === name);
}

/**
 * Utility: Recognize all matching COIL patterns for input
 */
export function recognizeCoilPatterns(input: any): CoilPattern[] {
  return COIL_PATTERNS.filter((p) => {
    if (typeof p.signature === "function") {
      return p.signature(input);
    }
    return typeof input === "string" && p.signature.test(input);
  });
}

/**
 * Utility: Get metaphysical context for a pattern name
 */
export function getCoilContext(name: string): string {
  const pattern = getCoilPattern(name);
  return (
    pattern?.context ||
    "This pattern embodies a fundamental aspect of coil consciousness."
  );
}

/**
 * Utility: List all resonance factors for a pattern name
 */
export function getCoilResonanceFactors(name: string): string[] {
  const pattern = getCoilPattern(name);
  return pattern?.resonanceFactors || [];
}
