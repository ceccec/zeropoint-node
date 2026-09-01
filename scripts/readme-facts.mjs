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
 * --fix WRITES the computed value into the prose instead of only reporting the
 * disagreement, and `npm run readme` runs it, so the figures are GENERATED
 * rather than merely checked.
 *
 * That distinction is borrowed from uuidna.com, which states the standard
 * plainly: "all numbers read from the sealed ledger at build time — the page
 * cannot say more than the ledger proves." Checking catches drift after it
 * happens and depends on someone running the check; generating makes the drift
 * impossible, because the number in the sentence is the number the code
 * returned. The check remains, so a hand-edited README still fails rather than
 * being silently corrected on the next build.
 *
 *   npm run readme:facts     check every stated figure
 *   npm run readme:facts --fix   write the computed figures into the prose
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readmeFigures, statedNumber } from './lib/readme-figures.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const readme = readFileSync(join(ROOT, 'README.md'), 'utf8')
const args = process.argv.slice(2)


const facts = await readmeFigures(ROOT)

let problems = 0
let checked = 0
for (const f of facts) {
  const found = [...readme.matchAll(f.pattern)]
  if (found.length === 0) {
    // Absence is a FAILURE, not a shrug. Every figure in this table is one the
    // README states on purpose, so a pattern matching nothing means the
    // sentence was deleted or corrupted — and reporting "n/a" there meant the
    // checker went green while checking nothing. That is exactly what happened
    // when --fix wrote "A472OS" into the README: zero figures matched, zero
    // were checked, and the run passed.
    problems++
    console.error(`  ✗    ${f.what.padEnd(20)} is no longer stated anywhere in the README (${f.where} computes ${f.value})`)
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

// --fix rewrites the stated number in place. The pattern that FOUND the figure
// is the pattern used to replace it, so a figure can only be rewritten where it
// was already being checked — this cannot invent a claim, only correct one.
if (args.includes('--fix')) {
  let out = readme
  let rewritten = 0
  for (const f of facts) {
    out = out.replace(f.pattern, (whole, stated, offset, whole2, ...rest) => {
      if (statedNumber(stated) === f.value) return whole
      rewritten++
      // Replace AT THE CAPTURE'S POSITION, not by searching the matched text.
      // Searching found the "3" inside "A432OS" before the figure and wrote
      // "A472OS" into the README — and the checker then reported ok, because
      // its pattern no longer matched anything to check.
      const standalone = whole.search(new RegExp(`(?<![\\w.])${String(stated)}(?![\\w.])`))
      const cut = standalone >= 0 ? standalone : whole.lastIndexOf(String(stated))
      return whole.slice(0, cut) + String(f.value) + whole.slice(cut + String(stated).length)
    })
  }
  if (rewritten > 0) {
    writeFileSync(join(ROOT, 'README.md'), out)
    console.log(`readme:facts — rewrote ${rewritten} figure(s) from what the repo computes`)
  } else {
    console.log('readme:facts — every figure already matches; nothing rewritten')
  }
  process.exit(0)
}

console.log(`readme:facts — ${checked} stated figure(s) checked against what the repo computes`)
if (problems > 0) {
  console.error(`readme:facts FAIL — ${problems} figure(s) in the README disagree with the code`)
  process.exit(1)
}
console.log('readme:facts ok — every figure the README states is the figure the repo computes')
process.exit(0)
