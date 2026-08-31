#!/usr/bin/env node
/**
 * readme-examples — every code example in the README must actually run.
 *
 * 1.0.13 shipped a broken quick start. The fix at the time was to check that
 * release by hand, which is not a fix. This runs them.
 *
 * The examples import from 'zeropoint-node', so the specifiers are resolved
 * through the package's OWN exports map to the built files in dist/ — the same
 * resolution a consumer gets. Pointing them at src/ would pass while the
 * published package failed, which is exactly the mistake that shipped 1.0.13:
 * verifying against a local directory does not reproduce what npm installs.
 *
 * Named ESM imports throw when the export is missing, so a block that imports
 * a name the package does not have fails here rather than yielding undefined.
 * That is the 1.0.13 failure mode, and it is now the loud one.
 *
 *   npm run readme:examples          run every example
 *   npm run readme:examples --list   show what would run
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const readme = readFileSync(join(ROOT, 'README.md'), 'utf8')
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))

/** 'zeropoint-node/security' -> the built ESM file its exports map names. */
function resolveSpecifier(spec) {
  if (spec === 'zeropoint-node') spec = 'zeropoint-node/.'
  if (!spec.startsWith('zeropoint-node')) return null
  const subpath = spec === 'zeropoint-node/.' ? '.' : '.' + spec.slice('zeropoint-node'.length)
  const entry = pkg.exports?.[subpath]
  const target = typeof entry === 'string' ? entry : entry?.import
  if (!target) return null
  return pathToFileURL(join(ROOT, target)).href
}

const blocks = []
for (const m of readme.matchAll(/```(typescript|ts|javascript|js)\n([\s\S]*?)```/g)) {
  const line = readme.slice(0, m.index).split('\n').length + 1
  const body = m[2]
  if (!/from\s+['"]zeropoint-node/.test(body)) continue // not a consumer example
  blocks.push({ line, body })
}

const args = process.argv.slice(2)
if (args.includes('--list')) {
  for (const b of blocks) console.log(`  README:${b.line}  ${b.body.trim().split('\n')[0].slice(0, 60)}`)
  process.exit(0)
}

const tmp = join(ROOT, '.readme-examples')
rmSync(tmp, { recursive: true, force: true })
mkdirSync(tmp, { recursive: true })

let failures = 0
for (const b of blocks) {
  let unresolved = null
  const rewritten = b.body.replace(/(from\s+)['"](zeropoint-node[^'"]*)['"]/g, (whole, from, spec) => {
    const url = resolveSpecifier(spec)
    if (!url) { unresolved = spec; return whole }
    return `${from}'${url}'`
  })
  if (unresolved) {
    failures++
    console.error(`  ✗ README:${b.line} imports from ${unresolved}, which the exports map does not declare`)
    continue
  }
  // Examples start long-running things (an OS with timers). Exit when the
  // block finishes rather than waiting for the event loop to drain.
  const file = join(tmp, `example-${b.line}.mjs`)
  writeFileSync(file, rewritten + '\nprocess.exit(0)\n')
  try {
    execFileSync('node', [file], { cwd: ROOT, stdio: 'pipe', timeout: 60_000 })
    console.log(`  ok  README:${b.line}`)
  } catch (e) {
    failures++
    // The useful line is the error itself, not the stack frames after it.
    // Taking the last three lines showed 'at async onImport...' and hid
    // "does not provide an export named 'boot2432OS'", which is the whole
    // diagnosis.
    const lines = (e.stderr?.toString() || e.message || '').trim().split('\n').filter(Boolean)
    const detail = lines.find((l) => /does not provide an export|is not defined|Cannot find|Error:/.test(l))
      ?? lines[0] ?? 'no output'
    console.error(`  ✗ README:${b.line} — ${detail.slice(0, 220)}`)
  }
}
rmSync(tmp, { recursive: true, force: true })

console.log(`readme:examples — ${blocks.length} consumer example(s) executed against the built package`)
if (failures > 0) {
  console.error(`readme:examples FAIL — ${failures} example(s) a reader would copy do not run`)
  process.exit(1)
}
console.log('readme:examples ok — every example in the README runs as written')
process.exit(0)
