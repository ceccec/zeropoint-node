/**
 * Kernel barrel — double-torus development entry.
 * Lobe L (ceccec) + Lobe R (erpax) feed through src/0.
 */

export * from '../0/index.ts'
export * from './legacy.ts'
export {
  computeContentUuid,
  computeContentDigest,
  contentUuidOf,
  verifyContentUuid,
  jcsCanonicalize,
  foldIntegrityReceipt,
  ZEROPOINT_NAMESPACE_ROOT,
} from '../integrity/content-uuid.ts'
export { appendReceipt, verifyReceiptLink, GENESIS_PREV } from '../integrity/receipt.ts'
export type { Receipt } from '../integrity/receipt.ts'
export {
  foldA432ImportExportGraph,
  importExportGraphTip,
  SRC_ROOT,
} from './import-graph.ts'
export type { ImportExportCensus, GraphNode, GraphEdge } from './import-graph.ts'
export { foldA432AuditCensus, auditTip, A432_DIR } from './audit.ts'
export type { AuditCensus, AuditHit } from './audit.ts'
export {
  planTrinity,
  selfBuild,
  nextSelfDevelopTip,
} from './self-develop.ts'
export type { PlanTrinity, SelfDevelopTip, SelfBuildStatus } from './self-develop.ts'

import { developmentVortex, foldPair, merkleFold, toUuid, WAVE_CHAIN } from '../0/index.ts'
import { foldIntegrityReceipt } from '../integrity/content-uuid.ts'

/** Run all wave tips through the development vortex; each feeds the next. */
export function runDevelopmentVortexAll() {
  const waves = WAVE_CHAIN.map((wave) => developmentVortex(wave))
  const roots = waves.map((w) => w.root)
  const chain = roots.reduce((prev, root, i) => {
    if (i === 0) return root
    return foldPair(prev, root).merged
  }, toUuid('development-vortex:start'))
  const integrity = foldIntegrityReceipt('development-vortex-all', {
    waves: WAVE_CHAIN.slice(),
    roots,
  })
  return {
    waves,
    chain,
    integrity,
    root: merkleFold([chain, integrity, ...roots]),
    ok: waves.every((w) => w.computes),
    statement: 'All chat waves feed each other in the double-torus development vortex.',
  }
}
