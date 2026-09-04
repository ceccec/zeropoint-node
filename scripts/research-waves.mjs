/**
 * Run the prior-art search across every declared domain, automatically.
 *
 * Each contribution names the DOMAINS where its prior art would live. That was
 * built so a gap becomes a direction; this makes the direction walkable without
 * anyone typing a query. Every domain becomes a Crossref bibliographic search,
 * all of them concurrently, and anything already in the ledger is dropped.
 *
 * IT DOES NOT ADD CITATIONS. Whether a returned paper is actually related is a
 * judgement, and the two waves run by hand today returned mostly noise — a
 * hypervisor TCB paper for "trusted computing base", Wolfram's Boolean axiom
 * for "axiom dependencies". Auto-inserting those would fill the ledger with
 * things nobody read, which is worse than an empty domain honestly recorded.
 * So it writes CANDIDATES, and a human decides.
 *
 * The queries that worked named the MECHANISM — quotient types, extensionality,
 * reflection — rather than the activity. That is in the output as guidance,
 * because a failed phrasing is worth as much as a successful one.
 *
 *   npm run research:waves
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const led = JSON.parse(readFileSync(join(ROOT, 'src/verification/prior-art.json'), 'utf8'))
const known = new Set(Object.values(led.contributions)
  .flatMap((c) => c.priorArt?.citations ?? []).filter((x) => x.id).map((x) => x.id.toLowerCase()))

const jobs = Object.entries(led.contributions)
  .flatMap(([id, c]) => (c.domains ?? []).map((domain) => ({ id, domain })))

async function ask({ id, domain }) {
  const url = `https://api.crossref.org/works?rows=4&select=DOI,title,issued`
    + `&query.bibliographic=${encodeURIComponent(domain)}`
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30_000),
      headers: { 'User-Agent': 'zeropoint-node prior-art wave' } })
    if (res.status === 429 || res.status >= 500) {
      // Back off once, then report rather than hammer.
      await new Promise((r) => setTimeout(r, 3000))
      const again = await fetch(url, { signal: AbortSignal.timeout(30_000), headers: { 'User-Agent': 'zeropoint-node prior-art wave' } })
      if (!again.ok) return { id, domain, error: `registry answered ${again.status} twice — inconclusive, not an absence of prior art` }
      const items2 = (await again.json())?.message?.items ?? []
      return { id, domain, candidates: items2.filter((x) => !known.has(String(x.DOI).toLowerCase()))
        .map((x) => ({ doi: x.DOI, title: (x.title ?? ['?'])[0], year: x.issued?.['date-parts']?.[0]?.[0] ?? null })) }
    }
    if (!res.ok) return { id, domain, error: `registry answered ${res.status}` }
    const items = (await res.json())?.message?.items ?? []
    return {
      id, domain,
      candidates: items
        .filter((x) => !known.has(String(x.DOI).toLowerCase()))
        .map((x) => ({ doi: x.DOI, title: (x.title ?? ['?'])[0], year: x.issued?.['date-parts']?.[0]?.[0] ?? null })),
    }
  } catch (e) { return { id, domain, error: e.name } }
}

// All of them at once. The limit is Crossref's politeness, not ours, so the
// concurrency is capped and a 429 is reported rather than retried into a ban.
// SEQUENTIAL, WITH A PAUSE. The first version ran six at a time and 33 of 36
// domains came back errored — Crossref rate-limited a tool that asked too fast,
// and "no candidates" would have read as "no prior art". A search that outruns
// the registry does not find less, it reports less, which is worse.
const results = []
for (const job of jobs) {
  results.push(await ask(job))
  await new Promise((r) => setTimeout(r, 400))
}

const errored = results.filter((r) => r.error)
const withHits = results.filter((r) => r.candidates?.length)
const empty = results.filter((r) => r.candidates && r.candidates.length === 0)

const out = {
  what: 'Candidate prior art per declared domain, from Crossref. CANDIDATES ONLY: relevance is a judgement and nothing here is a citation until someone reads it.',
  ranOn: new Date().toISOString().slice(0, 10),
  domainsSearched: jobs.length,
  alreadyKnown: known.size,
  guidance: 'Queries naming the MECHANISM (quotient types, extensionality, reflection) returned relevant work; queries naming the ACTIVITY (auditing, trusted base) returned noise. Rephrase a barren domain toward its mechanism before concluding there is nothing.',
  errors: errored.map((r) => ({ contribution: r.id, domain: r.domain, error: r.error })),
  byContribution: Object.fromEntries(
    [...new Set(withHits.map((r) => r.id))].map((id) => [id,
      withHits.filter((r) => r.id === id).map((r) => ({ domain: r.domain, candidates: r.candidates }))]),
  ),
}
writeFileSync(join(ROOT, 'src/verification/research-candidates.json'), JSON.stringify(out, null, 2) + '\n')

console.log(`research:waves — ${jobs.length} declared domain(s) across ${Object.keys(led.contributions).length} contribution(s), searched one at a time so the registry answers`)
console.log(`                 ${withHits.reduce((a, r) => a + r.candidates.length, 0)} candidate(s) not already in the ledger; ${empty.length} domain(s) returned only work already cited; ${errored.length} error(s)`)
console.log('                 candidates are NOT citations: nothing enters the ledger until someone reads it')
