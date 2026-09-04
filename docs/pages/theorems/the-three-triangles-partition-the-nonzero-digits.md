# the three triangles partition the nonzero digits

```lean
theorem the_three_triangles_partition_the_nonzero_digits :
  triangleOne.length + triangleTwo.length + axis.length = 9 ∧ nonzero.all (fun d => triangleOne.contains d || triangleTwo.contains d || axis.contains d) = true
```

**Accepted by the Lean 4 kernel.** The proof rests on **no axioms at all**.

Proven means three things together: the kernel accepted the file, the proof
contains no `sorry`, and `#print axioms` reports a dependency set within
`{propext, Quot.sound}`. The dependency set above is the evidence, recorded per
theorem rather than summarised.

| | |
| --- | --- |
| source | [`lean/DigitSpace.lean:524`](https://github.com/ceccec/zeropoint-node/blob/main/lean/DigitSpace.lean#L524) |
| archive | [doi:10.5281/zenodo.22178675](https://doi.org/10.5281/zenodo.22178675) — the concept DOI, resolving to the newest release |
| corpus | [every statement](/paper.html) · [the ledger](https://github.com/ceccec/zeropoint-node/blob/main/lean/ledger.json) |
| reproduce | `git clone https://github.com/ceccec/zeropoint-node && npm run lean:check` |

## Speaks of the same objects as

- [every axis digit mirrors an orbit digit](/pages/theorems/every-axis-digit-mirrors-an-orbit-digit)
- [every axis digit mirrors an orbit digit axiom free](/pages/theorems/every-axis-digit-mirrors-an-orbit-digit-axiom-free)
- [every mirror orbit sums to ten](/pages/theorems/every-mirror-orbit-sums-to-ten)
- [every mirror orbit sums to ten axiom free](/pages/theorems/every-mirror-orbit-sums-to-ten-axiom-free)
- [mirror table is through void](/pages/theorems/mirror-table-is-through-void)
- [mirror table is through void axiom free](/pages/theorems/mirror-table-is-through-void-axiom-free)
- [orbit and axis and void exhaust the digits](/pages/theorems/orbit-and-axis-and-void-exhaust-the-digits)
- [orbit and axis are disjoint](/pages/theorems/orbit-and-axis-are-disjoint)

::: info What this does not establish
A theorem is a statement the kernel accepted. It says nothing about whether the
surrounding package is useful, whether the idea is novel, or whether anything
physical follows. Novelty is a universal negative no finite search decides; a
dated deposit establishes priority, which is the defensible claim.
:::
