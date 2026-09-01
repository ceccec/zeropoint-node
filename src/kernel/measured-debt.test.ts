/**
 * rankMeasuredDebt: the wave engine's view of the gaps it could not see.
 *
 * The property that matters is the one my first version got wrong — a byte
 * total must never be ranked against a number of functions. It put
 * unguardedReadme first at 28015 bytes, ahead of 297 untested functions, and
 * "28015 outstanding" is not a work item.
 */
import { createCheck } from '../verification/harness.ts'
import { rankMeasuredDebt, rankAllMeasuredDebt } from './self-develop.ts'

const { check, failures } = createCheck()

check('no debt means no tip', rankMeasuredDebt({}) === null)
check('zero counts are not debt', rankMeasuredDebt({ lint: 0, decimals: 0 }) === null)
check('a negative count is not debt', rankMeasuredDebt({ lint: -3 }) === null)
check('a non-finite count is not debt', rankMeasuredDebt({ lint: NaN, decimals: Infinity }) === null)

check('the largest count wins', rankMeasuredDebt({ lint: 370, decimals: 279 })?.surface === 'lint')
check('a tie breaks by name, so the answer is stable',
  rankMeasuredDebt({ zeta: 5, alpha: 5 })?.surface === 'alpha')

// THE UNITS PROPERTY. This is the bug the first version shipped past.
{
  const withBytes = rankMeasuredDebt({ unguardedReadme: 28015, untestedExports: 297 })
  check('a byte total never outranks a count, however large',
    withBytes?.surface === 'untestedExports', String(withBytes?.surface))
  check('the winner is a countable surface', withBytes?.unit === 'count')
  const onlyBytes = rankMeasuredDebt({ unguardedReadme: 28015 })
  check('bytes alone produce no ranked tip, rather than a meaningless one', onlyBytes === null)
}

{
  const all = rankAllMeasuredDebt({ unguardedReadme: 28015, lint: 370, untestedExports: 297, decimals: 0 })
  check('zero surfaces are omitted from the list', all.every(d => d.count > 0))
  check('every entry carries its unit', all.every(d => d.unit === 'count' || d.unit === 'bytes'))
  check('counts are listed before bytes', all[0].unit === 'count' && all[all.length - 1].unit === 'bytes')
  check('within counts the order is by magnitude', all[0].surface === 'lint' && all[1].surface === 'untestedExports')
  check('every entry says what to do', all.every(d => d.action.length > 10))
  check('an unknown surface still gets an action',
    rankAllMeasuredDebt({ somethingNew: 4 })[0].action.includes('somethingNew'))
}

check('the ranking is deterministic',
  JSON.stringify(rankAllMeasuredDebt({ lint: 5, decimals: 5, typecheck: 9 }))
  === JSON.stringify(rankAllMeasuredDebt({ typecheck: 9, decimals: 5, lint: 5 })))

console.log()
if (failures() > 0) { console.error(`measured-debt FAIL — ${failures()}`); process.exit(1) }
console.log('measured-debt ok')
process.exit(0)
