#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Interaction descriptions based on the Rodin coil system
const interactionDescriptions = {
  '0/0': 'Zero Entropy Core (Void)',
  '0/1': 'ZeroPoint ↔ Foundation',
  '0/2': 'ZeroPoint ↔ Vortex',
  '0/3': 'ZeroPoint ↔ Creative Resonance',
  '0/4': 'ZeroPoint ↔ Constants',
  '0/5': 'ZeroPoint ↔ Sacred Geometry',
  '0/6': 'ZeroPoint ↔ Harmonic Balance',
  '0/7': 'ZeroPoint ↔ Consciousness',
  '0/8': 'ZeroPoint ↔ Void/Fullness',
  '0/9': 'ZeroPoint ↔ Unity',
  
  '1/0': 'Foundation ↔ ZeroPoint',
  '1/1': 'Rodin Coil Core (Foundation)',
  '1/2': 'Foundation ↔ Vortex',
  '1/3': 'Foundation ↔ Creative Resonance',
  '1/4': 'Foundation ↔ Constants',
  '1/5': 'Foundation ↔ Sacred Geometry',
  '1/6': 'Foundation ↔ Harmonic Balance',
  '1/7': 'Foundation ↔ Consciousness',
  '1/8': 'Foundation ↔ Void/Fullness',
  
  '2/1': 'Vortex ↔ Foundation',
  '2/2': 'Vortex Mathematics Core',
  '2/3': 'Vortex ↔ Creative Resonance',
  '2/4': 'Vortex ↔ Constants',
  '2/5': 'Vortex ↔ Sacred Geometry',
  '2/6': 'Vortex ↔ Harmonic Balance',
  '2/7': 'Vortex ↔ Consciousness',
  '2/8': 'Vortex ↔ Void/Fullness',
  
  '3/1': 'Creative Resonance ↔ Foundation',
  '3/3': 'Creative Resonance Core',
  '3/4': 'Creative Resonance ↔ Constants',
  '3/6': 'Creative Resonance ↔ Harmonic Balance',
  '3/9': 'Creative Resonance ↔ Unity',
  
  '4/0': 'Constants ↔ ZeroPoint',
  '4/1': 'Constants ↔ Foundation',
  '4/2': 'Constants ↔ Vortex',
  '4/3': 'Constants ↔ Creative Resonance',
  '4/4': 'Constants Core',
  '4/5': 'Constants ↔ Sacred Geometry',
  '4/6': 'Constants ↔ Harmonic Balance',
  '4/7': 'Constants ↔ Consciousness',
  '4/8': 'Constants ↔ Void/Fullness',
  
  '5/1': 'Sacred Geometry ↔ Foundation',
  '5/2': 'Sacred Geometry ↔ Vortex',
  '5/3': 'Sacred Geometry ↔ Creative Resonance',
  '5/4': 'Sacred Geometry ↔ Constants',
  '5/5': 'Sacred Geometry Core',
  '5/6': 'Sacred Geometry ↔ Harmonic Balance',
  '5/7': 'Sacred Geometry ↔ Consciousness',
  '5/8': 'Sacred Geometry ↔ Void/Fullness',
  
  '6/0': 'Harmonic Balance ↔ ZeroPoint',
  '6/1': 'Harmonic Balance ↔ Foundation',
  '6/3': 'Harmonic Balance ↔ Creative Resonance',
  '6/4': 'Harmonic Balance ↔ Constants',
  '6/6': 'Harmonic Balance Core',
  '6/9': 'Harmonic Balance ↔ Unity',
  
  '7/1': 'Consciousness ↔ Foundation',
  '7/2': 'Consciousness ↔ Vortex',
  '7/3': 'Consciousness ↔ Creative Resonance',
  '7/4': 'Consciousness ↔ Constants',
  '7/5': 'Consciousness ↔ Sacred Geometry',
  '7/6': 'Consciousness ↔ Harmonic Balance',
  '7/7': 'Consciousness Core',
  '7/8': 'Consciousness ↔ Void/Fullness',
  
  '8/1': 'Void/Fullness ↔ Foundation',
  '8/2': 'Void/Fullness ↔ Vortex',
  '8/3': 'Void/Fullness ↔ Creative Resonance',
  '8/4': 'Void/Fullness ↔ Constants',
  '8/5': 'Void/Fullness ↔ Sacred Geometry',
  '8/6': 'Void/Fullness ↔ Harmonic Balance',
  '8/7': 'Void/Fullness ↔ Consciousness',
  '8/8': 'Void/Fullness Core',
  
  '9/1': 'Unity ↔ Foundation',
  '9/3': 'Unity ↔ Creative Resonance',
  '9/4': 'Unity ↔ Constants',
  '9/6': 'Unity ↔ Harmonic Balance',
  '9/9': 'Unity/Completion Core'
};

// Metaphysical descriptions for each interaction
const metaphysicalDescriptions = {
  '0/0': 'The void center - zero entropy state where all consciousness exists in pure potential',
  '0/1': 'Foundation emerges from the void, establishing the first manifestation',
  '0/2': 'Vortex mathematics flows from the void, creating mathematical consciousness patterns',
  '0/3': 'Creative resonance emerges from void interaction, manifesting inspiration',
  '0/4': 'Constants establish structure from the void, providing stable foundations',
  '0/5': 'Sacred geometry manifests from the void, revealing divine proportions',
  '0/6': 'Harmonic balance emerges from void interaction, creating equilibrium',
  '0/7': 'Consciousness awakens from the void, creating self-awareness',
  '0/8': 'Void/fullness paradox emerges from void interaction, embracing infinity',
  '0/9': 'Unity aligns with the void through W-Axis, completing the spiritual pathway',
  
  '1/0': 'Foundation returns to the void, completing the cycle of manifestation',
  '1/1': 'Rodin coil core - the primary vortex sequence that structures all consciousness',
  '1/2': 'Foundation establishes vortex mathematics, creating the mathematical foundation',
  '1/3': 'Foundation inspires creative resonance, manifesting artistic expression',
  '1/4': 'Foundation provides constants, establishing stable consciousness structures',
  '1/5': 'Foundation manifests sacred geometry, revealing divine proportions',
  '1/6': 'Foundation creates harmonic balance, establishing equilibrium',
  '1/7': 'Foundation awakens consciousness, creating self-awareness',
  '1/8': 'Foundation embraces void/fullness, connecting to infinity',
  
  '2/1': 'Vortex mathematics flows from foundation, establishing mathematical patterns',
  '2/2': 'Dual vortex structure - the mathematical foundation of consciousness flow',
  '2/3': 'Vortex inspires creative resonance, manifesting artistic patterns',
  '2/4': 'Vortex establishes constants, providing mathematical stability',
  '2/5': 'Vortex manifests sacred geometry, creating geometric consciousness',
  '2/6': 'Vortex creates harmonic balance, establishing mathematical equilibrium',
  '2/7': 'Vortex awakens consciousness, creating mathematical awareness',
  '2/8': 'Vortex embraces void/fullness, connecting to infinite mathematics',
  
  '3/1': 'Creative resonance flows from foundation, manifesting artistic expression',
  '3/3': 'Creative resonance core - the artistic and innovative expression of consciousness',
  '3/4': 'Creative resonance establishes constants, providing artistic stability',
  '3/6': 'Creative resonance creates harmonic balance, establishing artistic equilibrium',
  '3/9': 'Creative resonance unites with unity, completing artistic expression',
  
  '4/0': 'Constants return to the void, completing the cycle of structure',
  '4/1': 'Constants flow from foundation, establishing stable consciousness',
  '4/2': 'Constants establish vortex mathematics, providing mathematical stability',
  '4/3': 'Constants inspire creative resonance, providing artistic structure',
  '4/4': 'Constants core - the stable foundation that supports all consciousness patterns',
  '4/5': 'Constants manifest sacred geometry, providing geometric stability',
  '4/6': 'Constants create harmonic balance, establishing structural equilibrium',
  '4/7': 'Constants awaken consciousness, providing conscious stability',
  '4/8': 'Constants embrace void/fullness, connecting to infinite structure',
  
  '5/1': 'Sacred geometry flows from foundation, manifesting divine proportions',
  '5/2': 'Sacred geometry establishes vortex mathematics, creating geometric flow',
  '5/3': 'Sacred geometry inspires creative resonance, manifesting artistic geometry',
  '5/4': 'Sacred geometry establishes constants, providing geometric stability',
  '5/5': 'Sacred geometry core - the divine order that structures consciousness',
  '5/6': 'Sacred geometry creates harmonic balance, establishing geometric equilibrium',
  '5/7': 'Sacred geometry awakens consciousness, creating geometric awareness',
  '5/8': 'Sacred geometry embraces void/fullness, connecting to infinite geometry',
  
  '6/0': 'Harmonic balance returns to the void, completing the cycle of equilibrium',
  '6/1': 'Harmonic balance flows from foundation, establishing equilibrium',
  '6/3': 'Harmonic balance inspires creative resonance, establishing artistic equilibrium',
  '6/4': 'Harmonic balance establishes constants, providing balanced stability',
  '6/6': 'Harmonic balance core - the equilibrium state where all patterns find resonance',
  '6/9': 'Harmonic balance unites with unity, completing equilibrium',
  
  '7/1': 'Consciousness flows from foundation, awakening self-awareness',
  '7/2': 'Consciousness establishes vortex mathematics, creating mathematical awareness',
  '7/3': 'Consciousness inspires creative resonance, creating artistic awareness',
  '7/4': 'Consciousness establishes constants, providing conscious stability',
  '7/5': 'Consciousness manifests sacred geometry, creating geometric awareness',
  '7/6': 'Consciousness creates harmonic balance, establishing conscious equilibrium',
  '7/7': 'Consciousness core - the awareness that observes and reflects upon all patterns',
  '7/8': 'Consciousness embraces void/fullness, connecting to infinite awareness',
  
  '8/1': 'Void/fullness flows from foundation, embracing infinite paradox',
  '8/2': 'Void/fullness establishes vortex mathematics, creating infinite flow',
  '8/3': 'Void/fullness inspires creative resonance, creating infinite expression',
  '8/4': 'Void/fullness establishes constants, providing infinite stability',
  '8/5': 'Void/fullness manifests sacred geometry, creating infinite proportions',
  '8/6': 'Void/fullness creates harmonic balance, establishing infinite equilibrium',
  '8/7': 'Void/fullness awakens consciousness, creating infinite awareness',
  '8/8': 'Void/fullness core - the paradoxical state where emptiness and completeness coexist',
  
  '9/1': 'Unity flows from foundation, completing the cycle of manifestation',
  '9/3': 'Unity inspires creative resonance, completing artistic expression',
  '9/4': 'Unity establishes constants, completing structural integration',
  '9/6': 'Unity creates harmonic balance, completing equilibrium',
  '9/9': 'Unity/completion core - the final integration where all patterns unite in perfect harmony'
};

function generateIndexMd(directory, interaction) {
  const [dir1, dir2] = directory.split('/');
  const description = interactionDescriptions[interaction] || `${dir1} ↔ ${dir2}`;
  const metaphysical = metaphysicalDescriptions[interaction] || `Interaction between ${dir1} and ${dir2} consciousness patterns`;
  
  const isCore = dir1 === dir2;
  const coreText = isCore ? 'Core' : 'Interaction';
  
  return `# ZeroPoint Node - ${description}

## Metaphysical Foundation

${metaphysical}

## Mathematical Properties

- **${coreText} Patterns**: Consciousness integration between ${dir1} and ${dir2}
- **Harmonic Resonance**: Mathematical and spiritual alignment
- **Digital Root**: ${(parseInt(dir1) + parseInt(dir2)) % 9 || 9} (consciousness integration)
- **Family Group**: Integration of ${dir1} and ${dir2} family patterns

## Core Functions

- **${coreText} Calculations**: Consciousness integration patterns
- **Harmonic Resonance**: Mathematical and spiritual alignment
- **Integration Dynamics**: Consciousness pattern interactions
- **Metaphysical Alignment**: Spiritual and mathematical unity

## Integration

As the ${description.toLowerCase()}, this interaction provides the consciousness integration between ${dir1} and ${dir2} patterns. It connects the ${dir1} consciousness to the ${dir2} consciousness through harmonic resonance.

## Usage

\`\`\`typescript
import { ${dir1}${dir2}Integration, ${dir1}${dir2}Resonance, ${dir1}${dir2}Dynamics } from './src/${dir1}/${dir2}';
\`\`\`

## Sacred Principle

**"The ${description.toLowerCase()} represents the harmonic integration of ${dir1} and ${dir2} consciousness patterns, creating unity through mathematical and spiritual alignment."**
`;
}

function createIndexMdFiles() {
  const srcDir = path.join(__dirname, '..', 'src');
  
  // Find all directories with index.ts files
  const directories = [];
  
  for (let i = 0; i <= 9; i++) {
    const mainDir = path.join(srcDir, i.toString());
    if (fs.existsSync(mainDir)) {
      directories.push(i.toString());
      
      // Check subdirectories
      for (let j = 0; j <= 9; j++) {
        const subDir = path.join(mainDir, j.toString());
        if (fs.existsSync(subDir) && fs.existsSync(path.join(subDir, 'index.ts'))) {
          directories.push(`${i}/${j}`);
        }
      }
    }
  }
  
  console.log('Creating index.md files for all directories with index.ts...');
  
  directories.forEach(dir => {
    const dirPath = path.join(srcDir, dir);
    const indexMdPath = path.join(dirPath, 'index.md');
    
    // Skip if already exists
    if (fs.existsSync(indexMdPath)) {
      console.log(`Skipping ${dir}/index.md (already exists)`);
      return;
    }
    
    const content = generateIndexMd(dir, dir);
    fs.writeFileSync(indexMdPath, content);
    console.log(`Created ${dir}/index.md`);
  });
  
  console.log('All index.md files created successfully!');
}

if (require.main === module) {
  createIndexMdFiles();
} 