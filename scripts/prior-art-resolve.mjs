/**
 * prior-art:resolve — re-resolve every DOI in the ledger and compare what came
 * back with what is written down.
 *
 * `priorart:check` runs offline. It can require that a citation marked
 * `resolved` carries a title, a date, and a route — but it cannot tell a title
 * that was returned by a registry from one that was typed from memory. Those
 * look identical on disk. So the flag is, on its own, self-certification: the
 * author asserting the author checked.
 *
 * This closes that. It asks Crossref for each DOI and fails on any difference
 * between the returned title and the recorded one — including a recorded title
 * that is merely a PREFIX of the real one, because a shortened title is a
 * transcription, and a transcription is the thing being ruled out.
 *
 * It needs the network, so it is not in `check`. It is the step a reader who
 * does not trust this repository runs to check it without asking permission.
 *
 * Exit 0 = every recorded resolution is what the registry returns today.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const LEDGER = join(ROOT, 'src/verification/prior-art.json')
const led = JSON.parse(readFileSync(LEDGER, 'utf8'))

const norm = (s) => String(s).replace(/\s+/g, ' ').trim().toLowerCase()

const targets = []
for (const [id, c] of Object.entries(led.contributions)) {
  for (const [i, cite] of (c.priorArt?.citations ?? []).entries()) {
    if (cite.kind === 'doi' && cite.id) targets.push({ id, i, cite })
  }
}

const problems = []
let agreed = 0
for (const { id, i, cite } of targets) {
  // A rate limit or a dropped connection is INCONCLUSIVE — it is neither a
  // match nor a mismatch, and reporting it as a mismatch would train a reader
  // to ignore this tool's failures. Back off and retry; only then give up, and
  // say which kind of failure it was.
  let returned = null, inconclusive = null
  for (let attempt = 0; attempt < 4; attempt++) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt))
    try {
      const res = await fetch(`https://api.crossref.org/works/${cite.id}`, {
        headers: { 'User-Agent': `zeropoint-node/${led.version ?? ''} (prior-art resolver)` },
        signal: AbortSignal.timeout(30_000),
      })
      if (res.ok) { returned = (await res.json())?.message?.title?.[0] ?? null; inconclusive = null; break }
      if (res.status === 429 || res.status >= 500) { inconclusive = `the registry answers ${res.status}`; continue }
      inconclusive = null
      if (cite.resolved === true) problems.push(`${id} citation ${i}: DOI ${cite.id} is recorded as resolved and the registry answers ${res.status}`)
      break
    } catch (e) {
      inconclusive = `could not be reached (${e.name})`
    }
  }
  if (inconclusive) {
    problems.push(`${id} citation ${i}: DOI ${cite.id} — ${inconclusive}. INCONCLUSIVE: this run neither confirms nor refutes the recorded title`)
    continue
  }
  if (returned === null && cite.resolved === true && !problems.some((p) => p.startsWith(`${id} citation ${i}:`))) {
    problems.push(`${id} citation ${i}: recorded as resolved, registry returned no title`)
    continue
  }
  if (returned === null) continue

  if (cite.resolved !== true) {
    if (returned) problems.push(`${id} citation ${i}: DOI ${cite.id} is NOT marked resolved yet the registry returns "${returned}" — the ledger understates what is known`)
    continue
  }

  const got = norm(returned), want = norm(cite.resolvedTitle ?? '')
  if (got === want) { agreed++; continue }
  if (got.startsWith(want) && want.length > 0) {
    problems.push(`${id} citation ${i}: recorded title is a PREFIX of the real one — a shortened title is a transcription\n    recorded: ${cite.resolvedTitle}\n    returned: ${returned}`)
  } else {
    problems.push(`${id} citation ${i}: recorded title differs from what the registry returns\n    recorded: ${cite.resolvedTitle}\n    returned: ${returned}`)
  }
}

console.log(`priorart:resolve — ${targets.length} DOI(s) in the ledger; ${agreed} returned exactly the recorded title`)
if (problems.length) {
  console.error(`priorart:resolve FAIL — ${problems.length} citation(s) do not match the registry:`)
  for (const p of problems) console.error(`  ${p}`)
  process.exit(1)
}
console.log('priorart:resolve ok — every DOI marked resolved returns, today, the title written beside it')
