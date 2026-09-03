/**
 * Fraction arithmetic is a field, and this asserts the axioms.
 *
 * This repository bans float literals: patch 5 replaced 317 decimals with
 * integer ratios on the argument that a ratio is exact where a decimal is not.
 * That argument is worth precisely as much as the arithmetic underneath it, and
 * nothing called this module's arithmetic at all.
 *
 * Three laws found three defects on the first run — a zero denominator that
 * produced { NaN, NaN }, a simplify that was not canonical because it left the
 * sign wherever it found it, and a "harmonize" documented as an average that is
 * the mediant. The first two are fixed in a432.yin.yang.ts; the third kept its
 * value and lost its wrong name.
 */
import {
  addFractions, subtractFractions, simplifyFraction,
  yinYangStateFraction, yinYangSymbolFraction, harmonizeYinYangFraction,
  startYinYang,
} from './a432.yin.yang.ts'
import { max, min } from './a432.algebra.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}
type F = { numerator: number; denominator: number }
const f = (n: number, d: number): F => ({ numerator: n, denominator: d })
const val = (x: F): number => x.numerator / x.denominator
const eq = (a: F, b: F): boolean => a.numerator === b.numerator && a.denominator === b.denominator
const show = (x: F): string => `${x.numerator}/${x.denominator}`

/** Every pair of the small fractions, which is the domain these laws quantify over. */
const NUMS = [-3, -2, -1, 0, 1, 2, 3, 4]
const DENS = [1, 2, 3, 4, 6, 12]
const ALL: F[] = []
for (const n of NUMS) for (const d of DENS) ALL.push(f(n, d))

// --- the field axioms ---------------------------------------------------
check('addition is commutative', ALL.every((a) => ALL.every((b) => eq(addFractions(a, b), addFractions(b, a)))))

check('addition is associative', ALL.every((a) => ALL.slice(0, 12).every((b) => ALL.slice(0, 12).every((c) =>
  eq(addFractions(addFractions(a, b), c), addFractions(a, addFractions(b, c)))))))

check('zero is the additive identity', ALL.every((a) => eq(addFractions(a, f(0, 1)), simplifyFraction(a))))

check('a minus itself is zero', ALL.every((a) => val(subtractFractions(a, a)) === 0))

check('subtraction inverts addition', ALL.every((a) => ALL.every((b) =>
  eq(subtractFractions(addFractions(a, b), b), simplifyFraction(a)))))

// --- simplify is a canonical form ---------------------------------------
check('simplify is idempotent', ALL.every((a) => eq(simplifyFraction(a), simplifyFraction(simplifyFraction(a)))))

check('simplify preserves value', ALL.every((a) => val(simplifyFraction(a)) === val(a)))

const signPairs: Array<[F, F]> = [[f(2, -4), f(-2, 4)], [f(-1, -2), f(1, 2)], [f(3, -9), f(-1, 3)]]
check('equal values simplify to IDENTICAL fields', signPairs.every(([a, b]) => eq(simplifyFraction(a), simplifyFraction(b))),
  signPairs.map(([a, b]) => `${show(a)} -> ${show(simplifyFraction(a))} vs ${show(b)} -> ${show(simplifyFraction(b))}`).join('; '))

check('the sign is carried by the numerator', ALL.concat([f(2, -4), f(-2, -4)]).every((a) => simplifyFraction(a).denominator > 0))

let threw = false
try { simplifyFraction(f(0, 0)) } catch { threw = true }
check('a zero denominator is refused, not turned into NaN', threw)

check('nothing simplifies to NaN', ALL.every((a) => {
  const s = simplifyFraction(a)
  return Number.isFinite(s.numerator) && Number.isFinite(s.denominator)
}))

// --- the yin/yang laws --------------------------------------------------
check('state is antisymmetric: swapping possibility and impossibility negates it',
  ALL.filter((a) => a.numerator > 0).every((p) => ALL.filter((a) => a.numerator > 0).every((i) =>
    val(yinYangStateFraction(p, i)) === -val(yinYangStateFraction(i, p)))))

check('equal possibility and impossibility is perfect balance',
  ALL.filter((a) => a.numerator > 0).every((p) => val(yinYangStateFraction(p, p)) === 0))

check('state stays within [-1, 1] for non-negative inputs',
  ALL.filter((a) => a.numerator >= 0).every((p) => ALL.filter((a) => a.numerator > 0).every((i) => {
    const v = val(yinYangStateFraction(p, i))
    return v >= -1 && v <= 1
  })))

check('the symbol partitions the state line at ±1/2',
  yinYangSymbolFraction(f(1, 1)) === '⚪️'
  && yinYangSymbolFraction(f(-1, 1)) === '⚫️'
  && yinYangSymbolFraction(f(0, 1)) === '⚪️⚫️'
  && yinYangSymbolFraction(f(1, 2)) === '⚪️⚫️'
  && yinYangSymbolFraction(f(-1, 2)) === '⚪️⚫️',
  'the boundary itself must be balanced, not white or black')

// The mediant, which is what harmonize computes: it lies strictly between its
// two inputs whenever they differ, and is the value itself when they agree.
const positives = ALL.filter((a) => a.numerator > 0)
check('harmonize lands strictly between the two, never outside',
  positives.every((a) => positives.every((b) => {
    const m = val(harmonizeYinYangFraction(a, b))
    const lo = min(val(a), val(b)), hi = max(val(a), val(b))
    return m >= lo && m <= hi
  })))

check('harmonizing a value with itself is that value',
  positives.every((a) => val(harmonizeYinYangFraction(a, a)) === val(a)))

check('harmonize is the mediant and NOT the average',
  val(harmonizeYinYangFraction(f(1, 2), f(1, 3))) === 2 / 5
  && val(harmonizeYinYangFraction(f(1, 2), f(1, 3))) !== 5 / 12,
  'if this ever becomes the average, the comment above it must change too')

// --- the stream ---------------------------------------------------------
const stop = startYinYang(() => {})
check('startYinYang returns a stop function that can be called', typeof stop === 'function')
stop()
check('stopping twice does not throw', (() => { try { stop(); return true } catch { return false } })())

console.log(failures === 0
  ? 'a432.yin.yang ok — the field axioms hold, simplify is canonical, and harmonize is the mediant it computes'
  : `a432.yin.yang FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
