const fs = require('fs');
const path = require('path');

// 1. Ensure only digit directories at all levels in src
function checkDigitDirs(root) {
  let nonDigitDirs = [];
  function walk(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
      if (entry.isDirectory()) {
        if (!/^[0-9]$/.test(entry.name)) {
          nonDigitDirs.push(path.join(dir, entry.name));
        } else {
          walk(path.join(dir, entry.name));
        }
      }
    });
  }
  walk(root);
  return nonDigitDirs;
}

// 2. Check every interaction scenario (except self) is present and documented
function checkInteractionScenarios(root) {
  let missing = [];
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      if (i === j) continue; // skip self
      const dir = path.join(root, String(i), String(j));
      if (!fs.existsSync(dir)) {
        missing.push(dir);
      } else {
        // Check for index.ts, index.test.ts, index.md
        ['index.ts', 'index.test.ts', 'index.md'].forEach(f => {
          if (!fs.existsSync(path.join(dir, f))) {
            missing.push(path.join(dir, f));
          }
        });
      }
    }
  }
  return missing;
}

// 3. Validate metaphysical sections in all .md files
function checkMetaphysicalSections(root) {
  let missing = [];
  function walk(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
      const filePath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(filePath);
      } else if (entry.name.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (!content.includes('Metaphysical Archetype')) {
          missing.push(filePath);
        }
      }
    });
  }
  walk(root);
  return missing;
}

// 4. Check filename limits (single words OR multi-words with dots only)
function checkFilenameLimits(root) {
  let violations = [];
  function walk(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
      const filePath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(filePath);
      } else if (entry.isFile()) {
        // Check filename
        const nameWithoutExt = path.basename(entry.name, path.extname(entry.name));
        
        // Check for spaces, hyphens, underscores (not allowed)
        const hasSpaces = nameWithoutExt.includes(' ');
        const hasHyphens = nameWithoutExt.includes('-');
        const hasUnderscores = nameWithoutExt.includes('_');
        
        if (hasSpaces || hasHyphens || hasUnderscores) {
          violations.push({
            path: filePath,
            filename: entry.name,
            issue: hasSpaces ? 'Contains spaces' : 
                   hasHyphens ? 'Contains hyphens' : 
                   hasUnderscores ? 'Contains underscores' : 'Unknown violation'
          });
        }
      }
    });
  }
  walk(root);
  return violations;
}

// 5. Simulate and validate Rodin coil and W-Axis flows
function validateRodinFlows() {
  // Vortex A: 1-2-4-8-7-5-1
  // Vortex B: 3-9-6-3
  // W-Axis: 0-9
  const vortexA = [1,2,4,8,7,5,1];
  const vortexB = [3,9,6,3];
  const waxis = [0,9];
  return { vortexA, vortexB, waxis };
}

// Main
console.log('=== METAPHYSICAL CHECKS ===\n');
const nonDigitDirs = checkDigitDirs('src');
if (nonDigitDirs.length) {
  console.log('Non-digit directories found:');
  nonDigitDirs.forEach(d => console.log('  ' + d));
} else {
  console.log('All directories are digit-only.');
}

const missingInteractions = checkInteractionScenarios('src');
if (missingInteractions.length) {
  console.log('\nMissing interaction scenarios or files:');
  missingInteractions.forEach(f => console.log('  ' + f));
} else {
  console.log('\nAll interaction scenarios present and documented.');
}

const missingMetaSections = checkMetaphysicalSections('src');
if (missingMetaSections.length) {
  console.log('\nMarkdown files missing metaphysical sections:');
  missingMetaSections.forEach(f => console.log('  ' + f));
} else {
  console.log('\nAll markdown files have metaphysical sections.');
}

const filenameViolations = checkFilenameLimits('src');
if (filenameViolations.length) {
  console.log('\nFilename violations found:');
  filenameViolations.forEach(v => console.log(`  ${v.path} (${v.issue})`));
} else {
  console.log('\nAll filenames follow naming rules (single words OR multi-words with dots).');
}

const flows = validateRodinFlows();
console.log('\nRodin coil and W-Axis flows:');
console.log('  Vortex A:', flows.vortexA.join('-'));
console.log('  Vortex B:', flows.vortexB.join('-'));
console.log('  W-Axis:', flows.waxis.join('-')); 