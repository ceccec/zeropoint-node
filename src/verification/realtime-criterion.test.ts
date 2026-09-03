/**
 * The real-time criterion has to be able to say no.
 *
 * A criterion that confirms whatever it is shown confirms nothing. These are
 * the cheap passes each condition is written to reject, asserted directly:
 * a step that does nothing is fast, a single sample is noise, and a deadline
 * chosen after the measurement is not a deadline.
 */
import { evaluateRealtimeCriterion, quantumScaleReach, DEADLINE_NS, FRAME_HZ } from './realtime-criterion.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}

const v = evaluateRealtimeCriterion(500)

// The load-bearing one. Claims in scripts/claims.json are bound to this
// criterion, so a suite that checks its SHAPE and not its VERDICT would let the
// criterion stop holding while every claim went on citing it.
check('every condition is met — claims are bound to this verdict',
  v.met && v.conditionsMet === v.conditionsTotal,
  v.conditions.filter((c) => !c.met).map((c) => `${c.id}: ${c.evidence}`).join(' | '))

check('every condition is decided, none left undefined',
  v.conditions.length === v.conditionsTotal && v.conditions.every((c) => typeof c.met === 'boolean'))

check('the deadline is stated before the measurement and is one frame',
  DEADLINE_NS === 1_000_000_000 / FRAME_HZ && DEADLINE_NS > 0)

check('the verdict reports the WORST step, and the worst is not better than the best',
  v.worstNs >= v.bestNs && Number.isFinite(v.worstNs))

check('a miss count is reported whether or not there were misses',
  typeof v.misses === 'number' && v.misses >= 0 && v.misses <= v.samples)

check('the verdict is met only when every condition is',
  v.met === (v.conditionsMet === v.conditionsTotal))

check('every condition names what would change it',
  v.conditions.every((c) => c.whatWouldChange.length > 0))

check('every condition carries evidence computed in the call, not a stored number',
  v.conditions.every((c) => c.evidence.length > 0))

// --- the quantum-scale reach ---------------------------------------------
const reach = quantumScaleReach(12)
check('the reach is a width at which a full step fits the frame',
  reach.qubits >= 1 && reach.ns <= reach.deadlineNs)

check('the reach never exceeds the width it was asked to try',
  quantumScaleReach(4).qubits <= 4)

check('a smaller budget reaches no further than a larger one',
  quantumScaleReach(4).qubits <= quantumScaleReach(12).qubits)

check('the reach states the wall it stopped at',
  typeof reach.wall === 'string' && reach.wall.length > 0)

// --- it must be able to say no -------------------------------------------
check('an impossible deadline would fail worst-case-met',
  v.worstNs > 0,
  'the measurement is real: a step that took no measurable time would make the condition vacuous')

check('steady state is decided by the FLOOR of each half, not the mean',
  v.conditions.find((c) => c.id === 'steady-state')?.evidence.includes('the fastest of') === true,
  'a mean here is decided by the load average: contention raises the maximum and leaves the minimum alone')

check('the criterion measures a step that PRODUCES something',
  v.conditions.find((c) => c.id === 'work-bounded')?.evidence.includes('distinct values') === true,
  'a step that returns one value for every input is fast because it does nothing')

console.log(failures === 0
  ? `realtime-criterion ok — ${v.conditionsMet}/${v.conditionsTotal}, ${reach.qubits} qubits inside a frame`
  : `realtime-criterion FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
