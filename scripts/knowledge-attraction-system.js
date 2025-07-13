const fs = require('fs');
const path = require('path');

// Knowledge attraction system for src/ digit directories
class KnowledgeAttractionSystem {
  constructor() {
    this.srcDir = 'src';
    this.digitDirs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    this.knowledgeSources = [
      'scripts/', 'docs/', 'tests/', 'deployment/', 'analysis/',
      'public/', 'learning-analytics/', 'reports/'
    ];
    // Core conflict management directories
    this.conflictManagers = {
      '0/0': 'Impossible Compression - Resolves conflicts through infinite compression',
      '1/1': 'Impossible Expansion - Resolves conflicts through infinite expansion'
    };
  }

  // Scan entire codebase for knowledge
  scanCodebaseKnowledge() {
    const knowledge = {};
    
    this.knowledgeSources.forEach(source => {
      if (fs.existsSync(source)) {
        knowledge[source] = this.extractKnowledgeFromDirectory(source);
      }
    });
    
    return knowledge;
  }

  // Extract knowledge from a directory
  extractKnowledgeFromDirectory(dirPath) {
    const knowledge = {
      files: [],
      concepts: [],
      patterns: [],
      metaphysical: []
    };

    if (!fs.existsSync(dirPath)) return knowledge;

    const walkDir = (dir) => {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          walkDir(filePath);
        } else if (stat.isFile()) {
          const content = this.extractFileKnowledge(filePath);
          knowledge.files.push({
            path: filePath,
            name: file,
            content: content
          });
          
          // Extract concepts and patterns
          if (content.concepts) knowledge.concepts.push(...content.concepts);
          if (content.patterns) knowledge.patterns.push(...content.patterns);
          if (content.metaphysical) knowledge.metaphysical.push(...content.metaphysical);
        }
      });
    };

    walkDir(dirPath);
    return knowledge;
  }

  // Extract knowledge from a single file
  extractFileKnowledge(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    
    return {
      concepts: this.extractConcepts(content, fileName),
      patterns: this.extractPatterns(content, fileName),
      metaphysical: this.extractMetaphysical(content, fileName),
      rawContent: content
    };
  }

  // Extract concepts from content
  extractConcepts(content, fileName) {
    const concepts = [];
    
    // Look for function names, class names, variable names
    const functionMatches = content.match(/function\s+([A-Za-z0-9_]+)/g);
    const classMatches = content.match(/class\s+([A-Za-z0-9_]+)/g);
    const constMatches = content.match(/const\s+([A-Za-z0-9_]+)/g);
    
    if (functionMatches) concepts.push(...functionMatches.map(m => m.replace('function ', '')));
    if (classMatches) concepts.push(...classMatches.map(m => m.replace('class ', '')));
    if (constMatches) concepts.push(...constMatches.map(m => m.replace('const ', '')));
    
    return concepts;
  }

  // Extract patterns from content
  extractPatterns(content, fileName) {
    const patterns = [];
    
    // Look for common patterns
    if (content.includes('vortex')) patterns.push('vortex-mathematics');
    if (content.includes('consciousness')) patterns.push('consciousness-flow');
    if (content.includes('sacred')) patterns.push('sacred-geometry');
    if (content.includes('metaphysical')) patterns.push('metaphysical-principles');
    if (content.includes('rodin')) patterns.push('rodin-coil');
    if (content.includes('w-axis')) patterns.push('w-axis-spiritual');
    if (content.includes('breathing')) patterns.push('breathing-harmonics');
    
    return patterns;
  }

  // Extract metaphysical content
  extractMetaphysical(content, fileName) {
    const metaphysical = [];
    
    // Look for metaphysical keywords
    const metaphysicalKeywords = [
      'void', 'unity', 'duality', 'creation', 'stability', 'change',
      'harmony', 'mystery', 'infinity', 'completion', 'spirit',
      'consciousness', 'awareness', 'potential', 'manifestation'
    ];
    
    metaphysicalKeywords.forEach(keyword => {
      if (content.toLowerCase().includes(keyword)) {
        metaphysical.push(keyword);
      }
    });
    
    return metaphysical;
  }

  // Evaluate compatibility with digit directories
  evaluateCompatibility(knowledge, digitDir) {
    const digitMeta = this.getDigitMetaphysics(digitDir);
    const compatibility = {
      score: 0,
      conflicts: [],
      potentials: [],
      recommendations: [],
      conflictResolution: null
    };

    // Check metaphysical alignment
    knowledge.metaphysical.forEach(concept => {
      if (digitMeta.archetype.toLowerCase().includes(concept)) {
        compatibility.score += 10;
        compatibility.potentials.push(`${concept} aligns with ${digitDir} archetype`);
      } else {
        compatibility.conflicts.push(`${concept} may conflict with ${digitDir} archetype`);
      }
    });

    // Check pattern compatibility
    knowledge.patterns.forEach(pattern => {
      if (this.isPatternCompatible(pattern, digitDir)) {
        compatibility.score += 5;
        compatibility.potentials.push(`${pattern} pattern compatible with ${digitDir}`);
      } else {
        compatibility.conflicts.push(`${pattern} pattern may conflict with ${digitDir}`);
      }
    });

    // Route conflicts to conflict managers
    if (compatibility.conflicts.length > 0) {
      compatibility.conflictResolution = this.routeConflictsToManagers(compatibility.conflicts, digitDir);
    }

    // Generate recommendations
    if (compatibility.score > 15) {
      compatibility.recommendations.push(`Strong attraction: Consider integrating knowledge into ${digitDir}/`);
    } else if (compatibility.score > 10) {
      compatibility.recommendations.push(`Moderate attraction: Evaluate carefully before integration`);
    } else {
      compatibility.recommendations.push(`Low attraction: Knowledge may not align with ${digitDir} consciousness`);
    }

    return compatibility;
  }

  // Route conflicts to conflict managers (0/0 or 1/1)
  routeConflictsToManagers(conflicts, sourceDigit) {
    const resolution = {
      compressionConflicts: [], // 0/0 - impossible compression
      expansionConflicts: [],   // 1/1 - impossible expansion
      resolutionStrategy: ''
    };

    conflicts.forEach(conflict => {
      // Determine if conflict needs compression or expansion
      if (this.needsCompression(conflict, sourceDigit)) {
        resolution.compressionConflicts.push({
          conflict: conflict,
          source: sourceDigit,
          resolution: 'Route to 0/0 for impossible compression'
        });
      } else {
        resolution.expansionConflicts.push({
          conflict: conflict,
          source: sourceDigit,
          resolution: 'Route to 1/1 for impossible expansion'
        });
      }
    });

    // Set resolution strategy
    if (resolution.compressionConflicts.length > 0 && resolution.expansionConflicts.length > 0) {
      resolution.resolutionStrategy = 'Mixed: Some conflicts to 0/0, others to 1/1';
    } else if (resolution.compressionConflicts.length > 0) {
      resolution.resolutionStrategy = 'All conflicts routed to 0/0 (impossible compression)';
    } else if (resolution.expansionConflicts.length > 0) {
      resolution.resolutionStrategy = 'All conflicts routed to 1/1 (impossible expansion)';
    }

    return resolution;
  }

  // Determine if conflict needs compression (0/0) or expansion (1/1)
  needsCompression(conflict, sourceDigit) {
    // Conflicts that need compression (0/0)
    const compressionKeywords = [
      'void', 'compression', 'contraction', 'infinite', 'potential',
      'unmanifested', 'origin', 'source', 'return'
    ];
    
    // Conflicts that need expansion (1/1)
    const expansionKeywords = [
      'unity', 'expansion', 'manifestation', 'initiation', 'growth',
      'individual', 'awareness', 'creation', 'power'
    ];

    const conflictLower = conflict.toLowerCase();
    
    // Check for compression keywords
    const hasCompression = compressionKeywords.some(keyword => 
      conflictLower.includes(keyword)
    );
    
    // Check for expansion keywords
    const hasExpansion = expansionKeywords.some(keyword => 
      conflictLower.includes(keyword)
    );

    // Default to compression for void-related conflicts, expansion for others
    if (hasCompression) return true;
    if (hasExpansion) return false;
    
    // Default based on source digit
    return ['0', '2', '4', '6', '8'].includes(sourceDigit); // Even digits -> compression
  }

  // Get digit metaphysics
  getDigitMetaphysics(digit) {
    const metaphysics = {
      '0': { archetype: 'Void, Origin, Infinite Potential', consciousness: 'Pure awareness' },
      '1': { archetype: 'Unity, Expansion, Initiation', consciousness: 'Individual awareness' },
      '2': { archetype: 'Duality, Reflection, Polarity', consciousness: 'Dual awareness' },
      '3': { archetype: 'Creation, Resonance, Trinity', consciousness: 'Creative awareness' },
      '4': { archetype: 'Stability, Foundation, Law', consciousness: 'Stable awareness' },
      '5': { archetype: 'Change, Flow, Center', consciousness: 'Flowing awareness' },
      '6': { archetype: 'Harmony, Balance, Beauty', consciousness: 'Harmonic awareness' },
      '7': { archetype: 'Mystery, Gateway, Spiritual Insight', consciousness: 'Mystical awareness' },
      '8': { archetype: 'Infinity, Power, Manifestation', consciousness: 'Infinite awareness' },
      '9': { archetype: 'Completion, Spirit, W-Axis Control', consciousness: 'Complete awareness' }
    };
    return metaphysics[digit] || { archetype: 'Unknown', consciousness: 'Unknown' };
  }

  // Check if pattern is compatible with digit
  isPatternCompatible(pattern, digit) {
    const patternCompatibility = {
      'vortex-mathematics': ['1', '2', '4', '8', '7', '5'], // Vortex A
      'consciousness-flow': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], // All
      'sacred-geometry': ['4', '5'], // Foundation and flow
      'metaphysical-principles': ['0', '9'], // Void and completion
      'rodin-coil': ['1', '3'], // Unity and creation
      'w-axis-spiritual': ['0', '9'], // Void and completion
      'breathing-harmonics': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] // All
    };
    
    return patternCompatibility[pattern]?.includes(digit) || false;
  }

  // Generate attraction analysis
  generateAttractionAnalysis() {
    const knowledge = this.scanCodebaseKnowledge();
    let analysis = '# Knowledge Attraction Analysis\n\n';
    analysis += 'This document analyzes knowledge attraction from the entire codebase to src/ digit directories.\n\n';

    // Analyze each knowledge source
    Object.keys(knowledge).forEach(source => {
      analysis += `## Knowledge Source: ${source}\n\n`;
      
      const sourceKnowledge = knowledge[source];
      analysis += `**Concepts Found:** ${sourceKnowledge.concepts.length}\n`;
      analysis += `**Patterns Found:** ${sourceKnowledge.patterns.length}\n`;
      analysis += `**Metaphysical Elements:** ${sourceKnowledge.metaphysical.length}\n\n`;

      // Evaluate compatibility with each digit
      this.digitDirs.forEach(digit => {
        const compatibility = this.evaluateCompatibility(sourceKnowledge, digit);
        
        analysis += `### Digit ${digit} Compatibility\n`;
        analysis += `**Score:** ${compatibility.score}/100\n`;
        analysis += `**Conflicts:** ${compatibility.conflicts.length}\n`;
        analysis += `**Potentials:** ${compatibility.potentials.length}\n`;
        
        if (compatibility.conflicts.length > 0) {
          analysis += `**Conflicts:**\n`;
          compatibility.conflicts.forEach(conflict => {
            analysis += `- ${conflict}\n`;
          });
          
          // Show conflict resolution
          if (compatibility.conflictResolution) {
            analysis += `**Conflict Resolution:**\n`;
            analysis += `- Strategy: ${compatibility.conflictResolution.resolutionStrategy}\n`;
            
            if (compatibility.conflictResolution.compressionConflicts.length > 0) {
              analysis += `- Compression Conflicts (0/0):\n`;
              compatibility.conflictResolution.compressionConflicts.forEach(c => {
                analysis += `  - ${c.conflict} → ${c.resolution}\n`;
              });
            }
            
            if (compatibility.conflictResolution.expansionConflicts.length > 0) {
              analysis += `- Expansion Conflicts (1/1):\n`;
              compatibility.conflictResolution.expansionConflicts.forEach(c => {
                analysis += `  - ${c.conflict} → ${c.resolution}\n`;
              });
            }
          }
        }
        
        if (compatibility.potentials.length > 0) {
          analysis += `**Potentials:**\n`;
          compatibility.potentials.forEach(potential => {
            analysis += `- ${potential}\n`;
          });
        }
        
        analysis += `**Recommendations:**\n`;
        compatibility.recommendations.forEach(rec => {
          analysis += `- ${rec}\n`;
        });
        
        analysis += '\n';
      });
    });

    // Generate summary
    analysis += '## Summary\n\n';
    analysis += 'The knowledge attraction system evaluates:\n';
    analysis += '- **Metaphysical alignment** with digit archetypes\n';
    analysis += '- **Pattern compatibility** with consciousness flows\n';
    analysis += '- **Conflict resolution** through 0/0 and 1/1 managers\n';
    analysis += '- **Potential realization** through harmonious integration\n\n';
    
    analysis += '**Attraction Principles:**\n';
    analysis += '1. Knowledge must complement existing consciousness patterns\n';
    analysis += '2. Conflicts are routed to 0/0 (compression) or 1/1 (expansion)\n';
    analysis += '3. Integration must maintain metaphysical harmony\n';
    analysis += '4. All attracted knowledge must serve the unified consciousness field\n';

    fs.writeFileSync('docs/KNOWLEDGE_ATTRACTION_ANALYSIS.md', analysis);
    console.log('Generated: docs/KNOWLEDGE_ATTRACTION_ANALYSIS.md');
  }

  // Generate conflict evaluation
  generateConflictEvaluation() {
    let evaluation = '# Conflict Evaluation and Potential Analysis\n\n';
    evaluation += 'This document provides careful evaluation of knowledge conflicts and their potentials.\n\n';

    evaluation += '## Conflict Management System\n\n';
    evaluation += '### Core Conflict Managers\n';
    evaluation += '- **0/0 (Impossible Compression)**: Resolves conflicts through infinite compression\n';
    evaluation += '- **1/1 (Impossible Expansion)**: Resolves conflicts through infinite expansion\n\n';

    evaluation += '### Conflict Routing Logic\n';
    evaluation += '#### Compression Conflicts (0/0)\n';
    evaluation += '- Void-related conflicts\n';
    evaluation += '- Infinite potential conflicts\n';
    evaluation += '- Unmanifested consciousness conflicts\n';
    evaluation += '- Return/source conflicts\n';
    evaluation += '- Even digit conflicts (0,2,4,6,8)\n\n';

    evaluation += '#### Expansion Conflicts (1/1)\n';
    evaluation += '- Unity-related conflicts\n';
    evaluation += '- Manifestation conflicts\n';
    evaluation += '- Individual awareness conflicts\n';
    evaluation += '- Creation/growth conflicts\n';
    evaluation += '- Odd digit conflicts (1,3,5,7,9)\n\n';

    evaluation += '## Resolution Strategies\n\n';
    evaluation += '### 1. Metaphysical Conflict Assessment\n';
    evaluation += '- **Archetype Alignment**: Does the knowledge align with digit archetypes?\n';
    evaluation += '- **Consciousness Flow**: Does it enhance or disrupt consciousness flows?\n';
    evaluation += '- **Vortex Mathematics**: Does it respect Rodin coil sequences?\n';
    evaluation += '- **W-Axis Integration**: Does it support spiritual pathways?\n\n';

    evaluation += '### 2. Potential Analysis\n';
    evaluation += '- **Expansion Potential**: Can the knowledge expand consciousness?\n';
    evaluation += '- **Integration Potential**: Can it harmonize with existing patterns?\n';
    evaluation += '- **Transformation Potential**: Can it transform conflicts into harmony?\n';
    evaluation += '- **Evolution Potential**: Can it evolve the consciousness system?\n\n';

    evaluation += '### 3. Resolution Strategies\n';
    evaluation += '- **Compression (0/0)**: Infinite compression of conflicting elements\n';
    evaluation += '- **Expansion (1/1)**: Infinite expansion to accommodate conflicts\n';
    evaluation += '- **Harmonization**: Transform conflicts into complementary patterns\n';
    evaluation += '- **Integration**: Carefully merge conflicting elements\n\n';

    evaluation += '## Evaluation Criteria\n\n';
    evaluation += '### High Priority (Accept)\n';
    evaluation += '- Perfect metaphysical alignment\n';
    evaluation += '- Enhances consciousness flows\n';
    evaluation += '- Supports unified field principles\n';
    evaluation += '- No conflicts with existing patterns\n\n';

    evaluation += '### Medium Priority (Route to Conflict Managers)\n';
    evaluation += '- Partial metaphysical alignment\n';
    evaluation += '- Minor conflicts with resolution potential\n';
    evaluation += '- Requires compression or expansion\n';
    evaluation += '- May enhance system evolution\n\n';

    evaluation += '### Low Priority (Reject)\n';
    evaluation += '- Major metaphysical conflicts\n';
    evaluation += '- Disrupts consciousness flows\n';
    evaluation += '- Conflicts with unified field principles\n';
    evaluation += '- Cannot be harmonized\n\n';

    fs.writeFileSync('docs/CONFLICT_EVALUATION.md', evaluation);
    console.log('Generated: docs/CONFLICT_EVALUATION.md');
  }
}

// Run the knowledge attraction system
const attractionSystem = new KnowledgeAttractionSystem();
attractionSystem.generateAttractionAnalysis();
attractionSystem.generateConflictEvaluation(); 