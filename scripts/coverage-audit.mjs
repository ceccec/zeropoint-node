#!/usr/bin/env node
/**
 * One coverage pass, two answers.
 *
 * These were two scripts running the same twelve test files twice, on top of
 * the gate running them a third time as test:*. Three passes over identical
 * work, and 14 of the gate's 40 seconds. V8's coverage output already lists
 * every script the isolate compiled, so "which modules loaded" comes free
 * alongside "which functions ran" — the separate loader hook was measuring
 * something coverage already knew.
 *
 * So one pass now answers both, at three rungs of increasing strength:
 *
 *   loaded     does anything import this module          weakest
 *   called     does anything call this exported function
 *   checked    does anything assert on the result        not measured here
 *
 * The third is the one that matters most and the one no tool gives you; it is
 * named to keep the other two honest about what they are worth.
 *
 * ONE OWNER FOR ONE MEASUREMENT. This pass costs ~11s, and it briefly ran twice
 * per gate: once as this step and once inside the ratchet, which called it to
 * measure its own surface. That took the gate from ~50s to 71s — I made it
 * slower while consolidating it. The ceiling lives here now instead, in
 * coverage-ceiling.json, so the pass runs once.
 *
 *   npm run coverage:audit      report, check declarations, enforce the ceiling
 *   npm run coverage:record     write the current count as the new ceiling
 */

import { readdirSync, statSync, readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs'
import { execFile } from 'node:child_process'
import { pipelineSrcSuites } from './lib/pipeline.mjs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** Modules no test loads, declared with a reason. */
const UNLOADED_OK = {
  'src/multidimensional-vortex-demo.ts': 'a demo, printed for humans; nothing asserts on it',
  'src/vbm-demo.ts': 'a demo, printed for humans; nothing asserts on it',
  'src/advanced-vbm.ts': 'genuinely untested — the honest entry in this list',
  'src/mcp/server.ts': 'IS exercised, by mcp:smoke, which spawns it as a child and kills it — a killed process never flushes coverage, so this is a limit of the measurement rather than a gap in the testing',
}

/** Everything that actually runs src/ code. Not the same as everything named "test". */
const EXERCISERS = [
  ['src/kernel/smoke.test.ts', null],
  ['src/kernel/core-exports.test.ts', null],
  ['src/security/quantum-fold-cipher.test.ts', null],
  ['src/security/quantum-state-tomography.test.ts', null],
  ['src/security/quantum-proofs.test.ts', null],
  ['src/security/post-quantum-crypto.test.ts', null],
  ['src/quantum/superposition-execution.test.ts', null],
  ['src/quantum/millennium-bridge.test.ts', null],
  ['src/quantum/zenodo-publisher.test.ts', null],
  ['src/quantum/untested-exports.test.ts', null],
  ['src/quantum/hex-vortex-trinities.test.ts', null],
  ['src/crypto/ml-kem.test.ts', null],
  ['src/0/3/6/9/1/2/4/8/7/5/1/a432.test.ts', null],
  ['src/0/3/6/9/1/2/4/8/7/5/1/a432.math.test.ts', null],
  ['src/verification/lean-bridge.test.ts', null],
  ['src/multidimensional-vortex-framework.test.ts', 'scripts/jest-lite.mjs'],
  ['scripts/quantum-sim.mjs', null],
  // Forgotten the first time, and it exercises the nine prove* functions that
  // then appeared as untested. Same error as counting only the test:* suites
  // and blaming quantum for 149 — the fix is to list what actually runs.
  ['scripts/quantum-proof.mjs', null],
  ['scripts/mcp-smoke.mjs', null],
  ['scripts/self-next.mjs', null],
  ['scripts/adjudicate-seals.mjs', null],
]

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    if (n === 'node_modules') continue
    const full = join(dir, n)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (n.endsWith('.ts') && !n.endsWith('.d.ts')) out.push(full)
  }
  return out
}

const covDir = join(tmpdir(), `zp-cov-${process.pid}`)
rmSync(covDir, { recursive: true, force: true })
mkdirSync(covDir, { recursive: true })

// EXERCISERS is a runtime list, not a mirror of the pipeline: it deliberately
// omits the heavy scripts check also runs (the ratchet, the docs build) and
// includes things check does not name directly. What it must never do is MISS
// a suite. It did exactly that once — test:security runs four suites and only
// three were listed — and the same omission had already happened in the
// ratchet's own copy of this list.
//
// So the list stays hand-held for what it runs, and the pipeline is read for
// what it must contain. Forgetting a new suite is now a failure with a name in
// it rather than a number that quietly drops.
{
  const listed = new Set(EXERCISERS.map(([file]) => file))
  const missing = pipelineSrcSuites(ROOT).filter((f) => !listed.has(f))
  if (missing.length) {
    console.error(`coverage:audit FAIL — ${missing.length} suite(s) run by npm run check but absent from EXERCISERS:`)
    for (const m of missing) console.error(`  ${m}`)
    console.error('  Add them, or coverage is measured without them and the untested count is wrong.')
    process.exit(1)
  }
}

// The single pass, genuinely concurrent. This wrapped execFileSync in a
// Promise first, which looks parallel and is not — execFileSync blocks, so
// sixteen processes ran one after another while the comment claimed otherwise.
// They are independent and coverage is written per-process, so nothing races.
await Promise.all(EXERCISERS.map(([file, harness]) => new Promise((done) => {
  const args = ['--experimental-strip-types', ...(harness ? [harness, file] : [file])]
  execFile('node', args, {
    cwd: ROOT, env: { ...process.env, NODE_V8_COVERAGE: covDir },
    timeout: 180000, maxBuffer: 64 * 1024 * 1024,
  }, () => done()) // a failing exerciser still records what it ran
})))

const loaded = new Set()
const called = new Set()
let unreadable = 0
for (const f of readdirSync(covDir)) {
  let j
  // A silent `continue` here drops one process's ENTIRE coverage, which shows
  // up as modules that look unloaded. Count them and refuse to report a number
  // computed from partial data.
  try { j = JSON.parse(readFileSync(join(covDir, f), 'utf8')) } catch { unreadable++; continue }
  for (const s of j.result) {
    if (!s.url.includes('/src/') || !s.url.endsWith('.ts')) continue
    // V8 reports SOME scripts as a file:// URL and others as a bare absolute
    // path. Stripping only the URL form left seven modules unmatched, and they
    // showed up as "loaded by nothing" — a measurement bug that invented
    // findings. Normalise both forms.
    const rel = relative(ROOT, s.url.startsWith('file://') ? fileURLToPath(s.url) : s.url).replace(/\\/g, '/')
    loaded.add(rel)
    if (rel.includes('.test.ts')) continue
    for (const fn of s.functions) {
      if (fn.functionName && fn.ranges[0].count > 0) called.add(`${rel}::${fn.functionName}`)
    }
  }
}
const covFiles = readdirSync(covDir).length
rmSync(covDir, { recursive: true, force: true })
if (unreadable > 0) {
  console.error(`coverage:audit FAIL — ${unreadable} of ${covFiles} coverage files unreadable; the numbers would be wrong`)
  process.exit(1)
}

const allModules = walk(join(ROOT, 'src')).map((f) => relative(ROOT, f).replace(/\\/g, '/')).sort()
const exported = new Set()
for (const file of allModules) {
  if (file.endsWith('.test.ts')) continue
  const src = readFileSync(join(ROOT, file), 'utf8')
  for (const m of src.matchAll(/^export\s+(?:async\s+)?function\s+([A-Za-z0-9_$]+)/gm)) exported.add(`${file}::${m[1]}`)
  for (const m of src.matchAll(/^export\s+const\s+([A-Za-z0-9_$]+)\s*[:=]\s*(?:async\s*)?\(/gm)) exported.add(`${file}::${m[1]}`)
}

const neverLoaded = allModules.filter((m) => !loaded.has(m))
const neverCalled = [...exported].filter((k) => !called.has(k)).sort()

// The ceiling: exported functions nothing calls may go down, never up. Adding
// an export that nothing exercises fails here.
const CEILING_FILE = join(ROOT, 'coverage-ceiling.json')
if (process.argv.includes('--record')) {
  writeFileSync(CEILING_FILE, JSON.stringify({ untestedExports: neverCalled.length }, null, 2) + '\n')
  console.log(`coverage:record — ceiling set to ${neverCalled.length} untested exports`)
  process.exit(0)
}
let ceiling = null
try { ceiling = JSON.parse(readFileSync(CEILING_FILE, 'utf8')).untestedExports } catch { /* first run */ }

const problems = []
for (const m of neverLoaded) if (!(m in UNLOADED_OK)) problems.push(`${m} is loaded by nothing and is not declared`)
for (const m of Object.keys(UNLOADED_OK)) if (!neverLoaded.includes(m)) problems.push(`${m} is declared unloaded but something loads it now — drop the entry`)

const byDir = {}
for (const k of neverCalled) {
  const d = k.split('::')[0].split('/').slice(0, -1).join('/') || 'src'
  byDir[d] = (byDir[d] ?? 0) + 1
}
console.log(`coverage:audit — ${allModules.length} modules, ${neverLoaded.length} loaded by nothing (${Object.keys(UNLOADED_OK).length} declared)`)
console.log(`                 ${exported.size} exported functions, ${neverCalled.length} never called (${Math.round((100 * neverCalled.length) / exported.size)}%)`)
for (const [d, n] of Object.entries(byDir).sort((a, b) => b[1] - a[1]).slice(0, 6)) console.log(`  ${String(n).padStart(4)}  ${d}`)
if (ceiling !== null) {
  if (neverCalled.length > ceiling) {
    problems.push(`${neverCalled.length} exported functions are never called, above the ceiling of ${ceiling} — an export was added that nothing exercises`)
  } else if (neverCalled.length < ceiling) {
    problems.push(`${neverCalled.length} untested exports, below the recorded ${ceiling} — an improvement; run npm run coverage:record`)
  }
}
// Printed before the verdict: --list on a FAILING run is exactly when the list
// is wanted, and placing it after the exit meant it never appeared then.
if (process.argv.includes('--list')) for (const k of neverCalled) console.log(k)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`coverage:audit FAIL — ${problems.length} problem(s)`)
  process.exit(1)
}
console.log('coverage:audit ok — every unloaded module is declared, and every declaration still holds')
process.exit(0)
