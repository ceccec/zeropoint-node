#!/usr/bin/env node
/**
 * A claim this repository says it retracted must not survive somewhere else.
 *
 * The README's opening records that its heading "previously read" a phrase
 * describing "the transformation from artificial intelligence to pure
 * consciousness", and that this could not stand beside "No claim outside
 * arithmetic". The correction was made to the heading. The same sentence was
 * still in the file three more times — verbatim under Metaphysical Principles,
 * again in the Acknowledgments, and again in the footer, which is the last line
 * a reader sees. All three passed every check in the gate, because retracting a
 * claim in one place and leaving it in another is invisible to a checker that
 * reads either place alone.
 *
 * I found those three by reading. That is the part worth automating: this
 * repository writes retractions deliberately and often — nine sites across five
 * files — so each one is a machine-readable statement that a specific sentence
 * is no longer claimed. Checking it is then just a search.
 *
 * A retraction is a marker ("previously read", "used to say", "previously
 * advertised", ...) followed by a quoted claim. The claim may then appear ONLY
 * inside retractions. Anywhere else it is being asserted again.
 *
 * Whitespace is normalised before comparing, because prose wraps: the phrase
 * above spans a line break at its retraction and none at two of the three
 * places it survived, so an exact-text search finds neither.
 *
 * Three narrowings, each because the first version measured the wrong thing.
 *
 * EVERY QUOTE IN THE WINDOW, filtered by length. One retraction often withdraws
 * two things — `previously read "X" and described "Y"` — and taking only the
 * first quote missed the claim this check exists for, because X there is a
 * three-word name. The mutation test caught that; the reasoning did not.
 *
 * Taking every quote once made the opposite mistake, retracting the sentence
 * that was KEPT: the same window contains `the same file says "No claim outside
 * arithmetic."`, the standard being upheld. The length filter below settles
 * both — four words is not a claim, and a checker that forbids its own
 * repository's standard is worse than no checker.
 *
 * SENTENCES, NOT NAMES. "A432 Consciousness System" is retracted as a heading,
 * not as a name, and it legitimately names a subject in the consciousness
 * criterion and its tests. A checker cannot see the difference between using a
 * name and asserting a claim, so it only enforces quotes long enough that they
 * cannot be a name — a claim retracted as a phrase, not a term.
 *
 * WITHIN THE RETRACTING FILE. The defect this exists for was one file
 * retracting a sentence in its opening and asserting it three times below.
 * Across files the same string is usually a mention: CHANGELOG.md quotes every
 * claim it records the removal of, which is the changelog doing its job.
 *
 *   npm run retracted:check
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** A claim is a phrase, not a term: a name is short and a sentence is not. */
const MIN_CLAIM_WORDS = 6

const MARKER = /(?:previously (?:read|said|advertised|stated)|used to (?:say|read|be|state)|this (?:section|entry|heading|list|file) (?:previously|used to))/i
// Every quote the marker introduces, within a paragraph of it.
const QUOTED = /[""]([^""]{4,400})[""]/g
const WINDOW = 400

const files = execSync('git ls-files "*.md" "*.ts"', { cwd: ROOT, encoding: 'utf8' })
  .trim().split('\n').filter(Boolean).filter((f) => !f.includes('node_modules'))

const norm = (s) => s.replace(/\s+/g, ' ').trim().toLowerCase()

const corpus = new Map()
for (const f of files) {
  try { corpus.set(f, readFileSync(join(ROOT, f), 'utf8')) } catch { /* unreadable */ }
}

/** Every retracted claim, and the sites that retract it. */
const retracted = new Map()
for (const [file, text] of corpus) {
  for (const m of text.matchAll(new RegExp(MARKER.source, 'gi'))) {
    for (const q of text.slice(m.index, m.index + WINDOW).matchAll(QUOTED)) {
      const claim = norm(q[1])
      if (claim.split(' ').length < MIN_CLAIM_WORDS) continue
      if (!retracted.has(claim)) retracted.set(claim, { text: q[1].trim(), file, marks: [] })
      retracted.get(claim).marks.push({ file, at: m.index })
    }
  }
}

/**
 * Does the retracting file still assert the claim? Every retraction window in
 * that file is masked first, so quoting it in order to withdraw it does not
 * count as making it.
 */
function stillAssertedIn(file, claim) {
  const text = corpus.get(file) ?? ''
  let masked = text
  for (const m of text.matchAll(new RegExp(MARKER.source, 'gi'))) {
    const end = Math.min(text.length, m.index + WINDOW)
    masked = masked.slice(0, m.index) + ' '.repeat(end - m.index) + masked.slice(end)
  }
  return norm(masked).includes(claim)
}

const problems = []
for (const [claim, { text, marks }] of retracted) {
  // Claims wrap across lines in prose; show the sentence, not the layout.
  const flat = text.replace(/\s+/g, ' ')
  for (const file of new Set(marks.map((m) => m.file))) {
    if (stillAssertedIn(file, claim)) {
      problems.push(
        `${file} retracts "${flat.slice(0, 64)}${flat.length > 64 ? '…' : ''}" and still asserts it`
      )
    }
  }
}

console.log(`retracted:check — ${retracted.size} retracted claim(s) across ${files.length} tracked file(s)`)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`retracted:check FAIL — ${problems.length} retracted claim(s) still asserted somewhere`)
  process.exit(1)
}
console.log('retracted:check ok — no retracted claim survives outside its retraction')
