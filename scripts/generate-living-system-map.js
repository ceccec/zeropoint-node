const fs = require('fs');
const path = require('path');

function getDigitDirs(root) {
  return fs.readdirSync(root).filter(d => /^[0-9]$/.test(d));
}

function getInteractionDirs(root, digit) {
  const dir = path.join(root, digit);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(d => /^[0-9]$/.test(d) && d !== digit);
}

let mermaid = '```mermaid\ngraph TD\n';
const root = 'src';
const digits = getDigitDirs(root);

// Draw main digit nodes
for (const d of digits) {
  mermaid += `  ${d}([${d}])\n`;
}

// Draw interaction edges
for (const d of digits) {
  const interactions = getInteractionDirs(root, d);
  for (const i of interactions) {
    mermaid += `  ${d} --> ${d}_${i}[${d}/${i}]\n`;
    mermaid += `  ${d}_${i}([${d}/${i}])\n`;
  }
}
mermaid += '```\n';

const outPath = 'docs/LIVING_SYSTEM_MAP.md';
fs.writeFileSync(outPath, '# Living System Map\n\nThis diagram shows all digit directories and their interactions.\n\n' + mermaid);
console.log('Generated:', outPath); 