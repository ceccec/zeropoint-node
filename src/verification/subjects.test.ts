/**
 * The adapters must present the FULL interface, or the criterion reports a
 * number the subject does not deserve.
 *
 * criteria-check.mjs says it in its own comments: "Probing only start/stop
 * would report 1 of 7 forever and block every release on a number the class no
 * longer deserves", and the same for the simulator in the other direction. That
 * is a property of these adapters, and until this file nothing asserted it —
 * a field dropped from either object would quietly lower a gated verdict.
 */
import { allCriteria, osVerdict, quantumVerdict } from './subjects.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}

const list = allCriteria(200)

check('every criterion is named, subjected and decided',
  list.length === 7 && list.every((c) => c.name && c.subject && typeof c.verdict.met === 'boolean'))

check('six gate a release and one is reported without gating',
  list.filter((c) => c.gated).length === 6 && list.filter((c) => !c.gated).length === 1)

check('exactly one criterion declares itself MEASURED',
  list.filter((c) => c.measured).length === 1
  && list.find((c) => c.measured)?.name === 'real-time',
  'the measured flag is how a reader knows which verdict depends on the machine')

check('the reported-but-not-gated one is the a432 measure functions',
  list.find((c) => !c.gated)?.subject.includes('measure functions') === true,
  'gating on a pure function that cannot have history would gate on the impossible')

check('every verdict counts its own conditions',
  list.every((c) => c.verdict.conditions.length === c.verdict.conditionsTotal
    && c.verdict.conditionsMet <= c.verdict.conditionsTotal))

check('met is true only when every condition is',
  list.every((c) => c.verdict.met === (c.verdict.conditionsMet === c.verdict.conditionsTotal)))

// --- the adapters are FULL, which is the point of this file ---------------
check('the OS adapter reaches every condition the criterion can decide',
  osVerdict().conditionsTotal === 7 && osVerdict().conditionsMet === 7,
  'a truncated adapter reports 1 of 7 and blocks every release on a number the class does not deserve')

check('the simulator adapter reaches every condition too',
  quantumVerdict().conditionsTotal === 8 && quantumVerdict().conditionsMet === 8)

check('the OS verdict is the one the criteria list carries',
  list.find((c) => c.name === 'operating system')?.verdict.conditionsMet === osVerdict().conditionsMet,
  'one adapter, one answer — a second copy is a second thing that can drift')

check('the simulator verdict is the one the criteria list carries',
  list.find((c) => c.name === 'quantum simulator')?.verdict.conditionsMet === quantumVerdict().conditionsMet)

check('a fresh OS is probed each time, so one call cannot poison the next',
  osVerdict().conditionsMet === osVerdict().conditionsMet && osVerdict().conditionsMet === 7)

check('fewer samples still decides the real-time criterion',
  allCriteria(50).find((c) => c.name === 'real-time')!.verdict.conditionsTotal === 8,
  'an agent asking whether the criteria are met should not wait for two thousand timed steps')

console.log(failures === 0
  ? 'verification.subjects ok — both adapters are full, and one answer reaches every caller'
  : `verification.subjects FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
