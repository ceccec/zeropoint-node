#!/usr/bin/env node
/**
 * The defence, folded back on itself.
 *
 * A defensive publication is only worth the record behind it, so the record is
 * checked the way every other claim in this repository is checked.
 *
 * WHAT THIS REFUSES TO LET ANYONE SAY. "There is no prior art for X" quantifies
 * over everything ever published, in every language and jurisdiction, including
 * the unindexed and the prior-but-unpublished. No finite search decides it, and
 * a search that returned nothing has established only that a search returned
 * nothing. So novelty is bound to the axiom `no_prior_art_is_undecidable` and
 * MAY NOT be bound to a seal or a criterion — and this check fails if anyone
 * tries, which is the one condition here that protects the reader rather than
 * the author.
 *
 * WHAT IT REQUIRES INSTEAD, all of it decidable:
 *
 *   every contribution names files, and every one of those files exists
 *   every status comes from a closed set, so "novel" cannot be smuggled in
 *   every claim of known art carries at least one citation
 *   an entry that says `searched` must say what was searched and when
 *   an entry that says `not-searched` says so plainly and is counted in the
 *     summary, so the gaps are visible rather than implied to be absences
 *   every contribution names the DOMAINS where its prior art would live, so an
 *     unsearched entry is a direction to look rather than a shrug
 *
 * The dated citable record is the thing that actually does the defensive work:
 * publication defeats a later claim of invention without anyone proving a
 * universal negative. That part is decidable — a DOI, a version, a content
 * hash — and it is recomputed here rather than transcribed.
 *
 *   npm run priorart:check
 */
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const LEDGER = join(ROOT, 'src/verification/prior-art.json')

const STATUSES = new Set(['known-art', 'known-art-in-part', 'searched-not-found', 'not-searched'])
const led = JSON.parse(readFileSync(LEDGER, 'utf8'))
const { ASSUMPTIONS, SEALS } = await import(pathToFileURL(join(ROOT, 'src/verification/index.ts')).href)

const problems = []
const entries = Object.entries(led.contributions ?? {})
if (entries.length === 0) problems.push('the ledger records no contributions')

if (!('no_prior_art_is_undecidable' in ASSUMPTIONS)) {
  problems.push('the axiom no_prior_art_is_undecidable is not declared — novelty would have nothing honest to rest on')
}

const tally = {}
const unresolved = []
const unsearched = []
for (const [id, c] of entries) {
  if (!c.what || c.what.length < 20) problems.push(`${id}: says nothing about what the contribution is`)
  for (const f of c.files ?? []) {
    if (!existsSync(join(ROOT, f))) problems.push(`${id}: names ${f}, which does not exist`)
  }
  if (!(c.files ?? []).length) problems.push(`${id}: names no files, so nothing anchors the claim`)

  const st = c.priorArt?.status
  if (!STATUSES.has(st)) {
    problems.push(`${id}: status "${st}" is not one of ${[...STATUSES].join(', ')} — "novel" is not an available status and that is deliberate`)
    continue
  }
  tally[st] = (tally[st] ?? 0) + 1

  const cites = c.priorArt.citations ?? []
  if ((st === 'known-art' || st === 'known-art-in-part') && !cites.length) {
    problems.push(`${id}: claims known art and cites none`)
  }
  for (const [i, cite] of cites.entries()) {
    if (!cite.text) { problems.push(`${id}: citation ${i} says nothing`); continue }
    if (!cite.kind) { problems.push(`${id}: citation ${i} does not say what kind of identifier it has, or that it has none`) }
    if (cite.kind === 'doi' && !cite.id) problems.push(`${id}: citation ${i} claims a DOI and carries none`)
    // A `resolved` flag with no evidence is an assertion, and an identifier
    // written from memory looks exactly like one that was checked. So the
    // resolution must carry WHAT came back and WHEN.
    if (cite.resolved === true && (!cite.resolvedTitle || !cite.resolvedOn || !cite.resolvedVia)) {
      problems.push(`${id}: citation ${i} says it resolved and records neither the returned title, the date, nor how — a resolved flag without evidence is an assertion`)
    }
    if (cite.resolved !== true) unresolved.push(`${id}: ${cite.id ?? cite.text.slice(0, 40)}`)
  }
  // A search block is evidence wherever it appears, not only under
  // `searched-not-found` — so it is checked wherever it appears, and it is
  // REQUIRED there, because "nothing was found" without a record of looking is
  // the one claim in this file that a reader cannot repeat.
  const s = c.priorArt.searched
  if (st === 'searched-not-found' && !s) {
    problems.push(`${id}: says a search found nothing and records no search at all`)
  }
  if (s && (!s.when || !(s.where ?? []).length || !(s.queries ?? []).length)) {
    problems.push(`${id}: records a search without when, where, or what was asked — an unrecorded search is not evidence`)
  }

  // Domains turn a gap into a direction. Without them `not-searched` reads as
  // "we did not look", which tells a reader nothing about WHERE to look; with
  // them it reads as "here are the fields this would collide with, unsearched",
  // which is a lead someone can follow to refute the entry.
  const domains = c.domains ?? []
  if (!domains.length) {
    problems.push(`${id}: names no domains — prior art has to live somewhere, and an entry that will not say where cannot be checked or refuted`)
  }
  for (const [i, dom] of domains.entries()) {
    if (typeof dom !== 'string' || dom.trim().length < 8) {
      problems.push(`${id}: domain ${i} is too short to name a field of study`)
    }
  }
  if (st === 'not-searched' && domains.length) {
    unsearched.push(`${id}: ${domains.join('; ')}`)
  }
  // The condition that protects the reader.
  const bound = c.novelty?.backedBy
  if (bound && bound !== 'no_prior_art_is_undecidable') {
    problems.push(`${id}: binds novelty to "${bound}"${bound in SEALS ? ', which is a SEAL' : ''} — novelty is a universal negative and may only rest on no_prior_art_is_undecidable`)
  }
}

if (!led.concept_doi) problems.push('no concept DOI recorded — the dated citable identifier is the part that does the defensive work')

const receipt = createHash('sha256')
  .update(JSON.stringify({ doi: led.concept_doi, ids: entries.map(([k]) => k).sort() }))
  .digest('hex').slice(0, 16)

console.log(`priorart:check — ${entries.length} contribution(s); ${Object.entries(tally).map(([k, n]) => `${n} ${k}`).join(', ')}`)
console.log(`                 novelty rests on the axiom no_prior_art_is_undecidable, never on a seal`)
const allCites = entries.flatMap(([, c]) => c.priorArt?.citations ?? [])
console.log(`                 ${allCites.filter((c) => c.resolved === true).length} of ${allCites.length} citation(s) resolved against a registry, with the returned title recorded`)
if (unresolved.length) console.log(`                 unresolved, and named rather than implied absent: ${unresolved.length}`)
for (const u of unsearched) console.log(`                 unsearched, with the fields to search named: ${u}`)
console.log(`                 concept DOI ${led.concept_doi} · receipt ${receipt}`)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`priorart:check FAIL — ${problems.length} problem(s)`)
  process.exit(1)
}
console.log('priorart:check ok — every contribution names files that exist, every claim of known art cites it, and no entry claims novelty as a fact')
