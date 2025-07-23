import * as fs from 'fs';
import * as path from 'path';

// Canonical A432 directory
const A432_DIR = path.join(__dirname, '../src/0/3/6/9/1/2/4/8/7/5/1');

// Utility: Check if file is a canonical a432 module
function isCanonicalA432File(filename: string): boolean {
  return /^a432\..*\.ts$/.test(filename) && !filename.endsWith('.test.ts');
}

// Utility: Check for corresponding .md documentation
function hasDocumentation(file: string): boolean {
  const mdFile = file.replace(/\.ts$/, '.md');
  return fs.existsSync(mdFile);
}

// Utility: Check for corresponding .test.ts file
function hasTestCoverage(file: string): boolean {
  const testFile = file.replace(/\.ts$/, '.test.ts');
  return fs.existsSync(testFile);
}

// Output possibility
function outputPossibility(msg: string) {
  console.log(`Possibility: ${msg}`);
}

// Output impossibility
function outputImpossibility(msg: string) {
  console.log(`Impossibility: ${msg}`);
}

// Main engine
function scanA432Matrix(directory: string) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isFile() && isCanonicalA432File(file)) {
      // Documentation possibility
      if (hasDocumentation(fullPath)) {
        outputPossibility(`${file}: Documentation exists. Possibility: Harmonize or extend.`);
      } else {
        outputPossibility(`${file}: Documentation missing. Possibility: Generate scientific doc.`);
      }
      // Test coverage impossibility
      if (!hasTestCoverage(fullPath)) {
        outputImpossibility(`${file}: No test coverage. Impossibility: Gateway for new proof.`);
      }
    }
  }
}

// Run the engine
scanA432Matrix(A432_DIR); 