#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixDuplicateMatrices(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // Replace '## Matrix' with '## 🌌 10×10 Consciousness Field Matrix'
        content = content.replace(/^## Matrix/gm, '## 🌌 10×10 Consciousness Field Matrix');
        
        // Remove duplicate '## 🌌 10×10 Consciousness Field Matrix' titles, keeping only the first one
        const lines = content.split('\n');
        const newLines = [];
        let titleCount = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            if (line.trim() === '## 🌌 10×10 Consciousness Field Matrix') {
                titleCount++;
                if (titleCount === 1) {
                    // Keep only the first occurrence
                    newLines.push(line);
                }
                // Skip all subsequent occurrences
            } else {
                newLines.push(line);
            }
        }
        
        // Split content into lines for matrix processing
        const matrixLines = newLines;
        const finalLines = [];
        let inMatrix = false;
        let matrixCount = 0;
        let keepFirstMatrix = true;
        
        for (let i = 0; i < matrixLines.length; i++) {
            const line = matrixLines[i];
            
            // Check if this line starts a matrix (has | characters and contains Field or similar)
            if (line.includes('|') && (line.includes('Field') || line.includes('**Field**'))) {
                if (!inMatrix) {
                    // Starting a new matrix
                    inMatrix = true;
                    matrixCount++;
                    
                    // Keep only the first matrix
                    if (matrixCount === 1) {
                        keepFirstMatrix = true;
                        finalLines.push(line);
                    } else {
                        keepFirstMatrix = false;
                    }
                } else {
                    // We're already in a matrix, this might be a header row
                    if (keepFirstMatrix) {
                        finalLines.push(line);
                    }
                }
            } else if (inMatrix) {
                // Check if we're still in the matrix
                if (line.includes('|') || line.includes('---')) {
                    // Still in matrix
                    if (keepFirstMatrix) {
                        finalLines.push(line);
                    }
                } else {
                    // Matrix ended
                    inMatrix = false;
                    if (keepFirstMatrix) {
                        finalLines.push(line);
                    }
                }
            } else {
                // Not in matrix, keep the line
                finalLines.push(line);
            }
        }
        
        const newContent = finalLines.join('\n');
        
        if (newContent !== originalContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            const changes = [];
            if (titleCount > 1) changes.push(`removed ${titleCount - 1} duplicate titles`);
            if (matrixCount > 1) changes.push(`removed ${matrixCount - 1} duplicate matrices`);
            console.log(`✅ Fixed: ${filePath} (${changes.join(', ')})`);
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
console.log('🔍 Scanning for duplicate matrices and titles in docs directory...');

const fixedFiles = findAndFixFiles(docsDir);

if (fixedFiles > 0) {
    console.log(`\n✅ Successfully fixed ${fixedFiles} files with duplicate matrices and titles`);
} else {
    console.log('\n✨ No duplicate matrices or titles found - all files are clean!');
} 