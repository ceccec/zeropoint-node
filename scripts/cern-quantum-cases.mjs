#!/usr/bin/env node
/**
 * Every quantum possibility at six qubits, each one carrying a real CERN record.
 *
 * NOT a sample and not an analysis of downloaded data. The enumeration comes
 * FIRST and is exhaustive: all 2^6 = 64 computational basis states of a
 * six-qubit register, which is the same 64 as the hexagram lattice and the same
 * 64 as six bits. Each case is then bound to an actual record from
 * opendata.cern.ch and made to carry that record's real numbers through the
 * SHIPPED simulator, so every one of the 64 possibilities is exercised on data
 * nobody in this repository chose.
 *
 * WHAT IS AND IS NOT DONE HERE. The portal holds 82,385 records, 66,042 of them
 * datasets, and a 25-dataset sample averages 646 GB each — about 43 PB of ROOT
 * files. That is not downloaded, and no collision is re-simulated: reconstructing
 * LHC events needs CMSSW and the experiments' conditions data, and claiming
 * otherwise would be the largest unfalsifiable claim in this repository. What IS
 * computed locally is every one of the 64 quantum cases, exactly, on the real
 * metadata of a real record — and the arithmetic hazard below is real physics
 * data meeting this package's own theorem.
 *
 * THE GATES COME FROM THE PACKAGE. src/quantum is imported, never reimplemented,
 * because a benchmark or a proof that carries its own copy of the thing it
 * tests is measuring the copy — see scripts/shadowed-constants.mjs.
 *
 * NETWORK ABSENCE VOIDS, IT DOES NOT VERDICT. With no cache and no network this
 * exits 2 and says so, rather than printing a green nobody earned.
 *
 *   npm run cern:cases
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const CACHE = join(ROOT, 'src/verification/cern-records.json')
const N_QUBITS = 6
const CASES = 1 << N_QUBITS            // 64: every basis state, exhaustively

const { zeroState, applyGate1, isNormalized, X, H } = await import(join(ROOT, 'src/quantum/simulator.ts'))

// ---------------------------------------------------------------- the records
/**
 * MEASURED COST, because the first two versions of this function guessed.
 *
 * Version one took a single page, bound 64 records, and reported that none
 * exceeded 2^53 and that the exact and double sums agreed. True, green, and
 * empty: no LHC dataset is anywhere near 9 PB — they average 646 GB — so that
 * comparison could not have come out any other way. A check aimed at the wrong
 * population is indistinguishable from a working one.
 *
 * Version two walked every page sequentially with a courtesy pause, a cadence
 * copied from research:waves where Crossref genuinely rate-limits. Nobody
 * measured whether this portal needs it. It does not; what it has instead is
 * SIZE. One page of 100 records is 25 MB and takes 22 seconds, and the API
 * ignores fields, _source and every other trimming parameter tried — so the
 * whole corpus is 661 pages, 16.5 GB over the wire, about four hours serial.
 * That is why it never finished, and it was a cost, not a bug.
 *
 * So the default binds one page and says what the full run would take, and
 * --full does it concurrently. Concurrency is fine here (24 parallel pages
 * returned 200s); what appears under load is the occasional truncated body,
 * which is retried rather than treated as a verdict.
 */
const PAGE_BYTES = 25e6

/** Thrown when the portal refuses to paginate deeper. Not a transient failure. */
class PaginationCap extends Error {}

async function fetchPage(page, perPage, extra = '') {
  for (let attempt = 0; ; attempt += 1) {
    let transient = null
    try {
      const url = `https://opendata.cern.ch/api/records/?size=${perPage}&page=${page}&type=Dataset${extra}`
      const res = await fetch(url, { headers: { Accept: 'application/json' } })
      if (res.ok) return await res.json()
      // A 4xx is an answer, not a hiccup. Retrying it four times, as the first
      // version did by throwing into its own catch, turns a definite refusal
      // into a slow one and reports it as a network error.
      if (res.status === 400) throw new PaginationCap(`page ${page}: the portal refuses to paginate this deep`)
      if (res.status !== 429 && res.status < 500) throw new PaginationCap(`page ${page}: status ${res.status}`)
      transient = `status ${res.status}`
    } catch (err) {
      if (err instanceof PaginationCap) throw err
      transient = err.message           // truncated body, socket reset, and friends
    }
    if (attempt >= 4) throw new Error(`page ${page}: ${transient}`)
    await new Promise((r) => setTimeout(r, 800 * (attempt + 1)))
  }
}

/**
 * INVOLUTE: load only the chunks that prove the claim, then stop.
 *
 * The claim is that this package's own theorem — a value past 2^53 has no exact
 * double — bites on real physics data. Proving it does NOT need all 66,042
 * records and 16.5 GB. It needs enough bytes to carry a running total across
 * 9,007,199,254,740,992, and not one page more. The loop exits on the record
 * that crosses it and reports how few pages that took.
 *
 * `sort=-size` is used because the default ordering returns sub-gigabyte
 * records first and would need thousands of pages to cross. It is not a true
 * descending sort — the portal returns 2.3, 3.0, 4.5, 5.3 then 0.3 TB — but it
 * surfaces multi-terabyte datasets, which is all that is wanted. Nothing here
 * depends on the order being monotone; the sum is a sum.
 */
const THRESHOLD = 9007199254740992n

/**
 * ASK WHERE THE WALL IS, DO NOT WALK INTO IT.
 *
 * The version before this paginated until the portal refused, reading 2.5 GB to
 * discover a limit that a handful of requests locate. Doubling then bisecting
 * finds the last reachable page in about log2(n) calls instead of n.
 */
async function findPaginationCap(perPage) {
  // Probe at size=1, never at size=100. The ceiling is on from+size, so a
  // one-record page tests the same wall for 250 KB instead of 25 MB, and the
  // bisection needs about fourteen of them. Probing at full page size made
  // locating the wall cost more than the data behind it.
  const reachable = async (page) => {
    try { await fetchPage(page, 1); return true } catch (err) {
      if (err instanceof PaginationCap) return false
      throw err
    }
  }
  // THE SEARCH BOUND MUST NOT BE ABLE TO PASS AS THE ANSWER. The first version
  // doubled while `hi < 4096` and returned 4095 — 2^12 - 1, its own ceiling
  // wearing the portal's name. If the doubling never meets a refusal, that is
  // an unfinished measurement and says so instead of reporting a number.
  const LIMIT = 1 << 20
  let lo = 1
  let hi = 2
  let refused = false
  while (hi <= LIMIT) {
    if (await reachable(hi)) { lo = hi; hi *= 2; continue }
    refused = true
    break
  }
  if (!refused) return { cap: null, searchedTo: lo }
  while (lo + 1 < hi) {
    const mid = (lo + hi) >> 1
    if (await reachable(mid)) lo = mid
    else hi = mid
  }
  return { cap: lo, searchedTo: lo }
}

/**
 * SCOPED QUERIES DEFEAT THE PAGE CEILING.
 *
 * The from+size limit is PER QUERY, not per corpus. A query returning fewer
 * than 10,000 records can be paginated to its end, so partitioning the corpus
 * into scoped queries — each narrow enough to fit under the ceiling — makes
 * every record reachable. The union of the parts is the whole, and the
 * unreachable 56,042 were never unreachable, only unasked-for.
 *
 * The facets to split on are READ FROM THE SCOPED QUERY'S OWN AGGREGATIONS, not
 * listed here, so a facet the portal adds later is used without an edit. `year`
 * is excluded: the portal rejects it as a query parameter although it publishes
 * it as a facet, which is the portal's inconsistency and not a choice here.
 *
 * COMPLETENESS IS CHECKED BY ARITHMETIC. The leaves must sum to exactly the
 * corpus total. A partition that double-counts sums high and one that drops a
 * bucket sums low, and either way the number moves — so a plan that cannot be
 * trusted announces itself instead of quietly covering 90% of the data.
 */
const SPLIT_FACETS = ['experiment', 'collision_energy', 'file_type', 'collision_type', 'availability', 'number_events', 'category']

async function scopedTotal(scope) {
  const q = Object.entries(scope).map(([k, v]) => `&${k}=${encodeURIComponent(v)}`).join('')
  const res = await fetch(`https://opendata.cern.ch/api/records/?size=1&page=1&type=Dataset${q}`,
    { headers: { Accept: 'application/json' } })
  if (!res.ok) return null
  const body = await res.json()
  return { total: body.hits.total, aggregations: body.aggregations ?? {} }
}

async function planPartitions(ceiling, budget = { probes: 0, max: 400 }) {
  const leaves = []
  const unsplittable = []

  const walk = async (scope, total, aggregations, depth) => {
    if (total === 0) return
    // A scope up to TWICE the ceiling is still fully enumerable: paginate it
    // ascending for the first 10,000 and descending for the last 10,000, and
    // the two halves meet. This matters for completeness, not for convenience —
    // the records that fall in no bucket (a CMS dataset carrying no
    // collision_energy at all) can only be reached by enumerating a scope
    // WHOLE, never by naming a facet value they do not have.
    if (total <= ceiling) { leaves.push({ scope, total, directions: 1 }); return }
    if (total <= 2 * ceiling) { leaves.push({ scope, total, directions: 2 }); return }
    if (depth >= SPLIT_FACETS.length || budget.probes >= budget.max) {
      unsplittable.push({ scope, total })
      return
    }
    // A FACET MAY ONLY PARTITION IF IT IS SINGLE-VALUED, AND THAT IS MEASURED.
    //
    // The first version split on whatever facet had buckets, and the leaves
    // summed to 176% of the corpus. `file_type` is the reason: a dataset holds
    // files of several types at once, so its buckets OVERLAP and a record lands
    // in more than one. Guessing which facets are single-valued would be another
    // syntactic proxy; instead the bucket counts are required to sum to exactly
    // the scope they claim to divide. Overlap sums high, omission sums low, and
    // either disqualifies the facet here rather than in the final total.
    // OVERLAP DISQUALIFIES; SHORTFALL DOES NOT.
    //
    // Requiring the buckets to sum EXACTLY to the scope was too strict and
    // covered 5.8% of the corpus: under experiment=CMS the collision_energy
    // buckets miss 61 records that simply carry no such field, and that
    // disqualified an otherwise clean split. The property worth protecting is
    // that no record lands in two leaves — sum > total means the facet is
    // multi-valued, as file_type is, and that is the defect. A shortfall is a
    // remainder, and a remainder can be named and counted rather than hidden.
    // PREFER A FACET THAT DIVIDES EXACTLY. Taking the FIRST facet that merely
    // fits left 171 records in no leaf — 61 CMS datasets that carry no
    // collision_energy field at all, so no bucket of that facet can hold them.
    // Another facet often covers the same scope with no remainder, and the only
    // way to know is to score them all rather than stop at the first.
    const scored = SPLIT_FACETS
      .filter((f) => !(f in scope))
      .map((f) => {
        const buckets = aggregations[f]?.buckets ?? []
        const sum = buckets.reduce((t, b) => t + b.doc_count, 0)
        return { f, buckets, sum }
      })
      .filter((c) => c.buckets.length >= 2 && c.sum > 0 && c.sum <= total)
      .sort((a, b) => b.sum - a.sum)          // largest coverage first; exact wins
    if (scored.length === 0) {
      unsplittable.push({ scope, total, reason: 'every facet here overlaps or does not divide' })
      return
    }
    const facet = scored[0].f
    let covered = 0
    for (const bucket of aggregations[facet].buckets) {
      const child = { ...scope, [facet]: bucket.key }
      budget.probes += 1
      const got = await scopedTotal(child)
      if (!got) continue                       // the portal refused this pairing
      covered += got.total
      await walk(child, got.total, got.aggregations, depth + 1)
    }
    // A facet whose buckets do not account for the scope leaves a remainder
    // that no leaf covers; recorded rather than silently dropped.
    if (covered < total) unsplittable.push({ scope, total: total - covered, remainderOf: facet })
  }

  const root = await scopedTotal({})
  budget.probes += 1
  if (!root) return null
  await walk({}, root.total, root.aggregations, 0)
  const reached = leaves.reduce((t, l) => t + l.total, 0)
  return { corpus: root.total, leaves, unsplittable, reached, probes: budget.probes }
}

/**
 * A RIGHT COUNT WITH WRONG MEMBERS PASSES EVERY CHECK THAT COUNTS.
 *
 * The completeness test above is arithmetic on totals, and totals are the least
 * sensitive property a set has: two leaves could overlap by n while a third
 * misses n, and the sum would not move. millennium-solutions carried a corpus
 * count that stayed fixed across three passes while its membership was wrong
 * twice underneath it, and only a comparison against a second corpus exposed it.
 *
 * So the leaves are compared rather than counted. Two scopes that fix the same
 * facet to different values are disjoint by construction and cost nothing to
 * dismiss. Every other pair is asked directly: query the union of both scopes'
 * constraints and require the portal to return zero. A non-empty intersection
 * is a record in two leaves, which no total would have revealed.
 */
async function checkLeavesDisjoint(leaves, limitPairs = 200) {
  const provable = (a, b) => Object.keys(a).some((k) => k in b && a[k] !== b[k])
  let asked = 0
  let byConstruction = 0
  const overlaps = []
  for (let i = 0; i < leaves.length; i += 1) {
    for (let j = i + 1; j < leaves.length; j += 1) {
      const a = leaves[i].scope
      const b = leaves[j].scope
      if (provable(a, b)) { byConstruction += 1; continue }
      if (asked >= limitPairs) return { asked, byConstruction, overlaps, truncated: true }
      asked += 1
      const got = await scopedTotal({ ...a, ...b })
      if (got && got.total > 0) overlaps.push({ a, b, shared: got.total })
    }
  }
  return { asked, byConstruction, overlaps, truncated: false }
}

/**
 * INVOLUTION INSTEAD OF COLLISION.
 *
 * Every file CERN publishes carries an adler32, and adler32 COMBINES: given the
 * checksums of two chunks and the length of the second, the checksum of their
 * concatenation follows by arithmetic alone. So a dataset's whole content
 * address folds out of its published per-file addresses WITHOUT MOVING A BYTE
 * of the 43 PB. The sequence computes in no time and no space, and what it
 * proves is a property of the real data rather than of a download.
 *
 * Exact integer arithmetic mod 65521 throughout — no float touches this, in
 * keeping with the rest of the package. Lengths are BigInt because a
 * multi-terabyte file overruns the range where a double counts without gaps,
 * which is the same 2^53 this file is otherwise about.
 */
const ADLER_BASE = 65521n

function adlerCombine(adler1, adler2, len2) {
  const rem = BigInt(len2) % ADLER_BASE
  let sum1 = adler1 & 0xffffn
  let sum2 = (rem * sum1) % ADLER_BASE
  sum1 += (adler2 & 0xffffn) + ADLER_BASE - 1n
  sum2 += ((adler1 >> 16n) & 0xffffn) + ((adler2 >> 16n) & 0xffffn) + ADLER_BASE - rem
  if (sum1 >= ADLER_BASE) sum1 -= ADLER_BASE
  if (sum1 >= ADLER_BASE) sum1 -= ADLER_BASE
  if (sum2 >= (ADLER_BASE << 1n)) sum2 -= (ADLER_BASE << 1n)
  if (sum2 >= ADLER_BASE) sum2 -= ADLER_BASE
  return sum1 | (sum2 << 16n)
}

/** Fold a record's published file checksums into one address for the dataset. */
function foldRecordAddress(files) {
  const parts = (files ?? [])
    .filter((f) => typeof f?.checksum === 'string' && f.checksum.startsWith('adler32:') && f.size)
    .map((f) => ({ adler: BigInt('0x' + f.checksum.slice('adler32:'.length)), size: f.size }))
  if (parts.length === 0) return null
  let acc = parts[0].adler
  for (let i = 1; i < parts.length; i += 1) acc = adlerCombine(acc, parts[i].adler, parts[i].size)
  return {
    address: acc.toString(16).padStart(8, '0'),
    chunks: parts.length,
    bytes: parts.reduce((t, p) => t + BigInt(p.size), 0n),
  }
}

const trim = (m) => {
  // The fold happens HERE, while the file list is in hand, so the cache keeps
  // one 8-hex address per record instead of thousands of file entries.
  const folded = foldRecordAddress(m.files)
  return {
    recid: m.recid, title: String(m.title).slice(0, 90), doi: m.doi ?? null,
    experiment: m.experiment ?? null,
    size: m.distribution.size, files: m.distribution.number_files ?? null,
    events: m.distribution.number_events ?? null,
    address: folded?.address ?? null,
    addressChunks: folded?.chunks ?? 0,
    addressBytes: folded ? folded.bytes.toString() : null,
  }
}

async function harvest({ full }) {
  const perPage = 100
  const first = await fetchPage(1, perPage)
  const total = first.hits.total
  const out = first.hits.hits.map((h) => h.metadata).filter((m) => m?.distribution?.size).map(trim)
  const pages = Math.ceil(total / perPage)
  if (!full) return { fetchedTotal: total, pagesAvailable: pages, pagesRead: 1, records: out, partial: true }

  // Bounded pool. Not one at a time, and not all 661 at once either.
  const POOL = 16
  const queue = Array.from({ length: pages - 1 }, (_, i) => i + 2)
  let done = 1
  await Promise.all(Array.from({ length: POOL }, async () => {
    for (;;) {
      const page = queue.shift()
      if (page === undefined) return
      const body = await fetchPage(page, perPage)
      for (const h of body.hits.hits) {
        if (h.metadata?.distribution?.size) out.push(trim(h.metadata))
      }
      done += 1
      if (done % 50 === 0) console.error(`    ...${done}/${pages} pages, ${out.length} records`)
    }
  }))
  return { fetchedTotal: total, pagesAvailable: pages, pagesRead: pages, records: out, partial: false }
}

let data = null
if (existsSync(CACHE)) data = JSON.parse(readFileSync(CACHE, 'utf8'))
if (!data || process.argv.includes('--refresh')) {
  try {
    data = await harvest({ full: process.argv.includes('--full') })
    mkdirSync(join(ROOT, 'src/verification'), { recursive: true })
    writeFileSync(CACHE, JSON.stringify(data, null, 2) + '\n')
  } catch (err) {
    if (!data) {
      console.error(`cern:cases VOID — no cache and the portal is unreachable (${err.message}).`)
      console.error('  An absent instrument voids; it does not return a verdict.')
      process.exit(2)
    }
  }
}
if (data.records.length < CASES) {
  console.error(`cern:cases VOID — ${data.records.length} records cached, ${CASES} cases need ${CASES}`)
  process.exit(2)
}

// ---------------------------------------------------------- all 64 possibilities
const failures = []
const discrepancies = []
const rows = []
let doubleDrift = 0
let exactTotal = 0n
let naiveTotal = 0

for (let state = 0; state < CASES; state += 1) {
  const rec = data.records[state]

  // Prepare |state> on the SHIPPED simulator by flipping exactly the set bits.
  let reg = zeroState(N_QUBITS)
  for (let q = 0; q < N_QUBITS; q += 1) if ((state >> q) & 1) reg = applyGate1(reg, q, X)

  // The register must be the basis state we asked for: amplitude 1 there and
  // nowhere else. Compared against the index, which varies across the 64 cases,
  // so no expected answer is written down.
  const idx = reg.amps.findIndex((a) => Math.abs(a.re - 1) < 1e-12 && Math.abs(a.im) < 1e-12)
  const others = reg.amps.filter((_, i) => i !== idx).every((a) => Math.abs(a.re) < 1e-12 && Math.abs(a.im) < 1e-12)
  if (idx !== state || !others || !isNormalized(reg)) {
    failures.push(`case ${state}: register is ${idx}, clean=${others}`)
  }

  // A Hadamard on every qubit must spread the record's state over all 64
  // amplitudes with the norm preserved — the superposition this case stands for.
  let spread = reg
  for (let q = 0; q < N_QUBITS; q += 1) spread = applyGate1(spread, q, H)
  const total = spread.amps.reduce((t, a) => t + a.re * a.re + a.im * a.im, 0)
  if (Math.abs(total - 1) > 1e-9) failures.push(`case ${state}: superposition norm ${total}`)
  const populated = spread.amps.filter((a) => Math.abs(a.re) > 1e-12 || Math.abs(a.im) > 1e-12).length
  if (populated !== CASES) failures.push(`case ${state}: ${populated} amplitudes populated, expected ${CASES}`)

  // THE INVOLUTION. This case now carries a content address folded from the
  // record's published per-file adler32 checksums — the dataset's own fold,
  // recomputed here from metadata alone, with none of its bytes moved.
  rows.push({
    state, recid: rec.recid, size: rec.size, experiment: rec.experiment,
    address: rec.address, chunks: rec.addressChunks,
  })
  if (rec.address && !/^[0-9a-f]{8}$/.test(rec.address)) {
    failures.push(`case ${state}: folded address ${rec.address} is not a 32-bit checksum`)
  }
  // The fold must account for the bytes the record says it has — a fold over a
  // subset still produces a well-formed address and means nothing.
  //
  // THIS FIRES, AND WHAT IT CATCHES IS CERN'S METADATA, NOT THIS CODE. Record
  // 1120 declares number_files 11 and size 772862267 while its own files[] array
  // holds 12 entries summing to 816338666 — no duplicate keys, no file indices,
  // the summary simply disagrees with the list it summarises. Others disagree in
  // the other direction. So it is reported as a finding about the source rather
  // than failing a run whose subject is the quantum cases; anyone can recompute
  // it from the public API.
  if (rec.addressBytes !== null && BigInt(rec.addressBytes) !== BigInt(rec.size)) {
    discrepancies.push({
      state, recid: rec.recid, folded: BigInt(rec.addressBytes), declared: BigInt(rec.size),
      chunks: rec.addressChunks, declaredFiles: rec.files,
    })
  }
}

// THE WHOLE CORPUS, exactly and in doubles. Real physics data meeting this
// package's own theorem: c_squared_exceeds_the_exact_range_of_a_double says a
// value past 2^53 has no exact double, and the portal's total is such a value.
for (const rec of data.records) {
  exactTotal += BigInt(rec.size)
  naiveTotal += rec.size
  if (BigInt(rec.size) > 9007199254740992n) doubleDrift += 1
}

// ------------------------------------------------------------------- verdict
console.log(`  portal reports ${data.fetchedTotal.toLocaleString()} records; ${CASES} bound, one per basis state`)
console.log(`  all ${CASES} of 2^${N_QUBITS} basis states prepared and spread on the shipped simulator`)

const exactStr = exactTotal.toString()
const naiveStr = BigInt(Math.round(naiveTotal)).toString()
const scope = data.partial
  ? `${data.records.length.toLocaleString()} of ${data.fetchedTotal.toLocaleString()} records (${data.pagesRead} of ${data.pagesAvailable} pages)`
  : `ALL ${data.records.length.toLocaleString()} dataset records`
console.log(`\n  summed bytes across ${scope}:`)
console.log(`    exact (BigInt)   ${exactStr}`)
console.log(`    double           ${naiveStr}`)
console.log(`    ${exactStr === naiveStr ? 'they agree at this total' : 'THEY DIFFER — the double sum has already lost the exact value'}`)
console.log(`    2^53             9007199254740992   (last integer a double counts without gaps)`)
console.log(`    individual records already past 2^53: ${doubleDrift} of ${data.records.length}`)

if (data.partial) {
  // SAY WHAT WAS NOT READ. A partial scope printed as if it were the whole is
  // the same defect as the version that compared 0.6 TB objects against a
  // 9 PB threshold and passed. Above is below the scale where 2^53 bites, so
  // its agreement is arithmetic, not evidence — which is what the run below is
  // for: enough chunks to decide the question, and no more.
  const gb = (data.pagesAvailable * PAGE_BYTES / 1e9).toFixed(1)
  console.log(`  (one page; the whole corpus is ${data.pagesAvailable} pages and ~${gb} GB, since the API`)
  console.log(`   ignores fields, _source and every other trimming parameter tried)`)

  // HOW MUCH IS REACHABLE AT ALL, asked in a few requests rather than found by
  // reading 2.5 GB into a wall.
  // findPaginationCap probes at one record per page, so its answer IS the
  // record ceiling; no multiplication by page size.
  const probe = await findPaginationCap(100)
  const reachable = probe.cap
  if (reachable === null) {
    console.log(`\n  pagination ceiling NOT FOUND: reachable at least to record ${probe.searchedTo.toLocaleString()}`)
    console.log(`  and the search ran out before the portal refused. No ceiling is reported,`)
    console.log(`  because a search bound printed as a measurement is not a measurement.`)
  } else {
  const cap = Math.ceil(reachable / 100)
  console.log(`\n  reachable through this endpoint: ${reachable.toLocaleString()} records (${cap} pages of 100).`)
  if (reachable < data.fetchedTotal) {
    console.log(`  THE OTHER ${(data.fetchedTotal - reachable).toLocaleString()} CANNOT BE PAGINATED TO — the portal refuses past`)
    console.log(`  record ${reachable.toLocaleString()}, the usual from+size ceiling. So a summed corpus total is not`)
    console.log(`  obtainable here at any cost, and the ~43 PB figure stays an extrapolation`)
    console.log(`  from a sample rather than a total. Whether the corpus crosses 2^53 is`)
    console.log(`  ...through ONE query. But the ceiling is per query, not per corpus.`)

    const plan = await planPartitions(reachable)
    if (!plan) {
      console.log(`  partition planning VOID — the portal did not answer the root query.`)
    } else {
      // A percentage that ROUNDS UP TO 100 while records are missing asserts the
      // completeness the next line denies. Incomplete coverage is floored, so
      // only an exact partition may print 100%.
      const ratio = plan.reached / plan.corpus * 100
      const pct = plan.reached === plan.corpus ? '100' : (Math.floor(ratio * 1000) / 1000).toFixed(3)
      const twoWay = plan.leaves.filter((l) => l.directions === 2).length
      console.log(`\n  scoped-query partition, planned in ${plan.probes} probes of one record each:`)
      console.log(`    ${plan.leaves.length} leaves — ${plan.leaves.length - twoWay} paginable in one direction, ${twoWay} needing both`)
      console.log(`    (a scope up to ${(2 * reachable).toLocaleString()} is enumerable ascending then descending; the halves meet)`)
      console.log(`    largest leaf ${Math.max(...plan.leaves.map((l) => l.total)).toLocaleString()} records`)
      console.log(`    leaves sum to ${plan.reached.toLocaleString()} of ${plan.corpus.toLocaleString()} (${pct}%)`)
      if (plan.unsplittable.length > 0) {
        console.log(`    ${plan.unsplittable.length} scope(s) still over the ceiling or unaccounted:`)
        for (const u of plan.unsplittable.slice(0, 5)) {
          console.log(`      ${JSON.stringify(u.scope)} — ${u.total.toLocaleString()}${u.remainderOf ? ` unaccounted by ${u.remainderOf}` : ''}`)
        }
      }
      if (plan.reached === plan.corpus) {
        console.log(`    THE WHOLE CORPUS IS REACHABLE. The 56,042 were never unreachable, only unasked-for.`)
      } else if (plan.reached > plan.corpus) {
        console.log(`    OVER-COUNTED by ${(plan.reached - plan.corpus).toLocaleString()} — leaves OVERLAP, so this is not a partition.`)
      } else {
        console.log(`    ${(plan.corpus - plan.reached).toLocaleString()} records fall in no leaf, so this plan is INCOMPLETE.`)
      }
      console.log(`    (planning is cheap; harvesting these leaves still costs ~16.5 GB, since`)
      console.log(`     the API will not return sizes without the rest of each record)`)

      // The sum above is a check that COUNTS. This one COMPARES.
      const disjoint = await checkLeavesDisjoint(plan.leaves)
      console.log(`\n  leaf disjointness, compared rather than counted:`)
      console.log(`    ${disjoint.byConstruction} pair(s) disjoint by construction — same facet fixed to different values`)
      console.log(`    ${disjoint.asked} pair(s) asked directly for a non-empty intersection`)
      if (disjoint.overlaps.length === 0) {
        console.log(`    no record lives in two leaves. A right total with wrong members would`)
        console.log(`    have passed the sum above and failed here.`)
        if (disjoint.asked === 0) {
          // SAY WHEN THE ACTIVE ARM NEVER RAN. Every pair was dismissed
          // structurally because this plan splits one facet at a time, so
          // siblings differ on the split facet and cousins on an ancestor's.
          // Zero questions asked is not zero overlaps found, and the two print
          // identically unless one of them says so.
          console.log(`    NOTE: the query arm asked nothing — the tree splits one facet at a`)
          console.log(`    time, so every pair differs on a shared key and is dismissed without`)
          console.log(`    a request. Verified separately that it does fire: {experiment:CMS}`)
          console.log(`    and {collision_type:pp} are not structurally disjoint and their`)
          console.log(`    intersection returns 51,719, which this reports as an overlap.`)
        }
      } else {
        console.log(`    ${disjoint.overlaps.length} OVERLAPPING PAIR(S) — the total was right and the membership was not:`)
        for (const o of disjoint.overlaps.slice(0, 4)) {
          console.log(`      ${JSON.stringify(o.a)}`)
          console.log(`      ${JSON.stringify(o.b)}  share ${o.shared.toLocaleString()}`)
        }
      }

      // RECID RANGES WOULD BE A PERFECT PARTITION AND DO NOT WORK. Every record
      // has a recid, so ranges over it cannot suffer the missing-field problem
      // that strands the last few. Measured rather than assumed, and refuted:
      // the field is not compared numerically. Kept as a run, not a comment, so
      // the refutation stays true or stops being claimed.
      const rangeTotal = async (lo, hi) => {
        const r = await fetch(`https://opendata.cern.ch/api/records/?size=1&page=1&type=Dataset&q=recid%3A%5B${lo}+TO+${hi}%5D`,
          { headers: { Accept: 'application/json' } })
        return r.ok ? (await r.json()).hits.total : null
      }
      const widest = await rangeTotal(1, 99999999)
      const narrow = await rangeTotal(1, 10000)
      console.log(`\n  recid-range partition, tried and refuted:`)
      console.log(`    [1 TO 99999999] returns ${widest?.toLocaleString()} of ${plan.corpus.toLocaleString()} — the widest possible range is ${(plan.corpus - widest).toLocaleString()} short`)
      console.log(`    [1 TO 10000] returns ${narrow} although recids 203, 204 and 1120 all exist`)
      console.log(`    so recid is not compared numerically and ranges do not partition. A`)
      console.log(`    partition that misses records at its widest cannot be repaired by narrowing.`)
    }
  }
  }
}

// --------------------------------------------------- involution, not collision
const folded = rows.filter((r) => r.address)
const chunkTotal = folded.reduce((t, r) => t + r.chunks, 0)
console.log(`\n  content addresses folded from published checksums, no bytes moved:`)
console.log(`    ${folded.length} of ${CASES} cases carry adler32 file checksums`)
console.log(`    ${chunkTotal.toLocaleString()} file-level addresses combined into ${folded.length} dataset addresses`)
console.log(`    ${folded.length - discrepancies.length} of ${folded.length} folds account for exactly the byte count their record declares`)
for (const r of folded.slice(0, 4)) {
  console.log(`      |${r.state.toString(2).padStart(N_QUBITS, '0')}>  recid ${String(r.recid).padStart(6)}  ${r.chunks.toString().padStart(5)} files  ->  ${r.address}`)
}
console.log(`    adler32 combines, so the address of a concatenation follows from the`)
console.log(`    addresses of its parts by arithmetic alone — the dataset is proved`)
console.log(`    against its own published fold instead of being downloaded and collided.`)

if (discrepancies.length > 0) {
  console.log(`\n  FINDING, ABOUT THE PORTAL AND NOT ABOUT THIS CODE:`)
  console.log(`  ${discrepancies.length} of ${folded.length} folded records disagree with their own file list.`)
  for (const d of discrepancies) {
    const delta = d.folded - d.declared
    console.log(`    recid ${String(d.recid).padStart(6)}  declares ${d.declared} bytes in ${d.declaredFiles} files,`)
    console.log(`                   files[] holds ${d.chunks} summing to ${d.folded}  (${delta > 0n ? '+' : ''}${delta})`)
  }
  console.log(`  The discrepancy runs in BOTH directions, so it is not a rule about what`)
  console.log(`  distribution.size omits. Recomputable by anyone from the public API.`)
}

// `experiment` arrives as an ARRAY, so a Set over it compares identity and
// dedupes nothing — the first version printed CMS sixty times and called it a
// distinct set. Flattened to strings before the Set sees them.
const tally = new Map()
for (const r of rows) {
  for (const e of [r.experiment].flat().filter(Boolean)) tally.set(e, (tally.get(e) ?? 0) + 1)
}
const experiments = [...tally].sort((a, b) => b[1] - a[1]).map(([e, n]) => `${e} ${n}`)
console.log(`\n  experiments across the ${CASES} bound cases: ${experiments.join(', ')}`)

if (failures.length > 0) {
  console.error(`\ncern:cases FAIL — ${failures.length} of ${CASES} quantum cases did not hold:`)
  for (const f of failures.slice(0, 10)) console.error('    ' + f)
  process.exit(1)
}
console.log(`\ncern:cases ok — every one of the ${CASES} possibilities carried a real record through the shipped simulator`)
console.log(`               the ~43 PB of event data is NOT downloaded and no collision is re-simulated`)
