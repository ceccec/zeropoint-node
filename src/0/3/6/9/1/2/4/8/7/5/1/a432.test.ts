/**
 * The a432 layer, tested by property rather than by example.
 *
 * 198 modules, 35,876 lines, 1,489 exports, and until this file no tests at
 * all. That is why a function named generateVortex could return the counting
 * sequence in THREE separate places and nothing said a word.
 *
 * Writing 198 example-based test files would not have caught it. Nobody writes
 * `expect(generateVortex(9)).toEqual([1,2,4,8,7,5,1,2,4])` for a function they
 * believe already works — and if they did, they would write the assertion from
 * the same wrong belief that produced the bug. Every defect found in this layer
 * was found MECHANICALLY, by running everything and looking for a shape that
 * cannot be right:
 *
 *   - output identical to a differently-named function
 *   - a "vortex" containing 3, 6 or 9, which doubling provably never reaches
 *   - a validator returning false about its own data
 *   - a branch nothing ever executes
 *
 * So those are the properties. They run over every module, so a NEW module is
 * covered the day it appears rather than the day somebody remembers it.
 *
 * Exceptions are declared in a432.test.json, seeded from the current state the
 * way the ratchet records its ceilings. The point is not to relitigate what is
 * already here; it is that the next one cannot arrive unnoticed. A declaration
 * that stops being true fails too, so the file cannot rot into a list of
 * excuses for things that no longer exist.
 *
 *   npm run test:a432       run the properties
 *   npm run test:a432:seed  rewrite the declarations from the current state
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pathToFileURL } from 'node:url'
import { VORTEX_ORBIT, VORTEX_AXIS, digitalRoot, vortexStrokeGateways } from '../../../../../../../../../../index.ts'

const HERE = dirname(fileURLToPath(import.meta.url))
/** Walk up to the package root rather than counting ../ eleven times. */
function packageRoot(from: string): string {
  let d = from
  for (;;) {
    try { statSync(join(d, 'package.json')); return d } catch { /* keep going */ }
    const up = dirname(d)
    if (up === d) throw new Error('no package.json above ' + from)
    d = up
  }
}
const ROOT = packageRoot(HERE)
const DECL = join(HERE, 'a432.test.json')
const SEED = process.argv.includes('--seed')

interface Declarations {
  browserOnly: Record<string, string>
  stateful: Record<string, string>
  notDigits: Record<string, string>
  emptyByDesign: Record<string, string>
  triadByDesign: Record<string, string>
  sharedValues: Record<string, string>
}
const EMPTY: Declarations = {
  browserOnly: {}, stateful: {}, notDigits: {}, emptyByDesign: {}, triadByDesign: {}, sharedValues: {},
}
let decl: Declarations = EMPTY
try { decl = { ...EMPTY, ...JSON.parse(readFileSync(DECL, 'utf8')) } } catch { /* seeding */ }

let failures = 0
const problems: string[] = []
function check(name: string, ok: boolean, detail = ''): void {
  if (ok) return
  failures++
  problems.push(`${name}${detail ? ' — ' + detail : ''}`)
}

// ------------------------------------------------------------------ modules
function a432Files(dir: string, out: string[] = []): string[] {
  for (const n of readdirSync(dir)) {
    const full = join(dir, n)
    if (statSync(full).isDirectory()) a432Files(full, out)
    else if (/^a432\..*\.ts$/.test(n) && !n.endsWith('.test.ts')) out.push(full)
  }
  return out
}
const files = a432Files(join(ROOT, 'src')).sort()

// ------------------------------------------------------ load every module
interface Callable { where: string; call: () => unknown }
const callables: Callable[] = []
const loaded: string[] = []
const seedBrowserOnly: Record<string, string> = {}

// Imported IN ORDER, deliberately, and this is not an oversight.
//
// I parallelised this with Promise.all first, on the reasoning that the modules
// do not depend on each other's evaluation order. Several of them register
// themselves at module scope, so the order decides what the registry contains
// when a later module reads it — and the suite went flaky, failing 3 runs in 6
// with a different function named each time. It also bought nothing measurable:
// 198 sequential imports are ~395ms, and the parallel suite still took ~407ms
// end to end. A flaky gate is worse than a slow one, and this one was not even
// faster.
const imported: { file: string; mod: Record<string, unknown> | null; err: Error | null }[] = []
for (const file of files) {
  try { imported.push({ file, mod: (await import(pathToFileURL(file).href)) as Record<string, unknown>, err: null }) }
  catch (e) { imported.push({ file, mod: null, err: e as Error }) }
}

for (const { file, mod: maybeMod, err } of imported) {
  const rel = relative(ROOT, file)
  const short = file.split('/').pop()!
  if (err !== null) {
    const msg = err.message.split('\n')[0]!
    // A module needing `document` is a browser module, not a broken one — but
    // it has to SAY so, so that a genuine load failure cannot hide among them.
    if (/\b(document|window|self|localStorage) is not defined\b/.test(msg)) {
      seedBrowserOnly[rel] = msg
      check(`${short} loads`, rel in decl.browserOnly, `browser-only and undeclared: ${msg}`)
    } else {
      check(`${short} loads`, false, msg)
    }
    continue
  }
  const mod = maybeMod!
  loaded.push(rel)
  const visit = (name: string, fn: unknown, self: unknown): void => {
    if (typeof fn !== 'function' || fn.length !== 0) return
    callables.push({ where: `${short}:${name}`, call: () => (fn as (this: unknown) => unknown).call(self) })
  }
  for (const [k, v] of Object.entries(mod)) {
    visit(k, v, mod)
    if (typeof v === 'function') {
      for (const s of Object.getOwnPropertyNames(v)) {
        if (['length', 'name', 'prototype', 'caller', 'arguments'].includes(s)) continue
        visit(`${k}.${s}`, (v as Record<string, unknown>)[s], v)
      }
    }
  }
}

// Every declared browser-only module must still BE one.
for (const rel of Object.keys(decl.browserOnly)) {
  check(`declaration browserOnly ${rel}`, !loaded.includes(rel), 'it loads fine now — drop the entry')
}

// --------------------------------------------------------------- run them
interface Result { where: string; a: string | undefined; b: string | undefined; value: unknown }
// Two full passes, not two back-to-back calls.
//
// Calling f() twice in a row puts both calls in the same millisecond, so a
// function that reads the clock returns the same value and looks deterministic.
// That is not a hypothetical: getStreamVortexOverlayData passed the paired-call
// version most of the time and failed about one run in eight, and the SEED had
// the same blind spot, so it was never declared either. Sampling noise in both
// the measurement and the allowlist built from it.
//
// Separating each function's two calls by a whole pass over the other 405 gives
// a real time gap for the same total number of calls — cheaper than sleeping
// per function, and it decides rather than samples.
const results: Result[] = []
const first: { c: Callable; a: string | undefined; value: unknown }[] = []
for (const c of callables) {
  try { const value = c.call(); first.push({ c, a: JSON.stringify(value), value }) } catch { /* not callable bare */ }
}
for (const { c, a, value } of first) {
  let b: string | undefined
  try { b = JSON.stringify(c.call()) } catch { /* second call threw; a !== b catches it */ }
  results.push({ where: c.where, a, b, value })
}

// ---------------------------------------------------- P1 determinism
// This layer bans Math.random and fork(), so a nullary export that answers
// differently twice is either holding mutable state or reading the clock.
// Both are legitimate for some things; neither may be silent.
const seedStateful: Record<string, string> = {}
for (const r of results) {
  if (r.a === r.b) continue
  seedStateful[r.where] = 'returns a different value on a second call with no arguments'
  check(`${r.where} is deterministic`, r.where in decl.stateful, 'undeclared state or clock dependence')
}
// No reverse check on `stateful`, unlike the other declarations. Calling a
// function twice can only ever DETECT non-determinism, never establish
// determinism: one that reads the clock returns the same value whenever both
// calls land in the same millisecond, which is most of the time. Requiring a
// declared entry to keep failing would make the suite fail at random, which is
// exactly what it did before this note existed. Undeclared non-determinism
// still fails, and that is the direction that finds things.

// ------------------------------------------- P2 digit sequences are digits
// A digit in this system is 0..9. An array of numbers that leaves that range
// is an angle or a frequency, which is fine, but must say so.
const seedNotDigits: Record<string, string> = {}
const isNumArray = (v: unknown): v is number[] =>
  Array.isArray(v) && v.length > 0 && v.every((x) => typeof x === 'number')
for (const r of results) {
  if (!isNumArray(r.value)) continue
  const bad = r.value.some((x) => !Number.isInteger(x) || x < 0 || x > 9)
  if (!bad) continue
  seedNotDigits[r.where] = 'returns numbers outside 0..9, so it is not a digit sequence'
  check(`${r.where} yields digits`, r.where in decl.notDigits, 'outside 0..9 and undeclared')
}

// ------------------------------------------------ P3 empty is a decision
// getTrinityAxisFromRodin returned [] because it filtered the doubling circuit
// for 3, 6 and 9 — which doubling_avoids_the_triad proves are never there. An
// empty array is how a function that cannot work looks from outside.
const seedEmpty: Record<string, string> = {}
for (const r of results) {
  if (!Array.isArray(r.value) || r.value.length !== 0) continue
  seedEmpty[r.where] = 'returns an empty array with no arguments'
  check(`${r.where} returns something`, r.where in decl.emptyByDesign, 'empty and undeclared')
}
for (const w of Object.keys(decl.emptyByDesign)) {
  const r = results.find((x) => x.where === w)
  if (r) check(`declaration emptyByDesign ${w}`, Array.isArray(r.value) && r.value.length === 0, 'it returns data now — drop the entry')
}

// ---------------------------------- P4 the doubling circuit is the doubling circuit
// The property the three broken copies of generateVortex all failed.
const DOUBLING_NAME = /vortex|rodin|orbit|doubling/i
const TRIAD: readonly number[] = VORTEX_AXIS
const seedTriad: Record<string, string> = {}
for (const r of results) {
  if (!DOUBLING_NAME.test(r.where)) continue
  if (!isNumArray(r.value)) continue
  if (r.value.some((x) => x > 9)) continue // an angle series, covered by P2
  const hasTriad = r.value.some((d) => TRIAD.includes(d))
  if (hasTriad) {
    seedTriad[r.where] = 'named for the doubling circuit but contains 3, 6 or 9'
    check(`${r.where} avoids the triad`, r.where in decl.triadByDesign, 'doubling cannot reach 3, 6 or 9')
    continue
  }
  // No triad: then every step must actually be a doubling step, and every
  // member must be in the kernel's orbit. This is what makes 1..9 impossible.
  const inOrbit = r.value.every((d) => VORTEX_ORBIT.includes(d))
  check(`${r.where} stays in the orbit`, inOrbit, JSON.stringify(r.value))
  if (inOrbit && r.value.length > 1) {
    const steps = r.value.every((d, i) => i === 0 || digitalRoot(r.value[i - 1]! * 2) === d)
    check(`${r.where} advances by doubling`, steps, JSON.stringify(r.value))
  }
}

// ------------------------------------------------- P5 no silent duplicates
// Two differently-named nullary functions returning the same value means at
// least one is not computing what its name says. That is how generateVortex
// was caught: it was byte-identical to generateConsciousness.
const byValue = new Map<string, string[]>()
for (const r of results) {
  if (r.a === undefined || r.a.length < 5 || r.a.length > 400) continue
  if (!byValue.has(r.a)) byValue.set(r.a, [])
  byValue.get(r.a)!.push(r.where)
}
const seedShared: Record<string, string> = {}
for (const [value, who] of byValue) {
  const distinct = new Set(who.map((w) => w.split(':')[1]!.split('.').pop()!))
  if (distinct.size < 2) continue // re-exports of one function are not duplicates
  const key = [...distinct].sort().join(' = ')
  seedShared[key] = value.length > 120 ? value.slice(0, 120) + '…' : value
  check(`no undeclared duplicate: ${key}`, key in decl.sharedValues, value.slice(0, 60))
}
for (const k of Object.keys(decl.sharedValues)) {
  check(`declaration sharedValues ${k}`, k in seedShared, 'these no longer agree — drop the entry')
}

// ------------------------------------------------------------- regressions
// Named, so the three specific defects this layer shipped cannot come back.
/** Only the members these regressions touch — `any` would defeat the point. */
type Seq = { A432Sequence: { generateVortex(n: number): number[]; generateVortexSequence(n: number): number[]; generateConsciousness(n: number): number[] } }
type Frac = {
  validateAllA432Fractions(): boolean
  validateA432Fraction(f: { numerator: number; denominator: number }): boolean
}
type Trin = { getTrinityAxisFromRodin(seq?: number[]): number[]; getTrinityTriangulationFromRodin(seq?: number[]): number[] }
const load = async <T>(name: string): Promise<T> => (await import(pathToFileURL(join(HERE, name)).href)) as T
const utils = await load<Seq>('a432.utils.ts')
const simple = await load<Seq>('a432.simple.ts')
const resolved = await load<Frac>('a432.resolved.ts')
const trinity = await load<Trin>('a432.trinity.ts')

const orbit = VORTEX_ORBIT.join()
check('utils.generateVortex is the orbit', utils.A432Sequence.generateVortex(VORTEX_ORBIT.length).join() === orbit)
check('simple.generateVortexSequence is the orbit', simple.A432Sequence.generateVortexSequence(VORTEX_ORBIT.length).join() === orbit)
check(
  'generateVortex differs from generateConsciousness',
  utils.A432Sequence.generateVortex(9).join() !== utils.A432Sequence.generateConsciousness(9).join(),
)
check('every declared A432 fraction validates', resolved.validateAllA432Fractions() === true)
check('the fraction validator still rejects a decimal', resolved.validateA432Fraction({ numerator: 4 / 5, denominator: 1 }) === false)
check('the fraction validator still rejects 2/4', resolved.validateA432Fraction({ numerator: 2, denominator: 4 }) === false)
// ---------------------------------------------------------------- gateways
// A gateway is not a label. The vortex stroke is a closed ten-step tour
// 1\2\4\8/7/5/3\6\9/0\1, each step drawn `\` or `/`, and a gateway is a digit
// whose outgoing stroke REVERSES from the one that arrived at it. There are
// exactly four. Re-derived here from the steps rather than compared against a
// stored list, so a change to the stroke has to survive the derivation.
const stroke = vortexStrokeGateways() as {
  gateways: number[]; steps: { from: number; to: number; stroke: string }[]; tour: number[]
}
const st = stroke.steps
const derivedGateways = st
  .filter((step, i) => step.stroke !== st[(i - 1 + st.length) % st.length]!.stroke)
  .map((step) => step.from)
check('gateways are the polarity reversals of the stroke', derivedGateways.join() === stroke.gateways.join(),
  `derived ${JSON.stringify(derivedGateways)} vs ${JSON.stringify(stroke.gateways)}`)
check('there are exactly four gateways', stroke.gateways.length === 4, JSON.stringify(stroke.gateways))
check('the tour is closed', st[st.length - 1]!.to === st[0]!.from)
check('the tour visits every digit once', new Set(stroke.tour).size === 10 && stroke.tour.length === 10)
check('the tour opens with the doubling orbit', stroke.tour.slice(0, VORTEX_ORBIT.length).join() === VORTEX_ORBIT.join())
// 6 is on the axis and is NOT a gateway: being on the axis is not what makes
// one, which is the whole reason they have to be derived rather than listed.
check('6 is on the axis but is not a gateway', VORTEX_AXIS.includes(6) && !stroke.gateways.includes(6))

check('the trinity axis derived from Rodin is the triad', trinity.getTrinityAxisFromRodin().join() === VORTEX_AXIS.join(),
  JSON.stringify(trinity.getTrinityAxisFromRodin()))
check('trinity triangulation uses its argument', trinity.getTrinityTriangulationFromRodin([1, 2, 4]).length !== trinity.getTrinityTriangulationFromRodin([3, 6, 9]).length,
  'same answer for different inputs: the parameter is ignored')

// -------------------------------------------------------------------- seed
if (SEED) {
  const seeded: Declarations = {
    browserOnly: seedBrowserOnly,
    stateful: seedStateful,
    notDigits: seedNotDigits,
    emptyByDesign: seedEmpty,
    triadByDesign: seedTriad,
    sharedValues: seedShared,
  }
  writeFileSync(DECL, JSON.stringify(seeded, null, 2) + '\n')
  const n = Object.values(seeded).reduce((s, o) => s + Object.keys(o).length, 0)
  console.log(`a432 test:seed wrote ${n} declarations to ${relative(ROOT, DECL)}`)
  process.exit(0)
}

console.log(
  `a432 properties — ${files.length} modules, ${loaded.length} loaded, ` +
    `${results.length} nullary exports called`,
)
for (const p of problems) console.error(`  ✗ ${p}`)
if (failures > 0) {
  console.error(`a432 tests FAIL — ${failures} problem(s)`)
  process.exit(1)
}
console.log('a432 tests ok — every property holds, and every declaration is still true')
process.exit(0)
