#!/usr/bin/env node
/**
 * Every retyped kernel constant must be declared, or bound to the kernel.
 *
 * generateVortex returned the counting sequence in three separate places, and
 * a collision sweep then found the doubling orbit retyped as a literal across
 * kernel/, security/, the vbm modules and a432 — dozens of independent copies
 * of a value the kernel already exports. Each copy is somewhere the constant
 * can drift with nothing noticing, and drift is not hypothetical here: it is
 * what this session spent the day fixing.
 *
 * a432_constants_do_not_drift_from_the_kernel seals four specific functions.
 * That catches those four and nothing else. This asks the question of the whole
 * tree instead, so the NEXT copy cannot arrive unremarked.
 *
 * KEYED BY FILE AND COUNT, not by line. Line numbers were the first design and
 * they were wrong: adding a line anywhere shifted every declaration below it, so
 * an unrelated edit invalidated the file and forced a re-seed. The noise would
 * have trained everyone to re-seed on reflex, which is exactly how an allowlist
 * stops being read. A declaration now records how many copies a file holds of a
 * given constant, which survives line shifts and still fails the moment a new
 * copy appears.
 *
 * Not every literal is a defect, which is why the answer is a declaration
 * rather than a ban. A default parameter, a membership test, a fixture in a
 * comparison — these are legitimate. What is not legitimate is a fresh copy
 * nobody knows about. Declared occurrences are recorded in constants.json with
 * a reason, seeded from the current state the way the ratchet records ceilings.
 * A declaration for a line that no longer holds the constant fails too, so the
 * list cannot rot.
 *
 * THE PATTERNS ARE DERIVED. The kernel is imported and the literals to look for
 * are built from VORTEX_ORBIT and VORTEX_AXIS at run time. Retyping them here
 * would make this checker the very thing it is checking for.
 *
 *   npm run constants:check   fail on an undeclared copy
 *   npm run constants:seed    rewrite the declarations from the current state
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DECL = join(ROOT, 'scripts', 'constants.json')
const SEED = process.argv.includes('--seed')

// Derived, never retyped. If the kernel changes, so does what we hunt for.
const kernel = await import(pathToFileURL(join(ROOT, 'src/0/index.ts')).href)
const CONSTANTS = [
  { name: 'VORTEX_ORBIT', values: [...kernel.VORTEX_ORBIT] },
  { name: 'VORTEX_AXIS', values: [...kernel.VORTEX_AXIS] },
  { name: 'VORTEX_SEQUENCE', values: [...kernel.VORTEX_SEQUENCE] },
]
/** `[1, 2, 4, 8, 7, 5]` with any spacing, built from the kernel's own digits. */
const patternFor = (values) =>
  new RegExp('\\[\\s*' + values.join('\\s*,\\s*') + '\\s*\\]')

const HOME = 'src/0/index.ts' // where these constants are DEFINED

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    if (n === 'node_modules') continue
    const full = join(dir, n)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (n.endsWith('.ts') && !n.endsWith('.d.ts') && !n.endsWith('.test.ts')) out.push(full)
  }
  return out
}

const found = []
for (const file of walk(join(ROOT, 'src')).sort()) {
  const rel = relative(ROOT, file).replace(/\\/g, '/')
  if (rel === HOME) continue // the definition itself is not a copy
  const lines = readFileSync(file, 'utf8').split('\n')
  lines.forEach((line, i) => {
    // A line that is only a comment is documentation, not a second source.
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return
    for (const c of CONSTANTS) {
      if (patternFor(c.values).test(line)) {
        found.push({ file: rel, line: i + 1, constant: c.name, text: line.trim().slice(0, 100) })
        break // longest-match-first would double-count VORTEX_SEQUENCE
      }
    }
  })
}

// Collapse to one entry per (file, constant) carrying the count.
const tally = new Map()
for (const f of found) {
  const key = `${f.file}::${f.constant}`
  if (!tally.has(key)) tally.set(key, { key, file: f.file, constant: f.constant, count: 0, first: f.text })
  tally.get(key).count++
}

const decl = existsSync(DECL) ? JSON.parse(readFileSync(DECL, 'utf8')) : {}

if (SEED) {
  const seeded = {}
  for (const t of [...tally.values()].sort((a, b) => a.key.localeCompare(b.key))) {
    seeded[t.key] = { count: t.count, why: decl[t.key]?.why ?? `retypes ${t.constant}, e.g. ${t.first}` }
  }
  writeFileSync(DECL, JSON.stringify(seeded, null, 2) + '\n')
  console.log(`constants:seed wrote ${Object.keys(seeded).length} declarations to ${relative(ROOT, DECL)}`)
  process.exit(0)
}

const problems = []
for (const t of tally.values()) {
  const d = decl[t.key]
  if (!d) {
    problems.push(`${t.file} retypes ${t.constant} ${t.count}x and is not declared — bind it to the kernel, or declare why`)
  } else if (d.count !== t.count) {
    // A count that GREW is a new copy. One that shrank is progress, and still
    // has to be recorded, so the file always states the truth.
    problems.push(
      `${t.file} now retypes ${t.constant} ${t.count}x, declared ${d.count}x — ` +
        (t.count > d.count ? 'a new copy appeared' : 'copies were removed; re-seed to record it'),
    )
  }
}
for (const k of Object.keys(decl)) {
  if (!tally.has(k)) problems.push(`constants.json lists ${k}, which no longer holds a kernel constant — drop the entry`)
}

const byConstant = {}
for (const f of found) byConstant[f.constant] = (byConstant[f.constant] ?? 0) + 1
console.log(
  `constants:check — ${found.length} retyped occurrence(s) in ${tally.size} file/constant pair(s) ` +
    `(${Object.entries(byConstant).map(([k, v]) => `${k}:${v}`).join(', ')})`,
)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`constants:check FAIL — ${problems.length} problem(s)`)
  process.exit(1)
}
console.log('constants:check ok — every retyped constant is declared, and every declaration still holds')
