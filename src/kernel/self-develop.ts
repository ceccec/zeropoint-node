/**
 * Self-development — if development stops, gaps in the self-develop loop exist.
 *
 * Plan trinity (computed, not prose dump):
 * - cross = audit residual gaps (Math.* ban first, then digitalRoot forks)
 * - fold  = merge to ONE next tip
 * - weave = seal path + verify command for the next wave
 *
 * Stall detector: tip exists but was not sealed → self-development gap.
 */

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
import { foldA432AuditCensus, type AuditHit } from './audit.ts'

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

export type SelfDevelopTip = {
  readonly kind: 'mathBan' | 'digitalRootFork' | 'mathRandom' | 'spineDebt' | 'extensionlessImport' | 'idle'
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
    readonly nextWave: WavePhase | 'audit-dry'
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
  if (!hit) {
    return {
      kind: 'idle',
      path: 'src/0',
      line: 0,
      action: 'idle — no residual Math.*, forks, or spine alias debt',
      statement: 'Self-development idle: audit gaps cleared. Continue only on optional packaging tips.',
      boundary: 'Idle ≠ finished forever — re-run audit after any edit.',
      receipt: toUuid('self-develop:idle'),
    }
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
  const matrix = { root: toUuid('plan-trinity:v15-purge') }
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
          : tipFromHit(audit.mathRandomSites[0], 'mathRandom')

    const weave = {
      nextWave: (tip.kind === 'idle' ? ('verify' as WavePhase) : 'audit-dry') as WavePhase | 'audit-dry',
      path: tip.path,
      fn:
        tip.kind === 'mathBan'
          ? 'algebra'
          : tip.kind === 'spineDebt'
            ? 'harmonicRoot12'
            : tip.kind === 'digitalRootFork'
              ? 'legacyDigitalRoot'
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
        facet: 'stall ⇒ tip not idle OR idle ⇒ gaps=0',
        on: stalled ? tip.kind !== 'idle' : tip.kind === 'idle',
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
      kind: 'plan-trinity',
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
 * complete = plan waves sealed AND (idle tip OR tip ready).
 * stalled = residual gaps exist (development would stop without acting on tip).
 */
export function selfBuild(): SelfBuildStatus {
  const plan = planTrinity()
  const throat = developmentVortex('verify')
  const complete = plan.computes && throat.computes && WAVE_CHAIN.length === 8
  const stalled = plan.cross.stalled
  const reason = stalled
    ? hardGapReason(plan)
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
