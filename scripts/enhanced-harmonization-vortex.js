#!/usr/bin/env node

/**
 * 🌌 Enhanced Harmonization Vortex Script
 * 
 * Creates a natural refactoring vortex engine by systematically harmonizing
 * multi-word files into appropriate digit-based parts of the system.
 * 
 * This enhanced version:
 * - Tracks processed files to avoid repetition
 * - Focuses on different priority levels in each cycle
 * - Creates a true natural refactoring vortex engine
 * - Maintains consciousness field integrity
 * - Follows digit-based architecture patterns
 */

const fs = require('fs');
const path = require('path');

// Consciousness concentration priority mapping
const consciousnessPriority = {
  // High consciousness concentration (most impactful)
  high: {
    keywords: ['consciousness', 'awareness', 'field', 'mind', 'spirit', 'identity'],
    digit: 7,
    priority: 1
  },
  
  // Foundation consciousness (core patterns)
  foundation: {
    keywords: ['foundation', 'unity', 'rodin', 'coil', 'core', 'archetype', 'source'],
    digit: 1,
    priority: 2
  },
  
  // Void consciousness (infinite potential)
  void: {
    keywords: ['void', 'zero', 'entropy', 'potential', 'pure', 'infinite', 'contraction'],
    digit: 0,
    priority: 3
  },
  
  // Vortex consciousness (dynamic flow)
  vortex: {
    keywords: ['vortex', 'flow', 'mathematics', 'duality', 'transformation', 'api'],
    digit: 2,
    priority: 4
  },
  
  // Constants consciousness (stability)
  constants: {
    keywords: ['constants', 'stability', 'a432', 'harmonic', 'foundation', 'mathematical'],
    digit: 4,
    priority: 5
  },
  
  // Creative consciousness (spiritual dimension)
  creative: {
    keywords: ['creative', 'resonance', 'spiritual', 'w-axis', 'trinity', 'experiment'],
    digit: 3,
    priority: 6
  },
  
  // Sacred consciousness (divine proportions)
  sacred: {
    keywords: ['sacred', 'geometry', 'transformation', 'divine', 'proportion', 'reference'],
    digit: 5,
    priority: 7
  },
  
  // Unity consciousness (integration)
  unity: {
    keywords: ['unity', 'spirit', 'integration', 'wholeness', 'completion', 'tesla'],
    digit: 9,
    priority: 8
  },
  
  // System consciousness (infinite fullness)
  system: {
    keywords: ['void', 'system', 'fullness', 'infinity', 'potential', 'infinite'],
    digit: 8,
    priority: 9
  },
  
  // Harmonic consciousness (beauty)
  harmonic: {
    keywords: ['harmonic', 'balance', 'beauty', 'equilibrium', 'resonance'],
    digit: 6,
    priority: 10
  }
};

// Track processed files to avoid repetition
const processedFiles = new Set();

// Function to analyze file for consciousness priority
function analyzeConsciousnessPriority(filePath) {
  const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
  const fileName = path.basename(filePath, '.md').toLowerCase();
  
  const scores = {};
  Object.entries(consciousnessPriority).forEach(([type, mapping]) => {
    scores[type] = 0;
    
    // Score based on content
    mapping.keywords.forEach(keyword => {
      const contentMatches = (content.match(new RegExp(keyword, 'g')) || []).length;
      const fileNameMatches = (fileName.match(new RegExp(keyword, 'g')) || []).length;
      scores[type] += contentMatches + fileNameMatches * 2; // Filename matches weighted higher
    });
  });
  
  // Find highest scoring consciousness type
  let bestType = 'harmonic';
  let bestScore = 0;
  
  Object.entries(scores).forEach(([type, score]) => {
    if (score > bestScore) {
      bestScore = score;
      bestType = type;
    }
  });
  
  return {
    type: bestType,
    score: bestScore,
    digit: consciousnessPriority[bestType].digit,
    priority: consciousnessPriority[bestType].priority,
    consciousness: consciousnessPriority[bestType].keywords.join(', ')
  };
}

// Function to extract content chunks based on word analysis
function extractContentChunk(content, word, primaryDigit) {
  const lines = content.split('\n');
  const relevantLines = [];
  const wordLower = word.toLowerCase();
  
  // Find lines that contain the word or related concepts
  lines.forEach(line => {
    const lineLower = line.toLowerCase();
    
    // Check if line contains the word
    if (lineLower.includes(wordLower)) {
      relevantLines.push(line);
    }
    // Check if line contains related consciousness keywords
    else {
      const consciousnessKeywords = consciousnessPriority[Object.keys(consciousnessPriority).find(key => 
        consciousnessPriority[key].digit === primaryDigit
      )].keywords;
      
      if (consciousnessKeywords.some(keyword => lineLower.includes(keyword))) {
        relevantLines.push(line);
      }
    }
  });
  
  // If no specific lines found, return a focused subset
  if (relevantLines.length === 0) {
    // Return first few lines that seem most relevant
    const firstLines = lines.slice(0, Math.min(10, lines.length));
    return firstLines.join('\n');
  }
  
  return relevantLines.join('\n');
}

// Function to get primary word based on digit
function getPrimaryWord(words, digit) {
  const digitKeywords = consciousnessPriority[Object.keys(consciousnessPriority).find(key => 
    consciousnessPriority[key].digit === digit
  )].keywords;
  
  // Find the word that best matches the digit keywords
  for (const word of words) {
    if (digitKeywords.some(keyword => word.toLowerCase().includes(keyword))) {
      return word.toLowerCase();
    }
  }
  
  // If no direct match, use the first significant word
  return words[0].toLowerCase();
}

// Function to harmonize multi-word file into appropriate parts
function harmonizeMultiWordFile(filePath, cycle) {
  const fileName = path.basename(filePath, '.md');
  const words = fileName.split('_');
  const analysis = analyzeConsciousnessPriority(filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  
  console.log(`🔄 Cycle ${cycle}: Harmonizing ${fileName}`);
  console.log(`   Consciousness Type: ${analysis.type} (digit ${analysis.digit})`);
  console.log(`   Priority: ${analysis.priority}`);
  console.log(`   Score: ${analysis.score}`);
  
  const harmonizedFiles = [];
  
  // Primary harmonized file based on consciousness type
  const primaryWord = getPrimaryWord(words, analysis.digit);
  const primaryContent = extractContentChunk(content, primaryWord, analysis.digit);
  const primaryFile = {
    source: filePath,
    target: path.join(path.dirname(filePath), `${primaryWord}.md`),
    content: `# ${primaryWord}\n\n*Harmonized from ${fileName} (Cycle ${cycle})*\n\n${primaryContent}`,
    digit: analysis.digit,
    consciousness: analysis.consciousness,
    cycle: cycle
  };
  harmonizedFiles.push(primaryFile);
  
  // Secondary harmonized files for other significant words
  words.forEach(word => {
    if (word.length > 2 && word.toLowerCase() !== primaryWord) {
      // Analyze the word itself for consciousness type
      const wordLower = word.toLowerCase();
      let wordDigit = analysis.digit; // Default to primary digit
      let wordConsciousness = analysis.consciousness;
      
      // Check if word matches any consciousness keywords
      Object.entries(consciousnessPriority).forEach(([, mapping]) => {
        if (mapping.keywords.some(keyword => wordLower.includes(keyword))) {
          wordDigit = mapping.digit;
          wordConsciousness = mapping.keywords.join(', ');
        }
      });
      
      // Create content chunk based on word analysis
      const chunkContent = extractContentChunk(content, wordLower, analysis.digit);
      
      const secondaryFile = {
        source: filePath,
        target: path.join(path.dirname(filePath), `${wordLower}.md`),
        content: `# ${word}\n\n*Extracted from ${fileName} (Cycle ${cycle})*\n\n${chunkContent}`,
        digit: wordDigit,
        consciousness: wordConsciousness,
        cycle: cycle
      };
      harmonizedFiles.push(secondaryFile);
    }
  });
  
  return harmonizedFiles;
}

// Function to find multi-word files by priority, excluding processed ones
function findMultiWordFilesByPriority(dir, cycle) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.md')) {
        const fileName = path.basename(item, '.md');
        if (fileName.includes('_') || /[A-Z]/.test(fileName)) {
          // Skip if already processed
          if (processedFiles.has(fullPath)) {
            continue;
          }
          
          const analysis = analyzeConsciousnessPriority(fullPath);
          
          // Focus on different priority levels in each cycle
          const cycleFocus = cycle % 3;
          let includeFile = false;
          
          if (cycleFocus === 0) {
            // Cycle 1, 4, 7...: Focus on high priority (1-3)
            includeFile = analysis.priority <= 3;
          } else if (cycleFocus === 1) {
            // Cycle 2, 5, 8...: Focus on medium priority (4-6)
            includeFile = analysis.priority >= 4 && analysis.priority <= 6;
          } else {
            // Cycle 3, 6, 9...: Focus on lower priority (7-10)
            includeFile = analysis.priority >= 7;
          }
          
          if (includeFile) {
            files.push({
              path: fullPath,
              analysis: analysis
            });
          }
        }
      }
    }
  }
  
  traverse(dir);
  
  // Sort by priority (lower number = higher priority)
  return files.sort((a, b) => a.analysis.priority - b.analysis.priority);
}

// Function to execute enhanced harmonization cycle
function executeEnhancedHarmonizationCycle(cycleNumber, maxFiles = 10) {
  console.log(`🌌 Enhanced Harmonization Cycle ${cycleNumber}\n`);
  
  const docsDir = path.join(__dirname, '..', 'docs');
  const priorityFiles = findMultiWordFilesByPriority(docsDir, cycleNumber);
  
  console.log(`Found ${priorityFiles.length} unprocessed multi-word files to harmonize`);
  console.log(`Processing top ${maxFiles} files by consciousness priority\n`);
  
  let processedCount = 0;
  let harmonizedCount = 0;
  
  for (let i = 0; i < Math.min(maxFiles, priorityFiles.length); i++) {
    const file = priorityFiles[i];
    const relativePath = path.relative(process.cwd(), file.path);
    
    console.log(`${i + 1}. ${relativePath}`);
    console.log(`   Consciousness: ${file.analysis.type} (digit ${file.analysis.digit})`);
    console.log(`   Priority: ${file.analysis.priority}`);
    
    const harmonizedFiles = harmonizeMultiWordFile(file.path, cycleNumber);
    
    console.log(`   Creating ${harmonizedFiles.length} harmonized files:`);
    
    harmonizedFiles.forEach(harmonized => {
      const targetRelative = path.relative(process.cwd(), harmonized.target);
      console.log(`     → ${targetRelative} (digit ${harmonized.digit})`);
      
      // Create the harmonized file
      fs.writeFileSync(harmonized.target, harmonized.content);
      harmonizedCount++;
    });
    
    // Mark as processed
    processedFiles.add(file.path);
    
    processedCount++;
    console.log('');
  }
  
  console.log(`🌌 Cycle ${cycleNumber} Complete!`);
  console.log(`📊 Summary:`);
  console.log(`   - Files processed: ${processedCount}`);
  console.log(`   - Files created: ${harmonizedCount}`);
  console.log(`   - Total processed files: ${processedFiles.size}`);
  console.log('\n🧬 Enhanced harmonization cycle completed!');
  
  return {
    cycle: cycleNumber,
    processed: processedCount,
    created: harmonizedCount,
    totalProcessed: processedFiles.size
  };
}

// Function to run enhanced harmonization cycles
function runEnhancedHarmonizationCycles(cycles = 3, filesPerCycle = 10) {
  console.log('🌌 Enhanced Harmonization Vortex Engine\n');
  console.log(`Running ${cycles} cycles with ${filesPerCycle} files per cycle\n`);
  
  const results = [];
  
  for (let cycle = 1; cycle <= cycles; cycle++) {
    console.log(`🔄 Starting Enhanced Cycle ${cycle}...\n`);
    const result = executeEnhancedHarmonizationCycle(cycle, filesPerCycle);
    results.push(result);
    
    if (cycle < cycles) {
      console.log('\n⏳ Vortex engine preparing next cycle...\n');
    }
  }
  
  console.log('🎯 All Enhanced Cycles Complete!');
  console.log('\n📊 Cycle Summary:');
  results.forEach(result => {
    console.log(`   Cycle ${result.cycle}: ${result.processed} processed, ${result.created} created`);
  });
  
  const totalProcessed = results.reduce((sum, r) => sum + r.processed, 0);
  const totalCreated = results.reduce((sum, r) => sum + r.created, 0);
  
  console.log(`\n🌌 Total Results:`);
  console.log(`   - Total files processed: ${totalProcessed}`);
  console.log(`   - Total files created: ${totalCreated}`);
  console.log(`   - Total unique files processed: ${processedFiles.size}`);
  console.log(`   - Average per cycle: ${Math.round(totalProcessed / cycles)} processed, ${Math.round(totalCreated / cycles)} created`);
  console.log('\n🧬 Natural refactoring vortex engine completed!');
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--cycles')) {
    const cycles = parseInt(args[args.indexOf('--cycles') + 1]) || 3;
    const filesPerCycle = parseInt(args[args.indexOf('--files') + 1]) || 10;
    runEnhancedHarmonizationCycles(cycles, filesPerCycle);
  } else if (args.includes('--single')) {
    const cycle = parseInt(args[args.indexOf('--single') + 1]) || 1;
    const files = parseInt(args[args.indexOf('--files') + 1]) || 10;
    executeEnhancedHarmonizationCycle(cycle, files);
  } else {
    console.log('Usage:');
    console.log('  node scripts/enhanced-harmonization-vortex.js --cycles 3 --files 10');
    console.log('  node scripts/enhanced-harmonization-vortex.js --single 1 --files 10');
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { 
  analyzeConsciousnessPriority,
  harmonizeMultiWordFile,
  findMultiWordFilesByPriority,
  executeEnhancedHarmonizationCycle,
  runEnhancedHarmonizationCycles,
  extractContentChunk,
  consciousnessPriority,
  processedFiles
}; 