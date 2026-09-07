#!/usr/bin/env node
/**
 * Is this tree releasable? One command, and no agent in the loop.
 *
 * Cutting a release here had become a sequence somebody had to remember:
 * regenerate these records, in roughly this order, then run the chain, then
 * notice which generated file had drifted since, then regenerate again. I was
 * that somebody for a whole evening and got the order wrong repeatedly —
 * `constrained` drifted twice because I regenerated it and then edited a source
 * afterwards. Knowledge that lives in an operator is not part of the
 * repository, and a release that needs an assistant to sequence it cannot be
 * cut by the person who owns the package.
 *
 * So: `npm run regen` brings every generated artifact to a fixed point without
 * anyone declaring the order, `npm run check` verifies the result, and this
 * prints the verdict and the two commands that follow. Nothing here judges
 * anything — the gates already do, and this fails if any of them does.
 *
 *   npm run release:ready
 */
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))

/**
 * THE STAGES STREAM. Capturing their output and printing a summary at the end
 * turns a twenty-five minute run into something to wait on with nothing to
 * watch — and if it fails at minute twenty-four you learn that at minute
 * twenty-five. `stdio: 'inherit'` puts every gate's own words on the terminal
 * as it reaches them, which is what anybody running a release wants to see.
 */
const stage = (name, script) => {
  console.log(`\n  ── ${name} ${'─'.repeat(Math.max(0, 46 - name.length))}\n`)
  const started = Date.now()
  try {
    execFileSync('npm', ['run', script], { cwd: ROOT, stdio: 'inherit', timeout: 3_600_000 })
    console.log(`\n  ${name}: ok (${((Date.now() - started) / 1000).toFixed(0)}s)`)
    return true
  } catch {
    console.error(`\n  ${name}: FAILED (${((Date.now() - started) / 1000).toFixed(0)}s) — its own output is above`)
    return false
  }
}

console.log(`\n  ${pkg.name}@${pkg.version} — is this tree releasable?\n`)

if (!stage('regenerate to fixed point', 'regen')) {
  console.error('\nrelease:ready FAIL — the generated artifacts do not converge; nothing to release yet')
  process.exit(1)
}
if (!stage('every gate', 'check')) {
  console.error('\nrelease:ready FAIL — a gate refused. No release is cut, which is the gate doing its job.')
  process.exit(1)
}

console.log(`
release:ready ok — ${pkg.name}@${pkg.version} passes every gate with every artifact current.

  Two commands remain, and neither needs this tool or any assistant:

    npm version patch     reseals CITATION.cff, .zenodo.json, the README block and
                          the MCP server's version literal, opens a CHANGELOG
                          heading, and creates the matching v* tag
    git push --follow-tags

  The tag triggers .github/workflows/publish.yml, which runs this same chain
  again before publishing over OIDC. No token is held anywhere in this tree.`)
