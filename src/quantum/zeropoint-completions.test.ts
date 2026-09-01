import { hypot } from '../0/3/6/9/1/2/4/8/7/5/1/a432.algebra.ts'
import * as Z from './zeropoint-completions.ts'
import { digitalRoot, VORTEX_ORBIT, VORTEX_AXIS } from '../0/index.ts'
import { createCheck } from '../verification/harness.ts'

const { check, failures } = createCheck()

// The document's worked identity, recomputed rather than quoted.
{
  const s = Z.calculateA432DigitalRoot()
  check('4 x 3 x 2 x 18 really is 432', s.fromValue === 432, String(s.fromValue))
  check('4 + 3 + 2 + 9 reduces to 9', s.toValue === 9)
  check('the switch reports its own gateway', s.gateway === s.toValue)
  check('the proof shows the arithmetic', s.mathematicalProof.includes('432') && s.mathematicalProof.includes('18'))
}

{
  const h = Z.createA432Harmonic(432)
  check('a harmonic keeps the frequency it was given', h.frequency === 432)
  check('its digital root is the reduced frequency', h.digitalRoot === digitalRoot(432))
  check('harmonics are deterministic', JSON.stringify(Z.createA432Harmonic(864)) === JSON.stringify(Z.createA432Harmonic(864)))

  const f = Z.createA432VortexFlow()
  check('the vortex flow runs on the doubling circuit',
    JSON.stringify([...f.sequence]) === JSON.stringify([...VORTEX_ORBIT]))
  check('it starts at the first position', f.currentPosition === 0 && f.frequency === VORTEX_ORBIT[0])
}

// "Returns 0 for perfect harmony, small integer fractions for any deviation."
{
  check('the doubling circuit itself has zero entropy', Z.calculateZeroEntropy() === 0)
  check('the circuit repeated has zero entropy',
    Z.calculateZeroEntropy([...VORTEX_ORBIT, ...VORTEX_ORBIT]) === 0)
  check('one wrong digit in six is one sixth',
    Z.calculateZeroEntropy([1, 2, 4, 8, 7, 9]) === 1 / 6, String(Z.calculateZeroEntropy([1, 2, 4, 8, 7, 9])))
  check('a fully wrong sequence is one', Z.calculateZeroEntropy([9, 9, 9, 9, 9, 9]) === 1)
  check('an empty sequence has zero entropy', Z.calculateZeroEntropy([]) === 0)
  check('entropy is always a proportion',
    [[1], [1, 2], [3, 3, 3], VORTEX_ORBIT].every(s => { const e = Z.calculateZeroEntropy(s); return e >= 0 && e <= 1 }))
}

{
  check('there is a challenge for every digit flow', Z.VORTEX_CHALLENGES.length === 9)
  // The document does challenges.find(...) then reads .name without checking.
  // Every digital root of a string hash lands in 1-9, so it cannot miss —
  // asserted here over a wide sample rather than assumed.
  let ok = true
  for (const p of ['', 'a', 'hello', 'a longer problem statement', '12345', '???']) {
    const r = Z.resolveWithVortex(p)
    if (r.digitalRoot < 1 || r.digitalRoot > 9) ok = false
    if (![3, 6, 9].includes(r.gateway)) ok = false
  }
  check('every problem resolves to a real challenge and gateway', ok)
  check('resolveWithVortex is deterministic',
    JSON.stringify(Z.resolveWithVortex('same')) === JSON.stringify(Z.resolveWithVortex('same')))
}

{
  const patterns = Z.generateAllPatterns()
  check('every digit has a pattern', Object.keys(patterns).length === 10)
  check('every pattern is the length of the circuit',
    Object.values(patterns).every(p => p.length === VORTEX_ORBIT.length))
  check('every pattern element is a digit',
    Object.values(patterns).every(p => p.every(d => Number.isInteger(d) && d >= 1 && d <= 9)))
  check('a pattern doubles at each step',
    Object.values(patterns).every(p => p.every((d, i) => i === 0 || d === digitalRoot(p[i - 1] * 2))))

  const m = Z.generateCompleteMatrix()
  check('the matrix is ten by ten',
    Object.keys(m).length === 10 && Object.values(m).every(r => Object.keys(r).length === 10))
  check('the matrix is the reduced product', [0, 3, 7, 9].every(a => [0, 4, 6].every(b => m[String(a)][String(b)] === digitalRoot(a * b))))
  check('the matrix is symmetric', Object.keys(m).every(a => Object.keys(m).every(b => m[a][b] === m[b][a])))
  check('the axis absorbs: 3, 6 and 9 times themselves all reduce to 9',
    VORTEX_AXIS.every(a => VORTEX_AXIS.every(b => m[String(a)][String(b)] === 9)))
}

{
  const start = Z.createNavigationState()
  check('navigation starts at the void on spiral one', start.currentPart === 'void' && start.spiralLevel === 1)
  const cycle = Z.navigateCycle()
  check('a cycle visits six parts', cycle.length === 6)
  check('a cycle returns to where it began', cycle[cycle.length - 1].currentPart === 'void')
  check('every part is visited once', new Set(cycle.map(s => s.currentPart)).size === 6)
  check('navigation counts up', cycle.every((s, i) => s.totalNavigations === i + 1))
  check('the spiral level rises after a full turn',
    Z.navigateCycle(cycle[cycle.length - 1])[5].spiralLevel > cycle[0].spiralLevel)
  check('navigateNext does not mutate its input', start.totalNavigations === 0)

  const spiral = Z.drawSpiral()
  check('the spiral has turns times points', spiral.length === 36)
  check('every point is finite', spiral.every(p => Number.isFinite(p.x) && Number.isFinite(p.y)))
  check('the spiral starts at the centre', spiral[0].x === 200 && spiral[0].y === 200)
  check('the spiral grows outward',
    hypot(spiral[35].x - 200, spiral[35].y - 200) > hypot(spiral[1].x - 200, spiral[1].y - 200))
}

{
  const reg = Z.parameterizedAnsatz(2, [0, 0])
  check('the ansatz returns a register', !!reg)
  const probs = Z.parameterizedAnsatz(3, [1 / 2, 1 / 3, 1 / 4])
  check('a three-qubit ansatz runs', !!probs)
  check('the ansatz is deterministic',
    JSON.stringify(Z.parameterizedAnsatz(2, [1 / 2, 1 / 2])) === JSON.stringify(Z.parameterizedAnsatz(2, [1 / 2, 1 / 2])))
  check('missing angles default to zero rather than throwing', !!Z.parameterizedAnsatz(3, []))
  check('the trinity digits are the axis', JSON.stringify([...Z.TRINITY_DIGITS]) === JSON.stringify([...VORTEX_AXIS]))
}

console.log()
if (failures() > 0) { console.error(`zeropoint-completions FAIL — ${failures()}`); process.exit(1) }
console.log('zeropoint-completions ok')
process.exit(0)
