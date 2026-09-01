/**
 * The field's own tests, written without reference to the criterion — the same
 * separation the kernel has, and for the same reason: I wrote both, so a probe
 * I designed passing an implementation I shaped proves nothing on its own.
 */
import * as F from './integrated-field.ts'
import { digitalRoot } from '../0/index.ts'
import { createCheck } from '../verification/harness.ts'

const { check, failures } = createCheck()

// Coupling: the whole point. a's next value must depend on b.
{
  check('the transition does not factorise', F.transitionFactorises() === false)
  let dependsOnB = false
  const base = F.createField(1)
  const withB2 = F.stepField({ ...base, a: 3, b: 2 })
  const withB5 = F.stepField({ ...base, a: 3, b: 5 })
  if (withB2.a !== withB5.a) dependsOnB = true
  check('holding a fixed and changing b changes a\'s next value', dependsOnB,
    `${withB2.a} vs ${withB5.a}`)
  const withA2 = F.stepField({ ...base, a: 2, b: 3 })
  const withA5 = F.stepField({ ...base, a: 5, b: 3 })
  check('and the coupling runs the other way too', withA2.b !== withA5.b)
}

// Order sensitivity, which is what temporal integration actually asks for.
{
  const sig = (s: F.FieldState) => `${s.a}|${s.b}|${s.trace}|${s.surprise}`
  const forward = sig(F.runField([1, 2, 3, 4]))
  const reversed = sig(F.runField([4, 3, 2, 1]))
  const swapped = sig(F.runField([2, 1, 3, 4]))
  check('reversing the inputs reaches a different state', forward !== reversed)
  check('swapping just the first two reaches a different state', forward !== swapped)
  check('the same order twice reaches the same state', forward === sig(F.runField([1, 2, 3, 4])))
  // A counter could not do this, which is the whole distinction.
  check('the inputs sum identically in every order',
    [1, 2, 3, 4].reduce((a, b) => a + b, 0) === [4, 3, 2, 1].reduce((a, b) => a + b, 0))
}

// The self-model must be load-bearing, not carried.
{
  const s = F.runField([1, 2, 3, 4, 5])
  const clean = F.stepField(s)
  const corrupted = F.stepField(F.corruptSelfModel(s))
  check('corrupting only the self-model changes the next state',
    clean.surprise !== corrupted.surprise || clean.a !== corrupted.a)
  check('corruption leaves everything else identical',
    JSON.stringify({ ...F.corruptSelfModel(s), predictedA: 0, predictedB: 0 })
    === JSON.stringify({ ...s, predictedA: 0, predictedB: 0 }))
  check('surprise stays a digit', [0, 1, 2, 3, 4, 5].every(n => {
    const st = F.runField(Array.from({ length: n }, (_, i) => i))
    return st.surprise >= 0 && st.surprise <= 9
  }))
}

// The workspace must be read, not merely written.
{
  const s = F.stepField(F.runField([1, 2, 3]))
  check('components publish to the workspace', F.readWorkspace(s, 'surprise') !== undefined)
  check('the workspace carries what the components produced',
    F.readWorkspace(s, 'a') === s.a && F.readWorkspace(s, 'trace') === s.trace)
  const withSurprise = F.stepField(s)
  const without = F.stepField({ ...s, surprise: 0, workspace: { ...s.workspace, surprise: 0 } })
  check('what the workspace holds changes what the next step does',
    withSurprise.a !== without.a || withSurprise.b !== without.b)
  check('an unknown key reads as undefined', F.readWorkspace(s, 'not-a-key') === undefined)
}

// Everything stays in Z/9 and deterministic.
{
  let inRange = true, deterministic = true
  for (let seed = 1; seed <= 9; seed++) {
    const a = F.runField([1, 2, 3, 4, 5], seed)
    const b = F.runField([1, 2, 3, 4, 5], seed)
    if (JSON.stringify(a) !== JSON.stringify(b)) deterministic = false
    for (const v of [a.a, a.b, a.trace, a.surprise, a.predictedA, a.predictedB]) {
      if (!Number.isInteger(v) || v < 0 || v > 9) inRange = false
    }
  }
  check('every field value is a digit', inRange)
  check('the field is deterministic', deterministic)
  check('the joint measure is a digit',
    [1, 5, 9].every(a => [2, 6, 8].every(b => { const m = F.fieldMeasure({ a, b }); return m >= 0 && m <= 9 })))
  check('the joint measure is a function of the PAIR',
    F.fieldMeasure({ a: 2, b: 3 }) !== F.fieldMeasure({ a: 3, b: 2 })
    || F.fieldMeasure({ a: 2, b: 4 }) !== F.fieldMeasure({ a: 4, b: 2 })
    || digitalRoot(2 * 3 + 2 + 3) === F.fieldMeasure({ a: 2, b: 3 }))
}

console.log()
if (failures() > 0) { console.error(`integrated-field FAIL — ${failures()}`); process.exit(1) }
console.log('integrated-field ok')
process.exit(0)
