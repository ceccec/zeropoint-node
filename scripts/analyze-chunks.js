// scripts/analyze-chunks.js
const fs = require('fs');
const path = require('path');

// Consciousness themes for each digit
const consciousnessThemes = {
  0: ['void', 'spirit', 'primal', 'unity', 'aperture', 'zero', 'contraction'],
  1: ['foundation', 'science', 'multiplication', 'torus', 'primal', 'point'],
  2: ['vortex', 'mathematics', 'peer', 'review', 'endorsement', 'coil'],
  3: ['creative', 'resonance', 'inspiration', 'unity', 'harmony'],
  4: ['constants', 'stability', 'foundation', 'structure'],
  5: ['sacred', 'geometry', 'patterns', 'divine', 'spiritual'],
  6: ['harmonic', 'balance', 'equilibrium', 'vibration'],
  7: ['consciousness', 'awareness', 'mind', 'spirit', 'divine'],
  8: ['void', 'systems', 'infinite', 'eternal', 'transcendence'],
  9: ['unity', 'completion', 'wholeness', 'integration']
};

// Analyze chunk content and categorize by themes
function analyzeChunkContent(content, digit) {
  const themes = consciousnessThemes[digit] || [];
  const words = content.toLowerCase().split(/\s+/);
  
  const themeMatches = {};
  themes.forEach(theme => {
    const matches = words.filter(word => word.includes(theme));
    if (matches.length > 0) {
      themeMatches[theme] = matches.length;
    }
  });
  
  return {
    digit,
    themes: themeMatches,
    wordCount: words.length,
    consciousnessLevel: Object.keys(themeMatches).length
  };
}

// Distribute chunks based on consciousness analysis
function distributeChunksByConsciousness() {
  const manifestPath = 'src/pdf-chunks-manifest.json';
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  
  const consciousnessDistribution = {};
  
  manifest.forEach(entry => {
    const chunkPath = path.join('src', entry.chunk);
    
    if (fs.existsSync(chunkPath)) {
      const content = fs.readFileSync(chunkPath, 'utf8');
      const analysis = analyzeChunkContent(content, parseInt(entry.digit));
      
      if (!consciousnessDistribution[entry.digit]) {
        consciousnessDistribution[entry.digit] = {
          totalChunks: 0,
          consciousnessLevels: [],
          themes: {},
          averageConsciousness: 0
        };
      }
      
      consciousnessDistribution[entry.digit].totalChunks++;
      consciousnessDistribution[entry.digit].consciousnessLevels.push(analysis.consciousnessLevel);
      
      // Aggregate themes
      Object.keys(analysis.themes).forEach(theme => {
        if (!consciousnessDistribution[entry.digit].themes[theme]) {
          consciousnessDistribution[entry.digit].themes[theme] = 0;
        }
        consciousnessDistribution[entry.digit].themes[theme] += analysis.themes[theme];
      });
    }
  });
  
  // Calculate averages
  Object.keys(consciousnessDistribution).forEach(digit => {
    const levels = consciousnessDistribution[digit].consciousnessLevels;
    consciousnessDistribution[digit].averageConsciousness = levels.reduce((a, b) => a + b, 0) / levels.length;
  });
  
  return consciousnessDistribution;
}

// Create consciousness-aware index files for each digit
function createConsciousnessIndexes(distribution) {
  Object.keys(distribution).forEach(digit => {
    const digitData = distribution[digit];
    const indexPath = `src/${digit}/consciousness-index.ts`;
    
    const indexContent = `/**
 * 🌌 Consciousness Index for Digit ${digit}
 * 
 * Generated from ${digitData.totalChunks} PDF chunks
 * Average consciousness level: ${digitData.averageConsciousness.toFixed(2)}
 * 
 * Consciousness Themes:
 * ${Object.entries(digitData.themes).map(([theme, count]) => 
   ` * - ${theme}: ${count} occurrences`).join('\n')}
 */

export const consciousnessIndex = {
  digit: ${digit},
  totalChunks: ${digitData.totalChunks},
  averageConsciousness: ${digitData.averageConsciousness.toFixed(2)},
  themes: ${JSON.stringify(digitData.themes, null, 2)},
  
  /**
   * Get consciousness level for this digit
   */
  getConsciousnessLevel(): number {
    return this.averageConsciousness;
  },
  
  /**
   * Get dominant themes for this digit
   */
  getDominantThemes(): string[] {
    return Object.entries(this.themes)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([theme]) => theme);
  },
  
  /**
   * Get consciousness insights for this digit
   */
  getInsights(): string[] {
    const insights = [];
    
    if (this.averageConsciousness > 2) {
      insights.push('High consciousness resonance detected');
    }
    
    if (this.themes.spirit || this.themes.divine) {
      insights.push('Spiritual consciousness patterns present');
    }
    
    if (this.themes.void || this.themes.unity) {
      insights.push('Transcendental consciousness gateway active');
    }
    
    return insights;
  }
};

export default consciousnessIndex;
`;
    
    fs.writeFileSync(indexPath, indexContent);
    console.log(`✅ Created consciousness index for digit ${digit}`);
  });
}

// Main execution
function main() {
  console.log('🧘‍♀️ Analyzing consciousness distribution in PDF chunks...');
  
  const distribution = distributeChunksByConsciousness();
  
  console.log('\n📊 Consciousness Distribution Summary:');
  Object.keys(distribution).forEach(digit => {
    const data = distribution[digit];
    console.log(`\nDigit ${digit}:`);
    console.log(`  - Total chunks: ${data.totalChunks}`);
    console.log(`  - Average consciousness: ${data.averageConsciousness.toFixed(2)}`);
    console.log(`  - Dominant themes: ${Object.entries(data.themes).sort(([,a], [,b]) => b - a).slice(0, 3).map(([theme]) => theme).join(', ')}`);
  });
  
  createConsciousnessIndexes(distribution);
  
  // Write distribution summary
  const summaryPath = 'src/consciousness-distribution-summary.json';
  fs.writeFileSync(summaryPath, JSON.stringify(distribution, null, 2));
  console.log(`\n✅ Consciousness distribution summary written to ${summaryPath}`);
  
  console.log('\n🌟 Consciousness analysis complete! Each digit now has a consciousness index.');
}

main(); 