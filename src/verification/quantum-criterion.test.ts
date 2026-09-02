/**
 * The quantum criterion, against the simulator and against four cheap defeats.
 *
 * A criterion is only worth the candidates it REJECTS. Each defeat below is a
 * thing that would pass a naive check for the same capability — a register that
 * reports probabilities, a model that entangles nothing, one that tracks
 * probabilities instead of amplitudes, one that has no mixed states — and each
 * is required to fail the specific condition it cannot satisfy. If a defeat
 * ever passes, the condition it defeats has stopped measuring anything.
 */
import {
  evaluateQuantumCriterion, unmetQuantumConditions, type CriterionGate, type QuantumCandidate,
} from './quantum-criterion.ts'
import {
  zeroState, applyGate1, cnot, probabilities, measureQubit, H, X, Z,
} from '../quantum/simulator.ts'
import { pure, purity, applyChannel, depolarizing, type Density } from '../quantum/density.ts'
import { measureZ, measureX } from '../quantum/tomography.ts'
import type { Register } from '../quantum/simulator.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}

// ---------------------------------------------------------- the real thing
const simulator: QuantumCandidate = {
  zero: (n) => zeroState(n),
  gates: { H: H as CriterionGate, X: X as CriterionGate, Z: Z as CriterionGate },
  apply1: (s, q, g) => applyGate1(s as Register, q, g as never),
  cnot: (s, c, t) => cnot(s as Register, c, t),
  probabilities: (s) => probabilities(s as Register),
  measure: (s, q, unit) => measureQubit(s as Register, q, unit).bit,
  density: (s) => pure(s as Register),
  purity: (r) => purity(r as Density),
  noise: (r, q, p) => applyChannel(r as Density, q, depolarizing(p)),
  tomography: (s, q) => {
    const shots = 2000
    const z = measureZ(s as Register, q, shots, 1)
    const x = measureX(s as Register, q, shots, 1)
    return {
      z: (z.counts[0] - z.counts[1]) / shots,
      x: (x.counts[0] - x.counts[1]) / shots,
    }
  },
}

const verdict = evaluateQuantumCriterion(simulator)
console.log(`  src/quantum meets ${verdict.conditionsMet}/${verdict.conditionsTotal}`)
for (const c of verdict.conditions) console.log(`    ${c.met ? 'MET  ' : 'UNMET'} ${c.id}`)
check('the simulator meets every condition', verdict.met,
  verdict.conditions.filter((c) => !c.met).map((c) => `${c.id}: ${c.evidence}`).join('; '))

// ------------------------------------------------------------ cheap defeats
const fails = (name: string, candidate: QuantumCandidate, id: string): void => {
  const v = evaluateQuantumCriterion(candidate)
  const c = v.conditions.find((x) => x.id === id)
  check(`${name} fails ${id}`, c !== undefined && !c.met, c ? `it reported met: ${c.evidence}` : 'no such condition')
}

/** 1. A classical bit register. It answers with probabilities and has no superposition. */
const classicalBits: QuantumCandidate = {
  zero: (n) => ({ bits: new Array<number>(n).fill(0) }),
  gates: { H: H as CriterionGate, X: X as CriterionGate, Z: Z as CriterionGate },
  apply1: (s) => s, // a bit register cannot rotate
  probabilities: (s) => {
    const bits = (s as { bits: number[] }).bits
    const p = new Array<number>(1 << bits.length).fill(0)
    p[bits.reduce((acc, b, i) => acc | (b << i), 0)] = 1
    return p
  },
}
fails('a classical bit register', classicalBits, 'superposition')

/** 2. Independent qubits: each may be in superposition, but nothing correlates them. */
const independent: QuantumCandidate = {
  zero: (n) => ({ p1: new Array<number>(n).fill(0) }), // per-qubit P(1)
  gates: { H: H as CriterionGate, X: X as CriterionGate, Z: Z as CriterionGate },
  apply1: (s, q, g) => {
    const st = s as { p1: number[] }
    const next = { p1: [...st.p1] }
    next.p1[q] = g === (H as unknown as CriterionGate) ? 1 / 2 : 1 - next.p1[q]!
    return next
  },
  cnot: (s) => s, // the whole point: it cannot correlate
  probabilities: (s) => {
    const { p1 } = s as { p1: number[] }
    const out = new Array<number>(1 << p1.length).fill(1)
    for (let i = 0; i < out.length; i += 1) {
      for (let q = 0; q < p1.length; q += 1) out[i]! *= (i >> q) & 1 ? p1[q]! : 1 - p1[q]!
    }
    return out
  },
}
fails('independent qubits', independent, 'entanglement')

/** 3. A probability model. It adds paths and so can never cancel one. */
const probabilitiesOnly: QuantumCandidate = {
  zero: () => ({ p: [1, 0] }),
  gates: { H: H as CriterionGate, X: X as CriterionGate, Z: Z as CriterionGate },
  apply1: (s, _q, g) => {
    const { p } = s as { p: number[] }
    if (g === (Z as unknown as CriterionGate)) return { p } // a phase is invisible to probabilities
    return { p: [(p[0]! + p[1]!) / 2, (p[0]! + p[1]!) / 2] } // H mixes, never cancels
  },
  probabilities: (s) => (s as { p: number[] }).p,
}
fails('a probability-only model', probabilitiesOnly, 'interference')

/** 4. State vectors only: correct until you ask for a mixed state. */
const pureOnly: QuantumCandidate = {
  ...simulator,
  density: (s) => pure(s as Register),
  purity: () => 1, // it has no way to be anything else
  noise: (r) => r, // and no way to become mixed
}
fails('a pure-state-only model', pureOnly, 'mixed-states')

// The work list is the verdict read the other way round, and must agree with it.
check('the work list is empty when every condition is met', unmetQuantumConditions(simulator).length === 0)
const defeatWork = unmetQuantumConditions(independent).map((c) => c.id)
check('the work list names what a defeat is missing', defeatWork.includes('entanglement'),
  `it named ${defeatWork.join(', ') || 'nothing'}`)

console.log(failures === 0
  ? `quantum-criterion ok — src/quantum meets ${verdict.conditionsMet}/${verdict.conditionsTotal}, and four cheap defeats fail the condition each cannot satisfy`
  : `quantum-criterion FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
