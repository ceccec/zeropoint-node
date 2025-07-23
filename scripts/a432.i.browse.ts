import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { yinYangState, yinYangSymbol, harmonizeYinYang } from '../src/0/3/6/9/1/2/4/8/7/5/1/a432.yin.yang';

// Canonical A432 directory
const A432_DIR = path.join(__dirname, '../src/0/3/6/9/1/2/4/8/7/5/1');

// File extensions to recognize as living nodes
const EXTENSIONS = ['.ts', '.test.ts', '.md', '.html'];

// Utility: Get all canonical nodes (base filenames)
function getCanonicalNodes(directory: string): string[] {
  const files = fs.readdirSync(directory);
  const nodes = new Set<string>();
  for (const file of files) {
    const match = file.match(/^(a432\..*?)(\..+)?$/);
    if (match) {
      nodes.add(match[1]);
    }
  }
  return Array.from(nodes).sort();
}

// Utility: Get all extensions for a node
function getNodeExtensions(directory: string, node: string): string[] {
  const files = fs.readdirSync(directory);
  return files.filter(f => f.startsWith(node + '.')).map(f => f.replace(node, ''));
}

// Utility: Possibility/Impossibility status for a node
function getNodePossibilities(directory: string, node: string) {
  const files = fs.readdirSync(directory);
  const exts = EXTENSIONS;
  const status: Record<string, 'exists' | 'missing'> = {};
  for (const ext of exts) {
    const fname = node + ext;
    status[ext] = files.includes(fname) ? 'exists' : 'missing';
  }
  return status;
}

// Living prompt
function livingPrompt(query: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(query, ans => { rl.close(); resolve(ans.trim()); }));
}

// Living, recursive browser
async function browseMatrix(currentNode?: string) {
  const nodes = getCanonicalNodes(A432_DIR);
  if (!currentNode) {
    console.log('\n=== A432 Matrix Map ===');
    nodes.forEach((node, i) => {
      const status = getNodePossibilities(A432_DIR, node);
      const poss = Object.entries(status).map(([ext, s]) => s === 'exists' ? ext : `[${ext}]`).join(' ');
      const possibilityCount = Object.values(status).filter(s => s === 'exists').length;
      const impossibilityCount = Object.values(status).filter(s => s === 'missing').length;
      const yinYang = yinYangState(possibilityCount, impossibilityCount);
      const symbol = yinYangSymbol(yinYang);
      console.log(`${i + 1}. ${node}  ${poss}  ${symbol}`);
    });
    console.log('\nPossibility: Select a node by number or name, or type "exit" to leave.');
    const ans = await livingPrompt('Enter node: ');
    if (ans === 'exit') return;
    let node = '';
    if (/^\d+$/.test(ans)) {
      node = nodes[parseInt(ans) - 1];
    } else {
      node = nodes.find(n => n === ans) || '';
    }
    if (!node) {
      console.log('Impossibility: Node not found. Try again.');
      return browseMatrix();
    }
    return browseMatrix(node);
  } else {
    // Show node details
    console.log(`\n=== Node: ${currentNode} ===`);
    const status = getNodePossibilities(A432_DIR, currentNode);
    const possibilityCount = Object.values(status).filter(s => s === 'exists').length;
    const impossibilityCount = Object.values(status).filter(s => s === 'missing').length;
    const yinYang = yinYangState(possibilityCount, impossibilityCount);
    const symbol = yinYangSymbol(yinYang);
    console.log(`Yin/Yang state: ${yinYang.toFixed(2)}  ${symbol}`);
    Object.entries(status).forEach(([ext, s]) => {
      if (s === 'exists') {
        console.log(`Possibility: ${currentNode}${ext} exists.`);
      } else {
        console.log(`Impossibility: ${currentNode}${ext} missing. Possibility: Create or harmonize.`);
      }
    });
    console.log('\nActions: [b]ack, [h]armonize, [d]ocument, [c]reate, [r]elated, [exit]');
    const ans = await livingPrompt('Choose action: ');
    if (ans === 'b' || ans === 'back') {
      return browseMatrix();
    } else if (ans === 'h' || ans === 'harmonize') {
      const { yin, yang } = harmonizeYinYang(possibilityCount, impossibilityCount);
      console.log(`Harmonization: Move toward balance. Yin: ${yin}, Yang: ${yang}`);
      return browseMatrix(currentNode);
    } else if (ans === 'd' || ans === 'document') {
      if (status['.md'] === 'missing') {
        console.log(`Possibility: You may create ${currentNode}.md as a living scientific document.`);
      } else {
        console.log(`Possibility: Edit or extend ${currentNode}.md.`);
      }
      return browseMatrix(currentNode);
    } else if (ans === 'c' || ans === 'create') {
      const missing = Object.entries(status).filter(([_, s]) => s === 'missing');
      if (missing.length === 0) {
        console.log('Impossibility: All extensions exist. Nothing to create.');
      } else {
        console.log('Possibility: You may create:');
        missing.forEach(([ext]) => console.log(`  - ${currentNode}${ext}`));
      }
      return browseMatrix(currentNode);
    } else if (ans === 'r' || ans === 'related') {
      // Show related nodes (by prefix or pattern)
      const related = nodes.filter(n => n !== currentNode && n.split('.')[1] === currentNode.split('.')[1]);
      if (related.length === 0) {
        console.log('Impossibility: No related nodes found.');
      } else {
        console.log('Possibility: Related nodes:');
        related.forEach(n => console.log(`  - ${n}`));
      }
      return browseMatrix(currentNode);
    } else if (ans === 'exit') {
      return;
    } else {
      console.log('Impossibility: Unknown action. Try again.');
      return browseMatrix(currentNode);
    }
  }
}

// Entry point
(async () => {
  console.log('Welcome, I. This is the living, possibility-based browser for the A432 matrix.');
  await browseMatrix();
  console.log('You have left the living matrix.');
})(); 