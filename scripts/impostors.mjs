#!/usr/bin/env node
/**
 * Every quantum algorithm must be identified by its METHOD, not by its answer.
 *
 * law-mutations corrupts a line and requires the suite over it to fail. That
 * catches an implementation that has been BROKEN. It cannot catch one that has
 * been REPLACED by something cheaper which returns the same answers, and the
 * whole claim of this package's quantum surface is about method rather than
 * result — a classical routine that outputs the right factorisation is not
 * Shor's algorithm, and a check that cannot tell them apart is measuring
 * arithmetic.
 *
 * This was not hypothetical. `shor:check` swept every modulus and every base,
 * verified that no answer was wrong and that every refusal was one of the three
 * ways Shor's is known to fail, and passed CLASSICAL TRIAL DIVISION cleanly:
 * 358 correct, 0 wrong, 0 unexplained. The check verified the answer. The
 * sentence above it claimed the method.
 *
 * So each entry below replaces one algorithm's body with a classical impostor
 * that returns the SAME ANSWERS by another route, and runs the check that is
 * supposed to notice. Two outcomes, and both are declared in advance:
 *
 *   identifiedBy   the named check MUST catch the impostor. If it does not, the
 *                  declaration is false and this fails.
 *
 *   answerOnly     the check is known to verify the answer alone, and the
 *                  reason is stated. The impostor MUST survive. If it is caught,
 *                  the declaration UNDERSTATES the check — the involution
 *                  under-claims applies to seals, and it applies here too — and
 *                  that also fails, because a disclaimer nobody can trust is
 *                  worse than none.
 *
 * THE answerOnly COUNT IS A CEILING THAT ONLY MOVES DOWN. It is recorded, and a
 * run that raises it fails. Declaring an algorithm answer-only is honest; doing
 * it more often over time is drift.
 *
 * WHAT THIS FOUND ON ITS FIRST RUN, which is why the ceiling starts high:
 * `bernsteinVazirani(n, hidden)` and `simon(n, hidden)` are HANDED the value
 * they are said to recover, and the only assertion over each is that the return
 * equals what was passed in. `return hidden` passes both. That is not a defect
 * in the implementations — they do run the circuits — it is a defect in every
 * check over them, and it was invisible until something tried to impersonate
 * them.
 *
 *   npm run impostors
 */
import { readFileSync, writeFileSync, rmSync, mkdirSync, cpSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createHash } from 'node:crypto'
import { tmpdir } from 'node:os'
import { contentHashOf, sealRecord } from './lib/fingerprint.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const RECORD = join(ROOT, 'src/verification/impostors.json')
const CHECK = process.argv.includes('--check')

/**
 * FINGERPRINT MORE THAN YOU READ. Six impersonations, each running a whole
 * check over a cloned tree, is minutes — and shor:check inside the clone sees a
 * fresh fingerprint and re-sweeps every input. The chain cannot carry that on
 * every run, and a check too slow to run is a check that gets removed.
 *
 * So the record is sealed against the sources that could change the verdict:
 * the algorithms being impersonated, the checks doing the catching, and this
 * table. A corrupted record FAILS rather than quietly regenerating.
 */
const SOURCES = [
  'src/quantum/algorithms.ts', 'src/quantum/simulator.ts', 'src/quantum/index.ts',
  'scripts/quantum-sim.mjs', 'scripts/shor-exhaustive.mjs', 'scripts/impostors.mjs',
]

/**
 * An impostor must be ANSWER-EQUIVALENT or it proves nothing: if it returns
 * something different, a failure only says the check noticed a wrong answer,
 * which law-mutations already establishes. Each one below is a classical
 * routine producing what the check asserts.
 */
export const IMPOSTORS = [
  {
    algorithm: 'bernsteinVazirani',
    module: 'src/quantum/algorithms.ts',
    anchor: 'export function bernsteinVazirani(n: number, hidden: number): number {',
    impostor: '  return hidden // IMPOSTOR: no query, no circuit, no superposition',
    check: 'quantum:sim',
    samples: [[4, 0b1011], [3, 0b101], [5, 0b11010]],
    answerOnly: 'the function receives `hidden` as an argument and the only assertion is that it returns it, so returning the argument passes. A one-query claim cannot be tested through an interface that is given the answer; it needs an ORACLE parameter whose call count can be observed.',
  },
  {
    algorithm: 'simon',
    module: 'src/quantum/algorithms.ts',
    anchor: 'export function simon(n: number, hidden: number): number {',
    impostor: '  return hidden // IMPOSTOR: no oracle, no linear system, no sampling',
    check: 'quantum:sim',
    samples: [[3, 0b101], [4, 0b1001]],
    answerOnly: 'same shape as bernsteinVazirani — the hidden mask is passed in and asserted to come back out.',
  },
  {
    algorithm: 'deutschJozsa',
    module: 'src/quantum/algorithms.ts',
    anchor: "export function deutschJozsa(n: number, f: (x: number) => 0 | 1): 'constant' | 'balanced' {",
    impostor: "  { const size = 1 << n; const first = f(0); for (let x = 1; x <= size / 2; x += 1) if (f(x) !== first) return 'balanced'; return 'constant' } // IMPOSTOR: 2^(n-1)+1 classical queries",
    check: 'quantum:sim',
    samples: [[3, (x) => 0], [3, (x) => 1], [3, (x) => x & 1], [4, (x) => (x >> 2) & 1]],
    identifiedBy: 'not by the verdict — it returns one bit, and a classical scan returns the same bit on every input satisfying the promise, so no assertion over the return value could ever separate them. That is a property of the interface. What separates them is HOW the oracle is consulted: applying a phase oracle to a state vector evaluates f on every basis state exactly once, and the classical shortcut stops at the first disagreement, which for f(x)=x&1 is after two calls. quantum:sim now asserts the pattern. This is a signature claim and not an advantage claim — query:cost records that the pattern costs 2^n where classical needs 2^(n-1)+1, which is worse.',
  },
  {
    algorithm: 'grover',
    module: 'src/quantum/algorithms.ts',
    anchor: 'export function grover(n: number, target: number, iterations?: number): Register {',
    impostor: '  { const size = 1 << n; if (target < 0 || target >= size) throw new Error("grover: target out of range"); return { n, amps: Array.from({ length: size }, (_, i) => (i === target ? { re: 1, im: 0 } : { re: 0, im: 0 })) } } // IMPOSTOR: writes the answer into the register',
    check: 'quantum:sim',
    samples: [[3, 5], [3, 0], [4, 11]],
    answerOf: (r) => { const p = r.amps.map((a) => a.re * a.re + a.im * a.im); let k = 0; for (let i = 1; i < p.length; i += 1) if (p[i] > p[k]) k = i; return k },
    identifiedBy: 'quantum:sim now asserts the RESIDUE, not the peak. I first declared this identifiedBy on the assumption it already did, and the harness refuted me on its first run: the assertions were p[target] > 0.9 and target-is-most-probable, which a register holding exactly 1 at the target satisfies more comfortably than Grover does. Two iterations over N=8 are exact rationals — 121/128 on the marked state and 1/128 on each of the other seven — and nothing but that rotation lands there. A delta gives 1 and 0; one iteration gives 25/32 and 1/32.',
  },
  {
    algorithm: 'phaseEstimation',
    module: 'src/quantum/algorithms.ts',
    anchor: 'export function phaseEstimation(t: number, phi: number): number {',
    impostor: '  return Math.round(phi * (1 << t)) & ((1 << t) - 1) // IMPOSTOR: rounds the answer it was given',
    check: 'quantum:sim',
    samples: [[3, 1 / 8], [3, 1 / 4], [3, 3 / 8], [3, 1 / 2]],
    answerOnly: 'phi is an argument and the assertion is that the estimate is near it, so rounding the argument to t bits passes. The algorithm is exactly a rounding-to-t-bits, which is what makes this the hardest of the five to distinguish by result.',
  },
  {
    algorithm: 'shor',
    module: 'src/quantum/algorithms.ts',
    anchor: 'export function shor(N: number, a: number): [number, number] | null {',
    impostor: '  { for (let d = 2; d * d <= N; d += 1) if (N % d === 0) return [d, N / d]; return null } // IMPOSTOR: trial division, which is what actually passed the original check',
    check: 'shor:check',
    // ANSWER-EQUIVALENCE IS JUDGED WHERE THE IMPLEMENTATION ANSWERS. Trial
    // division and Shor's return the same factor pair on every input where
    // Shor's succeeds — the samples below, and 204 others. They part company
    // only where Shor's REFUSES, which is the whole content of the check and
    // precisely what the sample cannot contain: an exhaustive sweep exists to
    // reach the inputs a sample does not.
    samples: [[15, 7], [21, 2], [15, 2], [33, 5], [35, 3]],
    answerOf: (out) => (out === null ? null : [...out].sort((x, y) => x - y)),
    identifiedBy: 'shor:check runs both directions. Verifying that every refusal is one of the three known failure modes does NOT catch this — trial division never refuses a composite, so that arm is vacuous against it, and it passed with 358 correct, 0 wrong, 0 unexplained. The converse arm does: Shor\'s yields a factor from a period r only when r is even and a^(r/2) != -1 mod N, so a period-finder MUST refuse where those fail, and trial division succeeds there in 93 of 434 inputs.',
  },
  {
    algorithm: 'groverSearch',
    module: 'src/quantum/algorithms.ts',
    anchor: 'export function groverSearch(n: number, isMarked: (x: number) => boolean, markedCount?: number): Register | null {',
    impostor: '  { const size = 1 << n; for (let x = 0; x < size; x += 1) if (isMarked(x)) return { n, amps: Array.from({ length: size }, (_, i) => (i === x ? { re: 1, im: 0 } : { re: 0, im: 0 })) }; return null } // IMPOSTOR: classical scan, writing a delta at what it finds',
    check: 'quantum:sim',
    samples: [[4, (x) => x === 11], [3, (x) => x === 3], [5, (x) => x === 20]],
    answerOf: (r) => { if (r === null) return null; const p = r.amps.map((a) => a.re * a.re + a.im * a.im); let k = 0; for (let i = 1; i < p.length; i += 1) if (p[i] > p[k]) k = i; return k },
    identifiedBy: 'the assertions over groverSearch read only the peak, and a delta at the marked item passes them exactly as it did for grover. The separating property is the query pattern: amplification consults the predicate once per element per round, plus once to count, so every element is visited the same number of times. A scan stops at the first marked element and visits the rest zero times.',
  },
  {
    algorithm: 'deutsch',
    module: 'src/quantum/algorithms.ts',
    anchor: "export function deutsch(f0: 0 | 1, f1: 0 | 1): 'constant' | 'balanced' {",
    impostor: "  return f0 === f1 ? 'constant' : 'balanced' // IMPOSTOR: the implementation's own first line",
    check: 'quantum:sim',
    samples: [[0, 0], [0, 1], [1, 0], [1, 1]],
    answerOnly: 'the impostor is line 484 of the implementation. `deutsch` takes the two function VALUES rather than an oracle, and opens with `if (f0 === f1) return \'constant\'` — half of all inputs are answered classically before a gate is applied, and the remaining half are the balanced case, where returning \'balanced\' is the only other option. There is no query to count and no residue to read: with four possible inputs and two possible answers, no check over the return value can distinguish a circuit from a comparison.',
  },
]

const declared = IMPOSTORS.filter((i) => i.answerOnly).length
const identified = IMPOSTORS.filter((i) => i.identifiedBy).length
for (const i of IMPOSTORS) {
  if (Boolean(i.answerOnly) === Boolean(i.identifiedBy)) {
    console.error(`impostors FAIL — ${i.algorithm} declares both answerOnly and identifiedBy, or neither`)
    process.exit(1)
  }
}
if (IMPOSTORS.length === 0) {
  console.error('impostors FAIL — an empty table would report a clean sweep having impersonated nothing')
  process.exit(1)
}

const fingerprint = (() => {
  const h = createHash('sha256')
  for (const f of SOURCES) h.update(f).update(readFileSync(join(ROOT, f)))
  return h.digest('hex').slice(0, 32)
})()

if (CHECK && existsSync(RECORD)) {
  const raw = readFileSync(RECORD, 'utf8')
  let rec = null
  try { rec = JSON.parse(raw) } catch {
    console.error('impostors:check FAIL — the record is not readable JSON')
    process.exit(1)
  }
  if (JSON.stringify(rec, null, 2) + '\n' !== raw) {
    console.error('impostors:check FAIL — the record does not round-trip: its bytes have been altered')
    process.exit(1)
  }
  if (typeof rec.contentHash !== 'string' || contentHashOf(rec) !== rec.contentHash) {
    console.error('impostors:check FAIL — the record does not match its own contentHash')
    process.exit(1)
  }
  if (rec.inputsFingerprint === fingerprint) {
    if (rec.answerOnly !== declared || rec.identifiedByMethod !== identified) {
      console.error(`impostors:check FAIL — the table declares ${declared} answer-only and ${identified} identified, the record says ${rec.answerOnly} and ${rec.identifiedByMethod}`)
      process.exit(1)
    }
    if (rec.results.some((r) => !r.agrees)) {
      console.error('impostors:check FAIL — the recorded run has a declaration that does not match what the checks do')
      process.exit(1)
    }
    console.log(`impostors:check ok — ${identified} algorithm(s) identified by method, ${declared} verified by answer alone (recorded)`)
    console.log(`                    neither the algorithms nor the checks over them have moved (fingerprint ${fingerprint.slice(0, 12)})`)
    process.exit(0)
  }
  console.log('impostors — an algorithm or a check has moved; re-running every impersonation')
}

const TREE = join(process.env.CLAUDE_SCRATCHPAD ?? tmpdir(), `impostors-${process.pid}`)
rmSync(TREE, { recursive: true, force: true })
mkdirSync(TREE, { recursive: true })
for (const dir of ['src', 'scripts']) {
  try { execFileSync('cp', ['-Rc', join(ROOT, dir), join(TREE, dir)], { stdio: 'pipe' }) }
  catch { cpSync(join(ROOT, dir), join(TREE, dir), { recursive: true }) }
}
cpSync(join(ROOT, 'package.json'), join(TREE, 'package.json'))
process.on('exit', () => rmSync(TREE, { recursive: true, force: true }))

// The check is named as an npm script; the command is read from package.json so
// this cannot drift from what the chain actually runs.
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const commandFor = (name) => {
  const cmd = pkg.scripts?.[name]
  if (!cmd) { console.error(`impostors FAIL — no npm script named ${name}`); process.exit(1) }
  return cmd
}

const runInTree = (name) => {
  const cmd = commandFor(name)
  try {
    execFileSync('sh', ['-c', cmd], { cwd: TREE, stdio: 'pipe', timeout: 300_000 })
    return { caught: false }
  } catch (err) {
    return { caught: true, why: String(err.stderr ?? err.stdout ?? err.message).trim().split('\n').slice(-2).join(' ') }
  }
}

// The unmutated tree must PASS every named check, or a "caught" verdict below
// would just be the clone being broken.
const checks = [...new Set(IMPOSTORS.map((i) => i.check))]
for (const name of checks) {
  const base = runInTree(name)
  if (base.caught) {
    console.error(`impostors FAIL — ${name} already fails on the unmutated clone, so nothing it reports is about an impostor`)
    console.error(`  ${base.why}`)
    process.exit(1)
  }
}
console.log(`impostors — ${checks.length} check(s) pass on the unmutated clone; ${IMPOSTORS.length} impersonations to try\n`)

const results = []
let failures = 0
for (const entry of IMPOSTORS) {
  const path = join(TREE, entry.module)
  const original = readFileSync(path, 'utf8')
  const hits = original.split(entry.anchor).length - 1
  if (hits !== 1) {
    console.error(`impostors FAIL — the anchor for ${entry.algorithm} matches ${hits} times, so the impostor would land somewhere unknown`)
    process.exit(1)
  }
  writeFileSync(path, original.replace(entry.anchor, `${entry.anchor}\n${entry.impostor}`))

  /**
   * AN IMPOSTOR THAT RETURNS A DIFFERENT ANSWER IS A MUTATION, AND PROVES
   * NOTHING HERE. law-mutations already establishes that the checks notice
   * wrong answers; the whole question at this file is whether they notice a
   * RIGHT answer arrived at by another route. So the two implementations are
   * run against the same inputs and required to agree before the check is
   * consulted at all.
   *
   * This is not a formality. My phaseEstimation impostor returned the phase as
   * a FRACTION where the real one returns the integer k, so quantum:sim caught
   * it — and I read that as the check identifying the method, wrote it up as a
   * false declaration, and would have shipped the conclusion. It was catching
   * arithmetic. The `answerOf` projection exists for grover, whose answer is
   * the most probable index rather than the whole register.
   */
  const answerOf = entry.answerOf ?? ((x) => x)
  const realMod = await import(pathToFileURL(join(ROOT, entry.module)).href)
  const fakeMod = await import(`${pathToFileURL(path).href}?impostor=${encodeURIComponent(entry.algorithm)}`)
  for (const args of entry.samples ?? []) {
    const want = JSON.stringify(answerOf(realMod[entry.algorithm](...args)))
    const got = JSON.stringify(answerOf(fakeMod[entry.algorithm](...args)))
    if (want !== got) {
      writeFileSync(path, original)
      console.error(`impostors FAIL — the stand-in for ${entry.algorithm} does not return the same answer as the`)
      console.error(`  implementation on ${JSON.stringify(args.map((a) => (typeof a === 'function' ? 'fn' : a)))}: ${want} vs ${got}.`)
      console.error('  That makes it a mutation, not an impostor, and a check that catches it has caught')
      console.error('  a wrong answer rather than a substituted method.')
      process.exit(1)
    }
  }
  if ((entry.samples ?? []).length === 0) {
    writeFileSync(path, original)
    console.error(`impostors FAIL — ${entry.algorithm} declares no samples, so its answer-equivalence is unverified`)
    process.exit(1)
  }

  const out = runInTree(entry.check)
  writeFileSync(path, original)
  if (readFileSync(path, 'utf8') !== original) {
    console.error(`impostors FAIL — could not restore ${entry.module}`)
    process.exit(1)
  }

  const expectedCaught = Boolean(entry.identifiedBy)
  const agrees = out.caught === expectedCaught
  if (!agrees) failures += 1
  results.push({ algorithm: entry.algorithm, check: entry.check, caught: out.caught, expectedCaught, agrees })

  const verdict = out.caught ? 'CAUGHT' : 'survived'
  const mark = agrees ? 'ok' : 'FAIL'
  console.log(`  ${mark.padEnd(4)} ${entry.algorithm.padEnd(20)} ${verdict.padEnd(9)} via ${entry.check}`)
  if (!agrees && expectedCaught) console.log(`       declared identifiedBy, but the impostor passed — the declaration is false`)
  if (!agrees && !expectedCaught) console.log(`       declared answerOnly, but the impostor was caught — the disclaimer understates the check`)
  if (out.caught) console.log(`       ${out.why}`)
}

/**
 * THE RATCHET IS PER-ALGORITHM, BECAUSE A COUNT PUNISHES COVERAGE.
 *
 * This compared totals: if the answer-only count rose, fail. That is wrong in
 * the one direction that matters. Adding `deutsch` to the table — an algorithm
 * whose own first line is `if (f0 === f1) return 'constant'`, answering half
 * its inputs before a gate is applied — raises the count, and a gate that
 * fails when you document a weakness teaches you to stop documenting.
 *
 * What must never happen is REGRESSION: an algorithm recorded as identified by
 * its method must not quietly become answer-only again, which is what happens
 * when someone loosens an assertion. New entries may arrive answer-only.
 */
const previous = existsSync(RECORD) ? JSON.parse(readFileSync(RECORD, 'utf8')) : null
if (previous) {
  const wasIdentified = new Set((previous.results ?? []).filter((r) => r.expectedCaught).map((r) => r.algorithm))
  const regressed = IMPOSTORS.filter((i) => i.answerOnly && wasIdentified.has(i.algorithm)).map((i) => i.algorithm)
  if (regressed.length > 0) {
    console.error(`\nimpostors FAIL — ${regressed.join(', ')} was identified by method and is now answer-only; that never moves backwards`)
    process.exit(1)
  }
}

console.log(`\n  ${identified} algorithm(s) identified by method, ${declared} verified by answer alone`)
console.log('  An answer-only algorithm is not wrong. It is unidentified: any classical routine')
console.log('  returning the same value is indistinguishable from it through every check here.')

if (failures > 0) {
  console.error(`\nimpostors FAIL — ${failures} declaration(s) do not match what the checks actually do`)
  process.exit(1)
}

writeFileSync(RECORD, JSON.stringify(sealRecord({
  what: 'Each quantum algorithm replaced by a classical impostor returning the same answers, and whether the checks over it notice. Written because shor:check passed classical trial division cleanly.',
  answerOnly: declared,
  identifiedByMethod: identified,
  inputsFingerprint: fingerprint,
  results,
}), null, 2) + '\n')
console.log(`\nimpostors ok — every declaration matches what the checks do (answer-only ceiling ${declared})`)
