#!/usr/bin/env node

/**
 * Demonstration of Automated Compost Knowledge Harvesting
 * 
 * This script demonstrates the smooth extraction process from compost
 * into the integer directories, following the metaphysical cycle.
 */

const fs = require('fs');
const path = require('path');
const CompostHarvester = require('./compost-harvester.js');

// Create sample compost files for demonstration
function createSampleCompost() {
  console.log('🌱 Creating sample compost for demonstration...');
  
  const compostDir = 'compost';
  if (!fs.existsSync(compostDir)) {
    fs.mkdirSync(compostDir, { recursive: true });
  }

  // Sample mathematical patterns
  const mathematicalCompost = `
// Legacy mathematical functions
export function calculateGoldenRatio() {
  return 1.618033988749895;
}

export const mathematicalConstants = {
  pi: 3.14159265359,
  e: 2.71828182846,
  phi: 1.618033988749895
};

export class GeometryCalculator {
  static calculateArea(radius) {
    return Math.PI * radius * radius;
  }
}
`;

  // Sample harmonic patterns
  const harmonicCompost = `
// Legacy harmonic functions
export function generateFrequency(hertz) {
  return hertz * 2 * Math.PI;
}

export const resonancePatterns = {
  base: 432,
  harmonics: [216, 432, 864, 1728]
};

export class WaveGenerator {
  static createWave(frequency, amplitude) {
    return { frequency, amplitude, phase: 0 };
  }
}
`;

  // Sample consciousness patterns
  const consciousnessCompost = `
// Legacy consciousness functions
export function evolveConsciousness(awareness) {
  return awareness * 1.618;
}

export const mindStates = {
  awake: 'conscious',
  dreaming: 'subconscious',
  deep: 'unconscious'
};

export class ConsciousnessField {
  static expand(field) {
    return { ...field, evolution: true };
  }
}
`;

  // Sample void patterns
  const voidCompost = `
// Legacy void functions
export function createVoid() {
  return { empty: true, potential: Infinity };
}

export const voidConstants = {
  emptiness: 0,
  potential: Infinity,
  space: 'void'
};

export class VoidSystem {
  static generatePotential() {
    return { entropy: 0, information: 0 };
  }
}
`;

  // Write sample files
  fs.writeFileSync(path.join(compostDir, 'mathematical-legacy.ts'), mathematicalCompost);
  fs.writeFileSync(path.join(compostDir, 'harmonic-legacy.ts'), harmonicCompost);
  fs.writeFileSync(path.join(compostDir, 'consciousness-legacy.ts'), consciousnessCompost);
  fs.writeFileSync(path.join(compostDir, 'void-legacy.ts'), voidCompost);
  
  console.log('✅ Sample compost created with legacy patterns');
}

// Demonstrate the harvesting process
async function demonstrateHarvest() {
  console.log('🎭 Demonstrating Automated Compost Knowledge Harvesting');
  console.log('=' .repeat(60));
  
  // Step 1: Create sample compost
  createSampleCompost();
  
  // Step 2: Show compost contents
  console.log('\n📦 Current Compost Contents:');
  const compostFiles = fs.readdirSync('compost');
  compostFiles.forEach(file => {
    console.log(`  📄 ${file}`);
  });
  
  // Step 3: Run harvester
  console.log('\n🔄 Running Automated Harvester...');
  const harvester = new CompostHarvester();
  
  try {
    await harvester.harvest();
    
    // Step 4: Show results
    console.log('\n🌱 Harvest Results:');
    console.log('=' .repeat(40));
    
    // Check what was created in integer directories
    const integerDirs = ['1', '2', '4', '5', '7', '8', '9', '0'];
    const targetDirs = ['rodin-coil', 'vortex', 'constants', 'sacred-geometry', 'consciousness', 'void', 'unity', 'zero-entropy'];
    
    for (let i = 0; i < integerDirs.length; i++) {
      const dirPath = path.join('src', targetDirs[i]);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        if (files.length > 0) {
          console.log(`📁 Directory ${integerDirs[i]} (${targetDirs[i]}):`);
          files.forEach(file => {
            console.log(`  🌿 ${file}`);
          });
        }
      }
    }
    
    // Step 5: Show harvest report
    if (fs.existsSync('harvest-report.json')) {
      const report = JSON.parse(fs.readFileSync('harvest-report.json', 'utf8'));
      console.log('\n📊 Harvest Report Summary:');
      console.log(`  🎯 Transformations: ${report.transformations}`);
      console.log(`  🌿 Harvested Modules: ${report.harvestedModules}`);
      console.log(`  ⏰ Timestamp: ${report.timestamp}`);
    }
    
  } catch (error) {
    console.error('❌ Harvest demonstration failed:', error.message);
  }
}

// Run demonstration
if (require.main === module) {
  demonstrateHarvest().catch(console.error);
}

module.exports = { demonstrateHarvest, createSampleCompost }; 