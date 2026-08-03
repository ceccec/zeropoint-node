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

import { scanClaims } from './prose-claims.mjs'
import { scanTautologies, selfTest as tautologySelfTest } from './facet-tautology.mjs'
import { ts, config, walk as scanWalk, sourceFiles, parseTs, importTargets, readCapped } from './lib/scan.mjs'
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, unlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { pathToFileURL } from 'node:url'
import { execFileSync, execFile } from 'node:child_process'
import { cpus } from 'node:os'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const STATE = join(ROOT, 'ratchet.json')
let probeSeq = 0

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

// walk / skip-set / AST parsing all live in ./lib/scan.mjs now — one
// implementation, one memoised parse shared by every surface below.
function walk(dir, pred, out = []) {
  return scanWalk(dir, pred, { out })
}

/**
 * Bare float literals in EXECUTABLE code, via the TypeScript AST.
 *
 * Implements lobe L's law `decimalsInCodeAreCracks` (ceccec.github.io):
 * a bare float is a crack; carry an integer ratio bound to a named constant.
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
      // A temp FILE, not `node -e`. Under -e the module's own filename is
      // "[eval]", so any module that inspects it sees the wrong name —
      // a432.1.2.4.8.7.5.1.ts has a deliberate filename-integrity guard and
      // threw under the probe while importing perfectly from a real file. The
      // measurement was manufacturing the failure it reported.
      const probeFile = join(tmpdir(), `zp-probe-${process.pid}-${probeSeq++}.mjs`)
      writeFileSync(
        probeFile,
        `import(${JSON.stringify(pathToFileURL(file).href)}).then(()=>process.exit(0)).catch(e=>{console.error(e.message.split('\\n')[0]);process.exit(1)})`,
      )
      execFile(
        'node',
        ['--experimental-strip-types', probeFile],
        { cwd: ROOT, encoding: 'utf8', timeout: 15000, maxBuffer: 8 * 1024 * 1024, killSignal: 'SIGKILL' },
        (err, _stdout, stderr) => {
          try { unlinkSync(probeFile) } catch { /* best effort */ }
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

/**
 * Modules reachable from NO entry point — dead weight.
 *
 * Entries are every rollup input, every package.json exports target, the
 * kernel / mcp / smoke entries, AND every .ts a src/ HTML page imports. That
 * last set matters: counting only the package entries reports 337 dead files,
 * but 25 modules are loaded directly by browser pages, and following those
 * brings the real figure to 281. Measuring without the HTML would have
 * condemned 56 live files.
 *
 * Capping it means dead code can only shrink. Deletion can then land in small
 * reviewed batches instead of one irreversible sweep.
 */
function unreachableCount() {
  const isTs = (n) => n.endsWith('.ts') && !n.endsWith('.d.ts')
  const all = walk(join(ROOT, 'src'), isTs)
  const depsOf = (file) => {
    const src = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)
    const out = []
    const add = (spec) => {
      if (!spec?.startsWith('.')) return
      let t = resolve(dirname(file), spec)
      if (!existsSync(t)) t = t.replace(/\.js$/, '.ts')
      if (existsSync(t) && t.endsWith('.ts')) out.push(t)
    }
    const visit = (n) => {
      if (ts.isImportDeclaration(n) && ts.isStringLiteral(n.moduleSpecifier)) add(n.moduleSpecifier.text)
      if (ts.isExportDeclaration(n) && n.moduleSpecifier && ts.isStringLiteral(n.moduleSpecifier)) add(n.moduleSpecifier.text)
      if (ts.isCallExpression(n) && n.expression.kind === ts.SyntaxKind.ImportKeyword &&
          n.arguments[0] && ts.isStringLiteral(n.arguments[0])) add(n.arguments[0].text)
      ts.forEachChild(n, visit)
    }
    visit(src)
    return out
  }
  const roots = new Set()
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
  const rollup = readFileSync(join(ROOT, 'rollup.config.js'), 'utf8')
  for (const m of rollup.matchAll(/['"](src\/[^'"]+\.ts)['"]/g)) {
    const p2 = join(ROOT, m[1])
    if (existsSync(p2)) roots.add(p2)
  }
  for (const cond of Object.values(pkg.exports ?? {})) {
    for (const target of Object.values(cond ?? {})) {
      if (typeof target === 'string' && target.endsWith('.ts')) {
        const p2 = join(ROOT, target.slice(2))
        if (existsSync(p2)) roots.add(p2)
      }
    }
  }
  // Test files count as entries ONLY when a check-pipeline script executes
  // them (smoke.test.ts via test:kernel, the security suites via test:security)
  // — an entry is something that runs, not something that merely exists.
  for (const e of [
    'src/kernel/index.ts',
    'src/0/index.ts',
    'src/mcp/server.ts',
    'src/kernel/smoke.test.ts',
    'src/security/quantum-fold-cipher.test.ts',
    'src/security/quantum-state-tomography.test.ts',
    'src/security/quantum-proofs.test.ts',
  ]) {
    const p2 = join(ROOT, e)
    if (existsSync(p2)) roots.add(p2)
  }
  for (const html of walk(join(ROOT, 'src'), (n) => n.endsWith('.html'))) {
    const txt = readFileSync(html, 'utf8')
    for (const m of txt.matchAll(/['"](\.\/[A-Za-z0-9._-]+\.ts)['"]/g)) {
      const t = resolve(dirname(html), m[1])
      if (existsSync(t)) roots.add(t)
    }
  }
  const seen = new Set()
  const queue = [...roots]
  while (queue.length > 0) {
    const f = queue.pop()
    if (seen.has(f)) continue
    seen.add(f)
    for (const d of depsOf(f)) if (!seen.has(d)) queue.push(d)
  }
  return all.filter((f) => !seen.has(f)).length
}

/**
 * Prose claims that assert a physical, medical or consciousness EFFECT as fact
 * without bounding it. Every other surface here reads code; this is the only
 * one that reads a sentence, and it is the only reason the docs could assert
 * zero-point harvesting and healing frequencies while the kernel's own honesty
 * ledger refuses exactly those claims. See scripts/prose-claims.mjs.
 */
function proseClaimCount() {
  return scanClaims().length
}

/**
 * Boolean claims that cannot be false — see scripts/facet-tautology.mjs.
 *
 * Returns null (which this gate treats as fatal) when the predicate's own
 * self-test fails: a broken matcher reports zero, and zero is exactly what a
 * clean repo reports. An unverified measurement must not read as success.
 */
function tautologyCount() {
  if (tautologySelfTest().length > 0) return null
  return scanTautologies().length
}

const SURFACES = [
  { id: 'prose', label: 'unbounded effect claims in prose', measure: proseClaimCount },
  { id: 'tautology', label: 'boolean claims that cannot be false', measure: tautologyCount },
  { id: 'unreachable', label: 'modules reachable from no entry', measure: unreachableCount },
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
