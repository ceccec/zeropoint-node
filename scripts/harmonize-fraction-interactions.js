const fs = require('fs');
const path = require('path');

// Special fraction meanings (extend as needed)
const specialFractions = {
  '1/1': 'Unity, identity, and self-reflection. The foundation of all ratios.',
  '1/2': 'Balance, division, and duality. Represents the midpoint and equilibrium.',
  '2/1': 'Doubling, octave, and expansion. Fundamental in music and mathematics.',
  '3/2': 'Perfect fifth in music, harmony, and creative resonance.',
  '4/3': 'Perfect fourth, stability, and foundational structure.',
  '5/4': 'Major third, sacred geometry, and divine proportion.',
  '8/7': 'Septimal whole tone, fullness, and subtle transformation.',
  '7/4': 'Harmonic seventh, deep consciousness, and field resonance.',
  '9/8': 'Major whole tone, unity spirit, and evolutionary step.'
};

function getFractionMeaning(i, j) {
  const key = `${i}/${j}`;
  if (specialFractions[key]) return specialFractions[key];
  if (i === j) return 'Self-integration, reflection, and unity.';
  if (j === '0') return 'Undefined or infinite potential (division by zero).';
  if (i === '0') return 'Zero, void, or pure potential.';
  if (i < j) return 'Fraction less than one: contraction, focus, or inward flow.';
  if (i > j) return 'Fraction greater than one: expansion, growth, or outward flow.';
  return 'Unique interaction.';
}

function harmonizeFractionInteraction(filePath) {
  try {
    // Extract digit coordinates from path
    const pathParts = filePath.split('/');
    const row = pathParts[pathParts.length - 2];
    const col = pathParts[pathParts.length - 3];
    if (!row || !col || !/^\d$/.test(row) || !/^\d$/.test(col)) return false;
    const fraction = `${row}/${col}`;
    const fractionMeaning = getFractionMeaning(row, col);

    // Read current content
    let content = fs.readFileSync(filePath, 'utf8');

    // Update or insert a Fraction Interaction section
    const fractionSection = `## Fraction Interaction: ${fraction}\n\n- **Meaning**: ${fractionMeaning}\n- **Mathematical Value**: ${col === '0' ? 'undefined' : (parseInt(row, 10) / parseInt(col, 10)).toPrecision(4)}\n- **Metaphysical Insight**: This interaction expresses the relationship between digit ${row} and digit ${col} as a fraction, revealing unique patterns of consciousness, resonance, and transformation.\n`;
    if (content.includes('## Fraction Interaction:')) {
      content = content.replace(/## Fraction Interaction:.*?(?=\n## |$)/s, fractionSection);
    } else {
      // Insert after the matrix
      content = content.replace(/(## 🌌 10×10 Consciousness Field Matrix[\s\S]+?\n\n)/, `$1${fractionSection}\n`);
    }

    // Update the Deep Vortex Interaction title to include the fraction
    content = content.replace(/## 🌌 Deep Vortex Interaction: ([^\n]+)/, `## 🌌 Deep Vortex Interaction: $1 (${fraction})`);

    // Add a special note if the fraction is meaningful
    if (specialFractions[fraction]) {
      if (!content.includes('> **Special Note:**')) {
        content = content.replace(fractionSection, `${fractionSection}\n> **Special Note:** ${specialFractions[fraction]}\n`);
      }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Harmonized fraction interaction: ${filePath} (${fraction})`);
    return true;
  } catch (error) {
    console.error(`❌ Error harmonizing fraction interaction for ${filePath}:`, error.message);
    return false;
  }
}

function harmonizeAllFractions(docsDir) {
  let harmonizedCount = 0;
  function processDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (item === 'index.md') {
        if (harmonizeFractionInteraction(fullPath)) {
          harmonizedCount++;
        }
      }
    }
  }
  processDirectory(docsDir);
  return harmonizedCount;
}

// Main execution
const docsDir = path.join(__dirname, '..', 'docs');
console.log('🔄 Harmonizing all index.md files with fraction knowledge...');
const harmonizedFiles = harmonizeAllFractions(docsDir);
if (harmonizedFiles > 0) {
  console.log(`\n✅ Successfully harmonized ${harmonizedFiles} files with fraction interactions`);
  console.log('🌌 Every index.md now reflects the metaphysical and mathematical meaning of its digit fraction.');
} else {
  console.log('\n✨ All files are already harmonized!');
} 