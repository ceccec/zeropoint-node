/**
 * A page per proven theorem, cross-linked in every direction that exists.
 *
 * The corpus has been readable three ways and joined in none: a paper listing
 * every statement, a scene laying them on the torus with 284 edges from shared
 * subjects, and deposit records ready to mint. Nothing linked a theorem to its
 * neighbours, its deposit, or the archive.
 *
 * Each page carries the statement as written, what the kernel accepted, what
 * the proof rests on, the file and line, the theorems that speak of the same
 * defined objects, and the archive it belongs to. The deposits gain a relation
 * back, so a reader arriving from a DOI lands on the page and a reader on the
 * page can reach the DOI.
 *
 * Generated. A hand-written page per theorem would drift from the ledger by the
 * next release, and there are 59 of them.
 *
 *   npm run theorem:pages
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const OUT = join(ROOT, 'docs/pages/theorems')
const J = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'))
const pkg = J('package.json'), art = J('src/verification/prior-art.json')
const led = J('lean/ledger.json'), scene = J('src/verification/theorem-scene.json')
const DOI = art.concept_doi
const REPO = pkg.repository.url.replace(/^git\+/, '').replace(/\.git$/, '')

const statement = {}, lineOf = {}
for (const f of readdirSync(join(ROOT, 'lean')).filter((n) => n.endsWith('.lean'))) {
  const src = readFileSync(join(ROOT, 'lean', f), 'utf8')
  const lines = src.split('\n')
  for (const [i, l] of lines.entries()) {
    const m = /^theorem\s+([A-Za-z0-9_']+)/.exec(l)
    if (m) lineOf[m[1]] = i + 1
  }
  for (const m of src.matchAll(/^theorem\s+([A-Za-z0-9_']+)\s*([\s\S]*?):=/gm)) {
    statement[m[1]] = m[2].replace(/^\s*:/, '').replace(/\s+/g, ' ').trim()
  }
}

const proven = led.entries.filter((e) => e.status === 'proven')
const neighbours = new Map()
for (const e of scene.edges) {
  if (!neighbours.has(e.from)) neighbours.set(e.from, new Set())
  if (!neighbours.has(e.to)) neighbours.set(e.to, new Set())
  neighbours.get(e.from).add(e.to)
  neighbours.get(e.to).add(e.from)
}
const slug = (n) => n.replace(/_/g, '-')
const human = (n) => n.replace(/_/g, ' ')

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })

for (const e of proven) {
  const near = [...(neighbours.get(e.name) ?? [])].filter((n) => proven.some((p) => p.name === n)).sort().slice(0, 8)
  const axioms = (e.axioms ?? []).length ? e.axioms.map((a) => `\`${a}\``).join(', ') : '**no axioms at all**'
  writeFileSync(join(OUT, `${slug(e.name)}.md`), `# ${human(e.name)}

\`\`\`lean
theorem ${e.name} :
  ${statement[e.name] ?? '(statement not found)'}
\`\`\`

**Accepted by the Lean 4 kernel.** The proof rests on ${axioms}.

Proven means three things together: the kernel accepted the file, the proof
contains no \`sorry\`, and \`#print axioms\` reports a dependency set within
\`{propext, Quot.sound}\`. The dependency set above is the evidence, recorded per
theorem rather than summarised.

| | |
| --- | --- |
| source | [\`lean/${e.file}:${lineOf[e.name] ?? '?'}\`](${REPO}/blob/main/lean/${e.file}#L${lineOf[e.name] ?? 1}) |
| archive | [doi:${DOI}](https://doi.org/${DOI}) — the concept DOI, resolving to the newest release |
| corpus | [every statement](/paper.html) · [the ledger](${REPO}/blob/main/lean/ledger.json) |
| reproduce | \`git clone ${REPO} && npm run lean:check\` |

${near.length ? `## Speaks of the same objects as\n\n${near.map((n) => `- [${human(n)}](/pages/theorems/${slug(n)})`).join('\n')}\n` : ''}
::: info What this does not establish
A theorem is a statement the kernel accepted. It says nothing about whether the
surrounding package is useful, whether the idea is novel, or whether anything
physical follows. Novelty is a universal negative no finite search decides; a
dated deposit establishes priority, which is the defensible claim.
:::
`)
}

const byFile = {}
for (const e of proven) (byFile[e.file] ??= []).push(e.name)
writeFileSync(join(OUT, 'index.md'), `# Theorems

${proven.length} statements accepted by the Lean 4 kernel, of ${led.theorems} in the corpus.
${led.entries.filter((e) => Array.isArray(e.axioms) && e.axioms.length === 0).length} rest on no axioms at all.
The other ${led.theorems - proven.length} are written down and not proved, and say so — see
[the ledger](${REPO}/blob/main/lean/ledger.json).

Every page below carries its statement as written, what the proof rests on, its
source line, and the theorems that speak of the same defined objects.

${Object.entries(byFile).map(([f, names]) => `## ${f}\n\n${names.sort().map((n) => `- [${human(n)}](/pages/theorems/${slug(n)})`).join('\n')}`).join('\n\n')}

---

Cite the concept DOI [${DOI}](https://doi.org/${DOI}); it resolves to the newest
release, where a per-version DOI goes stale.
`)

console.log(`theorem:pages — ${proven.length} theorem page(s) + an index, cross-linked by shared defined objects`)
console.log(`                each links its source line, the archive, the paper and its neighbours`)
