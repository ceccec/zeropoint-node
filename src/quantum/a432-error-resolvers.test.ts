/**
 * These sixteen exist to not throw. So that is what is asserted — over every
 * degenerate input the type system permits, not over a chosen example.
 */
import * as R from './a432-error-resolvers.ts'
import { calculateA432Color, getVortexColor, getTrinityCompositeCMYK, hslToCmyk } from '../0/3/6/9/1/2/4/8/7/5/1/a432.color.ts'
import { createCheck } from '../verification/harness.ts'

const { check, failures } = createCheck()
const isCmyk = (v: unknown): boolean =>
  !!v && (['c', 'm', 'y', 'k'] as const).every((k) => {
    const n = (v as Record<string, unknown>)[k]
    return typeof n === 'number' && Number.isFinite(n) && n >= 0 && n <= 1
  })

// The colour law itself. Saturation is 2/3 * 100 = 66.666..., and the HSL
// string was parsed with /\d+/g, which splits a decimal in two: lightness came
// out as a fourteen-digit number and k as -1106666666664.99. Every channel of
// every colour is now bounded, which is what CMYK means.
{
  let ok = true
  for (let d = 1; d <= 9; d++) if (!isCmyk(calculateA432Color(d * 48))) ok = false
  for (let f = 0; f <= 2000; f += 137) if (!isCmyk(calculateA432Color(f))) ok = false
  check('every A432 colour has all four channels in [0,1]', ok, JSON.stringify(calculateA432Color(432)))
  check('the trinity composite is in range', isCmyk(getTrinityCompositeCMYK()), JSON.stringify(getTrinityCompositeCMYK()))
  check('a fractional saturation survives parsing',
    isCmyk(hslToCmyk(210, 200 / 3, 40)), JSON.stringify(hslToCmyk(210, 200 / 3, 40)))
  check('the vortex colour string carries a fraction at all',
    /\d+\.\d+/.test(getVortexColor(7)), getVortexColor(7))
}

// Every resolver, every degenerate input its signature allows.
{
  const NUMERIC = ['resolveConsciousnessError', 'resolveDimensionalError', 'resolveMusicError'] as const
  const numEvil = [NaN, Infinity, -Infinity, -5, 0, 1e18, 37 / 10]
  const objEvil = [
    {}, { consciousness: NaN }, { dimensionalState: NaN }, { frequency: NaN, index: NaN },
    { level: NaN }, { dimension: NaN }, { consciousness: Infinity }, { dimension: -1 },
  ]
  const names = Object.keys(R).filter((k) => k.startsWith('resolve') && k !== 'resolvePhysicsError')
  check('all fifteen colour resolvers are exported', names.length === 15, String(names.length))

  const problems: string[] = []
  for (const n of names) {
    const inputs: unknown[] = (NUMERIC as readonly string[]).includes(n) ? numEvil : objEvil
    for (const a of inputs) {
      try {
        if (!isCmyk((R as Record<string, (x: unknown) => unknown>)[n](a))) problems.push(`${n} returned a non-colour`)
      } catch (e) {
        problems.push(`${n} threw on ${JSON.stringify(a)}: ${(e as Error).message}`)
      }
    }
  }
  check('no resolver throws on any degenerate input', problems.length === 0, problems.slice(0, 3).join('; '))

  // The specific case the doc's own body got wrong: its fallback was
  // `dimensionalState % 10`, and NaN % 10 is NaN, so the catch branch rethrew.
  check('resolveDimensionalError survives NaN, which the documented body did not',
    isCmyk(R.resolveDimensionalError(NaN)))
  check('resolveMusicError survives NaN for the same reason', isCmyk(R.resolveMusicError(NaN)))

  check('resolvePhysicsError returns something', R.resolvePhysicsError() !== undefined)
  check('the documented defaults are digits',
    [R.PERFECT_BALANCE, R.FOUNDATION_DIMENSION, R.PRESENT_DIMENSION].every(d => Number.isInteger(d) && d >= 0 && d <= 9))
  check('perfect balance is four, as three a432 modules already define it', R.PERFECT_BALANCE === 4)
  check('detectEnvironmentalConsciousness returns the neutral default',
    R.detectEnvironmentalConsciousness() === R.PERFECT_BALANCE)

  // Determinism: same input, same colour.
  check('resolvers are deterministic',
    JSON.stringify(R.resolveArtError({ consciousness: 3 })) === JSON.stringify(R.resolveArtError({ consciousness: 3 })))
}

console.log()
if (failures() > 0) { console.error(`a432-error-resolvers FAIL — ${failures()}`); process.exit(1) }
console.log('a432-error-resolvers ok')
process.exit(0)
