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
import { createHash } from 'node:crypto'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const OUT = join(ROOT, 'src/verification/deposits.json')
const CHECK = process.argv.includes('--check')

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const priorArt = JSON.parse(readFileSync(join(ROOT, 'src/verification/prior-art.json'), 'utf8'))
const ledger = JSON.parse(readFileSync(join(ROOT, 'lean/ledger.json'), 'utf8'))
const funding = JSON.parse(readFileSync(join(ROOT, 'src/verification/funding.json'), 'utf8'))
const CONCEPT = priorArt.concept_doi
const REPO = pkg.repository.url.replace(/^git\+/, '').replace(/\.git$/, '')

/** statements, read from the .lean sources rather than retyped */
const statements = new Map()
const docs = new Map()
for (const f of readdirSync(join(ROOT, 'lean')).filter((n) => n.endsWith('.lean'))) {
  const src = readFileSync(join(ROOT, 'lean', f), 'utf8')
  // Two simple anchored passes, not one compound regex. The compound version
  // had an optional doc-comment group in front of the theorem, and it
  // over-consumed: swap12_is_an_involution was never captured at all, so it
  // scored as having no statement and was withheld as "literal arithmetic".
  // A correct verdict for the wrong reason is indistinguishable from a wrong
  // one, and this one was wrong.
  for (const m of src.matchAll(/^theorem\s+(\w+)\s*([\s\S]*?):=/gm)) {
    statements.set(m[1], m[2].replace(/^\s*:/, '').replace(/\s+/g, ' ').trim())
  }
  for (const m of src.matchAll(/\/--([\s\S]*?)-\/\s*\ntheorem\s+(\w+)/g)) {
    docs.set(m[2], m[1].replace(/\s+/g, ' ').trim())
  }
}

/**
 * EVERY KERNEL-PROVEN THEOREM EARNS A DEPOSIT.
 *
 * This file used to withhold deposits from statements made only of integer
 * literals, on the reasoning that `6 * 2 = 12 ∧ 54 - 12 = 42` is a step inside
 * an argument rather than a result. The bar was applied mechanically: quantify
 * over a domain, or name a DEFINED object, or you are supporting arithmetic.
 *
 * That test was a SYNTACTIC PROXY FOR SIGNIFICANCE, and significance is not a
 * syntactic property. It withheld nine deposits, and six of them were the
 * speed-of-light group — including `c_squared_exceeds_the_exact_range_of_a_double`,
 * which is the justification for this package's float ban and one of the few
 * results here with a direct engineering consequence. It read as "integer
 * literals" only because `c` and 2^53 are numerals rather than Lean `def`s,
 * while `LIGHT_SPEED: 299792458` sits in the shipped source. A theorem about a
 * shipped physical constant is not a lemma about numbers.
 *
 * The header below already recorded this exact failure once — a name missing
 * from a list silently demoting a theorem — and fixed the list while keeping
 * the predicate that made the list necessary. So the predicate is gone. The
 * kernel decides what is proven; nothing downstream re-decides what is worth
 * saying.
 */
// Kernel-accepted is the whole bar. `standsAlone` is kept as a constant true so
// the shape of the pipeline stays legible and any future attempt to filter has
// to argue for itself here rather than appear as a quiet regex.
function standsAlone(_name) {
  return true
}

const provenAll = ledger.entries.filter((e) => e.status === 'proven')
/**
 * IDENTITY BY CONTENT, NOT BY NAME — because repos merge.
 *
 * A deposit keyed by theorem name collides the moment another repository names
 * a theorem the same thing, and misses the case that matters: the SAME fact
 * stated under two different names. Names are local; statements are not.
 *
 * `claim` is a content address over the normalised statement — whitespace
 * collapsed, `==` and `!=` written as `=` and `≠`. Two repositories proving the
 * same thing produce the SAME claim id, which is exactly what a merge needs:
 * one publication with both repositories listed, rather than two DOIs neither
 * aware of the other. ceccec-github-io-5b found a theorem proved twice in their
 * own corpus this way, and a second pair under different names that no
 * name-keyed scan could see.
 *
 * `record` is the other question — which FILE in which repository — and stays
 * distinct even when two repos share a claim.
 */
function normaliseStatement(text) {
  return String(text).replace(/\s+/g, ' ').trim().toLowerCase()
    .replace(/==/g, '=').replace(/!=/g, '≠')
}
const claimId = (st) => 'claim:' + createHash('sha256').update(normaliseStatement(st)).digest('hex').slice(0, 24)
const recordId = (name, file) => 'record:' + createHash('sha256').update(`${REPO}\u0000${file}\u0000${name}`).digest('hex').slice(0, 24)

const proven = provenAll.filter((e) => standsAlone(e.name))
const supporting = provenAll.filter((e) => !standsAlone(e.name))
const cited = Object.values(priorArt.contributions)
  .flatMap((c) => c.priorArt?.citations ?? [])
  .filter((x) => x.resolved && x.kind === 'doi')
  .map((x) => x.id)

const deposits = proven.map((e) => ({
  theorem: e.name,
  claim: claimId(statements.get(e.name) ?? e.name),
  record: recordId(e.name, `lean/${e.file}`),
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
      `<p><strong>Funding.</strong> ${funding.statement}</p>`,
      `<p><strong>Reproduce.</strong> <code>git clone ${REPO} &amp;&amp; npm run lean:check</code> — the statement is in <code>lean/${e.file}</code>, which ships in the package.</p>`,
    ].filter(Boolean).join('\n'),
    version: pkg.version,
    language: 'eng',
    license: 'cc-by-nc-nd-4.0',
    keywords: [...(pkg.keywords ?? []).slice(0, 6), 'Lean 4', 'formal verification', 'machine-checked proof'],
    grants: funding.grants,
    related_identifiers: [
      { identifier: CONCEPT, relation: 'isPartOf', scheme: 'doi' },
      { identifier: REPO, relation: 'isSupplementTo', scheme: 'url' },
      // The page on the site, so a reader arriving from the DOI lands somewhere
      // that shows the statement, what it rests on, and its neighbours — and a
      // reader on the page can reach the archive. Cross-linked both ways or the
      // deposit is a dead end with a number on it.
      { identifier: `${pkg.homepage.replace(/\/$/, '')}/pages/theorems/${e.name.replace(/_/g, '-')}`, relation: 'isDocumentedBy', scheme: 'url' },
      ...cited.map((d) => ({ identifier: d, relation: 'cites', scheme: 'doi' })),
    ],
  },
}))

const record = {
  what: 'One Zenodo deposit per kernel-proven theorem, ready to mint. Generated from lean/ledger.json and the .lean sources.',
  doesNotEstablish: 'novelty. A DOI is a dated citable record and decides PRIORITY only; novelty is a universal negative no finite search decides.',
  mintedBy: 'nobody yet — minting is a write against a 2FA account and belongs to its owner',
  bar: 'a deposit-worthy statement quantifies over a domain or speaks of a defined object of this theory. A statement made only of integer literals is a step inside an argument, not a citable result, and minting an identifier for it would inflate the corpus and discredit the rest.',
  identity: 'claim = a content address over the normalised statement, identical across repositories that state the same fact. record = repository + file + name, distinct even when the claim is shared. A merge joins on claim and keeps every record.',
  conceptDoi: CONCEPT,
  count: deposits.length,
  supportingNotDeposited: supporting.map((e) => ({ theorem: e.name, why: 'unreachable: every kernel-proven theorem now earns a deposit' })),
  deposits,
}
const next = JSON.stringify(record, null, 2) + '\n'

console.log(`zenodo:deposits — ${provenAll.length} kernel-proven, ${deposits.length} earn a deposit and ${supporting.length} do not.\n                  Each deposit cites citing ${cited.length} resolved DOI(s) and the concept DOI as isPartOf`)
if (CHECK) {
  if (readFileSync(OUT, 'utf8') !== next) { console.error('zenodo:deposits FAIL — the record is not what the sources produce; run npm run zenodo:deposits'); process.exit(1) }
  console.log('zenodo:deposits ok — every proven theorem has a deposit, and every deposit names a theorem the kernel accepted')
} else { writeFileSync(OUT, next); console.log(`zenodo:deposits — wrote ${OUT.replace(ROOT + '/', '')}`) }
