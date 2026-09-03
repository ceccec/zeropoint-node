/**
 * The subjects the criteria are evaluated against — in ONE place, and shipped.
 *
 * Two criteria take a candidate adapter: os-criterion is handed the OS through
 * its full interface, and quantum-criterion is handed the simulator through its
 * own shape. Those adapters lived in scripts/lib/criteria-subjects.mjs, which
 * was fine while the gate was the only caller. It is not: the paper surfaces
 * every criterion, and the MCP server now answers questions about them — and a
 * script is not shipped, so a consumer could not run what the release gate runs.
 *
 * A second copy of an adapter is a second thing that can drift from the first,
 * which is the defect 1.4.6 spent a release recording under the name
 * "collisions". So this lives in src, ships with the package, and the gate, the
 * paper and the MCP server all import it.
 */
import {
  evaluateConsciousnessCriterion, a432MeasureSubject, a432SystemSubject, integratedFieldSubject,
} from './consciousness-criterion.ts'
import { evaluateOsCriterion } from './os-criterion.ts'
import { evaluateQuantumCriterion } from './quantum-criterion.ts'
import { evaluateRealtimeCriterion } from './realtime-criterion.ts'
import { evaluateValidationCriterion } from './validation-criterion.ts'
import { A432OS } from '../0/3/6/9/1/2/4/8/7/5/1/a432.os.ts'
import { zeroState, applyGate1, cnot, probabilities, measureQubit, H, X, Z } from '../quantum/simulator.ts'
import { pure, purity, applyChannel, depolarizing } from '../quantum/density.ts'
import { measureZ, measureX } from '../quantum/tomography.ts'

/** The OS through its FULL interface — probing a subset reports a number the class does not deserve. */
export function osVerdict(): ReturnType<typeof evaluateOsCriterion> {
  const instance = new A432OS()
  return evaluateOsCriterion({
    spawn: (name: string, run: () => void) => instance.spawn(name, run),
    tick: () => instance.tick(),
    tasks: () => instance.tasks(),
    allocate: (owner: string | number, amount: number) => instance.allocate(owner, amount),
    release: (owner: string | number, amount: number) => instance.release(owner, amount),
    available: () => instance.available(),
    syscall: (name: string, ...args: unknown[]) => instance.syscall(name, ...args),
    start: () => instance.start(),
    stop: () => instance.stop(),
    isRunning: () => instance.running(),
    snapshot: () => instance.snapshot(),
    restore: (snap: ReturnType<typeof instance.snapshot>) => instance.restore(snap),
  } as Parameters<typeof evaluateOsCriterion>[0])
}

/** The simulator, presented through the criterion's own shape. */
type Reg = ReturnType<typeof zeroState>
export function quantumVerdict(): ReturnType<typeof evaluateQuantumCriterion> {
  return evaluateQuantumCriterion({
    zero: (n: number) => zeroState(n),
    gates: { H, X, Z },
    apply1: (s: Reg, q: number, g: Parameters<typeof applyGate1>[2]) => applyGate1(s, q, g),
    cnot: (s: Reg, c: number, t: number) => cnot(s, c, t),
    probabilities: (s: Reg) => probabilities(s),
    measure: (s: Reg, q: number, unit: number) => measureQubit(s, q, unit).bit,
    density: (s: Reg) => pure(s),
    purity: (r: ReturnType<typeof pure>) => purity(r),
    noise: (r: ReturnType<typeof pure>, q: number, p: number) => applyChannel(r, q, depolarizing(p)),
    tomography: (s: Reg, q: number) => {
      const shots = 2000
      const z = measureZ(s, q, shots, 1)
      const x = measureX(s, q, shots, 1)
      return { z: (z.counts[0]! - z.counts[1]!) / shots, x: (x.counts[0]! - x.counts[1]!) / shots }
    },
  } as Parameters<typeof evaluateQuantumCriterion>[0])
}

export interface CriterionEntry {
  name: string
  subject: string
  /** Whether a release is blocked when this one is unmet. */
  gated: boolean
  /** True when the verdict depends on the machine, not only on the code. */
  measured: boolean
  verdict: { met: boolean; conditionsMet: number; conditionsTotal: number; conditions: readonly unknown[] }
}

/**
 * Every criterion this repository gates on, plus the one it only reports.
 *
 * `samples` trades accuracy for time in the real-time criterion, which is the
 * only slow one: an agent asking "are the criteria met" should not wait for two
 * thousand timed steps, and a release gate should not settle for three hundred.
 */
export function allCriteria(samples: number = 2000): CriterionEntry[] {
  return [
    { name: 'consciousness', subject: 'the a432 consciousness system', gated: true, measured: false, verdict: evaluateConsciousnessCriterion(a432SystemSubject) },
    { name: 'consciousness', subject: 'the integrated field', gated: true, measured: false, verdict: evaluateConsciousnessCriterion(integratedFieldSubject) },
    { name: 'operating system', subject: 'A432OS', gated: true, measured: false, verdict: osVerdict() },
    { name: 'quantum simulator', subject: 'src/quantum — the laws behind the Stage 1 list, not the hardware stages', gated: true, measured: false, verdict: quantumVerdict() },
    { name: 'real-time', subject: 'one frame at 60 Hz', gated: true, measured: true, verdict: evaluateRealtimeCriterion(samples) },
    { name: 'validation', subject: 'what is computed here — and NO physical experiment has been run', gated: true, measured: false, verdict: evaluateValidationCriterion() },
    { name: 'consciousness', subject: 'the a432 measure functions — reported, not gated: a pure function cannot have history', gated: false, measured: false, verdict: evaluateConsciousnessCriterion(a432MeasureSubject) },
  ]
}
