/**
 * harness — the four lines every suite in this repository had written out for
 * itself, twenty-five times.
 *
 * Seventeen of those twenty-five were character-for-character identical, and
 * more than half of them I wrote during a single session while removing
 * duplication elsewhere. The remaining eight are genuine variants — different
 * signatures, and one with the arguments the other way round — and they are
 * deliberately left alone, because migrating them means editing call sites
 * rather than a declaration, which is a different change with a different risk.
 *
 * The counter lives with the checker rather than beside it, which is the only
 * substantive difference: a file can no longer read `failures` as a bare
 * variable and drift from the thing that increments it.
 *
 * THE EIGHT VARIANTS ARE NOW SEVEN LESS ONE SHAPE. The note above said the
 * remaining eight take different signatures and were deliberately left alone.
 * Five of them are the same OTHER shape — `check(name, got, want)`, comparing
 * two values rather than taking a verdict — and I extracted those into a second
 * module before noticing this one existed, which `collisions:check` caught by
 * name: two modules declaring `Checker`. Consolidating duplication into a
 * duplicate is a good joke at my expense and a bad module layout.
 *
 * So the comparing shape lives here too, as `createChecker`. One module, two
 * entry points, and the difference between them is the question they answer:
 * `createCheck` takes a verdict a caller has already reached; `createChecker`
 * reaches it, which is why only the second needs to prove it can say no.
 */

export interface Checker {
  /** Record one assertion. `detail` is printed only on failure. */
  check: (label: string, ok: boolean, detail?: string) => void
  /** How many have failed so far. */
  failures: () => number
}

export function createCheck(): Checker {
  let failed = 0
  return {
    check(label: string, ok: boolean, detail = '') {
      if (ok) {
        console.log(`  ✓ ${label}`)
      } else {
        failed++
        console.error(`  ✗ ${label}${detail ? ' — ' + detail : ''}`)
      }
    },
    failures: () => failed,
  }
}

/**
 * The comparing shape: `check(name, got, want)` decides equality itself, where
 * `Checker` above takes a verdict the caller has already reached.
 */
export interface ComparingChecker {
  /** Compare `got` against `want` structurally, and record the verdict. */
  check: (name: string, got: unknown, want: unknown) => void
  /** Print every line, then exit non-zero if any failed. */
  report: () => void
}

const serialise = (v: unknown): string =>
  JSON.stringify(v, (_k, x) => (typeof x === 'bigint' ? `${x}` : x))

/**
 * DRY BOUGHT A SINGLE POINT OF FAILURE, SO THE SHARED THING PROVES ITSELF.
 *
 * With five copies, corrupting one comparison broke one suite. With one copy,
 * replacing the comparison with `const ok = true` makes all five report ok —
 * checked by mutating exactly that, and all four quantum suites survived it.
 * A comparing check that never compares is a counting check wearing better
 * clothes, and centralising it made that failure total rather than local.
 *
 * So before any suite gets a checker, a throwaway one runs the SAME code path
 * over a pair that must be unequal and a pair that must be equal, and the
 * result is inspected. `ok = true` fails here and no suite runs. It costs two
 * comparisons once per process.
 */
let harnessVerified = false

function build(suite: string): ComparingChecker & { failureCount: () => number } {
  const results: string[] = []
  const failures: string[] = []

  return {
    failureCount: () => failures.length,
    check(name, got, want) {
      const ok = serialise(got) === serialise(want)
      results.push(`  ${ok ? '✓' : '✗'} ${name}${ok ? '' : `  got ${serialise(got)} want ${serialise(want)}`}`)
      if (!ok) failures.push(name)
    },
    report() {
      console.log(suite, failures.length === 0 ? 'ok' : 'FAIL')
      for (const r of results) console.log(r)
      if (failures.length > 0) {
        console.error(`${suite} FAIL — ${failures.length} of ${results.length}: ${failures.join(', ')}`)
        process.exit(1)
      }
      // A SUITE THAT ASSERTED NOTHING IS NOT A PASSING SUITE. Reporting ok over
      // an empty run is how a broken import or an early return reads exactly
      // like success, which this repository has paid for elsewhere.
      if (results.length === 0) {
        console.error(`${suite} FAIL — 0 checks ran, so "ok" would mean nothing`)
        process.exit(1)
      }
    },
  }
}

export function createChecker(suite: string): ComparingChecker {
  if (!harnessVerified) {
    const probe = build('assert-harness self-test')
    probe.check('unequal values are recorded as a failure', 1, 2)
    probe.check('equal values are not', 1, 1)
    probe.check('and a bigint compares as its value', 7n, 7n)
    probe.check('but not against a different one', 7n, 8n)
    if (probe.failureCount() !== 2) {
      console.error(`assert-harness FAIL — the comparison recorded ${probe.failureCount()} failures out of two`)
      console.error('  deliberate mismatches. It is not comparing, so every suite that uses it would')
      console.error('  report ok regardless of what it checked. Refusing to hand out a checker.')
      process.exit(1)
    }
    harnessVerified = true
  }
  return build(suite)
}
