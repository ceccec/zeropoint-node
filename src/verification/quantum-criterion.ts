/**
 * quantum-criterion — how far src/quantum is from simulating a quantum computer.
 *
 * The README calls the simulator "a real quantum-circuit simulator, checked by
 * 24 recomputable facts. It models qubits, not minds." Twenty-four facts is a
 * good number and it is not a measure of DISTANCE: it says these things hold,
 * not what a simulator has to do. This is the measure.
 *
 * The conditions are the ones a NIST-and-National-Academies overview of "what
 * is a quantum computer and how do you make one" lists as Stage 1 — the
 * software stage, before cloud hardware, before a tabletop device, before a
 * laboratory. Where that list names a capability, this names the LAW behind it,
 * because a capability can be faked by a function with the right name and a law
 * cannot. `probabilities` returning [0.5, 0.5] proves nothing; probabilities
 * that sum to one after an arbitrary gate sequence, and that CANCEL under
 * interference, cannot be produced by a classical bit register.
 *
 * WHAT MEETING ALL OF THEM WOULD AND WOULD NOT MEAN — this is the whole reason
 * the file is worth writing, and it sits between the other two criteria.
 *
 * "Operating system" is not contested, so meeting the seven OS conditions WOULD
 * make something a minimal operating system. "Consciousness" is contested, so
 * meeting the five consciousness conditions rules nothing in. This one is the
 * first case: the mathematics of state-vector simulation is settled, so meeting
 * these conditions WOULD make something a quantum-circuit simulator in the
 * ordinary sense.
 *
 * And a quantum-circuit simulator is not a quantum computer. It is a classical
 * program holding 2^n complex amplitudes in ordinary memory, which is why the
 * same overview puts hardware at Stages 2 through 4 and says a simulator is
 * "not a replacement for quantum hardware". Meeting all eight of these would
 * say this software models the mathematics correctly. It would say nothing
 * about coherence times, gate fidelity, readout error, or any physical thing,
 * because there is no physical thing here to say it about.
 */

import { abs } from '../0/algebra.ts'

/** A 2x2 gate in row-major order, as four complex amplitudes. */
export type CriterionGate = readonly [Amp, Amp, Amp, Amp]
export interface Amp { readonly re: number; readonly im: number }

export interface QuantumCondition {
  id: string
  requires: string
  met: boolean
  evidence: string
  whatWouldChange: string
}

export interface QuantumVerdict {
  met: boolean
  conditionsMet: number
  conditionsTotal: number
  conditions: QuantumCondition[]
  interpretation: string
}

/**
 * The shape a candidate presents. The state is opaque: a candidate threads
 * whatever it likes through these calls, so nothing here is shaped around one
 * implementation's representation.
 */
export interface QuantumCandidate {
  /** Prepare the n-qubit zero state. */
  zero?: (n: number) => unknown
  /** Hadamard, Pauli-X and Pauli-Z, as this candidate represents them. */
  gates?: { H?: CriterionGate; X?: CriterionGate; Z?: CriterionGate }
  /** Apply a single-qubit gate to qubit q. */
  apply1?: (state: unknown, q: number, gate: CriterionGate) => unknown
  /** Controlled-NOT. */
  cnot?: (state: unknown, control: number, target: number) => unknown
  /** Outcome probabilities over the 2^n basis states, in index order. */
  probabilities?: (state: unknown) => readonly number[]
  /** Sample one qubit. `unit` is a number in [0,1) so sampling is deterministic. */
  measure?: (state: unknown, q: number, unit: number) => 0 | 1
  /** The density matrix of a state, and its purity Tr(rho^2). */
  density?: (state: unknown) => unknown
  purity?: (rho: unknown) => number
  /** Apply a noise channel of strength p to qubit q. */
  noise?: (rho: unknown, q: number, p: number) => unknown
  /** Estimate a qubit's Bloch z and x components from repeated measurement. */
  tomography?: (state: unknown, q: number) => { z: number; x: number }
}

/**
 * Tolerances, as the integer ratios they are. This layer bans decimal literals
 * because a float is a lossy way to write a ratio, and a comparison tolerance
 * is no exception: EXACT is the one that must hold to the last bit an IEEE
 * double can carry, SAME is for arithmetic that has been through a few gates,
 * and SAMPLED is for a rate estimated from a finite number of shots.
 */
const EXACT = 1 / 1_000_000_000
const SAME = 1 / 1_000_000
const SAMPLED = 1 / 20
const BLOCH = 1 / 10
const HALF = 1 / 2

const close = (a: number, b: number, tol = SAME): boolean => abs(a - b) <= tol

function condition(
  id: string, requires: string, met: boolean, evidence: string, whatWouldChange: string,
): QuantumCondition {
  return { id, requires, met, evidence, whatWouldChange }
}

const missing = (id: string, requires: string, what: string, change: string): QuantumCondition =>
  condition(id, requires, false, `the candidate offers no ${what}`, change)

/** 1. A qubit holds amplitudes for both basis states at once. */
function superposition(q: QuantumCandidate): QuantumCondition {
  const requires = 'a single gate can put one qubit into equal superposition'
  if (!q.zero || !q.apply1 || !q.probabilities || !q.gates?.H) {
    return missing('superposition', requires, 'zero/apply1/probabilities/H', 'the four primitives a one-qubit circuit needs')
  }
  const p = q.probabilities(q.apply1(q.zero(1), 0, q.gates.H))
  const met = p.length === 2 && close(p[0]!, HALF) && close(p[1]!, HALF)
  return condition('superposition', requires, met,
    `H applied to |0> gives [${p.map((x) => x.toFixed(3)).join(', ')}]`,
    'H|0> must give equal probability to both outcomes; a classical bit register gives [1, 0]')
}

/** 2. Probabilities are a distribution, after any sequence, not just the first. */
function normalisation(q: QuantumCandidate): QuantumCondition {
  const requires = 'probabilities sum to one after an arbitrary gate sequence'
  if (!q.zero || !q.apply1 || !q.probabilities || !q.gates?.H || !q.gates?.X) {
    return missing('normalisation', requires, 'zero/apply1/probabilities/H/X', 'H and X, and a way to read probabilities')
  }
  let s = q.zero(2)
  for (const [gate, target] of [[q.gates.H, 0], [q.gates.X, 1], [q.gates.H, 1]] as const) {
    s = q.apply1(s, target as number, gate as CriterionGate)
  }
  const total = q.probabilities(s).reduce((a, b) => a + b, 0)
  return condition('normalisation', requires, close(total, 1, EXACT),
    `after H(0) X(1) H(1) the probabilities sum to ${total}`,
    'gates must preserve the norm; a simulator that renormalises only on read has not applied unitary gates')
}

/** 3. Gates are reversible: H twice is the identity. */
function reversibility(q: QuantumCandidate): QuantumCondition {
  const requires = 'applying H twice returns the input state'
  if (!q.zero || !q.apply1 || !q.probabilities || !q.gates?.H) {
    return missing('reversibility', requires, 'zero/apply1/probabilities/H', 'a gate that can be applied twice')
  }
  const p = q.probabilities(q.apply1(q.apply1(q.zero(1), 0, q.gates.H), 0, q.gates.H))
  const met = close(p[0]!, 1) && close(p[1]!, 0, EXACT)
  return condition('reversibility', requires, met,
    `H twice on |0> gives [${p.map((x) => x.toFixed(6)).join(', ')}]`,
    'H^2 = I; a simulator that samples into a classical bit between gates cannot return to |0>')
}

/**
 * 4. Two qubits hold correlations that no pair of independent qubits can.
 *
 * The test is not that the Bell state's probabilities are [.5,0,0,.5] — it is
 * that they do NOT factorise. Independent qubits each at 50/50 give .25 to
 * every outcome, and that is exactly the cheap version this rejects.
 */
function entanglement(q: QuantumCandidate): QuantumCondition {
  const requires = 'a two-qubit state whose distribution does not factorise into its marginals'
  if (!q.zero || !q.apply1 || !q.cnot || !q.probabilities || !q.gates?.H) {
    return missing('entanglement', requires, 'cnot', 'a two-qubit gate; one-qubit gates alone cannot entangle')
  }
  const p = q.probabilities(q.cnot(q.apply1(q.zero(2), 0, q.gates.H), 0, 1))
  if (p.length !== 4) {
    return condition('entanglement', requires, false, `a two-qubit state reported ${p.length} outcomes, not 4`,
      'a register of n qubits has 2^n outcomes')
  }
  // marginals, then the product distribution they would imply if independent
  const p0 = p[0]! + p[1]!
  const q0 = p[0]! + p[2]!
  const factorised = [p0 * q0, p0 * (1 - q0), (1 - p0) * q0, (1 - p0) * (1 - q0)]
  const departs = p.some((x, i) => !close(x, factorised[i]!, SAME))
  return condition('entanglement', requires, departs,
    `Bell probabilities [${p.map((x) => x.toFixed(3)).join(', ')}] against the factorised `
    + `[${factorised.map((x) => x.toFixed(3)).join(', ')}]`,
    'independent qubits give the product of their marginals; entanglement is the departure from it')
}

/**
 * 5. Amplitudes cancel.
 *
 * The overview says quantum algorithms "must use interference to make useful
 * outcomes more likely". H-Z-H on |0> is |1> exactly: the two paths to |0>
 * arrive with opposite sign and annihilate. Nothing that tracks probabilities
 * rather than amplitudes can produce a zero here, because probabilities only
 * add.
 */
function interference(q: QuantumCandidate): QuantumCondition {
  const requires = 'amplitudes cancel, producing an outcome of probability zero'
  if (!q.zero || !q.apply1 || !q.probabilities || !q.gates?.H || !q.gates?.Z) {
    return missing('interference', requires, 'zero/apply1/probabilities/H/Z', 'a phase gate, so paths can differ in sign')
  }
  let s = q.apply1(q.zero(1), 0, q.gates.H)
  s = q.apply1(s, 0, q.gates.Z)
  s = q.apply1(s, 0, q.gates.H)
  const p = q.probabilities(s)
  const met = close(p[0]!, 0, EXACT) && close(p[1]!, 1)
  return condition('interference', requires, met,
    `H Z H on |0> gives [${p.map((x) => x.toFixed(6)).join(', ')}]`,
    'the |0> path must cancel exactly; a probability-only model can never reach zero from two non-zero paths')
}

/** 6. Measurement turns the state into classical bits, at the stated rates. */
function measurement(q: QuantumCandidate): QuantumCondition {
  const requires = 'sampling a qubit reproduces the probabilities the state reports'
  if (!q.zero || !q.apply1 || !q.probabilities || !q.measure || !q.gates?.H) {
    return missing('measurement', requires, 'measure', 'a measure(state, qubit, unit) that returns one classical bit')
  }
  const s = q.apply1(q.zero(1), 0, q.gates.H)
  const shots = 2000
  let ones = 0
  for (let i = 0; i < shots; i += 1) ones += q.measure(s, 0, (2 * i + 1) / (2 * shots))
  const rate = ones / shots
  const expected = q.probabilities(s)[1]!
  return condition('measurement', requires, close(rate, expected, SAMPLED),
    `${shots} deterministic samples of H|0> gave ${rate.toFixed(3)} ones against an expected ${expected.toFixed(3)}`,
    'the sampled rate must track the stated probability; a measure that ignores the state will not')
}

/** 7. Mixed states exist, and noise produces them. */
function mixedStates(q: QuantumCandidate): QuantumCondition {
  const requires = 'a density matrix distinguishes pure from mixed, and a noise channel moves one to the other'
  if (!q.zero || !q.density || !q.purity || !q.noise) {
    return missing('mixed-states', requires, 'density/purity/noise', 'a density representation and at least one channel')
  }
  const pureRho = q.density(q.zero(1))
  const purePurity = q.purity(pureRho)
  const noisy = q.purity(q.noise(pureRho, 0, HALF))
  const met = close(purePurity, 1, SAME) && noisy < purePurity - SAME
  return condition('mixed-states', requires, met,
    `purity of |0> is ${purePurity.toFixed(6)}; after a channel at p=1/2 it is ${noisy.toFixed(6)}`,
    'a pure state has purity 1 and noise must strictly reduce it; a state-vector-only model cannot represent the result')
}

/** 8. A state can be reconstructed from measurements in more than one basis. */
function tomography(q: QuantumCandidate): QuantumCondition {
  const requires = 'measuring in two bases recovers which state was prepared'
  if (!q.zero || !q.apply1 || !q.tomography || !q.gates?.H) {
    return missing('tomography', requires, 'tomography', 'an estimator over at least the Z and X bases')
  }
  const zero = q.tomography(q.zero(1), 0)
  const plus = q.tomography(q.apply1(q.zero(1), 0, q.gates.H), 0)
  const met = close(zero.z, 1, BLOCH) && close(plus.x, 1, BLOCH) && close(plus.z, 0, BLOCH)
  return condition('tomography', requires, met,
    `|0> reads z=${zero.z.toFixed(2)}; H|0> reads x=${plus.x.toFixed(2)}, z=${plus.z.toFixed(2)}`,
    'the two states differ in no single basis alone: one basis cannot tell |0> from H|0> apart from noise')
}

/** Evaluate a candidate. A probe that throws is a condition unmet, not a crash. */
export function evaluateQuantumCriterion(q: QuantumCandidate): QuantumVerdict {
  const probe = (fn: (c: QuantumCandidate) => QuantumCondition, id: string): QuantumCondition => {
    try { return fn(q) } catch (e) {
      return condition(id, 'the probe must complete', false,
        `probing threw: ${e instanceof Error ? e.message : String(e)}`,
        'a candidate must survive being asked')
    }
  }
  const conditions = [
    probe(superposition, 'superposition'),
    probe(normalisation, 'normalisation'),
    probe(reversibility, 'reversibility'),
    probe(entanglement, 'entanglement'),
    probe(interference, 'interference'),
    probe(measurement, 'measurement'),
    probe(mixedStates, 'mixed-states'),
    probe(tomography, 'tomography'),
  ]
  const conditionsMet = conditions.filter((c) => c.met).length
  return {
    met: conditionsMet === conditions.length,
    conditionsMet,
    conditionsTotal: conditions.length,
    conditions,
    interpretation:
      'These are the laws behind the Stage 1 list in a NIST-and-National-Academies overview of how a quantum '
      + 'computer is built. The mathematics of state-vector simulation is settled, so meeting all of them WOULD '
      + 'make a candidate a quantum-circuit simulator in the ordinary sense — unlike the consciousness criterion, '
      + 'which can only refute. It would NOT make it a quantum computer: this is a classical program holding 2^n '
      + 'amplitudes in ordinary memory, and the same overview puts hardware at Stages 2 to 4 and says a simulator '
      + 'is not a replacement for it. Nothing here measures coherence, fidelity or readout error, because there is '
      + 'no physical device to measure.',
  }
}

/** The work list: what is still missing, and what would change each. */
export function unmetQuantumConditions(q: QuantumCandidate): QuantumCondition[] {
  return evaluateQuantumCriterion(q).conditions.filter((c) => !c.met)
}

