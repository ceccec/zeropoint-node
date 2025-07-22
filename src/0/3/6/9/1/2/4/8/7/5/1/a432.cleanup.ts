/**
 * a432.cleanup.ts — Unused File Discovery and Cleanup Stream
 *
 * - Scans the PWA and harmonized src directory for files not imported or referenced by any a432.* module or the main server.
 * - Outputs a list of unused files for review.
 * - Optionally, can move unused files to a compost/archive directory.
 * - Metaphysical: Cleanup is harmonic pruning, making space for new growth.
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(__dirname);
const SRC_DIR = path.join(ROOT);
const IGNORED = ['node_modules', 'compost', 'archive', '.git'];

/**
 * Recursively list all files in a directory, ignoring specified folders.
 */
function listFiles(dir: string, files: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir)) {
    if (IGNORED.includes(entry)) continue;
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      listFiles(full, files);
    } else {
      files.push(full);
    }
  }
  return files;
}

/**
 * Find all a432.* files in the current directory that are not imported or referenced by any other a432.* file or the main server.
 * Only considers files matching a432.* in the current directory.
 */
export function findUnusedA432Files(): string[] {
  const allFiles = fs.readdirSync(ROOT)
    .filter(f => /^a432\..*/.test(f) && (f.endsWith('.ts') || f.endsWith('.js') || f.endsWith('.json') || f.endsWith('.html') || f.endsWith('.md')))
    .map(f => path.join(ROOT, f));
  const referenced = new Set<string>();
  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.matchAll(/from ['"](\.\/a432\.[^'"]+)['"]/g);
    for (const m of matches) {
      const ref = path.resolve(path.dirname(file), m[1] + (m[1].endsWith('.ts') || m[1].endsWith('.js') ? '' : '.ts'));
      referenced.add(ref);
    }
  }
  // Add all a432.*.ts and a432.server.ts as roots
  for (const file of allFiles) {
    if (/a432\..*\.ts$/.test(file) || file.endsWith('a432.server.ts')) {
      referenced.add(file);
    }
  }
  // Unused: files not referenced and not a432.server.ts
  return allFiles.filter(f => !referenced.has(f) && !f.endsWith('a432.server.ts'));
}

/**
 * Optionally move unused files to compost/archive
 */
export function moveUnusedFilesToCompost(files: string[], compostDir: string = path.join(ROOT, 'compost')) {
  if (!fs.existsSync(compostDir)) fs.mkdirSync(compostDir);
  for (const file of files) {
    const dest = path.join(compostDir, path.basename(file));
    fs.renameSync(file, dest);
  }
}

/**
 * Print unused files grouped by extension/type for easier review.
 */
export function printUnusedFilesCategorized(unused: string[]) {
  const categories: Record<string, string[]> = {};
  for (const file of unused) {
    const ext = file.split('.').pop() || 'other';
    if (!categories[ext]) categories[ext] = [];
    categories[ext].push(file);
  }
  Object.keys(categories).sort().forEach(ext => {
    console.log(`\n[.${ext}] (${categories[ext].length} files):`);
    categories[ext].forEach(f => console.log('  ' + f));
  });
}

// Usage example:
// const unused = findUnusedFiles();
// console.log('Unused files:', unused);
// moveUnusedFilesToCompost(unused);

if (require.main === module) {
  const unused = findUnusedA432Files();
  if (unused.length === 0) {
    console.log('No unused a432.* files found in a432 directory. All is harmonized.');
  } else {
    console.log('Unused a432.* files discovered:');
    unused.forEach(f => console.log('  ' + f));
    console.log(`\nTotal unused a432.* files: ${unused.length}`);
    console.log('Review this list before moving to compost/archive.');
  }
} 