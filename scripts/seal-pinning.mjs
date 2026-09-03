/**
 * seal:pinning — does a seal fix a value, or derive one?
 *
 * A seal that works by holding the expected answer as a literal —
 * `gateways.join(',') === '8,3,9,0'` — falls the moment the value changes, for a
 * CONVENTION exactly as readily as for a law. It is a pinned expectation. That
 * is not worthless: it catches drift, and drift is most of what goes wrong. But
 * it is not evidence that the arithmetic forces the value, and reading it as
 * such is how a table ends up claiming `derived` for something nothing derives.
 *
 * This was found the expensive way. The derivation harness reported the gateway
 * column as derived; its only falling predicate contained `'8,3,9,0'`. One
 * instance is not a pattern, but the prior here is HIGH rather than low, because
 * fixing a value is what a seal is FOR. A peer session measured the same
 * property across 473 cross-checks in a corpus built the other way and found one
 * — the architectures differ, not the care. So the 32 seals are asked directly.
 *
 * HOW IT ASKS. The TypeScript AST, not a regex: every comparison inside each
 * `decide` is read, and each side classified as a literal or a computation.
 *
 *   at least one computation-vs-computation comparison  ->  structural
 *   comparisons, but every one against a literal        ->  pinned
 *   no comparison at all                                ->  neither, and named
 *
 * WHAT IT CANNOT SEE. A predicate can pin a value without spelling it out:
 * `VORTEX_DASH_ANGLE_DEG === 60` pins a constant without naming what it
 * produces, and a comparison against an imported constant reads as structural
 * here. So `structural` means "not pinned in a way this can see" and the count
 * of pinned seals is a LOWER bound. The error runs against the flattering
 * reading, which is the only honest direction for a blunt instrument.
 *
 *   npm run seal:pinning
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import ts from 'typescript'

const ROOT = join(import.meta.dirname, '..')
const SRC = join(ROOT, 'src/verification/lean-bridge.ts')
const LEDGER = join(ROOT, 'src/verification/seal-pinning.json')
const CHECK = process.argv.includes('--check')

/** Calls that ARE comparisons. `near` is this file's float-free closeness test. */
const COMPARISON_CALLS = new Set(['near'])

const COMPARISONS = new Set([
  ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken,
  ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken,
  ts.SyntaxKind.LessThanToken, ts.SyntaxKind.GreaterThanToken,
  ts.SyntaxKind.LessThanEqualsToken, ts.SyntaxKind.GreaterThanEqualsToken,
])

/** A literal, or something built only out of literals. */
function isLiteral(node) {
  if (ts.isNumericLiteral(node) || ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return true
  if (node.kind === ts.SyntaxKind.TrueKeyword || node.kind === ts.SyntaxKind.FalseKeyword) return true
  if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken) return isLiteral(node.operand)
  if (ts.isArrayLiteralExpression(node)) return node.elements.every(isLiteral)
  return false
}

/**
 * Every comparison inside one `decide` THAT THE VERDICT FLOWS THROUGH.
 *
 * Loop machinery is not an assertion. The first version of this counted
 * `for (let r = 0; r < 2; r++)` as a literal comparison and reported
 * pauliX_anticommute_pauliY as pinned on `r < 2` — an iteration bound, which
 * asserts nothing about anything. Four seals changed verdict on that alone.
 */
function classify(fn) {
  let literalCmp = 0, computedCmp = 0
  const examples = []
  const machinery = new Set()
  const markMachinery = (n) => {
    if (ts.isForStatement(n)) { for (const part of [n.initializer, n.condition, n.incrementor]) if (part) machinery.add(part) }
    if (ts.isWhileStatement(n) || ts.isDoStatement(n)) machinery.add(n.expression)
    ts.forEachChild(n, markMachinery)
  }
  markMachinery(fn)
  const inMachinery = (n) => { for (let p = n; p; p = p.parent) if (machinery.has(p)) return true; return false }
  const note = (node, lit) => {
    if (lit) { literalCmp++; if (examples.length < 3) examples.push(node.getText().replace(/\s+/g, ' ').slice(0, 90)) }
    else computedCmp++
  }
  const walk = (n) => {
    if (ts.isBinaryExpression(n) && COMPARISONS.has(n.operatorToken.kind) && !inMachinery(n)) {
      note(n, isLiteral(n.left) || isLiteral(n.right))
    }
    // A comparison can be a CALL. `near(total, 1)` compares a computed total
    // against a literal and contains no comparison operator at all, so seven
    // seals read as "no-comparison" until this was added — including
    // pauliX_anticommute_pauliY, whose whole content is near(xy, -yx).
    if (ts.isCallExpression(n) && COMPARISON_CALLS.has(n.expression.getText()) && n.arguments.length === 2) {
      note(n, isLiteral(n.arguments[0]) || isLiteral(n.arguments[1]))
    }
    // `xs.includes(3)` asks membership of a literal; `xs.includes(f(y))` does not.
    if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression) && n.expression.name.getText() === 'includes' && n.arguments.length === 1) {
      note(n, isLiteral(n.arguments[0]) && isLiteral(n.expression.expression))
    }
    ts.forEachChild(n, walk)
  }
  walk(fn)
  const calls = []
  const collectCalls = (n) => {
    if (ts.isCallExpression(n) && ts.isIdentifier(n.expression) && !calls.includes(n.expression.text)) calls.push(n.expression.text)
    ts.forEachChild(n, collectCalls)
  }
  collectCalls(fn)
  return { literalCmp, computedCmp, examples, calls }
}

// THE CONTROL. The classifier is checked against two cases whose answer is
// known before it is pointed at the data — the instrument has been the wrong
// one three times today, and each time it read green.
{
  const probe = ts.createSourceFile('probe.ts', `
    const A = { decide: () => { return foo().join(',') === '8,3,9,0' } }
    const B = { decide: () => { return key(up.map(tv)) !== key(down) } }
    const C = { decide: () => { for (let r = 0; r < 2; r++) { touch(r) } return derived() === computed() } }
    const D = { decide: () => { return near(total(), 1) } }
    const E = { decide: () => { return near(lhs(), rhs()) } }
  `, ts.ScriptTarget.Latest, true)
  const fns = []
  const collect = (n) => { if (ts.isArrowFunction(n)) fns.push(n); ts.forEachChild(n, collect) }
  collect(probe)
  const [a, b, c, d, e] = fns.map(classify)
  if (!(a.literalCmp === 1 && a.computedCmp === 0)) { console.error('seal:pinning FAIL — the control that must read PINNED did not'); process.exit(1) }
  if (!(b.computedCmp === 1 && b.literalCmp === 0)) { console.error('seal:pinning FAIL — the control that must read STRUCTURAL did not'); process.exit(1) }
  // A loop bound must not be read as an assertion — this control is here
  // because the first version of this tool failed it.
  if (!(c.literalCmp === 0 && c.computedCmp === 1)) { console.error(`seal:pinning FAIL — the control with a loop bound read ${c.literalCmp} literal comparison(s); iteration machinery is not an assertion`); process.exit(1) }
  if (!(d.literalCmp === 1 && d.computedCmp === 0)) { console.error('seal:pinning FAIL — near(x, literal) must read as a literal comparison'); process.exit(1) }
  if (!(e.computedCmp === 1 && e.literalCmp === 0)) { console.error('seal:pinning FAIL — near(x, y) must read as a computed comparison'); process.exit(1) }
}

const source = readFileSync(SRC, 'utf8')
const file = ts.createSourceFile('lean-bridge.ts', source, ts.ScriptTarget.Latest, true)

let sealsObject = null
const findSeals = (n) => {
  if (ts.isVariableDeclaration(n) && n.name.getText() === 'SEALS' && n.initializer && ts.isObjectLiteralExpression(n.initializer)) sealsObject = n.initializer
  ts.forEachChild(n, findSeals)
}
findSeals(file)
if (!sealsObject) { console.error('seal:pinning FAIL — could not find the SEALS object literal'); process.exit(1) }

const results = {}
for (const prop of sealsObject.properties) {
  if (!ts.isPropertyAssignment(prop) || !ts.isObjectLiteralExpression(prop.initializer)) continue
  const name = prop.name.getText().replace(/['"]/g, '')
  const decide = prop.initializer.properties.find((p) => ts.isPropertyAssignment(p) && p.name.getText() === 'decide')
  if (!decide) { results[name] = { verdict: 'no-predicate' }; continue }
  const c = classify(decide.initializer)
  // A seal whose whole body is `return isNormalized(reg)` compares nothing
  // ITSELF; the comparison is one level down. Reporting that as
  // "no-comparison" would read as "asserts nothing", which is false — so the
  // callee is named instead, and the reader is told where to look.
  const verdict = c.computedCmp > 0 ? 'structural' : c.literalCmp > 0 ? 'pinned' : c.calls.length ? 'delegates' : 'no-comparison'
  results[name] = {
    verdict, literalComparisons: c.literalCmp, computedComparisons: c.computedCmp,
    ...(verdict === 'pinned' ? { pinnedOn: c.examples } : {}),
    ...(verdict === 'delegates' ? { delegatesTo: c.calls } : {}),
  }
}

const tally = {}
for (const r of Object.values(results)) tally[r.verdict] = (tally[r.verdict] ?? 0) + 1
for (const [n, r] of Object.entries(results)) {
  if (r.verdict !== 'structural') console.log(`  ${n.padEnd(42)} ${r.verdict}${r.pinnedOn ? ` — ${r.pinnedOn[0]}` : ''}${r.delegatesTo ? ` — ${r.delegatesTo.join(', ')}` : ''}`)
}
console.log(`seal:pinning — ${Object.keys(results).length} seal(s): ${Object.entries(tally).map(([k, v]) => `${v} ${k}`).join(', ')}`)

const record = {
  what: 'Every comparison inside each seal predicate, read from the TypeScript AST and classified. structural = at least one computation is compared to another computation. pinned = there are comparisons and every one is against a literal, so the seal would fall for a convention as readily as for a law.',
  doesNotEstablish: 'that a structural seal is independent of what it checks. A predicate can pin a value without spelling it out — a comparison against an imported constant reads as structural here — so the pinned count is a LOWER bound. It also does NOT say a pinned seal is wrong: born_rule_sum pins on near(total, 1), and 1 is the normalisation the mathematics forces, not a convention someone chose. The verdict says the seal would fall for a convention as readily as for a law; whether ITS literal is a convention is a judgement this makes no attempt at.',
  tally, seals: results,
}
const next = JSON.stringify(record, null, 2) + '\n'
if (CHECK) {
  if (readFileSync(LEDGER, 'utf8') !== next) { console.error('seal:pinning FAIL — the recorded verdicts are not what the seals say today; run npm run seal:pinning'); process.exit(1) }
  console.log('seal:pinning ok — every seal is the kind the ledger records it as')
} else {
  writeFileSync(LEDGER, next)
  console.log('seal:pinning — wrote src/verification/seal-pinning.json')
}
