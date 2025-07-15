const fs = require('fs');
const path = require('path');

// Core Consciousness Systems mapping
const coreSystems = {
  0: { system: 'Zero Entropy', principle: 'Pure mathematical unity', documentation: 'Zero Entropy' },
  1: { system: 'Foundation', principle: 'Rodin coil archetype', documentation: 'Foundation' },
  2: { system: 'Vortex Math', principle: 'Flow and transformation', documentation: 'Vortex Math' },
  3: { system: 'Creative Resonance', principle: 'W-axis and spiritual dimension', documentation: 'Creative Resonance' },
  4: { system: 'Constants', principle: 'Stability and harmonic foundation', documentation: 'Constants' },
  5: { system: 'Sacred Geometry', principle: 'Divine proportions', documentation: 'Sacred Geometry' },
  6: { system: 'Harmonic Balance', principle: 'Resonance and equilibrium', documentation: 'Harmonic Balance' },
  7: { system: 'Consciousness', principle: 'Awareness and field', documentation: 'Consciousness' },
  8: { system: 'Void', principle: 'Infinite potential', documentation: 'Void' },
  9: { system: 'Unity', principle: 'Integration and wholeness', documentation: 'Unity' }
};

function updateIndexFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let updated = false;
    
    // Find the digit from the file path
    const pathParts = filePath.split('/');
    const digitIndex = pathParts.findIndex(part => /^\d$/.test(part));
    if (digitIndex === -1) return false;
    
    const digit = parseInt(pathParts[digitIndex]);
    const system = coreSystems[digit];
    if (!system) return false;
    
    // Update the digit meaning section
    const digitMeaningPattern = /## 🌟 Core Consciousness System\n\n.*?\n\n/;
    const newDigitMeaning = `## 🌟 Core Consciousness System

**Digit ${digit}**: ${system.system}
**Principle**: ${system.principle}
**Documentation**: ${system.documentation}

`;
    
    if (digitMeaningPattern.test(content)) {
      const updatedContent = content.replace(digitMeaningPattern, newDigitMeaning);
      if (updatedContent !== content) {
        fs.writeFileSync(filePath, updatedContent);
        updated = true;
      }
    } else {
      // Add the section if it doesn't exist
      const insertPattern = /(## 🌌 10×10 Consciousness Field Matrix.*?\n\n)/;
      if (insertPattern.test(content)) {
        const updatedContent = content.replace(insertPattern, `$1${newDigitMeaning}`);
        fs.writeFileSync(filePath, updatedContent);
        updated = true;
      }
    }
    
    return updated;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
    return false;
  }
}

function findIndexFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item === 'index.md') {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

// Main execution
const docsDir = path.join(__dirname, '..', 'docs');
const indexFiles = findIndexFiles(docsDir);

console.log(`Found ${indexFiles.length} index.md files to update...`);

let updatedCount = 0;
for (const file of indexFiles) {
  if (updateIndexFile(file)) {
    updatedCount++;
    console.log(`✅ Updated: ${file}`);
  }
}

console.log(`\n🎯 Updated ${updatedCount} files with core consciousness systems`);
console.log('\n🌟 Core Consciousness Systems Updated:');
Object.entries(coreSystems).forEach(([digit, system]) => {
  console.log(`${digit}: ${system.system} - ${system.principle}`);
}); 