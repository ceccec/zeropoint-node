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

function getBreadcrumb(digit) {
  return VORTEX_CYCLE.map(d => {
    const link = `[${d}](../${d}/index.md)`;
    return d == digit ? `**${link}**` : link;
  }).join(' → ');
}

function getCompoundMeaning(a, b) {
  return `${DIGIT_MEANINGS[a]}/${DIGIT_MEANINGS[b]}`;
}

function getFractionLink(a, b) {
  return `[${a}/${b}](${b}/index.md)`;
}

function updateIndex(filePath, digit) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Remove old navigation section (between --- NAVIGATION START --- and --- NAVIGATION END ---)
  content = content.replace(/--- NAVIGATION START ---[\s\S]*?--- NAVIGATION END ---\n?/g, '');

  const { prev, next } = getPrevNext(digit);
  const topLink = '[Top: Vortex Model](../VORTEX_INTERACTION_MODEL.md)';
  const breadcrumb = getBreadcrumb(digit);

  // Subfolder links (down)
  let downLinks = '';
  for (let sub = 0; sub <= 9; sub++) {
    const fracLink = getFractionLink(digit, sub);
    downLinks += `- ${fracLink}: ${getCompoundMeaning(digit, sub)}\n`;
  }

  // Gateway highlights
  let gatewayLinks = '';
  if (GATEWAYS.includes(Number(digit))) {
    gatewayLinks = '\n**Gateway:** This digit is a vortex gateway (' + DIGIT_MEANINGS[digit] + ').\n';
  }
  if (digit == 0) gatewayLinks += '\n**Special:** 0/0 (impossibility)\n';
  if (digit == 1) gatewayLinks += '\n**Special:** 1/1 (unity)\n';

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

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && /^\d$/.test(entry.name)) {
      const subdir = path.join(dir, entry.name);
      const indexPath = path.join(subdir, 'index.md');
      if (fs.existsSync(indexPath)) {
        updateIndex(indexPath, entry.name);
      }
      walk(subdir);
    }
  }
}

walk(DOCS_ROOT);
console.log('Vortex navigation harmonization with clickable links complete.'); 