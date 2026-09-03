#!/usr/bin/env node
/**
 * THE CLAIM LEDGER, AND THE WITNESS OVER IT.
 *
 * prose:check counts unbounded effect claims and exempts one whose section
 * carries a boundary — but nothing decided what a boundary had to BE. The
 * cheapest way to move that number was a sentence saying "this is not a claim",
 * which is an assertion about an assertion: unfalsifiable, and worth nothing to
 * a reader deciding whether to believe the page. Twelve of those would have met
 * the 1.4.9 target with every claim left exactly as it stood.
 *
 * So a claim is not disclaimed here. It is BOUND TO A THEOREM, and this is the
 * witness that the binding holds.
 *
 * The shape is borrowed from uuidna's axiom witness, which is the best worked
 * example of this that the author has seen:
 *
 *   COVERAGE IS A CONDITION. There, `audited` must equal `ledger` — a new,
 *   unaudited theorem trips the witness rather than being quietly excluded.
 *   Here, every live claim must carry a ledger entry and every entry must still
 *   match a live claim, so a new claim trips this and a deleted one cannot rot.
 *
 *   EVERY CLAIM CARRIES ITS DEMARCATED FORM. There, the captain's claim is
 *   demarcated to its backed form, ending "NOT a claim about mathematics at
 *   large". Here, every entry states what its theorem establishes AND what it
 *   does not, because a backed claim without its limit is still an overclaim.
 *
 *   AN UNBACKED APPEARANCE IS AN OFFENDER. There, an axiom appearing in a
 *   ledger that borrows zero axioms is the spy the witness catches. Here, a
 *   claim bound to a theorem that has stopped holding, or to an axiom nobody
 *   declared, is named with its file and line.
 *
 * A binding may be one of three things, and no others:
 *
 *   criterion   consciousness-criterion | os-criterion | quantum-criterion |
 *               realtime-criterion — evaluated, and required to meet every
 *               condition it has
 *   seal        any key of SEALS in src/verification/lean-bridge.ts, required
 *               to run and hold
 *   axiom       a key of ASSUMPTIONS, which is how this repository already
 *               records what no finite computation decides. An axiom binding
 *               must carry the reason no theorem is available, and the witness
 *               reports how many claims rest on axioms rather than hiding them
 *               among the theorems.
 *
 * WHAT THIS CANNOT DO is judge whether the theorem is the RIGHT one for the
 * claim. It decides that the binding names something real, that the something
 * is decidable, that it currently decides in the direction claimed, and that no
 * claim is left out. A person still chooses the binding; this makes the choice
 * checkable rather than rhetorical.
 *
 *   npm run claims:check    the witness
 *   npm run claims:seed     write a ledger stub for every unbound claim
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { scanClaims } from './prose-claims.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const LEDGER = join(ROOT, 'scripts', 'claims.json')
const SEED = process.argv.includes('--seed')

const { SEALS, runSeal, ASSUMPTIONS } = await import(join(ROOT, 'src/verification/lean-bridge.ts'))
const { evaluateConsciousnessCriterion } = await import(join(ROOT, 'src/verification/consciousness-criterion.ts'))
const { evaluateOsCriterion } = await import(join(ROOT, 'src/verification/os-criterion.ts'))
const { evaluateQuantumCriterion } = await import(join(ROOT, 'src/verification/quantum-criterion.ts'))
const { evaluateRealtimeCriterion } = await import(join(ROOT, 'src/verification/realtime-criterion.ts'))

const CRITERIA = {
  'consciousness-criterion': evaluateConsciousnessCriterion,
  'os-criterion': evaluateOsCriterion,
  'quantum-criterion': evaluateQuantumCriterion,
  'realtime-criterion': evaluateRealtimeCriterion,
}

/** A claim's identity: its file and enough of its own words to find it again. */
const keyOf = (h) => `${h.file}::${h.text.slice(0, 60)}`

const live = scanClaims()
const recorded = existsSync(LEDGER) ? JSON.parse(readFileSync(LEDGER, 'utf8')) : { claims: {} }
const entries = recorded.claims ?? {}

if (SEED) {
  const next = {}
  for (const h of live.sort((a, b) => keyOf(a).localeCompare(keyOf(b)))) {
    const k = keyOf(h)
    next[k] = entries[k] ?? { line: h.line, kind: h.id, backedBy: null, establishes: null, doesNotEstablish: null }
    next[k].line = h.line
  }
  writeFileSync(LEDGER, JSON.stringify({ claims: next }, null, 2) + '\n')
  const unbound = Object.values(next).filter((e) => !e.backedBy).length
  console.log(`claims:seed — ${Object.keys(next).length} claim(s) recorded, ${unbound} still unbound`)
  process.exit(0)
}

const problems = []
const tally = { theorem: 0, axiom: 0, unbound: 0 }
const cache = new Map()

/** Resolve a binding to held / not-held / absent, once per name. */
function resolve(name) {
  if (cache.has(name)) return cache.get(name)
  let out
  if (name in CRITERIA) {
    try {
      const v = CRITERIA[name]()
      out = v.conditionsMet === v.conditionsTotal
        ? { kind: 'theorem', holds: true, detail: `${v.conditionsMet}/${v.conditionsTotal} conditions` }
        : { kind: 'theorem', holds: false, detail: `${v.conditionsMet}/${v.conditionsTotal} conditions` }
    } catch (e) { out = { kind: 'theorem', holds: false, detail: `threw: ${e.message}` } }
  } else if (name in SEALS) {
    const s = runSeal(name)
    out = { kind: 'theorem', holds: s.seal === 'held', detail: s.seal }
  } else if (name in ASSUMPTIONS) {
    out = { kind: 'axiom', holds: true, detail: 'declared assumption, not decided' }
  } else {
    out = { kind: 'absent', holds: false, detail: 'neither a criterion, a seal, nor a declared assumption' }
  }
  cache.set(name, out)
  return out
}

const liveKeys = new Set()
for (const h of live) {
  const k = keyOf(h)
  liveKeys.add(k)
  const e = entries[k]
  if (!e || !e.backedBy) {
    tally.unbound += 1
    problems.push(`${h.file}:${h.line} asserts an effect and is bound to nothing — bind it to a theorem, or record the axiom it rests on: "${h.text.slice(0, 70)}"`)
    continue
  }
  const r = resolve(e.backedBy)
  if (r.kind === 'absent') {
    problems.push(`${h.file}:${h.line} is bound to "${e.backedBy}", which does not exist here — a claim may not name a theorem nobody wrote`)
    continue
  }
  if (!r.holds) {
    problems.push(`${h.file}:${h.line} is bound to ${e.backedBy}, and it is ${r.detail} rather than holding — a boundary that has stopped holding is not a boundary`)
    continue
  }
  if (!e.establishes || !e.doesNotEstablish) {
    problems.push(`${h.file}:${h.line} is bound to ${e.backedBy} but states no demarcation — a backed claim without its limit is still an overclaim`)
    continue
  }
  tally[r.kind] += 1
}

// Coverage runs both ways: an entry for a claim nobody makes any more is a
// binding to nothing, and it rots exactly the way a stale allowlist does.
for (const k of Object.keys(entries)) {
  if (!liveKeys.has(k)) problems.push(`the ledger records "${k}" and no such claim is made any more — delete the entry`)
}

console.log(`claims:check — ${live.length} effect claim(s) in the corpus; ${tally.theorem} bound to a theorem that holds, ${tally.axiom} resting on a declared axiom, ${tally.unbound} bound to nothing`)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`claims:check FAIL — ${problems.length} problem(s); a claim is bound to a theorem, or it is not made`)
  process.exit(1)
}
console.log('claims:check ok — every claim names a predicate that exists and holds, and every predicate still has a claim')
process.exit(0)
