#!/usr/bin/env node
/**
 * Importing a module must print nothing.
 *
 * Nine modules wrote 361 lines to stdout as a side effect of being loaded. Two
 * were demos running their entire script at module scope, so anything that
 * touched them — the coverage audit, a tool walking the tree, a consumer's
 * import — got the whole demonstration whether it asked or not. The other seven
 * announced themselves: "Initializing A432 Sacred Geometry System", "A432
 * Bundle Loading", three lines of route constants.
 *
 * None of it carried information. It was the loudest thing in every gate run
 * and in every log of anything that used this package, and it drowned real
 * output — the a432 property suite's failures had to be grepped out of it.
 *
 * The demos are guarded on being the entry point rather than deleted: they
 * still print when run, which is what a demo is for. The announcements are
 * gone; a library announces nothing.
 *
 * Each module is imported in its own process, because output has to be
 * attributed to the module that caused it. Run in parallel — they are
 * independent, and sequentially this took minutes.
 *
 *   npm run silent:check
 */

import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { execFile } from 'node:child_process'
import { createHash } from 'node:crypto'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { contentHashOf, sealRecord } from './lib/fingerprint.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** Modules allowed to print on import, with the reason. */
const ALLOWED = {}

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    if (n === 'node_modules') continue
    const full = join(dir, n)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (n.endsWith('.ts') && !n.endsWith('.d.ts') && !n.endsWith('.test.ts')) out.push(full)
  }
  return out
}

const files = walk(join(ROOT, 'src')).sort()

/**
 * A GATE THAT REMEMBERS WHAT IT READ.
 *
 * This spawns one node process per module — 7.2 seconds to learn that nothing
 * has changed, on every run of a chain that runs it every time. The answer is a
 * pure function of the .ts files under src/ and of this file's own ALLOWED
 * list, so when neither has moved the recorded verdict IS the answer.
 *
 * The record lives beside the other verification records and is excluded from
 * its own fingerprint for free: the walk collects .ts files and the record is
 * .json. That is not a coincidence to rely on silently — a fingerprint that
 * included its own output could never match twice, which this repository has
 * already hit once in lean/bounds.json.
 *
 * CORRUPTION IS A FAILURE, NOT A REASON TO RECOMPUTE. checks-falsifiable
 * damages generated artifacts to prove their checkers notice; a fast path that
 * responded to damage by quietly regenerating would pass the probe while
 * disarming it. A moved SOURCE re-runs the work; a damaged RECORD fails.
 */
const RECORD = join(ROOT, 'src/verification/silent-import.json')

function inputsFingerprint() {
  const h = createHash('sha256')
  for (const f of files) h.update(f.replace(ROOT, '')).update(readFileSync(f))
  h.update(readFileSync(fileURLToPath(import.meta.url)))   // the ALLOWED list is an input
  return h.digest('hex').slice(0, 32)
}

const fingerprint = inputsFingerprint()
if (existsSync(RECORD)) {
  const raw = readFileSync(RECORD, 'utf8')
  let recorded = null
  try { recorded = JSON.parse(raw) } catch {
    console.error('silent:check FAIL — src/verification/silent-import.json is not readable JSON')
    process.exit(1)
  }
  if (JSON.stringify(recorded, null, 2) + '\n' !== raw) {
    console.error('silent:check FAIL — the record does not round-trip: its bytes have been altered')
    process.exit(1)
  }
  if (typeof recorded.contentHash !== 'string' || contentHashOf(recorded) !== recorded.contentHash) {
    console.error('silent:check FAIL — the record does not match its own contentHash: its content has been altered')
    process.exit(1)
  }
  if (recorded.inputsFingerprint === fingerprint) {
    if (recorded.problems.length > 0) {
      for (const p of recorded.problems) console.error(`  ✗ ${p}`)
      console.error(`silent:check FAIL — ${recorded.problems.length} problem(s), recorded`)
      process.exit(1)
    }
    console.log(`silent:check — ${recorded.modules} modules, ${recorded.noisy} print on import (recorded)`)
    console.log(`silent:check ok — no module under src/ has changed (fingerprint ${fingerprint.slice(0, 12)}), and the record is byte-intact`)
    process.exit(0)
  }
  console.log('silent:check — modules have moved since the record was written; importing all of them again')
}

const LIMIT = 24 // keep the process count bounded
const noisy = []
let cursor = 0

async function worker() {
  for (;;) {
    const i = cursor++
    if (i >= files.length) return
    const file = files[i]
    const rel = relative(ROOT, file).replace(/\\/g, '/')
    const out = await new Promise((done) => {
      execFile(
        'node',
        ['--experimental-strip-types', '-e',
          `import(${JSON.stringify(pathToFileURL(file).href)}).then(()=>process.exit(0)).catch(()=>process.exit(0))`],
        { cwd: ROOT, timeout: 30000, maxBuffer: 16 * 1024 * 1024 },
        // stderr is NOT counted: a browser module throwing "document is not
        // defined" is an environment mismatch, not chatter, and the ratchet
        // already tracks those separately.
        (_err, stdout) => done(stdout ?? ''),
      )
    })
    const lines = out.split('\n').filter((l) => l.trim().length > 0)
    if (lines.length > 0) noisy.push({ rel, count: lines.length, first: lines[0].slice(0, 60) })
  }
}
await Promise.all(Array.from({ length: LIMIT }, worker))

const problems = []
for (const n of noisy) {
  if (!(n.rel in ALLOWED)) problems.push(`${n.rel} writes ${n.count} line(s) to stdout on import — first: ${n.first}`)
}
for (const k of Object.keys(ALLOWED)) {
  if (!noisy.some((n) => n.rel === k)) problems.push(`${k} is declared noisy but is silent now — drop the entry`)
}

const total = noisy.reduce((s, n) => s + n.count, 0)

// The verdict is recorded with the fingerprint of what produced it, so the next
// run answers from it if nothing under src/ has moved. Written whether or not
// there were problems: a recorded FAILURE is as much the answer for these
// inputs as a recorded pass, and re-deriving it costs the same 7.2 seconds.
writeFileSync(RECORD, JSON.stringify(sealRecord({
  what: 'Which modules print to stdout merely on being imported. One node process per module, so it is folded behind a fingerprint of the .ts files under src/ and of the ALLOWED list in scripts/silent-import.mjs.',
  doesNotEstablish: 'that a module is silent when USED. This imports and nothing more; a function that prints when called is invisible here.',
  inputsFingerprint: fingerprint,
  modules: files.length,
  noisy: noisy.length,
  lines: total,
  problems,
}), null, 2) + '\n')

console.log(`silent:check — ${files.length} modules, ${noisy.length} print on import (${total} line(s))`)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`silent:check FAIL — ${problems.length} problem(s)`)
  process.exit(1)
}
console.log('silent:check ok — importing a module prints nothing')
process.exit(0)
