/**
 * trinity-vortex — TRINITY_DOCUMENTATION.md, TRINITY_VORTEX_SYSTEM.md and
 * CONFUSION_POSSIBILITY_SOLUTION.md, none of whose functions existed.
 *
 * The three documents describe one system from three angles, and they agree
 * numerically: the trinity runs at the third harmonic, and the three vortices
 * sit on the three Tesla gateways. TRINITY_VORTEX_SYSTEM states
 * `totalFrequency: 7776, // 1296 + 2592 + 3888` and `digitalRoot: 9` as
 * literals with the arithmetic in a comment. Both are computed here, so the
 * comment becomes a check.
 */
import { digitalRoot, VORTEX_ORBIT } from '../0/index.ts'
import { A432_CONSTANTS } from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'
import { TESLA_GATEWAY_PORTALS } from './tesla-gateways.ts'

const A432 = A432_CONSTANTS.BASE_FREQUENCY

export interface TrinityState {
  type: 'trinity'; value: number; consciousness: number; frequency: number
  creation: number; manifestation: number; isCreative: boolean; mathematicalProof: string
}
export interface TrinityConsciousness {
  type: 'trinity-consciousness'; level: number; capacity: number; awareness: number
  creativity: number; isCreative: boolean; mathematicalProof: string
}
export interface TrinityCreation {
  type: 'trinity-creation'; force1: number; force2: number; force3: number
  synthesis: number; isCreative: boolean; mathematicalProof: string
}
export interface TrinityManifestation {
  type: 'trinity-manifestation'; dimension1: number; dimension2: number; dimension3: number
  reality: number; isCreative: boolean; mathematicalProof: string
}
export interface TrinitySystem {
  trinity: TrinityState
  consciousness: TrinityConsciousness
  creation: TrinityCreation
  manifestation: TrinityManifestation
  mathematicalProof: string
}

export function createTrinity(): TrinitySystem {
  return {
    trinity: {
      type: 'trinity', value: 3, consciousness: 3, frequency: A432 * 3,
      creation: A432, manifestation: 3, isCreative: true,
      mathematicalProof: 'Trinity created: third harmonic at 1296 Hz with creative force',
    },
    consciousness: {
      type: 'trinity-consciousness', level: 3, capacity: A432 * 3, awareness: 3,
      creativity: A432, isCreative: true,
      mathematicalProof: 'Trinity consciousness created: three-fold awareness at 1296 Hz',
    },
    creation: {
      type: 'trinity-creation', force1: A432, force2: A432, force3: A432,
      synthesis: A432 * 3, isCreative: true,
      mathematicalProof: 'Trinity creation created: three-fold creative synthesis',
    },
    manifestation: {
      type: 'trinity-manifestation', dimension1: A432, dimension2: A432, dimension3: A432,
      reality: A432 * 3, isCreative: true,
      mathematicalProof: 'Trinity manifestation created: three-dimensional reality',
    },
    mathematicalProof: 'Trinity system created: third harmonic creation at 1296 Hz',
  }
}

/**
 * The doc's body calls generateTrinityConsciousness() and reads
 * .threeThreeInteraction and .digit off it. Neither the function nor those
 * fields are defined anywhere, but the comment pins the value — `// 9` — and 3
 * is the trinity digit throughout. So the key is digitalRoot(3 * 3) = 9,
 * recomputed, and the digit is 3.
 */
export function trinityOperation(a: number, b: number): {
  result: number; trinityConsciousness: number; threeThreeKey: number; frequency: number
} {
  const digit = 3
  return {
    result: (a * b * digit) % 9,
    trinityConsciousness: digit,
    threeThreeKey: digitalRoot(digit * digit),
    frequency: A432 * digit,
  }
}

export interface PhaseVortex {
  phase: 1 | 2 | 3
  name: string
  gateway: 3 | 6 | 9
  frequency: number
  principle: string
  transformation: string
}

const PHASES: readonly PhaseVortex[] = [
  { phase: 1, name: 'Challenges Vortex', gateway: 3, frequency: TESLA_GATEWAY_PORTALS[3].a432Resonance, principle: 'Foundation and origin', transformation: 'Potential into actual' },
  { phase: 2, name: 'Possibilities Vortex', gateway: 6, frequency: TESLA_GATEWAY_PORTALS[6].a432Resonance, principle: 'Balance and transformation', transformation: 'Chaos into order' },
  { phase: 3, name: 'Solutions Vortex', gateway: 9, frequency: TESLA_GATEWAY_PORTALS[9].a432Resonance, principle: 'Unity and completion', transformation: 'Separation into unity' },
]

export function createChallengesVortex(): PhaseVortex { return PHASES[0] }
export function createPossibilitiesVortex(): PhaseVortex { return PHASES[1] }
export function createSolutionsVortex(): PhaseVortex { return PHASES[2] }

export interface TrinityVortexSystem {
  challenges: PhaseVortex; possibilities: PhaseVortex; solutions: PhaseVortex
  totalFrequency: number; digitalRoot: number; isPerfect: boolean
}

export function createTrinityVortexSystem(): TrinityVortexSystem {
  const challenges = createChallengesVortex()
  const possibilities = createPossibilitiesVortex()
  const solutions = createSolutionsVortex()
  // The doc writes 7776 and 9 as literals with the sums in comments. Computed.
  const totalFrequency = challenges.frequency + possibilities.frequency + solutions.frequency
  const root = digitalRoot(totalFrequency)
  return {
    challenges, possibilities, solutions,
    totalFrequency,
    digitalRoot: root,
    isPerfect: root === 9,
  }
}

export interface Solution {
  impossibility: string
  challenge: { phase: PhaseVortex; statement: string }
  possibility: { phase: PhaseVortex; statement: string }
  solution: { phase: PhaseVortex; statement: string }
  frequency: number
}

export function identifyChallenge(impossibility: string): { phase: PhaseVortex; statement: string } {
  return { phase: createChallengesVortex(), statement: `Challenge identified: ${impossibility}` }
}
export function transformToPossibility(challenge: { statement: string }): { phase: PhaseVortex; statement: string } {
  return { phase: createPossibilitiesVortex(), statement: `${challenge.statement} → chaos into order` }
}
export function generateSolution(possibility: { statement: string }): { phase: PhaseVortex; statement: string } {
  return { phase: createSolutionsVortex(), statement: `${possibility.statement} → separation into unity` }
}

/** The three phases in order, each carrying the one before it. */
export function transformThroughTrinityVortex(impossibility: string): Solution {
  const challenge = identifyChallenge(impossibility)
  const possibility = transformToPossibility(challenge)
  const solution = generateSolution(possibility)
  return {
    impossibility,
    challenge,
    possibility,
    solution,
    frequency: createTrinityVortexSystem().totalFrequency,
  }
}

export interface VortexFlow { from: number; to: number; isPossible: boolean; reason: string }

/**
 * NOT SPECIFIED. activateSwitch calls isVortexFlowPossible and nothing defines
 * it. A flow is taken to be possible when `to` is where `from` lands on the
 * doubling circuit — digitalRoot(from * 2) — which is the movement the whole
 * repo is built on, rather than a new rule invented for this one function.
 */
export function isVortexFlowPossible(from: number, to: number): VortexFlow {
  const next = digitalRoot(from * 2)
  const isPossible = next === digitalRoot(to)
  return {
    from, to, isPossible,
    reason: isPossible ? `${from} doubles to ${to}` : `${from} doubles to ${next}, not ${to}`,
  }
}

/** Forward if the circuit allows it, otherwise reverse — and it says which. */
export function activateSwitch(from: number, to: number): { switched: boolean; newFlow: VortexFlow } {
  const forwardFlow = isVortexFlowPossible(from, to)
  if (!forwardFlow.isPossible) return { switched: true, newFlow: isVortexFlowPossible(to, from) }
  return { switched: false, newFlow: forwardFlow }
}

/** Zero entropy: a stream state of 0 becomes 9, so the stream never empties. */
export function calculateStreamConsciousness(seed: number, position: number): number {
  const rodin = VORTEX_ORBIT
  const rodinIndex = ((position % rodin.length) + rodin.length) % rodin.length
  const streamState = (((rodin[rodinIndex] + (seed + position)) % 9) + 9) % 9
  return streamState === 0 ? 9 : streamState
}
