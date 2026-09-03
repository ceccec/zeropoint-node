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
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
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
  for (const t of theoremsOf(src)) {
    theorems.push({
      name: t.name,
      file: f,
      // A theorem is PROVEN only when the kernel accepted the file AND the
      // proof contains no sorry. Either alone is not enough, and treating them
      // as interchangeable is how a file full of sorries came to be headed
      // "All theorems are formally proven".
      status: t.sorry ? 'sorry' : kernel === 'accepted' ? 'proven' : kernel === 'rejected' ? 'rejected' : 'unverifiable-here',
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

const problems = []
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

const ledger = {
  toolchain: leanAvailable ? execFileSync('lean', ['--version'], { encoding: 'utf8' }).trim() : 'absent',
  files: files.length,
  theorems: theorems.length,
  proven: proven.length,
  sorry: byStatus('sorry').length,
  unverifiableHere: byStatus('unverifiable-here').length,
  rejected: byStatus('rejected').length,
  entries: theorems.map(({ name, file, status }) => ({ name, file, status })),
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

/** How many of the stated theorems the kernel has actually accepted. */
export const LEAN_PROVEN_COUNT = ${Object.values(statuses).filter((x) => x === 'proven').length}
/** Theorems written down and not proved. A sorry is not a proof. */
export const LEAN_SORRY_COUNT = ${Object.values(statuses).filter((x) => x === 'sorry').length}
`
  writeFileSync(join(ROOT, 'src/verification/lean-status.ts'), ts)
  console.log(`lean:ledger — wrote lean/ledger.json: ${proven.length} proven, ${ledger.sorry} sorry, ${ledger.unverifiableHere} unverifiable here`)
  process.exit(0)
}

console.log(`lean:check — ${theorems.length} theorem(s) across ${files.length} file(s); toolchain ${ledger.toolchain}`)
console.log(`             ${proven.length} proven by the kernel, ${ledger.sorry} closed with sorry, ${ledger.unverifiableHere} unverifiable here`)
console.log(`             ${unchecked.length} unchecked`)

if (existsSync(LEDGER)) {
  const on = JSON.parse(readFileSync(LEDGER, 'utf8'))
  if (JSON.stringify(on.entries) !== JSON.stringify(ledger.entries)) {
    problems.push('lean/ledger.json is not what the files say — run npm run lean:ledger')
  }
} else {
  problems.push('lean/ledger.json is missing — run npm run lean:ledger')
}

for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`lean:check FAIL — ${problems.length} contradiction(s) between what TypeScript states and what the .lean files contain`)
  process.exit(1)
}
console.log(
  `lean:check ok — every stated theorem exists in a file, every sorry is recorded as one, `
  + `and the ledger covers all ${theorems.length}. ${proven.length} are proven by the kernel; `
  + `the other ${unchecked.length} are written down and not proved, and say so.`)
