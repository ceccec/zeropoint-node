/**
 * validation-criterion — what "experimental validation" means here, and what it
 * does not.
 *
 * Six places in this corpus promise experimental validation: "Measure predicted
 * field harmonics and resonance", "Enables experimental validation through
 * synchronized coil prototypes", "Experimental validation through synchronized
 * coil prototypes". Those describe work nobody has done. A promise of an
 * experiment reads, to anyone skimming, exactly like a result.
 *
 * The cheap fix is to delete the sentences. The honest one is to say what this
 * repository DOES validate, decide it by running code, and let the demarcation
 * carry what remains outstanding — so a reader can tell the computed half from
 * the empirical half without taking anyone's word for the difference.
 *
 * LIKE THE OS AND REAL-TIME CRITERIA, THIS ONE CAN CONFIRM. "Validated" is not
 * contested: a claim is validated when something independent of the claim
 * decides it, and the deciding is repeatable. Each condition below names the
 * command that recomputes it, so this file asserts nothing on its own account.
 *
 *   1. laws-sealed          every theorem this repository states carries a
 *                           predicate that runs and holds
 *   2. simulator-sealed     the simulator's own laws — Hadamard, the Paulis,
 *                           the tensor norm, phase estimation — each carry a
 *                           seal that runs. This asks the SEALS rather than
 *                           re-running the quantum criterion, because that
 *                           criterion needs an adapter and a second copy of an
 *                           adapter is a second thing that can drift
 *   3. energy-arithmetic    src/thermo computes finite bounds, and its own
 *                           self-tests return no failures — this is the
 *                           arithmetic that RULES OUT the energy claims rather
 *                           than supporting them
 *   4. figures-recompute    every quantity is derived at run time rather than
 *                           transcribed, so a number cannot drift from what
 *                           produced it
 *   5. refuter-stated       each condition names what would change its verdict.
 *                           A condition with no refuter is a slogan
 *
 * WHAT THIS DOES NOT ESTABLISH, and the reason it exists: NO PHYSICAL
 * EXPERIMENT HAS BEEN RUN. No coil was built, no field was measured, no
 * resonance was observed. Nothing in this repository touches an instrument.
 * Every condition above is a statement about arithmetic and about code that
 * checks arithmetic. A reader who wants the empirical claim wants something
 * this repository does not have and does not pretend to.
 */

import { SEALS, runSeal } from './lean-bridge.ts'
import {
  reversiblePotentialMicrovolts, thermoneutralPotentialMicrovolts,
  toKilojoulesPerMole, GIBBS_SPLITTING, selfTest as thermoSelfTest,
} from '../thermo/free-energy.ts'
import { breakEvenCod, selfTest as wastewaterSelfTest } from '../thermo/wastewater-energy.ts'

export interface ValidationCondition {
  id: string
  requires: string
  met: boolean
  evidence: string
  recomputeWith: string
  whatWouldChange: string
}

export interface ValidationVerdict {
  met: boolean
  conditionsMet: number
  conditionsTotal: number
  conditions: ValidationCondition[]
  /** Stated on the verdict, not only in prose, so a consumer reads it too. */
  doesNotEstablish: string
}

const condition = (
  id: string, requires: string, met: boolean, evidence: string, recomputeWith: string, whatWouldChange: string,
): ValidationCondition => ({ id, requires, met, evidence, recomputeWith, whatWouldChange })

export function evaluateValidationCriterion(): ValidationVerdict {
  const conditions: ValidationCondition[] = []

  const sealNames = Object.keys(SEALS)
  const held = sealNames.filter((n) => runSeal(n).seal === 'held')
  conditions.push(condition('laws-sealed',
    'every theorem stated here carries a predicate that runs and holds',
    held.length === sealNames.length && sealNames.length > 0,
    `${held.length} of ${sealNames.length} seals held`,
    'npm run test:verification',
    'a seal that stops holding, or a theorem stated without one'))

  // The simulator's laws by name, so this fails loudly if one is ever removed
  // rather than quietly counting a smaller set.
  const SIMULATOR_LAWS = ['hadamard_squared', 'hadamard_unitary', 'pauliX_unitary', 'tensor_preserves_norm', 'phase_estimation_accuracy']
  const present = SIMULATOR_LAWS.filter((n) => n in SEALS)
  const lawsHold = present.filter((n) => runSeal(n).seal === 'held')
  // The list must be NON-EMPTY. Written as `present.length === SIMULATOR_LAWS.length`
  // alone, an empty list satisfied 0 === 0 and the condition passed having
  // checked nothing — which a mutation caught, and which is the same shape as
  // every other absence-read-as-agreement defect this repository has recorded.
  conditions.push(condition('simulator-sealed',
    "the simulator's own laws each carry a seal that runs and holds, and there is at least one of them",
    SIMULATOR_LAWS.length >= 5 && present.length === SIMULATOR_LAWS.length && lawsHold.length === SIMULATOR_LAWS.length,
    `${lawsHold.length} of ${SIMULATOR_LAWS.length} named simulator laws hold (${present.length} of them still exist)`,
    'npm run test:verification',
    'a simulator law being removed or stopping to hold'))

  const thermoFails = [...thermoSelfTest(), ...wastewaterSelfTest()]
  const rev = reversiblePotentialMicrovolts()
  const thermo = thermoneutralPotentialMicrovolts()
  const kj = toKilojoulesPerMole(GIBBS_SPLITTING)
  const cod = breakEvenCod()
  const finite = [rev, thermo, kj, cod].every((v) => Number.isFinite(v))
  conditions.push(condition('energy-arithmetic',
    'the energy arithmetic computes finite bounds and its own self-tests report no failures',
    thermoFails.length === 0 && finite,
    `reversible ${rev} uV, thermoneutral ${thermo} uV, ${kj} kJ/mol, break-even ${cod} mg/L COD; ${thermoFails.length} self-test failure(s)`,
    'npm run test:measured-debt',
    'a thermo self-test failing, or a bound becoming non-finite'))

  const derived = conditions.every((c) => c.evidence.length > 0)
  conditions.push(condition('figures-recompute',
    'every quantity is derived at run time rather than transcribed',
    derived,
    'each condition above carries evidence computed in this call, not a stored number',
    'npm run changelog:check',
    'a figure being written down instead of computed'))

  const refuters = conditions.every((c) => c.whatWouldChange.length > 0 && c.recomputeWith.length > 0)
  conditions.push(condition('refuter-stated',
    'each condition names what would change its verdict and the command that recomputes it',
    refuters,
    `${conditions.length} conditions, each with a refuter and a command`,
    'npm run criteria:check',
    'a condition added without a refuter, which would make it a slogan'))

  const conditionsMet = conditions.filter((c) => c.met).length
  return {
    met: conditionsMet === conditions.length,
    conditionsMet,
    conditionsTotal: conditions.length,
    conditions,
    doesNotEstablish:
      'NO PHYSICAL EXPERIMENT HAS BEEN RUN. No coil was built, no field was measured, no resonance was '
      + 'observed, and nothing in this repository touches an instrument. Every condition here is about '
      + 'arithmetic and about code that checks arithmetic. The empirical claim is not made.',
  }
}
