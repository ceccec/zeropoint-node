#!/usr/bin/env node
/**
 * Emit the next self-develop tip from planTrinity / audit.
 * If development stops, gaps in self-development exist — this prints them.
 */

import { nextSelfDevelopTip, selfBuild } from '../src/kernel/self-develop.ts'
import { foldA432AuditCensus } from '../src/kernel/audit.ts'

const tip = nextSelfDevelopTip()
const build = selfBuild()
const audit = foldA432AuditCensus()
const out = {
  law: 'if development stops, gaps in self-development exist',
  stalled: build.stalled,
  reason: build.reason,
  tip,
  debt: {
    neitherDirect: audit.neitherDirect,
    harmonicAliasImporters: audit.harmonicAliasImporters,
    mathCount: audit.mathCount,
    forkCount: audit.forkCount,
  },
  claySolved: tip.claySolved,
  physicalFtl: tip.physicalFtl,
}
console.log(JSON.stringify(out, null, 2))
if (build.stalled && process.argv.includes('--fail-on-stall')) process.exit(2)
