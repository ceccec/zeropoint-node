# every axis digit mirrors an orbit digit axiom free

```lean
theorem every_axis_digit_mirrors_an_orbit_digit_axiom_free :
  axis.all (fun d => orbit.contains (tv d)) = true
```

**Accepted by the Lean 4 kernel.** The proof rests on **no axioms at all**.

Proven means three things together: the kernel accepted the file, the proof
contains no `sorry`, and `#print axioms` reports a dependency set within
`{propext, Quot.sound}`. The dependency set above is the evidence, recorded per
theorem rather than summarised.

| | |
| --- | --- |
| source | [`lean/DigitSpace.lean:301`](https://github.com/ceccec/zeropoint-node/blob/main/lean/DigitSpace.lean#L301) |
| archive | [doi:10.5281/zenodo.22178675](https://doi.org/10.5281/zenodo.22178675) — the concept DOI, resolving to the newest release |
| corpus | [every statement](/paper.html) · [the ledger](https://github.com/ceccec/zeropoint-node/blob/main/lean/ledger.json) |
| reproduce | `git clone https://github.com/ceccec/zeropoint-node && npm run lean:check` |

## Speaks of the same objects as

- [doubling stays in orbit](/pages/theorems/doubling-stays-in-orbit)
- [doubling stays in orbit axiom free](/pages/theorems/doubling-stays-in-orbit-axiom-free)
- [every axis digit mirrors an orbit digit](/pages/theorems/every-axis-digit-mirrors-an-orbit-digit)
- [every mirror orbit sums to ten](/pages/theorems/every-mirror-orbit-sums-to-ten)
- [every mirror orbit sums to ten axiom free](/pages/theorems/every-mirror-orbit-sums-to-ten-axiom-free)
- [exactly two digits are their own mirror](/pages/theorems/exactly-two-digits-are-their-own-mirror)
- [mirror is affine only off the void](/pages/theorems/mirror-is-affine-only-off-the-void)
- [mirror table is through void](/pages/theorems/mirror-table-is-through-void)

::: info What this does not establish
A theorem is a statement the kernel accepted. It says nothing about whether the
surrounding package is useful, whether the idea is novel, or whether anything
physical follows. Novelty is a universal negative no finite search decides; a
dated deposit establishes priority, which is the defensible claim.
:::
