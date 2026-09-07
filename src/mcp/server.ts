#!/usr/bin/env node
/**
 * Thin stdio MCP — math ops over the kernel (ceccec.github.io pattern, slim).
 * Tools: fold, vortex, contentUuid, verify, digitalRoot, developmentVortex.
 */

import { createInterface } from 'node:readline'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import {
  asVortex,
  developmentVortex,
  digitalRoot,
  fold,
  foldVortex,
  merge,
  toUuid,
  vortexStrokeGateways,
} from '../0/index.ts'
import {
  computeContentUuid,
  verifyContentUuid,
} from '../integrity/content-uuid.ts'
import { appendReceipt, GENESIS_PREV } from '../integrity/receipt.ts'
import { importExportGraphTip } from '../kernel/import-graph.ts'
import { nextSelfDevelopTip, selfBuild } from '../kernel/self-develop.ts'
// The verification surface. It is the most distinctive thing this package has
// and an agent could not see any of it: nine tools covered digit arithmetic and
// folds, and none could answer "is the quantum criterion met", "which theorems
// hold" or "what does this package claim and what backs it".
import { SEALS, runSeal, ASSUMPTIONS } from '../verification/lean-bridge.ts'
import {
  stabilizerZeroState, stabilizerH, stabilizerS, stabilizerX, stabilizerZ,
  stabilizerCnot, stabilizerMeasure, stabilizerBits,
} from '../quantum/stabilizer.ts'
import {
  ctZeroState, ctH, ctS, ctT, ctTdg, ctX, ctZ, ctCnot, ctCz,
  ctProbability, ctExactlyNormalised,
} from '../quantum/clifford-t.ts'
import { allCriteria } from '../verification/subjects.ts'
/**
 * Read, not imported. Bundling JSON needs a rollup plugin, and the ledger is
 * data this server reads rather than code it inlines.
 *
 * BOTH LAYOUTS, because the file sits in a different place relative to the
 * caller depending on which one is running: `src/mcp/server.ts` reaches it as
 * `../verification/`, and the published `dist/mcp.cjs` reaches it as
 * `../src/verification/`. The first version only handled the source layout, and
 * the built server — the one npm actually ships as `zeropoint-mcp` — died on
 * startup with ENOENT. It was invisible until the BUILT artifact was run
 * instead of the source, which is why mcp:smoke now runs the build too.
 */
const LEDGER = ((): { claims: Record<string, { line: number; kind: string; backedBy: string | null; establishes: string | null; doesNotEstablish: string | null }> } => {
  const here = typeof __dirname === 'string' ? pathToFileURL(join(__dirname, 'x')) : import.meta.url
  for (const rel of ['../verification/claims.json', '../src/verification/claims.json']) {
    try { return JSON.parse(readFileSync(new URL(rel, here), 'utf8')) } catch { /* try the other layout */ }
  }
  throw new Error('zeropoint-mcp: cannot find verification/claims.json in either the source or the published layout')
})()

type JsonRpc = {
  jsonrpc?: string
  id?: string | number | null
  method?: string
  params?: Record<string, unknown>
}

const TOOLS = [
  {
    name: 'zeropoint.fold',
    description: 'Fold two seeds into a content-addressed pair (toUuid/merge).',
    inputSchema: {
      type: 'object',
      properties: { a: { type: 'string' }, b: { type: 'string' } },
      required: ['a'],
    },
  },
  {
    name: 'zeropoint.vortex',
    description: 'Vortex fold validity + stroke gateways.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'zeropoint.contentUuid',
    description: 'JCS→SHA-256→uuidv8 content address for an object.',
    inputSchema: {
      type: 'object',
      properties: { content: { type: 'object' }, projectId: { type: 'string' } },
      required: ['content'],
    },
  },
  {
    name: 'zeropoint.verify',
    description: 'Verify stored uuid matches recomputed content-uuid.',
    inputSchema: {
      type: 'object',
      properties: { content: { type: 'object' }, projectId: { type: 'string' } },
      required: ['content'],
    },
  },
  {
    name: 'zeropoint.digitalRoot',
    description: 'Kernel digital root (0→9).',
    inputSchema: {
      type: 'object',
      properties: { n: { type: 'number' } },
      required: ['n'],
    },
  },
  {
    name: 'zeropoint.developmentVortex',
    description: 'Double-torus development vortex for a wave phase.',
    inputSchema: {
      type: 'object',
      properties: {
        wave: {
          type: 'string',
          enum: ['origin', 'decode', 'design', 'learn', 'tune', 'edit', 'rebuild', 'verify'],
        },
      },
    },
  },
  {
    name: 'zeropoint.importGraph',
    description:
      'Computed a432.* import/export self-ref census (content-uuid + merkleFold). Tip only — not a hand inventory.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'zeropoint.criteria',
    description:
      'The six predicates that gate a release, plus the one only reported: how many conditions each meets, '
      + 'and what would refute each. The real-time one MEASURES, so its verdict is a property of this machine.',
    inputSchema: {
      type: 'object',
      properties: {
        samples: { type: 'number', description: 'timed steps for the real-time criterion; fewer is faster and rougher (default 300)' },
        conditions: { type: 'boolean', description: 'include every condition with its refuter, not just the counts' },
      },
    },
  },
  {
    name: 'zeropoint.seals',
    description:
      'Every theorem this repository states that carries a predicate which RUNS, and whether it holds right now. '
      + 'A seal is recomputed on each call; nothing here is remembered.',
    inputSchema: {
      type: 'object',
      properties: { name: { type: 'string', description: 'one seal by name; omit for all of them' } },
    },
  },
  {
    name: 'zeropoint.claims',
    description:
      'The claim ledger: every effect claim the corpus makes and the theorem or declared axiom it is bound to, '
      + 'with what that binding establishes and what it does NOT. Answers "what does this package claim, and what backs it".',
    inputSchema: {
      type: 'object',
      properties: { backedBy: { type: 'string', description: 'filter to claims resting on one predicate or axiom' } },
    },
  },
  {
    name: 'zeropoint.selfNext',
    description:
      'Next self-develop tip from planTrinity/audit. If development stops, gaps in self-development exist.',
    inputSchema: { type: 'object', properties: {} },
  },
  /**
   * THE QUANTUM COMPUTER, REACHABLE FROM A CLIENT.
   *
   * The library carried four representations and an agent could reach none of
   * them: the MCP surface is the first thing a client sees and it exposed
   * digit arithmetic only. These three are the whole machine — run a circuit
   * cheaply, run one exactly, and ask what it costs and where it stops.
   */
  {
    name: 'zeropoint.quantumRun',
    description:
      'Run a Clifford circuit (h, s, x, z, cnot) on a stabilizer tableau and measure qubits. '
      + 'Polynomial in the qubit count rather than exponential, so hundreds of qubits are reachable — '
      + 'the same circuits a state vector cannot hold past about 30. Each measurement reports whether '
      + 'the outcome was DETERMINED by the state or genuinely undetermined; supply coins for the latter. '
      + 'No T gate: this is the Clifford fragment, which is exactly the fragment that is classically cheap.',
    inputSchema: {
      type: 'object',
      properties: {
        qubits: { type: 'number', description: 'number of qubits' },
        gates: { type: 'array', description: '[{gate:"h"|"s"|"x"|"z"|"cnot", a:number, b?:number}]' },
        measure: { type: 'array', description: 'qubit indices to measure, in order' },
        coins: { type: 'array', description: 'optional 0/1 outcomes for undetermined measurements' },
      },
      required: ['qubits'],
    },
  },
  {
    name: 'zeropoint.quantumExact',
    description:
      'Run a Clifford+T circuit (h, s, t, tdg, x, z, cnot, cz) with NO FLOATING POINT and return exact '
      + 'probabilities. Amplitudes live in the ring generated by the eighth root of unity, so T is exact '
      + 'rather than absent or approximated. Each probability comes back as (p + q*sqrt2)/2^scale with '
      + 'integer p and q: Clifford-only circuits give q=0 and a rational, and any T makes it irrational — '
      + 'H T H on |0> is exactly (2 + sqrt2)/4. Arbitrary-angle rotations are absent, not approximated.',
    inputSchema: {
      type: 'object',
      properties: {
        qubits: { type: 'number', description: 'number of qubits (kept small: this holds 2^n amplitudes)' },
        gates: { type: 'array', description: '[{gate:"h"|"s"|"t"|"tdg"|"x"|"z"|"cnot"|"cz", a:number, b?:number}]' },
      },
      required: ['qubits'],
    },
  },
  {
    name: 'zeropoint.quantumCapacity',
    description:
      'What this quantum computer costs and where it stops, measured rather than claimed: the axes that '
      + 'were measured, the ones that were NOT, which algorithms are identified by their method rather '
      + 'than their answer, and the oracle-call counts. No quantum advantage is claimed anywhere — '
      + 'simulating one quantum query costs 2^n classical evaluations, and every measurement says so.',
    inputSchema: { type: 'object', properties: {} },
  },
]

function result(id: string | number | null | undefined, payload: unknown) {
  return JSON.stringify({
    jsonrpc: '2.0',
    id: id ?? null,
    result: payload,
  })
}

function error(id: string | number | null | undefined, message: string, code = -32000) {
  return JSON.stringify({
    jsonrpc: '2.0',
    id: id ?? null,
    error: { code, message },
  })
}

type GateSpec = { gate?: string; a?: number; b?: number }

/**
 * Clamp with comparisons, not Math.min/Math.max. math:ban forbids Math.* under
 * src/ and it is right to: this file's neighbours carry exact arithmetic, and a
 * bound written with a float helper is a float in the boundary of a surface
 * that has none.
 */
const clamp = (v: number, lo: number, hi: number): number => (v < lo ? lo : v > hi ? hi : v)

function callTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case 'zeropoint.quantumRun': {
      const n = clamp(Number(args.qubits ?? 1) | 0, 1, 2048)
      const gates = (Array.isArray(args.gates) ? args.gates : []) as GateSpec[]
      const s = stabilizerZeroState(n)
      const applied: string[] = []
      for (const g of gates) {
        const a = Number(g?.a ?? 0) | 0
        const b = Number(g?.b ?? 0) | 0
        if (a < 0 || a >= n || b < 0 || b >= n) return { error: `qubit index out of range in ${JSON.stringify(g)}` }
        switch (g?.gate) {
          case 'h': stabilizerH(s, a); break
          case 's': stabilizerS(s, a); break
          case 'x': stabilizerX(s, a); break
          case 'z': stabilizerZ(s, a); break
          case 'cnot': if (a === b) return { error: 'cnot needs distinct qubits' }; stabilizerCnot(s, a, b); break
          default: return { error: `unknown gate ${String(g?.gate)} — this is the Clifford fragment: h, s, x, z, cnot` }
        }
        applied.push(`${g.gate}${g.gate === 'cnot' ? ` ${a}->${b}` : ` ${a}`}`)
      }
      const targets = (Array.isArray(args.measure) ? args.measure : []).map((q) => Number(q) | 0)
      const coins = (Array.isArray(args.coins) ? args.coins : []).map((c) => (Number(c) ? 1 : 0) as 0 | 1)
      const measurements = targets.map((q, i) => {
        if (q < 0 || q >= n) return { qubit: q, error: 'out of range' }
        const m = stabilizerMeasure(s, q, coins[i] ?? 0)
        return { qubit: q, outcome: m.outcome, determined: m.deterministic }
      })
      return {
        summary: `${n} qubits, ${applied.length} Clifford gate(s), ${measurements.length} measurement(s). `
          + `The tableau is ${stabilizerBits(n)} bits; a state vector would need 2^${n} amplitudes.`,
        qubits: n,
        gates: applied,
        measurements,
        tableauBits: stabilizerBits(n),
        note: 'A DETERMINED outcome was forced by the state; an undetermined one used the coin you supplied '
          + '(0 by default), so nothing here calls a random source of its own. Clifford circuits are '
          + 'classically polynomial — this is cheap because of Gottesman-Knill, not because of hardware.',
      }
    }
    case 'zeropoint.quantumExact': {
      const n = clamp(Number(args.qubits ?? 1) | 0, 1, 12)
      const gates = (Array.isArray(args.gates) ? args.gates : []) as GateSpec[]
      let r = ctZeroState(n)
      const applied: string[] = []
      for (const g of gates) {
        const a = Number(g?.a ?? 0) | 0
        const b = Number(g?.b ?? 0) | 0
        if (a < 0 || a >= n || b < 0 || b >= n) return { error: `qubit index out of range in ${JSON.stringify(g)}` }
        switch (g?.gate) {
          case 'h': r = ctH(r, a); break
          case 's': r = ctS(r, a); break
          case 't': r = ctT(r, a); break
          case 'tdg': r = ctTdg(r, a); break
          case 'x': r = ctX(r, a); break
          case 'z': r = ctZ(r, a); break
          case 'cnot': if (a === b) return { error: 'cnot needs distinct qubits' }; r = ctCnot(r, a, b); break
          case 'cz': if (a === b) return { error: 'cz needs distinct qubits' }; r = ctCz(r, a, b); break
          default: return { error: `unknown gate ${String(g?.gate)} — Clifford+T is h, s, t, tdg, x, z, cnot, cz. `
            + 'An arbitrary-angle rotation is ABSENT rather than approximated.' }
        }
        applied.push(`${g.gate}${g.gate === 'cnot' || g.gate === 'cz' ? ` ${a},${b}` : ` ${a}`}`)
      }
      const probabilities = []
      let anyIrrational = false
      for (let i = 0; i < (1 << n); i += 1) {
        const p = ctProbability(r, i)
        if (p === null) return { error: 'the ring arithmetic produced a value outside P + q*sqrt2, which is a bug' }
        if (p.p === 0n && p.q === 0n) continue
        if (p.q !== 0n) anyIrrational = true
        probabilities.push({
          state: i.toString(2).padStart(n, '0'),
          p: `${p.p}`, q: `${p.q}`, scale: p.scale,
          exact: `(${p.p}${p.q < 0n ? ' - ' : ' + '}${p.q < 0n ? -p.q : p.q}*sqrt2)/2^${p.scale}`,
        })
      }
      return {
        summary: `${n} qubits, ${applied.length} gate(s), ${probabilities.length} outcome(s) with non-zero probability. `
          + (anyIrrational
            ? 'At least one probability is IRRATIONAL — a T gate took the answers out of the rationals.'
            : 'Every probability is rational: this circuit stayed inside the Clifford fragment.'),
        qubits: n,
        gates: applied,
        probabilities,
        exactlyNormalised: ctExactlyNormalised(r),
        note: 'No floating point was used. Probabilities are (p + q*sqrt2)/2^scale with integer p and q; '
          + 'normalisation is two integer equalities rather than a tolerance.',
      }
    }
    case 'zeropoint.quantumCapacity': {
      // BOTH LAYOUTS, like LEDGER above. The built server ships beside
      // verification/ and the source sits beside src/verification/, and this
      // file already has one scar from resolving only the second.
      const read = (f: string) => {
        const here = typeof __dirname === 'string' ? pathToFileURL(join(__dirname, 'x')) : import.meta.url
        for (const rel of [`../verification/${f}`, `../src/verification/${f}`]) {
          try { return JSON.parse(readFileSync(new URL(rel, here), 'utf8')) } catch { /* try the other layout */ }
        }
        return null
      }
      const capacity = read('quantum-capacity.json')
      const cost = read('query-cost.json')
      const impostors = read('impostors.json')
      return {
        summary: 'Measured, not claimed. No quantum advantage is demonstrated anywhere in this package, and '
          + 'the exponential cost belongs to the state-vector representation rather than to the quantum content.',
        axesMeasured: capacity?.axes?.measured ?? null,
        axesNotMeasured: capacity?.axes?.unmeasured ?? null,
        stateVectorVsStabilizer: capacity?.stateVectorVsStabilizer ?? null,
        queryAdvantagesFound: cost?.queryAdvantagesFound ?? null,
        queryMeasurements: cost?.measurements ?? null,
        identifiedByMethod: impostors?.identifiedByMethod ?? null,
        verifiedByAnswerAlone: impostors?.answerOnly ?? null,
        note: capacity === null
          ? 'The capacity record is absent — run npm run capacity. Nothing is inferred in its place.'
          : 'Every number here is recomputed by npm run capacity, npm run query:cost and npm run impostors.',
      }
    }
    case 'zeropoint.fold': {
      const a = String(args.a ?? '')
      // b defaults to a, and SAYS SO. It used to default silently, so a caller
      // who omitted it got a self-fold reported as though two seeds had been
      // given — and self-folds are the case where order cannot matter, which is
      // exactly the property `orderMatters` is asked about.
      const foldedWithItself = args.b === undefined
      const b = foldedWithItself ? a : String(args.b)
      const f = fold(a, b)
      const receipt = appendReceipt(GENESIS_PREV, 'fold', { a, b, merged: f.merged })
      return {
        summary: foldedWithItself
          ? `folded "${a}" with itself (no second seed given), so order cannot matter`
          : `folded "${a}" with "${b}"; order ${f.orderMatters ? 'MATTERS' : 'does not matter'}`,
        foldedWithItself,
        fold: f,
        vortex: asVortex(f),
        receipt,
      }
    }
    case 'zeropoint.vortex': {
      const v = foldVortex()
      const stroke = vortexStrokeGateways()
      return {
        summary: `fold ${v.valid ? 'valid' : 'INVALID'} — palindrome ${v.palindrome.join(' ')}, total ${v.total} root ${v.totalRoot}; `
          + `tour ${stroke.written} with gateways ${stroke.gateways.join('·')}, ${stroke.ascents} ascents and ${stroke.descents} descents`,
        foldVortex: v,
        stroke,
      }
    }
    case 'zeropoint.contentUuid': {
      const content = (args.content ?? {}) as Record<string, unknown>
      const projectId = typeof args.projectId === 'string' ? args.projectId : 'zeropoint-node'
      const uuid = computeContentUuid(content, projectId)
      return { uuid, content }
    }
    case 'zeropoint.verify': {
      const content = (args.content ?? {}) as Record<string, unknown> & { uuid?: string }
      const projectId = typeof args.projectId === 'string' ? args.projectId : 'zeropoint-node'
      return verifyContentUuid(content, projectId)
    }
    case 'zeropoint.digitalRoot': {
      const n = Number(args.n)
      const d = digitalRoot(n)
      return { summary: `digitalRoot(${n}) = ${d}`, n, digitalRoot: d }
    }
    case 'zeropoint.developmentVortex': {
      const wave = (typeof args.wave === 'string' ? args.wave : 'edit') as Parameters<
        typeof developmentVortex
      >[0]
      const dv = developmentVortex(wave)
      return {
        wave: dv.wave,
        computes: dv.computes,
        root: dv.root,
        lobeL: dv.lobeL,
        lobeR: dv.lobeR,
        throat: dv.throat.merged,
        gateways: dv.stroke.gateways,
      }
    }
    case 'zeropoint.criteria': {
      const samples = typeof args.samples === 'number' ? args.samples : 300
      const list = allCriteria(samples)
      const gated = list.filter((c) => c.gated)
      const unmet = gated.filter((c) => !c.verdict.met)
      return {
        summary: unmet.length === 0
          ? `all ${gated.length} gating criteria met (${list.filter((c) => !c.gated).length} reported, not gated)`
          : `${unmet.length} of ${gated.length} gating criteria NOT met: ${unmet.map((c) => c.name).join(', ')}`,
        measured: 'the real-time criterion times this machine; its verdict is not a property of the code alone',
        criteria: list.map((c) => ({
          name: c.name,
          subject: c.subject,
          gated: c.gated,
          measured: c.measured,
          met: `${c.verdict.conditionsMet}/${c.verdict.conditionsTotal}`,
          ...(args.conditions === true ? { conditions: c.verdict.conditions } : {}),
        })),
      }
    }
    case 'zeropoint.seals': {
      const names = Object.keys(SEALS)
      const one = typeof args.name === 'string' ? args.name : null
      if (one && !(one in SEALS)) {
        return { summary: `no seal named ${one}`, known: names }
      }
      const chosen = one ? [one] : names
      const rows = chosen.map((n) => ({ name: n, ...runSeal(n) }))
      const held = rows.filter((r) => r.seal === 'held').length
      return {
        summary: `${held} of ${rows.length} seal(s) hold`,
        axioms: Object.entries(ASSUMPTIONS).map(([name, a]) => ({
          name, statement: a.statement, whyUnsealed: a.why_unsealed, decidedInstead: a.what_is_decided_instead,
        })),
        seals: rows,
      }
    }
    case 'zeropoint.claims': {
      const all = Object.entries(LEDGER.claims)
      const filter = typeof args.backedBy === 'string' ? args.backedBy : null
      const rows = all
        .filter(([, e]) => !filter || e.backedBy === filter)
        .map(([key, e]) => {
          const at = key.indexOf('::')
          return {
            where: `${key.slice(0, at)}:${e.line}`,
            claim: key.slice(at + 2),
            backedBy: e.backedBy,
            establishes: e.establishes,
            doesNotEstablish: e.doesNotEstablish,
          }
        })
      const unbound = all.filter(([, e]) => !e.backedBy).length
      const byBinding: Record<string, number> = {}
      for (const [, e] of all) if (e.backedBy) byBinding[e.backedBy] = (byBinding[e.backedBy] ?? 0) + 1
      return {
        summary: `${all.length} effect claim(s); ${all.length - unbound} bound to a theorem or declared axiom, ${unbound} bound to nothing`
          + (filter ? ` — showing ${rows.length} bound to ${filter}` : ''),
        byBinding,
        claims: rows,
      }
    }
    case 'zeropoint.importGraph':
      return importExportGraphTip()
    case 'zeropoint.selfNext': {
      const tip = nextSelfDevelopTip()
      const sb = selfBuild()
      return {
        ...tip,
        selfBuild: {
          stalled: sb.stalled,
          reason: sb.reason,
          complete: sb.complete,
          vortexInvariantsHold: sb.vortexInvariantsHold,
        },
      }
    }
    default:
      throw new Error(`unknown tool: ${name}`)
  }
}

async function handle(msg: JsonRpc): Promise<string> {
  const method = msg.method
  if (method === 'initialize') {
    return result(msg.id, {
      protocolVersion: '2024-11-05',
      capabilities: { tools: {} },
      // Kept as a literal because this file is bundled to both ESM and CJS and
      // a runtime read of package.json resolves differently in each. It said
      // 1.0.0 while the package was 1.5.1 — the version an MCP client is told,
      // wrong by five minors, in the one surface that identifies this package
      // to other tools. mcp:smoke asserted only that serverInfo.name EXISTED,
      // so nothing compared it to anything. It now requires this string to
      // equal the version in package.json, which makes the copy held rather
      // than merely present.
      serverInfo: { name: 'zeropoint-node', version: '1.5.7' },
    })
  }
  if (method === 'notifications/initialized') {
    return ''
  }
  if (method === 'tools/list') {
    return result(msg.id, { tools: TOOLS })
  }
  if (method === 'tools/call') {
    const name = String(msg.params?.name ?? '')
    const args = (msg.params?.arguments ?? {}) as Record<string, unknown>
    try {
      const out = callTool(name, args)
      return result(msg.id, {
        content: [{ type: 'text', text: JSON.stringify(out, null, 2) }],
        structuredContent: out,
      })
    } catch (e) {
      return error(msg.id, e instanceof Error ? e.message : String(e))
    }
  }
  if (method === 'ping') {
    return result(msg.id, { ok: true, address: toUuid('zeropoint.mcp'), merge: merge('mcp', 'ping') })
  }
  return error(msg.id, `unsupported method: ${method}`, -32601)
}

const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: false })
rl.on('line', async (line) => {
  const trimmed = line.trim()
  if (!trimmed) return
  try {
    const msg = JSON.parse(trimmed) as JsonRpc
    const out = await handle(msg)
    if (out) process.stdout.write(out + '\n')
  } catch (e) {
    process.stdout.write(error(null, e instanceof Error ? e.message : String(e), -32700) + '\n')
  }
})
