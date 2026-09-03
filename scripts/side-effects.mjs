#!/usr/bin/env node
/**
 * Which published entry points DO something when they are merely imported.
 *
 * package.json carries no `sideEffects` field, so every bundler must assume the
 * worst and keep all of it — 3.9 MB across 24 subpaths, none of it shakeable.
 * The obvious fix is `"sideEffects": false`, and it would be a lie: one shipped
 * bundle creates a setInterval at load and several write to globalThis, so a
 * bundler that believed the claim could drop them and break a consumer in a way
 * nothing would trace back here.
 *
 * The list is therefore MEASURED rather than declared. Each entry point is
 * imported in its own process and asked three questions:
 *
 *   globals   did new keys appear on globalThis?
 *   handles   did a timer or socket survive the import?
 *   output    did it print? (silent:check already gates this one)
 *
 * A syntactic scan was tried first and refused: grep cannot tell a top-level
 * `setInterval` from one inside a function it never calls, and this repository
 * has twice shipped a measurement that read source text instead of asking the
 * program. Importing is the only thing that answers the question being asked.
 *
 *   npm run sideeffects        list what each entry does at import
 *   npm run sideeffects:check  fail if package.json's list disagrees
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const CHECK = process.argv.includes('--check')

const entries = [...new Set(Object.values(pkg.exports)
  .filter((v) => v && typeof v === 'object' && v.import)
  .map((v) => v.import))]

/** Import one bundle in a fresh process and report what it disturbed. */
function probe(rel) {
  const src = `
    const before = new Set(Object.keys(globalThis))
    await import(${JSON.stringify(join(ROOT, rel))})
    const after = Object.keys(globalThis).filter((k) => !before.has(k))
    const handles = (process._getActiveHandles?.() ?? []).length
    const timers = (process._getActiveRequests?.() ?? []).length
    console.log(JSON.stringify({ globals: after, handles, timers }))
    process.exit(0)
  `
  try {
    const out = execFileSync('node', ['--input-type=module', '-e', src], { encoding: 'utf8', timeout: 30_000, stdio: ['ignore', 'pipe', 'pipe'] })
    const line = out.trim().split('\n').filter((l) => l.startsWith('{')).pop()
    return line ? JSON.parse(line) : { globals: [], handles: 0, timers: 0, unreadable: true }
  } catch (e) {
    return { globals: [], handles: 0, timers: 0, failed: (e.message ?? '').slice(0, 60) }
  }
}

const results = entries.map((rel) => ({ rel, ...probe(rel) }))
const dirty = results.filter((r) => r.globals.length > 0 || r.handles > 0 || r.failed)
const clean = results.filter((r) => !dirty.includes(r))

console.log(`side-effects — ${results.length} published entry point(s) imported in isolation`)
for (const r of dirty) {
  console.log(`  DOES  ${r.rel}${r.globals.length ? `  globals: ${r.globals.join(', ')}` : ''}${r.handles ? `  live handles: ${r.handles}` : ''}${r.failed ? `  import failed: ${r.failed}` : ''}`)
}
console.log(`  ${clean.length} of ${results.length} disturb nothing`)

const measured = dirty.map((r) => r.rel).sort()
const declared = Array.isArray(pkg.sideEffects) ? [...pkg.sideEffects].sort() : null

if (!CHECK) {
  pkg.sideEffects = measured.length ? measured : false
  writeFileSync(join(ROOT, 'package.json'), JSON.stringify(pkg, null, 2) + '\n')
  console.log(`side-effects — wrote sideEffects: ${measured.length ? `${measured.length} file(s)` : 'false'}`)
  process.exit(0)
}

if (declared === null && measured.length > 0) {
  console.error(`side-effects:check FAIL — ${measured.length} entry point(s) have import side effects and package.json declares none`)
  process.exit(1)
}
if (declared !== null && (declared.length !== measured.length || declared.some((d, i) => d !== measured[i]))) {
  console.error('side-effects:check FAIL — package.json\'s sideEffects list is not what importing the entry points shows')
  console.error(`  declared: ${declared.join(', ') || '(none)'}`)
  console.error(`  measured: ${measured.join(', ') || '(none)'}`)
  process.exit(1)
}
console.log('side-effects:check ok — the declared list is the measured one')
