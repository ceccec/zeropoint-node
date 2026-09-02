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

console.log(failures === 0
  ? `a432.block.chain ok — ${made} blocks made across 24 indices, each carrying the trinity its meta names`
  : `a432.block.chain FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
