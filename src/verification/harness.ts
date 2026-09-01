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
