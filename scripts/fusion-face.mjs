/**
 * This repository's knowledge face, content-addressed so repos can merge.
 *
 * Two findings from the cross-repo audit are answered here.
 *
 * millennium-solutions-57 addressed my emitted claims and found 142 claims,
 * 141 distinct — the repeat being a markdown H2 appearing in two documents.
 * The extractor treated a HEADING as a claim. 0.7% of the ledger, and the count
 * was barely affected; what it revealed is that nobody could tell which
 * fraction of "141 claims" was section titles. So every line now carries its
 * KIND, and the summary reports the shape rather than only the total. Their own
 * rule, taken from mine: publish what was extracted, not just how much.
 *
 * ceccec-github-io-5b: key publications by a CONTENT ADDRESS, not by name, not
 * by file, not by repo. Names are local. If two repositories state the same
 * fact that should be one publication with both listed, not two identifiers
 * neither aware of the other — and the same address catches one repository
 * stating a thing twice under different names, which no name-keyed scan sees.
 *
 *   npm run fusion:face
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = join(import.meta.dirname, '..')
const J = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'))
const pkg = J('package.json'), art = J('src/verification/prior-art.json'), led = J('lean/ledger.json')
const v = await import(pathToFileURL(join(ROOT, 'src/verification/index.ts')).href)
const REPO = 'zeropoint-node'

const normalise = (t) => String(t).replace(/\s+/g, ' ').trim().toLowerCase().replace(/==/g, '=').replace(/!=/g, '≠')
const claimId = (t) => 'claim:' + createHash('sha256').update(normalise(t)).digest('hex').slice(0, 24)

/**
 * The same statement under millennium-solutions' address, so the two sets are
 * directly comparable: sha256 of the normalised string, first 16 octets, with
 * RFC 9562 section 5.8 nibbles written into bytes 6 and 8.
 *
 * EVERY FIELD BELOW COMES OUT OF THIS FUNCTION IN ONE PASS. A test vector we
 * exchanged failed twice in a row because the VALUE was computed and the
 * STRING beside it was typed into a message — first a reconstruction of a
 * truncated console line, then a retranscription of the corrected one. A pair
 * with one half computed and one half typed is not half-verified; the typed
 * half is what says which object the computed half addresses.
 *
 * So each line carries the byte length and the full pre-truncation digest of
 * exactly the bytes that were hashed. A peer who cannot reproduce an address
 * compares one number and knows immediately whether we are hashing the same
 * string or hashing it differently — which is the question that cost two
 * rounds to ask.
 */
const uuidOf = (normalised) => {
  const b = createHash('sha256').update(normalised, 'utf8').digest().subarray(0, 16)
  b[6] = (b[6] & 0x0f) | 0x80
  b[8] = (b[8] & 0x3f) | 0x80
  const h = b.toString('hex')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
}

/**
 * The cross-repo normaliser, GIVEN AS CODE because prose could not carry it.
 *
 * millennium-solutions first described this as "drop a space only where it does
 * no lexical work", which is an intent and not a rule; implementing the half
 * that was concrete produced a different address on every statement with a
 * punctuation-adjacent space. The byte count found it — 163 raw against 162
 * normalised, one space after a semicolon — and their published pin now
 * reproduces here exactly, verified before this was adopted rather than after.
 *
 * A space survives only between two word characters, because in Lean that space
 * is the application operator. The `u` flag and \p{L} are load-bearing: an ASCII
 * class corrupts Greek identifiers, which erpax measured at 211 of 832
 * statements in a peer corpus.
 *
 * IT DOES NOT LOWERCASE, and this repository's own normaliser does. That is a
 * real divergence and not an oversight to paper over: `Nat` and `nat` are
 * different identifiers in a Lean corpus, so folding case merges statements
 * that are not the same statement. Both addresses are emitted for every line —
 * the local one under the local rule, the cross-repo one under theirs — so the
 * difference between the two collision counts measures what the clause buys
 * instead of either of us adopting the other's rule untested.
 */
const normaliseCrossRepo = (t) => String(t)
  .replace(/\s+/gu, ' ')
  .replace(/\s(?![\p{L}\p{N}_])|(?<![\p{L}\p{N}_.])\s/gu, '')
  .replace(/==/g, '=')
  .replace(/!=/g, '≠')

/**
 * The cross-repo rule checks itself against a peer's published pin on every
 * run, so "compatible with millennium-solutions" is recomputed rather than
 * remembered. If they change their normaliser, or this one drifts, the build
 * says so instead of quietly emitting addresses nobody else can join on.
 *
 * The fixture is the pair they published AFTER the byte count located the
 * disagreement — one space after a semicolon, 163 raw against 162 normalised.
 */
const CROSS_REPO_FIXTURES = [
  {
    // Theirs. Locates the punctuation-adjacent space clause.
    from: "millennium-solutions' published pin",
    statement: "an API operation carries at least the access its collection's strictest standard demands;"
      + ' an endpoint below its legal floor is a gap named before it can be called.',
    uuid: '9b7cc563-1d97-8dc2-b439-32322d3b9987',
    normalisedBytes: 162,
  },
  {
    // Ours, and it exists because THEIR PIN CANNOT SEE THE BUG THEY WARN ABOUT.
    // Swapping \p{L} for an ASCII class reproduces their fixture exactly — 162
    // bytes, same UUID — while corrupting every Greek identifier, which is the
    // failure they measured at 211 of 832 statements in a peer corpus. A
    // fixture that passes under the defect it is meant to catch is not a
    // fixture. This one separates them: the ASCII class eats the application
    // spaces in "for all α β" and yields "for allαβ".
    from: 'this repository, for the Greek case their pin does not cover',
    statement: 'for all α β : Real, α + β = β + α',
    uuid: '9540a8cf-1b28-8068-8fc1-dc95e68f4518',
    normalisedBytes: 30,
  },
]

const addressesOf = (t) => {
  const local = normalise(t)
  const cross = normaliseCrossRepo(t)
  return {
    claimId: claimId(t),
    statementUuidLocal: uuidOf(local),
    statementUuidCrossRepo: uuidOf(cross),
    // Carried so a peer who cannot reproduce an address compares ONE NUMBER and
    // learns whether we hashed different bytes or hashed the same bytes
    // differently. That question cost this exchange three rounds.
    localBytes: Buffer.byteLength(local, 'utf8'),
    crossRepoBytes: Buffer.byteLength(cross, 'utf8'),
    crossRepoSha256: createHash('sha256').update(cross, 'utf8').digest('hex'),
  }
}

/** A heading is not a claim. Nor is a bare fragment with no verb-like content. */
function kindOf(text) {
  const t = String(text).trim()
  if (/^#{1,6}\s/.test(t) || /^\*\*.*\*\*$/.test(t.replace(/^#+\s*/, ''))) return 'heading'
  if (/[∀∃=≠∧∨→↔<>]|\bis\b|\bmust\b|\bhas\b|\bare\b/.test(t)) return 'proposition'
  return 'prose'
}

const out = []
const add = (path, claim, extra = {}) => {
  const text = String(claim).replace(/\s+/g, ' ').trim()
  if (text.length <= 15) return
  const kind = extra.kind === 'lean-theorem' || extra.kind === 'seal' || extra.kind === 'axiom'
    ? 'proposition' : kindOf(text)
  out.push({ repo: REPO, path, claim: text, ...addressesOf(text), extractedKind: kind, ...extra })
}

for (const [n, s] of Object.entries(v.SEALS)) add('src/verification/lean-bridge.ts', s.basis, { kind: 'seal', id: n, enforcedBy: 'npm run test:verification' })
for (const [n, a] of Object.entries(v.ASSUMPTIONS)) add('src/verification/lean-bridge.ts', a.statement, { kind: 'axiom', id: n })
const cache = {}
for (const e of led.entries) {
  const src = cache[e.file] ??= readFileSync(join(ROOT, 'lean', e.file), 'utf8')
  const m = new RegExp(`^theorem\\s+${e.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*([\\s\\S]*?):=`, 'm').exec(src)
  if (m) add(`lean/${e.file}`, m[1].replace(/^\s*:/, ''), { kind: 'lean-theorem', id: e.name, status: e.status, axioms: e.axioms ?? null })
}
for (const [id, c] of Object.entries(art.contributions)) add((c.files ?? ['src/verification/prior-art.json'])[0], c.what, { kind: 'contribution', id, priorArt: c.priorArt?.status })
const cl = J('src/verification/claims.json').claims
for (const [key, c] of Object.entries(cl)) {
  const i = key.indexOf('::')
  add(key.slice(0, i), key.slice(i + 2), { kind: 'prose-claim', line: c.line, backedBy: c.backedBy, excerpt: true })
}

const dir = join(process.env.HOME ?? '/tmp', '.erpax/fusion')
mkdirSync(dir, { recursive: true })
writeFileSync(join(dir, `${REPO}.jsonl`), out.map((o) => JSON.stringify(o)).join('\n') + '\n')

const byKind = {}
for (const o of out) byKind[o.extractedKind] = (byKind[o.extractedKind] ?? 0) + 1
const ids = out.map((o) => o.claimId)
const dupes = [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))]
console.log(`fusion:face — ${out.length} line(s), ${new Set(ids).size} distinct claim ids`)
console.log(`              by kind: ${Object.entries(byKind).map(([k, n]) => `${n} ${k}`).join(', ')}`)
if (dupes.length) {
  console.log(`              ${dupes.length} statement(s) appear more than once IN THIS REPO:`)
  for (const d of dupes.slice(0, 5)) {
    const which = out.filter((o) => o.claimId === d)
    console.log(`                ${which[0].extractedKind}: ${which.map((w) => w.path).join(' + ')}`)
  }
}
console.log(`              written to ${join(dir, `${REPO}.jsonl`)} — content-addressed, so a merge joins on claimId`)

// Recomputed, never remembered: does this repo's cross-repo rule still agree
// with the peer whose addresses it claims to be comparable with?
// A FIXTURE MUST ASSERT ITS OWN DISCRIMINATING POWER.
//
// millennium-solutions' rule, and it closes the hole their published pin had:
// that pin reproduces EXACTLY under an ASCII character class, so a fixture
// consisting only of it would pass while blind to the very corruption the \p{L}
// clause exists to prevent — 211 of 832 statements in a peer corpus. Asserting
// that at least one case CHANGES under the defect means trimming the set to
// Latin-only cannot leave a green gate that checks nothing.
{
  const asciiClass = (t) => String(t)
    .replace(/\s+/g, ' ')
    .replace(/\s(?![A-Za-z0-9_])|(?<![A-Za-z0-9_.])\s/g, '')
    .replace(/==/g, '=').replace(/!=/g, '≠')
  const discriminating = CROSS_REPO_FIXTURES.filter(
    (fx) => asciiClass(fx.statement) !== normaliseCrossRepo(fx.statement))
  console.log(`              ${discriminating.length} of ${CROSS_REPO_FIXTURES.length} fixture(s) separate \\p{L} from an ASCII class`)
  if (discriminating.length === 0) {
    console.error('              FIXTURE IS BLIND — every case survives the ASCII substitution it')
    console.error('              exists to catch, so it would pass with the defect present')
    process.exitCode = 1
  }
}

for (const fx of CROSS_REPO_FIXTURES) {
  const n = normaliseCrossRepo(fx.statement)
  const got = uuidOf(n)
  const bytes = Buffer.byteLength(n, 'utf8')
  const ok = got === fx.uuid && bytes === fx.normalisedBytes
  console.log(`              cross-repo rule ${ok ? 'AGREES' : 'DISAGREES'} with ${fx.from} (${bytes} bytes)`)
  if (!ok) {
    console.error(`              expected ${fx.uuid} at ${fx.normalisedBytes} bytes, got ${got} at ${bytes}`)
    console.error('              statementUuidCrossRepo is NOT joinable until this agrees')
    process.exitCode = 1
  }
}
