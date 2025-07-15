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
  let content = fs.readFileSync(filePath, 'utf8');
  const matrix = generateMatrix(digit);
  const matrixSection = '## Matrix\n\n' + matrix;
  if (content.includes('## Matrix')) {
    // Replace existing matrix section
    content = content.replace(/## Matrix[\s\S]*?(?=\n\n|$)/, matrixSection);
  } else {
    // Insert after first header or after frontmatter
    const insertPos = content.indexOf('---') !== -1
      ? content.indexOf('\n\n', content.indexOf('---')) + 2
      : content.indexOf('\n\n') + 2;
    content = content.slice(0, insertPos) + matrixSection + '\n\n' + content.slice(insertPos);
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

function processAll() {
  for (const d1 of digits) {
    const mainIndex = path.join('docs', d1, 'index.md');
    if (fs.existsSync(mainIndex)) updateMatrixInFile(mainIndex, d1);
    for (const d2 of digits) {
      const subIndex = path.join('docs', d1, d2, 'index.md');
      if (fs.existsSync(subIndex)) updateMatrixInFile(subIndex, d2);
    }
  }
  console.log('Navigation matrices checked and updated.');
}

if (require.main === module) processAll(); 