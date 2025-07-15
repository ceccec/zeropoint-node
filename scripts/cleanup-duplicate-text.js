const fs = require('fs');
const path = require('path');

function cleanupDuplicateText(filePath) {
  try {
    // Read current content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix duplicate text patterns
    const patterns = [
      // Fix duplicate interaction descriptions
      {
        regex: /Sacred-Constants: Sacred geometry arises from harmonic foundation - sacred stabilityTransformation-Stability: Transformation arises from stability - sacred stability/,
        replacement: 'Sacred-Constants: Sacred geometry arises from harmonic foundation - sacred stability'
      },
      // Fix duplicate resonance descriptions
      {
        regex: /Creates unified consciousness field patternsCreates unified consciousness field patterns/,
        replacement: 'Creates unified consciousness field patterns'
      },
      // Fix duplicate fingerprint descriptions
      {
        regex: /Creates Sacred Geometry-Constants consciousness patternsCreates Sacred Transformation-Stability Constants consciousness patterns/,
        replacement: 'Creates Sacred Geometry-Constants consciousness patterns'
      },
      // Fix duplicate circuit interaction descriptions
      {
        regex: /Same Circuit FlowSame Circuit Flow/,
        replacement: 'Same Circuit Flow'
      },
      // Fix duplicate breathing synchronization descriptions
      {
        regex: /Harmonized BreathingHarmonized Breathing/,
        replacement: 'Harmonized Breathing'
      },
      // Fix duplicate evolution type descriptions
      {
        regex: /Cross-IntegrationCross-Integration/,
        replacement: 'Cross-Integration'
      },
      // Fix duplicate outcome descriptions
      {
        regex: /Creates unified consciousness patterns throughout the systemCreates unified consciousness patterns throughout the system/,
        replacement: 'Creates unified consciousness patterns throughout the system'
      }
    ];
    
    // Apply all cleanup patterns
    patterns.forEach(pattern => {
      content = content.replace(pattern.regex, pattern.replacement);
    });
    
    // Fix the metaphysical principles section names
    content = content.replace(
      /#### \*\*Sacred Transformation \(5\)\*\*/,
      '#### **Sacred Geometry (5)**'
    );
    content = content.replace(
      /#### \*\*Stability Constants \(4\)\*\*/,
      '#### **Constants (4)**'
    );
    
    // Fix the meaning descriptions
    content = content.replace(
      /- \*\*Meaning\*\*: Transformation, sacred geometry, change/,
      '- **Meaning**: Divine proportions and transformation'
    );
    content = content.replace(
      /- \*\*Meaning\*\*: Stability, foundation constants, structural integrity/,
      '- **Meaning**: Stability and harmonic foundation'
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Cleaned up duplicate text: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error cleaning up duplicate text for ${filePath}:`, error.message);
    return false;
  }
}

function cleanupAllFiles(docsDir) {
  let cleanedCount = 0;
  
  function processDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (item === 'index.md') {
        if (cleanupDuplicateText(fullPath)) {
          cleanedCount++;
        }
      }
    }
  }
  
  processDirectory(docsDir);
  return cleanedCount;
}

// Main execution
const docsDir = path.join(__dirname, '..', 'docs');
console.log('🧹 Cleaning up duplicate text and formatting issues...');

const cleanedFiles = cleanupAllFiles(docsDir);

if (cleanedFiles > 0) {
  console.log(`\n✅ Successfully cleaned up ${cleanedFiles} files`);
  console.log('🌌 The consciousness field documentation is now properly formatted');
} else {
  console.log('\n✨ All files are already clean!');
} 