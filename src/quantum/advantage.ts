/**
 * Quantum advantage, counted rather than claimed.
 *
 * "Quantum advantage" is one of the most overstated phrases in computing, and
 * this module exists to say exactly how much of it this repository can
 * demonstrate. It does not argue. It wraps the oracle in a counter, runs the
 * simulator's own algorithms, and reports how many times each one asked.
 *
 * THE ONE THING THAT IS PROVEN. In the QUERY MODEL — where cost is the number
 * of oracle calls and nothing else — there are separations that are theorems,
 * not conjectures:
 *
 *   Grover          Θ(√N) quantum against Θ(N) classical. The lower bound is
 *                   Bennett–Bernstein–Brassard–Vazirani: no quantum algorithm
 *                   beats √N for unstructured search, so the gap is exactly
 *                   quadratic and cannot be improved.
 *   Deutsch–Jozsa   1 quantum query against 2^(n-1)+1 classical WORST CASE —
 *                   but only against DETERMINISTIC EXACT classical algorithms.
 *                   A randomised classical algorithm decides it in a constant
 *                   number of queries with bounded error, so this famous
 *                   "exponential separation" collapses the moment the classical
 *                   side is allowed to be wrong occasionally. That caveat is
 *                   usually dropped, and dropping it is the overstatement.
 *
 * WHAT IS NOT PROVEN. Shor's algorithm factors in polynomial time, and the
 * repository implements it. That is NOT a proven advantage: no one has shown
 * factoring is hard classically. The separation is conditional on an unproven
 * assumption, and calling it proven — or calling factoring NP-complete, which
 * it is not known to be — is the error this module is written against.
 *
 * AND THE MEASUREMENT REFUTED MY OWN PREMISE. This module was written to count
 * the simulator's oracle calls and show the advantage. It shows the opposite,
 * and that is the finding:
 *
 *   Grover n=10          25 600 simulated oracle calls vs 1 024 classical
 *   Deutsch-Jozsa n=10    1 024 simulated oracle calls vs   513 classical
 *
 * A simulator applies the oracle to EVERY basis state of the amplitude vector,
 * so one "quantum query" costs 2^n classical evaluations. Simulated query
 * counts are therefore strictly WORSE than classical, always, by construction.
 * Quantum advantage is a property of hardware that holds the superposition; it
 * is not something a classical simulation can exhibit, and any repository
 * claiming to demonstrate it by simulation is measuring the wrong thing.
 *
 * So this module reports two different quantities and never conflates them:
 * the ALGORITHM's query count, which is where the theorem lives, and the
 * SIMULATION's oracle calls, which is what running it here actually costs.
 */

import { groverSearch, deutschJozsa, groverIterations } from './algorithms.ts'

// ============================================================================
// COUNTING
// ============================================================================

/** An oracle wrapped so every call is counted. */
function counted<T extends (x: number) => unknown>(f: T): { fn: T; calls: () => number } {
  let n = 0
  const fn = ((x: number) => {
    n += 1
    return f(x)
  }) as T
  return { fn, calls: () => n }
}

export interface QueryComparison {
  /** Number of qubits, so the search space is 2^n. */
  readonly qubits: number
  /** Size of the space searched. */
  readonly space: number
  /**
   * Queries the ALGORITHM makes — what the theorem counts. On hardware this is
   * the cost; here it is derived from the algorithm, not observed.
   */
  readonly algorithmQueries: number
  /**
   * Oracle calls the SIMULATION actually made. Larger than the algorithm's
   * count by a factor of the state-vector size, because simulating one query
   * means evaluating the oracle on every basis state.
   */
  readonly simulatedOracleCalls: number
  /** Oracle calls a classical algorithm needs in the worst case. */
  readonly classicalWorstCase: number
  /** Whether the algorithm returned the right answer. */
  readonly correct: boolean
}

// ============================================================================
// GROVER — a proven quadratic separation
// ============================================================================

/**
 * Run Grover for one marked item and count the oracle calls.
 *
 * Classical worst case for unstructured search over N items is N: an adversary
 * puts the marked item last. Grover's is the iteration count, which the
 * simulator derives from N rather than taking on faith.
 */
export function groverQueries(qubits: number, target: number): QueryComparison {
  const space = 1 << qubits
  const oracle = counted((x: number) => x === target)
  const result = groverSearch(qubits, oracle.fn as (x: number) => boolean, 1)

  // The most likely basis state after the run.
  let best = 0
  let bestWeight = -1
  if (result !== null) {
    for (let i = 0; i < result.amps.length; i++) {
      const a = result.amps[i]!
      const weight = a.re * a.re + a.im * a.im
      if (weight > bestWeight) { bestWeight = weight; best = i }
    }
  }

  return {
    qubits,
    space,
    algorithmQueries: groverIterations(space),
    simulatedOracleCalls: oracle.calls(),
    classicalWorstCase: space,
    correct: result !== null && best === target,
  }
}

// ============================================================================
// DEUTSCH–JOZSA — exponential, but only against exact classical algorithms
// ============================================================================

/**
 * Run Deutsch–Jozsa and count the oracle calls.
 *
 * Classical worst case for a DETERMINISTIC EXACT answer is 2^(n-1)+1: having
 * seen half the inputs agree, one more disagreement still decides it. A
 * randomised classical algorithm needs only a constant number, so the
 * separation reported here is against exact classical algorithms alone.
 */
export function deutschJozsaQueries(qubits: number, balanced: boolean): QueryComparison {
  const space = 1 << qubits
  // Constant: always 0. Balanced: the parity of the input, which is 0 on
  // exactly half the domain.
  const f = balanced
    ? (x: number): 0 | 1 => {
        let bits = 0
        for (let b = 0; b < qubits; b++) bits ^= (x >> b) & 1
        return (bits & 1) as 0 | 1
      }
    : (): 0 | 1 => 0

  const oracle = counted(f as (x: number) => unknown)
  const verdict = deutschJozsa(qubits, oracle.fn as (x: number) => 0 | 1)

  return {
    qubits,
    space,
    algorithmQueries: 1,
    simulatedOracleCalls: oracle.calls(),
    classicalWorstCase: space / 2 + 1,
    correct: verdict === (balanced ? 'balanced' : 'constant'),
  }
}

// ============================================================================
// WHAT EACH SEPARATION RESTS ON
// ============================================================================

export type Standing =
  /** A theorem in the query model. Both bounds are proved. */
  | 'proven'
  /** Proved only against a restricted classical adversary. */
  | 'proven-against-exact-classical'
  /** Fast quantumly; no classical lower bound is known. */
  | 'conditional'

export interface Separation {
  readonly algorithm: string
  readonly standing: Standing
  readonly note: string
}

/** The honest status of each separation this repository implements. */
export const SEPARATIONS: readonly Separation[] = [
  {
    algorithm: 'Grover',
    standing: 'proven',
    note:
      'Θ(√N) against Θ(N). The BBBV lower bound shows no quantum algorithm does better than √N, ' +
      'so the quadratic gap is exact and final rather than a current best effort.',
  },
  {
    algorithm: 'Deutsch-Jozsa',
    standing: 'proven-against-exact-classical',
    note:
      '1 query against 2^(n-1)+1, but only if the classical algorithm must be exact and ' +
      'deterministic. Allowed bounded error, a classical algorithm needs O(1). Quoting the ' +
      'exponential without that condition is the usual overstatement.',
  },
  {
    algorithm: 'Shor',
    standing: 'conditional',
    note:
      'Polynomial-time factoring quantumly, with NO proof that factoring is classically hard. ' +
      'Factoring is not known to be NP-complete, so Shor does not place NP in P and does not ' +
      'imply a general speedup for NP problems.',
  },
]

// ============================================================================
// SELF-CHECK
// ============================================================================

/** Facts this module must satisfy. Returns failures. */
export function selfTest(): string[] {
  const fail: string[] = []

  for (const qubits of [3, 4, 5, 6]) {
    const target = (1 << qubits) - 1 // adversarial: the last item
    const r = groverQueries(qubits, target)
    if (!r.correct) fail.push(`grover n=${qubits} did not find the target`)

    // The ALGORITHM beats classical. This is where the theorem lives.
    if (!(r.algorithmQueries < r.classicalWorstCase)) {
      fail.push(`grover n=${qubits}: ${r.algorithmQueries} algorithm queries, not below ${r.classicalWorstCase}`)
    }

    // The SIMULATION does not, and must be recorded as not doing so. If this
    // ever flips, the simulator has stopped evaluating the oracle over the
    // whole state vector and something is wrong with it, not right.
    if (!(r.simulatedOracleCalls > r.classicalWorstCase)) {
      fail.push(
        `grover n=${qubits}: simulation made ${r.simulatedOracleCalls} calls, which is not above ` +
          `${r.classicalWorstCase} — a simulator cannot beat classical query cost`,
      )
    }

    // One simulated query costs the state-vector size.
    if (r.simulatedOracleCalls !== r.algorithmQueries * r.space) {
      fail.push(
        `grover n=${qubits}: ${r.simulatedOracleCalls} calls is not ${r.algorithmQueries} x ${r.space}`,
      )
    }
  }

  // The ALGORITHM's advantage must widen with n — a constant factor is not a
  // speedup. Measured on the algorithm count, not the simulation count.
  const small = groverQueries(3, 7)
  const large = groverQueries(6, 63)
  if (!(large.classicalWorstCase - large.algorithmQueries > small.classicalWorstCase - small.algorithmQueries)) {
    fail.push('grover algorithmic advantage does not widen with n')
  }

  for (const balanced of [true, false]) {
    const r = deutschJozsaQueries(4, balanced)
    if (!r.correct) fail.push(`deutsch-jozsa balanced=${balanced} gave the wrong verdict`)
    if (r.algorithmQueries !== 1) fail.push('deutsch-jozsa algorithm query count is not 1')
    // Again: the simulation pays the full space, so it cannot be the cheaper side.
    if (!(r.simulatedOracleCalls >= r.space)) {
      fail.push(`deutsch-jozsa: simulation made ${r.simulatedOracleCalls} calls, expected at least ${r.space}`)
    }
  }

  const shor = SEPARATIONS.find((s) => s.algorithm === 'Shor')
  if (!shor || shor.standing !== 'conditional') fail.push('Shor is not recorded as conditional')
  const dj = SEPARATIONS.find((s) => s.algorithm === 'Deutsch-Jozsa')
  if (!dj || dj.standing !== 'proven-against-exact-classical') {
    fail.push('Deutsch-Jozsa is not recorded with its classical-exactness condition')
  }
  const grover = SEPARATIONS.find((s) => s.algorithm === 'Grover')
  if (!grover || grover.standing !== 'proven') fail.push('Grover is not recorded as proven')

  return fail
}
