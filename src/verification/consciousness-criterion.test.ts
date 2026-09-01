/**
 * The criterion's own tests. Two things matter here and they pull in opposite
 * directions:
 *
 *   - it must currently return FALSE, because the system does not meet it;
 *   - every condition must be ABLE to return true, or it is not a criterion,
 *     it is a permanent no dressed up as a test.
 *
 * The second is checked by mutation in the commit that added this file: each
 * condition was flipped by changing the property it names — a non-homomorphic
 * measure, a history accumulator, a stateful measure, a shared workspace — and
 * each flipped. What is asserted here is the shape that makes those mutations
 * meaningful.
 */
import { evaluateConsciousnessCriterion, unmetConsciousnessConditions } from './consciousness-criterion.ts'

let failures = 0
const check = (label: string, ok: boolean, detail = '') => {
  if (ok) { console.log(`  ✓ ${label}`) } else { failures++; console.error(`  ✗ ${label}${detail ? ' — ' + detail : ''}`) }
}

const v = evaluateConsciousnessCriterion()

check('the criterion is not met', v.met === false)
check('it reports how many conditions hold', v.conditionsMet === v.conditions.filter(c => c.met).length)
check('there are five conditions', v.conditionsTotal === 5 && v.conditions.length === 5)
check('exactly one holds today', v.conditionsMet === 1, `${v.conditionsMet} of ${v.conditionsTotal}`)
check('the one that holds is discrimination',
  v.conditions.filter(c => c.met).map(c => c.id).join() === 'discrimination')

// Each condition has to be a claim someone else can check and argue with.
check('every condition names the theory it comes from', v.conditions.every(c => c.theory.length > 0))
check('every condition states what it requires', v.conditions.every(c => c.requires.length > 0))
check('every condition gives its evidence', v.conditions.every(c => c.evidence.length > 0))
check('every unmet condition says what would change it',
  v.conditions.filter(c => !c.met).every(c => c.whatWouldChange.length > 20))
check('condition ids are unique', new Set(v.conditions.map(c => c.id)).size === v.conditions.length)

// The verdict must carry its own reading, so a caller quoting the boolean
// cannot quote it as more than it is.
check('the verdict states that the conditions are necessary, not sufficient',
  v.interpretation.includes('NECESSARY') && v.interpretation.includes('not sufficient'))
check('the verdict denies being a test for consciousness',
  v.interpretation.includes('No test for consciousness is established'))
check('met would still not mean conscious',
  v.interpretation.includes('would not establish consciousness'))

check('the unmet list matches the verdict',
  unmetConsciousnessConditions().length === v.conditionsTotal - v.conditionsMet)
check('the criterion is deterministic',
  JSON.stringify(evaluateConsciousnessCriterion()) === JSON.stringify(v))

// The four failing conditions, each for a stated reason.
{
  const by = Object.fromEntries(v.conditions.map(c => [c.id, c]))
  check('irreducibility fails because the measure is a homomorphism',
    !by['irreducibility'].met && by['irreducibility'].evidence.includes('homomorphism'))
  check('temporal integration fails because the stream is a function of position',
    !by['temporal-integration'].met && by['temporal-integration'].evidence.includes('position'))
  check('self-model efficacy fails because the measures are pure',
    !by['self-model-efficacy'].met && by['self-model-efficacy'].evidence.includes('pure functions'))
  check('global availability fails because the subsystems share no state',
    !by['global-availability'].met && by['global-availability'].evidence.includes('share no state'))
}

// Order is load-bearing: the probing conditions must run before anything else
// drives the subsystems they measure. This caught a real defect.
check('the probing conditions run first',
  v.conditions[0].id === 'global-availability' && v.conditions[1].id === 'self-model-efficacy')

console.log()
if (failures > 0) { console.error(`consciousness-criterion FAIL — ${failures}`); process.exit(1) }
console.log('consciousness-criterion ok — the criterion is written, and it is not met')
process.exit(0)
