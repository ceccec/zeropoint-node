#!/usr/bin/env node
/**
 * Two modules may not start declaring the same exported name.
 *
 * This exists because the same defect turned up twice in two days, both times
 * under an `as any` cast that had been keeping the compiler quiet:
 *
 *   a432.system.ts and a432.index.ts each declare a class A432System and export
 *   an instance called a432System, and BOTH assign window.a432System. Whichever
 *   module loads second wins, and a consumer gets that one.
 *
 *   a432.block.chain.ts and a432.block.chain.event.ts each declare an interface
 *   A432Block, with different fields. Reading the wrong one's documentation
 *   while looking at the other one's value is how I spent twenty minutes
 *   convinced a UI was rendering undefined when it was not.
 *
 * A collision is two modules DECLARING the same exported name. A re-export is
 * not a collision — `export { X } from './y.ts'` is one definition reached by
 * two paths, which is the normal way a barrel works — so only declarations are
 * counted, read from the syntax tree rather than matched in the text.
 *
 * Sixty exist. Demanding sixty essays today would be a way of never starting,
 * so the file records them all with the modules that declare them, and the
 * check's job is that NO NEW ONE APPEARS and none of the recorded ones changes
 * shape underneath. A recorded collision with a reason is reviewed; one without
 * is merely known, and the report says how many of each — the same distinction
 * description:check makes about the npm description's claims.
 *
 * Counting is only half of it. A second pass IMPORTS the colliding modules and
 * compares what the name evaluates to, because two modules sharing a word is
 * harmless and two modules meaning different numbers by it is not. See THE
 * AGREEMENT PASS below.
 *
 *   npm run collisions:check
 *   npm run collisions:seed    record the current set
 */

import ts from 'typescript'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DECL = join(ROOT, 'scripts', 'name-collisions.json')
const SEED = process.argv.includes('--seed')

// Tracked files AND untracked ones that git would let you add. `git ls-files`
// alone cannot see a module that has not been staged yet, so a new file
// declaring a name another module already declares passed this check until the
// moment someone ran `git add` — the check would have said ok about code it had
// not read. Ignored paths stay ignored: --exclude-standard means node_modules
// and dist do not come back.
const listed = (args) => execSync(`git ls-files ${args} "src/**/*.ts"`, { cwd: ROOT, encoding: 'utf8' }).trim().split('\n')
const files = [...new Set([...listed(''), ...listed('--others --exclude-standard')])]
  .filter((f) => f && !f.endsWith('.test.ts') && !f.endsWith('.d.ts'))
  .sort()

/** The names a file DECLARES and exports. Re-exports are not declarations. */
function declaredExports(file) {
  let src
  try { src = readFileSync(join(ROOT, file), 'utf8') } catch { return [] }
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true)
  const out = []
  const exported = (n) => n.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
  sf.forEachChild((n) => {
    if (!exported(n)) return
    if (ts.isClassDeclaration(n) && n.name) out.push(n.name.text)
    else if (ts.isInterfaceDeclaration(n)) out.push(n.name.text)
    else if (ts.isTypeAliasDeclaration(n)) out.push(n.name.text)
    else if (ts.isEnumDeclaration(n)) out.push(n.name.text)
    else if (ts.isFunctionDeclaration(n) && n.name) out.push(n.name.text)
    else if (ts.isVariableStatement(n)) {
      for (const d of n.declarationList.declarations) {
        if (ts.isIdentifier(d.name)) out.push(d.name.text)
      }
    }
  })
  return out
}

const byName = new Map()
let declaredCount = 0
for (const f of files) {
  for (const name of declaredExports(f)) {
    declaredCount += 1
    if (!byName.has(name)) byName.set(name, new Set())
    byName.get(name).add(f)
  }
}
// A SET of modules, not a list of declarations. a432.experience.ui.ts declares
// both `interface A432ExperienceUI` and `const A432ExperienceUI` — the ordinary
// TypeScript idiom of a type and a value sharing a name in one declaration
// space each. Counting declarations reported that as a two-module collision
// against itself, which is a name that cannot possibly be ambiguous to anyone.
const live = new Map()
for (const [name, where] of byName) {
  if (where.size > 1) live.set(name, [...where].sort())
}

const recorded = existsSync(DECL) ? JSON.parse(readFileSync(DECL, 'utf8')) : { collisions: {} }

if (SEED) {
  const next = {}
  for (const [name, where] of [...live].sort(([a], [b]) => a.localeCompare(b))) {
    const before = recorded.collisions?.[name]
    next[name] = { files: where, ...(before?.reason ? { reason: before.reason } : {}) }
  }
  writeFileSync(DECL, JSON.stringify({ collisions: next }, null, 2) + '\n')
  console.log(`collisions:seed recorded ${Object.keys(next).length} name(s) to scripts/name-collisions.json`)
  process.exit(0)
}

const problems = []
const known = recorded.collisions ?? {}
for (const [name, where] of live) {
  const entry = known[name]
  if (!entry) {
    problems.push(`${name} is declared by ${where.length} modules and is not recorded: ${where.join(', ')}`)
    continue
  }
  const same = entry.files.length === where.length && entry.files.every((f, i) => f === where[i])
  if (!same) {
    problems.push(`${name} is recorded in [${entry.files.join(', ')}] but is now declared in [${where.join(', ')}]`)
  }
}
// A recorded collision that no longer exists is a stale entry, not a pass.
for (const name of Object.keys(known)) {
  if (!live.has(name)) problems.push(`${name} is recorded as a collision but is now declared in one module — delete the entry`)
}

/**
 * THE AGREEMENT PASS.
 *
 * Counting collisions says two modules use one word. It does not say whether
 * the word means one thing. calculateA432Frequency is declared twice: one
 * returns 432 * 2**octave, the other returns 432 * (n % 12) / 12. At n = 6 that
 * is 27648 and 216. Both are exported, both are reachable, and the collision
 * count was 60 before and after anyone noticed.
 *
 * So each recorded collision is EVALUATED. The modules are imported and the
 * name's value is compared across them:
 *
 *   agree      same value, or same output on every probe input
 *   differ     they are not the same thing and the difference is observable
 *   type-only  no runtime value on either side (an interface or a type alias)
 *   unprobed   a runtime value the comparison cannot decide (a class, a
 *              function whose arguments this cannot construct)
 *
 * `differ` must be recorded with a reason. An undeclared one fails, because an
 * undeclared one is the case above: a name that quietly means two numbers.
 * `agree` needs no reason and is a candidate for deletion — one of the two
 * declarations can import the other and the collision goes away.
 *
 * Probing is over the digit domain and a little past it, because that is the
 * domain of this repository: the vortex is base ten and every function that
 * takes a number here takes a digit. A function that throws for every probe is
 * unprobed, not agreeing — a pair of functions that both throw have not been
 * shown to be the same function.
 */

/** Structural equality that does not care about key order and survives NaN. */
function same(a, b, depth = 0) {
  if (depth > 6) return true
  if (Object.is(a, b)) return true
  if (typeof a !== typeof b) return false
  if (typeof a === 'number') return Object.is(a, b)
  if (a === null || b === null) return false
  if (typeof a !== 'object') return false
  if (Array.isArray(a) !== Array.isArray(b)) return false
  const ka = Object.keys(a), kb = Object.keys(b)
  if (ka.length !== kb.length) return false
  return ka.every((k) => kb.includes(k) && same(a[k], b[k], depth + 1))
}

/**
 * The inputs a function is tried on: the ten digits, a little past them, and a
 * few non-numbers.
 *
 * The domain is mostly digits because that is this repository's domain — the
 * vortex is base ten and nearly every function here takes one. The non-numbers
 * are there because the digits alone lied once: two getA432ModulesByCategory
 * take a CATEGORY, so every digit probe returned the empty list on both sides
 * and they were reported as agreeing while calling two different registries.
 *
 * `agree` therefore means AGREED ON THIS DOMAIN, which is evidence and not
 * proof. It is a reason to look at a pair, not a certificate that they are one
 * function. `differ` is the direction that carries proof: a single input on
 * which two declarations answer differently settles it.
 */
const PROBES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 27, -1, 'a432', 'core', { numerator: 1, denominator: 2 }, [1, 2, 4]]

/**
 * What one function does on the probe domain, or null if it does nothing.
 *
 * Probing CALLS the function, and some of these print. Two modules declaring a
 * `pulse` that logs its own colour wrote fourteen lines to stdout the first
 * time this ran, so writes are swallowed for the duration of the call — a check
 * whose own output is the code it is checking is unreadable.
 */
function trace(fn) {
  const out = []
  let answered = 0
  const write = process.stdout.write.bind(process.stdout)
  const err = process.stderr.write.bind(process.stderr)
  process.stdout.write = () => true
  process.stderr.write = () => true
  try {
    for (const p of PROBES) {
      try {
        const v = fn(p)
        if (typeof v === 'function' || v instanceof Promise) return null
        const s = JSON.stringify(v)
        // A function that returns nothing has said nothing. Four selfTest()s
        // that each log and return undefined are not thereby the same function,
        // and reporting them as agreeing would be this check asserting exactly
        // the thing it cannot see.
        if (s !== undefined) answered += 1
        out.push(s ?? 'undefined')
      } catch { out.push('throw') }
    }
  } finally {
    process.stdout.write = write
    process.stderr.write = err
  }
  return answered > 0 ? out.join('|') : null
}

/**
 * The shortest text that shows how two values differ, for the failure line.
 *
 * For functions this hunts for the FIRST probe input on which they part, rather
 * than printing input zero. Printing zero said "throw vs throw" for four of the
 * pairs it was reporting as different, which is a failure line that argues
 * against itself.
 */
function showDifference(name, values, files) {
  const label = (i) => files[i].split('/').pop()
  if (values.every((v) => typeof v === 'function')) {
    const traces = values.map((v) => trace(v)?.split('|') ?? [])
    const width = Math.max(...traces.map((t) => t.length))
    for (let k = 0; k < width; k++) {
      const col = traces.map((t) => t[k])
      if (col.every((c) => c === col[0])) continue
      const arg = typeof PROBES[k] === 'object' ? JSON.stringify(PROBES[k]) : JSON.stringify(PROBES[k])
      return values.map((_, i) => `${label(i)}: ${name}(${arg}) = ${clip(col[i])}`).join('  vs  ')
    }
  }
  return values.map((v, i) => {
    if (typeof v === 'function') {
      const t = trace(v)
      if (t) return `${label(i)}: ${name}(0) = ${clip(t.split('|')[0])}`
    }
    return `${label(i)}: ${describe(v)}`
  }).join('  vs  ')
}

const clip = (s) => (s === undefined ? 'undefined' : s.length > 90 ? s.slice(0, 90) + '…' : s)

/**
 * JSON.stringify drops methods, so an object of functions prints as {} and a
 * class prints as undefined — two different things, shown as nothing and
 * nothing. Where the JSON is empty the shape is described instead.
 */
function describe(v) {
  if (typeof v === 'function') return `class or function ${v.name || '(anonymous)'}`
  if (v && typeof v === 'object') {
    let json
    try { json = JSON.stringify(v) } catch { json = undefined }
    if (json === undefined || json === '{}') {
      let keys = []
      try { keys = Object.keys(v) } catch { keys = [] }
      return keys.length ? `object with { ${clip(keys.join(', '))} }` : 'object with no enumerable keys'
    }
    return clip(json)
  }
  return clip(JSON.stringify(v) ?? String(v))
}

const cache = new Map()
async function load(file) {
  if (cache.has(file)) return cache.get(file)
  let mod = null
  try { mod = await import(pathToFileURL(join(ROOT, file)).href) } catch { mod = null }
  cache.set(file, mod)
  return mod
}

const verdicts = new Map()
for (const [name, where] of live) {
  const mods = []
  for (const f of where) mods.push(await load(f))
  const present = mods.map((m) => (m && name in m ? m[name] : undefined))
  if (present.every((v) => v === undefined)) { verdicts.set(name, 'type-only'); continue }

  const kinds = new Set(present.map((v) => (v === undefined ? 'absent' : typeof v)))
  // A class and a function are both typeof 'function'; calling a class throws,
  // so the trace decides rather than the typeof.
  if (kinds.size === 1 && kinds.has('function')) {
    const traces = present.map((f) => trace(f))
    if (traces.some((t) => t === null)) { verdicts.set(name, 'unprobed'); continue }
    verdicts.set(name, traces.every((t) => t === traces[0]) ? 'agree' : 'differ')
    continue
  }
  if (present.some((v) => v === undefined)) { verdicts.set(name, 'unprobed'); continue }
  if (kinds.has('function')) { verdicts.set(name, 'differ'); continue }
  verdicts.set(name, present.every((v) => same(v, present[0])) ? 'agree' : 'differ')
}

const tally = { agree: 0, differ: 0, 'type-only': 0, unprobed: 0 }
for (const v of verdicts.values()) tally[v] += 1

// `npm run collisions:list` prints the verdict for every recorded collision, so
// the ones that agree — the ones where one declaration can simply import the
// other — can be found without reading sixty entries by hand.
if (process.argv.includes('--list')) {
  for (const [name, v] of [...verdicts].sort(([a], [b]) => a.localeCompare(b))) {
    console.log(`${v.padEnd(10)} ${name}  ${live.get(name).map((f) => f.split('/').pop()).join(' ')}`)
  }
  process.exit(0)
}

for (const [name, v] of verdicts) {
  if (v !== 'differ') continue
  if (!known[name]?.reason) {
    const where = live.get(name)
    problems.push(
      `${name} is declared by ${where.length} modules and they DISAGREE: `
      + `${showDifference(name, where.map((f) => cache.get(f)?.[name]), where)}. `
      + `Record why in scripts/name-collisions.json, or make one of them import the other.`)
  }
}
// A recorded reason on a collision that turns out to agree is not an error —
// two interfaces can have identical runtime absence and still be worth a note —
// but a reason claiming a difference that is gone would be a stale claim, and
// stale claims are what this repository's gates exist to catch. The text check
// above already fails when the declaring files change, which is when that
// happens.

const reviewed = Object.values(known).filter((e) => e.reason).length
console.log(
  `collisions:check — ${declaredCount} declared exports across ${files.length} modules; `
  + `${live.size} name(s) declared by more than one, ${reviewed} of them with a recorded reason`)
console.log(
  `collisions:check — agreement: ${tally.agree} agree, ${tally.differ} differ, `
  + `${tally['type-only']} type-only, ${tally.unprobed} unprobed`)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`collisions:check FAIL — ${problems.length} problem(s); if the new name is deliberate, npm run collisions:seed and give it a reason`)
  process.exit(1)
}
console.log('collisions:check ok — no module started declaring a name another module already declares, and every disagreement is recorded')
process.exit(0)
