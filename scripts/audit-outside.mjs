#!/usr/bin/env node
/**
 * Audit every module outside the lean fixed point before anything is deleted.
 *
 * The fold says what is unreachable through IMPORTS. That is not the same as
 * unreferenced: a module can be named in an HTML page, a JSON manifest, a build
 * script, a workflow or a doc, and none of those are import edges. The entry set
 * has already been observed wrong twice — rollup template literals and public/
 * pages — so this does not trust the fold alone.
 *
 * For each module outside LEAN it searches the WHOLE repository for the module's
 * basename and classifies every hit:
 *
 *   SELF     the module's own file — ignored
 *   DEAD     another module that is itself outside LEAN — ignored, the island
 *            goes together
 *   LIVE     anything else: a lean module, a script, a config, a page, a doc.
 *            A single LIVE hit means the module is NOT safe to delete on the
 *            strength of the fold, and it is reported rather than removed.
 *
 * Output is the two lists. Nothing is deleted here; `--delete` is a separate
 * flag and only ever removes modules with zero LIVE references.
 *
 *   npm run audit:outside            report
 *   npm run audit:outside -- --delete   remove only the provably unreferenced
 */

import { readFileSync, existsSync, rmSync } from 'node:fs'
import { resolve, dirname, join, relative, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DELETE = process.argv.includes('--delete')

// The fold is the authority on what is outside; run it rather than reimplement.
const foldJson = JSON.parse(
  execFileSync('node', ['--experimental-strip-types', join(ROOT, 'scripts/fold-lean.mjs'), '--json'], {
    cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024,
  }),
)
if (!foldJson.converged) {
  console.error('audit: the fold did not converge — refusing to audit against an undefined lean')
  process.exit(1)
}

// Re-derive the two sets by asking the fold for each module's side.
const listing = execFileSync(
  'node',
  ['--experimental-strip-types', join(ROOT, 'scripts/fold-lean.mjs'), '--query', 'src/'],
  { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
)
const lean = new Set()
const outside = new Set()
for (const line of listing.split('\n')) {
  const m = line.match(/^\s+(LEAN|OUTSIDE)\s+(.+)$/)
  if (!m) continue
  ;(m[1] === 'LEAN' ? lean : outside).add(m[2].trim())
}

if (outside.size !== foldJson.foldedAway || lean.size !== foldJson.lean) {
  console.error(
    `audit: listing disagrees with the fold (${lean.size}/${outside.size} vs ${foldJson.lean}/${foldJson.foldedAway})`,
  )
  process.exit(1)
}

/** Every tracked file, so the search covers docs, configs and workflows too. */
const tracked = execFileSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  .split('\n').filter(Boolean)

const BINARY = /\.(png|jpe?g|gif|webp|ico|pdf|woff2?|ttf|zip|gz|tgz)$/i
const corpus = []
for (const f of tracked) {
  if (BINARY.test(f)) continue
  const p = join(ROOT, f)
  if (!existsSync(p)) continue
  let text
  try { text = readFileSync(p, 'utf8') } catch { continue }
  corpus.push({ file: f, text })
}

const safe = []
const held = []

for (const mod of [...outside].sort()) {
  const stem = basename(mod).replace(/\.ts$/, '')
  const live = []
  for (const { file, text } of corpus) {
    if (file === mod) continue          // SELF
    if (outside.has(file)) continue     // DEAD — the island goes together
    if (!text.includes(stem)) continue
    live.push(file)
    if (live.length >= 3) break
  }
  if (live.length === 0) safe.push(mod)
  else held.push({ mod, live })
}

console.log(`audit — LEAN ${lean.size}, OUTSIDE ${outside.size}, searched ${corpus.length} tracked files\n`)
console.log(`  SAFE  ${safe.length}  outside AND referenced by nothing live`)
console.log(`  HELD  ${held.length}  outside but named somewhere live — not deletable on the fold alone\n`)

for (const h of held.slice(0, 25)) {
  console.log(`  HELD  ${h.mod.replace('src/0/3/6/9/1/2/4/8/7/5/1/', '…/')}`)
  console.log(`        by ${h.live.slice(0, 2).join(', ')}`)
}
if (held.length > 25) console.log(`  … and ${held.length - 25} more held`)

// ------------------------------------------------------- closure, then trial
//
// SAFE is not deletable on its own. The classification ignores references from
// other OUTSIDE modules, on the reasoning that the island goes together — but
// that only holds if the WHOLE island goes. Deleting 174 of 273 while leaving
// 99 in place broke 17 modules that had imported the removed ones, because the
// 99 are still there importing them. Measured, on the real tree, and reverted.
//
// So the deletable set must be CLOSED: drop anything a held module still
// imports, transitively.
const importsOf = new Map()
for (const mod of outside) {
  const text = readFileSync(join(ROOT, mod), 'utf8')
  const deps = new Set()
  for (const other of outside) {
    if (other === mod) continue
    const stem = basename(other).replace(/\.ts$/, '')
    if (text.includes(`'./${stem}.ts'`) || text.includes(`"./${stem}.ts"`)) deps.add(other)
  }
  importsOf.set(mod, deps)
}

const rescued = new Set(held.map((h) => h.mod))
let grew = true
while (grew) {
  grew = false
  for (const mod of rescued) {
    for (const dep of importsOf.get(mod) ?? []) {
      if (!rescued.has(dep)) { rescued.add(dep); grew = true }
    }
  }
}
const deletable = safe.filter((m) => !rescued.has(m))

console.log(`\n  CLOSURE  ${safe.length} safe - ${safe.length - deletable.length} reachable from a held module = ${deletable.length} deletable`)

// THE TRIAL, run statically before anything is removed: after deleting exactly
// `deletable`, no surviving file may import a deleted one.
const deletedSet = new Set(deletable)
const survivors = [...lean, ...outside].filter((f) => !deletedSet.has(f))
const broken = []
for (const f of survivors) {
  const text = readFileSync(join(ROOT, f), 'utf8')
  for (const d of deletedSet) {
    const stem = basename(d).replace(/\.ts$/, '')
    if (text.includes(`'./${stem}.ts'`) || text.includes(`"./${stem}.ts"`)) {
      broken.push(`${f} -> ${stem}`)
      break
    }
  }
}
console.log(`  TRIAL    ${survivors.length} survivors checked, ${broken.length} would import something deleted`)
for (const b of broken.slice(0, 5)) console.log(`    BREAKS ${b}`)

if (broken.length > 0) {
  console.error('\naudit REFUSES to delete — the trial found surviving imports of removed modules')
  process.exit(1)
}

if (!DELETE) {
  console.log('\nTrial passes. Nothing deleted; re-run with --delete to apply.')
  process.exit(0)
}

for (const mod of deletable) rmSync(join(ROOT, mod))
console.log(`\ndeleted ${deletable.length}; held ${held.length}; rescued by closure ${safe.length - deletable.length}`)
