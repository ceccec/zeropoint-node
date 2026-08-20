#!/usr/bin/env node
/**
 * Hold the changelog's NUMBERS answerable to the code.
 *
 * The narrative in CHANGELOG.md is written by hand, and should be: deciding
 * what mattered in a release is judgement, and no generator has it. But the
 * figures inside that narrative are not judgement. Every one of them —
 * 4195 mg/L, +237 kJ/mol, 1228.9 mV, 21 seals — is computed somewhere in this
 * repository, and typing it a second time into prose creates a copy that can
 * drift while nothing notices. That is the same defect as a hardcoded test
 * expectation, wearing prose.
 *
 * So each fact below is RECOMPUTED and the current version's section must
 * contain it. Change the code and the note goes stale; the gate then says so,
 * naming the fact and both values.
 *
 * This deliberately does not generate the prose. A generated changelog says
 * what changed in the tree, which is what `git log` already says. What a reader
 * needs is what it means, and that has to be written.
 *
 *   npm run changelog:check   fail if a stated figure no longer recomputes
 */

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const version = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8')).version
const changelog = readFileSync(resolve(ROOT, 'CHANGELOG.md'), 'utf8')

// The section for the version being released, up to the next heading.
const start = changelog.indexOf(`## ${version}`)
if (start < 0) {
  console.error(`changelog:check — no "## ${version}" section`)
  process.exit(1)
}
const rest = changelog.slice(start + 3)
const end = rest.indexOf('\n## ')
const section = end < 0 ? rest : rest.slice(0, end)

const { SEALS } = await import('../src/verification/lean-bridge.ts')
const thermo = await import('../src/thermo/free-energy.ts')
const waste = await import('../src/thermo/wastewater-energy.ts')

/** Render microvolts as millivolts with one decimal, rounding once. */
function millivolts(uv) {
  const tenths = Math.round(uv / 100)
  return `${(tenths - (tenths % 10)) / 10}.${tenths % 10}`
}

const facts = [
  {
    what: 'seal count',
    value: String(Object.keys(SEALS).length),
    where: 'lean-bridge SEALS',
  },
  {
    what: 'Gibbs energy of splitting, kJ/mol',
    value: String(thermo.toKilojoulesPerMole(thermo.GIBBS_SPLITTING)),
    where: 'free-energy GIBBS_SPLITTING',
  },
  {
    what: 'reversible cell potential, mV',
    value: millivolts(thermo.reversiblePotentialMicrovolts()),
    where: 'free-energy reversiblePotentialMicrovolts',
  },
  {
    what: 'thermoneutral potential, mV',
    value: millivolts(thermo.thermoneutralPotentialMicrovolts()),
    where: 'free-energy thermoneutralPotentialMicrovolts',
  },
  {
    what: 'break-even contamination, mg/L COD',
    value: String(waste.breakEvenCod()),
    where: 'wastewater-energy breakEvenCod',
  },
]

let missing = 0
for (const f of facts) {
  const present = section.includes(f.value)
  console.log(`  ${present ? 'ok  ' : 'STALE'} ${f.what.padEnd(38)} ${f.value.padStart(8)}  (${f.where})`)
  if (!present) missing++
}

if (missing > 0) {
  console.error(
    `changelog:check FAIL — ${missing} figure(s) recompute to a value the "## ${version}" section does not state`,
  )
  process.exit(1)
}
console.log(`changelog:check ok — ${facts.length} figures in "## ${version}" recompute from the code`)
