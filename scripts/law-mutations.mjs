#!/usr/bin/env node
/**
 * Every law-asserting suite must fail when the code under it is corrupted.
 *
 * coverage:audit counts exports that are NEVER CALLED. That number is the whole
 * measure of patch 7 and it is trivially gameable: a suite that calls every
 * export and asserts nothing moves it just as far as one that asserts a law,
 * and nothing downstream can tell the two apart. The plan for 1.4.7 refused two
 * specific cheats in writing — a determinism harness that calls each export
 * twice, and one that asserts each export does not throw — and this is what
 * makes the refusal checkable instead of a promise.
 *
 * Each entry below corrupts ONE line of a module and requires the suite over it
 * to exit non-zero. A suite that survives a broken implementation has not tested
 * it, and would have moved the ratchet while leaving the code exactly as
 * unexamined as before.
 *
 * THE ANCHOR MUST BE UNIQUE. The first version of this replaced the first match,
 * and a432.sequence.ts has the same consciousness-sum line in two functions, so
 * the mutation landed in the one the suite does not cover and reported a
 * survivor that was really a mis-aimed probe. A non-unique anchor is a failure
 * here, not a warning.
 *
 * The file is restored from the copy read before the mutation, and the restore
 * is verified by hash before moving on.
 *
 *   npm run mutations:check
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const A432 = join(ROOT, 'src/0/3/6/9/1/2/4/8/7/5/1')
const sha = (b) => createHash('sha256').update(b).digest('hex')

/** [module, suite, anchor, replacement, what the mutation breaks] */
const MUTATIONS = [
  ['a432.yin.yang.ts', 'a432.yin.yang.test.ts',
    'const sign = f.denominator < 0 ? -1 : 1;', 'const sign = 1;',
    'simplify stops being canonical'],
  ['a432.yin.yang.ts', 'a432.yin.yang.test.ts',
    'if (f.denominator === 0) throw', 'if (false) throw',
    'a zero denominator makes NaN again'],
  ['a432.rodin.coil.ts', 'a432.rodin.coil.test.ts',
    'const ORBIT: readonly number[] = VORTEX_ORBIT', 'const ORBIT: readonly number[] = [...VORTEX_ORBIT, 1]',
    'the seven-step seam comes back'],
  ['a432.math.constants.ts', 'a432.math.constants.test.ts',
    'return A432_BASE_FREQUENCY * pow(A432_OCTAVE_RATIO, octave);', 'return A432_BASE_FREQUENCY * (1 + octave);',
    'the octave stops doubling'],
  ['a432.math.constants.ts', 'a432.math.constants.test.ts',
    'if (n < 1 || n >= FIBONACCI_SEQUENCE.length - 1) return 0;', 'if (n < 0 || n >= FIBONACCI_SEQUENCE.length - 1) return 0;',
    'index zero divides by F(0) again'],
  ['a432.block.chain.ts', 'a432.block.chain.test.ts',
    'if (blocks.length === 0) return 0;', 'if (false) return 0;',
    'an empty stream averages to NaN again'],
  ['a432.block.chain.ts', 'a432.block.chain.test.ts',
    'if (!rodinSeq.includes(block.dimension)) return false;', 'if (false) return false;',
    'the validator stops refusing a dimension off the vortex'],
  ['a432.registry.ts', 'a432.registry.test.ts',
    "throw new Error(`Component with ID '${id}' already exists`);", 'return;',
    'the registry silently overwrites instead of refusing'],
  ['a432.vbm.path.ts', 'a432.vbm.test.ts',
    'frequency: calculateA432Frequency(nextDigit),',
    'frequency: (() => { if (![3,6,9].includes(nextDigit)) throw new Error("trinity only"); return 0 })(),',
    'the partial function comes back and orbit digits throw'],
  ['a432.vbm.decode.ts', 'a432.vbm.test.ts',
    'sum: thirdSum,', 'sum: thirdSum + 1,',
    'a trinity sum stops being the sum of its own digits'],
  ['a432.vbm.decode.ts', 'a432.vbm.test.ts',
    'const division = digit === 0 ? 0 : floor(biggerNumber / digit);', 'const division = floor(biggerNumber / digit);',
    'dividing by the void makes every statistic NaN again'],
  ['a432.uuid.ts', 'a432.uuid.test.ts',
    "return merge(toUuid('a432.uuid.v5'), toUuid(name))", "return toUuid('a432.uuid.v5')",
    'uuidV5 stops depending on the name it is given'],
  ['a432.trinity.ts', 'a432.vortex.arithmetic.test.ts',
    "if (idx === -1) throw new Error('Invalid trinity digit');",
    'if (idx === -1) return createTrinityConsciousnessVector(3, 0, consciousness);',
    'the fold stops refusing digits off the axis'],
  ['a432.shear.ts', 'a432.vortex.arithmetic.test.ts',
    'return shears[(idx + 1) % shears.length];', 'return shears[idx % shears.length];',
    'the shear cycle stops advancing'],
  ['a432.double.ts', 'a432.vortex.arithmetic.test.ts',
    '{ 1: 8, 2: 7, 3: 6, 4: 5, 5: 4, 6: 3, 7: 2, 8: 1, 9: 9 }', '{ 1: 8, 2: 7, 3: 6, 4: 5, 5: 4, 6: 3, 7: 2, 8: 2, 9: 9 }',
    'the mirror stops being an involution'],
  ['a432.electric.flow.ts', 'a432.vortex.arithmetic.test.ts',
    '[1, 2], [2, 4], [4, 8], [8, 7], [7, 5], [5, 1] // Vortex sequence',
    '[1, 2], [2, 4], [4, 8], [8, 7], [7, 5] // Vortex sequence',
    'a step of the tour stops being a sacred transition'],
  ['a432.sequence.ts', 'a432.vortex.arithmetic.test.ts',
    'const sequence = pattern;\n  const consciousness = sequence.reduce((sum, digit) => sum + digit, 0);',
    'const sequence = pattern;\n  const consciousness = sequence.length;',
    'consciousness stops being the sum of the pattern'],
]

const problems = []
// The controls run first: an UNMUTATED suite must pass, or a suite that fails
// for its own reasons would be read here as a mutation being caught.
const suites = [...new Set(MUTATIONS.map(([, s]) => s))]
for (const suite of suites) {
  try {
    execFileSync('node', ['--experimental-strip-types', join(A432, suite)], { stdio: 'pipe' })
  } catch {
    problems.push(`${suite} FAILS with no mutation applied — every result below it would be meaningless`)
  }
}

let caught = 0
for (const [mod, suite, from, to, what] of MUTATIONS) {
  const path = join(A432, mod)
  const before = readFileSync(path, 'utf8')
  const hash = sha(before)
  const hits = before.split(from).length - 1
  if (hits === 0) { problems.push(`${mod}: anchor not found — ${from.slice(0, 60)}`); continue }
  if (hits > 1) { problems.push(`${mod}: anchor matches ${hits} places; a mutation on the wrong copy reports a false survivor`); continue }

  writeFileSync(path, before.replace(from, to))
  let failed = false
  try { execFileSync('node', ['--experimental-strip-types', join(A432, suite)], { stdio: 'pipe' }) } catch { failed = true }
  writeFileSync(path, before)
  if (sha(readFileSync(path, 'utf8')) !== hash) {
    console.error(`law-mutations FATAL — ${mod} was not restored`)
    process.exit(1)
  }
  if (failed) caught += 1
  else problems.push(`${suite} SURVIVED a mutation to ${mod}: ${what}`)
  console.log(`  ${failed ? '✓' : '✗'} ${mod.padEnd(24)} ${what}`)
}

console.log(`law-mutations — ${MUTATIONS.length} mutation(s) across ${new Set(MUTATIONS.map(([m]) => m)).size} module(s), ${caught} caught`)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`law-mutations FAIL — ${problems.length} problem(s); a suite that survives a broken implementation has not tested it`)
  process.exit(1)
}
console.log('law-mutations ok — every suite fails when the code beneath it is corrupted')
