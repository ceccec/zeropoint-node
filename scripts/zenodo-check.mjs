#!/usr/bin/env node
/**
 * .zenodo.json must be something Zenodo can actually load.
 *
 * Twelve GitHub releases fired the webhook. Zenodo accepted every one with
 * HTTP 202 and minted no DOI, because 202 means "accepted", not "published" —
 * the deposition failed afterwards, out of sight. The error, when finally read,
 * was:
 *
 *     { "errors": "Extra metadata load failed." }
 *
 * "Extra metadata" is this file. Three things in it were rejected:
 *
 *   communities   named quantum-computing and reproducible-research, and
 *                 neither exists on Zenodo — both 404
 *   subjects      given as plain strings; the schema wants objects carrying a
 *                 term, an identifier and a scheme
 *   orcid: ""     an empty string is not "unknown", it is an invalid ORCID
 *
 * And separately, though it would not have blocked anything: the file declared
 * "license": "MIT" for a repository that is CC BY-NC-ND 4.0. A DOI minted from
 * it would have published terms the LICENSE and CITATION.cff both contradict —
 * the licence is derived from CITATION.cff now, so the two cannot disagree.
 *
 * This checks the shape locally, before a release, because the feedback loop
 * through Zenodo is one release long and silent at the end.
 *
 *   npm run zenodo:check
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const problems = []

let z
try {
  z = JSON.parse(readFileSync(join(ROOT, '.zenodo.json'), 'utf8'))
} catch (e) {
  console.error(`zenodo:check FAIL — .zenodo.json is not valid JSON: ${e.message}`)
  process.exit(1)
}

// Required by Zenodo for a software deposition.
for (const field of ['title', 'description', 'creators', 'upload_type', 'license', 'access_right']) {
  if (z[field] === undefined || z[field] === null || z[field] === '') problems.push(`missing required field: ${field}`)
}
if (z.upload_type !== undefined && z.upload_type !== 'software') {
  problems.push(`upload_type is "${z.upload_type}" — this repository is software`)
}

// The three that actually broke it.
if (Array.isArray(z.subjects) && z.subjects.some((s) => typeof s === 'string')) {
  problems.push('subjects contains plain strings; each must be an object with term, identifier and scheme')
}
if (Array.isArray(z.communities)) {
  for (const c of z.communities) {
    problems.push(`communities names "${c.identifier ?? c}" — every community must exist on Zenodo, and an unknown one fails the whole load`)
  }
}
for (const c of z.creators ?? []) {
  if (!c.name) problems.push('a creator has no name')
  for (const k of ['orcid', 'affiliation', 'gnd']) {
    if (k in c && c[k] === '') problems.push(`creator "${c.name}" has an empty ${k}; omit the field instead`)
  }
}
if (Array.isArray(z.related_identifiers)) {
  for (const r of z.related_identifiers) {
    if (!r.identifier || !r.relation) problems.push('a related_identifier is missing identifier or relation')
  }
}
// Empty arrays are not invalid, but they are noise that hides a real omission.
for (const k of ['grants', 'contributors', 'subjects', 'communities']) {
  if (Array.isArray(z[k]) && z[k].length === 0) problems.push(`${k} is an empty array; omit the field instead`)
}

// The licence must agree with CITATION.cff, which is the authority.
const cff = readFileSync(join(ROOT, 'CITATION.cff'), 'utf8')
const cffLicence = /^license: (.+)$/m.exec(cff)?.[1]?.trim()
if (cffLicence && String(z.license).toLowerCase() !== cffLicence.toLowerCase()) {
  problems.push(`license is "${z.license}" but CITATION.cff says "${cffLicence}"`)
}

console.log(`zenodo:check — ${Object.keys(z).length} fields, licence ${z.license}, version ${z.version}`)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`zenodo:check FAIL — ${problems.length} problem(s); Zenodo would report "Extra metadata load failed."`)
  process.exit(1)
}
console.log('zenodo:check ok — .zenodo.json is loadable and agrees with CITATION.cff')
process.exit(0)
