const fs = require('fs');
const path = require('path');

class FilenameLimitFixer {
  constructor() {
    this.srcDir = 'src';
    this.fixedFiles = [];
    this.errors = [];
  }

  // Convert filename to use dots instead of underscores/hyphens
  convertToDotNotation(filename) {
    const ext = path.extname(filename);
    const nameWithoutExt = path.basename(filename, ext);
    
    // Replace underscores and hyphens with dots
    let converted = nameWithoutExt
      .replace(/[_-]/g, '.') // Replace underscores and hyphens with dots
      .replace(/\.+/g, '.') // Replace multiple dots with single dot
      .replace(/^\.|\.$/g, '') // Remove leading/trailing dots
      .toLowerCase();
    
    // If empty after conversion, use a default
    if (!converted) {
      converted = 'file';
    }
    
    return converted + ext;
  }

  // Fix filenames in directory
  fixDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) return;

    const items = fs.readdirSync(dirPath);
    
    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursively fix subdirectories
        this.fixDirectory(fullPath);
      } else if (stat.isFile()) {
        // Check if filename needs fixing
        if (this.needsFixing(item)) {
          const newFilename = this.convertToDotNotation(item);
          const newPath = path.join(dirPath, newFilename);
          
          try {
            // Rename the file
            fs.renameSync(fullPath, newPath);
            
            this.fixedFiles.push({
              oldPath: fullPath,
              newPath: newPath,
              oldFilename: item,
              newFilename: newFilename
            });
            
            console.log(`✅ Fixed: ${item} → ${newFilename}`);
          } catch (error) {
            this.errors.push({
              path: fullPath,
              filename: item,
              error: error.message
            });
            console.log(`❌ Error fixing ${item}: ${error.message}`);
          }
        }
      }
    });
  }

  // Check if filename needs fixing
  needsFixing(filename) {
    const nameWithoutExt = path.basename(filename, path.extname(filename));
    
    // Check for spaces, hyphens, underscores (not allowed)
    const hasSpaces = nameWithoutExt.includes(' ');
    const hasHyphens = nameWithoutExt.includes('-');
    const hasUnderscores = nameWithoutExt.includes('_');
    
    return hasSpaces || hasHyphens || hasUnderscores;
  }

  // Generate summary
  generateSummary() {
    console.log('\n=== FILENAME FIX SUMMARY ===\n');
    
    if (this.fixedFiles.length > 0) {
      console.log(`✅ Successfully fixed ${this.fixedFiles.length} files:`);
      console.log();
      
      this.fixedFiles.forEach(fix => {
        console.log(`- ${fix.oldFilename} → ${fix.newFilename}`);
      });
    }
    
    if (this.errors.length > 0) {
      console.log(`\n❌ ${this.errors.length} errors occurred:`);
      console.log();
      
      this.errors.forEach(error => {
        console.log(`- ${error.filename}: ${error.error}`);
      });
    }
    
    if (this.fixedFiles.length === 0 && this.errors.length === 0) {
      console.log('✅ No files needed fixing!');
    }
    
    return {
      fixedFiles: this.fixedFiles,
      errors: this.errors,
      totalFixed: this.fixedFiles.length,
      totalErrors: this.errors.length
    };
  }
}

// Run the fixer
const fixer = new FilenameLimitFixer();
fixer.fixDirectory('src');
const summary = fixer.generateSummary();

// Export for use in other scripts
module.exports = { FilenameLimitFixer }; 