/**
 * A deposit record per kernel-proven theorem, ready to mint.
 *
 * The repository already has a concept DOI. This builds the metadata for a
 * SEPARATE deposit per theorem, so each carries its own dated citable
 * identifier and points back at the whole.
 *
 * WHAT A DEPOSIT DECIDES, AND WHAT IT DOES NOT. A DOI is a dated, citable
 * record. It establishes PRIORITY: it defeats a later claim of invention
 * without anyone proving a universal negative. It does not establish NOVELTY,
 * which asserts that nobody anywhere published first and which no finite search
 * decides. Every description below says so in its own text, because a deposit
 * whose metadata implies more than a deposit can do is the overclaim these
 * gates exist to refuse. The axiom is no_prior_art_is_undecidable.
 *
 * Only theorems the kernel ACCEPTED get a record. A statement closed with sorry
 * has nothing to deposit but an intention.
 *
 * This does not mint. Minting is a write against an account with 2FA, and the
 * token belongs to the person who owns it.
 *
 *   npm run zenodo:deposits        write src/verification/deposits.json
 *   npm run zenodo:deposits:check  fail if it is not what the sources produce
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const OUT = join(ROOT, 'src/verification/deposits.json')
const CHECK = process.argv.includes('--check')

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const priorArt = JSON.parse(readFileSync(join(ROOT, 'src/verification/prior-art.json'), 'utf8'))
const ledger = JSON.parse(readFileSync(join(ROOT, 'lean/ledger.json'), 'utf8'))
const CONCEPT = priorArt.concept_doi
const REPO = pkg.repository.url.replace(/^git\+/, '').replace(/\.git$/, '')

/** statements, read from the .lean sources rather than retyped */
const statements = new Map()
const docs = new Map()
for (const f of readdirSync(join(ROOT, 'lean')).filter((n) => n.endsWith('.lean'))) {
  const src = readFileSync(join(ROOT, 'lean', f), 'utf8')
  for (const m of src.matchAll(/(?:\/-- ([\s\S]*?)-\/\s*)?^theorem\s+(\w+)\s*([\s\S]*?):=/gm)) {
    statements.set(m[2], m[3].replace(/^\s*:/, '').replace(/\s+/g, ' ').trim())
    if (m[1]) docs.set(m[2], m[1].replace(/\s+/g, ' ').trim())
  }
}

const proven = ledger.entries.filter((e) => e.status === 'proven')
const cited = Object.values(priorArt.contributions)
  .flatMap((c) => c.priorArt?.citations ?? [])
  .filter((x) => x.resolved && x.kind === 'doi')
  .map((x) => x.id)

const deposits = proven.map((e) => ({
  theorem: e.name,
  file: `lean/${e.file}`,
  metadata: {
    upload_type: 'publication',
    publication_type: 'workingpaper',
    title: `${e.name.replace(/_/g, ' ')} — a machine-checked theorem in ${pkg.name}`,
    creators: [{ name: pkg.author.name, orcid: (pkg.author.url ?? '').replace('https://orcid.org/', '') }],
    description: [
      `<p><strong>Statement.</strong> <code>${statements.get(e.name) ?? '(not found)'}</code></p>`,
      docs.has(e.name) ? `<p>${docs.get(e.name)}</p>` : '',
      `<p><strong>Standing.</strong> Accepted by the Lean 4 kernel. Axiom dependencies: ${(e.axioms ?? []).length ? e.axioms.join(', ') : 'none'}. `
        + `A proof is counted here only when the kernel accepted the file, the body contains no <code>sorry</code>, and <code>#print axioms</code> reports a dependency set inside {propext, Quot.sound}.</p>`,
      `<p><strong>What this deposit establishes.</strong> Priority: a dated, citable record of this statement and its proof. `
        + `It does <em>not</em> establish novelty. Novelty is a universal negative — that nobody, anywhere, published this first — and no finite search decides it. `
        + `The repository records that as the axiom <code>no_prior_art_is_undecidable</code> and has no status that would let a claim be marked novel.</p>`,
      `<p><strong>Reproduce.</strong> <code>git clone ${REPO} &amp;&amp; npm run lean:check</code> — the statement is in <code>lean/${e.file}</code>, which ships in the package.</p>`,
    ].filter(Boolean).join('\n'),
    version: pkg.version,
    language: 'eng',
    license: 'cc-by-nc-nd-4.0',
    keywords: [...(pkg.keywords ?? []).slice(0, 6), 'Lean 4', 'formal verification', 'machine-checked proof'],
    related_identifiers: [
      { identifier: CONCEPT, relation: 'isPartOf', scheme: 'doi' },
      { identifier: REPO, relation: 'isSupplementTo', scheme: 'url' },
      ...cited.map((d) => ({ identifier: d, relation: 'cites', scheme: 'doi' })),
    ],
  },
}))

const record = {
  what: 'One Zenodo deposit per kernel-proven theorem, ready to mint. Generated from lean/ledger.json and the .lean sources.',
  doesNotEstablish: 'novelty. A DOI is a dated citable record and decides PRIORITY only; novelty is a universal negative no finite search decides.',
  mintedBy: 'nobody yet — minting is a write against a 2FA account and belongs to its owner',
  conceptDoi: CONCEPT,
  count: deposits.length,
  deposits,
}
const next = JSON.stringify(record, null, 2) + '\n'

console.log(`zenodo:deposits — ${deposits.length} kernel-proven theorem(s), each with a deposit record citing ${cited.length} resolved DOI(s) and the concept DOI as isPartOf`)
if (CHECK) {
  if (readFileSync(OUT, 'utf8') !== next) { console.error('zenodo:deposits FAIL — the record is not what the sources produce; run npm run zenodo:deposits'); process.exit(1) }
  console.log('zenodo:deposits ok — every proven theorem has a deposit, and every deposit names a theorem the kernel accepted')
} else { writeFileSync(OUT, next); console.log(`zenodo:deposits — wrote ${OUT.replace(ROOT + '/', '')}`) }
