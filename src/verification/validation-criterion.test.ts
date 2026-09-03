/**
 * The validation criterion must not confirm the thing it exists to deny.
 *
 * Its whole purpose is to separate what this repository computes from what it
 * has not measured, so the load-bearing assertion is the LAST one: the verdict
 * must carry, in its own data and not only in a comment, the statement that no
 * physical experiment has been run.
 */
import { evaluateValidationCriterion } from './validation-criterion.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = ''): void => {
  console.log(`  ${ok ? '✓' : '✗'} ${name}${ok || !detail ? '' : ` — ${detail}`}`)
  if (!ok) failures++
}

const v = evaluateValidationCriterion()

check('every condition is met — claims are bound to this verdict',
  v.met && v.conditionsMet === v.conditionsTotal,
  v.conditions.filter((c) => !c.met).map((c) => `${c.id}: ${c.evidence}`).join(' | '))

check('every condition is decided', v.conditions.every((c) => typeof c.met === 'boolean'))
check('the verdict is met only when every condition is', v.met === (v.conditionsMet === v.conditionsTotal))
check('every condition names the command that recomputes it', v.conditions.every((c) => c.recomputeWith.startsWith('npm run')))
check('every condition names what would change its verdict', v.conditions.every((c) => c.whatWouldChange.length > 0))
check('the seal condition counts the seals rather than asserting them',
  v.conditions.find((c) => c.id === 'laws-sealed')?.evidence.includes('seals held') === true)
check('the simulator laws are named individually, and there are at least five',
  (() => {
    const e = v.conditions.find((c) => c.id === 'simulator-sealed')
    const m = e?.evidence.match(/^(\d+) of (\d+) named simulator laws/)
    return m !== null && m !== undefined && Number(m[1]) >= 5 && Number(m[1]) === Number(m[2])
  })(),
  'an empty list satisfied 0 of 0 and passed having checked nothing')
check('the energy condition reports the bounds it computed',
  v.conditions.find((c) => c.id === 'energy-arithmetic')?.evidence.includes('kJ/mol') === true)

check('THE VERDICT CARRIES ITS OWN DENIAL, in data rather than in a comment',
  v.doesNotEstablish.includes('NO PHYSICAL EXPERIMENT HAS BEEN RUN'),
  'a consumer reading the verdict must see the limit without reading the source')

check('the denial is specific about what was not done',
  ['coil', 'field', 'resonance', 'instrument'].every((w) => v.doesNotEstablish.includes(w)))

console.log(failures === 0
  ? `validation-criterion ok — ${v.conditionsMet}/${v.conditionsTotal}, and the verdict states what it does not establish`
  : `validation-criterion FAIL — ${failures} problem(s)`)
process.exit(failures === 0 ? 0 : 1)
