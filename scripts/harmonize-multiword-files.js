#!/usr/bin/env node

/**
 * 🌌 Multi-Word File Harmonization Script
 * 
 * Systematically splits multi-word files into appropriate parts of the system,
 * creating a natural refactoring vortex engine that follows the digit-based architecture.
 * 
 * This script:
 * - Identifies multi-word files (containing underscores or multiple words)
 * - Analyzes their content for appropriate digit-based placement
 * - Splits content into appropriate directories (0-9)
 * - Creates harmonized single-word files
 * - Maintains consciousness field integrity
 */

const fs = require('fs');
const path = require('path');

// Digit-based consciousness field mapping
const digitMapping = {
  // 0: Void, Zero Entropy, Pure Potential
  0: {
    keywords: ['void', 'zero', 'entropy', 'potential', 'pure', 'infinite', 'contraction'],
    consciousness: 'Zero entropy and infinite potential',
    purpose: 'Source of all creation'
  },
  
  // 1: Foundation, Unity, Rodin Coil
  1: {
    keywords: ['foundation', 'unity', 'rodin', 'coil', 'core', 'archetype', 'source'],
    consciousness: 'Unity foundation and Rodin coil core',
    purpose: 'Immutable foundation'
  },
  
  // 2: Vortex, Flow, Mathematics
  2: {
    keywords: ['vortex', 'flow', 'mathematics', 'duality', 'transformation', 'api'],
    consciousness: 'Vortex mathematics and flow',
    purpose: 'Dynamic transformation'
  },
  
  // 3: Creative Resonance, W-Axis, Spiritual
  3: {
    keywords: ['creative', 'resonance', 'spiritual', 'w-axis', 'trinity', 'experiment'],
    consciousness: 'Creative resonance and spiritual dimension',
    purpose: 'Spiritual transcendence'
  },
  
  // 4: Constants, Stability, A432
  4: {
    keywords: ['constants', 'stability', 'a432', 'harmonic', 'foundation', 'mathematical'],
    consciousness: 'Constants and stability foundation',
    purpose: 'Harmonic foundation'
  },
  
  // 5: Sacred Geometry, Transformation, Divine
  5: {
    keywords: ['sacred', 'geometry', 'transformation', 'divine', 'proportion', 'reference'],
    consciousness: 'Sacred geometry and divine transformation',
    purpose: 'Divine proportions'
  },
  
  // 6: Harmonic Balance, Beauty, Equilibrium
  6: {
    keywords: ['harmonic', 'balance', 'beauty', 'equilibrium', 'resonance'],
    consciousness: 'Harmonic balance and beauty',
    purpose: 'Spiritual equilibrium'
  },
  
  // 7: Consciousness, Awareness, Field
  7: {
    keywords: ['consciousness', 'awareness', 'field', 'mind', 'spirit', 'identity'],
    consciousness: 'Consciousness field and awareness',
    purpose: 'Awareness and self-recognition'
  },
  
  // 8: Void System, Fullness, Infinity
  8: {
    keywords: ['void', 'system', 'fullness', 'infinity', 'potential', 'infinite'],
    consciousness: 'Void system and infinite fullness',
    purpose: 'Infinite potential'
  },
  
  // 9: Unity, Spirit, Integration
  9: {
    keywords: ['unity', 'spirit', 'integration', 'wholeness', 'completion', 'tesla'],
    consciousness: 'Unity spirit and integration',
    purpose: 'Integration and wholeness'
  }
};

// Function to analyze file content and determine appropriate digit
function analyzeFileContent(content) {
  const words = content.toLowerCase().split(/\s+/);
  const digitScores = {};
  
  // Initialize scores
  for (let i = 0; i <= 9; i++) {
    digitScores[i] = 0;
  }
  
  // Score each word against digit keywords
  words.forEach(word => {
    Object.entries(digitMapping).forEach(([digit, mapping]) => {
      if (mapping.keywords.some(keyword => word.includes(keyword))) {
        digitScores[digit]++;
      }
    });
  });
  
  // Find the digit with highest score
  let bestDigit = 0;
  let bestScore = 0;
  
  Object.entries(digitScores).forEach(([digit, score]) => {
    if (score > bestScore) {
      bestScore = score;
      bestDigit = parseInt(digit);
    }
  });
  
  return {
    digit: bestDigit,
    score: bestScore,
    consciousness: digitMapping[bestDigit].consciousness,
    purpose: digitMapping[bestDigit].purpose
  };
}

// Function to split multi-word filename into appropriate parts
function splitMultiWordFile(filePath) {
  const fileName = path.basename(filePath, '.md');
  const words = fileName.split('_');
  
  if (words.length <= 1) {
    return null; // Not a multi-word file
  }
  
  // Read file content
  const content = fs.readFileSync(filePath, 'utf8');
  const analysis = analyzeFileContent(content);
  
  // Create appropriate single-word files based on content analysis
  const splits = [];
  
  // Primary split based on main digit
  const primaryWord = getPrimaryWord(words, analysis.digit);
  splits.push({
    sourceFile: filePath,
    targetFile: path.join(path.dirname(filePath), `${primaryWord}.md`),
    content: content,
    digit: analysis.digit,
    consciousness: analysis.consciousness,
    purpose: analysis.purpose
  });
  
  // Secondary splits for other significant words
  words.forEach(word => {
    if (word.length > 2 && word !== primaryWord) {
      const wordAnalysis = analyzeFileContent(word);
      if (wordAnalysis.score > 0) {
        splits.push({
          sourceFile: filePath,
          targetFile: path.join(path.dirname(filePath), `${word.toLowerCase()}.md`),
          content: `# ${word}\n\nExtracted from ${fileName}\n\n${content}`,
          digit: wordAnalysis.digit,
          consciousness: wordAnalysis.consciousness,
          purpose: wordAnalysis.purpose
        });
      }
    }
  });
  
  return splits;
}

// Function to get primary word based on digit analysis
function getPrimaryWord(words, digit) {
  const digitKeywords = digitMapping[digit].keywords;
  
  // Find the word that best matches the digit keywords
  for (const word of words) {
    if (digitKeywords.some(keyword => word.toLowerCase().includes(keyword))) {
      return word.toLowerCase();
    }
  }
  
  // If no direct match, use the first significant word
  return words[0].toLowerCase();
}

// Function to find all multi-word files
function findMultiWordFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.md')) {
        // Check if it's a multi-word file
        const fileName = path.basename(item, '.md');
        if (fileName.includes('_') || /[A-Z]/.test(fileName)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  traverse(dir);
  return files;
}

// Function to harmonize multi-word files
function harmonizeMultiWordFiles() {
  console.log('🌌 Harmonizing Multi-Word Files...\n');
  
  const docsDir = path.join(__dirname, '..', 'docs');
  const multiWordFiles = findMultiWordFiles(docsDir);
  
  console.log(`Found ${multiWordFiles.length} multi-word files to harmonize\n`);
  
  let processedCount = 0;
  let splitCount = 0;
  
  for (const file of multiWordFiles) {
    const relativePath = path.relative(process.cwd(), file);
    console.log(`Processing: ${relativePath}`);
    
    const splits = splitMultiWordFile(file);
    
    if (splits && splits.length > 0) {
      console.log(`  Splitting into ${splits.length} harmonized files:`);
      
      splits.forEach(split => {
        const targetRelative = path.relative(process.cwd(), split.targetFile);
        console.log(`    → ${targetRelative} (digit ${split.digit}: ${split.consciousness})`);
        
        // Create the harmonized file
        fs.writeFileSync(split.targetFile, split.content);
        splitCount++;
      });
      
      // Optionally remove the original file
      // fs.unlinkSync(file);
      
      processedCount++;
    } else {
      console.log(`  → No splits needed (single-word file)`);
    }
    
    console.log('');
  }
  
  console.log('🌌 Harmonization Complete!');
  console.log(`📊 Summary:`);
  console.log(`   - Files processed: ${processedCount}`);
  console.log(`   - Files created: ${splitCount}`);
  console.log(`   - Total multi-word files: ${multiWordFiles.length}`);
  console.log('\n🧬 Multi-word files have been harmonized into the digit-based system!');
}

// Function to analyze current state
function analyzeCurrentState() {
  console.log('📊 Current Multi-Word File Analysis\n');
  
  const docsDir = path.join(__dirname, '..', 'docs');
  const multiWordFiles = findMultiWordFiles(docsDir);
  
  const digitDistribution = {};
  for (let i = 0; i <= 9; i++) {
    digitDistribution[i] = 0;
  }
  
  console.log('Multi-word files by digit analysis:');
  
  multiWordFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const analysis = analyzeFileContent(content);
    digitDistribution[analysis.digit]++;
    
    const relativePath = path.relative(process.cwd(), file);
    console.log(`  ${relativePath} → digit ${analysis.digit} (${analysis.consciousness})`);
  });
  
  console.log('\nDigit distribution:');
  Object.entries(digitDistribution).forEach(([digit, count]) => {
    if (count > 0) {
      console.log(`  ${digit}: ${count} files (${digitMapping[digit].consciousness})`);
    }
  });
  
  console.log(`\nTotal multi-word files: ${multiWordFiles.length}`);
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--analyze')) {
    analyzeCurrentState();
  } else {
    harmonizeMultiWordFiles();
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { 
  analyzeFileContent, 
  splitMultiWordFile, 
  findMultiWordFiles,
  digitMapping 
}; 