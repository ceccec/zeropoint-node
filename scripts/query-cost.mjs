#!/usr/bin/env node
/**
 * What every oracle-taking algorithm here actually costs in ORACLE CALLS.
 *
 * The advantage claimed for Deutsch-Jozsa is one query against a classical
 * 2^(n-1)+1. The advantage claimed for Grover is O(sqrt(N)) against N. Both are
 * claims about how many times the oracle is consulted, and both are checkable
 * by handing the algorithm an oracle that counts.
 *
 * Measured, this simulator consults the oracle MORE than the classical bound in
 * every case. Deutsch-Jozsa calls f exactly 2^n times, roughly twice the
 * classical worst case. groverSearch calls the predicate N*(k+1) times, which
 * is three to five times a classical scan over the ranges here.
 *
 * That is not a defect in these implementations and no amount of care would
 * remove it. A state-vector simulator applies a phase oracle by evaluating f on
 * every basis state, so ONE quantum query costs 2^n classical evaluations by
 * construction. The advantage is real on hardware and structurally absent here,
 * and this file exists so that the absence is a recorded measurement rather
 * than something a reader has to already know.
 *
 * The counts are asserted as FORMULAS, not as numbers for the sizes that
 * happened to be tried. An implementation that changed its query pattern fails
 * here and has to re-derive the law, which is the point.
 *
 * NOT MEASURED, AND WHY. `deutsch` and `bernsteinVazirani` and `simon` take no
 * oracle at all — they are handed f0 and f1, or the hidden mask itself — so
 * there is no query to count. `deutsch` goes further: its first line is
 * `if (f0 === f1) return 'constant'`, which answers half of all inputs
 * classically before any gate is applied. My own first attempt to measure it
 * passed a counting function as f0 and read "0 oracle calls" off an interface
 * that has no oracle parameter; the number was an artifact of calling it wrong.
 *
 *   npm run query:cost
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { contentHashOf, sealRecord } from './lib/fingerprint.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const RECORD = join(ROOT, 'src/verification/query-cost.json')
const CHECK = process.argv.includes('--check')

const SOURCES = ['src/quantum/algorithms.ts', 'scripts/query-cost.mjs']
const fingerprint = (() => {
  const h = createHash('sha256')
  for (const f of SOURCES) h.update(f).update(readFileSync(join(ROOT, f)))
  return h.digest('hex').slice(0, 32)
})()

if (CHECK && existsSync(RECORD)) {
  const raw = readFileSync(RECORD, 'utf8')
  let rec = null
  try { rec = JSON.parse(raw) } catch {
    console.error('query:cost FAIL — the record is not readable JSON'); process.exit(1)
  }
  if (JSON.stringify(rec, null, 2) + '\n' !== raw) {
    console.error('query:cost FAIL — the record does not round-trip: its bytes have been altered'); process.exit(1)
  }
  if (typeof rec.contentHash !== 'string' || contentHashOf(rec) !== rec.contentHash) {
    console.error('query:cost FAIL — the record does not match its own contentHash'); process.exit(1)
  }
  if (rec.inputsFingerprint === fingerprint) {
    console.log(`query:cost ok — ${rec.measurements.length} measurement(s), no query advantage in any of them (recorded)`)
    console.log(`               the algorithms have not moved (fingerprint ${fingerprint.slice(0, 12)})`)
    process.exit(0)
  }
  console.log('query:cost — an algorithm has moved; re-measuring')
}

const { deutschJozsa, groverSearch, groverIterations } = await import(join(ROOT, 'src/quantum/index.ts'))

/**
 * [name, sizes, run(n) -> calls, quantum law, classical worst case, what is claimed]
 * The law is a function of n so that a changed query pattern fails rather than
 * being absorbed into a bigger number.
 */
const SUBJECTS = [
  {
    name: 'deutschJozsa',
    sizes: [3, 4, 5, 6],
    measure: (n) => { let c = 0; deutschJozsa(n, (x) => { c += 1; return (x & 1) }) ; return c },
    law: (n) => 1 << n,
    lawSays: 'exactly 2^n — one evaluation per basis state, which is how a phase oracle is applied to a state vector',
    classical: (n) => (1 << (n - 1)) + 1,
    claim: 'one query, against a classical 2^(n-1)+1',
  },
  {
    name: 'groverSearch',
    sizes: [3, 4, 5],
    measure: (n) => { let c = 0; groverSearch(n, (x) => { c += 1; return x === 3 }); return c },
    law: (n) => (1 << n) * (groverIterations(1 << n) + 1),
    lawSays: 'N*(k+1) — one counting pass over every element, then k amplification rounds each touching all N',
    classical: (n) => 1 << n,
    claim: 'O(sqrt(N)) queries, against a classical N',
  },
]

const measurements = []
let advantages = 0
console.log('  algorithm      n   oracle calls   the law   classical worst case   ratio')
for (const s of SUBJECTS) {
  for (const n of s.sizes) {
    const calls = s.measure(n)
    const law = s.law(n)
    if (calls !== law) {
      console.error(`\nquery:cost FAIL — ${s.name} at n=${n} called the oracle ${calls} times; the recorded law says ${law}.`)
      console.error(`  The law is: ${s.lawSays}`)
      console.error('  A changed query pattern is a real result and needs re-deriving, not a bigger constant.')
      process.exit(1)
    }
    const classical = s.classical(n)
    const ratio = calls / classical
    if (ratio < 1) advantages += 1
    measurements.push({ algorithm: s.name, n, calls, classical, ratio })
    console.log(`  ${s.name.padEnd(14)} ${String(n).padStart(1)}   ${String(calls).padStart(12)}   ${String(law).padStart(7)}   ${String(classical).padStart(20)}   ${ratio.toFixed(2)}x ${ratio < 1 ? 'BETTER' : 'worse'}`)
  }
}

if (measurements.length === 0) {
  console.error('query:cost FAIL — measured nothing, and a sweep of no algorithms has no advantage to report either way')
  process.exit(1)
}

console.log('')
for (const s of SUBJECTS) console.log(`  ${s.name}: claims ${s.claim}`)
console.log('')
console.log(`  ${advantages} of ${measurements.length} measurements show a query advantage.`)
console.log('  A state-vector simulator applies a phase oracle by evaluating f on every basis')
console.log('  state, so one quantum query costs 2^n classical evaluations by construction.')
console.log('  The advantage is a property of hardware. It is not present here and cannot be,')
console.log('  and every timing or counting result in this repository sits inside that fact.')

writeFileSync(RECORD, JSON.stringify(sealRecord({
  what: 'Oracle calls actually made by every oracle-taking algorithm, against the classical worst case for the same problem. Written because impostors found that no check counted them.',
  inputsFingerprint: fingerprint,
  queryAdvantagesFound: advantages,
  measurements,
}), null, 2) + '\n')
console.log(`\nquery:cost ok — ${measurements.length} measurements, each matching its derived law`)
