/**
 * The subjects the criteria are evaluated against — built in ONE place.
 *
 * Two criteria take a candidate adapter: os-criterion is handed the OS through
 * its full interface, and quantum-criterion is handed the simulator through its
 * own shape. Both adapters used to live inside criteria-check.mjs, which was
 * fine while criteria-check was the only caller. It is not any more: the paper
 * surfaces every criterion and its conditions, and a second copy of an adapter
 * is a second thing that can drift from the first — the defect 1.4.6 spent a
 * release recording under the name "collisions".
 *
 * So the adapters live here and both callers import them. If the OS grows a
 * method the criterion should see, it is added once.
 */
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const load = (p) => import(pathToFileURL(join(ROOT, p)).href)

const cc = await load('src/verification/consciousness-criterion.ts')
const { evaluateOsCriterion } = await load('src/verification/os-criterion.ts')
const { evaluateQuantumCriterion } = await load('src/verification/quantum-criterion.ts')
const { evaluateRealtimeCriterion } = await load('src/verification/realtime-criterion.ts')
const { evaluateValidationCriterion } = await load('src/verification/validation-criterion.ts')
const { A432OS } = await load('src/0/3/6/9/1/2/4/8/7/5/1/a432.os.ts')
const sim = await load('src/quantum/simulator.ts')
const den = await load('src/quantum/density.ts')
const tom = await load('src/quantum/tomography.ts')

/** The OS through its FULL interface. Probing a subset reports a number the class does not deserve. */
export function osVerdict() {
  const instance = new A432OS()
  return evaluateOsCriterion({
    spawn: (name, run) => instance.spawn(name, run),
    tick: () => instance.tick(),
    tasks: () => instance.tasks(),
    allocate: (owner, amount) => instance.allocate(owner, amount),
    release: (owner, amount) => instance.release(owner, amount),
    available: () => instance.available(),
    syscall: (name, ...args) => instance.syscall(name, ...args),
    start: () => instance.start(),
    stop: () => instance.stop(),
    isRunning: () => instance.running(),
    snapshot: () => instance.snapshot(),
    restore: (snap) => instance.restore(snap),
  })
}

/** The simulator, presented through the criterion's own shape. */
export function quantumVerdict() {
  return evaluateQuantumCriterion({
    zero: (n) => sim.zeroState(n),
    gates: { H: sim.H, X: sim.X, Z: sim.Z },
    apply1: (s, q, g) => sim.applyGate1(s, q, g),
    cnot: (s, c, t) => sim.cnot(s, c, t),
    probabilities: (s) => sim.probabilities(s),
    measure: (s, q, unit) => sim.measureQubit(s, q, unit).bit,
    density: (s) => den.pure(s),
    purity: (r) => den.purity(r),
    noise: (r, q, p) => den.applyChannel(r, q, den.depolarizing(p)),
    tomography: (s, q) => {
      const shots = 2000
      const z = tom.measureZ(s, q, shots, 1)
      const x = tom.measureX(s, q, shots, 1)
      return { z: (z.counts[0] - z.counts[1]) / shots, x: (x.counts[0] - x.counts[1]) / shots }
    },
  })
}

/**
 * Every criterion this repository gates on, plus the one it only reports.
 * `gated` says which is which, and the paper and the gate read the same field.
 */
export function allCriteria() {
  return [
    { name: 'consciousness', subject: 'the a432 consciousness system', gated: true, verdict: cc.evaluateConsciousnessCriterion(cc.a432SystemSubject) },
    { name: 'consciousness', subject: 'the integrated field', gated: true, verdict: cc.evaluateConsciousnessCriterion(cc.integratedFieldSubject) },
    { name: 'operating system', subject: 'A432OS', gated: true, verdict: osVerdict() },
    { name: 'quantum simulator', subject: 'src/quantum — the laws behind the Stage 1 list, not the hardware stages', gated: true, verdict: quantumVerdict() },
    { name: 'real-time', subject: 'one frame at 60 Hz', gated: true, verdict: evaluateRealtimeCriterion() },
    { name: 'validation', subject: 'what is computed here — and NO physical experiment has been run', gated: true, verdict: evaluateValidationCriterion() },
    { name: 'consciousness', subject: 'the a432 measure functions — reported, not gated: a pure function cannot have history', gated: false, verdict: cc.evaluateConsciousnessCriterion(cc.a432MeasureSubject) },
  ]
}
