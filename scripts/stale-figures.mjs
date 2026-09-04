#!/usr/bin/env node
/**
 * Counts written into COMMENTS AND PROSE, compared against the tree.
 *
 * CHANGELOG figures are gated by changelog:check and README figures by
 * readme:facts. Neither looks at comments, and a comment is where a count goes
 * to die: it is written once beside the thing it describes and never revisited
 * when the thing changes. Today `zenodo-verify.mjs` still said "50 deposit
 * records" hours after the bar changed and made it 59 — documentation
 * describing a condition its own author had removed.
 *
 * IT REPORTS, IT DOES NOT FAIL. A sentence like "measured before this existed:
 * 33 seals" is HISTORY, not staleness, and must stay as written. Gating on this
 * would force such sentences to be falsified into agreement with the present,
 * which is worse than the drift it prevents. millennium-solutions runs the same
 * sweep and measures 6 of 8 flags false; a 75%-wrong signal is a report.
 * Exit code is always 0. A human decides.
 *
 * A KNOWN FALSE POSITIVE, left in rather than special-cased: lean-status.ts
 * says "of the 12 theorems LEAN_PROOFS states", and LEAN_PROOFS does state
 * twelve. A count that names its own denominator is measuring a different set
 * from the one recomputed here, and teaching the regex to recognise that would
 * be fitting the instrument to today's sentences.
 *
 * NOT IN THE GATING CHAIN, deliberately. See the paragraph above on why a
 * mostly-wrong signal must not fail a build.
 *
 *   npm run stale:figures
 */
import { readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'

const ROOT = new URL('..', import.meta.url).pathname

// Every quantity is RECOMPUTED from the tree. Nothing here is a remembered
// number, or this script would drift exactly as the comments it audits do.
const bridge = readFileSync(ROOT + 'src/verification/lean-bridge.ts', 'utf8')
const ledger = JSON.parse(readFileSync(ROOT + 'lean/ledger.json', 'utf8'))
const pinning = JSON.parse(readFileSync(ROOT + 'src/verification/seal-pinning.json', 'utf8'))

const sealBlock = bridge.slice(bridge.indexOf('export const SEALS'))
const truth = {
  seals: Object.keys(pinning.seals).length,
  deposits: ledger.entries.filter((e) => e.status === 'proven').length,
  'kernel-proven': ledger.entries.filter((e) => e.status === 'proven').length,
  theorems: ledger.entries.length,
  pinned: pinning.tally.pinned,
  structural: pinning.tally.structural,
}
void sealBlock

// Noun forms are spelled out because the first version matched only the bare
// plural and therefore MISSED the very line that motivated this script —
// "50 deposit records" is not "50 deposits". An instrument that misses its own
// founding case is the failure it exists to prevent.
const NOUN_FORMS = {
  // PLURAL ONLY. The singular matched "Tier 3 seal" as "3 seals", where the 3
  // labels a tier and counts nothing. A count of one is rare enough here that
  // missing it costs less than the labels it would drag in.
  seals: ['seals'],
  deposits: ['deposits', 'deposit records'],
  'kernel-proven': ['kernel-proven'],
  theorems: ['theorems'],
  pinned: ['pinned seals'],            // NOT bare "pinned": a UUID has 6 bits
  structural: ['structural seals'],    // pinned by version/variant, a different sense
}
const NOUNS = Object.entries(NOUN_FORMS).flatMap(([k, fs]) => fs.map((f) => [k, f]))
const files = execSync('git ls-files src scripts docs', { encoding: 'utf8' })
  .trim().split('\n').filter((f) => /\.(ts|mjs|md)$/.test(f) && !f.includes('CHANGELOG'))

// A line that dates itself is history, not drift.
const HISTORICAL = /\b(was|were|used to|previously|before this|until now|no longer|hours after|old form|it read|said|stating|beside the true|has grown from|grew from|down from|up from|\d+\s*->|\d+\s*→)\b/i

const flags = []
for (const f of files) {
  const lines = readFileSync(ROOT + f, 'utf8').split('\n')
  lines.forEach((line, i) => {
    for (const [noun, form] of NOUNS) {
      for (const m of line.matchAll(new RegExp(`\\b(\\d{1,4}) (${form})\\b`, 'gi'))) {
      const stated = Number(m[1])
      if (stated === truth[noun]) continue
      flags.push({
        file: f, line: i + 1, stated, noun, actual: truth[noun],
        historical: HISTORICAL.test(line),
        text: line.trim().slice(0, 96),
      })
      }
    }
  })
}

console.log('  recomputed from the tree:', Object.entries(truth).map(([k, v]) => `${v} ${k}`).join(', '))
const live = flags.filter((f) => !f.historical)
const hist = flags.filter((f) => f.historical)
console.log(`\n  ${flags.length} figure(s) disagree with the tree; ${hist.length} date themselves and are history`)
for (const f of live) {
  console.log(`    ${f.file}:${f.line}  says ${f.stated} ${f.noun}, tree has ${f.actual}`)
  console.log(`      ${f.text}`)
}
if (live.length === 0) console.log('    none that do not date themselves')

// NOTHING IS HIDDEN. Suppressing the dated ones cost a real find: the line
// that motivated this script says "50 deposit records" in a sentence that also
// says "Until now", and the heuristic read the wrong clause. A report that
// silently drops a row is a report you cannot check, so they are listed too.
if (hist.length > 0) {
  console.log(`\n  dating themselves, shown so nothing is hidden — the phrase may govern another clause:`)
  for (const f of hist) console.log(`    ${f.file}:${f.line}  says ${f.stated} ${f.noun}, tree has ${f.actual}  |  ${f.text.slice(0, 72)}`)
}
console.log(`\nstale:figures — ${live.length} to look at, ${hist.length} historical. Reports only; a human decides.`)
