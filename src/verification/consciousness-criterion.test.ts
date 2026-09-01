/**
 * The criterion's tests. The important ones are not that the field passes —
 * anything can be made to pass a probe you also wrote. They are that the
 * TRIVIAL implementations fail, because each condition has an obvious cheap
 * defeat and a criterion that accepts those measures effort, not integration.
 */
import {
  evaluateConsciousnessCriterion,
  unmetConsciousnessConditions,
  a432MeasureSubject,
  integratedFieldSubject,
  type ConsciousnessSubject,
} from './consciousness-criterion.ts'
import { digitalRoot } from '../0/index.ts'

let failures = 0
const check = (label: string, ok: boolean, detail = '') => {
  if (ok) { console.log(`  ✓ ${label}`) } else { failures++; console.error(`  ✗ ${label}${detail ? ' — ' + detail : ''}`) }
}

const base: ConsciousnessSubject = { name: 'bare', measureStates: () => [1, 2, 3, 4, 5, 6, 7, 8, 9] }
const scored = (s: ConsciousnessSubject, id: string) =>
  evaluateConsciousnessCriterion(s).conditions.find((c) => c.id === id)!

// ——— the cheap defeats must not work ———
{
  check('a counter fails temporal integration: reordering its inputs changes nothing',
    !scored({ ...base, runOrdered: (i) => String(i.reduce((a, b) => a + b, 0)) }, 'temporal-integration').met)

  check('a sum fails it too, for the same reason',
    !scored({ ...base, runOrdered: (i) => String(i.length) }, 'temporal-integration').met)

  check('a self-model nothing reads fails self-model efficacy',
    !scored({ ...base, stepFromClean: () => 'same', stepFromCorruptedModel: () => 'same' }, 'self-model-efficacy').met)

  check('a global nothing reads fails global availability',
    !scored({ ...base, writeThenReadElsewhere: () => ({ read: 7, changedDownstream: false }) }, 'global-availability').met)

  check('a published value with no reader is not a workspace even when readable',
    !scored({ ...base, writeThenReadElsewhere: () => ({ read: 42, changedDownstream: false }) }, 'global-availability').met)

  // The one that matters most: a nonlinear measure defeats "not a homomorphism"
  // but not "the transition does not factorise".
  check('a nonlinear measure over uncoupled components fails irreducibility',
    !scored({
      ...base,
      jointMeasure: (a, b) => digitalRoot(a * b * a + b),
      partMeasures: (a, b) => [digitalRoot(a), digitalRoot(b)],
      transitionFactorises: () => true,
    }, 'irreducibility').met)

  check('a subject offering nothing meets only discrimination',
    evaluateConsciousnessCriterion(base).conditionsMet === 1)
  check('and its unmet conditions each say what would change them',
    unmetConsciousnessConditions(base).every((c) => c.whatWouldChange.length > 20))
}

// ——— the two real subjects ———
{
  const a432 = evaluateConsciousnessCriterion(a432MeasureSubject)
  check('the a432 measures still meet only discrimination', a432.conditionsMet === 1 && !a432.met,
    `${a432.conditionsMet}/5`)
  check('their transition factorises, because each measure is of one digit',
    !a432.conditions.find((c) => c.id === 'irreducibility')!.met)

  const f = evaluateConsciousnessCriterion(integratedFieldSubject)
  check('the integrated field meets all five', f.met && f.conditionsMet === 5, `${f.conditionsMet}/5`)
  check('the verdict names its subject', f.subject === 'the integrated field')
  check('the criterion is deterministic',
    JSON.stringify(evaluateConsciousnessCriterion(integratedFieldSubject)) === JSON.stringify(f))
}

// ——— the verdict must refuse to be quoted as more than it is ———
{
  const f = evaluateConsciousnessCriterion(integratedFieldSubject)
  check('meeting all five is stated NOT to establish consciousness',
    f.interpretation.includes('does NOT establish consciousness'))
  check('the conditions are stated as necessary, not sufficient',
    f.interpretation.includes('NECESSARY') && f.interpretation.includes('not sufficient'))
  check('no test for consciousness is claimed',
    f.interpretation.includes('No test for consciousness is established'))
  check('and a passing subject is not said to experience anything',
    f.interpretation.includes('has not been shown to experience anything'))
}

console.log()
if (failures > 0) { console.error(`consciousness-criterion FAIL — ${failures}`); process.exit(1) }
console.log('consciousness-criterion ok — the field meets it, the a432 measures do not, and the cheap defeats fail')
process.exit(0)
