// update-index-navigation.js
// Recursively updates all index.md files in docs/[digit]/... with harmonized vortex navigation and clickable links

const fs = require('fs');
const path = require('path');

const DOCS_ROOT = path.join(__dirname, '../docs');
const VORTEX_CYCLE = [1, 2, 4, 8, 7, 5];
const GATEWAYS = [0, 3, 6, 9];
const DIGIT_MEANINGS = {
  0: 'Void',
  1: 'Unity',
  2: 'Flow',
  3: 'Resonance',
  4: 'Stability',
  5: 'Divine',
  6: 'Harmony',
  7: 'Awareness',
  8: 'Infinite',
  9: 'Spirit',
};

function getPrevNext(digit) {
  const idx = VORTEX_CYCLE.indexOf(Number(digit));
  if (idx === -1) return { prev: null, next: null };
  const prev = VORTEX_CYCLE[(idx - 1 + VORTEX_CYCLE.length) % VORTEX_CYCLE.length];
  const next = VORTEX_CYCLE[(idx + 1) % VORTEX_CYCLE.length];
  return { prev, next };
}

function getBreadcrumb(digit, relPath) {
  return VORTEX_CYCLE.map(d => {
    const link = `[${d}](${relPath ? relPath + '../'.repeat(1) + d + '/index.md' : '../' + d + '/index.md'})`;
    return d == digit ? `**${link}**` : link;
  }).join(' → ');
}

function getCompoundMeaning(a, b) {
  return `${DIGIT_MEANINGS[a]}/${DIGIT_MEANINGS[b]}`;
}

function getDigitLink(d, relPath) {
  return `[${d}](${relPath ? relPath + '../'.repeat(1) + d + '/index.md' : '../' + d + '/index.md'})`;
}

function getFractionLink(a, b, relPath) {
  return `[${a}/${b}](${b}/index.md)`;
}

function updateIndex(filePath, digit, parentPath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Remove old navigation section (between --- NAVIGATION START --- and --- NAVIGATION END ---)
  content = content.replace(/--- NAVIGATION START ---[\s\S]*?--- NAVIGATION END ---\n?/g, '');

  const { prev, next } = getPrevNext(digit);
  const topLink = parentPath ? `[Top](${parentPath}/index.md)` : '[Top: Vortex Model](../VORTEX_INTERACTION_MODEL.md)';
  const breadcrumb = getBreadcrumb(digit, parentPath);

  // Subfolder links (down)
  let downLinks = '';
  for (let sub = 0; sub <= 9; sub++) {
    const fracLink = getFractionLink(digit, sub, parentPath);
    downLinks += `- ${fracLink}: ${getCompoundMeaning(digit, sub)}\n`;
  }

  // Gateway highlights
  let gatewayLinks = '';
  if (GATEWAYS.includes(Number(digit))) {
    gatewayLinks = '\n**Gateway:** This digit is a vortex gateway (' + DIGIT_MEANINGS[digit] + ').\n';
  }
  if (digit == 0) gatewayLinks += '\n**Special:** 0/0 (impossibility)\n';
  if (digit == 1) gatewayLinks += '\n**Special:** 1/1 (unity)\n';

  const prevLink = prev !== null ? getDigitLink(prev, parentPath) : 'N/A';
  const nextLink = next !== null ? getDigitLink(next, parentPath) : 'N/A';

  const navSection =
`--- NAVIGATION START ---
**Vortex Breadcrumb:** ${breadcrumb}

- [Prev: ${DIGIT_MEANINGS[prev] || 'N/A'}](${prev !== null ? `../${prev}/index.md` : '#'})
- [Next: ${DIGIT_MEANINGS[next] || 'N/A'}](${next !== null ? `../${next}/index.md` : '#'})
- ${topLink}
${gatewayLinks}
## Possible Interactions (Down)
${downLinks}--- NAVIGATION END ---
`;

  // Insert navSection at the top
  content = navSection + '\n' + content.trimStart();
  fs.writeFileSync(filePath, content, 'utf8');
}

function walk(dir, parentPath = null) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && /^\d$/.test(entry.name)) {
      const subdir = path.join(dir, entry.name);
      const indexPath = path.join(subdir, 'index.md');
      if (fs.existsSync(indexPath)) {
        updateIndex(indexPath, entry.name, path.relative(subdir, dir));
      }
      walk(subdir, path.relative(subdir, dir));
    }
  }
}

walk(DOCS_ROOT);
console.log('Vortex navigation harmonization with clickable links complete.'); 