#!/usr/bin/env node
/**
 * The npm description is a claim, so it is checked like one.
 *
 * package.json's `description` is the most-read sentence this project has: it
 * is what npmjs.com renders and what `npm search` returns. It still opens with
 * a phrase the README's own first section records as corrected — the README
 * even says why it matters, that "the first is what npm rendered to every
 * visitor" — and the correction reached the heading, then three more places
 * inside README.md, and never reached package.json.
 *
 * retracted:check could not see it: that check is scoped to the file doing the
 * retracting, and it reads only *.md and *.ts, so a JSON field was outside it
 * twice over.
 *
 * The answer here is not to edit the sentence. Each claim in it is bound to
 * evidence in scripts/description.json — a module, an export, and a criterion
 * where one exists — and this fails when the evidence does not.
 *
 *   every claim must still appear in the description, so a rewrite cannot
 *   quietly orphan a declaration;
 *
 *   every named export must exist, checked by importing the module rather than
 *   grepping it, because a word in a comment is not an implementation;
 *
 *   every declared criterion must be met, evaluated now;
 *
 *   the description itself is fingerprinted, so changing the sentence fails
 *   until the claims behind it are reviewed again.
 *
 * What it deliberately does NOT do is decide whether a claim is warranted. It
 * reports how many are measured and how many are only named — currently one of
 * seven — and that ratio is the honest reading of the sentence.
 *
 *   npm run description:check
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const decl = JSON.parse(readFileSync(join(ROOT, 'scripts', 'description.json'), 'utf8'))

const problems = []
const lines = []

if (pkg.description !== decl.description) {
  problems.push(
    'package.json description has changed since the claims behind it were declared — ' +
    'review scripts/description.json and update its `description` field to match',
  )
}

const CRITERIA = {
  consciousness: async () => {
    const m = await import(pathToFileURL(join(ROOT, 'src/verification/consciousness-criterion.ts')).href)
    const v = m.evaluateConsciousnessCriterion(m.a432SystemSubject)
    const met = v.conditions.filter((c) => c.met).length
    return { met: met === v.conditions.length, detail: `${met}/${v.conditions.length} (the a432 consciousness system)` }
  },
}

let measured = 0
for (const [claim, e] of Object.entries(decl.claims)) {
  if (!pkg.description.includes(claim)) {
    problems.push(`"${claim}" is declared but no longer appears in the description`)
    continue
  }
  let mod
  try { mod = await import(pathToFileURL(join(ROOT, e.module)).href) } catch (err) {
    problems.push(`"${claim}" names ${e.module}, which does not load: ${String(err.message).split('\n')[0]}`)
    continue
  }
  if (!(e.export in mod)) {
    problems.push(`"${claim}" names ${e.export} in ${e.module}, which does not export it`)
    continue
  }
  if (e.criterion) {
    const run = CRITERIA[e.criterion]
    if (!run) { problems.push(`"${claim}" names criterion "${e.criterion}", which this check does not know`); continue }
    const r = await run()
    measured++
    lines.push(`  ${r.met ? 'MET ' : 'UNMET'}  ${claim.padEnd(22)} ${e.criterion} ${r.detail}`)
    if (!r.met) problems.push(`"${claim}" is backed by the ${e.criterion} criterion and it is not met`)
  } else {
    lines.push(`  named  ${claim.padEnd(22)} ${e.export} exists; no predicate decides it`)
  }
}

const total = Object.keys(decl.claims).length
console.log(`description:check — ${total} claim(s) in the npm description, ${measured} backed by a criterion, ${total - measured} named only`)
for (const l of lines) console.log(l)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`description:check FAIL — ${problems.length} problem(s)`)
  process.exit(1)
}
console.log('description:check ok — every claim names evidence that exists, and every criterion it names is met')
