/**
 * The theorem corpus as a scene, positioned by the arithmetic it is about.
 *
 * The theorems are the work; they have been readable only as a list. This lays
 * them out in three dimensions using the vortex geometry the repository already
 * computes — the same torus parameterisation a432.vbm.animation draws — so the
 * corpus becomes an object rather than a table.
 *
 * NOTHING HERE IMPORTS AN ENGINE. It emits positions, colours and edges as
 * plain numbers. a432.vbm.animation already takes its renderer as a parameter,
 * and this feeds the same shape: the geometry is ours, the drawing is the
 * caller's. A package that shipped a 3D engine to display its own theorems
 * would be carrying a renderer to make a point about arithmetic.
 *
 * The layout is not decorative. A theorem's angle around the torus is its index
 * through the digit sequence, and its minor angle is the digital root of that
 * index — so the corpus is arranged by the same doubling walk it describes.
 * Colour is the standing: proven, sorry, unverifiable.
 *
 *   npm run theorem:scene
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = join(import.meta.dirname, '..')
const led = JSON.parse(readFileSync(join(ROOT, 'lean/ledger.json'), 'utf8'))
const m = await import(pathToFileURL(join(ROOT, 'src/0/index.ts')).href)

const SEQ = [...m.VORTEX_SEQUENCE]
const R = 4, r = 1
const STANDING = {
  proven: { hue: 120, note: 'accepted by the kernel' },
  sorry: { hue: 40, note: 'written down, closed with sorry' },
  'unverifiable-here': { hue: 210, note: 'needs a library this repository cannot build here' },
  'rests-on-more': { hue: 0, note: 'kernel-accepted but resting outside the allowed axiom set' },
  rejected: { hue: 350, note: 'the kernel rejected it' },
}

// Which defined objects each theorem speaks of — the edges are shared subjects,
// read from the sources rather than assigned.
const DEFS = new Set()
const srcOf = {}
for (const f of [...new Set(led.entries.map((e) => e.file))]) {
  const src = readFileSync(join(ROOT, 'lean', f), 'utf8')
  srcOf[f] = src
  for (const d of src.matchAll(/^def\s+(\w+)/gm)) DEFS.add(d[1])
}
const statementOf = {}
for (const [f, src] of Object.entries(srcOf)) {
  for (const t of src.matchAll(/^theorem\s+([A-Za-z0-9_']+)\s*([\s\S]*?):=/gm)) {
    statementOf[t[1]] = t[2].replace(/^\s*:/, '').replace(/\s+/g, ' ').trim()
  }
}

const nodes = led.entries.map((e, i) => {
  const digit = SEQ[i % SEQ.length]
  const theta = (i / led.entries.length) * Math.PI * 2
  const phi = (m.digitalRoot(digit) / 9) * Math.PI * 2
  const standing = STANDING[e.status] ?? { hue: 0, note: e.status }
  const speaksOf = [...DEFS].filter((d) => new RegExp(`\\b${d}\\b`).test(statementOf[e.name] ?? ''))
  return {
    name: e.name, file: e.file, status: e.status,
    axioms: e.axioms ?? null,
    restsOnNothing: Array.isArray(e.axioms) && e.axioms.length === 0,
    digit, speaksOf,
    // exact integers where the arithmetic allows; the trig is the boundary
    position: {
      x: (R + r * Math.cos(phi)) * Math.cos(theta),
      y: r * Math.sin(phi),
      z: (R + r * Math.cos(phi)) * Math.sin(theta),
    },
    hue: standing.hue, standing: standing.note,
  }
})

const edges = []
for (let a = 0; a < nodes.length; a++) {
  for (let b = a + 1; b < nodes.length; b++) {
    const shared = nodes[a].speaksOf.filter((d) => nodes[b].speaksOf.includes(d))
    if (shared.length) edges.push({ from: nodes[a].name, to: nodes[b].name, shared })
  }
}

const scene = {
  what: 'The theorem corpus laid out on the vortex torus: one node per statement, positioned by its index through the digit sequence and the digital root of that digit, coloured by standing, linked where two theorems speak of the same defined object.',
  doesNotEstablish: 'anything. A layout is a way of looking at a ledger, not evidence about it. Position carries the index and the digital root; it does not carry truth, importance or difficulty.',
  renderer: 'none shipped. a432.vbm.animation takes a ThreeLike as a parameter; this emits the numbers that feed it. The engine is the caller’s.',
  torus: { majorRadius: R, minorRadius: r },
  counts: { nodes: nodes.length, edges: edges.length, proven: nodes.filter((n) => n.status === 'proven').length, restingOnNothing: nodes.filter((n) => n.restsOnNothing).length },
  nodes, edges,
}
writeFileSync(join(ROOT, 'src/verification/theorem-scene.json'), JSON.stringify(scene, null, 2) + '\n')
console.log(`theorem:scene — ${nodes.length} node(s), ${edges.length} edge(s) from shared defined objects; ${scene.counts.proven} proven, ${scene.counts.restingOnNothing} resting on nothing`)
console.log('                positions only — no engine is imported, and none ships')
