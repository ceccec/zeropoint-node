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
