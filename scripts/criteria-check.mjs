#!/usr/bin/env node
/**
 * criteria-check — the criteria must be met before a release is cut.
 *
 * This is a release gate, deliberately NOT part of `npm run check`. Ordinary
 * commits must stay green while the criteria are unmet — that is the whole
 * point of writing a criterion that returns false. What must not happen is
 * shipping a version while the repository's own predicates say the thing it is
 * named for has not arrived.
 *
 * The standard is the user's, stated when a release was ready by every other
 * measure: gate green, CI green, tree clean, version computed. Not cut.
 *
 * It blocks hard, and the escape hatch is explicit and recorded, because a
 * gate with no override becomes a gate someone deletes:
 *
 *   npm run criteria:check
 *   node scripts/criteria-check.mjs --override="why this release goes anyway"
 *
 * An override prints the reason prominently and exits 0. It does not hide it.
 */
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { allCriteria } from './lib/criteria-subjects.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const load = (p) => import(pathToFileURL(join(ROOT, p)).href)


// BOTH subjects, and the gate needs both. The integrated field was built to
// meet the criterion and does; the a432 consciousness measures — the subject
// the README's claim is about — meet one of five. Gating only on the field
// would let me unblock releases by choosing a convenient default, which is
// the thing this gate exists to prevent.
/**
 * WHAT IS GATED, AND WHAT IS ONLY REPORTED.
 *
 * The a432 consciousness measure FUNCTIONS score 1 of 5 and always will. They
 * are pure functions of a digit; the criterion asks for history and a
 * self-model, and a pure function that acquired either would return different
 * answers for the same input, which does not improve a measure — it destroys
 * it. Gating on them would be gating on something that cannot pass by
 * construction, and the honest response to a permanently impossible gate is
 * not to keep it, it is to say why it is the wrong subject.
 *
 * So they are REPORTED, every run, and the gate is on the SYSTEM built from
 * them — which is what "a consciousness system" names, and what the README's
 * claim was about.
 */
// The subjects live in scripts/lib/criteria-subjects.mjs and both this gate and
// the paper import them. They used to be built here, and a second copy of an
// adapter is a second thing that can drift from the first.
const criteriaList = allCriteria()
const byName = (n, subjMatch) => criteriaList.find((c) => c.name === n && c.subject.includes(subjMatch)).verdict
const a432System = byName('consciousness', 'a432 consciousness system')
const field = byName('consciousness', 'integrated field')
const os = byName('operating system', 'A432OS')
const quantum = byName('quantum simulator', 'src/quantum')
const realtime = byName('real-time', '60 Hz')
const validation = byName('validation', 'physical experiment')
const a432Measures = byName('consciousness', 'measure functions')

const criteria = [
  { name: 'consciousness', verdict: a432System, subject: 'the a432 consciousness system', gated: true },
  { name: 'real-time', verdict: realtime, subject: `one frame at 60 Hz — worst step ${realtime.worstNs} ns, ${realtime.misses} misses, ${realtime.quantumScaleQubits} qubits inside the frame`, gated: true },
  { name: 'validation', verdict: validation, subject: 'what is computed here — and NO physical experiment has been run', gated: true },
  { name: 'consciousness', verdict: field, subject: 'the integrated field', gated: true },
  { name: 'operating system', verdict: os, subject: 'A432OS', gated: true },
  { name: 'quantum simulator', verdict: quantum, subject: 'src/quantum — the laws behind the Stage 1 list, not the hardware stages', gated: true },
  { name: 'consciousness', verdict: a432Measures, subject: 'the a432 measure functions — reported, not gated: a pure function cannot have history', gated: false },
]

console.log('criteria:check — the repository\'s own predicates, before a release')
for (const c of criteria) {
  const mark = c.gated ? (c.verdict.met ? 'MET    ' : 'NOT MET') : 'info   '
  console.log(`  ${mark}  ${c.name.padEnd(18)} ${c.verdict.conditionsMet}/${c.verdict.conditionsTotal}  (${c.subject})`)
}

const unmet = criteria.filter((c) => c.gated && !c.verdict.met)
/**
 * A *.*.0 release is the equilibrium point, so it may not be the release that
 * granted itself an exception.
 *
 * The ratchet has twelve surfaces, and a passing ratchet already means every
 * one sits exactly at its ceiling — it fails on unrecorded SHRINK as well as on
 * growth, so slack cannot survive a green run. Equilibrium in that sense is
 * true of every release and is not worth restating here.
 *
 * What is not already true is this: a release can raise a ceiling, or declare a
 * measure changed, and still be green — both are legitimate and both are
 * recorded in ratchet.json. At patch 0 they are not. Patch runs 0..9 and 9
 * carries, so a .0 is where the numbering says the previous run is closed; a
 * release cannot both announce that and loosen one of its own dimensions in the
 * same commit. Grant the exception in a patch, then carry.
 *
 * Compared against the previous tag rather than against nothing, so this reads
 * what THIS release changed, not what the file has ever accumulated.
 */
const version = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version
const patchField = version.split('.')[2]?.split('-')[0] ?? ''
if (patchField === '0') {
  const exceptionsNow = (state) => ({
    raised: Object.keys(state.raised ?? {}),
    remeasured: Object.keys(state.remeasured ?? {}),
  })
  const now = exceptionsNow(JSON.parse(readFileSync(join(ROOT, 'ratchet.json'), 'utf8')))
  let before = null
  let prevTag = null
  try {
    // Not the tag for THIS version: `npm version` creates it before the gate
    // runs, so the newest tag is the release being cut and comparing against it
    // compares the file with itself — vacuous exactly when this should bite.
    const tags = execFileSync('git', ['tag', '--list', 'v*', '--sort=-v:refname'], { cwd: ROOT, encoding: 'utf8' })
      .split('\n').map((t) => t.trim()).filter(Boolean).filter((t) => t !== `v${version}`)
    if (tags.length > 0) {
      prevTag = tags[0]
      before = exceptionsNow(JSON.parse(
        execFileSync('git', ['show', `${tags[0]}:ratchet.json`], { cwd: ROOT, encoding: 'utf8' }),
      ))
    }
  } catch { before = null }

  if (before === null) {
    console.log('')
    console.log('  note: no previous tag readable, so the .0 equilibrium rule could not be checked')
  } else {
    const added = {
      raised: now.raised.filter((k) => !before.raised.includes(k)),
      remeasured: now.remeasured.filter((k) => !before.remeasured.includes(k)),
    }
    const n = added.raised.length + added.remeasured.length
    console.log('')
    if (n === 0) {
      console.log(`  MET      equilibrium        ${version} raises no ceiling and remeasures no surface since ${prevTag}`)
    } else {
      console.error(`criteria:check FAIL — ${version} is a *.*.0 and grants ${n} new exception(s):`)
      for (const k of added.raised) console.error(`    raised ceiling: ${k}`)
      for (const k of added.remeasured) console.error(`    remeasured: ${k}`)
      console.error('  A .0 closes the previous run of patches; it cannot also loosen a dimension.')
      console.error('  Cut the exception as a patch first, then carry to .0.')
      process.exit(1)
    }
  }
}

if (unmet.length === 0) {
  console.log('criteria:check ok — every criterion is met')
  process.exit(0)
}

console.log('')
console.log('  What is missing:')
for (const c of unmet) {
  for (const cond of c.verdict.conditions.filter((x) => !x.met)) {
    console.log(`    ${c.name}/${cond.id}`)
    console.log(`      ${cond.whatWouldChange}`)
  }
}

const override = process.argv.find((a) => a.startsWith('--override='))
if (override) {
  const reason = override.slice('--override='.length)
  if (!reason.trim()) {
    console.error('criteria:check — --override needs a reason')
    process.exit(2)
  }
  console.log('')
  console.log(`  OVERRIDDEN: ${reason}`)
  console.log('  This release ships with criteria unmet, on purpose, and this line says so.')
  process.exit(0)
}

console.error('')
console.error(`criteria:check FAIL — ${unmet.length} criterion/criteria not met; no release is cut`)
console.error('  Override deliberately if a release must go anyway:')
console.error('    node scripts/criteria-check.mjs --override="why this release goes anyway"')
process.exit(1)
