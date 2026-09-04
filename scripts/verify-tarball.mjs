/**
 * Verify a PUBLISHED version against the registry tarball, not against this
 * working tree and not against `npm view`.
 *
 * `npm view` reports the registry's metadata document. The tarball is the thing
 * a consumer actually receives, and the only artefact whose contents can be
 * checked. Everything below is recomputed INSIDE the extracted package.
 *
 *   node scripts/verify-tarball.mjs [version]
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const VERSION = process.argv[2] ?? 'latest'
const NAME = 'zeropoint-node'

const doc = JSON.parse(execFileSync('curl', ['-s', '--max-time', '30', `https://registry.npmjs.org/${NAME}`], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }))
const version = VERSION === 'latest' ? doc['dist-tags'].latest : VERSION
if (!doc.versions[version]) {
  console.error(`verify-tarball — ${NAME}@${version} is NOT on the registry. Nothing to verify; this is not a pass.`)
  process.exit(1)
}
const dist = doc.versions[version].dist
console.log(`verify-tarball — ${NAME}@${version}`)
console.log(`  published   ${doc.time[version]}`)
console.log(`  tarball     ${dist.tarball}`)
console.log(`  integrity   ${dist.integrity ?? dist.shasum}`)

const dir = mkdtempSync(join(tmpdir(), 'tarball-'))
try {
  execFileSync('curl', ['-s', '--max-time', '120', '-o', join(dir, 'p.tgz'), dist.tarball])
  execFileSync('tar', ['xzf', join(dir, 'p.tgz'), '-C', dir])
  const P = join(dir, 'package')
  const pkg = JSON.parse(readFileSync(join(P, 'package.json'), 'utf8'))

  const rows = []
  const say = (label, value) => rows.push([label, String(value)])
  say('version in the tarball', pkg.version)
  say('runtime dependencies', Object.keys(pkg.dependencies ?? {}).length)
  say('optional peers', Object.entries(pkg.peerDependenciesMeta ?? {}).filter(([, v]) => v.optional).map(([k]) => k).join(', ') || 'none')
  say('entry points declared', Object.keys(pkg.exports ?? {}).length)

  // recomputed inside the extracted package
  const probe = `
import * as v from ${JSON.stringify(join(P, 'src/verification/index.ts'))}
const seals = Object.keys(v.SEALS)
const fell = []
for (const s of seals) { let r; try { r = v.runSeal(s).seal } catch { r = 'threw' } ; if (r !== 'held') fell.push(s) }
const led = ${JSON.stringify(join(P, 'lean/ledger.json'))}
console.log(JSON.stringify({ seals: seals.length, fell, axioms: Object.keys(v.ASSUMPTIONS ?? {}).length }))
`
  try {
    const out = execFileSync(process.execPath, ['--experimental-strip-types', '--input-type=module', '--eval', probe],
      { encoding: 'utf8', cwd: P, timeout: 300_000 })
    const r = JSON.parse(out.trim().split('\n').pop())
    say('seals in the tarball', `${r.seals}, ${r.fell.length} falling`)
    say('axioms recorded', r.axioms)
  } catch (e) {
    say('seals in the tarball', `COULD NOT RUN — ${String(e.stderr ?? e.message).split('\n')[0].slice(0, 80)}`)
  }

  for (const [rel, label] of [['lean/ledger.json', 'lean ledger'], ['src/verification/constrained.json', 'constrained census'],
                              ['src/verification/seal-pinning.json', 'seal pinning'], ['src/verification/derivation.json', 'derivation']]) {
    const f = join(P, rel)
    if (!existsSync(f)) { say(label, 'ABSENT from the tarball'); continue }
    const j = JSON.parse(readFileSync(f, 'utf8'))
    if (rel.endsWith('ledger.json')) say(label, `${j.proven} proven of ${j.theorems}`)
    else if (rel.includes('constrained')) say(label, `${j.reachability.unreachable}/${j.reachability.exportedValues} unreachable; ${j.literalCensus.forced} forced, ${j.literalCensus.free} free`)
    else if (rel.includes('pinning')) say(label, JSON.stringify(j.tally))
    else say(label, Object.entries(j.columns).map(([k, x]) => `${k}:${x.status}`).join(' '))
  }

  const paper = join(P, 'docs/public/paper.html')
  say('paper.html shipped', existsSync(paper))
  if (existsSync(paper)) {
    const h = readFileSync(paper, 'utf8')
    say('  outbound DOI links', (h.match(/href="https:\/\/doi\.org\//g) ?? []).length)
    say('  bold claims', (h.match(/<li><strong>/g) ?? []).length)
  }
  for (const [l, v2] of rows) console.log(`  ${l.padEnd(26)} ${v2}`)
} finally { rmSync(dir, { recursive: true, force: true }) }
