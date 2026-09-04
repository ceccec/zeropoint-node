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
  out.push({ repo: REPO, path, claim: text, claimId: claimId(text), extractedKind: kind, ...extra })
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
