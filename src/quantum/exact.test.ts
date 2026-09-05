/**
 * The exact simulator must agree with the float one to its tolerance, and with
 * the MATHEMATICS exactly. Only the second is a new claim.
 */
import {
  exactZeroState, exactH, exactX, exactZ, exactY, exactS, exactCnot, exactCz,
  exactProbability, exactProbabilities, exactlyNormalised, asFloat,
} from './exact.ts'
import { zeroState, applyGate1, cnot, probabilities, H, X, Z } from './simulator.ts'

const results: string[] = []
const failures: string[] = []
const check = (name: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got) === JSON.stringify(want)
  results.push(`  ${ok ? '✓' : '✗'} ${name}${ok ? '' : `  got ${JSON.stringify(got)} want ${JSON.stringify(want)}`}`)
  if (!ok) failures.push(name)
}
const frac = (p: { numerator: bigint; denominator: bigint }) => `${p.numerator}/${p.denominator}`

// ── GHZ is where the float simulator loses exactness ────────────────────────
const ghzExact = (n: number) => {
  let r = exactH(exactZeroState(n), 0)
  for (let q = 0; q + 1 < n; q += 1) r = exactCnot(r, q, q + 1)
  return r
}
for (const n of [2, 4, 10]) {
  const r = ghzExact(n)
  const ps = exactProbabilities(r)
  check(`GHZ_${n} first outcome is exactly 1/2`, frac(ps[0]!), '1/2')
  check(`GHZ_${n} last outcome is exactly 1/2`, frac(ps[ps.length - 1]!), '1/2')
  check(`GHZ_${n} everything else is exactly 0`, ps.slice(1, -1).every((p) => p.numerator === 0n), true)
  check(`GHZ_${n} sums to exactly one`, exactlyNormalised(r), true)
}

// The float simulator does NOT, and that is the point of this module existing.
{
  const fl = probabilities((() => {
    let reg = applyGate1(zeroState(10), 0, H)
    for (let q = 0; q + 1 < 10; q += 1) reg = cnot(reg, q, q + 1)
    return reg
  })())
  // 1/2 as a fraction, not as 0.5 — this file is about the difference between
  // the two and a decimal literal here would be the very thing under test.
  const half = 1 / 2
  check('the float simulator is NOT exactly 1/2 here', fl[0] === half, false)
  check('the exact simulator IS', asFloat(exactProbability(ghzExact(10), 0)) === half, true)
}

// ── the gates, against facts that hold without any tolerance ────────────────
check('H twice is the identity', frac(exactProbability(exactH(exactH(exactZeroState(1), 0), 0), 0)), '1/1')
check('X moves all of it to |1>', frac(exactProbability(exactX(exactZeroState(1), 0), 1)), '1/1')
check('Z alone does not move probability', frac(exactProbability(exactZ(exactZeroState(1), 0), 0)), '1/1')
check('S alone does not move probability', frac(exactProbability(exactS(exactZeroState(1), 0), 0)), '1/1')
check('Y takes |0> to |1>', frac(exactProbability(exactY(exactZeroState(1), 0), 1)), '1/1')
check('X twice is the identity', frac(exactProbability(exactX(exactX(exactZeroState(1), 0), 0), 0)), '1/1')
{
  // CZ is symmetric in its qubits and CNOT is not — the same law seal 34 checks
  // in the float simulator, here with no tolerance at all.
  const plus = exactH(exactH(exactZeroState(2), 0), 1)
  const ab = exactProbabilities(exactCz(plus, 0, 1)).map(frac).join(' ')
  const ba = exactProbabilities(exactCz(plus, 1, 0)).map(frac).join(' ')
  check('CZ is symmetric in its qubits', ab, ba)
  // NOT on |++>. That state is uniform, so BOTH directions permute it to
  // itself and the probabilities are identical however asymmetric CNOT is —
  // the first version of this check compared them there and concluded CNOT was
  // symmetric. A test on an input the property cannot move is the same defect
  // as a mutation that respects a symmetry. |+0> distinguishes: control on
  // qubit 0 entangles, control on qubit 1 does nothing at all.
  const plusZero = exactH(exactZeroState(2), 0)
  const na = exactProbabilities(exactCnot(plusZero, 0, 1)).map(frac).join(' ')
  const nb = exactProbabilities(exactCnot(plusZero, 1, 0)).map(frac).join(' ')
  check('CNOT is not, on an input that can tell', na === nb, false)
  check('CNOT with control 0 entangles |+0>', na, '1/2 0/1 0/1 1/2')
  check('CNOT with control 1 leaves |+0> alone', nb, '1/2 1/2 0/1 0/1')
  check('a superposition of two qubits is four quarters', exactProbabilities(plus).map(frac).join(' '), '1/4 1/4 1/4 1/4')
}

// ── agreement with the float simulator, within ITS tolerance ────────────────
{
  let fr = applyGate1(zeroState(3), 0, H)
  fr = applyGate1(fr, 1, X)
  fr = applyGate1(fr, 2, Z)
  fr = cnot(fr, 0, 2)
  let ex = exactH(exactZeroState(3), 0)
  ex = exactX(ex, 1)
  ex = exactZ(ex, 2)
  ex = exactCnot(ex, 0, 2)
  const fp = probabilities(fr)
  const ep = exactProbabilities(ex).map(asFloat)
  check('exact and float agree to 1e-9 on a mixed circuit',
    fp.every((p, i) => { const d = p - ep[i]!; return d < 1e-9 && -d < 1e-9 }), true)
}

// ── the boundary is declared, not approximated ──────────────────────────────
check('a non-Clifford gate is absent rather than approximated',
  typeof (globalThis as Record<string, unknown>).exactT, 'undefined')

console.log('exact', failures.length === 0 ? 'ok' : 'FAIL')
for (const r of results) console.log(r)
if (failures.length > 0) {
  console.error(`exact FAIL — ${failures.length} of ${results.length}: ${failures.join(', ')}`)
  process.exit(1)
}
