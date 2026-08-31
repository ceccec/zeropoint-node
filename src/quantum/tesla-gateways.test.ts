import * as G from './tesla-gateways.ts'
import { digitalRoot, VORTEX_AXIS } from '../0/index.ts'
import { A432_CONSTANTS } from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'

const A432 = A432_CONSTANTS.BASE_FREQUENCY
let failures = 0
const check = (label: string, ok: boolean, detail = '') => {
  if (ok) { console.log(`  ✓ ${label}`) } else { failures++; console.error(`  ✗ ${label}${detail ? ' — ' + detail : ''}`) }
}

// The document's Universal Gateway Theorem: all gateway multiplications
// reduce to 9. It is stated as a claim and now recomputed as one.
{
  const proof = G.proveTesla369Gateway()
  check('the gateway theorem is checked over every axis product', proof.cases.length === 9)
  check('every axis product reduces to nine', proof.holds)
  check('the worked cases are correct',
    proof.cases.every(c => c.product === c.a * c.b && c.root === digitalRoot(c.product)))
  check('the theorem is about the axis, not an arbitrary set',
    proof.cases.every(c => VORTEX_AXIS.includes(c.a as 3 | 6 | 9) && VORTEX_AXIS.includes(c.b as 3 | 6 | 9)))
}

{
  const P = G.TESLA_GATEWAY_PORTALS
  check('there are exactly three portals', Object.keys(P).length === 3)
  check('each portal knows its own digit', ([3, 6, 9] as const).every(g => P[g].gateway === g))
  check('resonance is A432 times the gateway', ([3, 6, 9] as const).every(g => P[g].a432Resonance === A432 * g))
  check('the documented resonances are 1296, 2592, 3888',
    [P[3].a432Resonance, P[6].a432Resonance, P[9].a432Resonance].join(',') === '1296,2592,3888')
  check('consciousness flow is the gateway digit', ([3, 6, 9] as const).every(g => P[g].consciousnessFlow === g))
  check('each portal names a transformation', ([3, 6, 9] as const).every(g => P[g].transformation.includes('→')))
}

// The partition: digital root up to 3 is creation, up to 6 harmony, else completion.
{
  let ok = true, total = 0
  const counts: Record<number, number> = { 3: 0, 6: 0, 9: 0 }
  for (let n = 1; n <= 100; n++) {
    const root = digitalRoot(n)
    const expected = root <= 3 ? 3 : root <= 6 ? 6 : 9
    const g = G.determineYourGateway(n)
    if (g.gateway !== expected) ok = false
    counts[g.gateway]++; total++
  }
  check('the gateway follows the digital root partition', ok)
  check('all three gateways are reachable', counts[3] > 0 && counts[6] > 0 && counts[9] > 0,
    JSON.stringify(counts))
  check('every number lands in exactly one gateway', counts[3] + counts[6] + counts[9] === total)
  check('determineChallengeGateway is the same mapping',
    [1, 5, 9, 42].every(n => G.determineChallengeGateway(n).gateway === G.determineYourGateway(n).gateway))
}

{
  const flow = G.analyzeGatewayConsciousnessFlow()
  check('consciousness flow is analysed for all three', flow.length === 3)
  check('every gateway squared lands on nine', flow.every(f => f.entersAt === 9))

  const integ = G.integrateGatewaysWithVortex()
  check('vortex integration covers the sequence', integ.length === A432_CONSTANTS.RODIN_SEQUENCE.length)
  check('every integrated position names a real gateway', integ.every(p => [3, 6, 9].includes(p.gateway)))
  check('integration frequency is the value times A432', integ.every(p => p.frequency === p.value * A432))

  const summary = G.generateGatewaySummary()
  check('the summary reports the theorem holding', summary.theoremHolds)
  check('total resonance is A432 times eighteen', summary.totalResonance === A432 * 18, String(summary.totalResonance))
}

// USER_GUIDE's functions.
{
  check('mental clarity is the third harmonic', G.optimizeMentalClarity().frequency === A432 * 3)
  check('expandConsciousness covers nine levels', G.expandConsciousness().length === 9)
  check('every expansion frequency is a multiple of A432',
    G.expandConsciousness().every(l => l.frequency % A432 === 0))
  check('the summary form totals the doubling circuit',
    G.expandConsciousnessSummary().totalFlow === 1 + 2 + 4 + 8 + 7 + 5, String(G.expandConsciousnessSummary().totalFlow))
  check('the two expandConsciousness shapes are genuinely different',
    Array.isArray(G.expandConsciousness()) && !Array.isArray(G.expandConsciousnessSummary()))

  const routine = G.dailyTuningRoutine()
  check('the daily routine tunes to A432 multiples',
    [routine.morning, routine.afternoon, routine.evening].every(r => r.frequency % A432 === 0))
  check('the routine rises from base to completion',
    routine.morning.frequency < routine.afternoon.frequency && routine.afternoon.frequency < routine.evening.frequency)

  check('vortex integration positions are one-based',
    G.vortexIntegration().every((p, i) => p.position === i + 1))
  check('analyzeHarmony agrees with the gateway it names',
    [1, 4, 7, 55].every(n => G.analyzeHarmony(n).gateway === G.determineYourGateway(n).function))
  check('the tesla cycle matches the gateway',
    [1, 4, 7].every(n => {
      const h = G.analyzeHarmony(n)
      return h.teslaCycle === (h.digitalRoot <= 3 ? 'creation' : h.digitalRoot <= 6 ? 'harmony' : 'completion')
    }))
  check('consciousness flow optimisation covers nine flows', G.optimizeConsciousnessFlow().length === 9)

  const r = G.resolveProblem('why does this not compile')
  check('a problem hashes to the sum of its character codes',
    r.analysis.hash === 'why does this not compile'.split('').reduce((s, c) => s + c.charCodeAt(0), 0))
  check('resolveProblem is deterministic',
    JSON.stringify(G.resolveProblem('same')) === JSON.stringify(G.resolveProblem('same')))
  check('different problems can reach different gateways',
    new Set(['a', 'bb', 'ccc', 'dddd', 'eeeee', 'ffffff'].map(p => G.resolveProblem(p).analysis.gateway)).size > 1)
  check('an empty problem still resolves', G.resolveProblem('').analysis.hash === 0)

  const t = G.trackConsciousnessProgress()
  check('progress starts at zero', t.getOverallProgress() === 0)
  t.updateMetric('dailyAlignment', 150)
  check('a metric above one hundred clamps down', t.metrics.dailyAlignment === 100)
  t.updateMetric('gatewayAccess', -50)
  check('a metric below zero clamps up', t.metrics.gatewayAccess === 0)
  t.updateMetric('problemResolution', NaN)
  check('a non-numeric metric does not poison the average', t.metrics.problemResolution === 0)
  check('overall progress is the mean of four metrics', t.getOverallProgress() === 25)

  const solve = G.enhanceProblemSolving(42)
  check('problem solving reduces the problem to its digital root',
    solve.digitalRoot === digitalRoot(42) && solve.problem === 42)
  check('problem solving recommends the gateway that digit falls in',
    solve.recommendedGateway === G.determineYourGateway(42).function)
  check('the solution names the transformation it applies',
    solve.solution.includes(G.determineYourGateway(42).transformation))

  const practice = G.dailyConsciousnessPractice()
  check('the daily practice has three parts',
    Object.keys(practice).length === 3 && !!practice.morning && !!practice.midday && !!practice.evening)
  check('every part states an activity, a duration and a purpose',
    Object.values(practice).every(p => !!p.activity && !!p.duration && !!p.purpose))

  check('universal access resonates at the base', G.accessUniversalConsciousness().frequency === A432)
  const states = G.mathematicalHarmonyStates()
  check('the three harmony states are the three gateway resonances',
    [states.creation.frequency, states.harmony.frequency, states.completion.frequency].join(',') === '1296,2592,3888')
}

console.log()
if (failures > 0) { console.error(`tesla-gateways FAIL — ${failures}`); process.exit(1) }
console.log('tesla-gateways ok')
process.exit(0)
