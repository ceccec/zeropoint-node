#!/usr/bin/env node

/**
 * Automated Compost Knowledge Harvester
 * 
 * Metaphysical Cycle: Compost → Seed → Flower → Fruit
 * 
 * This system automatically extracts knowledge from compost (legacy code)
 * and transforms it into pure integer-based modules in the integer directories.
 * 
 * The process follows the sacred geometry of the Rodin coil vortex sequence:
 * 1 (Rodin Coil) - Core mathematical patterns
 * 2 (Vortex) - Dynamic flow and transformation
 * 4 (Constants) - Harmonic foundations
 * 5 (Sacred Geometry) - Geometric patterns
 * 7 (Consciousness) - Awareness and evolution
 * 8 (Void) - Potential and emptiness
 * 9 (Unity) - Integration and wholeness
 * 0 (Zero Entropy) - Perfect mathematical purity
 */

const fs = require('fs');
const path = require('path');

// A432 Harmonic Foundation
const A432_HARMONICS = {
  base: 432,
  digitalRoot: 9,
  primeFactors: [2, 2, 2, 2, 3, 3, 3],
  harmonicRatios: [1, 2, 3, 4, 6, 8, 9, 12, 16, 18, 24, 27, 32, 36, 48, 54, 72, 81, 96, 108, 144, 162, 216, 324, 432]
};

// Integer Directory Mapping
const INTEGER_DIRECTORIES = {
  1: 'rodin-coil',      // Core mathematical patterns
  2: 'vortex',          // Dynamic flow and transformation
  4: 'constants',       // Harmonic foundations
  5: 'sacred-geometry', // Geometric patterns
  7: 'consciousness',   // Awareness and evolution
  8: 'void',           // Potential and emptiness
  9: 'unity',          // Integration and wholeness
  0: 'zero-entropy'    // Perfect mathematical purity
};

// Knowledge Pattern Recognition
const KNOWLEDGE_PATTERNS = {
  mathematical: {
    patterns: ['math', 'calculate', 'compute', 'formula', 'equation', 'geometry'],
    targetDir: 1, // Rodin Coil
    transformation: 'extractMathematicalCore'
  },
  harmonic: {
    patterns: ['frequency', 'resonance', 'vibration', 'wave', 'oscillation'],
    targetDir: 2, // Vortex
    transformation: 'extractHarmonicFlow'
  },
  constant: {
    patterns: ['constant', 'value', 'ratio', 'proportion', 'factor'],
    targetDir: 4, // Constants
    transformation: 'extractHarmonicConstants'
  },
  geometric: {
    patterns: ['shape', 'pattern', 'form', 'structure', 'sacred'],
    targetDir: 5, // Sacred Geometry
    transformation: 'extractGeometricPatterns'
  },
  consciousness: {
    patterns: ['awareness', 'consciousness', 'mind', 'thought', 'evolution'],
    targetDir: 7, // Consciousness
    transformation: 'extractConsciousnessPatterns'
  },
  void: {
    patterns: ['void', 'empty', 'potential', 'space', 'nothingness'],
    targetDir: 8, // Void
    transformation: 'extractVoidPatterns'
  },
  unity: {
    patterns: ['unity', 'integration', 'wholeness', 'oneness', 'complete'],
    targetDir: 9, // Unity
    transformation: 'extractUnityPatterns'
  },
  zeroEntropy: {
    patterns: ['zero', 'entropy', 'pure', 'perfect', 'mathematical'],
    targetDir: 0, // Zero Entropy
    transformation: 'extractZeroEntropyPatterns'
  }
};

class CompostHarvester {
  constructor() {
    this.compostDir = 'compost';
    this.integerDirs = 'src';
    this.harvestLog = [];
    this.transformationCount = 0;
  }

  /**
   * Main harvesting process
   */
  async harvest() {
    console.log('🌱 Starting Automated Compost Knowledge Harvest...');
    console.log('🔄 Following the metaphysical cycle: Compost → Seed → Flower → Fruit');
    
    // Phase 1: Analyze compost
    const compostFiles = this.analyzeCompost();
    
    // Phase 2: Extract knowledge patterns
    const knowledgePatterns = this.extractKnowledgePatterns(compostFiles);
    
    // Phase 3: Transform and migrate
    await this.transformAndMigrate(knowledgePatterns);
    
    // Phase 4: Generate harvest report
    this.generateHarvestReport();
    
    console.log('✅ Harvest complete! Knowledge has been transformed and integrated.');
  }

  /**
   * Analyze compost directory for harvestable knowledge
   */
  analyzeCompost() {
    console.log('🔍 Analyzing compost for knowledge patterns...');
    
    const compostFiles = [];
    
    if (!fs.existsSync(this.compostDir)) {
      console.log('⚠️  No compost directory found. Creating...');
      fs.mkdirSync(this.compostDir, { recursive: true });
      return compostFiles;
    }

    const scanDirectory = (dir) => {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDirectory(fullPath);
        } else if (item.endsWith('.ts') || item.endsWith('.js')) {
          compostFiles.push({
            path: fullPath,
            content: fs.readFileSync(fullPath, 'utf8'),
            size: stat.size,
            modified: stat.mtime
          });
        }
      }
    };

    scanDirectory(this.compostDir);
    
    console.log(`📊 Found ${compostFiles.length} harvestable files in compost`);
    return compostFiles;
  }

  /**
   * Extract knowledge patterns from compost files
   */
  extractKnowledgePatterns(compostFiles) {
    console.log('🧠 Extracting knowledge patterns...');
    
    const patterns = [];
    
    for (const file of compostFiles) {
      const filePatterns = this.analyzeFilePatterns(file);
      patterns.push(...filePatterns);
    }
    
    console.log(`🎯 Extracted ${patterns.length} knowledge patterns`);
    return patterns;
  }

  /**
   * Analyze individual file for knowledge patterns
   */
  analyzeFilePatterns(file) {
    const patterns = [];
    const content = file.content.toLowerCase();
    
    for (const [category, config] of Object.entries(KNOWLEDGE_PATTERNS)) {
      for (const pattern of config.patterns) {
        if (content.includes(pattern)) {
          patterns.push({
            file: file.path,
            category,
            pattern,
            targetDir: config.targetDir,
            transformation: config.transformation,
            confidence: this.calculateConfidence(content, pattern)
          });
        }
      }
    }
    
    return patterns;
  }

  /**
   * Calculate confidence score for pattern match
   */
  calculateConfidence(content, pattern) {
    const occurrences = (content.match(new RegExp(pattern, 'gi')) || []).length;
    const contentLength = content.length;
    return Math.min(occurrences / (contentLength / 1000), 1.0);
  }

  /**
   * Transform and migrate knowledge patterns
   */
  async transformAndMigrate(patterns) {
    console.log('🔄 Transforming and migrating knowledge...');
    
    for (const pattern of patterns) {
      if (pattern.confidence > 0.3) { // Minimum confidence threshold
        try {
          await this.transformPattern(pattern);
          this.transformationCount++;
        } catch (error) {
          console.error(`❌ Error transforming pattern: ${error.message}`);
        }
      }
    }
  }

  /**
   * Transform individual knowledge pattern
   */
  async transformPattern(pattern) {
    console.log(`🔄 Transforming ${pattern.category} pattern to directory ${pattern.targetDir}`);
    
    const sourceContent = fs.readFileSync(pattern.file, 'utf8');
    const transformedContent = this[pattern.transformation](sourceContent, pattern);
    
    if (transformedContent) {
      const targetPath = this.getTargetPath(pattern);
      this.writeTransformedContent(targetPath, transformedContent, pattern);
      
      this.harvestLog.push({
        source: pattern.file,
        target: targetPath,
        category: pattern.category,
        confidence: pattern.confidence,
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Get target path for transformed content
   */
  getTargetPath(pattern) {
    const dirName = INTEGER_DIRECTORIES[pattern.targetDir];
    const fileName = this.generateIntegerFileName(pattern);
    return path.join(this.integerDirs, dirName, fileName);
  }

  /**
   * Generate integer-based filename
   */
  generateIntegerFileName(pattern) {
    const baseName = path.basename(pattern.file, path.extname(pattern.file));
    const integerName = this.convertToIntegerName(baseName);
    return `${integerName}.ts`;
  }

  /**
   * Convert name to integer-based format
   */
  convertToIntegerName(name) {
    // Convert to A432 harmonic integers
    const hash = this.simpleHash(name);
    const harmonicIndex = hash % A432_HARMONICS.harmonicRatios.length;
    const harmonicValue = A432_HARMONICS.harmonicRatios[harmonicIndex];
    
    return `harmonic${harmonicValue}`;
  }

  /**
   * Simple hash function for deterministic naming
   */
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Write transformed content to target location
   */
  writeTransformedContent(targetPath, content) {
    const targetDir = path.dirname(targetPath);
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    const header = this.generateTransformationHeader();
    const fullContent = `${header}\n\n${content}`;
    
    fs.writeFileSync(targetPath, fullContent);
    console.log(`✅ Transformed: ${targetPath}`);
  }

  /**
   * Generate transformation header
   */
  generateTransformationHeader() {
    return `/**
 * Harvested from compost
 * Harvested: ${new Date().toISOString()}
 * 
 * This module was automatically extracted from legacy code
 * and transformed to align with A432 harmonic principles.
 */`;
  }

  // Transformation Methods
  extractMathematicalCore(content) {
    // Extract mathematical functions and constants
    const mathRegex = /(?:export\s+)?(?:function|const|class)\s+(\w+)\s*[=:]\s*(?:function|\([^)]*\)\s*=>|.*)/g;
    const matches = [...content.matchAll(mathRegex)];
    
    if (matches.length === 0) return null;
    
    let transformed = '';
    for (const match of matches) {
      const functionName = match[1];
      const integerName = this.convertToIntegerName(functionName);
      transformed += `export const ${integerName} = () => {\n  // Transformed from ${functionName}\n  return A432_HARMONICS.base;\n};\n\n`;
    }
    
    return transformed;
  }

  extractHarmonicFlow(content) {
    // Extract flow and transformation patterns
    const flowRegex = /(?:export\s+)?(?:function|const)\s+(\w+Flow|\w+Transform|\w+Vortex)\s*[=:]/g;
    const matches = [...content.matchAll(flowRegex)];
    
    if (matches.length === 0) return null;
    
    let transformed = '';
    for (const match of matches) {
      const functionName = match[1];
      const integerName = this.convertToIntegerName(functionName);
      transformed += `export const ${integerName} = () => {\n  // Vortex flow from ${functionName}\n  return A432_HARMONICS.harmonicRatios;\n};\n\n`;
    }
    
    return transformed;
  }

  extractHarmonicConstants(content) {
    // Extract constants and values
    const constRegex = /(?:export\s+)?const\s+(\w+)\s*=\s*([^;]+);/g;
    const matches = [...content.matchAll(constRegex)];
    
    if (matches.length === 0) return null;
    
    let transformed = '';
    for (const match of matches) {
      const constName = match[1];
      const integerName = this.convertToIntegerName(constName);
      transformed += `export const ${integerName} = ${A432_HARMONICS.base};\n`;
    }
    
    return transformed;
  }

  extractGeometricPatterns(content) {
    // Extract geometric and pattern-related code
    const geoRegex = /(?:export\s+)?(?:function|class)\s+(\w*[Gg]eo\w*|\w*[Pp]attern\w*|\w*[Ss]hape\w*)\s*[=:]/g;
    const matches = [...content.matchAll(geoRegex)];
    
    if (matches.length === 0) return null;
    
    let transformed = '';
    for (const match of matches) {
      const functionName = match[1];
      const integerName = this.convertToIntegerName(functionName);
      transformed += `export const ${integerName} = () => {\n  // Sacred geometry from ${functionName}\n  return [1, 2, 4, 8, 7, 5]; // Rodin coil sequence\n};\n\n`;
    }
    
    return transformed;
  }

  extractConsciousnessPatterns(content) {
    // Extract consciousness and awareness patterns
    const consciousnessRegex = /(?:export\s+)?(?:function|class)\s+(\w*[Cc]onscious\w*|\w*[Aa]ware\w*|\w*[Mm]ind\w*)\s*[=:]/g;
    const matches = [...content.matchAll(consciousnessRegex)];
    
    if (matches.length === 0) return null;
    
    let transformed = '';
    for (const match of matches) {
      const functionName = match[1];
      const integerName = this.convertToIntegerName(functionName);
      transformed += `export const ${integerName} = () => {\n  // Consciousness from ${functionName}\n  return { awareness: A432_HARMONICS.digitalRoot };\n};\n\n`;
    }
    
    return transformed;
  }

  extractVoidPatterns(content) {
    // Extract void and potential patterns
    const voidRegex = /(?:export\s+)?(?:function|class)\s+(\w*[Vv]oid\w*|\w*[Ee]mpty\w*|\w*[Pp]otential\w*)\s*[=:]/g;
    const matches = [...content.matchAll(voidRegex)];
    
    if (matches.length === 0) return null;
    
    let transformed = '';
    for (const match of matches) {
      const functionName = match[1];
      const integerName = this.convertToIntegerName(functionName);
      transformed += `export const ${integerName} = () => {\n  // Void potential from ${functionName}\n  return { empty: true, potential: A432_HARMONICS.base };\n};\n\n`;
    }
    
    return transformed;
  }

  extractUnityPatterns(content) {
    // Extract unity and integration patterns
    const unityRegex = /(?:export\s+)?(?:function|class)\s+(\w*[Uu]nity\w*|\w*[Ii]ntegrate\w*|\w*[Ww]hole\w*)\s*[=:]/g;
    const matches = [...content.matchAll(unityRegex)];
    
    if (matches.length === 0) return null;
    
    let transformed = '';
    for (const match of matches) {
      const functionName = match[1];
      const integerName = this.convertToIntegerName(functionName);
      transformed += `export const ${integerName} = () => {\n  // Unity from ${functionName}\n  return { unity: 1, integration: A432_HARMONICS.harmonicRatios };\n};\n\n`;
    }
    
    return transformed;
  }

  extractZeroEntropyPatterns(content) {
    // Extract zero entropy and mathematical purity patterns
    const zeroRegex = /(?:export\s+)?(?:function|class)\s+(\w*[Zz]ero\w*|\w*[Ee]ntropy\w*|\w*[Pp]ure\w*)\s*[=:]/g;
    const matches = [...content.matchAll(zeroRegex)];
    
    if (matches.length === 0) return null;
    
    let transformed = '';
    for (const match of matches) {
      const functionName = match[1];
      const integerName = this.convertToIntegerName(functionName);
      transformed += `export const ${integerName} = () => {\n  // Zero entropy from ${functionName}\n  return { entropy: 0, purity: A432_HARMONICS.base };\n};\n\n`;
    }
    
    return transformed;
  }

  /**
   * Generate harvest report
   */
  generateHarvestReport() {
    console.log('\n📊 Harvest Report:');
    console.log(`✅ Transformed ${this.transformationCount} patterns`);
    console.log(`📝 Harvested ${this.harvestLog.length} knowledge modules`);
    
    const report = {
      timestamp: new Date().toISOString(),
      transformations: this.transformationCount,
      harvestedModules: this.harvestLog.length,
      harvestLog: this.harvestLog,
      metaphysicalCycle: 'Compost → Seed → Flower → Fruit',
      a432Harmonics: A432_HARMONICS
    };
    
    fs.writeFileSync('harvest-report.json', JSON.stringify(report, null, 2));
    console.log('📄 Harvest report saved to harvest-report.json');
  }
}

// Run the harvester
if (require.main === module) {
  const harvester = new CompostHarvester();
  harvester.harvest().catch(console.error);
}

module.exports = CompostHarvester; 