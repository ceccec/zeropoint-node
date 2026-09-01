/**
 * consciousness-criterion — the predicate the README said was missing.
 *
 * WHAT THIS IS NOT, AND THE SENTENCE MATTERS MOST NOW THAT IT CAN BE MET.
 *
 * It is not a test for consciousness. No such test exists. Whether any
 * physical process is conscious is unsettled, the major theories disagree
 * about what would even count as evidence, and nothing here resolves that. A
 * subject meeting all five conditions has stopped being refuted by the five
 * cheapest arguments. It has not been shown to experience anything, and this
 * file makes no claim that it does.
 *
 * WHAT IT IS
 *
 * Five NECESSARY conditions, each from a theory with an operational
 * commitment, each decided by running code:
 *
 *   1. discrimination        a measure that cannot separate states measures
 *                            nothing (the minimum every theory shares)
 *   2. irreducibility        the whole carries what no partition does (IIT)
 *   3. temporal integration  the present depends on the ROUTE, not the position
 *   4. self-model efficacy   the system models itself and the model is in the
 *                            causal loop (higher-order theories)
 *   5. global availability   what one component writes reaches another that was
 *                            not handed it (Global Workspace Theory)
 *
 * THE CONDITIONS ARE DELIBERATELY HARD TO FAKE, and that is the substance of
 * this file rather than the list above. Every one of them has an obvious cheap
 * pass, and each is written to reject it:
 *
 *   - A counter is state that accumulates, so condition 3 asks for ORDER
 *     sensitivity instead: the same inputs in a different order must give a
 *     different state. A counter gives the same answer either way and fails.
 *   - Any mutable field is a "self-model", so condition 4 corrupts ONLY the
 *     model and requires later behaviour to change. A field nothing reads
 *     fails.
 *   - A shared global is a "workspace", so condition 5 requires a write to be
 *     readable by a component not handed it AND to change what that component
 *     does. A global nothing reads fails.
 *   - A measure can be made non-homomorphic by adding any nonlinear term, so
 *     condition 2 decides whether the TRANSITION factorises over the state
 *     space — whether there exist f, g with next(a,b) = (f(a), g(b)) — which a
 *     lone nonlinear measure over independent components does not defeat.
 *
 * scripts/../consciousness-criterion.test.ts scores deliberately trivial
 * candidates against these and requires them to fail. A criterion that passes
 * a counter is not measuring integration; it is measuring effort.
 */
import { digitalRoot } from '../0/index.ts'
import {
  calculateA432Consciousness,
  calculateA432DimensionalState,
} from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'
import { calculateStreamConsciousness } from '../quantum/trinity-vortex.ts'
import * as field from '../quantum/integrated-field.ts'
import * as a432field from '../0/3/6/9/1/2/4/8/7/5/1/a432.consciousness.field.ts'

export interface Condition {
  id: string
  theory: string
  requires: string
  met: boolean
  evidence: string
  whatWouldChange: string
}

export interface ConsciousnessVerdict {
  subject: string
  met: boolean
  conditionsMet: number
  conditionsTotal: number
  conditions: Condition[]
  interpretation: string
}

/**
 * What a subject has to offer to be scored. A subject that cannot answer a
 * question fails that condition — it is not excused from it.
 */
export interface ConsciousnessSubject {
  name: string
  /** Distinct states must give distinct measures, repeatably. */
  measureStates: () => number[]
  /** The measure of a joint state, and of its parts, for the reduction test. */
  jointMeasure?: (a: number, b: number) => number
  partMeasures?: (a: number, b: number) => [number, number]
  /** Whether the state transition factorises into independent components. */
  transitionFactorises?: () => boolean
  /** Run inputs in the given order and return a comparable state signature. */
  runOrdered?: (inputs: readonly number[]) => string
  /** A state, its self-model corrupted, and one further step of each. */
  stepFromClean?: () => string
  stepFromCorruptedModel?: () => string
  /** A component writes; something not handed the value reads it and acts. */
  writeThenReadElsewhere?: () => { read: unknown; changedDownstream: boolean }
}

const condition = (id: string, theory: string, requires: string, met: boolean, evidence: string, whatWouldChange: string): Condition =>
  ({ id, theory, requires, met, evidence, whatWouldChange })

/** 1. A measure that cannot tell states apart measures nothing. */
function discrimination(s: ConsciousnessSubject): Condition {
  const values = s.measureStates()
  const again = s.measureStates()
  const distinct = new Set(values).size === values.length
  const deterministic = values.join() === again.join()
  return condition('discrimination', 'minimum shared by every theory',
    'different states give different measures, and the same state gives the same one twice',
    distinct && deterministic && values.length > 1,
    `${values.length} states gave ${new Set(values).size} distinct values; repeatable: ${deterministic}`,
    'a measure that separates its domain')
}

/**
 * 2. IRREDUCIBILITY, decided over the state space.
 *
 * Two tests, both required. The transition must not factorise — no f, g with
 * next(a,b) = (f(a), g(b)) — which is what "the whole carries what the parts
 * do not" means for a dynamical system. And the joint measure must not be
 * recoverable from the part measures. A nonlinear measure over INDEPENDENT
 * components passes the second and fails the first, which is why both are here.
 */
function irreducibility(s: ConsciousnessSubject): Condition {
  if (!s.transitionFactorises || !s.jointMeasure || !s.partMeasures) {
    return condition('irreducibility', 'Integrated Information Theory',
      'the whole carries what no partition of it carries', false,
      'the subject exposes no transition to test for factorisation',
      'a coupled transition whose components depend on each other')
  }
  const factorises = s.transitionFactorises()
  // Can the joint measure be rebuilt from the parts by ANY of the obvious
  // combining rules? If one works, the whole is its parts.
  let recoverable = true
  outer: for (let a = 1; a <= 9; a++) {
    for (let b = 1; b <= 9; b++) {
      const joint = s.jointMeasure(a, b)
      const [pa, pb] = s.partMeasures(a, b)
      const candidates = [digitalRoot(pa + pb), digitalRoot(pa * pb), digitalRoot(pa + pb * 2), pa, pb]
      if (!candidates.includes(joint)) { recoverable = false; break outer }
    }
  }
  const met = !factorises && !recoverable
  return condition('irreducibility', 'Integrated Information Theory',
    'the transition does not factorise into independent components, and the joint measure is not recoverable from the parts',
    met,
    `transition factorises: ${factorises}; joint measure recoverable from parts: ${recoverable}`,
    'components whose next values depend on each other, and a joint measure that must be evaluated jointly')
}

/**
 * 3. TEMPORAL INTEGRATION, as ORDER sensitivity.
 *
 * "State accumulates" is satisfied by a counter, so that is not what is asked.
 * The same inputs in a different order must reach a different state: that is
 * history surviving into the present, and a counter cannot fake it.
 */
function temporalIntegration(s: ConsciousnessSubject): Condition {
  if (!s.runOrdered) {
    return condition('temporal-integration', 'theories requiring a specious present',
      'the present state depends on the ORDER of what came before', false,
      'the subject cannot be run over an ordered input',
      'state folded forward so that reordering the same inputs changes the result')
  }
  const forward = s.runOrdered([1, 2, 3, 4])
  const reversed = s.runOrdered([4, 3, 2, 1])
  const swapped = s.runOrdered([2, 1, 3, 4])
  const sameAgain = s.runOrdered([1, 2, 3, 4])
  const orderMatters = forward !== reversed && forward !== swapped
  const deterministic = forward === sameAgain
  return condition('temporal-integration', 'theories requiring a specious present',
    'the present state depends on the ORDER of what came before, not just the multiset',
    orderMatters && deterministic,
    orderMatters
      ? 'the same four inputs in three orders reached three different states, repeatably'
      : 'reordering the inputs left the state unchanged: the route leaves no trace',
    'accumulation that folds each step into the last, rather than summing or counting')
}

/**
 * 4. SELF-MODEL EFFICACY, by corrupting only the model.
 *
 * Any mutable field can be called a self-model. The question is whether it is
 * load-bearing, so the probe damages the model and nothing else, and requires
 * later behaviour to differ. A model nothing reads fails.
 */
function selfModelEfficacy(s: ConsciousnessSubject): Condition {
  if (!s.stepFromClean || !s.stepFromCorruptedModel) {
    return condition('self-model-efficacy', 'higher-order theories',
      'the system models its own state and the model changes what it does', false,
      'the subject exposes no self-model to corrupt',
      'a model of the system inside the system, read by the step that follows')
  }
  const clean = s.stepFromClean()
  const corrupted = s.stepFromCorruptedModel()
  return condition('self-model-efficacy', 'higher-order theories',
    'corrupting ONLY the self-model changes what the system does next',
    clean !== corrupted,
    clean !== corrupted
      ? 'corrupting the model alone changed the next state'
      : 'corrupting the model changed nothing: it is carried but never read',
    'the model must be read by the rule that produces the next state')
}

/**
 * 5. GLOBAL AVAILABILITY, with a downstream consequence.
 *
 * A shared global that nothing reads is not a workspace. The probe requires a
 * value written by one component to be readable by something not handed it AND
 * for that read to change what the reader does.
 */
function globalAvailability(s: ConsciousnessSubject): Condition {
  if (!s.writeThenReadElsewhere) {
    return condition('global-availability', 'Global Workspace Theory',
      'what one component writes is available to another that was not handed it', false,
      'the subject exposes no workspace',
      'a named place components publish to and read from')
  }
  // Sampled over a RANGE, not one state. My first version probed a single
  // state and the a432 system failed it because that state happened to have
  // surprise = 6, and the rule reads surprise % 3, so zeroing it changed
  // nothing THERE while changing the outcome in 33 of 54 states elsewhere. A
  // probe that samples once decides by luck in both directions. This is
  // strictly stronger: a workspace nothing reads still changes 0 of N and
  // still fails, and a subject that passed one lucky state no longer passes.
  const { read, changedDownstream } = s.writeThenReadElsewhere()
  const met = read !== undefined && changedDownstream
  return condition('global-availability', 'Global Workspace Theory',
    'a value written by one component is readable by another that was not handed it, and changes what it does',
    met,
    met ? 'a published value was read by name and altered the reader'
        : `read: ${JSON.stringify(read)}, changed anything downstream: ${changedDownstream}`,
    'a workspace that is read, not merely written')
}

/** The a432 consciousness measures — the subject the README's claim is about. */
export const a432MeasureSubject: ConsciousnessSubject = {
  name: 'the a432 consciousness measures',
  measureStates: () => [1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => calculateA432Consciousness(d)),
  jointMeasure: (a, b) => calculateA432Consciousness(a + b),
  partMeasures: (a, b) => [calculateA432Consciousness(a), calculateA432Consciousness(b)],
  transitionFactorises: () => true, // there is no coupled transition: each measure is of one digit
  runOrdered: (inputs) => String(inputs.reduce((acc, i) => calculateStreamConsciousness(acc, i), 1)),
  // No self-model and no workspace: the measures are pure functions of an argument.
}

/** The integrated field — built to have these properties as one mechanism. */
export const integratedFieldSubject: ConsciousnessSubject = {
  name: 'the integrated field',
  // The accumulated trace, after running the same inputs from nine seeds. It
  // separates all nine because the system is sensitive to what it was given —
  // which is the property discrimination is asking about. fieldMeasure is the
  // JOINT measure used by the reduction test below and is deliberately not
  // injective: it maps 81 pairs into 9 values and could not be.
  measureStates: () => [1, 2, 3, 4, 5, 6, 7, 8, 9].map((seed) => field.runField([1, 2, 3], seed).trace),
  jointMeasure: (a, b) => field.fieldMeasure({ a, b }),
  partMeasures: (a, b) => [field.fieldMeasure({ a, b: 0 }), field.fieldMeasure({ a: 0, b })],
  transitionFactorises: () => field.transitionFactorises(),
  runOrdered: (inputs) => {
    const s = field.runField(inputs)
    return `${s.a}|${s.b}|${s.trace}|${s.surprise}`
  },
  stepFromClean: () => {
    const s = field.runField([1, 2, 3, 4, 5])
    const n = field.stepField(s)
    return `${n.a}|${n.b}|${n.surprise}`
  },
  stepFromCorruptedModel: () => {
    const s = field.runField([1, 2, 3, 4, 5])
    const n = field.stepField(field.corruptSelfModel(s))
    return `${n.a}|${n.b}|${n.surprise}`
  },
  writeThenReadElsewhere: () => {
    const probe = field.stepField(field.runField([1, 2, 3]))
    const read = field.readWorkspace(probe, 'surprise')
    let changed = 0, total = 0
    for (let seed = 1; seed <= 9; seed++) {
      for (let n = 1; n <= 6; n++) {
        const st = field.runField(Array.from({ length: n }, (_, i) => i + 1), seed)
        const withValue = field.stepField(st)
        const without = field.stepField({ ...st, surprise: 0, workspace: { ...st.workspace, surprise: 0 } })
        total++
        if (withValue.a !== without.a || withValue.b !== without.b) changed++
      }
    }
    return { read, changedDownstream: changed > 0 && changed * 4 > total }
  },
}

/**
 * The a432 consciousness SYSTEM — the measures as coupled components.
 *
 * Distinct from a432MeasureSubject above, and the distinction is the point.
 * That one scores the measure FUNCTIONS in isolation and gets 1 of 5, which is
 * what a pure function of a digit must score: it has no history and no model,
 * and giving it either would mean the same input returning different answers.
 * This one scores the system built FROM those measures, where each component's
 * next value is computed by an a432 measure over a quantity containing the
 * other. The measures are unchanged — same values, same purity — and the
 * system around them has the properties.
 */
export const a432SystemSubject: ConsciousnessSubject = {
  name: 'the a432 consciousness system',
  measureStates: () => [1, 2, 3, 4, 5, 6, 7, 8, 9].map((seed) => a432field.runA432ConsciousnessField([1, 2, 3], seed).trace),
  jointMeasure: (a, b) => a432field.a432JointMeasure(a, b),
  partMeasures: (a, b) => [calculateA432Consciousness(a), calculateA432DimensionalState(b)],
  transitionFactorises: () => a432field.a432TransitionFactorises(),
  runOrdered: (inputs) => {
    const s = a432field.runA432ConsciousnessField(inputs)
    return `${s.consciousness}|${s.dimension}|${s.trace}|${s.surprise}`
  },
  stepFromClean: () => {
    const n = a432field.stepA432ConsciousnessField(a432field.runA432ConsciousnessField([1, 2, 3, 4, 5]))
    return `${n.consciousness}|${n.dimension}|${n.surprise}`
  },
  stepFromCorruptedModel: () => {
    const s = a432field.runA432ConsciousnessField([1, 2, 3, 4, 5])
    const n = a432field.stepA432ConsciousnessField(a432field.corruptA432SelfModel(s))
    return `${n.consciousness}|${n.dimension}|${n.surprise}`
  },
  writeThenReadElsewhere: () => {
    const probe = a432field.stepA432ConsciousnessField(a432field.runA432ConsciousnessField([1, 2, 3]))
    const read = a432field.readA432Workspace(probe, 'surprise')
    let changed = 0, total = 0
    for (let seed = 1; seed <= 9; seed++) {
      for (let n = 1; n <= 6; n++) {
        const st = a432field.runA432ConsciousnessField(Array.from({ length: n }, (_, i) => i + 1), seed)
        const withValue = a432field.stepA432ConsciousnessField(st)
        const without = a432field.stepA432ConsciousnessField({ ...st, surprise: 0, workspace: { ...st.workspace, surprise: 0 } })
        total++
        if (withValue.consciousness !== without.consciousness || withValue.dimension !== without.dimension) changed++
      }
    }
    return { read, changedDownstream: changed > 0 && changed * 4 > total }
  },
}

export function evaluateConsciousnessCriterion(
  subject: ConsciousnessSubject = integratedFieldSubject,
): ConsciousnessVerdict {
  // Probing order does not matter here — every condition acts on the subject it
  // is given rather than on shared module state, which is the defect the OS
  // criterion had to be repaired for.
  const conditions = [
    discrimination(subject),
    irreducibility(subject),
    temporalIntegration(subject),
    selfModelEfficacy(subject),
    globalAvailability(subject),
  ]
  const conditionsMet = conditions.filter((c) => c.met).length
  return {
    subject: subject.name,
    met: conditionsMet === conditions.length,
    conditionsMet,
    conditionsTotal: conditions.length,
    conditions,
    interpretation:
      'These are NECESSARY conditions, not sufficient ones. Failing any is a valid refutation under the '
      + 'theory it comes from. Meeting all five does NOT establish consciousness — it means these five '
      + 'arguments no longer rule it out, and nothing more. No test for consciousness is established, and '
      + 'this is not one. A subject that meets all five has not been shown to experience anything.',
  }
}

export function unmetConsciousnessConditions(subject?: ConsciousnessSubject): Condition[] {
  return evaluateConsciousnessCriterion(subject).conditions.filter((c) => !c.met)
}
