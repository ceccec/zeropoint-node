#!/usr/bin/env node
/**
 * qpu:shor:agrees — two Shor implementations, every input, both directions.
 *
 * shor-exhaustive.mjs runs this repository's Shor over every modulus from 4 to
 * a measured ceiling and every base, and asks whether any answer is a wrong
 * factorisation and whether any refusal falls outside the three ways period-
 * finding is known to fail. It answers both against N itself. It cannot answer
 * a third question: whether ANOTHER implementation, written by someone else on
 * a different representation, reaches the same verdict on every one of those
 * inputs. qpu.uuidna.com carries one — crypto_shor, exact sparse amplitudes,
 * a two-qubit counting register — and it takes n and a. So every pair the
 * sweep covers is sent there, and the two are compared arm by arm.
 *
 * THE ARMS, BY NAME, because "agrees" over 434 pairs would hide which claim
 * did the agreeing:
 *
 *   coprime   gcd(a, N) here against the gcd the Worker reports.
 *   period    the classical order of a modulo N here against the period the
 *             Worker recovered. The Worker's counting register has two qubits,
 *             so it recovers a period only when that period divides 4, and
 *             says `beyond` otherwise. That is a declared limit and is read as
 *             one: where the Worker says beyond, the order here must NOT
 *             divide 4, and where it reports a period, the order must equal it.
 *   factors   where either side returns a pair, it must be a true
 *             factorisation of N. Where the Worker factors by gcd (a base
 *             sharing a factor), this repository's Shor takes the same first
 *             step and the pairs must be identical. Where the Worker factors
 *             by period, this repository's phase estimation — 2·bits(N)
 *             counting qubits rather than two — must also factor, and the pairs
 *             are compared. Where the Worker refuses inside its width (period
 *             divides 4, no factor found), the refusal here must be one of the
 *             same causes: N prime, or a^(r/2) ≡ −1.
 *
 * Pairs the Worker declares beyond its counting width are counted under
 * `beyondCountingWidth`, not as agreement and not as disagreement: this
 * repository factors most of them, the Worker says in advance that it cannot,
 * and a check that scored a declared limit as a defect would be scoring the
 * disclosure rather than the method.
 *
 * WHAT THIS DOES NOT ESTABLISH. Any speedup — both sides simulate, and the
 * period arm is decided by a classical order finder, which is the problem Shor
 * solves. Nor that either implementation is correct where the classical arm
 * cannot follow; the range is the range shor-exhaustive.mjs measured, read
 * from its record so the two sweeps cover the same inputs by construction.
 *
 * THREE ANSWERS. The network unreachable for any pair is UNMEASURED: exit 2,
 * nothing written — a record over 433 of 434 pairs would be a different
 * record. --check is offline: it reruns this repository's Shor over every
 * pinned served row and requires every verdict recorded to hold again, and
 * requires the row count to be the count the range implies, so a truncated
 * record fails rather than reading as a smaller sweep.
 *
 *   npm run qpu:shor:agrees          sweep the Worker, recompute here, write the record
 *   npm run qpu:shor:agrees:check    no network: recompute every pinned row
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const RECORD = join(ROOT, 'src/verification/qpu-shor-agrees.json')
const SWEEP = join(ROOT, 'src/verification/shor-exhaustive.json')
const HOST = 'https://qpu.uuidna.com'
const CHECK = process.argv.includes('--check')
const LANES = 8

const sha = (s) => createHash('sha256').update(s).digest('hex')
const canon = (v) => Array.isArray(v) ? '[' + v.map(canon).join(',') + ']'
  : v && typeof v === 'object' ? '{' + Object.keys(v).sort().map((k) => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}'
  : JSON.stringify(v)
const same = (a, b) => canon(a) === canon(b)

const gcd = (a, b) => (b ? gcd(b, a % b) : a)
const isPrime = (n) => { if (n < 2) return false; for (let d = 2; d * d <= n; d += 1) if (n % d === 0) return false; return true }
const orderOf = (a, N) => { let x = a % N; let r = 1; while (x !== 1) { x = (x * a) % N; r += 1; if (r > 2 * N) return 0 } return r }
const powMod = (a, e, N) => { let x = 1; for (let i = 0; i < e; i += 1) x = (x * a) % N; return x }
const factorises = (pair, N) => Array.isArray(pair) && pair.length === 2 && pair.every((f) => Number.isInteger(f) && f > 1 && f < N) && pair[0] * pair[1] === N
const pairsFor = (maxN) => { const out = []; for (let N = 4; N <= maxN; N += 1) for (let a = 2; a < N; a += 1) out.push([N, a]); return out }

const { shor } = await import(pathToFileURL(join(ROOT, 'src/quantum/algorithms.ts')).href)

/** This repository's side of one pair. */
const local = (N, a) => {
  const g = gcd(a, N)
  const coprime = g === 1
  const period = coprime ? orderOf(a, N) : 0
  const pair = shor(N, a)
  const factors = pair ? [...pair].sort((x, y) => x - y) : null
  let refusal = 'none'
  if (factors === null) {
    if (isPrime(N)) refusal = 'prime'
    else if (period % 2 === 1) refusal = 'oddPeriod'
    else if (powMod(a, period / 2, N) === N - 1) refusal = 'negativeOne'
    else refusal = 'unexplained'
  }
  return { gcd: g, coprime, period, factors, refusal }
}

/** The verdict on one pair, arm by arm. */
const compare = (s, l) => {
  const N = s.n
  const arms = {}
  arms.coprime = s.coprime === l.coprime && s.gcd === l.gcd
  if (!l.coprime) arms.period = s.period === 0
  else if (s.beyond) arms.period = l.period > 0 && 4 % l.period !== 0
  else arms.period = s.period === l.period
  let kind
  if (s.by === 'gcd') { kind = 'gcd'; arms.factors = factorises(s.factors, N) && same(s.factors, l.factors) }
  else if (s.by === 'period') { kind = 'period'; arms.factors = factorises(s.factors, N) && factorises(l.factors, N) }
  else if (s.beyond) { kind = 'beyondCountingWidth'; arms.factors = s.factors === null }
  else { kind = 'refused'; arms.factors = s.factors === null && l.factors === null && (l.refusal === 'prime' || l.refusal === 'negativeOne') }
  const agree = Object.values(arms).every(Boolean)
  return { n: N, a: s.a, kind, arms, agree, identical: kind === 'period' ? same(s.factors, l.factors) : null }
}

const recompute = (rows) => {
  const verdicts = rows.map((s) => compare(s, local(s.n, s.a)))
  const kinds = { gcd: 0, period: 0, refused: 0, beyondCountingWidth: 0 }
  for (const v of verdicts) kinds[v.kind] += 1
  const disagreements = verdicts.filter((v) => !v.agree).map((v) => ({ n: v.n, a: v.a, kind: v.kind, arms: v.arms }))
  const identical = verdicts.filter((v) => v.kind === 'period' && v.identical).length
  return { verdicts, kinds, disagreements, identical }
}

// ── --check: offline, recompute, never write ──────────────────────────────────
if (CHECK) {
  let record
  try { record = JSON.parse(readFileSync(RECORD, 'utf8')) } catch (err) {
    console.error(`qpu:shor:agrees:check FAIL — ${RECORD} is missing or unreadable (${String(err).split('\n')[0]}); run npm run qpu:shor:agrees`)
    process.exit(1)
  }
  const failures = []
  const rows = record.served
  if (!Array.isArray(rows) || !Number.isInteger(record.maxN)) failures.push('the record has no served rows or no maxN')
  else {
    if (record.fold !== sha(canon(rows))) failures.push('fold does not match the pinned served rows — the record was edited')
    const expected = pairsFor(record.maxN)
    if (rows.length !== expected.length) failures.push(`the range 4..${record.maxN} implies ${expected.length} pairs, the record holds ${rows.length}`)
    else if (!expected.every(([N, a], i) => rows[i].n === N && rows[i].a === a)) failures.push('the pinned rows are not every pair of the range in order')
    const { verdicts, kinds, disagreements, identical } = recompute(rows)
    if (disagreements.length > 0) for (const d of disagreements.slice(0, 10)) failures.push(`N=${d.n} a=${d.a} (${d.kind}): ${Object.entries(d.arms).filter(([, ok]) => !ok).map(([k]) => k).join(', ')} does not agree`)
    if (disagreements.length > 10) failures.push(`…and ${disagreements.length - 10} more`)
    if (!same(kinds, record.kinds)) failures.push(`kinds recomputed as ${canon(kinds)}, recorded ${canon(record.kinds)}`)
    if (identical !== record.identicalPairs) failures.push(`identical period factorisations recomputed as ${identical}, recorded ${record.identicalPairs}`)
    if (verdicts.filter((v) => v.agree).length !== record.agree) failures.push(`agree recomputed as ${verdicts.filter((v) => v.agree).length}, recorded ${record.agree}`)
    if (record.holds !== true) failures.push('the record says holds: false')
  }
  if (failures.length) {
    console.error(`qpu:shor:agrees:check FAIL — ${failures.length} problem(s):`)
    for (const f of failures) console.error(`  ${f}`)
    process.exit(1)
  }
  console.log(`qpu:shor:agrees:check ok — ${rows.length} (N, a) pairs served by ${record.host} recomputed offline; ${record.kinds.gcd} by gcd, ${record.kinds.period} by period, ${record.kinds.refused} refused inside the Worker's width, ${record.kinds.beyondCountingWidth} declared beyond it; every arm agrees`)
  process.exit(0)
}

// ── generate: sweep, recompute, write ─────────────────────────────────────────
let maxN
try { maxN = JSON.parse(readFileSync(SWEEP, 'utf8')).maxN } catch {
  console.error(`qpu:shor:agrees FAIL — ${SWEEP} is missing or unreadable; the range comes from that sweep, run npm run shor:exhaustive`)
  process.exit(1)
}
if (!Number.isInteger(maxN) || maxN < 4) { console.error(`qpu:shor:agrees FAIL — shor-exhaustive.json has no usable maxN (${maxN})`); process.exit(1) }

const pairs = pairsFor(maxN)
const call = async ([n, a]) => {
  const res = await fetch(`${HOST}/mcp`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, signal: AbortSignal.timeout(30_000),
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'crypto_shor', arguments: { n, a } } }),
  })
  if (!res.ok) throw new Error(`crypto_shor(${n}, ${a}) → ${res.status}`)
  const rpc = await res.json()
  const text = rpc.result?.content?.[0]?.text
  if (!text) throw new Error(`crypto_shor(${n}, ${a}) returned no text content`)
  const r = JSON.parse(text)
  if (r.n !== n || r.a !== a) throw new Error(`crypto_shor(${n}, ${a}) answered for (${r.n}, ${r.a})`)
  const by = r.factors?.by ?? 'none'
  return {
    n, a,
    coprime: r.coprime, gcd: r.classical?.gcd, period: r.classical?.period, beyond: r.classical?.beyond === true,
    resolvable: r.classical?.resolvable, by,
    factors: by === 'none' ? null : [r.factors.p, r.factors.q].sort((x, y) => x - y),
    holds: r.holds,
  }
}
const rows = new Array(pairs.length)
let next = 0
let failed = null
const lane = async () => {
  while (next < pairs.length && failed === null) {
    const i = next++
    try { rows[i] = await call(pairs[i]) } catch (err) { failed = err }
  }
}
process.stdout.write(`qpu:shor:agrees — asking ${HOST} crypto_shor for ${pairs.length} pairs, N = 4..${maxN}, ${LANES} lanes `)
await Promise.all(Array.from({ length: LANES }, lane))
console.log('')
if (failed !== null) {
  console.error(`qpu:shor:agrees UNMEASURED — ${String(failed.message ?? failed).split('\n')[0]}; nothing written, the previous record stands`)
  process.exit(2)
}

const { verdicts, kinds, disagreements, identical } = recompute(rows)
const agree = verdicts.filter((v) => v.agree).length
const holds = disagreements.length === 0 && rows.length === pairs.length
const record = {
  what: `Every (N, a) pair of this repository's exhaustive Shor sweep, N = 4..${maxN}, sent to ${HOST} crypto_shor and compared arm by arm — coprimality, period, factors — with what this repository's Shor and a classical order finder compute for the same pair.`,
  doesNotEstablish: 'any speedup — both sides simulate, and the period arm is decided classically; or correctness beyond this range, which is the range shor-exhaustive.mjs measured. Pairs the Worker declares beyond its two-qubit counting width are counted, not scored.',
  host: HOST.replace('https://', ''),
  tool: 'crypto_shor',
  maxN,
  pairs: rows.length,
  kinds,
  agree,
  disagree: disagreements.length,
  identicalPairs: identical,
  disagreements,
  fold: sha(canon(rows)),
  served: rows,
  holds,
}
writeFileSync(RECORD, JSON.stringify(record, null, 2) + '\n')
console.log(`  ${rows.length} pairs: ${kinds.gcd} factored by gcd, ${kinds.period} by period (${identical} identical pairs), ${kinds.refused} refused inside the width, ${kinds.beyondCountingWidth} beyond it`)
console.log(`  ${agree} agree, ${disagreements.length} disagree`)
for (const d of disagreements.slice(0, 10)) console.log(`  DISAGREE N=${d.n} a=${d.a} (${d.kind}): ${Object.entries(d.arms).filter(([, ok]) => !ok).map(([k]) => k).join(', ')}`)
console.log(holds ? `  holds — written to ${RECORD}` : `  does NOT hold — written to ${RECORD} as evidence`)
process.exit(holds ? 0 : 1)
