#!/usr/bin/env node
/**
 * Version seal — package.json is the ONE source of truth for the release
 * number, and every other surface is derived from it.
 *
 * Versioning drifted because the number lived in three hand-edited places at
 * once. At 1.0.3 the tree said: package.json `1.0.3`, CITATION.cff `1.0.3`,
 * README `1.0.2` — and npm had `1.0.2` with no git tag past `v1.0.0`. Nothing
 * failed, because nothing checked.
 *
 * Derived surfaces (rewritten from package.json):
 *   - CITATION.cff  `version:`
 *   - README.md     VERSION:BEGIN/END block
 *   - CHANGELOG.md  `## <version>` heading (stub inserted when absent)
 *
 * Gates (--check, fail-closed):
 *   1. version is semver
 *   2. CITATION.cff agrees
 *   3. README block agrees byte-for-byte
 *   4. CHANGELOG has a heading for it, and it is not still the stub
 *   5. the version never goes backwards past a CHANGELOG heading or a git tag
 *   6. a `v<version>` tag, if it exists, names a commit whose package.json
 *      carries that same version
 *
 * Gates 5 and 6 read git tags. A shallow CI checkout has none, so they report
 * "skipped" rather than passing silently on absent evidence.
 *
 *   npm run version:seal    propagate package.json to every derived surface
 *   npm run version:check   fail closed on drift
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { execFileSync } from 'node:child_process'

// VERSION_SEAL_ROOT lets the self-test point the seal at a scratch tree, so
// the gate's failure modes can be exercised without touching the repo.
const root = process.env.VERSION_SEAL_ROOT ?? resolve(dirname(fileURLToPath(import.meta.url)), '..')
const p = (f) => resolve(root, f)
const CHECK = process.argv.includes('--check')

const STUB = '_Unreleased — replace this line with the notes for this version._'
const SEMVER = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/

/** Compare two semver strings. Prerelease sorts below its own release. */
function cmp(a, b) {
  const [, aMaj, aMin, aPat, aPre] = SEMVER.exec(a)
  const [, bMaj, bMin, bPat, bPre] = SEMVER.exec(b)
  for (const [x, y] of [[aMaj, bMaj], [aMin, bMin], [aPat, bPat]]) {
    if (Number(x) !== Number(y)) return Number(x) < Number(y) ? -1 : 1
  }
  if (aPre === bPre) return 0
  if (aPre === undefined) return 1
  if (bPre === undefined) return -1
  return aPre < bPre ? -1 : 1
}

/** Git tags, or null when git has none to show (shallow checkout, no repo). */
function gitTags() {
  try {
    const out = execFileSync('git', ['tag', '--list', 'v*'], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
    const tags = out.split('\n').map((t) => t.trim()).filter((t) => SEMVER.test(t.slice(1)))
    return tags.length > 0 ? tags : null
  } catch {
    return null
  }
}

/** package.json version recorded at a tag, or null when unreadable. */
function versionAtTag(tag) {
  try {
    const out = execFileSync('git', ['show', `${tag}:package.json`], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      maxBuffer: 8 * 1024 * 1024,
    })
    return JSON.parse(out).version ?? null
  } catch {
    return null
  }
}

const pkg = JSON.parse(readFileSync(p('package.json'), 'utf8'))
const version = pkg.version
const name = pkg.name
const owner = (pkg.repository?.url ?? '').match(/github\.com\/([^/]+)\//)?.[1] ?? 'the package owner'

const fail = []
const note = []

if (!SEMVER.test(version)) {
  console.error(`version-seal: package.json version "${version}" is not semver X.Y.Z[-pre]`)
  process.exit(1)
}

/**
 * The patch field is one digit, and the digit space is the vortex.
 *
 * v1.**.0..9. This is a PROJECT DECISION rather than something the arithmetic
 * forces — `toAddress` pads patch to four digits and accepts up to 9999, and
 * version-address's own self-test uses 1.0.11 and 1.0.12. Nothing computed
 * ruled out 1.3.10, and so it would have published.
 *
 * But the SET is not a decision, it is read from the kernel. The doubling orbit
 * {1,2,4,8,7,5} and the axis {3,6,9} are disjoint and together cover 1..9
 * exactly; with the void 0 they are ten values and no others. That is why one
 * digit is the right width: the digit space and the vortex are the same set,
 * and a two-digit patch is not a position in it.
 *
 * Deriving the set rather than writing 0..9 makes the check falsifiable in the
 * direction that matters — if the orbit and the axis ever overlapped or left a
 * gap, this would fail instead of silently accepting a number that is no longer
 * a node.
 *
 * The consequence is a carry, not a stop. Patch 9 is the last patch, so the
 * release after it moves to the next minor and patch returns to 0, which is
 * what the tour does at 9 -> 0. Patch-first still decides what a change is
 * worth; this decides only that the field has run out of room to say it.
 *
 * The kernel is resolved from THIS script's directory, not from `root`, because
 * the self-test points root at temporary trees that have no src/.
 */
const KERNEL = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'src/0/index.ts')
const { VORTEX_ORBIT, VORTEX_AXIS } = await import(pathToFileURL(KERNEL).href)
const ORBIT = new Set(VORTEX_ORBIT)
const AXIS = new Set(VORTEX_AXIS)
const VOID = 0
const DIGITS = new Set([...ORBIT, ...AXIS, VOID])

if ([...ORBIT].some((d) => AXIS.has(d)) || DIGITS.size !== 10) {
  console.error(
    `version-seal: the kernel's orbit and axis no longer partition the digits `
    + `(orbit ${[...ORBIT]}, axis ${[...AXIS]}, ${DIGITS.size} values with the void) — `
    + 'the patch field is one digit because they do, so this rule cannot be applied',
  )
  process.exit(1)
}

const [, , , patchField] = SEMVER.exec(version)
const patchDigit = Number(patchField)
if (patchField.length > 1 || !DIGITS.has(patchDigit)) {
  console.error(
    `version-seal: patch "${patchField}" in ${version} is not a vortex digit — `
    + `this project versions as v1.**.0..9, where the patch space is the orbit `
    + `{${[...ORBIT]}}, the axis {${[...AXIS]}} and the void 0. Patch 9 carries to the next minor at .0`,
  )
  process.exit(1)
}
const patchWhere = ORBIT.has(patchDigit) ? 'orbit' : AXIS.has(patchDigit) ? 'axis' : 'void'

// ---- surface 1: CITATION.cff -------------------------------------------------
const cffPath = p('CITATION.cff')
const cff = readFileSync(cffPath, 'utf8')
if (!/^version: .+$/m.test(cff)) {
  console.error('version-seal: CITATION.cff has no `version:` line to seal')
  process.exit(1)
}
const cffNext = cff.replace(/^version: .+$/m, `version: ${version}`)
if (CHECK && cffNext !== cff) {
  fail.push(`CITATION.cff version is ${/^version: (.+)$/m.exec(cff)[1]}, package.json is ${version}`)
}

// ---- surface 1b: .zenodo.json ------------------------------------------------
//
// Zenodo mints the DOI from this file when a GitHub release fires the webhook.
// It sat at version 1.0.0 while the package reached 1.0.14, and it declared
// "license": "MIT" for a repository that is CC BY-NC-ND 4.0 — so a DOI minted
// from it would have misstated the licence CITATION.cff explicitly warns about.
// Sealed here so neither can drift again.
//
// Optional: a tree without .zenodo.json is a valid tree, and the ten fixtures
// in version-seal.test.mjs are exactly that. Reading it unconditionally threw
// before any check ran and took 9 of the 10 self-tests down with it — the
// suite caught a change that broke the tool everywhere it was not looking.
const zenodoPath = p('.zenodo.json')
let zenodoRaw = null
let zenodo = null
try { zenodoRaw = readFileSync(zenodoPath, 'utf8'); zenodo = JSON.parse(zenodoRaw) } catch { /* absent */ }
const cffLicence = /^license: (.+)$/m.exec(cff)?.[1]?.trim()
// CITATION.cff is the authority for anything both files describe. Keeping a
// second copy is what let .zenodo.json say "MIT" for a CC BY-NC-ND repository
// while CITATION.cff said the opposite, and a DOI minted from the wrong one
// would have published the wrong terms.
const cffField = (name) => {
  const m = new RegExp(`^${name}: (.+)$`, 'm').exec(cff)
  return m ? m[1].trim() : null
}
const cffTitle = cffField('title')
const cffUrl = cffField('url')
// The release date. Zenodo publishes this as the record's date, and nothing
// wrote it: it stayed at whatever release last set it by hand — 1.3.8 shipped
// with 1.3.7's date. Stamped on a real seal run only. --check cannot verify it,
// because a check running later has no way to know when the release happened;
// generating it is what keeps it true, not comparing it.
const releaseDate = new Date().toISOString().slice(0, 10)
const zenodoNextObj = zenodo === null ? null : {
  ...zenodo,
  version,
  ...(CHECK ? {} : { publication_date: releaseDate }),
  ...(cffTitle ? { title: cffTitle } : {}),
  ...(cffLicence ? { license: cffLicence.toLowerCase() } : {}),
  ...(cffUrl ? { related_identifiers: [
    { identifier: 'https://github.com/ceccec/zeropoint-node', relation: 'isSupplementedBy', resource_type: 'software' },
    { identifier: cffUrl, relation: 'isDocumentedBy', resource_type: 'other' },
    // The CONCEPT doi, taken from CITATION.cff. It resolves to the newest
    // release, so it stays true; the per-version doi does not.
    ...(cffField('doi') ? [{ identifier: cffField('doi'), relation: 'isVersionOf', resource_type: 'software' }] : []),
  ] } : {}),
}
const zenodoNext = zenodoNextObj === null ? null : JSON.stringify(zenodoNextObj, null, 2) + '\n'
if (CHECK && zenodo !== null) {
  if (zenodo.version !== version) {
    fail.push(`.zenodo.json version is ${zenodo.version}, package.json is ${version}`)
  }
  if (zenodoNext !== zenodoRaw) {
    fail.push('.zenodo.json has drifted from CITATION.cff and package.json — run npm run version:seal')
  }
}

// ---- surface 2: README VERSION block ----------------------------------------
const readmePath = p('README.md')
const readme = readFileSync(readmePath, 'utf8')
const BEGIN = '<!-- VERSION:BEGIN — generated by scripts/version-seal.mjs; do not edit by hand -->'
const END = '<!-- VERSION:END -->'
const block = [
  BEGIN,
  '',
  `Package: **\`${name}@${version}\`** · owner \`${owner}\` · git tag \`v${version}\``,
  '',
  'npm rejects republishing a version that already exists, so every release is a',
  'new number. Bump with `npm version patch|minor|major`: that reseals CITATION.cff',
  'and this block, opens a CHANGELOG heading, and creates the matching `v*` tag.',
  '',
  END,
].join('\n')

const blockRe = new RegExp(`${BEGIN.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`)
let readmeNext
if (blockRe.test(readme)) {
  readmeNext = readme.replace(blockRe, block)
} else if (CHECK) {
  fail.push('README.md has no VERSION:BEGIN/END block — run npm run version:seal')
  readmeNext = readme
} else {
  // First seal: replace the hand-written publish line, else append under ## Publish.
  const stale = /^Package: \*\*`[^`]+`\*\*[^\n]*\n/m
  readmeNext = stale.test(readme)
    ? readme.replace(stale, block + '\n')
    : readme.replace(/^## Publish\s*$/m, `## Publish\n\n${block}`)
  if (readmeNext === readme) {
    console.error('version-seal: no `## Publish` section in README.md to seal into')
    process.exit(1)
  }
}
if (CHECK && readmeNext !== readme && blockRe.test(readme)) {
  fail.push('README.md VERSION block is stale — run npm run version:seal')
}

// ---- surface 3: CHANGELOG heading -------------------------------------------
const changelogPath = p('CHANGELOG.md')
const changelog = readFileSync(changelogPath, 'utf8')
const headings = [...changelog.matchAll(/^## (\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)/gm)].map((m) => m[1])
const hasHeading = headings.includes(version)

let changelogNext = changelog
if (!hasHeading) {
  if (CHECK) {
    fail.push(`CHANGELOG.md has no \`## ${version}\` heading — run npm run version:seal, then write the notes`)
  } else {
    changelogNext = changelog.replace(/^# Changelog\s*\n/m, `# Changelog\n\n## ${version}\n\n${STUB}\n`)
    if (changelogNext === changelog) {
      console.error('version-seal: CHANGELOG.md has no `# Changelog` title to insert under')
      process.exit(1)
    }
  }
} else if (CHECK) {
  const section = changelog.split(new RegExp(`^## ${version.replace(/\./g, '\\.')}\\s*$`, 'm'))[1] ?? ''
  const body = section.split(/^## /m)[0]
  if (body.includes(STUB)) {
    fail.push(`CHANGELOG.md \`## ${version}\` is still the placeholder stub — write the release notes`)
  }
}

// ---- gate: the version never moves backwards --------------------------------
const behind = headings.filter((h) => cmp(version, h) < 0)
if (behind.length > 0) {
  fail.push(`package.json ${version} is below CHANGELOG heading ${behind.sort(cmp).at(-1)}`)
}

const tags = gitTags()
if (tags === null) {
  note.push('git tags not visible (shallow checkout?) — tag gates skipped')
} else {
  const tagged = tags.map((t) => t.slice(1))
  const ahead = tagged.filter((t) => cmp(version, t) < 0)
  if (ahead.length > 0) {
    fail.push(`package.json ${version} is below released tag v${ahead.sort(cmp).at(-1)}`)
  }
  const own = `v${version}`
  if (tags.includes(own)) {
    const at = versionAtTag(own)
    if (at !== null && at !== version) {
      fail.push(`tag ${own} names a commit whose package.json says ${at}`)
    }
  }
  const untagged = headings.filter((h) => !tagged.includes(h) && h !== version)
  if (untagged.length > 0) {
    note.push(`CHANGELOG versions with no git tag: ${untagged.join(', ')}`)
  }
}

// ---- report ------------------------------------------------------------------
if (CHECK) {
  for (const n of note) console.log(`version:check note — ${n}`)
  if (fail.length > 0) {
    for (const f of fail) console.error(`version:check FAIL — ${f}`)
    process.exit(1)
  }
  console.log(`version:check ok ${name}@${version} — patch ${patchDigit} is on the ${patchWhere}`)
  process.exit(0)
}

if (cffNext !== cff) writeFileSync(cffPath, cffNext)
if (zenodoNext !== null && zenodoNext !== zenodoRaw) writeFileSync(zenodoPath, zenodoNext)
if (readmeNext !== readme) writeFileSync(readmePath, readmeNext)
if (changelogNext !== changelog) writeFileSync(changelogPath, changelogNext)

for (const n of note) console.log(`version:seal note — ${n}`)
for (const f of fail) console.log(`version:seal — ${f}`)
console.log(
  `version:seal ${name}@${version}` +
    ` · CITATION.cff ${cffNext !== cff ? 'updated' : 'ok'}` +
    ` · README ${readmeNext !== readme ? 'updated' : 'ok'}` +
    ` · CHANGELOG ${changelogNext !== changelog ? 'stub inserted' : 'ok'}`
)
