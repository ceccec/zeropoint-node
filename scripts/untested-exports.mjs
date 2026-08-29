#!/usr/bin/env node
/**
 * Exported functions that nothing in the pipeline ever calls.
 *
 * exercised-check answers "does anything LOAD this module", which is the
 * weakest useful question and the one nothing was asking. This asks the next
 * one: does anything CALL this exported function? Measured with V8's own
 * coverage rather than inferred, so it reports what ran.
 *
 * WHY EXPORTED, AND WHY THIS PACKAGE. zeropoint-node is published to npm. An
 * exported function nobody here calls is not dead code — a consumer may well
 * call it — which makes it worse than dead code, not better: it ships, it is
 * part of the contract, and nothing has ever checked that it works.
 *
 * MEASURE THE RIGHT EXERCISERS. Running only the test:* suites gives 474, and
 * blames src/quantum for 149 of them. That is wrong: quantum:sim is a gate step
 * that exercises 118 of those, it is simply not named "test". Under everything
 * that actually runs, the number is 372 and quantum's share is 31. The lesson
 * is the same one this repository keeps teaching — measure what runs, not what
 * is labelled.
 *
 * This cannot run inside `npm run check` (it would recurse), so it drives the
 * exercisers directly. It is a ratcheted surface rather than a pass/fail gate:
 * 372 is a debt to pay down, and the rule it enforces is that adding an
 * exported function nothing calls makes the number go up.
 *
 *   npm run untested            report
 *   npm run untested -- --count print the count alone
 */

import { readdirSync, statSync, readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const COUNT_ONLY = process.argv.includes('--count')

/** Everything in the pipeline that actually runs src/ code. */
const EXERCISERS = [
  ['src/kernel/smoke.test.ts', null],
  ['src/security/quantum-fold-cipher.test.ts', null],
  ['src/security/quantum-state-tomography.test.ts', null],
  ['src/security/quantum-proofs.test.ts', null],
  ['src/security/post-quantum-crypto.test.ts', null],
  ['src/quantum/superposition-execution.test.ts', null],
  ['src/quantum/millennium-bridge.test.ts', null],
  ['src/quantum/zenodo-publisher.test.ts', null],
  ['src/crypto/ml-kem.test.ts', null],
  ['src/0/3/6/9/1/2/4/8/7/5/1/a432.test.ts', null],
  ['src/verification/lean-bridge.test.ts', null],
  ['src/multidimensional-vortex-framework.test.ts', 'scripts/jest-lite.mjs'],
  // Not named "test", and between them they cover 118 quantum exports.
  ['scripts/quantum-sim.mjs', null],
  ['scripts/mcp-smoke.mjs', null],
  ['scripts/self-next.mjs', null],
  ['scripts/adjudicate-seals.mjs', null],
]

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    if (n === 'node_modules') continue
    const full = join(dir, n)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (n.endsWith('.ts') && !n.endsWith('.d.ts') && !n.endsWith('.test.ts')) out.push(full)
  }
  return out
}

const covDir = join(tmpdir(), `zp-cov-${process.pid}`)
rmSync(covDir, { recursive: true, force: true })
mkdirSync(covDir, { recursive: true })

for (const [file, harness] of EXERCISERS) {
  const args = ['--experimental-strip-types', ...(harness ? [harness, file] : [file])]
  try {
    execFileSync('node', args, {
      cwd: ROOT,
      env: { ...process.env, NODE_V8_COVERAGE: covDir },
      stdio: 'ignore',
      timeout: 180000,
    })
  } catch { /* a failing exerciser still records what it called */ }
}

const entered = new Set()
const seen = new Set()
for (const f of readdirSync(covDir)) {
  let j
  try { j = JSON.parse(readFileSync(join(covDir, f), 'utf8')) } catch { continue }
  for (const s of j.result) {
    if (!s.url.includes('/src/') || !s.url.endsWith('.ts')) continue
    const rel = s.url.replace(`file://${ROOT}/`, '')
    if (rel.includes('.test.ts')) continue
    for (const fn of s.functions) {
      if (!fn.functionName) continue
      const key = `${rel}::${fn.functionName}`
      seen.add(key)
      if (fn.ranges[0].count > 0) entered.add(key)
    }
  }
}
rmSync(covDir, { recursive: true, force: true })

// Exported top-level functions, statically.
const exported = new Set()
for (const file of walk(join(ROOT, 'src'))) {
  const rel = relative(ROOT, file).replace(/\\/g, '/')
  const src = readFileSync(file, 'utf8')
  for (const m of src.matchAll(/^export\s+(?:async\s+)?function\s+([A-Za-z0-9_$]+)/gm)) exported.add(`${rel}::${m[1]}`)
  for (const m of src.matchAll(/^export\s+const\s+([A-Za-z0-9_$]+)\s*[:=]\s*(?:async\s*)?\(/gm)) exported.add(`${rel}::${m[1]}`)
}

const untested = [...exported].filter((k) => !entered.has(k)).sort()

if (COUNT_ONLY) {
  console.log(String(untested.length))
  process.exit(0)
}

const byDir = {}
for (const k of untested) {
  const d = k.split('::')[0].split('/').slice(0, -1).join('/') || 'src'
  byDir[d] = (byDir[d] ?? 0) + 1
}
const pct = Math.round((100 * untested.length) / exported.size)
console.log(`untested — ${exported.size} exported functions, ${untested.length} never called by anything in the pipeline (${pct}%)`)
for (const [d, n] of Object.entries(byDir).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${d}`)
}
const out = join(ROOT, 'untested-exports.txt')
writeFileSync(out, untested.join('\n') + '\n')
console.log(`\n  full list: ${relative(ROOT, out)}`)
process.exit(0)
