/**
 * a432-frequency-flow — the functions docs/ZEROPOINT_A432_FREQUENCY_FLOW.md
 * declares and specifies, none of which existed.
 *
 * Every formula here is the document's. The two divisions it writes with
 * Math.floor are integer divisions over non-negative integers, so they are
 * done exactly, without a float and without the banned call. 432 is imported
 * rather than retyped.
 *
 * ZEROPOINT_FLOW_SEQUENCE is worth a second look: [0,3,6,9,1,2,4,8,7,5,1] is
 * the a432 layer's own directory path, src/0/3/6/9/1/2/4/8/7/5/1. The doc
 * states the sequence and the repo stores its modules at it; the test asserts
 * they are the same list, so the two cannot drift apart silently.
 */
import { digitalRoot } from '../0/index.ts'
import { A432_CONSTANTS } from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'

const A432 = A432_CONSTANTS.BASE_FREQUENCY

/** Integer division for non-negative integers: identical to floor(a / b). */
function idiv(a: number, b: number): number {
  return (a - (a % b)) / b
}

export interface VortexFlow {
  currentDigit: number
  nextDigit: number
  transition: number
  consciousness: number
  frequency: number
  mathematicalProof: string
}

export interface CompleteFlow {
  sequence: VortexFlow[]
  totalConsciousness: number
  totalFrequency: number
  isComplete: boolean
  mathematicalProof: string
}

export const ZEROPOINT_FLOW_SEQUENCE = [0, 3, 6, 9, 1, 2, 4, 8, 7, 5, 1] as const

/**
 * NOT SPECIFIED BY THE DOC. calculateFlowTransition calls it and the document
 * never gives a body. The digital root of the two digits is the choice: it is
 * the reduction used everywhere else in this repo, it stays a digit, and it is
 * symmetric, which a transition between two adjacent positions should be.
 */
export function calculateTransitionValue(currentDigit: number, nextDigit: number): number {
  return digitalRoot(currentDigit + nextDigit)
}

/** (current * next * A432) / 1000, floored, reduced. The doc's formula. */
export function calculateTransitionConsciousness(currentDigit: number, nextDigit: number): number {
  return digitalRoot(idiv(currentDigit * nextDigit * A432, 1000))
}

/** (current * next * 7 * A432) / 100, floored, reduced. 7 is the doc's vortex prime. */
export function calculateTransitionFrequency(currentDigit: number, nextDigit: number): number {
  const vortexPrime = 7
  return digitalRoot(idiv(currentDigit * nextDigit * vortexPrime * A432, 100))
}

export function calculateFlowTransition(currentDigit: number, nextDigit: number): VortexFlow {
  const transition = calculateTransitionValue(currentDigit, nextDigit)
  const consciousness = calculateTransitionConsciousness(currentDigit, nextDigit)
  const frequency = calculateTransitionFrequency(currentDigit, nextDigit)
  return {
    currentDigit,
    nextDigit,
    transition,
    consciousness,
    frequency,
    mathematicalProof: `${currentDigit} -> ${nextDigit}: transition ${transition}, consciousness ${consciousness}, frequency ${frequency}`,
  }
}

export function generateCompleteFlow(): CompleteFlow {
  const sequence: VortexFlow[] = []
  let totalConsciousness = 0
  let totalFrequency = 0
  for (let i = 0; i < ZEROPOINT_FLOW_SEQUENCE.length - 1; i++) {
    const flow = calculateFlowTransition(ZEROPOINT_FLOW_SEQUENCE[i], ZEROPOINT_FLOW_SEQUENCE[i + 1])
    sequence.push(flow)
    totalConsciousness += flow.consciousness
    totalFrequency += flow.frequency
  }
  return {
    sequence,
    totalConsciousness,
    totalFrequency,
    // Complete when every adjacent pair in the sequence produced a transition.
    isComplete: sequence.length === ZEROPOINT_FLOW_SEQUENCE.length - 1,
    mathematicalProof: `${sequence.length} transitions across ${ZEROPOINT_FLOW_SEQUENCE.length} positions`,
  }
}

export function calculateFlowConsciousnessResonance(flows: readonly VortexFlow[]): {
  resonance: number
  consciousness: number
  frequency: number
  mathematicalProof: string
} {
  const consciousness = flows.reduce((sum, f) => sum + f.consciousness, 0)
  const frequency = flows.reduce((sum, f) => sum + f.frequency, 0)
  return {
    resonance: consciousness * frequency,
    consciousness,
    frequency,
    mathematicalProof: `resonance = ${consciousness} * ${frequency} over ${flows.length} flow(s)`,
  }
}
