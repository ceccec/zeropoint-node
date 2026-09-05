/**
 * lean:agrees — bind the TypeScript to the Lean kernel, not to a comment.
 *
 * `lean:check` proves the .lean files are accepted and that the ledger names
 * theorems that exist. Nothing checked that the VALUES the Lean reasons about
 * are the values the shipped code computes. So `lean/DigitSpace.lean` could say
 * `def orbit := [1, 2, 4, 8, 7, 5]`, `src/0/index.ts` could say something else,
 * and every theorem would still pass — about a digit space nobody ships.
 *
 * It nearly happened in the other direction. `dr` carried the comment "the
 * closed form the TypeScript uses". It is not, at zero: ℕ subtraction truncates
 * so `dr 0 = 1`, while `digitalRoot(0)` returns `9`. Every theorem was guarded,
 * so nothing proved was false — but the stated correspondence was, and a reader
 * porting `dr` unguarded inherits the error. That is now `drTS` plus two
 * theorems, and this script keeps the pairing honest.
 *
 * HOW IT ASKS. The pairing is declared in the Lean source itself, as
 * `agrees-with: <tsExport>` (optionally `on <lo>..<hi>` for a function), so the
 * label and the check move together: rename the export and this fails.
 *
 * The Lean side is obtained by RUNNING LEAN — `#eval` appended to a copy of the
 * file — never by re-implementing the definition in JavaScript. That is not
 * fastidiousness. The first version of this measurement did transcribe `dr` into
 * JS, and got it wrong, because JS `%` is remainder and Lean's is modulo on ℕ;
 * it reported a disagreement that was the instrument's, not the code's. An
 * arbiter you paraphrase is not an arbiter.
 *
 *   npm run lean:agrees
 *
 * Exit 0 = every declared pairing holds, evaluated by the Lean kernel today.
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = join(import.meta.dirname, '..')
const SRC = join(ROOT, 'lean/DigitSpace.lean')
const source = readFileSync(SRC, 'utf8')

// `agrees-with: NAME` and optionally `on LO..HI`, attached to the next def.
const pairs = []
for (const m of source.matchAll(/agrees-with:\s*(\w+)(?:\s+on\s+(\d+)\.\.(\d+))?[\s\S]*?\ndef (\w+)/g)) {
  pairs.push({ ts: m[1], lo: m[2] === undefined ? null : Number(m[2]), hi: m[2] === undefined ? null : Number(m[3]), lean: m[4] })
}

let hasLean = true
try { execFileSync('lean', ['--version'], { stdio: 'pipe' }) } catch { hasLean = false }
if (!hasLean) {
  // AN ABSENT INSTRUMENT VOIDS, IT DOES NOT VERDICT.
  //
  // This exited 1 — the same exit a genuine disagreement produces — so a
  // machine without the toolchain reported that the pairings DISAGREE, which
  // nothing had observed. It failed every CI run and the publish workflow with
  // it, and the two failures were indistinguishable in the log.
  //
  // The design note it carried is still right: there is no offline fallback,
  // because a paraphrase of the arbiter is not the arbiter. That argues for
  // evaluating NOTHING here, not for reporting a refutation. lean:check meets
  // the identical condition in the identical file and voids; this now matches
  // it, loudly, and says precisely what was not evaluated.
  console.log(`lean:agrees — VOID: no lean on PATH. ${pairs.length} declared pairing(s) NOT evaluated.`)
  console.log('              Whether the TypeScript and the Lean agree is unknown here, not confirmed')
  console.log('              and not refuted. Run where the toolchain is; absence is not a reading.')
  for (const p of pairs) console.log(`                ${p.ts} ~ ${p.lean}${p.lo === null ? '' : ` on ${p.lo}..${p.hi}`}`)
  process.exit(0)
}

// Ask Lean for each value. The file is import-free, so a copy plus #eval lines
// runs standalone.
const evals = pairs.map((p) => (p.lo === null ? `#eval ${p.lean}` : `#eval (List.range ${p.hi + 1}).drop ${p.lo} |>.map ${p.lean}`))
const TMP = join(ROOT, 'lean/.agrees-probe.lean')
// A corrupted definition makes the theorems false, so Lean exits non-zero and
// never reaches the #eval. Caught, because a gate that dies with a stack trace
// on the one input it exists to reject reads like a crash, not a verdict.
let out
try {
  writeFileSync(TMP, `${source}\n\n${evals.join('\n')}\n`)
  out = execFileSync('lean', [TMP], { encoding: 'utf8', timeout: 180_000 })
} catch (e) {
  const said = `${e.stdout ?? ''}${e.stderr ?? ''}`.trim()
  console.error('lean:agrees FAIL — the Lean kernel rejected DigitSpace.lean, so there are no values to compare.')
  console.error(said ? said.split('\n').slice(0, 12).map((l) => `  ${l}`).join('\n') : `  ${e.message}`)
  process.exit(1)
} finally { rmSync(TMP, { force: true }) }

// Lean wraps a long `#eval` across lines, so the answers are read from the
// whole stream as bracket groups in order, not line by line.
const answers = (out.replace(/\s+/g, '').match(/\[[^\]]*\]/g) ?? [])
if (answers.length !== pairs.length) {
  console.error(`lean:agrees FAIL — asked Lean for ${pairs.length} value(s) and got ${answers.length} back:\n${out}`)
  process.exit(1)
}

const ts = await import(pathToFileURL(join(ROOT, 'src/0/index.ts')).href)
const problems = []
let held = 0
for (const [i, p] of pairs.entries()) {
  const fromLean = JSON.parse(answers[i])
  const exp = ts[p.ts]
  if (exp === undefined) { problems.push(`${p.lean}: declares agrees-with ${p.ts}, which src/0/index.ts does not export`); continue }
  const fromTs = p.lo === null
    ? [...exp]
    : Array.from({ length: p.hi - p.lo + 1 }, (_, k) => exp(p.lo + k))
  if (JSON.stringify(fromLean) === JSON.stringify(fromTs)) { held++; continue }
  const where = p.lo === null ? '' : ` over ${p.lo}..${p.hi}`
  const first = fromLean.findIndex((v, k) => v !== fromTs[k])
  problems.push(`${p.lean} ↔ ${p.ts}${where}: first differs at index ${first} — Lean ${fromLean[first]}, TypeScript ${fromTs[first]}\n    lean: ${JSON.stringify(fromLean)}\n    ts:   ${JSON.stringify(fromTs)}`)
}

console.log(`lean:agrees — ${pairs.length} pairing(s) declared in the Lean source; ${held} evaluated equal by the Lean kernel`)
for (const p of pairs) console.log(`  ${p.lean.padEnd(7)} ↔ ${p.ts}${p.lo === null ? '' : ` on ${p.lo}..${p.hi}`}`)
if (problems.length) {
  console.error(`lean:agrees FAIL — ${problems.length} pairing(s) do not hold:`)
  for (const p of problems) console.error(`  ${p}`)
  process.exit(1)
}
console.log('lean:agrees ok — every value the theorems reason about is the value the package computes')
