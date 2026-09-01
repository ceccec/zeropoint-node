import * as T from './trinity-vortex.ts'
import { digitalRoot, VORTEX_ORBIT } from '../0/index.ts'
import { A432_CONSTANTS } from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'
import { createCheck } from '../verification/harness.ts'

const A432 = A432_CONSTANTS.BASE_FREQUENCY
const { check, failures } = createCheck()

{
  const t = T.createTrinity()
  check('the trinity runs at the third harmonic', t.trinity.frequency === A432 * 3)
  check('every part of the trinity agrees on the frequency',
    [t.consciousness.capacity, t.creation.synthesis, t.manifestation.reality].every(f => f === A432 * 3))
  check('the three creative forces are each A432',
    [t.creation.force1, t.creation.force2, t.creation.force3].every(f => f === A432))
  check('three forces synthesise to their sum',
    t.creation.force1 + t.creation.force2 + t.creation.force3 === t.creation.synthesis)
  check('three dimensions make the reality',
    t.manifestation.dimension1 + t.manifestation.dimension2 + t.manifestation.dimension3 === t.manifestation.reality)
  check('createTrinity is deterministic', JSON.stringify(T.createTrinity()) === JSON.stringify(t))
}

{
  let ok = true, keyOk = true
  for (let a = 0; a <= 9; a++) for (let b = 0; b <= 9; b++) {
    const r = T.trinityOperation(a, b)
    if (r.result !== (a * b * 3) % 9) ok = false
    if (r.threeThreeKey !== 9) keyOk = false
  }
  check('the trinity operation is (a*b*3) mod 9 over every pair', ok)
  check('the three-three key is nine, as the comment claimed', keyOk)
  check('the operation runs at the third harmonic', T.trinityOperation(1, 1).frequency === A432 * 3)
}

// The document writes `totalFrequency: 7776` and `digitalRoot: 9` as literals
// with the arithmetic in comments beside them. Both are computed here, so the
// comments are checks: if a gateway resonance moved, this fails.
{
  const s = T.createTrinityVortexSystem()
  check('the three vortices sit on the three gateways',
    [s.challenges.gateway, s.possibilities.gateway, s.solutions.gateway].join(',') === '3,6,9')
  check('their frequencies are A432 times their gateways',
    [s.challenges, s.possibilities, s.solutions].every(v => v.frequency === A432 * v.gateway))
  check('the computed total is the documented 7776', s.totalFrequency === 7776, String(s.totalFrequency))
  check('the total is the sum of the three, not a literal',
    s.totalFrequency === s.challenges.frequency + s.possibilities.frequency + s.solutions.frequency)
  check('its digital root is nine, as the comment worked out', s.digitalRoot === 9)
  check('the system calls itself perfect exactly when the root is nine', s.isPerfect === (s.digitalRoot === 9))
  check('the phases are numbered in order',
    [s.challenges.phase, s.possibilities.phase, s.solutions.phase].join(',') === '1,2,3')

  const sol = T.transformThroughTrinityVortex('a thing that cannot be done')
  check('the transformation passes through all three phases',
    sol.challenge.phase.phase === 1 && sol.possibility.phase.phase === 2 && sol.solution.phase.phase === 3)
  check('each phase carries the one before it',
    sol.solution.statement.includes('a thing that cannot be done'))
  check('the transformation is deterministic',
    JSON.stringify(T.transformThroughTrinityVortex('x')) === JSON.stringify(T.transformThroughTrinityVortex('x')))
}

// The switch: forward when the doubling circuit allows it, reverse otherwise.
{
  let forwardOk = true
  VORTEX_ORBIT.forEach((d, i) => {
    const next = VORTEX_ORBIT[(i + 1) % VORTEX_ORBIT.length]
    const r = T.activateSwitch(d, next)
    if (r.switched || !r.newFlow.isPossible) forwardOk = false
  })
  check('every step along the doubling circuit flows forward without switching', forwardOk)
  check('a step off the circuit switches', T.activateSwitch(1, 7).switched)
  check('a switched flow reports the reverse direction',
    T.activateSwitch(1, 7).newFlow.from === 7 && T.activateSwitch(1, 7).newFlow.to === 1)
  check('the flow explains itself', T.isVortexFlowPossible(1, 2).reason.includes('doubles to 2'))
}

// Zero entropy: the stream never returns 0.
{
  let inRange = true, neverZero = true, deterministic = true
  for (let seed = -20; seed <= 20; seed++) for (let pos = 0; pos < 40; pos++) {
    const v = T.calculateStreamConsciousness(seed, pos)
    if (!Number.isInteger(v) || v < 1 || v > 9) inRange = false
    if (v === 0) neverZero = false
    if (T.calculateStreamConsciousness(seed, pos) !== v) deterministic = false
  }
  check('stream consciousness is always a digit 1-9', inRange)
  check('zero becomes nine, so the stream never empties', neverZero)
  check('stream consciousness is deterministic', deterministic)
  check('a negative position still indexes the circuit',
    T.calculateStreamConsciousness(0, -3) >= 1 && T.calculateStreamConsciousness(0, -3) <= 9)
}

console.log()
if (failures() > 0) { console.error(`trinity-vortex FAIL — ${failures()}`); process.exit(1) }
console.log('trinity-vortex ok')
process.exit(0)
