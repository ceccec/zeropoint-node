// a432.i.init.ts — Auto-import all I-modules to ensure registration
// Node-only guard; in browser, modules are bundled explicitly.
//
// `require` does not exist in ESM, and package.json declares "type": "module",
// so the old `typeof require !== 'undefined'` guard was permanently false in
// Node and permanently true under the CommonJS-scoped probe that used to
// measure this file. createRequire gives a real one bound to this module.

import { createRequire } from 'node:module'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

if (typeof import.meta.dirname !== 'undefined') {
  const require_ = createRequire(import.meta.url)
  const dir = import.meta.dirname
  readdirSync(dir)
    .filter(
      (f: string) =>
        f.startsWith('a432.i.') &&
        f.endsWith('.ts') &&
        !f.includes('.test') &&
        f !== 'a432.i.init.ts',
    )
    .forEach((file: string) => {
      try {
        require_(join(dir, file))
      } catch {
        /* ignore */
      }
    })
}
