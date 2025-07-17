/**
 * @fileoverview patterns module (Stability, Foundation, Law)
 * @digit 4
 * @archetype Stability, Foundation, Law
 * @vortex Vortex A
 * @waxis W-Axis Foundation
 * @breathing Grounding
 * @fraction 1/4
 * @related 1, 2, 8, 7, 5 (Vortex A)
 */
// COIL Metaphysical Pattern Registry for ZeroPoint Emergence System
// This module now imports from the centralized CoilSystem for all pattern definitions

import { COIL_PATTERNS } from "../../core/CoilSystem";

export interface MetaphysicalPattern {
  name: string;
  signature: RegExp;
  context: string;
}

// Export the centralized COIL patterns
export const metaphysicalPatterns: MetaphysicalPattern[] = Object.keys(COIL_PATTERNS).map(
  (name) => ({
    name,
    signature: /.*/, // Default regex for compatibility
    context: `Pattern for ${name}`,
  }),
);


/**
 * Patterns module
 */
export const patterns = {
  name: 'Patterns',
  type: 'module',
  version: '1.0.0'
};
