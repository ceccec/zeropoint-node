/**
 * readme-figures — the figures the README states about this repository, and
 * where each one is computed.
 *
 * Shared by two callers that must not disagree. scripts/readme-facts.mjs
 * checks every stated instance against the computed value; scripts/ratchet.mjs
 * subtracts the lines they appear on from the unguarded-README count, because
 * a line a machine can contradict is not unguarded prose.
 */
import { execFileSync } from 'node:child_process'
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
  // coverage:audit owns these two numbers; reading its output is how they stop
  // being a second copy that drifts from the first.
  const lean = JSON.parse(readFileSync(join(root, 'lean/ledger.json'), 'utf8'))
  const coverage = (() => {
    const out = execFileSync('node', [join(root, 'scripts/coverage-audit.mjs')], { cwd: root, encoding: 'utf8' })
    const m = /([0-9]+) exported functions, ([0-9]+) never called/.exec(out)
    if (!m) throw new Error('readme-figures: coverage:audit printed no count')
    return { total: Number(m[1]), never: Number(m[2]) }
  })()
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
    {
      what: 'quantum proof checks',
      value: (await import(pathToFileURL(join(root, 'src/quantum/proof-of-system.ts')).href)).proveSystem().total_checks,
      where: 'src/quantum/proof-of-system.ts proveSystem',
      pattern: new RegExp(String.raw`checked by (\d+|${WORDS}) recomputable (?:facts|checks)`, 'gi'),
    },
    {
      what: 'criterion conditions',
      value: (await import(pathToFileURL(join(root, 'src/verification/consciousness-criterion.ts')).href))
        .evaluateConsciousnessCriterion().conditionsTotal,
      where: 'src/verification/consciousness-criterion.ts',
      pattern: new RegExp(String.raw`\b(\d+|${WORDS})\s+\*\*necessary\*\*\s+conditions`, 'gi'),
    },
    {
      what: 'criterion conditions met',
      value: (await import(pathToFileURL(join(root, 'src/verification/consciousness-criterion.ts')).href))
        .evaluateConsciousnessCriterion((await import(pathToFileURL(join(root, 'src/verification/consciousness-criterion.ts')).href)).a432MeasureSubject).conditionsMet,
      where: 'src/verification/consciousness-criterion.ts',
      pattern: new RegExp(String.raw`meet (\d+|${WORDS}) of the five`, 'gi'),
    },
    {
      what: 'OS conditions met by A432OS',
      value: await (async () => {
        const { evaluateOsCriterion } = await import(pathToFileURL(join(root, 'src/verification/os-criterion.ts')).href)
        const { A432OS } = await import(pathToFileURL(join(root, 'src/0/3/6/9/1/2/4/8/7/5/1/a432.os.ts')).href)
        const os = new A432OS()
        // The full interface — probing only start/stop would pin this at 1 and
        // silently disagree with the class the README is describing.
        return evaluateOsCriterion({
          spawn: (n, r) => os.spawn(n, r), tick: () => os.tick(), tasks: () => os.tasks(),
          allocate: (o, a) => os.allocate(o, a), release: (o, a) => os.release(o, a), available: () => os.available(),
          syscall: (n, ...a) => os.syscall(n, ...a),
          start: () => os.start(), stop: () => os.stop(), isRunning: () => os.running(),
          snapshot: () => os.snapshot(), restore: (x) => os.restore(x),
        }).conditionsMet
      })(),
      where: 'src/verification/os-criterion.ts against A432OS',
      pattern: /\*\*`A432OS` meets (\d+) of the 7\.\*\*/g,
    },
    // The coverage sentence. It said "326 of 1136 exported functions have never
    // been called" for long enough to ship in several releases, while the
    // numbers were 148 of 1291 — the README's own front page understating the
    // repository's progress by more than half, on the page npm renders to every
    // visitor. Nothing guarded it because no figure here matched the phrasing.
    // The Lean ledger. Prose about what is proven is the single easiest thing
    // in this repository to get wrong, and it was wrong in a .lean header for
    // several published releases.
    {
      what: 'theorems in the Lean files',
      value: lean.theorems,
      where: 'lean/ledger.json',
      // "statements", not "theorems": the sealed-theorems figure matches any
      // "<n> theorems" and claimed this number as its own. Two figures whose
      // patterns overlap will fight over whichever sentence comes first.
      pattern: /Lean files hold (\d+) statements/g,
    },
    {
      what: 'theorems the Lean kernel accepts',
      value: lean.proven,
      where: 'lean/ledger.json',
      pattern: /(\d+) are accepted by the Lean kernel/g,
    },
    {
      what: 'Lean theorems closed with sorry',
      value: lean.sorry,
      where: 'lean/ledger.json',
      pattern: /(\d+) are closed with `sorry`/g,
    },
    // The MCP tool count. The README said "eight kernel tools" and the server
    // answered eleven the day three were added — a number in prose that nothing
    // reads from the thing it describes drifts on the first change to it.
    {
      what: 'MCP tools the server exposes',
      value: (() => {
        const src = readFileSync(join(root, 'src/mcp/server.ts'), 'utf8')
        return (src.match(/^\s{4}name: 'zeropoint\./gm) ?? []).length
      })(),
      where: 'src/mcp/server.ts tool declarations',
      pattern: new RegExp(String.raw`exposing (\d+|${WORDS}) kernel tools`, 'gi'),
    },
    {
      what: 'untested exported functions',
      value: coverage.never,
      where: 'npm run coverage:audit',
      pattern: /\b(\d+) of \d+ exported functions have never been called\b/g,
    },
    {
      what: 'exported functions counted',
      value: coverage.total,
      where: 'npm run coverage:audit',
      pattern: /\b\d+ of (\d+) exported functions have never been called\b/g,
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
