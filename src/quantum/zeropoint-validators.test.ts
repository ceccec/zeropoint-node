import { validateSingleDigits, validateMathCalculation, validateMathematicalPurity } from './zeropoint-validators.ts'

let failures = 0
const check = (label: string, ok: boolean, detail = '') => {
  if (ok) { console.log(`  ✓ ${label}`) } else { failures++; console.error(`  ✗ ${label}${detail ? ' — ' + detail : ''}`) }
}

check('0 through 9 are single digits', [0,1,2,3,4,5,6,7,8,9].every(validateSingleDigits))
check('10 and above are not', [10, 11, 100, 1e9].every(d => !validateSingleDigits(d)))
check('negatives are not', [-1, -9, -1e9].every(d => !validateSingleDigits(d)))

check('a number is a calculation', [0, -1, 1e18, 1 / 3].every(validateMathCalculation))
check('NaN is not', !validateMathCalculation(NaN))
check('Infinity still counts as a number', validateMathCalculation(Infinity))

// The point of this one is that it CAN be false. It recomputes the doubling
// circuit, the axis and the digital root rather than returning a literal, and
// corrupting digitalRoot in src/0 turns it false — which is the only reason a
// predicate like this is worth calling at all.
check('mathematical purity holds', validateMathematicalPurity())
check('the purity check is not a constant',
  validateMathematicalPurity.toString().includes('digitalRoot'),
  'it must recompute something')

console.log()
if (failures > 0) { console.error(`zeropoint-validators FAIL — ${failures}`); process.exit(1) }
console.log('zeropoint-validators ok')
process.exit(0)
