#!/usr/bin/env node
/**
 * MCP tools/list + tools/call smoke (Wave 5/7 gate).
 *
 * IT RUNS THE BUILT SERVER WHEN ONE EXISTS, not only the source.
 *
 * This probed src/mcp/server.ts alone, and that is not what npm ships —
 * `zeropoint-mcp` is dist/mcp.cjs. A change that read a data file relative to
 * the module resolved correctly from src and pointed outside the package from
 * dist, so the published server died on startup with ENOENT while this smoke
 * test passed. The bin a consumer runs is the thing worth smoking.
 */

import { spawn } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
// Prefer the published bin; fall back to source when nothing is built yet.
const built = resolve(root, 'dist/mcp.cjs')
const useBuilt = existsSync(built)
const argv = useBuilt ? [built] : ['--experimental-strip-types', resolve(root, 'src/mcp/server.ts')]
const child = spawn(process.execPath, argv, { stdio: ['pipe', 'pipe', 'inherit'] })

let buf = ''
const replies = []

function send(obj) {
  child.stdin.write(JSON.stringify(obj) + '\n')
}

function waitReply(id, ms = 5000) {
  return new Promise((resolveP, reject) => {
    const t0 = Date.now()
    const tick = () => {
      const hit = replies.find((r) => r && r.id === id)
      if (hit) return resolveP(hit)
      if (Date.now() - t0 > ms) return reject(new Error(`timeout waiting for id=${id}`))
      setTimeout(tick, 20)
    }
    tick()
  })
}

child.stdout.setEncoding('utf8')
child.stdout.on('data', (chunk) => {
  buf += chunk
  let idx
  while ((idx = buf.indexOf('\n')) >= 0) {
    const line = buf.slice(0, idx).trim()
    buf = buf.slice(idx + 1)
    if (!line) continue
    try {
      replies.push(JSON.parse(line))
    } catch {
      /* ignore non-json */
    }
  }
})

async function main() {
  send({ jsonrpc: '2.0', id: 1, method: 'initialize', params: {} })
  const init = await waitReply(1)
  if (!init.result?.serverInfo?.name) throw new Error('initialize failed')

  // THE VERSION A CLIENT IS TOLD MUST BE THE VERSION IT INSTALLED.
  //
  // This checked only that serverInfo.name existed — a presence test, comparing
  // nothing to anything — while the server reported 1.0.0 for a package at
  // 1.5.1. Found by installing the published tarball into an empty directory
  // and asking the server who it was, which is the one question every MCP
  // client asks first and no gate here had ever asked.
  const pkgVersion = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')).version
  const said = init.result.serverInfo.version
  if (said !== pkgVersion) {
    throw new Error(`serverInfo.version is ${said} but package.json says ${pkgVersion}`
      + ' — src/mcp/server.ts carries a literal that has drifted')
  }

  send({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} })
  const list = await waitReply(2)
  const names = (list.result?.tools ?? []).map((t) => t.name)
  for (const need of [
    'zeropoint.fold',
    'zeropoint.vortex',
    'zeropoint.contentUuid',
    'zeropoint.verify',
    'zeropoint.digitalRoot',
    'zeropoint.selfNext',
  ]) {
    if (!names.includes(need)) throw new Error(`missing tool ${need}`)
  }

  send({
    jsonrpc: '2.0',
    id: 3,
    method: 'tools/call',
    params: { name: 'zeropoint.digitalRoot', arguments: { n: 0 } },
  })
  const call = await waitReply(3)
  const text = call.result?.content?.[0]?.text ?? ''
  if (!text.includes('"digitalRoot": 9')) throw new Error(`digitalRoot(0) expected 9, got ${text}`)

  console.log(JSON.stringify({ ok: true, ran: useBuilt ? 'dist/mcp.cjs (the published bin)' : 'src/mcp/server.ts', tools: names.length, digitalRoot0: 9 }))
  child.kill()
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  child.kill()
  process.exit(1)
})
