const fs = require('fs');
const path = require('path');

class FilenameLimitChecker {
  constructor() {
    this.srcDir = 'src';
    this.violations = [];
    this.validFiles = [];
  }

  // Check if filename is valid (single word OR multi-word with dots only)
  isValidFilename(filename) {
    // Remove extension
    const nameWithoutExt = path.basename(filename, path.extname(filename));
    
    // Check for spaces, hyphens, underscores (not allowed)
    const hasSpaces = nameWithoutExt.includes(' ');
    const hasHyphens = nameWithoutExt.includes('-');
    const hasUnderscores = nameWithoutExt.includes('_');
    
    // Dots are allowed for multi-word filenames
    const hasDots = nameWithoutExt.includes('.');
    
    // Valid if: no spaces, no hyphens, no underscores
    // Dots are allowed for multi-word filenames like rodin.coil.ts
    return !hasSpaces && !hasHyphens && !hasUnderscores;
  }

  // Walk through src directory
  checkDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) return;

    const items = fs.readdirSync(dirPath);
    
    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursively check subdirectories
        this.checkDirectory(fullPath);
      } else if (stat.isFile()) {
        // Check filename
        if (this.isValidFilename(item)) {
          this.validFiles.push({
            path: fullPath,
            filename: item
          });
        } else {
          this.violations.push({
            path: fullPath,
            filename: item,
            issue: this.getViolationType(item)
          });
        }
      }
    });
  }

  // Get violation type
  getViolationType(filename) {
    const nameWithoutExt = path.basename(filename, path.extname(filename));
    
    if (nameWithoutExt.includes(' ')) {
      return 'Contains spaces';
    } else if (nameWithoutExt.includes('-')) {
      return 'Contains hyphens';
    } else if (nameWithoutExt.includes('_')) {
      return 'Contains underscores';
    }
    
    return 'Unknown violation';
  }

  // Generate report
  generateReport() {
    console.log('=== FILENAME LIMIT CHECK ===\n');
    console.log('✅ Valid patterns: single words OR multi-words with dots (e.g., rodin.coil.ts)\n');
    console.log('❌ Invalid patterns: spaces, hyphens, underscores\n');
    
    if (this.violations.length === 0) {
      console.log('✅ All filenames in src/ follow the naming rules!');
      console.log(`Total files checked: ${this.validFiles.length}`);
    } else {
      console.log(`❌ Found ${this.violations.length} filename violations:`);
      console.log();
      
      this.violations.forEach(violation => {
        console.log(`- ${violation.path}`);
        console.log(`  Issue: ${violation.issue}`);
        console.log(`  Filename: ${violation.filename}`);
        console.log();
      });
      
      console.log(`Total valid files: ${this.validFiles.length}`);
      console.log(`Total violations: ${this.violations.length}`);
    }
    
    return {
      violations: this.violations,
      validFiles: this.validFiles,
      totalFiles: this.validFiles.length + this.violations.length
    };
  }

  // Suggest fixes for violations
  suggestFixes() {
    if (this.violations.length === 0) return;
    
    console.log('\n=== SUGGESTED FIXES ===\n');
    console.log('Convert to single words OR use dots for multi-words:\n');
    
    this.violations.forEach(violation => {
      const nameWithoutExt = path.basename(violation.filename, path.extname(violation.filename));
      const ext = path.extname(violation.filename);
      
      // Generate suggested single-word filename
      let suggestedSingle = nameWithoutExt
        .replace(/[^a-zA-Z0-9]/g, '') // Remove all non-alphanumeric
        .toLowerCase();
      
      // Generate suggested multi-word with dots filename
      let suggestedMulti = nameWithoutExt
        .replace(/[^a-zA-Z0-9]/g, '.') // Replace non-alphanumeric with dots
        .replace(/\.+/g, '.') // Replace multiple dots with single dot
        .replace(/^\.|\.$/g, '') // Remove leading/trailing dots
        .toLowerCase();
      
      // If empty after cleaning, use a default
      if (!suggestedSingle) {
        suggestedSingle = 'file';
      }
      if (!suggestedMulti) {
        suggestedMulti = 'file';
      }
      
      console.log(`Current: ${violation.filename}`);
      console.log(`Option 1 (single word): ${suggestedSingle}${ext}`);
      console.log(`Option 2 (multi-word with dots): ${suggestedMulti}${ext}`);
      console.log(`Path: ${violation.path}`);
      console.log();
    });
  }
}

// Run the checker
const checker = new FilenameLimitChecker();
checker.checkDirectory('src');
const report = checker.generateReport();
checker.suggestFixes();

// Export for use in other scripts
module.exports = { FilenameLimitChecker }; 