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
import { readFileSync, writeFileSync, existsSync, rmSync, mkdirSync, cpSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'
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
  'paper:check': 'docs/public/paper.html',
  'bundle:a432:check': 'public/a432.bundle.js',
  'derivation:check': 'src/verification/derivation.json',
  'lean:bounds:check': 'lean/bounds.json',
  'seal:pinning:check': 'src/verification/seal-pinning.json',
  'constrained:check': 'src/verification/constrained.json',
  'zenodo:deposits:check': 'src/verification/deposits.json',
  'axiom:index:check': 'src/verification/axiom-index.json',
  // Block-scoped: these own a marked region of README.md and nothing else, so
  // the probe has to land inside the region or it proves nothing.
  'spectrum:check': ['README.md', 'SPECTRUM'],
  'readme:census:check': ['README.md', 'CENSUS'],
  'citations:check': 'CITATION.bib',
}

/**
 * Checkers that read SOURCE rather than a generated artifact. Corrupting a
 * source file to test these would be testing the compiler, not the check; they
 * are falsified by the mutation tests that live with the code they read.
 */
const READS_SOURCE = {
  'criteria:check': 'evaluates the criteria against live code — it reads the subject, not a generated artifact, so there is nothing to corrupt; its own falsifiability is the criterion test suites, which assert the verdict and not the shape',
  // This one is itself a falsification harness: it corrupts a module and
  // requires the suite over it to notice. It is declared here because the
  // pipeline's rule is that every source-reading checker is declared, and
  // because a mutation harness that could not fail would be the worst of the
  // lot — it certifies the suites that certify the code.
  'claims:check': 'runs the prose scanner, and requires every effect claim it finds to be bound in scripts/claims.json to a criterion, a seal or a declared axiom that RESOLVES AND HOLDS, with a stated demarcation of what it does not establish; coverage runs both ways, so a new claim fails for being unbound and a ledger entry whose claim is gone fails for being stale — the shape is borrowed from uuidna\'s axiom witness, where audited must equal ledger',
  'priorart:check': 'reads src/verification/prior-art.json and fails when a contribution names a file that does not exist, claims known art without citing it, says a search found nothing without recording when and where and what was asked, or BINDS NOVELTY TO A SEAL — novelty is a universal negative over all published work and may rest only on the axiom no_prior_art_is_undecidable. All four refusals were exercised against a corrupted ledger in the commit that added it, including the one that matters: an entry claiming novelty as a fact.',
  'lean:check': 'parses every .lean file as the SOURCE OF TRUTH, runs the Lean kernel on the files that import nothing, and fails when TypeScript disagrees with them — a LEAN_PROOFS entry naming a theorem no file declares, one presented as a proof that the file closes with sorry, or a theorem the generated ledger does not cover. It found eight real contradictions on its first run; twenty more it reported were its own errors and were fixed in the checker rather than in the repository.',
  'sideeffects:check': 'IMPORTS every published entry point in its own process and compares what each disturbs — new globalThis keys, surviving handles — against the sideEffects list in package.json; it fails when the declared list is not the measured one. A syntactic scan was tried first and refused, because grep cannot tell a top-level setInterval from one inside a function nobody calls, and the answer decides whether a bundler may delete code.',
  'mutations:check': 'corrupts one line of each module a law-asserting suite covers and requires that suite to exit non-zero; it fails if a suite survives, if an anchor is missing, if an anchor matches more than one place (a mutation landing on the wrong copy reports a false survivor, which is how a432.sequence.ts first reported one), or if a file is not restored byte for byte',
  'collisions:check': 'reads every exported DECLARATION from the syntax tree and fails when a module starts declaring a name another module already declares, then IMPORTS the colliding modules and fails when a recorded collision resolves to different values with no reason recorded; falsified by the four mutations in the commit that added it and the six in the commit that added the agreement pass — three of the six are controls that must NOT fail: a re-export (one definition on two paths), a type and a value sharing a name inside one module (the ordinary TypeScript idiom), and a recorded collision whose two sides agree, which needs no reason',
  'constants:check': 'reads src/ for retyped kernel constants',
  'finite:check': 'imports every module, inspects exported values, and calls every export it can construct arguments for; falsified by the three mutations in the commit that added the call pass',
  'silent:check': 'imports every module and watches stdout',
  'standard:check': 'compares digitalRoot implementations across src/',
  'entries:check': 'reads package.json exports',
  'under:claims': 'the involution of law-mutations. That harness corrupts what a seal DOES constrain and requires it to fall; this corrupts what a seal says it does NOT constrain and requires it to HOLD. Every "DOES NOT ESTABLISH X" in a basis is a claim, and a claim that states LESS than the code establishes is as false as one that states more — worse in one respect, since it reads as rigour and nobody argues with it. This repository had three instruments for over-claims and none for under-claims. A seal that falls here is stronger than its own basis admits and the SENTENCE is the thing to fix. Falsified by strengthening pauliX_unitary until it does identify X, which makes its DOES NOT IDENTIFY X disclaimer false and fires the gate; it also refuses to test a seal that does not hold unmutated, and refuses a substitution whose anchor is missing, since either would pass without testing anything.',
  'query:cost:check': 'hands every oracle-taking algorithm an oracle that COUNTS, because impostors found that nothing counted them and a query count is the entire content of the Deutsch-Jozsa and Grover advantages. Measured: deutschJozsa calls f exactly 2^n times against a classical worst case of 2^(n-1)+1, and groverSearch calls its predicate N*(k+1) times against a classical scan of N — 1.6x to 1.94x worse and 3x to 5x worse respectively, and 0 of 7 measurements show any advantage. That is not a defect and no care would remove it: a state-vector simulator applies a phase oracle by evaluating f on every basis state, so ONE quantum query costs 2^n classical evaluations by construction. The advantage is a property of hardware and is structurally absent here, which every timing and counting result in this repository sits inside. The counts are asserted as FORMULAS of n rather than as the numbers for the sizes that happened to be tried, so a changed query pattern fails and must be re-derived instead of absorbed into a larger constant. Falsified by altering how often an algorithm consults its oracle; it also refuses to report when it measured nothing, since no algorithms means no advantage either way. deutsch, bernsteinVazirani and simon are absent because they take no oracle to count — they are handed f0 and f1, or the hidden mask itself.',
  'impostors:check': 'replaces each quantum algorithm with a CLASSICAL IMPOSTOR that returns the same answers by another route, and runs the check that is supposed to notice. law-mutations corrupts a line and requires the suite to fail, which catches an implementation that has been BROKEN; it cannot catch one that has been REPLACED by something cheaper returning the same results, and method rather than result is the entire claim of this quantum surface. Not hypothetical: shor:check swept every modulus and base, found no wrong answer and no unexplained refusal, and passed classical trial division cleanly. Each entry declares in advance either identifiedBy — the named check MUST catch the impostor — or answerOnly with the reason, in which case it MUST survive, since a disclaimer that understates what a check does is as false as one that overstates it. An impostor must first be shown ANSWER-EQUIVALENT against the real implementation over declared samples, because a stand-in returning something different is a mutation and a check catching it has caught arithmetic: my phaseEstimation stand-in returned the phase as a fraction where the implementation returns the integer k, was caught for that reason, and I had already written it up as the check identifying a method. The answer-only count is a ceiling that only moves down, per algorithm rather than in total, since a count would fail whenever a newly documented weakness is added. It reads 1 of 8. Seven are identified either by RESIDUE (grover's exact 121/128 and 1/128; shor's refusal set) or by QUERY PATTERN (a phase oracle reads every basis state exactly once, where classical routines stop early) — and bernsteinVazirani, simon and phaseEstimation only became checkable at all once their hidden value could be passed as an oracle instead of as the answer, since `return hidden` had passed every check over the first two. The floor is 1 and not 0: deutsch has one bit of output over a two-element domain, so there is no residue and no query pattern either, 2^n and the classical worst case both being 2. Falsified by declaring an algorithm identifiedBy whose impostor survives, or answerOnly whose impostor is caught; it also refuses an empty table, refuses an entry with no samples, refuses an anchor matching other than once, and refuses to report anything when the unmutated clone already fails.',
  'shor:check': 'runs Shor over every modulus and base up to a ceiling it MEASURES rather than declares — the bound was typed as 63, then as 33, and a typed ceiling in an exhaustive check is the defect the check exists to prevent, since "every input" quietly becomes "every input that fitted the machine it was written on". It asks two things in BOTH directions. Is any returned pair not a true factorisation of N, compared against N itself rather than a literal. And, the arm that identifies the METHOD, does it ever SUCCEED where period-finding must refuse: odd period, or a^(r/2) = -1 mod N. The one-directional version of this check passed classical trial division cleanly — 0 wrong, 0 unexplained — because trial division never refuses, so the refusal arm was vacuous against the one substitution that mattered, and the sentence above the code claimed a discrimination the code did not perform. It now sweeps BOTH factorisers through one function and requires the classical stand-in to be caught; deleting the converse arm makes that requirement fail, which is what makes it a dependency and not a conjunct. THE CHECK CANNOT EXIST WHERE SHOR MATTERS: the refusal analysis calls a classical brute-force order finder, which is the problem Shor solves, so being able to run this at all is evidence the advantage is absent here. It refuses a sweep of zero inputs, refuses a budget admitting no width, names the band it declined to sweep so that "exhaustive" cannot outlive its range, and a corrupted record FAILS rather than regenerating.',
  'families:check': 'regenerates docs/theorem-families.md by grouping every ledger theorem under the DEFINED OBJECTS its Lean statement mentions, read from the def lines rather than listed — a hardcoded list of definitions once demoted a theorem about swap12 to literal arithmetic for being newer than the list. Falsified by editing the page. It also refuses to run when it reads 0 definitions, since every theorem would then look homeless, and it separates STATEMENT NOT PARSED from closed arithmetic: an unread statement has no letters in it, so the numerals-only test filed qft_unitary and grover_speedup as arithmetic until absence was distinguished from evidence.',
  'parity:check': 'regenerates docs/mcp-tools.md from the TOOLS array in src/mcp/server.ts and fails if the committed page differs. Written because the MCP surface — 11 tools, the first thing an agent reaches — was documented on NO page of a 190-page site, and because a hand-written tool list is a copy: this repository spent a day finding seals holding private gate matrices, a version literal five minors stale, and a deposit count frozen at 50 in prose. Falsified by editing the page by hand, which it reports; it also fails closed when it reads zero tools from the server, since a page generated from nothing would match a page containing nothing. It does NOT claim the four surfaces are equivalent — the library is 23 entry points against 11 tools and that gap is a choice, stated on the page rather than hidden.',
  'scripts:parse': 'asks node to parse every .mjs under scripts/ and nothing more. Written because cern-quantum-cases.mjs shipped with a duplicate `const ratio` — two edits an hour apart declaring the same name in one block — and the whole gate chain passed, because that script is not in the chain: it is network-dependent, and gating a build on a third party API would be worse. But "not gated on behaviour" had become "not read by anything at all". Deliberately the weakest useful check; a script whose logic is wrong passes here and should, since that is what its own gate is for. Falsified by appending a syntax error to any script, which reports the file and the SyntaxError; it also fails closed when it enumerates zero files, since a run that reads nothing cannot fail and prints the same green as one that read all 96.',
  'shadowed:check': 'scans for a const under src/verification/ whose name is also exported elsewhere in src. It exists because lean-bridge.ts declared its own H, X and Y beside an import of the rest of the simulator: the copies agreed, every seal held, and perturbing the shipped gates moved NOTHING — seven seals were reading private copies, and scaling the shipped H by 1.3 to destroy unitarity changed no verdict. The check is deliberately by name and not by value, because agreement between the copy and the original is exactly the state that hid the bug. Falsified by reintroducing the local X, which it reports; it also fails closed when it reads zero shipped exports, so "found none" cannot be confused with "never looked".',
  'deps:check': 'compares declared runtime dependencies against what the built entry points import; falsified by the two mutations in the commit that added it — a dependency nothing reaches, and an entry point importing an undeclared package',
  'pages:check': 'reads the built docs tree',
  'zenodo:check': 'reads .zenodo.json',
  'rights:check': 'compares the rights record across LICENSE, package.json, CITATION.cff and .zenodo.json, and checks that the README does not invite contributions a NoDerivatives licence forbids; falsified by the three mutations in the commit that added it and the two in the commit that added the invitation condition',
  'changelog:check': 'reads CHANGELOG.md against git',
  'version:check': 'has its own self-test: npm run version:test',
  'notes:check': 'has its own self-test: npm run notes:test',
  'ratchet:check': 'compares measured surfaces against ratchet.json',
  'plan:check': 'compares each release against the target release-plan.json set for that patch; falsified by the four mutations in the commit that added it — a missed target, an incoherent plan, a target amended with a recorded reason which must NOT fail, and the run boundary that the check itself corrected',
  'measure:check': 'fingerprints each ratchet measure and fails when one changed without ratchet.json declaring it; falsified by the four mutations in the commit that added it, one of which is a control that must NOT fail — rewording a comment inside a measure',
  'adjudicate:check': 'reads the seal set',
  'skills:check': 'reads the skills tree',
  'registry:check': 'reads the npm registry',
  'semver:check': 'diffs against the published package',
  'prose:check': 'reads prose in docs/ and src/',
  'description:check': 'binds every claim in the npm description to a module, an export and a criterion where one exists; falsified by the three mutations in the commit that added it — rewording the description, naming an export that does not exist, and forcing the consciousness criterion unmet, which proves the criterion is evaluated rather than recorded',
  'refs:check': 'resolves every `npm run x` and every scripts//src//docs path a comment or a printed string names; falsified by the five mutations in the commit that added it, one of which is a control that must NOT fail — the same path inside a string literal rather than a comment',
  'retracted:check': 'reads every retraction marker in tracked prose and looks for the withdrawn claim elsewhere in the same file; falsified by the three mutations in the commit that added it — re-asserting a retracted sentence, restoring a hand-written count, and a mention in CHANGELOG.md which must NOT fail',
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

/**
 * THE CORRUPTION HAPPENS IN A CLONE, NOT IN THE WORKING TREE.
 *
 * This wrote 40 bytes of 'X' into checked-out artifacts — README.md among them
 * — and restored them, hash-verified. Other sessions commit this repository
 * automatically, so that window is a real exposure, and I widened it myself by
 * adding derivation:check to the table above: probing it holds a corrupted
 * artifact for as long as a full derivation run, which is minutes rather than
 * the seconds every other entry costs.
 *
 * The checker has to READ the corrupted artifact, so the corruption cannot move
 * somewhere else — the whole repository moves instead. `cp -Rc` clones it
 * copy-on-write in about five seconds and no disk, .git excluded because no
 * checker here needs it, and every probe runs with the clone as its cwd.
 */
const TREE = join(process.env.CLAUDE_SCRATCHPAD ?? tmpdir(), `falsifiable-tree-${process.pid}`)
rmSync(TREE, { recursive: true, force: true })
mkdirSync(TREE, { recursive: true })
for (const entry of readdirSync(ROOT)) {
  if (entry === '.git') continue
  try { execFileSync('cp', ['-Rc', join(ROOT, entry), join(TREE, entry)], { stdio: 'pipe' }) }
  catch { cpSync(join(ROOT, entry), join(TREE, entry), { recursive: true }) }
}
process.on('exit', () => rmSync(TREE, { recursive: true, force: true }))

const problems = []
let probed = 0

for (const [script, entry] of Object.entries(GUARDS)) {
  const [rel, block] = Array.isArray(entry) ? entry : [entry, null]
  const path = join(TREE, rel)
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
      execFileSync('npm', ['run', script, '--silent'], { cwd: TREE, stdio: 'pipe' })
    } catch {
      noticed = true // non-zero exit is the checker doing its job
    }
  } finally {
    writeFileSync(path, original)
    const after = sha(readFileSync(path))
    if (after !== before) {
      console.error(`checks-falsifiable ABORT — failed to restore ${rel} inside the clone at ${TREE}. The working tree was never written to.`)
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
