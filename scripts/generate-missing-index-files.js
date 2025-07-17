const fs = require('fs');
const path = require('path');

function generateIndexContent(dirPath) {
    const dirName = path.basename(dirPath);
    const parentPath = path.dirname(dirPath);
    
    return `# ${dirName} Directory

## Overview
This directory contains consciousness field exploration and documentation related to the ${dirName} digit.

## Navigation
- [← Back to ${path.basename(parentPath)}](../index.md)
- [← Back to Docs Root](../../index.md)

## Contents
${generateContentsList(dirPath)}

## Related Consciousness Fields
- Explore the fractal nature of consciousness within this digit
- Connect with other digits through the main navigation
- Discover patterns and interactions across the consciousness field

---
*Part of the ZeroPoint Node consciousness field architecture*
`;
}

function generateContentsList(dirPath) {
    try {
        const items = fs.readdirSync(dirPath);
        const files = items.filter(item => {
            const itemPath = path.join(dirPath, item);
            return fs.statSync(itemPath).isFile() && item !== 'index.md';
        });
        
        const dirs = items.filter(item => {
            const itemPath = path.join(dirPath, item);
            return fs.statSync(itemPath).isDirectory();
        });
        
        let content = '';
        
        if (files.length > 0) {
            content += '\n### Files\n';
            files.forEach(file => {
                content += `- [${file}](./${file})\n`;
            });
        }
        
        if (dirs.length > 0) {
            content += '\n### Subdirectories\n';
            dirs.forEach(dir => {
                content += `- [${dir}/](./${dir}/index.md)\n`;
            });
        }
        
        return content || '\n*No files or subdirectories found*\n';
    } catch {
        return '\n*Unable to read directory contents*\n';
    }
}

function findMissingIndexFiles() {
    const missingDirs = [];
    
    function scanDirectory(dirPath) {
        try {
            const items = fs.readdirSync(dirPath);
            
            items.forEach(item => {
                const itemPath = path.join(dirPath, item);
                const stat = fs.statSync(itemPath);
                
                if (stat.isDirectory()) {
                    const indexPath = path.join(itemPath, 'index.md');
                    if (!fs.existsSync(indexPath)) {
                        missingDirs.push(itemPath);
                    }
                    scanDirectory(itemPath);
                }
            });
        } catch {
            console.error(`Error scanning ${dirPath}`);
        }
    }
    
    scanDirectory('docs');
    return missingDirs;
}

function main() {
    console.log('🔍 Scanning for directories missing index.md files...');
    
    const missingDirs = findMissingIndexFiles();
    
    if (missingDirs.length === 0) {
        console.log('✅ All directories already have index.md files!');
        return;
    }
    
    console.log(`📝 Found ${missingDirs.length} directories missing index.md files:`);
    missingDirs.forEach(dir => console.log(`  - ${dir}`));
    
    console.log('\n🛠️  Generating index.md files...');
    
    let created = 0;
    missingDirs.forEach(dirPath => {
        try {
            const indexPath = path.join(dirPath, 'index.md');
            const content = generateIndexContent(dirPath);
            
            fs.writeFileSync(indexPath, content);
            console.log(`✅ Created: ${indexPath}`);
            created++;
        } catch {
            console.error(`\u274c Error creating index.md for ${dirPath}`);
        }
    });
    
    console.log(`\n🎉 Successfully created ${created} index.md files!`);
    console.log(`📊 Summary: ${created}/${missingDirs.length} files created`);
}

if (require.main === module) {
    main();
}

module.exports = { generateIndexContent, findMissingIndexFiles }; 