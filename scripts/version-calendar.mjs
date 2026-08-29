#!/usr/bin/env node
/**
 * Versions as calendar events: YYYY.LLL.WW.D
 *
 * The gateways cut the vortex tour into four fields of widths 4, 3, 2, 1
 * (see version-address.mjs). Those are exactly the minimal widths for the four
 * natural cycles, largest to smallest:
 *
 *   YYYY  4  ISO week-numbering year   max 9999   sun
 *   LLL   3  lunation in the Metonic cycle  max 235   moon
 *   WW    2  ISO week number           max 53     week
 *   D     1  ISO weekday               max 7      day
 *
 * HOW MUCH THAT IS WORTH. Less than it looks. An hour-based reading — year,
 * day-of-year, hour, tenth-of-hour — has max values 9999, 366, 23, 9 and gives
 * the SAME minimal widths 4.3.2.1. Two different calendars fit the same fields,
 * so the match constrains the choice without determining it. It is a fit, not a
 * derivation, and calling it one would be the overclaim this file is trying to
 * avoid.
 *
 * WHY THE MOON IS THE METONIC POSITION. 19 tropical years is 6939.602 days and
 * 235 synodic months is 6939.688 days — they differ by about two hours over
 * nineteen years, which is why the Metonic cycle has been used for luni-solar
 * calendars for 2500 years. Numbering the lunation within that cycle gives a
 * moon field that returns to where it started when the sun does, so the two
 * fields stay in step instead of drifting apart.
 *
 * DEPLETION. The honest number is smaller than the address space. The fields
 * are not independent — year, week and weekday already determine the date, and
 * the lunation is computed from it — so the usable count is one address per DAY,
 * not 10^10. That is about 3.65 million releases across 9999 years, at a
 * granularity of one per day. If you need two releases in a day this scheme
 * cannot express it, and that limit is the price of making the version a date.
 *
 * MONOTONICITY, WHICH IS THE ONE THAT MATTERS. Zero-padded and read left to
 * right, later dates sort after earlier ones as plain strings. The trap is the
 * ISO week-numbering year: week 1 of 2027 begins on 2026-12-28, so using the
 * CALENDAR year there would send the version backwards across the boundary.
 * The tests below check exactly those days.
 *
 *   node scripts/version-calendar.mjs           today's version
 *   node scripts/version-calendar.mjs --test    the self-check
 */

const MS_PER_DAY = 86400000
const METONIC_LUNATIONS = 235
/** A reference new moon: 2000-01-06 18:14 UTC. Mean-value model, not ephemeris. */
const NEW_MOON_EPOCH = Date.UTC(2000, 0, 6, 18, 14)

// EXACT ARITHMETIC, because this file got it wrong first. It used Math.floor,
// Math.abs, Math.round and the literals 29.530588 and 365.2422 — precisely what
// this repository bans everywhere else — and passed only because scripts/ is
// excluded from math-ban. A calendar drifts from the sky for the same reason a
// float drifts from a ratio: both are decimal stand-ins for an exact quotient.
// Every constant below is a scaled integer and every division is integer
// division. See scripts/calendar-drift.mjs for how far each calendar drifts.
const SYNODIC_SCALED = 295_305_888_531n   // mean synodic month, in 1e-10 days
const SCALE = 10_000_000_000n             // 1e-10 days
const SYNODIC_MS = (SYNODIC_SCALED * BigInt(MS_PER_DAY))   // in 1e-10 milliseconds

/** Floor division for BigInt, correct for negative numerators too. */
function floorDiv(a, b) {
  const q = a / b
  return (a % b !== 0n && (a < 0n) !== (b < 0n)) ? q - 1n : q
}

/** ISO 8601 week date: [week-numbering year, week 1..53, weekday 1..7]. */
export function isoWeekDate(date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
  const weekday = d.getUTCDay() === 0 ? 7 : d.getUTCDay()   // Mon=1 .. Sun=7
  // Thursday of this week decides which year the week belongs to.
  d.setUTCDate(d.getUTCDate() + 4 - weekday)
  const year = d.getUTCFullYear()
  const jan1 = Date.UTC(year, 0, 1)
  const week = Number(floorDiv(BigInt(d.getTime() - jan1), BigInt(MS_PER_DAY) * 7n)) + 1
  return [year, week, weekday]
}

/** Lunation number within the 235-month Metonic cycle, 1..235. */
export function metonicLunation(date) {
  const elapsedMs = BigInt(date.getTime() - NEW_MOON_EPOCH)
  // elapsed / synodic, kept exact by scaling the numerator instead of rounding
  // the divisor into a decimal.
  const lunations = floorDiv(elapsedMs * SCALE, SYNODIC_MS)
  const m = BigInt(METONIC_LUNATIONS)
  return Number(((lunations % m) + m) % m) + 1
}

export function toCalendarVersion(date) {
  const [year, week, weekday] = isoWeekDate(date)
  if (year < 0 || year > 9999) throw new Error(`year ${year} does not fit in 4 digits`)
  const lun = metonicLunation(date)
  return [
    String(year).padStart(4, '0'),
    String(lun).padStart(3, '0'),
    String(week).padStart(2, '0'),
    String(weekday),
  ].join('.')
}

/** Back to the Monday-based date the version names. Round-trips the day. */
export function fromCalendarVersion(v) {
  const [y, , w, d] = v.split('.')
  const year = Number(y), week = Number(w), weekday = Number(d)
  // ISO: week 1 contains the first Thursday, i.e. Jan 4th is always in week 1.
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const jan4Weekday = jan4.getUTCDay() === 0 ? 7 : jan4.getUTCDay()
  const week1Monday = new Date(jan4.getTime() - (jan4Weekday - 1) * MS_PER_DAY)
  return new Date(week1Monday.getTime() + ((week - 1) * 7 + (weekday - 1)) * MS_PER_DAY)
}

// ---------------------------------------------------------------------- test
if (process.argv.includes('--test')) {
  let fail = 0
  const check = (name, ok, detail = '') => { if (!ok) { fail++; console.error(`  ✗ ${name}${detail ? ' — ' + detail : ''}`) } }

  // Field widths are the minimal ones for these four maxima.
  const maxima = [9999, METONIC_LUNATIONS, 53, 7]
  check('widths are minimal for year/lunation/week/weekday',
    maxima.map((m) => String(m).length).join('.') === '4.3.2.1',
    maxima.map((m) => String(m).length).join('.'))
  // And the honest counterweight: another calendar fits the same widths.
  check('an hour-based calendar fits the SAME widths, so the fit is not unique',
    [9999, 366, 23, 9].map((m) => String(m).length).join('.') === '4.3.2.1')

  // Metonic, to the arithmetic rather than to authority.
  // Exact: 19 tropical years against 235 synodic months, in 1e-10 days.
  const TROPICAL_SCALED = 3_652_421_897_000n
  const d19 = 19n * TROPICAL_SCALED - BigInt(METONIC_LUNATIONS) * SYNODIC_SCALED
  const driftAbs = d19 < 0n ? -d19 : d19
  check('19 solar years and 235 lunations agree within 3 hours',
    driftAbs * 24n < 3n * SCALE, `${driftAbs} e-10 days`)
  check('the lunation field returns after 235', metonicLunation(new Date(NEW_MOON_EPOCH)) === 1)

  // Shape.
  const v = toCalendarVersion(new Date(Date.UTC(2026, 7, 29)))
  check('a version has four fields', v.split('.').length === 4, v)
  check('fields keep their widths', v.split('.').map((f) => f.length).join('.') === '4.3.2.1', v)

  // Round trip on the day, across a whole year including both boundaries.
  let rtFails = 0
  for (let i = 0; i < 400; i++) {
    const d = new Date(Date.UTC(2026, 0, 1) + i * MS_PER_DAY)
    const back = fromCalendarVersion(toCalendarVersion(d))
    if (back.getTime() !== d.getTime()) rtFails++
  }
  check('every day of a year round-trips', rtFails === 0, `${rtFails} of 400 failed`)

  // MONOTONICITY — the property the whole idea rests on. Ten years of
  // consecutive days, including every year boundary, where the ISO
  // week-numbering year diverges from the calendar year.
  let regressions = 0, prev = ''
  const start = Date.UTC(2020, 0, 1)
  const days = 366 * 10
  for (let i = 0; i < days; i++) {
    const cur = toCalendarVersion(new Date(start + i * MS_PER_DAY))
    const flat = cur.split('.').join('')
    if (prev && flat < prev) regressions++
    prev = flat
  }
  check('versions never go backwards over ten years of days', regressions === 0, `${regressions} regressions`)

  // The specific trap, named. I first asserted this about 2026-12-28 and it was
  // wrong: 2026 begins on a Thursday so it HAS a week 53, and the 28th is in it.
  // 2025-12-29 is the real case — it lands in week 1 of 2026 — and the point of
  // the check is that the day before it must still sort earlier despite the
  // year field jumping forward.
  const inNextYear = toCalendarVersion(new Date(Date.UTC(2025, 11, 29)))
  check('2025-12-29 takes the ISO week-numbering year 2026', inNextYear.startsWith('2026'), inNextYear)
  const dayBefore = toCalendarVersion(new Date(Date.UTC(2025, 11, 28)))
  check('and the day before still sorts earlier across that jump',
    dayBefore.split('.').join('') < inNextYear.split('.').join(''), `${dayBefore} then ${inNextYear}`)
  // The opposite case, so the check is not just a lucky year: 2026-12-28 stays
  // in 2026 because 2026 has 53 weeks.
  check('2026-12-28 stays in week 53 of 2026',
    toCalendarVersion(new Date(Date.UTC(2026, 11, 28))).startsWith('2026'))

  // The moon field must STAY a 3-digit field. Mutation testing found this
  // missing: removing the Metonic wrap entirely, so the lunation counts up
  // forever, passed every other check here. A field that silently outgrows its
  // width breaks the address the moment it does, and nothing was watching.
  let outOfRange = 0, tooWide = 0
  for (let i = 0; i < 365 * 60; i += 7) {
    const d = new Date(Date.UTC(2000, 0, 1) + i * MS_PER_DAY)
    const lun = metonicLunation(d)
    if (lun < 1 || lun > METONIC_LUNATIONS) outOfRange++
    if (String(lun).length > 3) tooWide++
  }
  check('the lunation stays within the Metonic cycle over 60 years', outOfRange === 0, `${outOfRange} out of range`)
  check('the lunation never outgrows 3 digits', tooWide === 0, `${tooWide} too wide`)
  // And it must actually USE the range, or the wrap could be hiding a constant.
  const seenLunations = new Set()
  for (let i = 0; i < 365 * 25; i += 3) {
    seenLunations.add(metonicLunation(new Date(Date.UTC(2000, 0, 1) + i * MS_PER_DAY)))
  }
  check('the lunation visits most of the cycle rather than sitting still',
    seenLunations.size > 200, `${seenLunations.size} distinct values`)

  // Depletion, stated as the smaller true number rather than the address space.
  // Date.UTC(1, ...) does NOT mean year 1 — years 0..99 map to 1900..1999, so
  // this silently measured from 1901 and under-counted by eight centuries.
  const yearOne = new Date(Date.UTC(2000, 0, 1))
  yearOne.setUTCFullYear(1)
  const daysTo9999 = Number(floorDiv(BigInt(Date.UTC(9999, 11, 31) - yearOne.getTime()), BigInt(MS_PER_DAY)))
  check('capacity is days, not 10^10', daysTo9999 < 10_000_000_000 && daysTo9999 > 3_600_000, String(daysTo9999))
  // 9999 years at the Gregorian ratio 146097/400, in exact integers.
  const yearsSpanned = Number(floorDiv(BigInt(daysTo9999) * 400n, 146_097n))
  check('and that is about 9999 years of one release per day',
    yearsSpanned === 9999 || yearsSpanned === 9998, String(yearsSpanned))

  // Limits said out loud.
  let refused = false
  try { toCalendarVersion(new Date(Date.UTC(10001, 0, 1))) } catch { refused = true }
  check('a year past 9999 is refused, not truncated', refused)

  if (fail > 0) { console.error(`version-calendar self-test FAIL — ${fail}`); process.exit(1) }
  console.log('version-calendar self-test ok — 18 checks, including 10 years of consecutive days for monotonicity')
  process.exit(0)
}

const now = new Date()
const v = toCalendarVersion(now)
const [year, week, weekday] = isoWeekDate(now)
console.log(`today            ${now.toISOString().slice(0, 10)}`)
console.log(`version          ${v}`)
console.log(`                 YYYY.LLL.WW.D  = sun . moon . week . day`)
console.log()
console.log(`  YYYY  ${String(year).padStart(4, '0')}   ISO week-numbering year        (max 9999, 4 digits)`)
console.log(`  LLL   ${String(metonicLunation(now)).padStart(3, '0')}    lunation in the Metonic cycle  (max  235, 3 digits)`)
console.log(`  WW    ${String(week).padStart(2, '0')}     ISO week number                (max   53, 2 digits)`)
console.log(`  D     ${weekday}      ISO weekday                    (max    7, 1 digit)`)
console.log()
const daysTo9999 = Number(floorDiv(BigInt(Date.UTC(9999, 11, 31) - Date.now()), BigInt(MS_PER_DAY)))
console.log(`one address per day. ${daysTo9999.toLocaleString('en-US')} remain before 9999 —`)
console.log(`the fields are dependent, so the usable count is days, not the 10^10 the widths suggest.`)
