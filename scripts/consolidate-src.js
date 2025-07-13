const fs = require('fs');
const path = require('path');

class SrcConsolidator {
  constructor() {
    this.srcDir = 'src';
    this.consolidatedFiles = [];
    this.errors = [];
  }

  // Define consolidation rules
  getConsolidationRules() {
    return [
      {
        pattern: /^types\.ts$/,
        target: 'index.ts',
        reason: 'Consolidate type definitions into main index file'
      },
      {
        pattern: /^setup\.ts$/,
        target: 'index.ts',
        reason: 'Consolidate setup functions into main index file'
      },
      {
        pattern: /^constants\.ts$/,
        target: 'index.ts',
        reason: 'Consolidate constants into main index file'
      },
      {
        pattern: /^utils\.ts$/,
        target: 'index.ts',
        reason: 'Consolidate utilities into main index file'
      }
    ];
  }

  // Check if file can be consolidated
  canConsolidate(filename) {
    const rules = this.getConsolidationRules();
    return rules.some(rule => rule.pattern.test(filename));
  }

  // Get target file for consolidation
  getTargetFile(filename) {
    const rules = this.getConsolidationRules();
    for (const rule of rules) {
      if (rule.pattern.test(filename)) {
        return rule.target;
      }
    }
    return null;
  }

  // Get consolidation reason
  getConsolidationReason(filename) {
    const rules = this.getConsolidationRules();
    for (const rule of rules) {
      if (rule.pattern.test(filename)) {
        return rule.reason;
      }
    }
    return 'Unknown consolidation';
  }

  // Read file content
  readFileContent(filePath) {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      return null;
    }
  }

  // Extract exports from file content
  extractExports(content) {
    const exports = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
      // Match export statements
      const exportMatch = line.match(/^export\s+(.+)$/);
      if (exportMatch) {
        exports.push(line.trim());
      }
      
      // Match function/const exports
      const funcMatch = line.match(/^export\s+(const|function|class)\s+(\w+)/);
      if (funcMatch) {
        exports.push(line.trim());
      }
    }
    
    return exports;
  }

  // Consolidate files in directory
  consolidateDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) return;

    const items = fs.readdirSync(dirPath);
    
    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursively consolidate subdirectories
        this.consolidateDirectory(fullPath);
      } else if (stat.isFile() && this.canConsolidate(item)) {
        const targetFile = this.getTargetFile(item);
        const targetPath = path.join(dirPath, targetFile);
        
        try {
          // Read source file content
          const sourceContent = this.readFileContent(fullPath);
          if (!sourceContent) {
            throw new Error(`Cannot read file: ${fullPath}`);
          }
          
          // Read target file content
          let targetContent = '';
          if (fs.existsSync(targetPath)) {
            targetContent = fs.readFileSync(targetPath, 'utf8');
          }
          
          // Extract exports from source file
          const exports = this.extractExports(sourceContent);
          
          // Append exports to target file
          const newContent = targetContent + '\n\n' + exports.join('\n');
          
          // Write to target file
          fs.writeFileSync(targetPath, newContent);
          
          // Remove source file
          fs.unlinkSync(fullPath);
          
          this.consolidatedFiles.push({
            sourcePath: fullPath,
            targetPath: targetPath,
            sourceFile: item,
            targetFile: targetFile,
            reason: this.getConsolidationReason(item),
            exports: exports
          });
          
          console.log(`✅ Consolidated: ${item} → ${targetFile}`);
          console.log(`   Reason: ${this.getConsolidationReason(item)}`);
        } catch (error) {
          this.errors.push({
            path: fullPath,
            filename: item,
            error: error.message
          });
          console.log(`❌ Error consolidating ${item}: ${error.message}`);
        }
      }
    });
  }

  // Generate summary
  generateSummary() {
    console.log('\n=== SRC CONSOLIDATION SUMMARY ===\n');
    
    if (this.consolidatedFiles.length > 0) {
      console.log(`✅ Successfully consolidated ${this.consolidatedFiles.length} files:`);
      console.log();
      
      this.consolidatedFiles.forEach(consolidation => {
        console.log(`- ${consolidation.sourceFile} → ${consolidation.targetFile}`);
        console.log(`  Reason: ${consolidation.reason}`);
        console.log(`  Exports: ${consolidation.exports.length} items`);
      });
    }
    
    if (this.errors.length > 0) {
      console.log(`\n❌ ${this.errors.length} errors occurred:`);
      console.log();
      
      this.errors.forEach(error => {
        console.log(`- ${error.filename}: ${error.error}`);
      });
    }
    
    if (this.consolidatedFiles.length === 0 && this.errors.length === 0) {
      console.log('✅ No files needed consolidation!');
    }
    
    return {
      consolidatedFiles: this.consolidatedFiles,
      errors: this.errors,
      totalConsolidated: this.consolidatedFiles.length,
      totalErrors: this.errors.length
    };
  }
}

// Run the consolidator
const consolidator = new SrcConsolidator();
consolidator.consolidateDirectory('src');
const summary = consolidator.generateSummary();

// Export for use in other scripts
module.exports = { SrcConsolidator }; 