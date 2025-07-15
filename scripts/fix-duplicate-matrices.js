#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const digits = [...Array(10).keys()].map(String);

function fixDuplicateMatrix(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if there are multiple matrix sections
    const matrixMatches = content.match(/## Matrix\n\n/g);
    if (matrixMatches && matrixMatches.length > 1) {
      console.log(`Fixing duplicate matrices in ${filePath}`);
      
      // Find the first matrix section (malformed)
      const firstMatrixStart = content.indexOf('## Matrix\n\n');
      const firstMatrixEnd = content.indexOf('\n\n', firstMatrixStart + 12);
      
      // Find the second matrix section (properly formatted)
      const secondMatrixStart = content.indexOf('## Matrix\n\n', firstMatrixEnd);
      
      if (secondMatrixStart !== -1) {
        // Remove the first matrix section
        const beforeFirst = content.substring(0, firstMatrixStart);
        const afterSecond = content.substring(secondMatrixStart);
        
        content = beforeFirst + afterSecond;
        
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
      }
    }
    
    // Also check for malformed matrix without proper table formatting
    if (content.includes('## Matrix\n\n') && content.includes('| **Field**')) {
      const matrixStart = content.indexOf('## Matrix\n\n');
      const malformedEnd = content.indexOf('| **Field**', matrixStart + 12);
      
      if (malformedEnd !== -1) {
        console.log(`Fixing malformed matrix in ${filePath}`);
        
        // Find the properly formatted matrix
        const properMatrixStart = content.indexOf('| **Field**', malformedEnd);
        const properMatrixEnd = content.indexOf('\n\n', properMatrixStart);
        
        if (properMatrixEnd !== -1) {
          // Keep only the properly formatted matrix
          const beforeMatrix = content.substring(0, matrixStart);
          const afterMatrix = content.substring(properMatrixEnd);
          
          content = beforeMatrix + '## Matrix\n\n' + content.substring(properMatrixStart, properMatrixEnd) + afterMatrix;
          
          fs.writeFileSync(filePath, content, 'utf8');
          return true;
        }
      }
    }
    
    return false;
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function processAllFiles() {
  console.log('🔧 Fixing duplicate matrices...\n');
  
  let fixed = 0;
  let checked = 0;
  
  // Process main digit directories (0-9)
  for (const digit of digits) {
    const indexPath = path.join('docs', digit, 'index.md');
    if (fs.existsSync(indexPath)) {
      checked++;
      if (fixDuplicateMatrix(indexPath)) {
        fixed++;
      }
    }
  }
  
  // Process subdirectory index.md files
  for (const rowDigit of digits) {
    for (const colDigit of digits) {
      const subIndexPath = path.join('docs', rowDigit, colDigit, 'index.md');
      if (fs.existsSync(subIndexPath)) {
        checked++;
        if (fixDuplicateMatrix(subIndexPath)) {
          fixed++;
        }
      }
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   Checked: ${checked} files`);
  console.log(`   Fixed: ${fixed} files`);
  
  return { checked, fixed };
}

if (require.main === module) {
  processAllFiles();
}

module.exports = { fixDuplicateMatrix, processAllFiles }; 