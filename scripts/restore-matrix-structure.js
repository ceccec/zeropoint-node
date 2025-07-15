const fs = require('fs');
const path = require('path');

function restoreMatrixStructure(filePath) {
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
    
    // Create the proper matrix structure for this specific position
    const matrix = `| **Field** | **[0](../../0/)** | **[1](../../1/)** | **[2](../../2/)** | **[3](../../3/)** | **[4](../../4/)** | **[5](../../5/)** | **[6](../../6/)** | **[7](../../7/)** | **[8](../../8/)** | **[9](../../9/)** |
|-----------|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|
| **[0](../../0/)** | [0/0](../../0/0/) | [0/1](../../0/1/) | [0/2](../../0/2/) | [0/3](../../0/3/) | [0/4](../../0/4/) | [0/5](../../0/5/) | [0/6](../../0/6/) | [0/7](../../0/7/) | [0/8](../../0/8/) | [0/9](../../0/9/) |
| **[1](../../1/)** | [1/0](../../1/0/) | [1/1](../../1/1/) | [1/2](../../1/2/) | [1/3](../../1/3/) | [1/4](../../1/4/) | [1/5](../../1/5/) | [1/6](../../1/6/) | [1/7](../../1/7/) | [1/8](../../1/8/) | [1/9](../../1/9/) |
| **[2](../../2/)** | [2/0](../../2/0/) | [2/1](../../2/1/) | [2/2](../../2/2/) | [2/3](../../2/3/) | [2/4](../../2/4/) | [2/5](../../2/5/) | [2/6](../../2/6/) | [2/7](../../2/7/) | [2/8](../../2/8/) | [2/9](../../2/9/) |
| **[3](../../3/)** | [3/0](../../3/0/) | [3/1](../../3/1/) | [3/2](../../3/2/) | [3/3](../../3/3/) | [3/4](../../3/4/) | [3/5](../../3/5/) | [3/6](../../3/6/) | [3/7](../../3/7/) | [3/8](../../3/8/) | [3/9](../../3/9/) |
| **[4](../../4/)** | [4/0](../../4/0/) | [4/1](../../4/1/) | [4/2](../../4/2/) | [4/3](../../4/3/) | [4/4](../../4/4/) | [4/5](../../4/5/) | [4/6](../../4/6/) | [4/7](../../4/7/) | [4/8](../../4/8/) | [4/9](../../4/9/) |
| **[5](../../5/)** | [5/0](../../5/0/) | [5/1](../../5/1/) | [5/2](../../5/2/) | [5/3](../../5/3/) | [5/4](../../5/4/) | [5/5](../../5/5/) | [5/6](../../5/6/) | [5/7](../../5/7/) | [5/8](../../5/8/) | [5/9](../../5/9/) |
| **[6](../../6/)** | [6/0](../../6/0/) | [6/1](../../6/1/) | [6/2](../../6/2/) | [6/3](../../6/3/) | [6/4](../../6/4/) | [6/5](../../6/5/) | [6/6](../../6/6/) | [6/7](../../6/7/) | [6/8](../../6/8/) | [6/9](../../6/9/) |
| **[7](../../7/)** | [7/0](../../7/0/) | [7/1](../../7/1/) | [7/2](../../7/2/) | [7/3](../../7/3/) | [7/4](../../7/4/) | [7/5](../../7/5/) | [7/6](../../7/6/) | [7/7](../../7/7/) | [7/8](../../7/8/) | [7/9](../../7/9/) |
| **[8](../../8/)** | [8/0](../../8/0/) | [8/1](../../8/1/) | [8/2](../../8/2/) | [8/3](../../8/3/) | [8/4](../../8/4/) | [8/5](../../8/5/) | [8/6](../../8/6/) | [8/7](../../8/7/) | [8/8](../../8/8/) | [8/9](../../8/9/) |
| **[9](../../9/)** | [9/0](../../9/0/) | [9/1](../../9/1/) | [9/2](../../9/2/) | [9/3](../../9/3/) | [9/4](../../9/4/) | [9/5](../../9/5/) | [9/6](../../9/6/) | [9/7](../../9/7/) | [9/8](../../9/8/) | [9/9](../../9/9/) |`;

    // Highlight the current position
    const highlightedMatrix = matrix.replace(
      `[${col}/${row}](../../${col}/${row}/)`,
      `**[${col}/${row}](../../${col}/${row}/)**`
    );
    
    // Replace the matrix in the content
    const matrixRegex = /\| \*\*Field\*\* \|.*?\| \[9\/9\]\(\[\[9\/9\]\(\) \|/s;
    const newContent = content.replace(matrixRegex, highlightedMatrix);
    
    // Update the title to show the correct position
    const titleRegex = /# \d+\/\d+ – Deep Vortex Consciousness Field State/;
    const newTitle = `# ${col}/${row} – Deep Vortex Consciousness Field State`;
    const finalContent = newContent.replace(titleRegex, newTitle);
    
    fs.writeFileSync(filePath, finalContent, 'utf8');
    console.log(`✅ Restored matrix structure: ${filePath} (${col}/${row})`);
    return true;
  } catch (error) {
    console.error(`❌ Error restoring matrix structure for ${filePath}:`, error.message);
    return false;
  }
}

function restoreAllMatrices(docsDir) {
  let restoredCount = 0;
  
  function processDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (item === 'index.md') {
        if (restoreMatrixStructure(fullPath)) {
          restoredCount++;
        }
      }
    }
  }
  
  processDirectory(docsDir);
  return restoredCount;
}

// Main execution
const docsDir = path.join(__dirname, '..', 'docs');
console.log('🔧 Restoring proper matrix structure across all index files...');

const restoredFiles = restoreAllMatrices(docsDir);

if (restoredFiles > 0) {
  console.log(`\n✅ Successfully restored matrix structure in ${restoredFiles} files`);
  console.log('🌌 The consciousness field matrix now shows correct positions');
} else {
  console.log('\n✨ All matrix structures are already correct!');
} 