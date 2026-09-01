#!/usr/bin/env node
/**
 * Emit the next self-develop tip from planTrinity / audit.
 * If development stops, gaps in self-development exist — this prints them.
 */

import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { nextSelfDevelopTip, selfBuild, rankMeasuredDebt, rankAllMeasuredDebt } from '../src/kernel/self-develop.ts'
import { foldA432AuditCensus } from '../src/kernel/audit.ts'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const readJson = (rel) => { try { return JSON.parse(readFileSync(join(ROOT, rel), 'utf8')) } catch { return {} } }

// The counts the rest of the gate already measures. Read HERE rather than in
// the kernel: neither file is in package.files, so a kernel module reading them
// would work in this repository and throw for everyone who installed it.
const surfaces = {
  ...(readJson('ratchet.json').ceilings ?? {}),
  untestedExports: readJson('coverage-ceiling.json').untestedExports ?? 0,
}

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
  // The five sources above are all zero and have been for a while, which is
  // why every run produced a `feed` tip telling the reader to keep chatting
  // waves. These are the gaps that actually exist.
  measured: {
    largest: rankMeasuredDebt(surfaces),
    all: rankAllMeasuredDebt(surfaces),
  },
  vortexInvariantsHold: tip.vortexInvariantsHold,
}
// A generic feed tip in front of real measured debt is the engine saying
// "nothing to do" while the gate counts thousands. Name the work instead.
const largest = out.measured.largest
if (largest && out.tip.kind === 'feed') {
  out.tip = {
    ...out.tip,
    action: `${largest.surface}: ${largest.count} outstanding — ${largest.action}`,
    statement: `Measured debt: ${largest.surface} at ${largest.count}`,
  }
  out.reason = `measured: ${largest.surface} at ${largest.count}`
}

console.log(JSON.stringify(out, null, 2))
if (build.stalled && process.argv.includes('--fail-on-stall')) process.exit(2)
