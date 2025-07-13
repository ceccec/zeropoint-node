#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Import the documentation templates
const { generateInteractionFile, generateTestFile } = require('../src/0/0/documentation_templates.ts');

/**
 * Find all interaction directories (subdirectories with index.ts files)
 */
function findInteractionDirectories() {
  const srcDir = path.join(__dirname, '..', 'src');
  const interactions = [];
  
  for (let i = 0; i <= 9; i++) {
    const mainDir = path.join(srcDir, i.toString());
    if (fs.existsSync(mainDir)) {
      for (let j = 0; j <= 9; j++) {
        const subDir = path.join(mainDir, j.toString());
        if (fs.existsSync(subDir) && fs.existsSync(path.join(subDir, 'index.ts'))) {
          interactions.push([i, j]);
        }
      }
    }
  }
  
  return interactions;
}

/**
 * Regenerate interaction files with DRY documentation
 */
function regenerateInteractionFiles() {
  const interactions = findInteractionDirectories();
  const srcDir = path.join(__dirname, '..', 'src');
  
  console.log('Regenerating interaction files with DRY documentation...');
  
  interactions.forEach(([dir1, dir2]) => {
    const filePath = path.join(srcDir, dir1.toString(), dir2.toString(), 'index.ts');
    const testPath = path.join(srcDir, dir1.toString(), dir2.toString(), 'index.test.ts');
    
    try {
      // Generate new content using templates
      const newContent = generateInteractionFile(dir1, dir2);
      const newTestContent = generateTestFile(dir1, dir2);
      
      // Write the new files
      fs.writeFileSync(filePath, newContent);
      fs.writeFileSync(testPath, newTestContent);
      
      console.log(`✅ Regenerated ${dir1}/${dir2}/index.ts and index.test.ts`);
    } catch (error) {
      console.error(`❌ Error regenerating ${dir1}/${dir2}:`, error.message);
    }
  });
  
  console.log('DRY documentation regeneration complete!');
}

/**
 * Create a backup of original files before regeneration
 */
function createBackup() {
  const interactions = findInteractionDirectories();
  const srcDir = path.join(__dirname, '..', 'src');
  const backupDir = path.join(__dirname, '..', 'backup', 'original-docs');
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  console.log('Creating backup of original files...');
  
  interactions.forEach(([dir1, dir2]) => {
    const originalPath = path.join(srcDir, dir1.toString(), dir2.toString(), 'index.ts');
    const backupPath = path.join(backupDir, `${dir1}_${dir2}_index.ts`);
    
    if (fs.existsSync(originalPath)) {
      fs.copyFileSync(originalPath, backupPath);
    }
  });
  
  console.log('Backup created in backup/original-docs/');
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--backup')) {
    createBackup();
  }
  
  regenerateInteractionFiles();
}

if (require.main === module) {
  main();
} 