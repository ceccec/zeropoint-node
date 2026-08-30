#!/usr/bin/env node
/**
 * A name in the documentation must be a name in the code.
 *
 * Six modules' docs cite constants like `VBM_STEP_ANGLE`, `INFINITY_LOOP_DEPTH`
 * and `VBM_DECODE_BASE`. None of those strings appears anywhere in src/. The
 * code calls them VBM_ANIMATION_CONSTANTS.STEP_ANGLE, INFINITY_LOOP_CONSTANTS
 * .DEPTH, and so on — the documentation invented a flattened prefix form and
 * used it consistently enough to look right.
 *
 * Nothing was factually wrong; the values exist and behave as described. What
 * is wrong is that a reader who greps for the name the doc gave them finds
 * nothing, which is the entire job of a name.
 *
 * I nearly deleted these six files. A first pass measured "43% of cited
 * identifiers do not exist" and read as staleness, and they were unreferenced,
 * unbuilt and unshipped besides. They are also the ONLY documentation for six
 * real modules — docs/ covers none of them — so deleting them would have
 * removed the only account of that code on the strength of a measurement that
 * did not understand nesting.
 *
 * So this resolves a cited name against BOTH top-level exports and the keys of
 * exported constant objects, under the prefix convention the docs use. What it
 * flags is a name that resolves to nothing at all.
 *
 *   npm run docs:names
 */

import { readdirSync, statSync, readFileSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function walk(dir, pred, out = []) {
  for (const n of readdirSync(dir)) {
    if (n === 'node_modules' || n === '.git' || n === 'dist') continue
    const full = join(dir, n)
    if (statSync(full).isDirectory()) walk(full, pred, out)
    else if (pred(n)) out.push(full)
  }
  return out
}

// Every identifier that appears ANYWHERE in the source.
//
// The first version resolved against top-level exports plus the keys of
// exported constant objects, and produced false positives it took a second look
// to catch: `fusionIgnites`, `doublingCoversOrbit` and `commutatorIsSuccessor`
// are all in src/0/index.ts as keys of objects RETURNED from functions, which
// that model never saw. A checker whose misses look identical to real findings
// is worse than none.
//
// So the rule is the weaker one it can actually enforce: a name written in the
// documentation must appear somewhere in the source. That cannot tell you the
// name is used correctly — only that a reader who greps for it finds something.
const names = new Set()
const IDENT = /[A-Za-z_$][A-Za-z0-9_$]*/g
for (const file of walk(join(ROOT, 'src'), (n) => n.endsWith('.ts') && !n.endsWith('.d.ts'))) {
  for (const m of readFileSync(file, 'utf8').matchAll(IDENT)) names.add(m[0])
}

const unresolved = []
let cited = 0
for (const file of walk(ROOT, (n) => n.endsWith('.md'))) {
  const rel = relative(ROOT, file).replace(/\\/g, '/')
  if (rel.startsWith('node_modules/')) continue
  // The CHANGELOG is a historical record: it names things as they were called
  // when the entry was written, including code since renamed or removed.
  // Holding it to today's names would require rewriting history.
  if (rel === 'CHANGELOG.md') continue
  const text = readFileSync(file, 'utf8')
  for (const m of text.matchAll(/`([A-Za-z_$][A-Za-z0-9_$]{3,})`/g)) {
    const id = m[1]
    // Only names that LOOK like code: an interior capital or an underscore.
    if (!/[A-Z]/.test(id) && !id.includes('_')) continue
    // Prose words that happen to be capitalised are not citations.
    if (/^[A-Z][a-z]+$/.test(id)) continue
    cited++
    if (!names.has(id)) unresolved.push(`${rel}: \`${id}\``)
  }
}

const byFile = {}
for (const u of unresolved) {
  const f = u.split(':')[0]
  byFile[f] = (byFile[f] ?? 0) + 1
}
if (process.argv.includes('--list')) for (const u of unresolved) console.log('    '+u)
console.log(`docs:names — ${cited} code-shaped names cited across the documentation, ${unresolved.length} resolve to nothing`)
for (const [f, n] of Object.entries(byFile).sort((a, b) => b[1] - a[1]).slice(0, 12)) {
  console.log(`  ${String(n).padStart(4)}  ${f}`)
}
process.exit(0)
