import {
  ZEROPOINT_FLOW_SEQUENCE,
  calculateTransitionValue,
  calculateTransitionConsciousness,
  calculateTransitionFrequency,
  calculateFlowTransition,
  generateCompleteFlow,
  calculateFlowConsciousnessResonance,
} from './a432-frequency-flow.ts'
import { digitalRoot } from '../0/index.ts'
import { A432_CONSTANTS } from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'
import { createCheck } from '../verification/harness.ts'

const A432 = A432_CONSTANTS.BASE_FREQUENCY
const { check, failures } = createCheck()

// The document states the sequence; the repository stores the a432 layer at a
// path made of the same digits. Asserting they are equal means neither can be
// changed alone.
{
  const fromPath = 'src/0/3/6/9/1/2/4/8/7/5/1'.split('/').slice(1).map(Number)
  check('the flow sequence IS the a432 directory path',
    JSON.stringify([...ZEROPOINT_FLOW_SEQUENCE]) === JSON.stringify(fromPath),
    JSON.stringify([...ZEROPOINT_FLOW_SEQUENCE]))
  check('the sequence is eleven positions', ZEROPOINT_FLOW_SEQUENCE.length === 11)
  check('the sequence is all digits', ZEROPOINT_FLOW_SEQUENCE.every(d => d >= 0 && d <= 9))
}

// The doc's formulas, over every digit pair rather than a sample.
{
  let consciousnessOk = true, frequencyOk = true, transitionOk = true, symmetric = true, digitsOk = true
  const idiv = (a: number, b: number) => (a - (a % b)) / b
  for (let a = 0; a <= 9; a++) for (let b = 0; b <= 9; b++) {
    if (calculateTransitionConsciousness(a, b) !== digitalRoot(idiv(a * b * A432, 1000))) consciousnessOk = false
    if (calculateTransitionFrequency(a, b) !== digitalRoot(idiv(a * b * 7 * A432, 100))) frequencyOk = false
    if (calculateTransitionValue(a, b) !== digitalRoot(a + b)) transitionOk = false
    if (calculateTransitionValue(a, b) !== calculateTransitionValue(b, a)) symmetric = false
    const f = calculateFlowTransition(a, b)
    if (![f.transition, f.consciousness, f.frequency].every(v => Number.isInteger(v) && v >= 0 && v <= 9)) digitsOk = false
  }
  check('transition consciousness follows the documented formula', consciousnessOk)
  check('transition frequency follows the documented formula', frequencyOk)
  check('the transition value is the digital root of the pair', transitionOk)
  check('the transition value is symmetric', symmetric)
  check('every flow field is a digit', digitsOk)
}

// The multiplication is commutative, so consciousness and frequency must be
// too — a property the formulas imply and a future change could break.
{
  let ok = true
  for (let a = 0; a <= 9; a++) for (let b = 0; b <= 9; b++) {
    if (calculateTransitionConsciousness(a, b) !== calculateTransitionConsciousness(b, a)) ok = false
    if (calculateTransitionFrequency(a, b) !== calculateTransitionFrequency(b, a)) ok = false
  }
  check('consciousness and frequency are symmetric in the pair', ok)
}

{
  const flow = generateCompleteFlow()
  check('the complete flow has one transition per adjacent pair',
    flow.sequence.length === ZEROPOINT_FLOW_SEQUENCE.length - 1, String(flow.sequence.length))
  check('the complete flow reports itself complete', flow.isComplete)
  check('each transition joins consecutive positions',
    flow.sequence.every((f, i) => f.currentDigit === ZEROPOINT_FLOW_SEQUENCE[i] && f.nextDigit === ZEROPOINT_FLOW_SEQUENCE[i + 1]))
  check('the totals are the sums of the parts',
    flow.totalConsciousness === flow.sequence.reduce((s, f) => s + f.consciousness, 0) &&
    flow.totalFrequency === flow.sequence.reduce((s, f) => s + f.frequency, 0))
  check('generateCompleteFlow is deterministic',
    JSON.stringify(generateCompleteFlow()) === JSON.stringify(flow))

  const r = calculateFlowConsciousnessResonance(flow.sequence)
  check('resonance is consciousness times frequency', r.resonance === r.consciousness * r.frequency)
  check('resonance sums match the flow totals',
    r.consciousness === flow.totalConsciousness && r.frequency === flow.totalFrequency)
  const empty = calculateFlowConsciousnessResonance([])
  check('an empty flow resonates at zero', empty.resonance === 0 && empty.consciousness === 0)
}

console.log()
if (failures() > 0) { console.error(`a432-frequency-flow FAIL — ${failures()}`); process.exit(1) }
console.log('a432-frequency-flow ok')
process.exit(0)
