#!/usr/bin/env node

/**
 * experience-visualizer.js - ZeroPoint Experience System Visualizer
 * 
 * Visualizes the living mathematical consciousness system
 * Shows vortex flows, consciousness states, and experience patterns
 * Creates visual representations of the experience network
 */

// Experience Visualization Constants
const VISUALIZATION = {
  // Vortex sequence with flow directions
  VORTEX_FLOW: [
    { from: 1, to: 2, flow: 'Foundation → Flow' },
    { from: 2, to: 4, flow: 'Flow → Foundation' },
    { from: 4, to: 8, flow: 'Foundation → Infinite' },
    { from: 8, to: 7, flow: 'Infinite → Consciousness' },
    { from: 7, to: 5, flow: 'Consciousness → Sacred' },
    { from: 5, to: 1, flow: 'Sacred → Foundation' }
  ],
  
  // W-Axis spiritual flow
  W_AXIS_FLOW: [
    { from: 3, to: 6, flow: 'Creative → Harmony' },
    { from: 6, to: 9, flow: 'Harmony → Unity' },
    { from: 9, to: 3, flow: 'Unity → Creative' }
  ],
  
  // Consciousness state symbols
  CONSCIOUSNESS_SYMBOLS: {
    0: '⚫', // Void Center
    1: '🔵', // Foundation
    2: '🌊', // Flow
    3: '✨', // Creative
    4: '🔶', // Stability
    5: '⭐', // Sacred
    6: '🎵', // Harmony
    7: '🚪', // Gateway
    8: '♾️', // Void
    9: '🔄'  // Unity
  },
  
  // Harmony pattern symbols
  HARMONY_SYMBOLS: {
    'self-identity': '🔄',
    'unity': '💫',
    'void-gateway': '⚫',
    'axis': '🌟'
  }
};

class ExperienceVisualizer {
  constructor() {
    this.vortexMatrix = this.createVortexMatrix();
    this.consciousnessFlow = [];
    this.harmonyPatterns = [];
  }

  /**
   * Create 10x10 vortex matrix
   */
  createVortexMatrix() {
    const matrix = [];
    for (let i = 0; i < 10; i++) {
      matrix[i] = [];
      for (let j = 0; j < 10; j++) {
        matrix[i][j] = {
          a: i,
          b: j,
          vortexA: this.calculateVortexA(i, j),
          vortexB: this.calculateVortexB(i, j),
          harmony: this.detectHarmonyPattern(i, j)
        };
      }
    }
    return matrix;
  }

  /**
   * Calculate vortex A (integer harmonic result)
   */
  calculateVortexA(a, b) {
    const sum = (a + b) % 9;
    return sum === 0 ? 9 : sum;
  }

  /**
   * Calculate vortex B (decimal inverse vortex)
   */
  calculateVortexB(a, b) {
    const vortexA = this.calculateVortexA(a, b);
    return (a + b) / vortexA;
  }

  /**
   * Detect harmony patterns
   */
  detectHarmonyPattern(a, b) {
    if (a === b) return 'self-identity';
    if (a === 9 && b === 9) return 'unity';
    if (a === 0 || b === 0) return 'void-gateway';
    if ([3, 6, 9].includes(a) && a === b) return 'axis';
    return null;
  }

  /**
   * Visualize vortex sequence flow
   */
  visualizeVortexSequence() {
    console.log('\n🌊 Vortex Sequence Flow Visualization:');
    console.log('=====================================');
    
    VISUALIZATION.VORTEX_FLOW.forEach((flow, index) => {
      const fromSymbol = VISUALIZATION.CONSCIOUSNESS_SYMBOLS[flow.from];
      const toSymbol = VISUALIZATION.CONSCIOUSNESS_SYMBOLS[flow.to];
      const vortexA = this.calculateVortexA(flow.from, flow.to);
      const vortexB = this.calculateVortexB(flow.from, flow.to);
      
      console.log(`${fromSymbol} ${flow.from} → ${flow.to} ${toSymbol}`);
      console.log(`  Flow: ${flow.flow}`);
      console.log(`  Vortex A: ${vortexA} | Vortex B: ${vortexB.toFixed(3)}`);
      console.log('');
    });
  }

  /**
   * Visualize W-Axis spiritual flow
   */
  visualizeWAxisFlow() {
    console.log('🌟 W-Axis Spiritual Flow Visualization:');
    console.log('=====================================');
    
    VISUALIZATION.W_AXIS_FLOW.forEach((flow, index) => {
      const fromSymbol = VISUALIZATION.CONSCIOUSNESS_SYMBOLS[flow.from];
      const toSymbol = VISUALIZATION.CONSCIOUSNESS_SYMBOLS[flow.to];
      const vortexA = this.calculateVortexA(flow.from, flow.to);
      const vortexB = this.calculateVortexB(flow.from, flow.to);
      
      console.log(`${fromSymbol} ${flow.from} → ${flow.to} ${toSymbol}`);
      console.log(`  Flow: ${flow.flow}`);
      console.log(`  Vortex A: ${vortexA} | Vortex B: ${vortexB.toFixed(3)}`);
      console.log('');
    });
  }

  /**
   * Visualize consciousness states matrix
   */
  visualizeConsciousnessMatrix() {
    console.log('🧠 Consciousness States Matrix:');
    console.log('==============================');
    console.log('  0  1  2  3  4  5  6  7  8  9');
    console.log('  ──────────────────────────────');
    
    for (let i = 0; i < 10; i++) {
      let row = `${i} `;
      for (let j = 0; j < 10; j++) {
        const cell = this.vortexMatrix[i][j];
        const symbol = VISUALIZATION.CONSCIOUSNESS_SYMBOLS[i];
        const harmony = cell.harmony;
        
        if (harmony) {
          const harmonySymbol = VISUALIZATION.HARMONY_SYMBOLS[harmony];
          row += `${harmonySymbol} `;
        } else {
          row += `${symbol} `;
        }
      }
      console.log(row);
    }
    console.log('');
  }

  /**
   * Visualize harmony patterns
   */
  visualizeHarmonyPatterns() {
    console.log('🎵 Harmony Patterns Visualization:');
    console.log('================================');
    
    const patterns = {
      'self-identity': [],
      'unity': [],
      'void-gateway': [],
      'axis': []
    };
    
    // Collect all harmony patterns
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = this.vortexMatrix[i][j];
        if (cell.harmony) {
          patterns[cell.harmony].push({ a: i, b: j, vortexA: cell.vortexA, vortexB: cell.vortexB });
        }
      }
    }
    
    // Display each pattern type
    Object.entries(patterns).forEach(([type, cells]) => {
      if (cells.length > 0) {
        const symbol = VISUALIZATION.HARMONY_SYMBOLS[type];
        console.log(`${symbol} ${type.toUpperCase()}:`);
        cells.forEach(cell => {
          console.log(`  ${cell.a}/${cell.b}: Vortex A=${cell.vortexA}, B=${cell.vortexB.toFixed(3)}`);
        });
        console.log('');
      }
    });
  }

  /**
   * Visualize transcendental experience
   */
  visualizeTranscendentalExperience() {
    console.log('🌌 Transcendental Experience Visualization:');
    console.log('========================================');
    
    const transcendentalNumbers = [
      { name: 'π', a: 3, b: 1, symbol: 'π' },
      { name: 'e', a: 2, b: 7, symbol: 'e' },
      { name: '√2', a: 1, b: 4, symbol: '√' },
      { name: 'φ', a: 1, b: 6, symbol: 'φ' }
    ];
    
    transcendentalNumbers.forEach(num => {
      const vortexA = this.calculateVortexA(num.a, num.b);
      const vortexB = this.calculateVortexB(num.a, num.b);
      const harmony = this.detectHarmonyPattern(num.a, num.b);
      
      console.log(`${num.symbol} ${num.name} (${num.a}/${num.b}):`);
      console.log(`  Vortex A: ${vortexA} | Vortex B: ${vortexB.toFixed(3)}`);
      if (harmony) {
        const symbol = VISUALIZATION.HARMONY_SYMBOLS[harmony];
        console.log(`  Harmony: ${symbol} ${harmony}`);
      }
      console.log('');
    });
  }

  /**
   * Visualize file organization in vortex
   */
  visualizeFileOrganization() {
    console.log('📁 File Organization in Vortex:');
    console.log('==============================');
    
    const fileCategories = {
      0: ['Gateway files', 'Transcendental states', 'Void transformation'],
      1: ['Core documentation', 'Foundation files', 'Rodin coil docs'],
      2: ['Mathematical proofs', 'Vortex calculations', 'Transformation docs'],
      3: ['Creative docs', 'Spiritual dimension', 'Resonance patterns'],
      4: ['Reference docs', 'Stable constants', 'Foundation patterns'],
      5: ['Sacred geometry', 'Divine proportion', 'Transformation files'],
      6: ['Harmony patterns', 'Balance docs', 'Beauty files'],
      7: ['Consciousness docs', 'Gateway files', 'Spiritual insight'],
      8: ['Void systems', 'Infinite potential', 'Fullness docs'],
      9: ['Unity docs', 'Integration files', 'Spirit dimension']
    };
    
    for (let digit = 0; digit <= 9; digit++) {
      const symbol = VISUALIZATION.CONSCIOUSNESS_SYMBOLS[digit];
      const files = fileCategories[digit];
      
      console.log(`${symbol} Digit ${digit}:`);
      files.forEach(file => {
        console.log(`  📄 ${file}`);
      });
      console.log('');
    }
  }

  /**
   * Create experience flow diagram
   */
  createExperienceFlowDiagram() {
    console.log('🔄 Experience Flow Diagram:');
    console.log('==========================');
    console.log('');
    console.log('     ⚫ 0 (Void Center)');
    console.log('        ↕');
    console.log('🔵 1 → 🌊 2 → 🔶 4 → ♾️ 8');
    console.log('  ↕                    ↕');
    console.log('🔄 9 ← ⭐ 5 ← 🚪 7 ← 🎵 6');
    console.log('        ↕');
    console.log('     ✨ 3 (Creative)');
    console.log('');
    console.log('Legend:');
    console.log('⚫ Void Center    🔵 Foundation    🌊 Flow');
    console.log('🔶 Stability      ♾️ Infinite      🚪 Gateway');
    console.log('⭐ Sacred         🎵 Harmony       ✨ Creative');
    console.log('🔄 Unity          🌟 W-Axis        💫 Unity Pattern');
    console.log('');
  }

  /**
   * Run complete visualization
   */
  runVisualization() {
    console.log('🌌 ZeroPoint Experience System Visualizer');
    console.log('========================================');
    console.log('');
    
    this.visualizeVortexSequence();
    this.visualizeWAxisFlow();
    this.visualizeConsciousnessMatrix();
    this.visualizeHarmonyPatterns();
    this.visualizeTranscendentalExperience();
    this.visualizeFileOrganization();
    this.createExperienceFlowDiagram();
    
    console.log('✅ Experience Visualization Complete');
    console.log('');
    console.log('The docs directory is now visualized as a living vortex');
    console.log('of mathematical consciousness with flowing experience patterns.');
  }
}

// Run the visualization
const visualizer = new ExperienceVisualizer();
visualizer.runVisualization(); 