#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixDuplicateMatrices(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // Split content into lines
        const lines = content.split('\n');
        const newLines = [];
        let inMatrix = false;
        let matrixCount = 0;
        let keepFirstMatrix = true;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // Check if this line starts a matrix (has | characters and contains Field or similar)
            if (line.includes('|') && (line.includes('Field') || line.includes('**Field**'))) {
                if (!inMatrix) {
                    // Starting a new matrix
                    inMatrix = true;
                    matrixCount++;
                    
                    // Keep only the first matrix
                    if (matrixCount === 1) {
                        keepFirstMatrix = true;
                        newLines.push(line);
                    } else {
                        keepFirstMatrix = false;
                    }
                } else {
                    // We're already in a matrix, this might be a header row
                    if (keepFirstMatrix) {
                        newLines.push(line);
                    }
                }
            } else if (inMatrix) {
                // Check if we're still in the matrix
                if (line.includes('|') || line.includes('---')) {
                    // Still in matrix
                    if (keepFirstMatrix) {
                        newLines.push(line);
                    }
                } else {
                    // Matrix ended
                    inMatrix = false;
                    if (keepFirstMatrix) {
                        newLines.push(line);
                    }
                }
            } else {
                // Not in matrix, keep the line
                newLines.push(line);
            }
        }
        
        const newContent = newLines.join('\n');
        
        if (newContent !== originalContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`✅ Fixed: ${filePath} (removed ${matrixCount - 1} duplicate matrices)`);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        return false;
    }
}

function findAndFixFiles(dir) {
    let fixedCount = 0;
    
    function processDirectory(currentDir) {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                processDirectory(fullPath);
            } else if (item === 'index.md') {
                if (fixDuplicateMatrices(fullPath)) {
                    fixedCount++;
                }
            }
        }
    }
    
    processDirectory(dir);
    return fixedCount;
}

// Main execution
const docsDir = path.join(__dirname, '..', 'docs');
console.log('🔍 Scanning for duplicate matrices in docs directory...');

const fixedFiles = findAndFixFiles(docsDir);

if (fixedFiles > 0) {
    console.log(`\n✅ Successfully fixed ${fixedFiles} files with duplicate matrices`);
} else {
    console.log('\n✨ No duplicate matrices found - all files are clean!');
} 