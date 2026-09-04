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
import { readFileSync, writeFileSync, rmSync, mkdirSync, cpSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

/**
 * THE MUTATIONS DO NOT TOUCH THE WORKING TREE.
 *
 * This corrupted checked-out files and restored them, hash-verified, aborting
 * if a restore failed. Safe when nothing else is running — and other sessions
 * commit this repository automatically. Thirty-five mutations, each held for as
 * long as a suite takes, is a long time to be holding a deliberately subtle
 * corruption in tracked files; `const sign = 1` reads as ordinary code.
 *
 * So the sources are cloned once and every mutation lands in the clone. On APFS
 * `cp -Rc` is copy-on-write, so this costs no disk and a fraction of a second.
 * The suites run out of the clone too, which is what makes it work at all: they
 * import only relative paths and node builtins, so a clone of src/ plus
 * package.json — which carries "type": "module" — is a complete tree.
 */
const TREE = join(process.env.CLAUDE_SCRATCHPAD ?? tmpdir(), `law-mutations-${process.pid}`)
rmSync(TREE, { recursive: true, force: true })
mkdirSync(TREE, { recursive: true })
try { execFileSync('cp', ['-Rc', join(ROOT, 'src'), join(TREE, 'src')], { stdio: 'pipe' }) }
catch { cpSync(join(ROOT, 'src'), join(TREE, 'src'), { recursive: true }) }
cpSync(join(ROOT, 'package.json'), join(TREE, 'package.json'))
process.on('exit', () => rmSync(TREE, { recursive: true, force: true }))

const A432 = join(TREE, 'src/0/3/6/9/1/2/4/8/7/5/1')
// A module or suite named with a slash is resolved from src/ instead of from
// the a432 directory, so this harness can reach src/quantum too. The published
// surface lives in both places and both must be falsifiable.
const at = (name) => (name.includes('/') ? join(TREE, 'src', name) : join(A432, name))
const sha = (b) => createHash('sha256').update(b).digest('hex')

/** [module, suite, anchor, replacement, what the mutation breaks] */
export const MUTATIONS = [
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
  // The adapters. A field dropped from either object lowers a gated verdict
  // silently, which is the whole reason subjects.test.ts exists.
  ['verification/subjects.ts', 'verification/subjects.test.ts',
    '    tasks: () => instance.tasks(),', '',
    'the OS adapter loses a method, so the criterion reports a number the class does deserve'],
  ['verification/subjects.ts', 'verification/subjects.test.ts',
    "    { name: 'real-time', subject: 'one frame at 60 Hz', gated: true, measured: true,",
    "    { name: 'real-time', subject: 'one frame at 60 Hz', gated: true, measured: false,",
    'the one measured criterion stops declaring itself measured'],

  // 1.4.9's criteria. A criterion that confirms whatever it is shown confirms
  // nothing, so each is corrupted in the direction that would make it lie.
  ['verification/realtime-criterion.ts', 'verification/realtime-criterion.test.ts',
    'if (p.length !== 1 << n) break', 'if (p.length !== 1 << n) break; if (n > 2) return { qubits: 0, ns: 0, deadlineNs: DEADLINE_NS, wall: "stopped" }',
    'the quantum-scale reach stops reaching and the criterion should notice'],
  ['verification/realtime-criterion.ts', 'verification/realtime-criterion.test.ts',
    'if (dt > worst) worst = dt', 'if (dt < worst) worst = dt',
    'the worst step stops being the worst, which is the whole measure'],
  // The accumulated work must reach the RETURNED value, or V8 eliminates the
  // loop as dead and the mutation measures nothing. The first version of this
  // mutation summed into a variable nobody read, survived, and looked like a
  // weak condition when it was a weak probe.
  ['verification/realtime-criterion.ts', 'verification/realtime-criterion.test.ts',
    "    kernel.spawn('frame', () => { acc += 1 })\n    kernel.tick()",
    "    kernel.spawn('frame', () => { for (let k = 0; k < i / 200; k += 1) acc += 1 })\n    kernel.tick()",
    'the step accumulates work with the step number, so the FLOOR of later steps rises — which is exactly what steady-state exists to catch'],
  ['verification/validation-criterion.ts', 'verification/validation-criterion.test.ts',
    "'NO PHYSICAL EXPERIMENT HAS BEEN RUN. No coil was built, no field was measured, no resonance was '",
    "'Validated. '",
    'the verdict stops carrying its own denial — the one thing that criterion exists to say'],
  ['verification/validation-criterion.ts', 'verification/validation-criterion.test.ts',
    'const SIMULATOR_LAWS = ', 'const SIMULATOR_LAWS: string[] = []; const UNUSED_SIMULATOR_LAWS = ',
    'the simulator laws are counted in bulk rather than named, so removing one passes'],

  // Patch 8's quantum suite: nine of the fifteen reachable-and-untested exports
  // are in src/quantum, the part of this repository held to the quantum
  // criterion, so these are the mutations that matter most.
  ['quantum/variational-optimizer.ts', 'quantum/reachable-exports.test.ts',
    'return vqeAdaptive(ansatz, hamiltonian, exactGroundEnergy, perturbed, maxIterations)',
    'return { ...vqeAdaptive(ansatz, hamiltonian, exactGroundEnergy, perturbed, maxIterations), energy: exactGroundEnergy - 1 }',
    'the optimiser reports an energy BELOW the ground state, which the variational principle forbids'],
  ['quantum/tomography.ts', 'quantum/reachable-exports.test.ts',
    'return total >= (4 / 5) && total <= (6 / 5)', 'return true',
    'the tomography verifier can no longer say no'],
  ['quantum/advanced.ts', 'quantum/reachable-exports.test.ts',
    'if (shots < 1) throw new RangeError(`calibrateReadout: shots must be at least 1, got ${shots}`)', 'if (false) throw new RangeError()',
    'zero shots is estimated from nothing again'],
  ['quantum/workflow.ts', 'quantum/reachable-exports.test.ts',
    'for (const p of problems) {', 'for (const p of problems.slice(1)) {',
    'a batch silently drops the first problem'],

  // Patch 8's suites. The two reachable-export suites cover the published
  // surface, so a mutation there is a mutation to something a consumer can call.
  ['a432.rodin.coil.harmonic.ts', 'a432.reachable.test.ts',
    'const frequency = calculateA432Frequency(digit);', 'const frequency = (() => { if (![3,6,9].includes(digit)) throw new Error("trinity only"); return 0 })();',
    'the coil analyser throws on the Rodin sequence again'],
  ['a432.types.ts', 'a432.reachable.test.ts',
    "if (!Number.isFinite(n) || n < 0) throw new Error('Not a frequency: ' + n);", 'if (false) throw new Error();',
    'toHz stops refusing a negative or NaN frequency'],
  ['a432.matrix.ts', 'a432.resolution.test.ts',
    'const rows = matrix.length;', 'const rows = 7;',
    'the torus map assumes a seven by seven matrix again'],
  ['a432.tesla.coil.ts', 'a432.resolution.test.ts',
    'return TESLA_BASE_FREQUENCY * gateway * polarity;', 'return TESLA_BASE_FREQUENCY * gateway * polarity + 1;',
    'a coil stops carrying the frequency of its own gateway'],
  ['a432.resolved.ts', 'a432.resolution.test.ts',
    'if (difference < minDifference) {', 'if (difference > minDifference) {',
    'the resolver returns the FURTHEST table entry instead of the closest'],
  ['a432.body.ts', 'a432.surface.test.ts',
    'return round(432 * (1 + value / 9));', 'return round(432 * (1 + value / 8));',
    'nine stops being the full scale of the harmonic'],
  ['a432.harmonized.ts', 'a432.surface.test.ts',
    'harmonizationStrategies[name] = fn;', 'harmonizationStrategies[name] ??= fn;',
    'registering a name twice stops replacing the strategy'],
  ['a432.sequence.ts', 'a432.vortex.arithmetic.test.ts',
    'const sequence = pattern;\n  const consciousness = sequence.reduce((sum, digit) => sum + digit, 0);',
    'const sequence = pattern;\n  const consciousness = sequence.length;',
    'consciousness stops being the sum of the pattern'],
]

if (!(process.argv[1] && process.argv[1].endsWith('law-mutations.mjs'))) {
  // Imported for the list, not run. The paper surfaces MUTATIONS; running the
  // harness as a side effect of reading it would corrupt files during a build.
} else {
const problems = []
// The controls run first: an UNMUTATED suite must pass, or a suite that fails
// for its own reasons would be read here as a mutation being caught.
const suites = [...new Set(MUTATIONS.map(([, s]) => s))]
for (const suite of suites) {
  try {
    execFileSync('node', ['--experimental-strip-types', at(suite)], { stdio: 'pipe' })
  } catch {
    problems.push(`${suite} FAILS with no mutation applied — every result below it would be meaningless`)
  }
}

let caught = 0
for (const [mod, suite, from, to, what] of MUTATIONS) {
  const path = at(mod)
  const before = readFileSync(path, 'utf8')
  const hash = sha(before)
  const hits = before.split(from).length - 1
  if (hits === 0) { problems.push(`${mod}: anchor not found — ${from.slice(0, 60)}`); continue }
  if (hits > 1) { problems.push(`${mod}: anchor matches ${hits} places; a mutation on the wrong copy reports a false survivor`); continue }

  writeFileSync(path, before.replace(from, to))
  let failed = false
  try { execFileSync('node', ['--experimental-strip-types', at(suite)], { stdio: 'pipe' }) } catch { failed = true }
  writeFileSync(path, before)
  if (sha(readFileSync(path, 'utf8')) !== hash) {
    console.error(`law-mutations FATAL — ${mod} was not restored inside the clone at ${TREE}. The working tree was never written to.`)
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
}
