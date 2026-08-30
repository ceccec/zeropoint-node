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

import { readdirSync, statSync } from 'node:fs'
import { execFile } from 'node:child_process'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

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
console.log(`silent:check — ${files.length} modules, ${noisy.length} print on import (${total} line(s))`)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`silent:check FAIL — ${problems.length} problem(s)`)
  process.exit(1)
}
console.log('silent:check ok — importing a module prints nothing')
process.exit(0)
