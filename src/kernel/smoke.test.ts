/**
 * Kernel + integrity smoke tests (Wave 1–7).
 * Run: node --experimental-strip-types src/kernel/smoke.test.ts
 */

import {
  asVortex,
  computePhysicalFtl,
  decodeVortexDashAngles,
  developmentVortex,
  digitalRoot,
  fold,
  foldVortex,
  isUuid,
  KERNEL_SEALED,
  merge,
  toUuid,
  vortexStrokeGateways,
} from '../0/index.ts'
import { abs, floor, imul, PI, sin, unitFromSeed } from '../0/algebra.ts'
import { legacyDigitalRoot } from './legacy.ts'
import { runDevelopmentVortexAll } from './index.ts'
import { foldA432ImportExportGraph, importExportGraphTip } from './import-graph.ts'
import { foldA432AuditCensus, auditTip } from './audit.ts'
import { nextSelfDevelopTip, planTrinity, selfBuild, isPreciseTip, tipFormOf } from './self-develop.ts'
import { A432Math } from '../0/3/6/9/1/2/4/8/7/5/1/a432.utils.ts'
import { calculateDigitalRoot } from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.constants.ts'
import { VortexMath } from '../vbm-math.ts'
import {
  computeContentUuid,
  verifyContentUuid,
} from '../integrity/content-uuid.ts'
import {
  appendReceipt,
  computeReceiptId,
  GENESIS_PREV,
  verifyReceiptChain,
  verifyReceiptLink,
} from '../integrity/receipt.ts'
import {
  kernelDigitalRoot,
  legacyDigitalRoot as rootsLegacyDigitalRoot,
  harmonicRoot12,
} from '../0/3/6/9/1/2/4/8/7/5/1/a432.roots.ts'
import { uuidV4 } from '../0/3/6/9/1/2/4/8/7/5/1/a432.uuid.ts'
import {
  digitalRoot as mathDigitalRoot,
  A432_SEQUENCE,
} from '../0/3/6/9/1/2/4/8/7/5/1/a432.math.ts'
import {
  digitalRoot as coreDigitalRoot,
  A432_DIGIT_MEANINGS,
} from '../0/3/6/9/1/2/4/8/7/5/1/a432.core.ts'
import { digitalRoot as osDigitalRoot } from '../0/3/6/9/1/2/4/8/7/5/1/a432.os.math.ts'
import { CMYK_SEQUENCE } from '../0/3/6/9/1/2/4/8/7/5/1/a432.cmyk.ts'
import { getPath, nextSuggestion } from '../0/3/6/9/1/2/4/8/7/5/1/a432.navigation.ts'
import { digitalRoot as streamRoot1 } from '../0/3/6/9/1/2/4/8/7/5/1/a432.1.ts'
import { digitalRoot as streamRootFull } from '../0/3/6/9/1/2/4/8/7/5/1/a432.1.2.4.8.7.5.1.ts'

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(msg)
}

assert(KERNEL_SEALED, 'kernel sealed')
assert(toUuid('a') === toUuid('a'), 'toUuid deterministic')
assert(toUuid('a') !== toUuid('b'), 'toUuid distinguishes')
assert(isUuid(toUuid('x')), 'uuid shape')
assert(merge('a', 'b') !== merge('b', 'a'), 'merge order-sensitive')

const f = fold('lobe:ceccec', 'lobe:erpax')
assert(f.bidirectional, 'foldPair bidirectional')
assert(asVortex(f).orbit.length === 6, 'vortex orbit')

assert(digitalRoot(0) === 9, 'kernel digitalRoot(0)=9')
assert(legacyDigitalRoot(0) === 0, 'legacy digitalRoot(0)=0')
assert(kernelDigitalRoot(0) === 9, 'a432.roots kernel path')
assert(rootsLegacyDigitalRoot(0) === 0, 'a432.roots legacy path')
assert(mathDigitalRoot(0) === 0 && mathDigitalRoot(18) === 9, 'a432.math digitalRoot = legacy')
assert(coreDigitalRoot === mathDigitalRoot, 'a432.core re-exports math digitalRoot')
assert(harmonicRoot12(0) === 0 && harmonicRoot12(12) === 12, 'a432.roots harmonic12')
assert(A432_DIGIT_MEANINGS.length === 10, 'digit meanings via math→core')
assert(A432_SEQUENCE[0] === 0 && A432_SEQUENCE[3] === 9, 'A432_SEQUENCE strip-types')
assert(osDigitalRoot(0) === 0, 'a432.os.math legacy adapter')
assert(CMYK_SEQUENCE[0] === 1 && CMYK_SEQUENCE.length === A432_SEQUENCE.length, 'CMYK_SEQUENCE lockstep')
assert(typeof getPath === 'function' && typeof nextSuggestion === 'function', 'navigation strip-types')
assert(uuidV4('purge-seed') === uuidV4('purge-seed'), 'a432.uuid deterministic')
assert(uuidV4('a') !== uuidV4('b'), 'a432.uuid distinguishes')
assert(foldVortex().valid, 'foldVortex valid')

const stroke = vortexStrokeGateways()
assert(stroke.computes, 'stroke computes')
assert(stroke.gateways.join(',') === '8,3,9,0', 'gateways')

const dash = decodeVortexDashAngles()
assert(dash.vortexMatches, 'dash vortex matches')
assert(dash.fusionIgnites, 'dash 0/ fusionIgnites')
assert(dash.closes, 'dash closes (bearing ∧ vortex ∧ fusionIgnites ∧ last=1)')

const obj = { sequence: '124875369', wave: 1 }
const uuid = computeContentUuid(obj)
assert(verifyContentUuid({ ...obj, uuid }).ok, 'content-uuid verifies')
assert(!verifyContentUuid({ ...obj, uuid, wave: 2 }).ok, 'tamper detected')

const r1 = appendReceipt(GENESIS_PREV, 'w1', { ok: true }, 1)
const r2 = appendReceipt(r1.id, 'w2', { ok: true }, 2)
assert(verifyReceiptLink(GENESIS_PREV, r1), 'genesis link')
assert(verifyReceiptLink(r1, r2), 'receipt adjacent link')
assert(r1.id === computeReceiptId(r1.prev, r1.contentUuid, r1.ts), 'id recomputes from prev+contentUuid+ts')
assert(verifyReceiptChain([r1, r2]).ok, 'walk-verify chain')
assert(!verifyReceiptChain([{ ...r1, id: r2.id }, r2]).ok, 'tampered id fails walk')
assert(!verifyReceiptChain([{ ...r2, prev: GENESIS_PREV }]).ok, 'non-genesis first fails')

const dv = developmentVortex('edit')
assert(dv.computes, 'developmentVortex computes')
assert(dv.throat.bidirectional, 'throat bidirectional')

const all = runDevelopmentVortexAll()
assert(all.ok, 'all waves feed vortex')
assert(isUuid(all.root), 'all-root uuid')

const graph = foldA432ImportExportGraph()
assert(graph.computes, 'import/export graph computes')
assert(graph.fileCount > 0, 'scanned a432 sources')
assert(graph.claySolved === 0, 'claySolved remains 0')
assert(typeof graph.physicalFtl === 'boolean', 'physicalFtl is computed boolean')
assert(graph.physicalFtl === computePhysicalFtl(), 'graph physicalFtl matches compute')
assert(isUuid(graph.root) && isUuid(graph.contentRoot), 'graph roots uuid')
const tip = importExportGraphTip()
assert(tip.root === graph.root, 'tip matches full census root (memoByRoot)')
const graph2 = foldA432ImportExportGraph()
assert(graph2.root === graph.root, 'import graph deterministic')

// Wave 9 — digit-stream bridges use legacyDigitalRoot
assert(streamRoot1 === rootsLegacyDigitalRoot, 'a432.1 digitalRoot is legacyDigitalRoot')
assert(streamRootFull === rootsLegacyDigitalRoot, 'full digit-stream digitalRoot is legacyDigitalRoot')
assert(streamRoot1(0) === 0 && streamRoot1(18) === 9, 'digit-stream legacy values')

// Wave 10 — DRY bridges + audit census
assert(A432Math.digitalRoot(0) === 0 && A432Math.digitalRoot(18) === 9, 'utils→legacy')
assert(calculateDigitalRoot(0) === 0 && calculateDigitalRoot(18) === 9, 'math.constants→legacy')
assert(VortexMath.digitalRoot(0) === 0 && VortexMath.digitalRootFast(18) === 9, 'vbm-math→legacy')
const audit = foldA432AuditCensus()
assert(audit.computes, 'audit census computes')
assert(audit.claySolved === 0, 'audit claySolved=0')
assert(typeof audit.physicalFtl === 'boolean', 'audit physicalFtl boolean')
assert(audit.physicalFtl === computePhysicalFtl(), 'audit physicalFtl matches compute')
assert(auditTip().root === audit.root, 'audit tip memo')

const plan = planTrinity()
assert(plan.computes, 'planTrinity computes')
assert(plan.cross.stalled === (plan.cross.forkCount > 0 || plan.cross.randomCount > 0 || plan.cross.mathCount > 0 || plan.cross.neitherDirect > 0 || plan.cross.harmonicAliasImporters > 0), 'stall law')
assert(typeof plan.physicalFtl === 'boolean', 'plan physicalFtl boolean')
assert(plan.physicalFtl === computePhysicalFtl(), 'plan physicalFtl matches')
assert(plan.tipForm.accepted, 'tip form·code·proof accepted')
assert(plan.tipForm.form === plan.fold.statement, 'form←statement')
assert(plan.tipForm.code === plan.fold.action, 'code←action')
assert(plan.tipForm.proof === plan.weave.verify, 'proof←verify')
assert(isPreciseTip(tipFormOf(plan.fold, plan.weave.verify)).ok, 'isPreciseTip live tip')
assert(!isPreciseTip({ form: 'keep going somehow', code: 'polish', proof: 'maybe' }).ok, 'vague tip refused')
const selfTip = nextSelfDevelopTip()
assert(selfTip.receipt.includes('-'), 'tip receipt')
assert(typeof selfTip.physicalFtl === 'boolean', 'tip physicalFtl boolean')
assert(selfTip.accepted === true, 'self:next tip accepted')
assert(selfTip.form === selfTip.statement && selfTip.code === selfTip.action && selfTip.proof === selfTip.verify, 'tip form map')
const sb = selfBuild()
assert(sb.complete, 'selfBuild complete')
assert(sb.stalled === selfTip.stalled, 'selfBuild stall matches tip')
assert(sb.physicalFtl === selfTip.physicalFtl, 'selfBuild physicalFtl matches tip')
if (sb.stalled) {
  assert(selfTip.kind !== 'idle' && selfTip.kind !== 'feed' && selfTip.kind !== 'quantumisation', 'stalled ⇒ hard tip')
} else if (!sb.physicalFtl) {
  assert(selfTip.kind === 'quantumisation', 'physicalFtl false ⇒ quantumisation tip')
} else {
  assert(selfTip.kind !== 'quantumisation', 'physicalFtl true ⇒ not quantumisation-for-ftl')
  assert(selfTip.kind === 'feed', 'hard-clear ∧ physicalFtl true ⇒ feed tip')
}
assert(audit.mathCount === 0, 'algebra-only: no Math.* under a432')

assert(imul(0x7fffffff, 0x7fffffff) === ((() => {
  const a = 0x7fffffff
  const b = 0x7fffffff
  const ah = (a >>> 16) & 0xffff
  const al = a & 0xffff
  const bh = (b >>> 16) & 0xffff
  const bl = b & 0xffff
  return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)) | 0
})()), 'imul matches 32-bit')
assert(abs(-4) === 4 && floor(3.9) === 3 && floor(-1.1) === -2, 'abs/floor')
assert(unitFromSeed('a') === unitFromSeed('a') && unitFromSeed('a') !== unitFromSeed('b'), 'unitFromSeed')
assert(sin(0) === 0 && PI > 3.14 && PI < 3.15, 'sin/PI algebra')

console.log(
  JSON.stringify({
    ok: true,
    kernel: true,
    integrity: true,
    developmentVortex: { computes: dv.computes, root: dv.root },
    allWaves: { ok: all.ok, root: all.root },
    importExportGraph: {
      computes: tip.computes,
      fileCount: tip.fileCount,
      edgeCount: tip.edgeCount,
      exportCount: tip.exportCount,
      root: tip.root,
      claySolved: tip.claySolved,
      physicalFtl: tip.physicalFtl,
    },
    audit: {
      computes: audit.computes,
      forkCount: audit.forkCount,
      randomCount: audit.randomCount,
      mathCount: audit.mathCount,
      root: audit.root,
    },
    selfDevelop: {
      stalled: selfTip.stalled,
      kind: selfTip.kind,
      path: selfTip.path,
      action: selfTip.action,
      form: selfTip.form,
      code: selfTip.code,
      proof: selfTip.proof,
      accepted: selfTip.accepted,
      physicalFtl: selfTip.physicalFtl,
      claySolved: selfTip.claySolved,
    },
  }),
)
