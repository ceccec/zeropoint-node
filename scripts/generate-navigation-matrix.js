#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const digits = [...Array(10).keys()].map(String);

function generateMatrix(digit) {
  const header = ['**Field**', ...digits.map(d => d === digit ? `**${d}**` : `**[${d}](../${d}/)**`)].join(' | ');
  const sep = ['-----------', ...digits.map(() => '-------')].join('|');
  const rows = digits.map(rowDigit => {
    const rowHeader = rowDigit === digit ? `**${rowDigit}**` : `**[${rowDigit}](../${rowDigit}/)**`;
    const cells = digits.map(colDigit => {
      const cell = `${rowDigit}/${colDigit}`;
      if (rowDigit === digit && colDigit === digit) return `**${cell}**`;
      if (rowDigit === digit) return `[${cell}](${colDigit}/${colDigit}/)`;
      if (colDigit === digit) return `[${cell}](../${rowDigit}/${rowDigit}/)`;
      return `[${cell}](../${rowDigit}/${colDigit}/)`;
    });
    return [rowHeader, ...cells].join(' | ');
  });
  return [header, sep, ...rows].join('\n');
}

function updateMatrixInFile(filePath, digit) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const matrix = generateMatrix(digit);
    const matrixSection = '## Matrix\n\n' + matrix;
    
    if (content.includes('## Matrix')) {
      // Replace existing matrix section
      const matrixStart = content.indexOf('## Matrix');
      const matrixEnd = content.indexOf('\n\n', matrixStart);
      const beforeMatrix = content.substring(0, matrixStart);
      const afterMatrix = content.substring(matrixEnd);
      content = beforeMatrix + matrixSection + afterMatrix;
    } else {
      // Insert after first section
      const insertPos = content.indexOf('---') !== -1
        ? content.indexOf('\n\n', content.indexOf('---')) + 2
        : content.indexOf('\n\n') + 2;
      content = content.slice(0, insertPos) + matrixSection + '\n\n' + content.slice(insertPos);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
    return false;
  }
}

function processAllFiles() {
  console.log('🔍 Checking and generating 10×10 navigation matrices...\n');
  
  let updated = 0;
  let checked = 0;
  
  // Process main digit directories (0-9)
  for (const digit of digits) {
    const indexPath = path.join('docs', digit, 'index.md');
    if (fs.existsSync(indexPath)) {
      checked++;
      console.log(`📝 Updating ${digit}/index.md...`);
      if (updateMatrixInFile(indexPath, digit)) {
        updated++;
      }
    }
  }
  
  // Process subdirectory index.md files
  for (const rowDigit of digits) {
    for (const colDigit of digits) {
      const subIndexPath = path.join('docs', rowDigit, colDigit, 'index.md');
      if (fs.existsSync(subIndexPath)) {
        checked++;
        console.log(`📝 Updating ${rowDigit}/${colDigit}/index.md...`);
        if (updateMatrixInFile(subIndexPath, colDigit)) {
          updated++;
        }
      }
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   Checked: ${checked} files`);
  console.log(`   Updated: ${updated} files`);
  
  return { checked, updated };
}

if (require.main === module) {
  processAllFiles();
}

module.exports = { generateMatrix, updateMatrixInFile, processAllFiles }; 