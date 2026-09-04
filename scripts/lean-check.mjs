#!/usr/bin/env node
/**
 * LEAN IS THE ARBITER. Where the TypeScript ledger and the .lean files
 * disagree, the files win.
 *
 * LEAN_PROOFS holds twelve theorem statements as STRINGS. The .lean files hold
 * twenty-four theorems. Nothing compared them, and they had drifted in three
 * separate ways at once:
 *
 *   NAME DRIFT   three entries named theorems that exist in no file —
 *                pauliX_anticommute_pauliY where the file says pauli_anticomm,
 *                repetition_detects_error where it says
 *                repetition_detects_single_error, surface_code_threshold where
 *                it says surface_code_correctability.
 *   STATUS DRIFT six entries in a constant called LEAN_PROOFS have proofs that
 *                are `sorry` in the file. A sorry is not a proof.
 *   COVERAGE     nineteen theorems in the files are named nowhere in
 *                TypeScript, including the nine this repository can actually
 *                check.
 *
 * So the ledger is DERIVED here rather than maintained by hand, and the three
 * failures above become three failing conditions.
 *
 * WHAT "CHECKED" MEANS, precisely. A file with no imports is run through the
 * Lean kernel and its verdict is the kernel's. A file importing Mathlib cannot
 * be built here — the lakefile pins v4.8.0 against an installed 4.33.1 and the
 * library is a long download — so its theorems are reported `unverifiable-here`
 * rather than assumed either way. Claiming a proof nobody ran is the thing this
 * file exists to stop; so is claiming a failure nobody observed.
 *
 * The receipt is written to lean/ledger.json so that verifying it needs only
 * this package, while producing it needs the toolchain. That split is uuidna's
 * axiom witness, and the reason its trust base can be stated at all.
 *
 *   npm run lean:check    the witness
 *   npm run lean:ledger   rewrite lean/ledger.json from the files
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const LEAN_DIR = join(ROOT, 'lean')
const LEDGER = join(LEAN_DIR, 'ledger.json')
const WRITE = process.argv.includes('--ledger')

const files = readdirSync(LEAN_DIR).filter((f) => f.endsWith('.lean') && f !== 'lakefile.lean').sort()

/** Split a Lean file into its theorems, with the body that follows each. */
function theoremsOf(src) {
  const out = []
  const parts = src.split(/(?=^\s*theorem )/m)
  for (const p of parts) {
    const m = /^\s*theorem\s+([A-Za-z0-9_']+)/.exec(p)
    if (!m) continue
    // The body ends at the next top-level declaration.
    const body = p.split(/(?=^\s*(?:theorem|def|axiom|\/--) )/m)[0]
    out.push({ name: m[1], sorry: /\bsorry\b/.test(body) })
  }
  return out
}

/**
 * WHAT A PROOF IS ALLOWED TO REST ON.
 *
 * "No `sorry` in the body" is the weak reading of proven, and it was the only
 * one this checked. A theorem can invoke a lemma that was closed with `sorry`
 * and inherit the vacuity without the word appearing anywhere near it — the
 * kernel accepts the file, the body is clean, and nothing is established. The
 * strong reading asks the kernel what the proof term actually depends on.
 *
 * `propext` and `Quot.sound` arrive through list-membership decidability and
 * are part of Lean's trusted core. `Classical.choice` is deliberately NOT here:
 * it is a legitimate axiom and nothing in this repository uses it, so a proof
 * that starts to would be a change worth making on purpose rather than by
 * accident. Adding it is a decision to record, not a failure to route around.
 *
 * `sorryAx` can never be added. A theorem depending on it is not proven, and
 * that is what the word means.
 */
const ALLOWED_AXIOMS = new Set(['propext', 'Quot.sound'])
const axiomProblems = []

const leanAvailable = (() => {
  try { execFileSync('lean', ['--version'], { stdio: 'pipe' }); return true } catch { return false }
})()

const theorems = []
for (const f of files) {
  const src = readFileSync(join(LEAN_DIR, f), 'utf8')
  const selfContained = !/^\s*import\s+/m.test(src)
  let kernel = 'unverifiable-here'
  let detail = selfContained ? 'not run' : 'imports a library this repository cannot build here'
  if (selfContained && leanAvailable) {
    try {
      execFileSync('lean', [join(LEAN_DIR, f)], { stdio: 'pipe', timeout: 120_000 })
      kernel = 'accepted'
      detail = 'the Lean kernel accepted this file with no errors'
    } catch (e) {
      kernel = 'rejected'
      detail = String(e.stdout ?? e.message).slice(0, 200)
    }
  } else if (selfContained && !leanAvailable) {
    detail = 'no lean on PATH; install the toolchain to verify'
  }
  // Ask the kernel what each clean theorem rests on. One probe file per source
  // file: the #print axioms lines are appended to a copy, so the source is
  // never written to.
  const axiomsOf = new Map()
  const clean = theoremsOf(src).filter((t) => !t.sorry)
  if (kernel === 'accepted' && clean.length) {
    const probe = join(LEAN_DIR, `.axioms-probe-${process.pid}.lean`)
    try {
      writeFileSync(probe, `${src}\n\n${clean.map((t) => `#print axioms ${t.name}`).join('\n')}\n`)
      const said = execFileSync('lean', [probe], { encoding: 'utf8', timeout: 180_000 })
      for (const line of said.split('\n')) {
        const none = /^'([^']+)' does not depend on any axioms/.exec(line)
        if (none) { axiomsOf.set(none[1], []); continue }
        const some = /^'([^']+)' depends on axioms: \[([^\]]*)\]/.exec(line)
        if (some) axiomsOf.set(some[1], some[2].split(',').map((a) => a.trim()).filter(Boolean))
      }
    } catch (e) {
      axiomProblems.push(`${f}: the kernel accepted the file but #print axioms could not be run, so no theorem in it can be called proven — ${String(e.stdout ?? e.message).slice(0, 120)}`)
    } finally { rmSync(probe, { force: true }) }
  }

  for (const t of theoremsOf(src)) {
    const axioms = axiomsOf.get(t.name)
    // A clean body in an accepted file is not enough: the proof must also rest
    // on nothing outside the declared set. An unanswered probe is not a pass.
    const restsWell = !t.sorry && kernel === 'accepted' && axioms !== undefined && axioms.every((a) => ALLOWED_AXIOMS.has(a))
    theorems.push({
      name: t.name,
      file: f,
      ...(axioms === undefined ? {} : { axioms }),
      // A theorem is PROVEN only when the kernel accepted the file AND the
      // proof contains no sorry. Either alone is not enough, and treating them
      // as interchangeable is how a file full of sorries came to be headed
      // "All theorems are formally proven".
      status: t.sorry ? 'sorry'
        : kernel === 'rejected' ? 'rejected'
        : kernel !== 'accepted' ? 'unverifiable-here'
        : restsWell ? 'proven'
        : 'rests-on-more',
      detail,
    })
  }
}

const byStatus = (s) => theorems.filter((t) => t.status === s)
const proven = byStatus('proven')
const unchecked = theorems.filter((t) => t.status !== 'proven')

// ---- the ledger this repository states in TypeScript ----------------------
const v = await import(pathToFileURL(join(ROOT, 'src/verification/index.ts')).href)
/**
 * A LEAN_PROOFS key is this repository's identifier; the theorem name lives
 * INSIDE the Lean source string it holds. Comparing keys reported three name
 * drifts that were not drift at all — `pauliX_anticommute_pauliY` carries
 * `theorem pauli_anticomm`, which is exactly right. The name that must match a
 * file is the declared one.
 */
const declaredIn = (src) => (/theorem\s+([A-Za-z0-9_']+)/.exec(String(src)) ?? [])[1] ?? null
const stated = Object.entries(v.LEAN_PROOFS).map(([key, src]) => ({ key, name: declaredIn(src) }))
const known = new Map(theorems.map((t) => [t.name, t]))

const problems = [...axiomProblems]
for (const { key, name } of stated) {
  if (!name) { problems.push(`LEAN_PROOFS.${key} holds a string that declares no theorem`); continue }
  const t = known.get(name)
  if (!t) { problems.push(`LEAN_PROOFS.${key} declares theorem "${name}" and no .lean file contains it`); continue }
  if (t.status === 'rejected') problems.push(`LEAN_PROOFS.${key} names "${name}" and the kernel REJECTED ${t.file}`)
  // A sorry is not a proof, and this is the condition that says so. It is
  // cleared by recording the honest status beside the statement, not by
  // pretending the sorry is not there.
  if (t.status === 'sorry' && v.LEAN_STATUS?.[key] !== 'sorry') {
    problems.push(`LEAN_PROOFS.${key} presents "${name}" as a proof, ${t.file} closes it with sorry, and LEAN_STATUS does not record that`)
  }
}
// Coverage lives in the generated ledger, which is the record TypeScript keeps
// of the files. Requiring every theorem to appear in LEAN_PROOFS by hand would
// be maintaining the second copy this check exists to abolish.
const inLedger = new Set((existsSync(LEDGER) ? JSON.parse(readFileSync(LEDGER, 'utf8')).entries : []).map((e) => e.name))
for (const t of theorems) {
  if (!inLedger.has(t.name)) problems.push(`${t.file} declares "${t.name}" and lean/ledger.json does not record it — run npm run lean:ledger`)
}

/**
 * AN ABSENT INSTRUMENT VOIDS; IT DOES NOT VERDICT.
 *
 * Without the toolchain this reported every theorem `unverifiable-here` and
 * announced "0 proven by the kernel, 43 unchecked" — a corpus-level finding
 * manufactured out of a missing binary. It then failed, because the committed
 * ledger was written on a machine that HAD lean and says 19. The release was
 * blocked by a machine's configuration wearing the costume of a contradiction.
 *
 * Worse, the remedy it printed was `run npm run lean:ledger`, which on that
 * machine would have overwritten the evidence with zeros. A gate whose error
 * message destroys the record if followed is not a gate.
 *
 * So kernel-dependent conditions are VOID here, named as void, and the ledger
 * comparison is not attempted: a reading that could not be taken cannot
 * disagree with one that was. The toolchain-independent conditions still run —
 * every theorem exists, every sorry is recorded, the ledger covers them all —
 * because those need no kernel and are the ones that catch prose drift.
 */
const KERNEL_VOID = !leanAvailable
if (KERNEL_VOID) {
  console.log('lean:check — VOID on the kernel conditions: no lean on PATH.')
  console.log('             Not evaluated: which theorems the kernel accepts, and what their proofs rest on.')
  console.log('             The committed ledger is left alone; a reading that was never taken cannot contradict one that was.')
}

const ledger = {
  toolchain: leanAvailable ? execFileSync('lean', ['--version'], { encoding: 'utf8' }).trim() : 'absent',
  files: files.length,
  theorems: theorems.length,
  proven: proven.length,
  sorry: byStatus('sorry').length,
  unverifiableHere: byStatus('unverifiable-here').length,
  rejected: byStatus('rejected').length,
  // The axiom dependencies are the EVIDENCE for the word "proven", so they are
  // recorded. Without them the ledger says a theorem is proven and gives a
  // reader no way to see what that rests on — which is the shape of claim this
  // whole file exists to refuse.
  entries: theorems.map(({ name, file, status, axioms }) => ({ name, file, status, ...(axioms === undefined ? {} : { axioms }) })),
}

if (WRITE && KERNEL_VOID) {
  console.error('lean:ledger REFUSED — no lean on PATH. Writing now would record 0 proven and erase the dependency sets,')
  console.error('                     which is the evidence, not the summary. Run this where the toolchain is.')
  process.exit(1)
}
if (WRITE) {
  writeFileSync(LEDGER, JSON.stringify(ledger, null, 2) + '\n')
  // And a TypeScript module, because ./verification ships and lean/ does not.
  // Generated rather than maintained: the status of a theorem is a fact about a
  // file, and a hand-kept copy of it is the drift this whole check exists for.
  const statuses = Object.fromEntries(Object.entries(v.LEAN_PROOFS).map(([key, src]) => {
    const name = declaredIn(src)
    return [key, known.get(name)?.status ?? 'absent']
  }))
  const ts = `/**
 * What the Lean kernel says about each statement in LEAN_PROOFS.
 *
 * GENERATED by npm run lean:ledger from the .lean files. Do not edit: the
 * status of a theorem is a fact about a file, and a hand-kept copy of it is
 * exactly the drift lean:check exists to catch. Eight entries in a constant
 * named LEAN_PROOFS had proofs that are \`sorry\` in the file, and nothing
 * recorded it.
 *
 *   proven             the kernel accepted the file and the proof has no sorry
 *   sorry              the statement is written down and not proved
 *   unverifiable-here  the file imports a library this repository cannot build
 *   absent             no .lean file declares it
 */
export type LeanKernelStatus = 'proven' | 'sorry' | 'unverifiable-here' | 'rejected' | 'absent'

export const LEAN_STATUS: Readonly<Record<string, LeanKernelStatus>> = ${JSON.stringify(statuses, null, 2)} as const

/**
 * Of the ${Object.keys(statuses).length} theorems LEAN_PROOFS states in TypeScript, how many the kernel
 * has accepted. NOT the whole corpus: these twelve all live in files that import
 * Mathlib, so none of them is checkable here and the count is honestly zero.
 * A reader who takes this for the corpus concludes nothing is proved, which is
 * why the corpus totals are named separately below.
 */
export const LEAN_PROVEN_COUNT = ${Object.values(statuses).filter((x) => x === 'proven').length}
/** Of those same ${Object.keys(statuses).length}: written down and not proved. A sorry is not a proof. */
export const LEAN_SORRY_COUNT = ${Object.values(statuses).filter((x) => x === 'sorry').length}

/** Every theorem in lean/, across all files. */
export const LEAN_CORPUS_THEOREM_COUNT = ${theorems.length}
/** Of those: accepted by the kernel, with axiom dependencies inside the allowed set. */
export const LEAN_CORPUS_PROVEN_COUNT = ${proven.length}
`
  writeFileSync(join(ROOT, 'src/verification/lean-status.ts'), ts)
  console.log(`lean:ledger — wrote lean/ledger.json: ${proven.length} proven, ${ledger.sorry} sorry, ${ledger.unverifiableHere} unverifiable here`)
  process.exit(0)
}

console.log(`lean:check — ${theorems.length} theorem(s) across ${files.length} file(s); toolchain ${ledger.toolchain}`)
// The void has to reach the SUMMARY, not only the header. The first version of
// this fix voided the ledger comparison and then printed "0 proven by the
// kernel, 43 unchecked" underneath — the manufactured corpus-level finding
// surviving in the sentence a reader ends on. The rule gets stated at the level
// of the item and broken at the level of the summary.
if (KERNEL_VOID) {
  console.log(`             not evaluated here; the committed ledger records ${JSON.parse(readFileSync(LEDGER, 'utf8')).proven ?? '?'} proven, taken where the toolchain is`)
  console.log(`             ${byStatus('sorry').length} closed with sorry — decidable without a kernel, and checked`)
} else {
  console.log(`             ${proven.length} proven by the kernel, ${ledger.sorry} closed with sorry, ${ledger.unverifiableHere} unverifiable here`)
  console.log(`             ${unchecked.length} unchecked`)
}

if (existsSync(LEDGER)) {
  const on = JSON.parse(readFileSync(LEDGER, 'utf8'))
  if (JSON.stringify(on.entries) !== JSON.stringify(ledger.entries)) {
    if (!KERNEL_VOID) problems.push('lean/ledger.json is not what the files say — run npm run lean:ledger')
  }
} else {
  problems.push('lean/ledger.json is missing — run npm run lean:ledger')
}

for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`lean:check FAIL — ${problems.length} contradiction(s) between what TypeScript states and what the .lean files contain`)
  process.exit(1)
}
console.log(KERNEL_VOID
  ? `lean:check ok — every stated theorem exists in a file, every sorry is recorded as one, and the ledger covers all ${theorems.length}. `
    + `WHAT THE KERNEL ACCEPTS WAS NOT EVALUATED: no toolchain here. This says nothing about how much of the corpus is proved.`
  : `lean:check ok — every stated theorem exists in a file, every sorry is recorded as one, `
    + `and the ledger covers all ${theorems.length}. ${proven.length} are proven by the kernel; `
    + `the other ${unchecked.length} are written down and not proved, and say so.`)
