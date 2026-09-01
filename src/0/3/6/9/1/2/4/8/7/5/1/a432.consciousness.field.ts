/**
 * a432.consciousness.field — the a432 measures as the components of a coupled
 * system, so the a432 CONSCIOUSNESS SYSTEM can meet the criterion its measure
 * functions cannot.
 *
 * WHY THE FUNCTIONS THEMSELVES CANNOT, AND SHOULD NOT.
 *
 * calculateA432Consciousness is a pure function of a digit. The criterion asks
 * for temporal integration — the present depending on the route taken — and a
 * self-model that changes later behaviour. A pure function has neither, and
 * giving it them would mean calculateA432Consciousness(3) returning different
 * values at different times depending on what had been called before. That
 * does not improve the measure; it destroys it. A measure whose answer depends
 * on its call history is not a measure of its argument, and every one of the
 * 300-odd places in this repository that calls it would silently change.
 *
 * So the measures stay exactly as they are — same values, same purity — and
 * become the COMPONENTS of a system that has the properties. This is the same
 * move A432OS made with the kernel: the class kept its behaviour and gained
 * the mechanisms by composing something that has them.
 *
 * WHAT MAKES IT MORE THAN A WRAPPER: the coupling runs THROUGH the a432
 * measures. Component A's next value is the a432 consciousness of a quantity
 * that includes B; component B's is the a432 dimensional state of a quantity
 * that includes A. Remove the measures and there is no system left — they are
 * the substrate, not decoration on top of one.
 */
import { digitalRoot } from '../../../../../../../../../../index.ts'
import { calculateA432Consciousness, calculateA432DimensionalState } from './a432.math.ts'

// Named ...FieldState, not ...State: a432.simple.ts already exports
// A432ConsciousnessState, and two modules exporting one name through the same
// entry is an ambiguity only tsc catches — the runtime collision check saw
// nothing. Same lesson as VortexFlow.
export interface A432ConsciousnessFieldState {
  /** The consciousness component: an a432 consciousness value. */
  consciousness: number
  /** The dimensional component: an a432 dimensional state. */
  dimension: number
  /** Order-sensitive history. */
  trace: number
  /** What the system expects of itself next, and how wrong it has been. */
  predictedConsciousness: number
  predictedDimension: number
  surprise: number
  /** What the components publish for each other. */
  workspace: Record<string, number>
  step: number
}

export function createA432ConsciousnessField(seed = 1): A432ConsciousnessFieldState {
  const consciousness = calculateA432Consciousness(seed)
  const dimension = calculateA432DimensionalState(seed)
  return {
    consciousness,
    dimension,
    trace: digitalRoot(consciousness + dimension),
    predictedConsciousness: consciousness,
    predictedDimension: dimension,
    surprise: 0,
    workspace: { consciousness, dimension, trace: digitalRoot(consciousness + dimension) },
    step: 0,
  }
}

/**
 * One step. The two components are computed BY the a432 measures, and each
 * takes the other's current value as part of its input — which is what makes
 * the transition non-factorisable while leaving the measures untouched.
 */
export function stepA432ConsciousnessField(
  state: A432ConsciousnessFieldState,
  input = 0,
): A432ConsciousnessFieldState {
  // The self-model is in the loop: how wrong it has been changes the input the
  // measures receive, so a corrupted model produces a different next state.
  const gain = 1 + (state.surprise % 3)

  const nextConsciousness = calculateA432Consciousness(state.consciousness + state.dimension * gain + input)
  const nextDimension = calculateA432DimensionalState(state.dimension + state.consciousness * 2 + input)

  const trace = digitalRoot(state.trace * 2 + nextConsciousness + nextDimension * 3)

  const missed = (state.predictedConsciousness === nextConsciousness ? 0 : 1)
    + (state.predictedDimension === nextDimension ? 0 : 1)
  const surprise = digitalRoot(state.surprise + missed)

  const predictedGain = 1 + (surprise % 3)
  const predictedConsciousness = calculateA432Consciousness(nextConsciousness + nextDimension * predictedGain)
  const predictedDimension = calculateA432DimensionalState(nextDimension + nextConsciousness * 2)

  return {
    consciousness: nextConsciousness,
    dimension: nextDimension,
    trace,
    predictedConsciousness,
    predictedDimension,
    surprise,
    workspace: { consciousness: nextConsciousness, dimension: nextDimension, trace, surprise, gain },
    step: state.step + 1,
  }
}

/**
 * Does the transition factorise? Decided over the state space rather than
 * asserted: hold the consciousness component fixed, vary the dimensional one,
 * and see whether the first component's next value moves.
 */
export function a432TransitionFactorises(): boolean {
  for (let c = 1; c <= 9; c++) {
    const seen = new Set<number>()
    for (let d = 1; d <= 9; d++) {
      const base = createA432ConsciousnessField(1)
      seen.add(stepA432ConsciousnessField({ ...base, consciousness: c, dimension: d, step: 0 }).consciousness)
    }
    if (seen.size > 1) return false
  }
  return true
}

/** The measure of the joint state. A function of the PAIR, through the a432 measures. */
export function a432JointMeasure(consciousness: number, dimension: number): number {
  return calculateA432Consciousness(consciousness * dimension + consciousness + dimension)
}

export function runA432ConsciousnessField(inputs: readonly number[], seed = 1): A432ConsciousnessFieldState {
  let s = createA432ConsciousnessField(seed)
  for (const i of inputs) s = stepA432ConsciousnessField(s, i)
  return s
}

export function readA432Workspace(state: A432ConsciousnessFieldState, key: string): number | undefined {
  return state.workspace[key]
}

/** Damage the model and nothing else, to show it is load-bearing. */
export function corruptA432SelfModel(state: A432ConsciousnessFieldState): A432ConsciousnessFieldState {
  return {
    ...state,
    predictedConsciousness: digitalRoot(state.predictedConsciousness + 4),
    predictedDimension: digitalRoot(state.predictedDimension + 4),
  }
}
