#!/usr/bin/env node
/**
 * Thin stdio MCP — math ops over the kernel (ceccec.github.io pattern, slim).
 * Tools: fold, vortex, contentUuid, verify, digitalRoot, developmentVortex.
 */

import { createInterface } from 'node:readline'
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
    name: 'zeropoint.selfNext',
    description:
      'Next self-develop tip from planTrinity/audit. If development stops, gaps in self-development exist.',
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

function callTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case 'zeropoint.fold': {
      const a = String(args.a ?? '')
      const b = args.b !== undefined ? String(args.b) : a
      const f = fold(a, b)
      const receipt = appendReceipt(GENESIS_PREV, 'fold', { a, b, merged: f.merged })
      return { fold: f, vortex: asVortex(f), receipt }
    }
    case 'zeropoint.vortex': {
      const v = foldVortex()
      const stroke = vortexStrokeGateways()
      return { foldVortex: v, stroke }
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
      return { n: Number(args.n), digitalRoot: digitalRoot(Number(args.n)) }
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
          physicalFtl: sb.physicalFtl,
          claySolved: sb.claySolved,
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
      serverInfo: { name: 'zeropoint-node', version: '1.0.0' },
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
