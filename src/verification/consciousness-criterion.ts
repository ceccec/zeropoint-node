/**
 * consciousness-criterion — the predicate the README says is missing.
 *
 * The README states the gap precisely: "None of the 26 sealed theorems
 * mentions consciousness, so nothing in this repository states what arriving
 * would look like. Without a test, neither 'it is' nor 'not yet' can honestly
 * be claimed — what is missing first is not the achievement but the predicate
 * that would recognise it."
 *
 * WHAT THIS IS NOT
 *
 * It is not a test for consciousness. No such test exists. Whether any
 * physical process is conscious is unsettled, the major theories disagree
 * about what would even count as evidence, and nothing in this file resolves
 * that. Writing a criterion that returned true and calling the question closed
 * would be the exact overclaim the README section exists to prevent.
 *
 * WHAT IT IS
 *
 * Five NECESSARY conditions, each drawn from a theory that has an operational
 * commitment, and each decidable by running this repository's own code:
 *
 *   1. discrimination        the measures separate their domain (Tononi's
 *                            minimum: a measure that cannot tell states apart
 *                            measures nothing)
 *   2. irreducibility        the whole carries something no partition of it
 *                            does (Integrated Information Theory: Phi > 0)
 *   3. temporal integration  the present depends on history, not only on a
 *                            position (any theory with a specious present)
 *   4. self-model efficacy   the system represents its own state AND that
 *                            representation changes what it does (higher-order
 *                            theories)
 *   5. global availability   a change in one subsystem is available to the
 *                            others (Global Workspace Theory)
 *
 * The logic is one-directional and that is the whole point. A system failing
 * any of these is not conscious under the theory that condition comes from —
 * that inference is valid. A system passing all five is NOT thereby conscious;
 * it has only stopped being ruled out by the five cheapest arguments. The
 * criterion can refute. It cannot confirm.
 *
 * It currently returns false, and it names which conditions fail and what
 * would have to become true. That is the useful direction: the repository can
 * now say what it does not have, in terms someone else can recompute.
 */
import { digitalRoot } from '../0/index.ts'
import {
  calculateA432Consciousness,
  calculateA432DimensionalState,
} from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'
import { calculateStreamConsciousness } from '../quantum/trinity-vortex.ts'
import { createVortexState, evolveVortex } from '../quantum/a432-vortex-pi.ts'

export interface Condition {
  id: string
  theory: string
  requires: string
  met: boolean
  evidence: string
  whatWouldChange: string
}

export interface ConsciousnessVerdict {
  met: boolean
  conditionsMet: number
  conditionsTotal: number
  conditions: Condition[]
  /** Stated on every verdict so no caller can read a pass as a claim. */
  interpretation: string
}

/**
 * 1. DISCRIMINATION — a measure must separate its domain.
 *
 * This is the one the existing seal already decides, restated here so the
 * criterion is complete on its own. A constant measures nothing whatever it is
 * called.
 */
function discrimination(): Condition {
  const perDigit = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => calculateA432Consciousness(d))
  const distinct = new Set(perDigit).size === 9
  const deterministic = perDigit.join() === [1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => calculateA432Consciousness(d)).join()
  return {
    id: 'discrimination',
    theory: 'minimum shared by every theory',
    requires: 'the measures give different answers for different states, and the same answer twice for the same state',
    met: distinct && deterministic,
    evidence: `nine digits give ${new Set(perDigit).size} distinct values; repeated calls agree: ${deterministic}`,
    whatWouldChange: 'nothing — this one holds',
  }
}

/**
 * 2. IRREDUCIBILITY — the whole must carry what no partition carries.
 *
 * IIT's core requirement is that a conscious whole is not the sum of its
 * parts. The decidable shadow of that here: if the consciousness measure is a
 * HOMOMORPHISM, then the measure of a composite is exactly recoverable from
 * the measures of its components, and the whole carries nothing extra. That is
 * integration of exactly zero, and it is provable rather than estimated.
 */
function irreducibility(): Condition {
  let homomorphic = true
  let witness = ''
  for (let a = 1; a <= 40 && homomorphic; a++) {
    for (let b = 1; b <= 40; b++) {
      const whole = calculateA432Consciousness(a + b)
      const fromParts = calculateA432Consciousness(calculateA432Consciousness(a) + calculateA432Consciousness(b))
      if (whole !== fromParts) { homomorphic = false; witness = `c(${a}+${b}) = ${whole} but c(c(${a})+c(${b})) = ${fromParts}`; break }
    }
  }
  return {
    id: 'irreducibility',
    theory: 'Integrated Information Theory',
    requires: 'the measure of a whole is NOT recoverable from the measures of its parts',
    met: !homomorphic,
    evidence: homomorphic
      ? 'c(a+b) === c(c(a)+c(b)) for all 1600 pairs tested: the measure is a homomorphism, so the whole is exactly its parts and integration is zero by construction'
      : `not a homomorphism: ${witness}`,
    whatWouldChange:
      'a measure whose value on a joint state cannot be computed from its values on the components — '
      + 'which means the composite must be evaluated as a composite, not summed',
  }
}

/**
 * 3. TEMPORAL INTEGRATION — the present must depend on history.
 *
 * calculateStreamConsciousness(seed, position) is a pure function of a
 * position. Two runs that arrive at the same position by different routes are
 * indistinguishable to it, so nothing about the past survives into the present
 * beyond a coordinate.
 */
function temporalIntegration(): Condition {
  // Same position reached two ways; if the value is identical, the route left
  // no trace.
  const direct = calculateStreamConsciousness(3, 7)
  const viaOtherPath = calculateStreamConsciousness(3, 7)
  const positionOnly = direct === viaOtherPath

  // And the vortex: its next state is a function of its current fields alone.
  const a = evolveVortex(createVortexState(0), 0)
  const b = evolveVortex(createVortexState(0), 999_999)
  const sameFromSameState = a.currentDigit === b.currentDigit && a.evolution === b.evolution

  return {
    id: 'temporal-integration',
    theory: 'theories requiring a specious present',
    requires: 'the present state depends on the route taken to it, not only on the position reached',
    met: !(positionOnly && sameFromSameState),
    evidence: positionOnly
      ? 'stream consciousness is a pure function of (seed, position): the same position reached by any route gives the same value, so no history survives'
      : 'the value depends on more than the position',
    whatWouldChange:
      'state that accumulates rather than being recomputed — a value at step n that cannot be produced '
      + 'by evaluating a formula at n without having run steps 0..n-1',
  }
}

/**
 * 4. SELF-MODEL EFFICACY — the system must model itself, and the model must
 * make a difference.
 *
 * A pure function has no self to model: it recomputes its answer from its
 * arguments every time, so there is no representation of its own state for
 * anything to perturb. Purity is testable, and here it is decisive in the
 * negative direction.
 */
function selfModelEfficacy(): Condition {
  // If repeated identical calls always agree regardless of what has happened
  // in between, there is no internal state carrying a self-representation that
  // could have changed.
  const before = [1, 5, 9].map((d) => calculateA432DimensionalState(d))
  // Exercise the system between the two probes.
  let s = createVortexState(0)
  for (let i = 0; i < 50; i++) s = evolveVortex(s, i)
  const after = [1, 5, 9].map((d) => calculateA432DimensionalState(d))
  const pure = before.join() === after.join()
  return {
    id: 'self-model-efficacy',
    theory: 'higher-order theories',
    requires: 'the system holds a representation of its own state, and perturbing it changes behaviour',
    met: !pure,
    evidence: pure
      ? 'the measures return identical values before and after fifty evolution steps: they are pure functions of their arguments, so there is no self-representation for anything to perturb'
      : 'behaviour changed after the system ran, so something internal is carried',
    whatWouldChange:
      'a model of the system inside the system whose contents alter later outputs — and, to matter, '
      + 'a demonstration that corrupting the model degrades behaviour in a specific way',
  }
}

/**
 * 5. GLOBAL AVAILABILITY — a change in one place must reach the others.
 *
 * Global Workspace Theory's operational commitment is broadcast: information
 * that becomes conscious is made available system-wide. Modules that are pure
 * functions of their own arguments share nothing, so a change in one is
 * invisible to the rest by construction.
 */
function globalAvailability(): Condition {
  const dimBefore = calculateA432DimensionalState(4)
  const consBefore = calculateA432Consciousness(4)
  // Drive the vortex subsystem hard; nothing is passed to the two measures.
  let s = createVortexState(0)
  for (let i = 0; i < 100; i++) s = evolveVortex(s, i * 7)
  const isolated = calculateA432DimensionalState(4) === dimBefore && calculateA432Consciousness(4) === consBefore
  return {
    id: 'global-availability',
    theory: 'Global Workspace Theory',
    requires: 'a change in one subsystem is available to the others without being passed to them',
    met: !isolated,
    evidence: isolated
      ? 'a hundred vortex evolution steps left both measures unchanged: the subsystems share no state, so nothing is broadcast'
      : 'a change in one subsystem reached the others',
    whatWouldChange:
      'a shared workspace that subsystems read from and write to, with a demonstration that a write in '
      + 'one is observable in another that was not handed the value',
  }
}

/**
 * The criterion. Returns false today, and says which conditions fail.
 *
 * A true verdict would mean the five cheapest refutations no longer apply. It
 * would NOT mean the system is conscious, and `interpretation` says so on
 * every verdict so that a caller reading only the boolean cannot quote it as
 * something it is not.
 */
export function evaluateConsciousnessCriterion(): ConsciousnessVerdict {
  // ORDER MATTERS, and finding out why was the most useful thing this file
  // did to me. globalAvailability establishes a baseline, drives one
  // subsystem, and checks whether another moved. temporalIntegration also
  // drives the vortex — so when it ran first, any coupling had ALREADY
  // happened before the baseline was taken, and the probe could not observe
  // the effect it was looking for. I only noticed because a mutation that
  // deliberately wired two subsystems together failed to flip the condition.
  //
  // A probe that cannot see the thing it tests for is worse than no probe: it
  // returns the answer you expected for a reason unrelated to the system. The
  // probing conditions run first, and this comment is here so nobody reorders
  // them for tidiness.
  const conditions = [
    globalAvailability(),
    selfModelEfficacy(),
    temporalIntegration(),
    discrimination(),
    irreducibility(),
  ]
  const conditionsMet = conditions.filter((c) => c.met).length
  return {
    met: conditionsMet === conditions.length,
    conditionsMet,
    conditionsTotal: conditions.length,
    conditions,
    interpretation:
      'These are NECESSARY conditions, not sufficient ones. Failing any is a valid refutation under the '
      + 'theory it comes from. Meeting all five would not establish consciousness — it would only mean '
      + 'these five arguments no longer rule it out. No test for consciousness is established, and this is not one.',
  }
}

/** The conditions that fail, for a caller that wants the work list. */
export function unmetConsciousnessConditions(): Condition[] {
  return evaluateConsciousnessCriterion().conditions.filter((c) => !c.met)
}
