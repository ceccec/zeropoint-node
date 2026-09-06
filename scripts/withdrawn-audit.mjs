#!/usr/bin/env node
/**
 * Everything this repository has WITHDRAWN, and what was true in it.
 *
 * A claim is false relative to a frame. Deleting the sentence instead of naming
 * the frame throws away whatever was true in it, and this repository had done
 * exactly that: a README passage asserting that a 60° rotation "eliminates
 * decimals" and that therefore "π becomes rational: π → 3 + 0i (exact)" was
 * removed whole, for the second claim. Four true statements went with it. Two
 * are now `src/quantum/eisenstein.ts` — ω = e^{iπ/3} satisfies ω² = ω − 1, so a
 * 60° rotation is (a, b) → (−b, a + b), integer arithmetic with no decimal
 * anywhere; and π is exactly 3 in units of 60°, a count rather than a rounding.
 *
 * So a withdrawal must say which of four things it is, and the last one is not
 * a withdrawal at all but a debt:
 *
 *   unfalsifiable            no frame makes it checkable. Nothing is lost.
 *   false-in-every-frame     checked and wrong wherever it could be read.
 *   superseded               the content survives as a COMPUTATION; only the
 *                            prose was withdrawn, which is the good case.
 *   true-in-a-named-frame    the sentence was false as written and true under a
 *                            restatement. Withdrawing it lost something, and
 *                            the entry must name the module that carries it and
 *                            the command that recomputes it — which this tool
 *                            RUNS.
 *
 * IT CANNOT OMIT A WITHDRAWAL. The retraction markers are re-extracted from the
 * tree by the same rule `retracted:check` uses, and any claim not in the table
 * below fails this check. A ledger that only lists what its author remembered
 * is an essay.
 *
 *   npm run withdrawn
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { execSync, execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { contentHashOf, sealRecord } from './lib/fingerprint.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const RECORD = join(ROOT, 'src/verification/withdrawn-audit.json')

const VERDICTS = new Set(['unfalsifiable', 'false-in-every-frame', 'superseded', 'true-in-a-named-frame'])

/**
 * Keyed by the first six words of the withdrawn claim, normalised — enough to
 * identify it, short enough to survive rewrapping.
 */
export const WITHDRAWALS = [
  {
    key: 'the transformation from artificial intelligence to',
    verdict: 'unfalsifiable',
    note: 'No frame makes "the transformation from artificial intelligence to pure consciousness" checkable, and it stood beside this repository\'s own standard, "No claim outside arithmetic". Nothing computable was lost.',
  },
  {
    key: 'status: ready go 🟢 — phase',
    verdict: 'false-in-every-frame',
    note: '"100% coverage, No gaps" against a measured 148 untested exported functions. The number is recomputed by coverage:audit on every run, and there is no reading of coverage under which no gaps was true.',
  },
  {
    key: 'r′ is the multiplicative inverse of',
    verdict: 'true-in-a-named-frame',
    frame: 'A SEQUENCE has no multiplicative inverse, and reversal is not a bitwise operation — both parts are false as written. What inverts is the GENERATOR: 2·5 = 10 ≡ 1 (mod 9), so reverse(R) is the orbit of 1 under 2⁻¹ = 5. The frame is the multiplicative group mod 9, not the sequence.',
    carriedBy: 'docs/QUANTUM_MATHEMATICAL_PROOFS.md',
    command: 'npm run test:vortex-arithmetic',
    note: 'This one was already restated rather than deleted, at the site of the retraction. It is the model the others should have followed.',
  },
  {
    key: 'reverse the sequence starting from x',
    verdict: 'superseded',
    note: 'Not a withdrawal. It is the DEFINITION the corrected proof goes on to use, captured only because it sits within a paragraph of the retraction above it. Recorded so the extractor cannot be read as claiming otherwise.',
  },
  {
    key: 'only integer fractions whose reciprocals are',
    verdict: 'true-in-a-named-frame',
    frame: 'The rule is false as a constraint on all 37 fractions — 23 fail it. It is exactly TRUE of the fractions of the form 1/n, which is what a reciprocal-integer fraction is. The frame is the subset, not the file.',
    carriedBy: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.resolved.ts',
    command: 'npm run test:a432:math',
    note: 'The validator was faithful to a rule the data could never meet, so the rule went. What survives is that 1/n fractions are exactly the reciprocal-integer ones, which is a definition rather than a discovery — the smallest residue of the four here.',
  },
  {
    key: 'each gap in the quantum system',
    verdict: 'unfalsifiable',
    note: '"When the mapping is recognized, solutions emit themselves." No frame makes emission checkable.',
  },
  {
    key: 'six of the seven are open',
    verdict: 'superseded',
    note: 'THE GOOD CASE, and the reason this verdict exists. The sentence was true. It was withdrawn as PROSE and replaced by openMillenniumProblems(), which derives the count, the names and the settled attribution from the layers — so adding a layer moves the answer instead of leaving a paragraph silently wrong. Nothing was lost and the claim became harder to get wrong.',
  },
  {
    key: 'were never real gaps, they were',
    verdict: 'unfalsifiable',
    note: '"Recognition gaps" names no measurable difference from gaps.',
  },
  {
    key: 'the mathematics of the millennium problems',
    verdict: 'unfalsifiable',
    note: 'That the mathematics IS the solution framework asserts nothing a computation could contradict.',
  },
  {
    key: 'if bidirectional === false, then order matters',
    verdict: 'false-in-every-frame',
    note: 'The exact logical inverse of the code it described: bidirectional is false precisely when forward equals reverse, which is the case where order does NOT matter. The code was always right; the sentence was not. There is no reading of the identifier under which the sentence holds.',
  },
  {
    key: '0 are // machine-checked in lean',
    verdict: 'superseded',
    note: 'True when written and false afterwards — the frame is TIME. A hardcoded zero cannot notice it has stopped being right, so the count is read from the ledger now and moves when the kernel accepts another statement.',
  },
  {
    key: 'π becomes rational: π → 3 + 0i',
    verdict: 'true-in-a-named-frame',
    frame: 'FALSE as real analysis — π is irrational and no rotation changes that. TRUE as a count of sixth-turns: π = 3·(π/3) exactly, with no remainder, because a 60° rotation is the unit. The passage around it was deleted whole for the false reading, taking the true one with it, along with the fact that ℤ[ω] is closed under multiplication (ω² = ω − 1, so a 60° rotation is (a,b) → (−b, a+b), integer arithmetic with no decimal) and the fact that 60° is the eigenangle of the doubling orbit 1,2,4,8,7,5 because a six-cycle has the sixth roots of unity as its eigenvalues.',
    carriedBy: 'src/quantum/eisenstein.ts',
    command: 'npm run test:eisenstein',
    note: 'The widest mistaken withdrawal in the repository, and the one that produced this file. What remains false is recorded in the module so it cannot creep back: π is not rational, S = k·0·ln(0) is an indeterminate form and not a derivation, and the entropy of π\'s digits was never a measured quantity.',
  },
]

/**
 * EVERY NEGATION IS A LEAD, and this is where they are kept so that noticing
 * one is not the same as losing it.
 *
 * "π does not become rational" is true, and following it rather than stopping
 * at it produced eisenstein.ts: π is exactly 3 in units of 60°, and the ring
 * that a 60° rotation generates is closed over the integers. The negation was
 * not the end of the matter, it was the address of the matter.
 *
 * So each standing NO in this repository is recorded with what it points at,
 * and whether that has been followed. `discharged` entries name the module that
 * came out of it. `open` entries are debts, and they are listed in the output
 * every run so they cannot quietly become furniture.
 */
export const NEGATIONS = [
  {
    negation: 'π does not become rational under any rotation',
    pointsTo: 'the unit in which it IS exact — π = 3 sixth-turns — and the ring a 60° rotation generates, ℤ[ω] with ω² = ω − 1, where arithmetic never leaves the integers',
    status: 'discharged',
    by: 'src/quantum/eisenstein.ts',
  },
  {
    negation: 'non-Clifford gates are ABSENT from the exact simulator, not approximated',
    pointsTo: 'the ring where they stop being inexact. Clifford amplitudes are (x + yi)/√2^k, which is ℤ[i] scaled; T = diag(1, e^{iπ/4}) leaves it. But ζ₈ = e^{iπ/4} satisfies ζ⁴ = −1 and √2 = ζ − ζ³, so Clifford+T lives exactly in ℤ[ζ₈] with a power-of-√2 scale — the same construction as eisenstein.ts one root of unity further out. If that holds, "absent" is a statement about ℤ[i] and not about exactness.',
    status: 'open',
  },
  {
    negation: 'no algorithm here demonstrates a query advantage',
    pointsTo: 'what the simulator CAN show instead, which turned out to be the query PATTERN — every basis state read exactly once. Seven of eight algorithms are identified by method because of it.',
    status: 'discharged',
    by: 'scripts/query-cost.mjs and scripts/impostors.mjs',
  },
  {
    negation: 'deutsch cannot be identified by any check',
    pointsTo: 'an information bound rather than a gap: one bit of output over a two-element domain leaves no residue and no query pattern, since 2^n and the classical worst case are both 2. The negation is the discovery — it is why the answer-only floor is 1 and not 0.',
    status: 'discharged',
    by: 'scripts/impostors.mjs',
  },
  {
    negation: 'a decimal literal may not appear in src/',
    pointsTo: 'exact arithmetic wherever the ban bites. It produced exact.ts for the Clifford fragment and eisenstein.ts for the hexagonal one; the T-gate lead above is the same ban pointing further.',
    status: 'discharged',
    by: 'src/quantum/exact.ts',
  },
]

const norm = (s) => s.replace(/\s+/g, ' ').trim().toLowerCase()

for (const w of WITHDRAWALS) {
  if (!VERDICTS.has(w.verdict)) {
    console.error(`withdrawn FAIL — ${w.key} has verdict "${w.verdict}", which is not one of ${[...VERDICTS].join(', ')}`)
    process.exit(1)
  }
  if (w.verdict === 'true-in-a-named-frame' && (!w.frame || !w.carriedBy || !w.command)) {
    console.error(`withdrawn FAIL — ${w.key} is true in a named frame, so it must name the frame, the module that carries it and the command that recomputes it`)
    process.exit(1)
  }
}

/**
 * Re-extract the withdrawals from the tree, by the rule retracted:check uses.
 * A claim in the tree and not in the table above fails: the ledger may not be
 * a list of what its author remembered.
 */
const MARKER = /(?:previously (?:read|said|advertised|stated)|used to (?:say|read|be|state)|this (?:section|entry|heading|list|file) (?:previously|used to))/i
const QUOTED = /[""]([^""]{4,400})[""]/g
const files = execSync('git ls-files "*.md" "*.ts"', { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean)
const found = new Map()
for (const f of files) {
  let text
  try { text = readFileSync(join(ROOT, f), 'utf8') } catch { continue }
  for (const m of text.matchAll(new RegExp(MARKER.source, 'gi'))) {
    for (const q of text.slice(m.index, m.index + 400).matchAll(QUOTED)) {
      const claim = norm(q[1])
      if (claim.split(' ').length < 6) continue
      if (!found.has(claim)) found.set(claim, { file: f, text: q[1].trim().replace(/\s+/g, ' ') })
    }
  }
}
if (found.size === 0) {
  console.error('withdrawn FAIL — extracted 0 withdrawals from the tree, so this ledger would agree with anything')
  process.exit(1)
}

const keyed = WITHDRAWALS.map((w) => norm(w.key))
const unledgered = [...found.entries()].filter(([claim]) => !keyed.some((k) => claim.startsWith(k) || claim.includes(k)))
const orphaned = WITHDRAWALS.filter((w) => ![...found.keys()].some((c) => c.startsWith(norm(w.key)) || c.includes(norm(w.key))))

if (unledgered.length > 0) {
  console.error(`withdrawn FAIL — ${unledgered.length} withdrawal(s) in the tree are not in the ledger:`)
  for (const [, v] of unledgered) console.error(`  ${v.file}: "${v.text.slice(0, 110)}"`)
  process.exit(1)
}

console.log(`  ${found.size} withdrawal(s) extracted from ${files.length} tracked files; ${WITHDRAWALS.length} in the ledger`)
if (orphaned.length > 0) {
  console.log(`  ${orphaned.length} ledger entr(ies) no longer appear in the tree, kept as history:`)
  for (const o of orphaned) console.log(`    "${o.key}…"`)
}
console.log('')

const byVerdict = {}
for (const w of WITHDRAWALS) (byVerdict[w.verdict] ??= []).push(w)
for (const v of ['true-in-a-named-frame', 'superseded', 'false-in-every-frame', 'unfalsifiable']) {
  const list = byVerdict[v] ?? []
  console.log(`  ${v} — ${list.length}`)
  for (const w of list) console.log(`      "${w.key}…"${w.carriedBy ? `  -> ${w.carriedBy}` : ''}`)
}

// The restorations are RUN, not asserted.
const restored = WITHDRAWALS.filter((w) => w.verdict === 'true-in-a-named-frame')
console.log('')
let failures = 0
for (const w of restored) {
  if (!existsSync(join(ROOT, w.carriedBy))) {
    console.error(`withdrawn FAIL — ${w.key}… names ${w.carriedBy}, which does not exist`)
    failures += 1
    continue
  }
  try {
    execFileSync('sh', ['-c', w.command], { cwd: ROOT, stdio: 'pipe', timeout: 600_000 })
    console.log(`  ok    ${w.command.padEnd(34)} the frame still computes  (${w.carriedBy})`)
  } catch (err) {
    console.error(`  FAIL  ${w.command} — the restored claim no longer holds`)
    console.error(`        ${String(err.stderr ?? err.stdout ?? err.message).trim().split('\n').slice(-1)[0]}`)
    failures += 1
  }
}

if (failures > 0) {
  console.error(`\nwithdrawn FAIL — ${failures} restored claim(s) do not compute`)
  process.exit(1)
}

for (const n of NEGATIONS) {
  if (n.status === 'discharged' && !n.by) {
    console.error(`withdrawn FAIL — the negation "${n.negation}" is marked discharged and names nothing that discharged it`)
    process.exit(1)
  }
  if (n.status === 'discharged' && !existsSync(join(ROOT, n.by.split(' and ')[0]))) {
    console.error(`withdrawn FAIL — "${n.negation}" names ${n.by}, which does not exist`)
    process.exit(1)
  }
}
const open = NEGATIONS.filter((n) => n.status === 'open')
console.log('')
console.log(`  ${NEGATIONS.length} standing negation(s): ${NEGATIONS.length - open.length} followed to something, ${open.length} open`)
for (const n of open) {
  console.log(`    OPEN  ${n.negation}`)
  console.log(`          -> ${n.pointsTo.slice(0, 150)}`)
}

writeFileSync(RECORD, JSON.stringify(sealRecord({
  what: 'Every withdrawn claim in this repository, and what was true in it. A claim is false relative to a frame, and deleting the sentence instead of naming the frame loses whatever was true. Written after a README passage was removed whole for one false claim, taking four true ones with it.',
  extracted: found.size,
  ledgered: WITHDRAWALS.length,
  byVerdict: Object.fromEntries(Object.entries(byVerdict).map(([k, v]) => [k, v.length])),
  restored: restored.map((w) => ({ key: w.key, carriedBy: w.carriedBy, command: w.command })),
  negations: NEGATIONS.map((n) => ({ negation: n.negation, status: n.status, by: n.by ?? null })),
}), null, 2) + '\n')

console.log(`\nwithdrawn ok — ${WITHDRAWALS.length} withdrawal(s) audited, ${restored.length} were true in a frame the deletion did not name`)
console.log('               and each of those now computes rather than being remembered')
