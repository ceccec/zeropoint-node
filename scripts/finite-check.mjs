#!/usr/bin/env node
/**
 * No exported value may be Infinity or NaN.
 *
 * A repository that bans Math.* and decimal literals to keep arithmetic exact
 * was nevertheless exporting a constant array whose first element was Infinity,
 * and a live object containing a NaN. Both came from unguarded division by
 * zero, and both were reached from digit 0 — the void, the FIRST digit of this
 * repository's own sequence, so neither was an edge case.
 *
 *   FIBONACCI_RATIOS[0]                     1 / F(0) = 1 / 0
 *   a432WaveEnergy ... wavelength           c / 0
 *   a432WaveEnergy ... resonance            sum of 1 / 0
 *   a432WaveEnergy ... consciousness        digitalRoot(round(Infinity)) = NaN
 *
 * The last one is why this check exists rather than a lint rule about division.
 * Infinity is loud and arguably correct — a zero-frequency wave really does
 * have no spatial period. NaN is what Infinity BECOMES once it meets ordinary
 * arithmetic, and by then the origin is several functions away. Catching the
 * value is cheaper than tracing the cause.
 *
 * Every module is imported and every export walked, including nested arrays and
 * objects. Anything non-finite fails. There is no allowlist: unlike an unlinked
 * page or a retyped constant, a NaN in an exported value has no legitimate
 * version — if a quantity is genuinely undefined, the type should say so
 * instead of encoding it as a number that poisons every sum it touches.
 *
 * SECOND PASS: what a function RETURNS.
 *
 * The walk above skips functions, because a function is not a number. That
 * left the whole defect class where the NaN does not exist until someone
 * calls: 17 exported functions returned Infinity or NaN for inputs their own
 * signatures accept, and this check reported ok on every one of them. The
 * worst inflated a verification claim — an end-to-end benchmark divided by a
 * classical optimum of 0, and `hybrid_improvement > 1` is satisfied by
 * Infinity, so the BETTER the classical baseline the more improvement the
 * hybrid reported.
 *
 * So every exported function whose parameters are all of a type this file can
 * construct is called, with a typical value AND a degenerate one (0, '', []),
 * and its return value is walked the same way. Throwing is a pass: rejecting
 * an input is the honest answer, and several of the fixes above are exactly
 * that. Only a returned non-finite number fails.
 *
 * Here an allowlist IS required, and the difference from the first pass is
 * real. A non-finite exported CONSTANT is always a mistake. A non-finite
 * RETURN is sometimes the correct answer in the extended reals: log(0) is a
 * limit, max() over no arguments is the identity element -Infinity, and a
 * round trip at zero efficiency really does require infinite input. Those are
 * defined values that happen to be non-finite, not undefined ones. Each is
 * named in EXPECTED below with its reason, and the list cannot rot: an entry
 * that STOPS being non-finite fails too, so a guard added later forces the
 * justification to be deleted with it.
 *
 * Ends with an explicit process.exit: several modules here hold the event loop
 * open after importing cleanly, so without it this check imports everything,
 * prints its verdict, and then never returns.
 *
 *   npm run finite:check
 */

import ts from 'typescript'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function walk(dir, out = []) {
  for (const n of readdirSync(dir)) {
    if (n === 'node_modules') continue
    const full = join(dir, n)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (n.endsWith('.ts') && !n.endsWith('.d.ts') && !n.endsWith('.test.ts')) out.push(full)
  }
  return out
}

const files = walk(join(ROOT, 'src')).sort()
const problems = []
let modules = 0
let values = 0

for (const file of files) {
  const rel = relative(ROOT, file).replace(/\\/g, '/')
  let mod
  try {
    mod = await import(pathToFileURL(file).href)
  } catch {
    continue // load failures are the ratchet's business, not this check's
  }
  modules++

  const seen = new WeakSet()
  const scan = (val, path, depth) => {
    if (depth > 6) return
    if (typeof val === 'number') {
      values++
      if (!Number.isFinite(val)) problems.push(`${rel}: ${path} = ${val}`)
      return
    }
    if (val === null || typeof val !== 'object') return
    if (seen.has(val)) return
    seen.add(val)
    if (Array.isArray(val)) {
      // Long arrays are sampled at both ends: a full walk of a 10k-element
      // buffer costs more than it finds, and these defects sit at index 0.
      const idx = val.length <= 64 ? val.keys() : [0, 1, 2, val.length - 2, val.length - 1]
      for (const i of idx) scan(val[i], `${path}[${i}]`, depth + 1)
      return
    }
    for (const [k, v] of Object.entries(val)) {
      if (typeof v === 'function') continue
      scan(v, `${path}.${k}`, depth + 1)
    }
  }

  for (const [k, v] of Object.entries(mod)) {
    if (typeof v === 'function') continue
    try { scan(v, k, 0) } catch { /* exotic getters are not this check's business */ }
  }
}

// ── Second pass: call every export this file can supply arguments for ──────
//
// Declared non-finite returns. Key is `basename::export`; the value says why
// the extended-real answer is the correct one.
const EXPECTED = new Map([
  ['algebra.ts::min', 'min() over no arguments is the identity element Infinity'],
  ['algebra.ts::max', 'max() over no arguments is the identity element -Infinity'],
  ['algebra.ts::log', 'log(0) is a limit, not a domain error: -Infinity'],
  ['algebra.ts::log2', 'log2 inherits log(0) = -Infinity'],
  ['free-energy.ts::roundTrip', 'zero electrolysis efficiency requires infinite input'],
])

// A typical value and the degenerate ones, per declared parameter type. A type
// absent here means the export is not called — reported, never silently.
const CANDIDATES = {
  'number': [3, 0],
  'string': ['3', ''],
  'boolean': [true],
  'number[]': [[1, 2, 4, 8, 7, 5], []],
  'readonly number[]': [[1, 2, 4, 8, 7, 5], []],
  'string[]': [['a'], []],
  'Digit': [3],
  'Fraction': [{ numerator: 1, denominator: 2 }],
}
function candidatesFor(t) {
  if (typeof t !== 'string') return null
  const s = t.trim()
  // A union of number literals: the first member is in the domain by construction.
  if (/^-?\d+( \| -?\d+)+$/.test(s)) return [Number(s.split('|')[0].trim())]
  return CANDIDATES[s] ?? null
}
const product = (lists) => lists.reduce((acc, l) => acc.flatMap((a) => l.map((x) => [...a, x])), [[]])

// Several of these print when called. Their output is not this check's verdict.
function quiet() {
  const saved = { log: console.log, warn: console.warn, error: console.error, info: console.info }
  const out = process.stdout.write.bind(process.stdout)
  console.log = console.warn = console.error = console.info = () => {}
  process.stdout.write = () => true
  return () => { Object.assign(console, saved); process.stdout.write = out }
}

let calls = 0
let uncallable = 0
const sawNonFinite = new Set()

for (const file of files) {
  const rel = relative(ROOT, file).replace(/\\/g, '/')
  let source
  try { source = readFileSync(file, 'utf8') } catch { continue }
  if (!source.includes('export function ')) continue

  // Ask the compiler which exports there are and what their parameters are
  // declared as. A regex over this source would also match the prose above.
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true)
  const sigs = new Map()
  sf.forEachChild(function visit(n) {
    if (
      ts.isFunctionDeclaration(n) && n.name &&
      n.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      sigs.set(n.name.text, n.parameters.map((p) => (p.type ? p.type.getText() : null)))
    }
    ts.forEachChild(n, visit)
  })
  if (sigs.size === 0) continue

  let mod
  const restore0 = quiet()
  try { mod = await import(pathToFileURL(file).href) } catch { restore0(); continue }
  restore0()

  const base = rel.replace(/.*\//, '')
  for (const [name, params] of sigs) {
    const fn = mod[name]
    if (typeof fn !== 'function') continue
    const lists = params.map(candidatesFor)
    if (lists.some((l) => l === null)) { uncallable++; continue }
    for (const args of product(lists)) {
      const restore = quiet()
      let value
      let threw = false
      try { value = fn(...args) } catch { threw = true }
      restore()
      calls++
      if (threw) continue // rejecting an input is the honest answer
      const found = []
      const seen = new WeakSet()
      const walk = (v, path, depth) => {
        if (depth > 6) return
        if (typeof v === 'number') { if (!Number.isFinite(v)) found.push(`${path || '<return>'} = ${v}`); return }
        if (v === null || typeof v !== 'object' || seen.has(v)) return
        seen.add(v)
        for (const [k, x] of Object.entries(v)) {
          if (typeof x === 'function') continue
          walk(x, path ? `${path}.${k}` : k, depth + 1)
        }
      }
      try { walk(value, '', 0) } catch { /* exotic getters are not this check's business */ }
      if (found.length > 0) {
        const key = `${base}::${name}`
        sawNonFinite.add(key)
        if (!EXPECTED.has(key)) {
          problems.push(`${rel}: ${name}(${JSON.stringify(args).slice(1, -1)}) returned ${found.slice(0, 3).join(', ')}`)
        }
        break
      }
    }
  }
}

// An expectation that no longer holds is a stale justification, not a pass.
for (const [key, why] of EXPECTED) {
  if (!sawNonFinite.has(key)) {
    problems.push(`${key} is declared non-finite ("${why}") but returned finite values — delete the entry`)
  }
}

console.log(`finite:check — ${modules} modules imported, ${values} exported number(s) walked`)
console.log(`finite:check — ${calls} call(s) across exported functions, ${uncallable} export(s) with a parameter type this check cannot construct`)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`finite:check FAIL — ${problems.length} non-finite exported value(s)`)
  process.exit(1)
}
console.log('finite:check ok — no exported value is Infinity or NaN')
process.exit(0)
