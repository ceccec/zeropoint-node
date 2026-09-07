#!/usr/bin/env node
/**
 * sequence-pages — every page that spells a kernel sequence must spell the one
 * the kernel exports.
 *
 * SEQUENCE.md opens by warning that two spines share digits and are not the
 * same ordering. The warning was prose, and prose does not stop a page from
 * carrying the other spine under the kernel's name. It did not stop it: pages
 * across docs/ bind `VORTEX_SEQUENCE` to three different arrays, and a reader
 * who copies one of those snippets into a file that imports the package gets
 * an identifier that resolves to something else entirely. That is the exact
 * confusion the hub page exists to prevent, sitting inside the corpus the hub
 * page heads.
 *
 * So the identifier is checked rather than described. Two forms are read out
 * of the markdown, both unambiguous:
 *
 *   NAME = [ ... ]   or   NAME: [ ... ]      a binding — compare elementwise
 *   NAME[i]                                  an index — compare that element
 *
 * A page may still discuss the legacy spine; it must call it by the name the
 * kernel gives it (LEGACY_CONSCIOUSNESS_SEQUENCE), or by no exported name at
 * all. Naming is the whole subject: this refuses a page that uses one spine's
 * name for another spine's digits.
 *
 * FALSIFIABLE IN BOTH DIRECTIONS, which is the property that matters here.
 * Change a doc and the gate fails; change the export and the same gate fails,
 * because there is no second copy of the sequence in this file — every
 * expected value is read from src/0 at run time.
 *
 *   npm run sequence:check
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** The sequences, read from the kernel — never restated here. */
const kernel = await import(join(ROOT, 'src/0/index.ts'))
const SEQUENCES = Object.fromEntries(
  Object.entries(kernel).filter(([, v]) => Array.isArray(v) && v.length > 2 && v.every((d) => Number.isInteger(d) && d >= 0 && d <= 9)),
)
const NAMES = Object.keys(SEQUENCES)
if (NAMES.length === 0) throw new Error('sequence-pages: src/0 exported no digit sequence to check against')

/** Markdown under docs/ plus the README. Built output is not a source. */
function markdown(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === '.vitepress' || entry === 'node_modules') continue
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) markdown(path, out)
    else if (entry.endsWith('.md')) out.push(path)
  }
  return out
}
const files = [...markdown(join(ROOT, 'docs')), join(ROOT, 'README.md')]

const NAME_RE = new RegExp(String.raw`\b(${NAMES.join('|')})\b\s*(?:=|:)\s*\[([^\]]*)\]`, 'g')
const INDEX_RE = new RegExp(String.raw`\b(${NAMES.join('|')})\b\s*\[\s*(\d+)\s*\]`, 'g')

const wrong = []
for (const file of files) {
  const text = readFileSync(file, 'utf8')
  const where = (i) => `${relative(ROOT, file)}:${text.slice(0, i).split('\n').length}`

  for (const m of text.matchAll(NAME_RE)) {
    const [, name, body] = m
    const stated = body.split(',').map((s) => s.trim()).filter(Boolean)
    if (!stated.every((s) => /^\d$/.test(s))) continue // not a digit literal — nothing to compare
    const actual = SEQUENCES[name]
    if (stated.length === actual.length && stated.every((s, i) => Number(s) === actual[i])) continue
    wrong.push({ at: where(m.index), name, stated: `[${stated.join(', ')}]`, actual: `[${actual.join(', ')}]`, why: 'binding' })
  }

  for (const m of text.matchAll(INDEX_RE)) {
    const [, name, i] = m
    const actual = SEQUENCES[name]
    const index = Number(i)
    // The index itself is the claim: reading past the end names an ordering
    // longer than the export, which is a different sequence by definition.
    if (index >= actual.length) {
      wrong.push({ at: where(m.index), name, stated: `[${index}]`, actual: `length ${actual.length}`, why: 'index past the end' })
      continue
    }
    // A stated result — `NAME[1] = 3` or `NAME[1]; // Returns 3` — is checked.
    const after = text.slice(m.index + m[0].length, m.index + m[0].length + 60)
    const said = /^\s*(?:=|;?\s*\/\/\s*Returns?)\s*(\d)\b/.exec(after)
    if (said && Number(said[1]) !== actual[index]) {
      wrong.push({ at: where(m.index), name, stated: `[${index}] → ${said[1]}`, actual: `[${index}] → ${actual[index]}`, why: 'indexed value' })
    }
  }
}

const scanned = files.length
if (wrong.length) {
  console.error(`sequence:check — ${wrong.length} page statement(s) name a kernel sequence and spell a different one\n`)
  for (const w of wrong) {
    console.error(`  ${w.at}`)
    console.error(`    ${w.name} ${w.why}`)
    console.error(`      page   ${w.stated}`)
    console.error(`      kernel ${w.actual}\n`)
  }
  console.error('Use the name the kernel gives that ordering, or no exported name at all.')
  console.error(`Kernel sequences: ${NAMES.map((n) => `${n}=${SEQUENCES[n].join('')}`).join('  ')}`)
  process.exit(1)
}
console.log(`sequence:check ok — ${scanned} pages, ${NAMES.length} kernel sequences, no page contradicts one`)
