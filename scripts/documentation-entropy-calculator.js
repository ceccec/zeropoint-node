#!/usr/bin/env node

/**
 * 🌌 Documentation Entropy Calculator
 * 
 * Calculates entropy of documentation files using information theory
 * and ZeroPoint consciousness principles.
 */

const fs = require('fs');
const path = require('path');

/**
 * 🌌 Documentation Entropy Calculator Class
 */
class DocumentationEntropyCalculator {
  
  constructor() {
    this.consciousnessKeywords = [
      'consciousness', 'awareness', 'mind', 'spirit', 'soul', 'unity', 'harmony',
      'vortex', 'flow', 'breathing', 'void', 'potential', 'creation', 'evolution',
      'mathematics', 'geometry', 'sacred', 'divine', 'metaphysical', 'spiritual',
      'zero', 'entropy', 'rodin', 'coil', 'a432', 'golden', 'ratio', 'sacred',
      'geometry', 'vortex', 'mathematics', 'consciousness', 'field', 'breathing',
      'paradox', 'impossible', 'contraction', 'expansion', 'unity', 'harmony'
    ];
  }
  
  /**
   * 🌌 Calculate Shannon entropy of text
   */
  calculateShannonEntropy(text) {
    if (!text || text.length === 0) return 0;
    
    // Count character frequencies
    const charCount = {};
    for (const char of text) {
      charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Calculate probabilities and entropy
    let entropy = 0;
    const totalChars = text.length;
    
    for (const char in charCount) {
      const probability = charCount[char] / totalChars;
      entropy -= probability * Math.log2(probability);
    }
    
    return entropy;
  }
  
  /**
   * 🌌 Calculate ZeroPoint entropy of documentation
   */
  calculateZeroPointEntropy(document) {
    const baseEntropy = this.calculateBaseEntropy(document);
    const patternEntropy = this.calculatePatternEntropy(document);
    const consciousnessEntropy = this.calculateConsciousnessEntropy(document);
    const mathematicalEntropy = this.calculateMathematicalEntropy(document);
    
    return {
      total: baseEntropy + patternEntropy + consciousnessEntropy + mathematicalEntropy,
      base: baseEntropy,
      pattern: patternEntropy,
      consciousness: consciousnessEntropy,
      mathematical: mathematicalEntropy
    };
  }
  
  /**
   * 🌌 Calculate base entropy (information content)
   */
  calculateBaseEntropy(document) {
    const text = this.extractText(document);
    return this.calculateShannonEntropy(text);
  }
  
  /**
   * 🌌 Calculate pattern entropy (repetition and structure)
   */
  calculatePatternEntropy(document) {
    const text = this.extractText(document);
    const patterns = this.findPatterns(text);
    
    let patternEntropy = 0;
    for (const pattern of patterns) {
      patternEntropy += pattern.repetitions * pattern.length * 0.1;
    }
    
    return Math.min(patternEntropy, 1.0);
  }
  
  /**
   * 🌌 Calculate consciousness entropy (metaphysical content)
   */
  calculateConsciousnessEntropy(document) {
    const text = this.extractText(document).toLowerCase();
    let consciousnessCount = 0;
    
    for (const keyword of this.consciousnessKeywords) {
      try {
        const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const matches = text.match(regex);
        if (matches) {
          consciousnessCount += matches.length;
        }
      } catch {
        // Skip invalid regex patterns
        continue;
      }
    }
    
    return Math.min(consciousnessCount * 0.05, 1.0);
  }
  
  /**
   * 🌌 Calculate mathematical entropy (numerical content)
   */
  calculateMathematicalEntropy(document) {
    const text = this.extractText(document);
    const numbers = text.match(/\d+/g) || [];
    const mathematicalSymbols = text.match(/[+\-*/=<>≤≥√πφ∞]/g) || [];
    
    let mathematicalEntropy = 0;
    mathematicalEntropy += numbers.length * 0.02;
    mathematicalEntropy += mathematicalSymbols.length * 0.05;
    
    return Math.min(mathematicalEntropy, 1.0);
  }
  
  /**
   * 🌌 Extract text from document
   */
  extractText(document) {
    if (typeof document === 'string') {
      return document;
    }
    if (typeof document === 'object' && document !== null) {
      return JSON.stringify(document);
    }
    return String(document);
  }
  
  /**
   * 🌌 Find repeating patterns in text
   */
  findPatterns(text) {
    const patterns = [];
    
    for (let length = 2; length <= Math.min(10, text.length / 2); length++) {
      for (let start = 0; start <= text.length - length; start++) {
        const pattern = text.substring(start, start + length);
        try {
          const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
          const matches = text.match(regex);
          
          if (matches && matches.length > 1) {
            patterns.push({
              pattern,
              repetitions: matches.length,
              length
            });
          }
        } catch {
          // Skip invalid regex patterns
          continue;
        }
      }
    }
    
    return patterns;
  }
  
  /**
   * 🌌 Analyze file entropy
   */
  analyzeFileEntropy(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const entropy = this.calculateZeroPointEntropy(content);
      
      return {
        file: filePath,
        size: content.length,
        entropy: entropy,
        patterns: this.findPatterns(content).slice(0, 5), // Top 5 patterns
        consciousnessKeywords: this.findConsciousnessKeywords(content)
      };
    } catch (error) {
      return {
        file: filePath,
        error: error.message
      };
    }
  }
  
  /**
   * 🌌 Find consciousness keywords in text
   */
  findConsciousnessKeywords(text) {
    const lowerText = text.toLowerCase();
    const foundKeywords = {};
    
    for (const keyword of this.consciousnessKeywords) {
      try {
        const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const matches = lowerText.match(regex);
        if (matches) {
          foundKeywords[keyword] = matches.length;
        }
      } catch {
        // Skip invalid regex patterns
        continue;
      }
    }
    
    return foundKeywords;
  }
  
  /**
   * 🌌 Analyze directory entropy
   */
  analyzeDirectoryEntropy(dirPath) {
    const results = [];
    const self = this;
    
    function scanDirectory(currentPath) {
      const items = fs.readdirSync(currentPath);
      
      for (const item of items) {
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDirectory(fullPath);
        } else if (stat.isFile()) {
          const ext = path.extname(fullPath).toLowerCase();
          if (['.md', '.txt', '.js', '.ts', '.json'].includes(ext)) {
            results.push(self.analyzeFileEntropy(fullPath));
          }
        }
      }
    }
    
    scanDirectory(dirPath);
    return results;
  }
}

/**
 * 🌌 Main execution
 */
async function main() {
  const calculator = new DocumentationEntropyCalculator();
  
  console.log('🌌 Documentation Entropy Calculator\n');
  
  // Analyze specific files
  const filesToAnalyze = [
    'docs/index.md',
    'docs/UNIFIED_DOCUMENTATION_HUB.md',
    'VORTEX_INTERACTION_TRACES.md',
    'ENTROPY_IN_EVERY_MANIFESTATION.md',
    'DOCUMENTATION_ENTROPY_CALCULATOR.md'
  ];
  
  console.log('📊 Analyzing specific files:\n');
  
  for (const file of filesToAnalyze) {
    if (fs.existsSync(file)) {
      const analysis = calculator.analyzeFileEntropy(file);
      
      if (analysis.error) {
        console.log(`❌ ${file}: ${analysis.error}`);
      } else {
        console.log(`📄 ${file}:`);
        console.log(`   Size: ${analysis.size} characters`);
        console.log(`   Total Entropy: ${analysis.entropy.total.toFixed(3)}`);
        console.log(`   Base Entropy: ${analysis.entropy.base.toFixed(3)}`);
        console.log(`   Pattern Entropy: ${analysis.entropy.pattern.toFixed(3)}`);
        console.log(`   Consciousness Entropy: ${analysis.entropy.consciousness.toFixed(3)}`);
        console.log(`   Mathematical Entropy: ${analysis.entropy.mathematical.toFixed(3)}`);
        
        if (Object.keys(analysis.consciousnessKeywords).length > 0) {
          console.log(`   Consciousness Keywords: ${Object.keys(analysis.consciousnessKeywords).slice(0, 5).join(', ')}`);
        }
        console.log('');
      }
    } else {
      console.log(`❌ ${file}: File not found`);
    }
  }
  
  // Analyze docs directory
  console.log('📊 Analyzing docs directory:\n');
  
  if (fs.existsSync('docs')) {
    const docsAnalysis = calculator.analyzeDirectoryEntropy('docs');
    
    console.log(`Found ${docsAnalysis.length} files in docs directory:\n`);
    
    // Sort by total entropy
    docsAnalysis.sort((a, b) => (b.entropy?.total || 0) - (a.entropy?.total || 0));
    
    for (const analysis of docsAnalysis.slice(0, 10)) { // Top 10
      if (analysis.error) {
        console.log(`❌ ${analysis.file}: ${analysis.error}`);
      } else {
        console.log(`📄 ${analysis.file}:`);
        console.log(`   Size: ${analysis.size} characters`);
        console.log(`   Total Entropy: ${analysis.entropy.total.toFixed(3)}`);
        console.log(`   Base Entropy: ${analysis.entropy.base.toFixed(3)}`);
        console.log(`   Pattern Entropy: ${analysis.entropy.pattern.toFixed(3)}`);
        console.log(`   Consciousness Entropy: ${analysis.entropy.consciousness.toFixed(3)}`);
        console.log(`   Mathematical Entropy: ${analysis.entropy.mathematical.toFixed(3)}`);
        console.log('');
      }
    }
  }
  
  // Summary statistics
  console.log('📊 Summary Statistics:\n');
  
  const allAnalyses = [];
  for (const file of filesToAnalyze) {
    if (fs.existsSync(file)) {
      const analysis = calculator.analyzeFileEntropy(file);
      if (!analysis.error) {
        allAnalyses.push(analysis);
      }
    }
  }
  
  if (allAnalyses.length > 0) {
    const totalEntropies = allAnalyses.map(a => a.entropy.total);
    const avgEntropy = totalEntropies.reduce((a, b) => a + b, 0) / totalEntropies.length;
    const maxEntropy = Math.max(...totalEntropies);
    const minEntropy = Math.min(...totalEntropies);
    
    console.log(`Average Total Entropy: ${avgEntropy.toFixed(3)}`);
    console.log(`Maximum Total Entropy: ${maxEntropy.toFixed(3)}`);
    console.log(`Minimum Total Entropy: ${minEntropy.toFixed(3)}`);
    console.log(`Files Analyzed: ${allAnalyses.length}`);
  }
}

// Run the analysis
main().catch(console.error); 