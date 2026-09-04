# doubling and mirror are affine axiom free

```lean
theorem doubling_and_mirror_are_affine_axiom_free :
  (agl.contains (affineTable 2 0) && agl.contains (affineTable 8 1)) = true
```

**Accepted by the Lean 4 kernel.** The proof rests on **no axioms at all**.

Proven means three things together: the kernel accepted the file, the proof
contains no `sorry`, and `#print axioms` reports a dependency set within
`{propext, Quot.sound}`. The dependency set above is the evidence, recorded per
theorem rather than summarised.

| | |
| --- | --- |
| source | [`lean/DigitSpace.lean:307`](https://github.com/ceccec/zeropoint-node/blob/main/lean/DigitSpace.lean#L307) |
| archive | [doi:10.5281/zenodo.22178675](https://doi.org/10.5281/zenodo.22178675) — the concept DOI, resolving to the newest release |
| corpus | [every statement](/paper.html) · [the ledger](https://github.com/ceccec/zeropoint-node/blob/main/lean/ledger.json) |
| reproduce | `git clone https://github.com/ceccec/zeropoint-node && npm run lean:check` |

## Speaks of the same objects as

- [agl has order 54](/pages/theorems/agl-has-order-54)
- [doubling and mirror are affine](/pages/theorems/doubling-and-mirror-are-affine)
- [mirror is affine only off the void](/pages/theorems/mirror-is-affine-only-off-the-void)
- [mirror table is through void](/pages/theorems/mirror-table-is-through-void)
- [mirror table is through void axiom free](/pages/theorems/mirror-table-is-through-void-axiom-free)

::: info What this does not establish
A theorem is a statement the kernel accepted. It says nothing about whether the
surrounding package is useful, whether the idea is novel, or whether anything
physical follows. Novelty is a universal negative no finite search decides; a
dated deposit establishes priority, which is the defensible claim.
:::
