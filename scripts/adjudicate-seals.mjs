#!/usr/bin/env node
/**
 * Put every seal through an outside adjudicator.
 *
 * The seals in `src/verification/lean-bridge.ts` are recomputable predicates,
 * which is already better than an assertion — but they are recomputed by this
 * repository, about this repository. That is consistency, not independence.
 *
 * `adjudicate` from @uuidna/uuidna is a third party: it runs the predicate and
 * returns VERIFIED / REFUTED / UNVERIFIED plus a content-addressed receipt,
 * where UNVERIFIED means "no decidable test was supplied", never "false". A
 * seal that holds here should come back VERIFIED there; one that does not is
 * either not decidable or not true, and both are worth knowing.
 *
 * Earlier the hosted uuidna trial returned UNVERIFIED for claims about this
 * work, correctly — a prose sentence has nothing to recompute. The fix was
 * never to argue with the verdict, it was to bring a predicate.
 *
 *   npm run adjudicate          verdict + receipt for every seal
 *   npm run adjudicate -- --check   exit 1 unless every seal is VERIFIED
 *
 * Receipts are content-addressed, so the same statement and predicate address
 * to the same receipt on any machine. They are printed rather than stored: a
 * checked-in receipt would be one more thing asserting its own correctness.
 */

import { SEALS } from '../src/verification/lean-bridge.ts'

const CHECK = process.argv.includes('--check')

let adjudicate
try {
  ;({ adjudicate } = await import('@uuidna/uuidna'))
} catch (err) {
  console.error(`adjudicate: @uuidna/uuidna is not installed — ${err.message}`)
  process.exit(CHECK ? 1 : 0)
}

const rows = []
for (const [name, seal] of Object.entries(SEALS)) {
  // The seal's own basis line is the statement; the predicate is the seal.
  // Neither is rewritten for the adjudicator, or this would be measuring a
  // paraphrase rather than the thing the gate runs.
  let result
  try {
    result = adjudicate(`${name}: ${seal.basis}`, () => seal.decide() === true)
  } catch (err) {
    result = { verdict: 'THREW', receipt: '-', note: err.message }
  }
  rows.push({ name, verdict: result.verdict, receipt: result.receipt, note: result.note })
}

const width = Math.max(...rows.map((r) => r.name.length))
for (const r of rows) {
  console.log(`  ${r.verdict.padEnd(9)} ${r.name.padEnd(width)}  ${r.receipt}`)
}

const verified = rows.filter((r) => r.verdict === 'VERIFIED').length
const refuted = rows.filter((r) => r.verdict === 'REFUTED')
const other = rows.filter((r) => r.verdict !== 'VERIFIED' && r.verdict !== 'REFUTED')

console.log(`\nadjudicate — ${verified}/${rows.length} VERIFIED by an outside decision procedure`)
for (const r of refuted) console.error(`  REFUTED ${r.name}: ${r.note}`)
for (const r of other) console.error(`  ${r.verdict} ${r.name}: ${r.note}`)

if (refuted.length > 0) {
  console.error('adjudicate FAIL — a seal holds here but is refuted outside')
  process.exit(1)
}
if (CHECK && verified !== rows.length) {
  console.error('adjudicate FAIL — not every seal carries an external verdict')
  process.exit(1)
}
