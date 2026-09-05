#!/usr/bin/env node
/**
 * Every bold claim this repository makes, beside the command that refutes it.
 *
 * A claim without a refutation procedure is an assertion, and this package's
 * whole apparatus exists because assertions are cheap. So the claims are stated
 * BOLDLY — no hedging, no "arguably", no softening a number that was measured —
 * and each one carries the exact command a critic runs to compute against it,
 * plus what a refutation would look like.
 *
 * THE COMMANDS ARE VERIFIED TO EXIST. A refutation procedure pointing at a
 * script nobody kept is worse than no invitation at all: it reads as openness
 * and cannot be taken up. Every command below is checked against package.json
 * on every run, and a missing one fails this script.
 *
 * WHAT IS DELIBERATELY NOT HERE. Claims this repository cannot support are
 * absent rather than hedged. There is no quantum hardware, no proof of any Clay
 * problem, no demonstration that any shipped value is derived rather than
 * chosen — the census below states the opposite, in the boldest available form,
 * because it is what the measurement says.
 *
 *   npm run refute
 */
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

/** [the claim, the command, what refuting it would look like] */
const CLAIMS = [
  ['59 of 83 statements are accepted by the Lean kernel with no `sorry`, and 51 rest on no axiom beyond propext and Quot.sound.',
    'npm run lean:check',
    'a theorem the kernel does not accept, or an axiom dependency outside that set'],

  ['42 seals recompute a law over the shipped code, and every one of them can fail.',
    'npm run test:verification && npm run mutations:check',
    'a seal that holds when the code beneath it is corrupted — 35 mutations are run to try'],

  ['Three seals pin a convention and 38 compare one computation against another.',
    'npm run seal:pinning',
    'a seal classified structural whose comparisons are all against literals'],

  ['Every "DOES NOT ESTABLISH" written in a seal basis is true: corrupt what it disclaims and the seal still holds.',
    'npm run under:claims',
    'a seal that FALLS when its disclaimed subject is broken — it would be stronger than its own basis'],

  ['1413 of 1753 exported values are reachable from no law at all, and 49 of 57 exported constants are held by nothing.',
    'npm run constrained',
    'a law reaching a value the census calls free — the census is the CLAIM, and it is a claim of weakness'],

  ['The GHZ state is computed exactly: probabilities are the rational 1/2, with no tolerance anywhere in the check.',
    'npm run test:exact',
    'a rational that is not 1/2, or a distribution whose exact sum is not 1'],

  ['The float simulator CANNOT reach that exactness — it returns 5.00000000000000111e-1 and sums to 1 + 2.2e-16.',
    'npm run qpu:reality',
    'a float run that lands on one half exactly; H carries 1/√2 and no binary float holds it'],

  ['Hexbits do not unlock quantum advantage. The separation is in QUERIES and no representation touches it.',
    'npm run hexbit:advantage',
    'a representation that changes the query count — the simulation makes 64 evaluations for a 1-query algorithm'],

  ['Packing the state layout would make this simulator SLOWER, not faster: 1.32x and 1.82x against the shipped form.',
    'npm run rosetta:amplitudes',
    'a typed-array layout that beats the object array on paired trials'],

  ['This machine binds at 31 qubits, in RAM. CPU and GPU add no qubits at all.',
    'npm run qpu:pentagram',
    'a point of the pentagram that raises the width rather than dividing the time'],

  ['The CERN corpus is 6.6 PB, not the 43 PB this repository previously published, and 6.6 PB is BELOW 2^53 bytes.',
    'npm run cern:cases',
    'a stratified estimate over the partition that lands above 2^53 — the earlier figure was a slice'],

  ['66,026 of 66,042 CERN dataset records are reachable through scoped queries, and no record lies in two leaves.',
    'npm run cern:cases',
    'a pair of leaves with a non-empty intersection, or a partition covering more than 66,026'],

  ['No checker under src/verification/ holds a private copy of a shipped constant.',
    'npm run shadowed:check',
    'a const there sharing a name with an export elsewhere in src'],

  ['Every figure stated in the current CHANGELOG section is produced by a module, not typed.',
    'npm run changelog:check',
    'a quantity in that section no code computes'],

  ['This package has zero runtime dependencies and 24 entry points a consumer can import.',
    'npm run entrypoints',
    'an advertised entry point that fails to import, or a dependency in package.json'],
]

const scripts = new Set(Object.keys(pkg.scripts ?? {}))
const missing = []
for (const [, command] of CLAIMS) {
  for (const part of command.split('&&').map((c) => c.trim())) {
    const name = part.replace(/^npm run\s+/, '')
    if (!scripts.has(name)) missing.push(name)
  }
}

console.log(`  ${CLAIMS.length} claims, each with the command that computes against it\n`)
for (const [claim, command, refutation] of CLAIMS) {
  console.log(`  ${claim}`)
  console.log(`      run:      ${command}`)
  console.log(`      refuted by: ${refutation}\n`)
}

if (missing.length > 0) {
  console.error(`refute FAIL — ${missing.length} command(s) named here do not exist: ${[...new Set(missing)].join(', ')}`)
  console.error('  An invitation to refute that points at a missing script reads as openness and cannot be taken up.')
  process.exit(1)
}
console.log(`refute ok — all ${CLAIMS.length} refutation commands exist and can be run by anyone`)
console.log('            the claims are stated at full strength; the commands are how you disagree')
