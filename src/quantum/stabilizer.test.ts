/**
 * The tableau must agree with the state vector on every Clifford circuit, and
 * the agreement must be checked in BOTH directions — a simulator that called
 * everything random would match every deterministic case it never claimed, and
 * one that called everything deterministic would match the rest. That was the
 * defect in this repository's Shor check and it is not repeated here.
 */
import {
  stabilizerZeroState, stabilizerH, stabilizerS, stabilizerCnot,
  stabilizerX, stabilizerZ, stabilizerMeasure, stabilizerGateCost, stabilizerBits,
} from './stabilizer.ts'
import { zeroState, applyGate1, cnot, probabilities, H, S, X, Z } from './simulator.ts'
import { createChecker } from '../verification/harness.ts'

const checker = createChecker('stabilizer')


/**
 * A deterministic pseudo-random source, so a failure is reproducible — and
 * INTEGER-ONLY, because math:ban forbids Math.* under src/ and it is right to.
 * The first version divided by 0x7fffffff and reached for Math.floor to get
 * back to an index, which puts float arithmetic into the harness for a file
 * whose whole subject is a representation that has none.
 */
const lcg = (seed: number) => () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff)
const pick = (r: number, n: number) => r % n

/**
 * The same circuit in both simulators. The state vector gives the marginal
 * probability of qubit `a` reading 1; the tableau says whether that outcome is
 * determined. They must agree: p is 0 or 1 exactly when the tableau calls it
 * deterministic, and the value must match.
 */
function agreeOn(n: number, gates: readonly (readonly [string, number, number])[], target: number) {
  let sv = zeroState(n)
  const st = stabilizerZeroState(n)
  for (const [kind, a, b] of gates) {
    if (kind === 'h') { sv = applyGate1(sv, a, H); stabilizerH(st, a) }
    if (kind === 's') { sv = applyGate1(sv, a, S); stabilizerS(st, a) }
    if (kind === 'x') { sv = applyGate1(sv, a, X); stabilizerX(st, a) }
    if (kind === 'z') { sv = applyGate1(sv, a, Z); stabilizerZ(st, a) }
    if (kind === 'cnot') { sv = cnot(sv, a, b); stabilizerCnot(st, a, b) }
  }
  const p = probabilities(sv)
  let pOne = 0
  for (let i = 0; i < p.length; i += 1) if ((i >> target) & 1) pOne += p[i]!
  /**
   * A HALVING, NOT A TENTH. A float's grid is binary — every representable
   * value is a dyadic rational — so a threshold of one part in a million is a
   * unit the machine does not have, and it lands between two representable
   * numbers rather than on one. 1/2^20 is the same order of magnitude and is
   * exactly representable, which is the same reason the imperial system halves
   * rather than tenths and the reason clifford-t.ts carries probabilities over
   * 2^scale.
   */
  const tol = 1 / 1048576 // 2^-20
  const svDeterministic = pOne < tol || pOne > 1 - tol
  const svOutcome = pOne > 1 - tol ? 1 : 0
  const m = stabilizerMeasure(st, target)
  return { svDeterministic, svOutcome, tableau: m }
}

// ── the named states ────────────────────────────────────────────────────────
{
  const r = agreeOn(1, [], 0)
  checker.check('|0> is determined and reads 0', [r.tableau.deterministic, r.tableau.outcome], [true, 0])
  checker.check('and the state vector says the same', [r.svDeterministic, r.svOutcome], [true, 0])
}
{
  const r = agreeOn(1, [['x', 0, 0]], 0)
  checker.check('X|0> is determined and reads 1', [r.tableau.deterministic, r.tableau.outcome], [true, 1])
  checker.check('and the state vector says the same', [r.svDeterministic, r.svOutcome], [true, 1])
}
{
  const r = agreeOn(1, [['h', 0, 0]], 0)
  checker.check('H|0> is NOT determined', r.tableau.deterministic, false)
  checker.check('and the state vector agrees it is not', r.svDeterministic, false)
}
{
  // HZH = X, so this must come back determined at 1 — a case that separates a
  // simulator tracking phases from one that is not.
  const r = agreeOn(1, [['h', 0, 0], ['z', 0, 0], ['h', 0, 0]], 0)
  checker.check('H Z H |0> is determined and reads 1', [r.tableau.deterministic, r.tableau.outcome], [true, 1])
  checker.check('and the state vector says the same', [r.svDeterministic, r.svOutcome], [true, 1])
}
{
  // S S = Z, which leaves |0> alone.
  const r = agreeOn(1, [['s', 0, 0], ['s', 0, 0]], 0)
  checker.check('S S |0> is determined and reads 0', [r.tableau.deterministic, r.tableau.outcome], [true, 0])
}

// ── entanglement: neither qubit is determined, but their parity is ──────────
{
  const bell = stabilizerZeroState(2)
  stabilizerH(bell, 0)
  stabilizerCnot(bell, 0, 1)
  const first = stabilizerMeasure(bell, 0, 1)
  const second = stabilizerMeasure(bell, 1, 0)
  checker.check('the first Bell qubit is random', first.deterministic, false)
  checker.check('the second is then DETERMINED', second.deterministic, true)
  checker.check('and it matches the first', second.outcome, first.outcome)
}
{
  const bell = stabilizerZeroState(2)
  stabilizerH(bell, 0)
  stabilizerCnot(bell, 0, 1)
  const first = stabilizerMeasure(bell, 0, 0)
  const second = stabilizerMeasure(bell, 1, 1)
  checker.check('the correlation holds for the other branch too', second.outcome, first.outcome)
}

// ── BOTH DIRECTIONS, over random Clifford circuits ──────────────────────────
{
  const rand = lcg(20260907)
  let agreements = 0
  let determinedSeen = 0
  let randomSeen = 0
  let disagreements = 0
  for (let trial = 0; trial < 200; trial += 1) {
    const n = 2 + pick(rand(), 3)
    const gates: [string, number, number][] = []
    for (let g = 0; g < 8; g += 1) {
      const kind = ['h', 's', 'x', 'z', 'cnot'][pick(rand(), 5)]!
      const a = pick(rand(), n)
      let b = pick(rand(), n)
      if (kind === 'cnot' && b === a) b = (a + 1) % n
      gates.push([kind, a, b])
    }
    const target = pick(rand(), n)
    const r = agreeOn(n, gates, target)
    if (r.tableau.deterministic) determinedSeen += 1
    else randomSeen += 1
    const ok = r.svDeterministic === r.tableau.deterministic
      && (!r.svDeterministic || r.svOutcome === r.tableau.outcome)
    if (ok) agreements += 1
    else disagreements += 1
  }
  checker.check('200 random Clifford circuits agree with the state vector', disagreements, 0)
  checker.check('and the sample contains determined cases', determinedSeen > 0, true)
  // WITHOUT THIS, a tableau that answered "random, 0" every time would score
  // 200 agreements on a sample that happened to hold no determined outcomes.
  checker.check('and undetermined ones, so neither arm is vacuous', randomSeen > 0, true)
  checker.check(`(${determinedSeen} determined, ${randomSeen} random, ${agreements} agreed)`, agreements, 200)
}

// ── the cost, which is the reason this file exists ─────────────────────────
checker.check('one gate costs 2n row updates, not 2^n amplitude updates', stabilizerGateCost(30), 60)
checker.check('the tableau at 30 qubits is 3720 bits', stabilizerBits(30), 3720)
checker.check('which the state vector could not match', stabilizerBits(30) < 2 ** 30, true)

checker.report()
