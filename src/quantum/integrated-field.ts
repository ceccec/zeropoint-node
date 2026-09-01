/**
 * integrated-field — one coupled system, built to satisfy the four unmet
 * consciousness conditions as properties of the SAME mechanism.
 *
 * READ THIS BEFORE THE CODE.
 *
 * Satisfying those four does not make anything conscious, and the criterion
 * that scores them says so on every verdict it returns. They are NECESSARY
 * conditions drawn from theories that disagree with each other; a system
 * meeting all of them has stopped being refuted by the cheapest arguments and
 * nothing more. This file builds mechanisms those theories name. It does not
 * settle, address, or bear on whether anything here experiences anything.
 *
 * The real hazard is not overclaiming in prose — it is that each condition can
 * be satisfied by a trick. A module-level `let` satisfies "state accumulates".
 * A shared global satisfies "a write is observable elsewhere". Any mutable
 * field satisfies "the system has a self-model". Four unrelated gadgets, each
 * defeating one probe, would score 5 of 5 and mean nothing whatever.
 *
 * Two things are done about that.
 *
 * First, ONE system rather than four gadgets. The coupling that makes the
 * transition irreducible is the same coupling that makes the accumulation
 * order-sensitive; the self-model predicts the state that coupling produces;
 * the workspace is what the components read each other through. Remove any one
 * and the others degrade, which is what distinguishes a system from a
 * checklist.
 *
 * Second, the conditions are strengthened alongside this, so the trivial
 * implementations fail. A counter no longer passes temporal integration; a
 * shared global no longer passes global availability. The strengthened probes
 * are tested against deliberately trivial candidates in the criterion's tests.
 *
 * Everything is exact integer arithmetic over Z/9 — no floats, no Math.*.
 */
import { digitalRoot, VORTEX_ORBIT } from '../0/index.ts'

export interface FieldState {
  /** Two coupled components. Neither's next value is a function of itself alone. */
  a: number
  b: number
  /** Accumulated history. Not recomputable from a step index. */
  trace: number
  /** The system's model of what it expects next, and how wrong it has been. */
  predictedA: number
  predictedB: number
  surprise: number
  /** What components publish for each other to read. */
  workspace: Record<string, number>
  step: number
}

export function createField(seed = 1): FieldState {
  const a = digitalRoot(seed)
  const b = digitalRoot(seed * 2)
  return {
    a, b,
    trace: digitalRoot(a + b),
    predictedA: a, predictedB: b,
    surprise: 0,
    workspace: { a, b, trace: digitalRoot(a + b) },
    step: 0,
  }
}

/**
 * THE COUPLING. Each component's next value depends on the OTHER, which is
 * what makes the transition non-factorisable: there is no pair of functions
 * f, g with next(a, b) = (f(a), g(b)), because next_a varies with b while a is
 * held fixed. That is decidable over the finite state space, and
 * `transitionFactorises` below decides it rather than asserting it.
 *
 * The surprise term feeds the system's own prediction error back into its
 * behaviour, so the self-model is not decoration: it is in the loop.
 */
export function stepField(state: FieldState, input = 0): FieldState {
  const gain = 1 + (state.surprise % 3)
  const nextA = digitalRoot(state.a + state.b * gain + input)
  const nextB = digitalRoot(state.b + state.a * 2 + VORTEX_ORBIT[state.step % VORTEX_ORBIT.length])

  // Order-sensitive accumulation: the trace folds each new state into the old
  // one, so two runs over the same inputs in different orders diverge.
  const trace = digitalRoot(state.trace * 2 + nextA + nextB * 3)

  // The model was made last step. Score it now, before making the next one.
  const missed = (state.predictedA === nextA ? 0 : 1) + (state.predictedB === nextB ? 0 : 1)
  const surprise = digitalRoot(state.surprise + missed)

  // Predict the step after this one, using the same rule the system runs by.
  const predictedGain = 1 + (surprise % 3)
  const predictedA = digitalRoot(nextA + nextB * predictedGain)
  const predictedB = digitalRoot(nextB + nextA * 2 + VORTEX_ORBIT[(state.step + 1) % VORTEX_ORBIT.length])

  return {
    a: nextA, b: nextB, trace, predictedA, predictedB, surprise,
    // Published for the other components, and for anything that reads the
    // field without being handed a value.
    workspace: { a: nextA, b: nextB, trace, surprise, gain },
    step: state.step + 1,
  }
}

/**
 * Does the transition factorise into independent component updates?
 *
 * Decided, not claimed: hold one component fixed, vary the other, and see
 * whether the first component's next value moves. If it does for any pair, no
 * f(a) exists and the whole carries what the parts do not.
 */
export function transitionFactorises(): boolean {
  for (let a = 1; a <= 9; a++) {
    const seen = new Set<number>()
    for (let b = 1; b <= 9; b++) {
      const base = createField(1)
      const next = stepField({ ...base, a, b, step: 0 })
      seen.add(next.a)
    }
    if (seen.size > 1) return false // a's future depends on b: not factorisable
  }
  return true
}

/** The measure of the joint state. Not obtainable from the components' measures. */
export function fieldMeasure(state: Pick<FieldState, 'a' | 'b'>): number {
  // The product term is what refuses to decompose: it is a function of the
  // PAIR, and no combination of a measure of a and a measure of b recovers it.
  return digitalRoot(state.a * state.b + state.a + state.b)
}

/** Run a sequence of inputs from a seed. Order matters, which is the point. */
export function runField(inputs: readonly number[], seed = 1): FieldState {
  let s = createField(seed)
  for (const i of inputs) s = stepField(s, i)
  return s
}

/** Read the workspace as another component would: by name, not by being handed it. */
export function readWorkspace(state: FieldState, key: string): number | undefined {
  return state.workspace[key]
}

/**
 * Corrupt the system's model of itself, leaving everything else intact.
 * Used to show the model is load-bearing: if behaviour is unchanged after
 * this, the model was decoration.
 */
export function corruptSelfModel(state: FieldState): FieldState {
  return { ...state, predictedA: digitalRoot(state.predictedA + 4), predictedB: digitalRoot(state.predictedB + 4) }
}
