/**
 * The OS criterion's own tests.
 *
 * Two subjects, deliberately: the class the README names, which meets one
 * condition, and the kernel written against the criterion, which meets all
 * seven. Keeping both here is the point — the interesting number is the
 * distance, and a file that reported only the 7 would be advertising.
 */
import { evaluateOsCriterion, unmetOsConditions } from './os-criterion.ts'
import { A432OS } from '../0/3/6/9/1/2/4/8/7/5/1/a432.os.ts'
import { kernelAsCandidate, A432Kernel } from '../0/3/6/9/1/2/4/8/7/5/1/a432.os.kernel.ts'

let failures = 0
const check = (label: string, ok: boolean, detail = '') => {
  if (ok) { console.log(`  ✓ ${label}`) } else { failures++; console.error(`  ✗ ${label}${detail ? ' — ' + detail : ''}`) }
}

const legacyOs = new A432OS()
const legacy = evaluateOsCriterion({
  start: () => legacyOs.start(),
  stop: () => legacyOs.stop(),
  isRunning: () => (legacyOs as unknown as { isRunning: boolean }).isRunning,
})

check('the criterion has seven conditions', legacy.conditionsTotal === 7)
check('A432OS meets exactly one', legacy.conditionsMet === 1, `${legacy.conditionsMet}/7`)
check('the one it meets is the lifecycle',
  legacy.conditions.filter(c => c.met).map(c => c.id).join() === 'lifecycle')
check('A432OS is not an operating system by this measure', legacy.met === false)
check('every unmet condition tells you what would change it',
  unmetOsConditions({}).every(c => c.whatWouldChange.length > 20))
check('a candidate offering nothing meets nothing', evaluateOsCriterion({}).conditionsMet === 0)

const kernel = evaluateOsCriterion(kernelAsCandidate())
check('the kernel meets all seven', kernel.met && kernel.conditionsMet === 7, `${kernel.conditionsMet}/7`)
check('the verdict says meeting them WOULD make it a minimal OS',
  kernel.interpretation.includes('WOULD make this a minimal operating system'))
check('and that minimal means minimal', kernel.interpretation.includes('Minimal means minimal'))
check('and it admits the scheduling probe checks progress, not fairness',
  kernel.interpretation.includes('progress and not fairness'))

// The conditions must respond to a candidate that is missing each mechanism,
// rather than to the presence of a method name.
{
  const k = new A432Kernel()
  const full = kernelAsCandidate(k)
  const withoutPool = { ...full, allocate: () => 1 as number | null } // always says yes
  check('a pool that never refuses fails resource management',
    !evaluateOsCriterion(withoutPool).conditions.find(c => c.id === 'resource-management')!.met)
  const openBoundary = { ...kernelAsCandidate(new A432Kernel()), syscall: () => undefined }
  check('a syscall table that accepts anything fails the boundary',
    !evaluateOsCriterion(openBoundary).conditions.find(c => c.id === 'syscall-boundary')!.met)
  const noContainment = {
    ...kernelAsCandidate(new A432Kernel()),
    tick: () => { throw new Error('escaped') },
  }
  check('a scheduler that lets a throw escape fails isolation',
    !evaluateOsCriterion(noContainment).conditions.find(c => c.id === 'isolation')!.met)
  const noRestore = { ...kernelAsCandidate(new A432Kernel()), restore: () => false }
  check('a restore that refuses its own snapshot fails persistence',
    !evaluateOsCriterion(noRestore).conditions.find(c => c.id === 'persistence')!.met)
}

check('the criterion is deterministic for a fresh candidate',
  JSON.stringify(evaluateOsCriterion(kernelAsCandidate()).conditionsMet)
  === JSON.stringify(evaluateOsCriterion(kernelAsCandidate()).conditionsMet))

console.log()
if (failures > 0) { console.error(`os-criterion FAIL — ${failures}`); process.exit(1) }
console.log('os-criterion ok — A432OS 1/7, the kernel 7/7')
process.exit(0)
