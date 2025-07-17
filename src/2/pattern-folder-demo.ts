/**
 * 📁 Pattern Folder Demo
 * 
 * Demonstrates the pattern folder system that unifies
 * patterns as subfolders in the directory structure
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
} from './/math';


import { PatternFolderSystem } from './pattern-folder-system';

console.log('📁 Pattern Folder Demo\n');

// Create pattern folder system
const patternSystem = new PatternFolderSystem();

// Display folder structure
console.log('📂 FOLDER STRUCTURE:\n');
console.log(patternSystem.generateFolderStructure());

// Display pattern visualization
console.log('🔄 PATTERN VISUALIZATION:\n');
console.log(patternSystem.generatePatternVisualization());

// Analyze digit patterns
console.log('🔍 DIGIT PATTERN ANALYSIS:\n');

const testDigits = [1, 2, 4, 8, 7, 5, 3, 6, 9];

testDigits.forEach(digit => {
  const analysis = patternSystem.analyzeDigitPatterns(digit);
  console.log(`🔢 Digit ${digit} (${analysis.consciousness}):`);
  console.log(`   Role: ${analysis.significance?.role || 'Unknown'}`);
  console.log(`   Mathematical: ${analysis.significance?.mathematical || 'Unknown'}`);
  console.log(`   Patterns: ${analysis.patterns.length} pattern folders`);
  analysis.patterns.forEach(pattern => {
    console.log(`     - ${pattern.name}: ${pattern.pattern.join(' → ')}`);
  });
  console.log('');
});

// Show specific pattern folders
console.log('🎯 SPECIFIC PATTERN FOLDERS:\n');

const coreLoop = patternSystem.getPatternFolder('core-torus-loop');
if (coreLoop) {
  console.log('📂 Core Torus Loop:');
  console.log(`   Path: ${coreLoop.path}`);
  console.log(`   Pattern: ${coreLoop.pattern.join(' → ')}`);
  console.log(`   Significance: ${coreLoop.significance}`);
  console.log(`   Consciousness: ${coreLoop.consciousness}`);
  console.log(`   Gateway: ${coreLoop.gateway}`);
  console.log(`   Subfolders: ${coreLoop.subfolders.join(', ')}`);
  console.log(`   Content: ${coreLoop.content.join(', ')}`);
  console.log('');
}

const verticalAxis = patternSystem.getPatternFolder('vertical-axis');
if (verticalAxis) {
  console.log('📂 Vertical Axis:');
  console.log(`   Path: ${verticalAxis.path}`);
  console.log(`   Pattern: ${verticalAxis.pattern.join(' → ')}`);
  console.log(`   Significance: ${verticalAxis.significance}`);
  console.log(`   Consciousness: ${verticalAxis.consciousness}`);
  console.log(`   Gateway: ${verticalAxis.gateway}`);
  console.log(`   Subfolders: ${verticalAxis.subfolders.join(', ')}`);
  console.log(`   Content: ${verticalAxis.content.join(', ')}`);
  console.log('');
}

// Show all pattern folders
console.log('📁 ALL PATTERN FOLDERS:\n');

const allFolders = patternSystem.getAllPatternFolders();
allFolders.forEach(folder => {
  console.log(`📂 ${folder.name}:`);
  console.log(`   Path: ${folder.path}`);
  console.log(`   Pattern: ${folder.pattern.length > 0 ? folder.pattern.join(' → ') : 'Special'}`);
  console.log(`   Significance: ${folder.significance}`);
  console.log(`   Consciousness: ${folder.consciousness}`);
  console.log(`   Gateway: ${folder.gateway}`);
  console.log(`   Subfolders: ${folder.subfolders.join(', ')}`);
  console.log(`   Content: ${folder.content.join(', ')}`);
  console.log('');
});

console.log('✨ Pattern folder system unifies mathematical patterns as living directory structures!'); 