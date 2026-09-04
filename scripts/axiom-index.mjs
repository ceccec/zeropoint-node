/**
 * The full axiom index: everything this corpus asks a reader to take on trust.
 *
 * A proof corpus is only as strong as what it assumes, and that comes in two
 * kinds which are usually run together and should not be.
 *
 * DECLARED ASSUMPTIONS are this repository's own: statements no finite
 * computation decides, recorded in ASSUMPTIONS with why they are unsealed and
 * what is decided instead. They are assumptions of the SUBJECT.
 *
 * KERNEL AXIOMS are Lean's: propext, Quot.sound, Classical.choice. A theorem
 * inherits them through the tactics that close it, and they say nothing about
 * the subject at all. Reporting "this rests on axioms" without separating the
 * two makes a corpus look as though it assumes things about its subject when it
 * assumes things about set-theoretic plumbing.
 *
 * Both are indexed here, per theorem, with the count that rests on nothing.
 *
 *   npm run axiom:index        write src/verification/axiom-index.json
 *   npm run axiom:index:check  fail if it is not what the sources produce
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = join(import.meta.dirname, '..')
const OUT = join(ROOT, 'src/verification/axiom-index.json')
const CHECK = process.argv.includes('--check')

const ledger = JSON.parse(readFileSync(join(ROOT, 'lean/ledger.json'), 'utf8'))
const v = await import(pathToFileURL(join(ROOT, 'src/verification/index.ts')).href)

const proven = ledger.entries.filter((e) => e.status === 'proven')
const measured = proven.filter((e) => Array.isArray(e.axioms))
const restOnNothing = measured.filter((e) => e.axioms.length === 0)
const byAxiom = new Map()
for (const e of measured) for (const a of e.axioms) {
  if (!byAxiom.has(a)) byAxiom.set(a, [])
  byAxiom.get(a).push(e.name)
}

const KERNEL_AXIOM_NOTES = {
  propext: 'propositional extensionality: propositions with the same truth value are equal. Part of Lean 4 core, assumed by essentially all of mathlib, and says nothing about arithmetic.',
  'Quot.sound': 'quotient soundness: elements related by the quotienting relation are equal in the quotient. Lean 4 core. It arrives here through list membership, not through any statement about digits.',
  'Classical.choice': 'the axiom of choice. NOT USED anywhere in this corpus, and its absence is the reason the allowed set is {propext, Quot.sound} rather than all three.',
  sorryAx: 'the axiom a `sorry` introduces. It can never appear: a theorem depending on it is not proven, and lean:check gives it the status rests-on-more.',
}

const index = {
  what: 'Everything this corpus asks a reader to take on trust, separated into assumptions about the SUBJECT and axioms of the PROOF SYSTEM.',
  declaredAssumptions: Object.entries(v.ASSUMPTIONS ?? {}).map(([name, a]) => ({
    name,
    statement: String(a.statement).replace(/\s+/g, ' ').trim(),
    whyUnsealed: String(a.why_unsealed).replace(/\s+/g, ' ').trim(),
    whatIsDecidedInstead: String(a.what_is_decided_instead).replace(/\s+/g, ' ').trim(),
    kind: 'about the subject — no finite computation decides it',
  })),
  kernelAxioms: [...byAxiom.entries()].sort().map(([name, theorems]) => ({
    name,
    note: KERNEL_AXIOM_NOTES[name] ?? 'undocumented — add a note before relying on it',
    kind: 'about the proof system, not about the subject',
    theoremCount: theorems.length,
    theorems: theorems.sort(),
  })),
  neverUsed: Object.entries(KERNEL_AXIOM_NOTES)
    .filter(([n]) => !byAxiom.has(n))
    .map(([name, note]) => ({ name, note })),
  totals: {
    kernelProven: proven.length,
    withMeasuredAxioms: measured.length,
    restingOnNothingAtAll: restOnNothing.length,
    restingOnKernelAxiomsOnly: measured.length - restOnNothing.length,
  },
  provenForm: 'A theorem counts as proven when the kernel accepted its file, its body contains no sorry, and #print axioms reports a dependency set inside {propext, Quot.sound}. The dependency set is recorded per theorem in lean/ledger.json as the evidence for the word.',
  measuredCause: 'The kernel-axiom dependencies are an artefact of proof FORM, not of the mathematics. `∀ d ∈ orbit, …` decides list membership and records [propext, Quot.sound]; the identical fact as a Bool equation over List.all records nothing. Seven axiom-free counterparts are in DigitSpace.lean, and six of the seven rest on nothing at all.',
}
const next = JSON.stringify(index, null, 2) + '\n'

console.log(`axiom:index — ${index.totals.kernelProven} kernel-proven; ${index.totals.restingOnNothingAtAll} rest on nothing at all, ${index.totals.restingOnKernelAxiomsOnly} on kernel axioms only`)
console.log(`              ${index.declaredAssumptions.length} declared assumption(s) about the subject; ${index.kernelAxioms.length} kernel axiom(s) in use; ${index.neverUsed.length} never used`)
for (const a of index.kernelAxioms) console.log(`              ${a.name.padEnd(18)} ${a.theoremCount} theorem(s)`)
if (CHECK) {
  if (readFileSync(OUT, 'utf8') !== next) { console.error('axiom:index FAIL — the index is not what the sources produce; run npm run axiom:index'); process.exit(1) }
  console.log('axiom:index ok — the recorded trusted base is the one the kernel reports today')
} else { writeFileSync(OUT, next); console.log('axiom:index — wrote src/verification/axiom-index.json') }
