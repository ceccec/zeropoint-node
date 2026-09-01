#!/usr/bin/env node
/**
 * checks-falsifiable — prove the generator/checker pairs can actually fail.
 *
 * The gate is roughly half `X && X --check`: regenerate an artifact, then
 * confirm the committed copy matches. A checker like that is worth exactly as
 * much as its ability to say no, and nothing in the pipeline ever asked it to.
 * A --check that compared the wrong file, exited 0 on a read error, or silently
 * regenerated before comparing would pass every gate run for the rest of time
 * and read as evidence the docs were in sync.
 *
 * So each one is handed a corrupted artifact and required to notice. A checker
 * that does not exit non-zero on damaged input fails here by name.
 *
 * Restoration is verified by hash before moving on, and the probe refuses to
 * start on an artifact it cannot read, because the failure mode of a tool that
 * corrupts files is worse than the gap it closes.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pipelineFiles } from './lib/pipeline.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const sha = (b) => createHash('sha256').update(b).digest('hex')

/** checker npm script -> the generated artifact it is supposed to be guarding. */
const GUARDS = {
  // readme:check does NOT check README.md — it guards the two documents it
  // generates. Mapping it by its name is how this table got its first entry
  // wrong, and the probe caught that before the table was ever committed.
  'readme:check': 'docs/KERNEL.md',
  'docs:index:check': 'docs/DOCUMENTATION_INDEX.md',
  'a432:scan:check': 'docs/A432_QUANTUM_SCAN.md',
  'api:reference:check': 'docs/API_REFERENCE.md',
  'docs:pages:check': 'docs/pages/index.md',
  'vortex:svg:check': 'docs/public/vortex.svg',
  'bundle:a432:check': 'public/a432.bundle.js',
  // Block-scoped: these own a marked region of README.md and nothing else, so
  // the probe has to land inside the region or it proves nothing.
  'spectrum:check': ['README.md', 'SPECTRUM'],
}

/**
 * Checkers that read SOURCE rather than a generated artifact. Corrupting a
 * source file to test these would be testing the compiler, not the check; they
 * are falsified by the mutation tests that live with the code they read.
 */
const READS_SOURCE = {
  'constants:check': 'reads src/ for retyped kernel constants',
  'finite:check': 'imports every module, inspects exported values, and calls every export it can construct arguments for; falsified by the three mutations in the commit that added the call pass',
  'silent:check': 'imports every module and watches stdout',
  'standard:check': 'compares digitalRoot implementations across src/',
  'entries:check': 'reads package.json exports',
  'deps:check': 'compares declared runtime dependencies against what the built entry points import; falsified by the two mutations in the commit that added it — a dependency nothing reaches, and an entry point importing an undeclared package',
  'pages:check': 'reads the built docs tree',
  'zenodo:check': 'reads .zenodo.json',
  'rights:check': 'compares the rights record across LICENSE, package.json, CITATION.cff and .zenodo.json, and checks that the README does not invite contributions a NoDerivatives licence forbids; falsified by the three mutations in the commit that added it and the two in the commit that added the invitation condition',
  'changelog:check': 'reads CHANGELOG.md against git',
  'version:check': 'has its own self-test: npm run version:test',
  'notes:check': 'has its own self-test: npm run notes:test',
  'ratchet:check': 'compares measured surfaces against ratchet.json',
  'adjudicate:check': 'reads the seal set',
  'skills:check': 'reads the skills tree',
  'registry:check': 'reads the npm registry',
  'semver:check': 'diffs against the published package',
  'prose:check': 'reads prose in docs/ and src/',
  'readme:examples': 'executes the README examples against dist/; its own falsifiability is the mutation in the commit that added it',
  'readme:names': 'checks that every file and identifier the README names exists, including bare-backtick paths and camelCase names; falsified by the mutation in the commit that added it and the three in the commit that widened it',
  'readme:facts': 'recomputes the figures the README states; its own falsifiability is the two mutations in the commit that added it',
  // Added last, and the completeness guard immediately failed on it — this
  // probe is a checker in the pipeline like any other and had not said which
  // kind it was. It reads no artifact of its own; it corrupts other people's.
  'falsifiable:check': 'this probe itself — its own falsifiability is the mutation tests in the commit that added it',
}

const args = process.argv.slice(2)
const scripts = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).scripts

// Completeness, the same way EXERCISERS is kept honest: every checker the
// pipeline runs is either probed here or declared source-reading. A new
// checker cannot be added without saying which it is.
const pipelineText = [...pipelineFiles(ROOT)]
const inPipeline = Object.keys(scripts).filter((k) => {
  if (!/:check$|^math:ban$/.test(k)) return false
  const body = scripts[k]
  return pipelineText.some((f) => body.includes(f))
})
const undeclared = inPipeline.filter((k) => !(k in GUARDS) && !(k in READS_SOURCE) && k !== 'math:ban')
if (undeclared.length) {
  console.error(`checks-falsifiable FAIL — ${undeclared.length} checker(s) neither probed nor declared source-reading:`)
  for (const u of undeclared) console.error(`  ${u}`)
  process.exit(1)
}

const problems = []
let probed = 0

for (const [script, entry] of Object.entries(GUARDS)) {
  const [rel, block] = Array.isArray(entry) ? entry : [entry, null]
  const path = join(ROOT, rel)
  if (!existsSync(path)) {
    problems.push(`${script}: artifact ${rel} does not exist`)
    continue
  }
  const original = readFileSync(path)
  const before = sha(original)

  // Corrupt the middle rather than an end, so a checker comparing only a
  // header or only a trailing block still sees it.
  const bytes = Buffer.from(original)
  if (bytes.length < 64) { problems.push(`${script}: artifact ${rel} is too small to probe`); continue }
  let at = Math.floor(bytes.length / 2)
  if (block) {
    const text = original.toString('utf8')
    const begin = text.indexOf(`<!-- ${block}:BEGIN`)
    const end = text.indexOf(`<!-- ${block}:END`)
    if (begin < 0 || end < 0) { problems.push(`${script}: ${block} block not found in ${rel}`); continue }
    at = Buffer.byteLength(text.slice(0, Math.floor((begin + end) / 2)), 'utf8')
  }
  for (let i = 0; i < 40; i++) bytes[at + i] = 0x58 // 'X'

  let noticed = false
  try {
    writeFileSync(path, bytes)
    try {
      execFileSync('npm', ['run', script, '--silent'], { cwd: ROOT, stdio: 'pipe' })
    } catch {
      noticed = true // non-zero exit is the checker doing its job
    }
  } finally {
    writeFileSync(path, original)
    const after = sha(readFileSync(path))
    if (after !== before) {
      console.error(`checks-falsifiable ABORT — failed to restore ${rel}`)
      console.error(`  expected ${before}`)
      console.error(`  found    ${after}`)
      process.exit(2)
    }
  }

  probed++
  if (!noticed) problems.push(`${script}: passed with a corrupted ${rel} — it cannot fail`)
  if (args.includes('--verbose')) console.log(`  ${noticed ? 'ok  ' : 'FAIL'} ${script} <- ${rel}${block ? ` [${block}]` : ''}`)
}

console.log(`checks-falsifiable — ${probed} generated artifact(s) probed, ${Object.keys(READS_SOURCE).length} source-reading checker(s) declared`)
if (problems.length) {
  for (const p of problems) console.error(`  ✗ ${p}`)
  console.error(`checks-falsifiable FAIL — ${problems.length} problem(s)`)
  process.exit(1)
}
console.log('checks-falsifiable ok — every generated artifact has a checker that notices damage')
