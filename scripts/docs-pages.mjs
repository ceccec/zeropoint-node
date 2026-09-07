#!/usr/bin/env node
/**
 * Generate static doc projections from the kernel (Wave 6).
 * Pages are projections of src/0 — not second sources.
 */

import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  KERNEL_SEALED,
  VORTEX_SEQUENCE,
  VORTEX_REVERSE,
  throughVoid,
  developmentVortex,
  foldVortex,
  foldVortexReflection,
  vortexStrokeGateways,
  decodeVortexDashAngles,
  WAVE_CHAIN,
} from '../src/0/index.ts'
import {
  VORTEX_ORBIT,
  VORTEX_AXIS,
  LEGACY_CONSCIOUSNESS_SEQUENCE,
} from '../src/0/index.ts'
import {
  LATTICE_BITS,
  LATTICE_STATES,
  LATTICE_DEGREE,
  CUBOCTAHEDRON_NEIGHBOUR_EDGES,
  latticeState,
  edgesAmongNeighbours,
  adjacencyIgnoresPolarity,
  polaritiesAreTwins,
  latticeIsBipartite,
} from '../src/quantum/polarity-lattice.ts'
import { computeContentUuid } from '../src/integrity/content-uuid.ts'
import { importExportGraphTip } from '../src/kernel/import-graph.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'docs/pages')

const stroke = vortexStrokeGateways()
const vortex = foldVortex()
const reflection = foldVortexReflection()
const dash = decodeVortexDashAngles()
const dv = developmentVortex('verify')
const graph = importExportGraphTip()

/**
 * The spine is an address space: every prefix of it names a module that can be
 * loaded. Occupancy is read off the filesystem rather than listed, so a
 * deleted module shows up here as a gap instead of as prose that stayed true.
 */
const A432_DIR = resolve(root, 'src/0/3/6/9/1/2/4/8/7/5/1')
const a432Files = new Set(readdirSync(A432_DIR))
const addressesOf = (digits) =>
  digits.map((_, i) => {
    const prefix = digits.slice(0, i + 1).join('.')
    return { prefix, file: `a432.${prefix}.ts`, present: a432Files.has(`a432.${prefix}.ts`) }
  })
/** A walk closes on the digit it started from — the closure is an address too. */
const closed = (digits) => [...digits, digits[0]]
const spineAddresses = addressesOf(closed([...VORTEX_SEQUENCE]))
const orbitAddresses = addressesOf(closed([...VORTEX_ORBIT]))
const occupied = (as) => as.filter((a) => a.present).length
const gaps = [...spineAddresses, ...orbitAddresses].filter((a) => !a.present)

/** The state a lattice figure is quoted about — any one; they are all alike. */
const centre = latticeState(0b101101, 0)

const pages = [
  {
    slug: 'origin',
    title: 'Origin',
    body: [
      'Dependency-free leaf `src/0`. Fold = identity.',
      `KERNEL_SEALED: **${KERNEL_SEALED}**`,
      'Boundary: exact fold math; refused Clay/FTL/Payload.',
    ].join('\n\n'),
  },
  {
    slug: 'vortex-stroke',
    title: 'Vortex stroke',
    body: [
      `Sequence: \`${VORTEX_SEQUENCE.join('·')}\``,
      `Written: \`${stroke.written}\``,
      `Gateways: \`[${stroke.gateways.join(', ')}]\``,
      `foldVortex.valid: **${vortex.valid}**`,
      `Dash vortexMatches: **${dash.vortexMatches}** · weightedBearing: **${dash.weightedBearing}**`,
    ].join('\n\n'),
  },
  {
    slug: 'content-uuid',
    title: 'Content-uuid',
    body: [
      'JCS → SHA-256 → uuidv8 (`src/integrity/content-uuid.ts`).',
      'FNV `toUuid` stays for cheap folds; SHA seals proofs.',
      'Verify on read — mismatch is tamper.',
    ].join('\n\n'),
  },
  {
    slug: 'sequence-dual',
    title: 'Sequence dual',
    body: [
      `Kernel spine: \`${VORTEX_SEQUENCE.join('')}\` + void 0 · \`digitalRoot(0)→9\`.`,
      'Legacy path: `03691248751` · VBM `digitalRoot(0)→0` via adapters.',
      'One structure, read twice — both lines computed, never typed:',
      [
        '```',
        `forward     ${reflection.strokeForward}        ${reflection.forward.join('')}`,
        `reflected   ${reflection.strokeReflected}        ${reflection.reflected.join('')}`,
        '```',
      ].join('\n'),
      `The void tail reflects: \`0\` is fixed, the trailing unit is not — \`0\\1\` becomes \`0\\${throughVoid(1)}\`.`,
      `Mirror \`throughVoid(n) = 1 − n mod 9\` — involution fixed only at ${reflection.fixedPoints.join(',')}; every pair sums to 10.`,
      `Not array reversal (\`${VORTEX_REVERSE.join('')}\`): reversal reorders, the mirror re-values.`,
      `Entangled: doubling covers the orbit and its gap is exactly \`${reflection.gap.join(',')}\` · \`D∘M∘D⁻¹∘M = x+1\` · \`|⟨D,M⟩| = ${reflection.groupOrder}\` against \`${reflection.separateProduct}\` apart (excess ${reflection.excess}).`,
      `The axis is derived, not read: \`throughVoid\` carries \`${reflection.axisMirror.join(',')}\` — three digits of the orbit — onto \`${VORTEX_AXIS.join(',')}\`. The axis is the orbit seen through the void, so the spine has one list in it, not two.`,
      `foldVortexReflection().valid: **${reflection.valid}**`,
      'See [SEQUENCE.md](../SEQUENCE.md) · [Sequence addresses](./sequence-addresses.md).',
    ].join('\n\n'),
  },
  {
    slug: 'sequence-addresses',
    title: 'Sequence addresses',
    body: [
      'The spine is not only an ordering. Every prefix of it is an address, and every address names a module that loads — `a432.1`, `a432.1.2`, `a432.1.2.4`, on to the closure. The handle carries no payload; the name is the coordinate and the load happens at will.',
      'Occupancy is read off the filesystem, so a module that goes missing appears here as a gap rather than as a sentence that stayed true:',
      [
        '```',
        ...spineAddresses.map((a) => `${a.present ? '●' : '○'} ${a.file}`),
        '```',
      ].join('\n'),
      `Kernel spine \`${VORTEX_SEQUENCE.join('')}\` closed on its first digit: **${occupied(spineAddresses)}/${spineAddresses.length}** addressed.`,
      `Doubling orbit \`${VORTEX_ORBIT.join('')}\` closed on its first digit: **${occupied(orbitAddresses)}/${orbitAddresses.length}** addressed.`,
      `Gaps: **${gaps.length}**${gaps.length ? ` — ${gaps.map((g) => g.file).join(', ')}` : ''}.`,
      `Four kernel sequences are not address spaces at all, and that is a statement rather than a gap — \`VORTEX_AXIS\` (\`${VORTEX_AXIS.join('')}\`), \`VORTEX_MIRROR\`, \`VORTEX_REVERSE\` and \`LEGACY_CONSCIOUSNESS_SEQUENCE\` (\`${LEGACY_CONSCIOUSNESS_SEQUENCE.join('')}\`) have no file at any prefix. They are readings of the walk, not walks; a reading has nowhere to arrive.`,
      `The addresses are audited by \`npm run a432:names\`, filled by \`npm run a432:orbit\`, and no page may spell a kernel sequence differently from the kernel — \`npm run sequence:check\`.`,
      'See [SEQUENCE.md](../SEQUENCE.md) · [Sequence dual](./sequence-dual.md).',
    ].join('\n\n'),
  },
  {
    slug: 'sequence-lattice',
    title: 'Sequence lattice',
    body: [
      `Six bits, one per digit of the doubling orbit, and a polarity. Flipping any bit reaches a cell, and that cell at either polarity is a neighbour, so ${LATTICE_BITS} positions become **${LATTICE_DEGREE}** moves and every one of the **${LATTICE_STATES}** states sits at the centre of the same figure. No state is special; the neighbours change because the centre moves.`,
      `Twelve is the kissing number, and that is what made a vector equilibrium look like the answer. It is not one. A cuboctahedron's twelve vertices carry **${CUBOCTAHEDRON_NEIGHBOUR_EDGES} edges among themselves**; these twelve carry **${edgesAmongNeighbours(centre)}**, because two states reached by flipping different bits differ in two bits and two bits apart is not adjacent.`,
      `What it is, named exactly: the 6-cube with every vertex doubled into a non-adjacent twin — \`Q6[K̄₂]\`. Adjacency ignores the polarity entirely (**${adjacencyIgnoresPolarity()}**), the two polarities of a cell have identical neighbourhoods (**${polaritiesAreTwins()}**), and the whole thing inherits the cube's bipartition (**${latticeIsBipartite()}**).`,
      'The correction is kept rather than deleted, because the count that suggested a vector equilibrium is real and only the conclusion drawn from it was not. A count is not a solid.',
      'Computed by `src/quantum/polarity-lattice.ts` · asserted by `npm run test:polarity-lattice`.',
    ].join('\n\n'),
  },
  {
    slug: 'development-vortex',
    title: 'Development vortex',
    body: [
      `Wave chain: ${WAVE_CHAIN.join(' → ')}`,
      `developmentVortex(verify).computes: **${dv.computes}**`,
      `Throat merged: \`${dv.throat.merged}\``,
      `Import graph: files=${graph.fileCount} edges=${graph.edgeCount}`,
      'Lobe L = ceccec.github.io · Lobe R = erpax · Throat = src/0.',
    ].join('\n\n'),
  },
]

const indexLines = [
  '<!-- GENERATED by scripts/docs-pages.mjs — do not edit by hand -->',
  '',
  '# Computed pages',
  '',
  'Projections of `src/0` / integrity / kernel — not second sources.',
  '',
  ...pages.map((p) => `- [${p.title}](./${p.slug}.md)`),
  '',
]

/**
 * Per-page receipt — content-addressed over the page's own title + body.
 * Computed before embedding, so the stamp attests to what the page says.
 * A set-level receipt over slugs alone cannot: it never moves when a body moves.
 */
function receiptOf(p) {
  return computeContentUuid({ kind: 'docs-page', slug: p.slug, title: p.title, body: p.body })
}

/** Set root — folds every page receipt, so any body change moves it. */
const receipt = computeContentUuid({
  kind: 'docs-pages',
  pages: pages.map((p) => ({ slug: p.slug, receipt: receiptOf(p) })),
  stroke: stroke.written,
  vortexValid: vortex.valid,
  graphRoot: graph.root,
})

function renderPage(p) {
  return [
    '<!-- GENERATED by scripts/docs-pages.mjs — do not edit by hand -->',
    '',
    `# ${p.title}`,
    '',
    p.body,
    '',
    `Receipt: \`${receiptOf(p)}\` · set \`${receipt}\``,
    '',
  ].join('\n')
}

if (process.argv.includes('--check')) {
  if (!existsSync(outDir)) {
    console.error('docs/pages missing — run npm run docs:pages')
    process.exit(1)
  }
  const existing = readdirSync(outDir).filter((f) => f.endsWith('.md')).sort()
  const expected = ['index.md', ...pages.map((p) => `${p.slug}.md`)].sort()
  if (existing.join() !== expected.join()) {
    console.error('docs/pages drift (file set) — run npm run docs:pages')
    process.exit(1)
  }
  for (const p of pages) {
    const path = join(outDir, `${p.slug}.md`)
    if (readFileSync(path, 'utf8') !== renderPage(p)) {
      console.error(`docs/pages/${p.slug}.md drift — run npm run docs:pages`)
      process.exit(1)
    }
  }
  const idx = join(outDir, 'index.md')
  if (readFileSync(idx, 'utf8') !== indexLines.join('\n') + `Receipt: \`${receipt}\`\n`) {
    console.error('docs/pages/index.md drift — run npm run docs:pages')
    process.exit(1)
  }
  console.log('docs:pages:check ok', receipt)
  process.exit(0)
}

mkdirSync(outDir, { recursive: true })
for (const p of pages) {
  writeFileSync(join(outDir, `${p.slug}.md`), renderPage(p))
}
writeFileSync(join(outDir, 'index.md'), indexLines.join('\n') + `Receipt: \`${receipt}\`\n`)
console.log('wrote docs/pages', pages.length, receipt)
