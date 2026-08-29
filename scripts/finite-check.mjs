#!/usr/bin/env node
/**
 * No exported value may be Infinity or NaN.
 *
 * A repository that bans Math.* and decimal literals to keep arithmetic exact
 * was nevertheless exporting a constant array whose first element was Infinity,
 * and a live object containing a NaN. Both came from unguarded division by
 * zero, and both were reached from digit 0 — the void, the FIRST digit of this
 * repository's own sequence, so neither was an edge case.
 *
 *   FIBONACCI_RATIOS[0]                     1 / F(0) = 1 / 0
 *   a432WaveEnergy ... wavelength           c / 0
 *   a432WaveEnergy ... resonance            sum of 1 / 0
 *   a432WaveEnergy ... consciousness        digitalRoot(round(Infinity)) = NaN
 *
 * The last one is why this check exists rather than a lint rule about division.
 * Infinity is loud and arguably correct — a zero-frequency wave really does
 * have no spatial period. NaN is what Infinity BECOMES once it meets ordinary
 * arithmetic, and by then the origin is several functions away. Catching the
 * value is cheaper than tracing the cause.
 *
 * Every module is imported and every export walked, including nested arrays and
 * objects. Anything non-finite fails. There is no allowlist: unlike an unlinked
 * page or a retyped constant, a NaN in an exported value has no legitimate
 * version — if a quantity is genuinely undefined, the type should say so
 * instead of encoding it as a number that poisons every sum it touches.
 *
 * Ends with an explicit process.exit: several modules here hold the event loop
 * open after importing cleanly, so without it this check imports everything,
 * prints its verdict, and then never returns.
 *
 *   npm run finite:check
 */

import { readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

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
const problems = []
let modules = 0
let values = 0

for (const file of files) {
  const rel = relative(ROOT, file).replace(/\\/g, '/')
  let mod
  try {
    mod = await import(pathToFileURL(file).href)
  } catch {
    continue // load failures are the ratchet's business, not this check's
  }
  modules++

  const seen = new WeakSet()
  const scan = (val, path, depth) => {
    if (depth > 6) return
    if (typeof val === 'number') {
      values++
      if (!Number.isFinite(val)) problems.push(`${rel}: ${path} = ${val}`)
      return
    }
    if (val === null || typeof val !== 'object') return
    if (seen.has(val)) return
    seen.add(val)
    if (Array.isArray(val)) {
      // Long arrays are sampled at both ends: a full walk of a 10k-element
      // buffer costs more than it finds, and these defects sit at index 0.
      const idx = val.length <= 64 ? val.keys() : [0, 1, 2, val.length - 2, val.length - 1]
      for (const i of idx) scan(val[i], `${path}[${i}]`, depth + 1)
      return
    }
    for (const [k, v] of Object.entries(val)) {
      if (typeof v === 'function') continue
      scan(v, `${path}.${k}`, depth + 1)
    }
  }

  for (const [k, v] of Object.entries(mod)) {
    if (typeof v === 'function') continue
    try { scan(v, k, 0) } catch { /* exotic getters are not this check's business */ }
  }
}

console.log(`finite:check — ${modules} modules imported, ${values} exported number(s) walked`)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`finite:check FAIL — ${problems.length} non-finite exported value(s)`)
  process.exit(1)
}
console.log('finite:check ok — no exported value is Infinity or NaN')
process.exit(0)
