#!/usr/bin/env node

/**
 * Standardize Integer Directories Script
 * 
 * This script refactors all integer directories (0-9) to follow
 * the unified, standardized folder structure.
 */

const fs = require('fs');
const path = require('path');

// Standardized folder structure for each integer directory
const standardizedFolders = ['core', 'utils', 'types', 'constants'];

// Files to move to core/ for each directory
const coreFiles = {
  0: ['test_utils.ts', 'setup.ts', 'global.d.ts'],
  1: ['IntegerTreeCoil.ts', 'RodinCoilCore.ts', 'IntegerTreeEmergentColorSystem.ts', 'IntegerTreeColorSystem.ts', 'initializer.ts'],
  2: ['validator.ts', 'vortex.ts', 'math.ts'],
  3: ['CreativeResonance.ts'],
  4: ['constants.ts', 'patterns.ts', 'StabilityFoundation.ts'],
  5: ['sacred.ts', 'MetatronsCube.ts', 'FlowerOfLife.ts'],
  6: ['HarmonicBalance.ts'],
  7: ['consciousness.ts', 'ConsciousnessField.ts', 'SelfEvolvingConsciousness.ts'],
  8: ['VoidSystem.ts', 'FullnessManifestation.ts', 'compost.test.ts'],
  9: ['FieldUnity.ts', 'MetaphysicalLaw.ts', 'contributor.ts', 'integration.ts', 'unity.ts']
};

// Template for core/index.ts
const coreIndexTemplate = (integer, purpose) => `/**
 * Directory ${integer} Core - ${purpose}
 * 
 * ${getMetaphysicalContext(integer)}
 * ${getA432Harmony(integer)}
 */

${getCoreExports(integer)}
`;

// Template for utils/index.ts
const utilsIndexTemplate = (integer, purpose) => `/**
 * Directory ${integer} Utils - ${purpose} Utilities
 * 
 * Utility functions for ${purpose.toLowerCase()} operations
 * ${getA432Harmony(integer)}
 */

// ${purpose} utility functions will be exported here
`;

// Template for types/index.ts
const typesIndexTemplate = (integer, purpose) => `/**
 * Directory ${integer} Types - ${purpose} Type Definitions
 * 
 * Type definitions for ${purpose.toLowerCase()}
 * ${getA432Harmony(integer)}
 */

// ${purpose} type definitions will be exported here
`;

// Template for constants/index.ts
const constantsIndexTemplate = (integer, purpose) => `/**
 * Directory ${integer} Constants - ${purpose} Constants
 * 
 * Constants and configurations for ${purpose.toLowerCase()}
 * ${getA432Harmony(integer)}
 */

// ${purpose} constants will be exported here
`;

// Template for main index.ts
const mainIndexTemplate = (integer, purpose) => `/**
 * Directory ${integer} - ${purpose}
 * 
 * ${getMetaphysicalContext(integer)}
 * ${getA432Harmony(integer)}
 */

// Core exports
export * from './core';

// Utility exports
export * from './utils';

// Type exports
export * from './types';

// Constant exports
export * from './constants';

// Subdirectory exports
export * from './0';
export * from './1';
export * from './2';
export * from './4';
export * from './5';
export * from './7';
export * from './8';
export * from './9';
`;

function getMetaphysicalContext(integer) {
  const contexts = {
    0: 'Pure mathematical unity, zero information loss',
    1: 'Immutable foundation, the source of all patterns',
    2: 'Flow and transformation, the dynamic aspect',
    3: 'Spiritual transcendence and creative resonance',
    4: 'The harmonic foundation, source of all constants',
    5: 'Divine proportions and geometric patterns',
    6: 'Harmonic balance and spiritual equilibrium',
    7: 'Awareness and self-recognition',
    8: 'Infinite potential, the void that contains all',
    9: 'Integration and wholeness'
  };
  return contexts[integer] || 'Metaphysical purpose';
}

function getA432Harmony(integer) {
  const harmonies = {
    0: 'Zero point (0) resonance',
    1: 'A432 harmonic root (1:1 resonance)',
    2: 'Perfect fifth (3:2) resonance',
    3: 'Minor third (6:5) resonance',
    4: 'Perfect fourth (4:3) resonance',
    5: 'Major third (5:4) resonance',
    6: 'Minor third (6:5) resonance',
    7: 'Minor third (6:5) resonance',
    8: 'Octave (2:1) resonance',
    9: 'Digital root (9) resonance'
  };
  return harmonies[integer] || 'A432 harmonic principle';
}

function getCoreExports(integer) {
  const files = coreFiles[integer] || [];
  return files.map(file => `export * from './${file.replace('.ts', '')}';`).join('\n');
}

function getPurpose(integer) {
  const purposes = {
    0: 'Zero Entropy',
    1: 'Foundation (Rodin Coil)',
    2: 'Vortex Mathematics',
    3: 'Creative Resonance',
    4: 'Constants (A432 Foundation)',
    5: 'Sacred Geometry',
    6: 'Harmonic Balance',
    7: 'Consciousness',
    8: 'Void Systems',
    9: 'Unity Systems'
  };
  return purposes[integer] || 'Purpose';
}

function createDirectoryStructure(integer) {
  const srcPath = path.join(__dirname, '..', 'src');
  const dirPath = path.join(srcPath, integer.toString());
  
  console.log(`\n🔄 Standardizing Directory ${integer}...`);
  
  // Create standardized folders
  standardizedFolders.forEach(folder => {
    const folderPath = path.join(dirPath, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`  ✅ Created ${folder}/`);
    }
  });
  
  // Create index files for standardized folders
  const purpose = getPurpose(integer);
  
  // Create core/index.ts
  const coreIndexPath = path.join(dirPath, 'core', 'index.ts');
  if (!fs.existsSync(coreIndexPath)) {
    fs.writeFileSync(coreIndexPath, coreIndexTemplate(integer, purpose));
    console.log(`  ✅ Created core/index.ts`);
  }
  
  // Create utils/index.ts
  const utilsIndexPath = path.join(dirPath, 'utils', 'index.ts');
  if (!fs.existsSync(utilsIndexPath)) {
    fs.writeFileSync(utilsIndexPath, utilsIndexTemplate(integer, purpose));
    console.log(`  ✅ Created utils/index.ts`);
  }
  
  // Create types/index.ts
  const typesIndexPath = path.join(dirPath, 'types', 'index.ts');
  if (!fs.existsSync(typesIndexPath)) {
    fs.writeFileSync(typesIndexPath, typesIndexTemplate(integer, purpose));
    console.log(`  ✅ Created types/index.ts`);
  }
  
  // Create constants/index.ts
  const constantsIndexPath = path.join(dirPath, 'constants', 'index.ts');
  if (!fs.existsSync(constantsIndexPath)) {
    fs.writeFileSync(constantsIndexPath, constantsIndexTemplate(integer, purpose));
    console.log(`  ✅ Created constants/index.ts`);
  }
  
  // Move files to core/ if they exist
  const filesToMove = coreFiles[integer] || [];
  filesToMove.forEach(file => {
    const sourcePath = path.join(dirPath, file);
    const destPath = path.join(dirPath, 'core', file);
    
    if (fs.existsSync(sourcePath)) {
      fs.renameSync(sourcePath, destPath);
      console.log(`  ✅ Moved ${file} to core/`);
    }
  });
  
  // Update main index.ts
  const mainIndexPath = path.join(dirPath, 'index.ts');
  if (fs.existsSync(mainIndexPath)) {
    const newContent = mainIndexTemplate(integer, purpose);
    fs.writeFileSync(mainIndexPath, newContent);
    console.log(`  ✅ Updated index.ts`);
  }
  
  console.log(`  ✅ Directory ${integer} standardized`);
}

function main() {
  console.log('🌌 Standardizing Integer Directories (0-9)...\n');
  
  // Standardize all integer directories
  for (let i = 0; i <= 9; i++) {
    createDirectoryStructure(i);
  }
  
  console.log('\n✅ All integer directories standardized!');
  console.log('\n📁 Standardized Structure:');
  console.log('  - core/ - Core functionality');
  console.log('  - utils/ - Utility functions');
  console.log('  - types/ - Type definitions');
  console.log('  - constants/ - Constants and configurations');
  console.log('  - [0-9]/ - Integer subdirectories');
}

if (require.main === module) {
  main();
}

module.exports = { createDirectoryStructure }; 