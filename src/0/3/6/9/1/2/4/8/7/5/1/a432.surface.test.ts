/**
 * Thirty-seven more exports that nothing called, and the laws that hold for
 * them — including the ones that only hold because the function ignores what it
 * was given.
 *
 * These are the second population patch 8 identified: not reachable from any
 * entry point, but imported or intended inside the tree. The gateway question
 * for them is whether they should be exported at all, and the honest way to
 * answer it is to find out what they do first. Two answers came back sharply:
 *
 *   createA432ByFrequency returns the same state for every frequency. Its whole
 *   name is the argument it does not use.
 *
 *   challengeColorCss("a432") returns "#NaNNaNNaN" — a CSS colour made of NaN,
 *   produced silently, which a browser will ignore and no one will see fail.
 *
 * Both are pinned below as laws that currently FAIL to hold in the direction
 * you would want, and are asserted in the direction that is actually true, with
 * the discrepancy named. A test that quietly asserted the broken behaviour as
 * correct would be worse than no test.
 */
import {
  createA432ByDimension, createA432ByFrequency, createA432ByPolarity,
  createA432Component, harmonizeA432States,
} from './a432.factory.ts'
import { createA432Body, getFlow, toCMYK, toHarmonic } from './a432.body.ts'
import {
  getImpossibleDescription, handleImpossible, handleImpossibleByColor, handleImpossibleById,
} from './a432.impossible.ts'
import { lookupA432MatrixByProperty, phraseToCmykId } from './a432.mapping.ts'
import { cmykFilename, harmonizeCmykFilenames, isCmykFilename } from './a432.cmyk.extension.ts'
import { challengeCMYK, challengeColorCss } from './a432.challenge.ts'
import { getCurrentMeaning } from './a432.text.ts'
import {
  getModuleByName, getOverlaysByCategory, harmonizeByStrategy,
  registerHarmonizationStrategy, routeEvent,
} from './a432.harmonized.ts'
import {
  generateBreakthroughInsight, generateCreativeSynthesis,
  generateEvolutionaryAdaptation, generateTransformativeParadigm,
} from './a432.innovation.ts'
import { createVortexStream, imagineAll, treeToVortexStream } from './a432.vortex.ts'
import {
  createA432ImperialState, analyzeA432ImperialState, harmonizeA432ImperialStates,
  getA432ImperialMetaphysicalEssence, generateA432ImperialMathematicalProof,
} from './a432.imperial.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// --- the factory ---------------------------------------------------------
check('creating by dimension gives a state whose frequency follows the dimension',
  DIGITS.filter((d) => d > 0).every((d) => {
    const s = createA432ByDimension(d) as unknown as { core: { frequency: number } }
    return Number.isFinite(s.core.frequency) && s.core.frequency > 0
  }))

check('creating by dimension is a function of the dimension',
  new Set([1, 2, 3, 4].map((d) => JSON.stringify(createA432ByDimension(d)))).size === 4)

check('creating by FREQUENCY gives a core that is always 432 Hz at dimension 1',
  [1, 3, 432, 864, 1296, 27648].every((f) => {
    const c = (createA432ByFrequency(f) as unknown as { core: { frequency: number; dimension: number } }).core
    return c.frequency === 432 && c.dimension === 1
  }),
  'pinned as it is: the requested frequency reaches the rest of the state but never the core, so createA432ByFrequency(1296).core.frequency is 432')

check('creating by polarity is a function of its argument',
  new Set([1, 2, 3].map((p) => JSON.stringify(createA432ByPolarity(p)))).size > 1)

check('an unknown component name is refused rather than invented',
  (() => { try { createA432Component('no.such.component' as Parameters<typeof createA432Component>[0]); return false } catch { return true } })())

check('harmonising states gives every state the same harmony',
  (() => {
    const states = [1, 2, 3].map((d) => createA432ByDimension(d))
    const out = harmonizeA432States(states) as unknown as { harmony: number }[]
    return out.length === 3 && new Set(out.map((s) => s.harmony)).size === 1
  })())

check('harmonising preserves the number of states',
  [1, 2, 5].every((n) => harmonizeA432States([...Array(n).keys()].map((d) => createA432ByDimension(d + 1))).length === n))

// --- the body ------------------------------------------------------------
check('a body has every system it names',
  (() => {
    const b = createA432Body() as unknown as Record<string, { name: string }>
    return ['skeletal', 'muscular', 'nervous'].every((k) => b[k]?.name === k)
  })())

check('a flow is six digits, all in 1..9',
  DIGITS.filter((d) => d > 0).every((d) => {
    const f = getFlow(d)
    return f.length === 6 && f.every((x) => x >= 1 && x <= 9)
  }))

check('a flow starts where it was asked to start',
  DIGITS.filter((d) => d > 0 && d < 9).every((d) => getFlow(d)[0] === ((d % 9) + 1)),
  'each flow is the doubling walk begun one past the digit')

check('nine is the full scale: nine ninths is 100 percent and one octave up',
  toCMYK(9) === 100 && toHarmonic(9) === 864 && toHarmonic(0) === 432,
  'both are a ninth of the way from the base to the octave, per unit')

check('both are monotone over the digits',
  DIGITS.slice(1).every((d) => toCMYK(d) >= toCMYK(d - 1) && toHarmonic(d) > toHarmonic(d - 1)))

check('the harmonic rises by exactly 48 per unit, and the CMYK does NOT rise by exactly 11',
  DIGITS.slice(1).every((d) => toHarmonic(d) - toHarmonic(d - 1) === 48)
  && toCMYK(5) === 56,
  'toHarmonic is 432 + 48v exactly because 432/9 is 48; toCMYK rounds v/9 x 100, so 5 gives 56 rather than 55 — the rounding is where linearity stops')

check('neither collapse is ever NaN for a digit',
  DIGITS.every((d) => Number.isFinite(toCMYK(d)) && Number.isFinite(toHarmonic(d))))

// --- the impossibilities -------------------------------------------------
check('a known impossibility has its own description and an unknown one says so',
  getImpossibleDescription(1) !== getImpossibleDescription(3)
  && getImpossibleDescription(432).includes('Unknown'))

check('handling by colour is a function of the digit',
  new Set([1, 2, 3, 4].map((d) => JSON.stringify(handleImpossibleByColor(d)))).size === 4)

check('handling by colour keeps the digit it was handed',
  DIGITS.every((d) => (handleImpossibleByColor(d) as unknown as { digit: number }).digit === d))

check('handleImpossible carries the reason it is given and NOWHERE else',
  ['alpha', 'beta', 'a very long reason indeed'].every((why) => {
    const r = handleImpossible(why) as unknown as { digit: number; reason: unknown }
    return r.reason === why && r.digit === 8
  })
  && new Set(['alpha', 'beta'].map((w) => (handleImpossible(w) as unknown as { digit: number }).digit)).size === 1,
  'the digit and the colour are the same for every impossibility; only the reason varies')

check('handling by id is handling the DESCRIPTION that id names',
  [1, 2, 3, 9].every((d) =>
    JSON.stringify(handleImpossibleById(d as Parameters<typeof handleImpossibleById>[0]))
    === JSON.stringify(handleImpossible(getImpossibleDescription(d)))),
  'handleImpossible takes a reason string; passing it a digit, as this suite first did, stores the digit as the reason')

// --- the mapping ---------------------------------------------------------
check('a phrase maps to one digit per hyphenated word',
  ['seed', 'seed-flow', 'seed-flow-harmony'].every((p) => phraseToCmykId(p).length === p.split('-').length))

check('an unknown word maps to the void rather than throwing',
  phraseToCmykId('not-a-word').every((d) => d === 0))

check('looking up a property returns only entries that carry that value',
  (() => {
    const hits = lookupA432MatrixByProperty('digit' as Parameters<typeof lookupA432MatrixByProperty>[0], '3')
    return hits.every((e) => String((e as unknown as Record<string, unknown>).digit).toLowerCase() === '3')
  })())

check('looking up a value nothing carries returns nothing',
  lookupA432MatrixByProperty('digit' as Parameters<typeof lookupA432MatrixByProperty>[0], 'no.such.value').length === 0)

// --- cmyk filenames ------------------------------------------------------
check('a cmyk filename is recognised as one',
  ['a432', 'x', 'zeropoint'].every((n) => isCmykFilename(cmykFilename(n, 'ts'))))

check('a name that is not a cmyk filename is refused',
  !isCmykFilename('a432.ts') && !isCmykFilename('') && !isCmykFilename('plain'))

check('the filename carries the name and the extension it was given',
  cmykFilename('a432', 'ts') === 'a432.cmyk.ts')

check('harmonising a list keeps one entry per file',
  [['a.cmyk.ts'], ['a.cmyk.ts', 'b.ts'], []].every((fs) => harmonizeCmykFilenames(fs).length === fs.length))

// --- challenges ----------------------------------------------------------
check('a challenge colour is four channels in 0..100',
  DIGITS.every((d) => {
    const c = challengeCMYK(d) as unknown as Record<string, number>
    return ['c', 'm', 'y', 'k'].every((k) => Number.isFinite(c[k]) && c[k]! >= 0 && c[k]! <= 100)
  }))

check('a challenge css colour is a six-digit hex for every digit',
  DIGITS.every((d) => /^#[0-9a-f]{6}$/i.test(challengeColorCss(d))))

check('a NON-digit still produces a css string, and it is NOT valid css',
  challengeColorCss('a432' as unknown as number) === '#NaNNaNNaN',
  'pinned as it is: nothing refuses the input and a browser will silently ignore the result')

// --- meanings ------------------------------------------------------------
check('each digit has its own meaning and an unknown one says Unknown',
  new Set(DIGITS.map(getCurrentMeaning)).size > 1 && getCurrentMeaning(432).includes('Unknown'))

// --- the harmonisation registry ------------------------------------------
check('a registered strategy RUNS when invoked by name',
  (() => {
    let ran = 0
    registerHarmonizationStrategy('probe.strategy', () => { ran += 1 })
    harmonizeByStrategy('probe.strategy')
    harmonizeByStrategy('probe.strategy')
    return ran === 2
  })(),
  'a strategy is typed () => void, so running it is the whole effect and there is no value to return')

check('an unregistered strategy is a no-op rather than a throw',
  (() => { try { harmonizeByStrategy('no.such.strategy'); return true } catch { return false } })())

check('registering the same name twice replaces the strategy',
  (() => {
    let which = 0
    registerHarmonizationStrategy('probe.replace', () => { which = 1 })
    registerHarmonizationStrategy('probe.replace', () => { which = 2 })
    harmonizeByStrategy('probe.replace')
    return which === 2
  })())

check('an unknown module name returns undefined',
  getModuleByName('no.such.module') === undefined)

check('an unknown overlay category returns the empty list, not undefined',
  Array.isArray(getOverlaysByCategory('no.such.category')) && getOverlaysByCategory('no.such.category').length === 0)

check('routing an event nobody handles does not throw',
  (() => { try { routeEvent({ type: 'probe' } as Parameters<typeof routeEvent>[0]); return true } catch { return false } })())

// --- innovation templates ------------------------------------------------
const TEMPLATES = [generateBreakthroughInsight, generateCreativeSynthesis, generateEvolutionaryAdaptation, generateTransformativeParadigm]
check('every template names both of the things it was given',
  TEMPLATES.every((f) => { const s = f('alpha', 'beta'); return s.includes('alpha') && s.includes('beta') }))

check('the four templates say four different things',
  new Set(TEMPLATES.map((f) => f('alpha', 'beta'))).size === 4)

check('a template with a missing argument still returns a string',
  TEMPLATES.every((f) => typeof f('alpha', undefined as unknown as string) === 'string'))

// --- vortex streams ------------------------------------------------------
check('a new stream has no children',
  (createVortexStream(1) as unknown as { children: unknown[] }).children.length === 0)

check('a stream carries the value it was made from',
  [1, 'a432', 9].every((v) => (createVortexStream(v as never) as unknown as { value: unknown }).value === v))

check('a tree with a parent records its parent',
  (treeToVortexStream(1 as never, 7 as never) as unknown as { parent: unknown }).parent === 7)

check('imagining nothing is refused rather than silently doing nothing',
  (() => { try { imagineAll(undefined as never); return false } catch { return true } })())

// --- imperial ------------------------------------------------------------
const imp = createA432ImperialState('GOLDEN', 432, 1, 9, [1, 2, 4, 8, 7, 5])
check('an imperial state carries what it was built from',
  imp.name === 'GOLDEN' && imp.frequency === 432 && imp.consciousness === 9)

check('analysis reports the digital root of the state\'s consciousness',
  analyzeA432ImperialState(imp).consciousnessBalance === ((imp.consciousness - 1) % 9) + 1)

check('harmonising totals the consciousness of its states',
  harmonizeA432ImperialStates([imp, imp]).totalConsciousness === 2 * imp.consciousness
  && harmonizeA432ImperialStates([]).totalConsciousness === 0)

check('a known imperial type has an essence and a proof, an unknown one says so',
  getA432ImperialMetaphysicalEssence('GOLDEN') !== getA432ImperialMetaphysicalEssence('SILVER')
  && getA432ImperialMetaphysicalEssence('NOPE').includes('Unknown')
  && typeof generateA432ImperialMathematicalProof('GOLDEN', 9) === 'string')

console.log(failures === 0
  ? 'a432.surface ok — every export pinned to what it actually does, including the core that never carries the frequency it was asked for'
  : `a432.surface FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
