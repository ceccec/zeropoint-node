import * as C from './science-challenges.ts'
import { digitalRoot, VORTEX_ORBIT } from '../0/index.ts'
import { A432_CONSTANTS } from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'
import { createCheck } from '../verification/harness.ts'

const A432 = A432_CONSTANTS.BASE_FREQUENCY
const { check, failures } = createCheck()

{
  let cycleOk = true, harmonicOk = true
  for (let n = 1; n <= 100; n++) {
    const root = digitalRoot(n)
    if (C.calculateTeslaCycle(n) !== (root <= 3 ? 'creation' : root <= 6 ? 'harmony' : 'completion')) cycleOk = false
    if (C.calculateA432Harmonic(n) !== root * A432) harmonicOk = false
  }
  check('the tesla cycle is the gateway partition', cycleOk)
  check('every A432 harmonic is a digit times the base', harmonicOk)
  check('all three cycles are reachable',
    new Set([1, 4, 7].map(C.calculateTeslaCycle)).size === 3)

  VORTEX_ORBIT.forEach((d, i) => {
    const next = VORTEX_ORBIT[(i + 1) % VORTEX_ORBIT.length]
    check(`${d} to ${next} runs forward without reversal`, !C.analyzeVortexReversal(d, next).reversed)
  })
  check('a step off the circuit reverses', C.analyzeVortexReversal(1, 7).reversed)
}

{
  const w = C.createWaveParticleDualityChallenge()
  check('the worked example is the wave-particle challenge', w.id === 'wave_particle_duality')
  check('its consciousness flow is a digit', w.consciousnessFlow >= 1 && w.consciousnessFlow <= 9)
  check('its resonance follows its flow', w.a432Resonance === C.calculateA432Harmonic(w.consciousnessFlow))
  check('its cycle follows its flow', w.teslaCycle === C.calculateTeslaCycle(w.consciousnessFlow))
  check('its rodin position is within the circuit', w.rodinPosition >= 0 && w.rodinPosition < VORTEX_ORBIT.length)
  check('the worked example is deterministic',
    JSON.stringify(C.createWaveParticleDualityChallenge()) === JSON.stringify(w))

  const coll = C.collectFundamentalScienceChallenges()
  check('the collection includes the worked example',
    coll.challenges.some(c => c.id === 'wave_particle_duality'))
  check('challenge ids are unique', new Set(coll.challenges.map(c => c.id)).size === coll.challenges.length)
  check('every challenge states a confusion and an impossibility',
    coll.challenges.every(c => c.confusion.length > 0 && c.impossibility.length > 0))
  check('the cycle counts add up to the challenges',
    coll.cycles.creation + coll.cycles.harmony + coll.cycles.completion === coll.challenges.length)
  check('the total flow is a digit', coll.totalConsciousnessFlow >= 1 && coll.totalConsciousnessFlow <= 9)
  check('the collection agrees with the standalone worked example',
    JSON.stringify(coll.challenges.find(c => c.id === 'wave_particle_duality')?.consciousnessFlow) ===
    JSON.stringify(w.consciousnessFlow))

  const r = C.analyzeChallengeResolution('quantum_entanglement')
  check('a known challenge resolves', r.resolved)
  check('the resolution gives a reason', r.mathematicalReason.length > 0)
  check('an unknown challenge does not resolve and does not throw',
    C.analyzeChallengeResolution('no-such-challenge').resolved === false)
}

// The chain property: each receipt seals the one before it, so any edit
// anywhere changes the root and every receipt after the edit.
{
  const outcomes = { z: [0, 1, 1, 0], x: [1, 0, 1], y: [0, 0] }
  const b = C.recordMeasurementBatch('state-1', outcomes)
  check('one receipt per measurement, per basis',
    b.zReceipt.length === 4 && b.xReceipt.length === 3 && b.yReceipt.length === 2)
  check('every receipt is distinct',
    new Set([...b.zReceipt, ...b.xReceipt, ...b.yReceipt]).size === 9)
  check('the batch is deterministic',
    JSON.stringify(C.recordMeasurementBatch('state-1', outcomes)) === JSON.stringify(b))

  const flipped = C.recordMeasurementBatch('state-1', { ...outcomes, z: [0, 1, 0, 0] })
  check('flipping one outcome changes the batch root', flipped.batchRoot !== b.batchRoot)
  check('flipping one outcome changes every later receipt in that chain',
    flipped.zReceipt[2] !== b.zReceipt[2] && flipped.zReceipt[3] !== b.zReceipt[3])
  check('and leaves the earlier ones alone', flipped.zReceipt[0] === b.zReceipt[0])
  check('and does not touch the other bases',
    JSON.stringify(flipped.xReceipt) === JSON.stringify(b.xReceipt))

  const dropped = C.recordMeasurementBatch('state-1', { ...outcomes, z: [0, 1, 1] })
  check('dropping a measurement changes the root', dropped.batchRoot !== b.batchRoot)
  const reordered = C.recordMeasurementBatch('state-1', { ...outcomes, z: [1, 0, 1, 0] })
  check('reordering measurements changes the root', reordered.batchRoot !== b.batchRoot)
  check('a different state id changes the root',
    C.recordMeasurementBatch('state-2', outcomes).batchRoot !== b.batchRoot)
  check('an empty batch still produces a root', C.recordMeasurementBatch('s', { z: [], x: [], y: [] }).batchRoot.length > 0)
}

console.log()
if (failures() > 0) { console.error(`science-challenges FAIL — ${failures()}`); process.exit(1) }
console.log('science-challenges ok')
process.exit(0)
