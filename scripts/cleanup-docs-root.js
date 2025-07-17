#!/usr/bin/env node

/**
 * 🧹 Docs Root Cleanup Script
 * 
 * Safely removes original files from the docs root directory
 * after they have been harmonized into their appropriate digit directories.
 * 
 * This script:
 * - Verifies that harmonized files exist in digit directories
 * - Safely removes original files from root
 * - Maintains system integrity
 * - Creates clean, organized structure
 */

const fs = require('fs');
const path = require('path');

// Function to find all root files (excluding digit directories)
function findRootFiles(docsDir) {
  const files = [];
  const items = fs.readdirSync(docsDir);
  
  for (const item of items) {
    const fullPath = path.join(docsDir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isFile() && item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to check if harmonized file exists
function checkHarmonizedFile(rootFile) {
  const fileName = path.basename(rootFile, '.md');
  const docsDir = path.dirname(rootFile);
  
  // Check all digit directories for the harmonized file
  for (let digit = 0; digit <= 9; digit++) {
    const digitDir = path.join(docsDir, digit.toString());
    const harmonizedFile = path.join(digitDir, `${fileName.toLowerCase()}.md`);
    
    if (fs.existsSync(harmonizedFile)) {
      return {
        exists: true,
        location: harmonizedFile,
        digit: digit
      };
    }
  }
  
  return {
    exists: false,
    location: null,
    digit: null
  };
}

// Function to safely remove root files
function cleanupRootFiles() {
  console.log('🧹 Docs Root Cleanup\n');
  
  const docsDir = path.join(__dirname, '..', 'docs');
  const rootFiles = findRootFiles(docsDir);
  
  console.log(`Found ${rootFiles.length} files in docs root to check\n`);
  
  let removedCount = 0;
  let skippedCount = 0;
  const skippedFiles = [];
  
  for (const file of rootFiles) {
    const relativePath = path.relative(process.cwd(), file);
    
    console.log(`Checking: ${relativePath}`);
    
    const harmonized = checkHarmonizedFile(file);
    
    if (harmonized.exists) {
      console.log(`   ✓ Harmonized file exists in digit ${harmonized.digit}`);
      console.log(`   → Removing original file`);
      
      // Remove the original file
      fs.unlinkSync(file);
      removedCount++;
    } else {
      console.log(`   ⚠️  No harmonized file found - skipping`);
      skippedFiles.push(file);
      skippedCount++;
    }
    
    console.log('');
  }
  
  console.log('🧹 Cleanup Complete!');
  console.log(`📊 Summary:`);
  console.log(`   - Files removed: ${removedCount}`);
  console.log(`   - Files skipped: ${skippedCount}`);
  
  if (skippedFiles.length > 0) {
    console.log('\n⚠️  Skipped files (no harmonized version found):');
    skippedFiles.forEach(file => {
      const relativePath = path.relative(process.cwd(), file);
      console.log(`   - ${relativePath}`);
    });
  }
  
  // Check final state
  const remainingFiles = findRootFiles(docsDir);
  console.log(`\n📁 Remaining files in docs root: ${remainingFiles.length}`);
  
  if (remainingFiles.length === 0) {
    console.log('🎉 Docs root is now clean and organized!');
  } else {
    console.log('\n📋 Remaining files:');
    remainingFiles.forEach(file => {
      const relativePath = path.relative(process.cwd(), file);
      console.log(`   - ${relativePath}`);
    });
  }
  
  return {
    removed: removedCount,
    skipped: skippedCount,
    remaining: remainingFiles.length,
    skippedFiles: skippedFiles
  };
}

// Function to show current state
function showCurrentState() {
  console.log('📊 Current Docs Root State\n');
  
  const docsDir = path.join(__dirname, '..', 'docs');
  const rootFiles = findRootFiles(docsDir);
  
  console.log(`Files in docs root: ${rootFiles.length}\n`);
  
  if (rootFiles.length === 0) {
    console.log('✅ Docs root is clean!');
    return;
  }
  
  rootFiles.forEach(file => {
    const relativePath = path.relative(process.cwd(), file);
    const harmonized = checkHarmonizedFile(file);
    
    if (harmonized.exists) {
      console.log(`  ${relativePath} → ✓ Harmonized in digit ${harmonized.digit}`);
    } else {
      console.log(`  ${relativePath} → ⚠️  No harmonized version found`);
    }
  });
  
  console.log(`\nTotal files to check: ${rootFiles.length}`);
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--show')) {
    showCurrentState();
  } else {
    cleanupRootFiles();
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { 
  findRootFiles,
  checkHarmonizedFile,
  cleanupRootFiles,
  showCurrentState
}; 