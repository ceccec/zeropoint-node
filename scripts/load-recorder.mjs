/**
 * A loader hook that records every src/ module actually resolved at run time.
 *
 * Static reachability cannot see a dynamic import, and this repository's a432
 * property suite reaches its 198 modules by walking the directory and calling
 * import() on each. So "reachable from no entry" and "never executed" are two
 * different sets, and only the second one means dead weight.
 *
 * Registered via --import, it appends resolved paths to $ZP_LOAD_LOG.
 */
import { appendFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const LOG = process.env.ZP_LOAD_LOG

export async function resolve(specifier, context, next) {
  const result = await next(specifier, context)
  if (LOG && result?.url?.startsWith('file:')) {
    try {
      const p = fileURLToPath(result.url)
      if (p.includes('/src/') && p.endsWith('.ts')) appendFileSync(LOG, p + '\n')
    } catch { /* not a path we can record */ }
  }
  return result
}
