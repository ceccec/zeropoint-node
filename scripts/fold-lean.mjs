#!/usr/bin/env node
/**
 * Fold the module graph to its fixed point, and call THAT lean.
 *
 * "Purge the dead code" is a judgement until someone says what dead means. This
 * computes it instead. One fold removes what is not reachable from an entry and
 * not used by anything reachable; folding again can remove more, because the
 * first fold may have orphaned a module that only the removed ones imported.
 * Repeat until nothing changes. The fixed point is the definition:
 *
 *   LEAN = the largest set closed under the fold — every module in it is
 *          reachable from an entry, and every module outside it is not.
 *
 * The fold is capped at VORTEX_SEQUENCE.length folds, which is what the
 * sequence allows. Converging inside that cap is itself a checkable fact; not
 * converging would mean the definition is not well-founded here, and the script
 * says so rather than reporting a number.
 *
 * NOTHING IS DELETED. This computes and reports. Whether to act on it is a
 * separate decision, and one that should be made against a definition rather
 * than against a hunch about which filenames look unused.
 *
 *   npm run fold           report the fold, iteration by iteration
 *   npm run fold -- --json machine-readable fixed point
 */

import { ts, walk as scanWalk, sourceFiles } from './lib/scan.mjs'
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname, resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { VORTEX_SEQUENCE } from '../src/0/index.ts'
import { foldToLean } from '../src/kernel/import-graph.ts'
import rollupConfig from '../rollup.config.js'

/** Resolved rollup inputs — read from the config object, never from its text. */
const ROLLUP_INPUTS = (() => {
  const arr = Array.isArray(rollupConfig) ? rollupConfig : [rollupConfig]
  const out = new Set()
  for (const c of arr) {
    const i = c?.input
    if (typeof i === 'string') out.add(i)
    else if (i && typeof i === 'object') for (const v of Object.values(i)) out.add(v)
  }
  return [...out].filter((x) => typeof x === 'string' && x.endsWith('.ts'))
})()

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const JSON_OUT = process.argv.includes('--json')
const walk = (d, p) => scanWalk(d, p, { out: [] })
const isTs = (n) => n.endsWith('.ts') && !n.endsWith('.d.ts')
const rel = (f) => relative(ROOT, f)

// ---------------------------------------------------------------- the graph
function edgesOf(file) {
  const src = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)
  const out = []
  const add = (spec) => {
    if (!spec?.startsWith('.')) return
    let t = join(dirname(file), spec)
    if (!existsSync(t)) t = t.replace(/\.js$/, '.ts')
    if (existsSync(t) && t.endsWith('.ts')) out.push(t)
  }
  const visit = (n) => {
    if (ts.isImportDeclaration(n) && ts.isStringLiteral(n.moduleSpecifier)) add(n.moduleSpecifier.text)
    if (ts.isExportDeclaration(n) && n.moduleSpecifier && ts.isStringLiteral(n.moduleSpecifier)) {
      add(n.moduleSpecifier.text)
    }
    if (
      ts.isCallExpression(n) &&
      n.expression.kind === ts.SyntaxKind.ImportKeyword &&
      n.arguments[0] &&
      ts.isStringLiteral(n.arguments[0])
    ) add(n.arguments[0].text)
    ts.forEachChild(n, visit)
  }
  visit(src)
  return out
}

const all = walk(join(ROOT, 'src'), isTs)
const graph = new Map(all.map((f) => [f, edgesOf(f)]))

// ---------------------------------------------------------------- the entries
// Same definition the ratchet uses: an entry is something that RUNS.
function entryPoints() {
  const roots = new Set()
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
  // Rollup inputs come from the CONFIG, not from a regex over its text. The
  // config builds them with template literals — `${A432}/a432.system.ts` — so
  // a /['"](src\/...)['"]/  pattern matches nothing and silently counts every
  // bundle entry as unreachable. Importing it gives the resolved strings.
  for (const input of ROLLUP_INPUTS) {
    const p = join(ROOT, input)
    if (existsSync(p)) roots.add(p)
  }
  for (const cond of Object.values(pkg.exports ?? {})) {
    for (const t of Object.values(cond ?? {})) {
      if (typeof t === 'string' && t.endsWith('.ts')) {
        const p = join(ROOT, t.slice(2))
        if (existsSync(p)) roots.add(p)
      }
    }
  }
  // Test files count only where a check-pipeline script executes them.
  const executed = String(pkg.scripts?.check ?? '')
  for (const name of Object.keys(pkg.scripts ?? {})) {
    if (!executed.includes(`npm run ${name}`) && name !== 'check') continue
    for (const m of String(pkg.scripts[name]).matchAll(/(src\/[^\s'"]+\.ts)/g)) {
      const p = join(ROOT, m[1])
      if (existsSync(p)) roots.add(p)
    }
  }
  for (const e of ['src/kernel/index.ts', 'src/0/index.ts', 'src/mcp/server.ts']) {
    const p = join(ROOT, e)
    if (existsSync(p)) roots.add(p)
  }
  // Browser pages load modules directly; those are entries too. BOTH trees:
  // public/ pages reference src/ modules by full path, and looking only inside
  // src/ missed 17 of them.
  for (const dir of ['src', 'public']) {
    const base = join(ROOT, dir)
    if (!existsSync(base)) continue
    for (const html of walk(base, (n) => n.endsWith('.html'))) {
      const txt = readFileSync(html, 'utf8')
      for (const m of txt.matchAll(/['"](\.\/[A-Za-z0-9._-]+\.ts)['"]/g)) {
        const t = resolve(dirname(html), m[1])
        if (existsSync(t)) roots.add(t)
      }
      for (const m of txt.matchAll(/['"]((?:\.\.\/)*src\/[A-Za-z0-9._/-]+\.ts)['"]/g)) {
        const t = resolve(dirname(html), m[1])
        if (existsSync(t)) roots.add(t)
      }
    }
  }
  return roots
}

const ENTRIES = entryPoints()

/**
 * One fold, delegated to the kernel.
 *
 * The fold is `foldToLean` in src/kernel/import-graph.ts, not a copy here — the
 * seal that verifies the definition calls the same function, so the script and
 * the verification cannot drift into disagreeing about what lean means.
 */
function fold(surviving) {
  const restricted = new Map()
  for (const [k, v] of graph) if (surviving.has(k)) restricted.set(k, v.filter((d) => surviving.has(d)))
  return foldToLean(restricted, [...ENTRIES].filter((e) => surviving.has(e)))
}

// ------------------------------------------------------------- fold to a fixed point
const CAP = VORTEX_SEQUENCE.length
let current = new Set(all)
const history = []
let converged = false

for (let i = 1; i <= CAP; i++) {
  const next = fold(current)
  history.push({ fold: i, kept: next.size, removed: current.size - next.size })
  if (next.size === current.size) { converged = true; current = next; break }
  current = next
}

const lean = current
const folded = all.filter((f) => !lean.has(f))

// --query <substring>: is a given module inside the fixed point or outside?
const qi = process.argv.indexOf('--query')
if (qi >= 0 && process.argv[qi + 1]) {
  const needle = process.argv[qi + 1]
  const matches = all.filter((f) => rel(f).includes(needle))
  if (matches.length === 0) console.log(`no module matches ${needle}`)
  for (const f of matches) {
    console.log(`  ${lean.has(f) ? 'LEAN   ' : 'OUTSIDE'} ${rel(f)}`)
  }
  process.exit(0)
}

if (JSON_OUT) {
  console.log(JSON.stringify({
    converged, capped: CAP, folds: history.length,
    total: all.length, lean: lean.size, foldedAway: folded.length,
    history, entries: ENTRIES.size,
  }, null, 1))
  process.exit(converged ? 0 : 1)
}

console.log(`fold — ${all.length} modules, ${ENTRIES.size} entries, cap ${CAP} folds (VORTEX_SEQUENCE.length)`)
for (const h of history) {
  console.log(`  fold ${h.fold}: kept ${String(h.kept).padStart(4)}, folded away ${h.removed}`)
}
if (!converged) {
  console.error(`fold DID NOT CONVERGE within ${CAP} folds — lean is not well defined here`)
  process.exit(1)
}
console.log(`\nconverged after ${history.length} fold(s) — this is a FIXED POINT, folding again changes nothing`)
console.log(`LEAN  = ${lean.size} modules reachable from an entry`)
console.log(`OUTSIDE = ${folded.length} modules reachable from none`)
console.log('\nNothing was deleted. This is the definition; acting on it is a separate decision.')
