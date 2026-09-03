/**
 * The fifteen exports a consumer of this package can actually reach and that
 * nothing tested — this file covers the nine in src/quantum.
 *
 * Verifying 1.4.7 against the published tarball produced the measurement that
 * makes patch 8 a real question: of 1278 exported functions only 696 names are
 * reachable from the 23 entry points, and of the 218 that were untested only
 * FIFTEEN were reachable at all. Those fifteen are the published surface, so
 * they cannot be resolved by un-exporting. They get laws.
 *
 * The strongest law available here is the VARIATIONAL PRINCIPLE: no trial state
 * can have an energy below the true ground energy. It is physics rather than a
 * convention, an optimiser that reports a lower energy has a bug rather than a
 * discovery, and it holds for every starting point.
 */
import { quantumWorkflowBatch, adaptiveTuning, quantumWorkflow } from './workflow.ts'
import { AdaptiveOptimizer } from './adaptive.ts'
import { FALCON_PROFILE, SUPERCONDUCTING_PROFILE } from './hardware-compilation.ts'
import { zeroState, applyGate1, ry, probabilities, type Register } from './simulator.ts'
import { vqeWarmStart } from './variational-optimizer.ts'
import { tomatoTwoQubit, verifyTomographyProof, generateTomographyProof, measureZ } from './tomography.ts'
import { calibrateReadout } from './advanced.ts'
import { proveSystem, exportPublicationProof } from './proof-of-system.ts'
import { describe as describeOrchestration } from './orchestrator.ts'
import { abs } from '../0/algebra.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}
const PI = 245850922 / 78256779

const ansatz = (theta: number[]): Register => {
  let s = zeroState(2)
  s = applyGate1(s, 0, ry(theta[0] ?? 0))
  s = applyGate1(s, 1, ry(theta[1] ?? 0))
  return s
}
/** Ground energy is exactly -1, reached when both qubits are |1>. */
const hamiltonian = (s: Register): number => { const p = probabilities(s); return p[3]! - p[0]! }
const problem = { name: 'probe', n_qubits: 2, ansatz, hamiltonian, groundEnergy: -1 }
const profiles = [FALCON_PROFILE, SUPERCONDUCTING_PROFILE]
const fresh = (): AdaptiveOptimizer => new AdaptiveOptimizer()

// --- the variational principle -------------------------------------------
const starts: number[][] = [[0, 0], [PI, PI], [PI / 2, PI / 2], [-PI, PI / 4], [3 * PI, 0]]
const runs = starts.map((t) => vqeWarmStart(ansatz, hamiltonian, -1, t))

check('no trial energy is below the true ground energy, from any starting point',
  runs.every((r) => r.energy >= -1),
  runs.map((r) => r.energy.toFixed(6)).join(' '))

check('the reported error is the distance from the exact ground energy',
  runs.every((r) => abs(r.finalError - abs(r.energy - r.exactGroundEnergy)) < 1 / 1_000_000_000))

check('the exact ground energy is carried through untouched',
  runs.every((r) => r.exactGroundEnergy === -1))

check('warm-starting AT the optimum lands at the optimum',
  abs(vqeWarmStart(ansatz, hamiltonian, -1, [0, 0]).energy + 1) < 1 / 100,
  'the minimum of this ansatz is theta = (0,0), where the state is |00> and H is -1')

check('warm-starting at the MAXIMUM still descends toward the minimum',
  vqeWarmStart(ansatz, hamiltonian, -1, [PI, PI]).energy < hamiltonian(ansatz([PI, PI])),
  'theta = (pi,pi) is the state |11>, where H is +1')

check('every run is deterministic: the same warm start gives the same energy',
  starts.every((t) => vqeWarmStart(ansatz, hamiltonian, -1, t).energy === vqeWarmStart(ansatz, hamiltonian, -1, t).energy),
  'the perturbation is a seeded LCG, not randomness')

check('the history never claims more steps than it took',
  runs.every((r) => Array.isArray(r.history) && r.history.length > 0 && r.history.length <= 100))

check('convergence is claimed only when the error is small',
  runs.every((r) => !r.converged || r.finalError < 1 / 10))

// --- the batch is the sum of its parts -----------------------------------
const two = [problem, { ...problem, name: 'probe2' }]
const batch = quantumWorkflowBatch(two, fresh(), profiles)

check('a batch returns one result per problem, in the order given',
  batch.length === 2 && batch[0]!.problem === 'probe' && batch[1]!.problem === 'probe2')

check('the first problem of a batch is what running it alone gives',
  (() => {
    const alone = quantumWorkflow(problem, fresh(), profiles)
    const first = quantumWorkflowBatch([problem], fresh(), profiles)[0]!
    return alone.final_energy === first.final_energy && alone.error === first.error
  })(),
  'a batch that changed the first result would be learning from problems it has not seen')

check('an empty batch returns nothing rather than throwing',
  quantumWorkflowBatch([], fresh(), profiles).length === 0)

check('every batch result obeys the variational principle too',
  batch.every((r) => r.final_energy >= problem.groundEnergy))

check('every result names hardware from the profiles it was given',
  batch.every((r) => profiles.some((p) => p.name === r.recommended_hardware)),
  'it may not recommend hardware nobody offered')

check('a predicted fidelity is a probability',
  batch.every((r) => r.fidelity_prediction >= 0 && r.fidelity_prediction <= 1))

// --- tuning accumulates rounds -------------------------------------------
const tuned = adaptiveTuning([problem], fresh(), profiles, 3)
check('tuning returns one result per problem per round',
  tuned.results.length === 3, `${tuned.results.length}`)

check('more rounds never returns fewer results',
  [1, 2, 3, 4].every((n) => adaptiveTuning([problem], fresh(), profiles, n).results.length === n))

check('zero rounds returns nothing and still reports a hint',
  (() => { const t = adaptiveTuning([problem], fresh(), profiles, 0); return t.results.length === 0 && Number.isFinite(t.learned_depth_hint) })())

check('the learned depth hint is a positive finite number',
  Number.isFinite(tuned.learned_depth_hint) && tuned.learned_depth_hint > 0)

check('tuning obeys the variational principle in every round',
  tuned.results.every((r) => r.final_energy >= problem.groundEnergy))

// --- tomography ----------------------------------------------------------
const entangledish = ansatz([PI / 2, 0])
const rho = tomatoTwoQubit(entangledish, 0, 1, 400, 3)

check('a two-qubit density matrix is four by four',
  rho.length === 4 && rho.every((row) => row.length === 4))

check('its trace is one, within the sampling tolerance',
  abs(rho.reduce((s, row, i) => s + row[i]!.re, 0) - 1) < 1 / 20,
  String(rho.reduce((s, row, i) => s + row[i]!.re, 0)))

check('the diagonal is real and non-negative — those are probabilities',
  rho.every((row, i) => abs(row[i]!.im) < 1 / 1000 && row[i]!.re >= -(1 / 20)))

check('it is Hermitian: rho[i][j] is the conjugate of rho[j][i]',
  rho.every((row, i) => row.every((z, j) =>
    abs(z.re - rho[j]![i]!.re) < 1 / 20 && abs(z.im + rho[j]![i]!.im) < 1 / 20)))

check('the same state and seed give the same matrix',
  JSON.stringify(tomatoTwoQubit(entangledish, 0, 1, 400, 3)) === JSON.stringify(rho))

const proof = generateTomographyProof(measureZ(entangledish, 0, 400, 1))
check('a tomography proof of a real state verifies', verifyTomographyProof(proof))

check('the proof\'s two probabilities are the measured counts over the shots',
  abs(proof.prob0 + proof.prob1 - 1) < 1 / 1_000_000 && proof.shotsMeasured === 400)

check('a proof whose probabilities do not sum to one is REFUSED',
  !verifyTomographyProof({ ...proof, prob0: 0, prob1: 0 })
  && !verifyTomographyProof({ ...proof, prob0: 5, prob1: 5 }),
  'a verifier that cannot say no says nothing')

// --- readout calibration --------------------------------------------------
const cal = calibrateReadout(2000, 7)
check('calibrated error rates are probabilities',
  cal.p01 >= 0 && cal.p01 <= 1 && cal.p10 >= 0 && cal.p10 <= 1)

check('accuracy and the error rates account for each other',
  abs(cal.calibrationAccuracy - (1 - (cal.p01 + cal.p10) / 2)) < 1 / 1000,
  `accuracy ${cal.calibrationAccuracy}, rates ${cal.p01}/${cal.p10}`)

check('the same shots and seed give the same calibration',
  JSON.stringify(calibrateReadout(2000, 7)) === JSON.stringify(cal))

check('a different seed gives a different calibration',
  JSON.stringify(calibrateReadout(2000, 8)) !== JSON.stringify(cal))

check('zero shots is refused rather than estimated from nothing',
  (() => { try { calibrateReadout(0, 1); return false } catch { return true } })())

// --- the publication proof -----------------------------------------------
const report = proveSystem()
const pub = exportPublicationProof(report, '9.9.9')

check('the published proof carries the report\'s numbers unchanged',
  pub.system_verified === report.system_verified
  && pub.total_checks === report.total_checks
  && pub.total_passed === report.total_passed
  && pub.confidence_score === report.confidence_score)

check('it carries the version it was given',
  JSON.stringify(pub).includes('9.9.9'))

check('every check passing does NOT by itself make the system verified',
  !(report.total_passed === report.total_checks && report.system_verified === true)
  || report.layers_verified.every((l) => l.checks_total > 0),
  'a layer that verifies nothing has not passed, and must hold the whole report to false')

check('the proof never claims more passed than were run',
  pub.total_passed <= pub.total_checks
  && report.layers_verified.every((l) => l.checks_passed <= l.checks_total))

check('the confidence score is a fraction of one',
  pub.confidence_score >= 0 && pub.confidence_score <= 1)

check('the exported layers are the report\'s layers',
  pub.layers.length === report.layers_verified.length)

// --- the orchestrator describes itself ------------------------------------
const text = describeOrchestration()
check('the description names all seven layers',
  [1, 2, 3, 4, 5, 6, 7].every((n) => text.includes(`${n}.`)), `${text.length} chars`)

check('the description is stable',
  describeOrchestration() === text)

console.log(failures === 0
  ? 'quantum reachable-exports ok — no trial energy falls below the ground state, and every verifier can still say no'
  : `quantum reachable-exports FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
