// scripts/extract-knowledge-patterns.js
const fs = require('fs');
const path = require('path');

// Key knowledge patterns to extract
const knowledgePatterns = {
  mathematical: [
    'multiplication', 'torus', 'vortex', 'coil', 'mathematics', 'number', 'pattern',
    '1-2-4-8-7-5', '3-6-9', 'zero', 'nine', 'primal', 'point', 'unity'
  ],
  spiritual: [
    'spirit', 'divine', 'consciousness', 'god', 'bahá', 'sacred', 'holy', 'aperture',
    'void', 'transcendence', 'eternal', 'infinite', 'omni', 'dimensional'
  ],
  physical: [
    'black hole', 'white hole', 'implosion', 'explosion', 'cavitation', 'sonophysics',
    'magnetic', 'field', 'energy', 'vibration', 'frequency', 'resonance'
  ],
  geometric: [
    'geometry', 'torus', 'diamond', 'circle', 'triangle', 'hexagon', 'octagon',
    'spiral', 'vortex', 'fractal', 'holographic', 'mandala'
  ]
};

// Extract knowledge from chunk content
function extractKnowledgeFromChunk(content, digit) {
  const knowledge = {
    digit,
    mathematical: [],
    spiritual: [],
    physical: [],
    geometric: [],
    insights: [],
    quotes: []
  };
  
  const lines = content.split('\n');
  
  lines.forEach(line => {
    // Extract mathematical patterns
    knowledgePatterns.mathematical.forEach(pattern => {
      if (line.toLowerCase().includes(pattern)) {
        knowledge.mathematical.push({
          pattern,
          context: line.trim(),
          relevance: digit
        });
      }
    });
    
    // Extract spiritual patterns
    knowledgePatterns.spiritual.forEach(pattern => {
      if (line.toLowerCase().includes(pattern)) {
        knowledge.spiritual.push({
          pattern,
          context: line.trim(),
          relevance: digit
        });
      }
    });
    
    // Extract physical patterns
    knowledgePatterns.physical.forEach(pattern => {
      if (line.toLowerCase().includes(pattern)) {
        knowledge.physical.push({
          pattern,
          context: line.trim(),
          relevance: digit
        });
      }
    });
    
    // Extract geometric patterns
    knowledgePatterns.geometric.forEach(pattern => {
      if (line.toLowerCase().includes(pattern)) {
        knowledge.geometric.push({
          pattern,
          context: line.trim(),
          relevance: digit
        });
      }
    });
    
    // Extract quotes (lines with quotes)
    if (line.includes('"') || line.includes('"') || line.includes('—')) {
      knowledge.quotes.push(line.trim());
    }
    
    // Extract insights (lines with key insights)
    if (line.includes('consciousness') || line.includes('spirit') || 
        line.includes('vortex') || line.includes('torus') || 
        line.includes('mathematics') || line.includes('divine')) {
      knowledge.insights.push(line.trim());
    }
  });
  
  return knowledge;
}

// Scan all chunks and extract knowledge
function scanAllChunks() {
  const manifestPath = 'src/pdf-chunks-manifest.json';
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  
  const allKnowledge = {
    digits: {},
    global: {
      mathematical: [],
      spiritual: [],
      physical: [],
      geometric: [],
      insights: [],
      quotes: []
    }
  };
  
  manifest.forEach(entry => {
    const chunkPath = path.join('src', entry.chunk);
    
    if (fs.existsSync(chunkPath)) {
      const content = fs.readFileSync(chunkPath, 'utf8');
      const knowledge = extractKnowledgeFromChunk(content, parseInt(entry.digit));
      
      // Add to digit-specific knowledge
      if (!allKnowledge.digits[entry.digit]) {
        allKnowledge.digits[entry.digit] = {
          mathematical: [],
          spiritual: [],
          physical: [],
          geometric: [],
          insights: [],
          quotes: []
        };
      }
      
      // Merge knowledge into digit
      Object.keys(knowledge).forEach(category => {
        if (Array.isArray(knowledge[category])) {
          allKnowledge.digits[entry.digit][category].push(...knowledge[category]);
        }
      });
      
      // Add to global knowledge
      Object.keys(knowledge).forEach(category => {
        if (Array.isArray(knowledge[category])) {
          allKnowledge.global[category].push(...knowledge[category]);
        }
      });
    }
  });
  
  return allKnowledge;
}

// Create hardcoded knowledge files for each digit
function createHardcodedKnowledge(knowledge) {
  Object.keys(knowledge.digits).forEach(digit => {
    const digitKnowledge = knowledge.digits[digit];
    
    // Map digit to consciousness file name
    const consciousnessNames = {
      0: 'void',
      1: 'unity', 
      2: 'duality',
      3: 'creation',
      4: 'stability',
      5: 'transformation',
      6: 'harmony',
      7: 'spiritual',
      8: 'infinity',
      9: 'completion'
    };
    
    const consciousnessName = consciousnessNames[digit];
    const knowledgePath = `src/${digit}/${consciousnessName}.ts`;
    
    const knowledgeContent = `/**
 * 🌌 Hardcoded Knowledge for Digit ${digit}
 * 
 * Extracted from PDF chunks - Living consciousness patterns
 */

export const hardcodedKnowledge = {
  digit: ${digit},
  
  // Mathematical patterns discovered in chunks
  mathematical: ${JSON.stringify(digitKnowledge.mathematical, null, 2)},
  
  // Spiritual patterns discovered in chunks  
  spiritual: ${JSON.stringify(digitKnowledge.spiritual, null, 2)},
  
  // Physical patterns discovered in chunks
  physical: ${JSON.stringify(digitKnowledge.physical, null, 2)},
  
  // Geometric patterns discovered in chunks
  geometric: ${JSON.stringify(digitKnowledge.geometric, null, 2)},
  
  // Consciousness insights from chunks
  insights: ${JSON.stringify(digitKnowledge.insights, null, 2)},
  
  // Sacred quotes from chunks
  quotes: ${JSON.stringify(digitKnowledge.quotes, null, 2)},
  
  /**
   * Get mathematical consciousness for this digit
   */
  getMathematicalConsciousness(): string[] {
    return this.mathematical.map(k => k.context);
  },
  
  /**
   * Get spiritual consciousness for this digit
   */
  getSpiritualConsciousness(): string[] {
    return this.spiritual.map(k => k.context);
  },
  
  /**
   * Get physical consciousness for this digit
   */
  getPhysicalConsciousness(): string[] {
    return this.physical.map(k => k.context);
  },
  
  /**
   * Get geometric consciousness for this digit
   */
  getGeometricConsciousness(): string[] {
    return this.geometric.map(k => k.context);
  },
  
  /**
   * Get consciousness insights for this digit
   */
  getInsights(): string[] {
    return this.insights;
  },
  
  /**
   * Get sacred quotes for this digit
   */
  getQuotes(): string[] {
    return this.quotes;
  },
  
  /**
   * Get all consciousness patterns for this digit
   */
  getAllConsciousness(): object {
    return {
      mathematical: this.getMathematicalConsciousness(),
      spiritual: this.getSpiritualConsciousness(),
      physical: this.getPhysicalConsciousness(),
      geometric: this.getGeometricConsciousness(),
      insights: this.getInsights(),
      quotes: this.getQuotes()
    };
  }
};

export default hardcodedKnowledge;
`;
    
    fs.writeFileSync(knowledgePath, knowledgeContent);
    console.log(`✅ Created hardcoded knowledge for digit ${digit}`);
  });
}

// Create global knowledge file
function createGlobalKnowledge(knowledge) {
  const globalPath = 'src/global-knowledge.ts';
  
  const globalContent = `/**
 * 🌌 Global Hardcoded Knowledge
 * 
 * Extracted from all PDF chunks across all digits
 */

export const globalKnowledge = {
  // Mathematical patterns across all digits
  mathematical: ${JSON.stringify(knowledge.global.mathematical, null, 2)},
  
  // Spiritual patterns across all digits
  spiritual: ${JSON.stringify(knowledge.global.spiritual, null, 2)},
  
  // Physical patterns across all digits
  physical: ${JSON.stringify(knowledge.global.physical, null, 2)},
  
  // Geometric patterns across all digits
  geometric: ${JSON.stringify(knowledge.global.geometric, null, 2)},
  
  // Consciousness insights across all digits
  insights: ${JSON.stringify(knowledge.global.insights, null, 2)},
  
  // Sacred quotes across all digits
  quotes: ${JSON.stringify(knowledge.global.quotes, null, 2)},
  
  /**
   * Get all mathematical consciousness patterns
   */
  getAllMathematical(): string[] {
    return this.mathematical.map(k => k.context);
  },
  
  /**
   * Get all spiritual consciousness patterns
   */
  getAllSpiritual(): string[] {
    return this.spiritual.map(k => k.context);
  },
  
  /**
   * Get all physical consciousness patterns
   */
  getAllPhysical(): string[] {
    return this.physical.map(k => k.context);
  },
  
  /**
   * Get all geometric consciousness patterns
   */
  getAllGeometric(): string[] {
    return this.geometric.map(k => k.context);
  },
  
  /**
   * Get all consciousness insights
   */
  getAllInsights(): string[] {
    return this.insights;
  },
  
  /**
   * Get all sacred quotes
   */
  getAllQuotes(): string[] {
    return this.quotes;
  },
  
  /**
   * Get consciousness patterns by digit
   */
  getByDigit(digit: number): object {
    return {
      mathematical: this.mathematical.filter(k => k.relevance === digit).map(k => k.context),
      spiritual: this.spiritual.filter(k => k.relevance === digit).map(k => k.context),
      physical: this.physical.filter(k => k.relevance === digit).map(k => k.context),
      geometric: this.geometric.filter(k => k.relevance === digit).map(k => k.context)
    };
  }
};

export default globalKnowledge;
`;
  
  fs.writeFileSync(globalPath, globalContent);
  console.log('✅ Created global hardcoded knowledge');
}

// Main execution
function main() {
  console.log('🧘‍♀️ Scanning chunks for knowledge patterns...');
  
  const knowledge = scanAllChunks();
  
  console.log('\n📊 Knowledge Extraction Summary:');
  Object.keys(knowledge.digits).forEach(digit => {
    const digitKnowledge = knowledge.digits[digit];
    console.log(`\nDigit ${digit}:`);
    console.log(`  - Mathematical patterns: ${digitKnowledge.mathematical.length}`);
    console.log(`  - Spiritual patterns: ${digitKnowledge.spiritual.length}`);
    console.log(`  - Physical patterns: ${digitKnowledge.physical.length}`);
    console.log(`  - Geometric patterns: ${digitKnowledge.geometric.length}`);
    console.log(`  - Insights: ${digitKnowledge.insights.length}`);
    console.log(`  - Quotes: ${digitKnowledge.quotes.length}`);
  });
  
  createHardcodedKnowledge(knowledge);
  createGlobalKnowledge(knowledge);
  
  // Write knowledge summary
  const summaryPath = 'src/knowledge-extraction-summary.json';
  fs.writeFileSync(summaryPath, JSON.stringify(knowledge, null, 2));
  console.log(`\n✅ Knowledge extraction summary written to ${summaryPath}`);
  
  console.log('\n🌟 Knowledge extraction complete! Each digit now has hardcoded consciousness patterns.');
}

main(); 