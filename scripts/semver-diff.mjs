#!/usr/bin/env node
/**
 * What the next version number MEANS, computed from the API rather than chosen.
 *
 * Semver states compatibility by convention: the number is what somebody
 * decided to type, and a consumer's `^1.0.0` trusts that decision. Nothing in
 * this repository checked whether the decision was right, which is how a
 * release removing a public entry point could go out as a patch.
 *
 * This compares the PUBLISHED package's surface against the working tree and
 * reports what the difference actually is:
 *
 *   MAJOR  something a consumer could import is gone, or an export disappeared
 *   MINOR  a new entry point or export, nothing removed
 *   PATCH  the surface is identical
 *
 * It is deliberately about the SURFACE, not behaviour. A function that still
 * exists but now returns something else is a breaking change this cannot see,
 * and saying so is more useful than implying the number is fully derived.
 *
 * THE NUMBER IS AN OUTPUT, NOT AN INPUT. Everything downstream already derives
 * from package.json's version — CITATION.cff, .zenodo.json, the README block,
 * the CHANGELOG heading, the git tag, the npm publish, the GitHub release, the
 * Zenodo DOI. Nothing decided what the version should BE, so it was asserted by
 * hand and propagated. That is how removing ./mcp nearly shipped as a patch.
 *
 * It needs the network (it installs the published package), so it is not in
 * `npm run check`. It runs at release time, where the question is asked.
 *
 *   npm run semver:diff     what the surface diff says, and why
 *   npm run semver:next     apply that version and seal every derived surface
 *   npm run semver:check    fail if package.json is below what the diff requires
 */

import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))

/** The surface of a package directory: subpath -> sorted export names. */
async function surfaceOf(dir) {
  const p = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'))
  const out = new Map()
  for (const [subpath, spec] of Object.entries(p.exports ?? {})) {
    const target = typeof spec === 'string' ? spec : (spec.import ?? spec.require)
    if (typeof target !== 'string' || subpath === './package.json') continue
    try {
      const mod = await import(pathToFileURL(join(dir, target)).href)
      out.set(subpath, Object.keys(mod).sort())
    } catch {
      out.set(subpath, null) // present but unloadable here
    }
  }
  return { exports: out, bin: Object.keys(p.bin ?? {}).sort(), version: p.version }
}

const published = process.env.ZP_BASELINE_DIR
let baselineDir = published
let tmp = null
if (!baselineDir) {
  // Install the currently published version into a scratch directory.
  tmp = mkdtempSync(join(tmpdir(), 'zp-baseline-'))
  execFileSync('npm', ['init', '-y'], { cwd: tmp, stdio: 'ignore' })
  execFileSync('npm', ['install', `${pkg.name}@latest`, '--no-audit', '--no-fund'], { cwd: tmp, stdio: 'ignore' })
  baselineDir = join(tmp, 'node_modules', pkg.name)
}

const before = await surfaceOf(baselineDir)
const after = await surfaceOf(ROOT)
if (tmp) rmSync(tmp, { recursive: true, force: true })

const removedPaths = [...before.exports.keys()].filter((k) => !after.exports.has(k))
const addedPaths = [...after.exports.keys()].filter((k) => !before.exports.has(k))
const removedExports = []
const addedExports = []
for (const [sub, names] of before.exports) {
  const now = after.exports.get(sub)
  if (!names || !now) continue
  for (const n of names) if (!now.includes(n)) removedExports.push(`${sub}::${n}`)
  for (const n of now) if (!names.includes(n)) addedExports.push(`${sub}::${n}`)
}
const removedBins = before.bin.filter((b) => !after.bin.includes(b))
const addedBins = after.bin.filter((b) => !before.bin.includes(b))

const breaking = removedPaths.length + removedExports.length + removedBins.length
const additive = addedPaths.length + addedExports.length + addedBins.length
const level = breaking > 0 ? 'major' : additive > 0 ? 'minor' : 'patch'

const [maj, min, pat] = before.version.split('.').map(Number)
const next = level === 'major' ? `${maj + 1}.0.0` : level === 'minor' ? `${maj}.${min + 1}.0` : `${maj}.${min}.${pat + 1}`

const cmp = (a, b) => {
  const x = a.split('.').map(Number)
  const y = b.split('.').map(Number)
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i]
  return 0
}

if (process.argv.includes('--next')) { console.log(next); process.exit(0) }

if (process.argv.includes('--check')) {
  // At least what the diff requires. HIGHER is a judgement call and allowed —
  // a behavioural break this cannot see is a real reason to go higher. LOWER is
  // a claim about compatibility that the API contradicts.
  if (cmp(pkg.version, next) < 0) {
    console.error(`semver:check FAIL — package.json says ${pkg.version}, but the surface diff against published ${before.version} requires at least ${next} (${level})`)
    for (const r of removedPaths) console.error(`    removed entry point ${r}`)
    for (const r of removedBins) console.error(`    removed bin ${r}`)
    for (const r of removedExports.slice(0, 6)) console.error(`    removed export ${r}`)
    process.exit(1)
  }
  console.log(`semver:check ok — ${pkg.version} satisfies the ${level} bump the diff requires (>= ${next})`)
  process.exit(0)
}

if (process.argv.includes('--apply')) {
  if (cmp(pkg.version, next) >= 0) {
    console.log(`semver:next — package.json is already ${pkg.version}, at or above the required ${next}; nothing to do`)
    process.exit(0)
  }
  const pkgPath = join(ROOT, 'package.json')
  const raw = readFileSync(pkgPath, 'utf8')
  writeFileSync(pkgPath, raw.replace(/^(\s*"version":\s*")[^"]+(")/m, `$1${next}$2`))
  console.log(`semver:next — ${before.version} -> ${next} (${level}), because:`)
  for (const r of removedPaths) console.log(`    BREAKING  removed entry point ${r}`)
  for (const r of removedBins) console.log(`    BREAKING  removed bin ${r}`)
  for (const r of removedExports.slice(0, 6)) console.log(`    BREAKING  removed export ${r}`)
  for (const a of addedPaths) console.log(`    additive  new entry point ${a}`)
  for (const a of addedBins) console.log(`    additive  new bin ${a}`)
  for (const a of addedExports.slice(0, 6)) console.log(`    additive  new export ${a}`)
  if (level === 'patch') console.log('    the public surface is unchanged')
  console.log('  now run npm run version:seal to propagate it to every derived surface')
  process.exit(0)
}

console.log(`semver:diff — published ${before.version} against the working tree`)
console.log(`  entry points   ${before.exports.size} -> ${after.exports.size}`)
console.log(`  bins           ${before.bin.length} -> ${after.bin.length}`)
console.log(`  BREAKING       ${breaking}`)
for (const r of removedPaths) console.log(`    removed entry point  ${r}`)
for (const r of removedBins) console.log(`    removed bin          ${r}`)
for (const r of removedExports.slice(0, 10)) console.log(`    removed export       ${r}`)
console.log(`  additive       ${additive}`)
for (const a of addedPaths) console.log(`    new entry point      ${a}`)
for (const a of addedBins) console.log(`    new bin              ${a}`)
for (const a of addedExports.slice(0, 6)) console.log(`    new export           ${a}`)
console.log('')
console.log(`  the surface diff justifies a ${level.toUpperCase()} bump: ${before.version} -> ${next}`)
console.log('  (surface only — a function that still exists but returns something else is')
console.log('   a breaking change this cannot see)')
process.exit(0)
