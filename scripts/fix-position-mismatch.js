const fs = require('fs');
const path = require('path');

// Deep vortex knowledge base (same as in deep-vortex-exploration.js)
const deepVortexKnowledge = {
  '0': { name: 'Void Center', metaphysical: { meaning: 'Infinite potential, impossible contraction, pure potential' } },
  '1': { name: 'Unity Foundation', metaphysical: { meaning: 'Unity, foundation, beginning of expansion' } },
  '2': { name: 'Duality Flow', metaphysical: { meaning: 'Duality, flow, mathematical operations' } },
  '3': { name: 'Creation Spirit', metaphysical: { meaning: 'Creation, spiritual pathway, W-Axis alignment' } },
  '4': { name: 'Stability Constants', metaphysical: { meaning: 'Stability, foundation constants, structural integrity' } },
  '5': { name: 'Sacred Transformation', metaphysical: { meaning: 'Transformation, sacred geometry, change' } },
  '6': { name: 'Harmonic Balance', metaphysical: { meaning: 'Balance, harmony, spiritual equilibrium' } },
  '7': { name: 'Awareness Return', metaphysical: { meaning: 'Awareness, self-recognition, observer patterns' } },
  '8': { name: 'Fullness Potential', metaphysical: { meaning: 'Fullness, infinite potential, void system' } },
  '9': { name: 'Completion Unity', metaphysical: { meaning: 'Completion, unity, spiritual fulfillment' } }
};

function getInteractionName(row, col) {
  const rowDigit = deepVortexKnowledge[row];
  const colDigit = deepVortexKnowledge[col];
  
  if (!rowDigit || !colDigit) {
    return `${row}/${col} Deep Vortex Interaction`;
  }
  
  return `${rowDigit.name}-${colDigit.name}`;
}

function getInteractionDescription(row, col) {
  const rowDigit = deepVortexKnowledge[row];
  const colDigit = deepVortexKnowledge[col];
  
  if (!rowDigit || !colDigit) {
    return `The deep vortex interaction between digits ${row} and ${col}`;
  }
  
  return `${rowDigit.metaphysical.meaning} interacting with ${colDigit.metaphysical.meaning}`;
}

function fixPositionMismatch(filePath) {
  try {
    // Extract digit coordinates from path
    const pathParts = filePath.split('/');
    const row = pathParts[pathParts.length - 2];
    const col = pathParts[pathParts.length - 3];
    
    if (!row || !col || !/^\d$/.test(row) || !/^\d$/.test(col)) {
      return false; // Not a digit pair file
    }
    
    // Read current content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Get the correct interaction name and description
    const interactionName = getInteractionName(row, col);
    const interactionDescription = getInteractionDescription(row, col);
    
    // Update the title
    const titleRegex = /# \d+\/\d+ – Deep Vortex Consciousness Field State/;
    const newTitle = `# ${row}/${col} – Deep Vortex Consciousness Field State`;
    content = content.replace(titleRegex, newTitle);
    
    // Update the interaction section
    const interactionRegex = /## 🌌 Deep Vortex Interaction: .*?\n\n### \*\*Metaphysical Principles\*\*/s;
    const newInteractionSection = `## 🌌 Deep Vortex Interaction: ${interactionName}

### **Metaphysical Principles**`;
    content = content.replace(interactionRegex, newInteractionSection);
    
    // Update the Files section
    const filesRegex = /- \*\*.*?\*\* - .*?\n- \*\*Deep Vortex Analysis\*\*/;
    const newFilesSection = `- **${interactionName}** - ${interactionDescription}
- **Deep Vortex Analysis**`;
    content = content.replace(filesRegex, newFilesSection);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed position mismatch: ${filePath} (${row}/${col})`);
    return true;
  } catch (error) {
    console.error(`❌ Error fixing position mismatch for ${filePath}:`, error.message);
    return false;
  }
}

function fixAllPositionMismatches(docsDir) {
  let fixedCount = 0;
  
  function processDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (item === 'index.md') {
        if (fixPositionMismatch(fullPath)) {
          fixedCount++;
        }
      }
    }
  }
  
  processDirectory(docsDir);
  return fixedCount;
}

// Main execution
const docsDir = path.join(__dirname, '..', 'docs');
console.log('🔧 Fixing position mismatches across all index files...');

const fixedFiles = fixAllPositionMismatches(docsDir);

if (fixedFiles > 0) {
  console.log(`\n✅ Successfully fixed position mismatches in ${fixedFiles} files`);
  console.log('🌌 The consciousness field matrix now has consistent positions');
} else {
  console.log('\n✨ All positions are already consistent!');
} 