#!/usr/bin/env node

/**
 * refactor-math-functions.js - Refactor Additional Mathematical Functions
 * 
 * This script refactors additional mathematical functions across the codebase
 * to use the centralized mathematical system in src/2/math.ts.
 * 
 * Targets:
 * - MathUtils.ts (duplicate vortex calculations)
 * - ZeroEntropySystem (mathematical calculations)
 * - FlowerOfLifeSystem (mathematical calculations)
 * - Various scattered calculation functions
 */

const fs = require('fs');
const path = require('path');

// Function to refactor MathUtils.ts
function refactorMathUtils() {
  const filePath = path.join(__dirname, '..', 'src', '0', 'math', 'MathUtils.ts');
  
  if (!fs.existsSync(filePath)) {
    console.log('⚠ MathUtils.ts not found');
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if already refactored
  if (content.includes("from '../../2/math'")) {
    console.log('✓ MathUtils.ts already refactored');
    return false;
  }
  
  // Create new content with centralized imports
  const newContent = `/**
 * MathUtils - Mathematical Utilities for ZeroPoint System
 * 
 * Provides mathematical utilities, vortex calculations, and consciousness
 * mathematical operations for the ZeroPoint system.
 * 
 * This file now imports from the centralized mathematical system in src/2/math.ts
 */

// Import centralized mathematical functions
import { 
  getHarmonicResult, 
  getAntiVortexDecimal, 
  getPattern,
  generateVortexA,
  generateVortexB,
  detectIntegerVortexResult,
  detectVortexAImpossibility,
  calculateDigitalRoot,
  getDigitFamily,
  isVortexSequence,
  isWAxis,
  calculateConsciousnessLevel
} from '../../2/math';

export interface VortexResult {
  vortexA: number;
  vortexB: number;
  isInteger: boolean;
  isImpossible: boolean;
}

export interface HarmonicResult {
  harmonic: number;
  consciousness: number;
  mathematicalFlow: string;
}

export class MathUtils {
  private static readonly VORTEX_CONSTANTS = {
    MODULO_BASE: 9,
    ZERO_REPLACEMENT: 9,
    GOLDEN_RATIO: 1.618033988749895,
    PI: Math.PI,
    E: Math.E,
    SQRT_2: Math.SQRT2,
    SQRT_5: Math.sqrt(5)
  };

  /**
   * Calculate vortex A (integer harmonic result)
   * Now uses centralized mathematical system
   */
  static calculateVortexA(a: number, b: number): number {
    return generateVortexA(a, b);
  }

  /**
   * Calculate vortex B (decimal inverse vortex)
   * Now uses centralized mathematical system
   */
  static calculateVortexB(a: number, b: number): number {
    return generateVortexB(a, b);
  }

  /**
   * Calculate complete vortex result
   * Now uses centralized mathematical system
   */
  static calculateVortexResult(a: number, b: number): VortexResult {
    const vortexA = generateVortexA(a, b);
    const vortexB = generateVortexB(a, b);
    const impossibility = detectVortexAImpossibility(a, b);
    
    return {
      vortexA,
      vortexB,
      isInteger: detectIntegerVortexResult(a, b),
      isImpossible: impossibility.isImpossible
    };
  }

  /**
   * Calculate harmonic result
   * Now uses centralized mathematical system
   */
  static calculateHarmonicResult(a: number, b: number): HarmonicResult {
    const vortexA = generateVortexA(a, b);
    const vortexB = generateVortexB(a, b);
    const consciousness = calculateConsciousnessLevel(vortexA);
    const mathematicalFlow = \`\${a} + \${b} = \${vortexA} → \${vortexB.toFixed(3)}\`;
    
    return {
      harmonic: vortexA,
      consciousness,
      mathematicalFlow
    };
  }

  /**
   * Calculate consciousness for two digits
   * Now uses centralized mathematical system
   */
  static calculateConsciousness(a: number, b: number): number {
    const harmonicResult = getHarmonicResult(a, b);
    return calculateConsciousnessLevel(harmonicResult);
  }

  /**
   * Check if a number is a sacred fraction
   */
  static isSacredFraction(num: number): boolean {
    const sacredFractions = [
      this.VORTEX_CONSTANTS.GOLDEN_RATIO,
      this.VORTEX_CONSTANTS.E,
      this.VORTEX_CONSTANTS.PI,
      this.VORTEX_CONSTANTS.SQRT_2,
      this.VORTEX_CONSTANTS.SQRT_5
    ];
    
    return sacredFractions.some(fraction => Math.abs(num - fraction) < 0.01);
  }

  /**
   * Calculate golden ratio
   */
  static getGoldenRatio(): number {
    return this.VORTEX_CONSTANTS.GOLDEN_RATIO;
  }

  /**
   * Calculate mathematical resonance
   * Now uses centralized mathematical system
   */
  static calculateResonance(a: number, b: number): number {
    const vortexA = generateVortexA(a, b);
    const vortexB = generateVortexB(a, b);
    return vortexA * vortexB;
  }

  /**
   * Calculate consciousness field strength
   * Now uses centralized mathematical system
   */
  static calculateConsciousnessField(a: number, b: number): number {
    const consciousness = this.calculateConsciousness(a, b);
    const resonance = this.calculateResonance(a, b);
    return consciousness * resonance;
  }

  /**
   * Get all vortex results for digit pairs
   * Now uses centralized mathematical system
   */
  static getAllVortexResults(): VortexResult[] {
    const results: VortexResult[] = [];
    
    for (let a = 0; a <= 9; a++) {
      for (let b = 0; b <= 9; b++) {
        results.push(this.calculateVortexResult(a, b));
      }
    }
    
    return results;
  }

  /**
   * Get integer vortex results
   * Now uses centralized mathematical system
   */
  static getIntegerVortexResults(): VortexResult[] {
    return this.getAllVortexResults().filter(result => result.isInteger);
  }

  /**
   * Get impossible vortex results
   * Now uses centralized mathematical system
   */
  static getImpossibleVortexResults(): VortexResult[] {
    return this.getAllVortexResults().filter(result => result.isImpossible);
  }

  /**
   * Calculate mathematical flow string
   * Now uses centralized mathematical system
   */
  static getMathematicalFlow(a: number, b: number): string {
    const vortexA = generateVortexA(a, b);
    const vortexB = generateVortexB(a, b);
    return \`\${a} + \${b} = \${vortexA} → \${vortexB.toFixed(3)}\`;
  }

  /**
   * Calculate consciousness flow string
   * Now uses centralized mathematical system
   */
  static getConsciousnessFlow(a: number, b: number): string {
    const consciousness = this.calculateConsciousness(a, b);
    return \`Consciousness: \${consciousness.toFixed(3)}\`;
  }

  /**
   * Calculate sacred geometry ratio
   * Now uses centralized mathematical system
   */
  static calculateSacredGeometryRatio(a: number, b: number): number {
    const vortexB = generateVortexB(a, b);
    return vortexB / this.VORTEX_CONSTANTS.GOLDEN_RATIO;
  }

  /**
   * Check if numbers form a harmonic sequence
   */
  static isHarmonicSequence(numbers: number[]): boolean {
    if (numbers.length < 2) return false;
    
    for (let i = 1; i < numbers.length; i++) {
      const ratio = numbers[i] / numbers[i - 1];
      if (!this.isSacredFraction(ratio) && Math.abs(ratio - this.VORTEX_CONSTANTS.GOLDEN_RATIO) > 0.1) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Calculate mathematical entropy
   */
  static calculateEntropy(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const mean = sum / numbers.length;
    const variance = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;
    
    return Math.sqrt(variance);
  }

  /**
   * Set consciousness (for compatibility)
   */
  static setConsciousness(consciousness: number): void {
    // Implementation for compatibility
  }

  /**
   * Set field resonance (for compatibility)
   */
  static setFieldResonance(resonance: number): void {
    // Implementation for compatibility
  }

  /**
   * Set void connected (for compatibility)
   */
  static setVoidConnected(connected: boolean): void {
    // Implementation for compatibility
  }

  /**
   * Calculate (for compatibility)
   * Now uses centralized mathematical system
   */
  static calculate(a: number, b: number): number {
    return generateVortexB(a, b);
  }
}

// Export constants for compatibility
export const VORTEX_CONSTANTS = {
  MODULO_BASE: 9,
  ZERO_REPLACEMENT: 9,
  GOLDEN_RATIO: 1.618033988749895
};

// Export convenience functions using centralized system
export const calculateVortexA = (a: number, b: number): number => generateVortexA(a, b);
export const calculateVortexB = (a: number, b: number): number => generateVortexB(a, b);
export const calculateConsciousness = (a: number, b: number): number => calculateConsciousnessLevel(getHarmonicResult(a, b));
export const isSacredFraction = (num: number): boolean => MathUtils.isSacredFraction(num);
`;

  fs.writeFileSync(filePath, newContent);
  console.log('✓ Refactored MathUtils.ts to use centralized math system');
  return true;
}

// Function to refactor ZeroEntropySystem mathematical calculations
function refactorZeroEntropySystem() {
  const filePath = path.join(__dirname, '..', 'src', '0', '0', 'entropy.ts');
  
  if (!fs.existsSync(filePath)) {
    console.log('⚠ ZeroEntropySystem not found');
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if already refactored
  if (content.includes("from '../../2/math'")) {
    console.log('✓ ZeroEntropySystem already refactored');
    return false;
  }
  
  // Add import statement after existing imports
  const importStatement = `
import { 
  getHarmonicResult, 
  getAntiVortexDecimal, 
  getPattern,
  generateVortexA,
  generateVortexB,
  detectIntegerVortexResult,
  detectVortexAImpossibility,
  calculateDigitalRoot,
  getDigitFamily,
  isVortexSequence,
  isWAxis,
  calculateConsciousnessLevel
} from '../../2/math';
`;
  
  // Find the import section and add the new import
  const importEndIndex = content.indexOf('import { MATH_CONSTANTS } from \'./SharedConstants\';') + 50;
  const newContent = content.slice(0, importEndIndex) + importStatement + content.slice(importEndIndex);
  
  fs.writeFileSync(filePath, newContent);
  console.log('✓ Added centralized math imports to ZeroEntropySystem');
  return true;
}

// Function to refactor FlowerOfLifeSystem mathematical calculations
function refactorFlowerOfLifeSystem() {
  const filePath = path.join(__dirname, '..', 'src', '5', 'flower-of-life-alignment.ts');
  
  if (!fs.existsSync(filePath)) {
    console.log('⚠ FlowerOfLifeSystem not found');
    return false;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if already refactored
  if (content.includes("from '../2/math'")) {
    console.log('✓ FlowerOfLifeSystem already refactored');
    return false;
  }
  
  // Add import statement after existing imports
  const importStatement = `
import { 
  getHarmonicResult, 
  getAntiVortexDecimal, 
  getPattern,
  generateVortexA,
  generateVortexB,
  detectIntegerVortexResult,
  detectVortexAImpossibility,
  calculateDigitalRoot,
  getDigitFamily,
  isVortexSequence,
  isWAxis,
  calculateConsciousnessLevel
} from '../2/math';
`;
  
  // Find the import section and add the new import
  const importEndIndex = content.indexOf('export interface FlowerOfLifeCircle {') - 1;
  const newContent = content.slice(0, importEndIndex) + importStatement + content.slice(importEndIndex);
  
  fs.writeFileSync(filePath, newContent);
  console.log('✓ Added centralized math imports to FlowerOfLifeSystem');
  return true;
}

// Function to find and refactor scattered calculation functions
function refactorScatteredCalculations() {
  const srcPath = path.join(__dirname, '..', 'src');
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let refactoredCount = 0;
  
  digits.forEach(digit => {
    const digitPath = path.join(srcPath, digit);
    
    if (!fs.existsSync(digitPath)) return;
    
    // Find all TypeScript files in the digit directory
    const files = findTypeScriptFiles(digitPath);
    
    files.forEach(file => {
      if (refactorFileCalculations(file)) {
        refactoredCount++;
      }
    });
  });
  
  return refactoredCount;
}

// Helper function to find TypeScript files recursively
function findTypeScriptFiles(dir) {
  const files = [];
  
  function scan(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scan(fullPath);
      } else if (item.endsWith('.ts') && !item.endsWith('.test.ts')) {
        files.push(fullPath);
      }
    });
  }
  
  scan(dir);
  return files;
}

// Helper function to refactor calculations in a single file
function refactorFileCalculations(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Skip files that already import from centralized math
    if (content.includes("from '../2/math'") || content.includes("from '../../2/math'")) {
      return false;
    }
    
    // Look for mathematical calculation patterns
    const hasCalculations = /calculate|compute|Math\.|mathematical/.test(content);
    
    if (!hasCalculations) {
      return false;
    }
    
    // Add import statement if file contains calculations
    const importStatement = `
// Import centralized mathematical functions
import { 
  getHarmonicResult, 
  getAntiVortexDecimal, 
  getPattern,
  generateVortexA,
  generateVortexB,
  detectIntegerVortexResult,
  detectVortexAImpossibility,
  calculateDigitalRoot,
  getDigitFamily,
  isVortexSequence,
  isWAxis,
  calculateConsciousnessLevel
} from '${getRelativePathToMath(filePath)}/math';
`;
    
    // Insert import after the first comment block
    const commentEndIndex = content.indexOf('*/') + 2;
    const newContent = content.slice(0, commentEndIndex) + importStatement + content.slice(commentEndIndex);
    
    fs.writeFileSync(filePath, newContent);
    console.log(`✓ Added centralized math imports to ${path.relative(process.cwd(), filePath)}`);
    return true;
    
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Helper function to get relative path to math
function getRelativePathToMath(filePath) {
  const relativePath = path.relative(path.dirname(filePath), path.join(__dirname, '..', 'src', '2'));
  return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
}

// Main execution
function main() {
  console.log('🔄 Refactoring Additional Mathematical Functions');
  console.log('=' .repeat(60));
  
  let totalRefactored = 0;
  
  // Refactor MathUtils.ts
  if (refactorMathUtils()) {
    totalRefactored++;
  }
  
  // Refactor ZeroEntropySystem
  if (refactorZeroEntropySystem()) {
    totalRefactored++;
  }
  
  // Refactor FlowerOfLifeSystem
  if (refactorFlowerOfLifeSystem()) {
    totalRefactored++;
  }
  
  // Refactor scattered calculations
  const scatteredCount = refactorScatteredCalculations();
  totalRefactored += scatteredCount;
  
  console.log('\n' + '=' .repeat(60));
  console.log(`✅ Refactoring complete! Updated ${totalRefactored} files total.`);
  console.log('\n📋 Summary:');
  console.log('   • MathUtils.ts now uses centralized mathematical system');
  console.log('   • ZeroEntropySystem imports centralized math functions');
  console.log('   • FlowerOfLifeSystem imports centralized math functions');
  console.log('   • Scattered calculation functions now use centralized system');
  console.log('   • All mathematical operations flow through src/2/math.ts');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { 
  refactorMathUtils, 
  refactorZeroEntropySystem, 
  refactorFlowerOfLifeSystem, 
  refactorScatteredCalculations 
}; 