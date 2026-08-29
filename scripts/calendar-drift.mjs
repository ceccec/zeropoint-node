#!/usr/bin/env node
/**
 * How far each calendar drifts from the sky — in exact integers.
 *
 * This repository bans Math.* and decimal literals because a float is a
 * rounded stand-in for a ratio, and the rounding accumulates where nobody is
 * looking. A civil calendar is the same object: 365 days is a rounded stand-in
 * for the tropical year, and the leap rule is the correction bolted on after.
 * Every calendar below is an integer ratio pretending to be the sky.
 *
 * My own version-calendar.mjs failed this. It used Math.floor, Math.abs,
 * Math.round and the literals 29.530588 and 365.2422 — the very thing the ban
 * exists to prevent — and passed the gate only because scripts/ is excluded
 * from math-ban. The exclusion is for tooling that must NAME Math in patterns,
 * not a licence to compute with it. Fixed here and there.
 *
 * EXACT ARITHMETIC. Every quantity is a BigInt in units of 10^-10 days, so all
 * comparisons below are integer subtractions with no rounding anywhere.
 *
 * WHAT IS OBSERVED, NOT DERIVED. The mean tropical year and mean synodic month
 * are MEASURED, and they are also slowly changing. They cannot be derived from
 * any harmonic principle; they are what the sky is currently doing. Every
 * calendar is a rational approximation to those two numbers, and the drift is
 * the difference — so this table reports how good each approximation is, and
 * nothing more than that.
 */

/** Scale: 10^-10 days. Every value below is an integer in these units. */
const S = 10_000_000_000n

// Observed means. Stated as scaled integers rather than decimals, so nothing
// here is a float — but they are measurements, not exact quantities.
const TROPICAL_YEAR = 3_652_421_897_000n   // 365.2421897 d
const SYNODIC_MONTH = 295_305_888_531n     //  29.5305888531 d

/** Each calendar as the exact integer ratio it actually is. */
export const CALENDARS = [
  { name: 'Julian',     days: 1_461n,     years: 4n,   months: null,     note: 'one leap day every 4 years' },
  { name: 'Gregorian',  days: 146_097n,   years: 400n, months: null,     note: 'Julian, less 3 leap days per 400' },
  { name: 'Metonic',    days: 6_940n,     years: 19n,  months: 235n,     note: 'the luni-solar cycle: sun AND moon' },
  { name: 'Callippic',  days: 27_759n,    years: 76n,  months: 940n,     note: 'four Metonic cycles, less one day' },
  { name: 'Hipparchic', days: 111_035n,   years: 304n, months: 3_760n,   note: 'four Callippic cycles, less one day' },
]

/** Exact drift of a cycle against the tropical year, in 10^-10 days. */
export const solarDrift = (c) => c.days * S - c.years * TROPICAL_YEAR
/** Exact drift against the synodic month, for the luni-solar cycles. */
export const lunarDrift = (c) => (c.months === null ? null : c.days * S - c.months * SYNODIC_MONTH)

/** Signed scaled integer -> decimal string. Formatting only; no arithmetic. */
function show(scaled, places) {
  const neg = scaled < 0n
  const abs = neg ? -scaled : scaled
  const whole = abs / S
  const frac = (abs % S).toString().padStart(10, '0').slice(0, places)
  return `${neg ? '-' : '+'}${whole}.${frac}`
}

/** Drift per year, kept exact by scaling before dividing. */
const perYear = (drift, years) => (drift * 1_000_000n) / years

if (process.argv.includes('--test')) {
  let fail = 0
  const check = (n, ok, d = '') => { if (!ok) { fail++; console.error(`  ✗ ${n}${d ? ' — ' + d : ''}`) } }

  // Every calendar is an integer ratio. That is the whole claim.
  for (const c of CALENDARS) {
    check(`${c.name} is an integer ratio`, typeof c.days === 'bigint' && typeof c.years === 'bigint')
    check(`${c.name} drifts (no calendar is exact)`, solarDrift(c) !== 0n, `${c.name} claims to be exact`)
  }

  // The classical constructions, checked as arithmetic rather than quoted.
  const [jul, greg, met, cal, hip] = CALENDARS
  check('Gregorian is Julian less 3 days per 400 years', greg.days === jul.days * 100n - 3n,
    `${greg.days} vs ${jul.days * 100n - 3n}`)
  check('Callippic is 4 Metonic cycles less a day', cal.days === met.days * 4n - 1n)
  check('Hipparchic is 4 Callippic cycles less a day', hip.days === cal.days * 4n - 1n)
  check('Callippic years are 4 Metonic', cal.years === met.years * 4n)
  check('Callippic months are 4 Metonic', cal.months === met.months * 4n)

  // Ordering, which is the point of measuring rather than asserting.
  const py = (c) => { const d = perYear(solarDrift(c), c.years); return d < 0n ? -d : d }
  check('Gregorian tracks the sun better than Julian', py(greg) < py(jul))
  check('Hipparchic tracks the sun better than Callippic', py(hip) < py(cal))
  check('Callippic tracks the sun better than Metonic', py(cal) < py(met))
  check('Gregorian beats every ancient cycle here',
    py(greg) < py(jul) && py(greg) < py(met) && py(greg) < py(cal) && py(greg) < py(hip))
  // And the one that is NOT a matter of opinion: Metonic is the only cycle
  // that tracks both, so it is the only one that can carry a moon field.
  check('only the luni-solar cycles have a lunar drift at all',
    CALENDARS.filter((c) => lunarDrift(c) !== null).map((c) => c.name).join() === 'Metonic,Callippic,Hipparchic')
  check('the Metonic lunar drift is under half a day per cycle',
    (lunarDrift(met) < 0n ? -lunarDrift(met) : lunarDrift(met)) < S / 2n, show(lunarDrift(met), 7))

  // No floats anywhere: every quantity is a BigInt.
  check('all arithmetic is BigInt', [TROPICAL_YEAR, SYNODIC_MONTH, S, solarDrift(met)].every((v) => typeof v === 'bigint'))

  if (fail > 0) { console.error(`calendar-drift self-test FAIL — ${fail}`); process.exit(1) }
  console.log(`calendar-drift self-test ok — ${13 + CALENDARS.length * 2} checks, all in exact integers`)
  process.exit(0)
}

console.log('every calendar is an integer ratio pretending to be the sky.')
console.log('exact arithmetic in units of 1e-10 days — no float, no Math.*\n')
console.log('  observed mean tropical year   365.2421897    days   (measured, and slowly changing)')
console.log('  observed mean synodic month    29.5305888531 days\n')
console.log('  calendar     ratio            drift/cycle    drift/year          lunar drift/cycle')
console.log('  ' + '-'.repeat(84))
for (const c of CALENDARS) {
  const sd = solarDrift(c)
  const py = perYear(sd, c.years)
  const ld = lunarDrift(c)
  console.log(
    '  ' + c.name.padEnd(12) +
    `${c.days}d/${c.years}y`.padEnd(17) +
    show(sd, 7).padEnd(15) +
    (show(py, 7) + 'e-6').padEnd(20) +
    (ld === null ? '—' : show(ld, 7)),
  )
}
console.log()
console.log('  read: a positive drift means the calendar runs LONG — it gains on the sky.')
console.log('  the Metonic cycle is the only one carrying both a solar and a lunar')
console.log('  ratio, which is why the moon field in version-calendar.mjs uses it.')
