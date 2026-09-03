/**
 * The six exports in this tree that a consumer of the package can reach and
 * that nothing tested.
 *
 * Fifteen of the 218 untested exports were reachable from a published entry
 * point; nine are in src/quantum and are covered by
 * src/quantum/reachable-exports.test.ts. These are the other six. They are the
 * published surface, so none of them may be resolved by un-exporting.
 *
 * One was broken: analyzeRodinCoilPattern threw for the Rodin sequence — the one
 * sequence it exists to analyse — because it called frequencyForDigit, which is
 * defined only on {3,6,9}.
 *
 * The brands turned out differently from how this suite first read them. asHz,
 * asDigit and asAngle are all UNCHECKED casts and the file says so above them:
 * "no runtime cost". That is deliberate and it is kept. What was missing is the
 * other half — toDigit exists and validates, and there was no matching converter
 * for Hz, so asHz(NaN) was the only way to make a frequency. toHz is added
 * beside toDigit rather than asHz being made to throw, because imposing a check
 * on a cast the module deliberately left unchecked would be this suite deciding
 * the module's design for it.
 */
import { GOLDEN_RATIO } from './a432.math.constants.ts'
import { calculateJKInputs } from './a432.mobius.circuit.ts'
import { executeOSCommand } from './a432.os.terminal.ts'
import { analyzeRodinCoilPattern } from './a432.rodin.coil.harmonic.ts'
import { asHz, asDigit, asAngle, toHz, toDigit } from './a432.types.ts'
import { analyzeWavePattern } from './a432.wave.energy.ts'
import { abs } from './a432.algebra.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// --- the golden ratio is the golden ratio --------------------------------
check('phi satisfies its defining equation, phi squared = phi + 1',
  abs(GOLDEN_RATIO * GOLDEN_RATIO - (GOLDEN_RATIO + 1)) < 1 / 1_000_000_000)

check('phi lies between 1 and 2 and is finite',
  Number.isFinite(GOLDEN_RATIO) && GOLDEN_RATIO > 1 && GOLDEN_RATIO < 2)

// --- the brands ----------------------------------------------------------
check('the as* brands are unchecked casts that change nothing, as the module intends',
  [NaN, Infinity, -1, 1 / 2, 432].every((n) =>
    Object.is(asHz(n) as unknown as number, n)
    && Object.is(asDigit(n) as unknown as number, n)
    && Object.is(asAngle(n) as unknown as number, n)),
  'recorded rather than assumed: this suite first assumed asDigit validated, and it does not')

check('toHz refuses what is not a frequency',
  [NaN, Infinity, -Infinity, -1, -432].every((n) => { try { toHz(n); return false } catch { return true } }))

check('toHz passes real frequencies through unchanged',
  [0, 1, 432, 864, 1296, 27648].every((n) => (toHz(n) as unknown as number) === n))

check('toDigit accepts the ten digits and refuses what is not one',
  DIGITS.every((d) => (toDigit(d) as unknown as number) === d)
  && [1 / 2, NaN, Infinity, -1].every((n) => { try { toDigit(n); return false } catch { return true } }))

check('toDigit reduces beyond nine rather than refusing it',
  (toDigit(10) as unknown as number) === 0 && (toDigit(27) as unknown as number) === 7,
  'it takes n % 10, which is a different contract from refusing — worth pinning down')

// --- the JK flip-flop inputs ---------------------------------------------
const STATES = ['000', '001', '010', '011', '100', '101', '110', '111']
check('every three-bit state yields three JK pairs, each bit 0 or 1',
  STATES.every((s) => {
    const jk = calculateJKInputs(s) as unknown as Record<string, number | string>
    return ['J2', 'K2', 'J1', 'K1', 'J0', 'K0'].every((k) => jk[k] === 0 || jk[k] === 1)
      && ['Q2', 'Q1', 'Q0'].every((k) => jk[k] === 0 || jk[k] === 1)
  }))

check('the state it echoes back is the state it was given',
  STATES.every((s) => {
    const jk = calculateJKInputs(s) as unknown as Record<string, number>
    return `${jk.Q2}${jk.Q1}${jk.Q0}` === s
  }))

check('the next state is three bits',
  STATES.every((s) => /^[01]{3}$/.test((calculateJKInputs(s) as unknown as { nextState: string }).nextState)))

check('the JK inputs are a function of the state, not of the call',
  STATES.every((s) => JSON.stringify(calculateJKInputs(s)) === JSON.stringify(calculateJKInputs(s))))

check('different states do not all give the same inputs',
  new Set(STATES.map((s) => JSON.stringify(calculateJKInputs(s)))).size > 1)

check('J2 is set exactly when Q1 and Q0 are both clear',
  STATES.every((s) => calculateJKInputs(s).J2 === (s[1] === '0' && s[2] === '0' ? 1 : 0)),
  'the toggle condition of the most significant bit')

check('K2 is set exactly when Q1 and Q0 are both set',
  STATES.every((s) => calculateJKInputs(s).K2 === (s[1] === '1' && s[2] === '1' ? 1 : 0)))

// --- the OS terminal -----------------------------------------------------
const COMMANDS = ['os.status', 'os.boot', 'os.shutdown', 'os.help']
check('every command returns a non-empty string',
  COMMANDS.every((c) => typeof executeOSCommand(c) === 'string' && executeOSCommand(c).length > 0))

check('an unknown command is answered, not thrown',
  (() => { try { return typeof executeOSCommand('no.such.command') === 'string' } catch { return false } })())

check('commands are case-insensitive and trimmed',
  executeOSCommand('  OS.STATUS  ') === executeOSCommand('os.status'))

check('different commands give different answers',
  new Set(COMMANDS.map(executeOSCommand)).size > 1)

// --- the Rodin coil analysis ---------------------------------------------
const PATTERNS = ['124875', '369', '0369124875', '1', '/3\\6/9']
check('the analyser survives the sequence it exists to analyse',
  (() => { try { analyzeRodinCoilPattern('124875'); return true } catch { return false } })(),
  'it threw on the Rodin sequence, because frequencyForDigit is defined only on {3,6,9}')

check('every pattern is analysed without throwing',
  PATTERNS.every((p) => { try { analyzeRodinCoilPattern(p); return true } catch { return false } }))

check('the analysis carries back the pattern it was given',
  PATTERNS.every((p) => analyzeRodinCoilPattern(p).pattern === p))

check('every harmonic carries a finite frequency',
  PATTERNS.every((p) => {
    const a = analyzeRodinCoilPattern(p) as unknown as { harmonics?: { frequency: number }[] }
    return (a.harmonics ?? []).every((h) => Number.isFinite(h.frequency))
  }))

check('the analysis is a function of the pattern',
  PATTERNS.every((p) => JSON.stringify(analyzeRodinCoilPattern(p)) === JSON.stringify(analyzeRodinCoilPattern(p))))

// --- wave patterns -------------------------------------------------------
const SEQS = [[1, 2, 4, 8, 7, 5], [3, 6, 9], [0], []]
check('no wave statistic is ever NaN or Infinity, the empty sequence included',
  SEQS.every((s) => {
    const a = analyzeWavePattern(s) as unknown as Record<string, unknown>
    return Object.values(a).every((v) => typeof v !== 'number' || Number.isFinite(v))
  }))

check('the analysis is a function of the sequence',
  SEQS.every((s) => JSON.stringify(analyzeWavePattern(s)) === JSON.stringify(analyzeWavePattern(s))))

check('a longer sequence never yields fewer waves',
  (() => {
    const a = analyzeWavePattern([1, 2]) as unknown as { waves?: unknown[] }
    const b = analyzeWavePattern([1, 2, 4, 8]) as unknown as { waves?: unknown[] }
    return (b.waves?.length ?? 0) >= (a.waves?.length ?? 0)
  })())

console.log(failures === 0
  ? 'a432.reachable ok — the coil analyser survives its own sequence, and toHz refuses what asHz would brand'
  : `a432.reachable FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
