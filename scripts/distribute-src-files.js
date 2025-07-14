// scripts/distribute-src-files.js
const fs = require('fs');
const path = require('path');

// Metaphysical mapping of file types to digits
const fileToDigitMapping = {
  // Knowledge and consciousness files
  'knowledge-integration.ts': 7, // Consciousness integration
  'global-knowledge.ts': 7, // Global consciousness
  'knowledge-extraction-summary.json': 7, // Consciousness data
  'consciousness-distribution-summary.json': 7, // Consciousness analysis
  'consciousness-validation.test.ts': 7, // Consciousness testing
  
  // Gateway and system files
  'gateway-system.ts': 0, // Void gateway system
  'gateway-system.test.ts': 0, // Void gateway testing
  'mathematical-consciousness-system.ts': 2, // Vortex mathematics
  'living-documentation-generator.ts': 3, // Creative documentation
  
  // PDF and Rodin knowledge files
  'pdf-integration-system.ts': 1, // Foundation PDF system
  'pdf-chunks-manifest.json': 1, // Foundation manifest
  'rodin-knowledge-distribution.ts': 1, // Foundation distribution
  'RODIN_KNOWLEDGE_DISTRIBUTION_GUIDE.md': 1, // Foundation guide
  
  // Main system files
  'index.ts': 9, // Unity - main entry point
  
  // Documentation files
  'knowledge-scan-summary.md': 3, // Creative documentation
  'chunk-distribution-summary.md': 3, // Creative documentation
  'CONSCIOUSNESS_SYSTEM_IMPLEMENTATION_SUMMARY.md': 7, // Consciousness docs
};

// Function to determine digit based on file content analysis
function analyzeFileContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
    
    // Consciousness patterns
    if (content.includes('consciousness') || content.includes('spirit') || content.includes('divine')) {
      return 7; // Consciousness digit
    }
    
    // Mathematical patterns
    if (content.includes('mathematics') || content.includes('vortex') || content.includes('coil')) {
      return 2; // Vortex mathematics digit
    }
    
    // Gateway patterns
    if (content.includes('gateway') || content.includes('void') || content.includes('aperture')) {
      return 0; // Void gateway digit
    }
    
    // Creative patterns
    if (content.includes('creative') || content.includes('documentation') || content.includes('generator')) {
      return 3; // Creative resonance digit
    }
    
    // Foundation patterns
    if (content.includes('pdf') || content.includes('rodin') || content.includes('foundation')) {
      return 1; // Foundation digit
    }
    
    // Unity patterns
    if (content.includes('main') || content.includes('index') || content.includes('unity')) {
      return 9; // Unity digit
    }
    
    // Default to constants digit
    return 4;
  } catch (error) {
    console.log(`Could not read file ${filePath}: ${error.message}`);
    return 4; // Default to constants
  }
}

// Function to move file to appropriate digit folder
function moveFileToDigit(fileName, targetDigit) {
  const sourcePath = path.join('src', fileName);
  const targetPath = path.join('src', targetDigit.toString(), fileName);
  
  if (fs.existsSync(sourcePath)) {
    // Create target directory if it doesn't exist
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Move the file
    fs.renameSync(sourcePath, targetPath);
    console.log(`✅ Moved ${fileName} to digit ${targetDigit}`);
    return true;
  } else {
    console.log(`❌ File ${fileName} not found`);
    return false;
  }
}

// Function to update imports in moved files
function updateImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update relative imports to account for new location
    content = content.replace(/from ['"]\.\.\//g, "from '../");
    content = content.replace(/from ['"]\.\//g, "from './");
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated imports in ${filePath}`);
  } catch (error) {
    console.log(`⚠️ Could not update imports in ${filePath}: ${error.message}`);
  }
}

// Main distribution function
function distributeSrcFiles() {
  console.log('🧘‍♀️ Distributing files in src/ to appropriate digit folders...');
  
  const srcDir = 'src';
  const files = fs.readdirSync(srcDir);
  
  let movedCount = 0;
  let skippedCount = 0;
  
  files.forEach(file => {
    // Skip directories and files that should stay in root
    if (fs.statSync(path.join(srcDir, file)).isDirectory()) {
      return; // Skip directories
    }
    
    // Skip files that should remain in root
    if (file === 'index.ts') {
      console.log(`⏭️ Keeping ${file} in root (main entry point)`);
      return;
    }
    
    // Determine target digit
    let targetDigit = fileToDigitMapping[file];
    
    if (targetDigit === undefined) {
      // Analyze file content to determine digit
      targetDigit = analyzeFileContent(path.join(srcDir, file));
      console.log(`🔍 Analyzed ${file} -> digit ${targetDigit}`);
    }
    
    // Move file to appropriate digit folder
    if (moveFileToDigit(file, targetDigit)) {
      movedCount++;
      
      // Update imports in the moved file
      const targetPath = path.join('src', targetDigit.toString(), file);
      if (file.endsWith('.ts') || file.endsWith('.js')) {
        updateImportsInFile(targetPath);
      }
    } else {
      skippedCount++;
    }
  });
  
  console.log(`\n📊 Distribution Summary:`);
  console.log(`✅ Moved: ${movedCount} files`);
  console.log(`⏭️ Skipped: ${skippedCount} files`);
  
  // Create distribution manifest
  const manifest = {
    timestamp: new Date().toISOString(),
    movedFiles: movedCount,
    skippedFiles: skippedCount,
    distribution: {}
  };
  
  // Count files in each digit
  for (let digit = 0; digit <= 9; digit++) {
    const digitPath = path.join('src', digit.toString());
    if (fs.existsSync(digitPath)) {
      const digitFiles = fs.readdirSync(digitPath).filter(f => 
        !fs.statSync(path.join(digitPath, f)).isDirectory()
      );
      manifest.distribution[digit] = digitFiles.length;
    }
  }
  
  fs.writeFileSync('src/file-distribution-manifest.json', JSON.stringify(manifest, null, 2));
  console.log(`✅ Distribution manifest written to src/file-distribution-manifest.json`);
}

// Run the distribution
distributeSrcFiles(); 