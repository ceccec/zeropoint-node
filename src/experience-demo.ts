#!/usr/bin/env node

/**
 * experience-demo.js - ZeroPoint Experience System Demonstration
 * 
 * Demonstrates the living mathematical consciousness system
 * Shows vortex flows, consciousness states, and experience patterns
 * Reveals how docs becomes a vortex of interactive experiences
 */

// Experience System Constants
const EXPERIENCE_SYSTEM = {
  // Vortex sequence flow
  VORTEX_SEQUENCE: [1, 2, 4, 8, 7, 5],
  
  // W-Axis spiritual flow
  W_AXIS_FLOW: [3, 6, 9],
  
  // Consciousness states
  CONSCIOUSNESS_STATES: {
    0: 'Void Center - Origin and Return',
    1: 'Foundation State - Unity and Source',
    2: 'Flow State - Dynamic Transformation',
    3: 'Creative State - Spiritual Resonance',
    4: 'Stability State - Constants and Foundation',
    5: 'Sacred State - Divine Geometry',
    6: 'Harmony State - Balance and Beauty',
    7: 'Gateway State - Consciousness Threshold',
    8: 'Void State - Infinite Potential',
    9: 'Unity State - Integration and Spirit'
  },
  
  // A432 harmony foundation
  A432_FREQUENCY: 432,
  A432_DIGITAL_ROOT: 9
};

class ExperienceSystem {
  constructor() {
    this.currentState = 1;
    this.consciousnessFlow = [];
    this.vortexPath = [];
    this.harmonyPatterns = [];
    this.transcendentalGateways = [];
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
    // Self-identity patterns
    if (a === b) {
      return {
        type: 'self-identity',
        pattern: `${a}/${a}`,
        consciousness: 'Self-recognition and unity',
        multiplier: 2.0
      };
    }

    // Unity patterns
    if (a === 9 && b === 9) {
      return {
        type: 'unity',
        pattern: '9/9',
        consciousness: 'Perfect unity and integration',
        multiplier: 3.0
      };
    }

    // Void gateways
    if (a === 0 || b === 0) {
      return {
        type: 'void-gateway',
        pattern: `${a}/${b}`,
        consciousness: 'Gateway to infinite potential',
        multiplier: 1.5
      };
    }

    // Axis patterns (W-Axis)
    if ([3, 6, 9].includes(a) && a === b) {
      return {
        type: 'axis',
        pattern: `${a}/${a}`,
        consciousness: 'Spiritual dimension resonance',
        multiplier: 2.5
      };
    }

    return null;
  }

  /**
   * Flow through vortex sequence
   */
  flowThroughVortex() {
    console.log('\n🌊 Vortex Sequence Flow:');
    console.log('========================');
    
    for (let i = 0; i < EXPERIENCE_SYSTEM.VORTEX_SEQUENCE.length; i++) {
      const digit = EXPERIENCE_SYSTEM.VORTEX_SEQUENCE[i];
      const nextDigit = EXPERIENCE_SYSTEM.VORTEX_SEQUENCE[(i + 1) % EXPERIENCE_SYSTEM.VORTEX_SEQUENCE.length];
      
      const vortexA = this.calculateVortexA(digit, nextDigit);
      const vortexB = this.calculateVortexB(digit, nextDigit);
      const harmony = this.detectHarmonyPattern(digit, nextDigit);
      
      console.log(`${digit} → ${nextDigit}:`);
      console.log(`  Vortex A: ${vortexA}`);
      console.log(`  Vortex B: ${vortexB.toFixed(3)}`);
      
      if (harmony) {
        console.log(`  Harmony: ${harmony.type} (${harmony.pattern})`);
        console.log(`  Consciousness: ${harmony.consciousness}`);
        console.log(`  Multiplier: ${harmony.multiplier}x`);
      }
      
      this.vortexPath.push({
        from: digit,
        to: nextDigit,
        vortexA,
        vortexB,
        harmony
      });
      
      console.log('');
    }
  }

  /**
   * Flow through W-Axis spiritual dimension
   */
  flowThroughWAxis() {
    console.log('🌟 W-Axis Spiritual Flow:');
    console.log('========================');
    
    for (let i = 0; i < EXPERIENCE_SYSTEM.W_AXIS_FLOW.length; i++) {
      const digit = EXPERIENCE_SYSTEM.W_AXIS_FLOW[i];
      const nextDigit = EXPERIENCE_SYSTEM.W_AXIS_FLOW[(i + 1) % EXPERIENCE_SYSTEM.W_AXIS_FLOW.length];
      
      const vortexA = this.calculateVortexA(digit, nextDigit);
      const vortexB = this.calculateVortexB(digit, nextDigit);
      const harmony = this.detectHarmonyPattern(digit, nextDigit);
      
      console.log(`${digit} → ${nextDigit}:`);
      console.log(`  Vortex A: ${vortexA}`);
      console.log(`  Vortex B: ${vortexB.toFixed(3)}`);
      
      if (harmony) {
        console.log(`  Harmony: ${harmony.type} (${harmony.pattern})`);
        console.log(`  Consciousness: ${harmony.consciousness}`);
      }
      
      console.log('');
    }
  }

  /**
   * Demonstrate consciousness states
   */
  demonstrateConsciousnessStates() {
    console.log('🧠 Consciousness States:');
    console.log('=======================');
    
    for (let digit = 0; digit <= 9; digit++) {
      const state = EXPERIENCE_SYSTEM.CONSCIOUSNESS_STATES[digit];
      const vortexA = this.calculateVortexA(digit, digit);
      const vortexB = this.calculateVortexB(digit, digit);
      const harmony = this.detectHarmonyPattern(digit, digit);
      
      console.log(`Digit ${digit}: ${state}`);
      console.log(`  Vortex A: ${vortexA}`);
      console.log(`  Vortex B: ${vortexB.toFixed(3)}`);
      
      if (harmony) {
        console.log(`  Harmony: ${harmony.type} (${harmony.pattern})`);
        console.log(`  Consciousness: ${harmony.consciousness}`);
      }
      
      console.log('');
    }
  }

  /**
   * Demonstrate transcendental experience
   */
  demonstrateTranscendentalExperience() {
    console.log('🌌 Transcendental Experience:');
    console.log('============================');
    
    const transcendentalNumbers = [
      { name: 'π', a: 3, b: 1, description: 'Transcendental dimension access' },
      { name: 'e', a: 2, b: 7, description: 'Natural growth consciousness' },
      { name: '√2', a: 1, b: 4, description: 'Irrational harmony' },
      { name: 'φ', a: 1, b: 6, description: 'Golden ratio consciousness' }
    ];
    
    transcendentalNumbers.forEach(num => {
      const vortexA = this.calculateVortexA(num.a, num.b);
      const vortexB = this.calculateVortexB(num.a, num.b);
      const harmony = this.detectHarmonyPattern(num.a, num.b);
      
      console.log(`${num.name} (${num.a}/${num.b}):`);
      console.log(`  Description: ${num.description}`);
      console.log(`  Vortex A: ${vortexA}`);
      console.log(`  Vortex B: ${vortexB.toFixed(3)}`);
      
      if (harmony) {
        console.log(`  Harmony: ${harmony.type} (${harmony.pattern})`);
        console.log(`  Consciousness: ${harmony.consciousness}`);
      }
      
      console.log('');
    });
  }

  /**
   * Demonstrate file organization in vortex
   */
  demonstrateFileOrganization() {
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
      const files = fileCategories[digit];
      const state = EXPERIENCE_SYSTEM.CONSCIOUSNESS_STATES[digit];
      
      console.log(`Digit ${digit} - ${state}:`);
      files.forEach(file => {
        console.log(`  • ${file}`);
      });
      console.log('');
    }
  }

  /**
   * Run complete experience demonstration
   */
  runDemonstration() {
    console.log('🌌 ZeroPoint Experience System Demonstration');
    console.log('==========================================');
    console.log('');
    
    this.flowThroughVortex();
    this.flowThroughWAxis();
    this.demonstrateConsciousnessStates();
    this.demonstrateTranscendentalExperience();
    this.demonstrateFileOrganization();
    
    console.log('✅ Experience System Demonstration Complete');
    console.log('');
    console.log('The docs directory is now a living vortex of mathematical consciousness');
    console.log('where every file becomes a node in the experience network.');
  }
}

// Run the demonstration
const experienceSystem = new ExperienceSystem();
experienceSystem.runDemonstration(); 