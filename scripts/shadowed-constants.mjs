#!/usr/bin/env node
/**
 * No file under src/verification/ may declare a local constant whose name is
 * also exported by the shipped surface.
 *
 * Written because of a specific failure, not for coverage. lean-bridge.ts
 * declared its own H, X and Y gate matrices beside an import of the rest of the
 * simulator. They agreed with the shipped gates, so every seal held and nothing
 * looked wrong -- but perturbing src/quantum/simulator.ts moved NOTHING: seven
 * seals were reading private copies. A seal that cannot fall when the shipped
 * value is wrong is not evidence about the shipped value, and the way that
 * state is reached is by a local declaration quietly shadowing an export.
 *
 * The check is deliberately name-based rather than value-based. Two constants
 * that agree today are exactly the case that hid the bug; agreement is not the
 * property worth testing, reaching the shipped one is.
 */
import { readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

// Names that may legitimately be declared locally despite colliding. Each needs
// a reason. An empty list is the honest default -- add only with justification.
const ALLOWED = new Map([])

const files = execSync('git ls-files src', { encoding: 'utf8' })
  .trim().split('\n').filter((f) => f.endsWith('.ts'))

const shipped = new Map()
for (const f of files) {
  if (f.startsWith('src/verification/')) continue
  for (const m of readFileSync(f, 'utf8').matchAll(/^export const ([A-Za-z_]\w*)/gm)) {
    if (!shipped.has(m[1])) shipped.set(m[1], f)
  }
}

const found = []
for (const f of files.filter((f) => f.startsWith('src/verification/'))) {
  for (const m of readFileSync(f, 'utf8').matchAll(/^const ([A-Za-z_]\w*)\s*[:=]/gm)) {
    if (shipped.has(m[1]) && !ALLOWED.has(m[1])) {
      found.push({ name: m[1], file: f, shippedFrom: shipped.get(m[1]) })
    }
  }
}

// The scan must be able to see something, or "none found" and "never looked"
// read identically -- the failure mode this whole gate exists to prevent.
if (shipped.size === 0) {
  console.error('shadowed:check FAIL — read 0 shipped exports, so the scan proves nothing')
  process.exit(1)
}

if (found.length > 0) {
  console.error(`shadowed:check FAIL — ${found.length} local declaration(s) shadow a shipped export:`)
  for (const s of found) {
    console.error(`  ${s.name} declared in ${s.file}`)
    console.error(`    shipped from ${s.shippedFrom} — import it instead, or a perturbation there moves nothing here`)
  }
  process.exit(1)
}
console.log(`shadowed:check ok — ${shipped.size} shipped exports, no local declaration shadows one`)
