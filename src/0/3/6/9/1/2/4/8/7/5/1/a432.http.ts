/**
 * The bit of express this repository actually used, over node:http.
 *
 * a432.server.ts was the last dependency on a third-party runtime package. It
 * used six app methods, seven response methods, two middleware factories and
 * five request properties — a bounded surface, measured before it was written
 * rather than guessed:
 *
 *   app      get post put delete use listen
 *   res      status json send setHeader type write sendFile
 *   req      params body query url path on
 *   express  json static
 *
 * Nothing else. So this implements exactly that and nothing else, and a route
 * reaching for anything beyond it fails at the type level rather than at
 * runtime in a consumer's process.
 *
 * WHY NOT KEEP EXPRESS. It was declared an optional peer dependency, which is
 * honest but means the server silently does not exist for anyone who did not
 * install it. A package whose one HTTP surface is conditional on a peer nobody
 * is told to add is a surface that is not really shipped.
 *
 * THE ROUTER IS DELIBERATELY LITERAL. Express's path syntax is large and its
 * edge cases are subtle; reimplementing it in general would be a second
 * codebase to be wrong in. Two forms are supported because two forms are used:
 * a `:name` segment, and the express-5 `{*name}` wildcard that a432.server.ts
 * uses once to serve TypeScript sources. Anything else in a path is matched
 * literally, and an unsupported construct is rejected when the route is
 * REGISTERED, not when it is first requested — a route that never matches
 * because its pattern was misread is the failure this guards.
 */
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize, resolve, sep } from 'node:path'

export interface A432Request {
  readonly method: string
  readonly url: string
  readonly path: string
  readonly query: Record<string, string>
  readonly params: Record<string, string>
  /**
   * Loosely typed exactly as express types it. The routes read shaped
   * fields straight off a parsed JSON body, and narrowing here would put a
   * cast at every call site without making any of them safer — the body is
   * whatever the client sent, and that is the honest type.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any
  readonly headers: Record<string, string | string[] | undefined>
  on(event: string, listener: (...args: never[]) => void): void
}

export interface A432Response {
  status(code: number): A432Response
  json(value: unknown): void
  send(value: string | Buffer): void
  setHeader(name: string, value: string): void
  type(contentType: string): A432Response
  write(chunk: string): void
  end(chunk?: string): void
  sendFile(absolutePath: string): void
  /** Per-request scratch space, as express provides. */
  readonly locals: Record<string, unknown>
  readonly writableEnded: boolean
}

// express passes next() to route handlers too, and one route here takes it
// to fall through to the static layer when a source file is absent.
export type Handler = (req: A432Request, res: A432Response, next: () => void) => unknown
export type Middleware = (req: A432Request, res: A432Response, next: () => void) => void

/** Content types for the extensions this server actually serves. */
const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.cjs': 'text/javascript; charset=utf-8',
  '.ts': 'text/plain; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
}

/**
 * ONE ORDERED STACK, NOT MIDDLEWARE-THEN-ROUTES.
 *
 * The first version of this ran every middleware first and then the routes,
 * which is a different server. a432.server.ts registers a terminal
 * `app.use(...)` at the END as its 404 fallback, and under middleware-first
 * that fallback runs before any route matches and answers 404 to everything.
 * Express interleaves in REGISTRATION ORDER and so does this: layers are
 * appended as they are declared and walked in that order, each free to end the
 * response or call next().
 */
type Layer =
  | { kind: 'route'; method: string; pattern: string; match: (path: string) => Record<string, string> | null; handler: Handler }
  | { kind: 'use'; prefix: string; fn: Middleware }

/**
 * Compile one path pattern.
 *
 * Returns a matcher, or throws if the pattern uses a construct this router does
 * not implement — refusing at registration rather than serving 404s for a route
 * the author believed was live.
 */
export function compilePath(pattern: string): (path: string) => Record<string, string> | null {
  // The express-5 wildcard, e.g. '/{*path}.ts'
  const wildcard = pattern.match(/^(.*)\{\*([A-Za-z_]\w*)\}(.*)$/)
  if (wildcard) {
    const [, before, name, after] = wildcard
    return (path) => {
      if (!path.startsWith(before!) || !path.endsWith(after!)) return null
      const middle = path.slice(before!.length, path.length - after!.length)
      if (middle.length === 0) return null
      return { [name!]: middle }
    }
  }
  if (pattern.includes('*') || pattern.includes('{') || pattern.includes('(')) {
    throw new Error(`a432.http: unsupported path pattern ${pattern} — this router implements ':name' and '{*name}' only`)
  }
  const parts = pattern.split('/')
  return (path) => {
    const got = path.split('/')
    if (got.length !== parts.length) return null
    const params: Record<string, string> = {}
    for (let i = 0; i < parts.length; i += 1) {
      const p = parts[i]!
      if (p.startsWith(':')) {
        if (got[i]! === '') return null
        params[p.slice(1)] = decodeURIComponent(got[i]!)
      } else if (p !== got[i]) return null
    }
    return params
  }
}

/** Parse a JSON request body. The only body format these routes accept. */
export function jsonBody(): Middleware {
  return (req, res, next) => {
    if (req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'PATCH') { next(); return }
    const raw = req as unknown as { _raw?: IncomingMessage }
    const stream = raw._raw
    if (!stream) { next(); return }
    let data = ''
    stream.on('data', (chunk: Buffer) => { data += chunk.toString('utf8') })
    stream.on('end', () => {
      if (data.length === 0) { (req as { body: unknown }).body = undefined; next(); return }
      try {
        (req as { body: unknown }).body = JSON.parse(data)
      } catch {
        // A malformed body is the CLIENT's error and must not read as an empty
        // one — express's json() answers 400 here and so does this.
        res.status(400).json({ error: 'invalid JSON body' })
        return
      }
      next()
    })
  }
}

/**
 * Serve files beneath one directory.
 *
 * The path is resolved and required to stay inside the root. Without that a
 * request for `../../etc/passwd` reads whatever the process can read, which is
 * the one bug in a static handler that matters.
 */
export function staticDir(root: string, options?: { setHeaders?: (res: A432Response, filePath: string) => void }): Middleware {
  const base = resolve(root)
  return (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') { next(); return }
    const rel = decodeURIComponent(req.path).replace(/^\/+/, '')
    const full = resolve(base, normalize(rel))
    if (full !== base && !full.startsWith(base + sep)) { next(); return }
    if (!existsSync(full)) { next(); return }
    const st = statSync(full)
    const file = st.isDirectory() ? join(full, 'index.html') : full
    if (!existsSync(file) || statSync(file).isDirectory()) { next(); return }
    // express calls setHeaders BEFORE streaming, so a Content-Type set here
    // wins over the one sendFile would infer from the extension.
    options?.setHeaders?.(res, file)
    res.sendFile(file)
  }
}

export interface A432App {
  get(path: string, handler: Handler): void
  post(path: string, handler: Handler): void
  put(path: string, handler: Handler): void
  delete(path: string, handler: Handler): void
  use(middlewareOrPath: Middleware | string, maybeMiddleware?: Middleware): void
  listen(port: number, onReady?: () => void): ReturnType<typeof createServer>
  /** Exposed so a route table can be asserted without starting a server. */
  readonly routes: readonly { method: string; pattern: string }[]
  handle(req: IncomingMessage, res: ServerResponse): void
}

export function createApp(): A432App {
  const layers: Layer[] = []

  const add = (method: string, pattern: string, handler: Handler) => {
    layers.push({ kind: 'route', method, pattern, match: compilePath(pattern), handler })
  }

  const respond = (raw: ServerResponse): A432Response => {
    let code = 200
    const res: A432Response = {
      status(c) { code = c; return res },
      setHeader(name, value) { raw.setHeader(name, value) },
      type(contentType) { raw.setHeader('Content-Type', contentType); return res },
      json(value) {
        raw.statusCode = code
        if (!raw.getHeader('Content-Type')) raw.setHeader('Content-Type', 'application/json; charset=utf-8')
        raw.end(JSON.stringify(value))
      },
      send(value) {
        raw.statusCode = code
        if (!raw.getHeader('Content-Type')) raw.setHeader('Content-Type', 'text/html; charset=utf-8')
        raw.end(value)
      },
      write(chunk) { raw.statusCode = code; raw.write(chunk) },
      end(chunk) { raw.statusCode = code; raw.end(chunk) },
      sendFile(absolutePath) {
        if (!existsSync(absolutePath)) { raw.statusCode = 404; raw.end('Not Found'); return }
        raw.statusCode = code
        if (!raw.getHeader('Content-Type')) {
          raw.setHeader('Content-Type', MIME[extname(absolutePath).toLowerCase()] ?? 'application/octet-stream')
        }
        createReadStream(absolutePath).pipe(raw)
      },
      locals: {},
      get writableEnded() { return raw.writableEnded },
    }
    return res
  }

  const handle = (rawReq: IncomingMessage, rawRes: ServerResponse) => {
    const url = rawReq.url ?? '/'
    const qIndex = url.indexOf('?')
    const pathname = qIndex < 0 ? url : url.slice(0, qIndex)
    const query: Record<string, string> = {}
    if (qIndex >= 0) {
      for (const [k, v] of new URLSearchParams(url.slice(qIndex + 1))) query[k] = v
    }
    const req = {
      method: rawReq.method ?? 'GET',
      url,
      path: pathname,
      query,
      params: {} as Record<string, string>,
      body: undefined as unknown,
      headers: rawReq.headers,
      on: (event: string, listener: (...args: never[]) => void) => rawReq.on(event, listener as never),
      _raw: rawReq,
    }
    const res = respond(rawRes)

    const fail = (err: unknown) => {
      if (!res.writableEnded) res.status(500).json({ error: String((err as Error)?.message ?? err) })
    }

    let i = 0
    const next = () => {
      if (res.writableEnded) return
      while (i < layers.length) {
        const layer = layers[i]!
        i += 1
        if (layer.kind === 'use') {
          if (layer.prefix !== '/' && !pathname.startsWith(layer.prefix)) continue
          // A MOUNTED HANDLER SEES THE PATH WITHOUT ITS MOUNT PREFIX.
          //
          // express strips the prefix before calling a mounted middleware, so
          // `app.use('/canon', static(dir))` serves dir/thing.txt for
          // /canon/thing.txt. Passing the full path instead makes the static
          // handler look for dir/canon/thing.txt and 404 every mounted file —
          // which is what this did until a test asked for one.
          const mounted = layer.prefix !== '/'
          const inner = mounted ? (pathname.slice(layer.prefix.length) || '/') : pathname
          const view = mounted
            ? { ...(req as object), path: inner, url: inner } as unknown as A432Request
            : (req as unknown as A432Request)
          try { layer.fn(view, res, next) } catch (err) { fail(err) }
          return
        }
        if (layer.method !== req.method) continue
        const params = layer.match(pathname)
        if (!params) continue
        ;(req as { params: Record<string, string> }).params = params
        try {
          // An async handler that rejects must answer 500, not hang the socket
          // until the client times out.
          const out = layer.handler(req as unknown as A432Request, res, next)
          if (out instanceof Promise) out.catch(fail)
        } catch (err) { fail(err) }
        return
      }
      // Nothing claimed it. Express would 404 here and so does this — but a
      // server that registers its own terminal app.use never reaches this.
      if (!res.writableEnded) { rawRes.statusCode = 404; rawRes.end('Not Found') }
    }

    next()
  }

  return {
    get: (p, h) => add('GET', p, h),
    post: (p, h) => add('POST', p, h),
    put: (p, h) => add('PUT', p, h),
    delete: (p, h) => add('DELETE', p, h),
    use: (a, b) => {
      if (typeof a === 'string') layers.push({ kind: 'use', prefix: a, fn: b! })
      else layers.push({ kind: 'use', prefix: '/', fn: a })
    },
    listen: (port, onReady) => createServer(handle).listen(port, onReady),
    get routes() { return layers.filter((l) => l.kind === 'route').map((l) => ({ method: (l as { method: string }).method, pattern: (l as { pattern: string }).pattern })) },
    handle,
  }
}
