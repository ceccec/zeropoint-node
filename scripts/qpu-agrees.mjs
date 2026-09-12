#!/usr/bin/env node
/**
 * qpu:agrees — recompute what qpu.uuidna.com serves, with instruments that
 * never read its source.
 *
 * qpu.uuidna.com serves one quantum processing unit as JSON-LD: a 3-qubit exact
 * state-vector simulator, the Bell and GHZ states with their supports, a Shor
 * run that factors 91 with base 8, a 14-face lattice, and a Lean 4 file whose
 * theorems it lists with `holds: true`, each recomputed in that Worker's own
 * TypeScript. Every one of those `holds` is the unit certifying itself. Nothing
 * outside the Worker had recomputed any of them, and a served green that only
 * the server ever checked is the shape this repository keeps finding in its own
 * seals — see lean-agrees.mjs on paraphrased arbiters and shadowed constants.
 *
 * THREE INDEPENDENT INSTRUMENTS, ONE PER KIND OF CLAIM.
 *
 *   states     src/quantum/exact.ts — Gaussian-integer amplitudes over √2^scale,
 *              no floats. Bell, |++⟩, H⊗H on Bell, GHZ and H·H|0⟩ are prepared
 *              here from |0…0⟩ and their support, separability and parity are
 *              read off the exact amplitudes. Separability is decided by the 2×2
 *              minors of the amplitude matrix across every single-qubit cut,
 *              which for two and three qubits is full separability.
 *   proof      the served index.lean is handed to the LEAN KERNEL INSTALLED ON
 *              THIS MACHINE, with `#eval` of its constants appended. Acceptance
 *              is the kernel's verdict, not this script's reading of the file;
 *              the constants the kernel prints are compared with the numbers the
 *              JSON serves, and each served theorem row must appear verbatim in
 *              the accepted source. The Worker's `holds` is the same file
 *              checked on its side; this is the same file checked on ours.
 *   factoring  src/quantum/algorithms.ts — Shor by phase estimation over a float
 *              state vector, fourteen counting qubits, 2^21 amplitudes, about
 *              twelve seconds. Its factor pair, the classical order of the base,
 *              and the counting-register peaks the served two-qubit circuit
 *              claims (period 4 over 4 outcomes: every outcome, equal weight)
 *              are compared with what the Worker serves.
 *
 * WHAT IS NOT RECOMPUTED, BY NAME. The served nine-qubit Shor circuit uses
 * cmodexp, csdg and swap; the exact simulator here has no controlled-S† and no
 * modular-multiplication permutation, so that circuit is not re-run gate for
 * gate — the factorisation, the period and the peak set are. The served
 * `measurement`, `interfere.cancelled/restored`, `speed`, `messaging`, `neuro`,
 * `design` and `css` blocks are counters or prose whose meaning this script
 * cannot state as an equation, and a claim you cannot state you cannot check;
 * they are listed under notPinned rather than silently dropped. The Worker's
 * 16-character `fold` of the Lean source is not this repository's hash and is
 * recorded, not compared.
 *
 * THREE ANSWERS, NOT TWO. No network is UNMEASURED: exit 2, nothing written,
 * the previous record stands and nothing here writes "agrees" on a run that
 * fetched nothing. No `lean` on PATH is UNMEASURED for the proof claims by
 * name, and the record does not hold while any claim is unmeasured. A served
 * claim that disagrees is written — a record of disagreement is the evidence —
 * and the run exits 1.
 *
 * --check IS OFFLINE AND RECOMPUTES. It reads the pinned served claims and the
 * pinned Lean source from the record, runs every instrument again — kernel,
 * exact simulator, Shor — and requires the agreements recorded to hold again
 * today. It never fetches, so a Worker change is seen only by the generator;
 * and it never writes, so a corrupted record fails rather than being repaired.
 *
 *   npm run qpu:agrees          fetch, recompute, write src/verification/qpu-agrees.json
 *   npm run qpu:agrees:check    no network: recompute every pinned claim and
 *                               require every recorded agreement to hold
 */
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { join, dirname } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const RECORD = join(ROOT, 'src/verification/qpu-agrees.json')
const HOST = 'https://qpu.uuidna.com'
const LEAN_PATH = 'src/quantum/processing/unit/index.lean'
const CHECK = process.argv.includes('--check')

const sha = (s) => createHash('sha256').update(s).digest('hex')
/** Canonical JSON: sorted keys at every depth, so a fold means one object. */
const canon = (v) => {
  if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']'
  if (v && typeof v === 'object') return '{' + Object.keys(v).sort().map((k) => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}'
  return JSON.stringify(v)
}
const same = (a, b) => canon(a) === canon(b)

// ── instrument 1: the exact simulator ─────────────────────────────────────────
const ex = await import(pathToFileURL(join(ROOT, 'src/quantum/exact.ts')).href)

const isZero = (z) => z.re === 0n && z.im === 0n
const gmul = (a, b) => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re })
const gsub = (a, b) => ({ re: a.re - b.re, im: a.im - b.im })
const support = (reg) => reg.amps.map((a, i) => (isZero(a) ? -1 : i)).filter((i) => i >= 0)
const popcount = (i) => { let c = 0; while (i) { c += i & 1; i >>= 1 } return c }
/** Separable across the cut {q} | rest ⇔ the 2×2^(n-1) amplitude matrix has rank 1 ⇔ every 2×2 minor is 0. */
const separableAcross = (reg, q) => {
  const bit = 1 << q
  const rest = []
  for (let i = 0; i < reg.amps.length; i += 1) if ((i & bit) === 0) rest.push(i)
  for (let x = 0; x < rest.length; x += 1) {
    for (let y = x + 1; y < rest.length; y += 1) {
      const minor = gsub(gmul(reg.amps[rest[x]], reg.amps[rest[y] | bit]), gmul(reg.amps[rest[x] | bit], reg.amps[rest[y]]))
      if (!isZero(minor)) return false
    }
  }
  return true
}
const product = (reg) => Array.from({ length: reg.n }, (_, q) => separableAcross(reg, q)).every(Boolean)
const parity = (reg) => {
  const ps = new Set(support(reg).map((i) => popcount(i) & 1))
  return ps.size === 1 ? [...ps][0] : null
}
const describe = (reg) => ({ support: support(reg), product: product(reg), parity: parity(reg) })

const states = () => {
  const bell = ex.exactCnot(ex.exactH(ex.exactZeroState(2), 0), 0, 1)
  const plus = ex.exactH(ex.exactH(ex.exactZeroState(2), 0), 1)
  const hadamard = ex.exactH(ex.exactH(bell, 0), 1)
  const ghz = ex.exactCnot(ex.exactCnot(ex.exactH(ex.exactZeroState(3), 0), 0, 1), 1, 2)
  const interfere = ex.exactH(ex.exactH(ex.exactZeroState(1), 0), 0)
  for (const r of [bell, plus, hadamard, ghz, interfere]) {
    if (!ex.exactlyNormalised(r)) throw new Error('exact simulator produced an unnormalised state')
  }
  return { bell: describe(bell), plus: describe(plus), hadamard: describe(hadamard), ghz: describe(ghz), interfere: describe(interfere) }
}

// ── instrument 2: the Lean kernel on this machine ─────────────────────────────
const EVAL = '\n#eval (n, seed, coins, rays, vertices, hexbit, bits, faces, fused)\n#eval faces * mintOf (bits + coins)\n'
const CONSTANT_NAMES = ['n', 'seed', 'coins', 'rays', 'vertices', 'hexbit', 'bits', 'faces', 'fused']

const kernel = (source) => {
  let version
  try { version = execFileSync('lean', ['--version'], { encoding: 'utf8', stdio: 'pipe' }).trim().split('\n')[0] } catch {
    return { unmeasured: 'no `lean` on PATH — the served proof was not re-checked here' }
  }
  if (/\bsorry\b/.test(source)) return { version, accepted: false, why: 'the served source contains sorry' }
  const dir = mkdtempSync(join(tmpdir(), 'qpu-agrees-'))
  const file = join(dir, 'unit.lean')
  writeFileSync(file, source + EVAL)
  let out
  try {
    out = execFileSync('lean', [file], { encoding: 'utf8', stdio: 'pipe', timeout: 300_000 })
  } catch (err) {
    rmSync(dir, { recursive: true, force: true })
    const said = (String(err.stdout ?? '') + String(err.stderr ?? '')).split('\n').filter(Boolean).slice(0, 3).join(' | ')
    return { version, accepted: false, why: said || String(err.message) }
  }
  rmSync(dir, { recursive: true, force: true })
  if (/\b(error|sorry)\b/i.test(out)) return { version, accepted: false, why: out.split('\n').slice(0, 3).join(' | ') }
  const lines = out.trim().split('\n')
  const tuple = lines[0]?.match(/^\(([\d,\s]+)\)$/)
  const nextLine = lines[1]?.match(/^(\d+)$/)
  if (!tuple || !nextLine) return { version, accepted: true, why: `kernel accepted but #eval output was not read: ${lines.join(' | ')}` }
  const values = tuple[1].split(',').map((s) => s.trim())
  if (values.length !== CONSTANT_NAMES.length) return { version, accepted: true, why: `expected ${CONSTANT_NAMES.length} constants, read ${values.length}` }
  const constants = Object.fromEntries(CONSTANT_NAMES.map((k, i) => [k, values[i]]))
  return { version, accepted: true, constants, next: nextLine[1] }
}

// ── instrument 3: this repository's Shor ──────────────────────────────────────
const gcd = (a, b) => (b ? gcd(b, a % b) : a)
const orderOf = (a, N) => { let x = a % N; let r = 1; while (x !== 1) { x = (x * a) % N; r += 1; if (r > 2 * N) return 0 } return r }

const factoring = async (N, a, counting) => {
  const { shor } = await import(pathToFileURL(join(ROOT, 'src/quantum/algorithms.ts')).href)
  const pair = shor(N, a)
  const period = orderOf(a, N)
  const q = 2 ** counting
  // Exact phase-estimation peaks: when r | q every |k·q/r⟩ carries weight 1/r and nothing else does.
  const peaks = period > 0 && q % period === 0 ? Array.from({ length: period }, (_, k) => (k * q) / period) : null
  return { factors: pair ? [...pair].sort((x, y) => x - y) : null, period, coprime: gcd(a, N) === 1, qftSize: q, peaks }
}

// ── the served claims, extracted from the three documents ─────────────────────
const extract = (root, prove, leanText) => {
  const c = root.circuit
  const pick = (o, keys) => Object.fromEntries(keys.map((k) => [k, o?.[k]]))
  return {
    id: root['@id'],
    host: root.host,
    register: pick(c.register, ['qubits', 'dim']),
    gates: c.gates?.names,
    bell: pick(c.entangle, ['support', 'product', 'parity']),
    plus: pick(c.entangle?.plus, ['support', 'product']),
    hadamard: pick(c.entangle?.hadamard, ['support', 'product', 'parity']),
    ghz: pick(c.ghz, ['support', 'product']),
    interfere: pick(c.interfere, ['support']),
    lattice: { ...pick(c.lattice, ['waves', 'faces', 'occupied', 'vacant', 'cover']), nodes: c.lattice?.nodes?.length, allHold: c.lattice?.nodes?.every((n) => n.holds === true) },
    constants: {
      n: root.cube?.n, vertices: root.cube?.vertices, hexbit: root.cube?.hexbit, bits: root.cube?.bits,
      coins: root.faces?.coins, rays: root.faces?.rays, faces: root.faces?.faces,
      fused: root.fused, next: root.next,
    },
    shor: {
      n: root.shor?.n, a: root.shor?.a, p: root.shor?.factors?.p, q: root.shor?.factors?.q,
      coprime: root.shor?.coprime, period: root.shor?.post?.period, counting: root.shor?.circuitry?.counting,
      qftSize: root.shor?.qft?.size, measureSupport: root.shor?.measure?.support, measureWeights: root.shor?.measure?.weights,
      holds: root.shor?.holds,
    },
    theorems: (prove.lean?.rows ?? []).map((r) => ({ heading: r.heading, theorem: r.theorem, holds: r.holds })),
    lean: { path: prove.source?.path, bytes: Buffer.byteLength(leanText), sha256: sha(leanText), fold: prove.source?.fold, toolchain: prove.source?.toolchain, theoremsServed: prove.source?.theorems },
    leanSource: leanText,
  }
}

// ── recompute every pinned claim ──────────────────────────────────────────────
const recompute = async (served) => {
  const claims = []
  const claim = (name, s, l, agree) => claims.push({ name, served: s, local: l, agree: Boolean(agree) })
  const unmeasured = (name, reason) => claims.push({ name, unmeasured: reason })

  // states
  const st = states()
  const dim = ex.exactZeroState(served.register.qubits).amps.length
  claim('register.dim', served.register.dim, dim, dim === served.register.dim)
  const native = ['h', 'cnot']
  claim('gates.native', served.gates, native, Array.isArray(served.gates) && served.gates.every((g) => native.includes(g)))
  for (const [name, fields] of [['bell', ['support', 'product', 'parity']], ['plus', ['support', 'product']], ['hadamard', ['support', 'product', 'parity']], ['ghz', ['support', 'product']], ['interfere', ['support']]]) {
    for (const f of fields) claim(`${name}.${f}`, served[name][f], st[name][f], same(served[name][f], st[name][f]))
  }

  // lattice arithmetic
  const L = served.lattice
  claim('lattice.cover', L.cover, L.waves * L.faces, L.cover === L.waves * L.faces)
  claim('lattice.occupancy', { occupied: L.occupied, vacant: L.vacant }, { faces: L.faces }, L.occupied + L.vacant === L.faces)
  claim('lattice.nodes', L.nodes, L.faces, L.nodes === L.faces && L.allHold === true)

  // proof
  const k = kernel(served.leanSource)
  if (k.unmeasured) {
    unmeasured('lean.kernel', k.unmeasured)
    for (const n of CONSTANT_NAMES) unmeasured(`constant.${n}`, 'kernel not run')
    unmeasured('constant.next', 'kernel not run')
    for (const t of served.theorems) unmeasured(`theorem.${t.heading}`, 'kernel not run')
  } else {
    claim('lean.kernel', { toolchain: served.lean.toolchain, sha256: served.lean.sha256 }, { accepted: k.accepted, why: k.why ?? null }, k.accepted && !k.why)
    for (const n of CONSTANT_NAMES) {
      const s = served.constants[n]
      const l = k.constants?.[n]
      if (n === 'seed') { claim('constant.seed', null, l, l !== undefined); continue } // the JSON never serves seed; the kernel is its only source
      claim(`constant.${n}`, s, l, l !== undefined && s !== undefined && BigInt(s) === BigInt(l))
    }
    const fusedOk = k.constants && BigInt(k.constants.fused) + BigInt(k.constants.fused) === BigInt(k.next)
    claim('constant.next', served.constants.next, k.next, k.next !== undefined && BigInt(served.constants.next) === BigInt(k.next) && fusedOk)
    for (const t of served.theorems) {
      const inSource = typeof t.theorem === 'string' && served.leanSource.includes(t.theorem)
      claim(`theorem.${t.heading}`, t.holds, { verbatimInSource: inSource, kernelAccepted: k.accepted }, t.holds === true && inSource && k.accepted)
    }
  }

  // factoring
  const S = served.shor
  const f = await factoring(S.n, S.a, S.counting)
  claim('shor.factors', [S.p, S.q].sort((x, y) => x - y), f.factors, same([S.p, S.q].sort((x, y) => x - y), f.factors) && S.p * S.q === S.n)
  claim('shor.period', S.period, f.period, S.period === f.period)
  claim('shor.coprime', S.coprime, f.coprime, S.coprime === f.coprime)
  claim('shor.qftSize', S.qftSize, f.qftSize, S.qftSize === f.qftSize)
  const uniform = Array.isArray(S.measureWeights) && S.measureWeights.length > 0 && S.measureWeights.every((w) => w === S.measureWeights[0])
  claim('shor.peaks', { support: S.measureSupport, uniform }, { support: f.peaks, uniform: f.peaks !== null }, f.peaks !== null && same(S.measureSupport, f.peaks) && uniform)
  claim('shor.holds', S.holds, f.factors !== null, S.holds === (f.factors !== null))

  return { claims, kernel: k.version ? { version: k.version } : null }
}

const summarise = (claims) => ({
  agree: claims.filter((c) => c.agree === true).length,
  disagree: claims.filter((c) => c.agree === false).length,
  unmeasured: claims.filter((c) => c.unmeasured).map((c) => `${c.name}: ${c.unmeasured}`),
})

// ── --check: offline, recompute, never write ──────────────────────────────────
if (CHECK) {
  let record
  try { record = JSON.parse(readFileSync(RECORD, 'utf8')) } catch (err) {
    console.error(`qpu:agrees:check FAIL — ${RECORD} is missing or unreadable (${String(err).split('\n')[0]}); run npm run qpu:agrees`)
    process.exit(1)
  }
  const failures = []
  if (!record.served || !Array.isArray(record.claims)) failures.push('the record has no served block or no claims')
  else {
    if (record.source?.fold !== sha(canon(record.served))) failures.push('source.fold does not match the pinned served claims — the record was edited')
    const { claims } = await recompute(record.served)
    const byName = new Map(record.claims.map((c) => [c.name, c]))
    if (claims.length !== record.claims.length) failures.push(`recomputed ${claims.length} claims, record holds ${record.claims.length}`)
    for (const c of claims) {
      const r = byName.get(c.name)
      if (!r) { failures.push(`${c.name}: not in the record`); continue }
      if (!same(c, r)) failures.push(`${c.name}: recorded ${canon(r)} — recomputed ${canon(c)}`)
      if (c.agree !== true) failures.push(`${c.name}: ${c.unmeasured ? `UNMEASURED (${c.unmeasured})` : 'does not agree'}`)
    }
    if (record.holds !== true) failures.push('the record says holds: false')
  }
  if (failures.length) {
    console.error(`qpu:agrees:check FAIL — ${failures.length} problem(s):`)
    for (const f of failures) console.error(`  ${f}`)
    process.exit(1)
  }
  console.log(`qpu:agrees:check ok — ${record.claims.length} claims served by ${record.served.host} recomputed offline; every one agrees (Lean kernel re-accepted the pinned proof, exact simulator, Shor)`)
  process.exit(0)
}

// ── generate: fetch, recompute, write ─────────────────────────────────────────
const fetchJson = async (url, init) => {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(30_000) })
  if (!res.ok) throw new Error(`${url} → ${res.status}`)
  return res
}
let root, prove, leanText
try {
  root = await (await fetchJson(HOST)).json()
  const rpc = await (await fetchJson(`${HOST}/mcp`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'qpu_prove', arguments: {} } }),
  })).json()
  const text = rpc.result?.content?.[0]?.text
  if (!text) throw new Error('qpu_prove returned no text content')
  prove = JSON.parse(text)
  leanText = await (await fetchJson(`${HOST}/${LEAN_PATH}`)).text()
} catch (err) {
  console.error(`qpu:agrees UNMEASURED — ${HOST} could not be read (${String(err.message ?? err).split('\n')[0]}); nothing written, the previous record stands`)
  process.exit(2)
}

const served = extract(root, prove, leanText)
const { claims, kernel: k } = await recompute(served)
const sum = summarise(claims)
const holds = sum.disagree === 0 && sum.unmeasured.length === 0 && claims.length > 0

const record = {
  what: `Every claim ${served.host} serves about its quantum processing unit, recomputed here by instruments that never read its source: the exact simulator for the states, the Lean kernel on this machine for the proof, and this repository's Shor for the factorisation.`,
  doesNotEstablish: 'that the Worker is quantum hardware (it says simulator, and so does everything here), that its nine-qubit Shor circuit is correct gate for gate (only its factorisation, period and peak set are recomputed), or anything about the served blocks listed under notPinned.',
  notPinned: {
    measurement: 'served as {index, bits, support}; the meaning of index and bits is not stated as an equation',
    interfere: 'cancelled and restored are counters whose definition is not served; only the support of H·H|0⟩ is pinned',
    shorCircuit: 'cmodexp, csdg and swap are not in the exact simulator here; the circuit is not re-run gate for gate',
    fold: 'the Worker\'s 16-character fold of index.lean is not this repository\'s hash; recorded under served.lean.fold, not compared',
    prose: 'speed, messaging, neuro, design, css, docs, glossary and ui are counters or prose',
  },
  source: {
    host: served.host,
    id: served.id,
    fetched: [HOST, `${HOST}/mcp tools/call qpu_prove`, `${HOST}/${LEAN_PATH}`],
    fold: sha(canon(served)),
    kernel: k,
  },
  served,
  claims,
  ...sum,
  holds,
}
writeFileSync(RECORD, JSON.stringify(record, null, 2) + '\n')

console.log(`qpu:agrees — ${claims.length} claims served by ${served.host}: ${sum.agree} agree, ${sum.disagree} disagree, ${sum.unmeasured.length} unmeasured`)
for (const c of claims) {
  if (c.unmeasured) console.log(`  UNMEASURED  ${c.name} — ${c.unmeasured}`)
  else if (!c.agree) console.log(`  DISAGREE    ${c.name} — served ${canon(c.served)}, local ${canon(c.local)}`)
}
if (k) console.log(`  proof re-checked by ${k.version} (served toolchain ${served.lean.toolchain})`)
console.log(holds ? `  holds — written to ${RECORD}` : `  does NOT hold — written to ${RECORD} as evidence`)
process.exit(holds ? 0 : 1)
