/**
 * lean:bounds — is a theorem's finite bound content, or scaffolding?
 *
 * `decide` needs something finite, so statements that are true for every
 * natural get written over `List.range 60`. A reader cannot tell that from a
 * theorem whose bound is load-bearing — where 60 is the real domain and the
 * statement is false at 61. Both look identical, and prose beside either one
 * routinely asserts a universal.
 *
 * This decides which is which by PERTURBING THE BOUND rather than reading the
 * prose. Widen the domain; re-run the kernel.
 *
 *   still holds  ->  artifact: the bound was scaffolding, a universal is honest
 *   now false    ->  load-bearing: the bound IS the theorem
 *
 * It never reads a comment, so it cannot be fooled by prose that names its
 * domain well — "every digit" over `List.range 10` is better writing than
 * naming the cardinality, and a wordlist-based version of this flags it.
 *
 * WHAT IT REFUSES TO CONCLUDE. A kernel that exits non-zero has not necessarily
 * refuted anything: at range 400 this file hits `maximum recursion depth`, and
 * calling that a broken bound would mark three honest theorems as load-bearing.
 * A resource limit is INCONCLUSIVE and is reported as its own verdict. That
 * distinction is the whole difference between this being an instrument and
 * being a generator of confident wrong answers.
 *
 * It does NOT settle whether prose over-claims. Load-bearing and over-claiming
 * coincide only when the sentence's universal ranges wider than the real
 * domain, and nothing here reads the sentence. Theorems over named domains —
 * `∀ d ∈ orbit` — are not widened at all: the domain IS the object, and adding
 * an element makes it a different claim rather than a wider one.
 *
 *   npm run lean:bounds
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { fingerprintOf, answerFromRecord, sealRecord } from './lib/fingerprint.mjs'

const ROOT = join(import.meta.dirname, '..')
const SRC = join(ROOT, 'lean/DigitSpace.lean')
const LEDGER = join(ROOT, 'lean/bounds.json')
const CHECK = process.argv.includes('--check')
const WIDEN = 4 // multiply every numeric bound by this

// The kernel is the cost here, and it only has anything new to say when a
// .lean file has moved.
//
// ONLY THE .lean FILES. The record itself is lean/bounds.json, inside the same
// directory — fingerprinting the directory made writing the record change the
// fingerprint, so the fast path could never fire and every run recomputed. A
// fingerprint that includes its own output is a fingerprint that never matches.
const FINGERPRINT = fingerprintOf([join(ROOT, 'lean')], (f) => f.endsWith('.lean'))

if (CHECK) {
  let corrupt = null
  const recorded = answerFromRecord(LEDGER, FINGERPRINT, { onCorrupt: (m) => { corrupt = m } })
  if (corrupt) { console.error(`lean:bounds FAIL — ${corrupt}`); process.exit(1) }
  if (recorded) {
    const tally = {}
    for (const r of Object.values(recorded.bounds)) tally[r.verdict] = (tally[r.verdict] ?? 0) + 1
    console.log(`lean:bounds ok — no .lean file has moved (fingerprint ${FINGERPRINT.slice(0, 12)}); ${Object.entries(tally).map(([k, v]) => `at least ${v} ${k}`).join(', ')}`)
    console.log('               the kernel is re-asked in full the moment one does')
    process.exit(0)
  }
}

const source = readFileSync(SRC, 'utf8')
// Theorem statements wrap. Reading line by line missed a bound written on a
// continuation line — the theorem was in the file, its bound was never widened,
// and the summary still said every bound had been checked.
//
// The scan stops at `:=`, which is where the statement ends. A first attempt
// ran to the next `theorem` instead and swept up a `List.range` belonging to an
// intervening `def`, attributing a definition's table size to a theorem and
// then declaring the bound an artifact. Widening something the theorem does not
// range over proves nothing about the theorem.
const bounded = []
for (const m of source.matchAll(/^theorem\s+(\w+)([\s\S]*?):=/gm)) {
  const r = m[2].match(/List\.range (\d+)/)
  if (r) bounded.push({ name: m[1], bound: Number(r[1]) })
}

try { execFileSync('lean', ['--version'], { stdio: 'pipe' }) } catch {
  // AN ABSENT INSTRUMENT VOIDS, IT DOES NOT VERDICT — the third gate in this
  // family to need saying so. lean:check already voids on exactly this
  // condition; lean:agrees and this one exited 1, which is the same exit a real
  // refutation produces, so a machine without the toolchain reported that the
  // bounds do NOT survive widening. Nothing had been asked.
  //
  // The note it carried is still true: there is no offline fallback, because
  // the kernel is the thing being asked. That is an argument for evaluating
  // nothing, not for reporting a failure.
  console.log('lean:bounds — VOID: no lean on PATH. No bound was widened and no kernel was asked.')
  console.log('              Whether any bound is load-bearing is unknown here, not refuted.')
  console.log('              The committed record is left alone; run where the toolchain is.')
  process.exit(0)
}

const TMP = join(ROOT, 'lean/.bounds-probe.lean')
/** Widen ONE theorem's bound and ask the kernel. */
function widen(name, bound) {
  const widened = source.split('\n').map((l) =>
    l.startsWith(`theorem ${name}`) ? l.replace(`List.range ${bound}`, `List.range ${bound * WIDEN}`) : l).join('\n')
  try {
    writeFileSync(TMP, `set_option maxRecDepth 1000000\n${widened}\n`)
    execFileSync('lean', [TMP], { stdio: 'pipe', timeout: 300_000 })
    return { verdict: 'survived-one-widening' }
  } catch (e) {
    const said = `${e.stdout ?? ''}${e.stderr ?? ''}`
    // A resource limit refutes nothing. Saying otherwise would mark honest
    // theorems load-bearing, which is the confident wrong answer this avoids.
    if (/maximum recursion depth|deterministic timeout|deep recursion/.test(said) || e.killed) {
      return { verdict: 'inconclusive', why: 'the evaluator could not read the widened form' }
    }
    if (/proved that the proposition[\s\S]*is false/.test(said)) return { verdict: 'load-bearing' }
    return { verdict: 'inconclusive', why: (said.split('\n')[0] || e.message).slice(0, 120) }
  } finally { rmSync(TMP, { force: true }) }
}

const results = {}
for (const { name, bound } of bounded) {
  const r = widen(name, bound)
  results[name] = { bound, widenedTo: bound * WIDEN, ...r }
  console.log(`  ${name.padEnd(26)} ${bound} -> ${bound * WIDEN}  ${r.verdict}${r.why ? ` (${r.why})` : ''}`)
}

const named = source.split('\n').filter((l) => /^theorem/.test(l) && !/List\.range/.test(l)).length
const record = {
  what: 'Each numeric bound was widened and the kernel re-asked. survived-one-widening = the bound held when widened once, which is EVIDENCE that it is scaffolding and not proof: one widening is one sample, and a statement can survive because the property is universal or because the new elements happen to satisfy it. load-bearing = the bound is the theorem. inconclusive = the evaluator could not read the widened form, which refutes nothing.',
  doesNotEstablish: 'whether any prose over-claims. That happens only when a sentence ranges wider than the real domain, and nothing here reads a sentence.',
  inputsFingerprint: FINGERPRINT,
  widenFactor: WIDEN,
  theoremsOverNamedDomains: named,
  notWidenedBecause: 'a named domain IS the object; adding an element makes it a different claim, not a wider one',
  bounds: results,
}
const next = JSON.stringify(sealRecord(record), null, 2) + '\n'
const tally = Object.values(results).reduce((a, r) => ({ ...a, [r.verdict]: (a[r.verdict] ?? 0) + 1 }), {})
console.log(`lean:bounds — ${bounded.length} numeric bound(s) widened x${WIDEN}: ${Object.entries(tally).map(([k, v]) => `at least ${v} ${k}`).join(', ')}; ${named} theorem(s) over named domains were not widened`)

if (Object.values(results).some((r) => r.verdict === 'inconclusive')) {
  console.error('lean:bounds FAIL — a bound could not be decided when widened. Inconclusive is not a pass.')
  process.exit(1)
}
if (CHECK) {
  if (readFileSync(LEDGER, 'utf8') !== next) {
    console.error('lean:bounds FAIL — the recorded verdicts are not what the kernel says today; run npm run lean:bounds')
    process.exit(1)
  }
  console.log('lean:bounds ok — every bound is the kind the ledger records it as')
} else {
  writeFileSync(LEDGER, next)
  console.log(`lean:bounds — wrote lean/bounds.json`)
}
