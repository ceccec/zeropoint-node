// COIL Metaphysical Pattern Registry for ZeroPoint Emergence System
// This module now imports from the centralized CoilSystem for all pattern definitions

import { COIL_PATTERNS } from '../core/CoilSystem';

export interface MetaphysicalPattern {
  name: string;
  signature: RegExp;
  context: string;
}

// Export the centralized COIL patterns
export const metaphysicalPatterns: MetaphysicalPattern[] = COIL_PATTERNS.map(pattern => ({
  name: pattern.name,
  signature: typeof pattern.signature === 'function' ? /.*/ : pattern.signature, // Convert function signatures to regex for compatibility
  context: pattern.context
})); 