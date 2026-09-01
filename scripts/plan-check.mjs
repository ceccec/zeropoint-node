#!/usr/bin/env node
/**
 * A release must do what the plan said that patch would do.
 *
 * The 1.4 run is nine patches planned before the first was cut, because the
 * numbering says in advance how many there are: patch is one digit, the digit
 * space is the vortex, and 9 carries to the next minor. A run of known length
 * can be planned; "executed precisely as planned" is then a check rather than
 * an intention, which is the only difference between a plan and a wish.
 *
 * release-plan.json assigns each patch a surface and a target. The target is a
 * number the repository already measures, so this compares the plan against the
 * measurement and not against a report of it.
 *
 * Two sources, declared per surface. The ratchet carries twelve surfaces and
 * that number is load-bearing — twelve is the vector-equilibrium reading of a
 * *.*.0 — so a surface the ratchet does not carry names its own measuring
 * command instead of being added as a thirteenth.
 *
 * The escape is an amendment, recorded in the plan next to the patch it
 * changes, and printed. A target missed quietly is worse than a target moved
 * loudly: the second leaves a record of what was believed and when.
 *
 *   npm run plan:check
 */

import { readFileSync, existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PLAN = join(ROOT, 'release-plan.json')

if (!existsSync(PLAN)) {
  console.log('plan:check — no release-plan.json; nothing planned, nothing to check')
  process.exit(0)
}

const plan = JSON.parse(readFileSync(PLAN, 'utf8'))
const problems = []
const lines = []
const version = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version
const [major, minor, patchRaw] = version.split('.')
const patch = (patchRaw ?? '').split('-')[0]
const run = `${major}.${minor}`

// Plan coherence: a surface's `from` must be where the previous patch left it.
const lastTo = new Map()
for (const [d, e] of Object.entries(plan.patches)) {
  const prev = lastTo.get(e.surface)
  if (prev !== undefined && prev !== e.from) {
    problems.push(`plan is incoherent: ${plan.run}.${d} starts ${e.surface} at ${e.from} but the previous patch left it at ${prev}`)
  }
  lastTo.set(e.surface, e.to)
  if (e.to > e.from) problems.push(`plan is incoherent: ${plan.run}.${d} targets ${e.surface} UP from ${e.from} to ${e.to}`)
}
if (problems.length > 0) {
  // A plan that does not add up cannot judge a release, whichever one this is.
  for (const p of problems) console.error(`  ✗ ${p}`)
  console.error(`plan:check FAIL — the plan itself is incoherent`)
  process.exit(1)
}

// Which end of the run is this? 1.4.0 is the carry INTO the run and has done
// none of it yet; the carry OUT is 1.5.0, and that is where every patch must
// stand. I had these the same way round until the check said so.
const isExit = version === plan.carriesTo
const inRun = run === plan.run
if (!isExit && !inRun) {
  console.log(`plan:check — ${version} is not in the planned run ${plan.run}.x; nothing to check`)
  process.exit(0)
}
if (inRun && patch === '0') {
  console.log(`plan:check — ${version} opens the ${plan.run} run; its ${Object.keys(plan.patches).length} patches are planned and none is due yet`)
  process.exit(0)
}

/** The live value of a surface, from whichever source the plan declares. */
function measure(surface) {
  const src = plan.sources?.[surface]
  if (!src) return { value: null, how: `no source declared for ${surface}` }
  if (src.from === 'ratchet') {
    const ceilings = JSON.parse(readFileSync(join(ROOT, 'ratchet.json'), 'utf8')).ceilings ?? {}
    if (!(surface in ceilings)) return { value: null, how: `${surface} is not a ratchet surface` }
    return { value: ceilings[surface], how: 'ratchet.json' }
  }
  if (src.from === 'command') {
    let out
    try { out = execSync(src.command, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) }
    catch (e) { out = `${e.stdout ?? ''}${e.stderr ?? ''}` }
    const m = new RegExp(src.pattern).exec(out)
    if (!m) return { value: null, how: `${src.command} printed nothing matching /${src.pattern}/` }
    return { value: Number(m[1]), how: src.command }
  }
  return { value: null, how: `unknown source kind ${src.from}` }
}

if (isExit) {
  // The carry out. Every planned target must stand, not just the last one.
  for (const [d, e] of Object.entries(plan.patches)) {
    const { value, how } = measure(e.surface)
    if (value === null) { problems.push(`${e.surface}: ${how}`); continue }
    const target = e.to
    const ok = value <= target
    lines.push(`  ${ok ? 'MET ' : 'MISS'}  ${plan.run}.${d}  ${e.surface.padEnd(16)} planned <= ${String(target).padStart(6)}, live ${String(value).padStart(6)}   (${how})`)
    if (!ok && !e.amended) problems.push(`${plan.run}.${d} planned ${e.surface} <= ${target} and it is ${value}`)
    if (e.amended) lines.push(`        AMENDED: ${e.amended}`)
  }
  console.log(`plan:check — ${version} carries the ${plan.run} run out; every one of its patches must stand`)
} else {
  const e = plan.patches[patch]
  if (!e) {
    console.log(`plan:check — ${version} has no entry in the ${plan.run} plan`)
    problems.push(`${version} is in the planned run but the plan has no patch ${patch}`)
  } else {
    const { value, how } = measure(e.surface)
    if (value === null) problems.push(`${e.surface}: ${how}`)
    else {
      const ok = value <= e.to
      lines.push(`  ${ok ? 'MET ' : 'MISS'}  ${version}  ${e.surface.padEnd(16)} planned <= ${String(e.to).padStart(6)}, live ${String(value).padStart(6)}   (${how})`)
      if (!ok && !e.amended) problems.push(`${version} planned ${e.surface} <= ${e.to} and it is ${value}`)
      if (e.amended) lines.push(`        AMENDED: ${e.amended}`)
    }
    console.log(`plan:check — ${version}: ${e.why}`)
  }
}

for (const l of lines) console.log(l)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`plan:check FAIL — ${problems.length} problem(s); amend the plan in release-plan.json with a reason, or hit the target`)
  process.exit(1)
}
const amended = lines.filter((l) => l.includes('AMENDED:')).length
console.log(
  amended > 0
    ? `plan:check ok — ${amended} target(s) amended with a recorded reason; the rest stand`
    : 'plan:check ok — this release did what the plan said',
)
