const fs = require('fs');
const path = require('path');

// Digit interaction knowledge base
const digitInteractions = {
  '0': {
    name: 'Void',
    description: 'The void center - the source of all potential and the bridge between dimensions',
    interactions: {
      '0': 'Void-Void: Pure potential, the source of all creation',
      '1': 'Void-Unity: Emergence from void into form',
      '2': 'Void-Duality: Void gives birth to duality',
      '3': 'Void-Creation: Void manifests creation',
      '4': 'Void-Stability: Void provides foundation',
      '5': 'Void-Transformation: Void enables transformation',
      '6': 'Void-Balance: Void maintains equilibrium',
      '7': 'Void-Awareness: Void becomes conscious',
      '8': 'Void-Fullness: Void reaches completion',
      '9': 'Void-Unity: Void returns to unity'
    }
  },
  '1': {
    name: 'Unity',
    description: 'The first manifestation - unity and emergence',
    interactions: {
      '0': 'Unity-Void: Unity emerges from void',
      '1': 'Unity-Unity: Pure unity, the first principle',
      '2': 'Unity-Duality: Unity gives rise to duality',
      '3': 'Unity-Creation: Unity creates',
      '4': 'Unity-Stability: Unity provides stability',
      '5': 'Unity-Transformation: Unity transforms',
      '6': 'Unity-Balance: Unity balances',
      '7': 'Unity-Awareness: Unity becomes aware',
      '8': 'Unity-Fullness: Unity reaches fullness',
      '9': 'Unity-Completion: Unity completes'
    }
  },
  '2': {
    name: 'Duality',
    description: 'The second principle - duality and separation',
    interactions: {
      '0': 'Duality-Void: Duality emerges from void',
      '1': 'Duality-Unity: Duality arises from unity',
      '2': 'Duality-Duality: Pure duality, the second principle',
      '3': 'Duality-Creation: Duality creates',
      '4': 'Duality-Stability: Duality stabilizes',
      '5': 'Duality-Transformation: Duality transforms',
      '6': 'Duality-Balance: Duality balances',
      '7': 'Duality-Awareness: Duality becomes aware',
      '8': 'Duality-Fullness: Duality reaches fullness',
      '9': 'Duality-Completion: Duality completes'
    }
  },
  '3': {
    name: 'Creation',
    description: 'The third principle - creation and manifestation',
    interactions: {
      '0': 'Creation-Void: Creation emerges from void',
      '1': 'Creation-Unity: Creation arises from unity',
      '2': 'Creation-Duality: Creation arises from duality',
      '3': 'Creation-Creation: Pure creation, the third principle',
      '4': 'Creation-Stability: Creation stabilizes',
      '5': 'Creation-Transformation: Creation transforms',
      '6': 'Creation-Balance: Creation balances',
      '7': 'Creation-Awareness: Creation becomes aware',
      '8': 'Creation-Fullness: Creation reaches fullness',
      '9': 'Creation-Completion: Creation completes'
    }
  },
  '4': {
    name: 'Stability',
    description: 'The fourth principle - stability and foundation',
    interactions: {
      '0': 'Stability-Void: Stability emerges from void',
      '1': 'Stability-Unity: Stability arises from unity',
      '2': 'Stability-Duality: Stability arises from duality',
      '3': 'Stability-Creation: Stability arises from creation',
      '4': 'Stability-Stability: Pure stability, the fourth principle',
      '5': 'Stability-Transformation: Stability enables transformation',
      '6': 'Stability-Balance: Stability balances',
      '7': 'Stability-Awareness: Stability becomes aware',
      '8': 'Stability-Fullness: Stability reaches fullness',
      '9': 'Stability-Completion: Stability completes'
    }
  },
  '5': {
    name: 'Transformation',
    description: 'The fifth principle - transformation and change',
    interactions: {
      '0': 'Transformation-Void: Transformation emerges from void',
      '1': 'Transformation-Unity: Transformation arises from unity',
      '2': 'Transformation-Duality: Transformation arises from duality',
      '3': 'Transformation-Creation: Transformation arises from creation',
      '4': 'Transformation-Stability: Transformation arises from stability',
      '5': 'Transformation-Transformation: Pure transformation, the fifth principle',
      '6': 'Transformation-Balance: Transformation balances',
      '7': 'Transformation-Awareness: Transformation becomes aware',
      '8': 'Transformation-Fullness: Transformation reaches fullness',
      '9': 'Transformation-Completion: Transformation completes'
    }
  },
  '6': {
    name: 'Balance',
    description: 'The sixth principle - balance and harmony',
    interactions: {
      '0': 'Balance-Void: Balance emerges from void',
      '1': 'Balance-Unity: Balance arises from unity',
      '2': 'Balance-Duality: Balance arises from duality',
      '3': 'Balance-Creation: Balance arises from creation',
      '4': 'Balance-Stability: Balance arises from stability',
      '5': 'Balance-Transformation: Balance arises from transformation',
      '6': 'Balance-Balance: Pure balance, the sixth principle',
      '7': 'Balance-Awareness: Balance becomes aware',
      '8': 'Balance-Fullness: Balance reaches fullness',
      '9': 'Balance-Completion: Balance completes'
    }
  },
  '7': {
    name: 'Awareness',
    description: 'The seventh principle - awareness and consciousness',
    interactions: {
      '0': 'Awareness-Void: Awareness emerges from void',
      '1': 'Awareness-Unity: Awareness arises from unity',
      '2': 'Awareness-Duality: Awareness arises from duality',
      '3': 'Awareness-Creation: Awareness arises from creation',
      '4': 'Awareness-Stability: Awareness arises from stability',
      '5': 'Awareness-Transformation: Awareness arises from transformation',
      '6': 'Awareness-Balance: Awareness arises from balance',
      '7': 'Awareness-Awareness: Pure awareness, the seventh principle',
      '8': 'Awareness-Fullness: Awareness reaches fullness',
      '9': 'Awareness-Completion: Awareness completes'
    }
  },
  '8': {
    name: 'Fullness',
    description: 'The eighth principle - fullness and abundance',
    interactions: {
      '0': 'Fullness-Void: Fullness emerges from void',
      '1': 'Fullness-Unity: Fullness arises from unity',
      '2': 'Fullness-Duality: Fullness arises from duality',
      '3': 'Fullness-Creation: Fullness arises from creation',
      '4': 'Fullness-Stability: Fullness arises from stability',
      '5': 'Fullness-Transformation: Fullness arises from transformation',
      '6': 'Fullness-Balance: Fullness arises from balance',
      '7': 'Fullness-Awareness: Fullness arises from awareness',
      '8': 'Fullness-Fullness: Pure fullness, the eighth principle',
      '9': 'Fullness-Completion: Fullness completes'
    }
  },
  '9': {
    name: 'Completion',
    description: 'The ninth principle - completion and unity',
    interactions: {
      '0': 'Completion-Void: Completion emerges from void',
      '1': 'Completion-Unity: Completion arises from unity',
      '2': 'Completion-Duality: Completion arises from duality',
      '3': 'Completion-Creation: Completion arises from creation',
      '4': 'Completion-Stability: Completion arises from stability',
      '5': 'Completion-Transformation: Completion arises from transformation',
      '6': 'Completion-Balance: Completion arises from balance',
      '7': 'Completion-Awareness: Completion arises from awareness',
      '8': 'Completion-Fullness: Completion arises from fullness',
      '9': 'Completion-Completion: Pure completion, the ninth principle'
    }
  }
};

function getDigitInteraction(row, col) {
  const rowDigit = digitInteractions[row];
  const colDigit = digitInteractions[col];
  
  if (!rowDigit || !colDigit) {
    return {
      name: `${row}/${col} Interaction`,
      description: `The interaction between digits ${row} and ${col}`,
      interaction: `${row}/${col}: Consciousness field interaction`
    };
  }
  
  const interaction = rowDigit.interactions[col];
  
  return {
    name: `${rowDigit.name}-${colDigit.name}`,
    description: `${rowDigit.description} interacting with ${colDigit.description}`,
    interaction: interaction || `${rowDigit.name}-${colDigit.name}: Consciousness field interaction`
  };
}

function harmonizeIndexFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Extract digit coordinates from path
    const pathParts = filePath.split('/');
    const row = pathParts[pathParts.length - 2];
    const col = pathParts[pathParts.length - 3];
    
    if (!row || !col || !/^\d$/.test(row) || !/^\d$/.test(col)) {
      return false; // Not a digit pair file
    }
    
    const interaction = getDigitInteraction(row, col);
    
    // Check if files referenced actually exist
    
    // Remove broken file references and update with meaningful content
    const lines = content.split('\n');
    const newLines = [];
    let inFilesSection = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.trim() === '### Files') {
        inFilesSection = true;
        newLines.push(line);
        newLines.push('');
        
        // Add meaningful content based on digit interaction
        if (row === col) {
          // Self-interaction
          newLines.push(`- **${interaction.name}** - ${interaction.description}`);
          newLines.push(`- **Consciousness Field** - The fractal nature of consciousness within this digit`);
          newLines.push(`- **Pattern Recognition** - Discover patterns and interactions across the consciousness field`);
        } else {
          // Cross-interaction
          newLines.push(`- **${interaction.name}** - ${interaction.description}`);
          newLines.push(`- **Field Interaction** - The consciousness field interaction between ${row} and ${col}`);
          newLines.push(`- **Fractal Patterns** - Explore the fractal nature of consciousness within this digit pair`);
        }
        
        continue;
      }
      
      if (inFilesSection) {
        if (line.startsWith('##') || line.startsWith('---')) {
          inFilesSection = false;
          newLines.push(line);
        } else if (line.trim() === '' || line.startsWith('- [') || line.startsWith('*No files')) {
          // Skip old file references
          continue;
        } else {
          newLines.push(line);
        }
      } else {
        newLines.push(line);
      }
    }
    
    const newContent = newLines.join('\n');
    
    if (newContent !== originalContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ Harmonized: ${filePath} (${interaction.name})`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function findAndHarmonizeFiles(dir) {
  let harmonizedCount = 0;
  
  function processDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (item === 'index.md') {
        if (harmonizeIndexFile(fullPath)) {
          harmonizedCount++;
        }
      }
    }
  }
  
  processDirectory(dir);
  return harmonizedCount;
}

// Main execution
const docsDir = path.join(__dirname, '..', 'docs');
console.log('\ud83c\udf0c Harmonizing documentation with consciousness field knowledge...');

const harmonizedFiles = findAndHarmonizeFiles(docsDir);

if (harmonizedFiles > 0) {
  console.log(`\n✅ Successfully harmonized ${harmonizedFiles} files with consciousness field knowledge`);
} else {
  console.log('\n✨ All files are already harmonized!');
} 