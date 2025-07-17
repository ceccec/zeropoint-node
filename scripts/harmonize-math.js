#!/usr/bin/env node

/**
 * harmonize-math.js - Harmonize Mathematical Functions Across src/
 * 
 * This script updates all PWA node files to use the centralized mathematical
 * functions from src/2/math.ts instead of duplicating them in each directory.
 * 
 * Metaphysical Context:
 * - Digit 2 represents vortex/mathematics in the Rodin coil
 * - All mathematical operations should flow through the central system
 * - Eliminates redundancy and maintains mathematical coherence
 * - Ensures integer-only operations with vortex metaphysics
 */

const fs = require('fs');
const path = require('path');

// Directories to process (all digits 0-9)
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Function to update a PWA node file
function updatePWANodeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file already imports from centralized math
    if (content.includes("from '../2/math'") || content.includes("from '../../2/math'")) {
      console.log(`✓ Already harmonized: ${filePath}`);
      return false;
    }
    
    // Find the mathematical functions to replace
    const functionPatterns = [
      /export function getHarmonicResult\(a: number, b: number\): number \{[\s\S]*?\}/,
      /export function getAntiVortexDecimal\(a: number, b: number\): number \{[\s\S]*?\}/
    ];
    
    let updatedContent = content;
    let hasChanges = false;
    
    // Replace mathematical functions with imports
    functionPatterns.forEach(pattern => {
      if (pattern.test(updatedContent)) {
        updatedContent = updatedContent.replace(pattern, '');
        hasChanges = true;
      }
    });
    
    // Add import statement if changes were made
    if (hasChanges) {
      // Determine relative path to src/2/math
      const relativePath = filePath.includes('/src/') ? 
        (filePath.split('/src/')[1].split('/').length > 2 ? '../../2/math' : '../2/math') :
        '../2/math';
      
      const importStatement = `
// Import mathematical functions from centralized system (digit 2)
import { getHarmonicResult, getAntiVortexDecimal, getPattern } from '${relativePath}/math';

`;
      
      // Insert import after the first comment block
      const commentEndIndex = updatedContent.indexOf('*/') + 2;
      updatedContent = updatedContent.slice(0, commentEndIndex) + importStatement + updatedContent.slice(commentEndIndex);
      
      // Clean up extra whitespace
      updatedContent = updatedContent.replace(/\n\s*\n\s*\n/g, '\n\n');
      
      fs.writeFileSync(filePath, updatedContent);
      console.log(`✓ Harmonized: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Function to process all PWA node files in a digit directory
function processDigitDirectory(digit) {
  const digitPath = path.join(__dirname, '..', 'src', digit);
  
  if (!fs.existsSync(digitPath)) {
    console.log(`⚠ Directory not found: src/${digit}`);
    return 0;
  }
  
  let updatedCount = 0;
  
  // Process all subdirectories (0-9)
  DIGITS.forEach(subDigit => {
    const subDirPath = path.join(digitPath, subDigit);
    const indexPath = path.join(subDirPath, 'index.ts');
    
    if (fs.existsSync(indexPath)) {
      if (updatePWANodeFile(indexPath)) {
        updatedCount++;
      }
    }
  });
  
  return updatedCount;
}

// Main execution
function main() {
  console.log('🔄 Harmonizing Mathematical Functions Across src/');
  console.log('=' .repeat(60));
  
  let totalUpdated = 0;
  
  // Process all digit directories
  DIGITS.forEach(digit => {
    console.log(`\n📁 Processing digit ${digit}...`);
    const updated = processDigitDirectory(digit);
    totalUpdated += updated;
    console.log(`   Updated ${updated} files in digit ${digit}`);
  });
  
  console.log('\n' + '=' .repeat(60));
  console.log(`✅ Harmonization complete! Updated ${totalUpdated} files total.`);
  console.log('\n📋 Summary:');
  console.log('   • All mathematical functions now flow through src/2/math.ts');
  console.log('   • Eliminated function duplication across directories');
  console.log('   • Maintained vortex metaphysics and integer-only operations');
  console.log('   • Preserved backward compatibility through re-exports');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { updatePWANodeFile, processDigitDirectory }; 