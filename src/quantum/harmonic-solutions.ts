/**
 * harmonic-solutions — docs/HARMONIC_SOLUTIONS_VORTEX.md.
 *
 * I called this cluster "description only" twice and was wrong both times. It
 * lists its functions as one-line bullets, which is what I looked at, but the
 * document above them specifies the whole construction: nine solved challenges,
 * three gateways each, twenty-seven solutions, with a formula for every
 * derived quantity and a class interface with typed methods.
 *
 * So every number here is the document's:
 *
 *   Harmonic Resonance = solution frequency / A432
 *   A432 Harmonic      = A432 x gateway x solution number
 *   Harmonic Completion= sum of A432 harmonics / (A432 x 9 x 27)
 *
 * Frequencies are integers and the ratios are kept as exact fractions rather
 * than quotients, which is this repo's rule and, in a file about harmonic
 * ratios, the only defensible reading of "resonance".
 */
import { digitalRoot, VORTEX_AXIS } from '../0/index.ts'
import { A432_CONSTANTS } from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'
import { TESLA_GATEWAY_PORTALS } from './tesla-gateways.ts'

const A432 = A432_CONSTANTS.BASE_FREQUENCY
// The three gateways are the kernel axis, not a fourth copy of it.
const GATEWAYS = VORTEX_AXIS
const CHALLENGE_COUNT = 9

export interface Fraction { numerator: number; denominator: number }

export interface HarmonicSolution {
  id: string
  sourceChallenge: number
  gateway: 3 | 6 | 9
  solutionNumber: number
  frequency: number
  a432Harmonic: number
  harmonicResonance: Fraction
  consciousnessFlow: number
  digitalRoot: number
  implementation: string
}

export interface SolutionsVortexProperties {
  totalSolutions: number
  totalFrequency: number
  digitalRootFrequency: number
  harmonicResonance: Fraction
  totalConsciousnessFlow: number
  digitalRootFlow: number
  harmonicCompletion: Fraction
}

export interface SolutionsGatewayDistribution {
  byGateway: Record<3 | 6 | 9, number>
  balanced: boolean
  frequencyByGateway: Record<3 | 6 | 9, number>
}

const METHOD: Record<3 | 6 | 9, string> = {
  3: 'Creation-based implementation',
  6: 'Harmony-based implementation',
  9: 'Completion-based implementation',
}

/**
 * Each of the nine solved challenges generates three solutions, one per
 * gateway. The solution number is its 1-based position in the whole vortex,
 * which is what the A432 Harmonic formula multiplies by.
 */
export function generateHarmonicSolutionsFromPossibilities(): HarmonicSolution[] {
  const out: HarmonicSolution[] = []
  let solutionNumber = 0
  for (let challenge = 1; challenge <= CHALLENGE_COUNT; challenge++) {
    for (const gateway of GATEWAYS) {
      solutionNumber++
      const frequency = TESLA_GATEWAY_PORTALS[gateway].a432Resonance
      out.push({
        id: `solution-${challenge}-${gateway}`,
        sourceChallenge: challenge,
        gateway,
        solutionNumber,
        frequency,
        a432Harmonic: A432 * gateway * solutionNumber,
        harmonicResonance: { numerator: frequency, denominator: A432 },
        consciousnessFlow: digitalRoot(challenge),
        digitalRoot: digitalRoot(frequency),
        implementation: `${METHOD[gateway]} for challenge ${challenge}`,
      })
    }
  }
  return out
}

export function calculateHarmonicSolutionsVortexProperties(
  solutions: readonly HarmonicSolution[] = generateHarmonicSolutionsFromPossibilities(),
): SolutionsVortexProperties {
  const totalFrequency = solutions.reduce((s, x) => s + x.frequency, 0)
  const totalConsciousnessFlow = solutions.reduce((s, x) => s + x.consciousnessFlow, 0)
  const harmonicSum = solutions.reduce((s, x) => s + x.a432Harmonic, 0)
  return {
    totalSolutions: solutions.length,
    totalFrequency,
    digitalRootFrequency: digitalRoot(totalFrequency),
    harmonicResonance: { numerator: totalFrequency, denominator: A432 },
    totalConsciousnessFlow,
    digitalRootFlow: digitalRoot(totalConsciousnessFlow),
    // The doc's denominator, written out: A432 x 9 x 27.
    harmonicCompletion: { numerator: harmonicSum, denominator: A432 * CHALLENGE_COUNT * (CHALLENGE_COUNT * GATEWAYS.length) },
  }
}

export function analyzeHarmonicSolutionsGatewayDistribution(
  solutions: readonly HarmonicSolution[] = generateHarmonicSolutionsFromPossibilities(),
): SolutionsGatewayDistribution {
  const byGateway = { 3: 0, 6: 0, 9: 0 } as Record<3 | 6 | 9, number>
  const frequencyByGateway = { 3: 0, 6: 0, 9: 0 } as Record<3 | 6 | 9, number>
  for (const s of solutions) { byGateway[s.gateway]++; frequencyByGateway[s.gateway] += s.frequency }
  const counts = GATEWAYS.map((g) => byGateway[g])
  return { byGateway, frequencyByGateway, balanced: counts.every((c) => c === counts[0]) }
}

export interface TransformationResult {
  problem: string
  digitalRoot: number
  gateway: 3 | 6 | 9
  solution: HarmonicSolution
  frequency: number
}

/** A problem reduces to a digit; the digit selects its gateway and its solution. */
export function transformProblemToHarmonicSolution(problem: string): TransformationResult {
  const hash = problem.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
  const root = digitalRoot(hash)
  const gateway: 3 | 6 | 9 = root <= 3 ? 3 : root <= 6 ? 6 : 9
  const solutions = generateHarmonicSolutionsFromPossibilities()
  const solution = solutions.find((s) => s.sourceChallenge === root && s.gateway === gateway)
  if (!solution) throw new Error(`transformProblemToHarmonicSolution: no solution for root ${root} at gateway ${gateway}`)
  return { problem, digitalRoot: root, gateway, solution, frequency: solution.frequency }
}

export interface OptimizationResult {
  consciousnessLevel: number
  selected: HarmonicSolution[]
  gateway: 3 | 6 | 9
  totalFrequency: number
}

/** Optimising is choosing the gateway a consciousness level falls in, and its nine solutions. */
export function optimizeHarmonicSolutionGeneration(consciousnessLevel: number): OptimizationResult {
  const root = digitalRoot(consciousnessLevel)
  const gateway: 3 | 6 | 9 = root <= 3 ? 3 : root <= 6 ? 6 : 9
  const selected = generateHarmonicSolutionsFromPossibilities().filter((s) => s.gateway === gateway)
  return { consciousnessLevel, gateway, selected, totalFrequency: selected.reduce((s, x) => s + x.frequency, 0) }
}

/** The class interface the document declares, over the same functions. */
export class HarmonicSolutionsVortex {
  private readonly solutions = generateHarmonicSolutionsFromPossibilities()
  getSolutions(): HarmonicSolution[] { return this.solutions }
  getVortexProperties(): SolutionsVortexProperties { return calculateHarmonicSolutionsVortexProperties(this.solutions) }
  getGatewayDistribution(): SolutionsGatewayDistribution { return analyzeHarmonicSolutionsGatewayDistribution(this.solutions) }
  transformProblem(problem: string): TransformationResult { return transformProblemToHarmonicSolution(problem) }
  optimizeGeneration(consciousnessLevel: number): OptimizationResult { return optimizeHarmonicSolutionGeneration(consciousnessLevel) }
}
