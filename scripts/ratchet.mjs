#!/usr/bin/env node
/**
 * Ratchet — large surfaces shrink over many waves, and never grow.
 *
 * Three surfaces are too large to gate outright (197 type errors, ~1039 lint
 * errors, 657 decimal-crack lines). A gate that always fails gates nothing, so
 * each carries a CEILING instead: the gate fails only when a count RISES.
 * When a count falls, the ceiling follows it down and cannot go back up.
 *
 * That makes each cleanup wave safe to land on its own — progress is locked in
 * as it happens, without one heroic commit.
 *
 *   npm run ratchet         recompute and lower ceilings (never raises)
 *   npm run ratchet:check   fail if any surface grew
 *
 * Counting rules live in one place so the gate and the report cannot disagree.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const STATE = join(ROOT, 'ratchet.json')
const SKIP = new Set(['node_modules', 'dist', 'coverage', '.git'])

function run(cmd, args) {
  try {
    // 64MB: `eslint -f json` over src/ emits ~2.6MB today and the default 1MB
    // buffer fails with ENOBUFS — which looks exactly like "no findings"
    // unless the code is inspected.
    return execFileSync(cmd, args, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      maxBuffer: 64 * 1024 * 1024,
    })
  } catch (err) {
    // Both tsc and eslint exit non-zero when they report findings; the output
    // is the measurement, so a non-zero exit is expected, not a failure.
    // Return stdout ALONE — both tools report there, and appending stderr
    // corrupts `eslint -f json` with npm's warnings so the parse silently
    // fails and the surface reports UNMEASURABLE instead of its real count.
    const out = err.stdout ?? ''
    return out.length > 0 ? out : (err.stderr ?? '')
  }
}

/** TypeScript errors under the typecheck-only config. */
function typecheckCount() {
  const out = run('npx', ['tsc', '--noEmit', '-p', 'tsconfig.typecheck.json'])
  return (out.match(/error TS\d+/g) ?? []).length
}

/** ESLint errors (warnings excluded — they are not the ratcheted surface). */
function lintCount() {
  const out = run('npx', ['eslint', 'src/', '-f', 'json'])
  const start = out.indexOf('[')
  if (start < 0) return null
  try {
    return JSON.parse(out.slice(start)).reduce((n, f) => n + f.errorCount, 0)
  } catch {
    return null
  }
}

function walk(dir, pred, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, pred, out)
    else if (pred(name)) out.push(p)
  }
  return out
}

/**
 * Bare float literals in executable code — same rules as findDecimalCrack:
 * strip block comments, then strings, then trailing comments; skip
 * import/export-from lines; never match inside an a.b.c digit chain.
 */
function decimalCount() {
  const DEC = /(?<![\w.])\d+\.\d+(?![\w.])/g
  let lines = 0
  for (const file of walk(join(ROOT, 'src'), (n) => n.endsWith('.ts') && !n.endsWith('.d.ts'))) {
    const raw = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
    for (const line of raw.split('\n')) {
      let code = line.replace(/'[^']*'|"[^"]*"|`[^`]*`/g, '')
      const c = code.indexOf('//')
      if (c >= 0) code = code.slice(0, c)
      if (/^\s*(?:import|export)\s.*\sfrom\s/.test(code)) continue
      DEC.lastIndex = 0
      if (DEC.test(code)) lines += 1
    }
  }
  return lines
}

const SURFACES = [
  { id: 'typecheck', label: 'TypeScript errors', measure: typecheckCount },
  { id: 'lint', label: 'ESLint errors', measure: lintCount },
  { id: 'decimals', label: 'decimal-crack lines', measure: decimalCount },
]

const prior = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : { ceilings: {} }
const ceilings = { ...(prior.ceilings ?? {}) }
const isCheck = process.argv.includes('--check')

let grew = false
let fell = false
const rows = []

for (const s of SURFACES) {
  const live = s.measure()
  // An unmeasurable surface must never pass quietly — a broken measurement
  // reads identically to a clean one, which is the failure this repo keeps
  // finding. Fail loudly instead.
  if (live === null) {
    console.error(`ratchet: ${s.label} could not be measured — fix the measurement, do not ignore it`)
    process.exit(1)
  }
  const ceiling = ceilings[s.id]
  if (ceiling === undefined) {
    ceilings[s.id] = live
    rows.push(`  ${s.label}: ${live} (ceiling set)`)
    continue
  }
  if (live > ceiling) {
    grew = true
    rows.push(`  ${s.label}: ${live} > ceiling ${ceiling}  ✗ GREW by ${live - ceiling}`)
  } else if (live < ceiling) {
    fell = true
    if (!isCheck) ceilings[s.id] = live
    rows.push(`  ${s.label}: ${live} < ceiling ${ceiling}  ↓ ${ceiling - live}`)
  } else {
    rows.push(`  ${s.label}: ${live} (at ceiling)`)
  }
}

console.log(isCheck ? 'ratchet:check' : 'ratchet')
for (const r of rows) console.log(r)

if (isCheck) {
  if (grew) {
    console.error('ratchet: a surface grew — fix the regression, or run npm run ratchet if it is intended')
    process.exit(1)
  }
  if (fell) {
    console.error('ratchet: a surface shrank — run npm run ratchet to lower the ceiling')
    process.exit(1)
  }
  console.log('ratchet:check ok')
  process.exit(0)
}

writeFileSync(STATE, `${JSON.stringify({ ceilings }, null, 2)}\n`)
console.log('wrote ratchet.json')
