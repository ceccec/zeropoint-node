#!/usr/bin/env node
/**
 * generated-current — run every artifact's checker WITHOUT running its
 * generator first, which is the one question the gate chain cannot ask.
 *
 * THE CHAIN REPAIRS WHAT IT IS ABOUT TO INSPECT. Twelve entries in
 * `npm run check` have the form
 *
 *     npm run X && npm run X:check
 *
 * The generator runs, the working tree stops being stale, and the checker then
 * compares the file to what the generator just wrote. The pair tests the
 * generator's DETERMINISM. It cannot fail on a stale COMMITTED document,
 * because by the time anything looks, the document is no longer stale.
 *
 * checks-falsifiable's header said the pair "regenerates an artifact, then
 * confirms the COMMITTED COPY matches". It does not, and that sentence is
 * corrected there now.
 *
 * DEMONSTRATED, NOT ARGUED. In a clone: commit an API_REFERENCE.md saying 962
 * exports where the measurement is 966, leaving the tree clean. Run the pair
 * as the chain runs it — "ok — 966 exports", exit 0, HEAD still 962. Run the
 * CHECKER alone against the same tree — "FAIL: docs/API_REFERENCE.md has
 * drifted from the exports". Same file, same checker, opposite verdicts, and
 * the only difference is whether the generator ran first.
 *
 * IT HAD ALREADY COST TWICE THE SAME DAY. API_REFERENCE.md was four exports
 * stale on origin for ten hours across several pushes, each running the full
 * chain through the pre-push hook. docs/public/paper.tex stated a census — 1522
 * of 1877 exported values reachable from no law — that the very commit pushing
 * it past had superseded. Every gate run repaired both in the working tree, and
 * every time the repair was left behind and read as residue after a hook run,
 * which is exactly what it looks like.
 *
 * TWO CONDITIONS, AND THE FIRST VERSION OF THIS HAD ONLY THE WEAKER ONE.
 * It compared the working tree to git and nothing else — which passes whenever
 * the generators have not run, since then the two agree by construction. That
 * is the same defect one level up: a check whose meaning depends on what ran
 * before it. Caught by its own arm-one probe, which did not fire.
 *
 *   1. every checker passes WITHOUT its generator. That is the real question:
 *      is the file on disk the file the measurement produces?
 *   2. every artifact is tracked and matches HEAD, so the bytes the checkers
 *      just approved are the bytes that will be pushed.
 *
 * Either condition alone is satisfiable without the other: (1) holds while a
 * correct artifact sits unstaged, (2) holds while a stale artifact is faithfully
 * committed. Only together do they say what git holds is what the repo measures.
 *
 * WHAT THIS DOES NOT ESTABLISH: that any artifact is CORRECT. The checkers own
 * correctness and checks-falsifiable owns whether they can fail. This owns only
 * the gap between them, which is that neither of them looks at git.
 *
 *   npm run generated:current
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { GUARDS } from './lib/generated-artifacts.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const git = (args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' })

const checkers = Object.keys(GUARDS)
/** Deduplicated: two block-scoped checkers share README.md. */
const artifacts = [...new Set(Object.values(GUARDS).map((v) => (Array.isArray(v) ? v[0] : v)))].sort()
if (checkers.length === 0 || artifacts.length === 0) {
  console.error('generated:current FAIL — the artifact table is empty, so this would pass by having nothing to compare')
  process.exit(1)
}

/**
 * DECLARED, NOT SKIPPED. A checker that asks an external toolchain answers
 * differently on different machines, and running one here would make this gate
 * report the machine rather than the repository. The one exception is named
 * with its reason, and the list is checked against the table below so a name
 * that stops existing fails instead of quietly excusing nothing.
 *
 * It is not a hole in the artifact's coverage: lean/bounds.json is still
 * probed by checks-falsifiable, still regenerated and checked by the chain,
 * and still compared against git by condition 2 below. What is skipped is only
 * condition 1 for that one file.
 */
const ENVIRONMENT_DEPENDENT = {
  'lean:bounds:check': 'runs the Lean kernel on a widened theorem with a 300-second timeout, and the'
    + ' script itself documents a VOID path for a machine with no lean on PATH. Verified to disagree'
    + ' with itself across two byte-identical trees on this machine — same bounds.json, same sources,'
    + ' opposite verdicts, three runs each. A resource limit refutes nothing, which is that script\'s'
    + ' own rule, and a gate that inherits its answer would be reporting load.',
}
const undeclared = Object.keys(ENVIRONMENT_DEPENDENT).filter((k) => !(k in GUARDS))
if (undeclared.length > 0) {
  console.error(`generated:current FAIL — declared as environment-dependent but not a checker in the table: ${undeclared.join(', ')}`)
  process.exit(1)
}

const problems = []

// ── 1. every checker, WITHOUT its generator ────────────────────────────────
let ran = 0
for (const checker of checkers) {
  if (checker in ENVIRONMENT_DEPENDENT) continue
  try {
    execFileSync('npm', ['run', checker, '--silent'], { cwd: ROOT, stdio: 'pipe' })
    ran += 1
  } catch (err) {
    const said = [err.stdout, err.stderr].map((b) => (b ? b.toString() : '')).join('').trim().split('\n')
      .filter((l) => l && !l.startsWith('>') && !l.startsWith('npm '))
    problems.push([GUARDS[checker], `${checker} fails on the file as it stands: ${said[0] ?? 'no output'}`])
    ran += 1
  }
}

// ── 2. and the bytes it approved are the bytes git holds ───────────────────
/**
 * TRACKED, UNTRACKED AND ABSENT ARE THREE ANSWERS. An artifact git has never
 * heard of is not in sync — it is a generated file that reaches nobody. Folding
 * that into clean is the collapse this repository spent the day removing from
 * seven finders.
 */
const tracked = new Set(git(['ls-files', '--', ...artifacts]).split('\n').filter(Boolean))
const dirty = new Set([
  ...git(['diff', '--name-only', 'HEAD', '--', ...artifacts]).split('\n'),
  ...git(['diff', '--name-only', '--cached', '--', ...artifacts]).split('\n'),
].filter(Boolean))
for (const rel of artifacts) {
  if (!existsSync(join(ROOT, rel))) { problems.push([rel, 'the generator produces this and it is not on disk']); continue }
  if (!tracked.has(rel)) { problems.push([rel, 'generated but never added to git — it would reach nobody']); continue }
  if (dirty.has(rel)) problems.push([rel, 'what git holds is not what is on disk — the repair would not be pushed'])
}

if (problems.length > 0) {
  console.error(`generated:current FAIL — ${problems.length} problem(s) across ${artifacts.length} generated artifacts:\n`)
  for (const [rel, why] of problems) console.error(`  ${rel}\n    ${why}`)
  console.error('\n  Nothing else in the chain reports this: it regenerates before it checks, so')
  console.error('  the file is repaired in the working tree and the repair is left behind.')
  console.error('  Run the generator, then COMMIT what it wrote.')
  process.exit(1)
}
console.log(`generated:current ok — ${ran} checkers pass without their generators`
  + `${Object.keys(ENVIRONMENT_DEPENDENT).length > 0 ? ` (${Object.keys(ENVIRONMENT_DEPENDENT).length} declared environment-dependent)` : ''}`
  + `, and all ${artifacts.length} artifacts match git`)
