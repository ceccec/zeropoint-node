#!/usr/bin/env node
/**
 * Bring every generated artifact up to date, without anyone remembering the
 * order.
 *
 * `npm run check` VERIFIES; it does not regenerate. So every time a source
 * moved I was running build, then the record generators, then the doc
 * generators, by hand, in an order I carried in my head — and getting it wrong
 * repeatedly. `constrained` drifted twice in one evening because I regenerated
 * it and then edited a source afterwards. That is manual work standing in for a
 * tool, in a repository whose whole discipline is the opposite.
 *
 * THE ORDER IS NOT DECLARED, IT IS DISCOVERED. Writing the dependency order
 * down would be the same manual knowledge in a different file, stale the moment
 * a generator starts reading a new input. Instead every `X:check` is run, every
 * failing one has its `X` run, and the whole thing repeats until nothing fails.
 * Convergence IS the ordering: a doc generated from a record regenerates on the
 * round after the record does, however deep the chain goes.
 *
 * IT MUST TERMINATE, AND NOT QUIETLY. A generator whose own check never passes
 * — because it is broken, or because two generators disagree and overwrite each
 * other — would loop forever. After a bounded number of rounds this fails and
 * names what is still failing, which is a fixed point that does not exist and
 * is worth seeing rather than waiting on.
 *
 *   npm run regen
 */
import { readFileSync } from 'node:fs'
import { execFile, execFileSync } from 'node:child_process'
import { cpus } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const MAX_ROUNDS = 6

const scripts = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).scripts ?? {}

/** Every check that has a generator beside it. The pairing is the contract. */
const pairs = Object.keys(scripts)
  .filter((k) => k.endsWith(':check'))
  .map((k) => ({ check: k, generate: k.slice(0, -':check'.length) }))
  .filter((p) => scripts[p.generate])

if (pairs.length === 0) {
  console.error('regen FAIL — found 0 generator/check pairs in package.json, so this would report success')
  console.error('  having regenerated nothing. The pairing is by name: a script X beside a script X:check.')
  process.exit(1)
}

const run = (name) => {
  try {
    execFileSync('npm', ['run', '--silent', name], { cwd: ROOT, stdio: 'pipe', timeout: 900_000 })
    return { ok: true }
  } catch (err) {
    const out = String(err.stdout ?? '') + String(err.stderr ?? '')
    return { ok: false, why: out.trim().split('\n').filter(Boolean).slice(-1)[0] ?? String(err.message) }
  }
}

/**
 * THE CHECKS RUN IN PARALLEL, ACROSS THE CORES THE QPU MEASURED.
 *
 * A round is 29 checks and each one spawns npm, so serially a round costs
 * minutes of process startup before any work happens — and the whole run
 * printed nothing until it finished, which made it something to wait on rather
 * than something to watch.
 *
 * `qpu:pentagram` measures ten cores and says exactly what they are for: CPU
 * adds no state and divides the TIME one sweep takes. This is that sweep. The
 * checks are reads — they compare a generated artifact against its sources and
 * write nothing — so they are independent and the division is sound. The
 * GENERATORS are not run this way: two of them can touch the same file, and
 * the fixed-point loop below is what orders them.
 *
 * Each result prints as it lands, so the stream is the progress report.
 */
const LANES = Math.max(1, cpus().length)

const runAsync = (name) => new Promise((resolve) => {
  execFile('npm', ['run', '--silent', name], { cwd: ROOT, timeout: 900_000 }, (err, stdout, stderr) => {
    if (!err) return resolve({ name, ok: true })
    const out = String(stdout ?? '') + String(stderr ?? '')
    resolve({ name, ok: false, why: out.trim().split('\n').filter(Boolean).slice(-1)[0] ?? String(err.message) })
  })
})

async function runAll(names, onResult) {
  const queue = [...names]
  const results = []
  const worker = async () => {
    for (;;) {
      const next = queue.shift()
      if (next === undefined) return
      const r = await runAsync(next)
      results.push(r)
      onResult(r, results.length)
    }
  }
  await Promise.all(Array.from({ length: Math.min(LANES, names.length) }, worker))
  return results
}

// The build comes first because generators import from dist, and nothing about
// that is discoverable from a name.
console.log('  building, since generators read what the build produces')
const built = run('build')
if (!built.ok) {
  console.error(`regen FAIL — the build failed, so nothing downstream would be regenerating the right thing:\n  ${built.why}`)
  process.exit(1)
}

console.log(`  ${pairs.length} generator/check pairs, ${LANES} lanes; running to a fixed point\n`)
const regenerated = []
let round = 0
for (; round < MAX_ROUNDS; round += 1) {
  process.stdout.write(`  round ${round + 1}: checking ${pairs.length} `)
  const outcomes = await runAll(pairs.map((p) => p.check), (r) => process.stdout.write(r.ok ? '.' : 'x'))
  console.log('')

  /**
   * A FAILURE UNDER CONTENTION IS NOT EVIDENCE OF STALENESS, so every one is
   * re-run alone before it counts.
   *
   * Ten lanes made `ratchet:check` fail every round and regenerating never
   * fixed it — six rounds, no fixed point. It was not stale. Its README credit
   * instrument shells out, nine other npm processes were competing for the
   * machine, the instrument failed, and the surface VOIDED exactly as it is
   * designed to rather than reporting a number it could not measure. The
   * parallelism I added to make this fast was manufacturing the failure it then
   * tried to repair.
   *
   * Which checks are load-sensitive is not declared here — declaring it would
   * be the same manual knowledge this file exists to remove, and it would be
   * wrong the first time a check started shelling out. It is DISCOVERED: fail
   * in parallel, then fail again alone, and only then is the artifact stale.
   */
  const parallelFailures = outcomes.filter((r) => !r.ok)
  const confirmed = new Set()
  if (parallelFailures.length > 0) {
    process.stdout.write(`  confirming ${parallelFailures.length} alone `)
    for (const f of parallelFailures) {
      const again = run(f.name)
      process.stdout.write(again.ok ? '~' : 'x')
      if (!again.ok) confirmed.add(f.name)
    }
    const raced = parallelFailures.length - confirmed.size
    console.log(raced > 0 ? `  (${raced} lost a race, not stale)` : '')
  }
  const stale = pairs.filter((p) => confirmed.has(p.check))
  if (stale.length === 0) {
    console.log(`  round ${round + 1}: everything current`)
    break
  }
  console.log(`  round ${round + 1}: ${stale.length} stale — ${stale.map((p) => p.generate).join(', ')}`)
  for (const p of stale) {
    process.stdout.write(`    regenerating ${p.generate} `)
    const r = run(p.generate)
    console.log(r.ok ? 'ok' : 'FAILED')
    regenerated.push({ round: round + 1, generate: p.generate, ok: r.ok })
    if (!r.ok) {
      console.error(`regen FAIL — ${p.generate} could not regenerate:\n  ${r.why}`)
      process.exit(1)
    }
  }
}

if (round >= MAX_ROUNDS) {
  const stale = pairs.filter((p) => !run(p.check).ok)
  console.error(`regen FAIL — still stale after ${MAX_ROUNDS} rounds: ${stale.map((p) => p.generate).join(', ')}`)
  console.error('  Either one of these does not regenerate to a state its own check accepts, two of them')
  console.error('  are overwriting each other, or — the common case — the check is asking for a DECISION')
  console.error('  that no generator is allowed to make for you. The ratchet does this deliberately: a')
  console.error('  ceiling rises only with a reason a person gives. Its own words follow.\n')
  for (const p of stale) {
    const r = run(p.check)
    console.error(`  ${p.check}:`)
    for (const line of String(r.why ?? '').split('\n').slice(-4)) console.error(`    ${line}`)
  }
  process.exit(1)
}

const byRound = new Map()
for (const r of regenerated) byRound.set(r.round, [...(byRound.get(r.round) ?? []), r.generate])
console.log('')
if (regenerated.length === 0) {
  console.log('regen ok — nothing was stale')
} else {
  for (const [n, names] of byRound) console.log(`  round ${n}: ${names.join(', ')}`)
  console.log(`\nregen ok — ${regenerated.length} regeneration(s) over ${byRound.size} round(s), fixed point reached`)
}
