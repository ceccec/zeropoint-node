#!/usr/bin/env node
/**
 * The ruler may not change without saying so.
 *
 * ratchet.json holds twelve ceilings that only move down, and `raised` records
 * the rare deliberate increase with its reason. Nothing recorded a change to
 * the MEASURE. Edit how `proseClaimCount` counts, run `npm run ratchet`, and
 * the ceiling silently re-baselines against a different ruler — the shrink-only
 * guarantee still reads as intact, while the numbers on either side of the
 * commit are no longer comparable to each other.
 *
 * This is the failure I nearly committed today rather than one I read about.
 * The ratchet refused a README edit because my corrections ran 3135 bytes
 * longer than the errors they replaced, and my first instinct was to widen what
 * counts as guarded prose so the new lines would be credited. The argument for
 * it was decent. It was also changing the measure because my change broke the
 * gate, and nothing in the repository would have reported that. A peer working
 * on another tree did the same thing in the same hour from the opposite
 * direction: widened a detector, then re-baselined the debt list upward,
 * growing a shrink-only number by changing what it counted.
 *
 * So each measure is fingerprinted. The fingerprint is the function's syntax
 * tree printed WITHOUT comments, so rewording the explanation above a measure
 * is free and changing what it counts is not.
 *
 * A changed fingerprint is not an error. It is an error to change one silently:
 * ratchet.json must carry a `remeasured` entry naming the surface, the ceiling
 * that was in force under the OLD ruler, and why the new one is better. The old
 * ceiling is kept because it is the number a future reader would otherwise
 * compare against without knowing it was measured differently.
 *
 *   npm run measure:check
 *   npm run measure:record -- --surface=prose --reason="..."
 */

import ts from 'typescript'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const RATCHET_SRC = join(ROOT, 'scripts', 'ratchet.mjs')
const STATE = join(ROOT, 'ratchet.json')

const source = readFileSync(RATCHET_SRC, 'utf8')
const sf = ts.createSourceFile(RATCHET_SRC, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS)
const printer = ts.createPrinter({ removeComments: true })

/** Every top-level function, by name, printed without comments. */
const bodies = new Map()
sf.forEachChild((n) => {
  if (ts.isFunctionDeclaration(n) && n.name) bodies.set(n.name.text, printer.printNode(ts.EmitHint.Unspecified, n, sf))
  if (ts.isVariableStatement(n)) {
    for (const d of n.declarationList.declarations) {
      if (ts.isIdentifier(d.name) && d.initializer &&
          (ts.isArrowFunction(d.initializer) || ts.isFunctionExpression(d.initializer))) {
        bodies.set(d.name.text, printer.printNode(ts.EmitHint.Unspecified, d.initializer, sf))
      }
    }
  }
})

/** The SURFACES table: which function measures which surface. */
const surfaces = new Map()
sf.forEachChild(function visit(n) {
  if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && n.name.text === 'SURFACES' &&
      n.initializer && ts.isArrayLiteralExpression(n.initializer)) {
    for (const el of n.initializer.elements) {
      if (!ts.isObjectLiteralExpression(el)) continue
      let id = null
      let fn = null
      for (const prop of el.properties) {
        if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) continue
        if (prop.name.text === 'id' && ts.isStringLiteral(prop.initializer)) id = prop.initializer.text
        if (prop.name.text === 'measure' && ts.isIdentifier(prop.initializer)) fn = prop.initializer.text
      }
      if (id && fn) surfaces.set(id, fn)
    }
  }
  ts.forEachChild(n, visit)
})

const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16)
const live = new Map()
const missing = []
for (const [id, fn] of surfaces) {
  const body = bodies.get(fn)
  if (body === undefined) { missing.push(`${id} is measured by ${fn}, which is not a function this file can find`); continue }
  live.set(id, sha(body))
}

const state = JSON.parse(readFileSync(STATE, 'utf8'))
const recorded = state.measures ?? {}
const remeasured = state.remeasured ?? {}

const args = process.argv.slice(2)
const record = args.includes('--record')
const only = (args.find((a) => a.startsWith('--surface=')) ?? '').split('=')[1] ?? null
const reason = (args.find((a) => a.startsWith('--reason=')) ?? '').split('=').slice(1).join('=')

if (record) {
  if (!only) { console.error('measure:record needs --surface=<id>'); process.exit(1) }
  if (!reason) { console.error('measure:record needs --reason="why the new measure is better"'); process.exit(1) }
  if (!live.has(only)) { console.error(`measure:record — no surface named ${only}`); process.exit(1) }
  const was = recorded[only]
  if (was === live.get(only)) { console.error(`measure:record — ${only} is unchanged; nothing to record`); process.exit(1) }
  state.measures = { ...recorded, [only]: live.get(only) }
  state.remeasured = {
    ...remeasured,
    [only]: { ceilingUnderOldMeasure: state.ceilings?.[only] ?? null, fingerprintWas: was ?? null, reason },
  }
  writeFileSync(STATE, JSON.stringify(state, null, 2) + '\n')
  console.log(`measure:record — ${only} remeasured; ceiling under the old measure was ${state.remeasured[only].ceilingUnderOldMeasure}`)
  process.exit(0)
}

const problems = [...missing]

// First run: nothing recorded yet, so adopt rather than fail.
//
// "Nothing recorded" and "the recordings were deleted" look identical from
// here, and they are not the same thing. npm run ratchet used to write only
// { ceilings, raised } and DROP the measures block, so lowering a ceiling after
// a surface shrank — an ordinary, correct act — deleted every fingerprint, and
// the next run of this check adopted the new ones and said "for the first
// time". The gate that exists to stop a measure being redefined was disarmed by
// the ordinary use of the gate above it, and nothing said so.
//
// A tree that already carries ceilings is not a first run. If the ceilings are
// there and the fingerprints are not, something removed them, and adopting
// whatever the measures happen to compute today is the one thing this check
// must not do.
if (Object.keys(recorded).length === 0) {
  const ceilings = Object.keys(state.ceilings ?? {})
  if (ceilings.length > 0) {
    console.error(
      `measure:check FAIL — ratchet.json records ${ceilings.length} ceiling(s) and NO measure fingerprints. `
      + 'That is not a first run: something deleted them. Adopting today\'s fingerprints here would silently '
      + 'accept whatever the measures now compute, which is exactly what this check exists to prevent. '
      + 'Restore ratchet.json from git.')
    process.exit(1)
  }
  state.measures = Object.fromEntries(live)
  writeFileSync(STATE, JSON.stringify(state, null, 2) + '\n')
  console.log(`measure:check — ${live.size} measure(s) fingerprinted for the first time`)
  process.exit(problems.length ? 1 : 0)
}

for (const [id, hash] of live) {
  if (recorded[id] === hash) continue
  if (remeasured[id] && remeasured[id].fingerprintWas === (recorded[id] ?? null)) continue
  problems.push(
    `${id} is measured differently than ratchet.json recorded, and the change is not declared — `
    + `its ceiling ${state.ceilings?.[id]} was set under the old measure, so it is not comparable. `
    + `npm run measure:record -- --surface=${id} --reason="..."`,
  )
}
for (const id of Object.keys(recorded)) {
  if (!live.has(id)) problems.push(`${id} has a recorded measure but no surface measures it any more`)
}

console.log(`measure:check — ${live.size} measure(s) fingerprinted, ${Object.keys(remeasured).length} declared remeasurement(s)`)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`measure:check FAIL — ${problems.length} measure(s) changed without saying so`)
  process.exit(1)
}
console.log('measure:check ok — every ceiling was set under the measure still in force')
