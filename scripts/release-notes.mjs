#!/usr/bin/env node
/**
 * Release notes come from the CHANGELOG, or the release does not happen.
 *
 * Ten versions are tagged and published to npm and the GitHub Releases page is
 * empty. Nothing was broken — nothing was ever asked to create one. publish.yml
 * TRIGGERS on `release: published`, which reads like it handles releases and
 * does the opposite: it waits for a release somebody else makes by hand.
 *
 * The notes are not written here. CHANGELOG.md already has them, reviewed in
 * the same commit as the change, so this extracts that section rather than
 * generating a second description that can disagree with the first.
 *
 * Fail-closed, because the failure mode is a release that says nothing:
 *
 *   - no section for the version                  -> exit 1
 *   - section present but a stub or near-empty    -> exit 1
 *   - version not in package.json                 -> exit 1
 *
 * A stub is caught by length and by the placeholder wording `npm version`
 * leaves behind. That check is the reason this is a script with a test and not
 * three lines of sed in a workflow: a silent empty release is exactly what an
 * unreadable one-liner produces.
 *
 *   node scripts/release-notes.mjs            notes for package.json's version
 *   node scripts/release-notes.mjs 1.0.9      notes for a specific version
 *   node scripts/release-notes.mjs --check    verify without printing
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** Shortest body that can carry a real description. Stubs fall well under. */
export const MIN_BODY_CHARS = 80

/** Wording `npm version` and hand-stubs leave behind. */
const STUB = /^\s*(tbd|todo|stub|fill in|wip|placeholder|-\s*$)/im

/**
 * Pull one version's section out of a changelog.
 *
 * Returns { ok: true, body } or { ok: false, reason }. Never throws on content,
 * so the caller decides what a failure means.
 */
export function extractNotes(changelog, version) {
  const lines = changelog.split('\n')
  // `## 1.0.9` or `## 1.0.2 and earlier — deprecated`: the version must be the
  // first token, so `## 1.0.1` never matches a heading for `## 1.0.10`.
  const isHeading = (l) => /^##\s+/.test(l)
  const headingVersion = (l) => {
    const m = /^##\s+v?(\d+\.\d+\.\d+)/.exec(l)
    return m ? m[1] : null
  }

  let start = -1
  for (let i = 0; i < lines.length; i++) {
    if (isHeading(lines[i]) && headingVersion(lines[i]) === version) { start = i; break }
  }
  if (start < 0) return { ok: false, reason: `CHANGELOG.md has no "## ${version}" section` }

  let end = lines.length
  for (let i = start + 1; i < lines.length; i++) {
    if (isHeading(lines[i])) { end = i; break }
  }

  const body = lines.slice(start + 1, end).join('\n').trim()
  if (body.length === 0) return { ok: false, reason: `the "## ${version}" section is empty` }
  if (body.length < MIN_BODY_CHARS) {
    return { ok: false, reason: `the "## ${version}" section is ${body.length} chars, under the ${MIN_BODY_CHARS} minimum — it reads as a stub` }
  }
  if (STUB.test(body)) return { ok: false, reason: `the "## ${version}" section still contains stub wording` }
  return { ok: true, body }
}

// --------------------------------------------------------------------- cli
const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (invokedDirectly) {
  const args = process.argv.slice(2)
  const checkOnly = args.includes('--check')
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
  const version = args.find((a) => !a.startsWith('--')) ?? pkg.version

  const changelog = readFileSync(join(ROOT, 'CHANGELOG.md'), 'utf8')
  const result = extractNotes(changelog, version)

  if (!result.ok) {
    console.error(`release-notes FAIL — ${result.reason}`)
    console.error('  A release with no notes is worse than no release. Write the CHANGELOG entry first.')
    process.exit(1)
  }
  if (checkOnly) {
    console.log(`release-notes ok — ${version} has ${result.body.length} chars of notes`)
  } else {
    process.stdout.write(result.body + '\n')
  }
}
