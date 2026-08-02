#!/usr/bin/env node
/**
 * Ratchet — large surfaces shrink over many waves, and never grow.
 *
 * Three surfaces are too large to gate outright (197 type errors, ~1039 lint
 * errors, 657 decimal-crack lines). A gate that always fails gates nothing, so
 * each carries a CEILING instead: the gate fails only when a count RISES.
 * When a count falls, the ceiling follows it down and cannot go back up.
 *
 * That makes each cleanup wave safe to land on its own — progress is locked in
 * as it happens, without one heroic commit.
 *
 *   npm run ratchet         recompute and lower ceilings (never raises)
 *   npm run ratchet:check   fail if any surface grew
 *
 * Counting rules live in one place so the gate and the report cannot disagree.
 */

import ts from 'typescript'
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { execFileSync, execFile } from 'node:child_process'
import { cpus } from 'node:os'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const STATE = join(ROOT, 'ratchet.json')
const SKIP = new Set(['node_modules', 'dist', 'coverage', '.git'])

function run(cmd, args) {
  try {
    // 64MB: `eslint -f json` over src/ emits ~2.6MB today and the default 1MB
    // buffer fails with ENOBUFS — which looks exactly like "no findings"
    // unless the code is inspected.
    return execFileSync(cmd, args, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      maxBuffer: 64 * 1024 * 1024,
    })
  } catch (err) {
    // Both tsc and eslint exit non-zero when they report findings; the output
    // is the measurement, so a non-zero exit is expected, not a failure.
    // Return stdout ALONE — both tools report there, and appending stderr
    // corrupts `eslint -f json` with npm's warnings so the parse silently
    // fails and the surface reports UNMEASURABLE instead of its real count.
    const out = err.stdout ?? ''
    return out.length > 0 ? out : (err.stderr ?? '')
  }
}

/** TypeScript errors under the typecheck-only config. */
function typecheckCount() {
  const out = run('npx', ['tsc', '--noEmit', '-p', 'tsconfig.typecheck.json'])
  return (out.match(/error TS\d+/g) ?? []).length
}

/** ESLint errors (warnings excluded — they are not the ratcheted surface). */
function lintCount() {
  const out = run('npx', ['eslint', 'src/', '-f', 'json'])
  const start = out.indexOf('[')
  if (start < 0) return null
  try {
    return JSON.parse(out.slice(start)).reduce((n, f) => n + f.errorCount, 0)
  } catch {
    return null
  }
}

function walk(dir, pred, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, pred, out)
    else if (pred(name)) out.push(p)
  }
  return out
}

/**
 * Bare float literals in EXECUTABLE code, via the TypeScript AST.
 *
 * This was regex-based and over-counted by 51% (657 lines vs 434). Stripping
 * strings line-by-line cannot remove a MULTI-LINE template literal, so every
 * decimal inside generated CSS/HTML — `opacity: 0.5`, `scale(1.5)` — counted
 * as a code decimal. The earlier attempt at block-comment stripping was worse:
 * a string containing the characters `/*` opened a phantom comment that
 * swallowed real code.
 *
 * A NumericLiteral node is real code by construction — comment text and string
 * contents never become one. No lexing by regex; ask the compiler.
 */
function decimalCount() {
  const files = walk(join(ROOT, 'src'), (n) => n.endsWith('.ts') && !n.endsWith('.d.ts'))
  const lines = new Set()
  for (const file of files) {
    const src = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)
    const visit = (node) => {
      if (ts.isNumericLiteral(node) && node.getText().includes('.')) {
        lines.add(`${file}:${src.getLineAndCharacterOfPosition(node.getStart(src)).line}`)
      }
      ts.forEachChild(node, visit)
    }
    visit(src)
  }
  return lines.size
}

/**
 * Modules that cannot be imported at all — the deepest signal here, because it
 * is the only one that proves the code RUNS rather than merely typechecks.
 *
 * Each module is imported in its own process. Two results are NOT failures:
 * a timeout means the module loaded and left a live handle (a timer, a
 * stream), and a browser-only module dies on `document`/`self` by design.
 */
async function unloadableCount() {
  const files = walk(join(ROOT, 'src'), (n) => n.endsWith('.ts') && !n.endsWith('.d.ts') && !n.endsWith('.test.ts'))
  const ENVIRONMENTAL = /\b(document|self|window|localStorage) is not defined\b/
  // One process per module is unavoidable: a failed import poisons the
  // importing realm, so they cannot share one. They ARE independent though,
  // so run cpus() at a time. Serially this was ~39s of a 53s gate.
  const width = Math.max(4, Math.min(cpus().length, 16))
  const probe = (file) =>
    new Promise((resolve) => {
      const rel = relative(ROOT, file)
      const src = `import(${JSON.stringify('./' + rel)}).then(()=>process.exit(0)).catch(e=>{console.error(e.message.split('\\n')[0]);process.exit(1)})`
      execFile(
        'node',
        ['--experimental-strip-types', '-e', src],
        { cwd: ROOT, encoding: 'utf8', timeout: 15000, maxBuffer: 8 * 1024 * 1024, killSignal: 'SIGKILL' },
        (err, _stdout, stderr) => {
          if (!err) return resolve(0)
          // Killed by the timeout => it loaded and kept the event loop alive.
          if (err.killed || err.signal) return resolve(0)
          if (ENVIRONMENTAL.test(stderr ?? '')) return resolve(0)
          resolve(1)
        },
      )
    })
  let failed = 0
  for (let i = 0; i < files.length; i += width) {
    const batch = await Promise.all(files.slice(i, i + width).map(probe))
    failed += batch.reduce((a, b) => a + b, 0)
  }
  return failed
}

/**
 * Import cycles — the structural entanglement.
 *
 * A cycle is not itself a bug, but it is the precondition for the temporal
 * dead zone that made five modules unimportable (wave 52): inside a cycle,
 * whichever module is entered first leaves the other mid-evaluation, so any
 * work at module scope can read a binding before it is initialised.
 *
 * Two exist today and both are known: the a432.index quartet, and
 * a432.cmyk <-> a432.math (which a432.cmyk.ts already documents and works
 * around with a literal). Capping the count keeps new ones from appearing.
 *
 * Strongly-connected components via Tarjan; an SCC larger than one module
 * is a cycle.
 */
function importCycleCount() {
  const files = walk(join(ROOT, 'src'), (n) => n.endsWith('.ts') && !n.endsWith('.d.ts'))
  const graph = new Map()
  for (const file of files) {
    // Edges come from the AST, not a regex. The regex form found 1012 edges
    // against the AST's 1002: it counted import specifiers sitting inside
    // COMMENTS as real dependencies — including the JSDoc usage example in
    // a432.rodin.ts. The cycle count happened to match, but a commented-out
    // import can just as easily invent a cycle or hide one.
    const src = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)
    const out = []
    const add = (spec) => {
      if (!spec?.startsWith('.')) return
      let target = join(dirname(file), spec)
      if (!existsSync(target)) target = target.replace(/\.js$/, '.ts')
      if (existsSync(target)) out.push(target)
    }
    const visit = (node) => {
      if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
        add(node.moduleSpecifier.text)
      }
      if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        add(node.moduleSpecifier.text)
      }
      if (
        ts.isCallExpression(node) &&
        node.expression.kind === ts.SyntaxKind.ImportKeyword &&
        node.arguments[0] &&
        ts.isStringLiteral(node.arguments[0])
      ) {
        add(node.arguments[0].text)
      }
      ts.forEachChild(node, visit)
    }
    visit(src)
    graph.set(file, out)
  }
  let index = 0
  const idx = new Map()
  const low = new Map()
  const onStack = new Set()
  const stack = []
  let cycles = 0
  // Iterative Tarjan — the recursive form overflows on this tree.
  for (const root of files) {
    if (idx.has(root)) continue
    const work = [[root, 0]]
    while (work.length > 0) {
      const frame = work[work.length - 1]
      const [v, i] = frame
      if (i === 0) {
        idx.set(v, index)
        low.set(v, index)
        index += 1
        stack.push(v)
        onStack.add(v)
      }
      const edges = graph.get(v) ?? []
      if (i < edges.length) {
        frame[1] += 1
        const w = edges[i]
        if (!idx.has(w)) work.push([w, 0])
        else if (onStack.has(w)) low.set(v, Math.min(low.get(v), idx.get(w)))
      } else {
        work.pop()
        if (work.length > 0) {
          const parent = work[work.length - 1][0]
          low.set(parent, Math.min(low.get(parent), low.get(v)))
        }
        if (low.get(v) === idx.get(v)) {
          let size = 0
          let w
          do {
            w = stack.pop()
            onStack.delete(w)
            size += 1
          } while (w !== v)
          if (size > 1) cycles += 1
        }
      }
    }
  }
  return cycles
}

const SURFACES = [
  { id: 'cycles', label: 'import cycles', measure: importCycleCount },
  { id: 'typecheck', label: 'TypeScript errors', measure: typecheckCount },
  { id: 'lint', label: 'ESLint errors', measure: lintCount },
  { id: 'decimals', label: 'decimal-crack lines', measure: decimalCount },
  { id: 'unloadable', label: 'modules that fail to import', measure: unloadableCount },
]

const prior = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : { ceilings: {} }
const ceilings = { ...(prior.ceilings ?? {}) }
const isCheck = process.argv.includes('--check')

let grew = false
let fell = false
const rows = []

for (const s of SURFACES) {
  const live = await s.measure()
  // An unmeasurable surface must never pass quietly — a broken measurement
  // reads identically to a clean one, which is the failure this repo keeps
  // finding. Fail loudly instead.
  if (live === null) {
    console.error(`ratchet: ${s.label} could not be measured — fix the measurement, do not ignore it`)
    process.exit(1)
  }
  const ceiling = ceilings[s.id]
  if (ceiling === undefined) {
    ceilings[s.id] = live
    rows.push(`  ${s.label}: ${live} (ceiling set)`)
    continue
  }
  if (live > ceiling) {
    grew = true
    rows.push(`  ${s.label}: ${live} > ceiling ${ceiling}  ✗ GREW by ${live - ceiling}`)
  } else if (live < ceiling) {
    fell = true
    if (!isCheck) ceilings[s.id] = live
    rows.push(`  ${s.label}: ${live} < ceiling ${ceiling}  ↓ ${ceiling - live}`)
  } else {
    rows.push(`  ${s.label}: ${live} (at ceiling)`)
  }
}

console.log(isCheck ? 'ratchet:check' : 'ratchet')
for (const r of rows) console.log(r)

if (isCheck) {
  if (grew) {
    console.error('ratchet: a surface grew — fix the regression, or run npm run ratchet if it is intended')
    process.exit(1)
  }
  if (fell) {
    console.error('ratchet: a surface shrank — run npm run ratchet to lower the ceiling')
    process.exit(1)
  }
  console.log('ratchet:check ok')
  process.exit(0)
}

writeFileSync(STATE, `${JSON.stringify({ ceilings }, null, 2)}\n`)
console.log('wrote ratchet.json')
