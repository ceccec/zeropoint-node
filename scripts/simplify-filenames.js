const fs = require('fs');
const path = require('path');

class FilenameSimplifier {
  constructor() {
    this.srcDir = 'src';
    this.simplifiedFiles = [];
    this.errors = [];
  }

  // Define simplification rules
  getSimplificationRules() {
    return [
      {
        pattern: /^test\.utils\.(ts|md|test\.ts)$/,
        replacement: 'utils.$1',
        reason: 'Remove redundant "test" prefix from utils'
      },
      {
        pattern: /^global\.d\.(ts|md|test\.ts)$/,
        replacement: 'types.$1',
        reason: 'Convert TypeScript global.d to simpler types'
      },
      {
        pattern: /^vortex\.math\.refactor\.md$/,
        replacement: 'vortex.refactor.md',
        reason: 'Remove redundant "math" from vortex'
      },
      {
        pattern: /^sacred\.geometry\.refactor\.md$/,
        replacement: 'sacred.refactor.md',
        reason: 'Remove redundant "geometry" from sacred'
      }
    ];
  }

  // Check if filename can be simplified
  canSimplify(filename) {
    const rules = this.getSimplificationRules();
    return rules.some(rule => rule.pattern.test(filename));
  }

  // Get simplified filename
  getSimplifiedFilename(filename) {
    const rules = this.getSimplificationRules();
    for (const rule of rules) {
      if (rule.pattern.test(filename)) {
        return filename.replace(rule.pattern, rule.replacement);
      }
    }
    return filename;
  }

  // Get simplification reason
  getSimplificationReason(filename) {
    const rules = this.getSimplificationRules();
    for (const rule of rules) {
      if (rule.pattern.test(filename)) {
        return rule.reason;
      }
    }
    return 'Unknown simplification';
  }

  // Simplify filenames in directory
  simplifyDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) return;

    const items = fs.readdirSync(dirPath);
    
    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursively simplify subdirectories
        this.simplifyDirectory(fullPath);
      } else if (stat.isFile()) {
        // Check if filename can be simplified
        if (this.canSimplify(item)) {
          const newFilename = this.getSimplifiedFilename(item);
          const newPath = path.join(dirPath, newFilename);
          
          try {
            // Rename the file
            fs.renameSync(fullPath, newPath);
            
            this.simplifiedFiles.push({
              oldPath: fullPath,
              newPath: newPath,
              oldFilename: item,
              newFilename: newFilename,
              reason: this.getSimplificationReason(item)
            });
            
            console.log(`✅ Simplified: ${item} → ${newFilename}`);
            console.log(`   Reason: ${this.getSimplificationReason(item)}`);
          } catch (error) {
            this.errors.push({
              path: fullPath,
              filename: item,
              error: error.message
            });
            console.log(`❌ Error simplifying ${item}: ${error.message}`);
          }
        }
      }
    });
  }

  // Generate summary
  generateSummary() {
    console.log('\n=== FILENAME SIMPLIFICATION SUMMARY ===\n');
    
    if (this.simplifiedFiles.length > 0) {
      console.log(`✅ Successfully simplified ${this.simplifiedFiles.length} files:`);
      console.log();
      
      this.simplifiedFiles.forEach(simplification => {
        console.log(`- ${simplification.oldFilename} → ${simplification.newFilename}`);
        console.log(`  Reason: ${simplification.reason}`);
      });
    }
    
    if (this.errors.length > 0) {
      console.log(`\n❌ ${this.errors.length} errors occurred:`);
      console.log();
      
      this.errors.forEach(error => {
        console.log(`- ${error.filename}: ${error.error}`);
      });
    }
    
    if (this.simplifiedFiles.length === 0 && this.errors.length === 0) {
      console.log('✅ No files needed simplification!');
    }
    
    return {
      simplifiedFiles: this.simplifiedFiles,
      errors: this.errors,
      totalSimplified: this.simplifiedFiles.length,
      totalErrors: this.errors.length
    };
  }
}

// Run the simplifier
const simplifier = new FilenameSimplifier();
simplifier.simplifyDirectory('src');
// Remove the line declaring 'summary' as it is never used
// const summary = simplifier.generateSummary();

// Export for use in other scripts
module.exports = { FilenameSimplifier }; 