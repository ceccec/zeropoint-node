#!/usr/bin/env node
/**
 * The extractor's own trial.
 *
 * A notes extractor that returns something for every input is useless — it
 * would happily publish an empty release. So most cases here are FAILURES it
 * has to catch, and each one is a way a release could go out saying nothing.
 *
 * The 1.0.1 / 1.0.10 pair is the one that matters most: a naive `startsWith`
 * or an unanchored regex matches the wrong section, and the release then
 * carries another version's notes — wrong rather than merely empty.
 */

import { extractNotes, MIN_BODY_CHARS } from './release-notes.mjs'

const REAL = [
  '# Changelog',
  '',
  '## 1.0.10',
  '',
  '### Added',
  '',
  '- The tenth release, with a body long enough to be a real description of what changed.',
  '',
  '## 1.0.2 and earlier — deprecated',
  '',
  '- Superseded. This heading carries trailing prose after the version number, and',
  '  enough body text besides to clear the minimum length on its own merits.',
  '',
  '## 1.0.1',
  '',
  '- The first patch, also with enough text in it to clear the minimum body length.',
  '',
].join('\n')

let failures = 0
function check(name, cond, detail = '') {
  if (cond) return
  failures++
  console.error(`  FAIL ${name}${detail ? ' — ' + detail : ''}`)
}

// --- it finds what is there -------------------------------------------------
const ten = extractNotes(REAL, '1.0.10')
check('1.0.10 extracts', ten.ok, ten.reason)
check('1.0.10 gets its OWN body', ten.ok && ten.body.includes('tenth release'))
check('1.0.10 stops at the next heading', ten.ok && !ten.body.includes('Superseded'))
check('1.0.10 does not bleed into 1.0.1', ten.ok && !ten.body.includes('first patch'))

const one = extractNotes(REAL, '1.0.1')
check('1.0.1 extracts', one.ok, one.reason)
check('1.0.1 is NOT given 1.0.10 notes', one.ok && !one.body.includes('tenth release'))

const two = extractNotes(REAL, '1.0.2')
check('a heading with trailing prose still matches', two.ok, two.reason)

// --- it refuses what is not -------------------------------------------------
const missing = extractNotes(REAL, '9.9.9')
check('absent version is refused', !missing.ok)

const empty = extractNotes('# Changelog\n\n## 1.0.0\n\n## 0.9.0\n\n- old\n', '1.0.0')
check('empty section is refused', !empty.ok)

const short = extractNotes('# Changelog\n\n## 1.0.0\n\n- fixed\n', '1.0.0')
check('too-short section is refused', !short.ok, `MIN_BODY_CHARS=${MIN_BODY_CHARS}`)

for (const word of ['TBD', 'TODO: write this', 'stub', 'fill in the notes', 'WIP']) {
  const pad = ' and here is plenty of additional padding text to clear the length minimum entirely.'
  const stub = extractNotes(`# Changelog\n\n## 1.0.0\n\n${word}${pad}\n`, '1.0.0')
  check(`stub wording "${word}" is refused`, !stub.ok)
}

// --- and it does not invent -------------------------------------------------
const noHeadings = extractNotes('# Changelog\n\nnothing here at all\n', '1.0.0')
check('changelog with no version headings is refused', !noHeadings.ok)

const total = 15
if (failures > 0) {
  console.error(`release-notes.test FAIL — ${failures} of ${total} checks failed`)
  process.exit(1)
}
console.log(`release-notes.test ok — ${total} checks, ${total - 4} of them failures the extractor must catch`)
