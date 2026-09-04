# the digit root nine sum does not single out the axis

```lean
theorem the_digit_root_nine_sum_does_not_single_out_the_axis :
  (triples.filter (fun t => dr (t.foldl (· + ·) 0) == 9)).length = 10
```

**Accepted by the Lean 4 kernel.** The proof rests on **no axioms at all**.

Proven means three things together: the kernel accepted the file, the proof
contains no `sorry`, and `#print axioms` reports a dependency set within
`{propext, Quot.sound}`. The dependency set above is the evidence, recorded per
theorem rather than summarised.

| | |
| --- | --- |
| source | [`lean/DigitSpace.lean:484`](https://github.com/ceccec/zeropoint-node/blob/main/lean/DigitSpace.lean#L484) |
| archive | [doi:10.5281/zenodo.22178675](https://doi.org/10.5281/zenodo.22178675) — the concept DOI, resolving to the newest release |
| corpus | [every statement](/paper.html) · [the ledger](https://github.com/ceccec/zeropoint-node/blob/main/lean/ledger.json) |
| reproduce | `git clone https://github.com/ceccec/zeropoint-node && npm run lean:check` |

## Speaks of the same objects as

- [astronomical unit has digital root three](/pages/theorems/astronomical-unit-has-digital-root-three)
- [base frequency has digital root nine](/pages/theorems/base-frequency-has-digital-root-nine)
- [dr and drTS differ at zero](/pages/theorems/dr-and-drTS-differ-at-zero)
- [dr idempotent](/pages/theorems/dr-idempotent)
- [dr invariant under nine](/pages/theorems/dr-invariant-under-nine)
- [dr is drTS above zero](/pages/theorems/dr-is-drTS-above-zero)
- [four triples are closed under the mirror](/pages/theorems/four-triples-are-closed-under-the-mirror)
- [light year has digital root nine](/pages/theorems/light-year-has-digital-root-nine)

::: info What this does not establish
A theorem is a statement the kernel accepted. It says nothing about whether the
surrounding package is useful, whether the idea is novel, or whether anything
physical follows. Novelty is a universal negative no finite search decides; a
dated deposit establishes priority, which is the defensible claim.
:::
