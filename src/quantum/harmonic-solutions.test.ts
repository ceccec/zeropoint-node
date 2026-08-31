import * as H from './harmonic-solutions.ts'
import { digitalRoot } from '../0/index.ts'
import { A432_CONSTANTS } from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'
import { TESLA_GATEWAY_PORTALS } from './tesla-gateways.ts'

const A432 = A432_CONSTANTS.BASE_FREQUENCY
let failures = 0
const check = (label: string, ok: boolean, detail = '') => {
  if (ok) { console.log(`  ✓ ${label}`) } else { failures++; console.error(`  ✗ ${label}${detail ? ' — ' + detail : ''}`) }
}

const solutions = H.generateHarmonicSolutionsFromPossibilities()

// The document's headline numbers: nine challenges, three gateways each, 27.
{
  check('there are exactly 27 solutions', solutions.length === 27, String(solutions.length))
  check('nine source challenges', new Set(solutions.map(s => s.sourceChallenge)).size === 9)
  check('every challenge produces three solutions',
    [...new Set(solutions.map(s => s.sourceChallenge))].every(c => solutions.filter(s => s.sourceChallenge === c).length === 3))
  check('solution numbers are 1 to 27 without gaps',
    JSON.stringify(solutions.map(s => s.solutionNumber)) === JSON.stringify(Array.from({ length: 27 }, (_, i) => i + 1)))
  check('every id is unique', new Set(solutions.map(s => s.id)).size === 27)
}

// Every formula the document states, over every solution rather than one.
{
  check('A432 Harmonic is A432 x gateway x solution number',
    solutions.every(s => s.a432Harmonic === A432 * s.gateway * s.solutionNumber))
  check('harmonic resonance is the frequency over A432, exactly',
    solutions.every(s => s.harmonicResonance.numerator === s.frequency && s.harmonicResonance.denominator === A432))
  check('each solution runs at its gateway resonance',
    solutions.every(s => s.frequency === TESLA_GATEWAY_PORTALS[s.gateway].a432Resonance))
  check('every digital root is a digit', solutions.every(s => s.digitalRoot >= 1 && s.digitalRoot <= 9))
  check('consciousness flow is inherited from the source challenge',
    solutions.every(s => s.consciousnessFlow === digitalRoot(s.sourceChallenge)))
  check('nothing is fractional',
    solutions.every(s => [s.frequency, s.a432Harmonic, s.solutionNumber].every(Number.isInteger)))
  check('generation is deterministic',
    JSON.stringify(H.generateHarmonicSolutionsFromPossibilities()) === JSON.stringify(solutions))
}

// The distribution the document draws: 9 per gateway, evenly.
{
  const d = H.analyzeHarmonicSolutionsGatewayDistribution(solutions)
  check('nine solutions per gateway', d.byGateway[3] === 9 && d.byGateway[6] === 9 && d.byGateway[9] === 9,
    JSON.stringify(d.byGateway))
  check('the distribution reports itself balanced', d.balanced)
  check('the counts total 27', d.byGateway[3] + d.byGateway[6] + d.byGateway[9] === 27)
  check('frequency per gateway is nine times its resonance',
    ([3, 6, 9] as const).every(g => d.frequencyByGateway[g] === 9 * TESLA_GATEWAY_PORTALS[g].a432Resonance))
}

{
  const p = H.calculateHarmonicSolutionsVortexProperties(solutions)
  check('the properties count all 27', p.totalSolutions === 27)
  check('total frequency is the sum of the parts',
    p.totalFrequency === solutions.reduce((s, x) => s + x.frequency, 0))
  check('the resonance ratio is the total over A432',
    p.harmonicResonance.numerator === p.totalFrequency && p.harmonicResonance.denominator === A432)
  check('harmonic completion divides by A432 x 9 x 27',
    p.harmonicCompletion.denominator === A432 * 9 * 27, String(p.harmonicCompletion.denominator))
  check('harmonic completion sums the A432 harmonics',
    p.harmonicCompletion.numerator === solutions.reduce((s, x) => s + x.a432Harmonic, 0))
  check('the digital roots are digits', p.digitalRootFrequency >= 1 && p.digitalRootFlow >= 1)
  check('every ratio is an exact integer fraction',
    [p.harmonicResonance, p.harmonicCompletion].every(f => Number.isInteger(f.numerator) && Number.isInteger(f.denominator) && f.denominator !== 0))
}

{
  let ok = true
  for (const problem of ['', 'a', 'why does this fail', 'x'.repeat(40)]) {
    const t = H.transformProblemToHarmonicSolution(problem)
    if (t.solution.gateway !== t.gateway) ok = false
    if (t.solution.sourceChallenge !== t.digitalRoot) ok = false
    if (t.frequency !== t.solution.frequency) ok = false
  }
  check('a transformed problem lands on a solution that matches its own gateway and root', ok)
  check('transformation is deterministic',
    JSON.stringify(H.transformProblemToHarmonicSolution('same')) === JSON.stringify(H.transformProblemToHarmonicSolution('same')))

  for (const level of [1, 4, 7, 42]) {
    const o = H.optimizeHarmonicSolutionGeneration(level)
    check(`optimising for level ${level} selects nine solutions of one gateway`,
      o.selected.length === 9 && o.selected.every(s => s.gateway === o.gateway))
  }
}

// The class the document declares must agree with the functions.
{
  const v = new H.HarmonicSolutionsVortex()
  check('the class returns the same 27 solutions', JSON.stringify(v.getSolutions()) === JSON.stringify(solutions))
  check('the class agrees on vortex properties',
    JSON.stringify(v.getVortexProperties()) === JSON.stringify(H.calculateHarmonicSolutionsVortexProperties(solutions)))
  check('the class agrees on gateway distribution',
    JSON.stringify(v.getGatewayDistribution()) === JSON.stringify(H.analyzeHarmonicSolutionsGatewayDistribution(solutions)))
  check('the class agrees on transformation',
    JSON.stringify(v.transformProblem('q')) === JSON.stringify(H.transformProblemToHarmonicSolution('q')))
  check('the class agrees on optimisation',
    JSON.stringify(v.optimizeGeneration(5)) === JSON.stringify(H.optimizeHarmonicSolutionGeneration(5)))
}

console.log()
if (failures > 0) { console.error(`harmonic-solutions FAIL — ${failures}`); process.exit(1) }
console.log('harmonic-solutions ok')
process.exit(0)
