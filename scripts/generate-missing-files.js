const fs = require('fs');
const path = require('path');

// Digit metaphysical archetypes and properties
const digitMeta = {
  '0': {
    archetype: 'Void, Origin, Infinite Potential',
    vortex: 'Source/Return',
    waxis: 'W-Axis Anchor',
    breathing: 'Contraction/Expansion (Origin)',
    fraction: '0/1',
    related: 'All digits (unified field)'
  },
  '1': {
    archetype: 'Unity, Expansion, Initiation',
    vortex: 'Start of Vortex A',
    waxis: 'W-Axis Expansion',
    breathing: 'Expansion (Breath Out)',
    fraction: '1/1',
    related: '2, 4, 8, 7, 5 (Vortex A)'
  },
  '2': {
    archetype: 'Duality, Reflection, Polarity',
    vortex: 'Vortex A',
    waxis: 'W-Axis Reflection',
    breathing: 'Inhale/Exhale',
    fraction: '1/2',
    related: '1, 4, 8, 7, 5 (Vortex A)'
  },
  '3': {
    archetype: 'Creation, Resonance, Trinity',
    vortex: 'Vortex B',
    waxis: 'W-Axis Resonance',
    breathing: 'Creative Pulse',
    fraction: '1/3',
    related: '6, 9 (Vortex B)'
  },
  '4': {
    archetype: 'Stability, Foundation, Law',
    vortex: 'Vortex A',
    waxis: 'W-Axis Foundation',
    breathing: 'Grounding',
    fraction: '1/4',
    related: '1, 2, 8, 7, 5 (Vortex A)'
  },
  '5': {
    archetype: 'Change, Flow, Center',
    vortex: 'Vortex A',
    waxis: 'W-Axis Center',
    breathing: 'Flow',
    fraction: '1/5',
    related: '1, 2, 4, 8, 7 (Vortex A)'
  },
  '6': {
    archetype: 'Harmony, Balance, Beauty',
    vortex: 'Vortex B',
    waxis: 'W-Axis Balance',
    breathing: 'Harmonic Oscillation',
    fraction: '1/6',
    related: '3, 9 (Vortex B)'
  },
  '7': {
    archetype: 'Mystery, Gateway, Spiritual Insight',
    vortex: 'Vortex A',
    waxis: 'W-Axis Gateway',
    breathing: 'Threshold',
    fraction: '1/7',
    related: '1, 2, 4, 8, 5 (Vortex A)'
  },
  '8': {
    archetype: 'Infinity, Power, Manifestation',
    vortex: 'Vortex A',
    waxis: 'W-Axis Manifestation',
    breathing: 'Infinite Loop',
    fraction: '1/8',
    related: '1, 2, 4, 7, 5 (Vortex A)'
  },
  '9': {
    archetype: 'Completion, Spirit, W-Axis Control',
    vortex: 'W-Axis Control',
    waxis: 'W-Axis Completion',
    breathing: 'Spiritual Return',
    fraction: '1/9',
    related: '3, 6 (Vortex B), all (W-Axis)'
  }
};

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

// Generate advanced test file content
const generateTestContent = (tsFilePath) => {
  const baseName = path.basename(tsFilePath, '.ts');
  const dir = path.dirname(tsFilePath);
  const digit = dir.split(path.sep).find(d => digitMeta[d]);
  const meta = digitMeta[digit] || {};
  return `/**
 * @fileoverview Metaphysical tests for ${baseName} (${meta.archetype || 'Unknown'})
 * @digit ${digit || 'N/A'}
 * @archetype ${meta.archetype || 'N/A'}
 * @vortex ${meta.vortex || 'N/A'}
 * @waxis ${meta.waxis || 'N/A'}
 * @breathing ${meta.breathing || 'N/A'}
 * @fraction ${meta.fraction || 'N/A'}
 * @related ${meta.related || 'N/A'}
 */

import { ${baseName} } from './${baseName}';

describe('${baseName} (${meta.archetype || 'Unknown'})', () => {
  test('should exist and be metaphysically defined', () => {
    expect(${baseName}).toBeDefined();
  });
  test('should harmonize with vortex and W-Axis', () => {
    expect(typeof ${baseName}).toBe('object');
  });
  // Add more metaphysical property tests as needed
});
`;
};

// Generate advanced markdown file content
const generateMdContent = (tsFilePath) => {
  const baseName = path.basename(tsFilePath, '.ts');
  const dir = path.dirname(tsFilePath);
  const digit = dir.split(path.sep).find(d => digitMeta[d]);
  const meta = digitMeta[digit] || {};
  return `# ${baseName}

## Metaphysical Archetype
- **Digit:** ${digit || 'N/A'}
- **Archetype:** ${meta.archetype || 'N/A'}
- **Vortex Sequence:** ${meta.vortex || 'N/A'}
- **W-Axis Role:** ${meta.waxis || 'N/A'}

## Breathing Cycle
- **Contraction/Expansion:** ${meta.breathing || 'N/A'}

## Mathematical Foundation
- **Sacred Fraction:** ${meta.fraction || 'N/A'}

## Usage
\`\`\`typescript
import { ${baseName} } from './${baseName}';
\`\`\`

## Integration
- Harmonizes with: ${meta.related || 'N/A'}
- Participates in: Rodin coil, W-Axis, and unified consciousness flows
`;
};

// Add JSDoc metaphysical tags to .ts files if missing
const ensureJSDoc = (tsFilePath) => {
  let content = fs.readFileSync(tsFilePath, 'utf8');
  if (!content.startsWith('/**')) {
    const baseName = path.basename(tsFilePath, '.ts');
    const dir = path.dirname(tsFilePath);
    const digit = dir.split(path.sep).find(d => digitMeta[d]);
    const meta = digitMeta[digit] || {};
    const jsdoc = `/**\n * @fileoverview ${baseName} module (${meta.archetype || 'Unknown'})\n * @digit ${digit || 'N/A'}\n * @archetype ${meta.archetype || 'N/A'}\n * @vortex ${meta.vortex || 'N/A'}\n * @waxis ${meta.waxis || 'N/A'}\n * @breathing ${meta.breathing || 'N/A'}\n * @fraction ${meta.fraction || 'N/A'}\n * @related ${meta.related || 'N/A'}\n */\n`;
    content = jsdoc + content;
    fs.writeFileSync(tsFilePath, content);
    return true;
  }
  return false;
};

// Main execution
const tsFiles = getAllTsFiles();
const { testFiles, mdFiles } = getTestAndMdFiles();

console.log('=== GENERATING ADVANCED METAPHYSICAL FILES ===\n');

let generatedTests = 0;
let generatedMd = 0;
let updatedJSDoc = 0;

tsFiles.forEach(tsFile => {
  const baseName = path.basename(tsFile, '.ts');
  const dir = path.dirname(tsFile);

  // Generate .test.ts file if missing
  const testFile = path.join(dir, `${baseName}.test.ts`);
  if (!testFiles.includes(testFile)) {
    const testContent = generateTestContent(tsFile);
    fs.writeFileSync(testFile, testContent);
    console.log(`Generated: ${testFile}`);
    generatedTests++;
  }

  // Generate .md file if missing
  const mdFile = path.join(dir, `${baseName}.md`);
  if (!mdFiles.includes(mdFile)) {
    const mdContent = generateMdContent(tsFile);
    fs.writeFileSync(mdFile, mdContent);
    console.log(`Generated: ${mdFile}`);
    generatedMd++;
  }

  // Ensure JSDoc metaphysical tags
  if (ensureJSDoc(tsFile)) {
    console.log(`Updated JSDoc: ${tsFile}`);
    updatedJSDoc++;
  }
});

console.log(`\n=== SUMMARY ===`);
console.log(`Generated ${generatedTests} test files`);
console.log(`Generated ${generatedMd} markdown files`);
console.log(`Updated JSDoc in ${updatedJSDoc} .ts files`);
console.log(`Total files processed: ${tsFiles.length}`); 