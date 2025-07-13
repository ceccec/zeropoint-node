const fs = require('fs');
const path = require('path');

const digitMeta = {
  '0': 'Void, Origin, Infinite Potential',
  '1': 'Unity, Expansion, Initiation',
  '2': 'Duality, Reflection, Polarity',
  '3': 'Creation, Resonance, Trinity',
  '4': 'Stability, Foundation, Law',
  '5': 'Change, Flow, Center',
  '6': 'Harmony, Balance, Beauty',
  '7': 'Mystery, Gateway, Spiritual Insight',
  '8': 'Infinity, Power, Manifestation',
  '9': 'Completion, Spirit, W-Axis Control'
};

function getExports(file) {
  if (!fs.existsSync(file)) return [];
  const content = fs.readFileSync(file, 'utf8');
  const exportRegex = /export (function|class|const|let|var) ([A-Za-z0-9_]+)/g;
  let match;
  const exports = [];
  while ((match = exportRegex.exec(content))) {
    exports.push({ type: match[1], name: match[2] });
  }
  return exports;
}

let out = '# API Metaphysics Reference\n\n';
out += 'This document describes the metaphysical role of each exported API in the digit modules.\n\n';
for (let d = 0; d <= 9; d++) {
  const indexPath = path.join('src', String(d), 'index.ts');
  const exports = getExports(indexPath);
  if (exports.length) {
    out += `## Digit ${d}: ${digitMeta[String(d)]}\n`;
    exports.forEach(e => {
      out += `- **${e.name}** (${e.type})\n`;
      out += `  - Metaphysical role: Embodies the ${digitMeta[String(d)]} archetype.\n`;
      out += `  - Usage: Used in consciousness flows, vortex sequences, and W-Axis integration.\n`;
    });
    out += '\n';
  }
}
fs.writeFileSync('docs/API_METAPHYSICS.md', out);
console.log('Generated: docs/API_METAPHYSICS.md'); 