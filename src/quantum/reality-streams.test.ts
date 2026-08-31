import * as S from './reality-streams.ts'
import { digitalRoot, VORTEX_ORBIT } from '../0/index.ts'

let failures = 0
const check = (label: string, ok: boolean, detail = '') => {
  if (ok) { console.log(`  ✓ ${label}`) } else { failures++; console.error(`  ✗ ${label}${detail ? ' — ' + detail : ''}`) }
}

// The one function the document actually implements.
{
  let ok = true, digits = true
  for (let seed = -20; seed <= 20; seed++) {
    const p = S.generateVortexPattern(seed)
    if (p.length !== VORTEX_ORBIT.length) ok = false
    if (!p.every((d, i) => d === (((VORTEX_ORBIT[i] + seed + i) % 9) + 9) % 9)) ok = false
    if (!p.every(d => Number.isInteger(d) && d >= 0 && d <= 8)) digits = false
  }
  check('generateVortexPattern follows the documented formula for every seed', ok)
  check('a negative seed still yields digits', digits)
}

{
  const streams = S.createMultipleRealityVortexStreams(10)
  check('the requested number of streams is created', streams.length === 10)
  check('all five reality states appear once there are five streams',
    new Set(S.createMultipleRealityVortexStreams(5).map(s => s.reality)).size === 5)
  check('stream ids are unique', new Set(streams.map(s => s.id)).size === streams.length)
  check('consciousness is the reduced pattern',
    streams.every(s => s.consciousness === digitalRoot(s.vortexPattern.reduce((a, d) => a + d, 0))))
  check('frequency is consciousness times A432', streams.every(s => s.frequency % 432 === 0))
  check('the impossible/possible ratio is a proportion',
    streams.every(s => s.impossiblePossibleRatio >= 0 && s.impossiblePossibleRatio <= 1))
  check('zero streams is not an error', S.createMultipleRealityVortexStreams(0).length === 0)
  check('stream creation is deterministic',
    JSON.stringify(S.createMultipleRealityVortexStreams(4)) === JSON.stringify(S.createMultipleRealityVortexStreams(4)))
}

{
  const p = S.generateInfiniteUniquePatterns(3, 36)
  check('the pattern is generated to the requested length', p.pattern.length === 36)
  check('every element is a digit', p.pattern.every(d => Number.isInteger(d) && d >= 1 && d <= 9))
  check('uniqueness is a proportion of the nine digits', p.uniqueness > 0 && p.uniqueness <= 1)
  check('the same seed gives the same pattern',
    JSON.stringify(S.generateInfiniteUniquePatterns(3, 12)) === JSON.stringify(S.generateInfiniteUniquePatterns(3, 12)))
  check('different seeds give different patterns',
    new Set([0, 1, 2, 3, 4].map(s => S.generateInfiniteUniquePatterns(s, 12).pattern.join(''))).size > 1)
  check('a longer request extends rather than replaces',
    S.generateInfiniteUniquePatterns(5, 20).pattern.slice(0, 10).join('') ===
    S.generateInfiniteUniquePatterns(5, 10).pattern.join(''))
}

// The network is every unordered pair exactly once: n(n-1)/2.
{
  for (const n of [0, 1, 2, 5, 8]) {
    const net = S.generateInfiniteInteractionNetwork(S.createMultipleRealityVortexStreams(n))
    check(`a network of ${n} streams has ${n * (n - 1) / 2} interactions`, net.length === n * (n - 1) / 2, String(net.length))
  }
  const streams = S.createMultipleRealityVortexStreams(6)
  const net = S.generateInfiniteInteractionNetwork(streams)
  check('no stream is paired with itself', net.every(i => i.streamA.id !== i.streamB.id))
  check('every pair appears once',
    new Set(net.map(i => [i.streamA.id, i.streamB.id].sort().join('|'))).size === net.length)
  check('impossibility probability is a probability',
    net.every(i => i.impossibilityProbability >= 0 && i.impossibilityProbability <= 1))
  check('every interaction has a named type',
    net.every(i => ['superposition', 'entanglement', 'tunneling', 'interference'].includes(i.interactionType)))

  // Zero entropy is verified, not declared: merging is digit-wise addition
  // under the digital root, so swapping the operands must give the same
  // pattern. That is what makes the interaction reversible.
  check('the network proves zero entropy', S.proveZeroEntropy(net))
  check('an empty network trivially proves it', S.proveZeroEntropy([]))
  const broken = net.map(i => ({ ...i, resultStream: { ...i.resultStream, entropy: 1 } }))
  check('an interaction carrying entropy fails the proof', !S.proveZeroEntropy(broken))

  check('identical streams interact by entanglement',
    S.createImpossiblePossibleStreams(streams[0], streams[0]).interactionType === 'entanglement')
  check('a stream against itself differs nowhere',
    S.createImpossiblePossibleStreams(streams[0], streams[0]).impossibilityProbability === 0)

  check('consciousness flow reduces the streams', S.calculateConsciousnessFlow(streams) === digitalRoot(streams.reduce((a, s) => a + s.consciousness, 0)))
  check('no streams means no flow', S.calculateConsciousnessFlow([]) === 0)
}

console.log()
if (failures > 0) { console.error(`reality-streams FAIL — ${failures}`); process.exit(1) }
console.log('reality-streams ok')
process.exit(0)
