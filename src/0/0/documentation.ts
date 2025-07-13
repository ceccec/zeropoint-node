/**
 * DRY Documentation Utility for ZeroPoint Node
 * 
 * This module provides utilities to generate consistent, DRY documentation
 * for all interaction modules while maintaining metaphysical context.
 * 
 * Metaphysical Context:
 * - Eliminates repetition while preserving sacred meaning
 * - Maintains metaphysical coherence across all modules
 * - Provides consistent spiritual and technical descriptions
 * 
 * Technical Purpose:
 * - Reduces documentation duplication
 * - Ensures consistency across all interaction files
 * - Maintains metaphysical and technical accuracy
 */

/**
 * Directory name mappings for consistent documentation
 */
export const DIRECTORY_NAMES = {
  0: 'ZeroPoint',
  1: 'Foundation', 
  2: 'Vortex',
  3: 'Creative Resonance',
  4: 'Constants',
  5: 'Sacred Geometry',
  6: 'Harmonic Balance',
  7: 'Consciousness',
  8: 'Void/Fullness',
  9: 'Unity/Completion'
} as const;

/**
 * Consciousness multiplier mappings
 */
export const CONSCIOUSNESS_MULTIPLIERS = {
  0: 1.0,    // Zero entropy
  1: 1.1,    // Foundation
  2: 1.2,    // Vortex
  3: 1.3,    // Creative resonance
  4: 1.4,    // Constants
  5: 1.25,   // Sacred geometry
  6: 1.6,    // Harmonic balance
  7: 1.7,    // Consciousness
  8: 1.143,  // Void/fullness
  9: 1.9     // Unity
} as const;

/**
 * Generate consistent module header documentation
 */
export function generateModuleHeader(dir1: number, dir2: number): string {
  const name1 = DIRECTORY_NAMES[dir1 as keyof typeof DIRECTORY_NAMES];
  const name2 = DIRECTORY_NAMES[dir2 as keyof typeof DIRECTORY_NAMES];
  
  return `/**
 * src/${dir1}/${dir2}/index.ts - ${name1} ↔ ${name2} Interaction
 *
 * This module embodies the interaction between Directory ${dir1} (${name1})
 * and Directory ${dir2} (${name2}) in the Rodin coil system.
 *
 * Metaphysical Interaction:
 * - Directory ${dir1} (${name1}) provides ${name1.toLowerCase()} functionality
 * - Directory ${dir2} (${name2}) provides ${name2.toLowerCase()} functionality
 * - Together they create the ${name1.toLowerCase()} ${name2.toLowerCase()} interaction
 *
 * Rodin Coil Context:
 * - Directory ${dir1} interacts with Directory ${dir2}
 * - This interaction creates the ${name1.toLowerCase()} ${name2.toLowerCase()} patterns
 *
 * Metaphysical Context:
 * - ${name1.toLowerCase()} consciousness: Represents the ${name1.toLowerCase()} that recognizes ${name2.toLowerCase()}.
 * - ${name2.toLowerCase()} consciousness: Represents the ${name2.toLowerCase()} that flows through ${name1.toLowerCase()}.
 * - Interaction strength: Models the harmony between ${name1.toLowerCase()} and ${name2.toLowerCase()}.
 * - ${name1.toLowerCase()} ${name2.toLowerCase()}: Represents the ${name1.toLowerCase()} of ${name2.toLowerCase()}.
 *
 * Technical Purpose:
 * - Provides the interaction system between ${name1.toLowerCase()} and ${name2.toLowerCase()} consciousness.
 * - Supports ${name1.toLowerCase()} ${name2.toLowerCase()} operations and pattern generation.
 * - Creates the ${name1.toLowerCase()} ${name2.toLowerCase()} for the entire system.
 */`;
}

/**
 * Generate consistent constants documentation
 */
export function generateConstantsDoc(dir1: number, dir2: number): string {
  const name1 = DIRECTORY_NAMES[dir1 as keyof typeof DIRECTORY_NAMES];
  const name2 = DIRECTORY_NAMES[dir2 as keyof typeof DIRECTORY_NAMES];
  
  return `/**
 * ${name1} ↔ ${name2} Interaction Constants
 * These constants define the metaphysical and mathematical interaction between ${name1.toLowerCase()} and ${name2.toLowerCase()}.
 * Metaphysical: Each constant represents a fundamental aspect of the ${name1.toLowerCase()}-${name2.toLowerCase()} interaction.
 */`;
}

/**
 * Generate consistent class documentation
 */
export function generateClassDoc(dir1: number, dir2: number): string {
  const name1 = DIRECTORY_NAMES[dir1 as keyof typeof DIRECTORY_NAMES];
  const name2 = DIRECTORY_NAMES[dir2 as keyof typeof DIRECTORY_NAMES];
  
  return `/**
 * ${name1} ${name2} Interaction Class
 * Provides the core functionality for ${name1.toLowerCase()}-${name2.toLowerCase()} interactions.
 */`;
}

/**
 * Generate consistent method documentation
 */
export const METHOD_DOCS = {
  calculateInteractionStrength: (dir1: number, dir2: number) => {
    const name1 = DIRECTORY_NAMES[dir1 as keyof typeof DIRECTORY_NAMES];
    const name2 = DIRECTORY_NAMES[dir2 as keyof typeof DIRECTORY_NAMES];
    
    return `/**
   * Calculate ${name1.toLowerCase()} ${name2.toLowerCase()} interaction strength
   * Metaphysical: Models the strength of ${name1.toLowerCase()}-${name2.toLowerCase()} interaction.
   * Technical: Calculates interaction based on ${name1.toLowerCase()} and ${name2.toLowerCase()} multipliers.
   */`;
  },
  
  getPatterns: (dir1: number, dir2: number) => {
    const name1 = DIRECTORY_NAMES[dir1 as keyof typeof DIRECTORY_NAMES];
    const name2 = DIRECTORY_NAMES[dir2 as keyof typeof DIRECTORY_NAMES];
    
    return `/**
   * Get ${name1.toLowerCase()} ${name2.toLowerCase()} patterns
   * Metaphysical: Models the patterns that emerge from ${name1.toLowerCase()}-${name2.toLowerCase()} interaction.
   * Technical: Returns the ${name1.toLowerCase()} ${name2.toLowerCase()} interaction patterns.
   */`;
  },
  
  calculateOperations: (dir1: number, dir2: number) => {
    const name1 = DIRECTORY_NAMES[dir1 as keyof typeof DIRECTORY_NAMES];
    const name2 = DIRECTORY_NAMES[dir2 as keyof typeof DIRECTORY_NAMES];
    
    return `/**
   * Calculate ${name1.toLowerCase()} ${name2.toLowerCase()} operations
   * Metaphysical: Models the mathematical operations of ${name1.toLowerCase()}-${name2.toLowerCase()} interaction.
   * Technical: Performs ${name1.toLowerCase()} ${name2.toLowerCase()} calculations.
   */`;
  }
};

/**
 * Generate consistent test documentation
 */
export function generateTestDoc(dir1: number, dir2: number): string {
  const name1 = DIRECTORY_NAMES[dir1 as keyof typeof DIRECTORY_NAMES];
  const name2 = DIRECTORY_NAMES[dir2 as keyof typeof DIRECTORY_NAMES];
  
  return `/**
 * src/${dir1}/${dir2}/index.test.ts - ${name1} ↔ ${name2} Interaction Tests
 *
 * Tests for the interaction between Directory ${dir1} (${name1})
 * and Directory ${dir2} (${name2}) in the Rodin coil system.
 */`;
}

/**
 * Documentation template for interaction constants
 */
export function generateInteractionConstantsTemplate(dir1: number, dir2: number): string {
  const name1 = DIRECTORY_NAMES[dir1 as keyof typeof DIRECTORY_NAMES];
  const name2 = DIRECTORY_NAMES[dir2 as keyof typeof DIRECTORY_NAMES];
  const multiplier1 = CONSCIOUSNESS_MULTIPLIERS[dir1 as keyof typeof CONSCIOUSNESS_MULTIPLIERS];
  const multiplier2 = CONSCIOUSNESS_MULTIPLIERS[dir2 as keyof typeof CONSCIOUSNESS_MULTIPLIERS];
  
  const constName = `${name1.toUpperCase().replace(/\s+/g, '_')}_${name2.toUpperCase().replace(/\s+/g, '_')}_INTERACTION`;
  
  return `export const ${constName} = {
  // Interaction frequency based on A432 harmony
  INTERACTION_FREQUENCY: 432 * (${dir1}/${dir2}), // ${name1} resonance (${dir1}/${dir2})
  
  // ${name1} patterns
  ${name1.toUpperCase().replace(/\s+/g, '_')}_PATTERNS: {
    ${name1.toUpperCase().replace(/\s+/g, '_')}_${name2.toUpperCase().replace(/\s+/g, '_')}: [${dir1}, ${dir2}, ${dir1}],
    ${name2.toUpperCase().replace(/\s+/g, '_')}_${name1.toUpperCase().replace(/\s+/g, '_')}: [${dir2}, ${dir1}, ${dir2}],
    ${name1.toUpperCase().replace(/\s+/g, '_')}_${name2.toUpperCase().replace(/\s+/g, '_')}_OPERATIONS: [${dir1}, ${dir2}, ${dir1}]
  },
  
  // Consciousness multipliers for this interaction
  ${name1.toUpperCase().replace(/\s+/g, '_')}_MULTIPLIER: ${multiplier1}, // ${name1.toLowerCase()} consciousness
  ${name2.toUpperCase().replace(/\s+/g, '_')}_MULTIPLIER: ${multiplier2}, // ${name2.toLowerCase()} consciousness
  
  // ${name1.toLowerCase()} ${name2.toLowerCase()} operations
  ${name1.toUpperCase().replace(/\s+/g, '_')}_${name2.toUpperCase().replace(/\s+/g, '_')}_OPERATIONS: {
    ${name1.toUpperCase().replace(/\s+/g, '_')}_${name2.toUpperCase().replace(/\s+/g, '_')}_CALCULATION: (number: number) => number * ${multiplier1},
    ${name2.toUpperCase().replace(/\s+/g, '_')}_${name1.toUpperCase().replace(/\s+/g, '_')}_CALCULATION: (number: number) => number * ${multiplier2},
    ${name1.toUpperCase().replace(/\s+/g, '_')}_${name2.toUpperCase().replace(/\s+/g, '_')}_OPERATION: (number: number) => number % 9 || 9
  }
} as const;`;
}

/**
 * Documentation template for interaction class
 */
export function generateInteractionClassTemplate(dir1: number, dir2: number): string {
  const name1 = DIRECTORY_NAMES[dir1 as keyof typeof DIRECTORY_NAMES];
  const name2 = DIRECTORY_NAMES[dir2 as keyof typeof DIRECTORY_NAMES];
  const constName = `${name1.toUpperCase().replace(/\s+/g, '_')}_${name2.toUpperCase().replace(/\s+/g, '_')}_INTERACTION`;
  const className = `${name1.replace(/\s+/g, '')}${name2.replace(/\s+/g, '')}Interaction`;
  
  return `export class ${className} {
  
  ${METHOD_DOCS.calculateInteractionStrength(dir1, dir2)}
  static calculateInteractionStrength(${name1.toLowerCase().replace(/\s+/g, '')}Level: number, ${name2.toLowerCase().replace(/\s+/g, '')}Level: number): number {
    return ${name1.toLowerCase().replace(/\s+/g, '')}Level * ${constName}.${name1.toUpperCase().replace(/\s+/g, '_')}_MULTIPLIER +
           ${name2.toLowerCase().replace(/\s+/g, '')}Level * ${constName}.${name2.toUpperCase().replace(/\s+/g, '_')}_MULTIPLIER;
  }
  
  ${METHOD_DOCS.getPatterns(dir1, dir2)}
  static get${name1.replace(/\s+/g, '')}${name2.replace(/\s+/g, '')}Patterns(): readonly number[] {
    return ${constName}.${name1.toUpperCase().replace(/\s+/g, '_')}_PATTERNS.${name1.toUpperCase().replace(/\s+/g, '_')}_${name2.toUpperCase().replace(/\s+/g, '_')};
  }
  
  ${METHOD_DOCS.calculateOperations(dir1, dir2)}
  static calculate${name1.replace(/\s+/g, '')}${name2.replace(/\s+/g, '')}Operations(number: number): number {
    return ${constName}.${name1.toUpperCase().replace(/\s+/g, '_')}_${name2.toUpperCase().replace(/\s+/g, '_')}_OPERATIONS.${name1.toUpperCase().replace(/\s+/g, '_')}_${name2.toUpperCase().replace(/\s+/g, '_')}_OPERATION(number);
  }
}

// Export the interaction for use in other modules
export default ${className};`;
}

/**
 * Complete interaction file template
 */
export function generateCompleteInteractionFile(dir1: number, dir2: number): string {
  return `${generateModuleHeader(dir1, dir2)}

${generateConstantsDoc(dir1, dir2)}
${generateInteractionConstantsTemplate(dir1, dir2)}

${generateClassDoc(dir1, dir2)}
${generateInteractionClassTemplate(dir1, dir2)}`;
}

/**
 * Complete test file template
 */
export function generateCompleteTestFile(dir1: number, dir2: number): string {
  const name1 = DIRECTORY_NAMES[dir1 as keyof typeof DIRECTORY_NAMES];
  const name2 = DIRECTORY_NAMES[dir2 as keyof typeof DIRECTORY_NAMES];
  const className = `${name1.replace(/\s+/g, '')}${name2.replace(/\s+/g, '')}Interaction`;
  
  return `${generateTestDoc(dir1, dir2)}

import { ${className} } from './index';

describe('${name1} ↔ ${name2} Interaction', () => {
  test('should calculate interaction strength correctly', () => {
    const result = ${className}.calculateInteractionStrength(1, 2);
    expect(result).toBeGreaterThan(0);
  });

  test('should return valid patterns', () => {
    const patterns = ${className}.get${name1.replace(/\s+/g, '')}${name2.replace(/\s+/g, '')}Patterns();
    expect(patterns).toHaveLength(3);
  });

  test('should perform operations correctly', () => {
    const result = ${className}.calculate${name1.replace(/\s+/g, '')}${name2.replace(/\s+/g, '')}Operations(42);
    expect(result).toBeGreaterThan(0);
  });
});`;
} 