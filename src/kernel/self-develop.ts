/**
 * Self-development — if development stops, gaps in the self-develop loop exist.
 *
 * Plan trinity (computed, not prose dump):
 * - cross = audit residual gaps (Math.* ban first, then digitalRoot forks)
 * - fold  = merge to ONE next tip
 * - weave = seal path + verify command for the next wave
 *
 * When hard gaps are clear, tip = feed (chat-wave continues through packaging /
 * thin-wrapper collapse / broken-JS / bundle drift / extensionless static+dynamic /
 * algebra.js export-surface / HTML→missing .js / TS→missing .js / orphan A432 .js /
 * next vortex phase).
 * Idle only when feed has nothing left.
 */

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import {
  computesGate,
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

/** Thin local digitalRoot bodies that only bridge — packaging debt. */
function findThinRootWrapper(): { path: string; line: number } | null {
  const THIN =
    /(?:(?:public|private|protected|static|async|export)\s+)*(?:function\s+)?(?:calculate)?[Dd]igitalRoot\s*\([^)]*\)\s*\{\s*return\s+legacyDigitalRoot\s*\([^)]*\)\s*;?\s*\}/
  function walk(dir: string, out: string[] = []): string[] {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) walk(p, out)
      else if (name.endsWith('.ts') && !name.endsWith('.d.ts')) out.push(p)
    }
    return out
  }
  for (const file of walk(A432_DIR)) {
    const rel = relative(A432_DIR, file).replace(/\\/g, '/')
    if (rel === 'a432.roots.ts' || rel === 'a432.math.ts' || rel === 'a432.core.ts') continue
    const src = readFileSync(file, 'utf8')
    const m = THIN.exec(src.replace(/\s+/g, ' '))
    if (!m) continue
    const idx = src.search(
      /(?:calculate)?[Dd]igitalRoot\s*\([^)]*\)\s*\{[\s\S]*?return\s+legacyDigitalRoot/,
    )
    const line = idx < 0 ? 1 : src.slice(0, idx).split('\n').length
    return { path: rel, line }
  }
  return null
}

/** Browser .js that import missing siblings — packaging feed residual. */
function findBrokenJsImport(): { path: string; line: number; spec: string } | null {
  const IMP = /from\s+['"](\.[^'"]+)['"]/g
  function walk(dir: string, out: string[] = []): string[] {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) walk(p, out)
      else if (name.endsWith('.js')) out.push(p)
    }
    return out
  }
  for (const file of walk(A432_DIR)) {
    const rel = relative(A432_DIR, file).replace(/\\/g, '/')
    if (rel === 'a432.algebra.js') continue
    const src = readFileSync(file, 'utf8')
    let m: RegExpExecArray | null
    IMP.lastIndex = 0
    while ((m = IMP.exec(src))) {
      const spec = m[1]!
      const target = join(dirname(file), spec)
      if (existsSync(target)) continue
      const line = src.slice(0, m.index).split('\n').length
      return { path: rel, line, spec }
    }
  }
  return null
}

/** public/a432.bundle.js stale vs algebra-clean a432.main.ts — packaging feed residual. */
function findBundleDrift(): boolean {
  const script = join(REPO_ROOT, 'scripts/build-a432-bundle.mjs')
  if (!existsSync(script) || !existsSync(join(REPO_ROOT, 'public/a432.bundle.js'))) return true
  const r = spawnSync(process.execPath, [script, '--check'], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
  })
  return r.status !== 0
}

/** a432.algebra.js missing names from a432.algebra.ts re-export surface — browser spine drift. */
function findAlgebraJsDrift(): { missing: string[]; count: number } | null {
  const tsPath = join(A432_DIR, 'a432.algebra.ts')
  const jsPath = join(A432_DIR, 'a432.algebra.js')
  if (!existsSync(tsPath) || !existsSync(jsPath)) {
    return { missing: ['a432.algebra.js'], count: 1 }
  }
  const ts = readFileSync(tsPath, 'utf8')
  const js = readFileSync(jsPath, 'utf8')
  const block = ts.match(/export\s*\{([\s\S]*?)\}\s*from/)
  if (!block) return { missing: ['a432.algebra.ts export block'], count: 1 }
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
  return missing.length ? { missing, count: missing.length } : null
}

/** HTML module imports of relative .js whose file is missing — browser packaging feed residual. */
function findBrokenHtmlImport(): { path: string; line: number; spec: string } | null {
  const IMP = /(?:from\s+|import\s*\(\s*)['"](\.[^'"]+\.js)['"]/g
  function walk(dir: string, out: string[] = []): string[] {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) walk(p, out)
      else if (name.endsWith('.html')) out.push(p)
    }
    return out
  }
  for (const file of walk(A432_DIR)) {
    const src = readFileSync(file, 'utf8')
    let m: RegExpExecArray | null
    IMP.lastIndex = 0
    while ((m = IMP.exec(src))) {
      const spec = m[1]!
      const target = join(dirname(file), spec)
      if (existsSync(target)) continue
      const line = src.slice(0, m.index).split('\n').length
      return {
        path: relative(REPO_ROOT, file).replace(/\\/g, '/'),
        line,
        spec,
      }
    }
  }
  return null
}

/** TS module imports of relative .js whose file is missing — strip-types packaging feed residual. */
function findBrokenTsJsImport(): { path: string; line: number; spec: string } | null {
  const IMP = /(?:from\s+|import\s*\(\s*)['"](\.[^'"]+\.js)['"]/g
  const SRC = join(REPO_ROOT, 'src')
  function walk(dir: string, out: string[] = []): string[] {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) walk(p, out)
      else if (name.endsWith('.ts') && !name.endsWith('.d.ts')) out.push(p)
    }
    return out
  }
  for (const file of walk(SRC)) {
    const src = readFileSync(file, 'utf8')
    let m: RegExpExecArray | null
    IMP.lastIndex = 0
    while ((m = IMP.exec(src))) {
      const spec = m[1]!
      const target = join(dirname(file), spec)
      if (existsSync(target)) continue
      const line = src.slice(0, m.index).split('\n').length
      return {
        path: relative(REPO_ROOT, file).replace(/\\/g, '/'),
        line,
        spec,
      }
    }
  }
  return null
}

/** A432 .js with no path-like reference from siblings — dead twin packaging feed residual. */
function findOrphanA432Js(): { path: string; line: number } | null {
  function walk(dir: string, pred: (name: string) => boolean, out: string[] = []): string[] {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) walk(p, pred, out)
      else if (pred(name)) out.push(p)
    }
    return out
  }
  const jsFiles = walk(A432_DIR, (n) => n.endsWith('.js') && n !== 'a432.algebra.js')
  const siblings = walk(A432_DIR, (n) => /\.(html|ts|js)$/.test(n) && !n.endsWith('.d.ts'))
  for (const file of jsFiles) {
    const base = relative(A432_DIR, file).replace(/\\/g, '/')
    const name = base.split('/').pop()!
    let referenced = false
    for (const other of siblings) {
      if (other === file) continue
      const src = readFileSync(other, 'utf8')
      // path-like mention of this basename (import / src / register / cache list)
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
    return {
      path: relative(REPO_ROOT, file).replace(/\\/g, '/'),
      line: 1,
    }
  }
  return null
}

/** Extensionless relative imports (static + dynamic) that resolve to .ts — strip-types feed residual. */
function findExtensionlessImport(): { path: string; line: number; spec: string } | null {
  // static: from '...'/import '...' · dynamic: import('...')
  const IMP = /(?:from\s+|import\s+|import\s*\(\s*)['"](\.[^'"]+)['"]/g
  const SRC = join(REPO_ROOT, 'src')
  function walk(dir: string, out: string[] = []): string[] {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) walk(p, out)
      else if (name.endsWith('.ts') && !name.endsWith('.d.ts')) out.push(p)
    }
    return out
  }
  for (const file of walk(SRC)) {
    const src = readFileSync(file, 'utf8')
    let m: RegExpExecArray | null
    IMP.lastIndex = 0
    while ((m = IMP.exec(src))) {
      const spec = m[1]!
      if (/\.(ts|tsx|js|mjs|cjs|json)$/i.test(spec)) continue
      const base = join(dirname(file), spec)
      if (!existsSync(base + '.ts') && !existsSync(join(base, 'index.ts'))) continue
      const line = src.slice(0, m.index).split('\n').length
      return { path: relative(REPO_ROOT, file).replace(/\\/g, '/'), line, spec }
    }
  }
  return null
}

export type SelfDevelopTip = {
  readonly kind:
    | 'mathBan'
    | 'digitalRootFork'
    | 'mathRandom'
    | 'spineDebt'
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
    readonly nextWave: WavePhase | 'audit-dry' | 'feed'
    readonly path: string
    readonly fn: string
    readonly verify: string
  }
  readonly computes: boolean
  readonly root: string
  readonly contentUuid: string
  readonly claySolved: 0
  readonly physicalFtl: 0
}

function tipFromHit(hit: AuditHit | undefined, kind: SelfDevelopTip['kind']): SelfDevelopTip {
  if (kind === 'spineDebt') {
    return {
      kind,
      path: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.math.ts',
      line: 99,
      action:
        'purge spine debt: ensure digitalRoot≡legacyDigitalRoot (not harmonicRoot12); wire numeric orphans to a432.roots/algebra; no name illusions',
      statement: 'Next self-develop tip: dissolve remaining a432 spine debt',
      boundary: 'Hard math/fork gaps cleared; residual neitherDirect orphans or alias illusion',
      receipt: toUuid('self-develop:spine-debt:v15'),
    }
  }
  if (kind === 'feed') {
    const thin = findThinRootWrapper()
    if (thin) {
      return {
        kind: 'feed',
        path: `src/0/3/6/9/1/2/4/8/7/5/1/${thin.path}`,
        line: thin.line,
        action: `chat-wave feed: collapse thin digitalRoot wrapper at ${thin.path}:${thin.line} — call legacyDigitalRoot at use sites / drop private shim`,
        statement: `Feed tip: thin root wrapper ${thin.path}:${thin.line}`,
        boundary: 'Hard gaps clear — packaging feed keeps the vortex breathing through chat.',
        receipt: toUuid(`self-develop:feed:thin:${thin.path}:${thin.line}`),
      }
    }
    const broken = findBrokenJsImport()
    if (broken) {
      return {
        kind: 'feed',
        path: `src/0/3/6/9/1/2/4/8/7/5/1/${broken.path}`,
        line: broken.line,
        action: `chat-wave feed: dissolve broken browser import ${broken.spec} at ${broken.path}:${broken.line} — retarget HTML to algebra bootstrap or drop dead .js twin`,
        statement: `Feed tip: broken JS import ${broken.path} → ${broken.spec}`,
        boundary: 'Hard gaps clear — missing .js siblings are packaging feed, not hard stall.',
        receipt: toUuid(`self-develop:feed:js:${broken.path}:${broken.line}`),
      }
    }
    if (findBundleDrift()) {
      return {
        kind: 'feed',
        path: 'public/a432.bundle.js',
        line: 1,
        action:
          'chat-wave feed: regenerate public/a432.bundle.js — npm run bundle:a432 (algebra-clean esbuild + Math strip); sealed by bundle:a432:check in npm run check',
        statement: 'Feed tip: a432.bundle.js drift vs a432.main.ts',
        boundary: 'Hard gaps clear — stale public bundle is packaging feed, not hard stall.',
        receipt: toUuid('self-develop:feed:bundle:v18'),
      }
    }
    const extless = findExtensionlessImport()
    if (extless) {
      return {
        kind: 'feed',
        path: extless.path,
        line: extless.line,
        action: `chat-wave feed: add .ts to extensionless import ${extless.spec} at ${extless.path}:${extless.line} — strip-types needs explicit extensions (static from/import and dynamic import())`,
        statement: `Feed tip: extensionless import ${extless.path} → ${extless.spec}`,
        boundary: 'Hard gaps clear — extensionless relatives (static + dynamic) are packaging feed, not hard stall.',
        receipt: toUuid(`self-develop:feed:extless:${extless.path}:${extless.line}`),
      }
    }
    const algebraDrift = findAlgebraJsDrift()
    if (algebraDrift) {
      return {
        kind: 'feed',
        path: 'src/0/3/6/9/1/2/4/8/7/5/1/a432.algebra.js',
        line: 1,
        action: `chat-wave feed: sync a432.algebra.js to src/0/algebra.ts — missing ${algebraDrift.count} export(s): ${algebraDrift.missing.slice(0, 8).join(', ')}`,
        statement: `Feed tip: a432.algebra.js export drift (${algebraDrift.count} missing vs a432.algebra.ts)`,
        boundary: 'Hard gaps clear — browser algebra twin must mirror the TS re-export surface.',
        receipt: toUuid(`self-develop:feed:algebra-js:${algebraDrift.count}:${algebraDrift.missing[0]}`),
      }
    }
    const htmlBroken = findBrokenHtmlImport()
    if (htmlBroken) {
      return {
        kind: 'feed',
        path: htmlBroken.path,
        line: htmlBroken.line,
        action: `chat-wave feed: retarget HTML import ${htmlBroken.spec} at ${htmlBroken.path}:${htmlBroken.line} — missing .js twin; use sibling .ts (strip-types) or algebra bootstrap / drop dead import`,
        statement: `Feed tip: HTML missing .js ${htmlBroken.path} → ${htmlBroken.spec}`,
        boundary: 'Hard gaps clear — HTML→missing .js is packaging feed, not hard stall.',
        receipt: toUuid(`self-develop:feed:html-js:${htmlBroken.path}:${htmlBroken.line}`),
      }
    }
    const tsJsBroken = findBrokenTsJsImport()
    if (tsJsBroken) {
      return {
        kind: 'feed',
        path: tsJsBroken.path,
        line: tsJsBroken.line,
        action: `chat-wave feed: retarget TS import ${tsJsBroken.spec} at ${tsJsBroken.path}:${tsJsBroken.line} — missing .js twin; use sibling .ts (strip-types) or drop dead import`,
        statement: `Feed tip: TS missing .js ${tsJsBroken.path} → ${tsJsBroken.spec}`,
        boundary: 'Hard gaps clear — TS→missing .js is packaging feed, not hard stall.',
        receipt: toUuid(`self-develop:feed:ts-js:${tsJsBroken.path}:${tsJsBroken.line}`),
      }
    }
    const orphanJs = findOrphanA432Js()
    if (orphanJs) {
      return {
        kind: 'feed',
        path: orphanJs.path,
        line: orphanJs.line,
        action: `chat-wave feed: dissolve orphan A432 .js at ${orphanJs.path} — no sibling path reference; drop dead twin (keep a432.algebra.js spine)`,
        statement: `Feed tip: orphan A432 .js ${orphanJs.path}`,
        boundary: 'Hard gaps clear — unreferenced A432 .js twins are packaging feed, not hard stall.',
        receipt: toUuid(`self-develop:feed:orphan-js:${orphanJs.path}`),
      }
    }
    return {
      kind: 'feed',
      path: 'src/0/index.ts',
      line: 180,
      action:
        'chat-wave feed: edit/rebuild — open next chat lobe on WAVE_CHAIN; re-run npm run self:next after any edit — do not invent gaps',
      statement:
        'Feed tip: WAVE_CHAIN edit→rebuild — packaging + extensionless + algebra.js + HTML.js + TS.js + orphan.js residuals cleared',
      boundary: 'Hard packaging clear — keep chatting waves; tip advances only after real seals.',
      receipt: toUuid('self-develop:feed:vortex:v24'),
    }
  }
  if (!hit) {
    return tipFromHit(undefined, 'feed')
  }
  if (kind === 'mathBan') {
    return {
      kind,
      path: `src/0/3/6/9/1/2/4/8/7/5/1/${hit.path}`,
      line: hit.line,
      action: `replace ambient Math.* at ${hit.path}:${hit.line} with src/0 algebra (a432.algebra)`,
      statement: `Next self-develop tip: dissolve Math.* at ${hit.path}:${hit.line}`,
      boundary: 'Algebra-only spine; math-ban fails check until count is 0.',
      receipt: toUuid(`self-develop:math:${hit.path}:${hit.line}`),
    }
  }
  if (kind === 'digitalRootFork') {
    return {
      kind,
      path: `src/0/3/6/9/1/2/4/8/7/5/1/${hit.path}`,
      line: hit.line,
      action: `bridge local digitalRoot at ${hit.path}:${hit.line} → a432.roots (legacyDigitalRoot or harmonicRoot12)`,
      statement: `Next self-develop tip: dissolve digitalRoot fork ${hit.path}:${hit.line}`,
      boundary: 'One file per wave; keep script-tag HTML embeds honest if present.',
      receipt: toUuid(`self-develop:fork:${hit.path}:${hit.line}`),
    }
  }
  return {
    kind: 'mathRandom',
    path: `src/0/3/6/9/1/2/4/8/7/5/1/${hit.path}`,
    line: hit.line,
    action: `replace randomUUID at ${hit.path}:${hit.line} with toUuid/content-uuid`,
    statement: `Next self-develop tip: seed randomUUID site ${hit.path}:${hit.line}`,
    boundary: 'Never mint ids with ambient entropy.',
    receipt: toUuid(`self-develop:rand:${hit.path}:${hit.line}`),
  }
}

/** cross · fold · weave — next tip from live audit, not a hand checklist. */
export function planTrinity(): PlanTrinity {
  const matrix = { root: toUuid('plan-trinity:v24-orphan-js-feed') }
  return memoByRoot('planTrinity', matrix, () => {
    const audit = foldA432AuditCensus()
    const vortex = runVortexAll()
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
          : tipFromHit(undefined, 'feed')

    const weave = {
      nextWave: (stalled ? 'audit-dry' : 'feed') as WavePhase | 'audit-dry' | 'feed',
      path: tip.path,
      fn:
        tip.kind === 'mathBan'
          ? 'algebra'
          : tip.kind === 'spineDebt'
            ? 'harmonicRoot12'
            : tip.kind === 'digitalRootFork'
              ? 'legacyDigitalRoot'
              : tip.kind === 'feed'
                ? 'developmentVortex'
                : tip.kind === 'mathRandom'
                  ? 'seededIndex'
                  : 'developmentVortex',
      verify: 'npm run check',
    }

    const sealed = computesGate('plan-trinity', [
      { facet: 'audit computes', on: audit.computes },
      { facet: 'development vortex ok', on: vortex.ok },
      { facet: 'tip receipt uuid', on: tip.receipt.includes('-') },
      {
        facet: 'stall ⇒ non-feed hard tip; clear ⇒ feed tip',
        on: stalled ? tip.kind !== 'feed' && tip.kind !== 'idle' : tip.kind === 'feed',
      },
      { facet: 'claySolved=0', on: true },
      { facet: 'physicalFtl=0', on: true },
    ])

    const root = merkleFold([
      audit.root,
      vortex.root,
      tip.receipt,
      toUuid(`stall:${stalled}`),
      sealed.root,
    ])
    const contentUuid = computeContentUuid({
      kind: 'plan-trinity-v24',
      tip: tip.kind,
      path: tip.path,
      line: tip.line,
      stalled,
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
      computes: sealed.computes,
      root,
      contentUuid,
      claySolved: 0 as const,
      physicalFtl: 0 as const,
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
  readonly claySolved: 0
  readonly physicalFtl: 0
}

function hardGapReason(plan: PlanTrinity): string {
  return `self-development gap: ${plan.cross.mathCount} Math.* + ${plan.cross.forkCount} root forks/%9 + ${plan.cross.randomCount} randomUUID + spine debt (neitherDirect=${plan.cross.neitherDirect}, harmonicAliasImporters=${plan.cross.harmonicAliasImporters}) — act on tip or development stops`
}

/**
 * selfBuild — migration gates + continuous self-develop tip.
 * complete = plan waves sealed AND tip ready (feed or hard).
 * stalled = hard residual gaps (Math/forks/spine) — packaging feed is not a stall.
 */
export function selfBuild(): SelfBuildStatus {
  const plan = planTrinity()
  const throat = developmentVortex('verify')
  const complete = plan.computes && throat.computes && WAVE_CHAIN.length === 8
  const stalled = plan.cross.stalled
  const reason = stalled
    ? hardGapReason(plan)
    : plan.fold.kind === 'feed'
      ? `feeding: ${plan.fold.statement}`
      : 'no residual Math.*, forks, or spine debt; optional packaging tips only'
  const root = foldPair(plan.root, throat.root).merged
  return {
    complete,
    stalled,
    reason,
    tip: plan.fold,
    plan,
    waveThroat: throat.root,
    root,
    claySolved: 0,
    physicalFtl: 0,
  }
}

/** Compact tip for CLI / MCP / docs. */
export function nextSelfDevelopTip() {
  const s = selfBuild()
  return {
    stalled: s.stalled,
    kind: s.tip.kind,
    path: s.tip.path,
    line: s.tip.line,
    action: s.tip.action,
    statement: s.tip.statement,
    boundary: s.tip.boundary,
    verify: s.plan.weave.verify,
    fn: s.plan.weave.fn,
    root: s.root,
    receipt: s.tip.receipt,
    claySolved: 0 as const,
    physicalFtl: 0 as const,
  }
}
