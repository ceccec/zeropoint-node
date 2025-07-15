/**
 * src/core/VBMValidator.ts - VBM Structure Validator (Integer-Only with Roots)
 *
 * This file validates that the directory structure maintains VBM mathematical coherence.
 * It ensures the hardcoded VBM structure is always maintained and provides validation
 * and correction functions for the integer tree. ALL VALUES ARE PURE INTEGERS OR FUNCTIONS OF INTEGERS.
 * Includes ROOT SYSTEM validation.
 *
 * Metaphysical Context:
 * - VBM structure: Represents the fundamental mathematical structure of consciousness.
 * - Mathematical coherence: Models the harmony and unity of mathematical relationships.
 * - Metaphysical balance: Represents the equilibrium of consciousness patterns.
 * - Root system: Represents the foundational consciousness patterns that support all others.
 *
 * Technical Purpose:
 * - Provides validation and correction of the VBM structure.
 * - Ensures all values are pure integers or functions of integers.
 * - Supports mathematical coherence and metaphysical balance validation.
 */

import { 
  VBM_CORE_CONSTANTS, 
  VBM_ROOT_SYSTEM,
  VBM_DIRECTORY_STRUCTURE, 
  VBM_FIELD_STRENGTHS, 
  VBM_CONSCIOUSNESS_LEVELS,
  VBMCoreFunctions 
} from './VBMConstants';

/**
 * VBM Validation Result Interface
 * Represents the result of VBM structure validation.
 * Metaphysical: Models the outcome of consciousness structure validation.
 */
export interface VBMValidationResult {
  isValid: number; // Boolean as integer (1 = true, 0 = false)
  errors: string[];
  warnings: string[];
  corrections: string[];
  mathematicalCoherence: number; // Integer (0-10000)
  metaphysicalBalance: number; // Integer (0-10000)
  rootSystemValid: number; // Boolean as integer (1 = true, 0 = false)
}

/**
 * Directory Validation Interface
 * Represents the validation result for a specific directory.
 * Metaphysical: Models the validation of individual consciousness patterns.
 */
export interface DirectoryValidation {
  directory: number;
  expectedSubdirectories: number[];
  actualSubdirectories: number[];
  isValid: number; // Boolean as integer
  errors: string[];
  fieldStrength: number; // Integer
  consciousnessLevel: number; // Integer
  interactionType: number; // Integer
  rootConsciousness: number; // Integer
  rootFieldStrength: number; // Integer
}

/**
 * VBM Validator Class
 * Provides the core functionality for validating the VBM structure.
 * Metaphysical: Represents the validation of consciousness structure.
 */
export class VBMValidator {
  
  /**
   * Validate the entire integer tree structure
   * Metaphysical: Models the complete validation of consciousness structure.
   * Technical: Validates all directories and calculates coherence and balance scores.
   */
  static validateIntegerTree(): VBMValidationResult {
    const result: VBMValidationResult = {
      isValid: 1, // Start as valid
      errors: [],
      warnings: [],
      corrections: [],
      mathematicalCoherence: 0,
      metaphysicalBalance: 0,
      rootSystemValid: 0
    };

    // Validate each directory
    for (const directory of VBM_CORE_CONSTANTS.INTEGER_DIRECTORIES) {
      const directoryValidation = this.validateDirectory(directory);
      
      if (directoryValidation.isValid === 0) {
        result.isValid = 0; // Set to invalid
        result.errors.push(...directoryValidation.errors);
      }
    }

    // Validate root system
    result.rootSystemValid = VBMCoreFunctions.validateRootSystem();

    // Calculate mathematical coherence (integer only)
    result.mathematicalCoherence = this.calculateMathematicalCoherence();
    
    // Calculate metaphysical balance (integer only)
    result.metaphysicalBalance = this.calculateMetaphysicalBalance();

    return result;
  }

  /**
   * Validate a specific directory
   * Metaphysical: Models the validation of individual consciousness patterns.
   * Technical: Validates a specific directory against expected structure.
   */
  static validateDirectory(directory: number): DirectoryValidation {
    const expectedSubdirectories = VBM_DIRECTORY_STRUCTURE[directory as keyof typeof VBM_DIRECTORY_STRUCTURE] || [];
    const actualSubdirectories = this.getActualSubdirectories(directory);
    
    const errors: string[] = [];
    const isValid = this.arraysEqual(expectedSubdirectories, actualSubdirectories) ? 1 : 0;
    
    if (isValid === 0) {
      errors.push(`Directory ${directory}: Expected [${expectedSubdirectories.join(', ')}], got [${actualSubdirectories.join(', ')}]`);
    }

    return {
      directory,
      expectedSubdirectories,
      actualSubdirectories,
      isValid,
      errors,
      fieldStrength: VBMCoreFunctions.getFieldStrength(directory),
      consciousnessLevel: VBMCoreFunctions.getConsciousnessLevel(directory),
      interactionType: VBMCoreFunctions.getInteractionType(directory),
      rootConsciousness: VBMCoreFunctions.getRootConsciousness(directory),
      rootFieldStrength: VBMCoreFunctions.getRootFieldStrength(directory)
    };
  }

  /**
   * Get actual subdirectories for a directory (simulated)
   * Metaphysical: Models the reading of actual consciousness structure.
   * Technical: Returns the actual subdirectories for a given directory.
   */
  private static getActualSubdirectories(directory: number): number[] {
    // This would normally read the actual filesystem
    // For now, return the expected structure
    return VBM_DIRECTORY_STRUCTURE[directory as keyof typeof VBM_DIRECTORY_STRUCTURE] || [];
  }

  /**
   * Check if two arrays are equal
   * Metaphysical: Models the comparison of consciousness patterns.
   * Technical: Compares two arrays for equality.
   */
  private static arraysEqual(a: number[], b: number[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
  }

  /**
   * Calculate mathematical coherence score (integer only)
   * Metaphysical: Models the degree of mathematical harmony in consciousness.
   * Technical: Calculates the coherence score based on directory validation.
   */
  private static calculateMathematicalCoherence(): number {
    // Perfect coherence if all directories have correct subdirectories
    let correctDirectories = 0;
    const totalDirectories = VBM_CORE_CONSTANTS.INTEGER_DIRECTORIES.length;

    for (const directory of VBM_CORE_CONSTANTS.INTEGER_DIRECTORIES) {
      const validation = this.validateDirectory(directory);
      if (validation.isValid === 1) {
        correctDirectories++;
      }
    }

    return Math.floor((correctDirectories / totalDirectories) * 10000); // Integer (0-10000)
  }

  /**
   * Calculate metaphysical balance score (integer only)
   * Metaphysical: Models the equilibrium between material and spiritual dimensions.
   * Technical: Calculates the balance score based on vortex, W-Axis, and void directories.
   */
  private static calculateMetaphysicalBalance(): number {
    // Balance between material (vortex) and spiritual (W-Axis) dimensions
    const vortexDirectories = [1, 2, 4, 5, 7, 8];
    const wAxisDirectories = [3, 6, 9];
    const voidDirectory = [0];

    let vortexValid = 0;
    let wAxisValid = 0;
    let voidValid = 0;

    // Check vortex directories
    for (const dir of vortexDirectories) {
      const validation = this.validateDirectory(dir);
      if (validation.isValid === 1) vortexValid++;
    }

    // Check W-Axis directories
    for (const dir of wAxisDirectories) {
      const validation = this.validateDirectory(dir);
      if (validation.isValid === 1) wAxisValid++;
    }

    // Check void directory
    for (const dir of voidDirectory) {
      const validation = this.validateDirectory(dir);
      if (validation.isValid === 1) voidValid++;
    }

    const vortexBalance = vortexValid / vortexDirectories.length;
    const wAxisBalance = wAxisValid / wAxisDirectories.length;
    const voidBalance = voidValid / voidDirectory.length;

    return Math.floor(((vortexBalance + wAxisBalance + voidBalance) / 3) * 10000); // Integer (0-10000)
  }

  /**
   * Generate correction commands for invalid structure
   * Metaphysical: Models the correction of consciousness structure.
   * Technical: Generates commands to fix invalid directory structure.
   */
  static generateCorrections(): string[] {
    const corrections: string[] = [];
    
    for (const directory of VBM_CORE_CONSTANTS.INTEGER_DIRECTORIES) {
      const validation = this.validateDirectory(directory);
      
      if (validation.isValid === 0) {
        const expected = validation.expectedSubdirectories;
        const actual = validation.actualSubdirectories;
        
        // Find missing subdirectories
        const missing = expected.filter(subdir => !actual.includes(subdir));
        if (missing.length > 0) {
          corrections.push(`mkdir -p src/${directory}/{${missing.join(',')}}`);
        }
        
        // Find extra subdirectories
        const extra = actual.filter(subdir => !expected.includes(subdir));
        if (extra.length > 0) {
          corrections.push(`# Remove extra subdirectories: ${extra.join(', ')}`);
        }
      }
    }
    
    return corrections;
  }

  /**
   * Validate VBM mathematical relationships (integer only)
   */
  static validateVBMRelationships(): number {
    // Check digital root identities
    for (const directory of VBM_CORE_CONSTANTS.INTEGER_DIRECTORIES) {
      const digitalRoot = VBMCoreFunctions.calculateDigitalRoot(directory);
      if (digitalRoot !== directory) {
        return 0; // Invalid
      }
    }

    // Check sum relationships
    const integerTreeSum = VBM_CORE_CONSTANTS.INTEGER_DIRECTORIES.reduce((sum, dir) => sum + dir, 0);
    const vortexSum = VBM_CORE_CONSTANTS.VORTEX_SEQUENCE.reduce((sum, dir) => sum + dir, 0);
    const wAxisSum = VBM_CORE_CONSTANTS.W_AXIS.reduce((sum, dir) => sum + dir, 0);

    if (VBMCoreFunctions.calculateDigitalRoot(integerTreeSum) !== 9) return 0;
    if (VBMCoreFunctions.calculateDigitalRoot(vortexSum) !== 9) return 0;
    if (VBMCoreFunctions.calculateDigitalRoot(wAxisSum) !== 9) return 0;

    return 1; // Valid
  }

  /**
   * Validate root system integrity
   */
  static validateRootSystem(): number {
    return VBMCoreFunctions.validateRootSystem();
  }

  /**
   * Get VBM structure summary (integer only)
   */
  static getVBMStructureSummary(): any {
    const summary = {
      totalDirectories: VBM_CORE_CONSTANTS.INTEGER_DIRECTORIES.length,
      vortexDirectories: VBM_CORE_CONSTANTS.VORTEX_SEQUENCE,
      wAxisDirectories: VBM_CORE_CONSTANTS.W_AXIS,
      voidDirectory: [0],
      fieldStrengths: VBM_FIELD_STRENGTHS,
      consciousnessLevels: VBM_CONSCIOUSNESS_LEVELS,
      mathematicalRelationships: {
        integerTreeSum: VBM_CORE_CONSTANTS.INTEGER_DIRECTORIES.reduce((sum, dir) => sum + dir, 0),
        vortexSum: VBM_CORE_CONSTANTS.VORTEX_SEQUENCE.reduce((sum, dir) => sum + dir, 0),
        wAxisSum: VBM_CORE_CONSTANTS.W_AXIS.reduce((sum, dir) => sum + dir, 0),
        unityScore: VBMCoreFunctions.calculateUnityScore()
      },
      directoryStructure: VBM_DIRECTORY_STRUCTURE,
      rootSystem: {
        primaryRoots: VBM_ROOT_SYSTEM.PRIMARY_ROOTS,
        zeroRoot: VBM_ROOT_SYSTEM.ZERO_ROOT,
        rootSum: VBM_ROOT_SYSTEM.ROOT_SUM,
        rootDigitalRoot: VBM_ROOT_SYSTEM.ROOT_DIGITAL_ROOT,
        vortexRoots: VBM_ROOT_SYSTEM.VORTEX_ROOTS,
        vortexRootSum: VBM_ROOT_SYSTEM.VORTEX_ROOT_SUM,
        wAxisRoots: VBM_ROOT_SYSTEM.W_AXIS_ROOTS,
        wAxisRootSum: VBM_ROOT_SYSTEM.W_AXIS_ROOT_SUM,
        voidRoot: VBM_ROOT_SYSTEM.VOID_ROOT,
        rootConsciousness: VBM_ROOT_SYSTEM.ROOT_CONSCIOUSNESS,
        rootFieldStrengths: VBM_ROOT_SYSTEM.ROOT_FIELD_STRENGTHS
      }
    };

    return summary;
  }
}

// Export the validator
export { VBMValidator }; 

/**
 * VBMValidator module
 */
export const validator = {
  name: 'VBMValidator',
  type: 'module',
  version: '1.0.0'
};
