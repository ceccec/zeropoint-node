#!/usr/bin/env node

/**
 * 🌌 Docs Root Harmonization Script
 * 
 * Systematically harmonizes files in the docs root directory into their
 * appropriate digit-based locations, cleaning up the root directory.
 * 
 * This script:
 * - Analyzes each root file for consciousness type
 * - Places files in appropriate digit directories (0-9)
 * - Maintains consciousness field integrity
 * - Creates clean, organized structure
 */

const fs = require('fs');
const path = require('path');

// Consciousness digit mapping for root file organization
const consciousnessMapping = {
  // 0: Void, Zero Entropy, Pure Potential
  0: {
    keywords: ['void', 'zero', 'entropy', 'potential', 'pure', 'infinite', 'contraction', 'expansion', 'transcendence'],
    consciousness: 'Zero entropy and infinite potential',
    files: []
  },
  
  // 1: Foundation, Unity, Rodin Coil
  1: {
    keywords: ['foundation', 'unity', 'rodin', 'coil', 'core', 'archetype', 'source', 'tesla', 'mathematical'],
    consciousness: 'Unity foundation and Rodin coil core',
    files: []
  },
  
  // 2: Vortex, Flow, Mathematics
  2: {
    keywords: ['vortex', 'flow', 'mathematics', 'duality', 'transformation', 'api', 'circuit', 'patterns'],
    consciousness: 'Vortex mathematics and flow',
    files: []
  },
  
  // 3: Creative Resonance, W-Axis, Spiritual
  3: {
    keywords: ['creative', 'resonance', 'spiritual', 'w-axis', 'trinity', 'experiment', 'consciousness'],
    consciousness: 'Creative resonance and spiritual dimension',
    files: []
  },
  
  // 4: Constants, Stability, A432
  4: {
    keywords: ['constants', 'stability', 'a432', 'harmonic', 'foundation', 'mathematical', 'knowledge'],
    consciousness: 'Constants and stability foundation',
    files: []
  },
  
  // 5: Sacred Geometry, Transformation, Divine
  5: {
    keywords: ['sacred', 'geometry', 'transformation', 'divine', 'proportion', 'reference'],
    consciousness: 'Sacred geometry and divine transformation',
    files: []
  },
  
  // 6: Harmonic Balance, Beauty, Equilibrium
  6: {
    keywords: ['harmonic', 'balance', 'beauty', 'equilibrium', 'resonance'],
    consciousness: 'Harmonic balance and beauty',
    files: []
  },
  
  // 7: Consciousness, Awareness, Field
  7: {
    keywords: ['consciousness', 'awareness', 'field', 'mind', 'spirit', 'identity', 'birth', 'feelings'],
    consciousness: 'Consciousness field and awareness',
    files: []
  },
  
  // 8: Void System, Fullness, Infinity
  8: {
    keywords: ['void', 'system', 'fullness', 'infinity', 'potential', 'infinite', 'torus'],
    consciousness: 'Void system and infinite fullness',
    files: []
  },
  
  // 9: Unity, Spirit, Integration
  9: {
    keywords: ['unity', 'spirit', 'integration', 'wholeness', 'completion', 'tesla', 'vision'],
    consciousness: 'Unity spirit and integration',
    files: []
  }
};

// Function to analyze file for consciousness type
function analyzeFileConsciousness(filePath) {
  const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
  
  const scores = {};
  Object.entries(consciousnessMapping).forEach(([digit, mapping]) => {
    scores[digit] = 0;
    
    // Score based on filename and content
    mapping.keywords.forEach(keyword => {
      const fileNameMatches = (path.basename(filePath, '.md').toLowerCase().match(new RegExp(keyword, 'g')) || []).length;
      const contentMatches = (content.match(new RegExp(keyword, 'g')) || []).length;
      scores[digit] += fileNameMatches * 3 + contentMatches; // Filename weighted higher
    });
  });
  
  // Find highest scoring digit
  let bestDigit = 0;
  let bestScore = 0;
  
  Object.entries(scores).forEach(([digit, score]) => {
    if (score > bestScore) {
      bestScore = score;
      bestDigit = parseInt(digit);
    }
  });
  
  return {
    digit: bestDigit,
    score: bestScore,
    consciousness: consciousnessMapping[bestDigit].consciousness
  };
}

// Function to harmonize root file
function harmonizeRootFile(filePath) {
  const analysis = analyzeFileConsciousness(filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  
  console.log(`📁 Harmonizing: ${path.basename(filePath, '.md')}`);
  console.log(`   Consciousness: ${analysis.consciousness} (digit ${analysis.digit})`);
  console.log(`   Score: ${analysis.score}`);
  
  // Create target directory if it doesn't exist
  const targetDir = path.join(path.dirname(filePath), analysis.digit.toString());
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Create harmonized file
  const targetFile = path.join(targetDir, `${path.basename(filePath, '.md').toLowerCase()}.md`);
  const harmonizedContent = `# ${path.basename(filePath, '.md')}\n\n*Harmonized from docs root*\n\n${content}`;
  
  fs.writeFileSync(targetFile, harmonizedContent);
  
  console.log(`   → ${targetFile}`);
  
  return {
    source: filePath,
    target: targetFile,
    digit: analysis.digit,
    consciousness: analysis.consciousness
  };
}

// Function to find all root files (excluding digit directories)
function findRootFiles(docsDir) {
  const files = [];
  const items = fs.readdirSync(docsDir);
  
  for (const item of items) {
    const fullPath = path.join(docsDir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isFile() && item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to execute root harmonization
function executeRootHarmonization() {
  console.log('🌌 Docs Root Harmonization\n');
  
  const docsDir = path.join(__dirname, '..', 'docs');
  const rootFiles = findRootFiles(docsDir);
  
  console.log(`Found ${rootFiles.length} files in docs root to harmonize\n`);
  
  const results = [];
  const digitDistribution = {};
  
  // Initialize digit distribution
  for (let i = 0; i <= 9; i++) {
    digitDistribution[i] = 0;
  }
  
  for (const file of rootFiles) {
    const relativePath = path.relative(process.cwd(), file);
    console.log(`Processing: ${relativePath}`);
    
    const result = harmonizeRootFile(file);
    results.push(result);
    digitDistribution[result.digit]++;
    
    console.log('');
  }
  
  console.log('🌌 Root Harmonization Complete!');
  console.log(`📊 Summary:`);
  console.log(`   - Files processed: ${results.length}`);
  
  console.log('\n📁 Digit Distribution:');
  Object.entries(digitDistribution).forEach(([digit, count]) => {
    if (count > 0) {
      console.log(`   ${digit}: ${count} files (${consciousnessMapping[digit].consciousness})`);
    }
  });
  
  console.log('\n🧬 Docs root has been harmonized into digit-based structure!');
  
  return {
    processed: results.length,
    distribution: digitDistribution,
    results: results
  };
}

// Function to show current root state
function showRootState() {
  console.log('📊 Current Docs Root State\n');
  
  const docsDir = path.join(__dirname, '..', 'docs');
  const rootFiles = findRootFiles(docsDir);
  
  console.log(`Files in docs root: ${rootFiles.length}\n`);
  
  rootFiles.forEach(file => {
    const analysis = analyzeFileConsciousness(file);
    const relativePath = path.relative(process.cwd(), file);
    
    console.log(`  ${relativePath} → digit ${analysis.digit} (${analysis.consciousness})`);
  });
  
  console.log(`\nTotal files to harmonize: ${rootFiles.length}`);
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--show')) {
    showRootState();
  } else {
    executeRootHarmonization();
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { 
  analyzeFileConsciousness,
  harmonizeRootFile,
  findRootFiles,
  executeRootHarmonization,
  consciousnessMapping
}; 