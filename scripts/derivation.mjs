/**
 * derivation — decide, by experiment, whether each spectrum column is DERIVED
 * or merely DEFINED, instead of taking the author's word for it.
 *
 * docs/index.md promises: "Every column states whether it is derived or merely
 * defined." A peer session asked whether a gate enforces that or whether the
 * columns keep it by hand. They kept it by hand: the flags in spectrum-gen.mjs
 * were typed strings sitting beside computed values, which is the shape a stale
 * figure hides in. Answering that question is also what surfaced a wrong row —
 * the mirror justified itself "over (Z/9Z)", which the kernel refutes at the
 * void.
 *
 * THE TEST. A value is DERIVED if the arithmetic forces it: perturb it and
 * something independent objects. A value is DEFINED if it is a convention: it
 * could have been chosen differently and no law would notice. So for each
 * column this corrupts the one line that produces it and asks the SEAL BATTERY
 * — the 32 recomputable predicates, which state laws rather than conventions —
 * whether anything broke.
 *
 *   at least one seal falls  ->  derived, and the seals that fell are the reason
 *   every seal still holds   ->  defined, and nothing in the arithmetic minds
 *
 * The seals are the arbiter precisely because they are INDEPENDENT of the
 * column. Running the column's own test suite would fail for every column,
 * derived or not: a suite pins the convention it was written against, so it
 * cannot tell a law from a habit.
 *
 * THE CONTROL IS NOT OPTIONAL. A mutation that fails to change the column's
 * output would break no seal and be recorded as "defined" — a false verdict
 * that looks exactly like a true one. So each column carries a probe, the probe
 * is evaluated before and after, and a mutation that does not move it is an
 * ERROR, never a result.
 *
 * IT DOES NOT MUTATE THE WORKING TREE. An earlier version corrupted files in
 * place and restored them, hash-verified. That is safe alone and unsafe here:
 * other sessions commit this repository automatically, the experiment holds a
 * mutation for as long as a full seal battery takes, and the corruption is
 * deliberately subtle — `* 36` becoming `* 40` would survive review. A window
 * of minutes across fourteen measurements is an invitation.
 *
 * So the tree is CLONED into the scratchpad first and every mutation happens
 * there. On APFS `cp -Rc` is copy-on-write: 92 MB in 0.17s and no extra disk.
 * The checked-out files are never written to, so there is no window at all
 * rather than a small one.
 *
 *   npm run derivation        rewrite src/verification/derivation.json
 *   npm run derivation:check  re-run the experiment and fail if a flag moved
 */
import { readFileSync, writeFileSync, rmSync, mkdirSync, cpSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const ROOT = join(import.meta.dirname, '..')
const CHECK = process.argv.includes('--check')
const OUT = join(ROOT, 'src/verification/derivation.json')
const sha = (b) => createHash('sha256').update(b).digest('hex')
const A432 = 'src/0/3/6/9/1/2/4/8/7/5/1'

/**
 * [id, column as the table names it, file, anchor, replacement, probe]
 * The probe is an expression over the module namespace `m` (src/0/index.ts) and
 * `a` (a432.math.ts) and `c` (a432.cmyk.ts); its value must move.
 */
const COLUMNS = [
  ['mirror', 'mirror `M(d)`', 'src/0/index.ts', 'D.map((d) => m.throughVoid(d))', [
    ['return d === 0 ? 0 : digitalRoot(1 - d)', 'return d === 0 ? 0 : digitalRoot(2 - d)'],
  ]],
  ['dash', 'polarity, Δ°, bearing', 'src/0/index.ts', '[m.decodeVortexDashAngles().weightedBearing, ...m.decodeVortexDashAngles().steps.map((s) => s.angleDelta)]', [
    // Symmetric: swapping which stroke is positive negates every angle, and a
    // bearing that closes at zero still closes. Kept deliberately — it is the
    // one that taught me a surviving mutation can mean the probe respected a
    // symmetry rather than that the value is free.
    ["const sign = token.dash === '/' ? 1 : -1", "const sign = token.dash === '/' ? -1 : 1"],
    // Perturbs the step angle, which no law constrains.
    ['const angleDelta = sign * VORTEX_DASH_ANGLE_DEG', 'const angleDelta = sign * VORTEX_DASH_ANGLE_DEG + 1'],
    // Perturbs the WEIGHTED angle, which is what the closure is about.
    ['const weightedAngle = sign * token.digit * VORTEX_DASH_ANGLE_DEG', 'const weightedAngle = sign * token.digit * VORTEX_DASH_ANGLE_DEG + 1'],
  ]],
  ['gateway', 'gateway', 'src/0/index.ts', 'm.vortexStrokeGateways().gateways', [
    ["stroke: (next > d ? '\\\\' : '/') as '/' | '\\\\'", "stroke: (next > 4 ? '\\\\' : '/') as '/' | '\\\\'"],
    ['.filter((v) => v.incoming !== v.outgoing)', '.filter((v) => v.incoming !== v.outgoing || v.digit === 1)'],
  ]],
  ['hue', 'hue°', `${A432}/a432.math.ts`, 'D.map((d) => a.hueForDigit(d))', [
    ['return (abs(d) * 36) % 360;', 'return (abs(d) * 40) % 360;'],
    ['return (abs(d) * 36) % 360;', 'return (abs(d) * 36 + 1) % 360;'],
  ]],
  ['cmyk', 'C/M/Y/K', `${A432}/a432.cmyk.ts`, 'D.map((d) => JSON.stringify(c.digitAngleToCMYK(d, 0)))', [
    ['const baseHue = (abs(digit) * 36) % 360;', 'const baseHue = (abs(digit) * 40) % 360;'],
  ]],
  ['class', 'class', `${A432}/a432.cmyk.ts`, 'D.map((d) => c.vortexColor(d))', [
    ['const r = digitalRoot(channel * 3);', 'const r = digitalRoot(channel * 4);'],
  ]],
  ['hz', 'Hz', `${A432}/a432.math.ts`, '[3, 6, 9].map((d) => a.frequencyForDigit(d))', [
    ['return 432 * (d / 12);', 'return 432 * (d / 11);'],
    ['return 432 * (d / 12);', 'return 433 * (d / 12);'],
  ]],
]

// One child process per measurement: the seals and the probe, from a tree that
// may be mutated on disk. It must be a child, because a module already imported
// cannot be re-read.
function measure(probe) {
  const src = `
import * as m from ${JSON.stringify(join(TREE, 'src/0/index.ts'))}
import * as a from ${JSON.stringify(join(TREE, A432, 'a432.math.ts'))}
import * as c from ${JSON.stringify(join(TREE, A432, 'a432.cmyk.ts'))}
import * as v from ${JSON.stringify(join(TREE, 'src/verification/index.ts'))}
const D = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const fell = []
for (const name of Object.keys(v.SEALS)) {
  let seal
  try { seal = v.runSeal(name).seal } catch { seal = 'threw' }
  if (seal !== 'held') fell.push(name)
}
// computeVortexInvariantsHold is the other declared law battery: it lives in
// src/0 rather than src/verification, and it is what actually constrains the
// stroke and dash columns. Leaving it out made two derived columns read as
// unforced — the arbiter was too narrow, not the columns too free.
try { if (m.computeVortexInvariantsHold() !== true) fell.push('computeVortexInvariantsHold') }
catch { fell.push('computeVortexInvariantsHold(threw)') }
let probe = null
try { probe = JSON.stringify(${probe}) } catch (e) { probe = 'threw: ' + e.message }
console.log(JSON.stringify({ fell, probe, seals: Object.keys(v.SEALS).length + 1 }))
`
  const out = execFileSync(process.execPath, ['--experimental-strip-types', '--input-type=module', '--eval', src],
    { encoding: 'utf8', cwd: TREE, timeout: 300_000, stdio: ['ignore', 'pipe', 'pipe'] })
  return JSON.parse(out.trim().split('\n').pop())
}

/**
 * A predicate that falls is not automatically evidence. If it works by holding
 * the expected value as a literal — `gateways.join(',') === '8,3,9,0'` — then
 * perturbing the column falsifies it BY CONSTRUCTION, and it would fall for a
 * convention exactly as readily as for a law. That is a pinned expectation, not
 * a derivation, and counting it as one is how a harness reports all-green while
 * meaning nothing.
 *
 * So each fallen predicate is read: if its source carries the column's baseline
 * value as a literal run of numbers, it PINS. Otherwise it reaches the column
 * through other quantities and is STRUCTURAL.
 *
 * The rule is mechanical and therefore blunt. A predicate can pin a value
 * without spelling it out — `VORTEX_DASH_ANGLE_DEG === 60` pins the constant
 * without naming the angles it produces — so `structural` here means "not
 * pinned in the obvious way", and the column verdict says so.
 */
const SOURCES = {}
function predicateSource(name) {
  for (const rel of ['src/verification/lean-bridge.ts', 'src/0/index.ts']) {
    const src = SOURCES[rel] ??= readFileSync(join(ROOT, rel), 'utf8')
    const i = src.indexOf(`${name}:`) >= 0 ? src.indexOf(`${name}:`) : src.indexOf(`function ${name}(`)
    if (i < 0) continue
    return src.slice(i, i + 4000)
  }
  return ''
}
function pins(name, baselineProbe) {
  const nums = String(baselineProbe).match(/-?\d+/g)
  if (!nums || nums.length < 2) return false
  const run = new RegExp(nums.map((n) => n.replace('-', '\\-')).join('\\D{1,3}'))
  return run.test(predicateSource(name))
}

/**
 * A clone of the sources, outside the working tree. Every mutation lands here.
 * `cp -Rc` asks APFS for a copy-on-write clone; where that is unsupported the
 * fallback is a real copy, which costs disk but keeps the guarantee.
 */
const TREE = join(process.env.CLAUDE_SCRATCHPAD ?? tmpdir(), `derivation-tree-${process.pid}`)
function buildTree() {
  rmSync(TREE, { recursive: true, force: true })
  mkdirSync(TREE, { recursive: true })
  try {
    execFileSync('cp', ['-Rc', join(ROOT, 'src'), join(TREE, 'src')], { stdio: 'pipe' })
  } catch {
    cpSync(join(ROOT, 'src'), join(TREE, 'src'), { recursive: true })
  }
  // package.json carries "type": "module"; without it the .ts files resolve as
  // CommonJS and every measurement fails identically, which would look like a
  // finding rather than a setup error.
  cpSync(join(ROOT, 'package.json'), join(TREE, 'package.json'))
}
buildTree()
process.on('exit', () => rmSync(TREE, { recursive: true, force: true }))

const base = measure('D')
if (base.fell.length) {
  console.error(`derivation FAIL — ${base.fell.length} seal(s) already fall before any mutation, so nothing can be attributed to one: ${base.fell.join(', ')}`)
  process.exit(1)
}

const results = {}
for (const [id, label, rel, probe, mutations] of COLUMNS) {
  const path = join(TREE, rel)
  const before = readFileSync(path, 'utf8')
  const baseline = measure(probe)
  const tried = []

  for (const [anchor, replacement] of mutations) {
    const hits = before.split(anchor).length - 1
    if (hits !== 1) {
      console.error(`derivation FAIL — the anchor for "${id}" appears ${hits} time(s) in ${rel}; a non-unique anchor aims the probe at the wrong line`)
      process.exit(1)
    }
    let m
    try {
      writeFileSync(path, before.replace(anchor, replacement))
      m = measure(probe)
    } finally {
      writeFileSync(path, before)
      if (sha(readFileSync(path)) !== sha(Buffer.from(before))) {
        console.error(`derivation FAIL — could not restore ${rel} inside the clone at ${TREE}. The working tree was never written to, so nothing there needs fixing.`)
        process.exit(1)
      }
    }
    // The control. A mutation that leaves the column alone breaks no seal, and
    // would be written down as unforced — a false verdict shaped like a true one.
    if (m.probe === baseline.probe) {
      console.error(`derivation FAIL — a mutation for "${id}" did not move the column: ${baseline.probe}`)
      console.error(`  ${anchor}  ->  ${replacement}`)
      console.error('  Nothing can be concluded from a probe that did not fire. Fix the mutation, do not record a verdict.')
      process.exit(1)
    }
    tried.push({ mutation: `${anchor}  ->  ${replacement}`, sealsFallen: m.fell })
  }

  const fell = [...new Set(tried.flatMap((t) => t.sealsFallen))]
  const structural = fell.filter((n) => !pins(n, baseline.probe))
  const pinned = fell.filter((n) => pins(n, baseline.probe))
  const status = structural.length ? 'forced' : fell.length ? 'pinned' : 'unforced'
  results[id] = {
    column: label, file: rel, status,
    lawsFallen: fell, structural, pinned,
    mutationsTried: tried,
  }
  const mark = status === 'forced'
    ? `forced    ${structural.length} law(s) reach it structurally: ${structural.slice(0, 2).join(', ')}${structural.length > 2 ? ', …' : ''}`
    : status === 'pinned'
      ? `pinned    only ${pinned.join(', ')} falls, and that predicate holds the expected value as a literal`
      : `unforced  ${tried.length} mutation(s), no law objected`
  console.log(`  ${id.padEnd(8)} ${mark}`)
}

const record = {
  what: 'Each column below was corrupted on disk and the seal battery asked whether anything broke. forced = a law with independent content falls. pinned = the only thing that falls holds the expected value as a literal, which falls for a convention just as readily and is therefore not evidence of derivation. unforced = no seal objected to any mutation tried, which is a LOWER BOUND on derivation, not proof of conventionality: a mutation that respects a symmetry can leave every law standing.',
  arbiter: `the ${base.seals - 1} seals in src/verification plus computeVortexInvariantsHold in src/0 — ${base.seals} predicates that state laws rather than conventions`,
  control: 'every mutation is required to move the column it targets; one that does not is an error, not a verdict',
  columns: results,
}
const next = JSON.stringify(record, null, 2) + '\n'

const forced = Object.values(results).filter((r) => r.status === 'forced').length
const pinnedOnly = Object.values(results).filter((r) => r.status === 'pinned').length
console.log(`derivation — ${COLUMNS.length} column(s) measured against ${base.seals} seals: ${forced} forced, ${pinnedOnly} pinned-only, ${COLUMNS.length - forced - pinnedOnly} unforced`)

if (CHECK) {
  const have = readFileSync(OUT, 'utf8')
  if (have !== next) {
    // The recorded file may be unreadable rather than merely different —
    // checks-falsifiable hands this a corrupted artifact on purpose.
    let old = {}
    try { old = JSON.parse(have).columns ?? {} } catch { console.error('  the recorded file is not readable JSON') }
    for (const [id, r] of Object.entries(results)) {
      if (old[id]?.status !== r.status) console.error(`  ${id}: recorded "${old[id]?.status ?? 'absent'}", the experiment now says "${r.status}"`)
    }
    console.error('derivation:check FAIL — the recorded flags are not what the experiment produces; run npm run derivation')
    process.exit(1)
  }
  console.log('derivation:check ok — every derived/defined flag is the one the experiment produces today')
} else {
  writeFileSync(OUT, next)
  console.log(`derivation — wrote ${OUT.replace(ROOT + '/', '')}`)
}
