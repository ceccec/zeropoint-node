/**
 * readme-figures — the figures the README states about this repository, and
 * where each one is computed.
 *
 * Shared by two callers that must not disagree. scripts/readme-facts.mjs
 * checks every stated instance against the computed value; scripts/ratchet.mjs
 * subtracts the lines they appear on from the unguarded-README count, because
 * a line a machine can contradict is not unguarded prose.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const WORD = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12 }
const WORDS = Object.keys(WORD).join('|')

/** Parse a stated figure written either as digits or as an English word. */
export function statedNumber(s) {
  return WORD[s.toLowerCase()] ?? Number(s)
}

export async function readmeFigures(root) {
  const { SEALS } = await import(pathToFileURL(join(root, 'src/verification/lean-bridge.ts')).href)
  const ratchet = JSON.parse(readFileSync(join(root, 'ratchet.json'), 'utf8'))
  return [
    {
      what: 'sealed theorems',
      value: Object.keys(SEALS).length,
      where: 'src/verification/lean-bridge.ts SEALS',
      pattern: new RegExp(String.raw`\b(\d+|${WORDS})\s+(?:sealed\s+)?(?:theorems|seals)\b`, 'gi'),
    },
    {
      what: 'ratchet surfaces',
      value: Object.keys(ratchet.ceilings ?? {}).length,
      where: 'ratchet.json ceilings',
      pattern: new RegExp(String.raw`ratchet on (\d+|${WORDS}) surfaces`, 'gi'),
    },
  ]
}

/** 1-based line numbers of every README line carrying a checked figure. */
export async function checkedReadmeLines(root, readme) {
  const lines = new Set()
  for (const f of await readmeFigures(root)) {
    for (const m of readme.matchAll(f.pattern)) {
      lines.add(readme.slice(0, m.index).split('\n').length)
    }
  }
  return lines
}
