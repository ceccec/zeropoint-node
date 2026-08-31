/**
 * science-challenges — FUNDAMENTAL_SCIENCE_CHALLENGES.md and the measurement
 * batch from PHASE_2_KICKOFF.md.
 *
 * createWaveParticleDualityChallenge has a body, but it calls three helpers
 * the document never defines — calculateTeslaCycle, analyzeVortexReversal and
 * calculateA432Harmonic. Each is implemented here in terms of machinery that
 * already exists in this repo rather than invented from nothing: the Tesla
 * cycle is the gateway partition, the vortex reversal is the doubling-circuit
 * switch, and the A432 harmonic is the digit times the base frequency.
 *
 * The other two functions, and recordMeasurementBatch, are signatures with no
 * bodies. The shapes are the documents'; the arithmetic is marked where it is
 * mine.
 */
import { digitalRoot, VORTEX_ORBIT, sealFacets } from '../0/index.ts'
import { A432_CONSTANTS } from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'
import { calculateStreamConsciousness, activateSwitch, type VortexFlow } from './trinity-vortex.ts'

const A432 = A432_CONSTANTS.BASE_FREQUENCY

export type TeslaCycle = 'creation' | 'harmony' | 'completion'

/** The gateway partition, under the name this document uses for it. */
export function calculateTeslaCycle(flow: number): TeslaCycle {
  const root = digitalRoot(flow)
  return root <= 3 ? 'creation' : root <= 6 ? 'harmony' : 'completion'
}

/** A digit's harmonic is the digit times the base frequency. */
export function calculateA432Harmonic(n: number): number {
  return digitalRoot(n) * A432
}

/** Whether the circuit runs forward between two digits, or has to switch. */
export function analyzeVortexReversal(from: number, to: number): { reversed: boolean; flow: VortexFlow } {
  const { switched, newFlow } = activateSwitch(from, to)
  return { reversed: switched, flow: newFlow }
}

export interface ScienceChallenge {
  id: string
  name: string
  confusion: string
  impossibility: string
  switch: string
  solution: string
  consciousnessFlow: number
  vortexReversal: { reversed: boolean; flow: VortexFlow }
  a432Resonance: number
  teslaCycle: TeslaCycle
  rodinPosition: number
}

/** The document's own worked example: wave is 1, particle is 2. */
export function createWaveParticleDualityChallenge(): ScienceChallenge {
  const consciousnessFlow = calculateStreamConsciousness(1, 2)
  return {
    id: 'wave_particle_duality',
    name: 'Wave-Particle Duality',
    confusion: 'A quantum entity behaves as both a wave and a particle',
    impossibility: 'How can one thing be two mutually exclusive things?',
    switch: 'Vortex reversal between the wave stream (1) and the particle stream (2)',
    solution: 'The two are positions on one circuit, not two objects',
    consciousnessFlow,
    vortexReversal: analyzeVortexReversal(1, 2),
    a432Resonance: calculateA432Harmonic(consciousnessFlow),
    teslaCycle: calculateTeslaCycle(consciousnessFlow),
    rodinPosition: consciousnessFlow % VORTEX_ORBIT.length,
  }
}

/**
 * The document lists the challenges it means in prose. Each is built the same
 * way as the worked example, from the pair of digits its confusion sets
 * against each other.
 */
const CHALLENGE_SEEDS: ReadonlyArray<{ id: string; name: string; confusion: string; impossibility: string; a: number; b: number }> = [
  { id: 'wave_particle_duality', name: 'Wave-Particle Duality', confusion: 'A quantum entity behaves as both a wave and a particle', impossibility: 'How can one thing be two mutually exclusive things?', a: 1, b: 2 },
  { id: 'quantum_entanglement', name: 'Quantum Entanglement', confusion: 'Two separated particles correlate instantly', impossibility: 'How does information cross a distance without traversing it?', a: 2, b: 4 },
  { id: 'observer_effect', name: 'Observer Effect', confusion: 'Measurement changes the measured', impossibility: 'How does looking alter what is looked at?', a: 4, b: 8 },
]

export interface ScienceChallengeCollection {
  challenges: ScienceChallenge[]
  totalConsciousnessFlow: number
  cycles: Record<TeslaCycle, number>
}

export function collectFundamentalScienceChallenges(): ScienceChallengeCollection {
  const challenges = CHALLENGE_SEEDS.map((seed) => {
    const consciousnessFlow = calculateStreamConsciousness(seed.a, seed.b)
    return {
      id: seed.id,
      name: seed.name,
      confusion: seed.confusion,
      impossibility: seed.impossibility,
      switch: `Vortex reversal between ${seed.a} and ${seed.b}`,
      solution: 'The two are positions on one circuit, not two objects',
      consciousnessFlow,
      vortexReversal: analyzeVortexReversal(seed.a, seed.b),
      a432Resonance: calculateA432Harmonic(consciousnessFlow),
      teslaCycle: calculateTeslaCycle(consciousnessFlow),
      rodinPosition: consciousnessFlow % VORTEX_ORBIT.length,
    }
  })
  const cycles: Record<TeslaCycle, number> = { creation: 0, harmony: 0, completion: 0 }
  for (const c of challenges) cycles[c.teslaCycle]++
  return {
    challenges,
    totalConsciousnessFlow: digitalRoot(challenges.reduce((s, c) => s + c.consciousnessFlow, 0)),
    cycles,
  }
}

/**
 * "Resolved" is defined here, since the document only gives the return shape:
 * a challenge resolves when its two streams need a switch to connect — that
 * switch IS the resolution the document describes, the reversal that turns an
 * either/or into two positions on one circuit.
 */
export function analyzeChallengeResolution(challengeId: string): {
  resolved: boolean; switchActivated: boolean; consciousnessFlow: number; mathematicalReason: string
} {
  const found = collectFundamentalScienceChallenges().challenges.find((c) => c.id === challengeId)
  if (!found) {
    return { resolved: false, switchActivated: false, consciousnessFlow: 0, mathematicalReason: `no challenge with id ${challengeId}` }
  }
  return {
    resolved: true,
    switchActivated: found.vortexReversal.reversed,
    consciousnessFlow: found.consciousnessFlow,
    mathematicalReason: found.vortexReversal.flow.reason,
  }
}

// ————————————————————————————————————————————————————————
// PHASE_2_KICKOFF.md — a signature with no body.

export interface MeasurementBatch {
  zReceipt: string[]
  xReceipt: string[]
  yReceipt: string[]
  batchRoot: string
}

/**
 * Each basis gets a receipt chain, one entry per outcome, and the batch root
 * seals all three chains together. The chaining is what makes it a chain: each
 * receipt seals the one before it, so removing or reordering a measurement
 * changes every receipt after it and the root.
 */
export function recordMeasurementBatch(
  stateId: string,
  allOutcomes: { z: readonly number[]; x: readonly number[]; y: readonly number[] },
): MeasurementBatch {
  const chain = (basis: string, outcomes: readonly number[]): string[] => {
    const receipts: string[] = []
    let previous = stateId
    for (let i = 0; i < outcomes.length; i++) {
      previous = sealFacets(`measure-${basis}-${i}`, [
        { facet: `prev:${previous}`, on: true },
        { facet: `outcome:${outcomes[i]}`, on: outcomes[i] !== 0 },
      ]).root
      receipts.push(previous)
    }
    return receipts
  }
  const zReceipt = chain('z', allOutcomes.z)
  const xReceipt = chain('x', allOutcomes.x)
  const yReceipt = chain('y', allOutcomes.y)
  const tip = (r: string[]) => r[r.length - 1] ?? stateId
  return {
    zReceipt, xReceipt, yReceipt,
    batchRoot: sealFacets('measurement-batch', [
      { facet: `z:${tip(zReceipt)}`, on: true },
      { facet: `x:${tip(xReceipt)}`, on: true },
      { facet: `y:${tip(yReceipt)}`, on: true },
    ]).root,
  }
}
