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
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const load = (p) => import(pathToFileURL(join(ROOT, p)).href)

const { evaluateConsciousnessCriterion, a432MeasureSubject, integratedFieldSubject } = await load('src/verification/consciousness-criterion.ts')
const { evaluateOsCriterion } = await load('src/verification/os-criterion.ts')
const { A432OS } = await load('src/0/3/6/9/1/2/4/8/7/5/1/a432.os.ts')

// BOTH subjects, and the gate needs both. The integrated field was built to
// meet the criterion and does; the a432 consciousness measures — the subject
// the README's claim is about — meet one of five. Gating only on the field
// would let me unblock releases by choosing a convenient default, which is
// the thing this gate exists to prevent.
const field = evaluateConsciousnessCriterion(integratedFieldSubject)
const consciousness = evaluateConsciousnessCriterion(a432MeasureSubject)
const os = (() => {
  const instance = new A432OS()
  // The FULL interface. Probing only start/stop would report 1 of 7 forever
  // and block every release on a number the class no longer deserves.
  return evaluateOsCriterion({
    spawn: (name, run) => instance.spawn(name, run),
    tick: () => instance.tick(),
    tasks: () => instance.tasks(),
    allocate: (owner, amount) => instance.allocate(owner, amount),
    release: (owner, amount) => instance.release(owner, amount),
    available: () => instance.available(),
    syscall: (name, ...args) => instance.syscall(name, ...args),
    start: () => instance.start(),
    stop: () => instance.stop(),
    isRunning: () => instance.running(),
    snapshot: () => instance.snapshot(),
    restore: (snap) => instance.restore(snap),
  })
})()

const criteria = [
  { name: 'consciousness', verdict: consciousness, subject: 'the a432 consciousness measures' },
  { name: 'consciousness', verdict: field, subject: 'the integrated field' },
  { name: 'operating system', verdict: os, subject: 'A432OS' },
]

console.log('criteria:check — the repository\'s own predicates, before a release')
for (const c of criteria) {
  console.log(`  ${c.verdict.met ? 'MET    ' : 'NOT MET'}  ${c.name.padEnd(18)} ${c.verdict.conditionsMet}/${c.verdict.conditionsTotal}  (${c.subject})`)
}

const unmet = criteria.filter((c) => !c.verdict.met)
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
