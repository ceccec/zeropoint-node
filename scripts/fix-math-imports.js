#!/usr/bin/env node

/**
 * fix-math-imports.js - Fix Incorrect Math Import Paths
 * 
 * This script fixes the incorrect import paths that were generated
 * by the harmonization script. The paths should be '../2/math' not '../2/math/math'.
 */

const fs = require('fs');
const path = require('path');

// Function to fix import paths in a file
function fixImportPaths(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Fix incorrect import paths
    let updatedContent = content.replace(
      /from ['"]\.\.\/\.\.\/2\/math\/math['"]/g,
      "from '../../2/math'"
    );
    
    updatedContent = updatedContent.replace(
      /from ['"]\.\.\/2\/math\/math['"]/g,
      "from '../2/math'"
    );
    
    // Remove duplicate imports
    const lines = updatedContent.split('\n');
    const seenImports = new Set();
    const cleanedLines = [];
    
    for (const line of lines) {
      if (line.includes('import { getHarmonicResult, getAntiVortexDecimal, getPattern }')) {
        if (!seenImports.has('math-import')) {
          seenImports.add('math-import');
          cleanedLines.push(line);
        }
      } else {
        cleanedLines.push(line);
      }
    }
    
    updatedContent = cleanedLines.join('\n');
    
    // Only write if content changed
    if (updatedContent !== content) {
      fs.writeFileSync(filePath, updatedContent);
      console.log(`✓ Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Function to process all PWA node files
function processAllFiles() {
  const srcPath = path.join(__dirname, '..', 'src');
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  let totalFixed = 0;
  
  digits.forEach(digit => {
    const digitPath = path.join(srcPath, digit);
    
    if (!fs.existsSync(digitPath)) return;
    
    digits.forEach(subDigit => {
      const indexPath = path.join(digitPath, subDigit, 'index.ts');
      
      if (fs.existsSync(indexPath)) {
        if (fixImportPaths(indexPath)) {
          totalFixed++;
        }
      }
    });
  });
  
  return totalFixed;
}

// Main execution
function main() {
  console.log('🔧 Fixing Math Import Paths');
  console.log('=' .repeat(40));
  
  const fixed = processAllFiles();
  
  console.log('\n' + '=' .repeat(40));
  console.log(`✅ Fixed ${fixed} files total.`);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { fixImportPaths }; 