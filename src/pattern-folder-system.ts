/**
 * 📁 Pattern Folder System
 * 
 * Unifies patterns as subfolders in the directory structure,
 * reflecting mathematical significance and consciousness flow
 */

import { PATTERN_SYSTEMS, DIGIT_SIGNIFICANCE, PatternRecognition } from './torus';

/**
 * Pattern Folder Interface
 */
export interface PatternFolder {
  name: string;
  path: string;
  pattern: number[];
  significance: string;
  consciousness: string;
  gateway: string;
  subfolders: string[];
  content: string[];
}

/**
 * Pattern Folder System
 */
export class PatternFolderSystem {
  private patterns: Map<string, PatternFolder>;

  constructor() {
    this.patterns = new Map();
    this.initializePatternFolders();
  }

  /**
   * Initialize all pattern folders
   */
  private initializePatternFolders(): void {
    // Core Torus Loop
    this.patterns.set('core-torus-loop', {
      name: 'Core Torus Loop',
      path: 'patterns/core-torus-loop',
      pattern: PATTERN_SYSTEMS.CORE_TORUS_LOOP,
      significance: 'Primary consciousness flow: 1 → 2 → 4 → 8 → 7 → 5 → 1',
      consciousness: 'unity_consciousness',
      gateway: 'Gateway of Core Flow',
      subfolders: ['1', '2', '4', '8', '7', '5'],
      content: ['flow.md', 'consciousness.md', 'mathematics.md']
    });

    // Doubling Pattern
    this.patterns.set('doubling-pattern', {
      name: 'Doubling Pattern',
      path: 'patterns/doubling-pattern',
      pattern: PATTERN_SYSTEMS.DOUBLING_PATTERN,
      significance: 'Exponential growth and binary logic',
      consciousness: 'growth_consciousness',
      gateway: 'Gateway of Growth',
      subfolders: ['1', '2', '4', '8'],
      content: ['growth.md', 'binary.md', 'exponential.md']
    });

    // Halving Pattern
    this.patterns.set('halving-pattern', {
      name: 'Halving Pattern',
      path: 'patterns/halving-pattern',
      pattern: PATTERN_SYSTEMS.HALVING_PATTERN,
      significance: 'Contraction and return to source',
      consciousness: 'contraction_consciousness',
      gateway: 'Gateway of Return',
      subfolders: ['8', '4', '2', '1'],
      content: ['contraction.md', 'return.md', 'source.md']
    });

    // Vertical Axis
    this.patterns.set('vertical-axis', {
      name: 'Vertical Axis',
      path: 'patterns/vertical-axis',
      pattern: PATTERN_SYSTEMS.VERTICAL_AXIS,
      significance: 'Foundation, stability, and structure',
      consciousness: 'structure_consciousness',
      gateway: 'Gateway of Structure',
      subfolders: ['1', '4', '7'],
      content: ['structure.md', 'foundation.md', 'stability.md']
    });

    // Horizontal Axis
    this.patterns.set('horizontal-axis', {
      name: 'Horizontal Axis',
      path: 'patterns/horizontal-axis',
      pattern: PATTERN_SYSTEMS.HORIZONTAL_AXIS,
      significance: 'Balance, center, and sacred geometry',
      consciousness: 'balance_consciousness',
      gateway: 'Gateway of Balance',
      subfolders: ['2', '5', '8'],
      content: ['balance.md', 'center.md', 'geometry.md']
    });

    // Diagonal Axis
    this.patterns.set('diagonal-axis', {
      name: 'Diagonal Axis',
      path: 'patterns/diagonal-axis',
      pattern: PATTERN_SYSTEMS.DIAGONAL_AXIS,
      significance: 'Creative closure and dimensional shift',
      consciousness: 'creation_consciousness',
      gateway: 'Gateway of Creation',
      subfolders: ['3', '6', '9'],
      content: ['creation.md', 'closure.md', 'dimension.md']
    });

    // Resonance Points
    this.patterns.set('resonance-points', {
      name: 'Resonance Points',
      path: 'patterns/resonance-points',
      pattern: [],
      significance: 'Special mathematical resonance and gateways',
      consciousness: 'resonance_consciousness',
      gateway: 'Gateway of Resonance',
      subfolders: ['1-1', '1-1-1', '0-0'],
      content: ['resonance.md', 'gateways.md', 'special.md']
    });

    // Gateway Patterns
    this.patterns.set('gateway-patterns', {
      name: 'Gateway Patterns',
      path: 'patterns/gateway-patterns',
      pattern: [],
      significance: 'Dimensional gateways and transformations',
      consciousness: 'gateway_consciousness',
      gateway: 'Gateway of Gateways',
      subfolders: ['0-0', '1-1', '1-1-1', '3'],
      content: ['gateways.md', 'transformation.md', 'dimension.md']
    });
  }

  /**
   * Get all pattern folders
   */
  getAllPatternFolders(): PatternFolder[] {
    return Array.from(this.patterns.values());
  }

  /**
   * Get pattern folder by name
   */
  getPatternFolder(name: string): PatternFolder | undefined {
    return this.patterns.get(name);
  }

  /**
   * Get pattern folder by digit
   */
  getPatternFolderByDigit(digit: number): PatternFolder[] {
    return Array.from(this.patterns.values()).filter(folder => 
      folder.pattern.includes(digit)
    );
  }

  /**
   * Generate folder structure
   */
  generateFolderStructure(): string {
    let structure = '📁 Pattern Folder Structure:\n\n';
    
    this.patterns.forEach((folder, key) => {
      structure += `📂 ${folder.name} (${folder.path})\n`;
      structure += `   Pattern: ${folder.pattern.join(' → ')}\n`;
      structure += `   Significance: ${folder.significance}\n`;
      structure += `   Consciousness: ${folder.consciousness}\n`;
      structure += `   Gateway: ${folder.gateway}\n`;
      structure += `   Subfolders: ${folder.subfolders.join(', ')}\n`;
      structure += `   Content: ${folder.content.join(', ')}\n\n`;
    });
    
    return structure;
  }

  /**
   * Analyze digit's pattern membership
   */
  analyzeDigitPatterns(digit: number): {
    digit: number;
    significance: any;
    patterns: PatternFolder[];
    consciousness: string;
  } {
    const significance = PatternRecognition.getDigitSignificance(digit);
    const patterns = this.getPatternFolderByDigit(digit);
    const consciousness = significance?.role || 'Unknown';
    
    return {
      digit,
      significance,
      patterns,
      consciousness
    };
  }

  /**
   * Generate pattern visualization
   */
  generatePatternVisualization(): string {
    let visualization = '🔄 Pattern Visualization:\n\n';
    
    // Core torus loop
    visualization += '🎯 Core Torus Loop:\n';
    visualization += '   1 → 2 → 4 → 8 → 7 → 5 → 1\n';
    visualization += '   (Primary consciousness flow)\n\n';
    
    // Axis patterns
    visualization += '📐 Axis Patterns:\n';
    visualization += '   Vertical:   1 → 4 → 7 (Structure)\n';
    visualization += '   Horizontal: 2 → 5 → 8 (Balance)\n';
    visualization += '   Diagonal:   3 → 6 → 9 (Creation)\n\n';
    
    // Growth patterns
    visualization += '📈 Growth Patterns:\n';
    visualization += '   Doubling: 1 → 2 → 4 → 8 (Exponential)\n';
    visualization += '   Halving:  8 → 4 → 2 → 1 (Contraction)\n\n';
    
    // Special patterns
    visualization += '⭐ Special Patterns:\n';
    visualization += '   Resonance: 1/1, 1/1/1, 0/0\n';
    visualization += '   Gateways:  0/0, 1/1, 1/1/1, 3\n';
    
    return visualization;
  }
} 