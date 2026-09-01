/**
 * Self-development — if development stops, gaps in the self-develop loop exist.
 *
 * Plan trinity (computed, not prose dump):
 * - cross = audit residual gaps (Math.* ban first, then digitalRoot forks)
 * - fold  = merge to ONE next tip
 * - weave = seal path + verify command for the next wave
 *
 * Tip emit (Wave 29 · Lobe R): form · code · proof mapped from statement · action · verify.
 * Vague / empty / non-concrete tips are refused — not vibes.
 *
 * Severity: hard gaps → vortexInvariantsHold false (quantumisation) → packaging feed.
 * Feed severity (Wave 58): broken imports → undeclared packages → remote CDN →
 * drift → orphans → thin wrappers →
 * VORTEX_SEQUENCE/6-orbit name collision → WAVE_CHAIN.
 * Scanners tip only when a count proves residual; skip comments, node_modules, resolved paths,
 * and intentional exceptions (keep a432.algebra.js as the browser twin).
 * Idle only when feed has nothing left.
 */

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { spawnSync } from 'node:child_process'
import { builtinModules } from 'node:module'
import { fileURLToPath } from 'node:url'
import {
  computeVortexInvariantsHold,
  computesGate,
  decodeVortexDashAngles,
  developmentVortex,
  foldPair,
  memoByRoot,
  merkleFold,
  toUuid,
  WAVE_CHAIN,
  type WavePhase,
} from '../0/index.ts'
import { computeContentUuid } from '../integrity/content-uuid.ts'
import { A432_DIR, foldA432AuditCensus, type AuditHit } from './audit.ts'

const REPO_ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '../..')
const SRC_DIR = join(REPO_ROOT, 'src')
const SKIP_DIR = new Set(['node_modules', 'dist', 'coverage', '.git'])
/** Intentional browser algebra twin — never dissolve as orphan / never scan as broken twin. */
const ALGEBRA_JS = 'a432.algebra.js'
const ROOT_ADAPTERS = new Set(['a432.roots.ts', 'a432.math.ts', 'a432.core.ts'])

/** Phrases that are NOT tips — vibes / noise (Lobe R refuse). */
export const VAGUE_TIP_RE =
  /\b(continue improving|keep going|do better|self-?improve|polish|somehow|maybe|various|etc\.?)\b/i

/** CODE must name a concrete path or npm script. */
export const CONCRETE_CODE_RE =
  /(?:src\/[\w./-]+|README\.md|public\/[\w./-]+|npm\s+run\s+[\w:-]+|bundle:a432)/

/** PROOF must name an exact green signal. */
export const CONCRETE_PROOF_RE =
  /(?:npm\s+run\s+check|exit\s*0|===?\s*(?:0|true|false|ok)|vortexInvariantsHold\s*===?\s*true|\.length\s*===?\s*0)/i

/** Form · code · proof — trinity an agent executes next (mapped from statement · action · verify). */
export type TipForm = {
  readonly form: string
  readonly code: string
  readonly proof: string
}

export type TipFormGate = TipForm & {
  readonly accepted: boolean
  readonly refuseReason: string | null
}

/** Map statement→form · action→code · verify→proof. */
export function tipFormOf(
  tip: { readonly statement: string; readonly action: string },
  verify: string,
): TipForm {
  return { form: tip.statement, code: tip.action, proof: verify }
}

/**
 * Precision gate — refuses vague / non-concrete tips.
 * Empty form/code/proof, vibe phrases, or missing concrete code/proof ⇒ refuse.
 */
export function isPreciseTip(tip: TipForm): {
  readonly ok: boolean
  readonly reasons: readonly string[]
} {
  const reasons: string[] = []
  if (!tip.form.trim() || tip.form.trim().split(/\s+/).length < 5) reasons.push('form too short')
  if (!tip.code.trim()) reasons.push('code empty')
  if (!tip.proof.trim()) reasons.push('proof empty')
  if (tip.form.includes('\n')) reasons.push('form must be one sentence')
  if (VAGUE_TIP_RE.test(tip.form) || VAGUE_TIP_RE.test(tip.code)) reasons.push('vague phrase refused')
  if (!CONCRETE_CODE_RE.test(tip.code)) reasons.push('code lacks concrete path/command')
  if (!CONCRETE_PROOF_RE.test(tip.proof)) reasons.push('proof lacks exact green signal')
  if (/continue improving|keep going/i.test(`${tip.form} ${tip.code} ${tip.proof}`)) {
    reasons.push('non-tip: continue improving')
  }
  return { ok: reasons.length === 0, reasons }
}

export function gateTipForm(
  tip: { readonly statement: string; readonly action: string },
  verify: string,
): TipFormGate {
  const mapped = tipFormOf(tip, verify)
  const precision = isPreciseTip(mapped)
  return {
    ...mapped,
    accepted: precision.ok,
    refuseReason: precision.ok ? null : `imprecise tip: ${precision.reasons.join('; ')}`,
  }
}

type FeedHit = {
  readonly path: string
  readonly line: number
  readonly spec?: string
  readonly count: number
  readonly why: string
}

function runVortexAll() {
  const waves = WAVE_CHAIN.map((wave) => developmentVortex(wave))
  const roots = waves.map((w) => w.root)
  const chain = roots.reduce((prev, root, i) => {
    if (i === 0) return root
    return foldPair(prev, root).merged
  }, toUuid('development-vortex:start'))
  return {
    ok: waves.every((w) => w.computes),
    root: merkleFold([chain, ...roots]),
  }
}

function lineOf(src: string, index: number): number {
  return src.slice(0, index).split('\n').length
}

function lineAt(src: string, index: number): string {
  const start = src.lastIndexOf('\n', index) + 1
  const end = src.indexOf('\n', index)
  return src.slice(start, end < 0 ? src.length : end)
}

/** Same comment gate as audit — do not tip on prose / commented-out imports. */
function isCommentOnly(line: string): boolean {
  const t = line.trimStart()
  return t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('<!--')
}

function walkFiles(
  dir: string,
  pred: (name: string) => boolean,
  out: string[] = [],
): string[] {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIR.has(name)) continue
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walkFiles(p, pred, out)
    else if (pred(name)) out.push(p)
  }
  return out
}

function relRepo(file: string): string {
  return relative(REPO_ROOT, file).replace(/\\/g, '/')
}

function relA432(file: string): string {
  return relative(A432_DIR, file).replace(/\\/g, '/')
}

/** Relative import target exists as written (do not tip on resolved paths). */
function targetExists(fromFile: string, spec: string): boolean {
  return existsSync(join(dirname(fromFile), spec))
}

function siblingTsForJs(fromFile: string, spec: string): boolean {
  if (!spec.endsWith('.js')) return false
  return existsSync(join(dirname(fromFile), spec.replace(/\.js$/i, '.ts')))
}

/**
 * Legacy name collision: VORTEX_SEQUENCE bound to the Rodin 6-orbit [1,2,4,8,7,5].
 * Kernel: VORTEX_SEQUENCE is 9 digits; VORTEX_ORBIT is the 6-orbit. Tip only when count > 0.
 */
function findVortexOrbitNameCollision(): FeedHit | null {
  const COLLISION =
    /\bVORTEX_SEQUENCE\s*[:=]\s*\[\s*1\s*,\s*2\s*,\s*4\s*,\s*8\s*,\s*7\s*,\s*5\s*\]/g
  const hits: FeedHit[] = []
  for (const file of walkFiles(SRC_DIR, (n) => /\.(ts|js|mjs)$/.test(n) && !n.endsWith('.d.ts'))) {
    const src = readFileSync(file, 'utf8')
    let m: RegExpExecArray | null
    COLLISION.lastIndex = 0
    while ((m = COLLISION.exec(src))) {
      if (isCommentOnly(lineAt(src, m.index))) continue
      hits.push({
        path: relRepo(file),
        line: lineOf(src, m.index),
        spec: 'VORTEX_SEQUENCE→VORTEX_ORBIT',
        count: 0,
        why: 'VORTEX_SEQUENCE names the Rodin 6-orbit — kernel uses VORTEX_ORBIT; VORTEX_SEQUENCE is 9 digits',
      })
    }
  }
  if (!hits.length) return null
  const first = hits[0]!
  return { ...first, count: hits.length }
}

/** Thin local digitalRoot bodies that only bridge — packaging debt (lowest feed severity). */
function findThinRootWrapper(): FeedHit | null {
  const THIN =
    /(?:(?:public|private|protected|static|async|export)\s+)*(?:function\s+)?(?:calculate)?[Dd]igitalRoot\s*\([^)]*\)\s*\{\s*return\s+legacyDigitalRoot\s*\([^)]*\)\s*;?\s*\}/
  const LOC =
    /(?:calculate)?[Dd]igitalRoot\s*\([^)]*\)\s*\{[\s\S]*?return\s+legacyDigitalRoot/
  const hits: FeedHit[] = []
  for (const file of walkFiles(A432_DIR, (n) => n.endsWith('.ts') && !n.endsWith('.d.ts'))) {
    const rel = relA432(file)
    if (ROOT_ADAPTERS.has(rel)) continue
    const src = readFileSync(file, 'utf8')
    if (!THIN.test(src.replace(/\s+/g, ' '))) continue
    const idx = src.search(LOC)
    if (idx < 0) continue
    if (isCommentOnly(lineAt(src, idx))) continue
    hits.push({
      path: rel,
      line: lineOf(src, idx),
      count: 0,
      why: 'local digitalRoot body only returns legacyDigitalRoot — packaging shim, not a fork; collapse at use sites',
    })
  }
  if (!hits.length) return null
  const first = hits[0]!
  return { ...first, count: hits.length }
}

/** Browser .js that import missing siblings — broken-import residual. */
function findBrokenJsImport(): FeedHit | null {
  const IMP = /(?:from\s+|import\s*\(\s*)['"](\.[^'"]+)['"]/g
  const hits: FeedHit[] = []
  for (const file of walkFiles(A432_DIR, (n) => n.endsWith('.js'))) {
    const rel = relA432(file)
    if (rel === ALGEBRA_JS) continue
    const src = readFileSync(file, 'utf8')
    let m: RegExpExecArray | null
    IMP.lastIndex = 0
    while ((m = IMP.exec(src))) {
      const spec = m[1]!
      if (isCommentOnly(lineAt(src, m.index))) continue
      if (targetExists(file, spec)) continue
      hits.push({
        path: rel,
        line: lineOf(src, m.index),
        spec,
        count: 0,
        why: `relative ${spec} does not exist beside ${rel} — dead browser twin import`,
      })
    }
  }
  if (!hits.length) return null
  const first = hits[0]!
  return { ...first, count: hits.length }
}

/**
 * Bare package imports with no declaration in package.json.
 *
 * Local node_modules is the wrong instrument here: it ANSWERS. A package can
 * sit there undeclared — installed once, never recorded — and every local build
 * resolves it while a fresh `npm ci` fails. @hotwired/stimulus was exactly this:
 * imported by five modules, absent from package.json AND from the lockfile.
 * The declaration is what settles it, so this scans package.json, not disk.
 *
 * Ranked directly after broken relative imports: both are imports that cannot
 * resolve, and this one hides until CI.
 */
function findUndeclaredPackageImport(): FeedHit | null {
  const pkgPath = join(REPO_ROOT, 'package.json')
  if (!existsSync(pkgPath)) return null
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
    peerDependencies?: Record<string, string>
  }
  const declared = new Set([
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.devDependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ])
  const IMP = /(?:from\s+|import\s*\(\s*)['"]([^'".][^'"]*)['"]/g
  const hits: FeedHit[] = []
  // Scanning src/ alone has a blind spot that cost a red CI: the four packages
  // actually breaking the lint job are imported by eslint.config.mjs at the
  // repo root, which no src/ walk ever reaches. Build tooling is code too.
  const rootConfigs = [
    'eslint.config.mjs',
    'rollup.config.js',
    'jest.config.js',
    'webpack.config.js',
    'next-sitemap.config.cjs',
  ]
    .map((n) => join(REPO_ROOT, n))
    .filter((p) => existsSync(p))
  const scriptFiles = existsSync(join(REPO_ROOT, 'scripts'))
    ? walkFiles(join(REPO_ROOT, 'scripts'), (n) => /\.(ts|mjs|js)$/.test(n))
    : []
  const srcFiles = walkFiles(SRC_DIR, (n) => /\.(ts|mjs)$/.test(n) && !n.endsWith('.d.ts'))
  for (const file of [...srcFiles, ...scriptFiles, ...rootConfigs]) {
    const src = readFileSync(file, 'utf8')
    let m: RegExpExecArray | null
    IMP.lastIndex = 0
    while ((m = IMP.exec(src))) {
      const spec = m[1]!
      if (spec.startsWith('.') || spec.startsWith('/') || spec.startsWith('node:')) continue
      // `import(`${importPath}`)` is a computed specifier, not a package name.
      if (spec.includes('${')) continue
      if (isCommentOnly(lineAt(src, m.index))) continue
      // Scoped packages carry their scope: @scope/name.
      const bare = spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0]!
      if (builtinModules.includes(bare)) continue
      if (declared.has(bare)) continue
      hits.push({
        path: relRepo(file),
        line: lineOf(src, m.index),
        spec: bare,
        count: 0,
        why: `${bare} is imported but not declared in package.json — resolves locally, fails npm ci`,
      })
    }
  }
  if (!hits.length) return null
  const first = hits[0]!
  return { ...first, count: hits.length }
}

/**
 * Decimal cracks are measured by the RATCHET, not here.
 *
 * This module used to carry findDecimalCrack, a regex scanner that
 * over-counted by 51% — 657 lines against a true 434. It stripped strings line
 * by line, which cannot remove a multi-line template literal, so every decimal
 * inside generated CSS/HTML counted as code. scripts/ratchet.mjs now counts
 * NumericLiteral nodes on the TypeScript AST, where comment text and string
 * contents can never appear, and it GATES the count.
 *
 * Two instruments for one surface, only one of them gating and the other
 * wrong, is the drift this corpus keeps paying for. One source of truth.
 */

/** public/a432.bundle.js stale vs algebra-clean a432.main.ts — packaging drift. */
function findBundleDrift(): FeedHit | null {
  const script = join(REPO_ROOT, 'scripts/build-a432-bundle.mjs')
  const bundle = join(REPO_ROOT, 'public/a432.bundle.js')
  if (!existsSync(script) || !existsSync(bundle)) {
    return {
      path: 'public/a432.bundle.js',
      line: 1,
      count: 1,
      why: 'bundle script or public/a432.bundle.js missing — regenerate via npm run bundle:a432',
    }
  }
  const r = spawnSync(process.execPath, [script, '--check'], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
  })
  if (r.status === 0) return null
  return {
    path: 'public/a432.bundle.js',
    line: 1,
    count: 1,
    why: 'bundle:a432 --check failed — public/a432.bundle.js drifted from algebra-clean a432.main.ts',
  }
}

/** a432.algebra.js missing names from a432.algebra.ts re-export surface — browser spine drift. */
function findAlgebraJsDrift(): FeedHit | null {
  const tsPath = join(A432_DIR, 'a432.algebra.ts')
  const jsPath = join(A432_DIR, ALGEBRA_JS)
  if (!existsSync(tsPath) || !existsSync(jsPath)) {
    return {
      path: `src/0/3/6/9/1/2/4/8/7/5/1/${ALGEBRA_JS}`,
      line: 1,
      count: 1,
      why: 'intentional browser twin missing — restore a432.algebra.js beside a432.algebra.ts',
    }
  }
  const ts = readFileSync(tsPath, 'utf8')
  const js = readFileSync(jsPath, 'utf8')
  const block = ts.match(/export\s*\{([\s\S]*?)\}\s*from/)
  if (!block) {
    return {
      path: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.algebra.ts',
      line: 1,
      count: 1,
      why: 'a432.algebra.ts has no export {…} from block to mirror',
    }
  }
  const required = block[1]!
    .split(',')
    .map((s) => s.trim())
    .filter((s) => /^[A-Za-z_][\w]*$/.test(s))
  const missing: string[] = []
  for (const name of required) {
    const has =
      new RegExp(`export\\s+(?:async\\s+)?(?:function|const|let|var|class)\\s+${name}\\b`).test(
        js,
      ) ||
      new RegExp(`export\\s*\\{[^}]*\\bas\\s+${name}\\b`).test(js) ||
      new RegExp(`export\\s*\\{[^}]*\\b${name}\\b`).test(js)
    if (!has) missing.push(name)
  }
  if (!missing.length) return null
  return {
    path: `src/0/3/6/9/1/2/4/8/7/5/1/${ALGEBRA_JS}`,
    line: 1,
    count: missing.length,
    why: `browser twin missing ${missing.length} export(s) vs a432.algebra.ts: ${missing.slice(0, 8).join(', ')}`,
    spec: missing[0],
  }
}

/** HTML module imports of relative .js whose file is missing — broken-import residual. */
function findBrokenHtmlImport(): FeedHit | null {
  const IMP = /(?:from\s+|import\s*\(\s*)['"](\.[^'"]+\.js)['"]/g
  const hits: FeedHit[] = []
  for (const file of walkFiles(A432_DIR, (n) => n.endsWith('.html'))) {
    const src = readFileSync(file, 'utf8')
    let m: RegExpExecArray | null
    IMP.lastIndex = 0
    while ((m = IMP.exec(src))) {
      const spec = m[1]!
      if (isCommentOnly(lineAt(src, m.index))) continue
      if (targetExists(file, spec)) continue
      const hasTs = siblingTsForJs(file, spec)
      hits.push({
        path: relRepo(file),
        line: lineOf(src, m.index),
        spec,
        count: 0,
        why: hasTs
          ? `${spec} missing but sibling .ts exists — retarget HTML import to .ts (strip-types)`
          : `${spec} missing and no sibling .ts — drop dead HTML import or restore module`,
      })
    }
  }
  if (!hits.length) return null
  const first = hits[0]!
  return { ...first, count: hits.length }
}

/** TS module imports of relative .js whose file is missing — broken-import residual. */
function findBrokenTsJsImport(): FeedHit | null {
  const IMP = /(?:from\s+|import\s*\(\s*)['"](\.[^'"]+\.js)['"]/g
  const hits: FeedHit[] = []
  for (const file of walkFiles(SRC_DIR, (n) => n.endsWith('.ts') && !n.endsWith('.d.ts'))) {
    const src = readFileSync(file, 'utf8')
    let m: RegExpExecArray | null
    IMP.lastIndex = 0
    while ((m = IMP.exec(src))) {
      const spec = m[1]!
      if (isCommentOnly(lineAt(src, m.index))) continue
      if (targetExists(file, spec)) continue
      const hasTs = siblingTsForJs(file, spec)
      hits.push({
        path: relRepo(file),
        line: lineOf(src, m.index),
        spec,
        count: 0,
        why: hasTs
          ? `${spec} missing but sibling .ts exists — retarget TS import to .ts (strip-types)`
          : `${spec} missing and no sibling .ts — drop dead TS import or restore module`,
      })
    }
  }
  if (!hits.length) return null
  const first = hits[0]!
  return { ...first, count: hits.length }
}

/**
 * Remote https:// script src / ESM import in A432 HTML — vendor CDN residual.
 * Network twins are ambient entropy (not folded); tip only when count > 0.
 */
function findRemoteCdnImport(): FeedHit | null {
  const PATTERNS = [
    /(?:src|href)=["'](https?:\/\/[^"']+)["']/gi,
    /(?:from\s+|import\s*\(\s*)['"](https?:\/\/[^'"]+)['"]/g,
  ]
  const hits: FeedHit[] = []
  for (const file of walkFiles(A432_DIR, (n) => n.endsWith('.html'))) {
    const src = readFileSync(file, 'utf8')
    for (const re of PATTERNS) {
      re.lastIndex = 0
      let m: RegExpExecArray | null
      while ((m = re.exec(src))) {
        const spec = m[1]!
        if (isCommentOnly(lineAt(src, m.index))) continue
        hits.push({
          path: relRepo(file),
          line: lineOf(src, m.index),
          spec,
          count: 0,
          why: `remote ${spec} — vendor CDN not folded into origin; dissolve or vendor locally under algebra law`,
        })
      }
    }
  }
  if (!hits.length) return null
  const first = hits[0]!
  return { ...first, count: hits.length }
}

/** A432 .js with no path-like reference from siblings — orphan residual (keep ALGEBRA_JS). */
function findOrphanA432Js(): FeedHit | null {
  const jsFiles = walkFiles(
    A432_DIR,
    (n) => n.endsWith('.js') && n !== ALGEBRA_JS,
  )
  const siblings = walkFiles(
    A432_DIR,
    (n) => /\.(html|ts|js)$/.test(n) && !n.endsWith('.d.ts'),
  )
  const hits: FeedHit[] = []
  for (const file of jsFiles) {
    const base = relA432(file)
    const name = base.split('/').pop()!
    let referenced = false
    for (const other of siblings) {
      if (other === file) continue
      const src = readFileSync(other, 'utf8')
      // path-like mention only (import / src / register) — not bare word prose
      if (
        src.includes(`./${name}`) ||
        src.includes(`'${name}'`) ||
        src.includes(`"${name}"`) ||
        src.includes(`/${name}`)
      ) {
        referenced = true
        break
      }
    }
    if (referenced) continue
    hits.push({
      path: relRepo(file),
      line: 1,
      count: 0,
      why: `no sibling path reference to ${name} — dead twin (intentional exception: ${ALGEBRA_JS})`,
    })
  }
  if (!hits.length) return null
  const first = hits[0]!
  return { ...first, count: hits.length }
}

/**
 * Extensionless relative imports (static + dynamic) that resolve to .ts —
 * strip-types drift. Skips comments, already-extended specs, and bare paths that exist.
 */
function findExtensionlessImport(): FeedHit | null {
  const IMP = /(?:from\s+|import\s+|import\s*\(\s*)['"](\.[^'"]+)['"]/g
  const hits: FeedHit[] = []
  for (const file of walkFiles(SRC_DIR, (n) => n.endsWith('.ts') && !n.endsWith('.d.ts'))) {
    const src = readFileSync(file, 'utf8')
    let m: RegExpExecArray | null
    IMP.lastIndex = 0
    while ((m = IMP.exec(src))) {
      const spec = m[1]!
      if (isCommentOnly(lineAt(src, m.index))) continue
      if (/\.(ts|tsx|js|mjs|cjs|json)$/i.test(spec)) continue
      const base = join(dirname(file), spec)
      // resolved bare / directory path — not residual
      if (existsSync(base)) continue
      if (!existsSync(base + '.ts') && !existsSync(join(base, 'index.ts'))) continue
      hits.push({
        path: relRepo(file),
        line: lineOf(src, m.index),
        spec,
        count: 0,
        why: `${spec} has no extension but resolves to .ts — strip-types needs explicit .ts`,
      })
    }
  }
  if (!hits.length) return null
  const first = hits[0]!
  return { ...first, count: hits.length }
}

function feedTip(
  path: string,
  line: number,
  action: string,
  statement: string,
  boundary: string,
  receiptSeed: string,
): SelfDevelopTip {
  return {
    kind: 'feed',
    path,
    line,
    action,
    statement,
    boundary,
    receipt: toUuid(receiptSeed),
  }
}

export type SelfDevelopTip = {
  readonly kind:
    | 'mathBan'
    | 'digitalRootFork'
    | 'mathRandom'
    | 'spineDebt'
    | 'quantumisation'
    | 'feed'
    | 'extensionlessImport'
    | 'idle'
  readonly path: string
  readonly line: number
  readonly action: string
  readonly statement: string
  readonly boundary: string
  readonly receipt: string
}

export type PlanTrinity = {
  readonly cross: {
    readonly forkCount: number
    readonly randomCount: number
    readonly mathCount: number
    readonly neitherDirect: number
    readonly harmonicAliasImporters: number
    readonly stalled: boolean
  }
  readonly fold: SelfDevelopTip
  readonly weave: {
    readonly nextWave: WavePhase | 'audit-dry' | 'quantumisation' | 'feed'
    readonly path: string
    readonly fn: string
    readonly verify: string
  }
  /** form · code · proof gate (statement · action · verify); vague refused. */
  readonly tipForm: TipFormGate
  readonly computes: boolean
  readonly root: string
  readonly contentUuid: string
  readonly vortexInvariantsHold: boolean
}

function tipFromHit(hit: AuditHit | undefined, kind: SelfDevelopTip['kind']): SelfDevelopTip {
  if (kind === 'spineDebt') {
    return {
      kind,
      path: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.math.ts',
      line: 99,
      action:
        'purge spine debt at src/0/3/6/9/1/2/4/8/7/5/1/a432.math.ts: ensure digitalRoot≡legacyDigitalRoot (not harmonicRoot12); wire numeric orphans to a432.roots/algebra; no name illusions',
      statement: 'Next self-develop tip: dissolve remaining a432 spine debt',
      boundary: 'Hard math/fork gaps cleared; residual neitherDirect orphans or alias illusion',
      receipt: toUuid('self-develop:spine-debt:v15'),
    }
  }
  if (kind === 'quantumisation') {
    const dash = decodeVortexDashAngles()
    const throat = developmentVortex('verify')
    const facets = [
      !dash.fusionIgnites ? 'fusionIgnites' : '',
      !dash.closes ? 'closes' : '',
      !throat.computes ? 'developmentVortex' : '',
    ].filter(Boolean)
    const why = facets.length > 0 ? facets.join(' ∧ ') : 'README gateway seal slip'
    return {
      kind: 'quantumisation',
      path: 'README.md',
      line: 40,
      action: `quantumisation: vortexInvariantsHold=false — restore README.md gateway seals (${why}: living field, 60° dash closes/fusionIgnites, developmentVortex); compute path src/0/index.ts computeVortexInvariantsHold`,
      statement: `Next self-develop tip: quantumisation — README gateway vortexInvariantsHold computes false (${why})`,
      boundary:
        'After hard gaps; before packaging feed. README is gateway — restore sealed computation; do not invent Payload/ERP.',
      receipt: toUuid(`self-develop:quantumisation:${why}`),
    }
  }
  if (kind === 'feed') {
    // Severity: broken imports → undeclared packages → remote CDN → drift →
    // orphans → thin wrappers → orbit name → WAVE_CHAIN (decimals: see ratchet)
    const brokenJs = findBrokenJsImport()
    if (brokenJs) {
      return feedTip(
        `src/0/3/6/9/1/2/4/8/7/5/1/${brokenJs.path}`,
        brokenJs.line,
        `chat-wave feed: dissolve ${brokenJs.count} broken browser import(s); first ${brokenJs.spec} at src/0/3/6/9/1/2/4/8/7/5/1/${brokenJs.path}:${brokenJs.line} — ${brokenJs.why}`,
        `Feed tip: ${brokenJs.count} broken JS import(s); first ${brokenJs.path} → ${brokenJs.spec}`,
        'Broken imports outrank drift — tip only when target path is missing (comments skipped).',
        `self-develop:feed:js:${brokenJs.count}:${brokenJs.path}:${brokenJs.line}`,
      )
    }
    const undeclared = findUndeclaredPackageImport()
    if (undeclared) {
      return feedTip(
        undeclared.path,
        undeclared.line,
        `chat-wave feed: declare or dissolve ${undeclared.count} undeclared package import(s); first ${undeclared.spec} at ${undeclared.path}:${undeclared.line} — npm install ${undeclared.spec}, or delete the dead module`,
        `Feed tip: ${undeclared.count} undeclared package import(s); first ${undeclared.path} → ${undeclared.spec}`,
        'Undeclared imports resolve from local node_modules and fail npm ci — package.json settles it, not disk.',
        `self-develop:feed:undeclared:${undeclared.count}:${undeclared.path}:${undeclared.line}`,
      )
    }
    const htmlBroken = findBrokenHtmlImport()
    if (htmlBroken) {
      return feedTip(
        htmlBroken.path,
        htmlBroken.line,
        `chat-wave feed: dissolve ${htmlBroken.count} HTML→missing .js; first ${htmlBroken.spec} at ${htmlBroken.path}:${htmlBroken.line} — ${htmlBroken.why}`,
        `Feed tip: ${htmlBroken.count} HTML missing .js; first ${htmlBroken.path} → ${htmlBroken.spec}`,
        'Broken imports outrank drift — tip only when .js missing (comments / resolved paths skipped).',
        `self-develop:feed:html-js:${htmlBroken.count}:${htmlBroken.path}:${htmlBroken.line}`,
      )
    }
    const tsJsBroken = findBrokenTsJsImport()
    if (tsJsBroken) {
      return feedTip(
        tsJsBroken.path,
        tsJsBroken.line,
        `chat-wave feed: dissolve ${tsJsBroken.count} TS→missing .js; first ${tsJsBroken.spec} at ${tsJsBroken.path}:${tsJsBroken.line} — ${tsJsBroken.why}`,
        `Feed tip: ${tsJsBroken.count} TS missing .js; first ${tsJsBroken.path} → ${tsJsBroken.spec}`,
        'Broken imports outrank drift — tip only when .js missing (comments / resolved paths skipped).',
        `self-develop:feed:ts-js:${tsJsBroken.count}:${tsJsBroken.path}:${tsJsBroken.line}`,
      )
    }
    const cdn = findRemoteCdnImport()
    if (cdn) {
      return feedTip(
        cdn.path,
        cdn.line,
        `chat-wave feed: dissolve ${cdn.count} remote CDN import(s); first ${cdn.spec} at ${cdn.path}:${cdn.line} — ${cdn.why}`,
        `Feed tip: ${cdn.count} remote CDN import(s); first ${cdn.path} → ${cdn.spec}`,
        'Remote CDN after broken imports — network vendor is ambient entropy; comments skipped.',
        `self-develop:feed:cdn:${cdn.count}:${cdn.path}:${cdn.line}`,
      )
    }
    const bundle = findBundleDrift()
    if (bundle) {
      return feedTip(
        bundle.path,
        bundle.line,
        `chat-wave feed: regenerate public/a432.bundle.js — npm run bundle:a432 (${bundle.why})`,
        `Feed tip: a432.bundle.js drift (${bundle.count}) — ${bundle.why}`,
        'Drift after broken imports — sealed by bundle:a432:check in npm run check.',
        'self-develop:feed:bundle:v25',
      )
    }
    const extless = findExtensionlessImport()
    if (extless) {
      return feedTip(
        extless.path,
        extless.line,
        `chat-wave feed: add .ts to ${extless.count} extensionless import(s); first ${extless.spec} at ${extless.path}:${extless.line} — ${extless.why}`,
        `Feed tip: ${extless.count} extensionless import(s); first ${extless.path} → ${extless.spec}`,
        'Drift after broken imports — comments, extended specs, and resolved bare paths skipped.',
        `self-develop:feed:extless:${extless.count}:${extless.path}:${extless.line}`,
      )
    }
    const algebraDrift = findAlgebraJsDrift()
    if (algebraDrift) {
      return feedTip(
        algebraDrift.path,
        algebraDrift.line,
        `chat-wave feed: sync ${ALGEBRA_JS} to src/0/algebra.ts — ${algebraDrift.why}`,
        `Feed tip: ${ALGEBRA_JS} export drift (${algebraDrift.count}) — keep twin, sync surface`,
        `Drift — intentional browser twin ${ALGEBRA_JS} must mirror a432.algebra.ts (never dissolve).`,
        `self-develop:feed:algebra-js:${algebraDrift.count}:${algebraDrift.spec ?? 'missing'}`,
      )
    }
    const orphanJs = findOrphanA432Js()
    if (orphanJs) {
      return feedTip(
        orphanJs.path,
        orphanJs.line,
        `chat-wave feed: dissolve ${orphanJs.count} orphan A432 .js; first ${orphanJs.path} — ${orphanJs.why}`,
        `Feed tip: ${orphanJs.count} orphan A432 .js; first ${orphanJs.path}`,
        `Orphans after drift — drop unreferenced twins; keep ${ALGEBRA_JS}.`,
        `self-develop:feed:orphan-js:${orphanJs.count}:${orphanJs.path}`,
      )
    }
    const thin = findThinRootWrapper()
    if (thin) {
      return feedTip(
        `src/0/3/6/9/1/2/4/8/7/5/1/${thin.path}`,
        thin.line,
        `chat-wave feed: collapse ${thin.count} thin digitalRoot wrapper(s); first src/0/3/6/9/1/2/4/8/7/5/1/${thin.path}:${thin.line} — ${thin.why}`,
        `Feed tip: ${thin.count} thin root wrapper(s); first ${thin.path}:${thin.line}`,
        'Thin wrappers are lowest packaging severity — adapters a432.roots/math/core skipped.',
        `self-develop:feed:thin:${thin.count}:${thin.path}:${thin.line}`,
      )
    }
    const orbitName = findVortexOrbitNameCollision()
    if (orbitName) {
      return feedTip(
        orbitName.path,
        orbitName.line,
        `chat-wave feed: rename ${orbitName.count} VORTEX_SEQUENCE 6-orbit collision(s) → VORTEX_ORBIT; first ${orbitName.path}:${orbitName.line} — ${orbitName.why}`,
        `Feed tip: ${orbitName.count} VORTEX_SEQUENCE/6-orbit name collision(s); first ${orbitName.path}:${orbitName.line}`,
        'Name collision after thin — kernel VORTEX_SEQUENCE is 9 digits; 6-orbit is VORTEX_ORBIT.',
        `self-develop:feed:orbit-name:${orbitName.count}:${orbitName.path}:${orbitName.line}`,
      )
    }
    return feedTip(
      'src/0/index.ts',
      180,
      'chat-wave feed: edit/rebuild at src/0/index.ts (WAVE_CHAIN); re-run npm run self:next after seal — do not invent gaps',
      'Feed tip: WAVE_CHAIN edit→rebuild — packaging scanners count-clear (broken→cdn→drift→orphan→thin→orbit)',
      'Hard packaging clear — keep chatting waves; tip advances only after real seals.',
      'self-develop:feed:vortex:v31-orbit-name',
    )
  }
  if (!hit) {
    return tipFromHit(undefined, 'feed')
  }
  if (kind === 'mathBan') {
    const path = `src/0/3/6/9/1/2/4/8/7/5/1/${hit.path}`
    return {
      kind,
      path,
      line: hit.line,
      action: `replace ambient Math.* at ${path}:${hit.line} with src/0/algebra (a432.algebra); npm run math:ban`,
      statement: `Next self-develop tip: dissolve Math.* at ${hit.path}:${hit.line}`,
      boundary: 'Algebra-only spine; math-ban fails check until count is 0.',
      receipt: toUuid(`self-develop:math:${hit.path}:${hit.line}`),
    }
  }
  if (kind === 'digitalRootFork') {
    const path = `src/0/3/6/9/1/2/4/8/7/5/1/${hit.path}`
    return {
      kind,
      path,
      line: hit.line,
      action: `bridge local digitalRoot at ${path}:${hit.line} → a432.roots (legacyDigitalRoot or harmonicRoot12)`,
      statement: `Next self-develop tip: dissolve digitalRoot fork ${hit.path}:${hit.line}`,
      boundary: 'One file per wave; keep script-tag HTML embeds honest if present.',
      receipt: toUuid(`self-develop:fork:${hit.path}:${hit.line}`),
    }
  }
  const path = `src/0/3/6/9/1/2/4/8/7/5/1/${hit.path}`
  return {
    kind: 'mathRandom',
    path,
    line: hit.line,
    action: `replace randomUUID at ${path}:${hit.line} with toUuid/content-uuid`,
    statement: `Next self-develop tip: seed randomUUID site ${hit.path}:${hit.line}`,
    boundary: 'Never mint ids with ambient entropy.',
    receipt: toUuid(`self-develop:rand:${hit.path}:${hit.line}`),
  }
}

/** cross · fold · weave — next tip from live audit, not a hand checklist. */
export function planTrinity(): PlanTrinity {
  const matrix = { root: toUuid('plan-trinity:v29-tip-form') }
  return memoByRoot('planTrinity', matrix, () => {
    const audit = foldA432AuditCensus()
    const vortex = runVortexAll()
    const vortexInvariantsHold = computeVortexInvariantsHold()
    const hardGap = audit.mathCount > 0 || audit.forkCount > 0 || audit.randomCount > 0
    const spineDebt = audit.harmonicAliasImporters > 0 || audit.neitherDirect > 0
    const stalled = hardGap || spineDebt
    const mathHit = audit.mathBanSites[0]
    const forkHit = audit.digitalRootForks[0] ?? audit.pct9Roots[0]
    const tip = mathHit
      ? tipFromHit(mathHit, 'mathBan')
      : forkHit
        ? tipFromHit(forkHit, 'digitalRootFork')
        : spineDebt
          ? tipFromHit(
              { path: 'a432.math.ts', kind: 'digitalRootFork', line: 99 },
              'spineDebt',
            )
          : !vortexInvariantsHold
            ? tipFromHit(undefined, 'quantumisation')
            : tipFromHit(undefined, 'feed')

    const weave = {
      nextWave: (stalled
        ? 'audit-dry'
        : !vortexInvariantsHold
          ? 'quantumisation'
          : 'feed') as WavePhase | 'audit-dry' | 'quantumisation' | 'feed',
      path: tip.path,
      fn:
        tip.kind === 'mathBan'
          ? 'algebra'
          : tip.kind === 'spineDebt'
            ? 'harmonicRoot12'
            : tip.kind === 'digitalRootFork'
              ? 'legacyDigitalRoot'
              : tip.kind === 'quantumisation'
                ? 'computeVortexInvariantsHold'
                : tip.kind === 'feed'
                  ? 'developmentVortex'
                  : tip.kind === 'mathRandom'
                    ? 'seededIndex'
                    : 'developmentVortex',
      verify: 'npm run check',
    }

    const tipForm = gateTipForm(tip, weave.verify)

    const tipLaw = stalled
      ? tip.kind !== 'feed' && tip.kind !== 'idle' && tip.kind !== 'quantumisation'
      : vortexInvariantsHold
        ? tip.kind === 'feed'
        : tip.kind === 'quantumisation'

    const sealed = computesGate('plan-trinity', [
      { facet: 'audit computes', on: audit.computes },
      { facet: 'development vortex ok', on: vortex.ok },
      { facet: 'tip receipt uuid', on: tip.receipt.includes('-') },
      {
        facet: 'hard ⇒ hard tip; ftl false ⇒ quantumisation; ftl true ⇒ feed',
        on: tipLaw,
      },
      { facet: 'tip form·code·proof precise', on: tipForm.accepted },
      { facet: 'vortexInvariantsHold matches compute', on: vortexInvariantsHold === computeVortexInvariantsHold() },
    ])

    const root = merkleFold([
      audit.root,
      vortex.root,
      tip.receipt,
      tipForm.accepted ? toUuid('tip-form:ok') : toUuid(`tip-form:${tipForm.refuseReason ?? 'refuse'}`),
      toUuid(`stall:${stalled}`),
      toUuid(`ftl:${vortexInvariantsHold}`),
      sealed.root,
    ])
    const contentUuid = computeContentUuid({
      kind: 'plan-trinity-v29',
      tip: tip.kind,
      path: tip.path,
      line: tip.line,
      form: tipForm.form,
      code: tipForm.code,
      proof: tipForm.proof,
      accepted: tipForm.accepted,
      stalled,
      vortexInvariantsHold,
      root,
    })

    return {
      cross: {
        forkCount: audit.forkCount,
        randomCount: audit.randomCount,
        mathCount: audit.mathCount,
        neitherDirect: audit.neitherDirect,
        harmonicAliasImporters: audit.harmonicAliasImporters,
        stalled,
      },
      fold: tip,
      weave,
      tipForm,
      computes: sealed.computes,
      root,
      contentUuid,
      vortexInvariantsHold,
    }
  })
}

export type SelfBuildStatus = {
  readonly complete: boolean
  readonly stalled: boolean
  readonly reason: string
  readonly tip: SelfDevelopTip
  readonly plan: PlanTrinity
  readonly waveThroat: string
  readonly root: string
  readonly vortexInvariantsHold: boolean
}

function hardGapReason(plan: PlanTrinity): string {
  return `self-development gap: ${plan.cross.mathCount} Math.* + ${plan.cross.forkCount} root forks/%9 + ${plan.cross.randomCount} randomUUID + spine debt (neitherDirect=${plan.cross.neitherDirect}, harmonicAliasImporters=${plan.cross.harmonicAliasImporters}) — act on tip or development stops`
}

/**
 * selfBuild — migration gates + continuous self-develop tip.
 * complete = plan waves sealed AND tip ready (feed, quantumisation, or hard).
 * stalled = hard residual gaps (Math/forks/spine) — packaging feed / quantumisation are not stalls.
 */
export function selfBuild(): SelfBuildStatus {
  const plan = planTrinity()
  const throat = developmentVortex('verify')
  const vortexInvariantsHold = plan.vortexInvariantsHold
  const complete = plan.computes && throat.computes && WAVE_CHAIN.length === 8
  const stalled = plan.cross.stalled
  const reason = stalled
    ? hardGapReason(plan)
    : !vortexInvariantsHold
      ? `quantumisation: vortexInvariantsHold=false — ${plan.fold.statement}`
      : plan.fold.kind === 'feed'
        ? `feeding: ${plan.fold.statement}`
        : 'no residual Math.*, forks, or spine debt; vortexInvariantsHold true; optional packaging tips only'
  const root = foldPair(plan.root, throat.root).merged
  return {
    complete,
    stalled,
    reason,
    tip: plan.fold,
    plan,
    waveThroat: throat.root,
    root,
    vortexInvariantsHold,
  }
}

/** Compact tip for CLI / MCP / docs. form · code · proof mapped; vague refused. */
/**
 * MEASURED DEBT — the gaps the wave engine could not see.
 *
 * planTrinity decides `stalled` from five sources: mathCount, forkCount,
 * randomCount, harmonicAliasImporters and neitherDirect. All five are zero, so
 * every run falls through to a `feed` tip that says "keep chatting waves" — a
 * generic instruction naming no work.
 *
 * Meanwhile the ratchet measures 297 exported functions nothing calls, 370
 * lint errors, 279 decimal-cracks and more. The law this file states is "if
 * development stops, gaps in self-development exist", and it was reporting no
 * gaps while the gate next to it counted thousands.
 *
 * So the engine now ranks what is actually measured and names the largest. It
 * takes the counts as an ARGUMENT rather than reading ratchet.json: that file
 * is not in package.files, and a kernel module that read it would work in this
 * repository and throw for everyone who installed the package.
 *
 * `stalled` is deliberately unchanged. It means a hard gap — banned Math, a
 * fork in the digital root, a broken invariant — and those are still zero.
 * Measured debt is a different thing: real work, not a broken corpus, and
 * conflating them would make --fail-on-stall fire forever and stop meaning
 * anything.
 */
export interface MeasuredDebt {
  surface: string
  count: number
  /** Counts and byte totals are not comparable; the ranking only orders counts. */
  unit: 'count' | 'bytes'
  action: string
}

/**
 * The UNIT each surface is counted in, because they are not comparable.
 *
 * My first ranking sorted on raw magnitude and put unguardedReadme first at
 * 28015 — which is BYTES, against 297 functions and 370 lint errors. Bytes win
 * every comparison they are allowed into, and "28015 outstanding" as the single
 * next action is not a work item, it is a category error. Only surfaces counted
 * in the same unit are ranked against each other; the rest are reported.
 */
const DEBT_UNITS: Readonly<Record<string, 'count' | 'bytes'>> = {
  unguardedReadme: 'bytes',
}

/** What to do about each surface, in the terms the surface is measured in. */
const DEBT_ACTIONS: Readonly<Record<string, string>> = {
  untestedExports: 'call it from a suite that asserts a law, not that it returns something: npm run coverage:audit -- --list',
  lint: 'give a real type where an `any` stands, or delete the binding nothing reads: npx eslint src/',
  decimals: 'carry the integer ratio the float approximates, bound to a named constant',
  prose: 'state the bound, or delete the claim: npm run prose:check',
  unreachable: 'reach it from a declared entry, or stop shipping it',
  typecheck: 'annotate the parameter the compiler is guessing at',
  docFunctions: 'implement what the document declares, or record why it is refused',
  unguardedReadme: 'move the claim into a block something recomputes',
  untestedA432: 'the a432 layer holds most of the untested surface; start with the densest module',
}

/**
 * The largest measured surface, with what to do about it. Zero-count surfaces
 * are not debt; a caller with nothing left gets null and can say so honestly.
 */
export function rankMeasuredDebt(surfaces: Readonly<Record<string, number>>): MeasuredDebt | null {
  // Countable surfaces only. A byte total cannot be "larger" than a number of
  // untested functions in any sense that tells someone what to do next.
  const countable = rankAllMeasuredDebt(surfaces).filter((d) => d.unit === 'count')
  return countable[0] ?? null
}

/** Every surface with work outstanding, largest first. */
export function rankAllMeasuredDebt(surfaces: Readonly<Record<string, number>>): MeasuredDebt[] {
  return Object.entries(surfaces)
    .filter(([, n]) => Number.isFinite(n) && n > 0)
    // Counts first, then bytes, each group by magnitude. A list that
    // interleaves the two invites the comparison the ranking refuses to make.
    .sort((a, b) => {
      const ua = DEBT_UNITS[a[0]] ?? 'count'
      const ub = DEBT_UNITS[b[0]] ?? 'count'
      if (ua !== ub) return ua === 'count' ? -1 : 1
      return b[1] - a[1] || a[0].localeCompare(b[0])
    })
    .map(([surface, count]) => ({
      surface,
      count,
      unit: DEBT_UNITS[surface] ?? 'count',
      action: DEBT_ACTIONS[surface] ?? `reduce ${surface}; it is measured and nothing is acting on it`,
    }))
}

export function nextSelfDevelopTip() {
  const s = selfBuild()
  const tipForm = s.plan.tipForm
  return {
    stalled: s.stalled,
    kind: s.tip.kind,
    path: s.tip.path,
    line: s.tip.line,
    action: s.tip.action,
    statement: s.tip.statement,
    boundary: s.tip.boundary,
    form: tipForm.form,
    code: tipForm.code,
    proof: tipForm.proof,
    accepted: tipForm.accepted,
    refuseReason: tipForm.refuseReason,
    verify: s.plan.weave.verify,
    fn: s.plan.weave.fn,
    root: s.root,
    receipt: s.tip.receipt,
    vortexInvariantsHold: s.vortexInvariantsHold,
  }
}
