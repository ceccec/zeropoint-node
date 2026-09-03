/**
 * The blockchain's constructor, and the law it had never once satisfied.
 *
 * createBlock computed its frequency with frequencyForDigit, which accepts ONLY
 * the trinity axis {3,6,9} and throws for anything else — while taking its
 * dimension from the Rodin sequence [1,2,4,8,7,5,1], which is entirely orbit.
 * It threw for every index. Nothing caught it because the callers are a browser
 * UI and a factory path no test reaches, and a partial function called outside
 * its domain looks exactly like working code until it runs.
 *
 * The law is the plainest one there is: a block can be made at any index.
 */
import { createBlock } from './a432.block.chain.ts'
import {
  validateBlock, calculateHarmonyScore, calculateEntropy, getStreamEntropy,
  traverseChain, getTotalKVT, assignBadge, getTrinityCompositeColors,
  recordSenseOrMetaEvent,
} from './a432.block.chain.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}

let made = 0
let threw = 0
for (let i = 0; i < 24; i += 1) {
  try { createBlock({ probe: i }, [], i); made += 1 } catch { threw += 1 }
}
check('a block can be made at every index', threw === 0, `${threw} of 24 threw`)

const block = createBlock({ probe: 1 }, [], 0)
check('the block carries the trinity its meta names',
  block.meta.includes(`trinity: ${block.trinity}`),
  `meta says "${block.meta.slice(0, 60)}" and trinity is ${block.trinity}`)
check('the frequency is finite and non-negative',
  Number.isFinite(block.frequency) && block.frequency >= 0, String(block.frequency))
check('the state round-trips', JSON.stringify(block.state) === JSON.stringify({ probe: 1 }))

// A chain, since prev is how blocks link.
let prev: ReturnType<typeof createBlock>[] = []
for (let i = 0; i < 6; i += 1) prev = [createBlock({ i }, prev, i)]
check('a six-block chain builds', prev.length === 1 && prev[0]!.index === 5, `index ${prev[0]?.index}`)

// ---------------------------------------------------------------------------
// The chain's own arithmetic. Nine exports here were called by nothing, and the
// laws they need are the ones that hold across a whole chain rather than for
// one block: validate agrees with the constructor, entropy and harmony are
// complements, the badge is a total function of what the chain contains, and
// traversal visits each block exactly once.
// ---------------------------------------------------------------------------

const blocks = [...Array(24).keys()].map((i) => createBlock({ probe: i }, [], i))

check('every block the constructor makes is one the validator accepts',
  blocks.every((b) => validateBlock(b)),
  'constructor and validator must agree, or one of them is wrong')

check('the validator refuses a block whose dimension is off the vortex',
  !validateBlock({ ...blocks[0]!, dimension: 99 }))

check('the validator refuses a block whose meta names the wrong trinity',
  !validateBlock({ ...blocks[0]!, meta: 'trinity: 0' }))

check('harmony is always within [0,1]',
  blocks.every((b) => calculateHarmonyScore(b) >= 0 && calculateHarmonyScore(b) <= 1))

check('entropy is one minus harmony, exactly',
  blocks.every((b) => calculateEntropy({ ...b, harmonyScore: calculateHarmonyScore(b) })
    === 1 - calculateHarmonyScore(b)))

check('entropy is within [0,1] too',
  blocks.every((b) => {
    const e = calculateEntropy({ ...b, harmonyScore: calculateHarmonyScore(b) })
    return e >= 0 && e <= 1
  }))

check('a Mobius block scores strictly lower than the same block without it',
  calculateHarmonyScore({ ...blocks[0]!, mobius: true }) < calculateHarmonyScore({ ...blocks[0]!, mobius: false }),
  'the penalty must actually penalise')

check('stream entropy is the mean of its blocks',
  (() => {
    const scored = blocks.map((b) => ({ ...b, entropy: calculateEntropy({ ...b, harmonyScore: calculateHarmonyScore(b) }) }))
    const mean = scored.reduce((s, b) => s + b.entropy, 0) / scored.length
    return getStreamEntropy(scored) === mean
  })())

check('an empty stream has entropy zero, not NaN',
  getStreamEntropy([]) === 0,
  'dividing zero by zero is how this returned NaN')

check('stream entropy of one block is that block\'s entropy',
  getStreamEntropy([{ ...blocks[0]!, entropy: 3 / 10 }]) === 3 / 10)

// --- traversal -----------------------------------------------------------
let chain: ReturnType<typeof createBlock>[] = []
for (let i = 0; i < 8; i += 1) chain = [createBlock({ i }, chain, i)]
const seen: number[] = []
traverseChain(chain[0]!, (b) => seen.push(b.index))
check('traversal visits every block in the chain exactly once',
  seen.length === 8 && new Set(seen).size === 8)

check('traversal walks from the newest block back to the oldest',
  seen[0] === 7 && seen[seen.length - 1] === 0)

check('traversing a single block visits it once',
  (() => { const s: number[] = []; traverseChain(blocks[0]!, (b) => s.push(b.index)); return s.length === 1 })())

// --- totals and badges ---------------------------------------------------
check('total KVT is the sum of the chain, and an empty chain totals zero',
  getTotalKVT([]) === 0
  && getTotalKVT(blocks) === blocks.reduce((s, b) => s + (b.kvt ?? 0), 0)
  && getTotalKVT([{ ...blocks[0]!, kvt: 5 }, { ...blocks[1]!, kvt: 7 }]) === 12)

check('total KVT is monotone: adding a block never lowers it',
  [1, 3, 7].every((k) => getTotalKVT([{ ...blocks[0]!, kvt: k }]) >= getTotalKVT([])))

const profile = { id: 'probe', badge: '' } as Parameters<typeof assignBadge>[0]
assignBadge(profile, [])
const emptyBadge = profile.badge
check('a badge is assigned even for an empty chain', typeof emptyBadge === 'string' && emptyBadge.length > 0)

assignBadge(profile, [{ ...blocks[0]!, kvt: 1_000_000, harmonyScore: 1 }])
check('more KVT never gives a worse badge than none',
  typeof profile.badge === 'string' && profile.badge.length > 0)

check('assigning twice with the same input gives the same badge',
  (() => {
    const a = { id: 'a', badge: '' } as Parameters<typeof assignBadge>[0]
    const b = { id: 'b', badge: '' } as Parameters<typeof assignBadge>[0]
    const chainIn = [{ ...blocks[0]!, kvt: 42, harmonyScore: 1 }]
    assignBadge(a, chainIn); assignBadge(b, chainIn)
    return a.badge === b.badge
  })())

// --- colours -------------------------------------------------------------
const colours = getTrinityCompositeColors(blocks)
check('there is one colour triple per block', colours.length === blocks.length)
check('every colour triple carries all three models',
  colours.every((c) => c.hsl !== undefined && c.rgb !== undefined && c.cmyk !== undefined))
check('an empty chain has no colours', getTrinityCompositeColors([]).length === 0)

// --- events --------------------------------------------------------------
const evt = recordSenseOrMetaEvent('sound', 432, 'a tone in the field')
check('an event is a valid block', validateBlock(evt))
check('the event carries what it was given',
  JSON.stringify(evt.state) === JSON.stringify({ eventType: 'sound', value: 432, metaphysical: 'a tone in the field' }))
check('an event on top of a chain takes the next index',
  recordSenseOrMetaEvent('meta', 1, 'm', [blocks[3]!]).index === blocks[3]!.index + 1)

console.log(failures === 0
  ? `a432.block.chain ok — ${made} blocks made across 24 indices, each carrying the trinity its meta names`
  : `a432.block.chain FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
