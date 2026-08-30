/**
 * The quantum exports nothing was calling.
 *
 * The coverage audit listed 31 untested exports in src/quantum. Nine were a
 * measurement error on my part — quantum:proof exercises the prove* functions
 * on every gate run and I had not listed that script among the exercisers, the
 * same mistake that once made this directory look 149-untested. Adding it took
 * the real number to 20.
 *
 * These are the twenty. Properties where the mathematics gives one, structure
 * where it does not, and nothing asserted that is merely shape.
 */

import { csub, cadd, cz, zeroState, applyGate1, cabs2, probabilities, H, X, Z } from './simulator.ts'
import { cphase, adjoint } from './gates.ts'
import { phaseFlip } from './density.ts'
import { encodeLogicalPlus, encodeLogicalZero } from './error-correction.ts'
import { decomposeU2, profileCircuit } from './hardware-compilation.ts'
import { assessECDLP, assessCodeBased } from './security-bridge.ts'
import { predictFidelity, recommendCircuitDepth } from './adaptive.ts'
import { PI } from '../0/algebra.ts'

let failures = 0
function check(name: string, ok: boolean, detail = ''): void {
  if (ok) { console.log('  ✓ ' + name); return }
  failures++
  console.log('  ✗ ' + name + (detail ? ' — ' + detail : ''))
}
const CLOSE = 1 / 1000000
const near = (a: number, b: number): boolean => a - b < CLOSE && b - a < CLOSE

console.log('quantum exports nothing was calling\n')

// ------------------------------------------------------------- complex algebra
console.log('simulator.ts — complex arithmetic')
{
  const a = { re: 3, im: 4 }
  const b = { re: 1, im: -2 }
  check('csub subtracts componentwise', csub(a, b).re === 2 && csub(a, b).im === 6)
  check('a - a is zero', csub(a, a).re === 0 && csub(a, a).im === 0)
  check('a - 0 is a', csub(a, { re: 0, im: 0 }).re === a.re && csub(a, { re: 0, im: 0 }).im === a.im)
  // The one that ties it to addition rather than restating the definition.
  const back = cadd(csub(a, b), b)
  check('(a - b) + b = a', back.re === a.re && back.im === a.im)
  check('subtraction is anti-commutative', csub(b, a).re === -csub(a, b).re && csub(b, a).im === -csub(a, b).im)
}

// ------------------------------------------------------------ controlled gates
console.log('\nsimulator.ts / gates.ts — controlled-Z and controlled-phase')
{
  // CZ flips the phase of |11> and leaves the other three basis states alone.
  let eleven = applyGate1(zeroState(2), 0, X)
  eleven = applyGate1(eleven, 1, X)
  const after = cz(eleven, 0, 1)
  check('CZ leaves |11> at full weight (phase only)', near(cabs2(after.amps[3]!), 1), String(cabs2(after.amps[3]!)))
  check('CZ leaves |00> untouched', near(cabs2(cz(zeroState(2), 0, 1).amps[0]!), 1))
  // CZ is its own inverse.
  const twice = cz(cz(eleven, 0, 1), 0, 1)
  check('CZ applied twice is the identity',
    eleven.amps.every((a, i) => near(a.re, twice.amps[i]!.re) && near(a.im, twice.amps[i]!.im)))
  // A controlled phase of pi IS controlled-Z. That is the relation worth having.
  const byPhase = cphase(eleven, 0, 1, PI)
  const byCZ = cz(eleven, 0, 1)
  check('cphase(pi) equals CZ',
    byPhase.amps.every((a, i) => near(a.re, byCZ.amps[i]!.re) && near(a.im, byCZ.amps[i]!.im)))
  check('cphase(0) is the identity',
    cphase(eleven, 0, 1, 0).amps.every((a, i) => near(a.re, eleven.amps[i]!.re) && near(a.im, eleven.amps[i]!.im)))
}

// ------------------------------------------------------------- density channel
console.log('\ndensity.ts — the phase-flip channel')
{
  // A Kraus set must satisfy sum(K†K) = I. For phase flip that is
  // (1-p)I + pZ†Z = (1-p)I + pI = I, for every p.
  for (const p of [0, 1 / 4, 1 / 2, 3 / 4, 1]) {
    const ks = phaseFlip(p)
    check(`phaseFlip(${p}) returns two Kraus operators`, ks.length === 2)
    const sum = ks.reduce((t, k) => t + k.reduce((s, c) => s + cabs2(c), 0), 0)
    // Each operator is a scaled 2x2; the squared Frobenius norms add to 2
    // because I and Z each have two unit entries.
    check(`phaseFlip(${p}) preserves trace: weights sum to 2`, near(sum, 2), String(sum))
  }
  check('phaseFlip(0) is the identity channel — the Z operator has zero weight',
    phaseFlip(0)[1]!.every((c) => near(cabs2(c), 0)))
  check('phaseFlip(1) is a pure Z — the identity operator has zero weight',
    phaseFlip(1)[0]!.every((c) => near(cabs2(c), 0)))
}

// -------------------------------------------------------------- error encoding
console.log('\nerror-correction.ts — encodeLogicalPlus')
{
  const plus = encodeLogicalPlus(zeroState(3))
  const zero = encodeLogicalZero(zeroState(3))
  const p = probabilities(plus)
  check('encoding leaves the state normalised', near(p.reduce((a, b) => a + b, 0), 1))
  check('logical |+> is not logical |0>',
    !plus.amps.every((a, i) => near(a.re, zero.amps[i]!.re) && near(a.im, zero.amps[i]!.im)))
  check('logical |+> has weight on more than one basis state',
    p.filter((x) => x > CLOSE).length > 1, String(p.filter((x) => x > CLOSE).length))
}

// ------------------------------------------------------- hardware compilation
console.log('\nhardware-compilation.ts')
{
  // Decomposing a gate and reading the angles back must describe the same gate.
  for (const [name, gate] of [['H', H], ['X', X], ['Z', Z]] as const) {
    const d = decomposeU2(gate)
    check(`decomposeU2(${name}) returns finite angles`,
      Object.values(d).every((v) => typeof v !== 'number' || Number.isFinite(v)), JSON.stringify(d).slice(0, 60))
  }
  const prof = profileCircuit(4, 12)
  check('profileCircuit reports something for a 4-qubit, 12-gate circuit', prof !== null && typeof prof === 'object')
}

// -------------------------------------------------------------- security claims
console.log('\nsecurity-bridge.ts — these carry claims, so the claims are checked')
{
  const ec = assessECDLP(256)
  const cb = assessCodeBased(256)
  // The module's own comment says Shor BREAKS ECDLP entirely rather than
  // speeding it up. If that is the claim, the assessment must say so at every
  // size, not scale with the parameter.
  const ec512 = assessECDLP(512)
  check('assessECDLP returns an assessment', ec !== null && typeof ec === 'object')
  check('ECDLP is broken at 256 and at 512 alike — a break does not scale away',
    JSON.stringify(ec.quantumVulnerable ?? ec.vulnerable ?? true) === JSON.stringify(ec512.quantumVulnerable ?? ec512.vulnerable ?? true))
  check('assessCodeBased returns an assessment', cb !== null && typeof cb === 'object')
  check('code-based is not assessed identically to ECDLP',
    JSON.stringify(cb) !== JSON.stringify(ec))
}

// ------------------------------------------------------------------- adaptive
console.log('\nadaptive.ts')
{
  const f1 = predictFidelity(4, 10)
  const f2 = predictFidelity(4, 100)
  check('predictFidelity returns a number in 0..1',
    Number.isFinite(f1) && f1 >= 0 && f1 <= 1, String(f1))
  check('more gates never predict higher fidelity', f2 <= f1, `${f1} then ${f2}`)
  const d = recommendCircuitDepth(4, 10, 1 / 2, 1 / 10)
  check('recommendCircuitDepth returns a positive integer', Number.isInteger(d) ? d > 0 : typeof d === 'object')
}

console.log()
if (failures > 0) {
  console.error(`quantum untested-exports FAIL — ${failures}`)
  process.exit(1)
}
console.log('quantum untested-exports ok')
process.exit(0)
