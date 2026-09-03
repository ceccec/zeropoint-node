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

const ROOT = join(import.meta.dirname, '..')
const SRC = join(ROOT, 'lean/DigitSpace.lean')
const LEDGER = join(ROOT, 'lean/bounds.json')
const CHECK = process.argv.includes('--check')
const WIDEN = 4 // multiply every numeric bound by this

const source = readFileSync(SRC, 'utf8')
const bounded = []
for (const line of source.split('\n')) {
  const m = line.match(/^theorem (\w+)[\s\S]*?List\.range (\d+)/)
  if (m) bounded.push({ name: m[1], bound: Number(m[2]) })
}

try { execFileSync('lean', ['--version'], { stdio: 'pipe' }) } catch {
  console.error('lean:bounds FAIL — no lean on PATH; this check has no offline fallback, because the kernel is the thing being asked')
  process.exit(1)
}

const TMP = join(ROOT, 'lean/.bounds-probe.lean')
/** Widen ONE theorem's bound and ask the kernel. */
function widen(name, bound) {
  const widened = source.split('\n').map((l) =>
    l.startsWith(`theorem ${name}`) ? l.replace(`List.range ${bound}`, `List.range ${bound * WIDEN}`) : l).join('\n')
  try {
    writeFileSync(TMP, `set_option maxRecDepth 1000000\n${widened}\n`)
    execFileSync('lean', [TMP], { stdio: 'pipe', timeout: 300_000 })
    return { verdict: 'artifact' }
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
  what: 'Each numeric bound was widened and the kernel re-asked. artifact = the bound was scaffolding for `decide` and a universal beside it is honest. load-bearing = the bound is the theorem. inconclusive = the evaluator could not read the widened form, which refutes nothing.',
  doesNotEstablish: 'whether any prose over-claims. That happens only when a sentence ranges wider than the real domain, and nothing here reads a sentence.',
  widenFactor: WIDEN,
  theoremsOverNamedDomains: named,
  notWidenedBecause: 'a named domain IS the object; adding an element makes it a different claim, not a wider one',
  bounds: results,
}
const next = JSON.stringify(record, null, 2) + '\n'
const tally = Object.values(results).reduce((a, r) => ({ ...a, [r.verdict]: (a[r.verdict] ?? 0) + 1 }), {})
console.log(`lean:bounds — ${bounded.length} numeric bound(s) widened x${WIDEN}: ${Object.entries(tally).map(([k, v]) => `${v} ${k}`).join(', ')}; ${named} theorem(s) over named domains were not widened`)

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
