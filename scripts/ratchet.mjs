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
import { pipelineFiles } from './lib/pipeline.mjs'
import { checkedReadmeLines } from './lib/readme-figures.mjs'
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

/**
 * Failing assertions in the framework test file that nothing used to run.
 *
 * src/multidimensional-vortex-framework.test.ts has 122 expect() calls and was
 * executed by nothing — not package.json, not the gate, not CI. It sat outside
 * LEAN, which is how it surfaced. The first time it ever ran, 7 assertions
 * disagreed with the implementation.
 *
 * One was conclusively the code's fault and is fixed: calculatePhaseRelationship
 * neither normalised its inputs modulo 360 nor took the shorter arc, so 10 and
 * 350 — twenty degrees apart — reported 340.
 *
 * The remaining 6 are disagreements about intended DESIGN (does a token's angle
 * track the global index, or its position within a coil?) and adjudicating them
 * from outside would be guessing. They are ratcheted instead: the file now runs
 * on every gate, and the count can only come down.
 */
function frameworkTestFailures() {
  const out = run('node', ['--experimental-strip-types', 'scripts/jest-lite.mjs',
    'src/multidimensional-vortex-framework.test.ts', '--count'])
  const line = (out ?? '').trim().split('\n').filter((l) => /^\d+\s+\d+$/.test(l.trim())).pop()
  if (!line) return null
  return Number(line.trim().split(/\s+/)[1])
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
  const hung = []
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
        // The marker is the whole point. A module that finishes importing and
        // then holds the event loop open, and a module still looping at module
        // scope, are both killed by the timeout and look IDENTICAL from the
        // outside. Printing after the import resolves is what tells them apart:
        // if the timeout fires and the marker was never written, the import
        // never completed and the module is genuinely unloadable.
        `import(${JSON.stringify(pathToFileURL(file).href)}).then(()=>{console.log('ZP-IMPORT-RESOLVED');process.exit(0)}).catch(e=>{console.error(e.message.split('\\n')[0]);process.exit(1)})`,
      )
      execFile(
        'node',
        ['--experimental-strip-types', probeFile],
        { cwd: ROOT, encoding: 'utf8', timeout: 15000, maxBuffer: 8 * 1024 * 1024, killSignal: 'SIGKILL' },
        (err, stdout, stderr) => {
          try { unlinkSync(probeFile) } catch { /* best effort */ }
          if (!err) return resolve(0)
          if (err.killed || err.signal) {
            // Timed out. Loadable ONLY if the import actually resolved first;
            // otherwise it is still evaluating and never produced its exports.
            if ((stdout ?? '').includes('ZP-IMPORT-RESOLVED')) return resolve(0)
            hung.push(rel)
            return resolve(1)
          }
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
  for (const h of hung) console.error(`  unloadable: ${h} never finished evaluating (timed out before its import resolved)`)
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
/** Resolved rollup inputs, from the config object rather than its text. */
function rollupInputs() {
  const text = readFileSync(join(ROOT, 'rollup.config.js'), 'utf8')
  // The config is ESM and importing it synchronously here is not possible, so
  // the template-literal form is expanded instead: capture the base constant
  // and every `${BASE}/name.ts` that uses it, plus any plain quoted path.
  const roots = new Set()
  const bases = new Map()
  for (const m of text.matchAll(/const\s+([A-Z0-9_]+)\s*=\s*'([^']+)'/g)) bases.set(m[1], m[2])
  for (const m of text.matchAll(/`\$\{([A-Z0-9_]+)\}\/([A-Za-z0-9._/-]+\.ts)`/g)) {
    const base = bases.get(m[1])
    if (base) roots.add(`${base}/${m[2]}`)
  }
  for (const m of text.matchAll(/['"](src\/[^'"]+\.ts)['"]/g)) roots.add(m[1])
  return [...roots]
}

/**
 * Modules reachable from no declared entry — STATIC reachability, and nothing more.
 *
 * This number is easy to read as dead weight. It is not, and I misread it that
 * way for a whole session, including in two published changelogs. It walks
 * `import` and `export ... from` declarations, so it cannot see a dynamic
 * import — and the a432 property suite reaches its 198 modules by walking the
 * directory and calling import() on each. 120 of the 126 modules this reports
 * execute on every gate run.
 *
 * Measured with a loader hook: a full `npm run check` loads all 267 modules in
 * src/. Nothing here is dead.
 *
 * What this number IS good for is knowing what ships through a declared entry,
 * which is a real question about bundling and public surface. For "what does
 * nothing exercise", see scripts/exercised-check.mjs, which records actual
 * loads instead of inferring them.
 */
/**
 * README bytes that no generator guards.
 *
 * Three blocks of README.md are generated and checked — VORTEX, SPECTRUM,
 * VERSION — and they hold up: damage inside the SPECTRUM block is caught by
 * spectrum:check and correctly ignored by the other two. They are 17% of the
 * file.
 *
 * A correction to what I first wrote here. I claimed the remaining bytes were
 * "read by nothing", having probed seven checkers with forty corrupted bytes
 * of prose. Two scripts that DO read README.md were not among the seven.
 * docs:commands walks every .md file from the root and verifies that each
 * documented command names a script or file that exists; version-cidr checks
 * the colour law stated in the README against the code. So the front page is
 * not unread. Its command references and its colour arithmetic are checked.
 *
 * What is unchecked is the prose: the claims about what this package is, what
 * it does, and what it is for. Corrupting forty bytes of that passes every
 * check in the pipeline, which is the thing worth counting and the reason this
 * number exists.
 *
 * It is not a demand that the README be generated — prose that explains intent
 * should be written by a person. It is a ceiling, so the share of the front
 * page that no machine can contradict shrinks as claims move into blocks
 * something recomputes.
 */
const checkedReadmeLinesSync = await (async () => {
  try {
    return await checkedReadmeLines(ROOT, readFileSync(join(ROOT, 'README.md'), 'utf8'))
  } catch {
    return new Set() // README missing: nothing to credit
  }
})()

function unguardedReadmeBytes() {
  const readme = join(ROOT, 'README.md')
  if (!existsSync(readme)) return 0
  const text = readFileSync(readme, 'utf8')
  const allLines = text.split('\n')
  const checkedLines = [...checkedReadmeLinesSync].map((n) => allLines[n - 1] ?? '')
  let guarded = 0
  for (const name of ['VORTEX', 'SPECTRUM', 'VERSION']) {
    const begin = text.indexOf(`<!-- ${name}:BEGIN`)
    if (begin < 0) continue
    const endMark = `<!-- ${name}:END -->`
    const end = text.indexOf(endMark, begin)
    if (end < 0) continue
    guarded += end + endMark.length - begin
  }
  // A line whose figure readme:facts recomputes is not unguarded prose — a
  // machine can and does contradict it. Those lines were counted here while
  // the README said 25 theorems, 25 again, 22 seals and eight ratchet
  // surfaces, and the real answers were 26, 26, 26 and 12.
  for (const line of checkedLines) guarded += Buffer.byteLength(line + '\n', 'utf8')
  return Buffer.byteLength(text, 'utf8') - guarded
}

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
  // Rollup inputs are read from the CONFIG OBJECT. The config builds them with
  // template literals, so a regex over its text matches nothing and every
  // bundle entry was being counted as unreachable — 8 modules' worth.
  for (const input of rollupInputs()) {
    const p2 = join(ROOT, input)
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
  // them — an entry is something that RUNS, not something that merely exists.
  //
  // That rule used to be enforced by a hand-written list, and the list drifted
  // twice: test:security runs four suites and only three were listed, so
  // post-quantum-crypto.test.ts counted as dead weight while executing on every
  // gate run. A list that restates what package.json already says will drift
  // again. So the pipeline is now READ instead of transcribed: expand `check`
  // through its `npm run` references and take every .ts path it actually names.
  for (const e of ['src/kernel/index.ts', 'src/0/index.ts', 'src/mcp/server.ts']) {
    const p2 = join(ROOT, e)
    if (existsSync(p2)) roots.add(p2)
  }
  // The same derivation coverage-audit checks itself against — one
  // implementation, so the two cannot disagree about what the pipeline runs.
  for (const f of pipelineFiles(ROOT)) {
    const p2 = join(ROOT, f)
    if (f.endsWith('.ts') && existsSync(p2)) roots.add(p2)
  }
  // Both trees: public/ pages reference src/ modules by full path, and looking
  // only inside src/ missed 17 of them.
  for (const dir of ['src', 'public']) {
    const base = join(ROOT, dir)
    if (!existsSync(base)) continue
    for (const html of walk(base, (n) => n.endsWith('.html'))) {
      const txt = readFileSync(html, 'utf8')
      for (const m of txt.matchAll(/['"](\.\/[A-Za-z0-9._-]+\.ts)['"]/g)) {
        const t = resolve(dirname(html), m[1])
        if (existsSync(t)) roots.add(t)
      }
      for (const m of txt.matchAll(/['"]((?:\.\.\/)*src\/[A-Za-z0-9._/-]+\.ts)['"]/g)) {
        const t = resolve(dirname(html), m[1])
        if (existsSync(t)) roots.add(t)
      }
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

/**
 * Functions the documentation declares that the source does not have.
 *
 * 100 across 23 documents. Not one mistake — the residue of a codebase reshaped
 * while its prose stayed put. See scripts/docs-functions.mjs.
 */
function docFunctionCount() {
  const out = run('node', ['scripts/docs-functions.mjs', '--count'])
  const line = (out ?? '').trim().split('\n').map((l) => l.trim()).filter((l) => /^\d+$/.test(l)).pop()
  return line ? Number(line) : null
}

/**
 * Advertised entry points a consumer cannot import.
 *
 * package.json advertises 22 subpaths; 10 resolve to src/*.ts, and Node refuses
 * to strip types under node_modules. See scripts/entrypoints-usable.mjs.
 */
function brokenEntryPointCount() {
  const out = run('node', ['scripts/entrypoints-usable.mjs', '--count'])
  const line = (out ?? '').trim().split('\n').map((l) => l.trim()).filter((l) => /^\d+$/.test(l)).pop()
  return line ? Number(line) : null
}

const SURFACES = [
  { id: 'prose', label: 'unbounded effect claims in prose', measure: proseClaimCount },
  { id: 'tautology', label: 'boolean claims that cannot be false', measure: tautologyCount },
  { id: 'unguardedReadme', label: 'README bytes no generator guards', measure: unguardedReadmeBytes },
  { id: 'unreachable', label: 'modules reachable from no STATIC entry (not dead: see exercised:check)', measure: unreachableCount },
  { id: 'cycles', label: 'import cycles', measure: importCycleCount },
  { id: 'typecheck', label: 'TypeScript errors', measure: typecheckCount },
  { id: 'lint', label: 'ESLint errors', measure: lintCount },
  { id: 'frameworkTests', label: 'failing assertions in the framework test file', measure: frameworkTestFailures },
  { id: 'decimals', label: 'decimal-crack lines', measure: decimalCount },
  { id: 'docFunctions', label: 'documented functions absent from src', measure: docFunctionCount },
  { id: 'entryPoints', label: 'advertised entry points a consumer cannot import', measure: brokenEntryPointCount },
  { id: 'unloadable', label: 'modules that fail to import', measure: unloadableCount },
]

const prior = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : { ceilings: {} }
const ceilings = { ...(prior.ceilings ?? {}) }
const isCheck = process.argv.includes('--check')
const raise = (process.argv.find((a) => a.startsWith('--raise=')) ?? '').split('=')[1] ?? null
const reason = (process.argv.find((a) => a.startsWith('--reason=')) ?? '').split('=').slice(1).join('=')
if (raise && !reason) {
  console.error('ratchet: --raise needs --reason="why this increase is correct"')
  process.exit(2)
}
let raisedNow = null

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
    // A ceiling can be RAISED, but only by naming the surface and giving a
    // reason. A ratchet that can never rise makes writing documentation
    // impossible — this surface counts README prose, and adding a true
    // section to the README is not a regression. A ratchet that rises
    // silently is not a ratchet. So: explicit, one surface at a time, with
    // the reason recorded in ratchet.json where the next person will see it.
    if (!isCheck && raise === s.id) {
      raisedNow = { id: s.id, from: ceiling, to: live, reason }
      ceilings[s.id] = live
      rows.push(`  ${s.label}: ${live} > ceiling ${ceiling}  ↑ RAISED by ${live - ceiling} — ${reason}`)
    } else {
      grew = true
      rows.push(`  ${s.label}: ${live} > ceiling ${ceiling}  ✗ GREW by ${live - ceiling}`)
    }
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
    // The old message said "run npm run ratchet if it is intended". It did
    // nothing: the writer only ever lowered. I followed my own advice and
    // watched it silently fail.
    console.error(
      'ratchet: a surface grew — fix the regression, or raise that one ceiling deliberately:\n'
      + '  npm run ratchet -- --raise=<surface> --reason="why this increase is correct"',
    )
    process.exit(1)
  }
  if (fell) {
    console.error('ratchet: a surface shrank — run npm run ratchet to lower the ceiling')
    process.exit(1)
  }
  console.log('ratchet:check ok')
  process.exit(0)
}

const priorRaises = (() => { try { return JSON.parse(readFileSync(STATE, 'utf8')).raised ?? {} } catch { return {} } })()
const raised = raisedNow ? { ...priorRaises, [raisedNow.id]: { from: raisedNow.from, to: raisedNow.to, reason: raisedNow.reason } } : priorRaises
writeFileSync(STATE, `${JSON.stringify(Object.keys(raised).length ? { ceilings, raised } : { ceilings }, null, 2)}\n`)
console.log('wrote ratchet.json')
