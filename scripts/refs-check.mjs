#!/usr/bin/env node
/**
 * A comment that names a script or a file must name one that exists.
 *
 * The ratchet's surface label named a companion gate, and the paragraph above
 * it named a companion script. Neither existed. The functionality was real —
 * coverage-audit does it — but the pointers were not, so a reader following the
 * correction to a documented misreading arrived nowhere, and nothing in a gate
 * of 27 checkers noticed. The dead names are not written out here: this file
 * would then report itself, which is how it found the same mistake in the
 * comment that explained the deployment fix.
 *
 * readme:names does this for README.md. Comments in scripts/ and src/ are the
 * same kind of claim and had no equivalent: this repository explains itself in
 * long comments that name commands and files constantly, and every one of those
 * names can go stale when something is renamed.
 *
 * Comments are read from the SCANNER, not matched in the text, so a path inside
 * a string literal is not mistaken for a reference — several scripts build file
 * paths at runtime and those are the compiler's business, not this check's.
 *
 * `npm run <name>` is also read from STRING LITERALS, and that asymmetry is
 * deliberate. The defect that prompted this check was in two places: a comment,
 * and the ratchet's own surface LABEL, which is a string and is the half a user
 * actually sees printed. Re-breaking the label did not fail the first version
 * of this check, which is the whole point of trying. A path in a string may be
 * assembled at runtime; a command in a string is being shown to someone.
 *
 * Two kinds of reference are resolved: an `npm run` command must be a script in
 * package.json, and a path under scripts/, src/ or docs/ must exist on disk.
 *
 * A name that genuinely should not resolve — an example, a command from another
 * project — goes in ALLOWED below with its reason.
 *
 *   npm run refs:check
 */

import ts from 'typescript'
import { readFileSync, existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const scripts = new Set(Object.keys(pkg.scripts ?? {}))

/**
 * References that are examples rather than claims about this repository. Each
 * one is a command deliberately chosen NOT to exist, in a comment explaining
 * what happens when it does not.
 */
const ALLOWED = new Set([
  'npm run x',          // docs-commands usage line
  'npm run nonsense',   // docs-commands: the bogus command its checker catches
  'npm run test:suites', // pipeline: the runner it warns against creating
])

const files = execSync('git ls-files "*.ts" "*.mjs" "*.js"', { cwd: ROOT, encoding: 'utf8' })
  .trim().split('\n').filter(Boolean).filter((f) => !f.includes('node_modules'))

/** Every comment in a file, from the scanner. */
function commentsOf(text) {
  const out = []
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.Standard, text)
  let kind
  while ((kind = scanner.scan()) !== ts.SyntaxKind.EndOfFileToken) {
    if (kind === ts.SyntaxKind.SingleLineCommentTrivia || kind === ts.SyntaxKind.MultiLineCommentTrivia) {
      out.push([scanner.getTokenText(), text.slice(0, scanner.getTokenStart()).split('\n').length])
    }
  }
  return out
}

/** Every string and template literal, for the command references inside them. */
function stringsOf(file, text) {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS)
  const out = []
  sf.forEachChild(function visit(n) {
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n) || ts.isTemplateHead(n) ||
        ts.isTemplateMiddle(n) || ts.isTemplateTail(n)) {
      out.push([n.text, sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1])
    }
    ts.forEachChild(n, visit)
  })
  return out
}

const SCRIPT_REF = /\bnpm run ([a-z0-9]+(?::[a-z0-9-]+)*)/g
// A bare gate name is how this repository refers to its own checks in prose:
// the label that prompted this file said "see <gate>" with no `npm run` in
// front of it, so the prefixed pattern above could never have caught the defect
// this file exists for. Only the :check suffix is matched, because that is the
// one convention used consistently enough — 25 of 124 scripts — that a token in
// that shape is a reference rather than a word followed by a colon.
//
// The lookbehind is not decoration. Without it a three-part gate name matches
// at its last two parts and is reported missing, because only the whole name is
// a script. That produced seven false findings on the first run.
//
// Neither of those examples is written out, here or anywhere in this file. A
// check that forbids naming things which do not exist cannot name the things it
// was built for, and it caught its own header twice before this sentence.

const BARE_CHECK_REF = /(?<![\w:.-])([a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*:check)\b/g
// An elided path — src/.../a432.rodin.ts — is a way of writing, not a claim
// that the file is at that path, so `...` and `..` disqualify a match.
const PATH_REF = /\b((?:scripts|src|docs)\/[A-Za-z0-9._/-]+\.(?:ts|mjs|js|md|json))\b/g
const ELIDED = /(^|\/)\.\.?(\.|\/)/

const problems = []
let refs = 0
for (const f of files) {
  let text
  try { text = readFileSync(join(ROOT, f), 'utf8') } catch { continue }
  for (const [comment, line] of commentsOf(text)) {
    for (const m of comment.matchAll(SCRIPT_REF)) {
      const name = m[1]
      refs++
      if (ALLOWED.has(`npm run ${name}`) || scripts.has(name)) continue
      problems.push(`${f}:${line} names \`npm run ${name}\`, which package.json does not define`)
    }
    for (const m of comment.matchAll(BARE_CHECK_REF)) {
      const name = m[1]
      refs++
      if (ALLOWED.has(name) || scripts.has(name)) continue
      problems.push(`${f}:${line} names "${name}", which package.json does not define`)
    }
    for (const m of comment.matchAll(PATH_REF)) {
      const p = m[1]
      refs++
      if (ELIDED.test(p)) continue
      if (ALLOWED.has(p) || existsSync(join(ROOT, p))) continue
      problems.push(`${f}:${line} names ${p}, which does not exist`)
    }
  }
  for (const [str, line] of stringsOf(f, text)) {
    for (const m of str.matchAll(SCRIPT_REF)) {
      const name = m[1]
      refs++
      if (ALLOWED.has(`npm run ${name}`) || scripts.has(name)) continue
      problems.push(`${f}:${line} prints \`npm run ${name}\`, which package.json does not define`)
    }
    for (const m of str.matchAll(BARE_CHECK_REF)) {
      const name = m[1]
      refs++
      if (ALLOWED.has(name) || scripts.has(name)) continue
      problems.push(`${f}:${line} prints "${name}", which package.json does not define`)
    }
  }
}

console.log(`refs:check — ${refs} reference(s) in comments across ${files.length} file(s)`)
for (const p of problems) console.error(`  ✗ ${p}`)
if (problems.length > 0) {
  console.error(`refs:check FAIL — ${problems.length} comment(s) name something that is not there`)
  process.exit(1)
}
console.log('refs:check ok — every script and file a comment names exists')
