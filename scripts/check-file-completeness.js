const fs = require('fs');
const path = require('path');

// Get all .ts files in src
const getAllTsFiles = () => {
  const tsFiles = [];
  const walkDir = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.ts') && !file.endsWith('.test.ts')) {
        tsFiles.push(filePath);
      }
    });
  };
  walkDir('src');
  return tsFiles;
};

// Get all .test.ts and .md files
const getTestAndMdFiles = () => {
  const testFiles = [];
  const mdFiles = [];
  const walkDir = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.test.ts')) {
        testFiles.push(filePath);
      } else if (file.endsWith('.md')) {
        mdFiles.push(filePath);
      }
    });
  };
  walkDir('src');
  return { testFiles, mdFiles };
};

const tsFiles = getAllTsFiles();
const { testFiles, mdFiles } = getTestAndMdFiles();

console.log('=== ANALYSIS OF FILE COMPLETENESS ===\n');

const missingFiles = {
  missingTests: [],
  missingMd: []
};

tsFiles.forEach(tsFile => {
  const baseName = path.basename(tsFile, '.ts');
  const dir = path.dirname(tsFile);
  
  // Check for corresponding .test.ts file
  const testFile = path.join(dir, `${baseName}.test.ts`);
  if (!testFiles.includes(testFile)) {
    missingFiles.missingTests.push(tsFile);
  }
  
  // Check for corresponding .md file
  const mdFile = path.join(dir, `${baseName}.md`);
  if (!mdFiles.includes(mdFile)) {
    missingFiles.missingMd.push(tsFile);
  }
});

console.log(`Total .ts files: ${tsFiles.length}`);
console.log(`Files missing .test.ts: ${missingFiles.missingTests.length}`);
console.log(`Files missing .md: ${missingFiles.missingMd.length}\n`);

if (missingFiles.missingTests.length > 0) {
  console.log('=== FILES MISSING .test.ts ===');
  missingFiles.missingTests.forEach(file => {
    console.log(`  ${file}`);
  });
  console.log();
}

if (missingFiles.missingMd.length > 0) {
  console.log('=== FILES MISSING .md ===');
  missingFiles.missingMd.forEach(file => {
    console.log(`  ${file}`);
  });
  console.log();
}

// Files that have both test and md
const completeFiles = tsFiles.filter(tsFile => {
  const baseName = path.basename(tsFile, '.ts');
  const dir = path.dirname(tsFile);
  const testFile = path.join(dir, `${baseName}.test.ts`);
  const mdFile = path.join(dir, `${baseName}.md`);
  return testFiles.includes(testFile) && mdFiles.includes(mdFile);
});

console.log(`=== COMPLETE FILES (have both .test.ts and .md) ===`);
completeFiles.forEach(file => {
  console.log(`  ${file}`);
}); 