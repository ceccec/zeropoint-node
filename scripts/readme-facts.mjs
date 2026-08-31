#!/usr/bin/env node
/**
 * readme-facts — every number the README states about this repo must be the
 * number the repo computes.
 *
 * CHANGELOG entries have had this since 1.0.x (scripts/changelog-facts.mjs).
 * The README did not, and a probe that corrupted forty bytes of its prose
 * passed every check in the pipeline. So the figures drifted, and not subtly:
 * the README said "25 theorems" in one place, "25 sealed theorems" in a
 * second, "22 seals" in a third, and the answer was 26 in all three. It also
 * described "a ratchet on eight surfaces" while the ratchet ran twelve.
 *
 * This is stricter than the CHANGELOG version. That one asks whether a
 * recomputed value appears SOMEWHERE in the section. This one captures every
 * stated instance and compares each — so a second, staler mention cannot hide
 * behind a first, correct one, which is exactly how "25" and "22" coexisted.
 *
 *   npm run readme:facts     check every stated figure
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readmeFigures, statedNumber } from './lib/readme-figures.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const readme = readFileSync(join(ROOT, 'README.md'), 'utf8')


const facts = await readmeFigures(ROOT)

let problems = 0
let checked = 0
for (const f of facts) {
  const found = [...readme.matchAll(f.pattern)]
  if (found.length === 0) {
    console.log(`  n/a  ${f.what.padEnd(20)} ${String(f.value).padStart(4)}  (not stated in the README)`)
    continue
  }
  for (const m of found) {
    checked++
    const stated = statedNumber(m[1])
    const line = readme.slice(0, m.index).split('\n').length
    if (stated === f.value) {
      console.log(`  ok   ${f.what.padEnd(20)} ${String(f.value).padStart(4)}  README:${line}`)
    } else {
      problems++
      console.error(`  ✗    ${f.what.padEnd(20)} README:${line} says ${stated}, ${f.where} computes ${f.value}`)
    }
  }
}

console.log(`readme:facts — ${checked} stated figure(s) checked against what the repo computes`)
if (problems > 0) {
  console.error(`readme:facts FAIL — ${problems} figure(s) in the README disagree with the code`)
  process.exit(1)
}
console.log('readme:facts ok — every figure the README states is the figure the repo computes')
process.exit(0)
