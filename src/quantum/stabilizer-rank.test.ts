/**
 * The T-count scaling law, checked rather than cited — and the check must be
 * able to fail, since "the two agree" is also what a comparison that never
 * compares reports.
 */
import {
  T_BRANCH_I, T_BRANCH_S, T_BRANCH_DENOMINATOR, verifyTDecomposition,
  tCountOf, branchCount, amplitudesByBranching, amplitudesDirect,
  branchingAgreesWithDirect, circuitDepth, type Gate,
} from './stabilizer-rank.ts'
import { zeta8, z8Add, z8Mul, z8Equals, Z8_I } from './clifford-t.ts'
import { createChecker } from '../verification/harness.ts'

const checker = createChecker('stabilizer-rank')

// ── the decomposition is an integer identity, not an approximation ──────────
{
  const v = verifyTDecomposition()
  checker.check('a + b = 1 exactly', v.sumsToOne, true)
  checker.check('a + b·i = ζ exactly', v.reproducesT, true)
}

// AND THE IDENTITY CHECK CAN FAIL. Without this, `sumsToOne: true` says only
// that the function returned — the same shape as a seal reading a tautology.
{
  const wrong = zeta8(1, -1, 1, 0) // one coefficient off by a single term
  checker.check('a wrong second coefficient does NOT sum to the denominator',
    z8Equals(z8Add(T_BRANCH_I, wrong), zeta8(T_BRANCH_DENOMINATOR, 0, 0, 0)), false)
  checker.check('and does NOT reproduce ζ',
    z8Equals(z8Add(T_BRANCH_I, z8Mul(wrong, Z8_I)), zeta8(0, T_BRANCH_DENOMINATOR, 0, 0)), false)
}

// ── 2^t branches, and the sum agrees with the circuit run directly ─────────
const circuits: { name: string; n: number; gates: Gate[] }[] = [
  { name: 'no T at all', n: 1, gates: [{ gate: 'h', a: 0 }] },
  { name: 'one T', n: 1, gates: [{ gate: 'h', a: 0 }, { gate: 't', a: 0 }, { gate: 'h', a: 0 }] },
  { name: 'two T', n: 1, gates: [{ gate: 'h', a: 0 }, { gate: 't', a: 0 }, { gate: 'h', a: 0 }, { gate: 't', a: 0 }, { gate: 'h', a: 0 }] },
  { name: 'three T over two qubits', n: 2, gates: [
    { gate: 'h', a: 0 }, { gate: 'cnot', a: 0, b: 1 }, { gate: 't', a: 1 },
    { gate: 'h', a: 1 }, { gate: 't', a: 0 }, { gate: 't', a: 1 },
  ] },
  { name: 'four T over three qubits', n: 3, gates: [
    { gate: 'h', a: 0 }, { gate: 't', a: 0 }, { gate: 'cnot', a: 0, b: 1 }, { gate: 't', a: 1 },
    { gate: 'h', a: 2 }, { gate: 't', a: 2 }, { gate: 'cz', a: 1, b: 2 }, { gate: 't', a: 0 },
  ] },
]

for (const c of circuits) {
  const t = tCountOf(c.gates)
  checker.check(`${c.name} — branch count is 2^${t}`, branchCount(t), 2n ** BigInt(t))
  checker.check(`${c.name} — the branch sum equals the direct simulation, exactly`,
    branchingAgreesWithDirect(c.n, c.gates), true)
}

/**
 * THE NEGATIVE ARM. Compare a circuit's branch sum against a DIFFERENT
 * circuit's direct amplitudes: the same comparison code, on inputs that must
 * disagree. Without it, every check above passes for a function that returns
 * true unconditionally, which is precisely how a classical stand-in once passed
 * this repository's exhaustive Shor check.
 */
{
  const withT: Gate[] = [{ gate: 'h', a: 0 }, { gate: 't', a: 0 }, { gate: 'h', a: 0 }]
  const withoutT: Gate[] = [{ gate: 'h', a: 0 }, { gate: 'h', a: 0 }]
  const branched = amplitudesByBranching(1, withT)
  const other = amplitudesDirect(1, withoutT)
  const factor = zeta8(T_BRANCH_DENOMINATOR ** BigInt(branched.tCount), 0, 0, 0)
  let anyDiffer = false
  for (let i = 0; i < 2; i += 1) {
    if (!z8Equals(branched.amps[i]!, z8Mul(other.amps[i]!, factor))) anyDiffer = true
  }
  checker.check('the comparison distinguishes a circuit with a T from one without', anyDiffer, true)
}

// ── the branch count is the T count, and NOT the qubit count ───────────────
{
  const oneQubitThreeT: Gate[] = [{ gate: 't', a: 0 }, { gate: 't', a: 0 }, { gate: 't', a: 0 }]
  const fiveQubitNoT: Gate[] = [
    { gate: 'h', a: 0 }, { gate: 'cnot', a: 0, b: 1 }, { gate: 'cnot', a: 1, b: 2 },
    { gate: 'cnot', a: 2, b: 3 }, { gate: 'cnot', a: 3, b: 4 }, { gate: 's', a: 4 },
  ]
  checker.check('three T gates on one qubit give eight branches', branchCount(tCountOf(oneQubitThreeT)), 8n)
  checker.check('six Clifford gates on five qubits give one', branchCount(tCountOf(fiveQubitNoT)), 1n)
}

// ── depth is not gate count ────────────────────────────────────────────────
{
  const parallel: Gate[] = [{ gate: 'h', a: 0 }, { gate: 'h', a: 1 }, { gate: 'h', a: 2 }]
  const serial: Gate[] = [{ gate: 'h', a: 0 }, { gate: 'h', a: 0 }, { gate: 'h', a: 0 }]
  checker.check('three gates on disjoint qubits are depth 1', circuitDepth(parallel), 1)
  checker.check('three gates on one qubit are depth 3', circuitDepth(serial), 3)
  checker.check('a two-qubit gate waits for the deeper of its qubits',
    circuitDepth([{ gate: 'h', a: 0 }, { gate: 'h', a: 0 }, { gate: 'cnot', a: 0, b: 1 }]), 3)
  checker.check('an empty circuit has depth 0', circuitDepth([]), 0)
}

checker.report()
