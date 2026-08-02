/**
 * lobes — offline, self-sufficient learning from the two sibling repositories.
 *
 * The double torus in this corpus is: lobe L = ceccec.github.io, lobe R =
 * erpax, throat = src/0. This module lets the throat LEARN from either lobe
 * without a network: it reads sibling checkouts if they happen to sit beside
 * this one on disk, folds what it finds into content-addressed receipts, and
 * reports honestly when a lobe is absent.
 *
 * Self-sufficient means exactly that — no fetch, no clone, no shell-out. Every
 * function here returns a well-formed answer with zero lobes present. Absence
 * is data, not an error.
 *
 * ON "QUANTUM" AND "FTL". Both words have DEFINED, computed meanings in this
 * corpus and neither is a physics claim:
 *   - erpax computes `ftlReport().holds` as reuse ∧ amortize∞ ∧ cracks=∅ —
 *     a statement about not recomputing work, not about signalling faster than
 *     light.
 *   - `computePhysicalFtl()` in src/0 derives a boolean from structural seals.
 * Nothing here transmits information superluminally, and nothing here runs on
 * quantum hardware. The names are the corpus's own labels for reuse and for
 * seal-completeness. Read them that way.
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { toUuid, merkleFold } from '../0/index.ts'

const HERE = dirname(fileURLToPath(import.meta.url))
/** Sibling checkouts live beside this repository, never inside it. */
const NEIGHBOURHOOD = resolve(HERE, '../../..')

export type LobeName = 'ceccec.github.io' | 'erpax'

export type LobeSurface = {
  readonly file: string
  readonly bytes: number
  readonly receipt: string
}

export type LobeReading = {
  readonly lobe: LobeName
  readonly present: boolean
  readonly path: string | null
  readonly surfaces: readonly LobeSurface[]
  /** Named laws / gates the lobe declares, deduped and sorted. */
  readonly laws: readonly string[]
  readonly root: string
}

/** Orientation surfaces, in the order an agent is told to read them. */
const SURFACE_FILES = ['AGENTS.md', 'SKILL.md', 'llms.txt', 'README.md'] as const

/**
 * Named laws a lobe declares. Both lobes name their gates in the same shape —
 * a lowerCamelCase identifier stated as a rule — so one pattern reads both.
 */
const LAW = /\b([a-z][A-Za-z0-9]{6,}(?:Is|Are|Must|Refus|Carries|Holds|Fails|Requires)[A-Za-z0-9]*)\b/g

function readSurface(dir: string, file: string): LobeSurface | null {
  const p = join(dir, file)
  if (!existsSync(p)) return null
  const text = readFileSync(p, 'utf8')
  return { file, bytes: text.length, receipt: toUuid(`lobe-surface:${file}:${text}`) }
}

function lawsIn(text: string): string[] {
  const found = new Set<string>()
  LAW.lastIndex = 0
  for (const m of text.matchAll(LAW)) found.add(m[1]!)
  return [...found].sort()
}

/** Read one lobe. Absent lobes return present:false, never throw. */
export function readLobe(lobe: LobeName, neighbourhood: string = NEIGHBOURHOOD): LobeReading {
  const dir = join(neighbourhood, lobe)
  const present = existsSync(dir) && statSync(dir).isDirectory()
  if (!present) {
    return {
      lobe,
      present: false,
      path: null,
      surfaces: [],
      laws: [],
      root: toUuid(`lobe:absent:${lobe}`),
    }
  }
  const surfaces: LobeSurface[] = []
  const laws = new Set<string>()
  for (const file of SURFACE_FILES) {
    const s = readSurface(dir, file)
    if (!s) continue
    surfaces.push(s)
    for (const law of lawsIn(readFileSync(join(dir, file), 'utf8'))) laws.add(law)
  }
  return {
    lobe,
    present: true,
    path: dir,
    surfaces,
    laws: [...laws].sort(),
    root: merkleFold([toUuid(`lobe:${lobe}`), ...surfaces.map((s) => s.receipt)]),
  }
}

export type DoubleTorusReading = {
  readonly lobes: readonly LobeReading[]
  readonly present: number
  /** Laws BOTH lobes state — the shared spine worth adopting here. */
  readonly shared: readonly string[]
  /** Laws exactly one lobe states — candidates to learn from. */
  readonly unique: readonly { readonly lobe: LobeName; readonly law: string }[]
  /** True when the throat can operate with no lobe present. */
  readonly selfSufficient: true
  readonly root: string
  readonly boundary: string
}

/**
 * Read both lobes and fold them. Works with zero, one or two present.
 *
 * `selfSufficient` is the literal type `true`: this function cannot report
 * dependence on a lobe, because it has none. It is a claim about THIS code,
 * not about the corpus.
 */
export function readDoubleTorus(neighbourhood: string = NEIGHBOURHOOD): DoubleTorusReading {
  const lobes = (['ceccec.github.io', 'erpax'] as const).map((l) => readLobe(l, neighbourhood))
  const [left, right] = lobes
  const leftLaws = new Set(left!.laws)
  const rightLaws = new Set(right!.laws)
  const shared = [...leftLaws].filter((l) => rightLaws.has(l)).sort()
  const unique: { lobe: LobeName; law: string }[] = []
  for (const l of leftLaws) if (!rightLaws.has(l)) unique.push({ lobe: left!.lobe, law: l })
  for (const l of rightLaws) if (!leftLaws.has(l)) unique.push({ lobe: right!.lobe, law: l })
  return {
    lobes,
    present: lobes.filter((l) => l.present).length,
    shared,
    unique: unique.sort((a, b) => a.law.localeCompare(b.law)),
    selfSufficient: true,
    root: merkleFold(lobes.map((l) => l.root)),
    boundary:
      'Reads sibling checkouts from disk only — no network, no clone. Absent lobes are reported, not fetched. ' +
      '"quantum" and "FTL" here are the corpus\'s labels for reuse and seal-completeness, not physics claims.',
  }
}
