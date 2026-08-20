#!/usr/bin/env node
/**
 * Every declared entry must resolve, and must land inside LEAN.
 *
 * LEAN is the fixed point of the fold, and the fold takes the ENTRY SET as an
 * input. That input was wrong twice in one day:
 *
 *   - rollup.config.js builds inputs from template literals, so a regex over
 *     its text matched none of them and every bundle entry was counted dead.
 *     MEASURED: this one alone accounts for the whole difference, LEAN 131 -> 139
 *   - public/ pages reference src/ modules by full path, and the scanners
 *     walked only src/ for HTML. Also wrong, but it moved LEAN by ZERO: every
 *     module those pages name is already reachable through another entry
 *
 * Both failures are SILENT in the same direction: an entry that stops being
 * recognised does not error, it just shrinks LEAN and grows the set that looks
 * safe to delete. Eight modules were one command away from being removed while
 * a published bundle still used them.
 *
 * The public/ case is worth keeping precisely BECAUSE it currently costs
 * nothing. A scanner that is wrong without consequence today is a scanner that
 * will be wrong with consequence the first time a page loads something nothing
 * else does.
 *
 * So this asserts the invariant the fold cannot check about itself:
 *
 *   1. every entry the package DECLARES resolves to a file that exists
 *   2. every one of them is inside LEAN
 *   3. the anchors are present — if src/0/index.ts or the kernel ever drops
 *      out of the entry set, something has broken upstream of every count
 *
 * A missing entry now fails the gate instead of quietly making the tree look
 * deader than it is.
 *
 *   npm run entries:check
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import rollupConfig from '../rollup.config.js'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))

const problems = []
const declared = new Map() // path -> where it was declared

function declare(p, where) {
  if (!declared.has(p)) declared.set(p, where)
}

// 1. package.json exports
for (const [subpath, cond] of Object.entries(pkg.exports ?? {})) {
  for (const target of Object.values(cond ?? {})) {
    if (typeof target !== 'string' || !target.endsWith('.ts')) continue
    const p = target.replace(/^\.\//, '')
    // dist/*.d.ts are BUILD OUTPUTS, not source entries. LEAN is a statement
    // about src/, so a declaration file emitted by rollup is not something the
    // fold should be seeing — only the src module it was generated from.
    if (!p.startsWith('src/')) continue
    declare(p, `package.json exports "${subpath}"`)
  }
}

// 2. rollup inputs, from the config object
const configs = Array.isArray(rollupConfig) ? rollupConfig : [rollupConfig]
for (const c of configs) {
  const i = c?.input
  const inputs = typeof i === 'string' ? [i] : i && typeof i === 'object' ? Object.values(i) : []
  for (const input of inputs) {
    if (typeof input === 'string' && input.endsWith('.ts')) declare(input, 'rollup.config.js input')
  }
}

// 3. HTML-discovered entries, scanned INDEPENDENTLY of the fold.
//
// These are discovered rather than declared, so validating only the declared
// set left the public/ bug invisible: dropping that directory from the fold
// broke nothing this check was looking at. Scanning here means the two
// computations must agree, and a fold that stops looking somewhere fails.
function htmlFiles(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) htmlFiles(full, out)
    else if (name.endsWith('.html')) out.push(full)
  }
  return out
}
for (const dir of ['src', 'public']) {
  for (const html of htmlFiles(join(ROOT, dir))) {
    const txt = readFileSync(html, 'utf8')
    const here = dirname(html)
    for (const m of txt.matchAll(/['"](\.\/[A-Za-z0-9._-]+\.ts)['"]/g)) {
      const t = resolve(here, m[1])
      if (existsSync(t)) declare(relative(ROOT, t), `${relative(ROOT, html)}`)
    }
    for (const m of txt.matchAll(/['"]((?:\.\.\/)*src\/[A-Za-z0-9._/-]+\.ts)['"]/g)) {
      const t = resolve(here, m[1])
      if (existsSync(t)) declare(relative(ROOT, t), `${relative(ROOT, html)}`)
    }
  }
}

// 4. anchors — the modules every count depends on
for (const anchor of ['src/0/index.ts', 'src/kernel/index.ts', 'src/mcp/server.ts']) {
  declare(anchor, 'anchor')
}

// --- 1: everything declared must exist -------------------------------------
for (const [p, where] of declared) {
  if (!existsSync(join(ROOT, p))) problems.push(`${p} is declared by ${where} but does not exist`)
}

// --- 2: everything declared must be inside LEAN ------------------------------
const listing = execFileSync(
  'node',
  ['--experimental-strip-types', join(ROOT, 'scripts/fold-lean.mjs'), '--query', 'src/'],
  { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
)
const lean = new Set()
let outsideCount = 0
for (const line of listing.split('\n')) {
  const m = line.match(/^\s+(LEAN|OUTSIDE)\s+(.+)$/)
  if (!m) continue
  if (m[1] === 'LEAN') lean.add(m[2].trim())
  else outsideCount++
}
if (lean.size === 0) problems.push('the fold reported an empty LEAN set — the entry set collapsed')

for (const [p, where] of declared) {
  if (!existsSync(join(ROOT, p))) continue
  if (!lean.has(p)) problems.push(`${p} (${where}) resolved but is NOT in LEAN — the fold is not seeing it as an entry`)
}

// --- 3: rollup must contribute at least one entry ---------------------------
// The bug that started this was rollup contributing exactly zero.
const rollupDeclared = [...declared].filter(([, w]) => w === 'rollup.config.js input')
if (rollupDeclared.length === 0) problems.push('rollup.config.js contributed no entries — that is the template-literal bug')

console.log(`entries:check — ${declared.size} declared (${rollupDeclared.length} rollup), LEAN ${lean.size}, OUTSIDE ${outsideCount}`)
for (const p of problems) console.error(`  PROBLEM ${p}`)

if (problems.length > 0) {
  console.error(`entries:check FAIL — ${problems.length} problem(s) with the entry set`)
  process.exit(1)
}
console.log('entries:check ok — every declared entry resolves and lands inside LEAN')
