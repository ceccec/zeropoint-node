#!/usr/bin/env node
/**
 * Which modules does anything actually LOAD?
 *
 * The ratchet reports "modules reachable from no entry", and I read that number
 * as dead weight for a whole session — it is in two published changelogs as a
 * limitation. It is not dead weight. It is STATIC reachability, and it cannot
 * see a dynamic import: the a432 property suite reaches its 198 modules by
 * walking the directory and calling import() on each, so 120 of the 126
 * "unreachable" modules execute on every single gate run.
 *
 * Measured rather than argued: with a loader hook recording every resolved
 * path, a full `npm run check` loads all 267 modules in src/. Zero are dead.
 *
 * So this measures the thing the other number was being mistaken for — modules
 * NO TEST loads — and the two answers are different and both worth having:
 *
 *   reachable from no entry   what does not ship through a declared entry
 *   loaded by no test         what nothing exercises
 *
 * The second is the one that means "nobody would notice if this broke". Five
 * modules are in it today, declared below with reasons.
 *
 * Note what this does NOT measure. A module being imported is not the same as
 * its functions being called, and calling a function is not the same as
 * checking what it returns. This is the weakest of the three, and it is here
 * because it was the one nothing was doing at all.
 *
 *   npm run exercised:check
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, unlinkSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** Untested on purpose. Anything NOT here must be loaded by some test. */
const DECLARED = {
  'src/multidimensional-vortex-demo.ts': 'a demo, printed for humans; nothing asserts on it',
  'src/vbm-demo.ts': 'a demo, printed for humans; nothing asserts on it',
  'src/mcp/server.ts': 'exercised by npm run mcp:smoke, which is a gate step rather than a test',
  'src/0/3/6/9/1/2/4/8/7/5/1/index.ts': 'a barrel that only re-exports; its targets are all covered',
  'src/advanced-vbm.ts': 'genuinely untested — the honest entry in this list',
}

/** Test files the pipeline runs, and the harness each needs. */
const SUITES = [
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

const log = join(tmpdir(), `zp-loaded-${process.pid}.txt`)
writeFileSync(log, '')
const bootstrap = join(tmpdir(), `zp-reg-${process.pid}.mjs`)
writeFileSync(bootstrap, `import { register } from 'node:module'\nregister(${JSON.stringify('file://' + join(ROOT, 'scripts/load-recorder.mjs'))})\n`)

for (const [file, harness] of SUITES) {
  const args = ['--experimental-strip-types', '--import', bootstrap]
  args.push(...(harness ? [harness, file] : [file]))
  try {
    execFileSync('node', args, {
      cwd: ROOT, env: { ...process.env, ZP_LOAD_LOG: log },
      stdio: 'ignore', timeout: 120000,
    })
  } catch { /* a failing suite still records what it loaded, which is what we want */ }
}

const loaded = new Set(
  readFileSync(log, 'utf8').split('\n').filter(Boolean).map((p) => relative(ROOT, p).replace(/\\/g, '/')),
)
try { unlinkSync(log); unlinkSync(bootstrap) } catch { /* best effort */ }

const all = walk(join(ROOT, 'src')).map((f) => relative(ROOT, f).replace(/\\/g, '/')).sort()
const never = all.filter((f) => !loaded.has(f))

const problems = []
for (const f of never) {
  if (!(f in DECLARED)) problems.push(`${f} is loaded by no test and is not declared`)
}
for (const f of Object.keys(DECLARED)) {
  if (!never.includes(f)) problems.push(`${f} is declared untested but a test loads it now — drop the entry`)
}

console.log(`exercised:check — ${all.length} modules, ${loaded.size} loaded by a test, ${never.length} not (${Object.keys(DECLARED).length} declared)`)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`exercised:check FAIL — ${problems.length} problem(s)`)
  process.exit(1)
}
console.log('exercised:check ok — every module a test does not load is declared, and every declaration still holds')
process.exit(0)
