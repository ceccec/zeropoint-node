/**
 * The router is only worth having if it behaves like the thing it replaced.
 *
 * Each case here is a semantic a432.server.ts actually depends on, and two of
 * them were WRONG in the first draft: middleware ran before routes, which turns
 * a terminal 404 fallback into a 404 for everything; and a mounted static
 * handler saw the full path instead of the path with its mount prefix removed,
 * so every mounted file 404'd. Both are invisible until something asks.
 *
 *   node --experimental-strip-types src/0/3/6/9/1/2/4/8/7/5/1/a432.http.test.ts
 */
import { createApp, compilePath, staticDir, jsonBody } from './a432.http.ts'
import { createServer } from 'node:http'
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const results: string[] = []
const failures: string[] = []
const check = (name: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got) === JSON.stringify(want)
  results.push(`  ${ok ? '✓' : '✗'} ${name}${ok ? '' : `  got ${JSON.stringify(got)} want ${JSON.stringify(want)}`}`)
  if (!ok) failures.push(name)
}

// ── path compilation ────────────────────────────────────────────────────────
check('a literal path matches itself', compilePath('/core')('/core'), {})
check('a literal path rejects another', compilePath('/core')('/other'), null)
check(':id captures one segment', compilePath('/1/:id')('/1/42'), { id: '42' })
check(':id does not match a missing segment', compilePath('/1/:id')('/1/'), null)
check(':id does not match two segments', compilePath('/1/:id')('/1/4/2'), null)
check(':id is percent-decoded', compilePath('/1/:id')('/1/a%20b'), { id: 'a b' })
check('{*path} captures the rest', compilePath('/{*path}.ts')('/a432/math.ts'), { path: 'a432/math' })
check('{*path} needs something to capture', compilePath('/{*path}.ts')('/.ts'), null)
try {
  compilePath('/a/(b|c)')
  check('an unsupported pattern is refused at registration', 'accepted', 'threw')
} catch {
  check('an unsupported pattern is refused at registration', 'threw', 'threw')
}

// ── ordering, which the first draft got wrong ───────────────────────────────
{
  const app = createApp()
  const seen: string[] = []
  app.use((_req, _res, next) => { seen.push('early-middleware'); next() })
  app.get('/hit', (_req, res) => { seen.push('route'); res.json({ ok: true }) })
  app.use((_req, res) => { seen.push('terminal-404'); res.status(404).json({ error: 'not found' }) })

  const call = async (path: string) => {
    const chunks: string[] = []
    let code = 0
    const res = {
      statusCode: 0, writableEnded: false,
      setHeader() {}, getHeader() { return undefined },
      write(c: string) { chunks.push(c) },
      end(c?: string) { if (c) chunks.push(c); code = this.statusCode; this.writableEnded = true },
    }
    app.handle({ url: path, method: 'GET', headers: {}, on() {} } as never, res as never)
    await new Promise((r) => setImmediate(r))
    return { code, body: chunks.join('') }
  }

  seen.length = 0
  const hit = await call('/hit')
  check('a matching route wins over a later terminal use()', JSON.parse(hit.body), { ok: true })
  check('the terminal fallback did not run for a matched route', seen, ['early-middleware', 'route'])

  seen.length = 0
  const miss = await call('/nothing-here')
  check('an unmatched path reaches the terminal fallback', JSON.parse(miss.body), { error: 'not found' })
  check('the fallback 404 status is used', miss.code, 404)
}

// ── mounted static, the other thing the first draft got wrong ───────────────
{
  const dir = mkdtempSync(join(tmpdir(), 'a432-http-'))
  writeFileSync(join(dir, 'thing.txt'), 'served')
  const app = createApp()
  let typeSetFor = ''
  app.use('/canon', staticDir(dir, { setHeaders: (_res, p) => { typeSetFor = p } }))
  app.use((_req, res) => { res.status(404).end('miss') })

  const server = createServer(app.handle)
  await new Promise<void>((r) => server.listen(0, r))
  const port = (server.address() as { port: number }).port
  const mounted = await fetch(`http://127.0.0.1:${port}/canon/thing.txt`)
  const body = await mounted.text()
  check('a mounted static file is served with its prefix stripped', body, 'served')
  check('setHeaders was called for the served file', typeSetFor.endsWith('thing.txt'), true)

  const escape = await fetch(`http://127.0.0.1:${port}/canon/../../../etc/passwd`)
  check('a traversal out of the root is refused', escape.status, 404)

  server.close()
  rmSync(dir, { recursive: true, force: true })
}

// ── json body ───────────────────────────────────────────────────────────────
{
  const app = createApp()
  app.use(jsonBody())
  app.post('/echo', (req, res) => { res.json({ got: req.body }) })
  const server = createServer(app.handle)
  await new Promise<void>((r) => server.listen(0, r))
  const port = (server.address() as { port: number }).port

  const good = await fetch(`http://127.0.0.1:${port}/echo`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ a: 1 }),
  })
  check('a JSON body reaches the handler', await good.json(), { got: { a: 1 } })

  const bad = await fetch(`http://127.0.0.1:${port}/echo`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{not json',
  })
  check('a malformed body is 400, not a silent empty body', bad.status, 400)
  server.close()
}

// ── an async handler that rejects must answer, not hang ─────────────────────
{
  const app = createApp()
  app.get('/boom', async () => { throw new Error('deliberate') })
  const server = createServer(app.handle)
  await new Promise<void>((r) => server.listen(0, r))
  const port = (server.address() as { port: number }).port
  const r = await fetch(`http://127.0.0.1:${port}/boom`)
  check('a rejected async handler answers 500 rather than hanging', r.status, 500)
  server.close()
}

console.log('a432.http', failures.length === 0 ? 'ok' : 'FAIL')
for (const r of results) console.log(r)
if (failures.length > 0) {
  console.error(`a432.http FAIL — ${failures.length} of ${results.length}: ${failures.join(', ')}`)
  process.exit(1)
}
