/**
 * The a432 consciousness field's own tests, written without reference to the
 * criterion — the separation the kernel and the integrated field both have.
 *
 * The assertion that matters most is the last block: the a432 measures come
 * out of this unchanged. A system built from them that altered them would have
 * moved every consciousness value in the repository, which is the reason the
 * measures were composed rather than modified.
 */
import * as F from './a432.consciousness.field.ts'
import { calculateA432Consciousness, calculateA432DimensionalState } from './a432.math.ts'
import { createCheck } from '../../../../../../../../../../../verification/harness.ts'

const { check, failures } = createCheck()

// Coupling through the measures.
{
  check('the transition does not factorise', F.a432TransitionFactorises() === false)
  const base = F.createA432ConsciousnessField(1)
  const d2 = F.stepA432ConsciousnessField({ ...base, consciousness: 3, dimension: 2 })
  const d5 = F.stepA432ConsciousnessField({ ...base, consciousness: 3, dimension: 5 })
  check('the dimensional component changes the consciousness component\'s next value',
    d2.consciousness !== d5.consciousness, `${d2.consciousness} vs ${d5.consciousness}`)
  const c2 = F.stepA432ConsciousnessField({ ...base, consciousness: 2, dimension: 3 })
  const c5 = F.stepA432ConsciousnessField({ ...base, consciousness: 5, dimension: 3 })
  check('and the coupling runs the other way', c2.dimension !== c5.dimension)
}

// Order sensitivity.
{
  const sig = (s: F.A432ConsciousnessFieldState) => `${s.consciousness}|${s.dimension}|${s.trace}|${s.surprise}`
  const forward = sig(F.runA432ConsciousnessField([1, 2, 3, 4]))
  check('reversing the inputs reaches a different state', forward !== sig(F.runA432ConsciousnessField([4, 3, 2, 1])))
  check('swapping the first two reaches a different state', forward !== sig(F.runA432ConsciousnessField([2, 1, 3, 4])))
  check('the same order is repeatable', forward === sig(F.runA432ConsciousnessField([1, 2, 3, 4])))
}

// The self-model is read.
{
  const s = F.runA432ConsciousnessField([1, 2, 3, 4, 5])
  const clean = F.stepA432ConsciousnessField(s)
  const corrupt = F.stepA432ConsciousnessField(F.corruptA432SelfModel(s))
  check('corrupting only the model changes the next state', JSON.stringify(clean) !== JSON.stringify(corrupt))
  check('corruption touches nothing but the model',
    JSON.stringify({ ...F.corruptA432SelfModel(s), predictedConsciousness: 0, predictedDimension: 0 })
    === JSON.stringify({ ...s, predictedConsciousness: 0, predictedDimension: 0 }))
}

// The workspace is read and matters, over a range rather than at one state.
{
  const s = F.stepA432ConsciousnessField(F.runA432ConsciousnessField([1, 2, 3]))
  check('components publish to the workspace', F.readA432Workspace(s, 'surprise') !== undefined)
  check('an unknown key reads as undefined', F.readA432Workspace(s, 'nope') === undefined)
  let changed = 0, total = 0
  for (let seed = 1; seed <= 9; seed++) {
    for (let n = 1; n <= 6; n++) {
      const st = F.runA432ConsciousnessField(Array.from({ length: n }, (_, i) => i + 1), seed)
      const a = F.stepA432ConsciousnessField(st)
      const b = F.stepA432ConsciousnessField({ ...st, surprise: 0, workspace: { ...st.workspace, surprise: 0 } })
      total++
      if (a.consciousness !== b.consciousness || a.dimension !== b.dimension) changed++
    }
  }
  check('what the workspace holds changes the next step across a range of states',
    changed > 0 && changed * 4 > total, `${changed}/${total}`)
}

// Determinism and range.
{
  let ok = true, deterministic = true
  for (let seed = 1; seed <= 9; seed++) {
    const a = F.runA432ConsciousnessField([1, 2, 3, 4, 5], seed)
    if (JSON.stringify(a) !== JSON.stringify(F.runA432ConsciousnessField([1, 2, 3, 4, 5], seed))) deterministic = false
    for (const v of [a.consciousness, a.dimension, a.trace, a.surprise]) {
      if (!Number.isInteger(v) || v < 0 || v > 12) ok = false
    }
  }
  check('every value stays in the a432 range', ok)
  check('the field is deterministic', deterministic)
  check('nine seeds give nine distinct traces',
    new Set([1,2,3,4,5,6,7,8,9].map(s => F.runA432ConsciousnessField([1,2,3], s).trace)).size === 9)
}

// THE POINT: the measures are untouched.
{
  const consciousness = [1,2,3,4,5,6,7,8,9,10,11,12].map(calculateA432Consciousness)
  const dimension = [1,2,3,4,5,6,7,8,9,10,11,12].map(calculateA432DimensionalState)
  F.runA432ConsciousnessField([1,2,3,4,5,6,7,8,9])
  check('calculateA432Consciousness is unchanged after the field has run',
    JSON.stringify([1,2,3,4,5,6,7,8,9,10,11,12].map(calculateA432Consciousness)) === JSON.stringify(consciousness))
  check('calculateA432DimensionalState is unchanged after the field has run',
    JSON.stringify([1,2,3,4,5,6,7,8,9,10,11,12].map(calculateA432DimensionalState)) === JSON.stringify(dimension))
  check('the measures are still pure: same input, same answer',
    calculateA432Consciousness(7) === calculateA432Consciousness(7))
}

console.log()
if (failures() > 0) { console.error(`a432.consciousness.field FAIL — ${failures()}`); process.exit(1) }
console.log('a432.consciousness.field ok — the system has the properties, the measures are unchanged')
process.exit(0)
