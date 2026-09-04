# being an involution is not enough for harmony

```lean
theorem being_an_involution_is_not_enough_for_harmony :
  swap12 1 + 1 ≠ swap12 3 + 3
```

**Accepted by the Lean 4 kernel.** The proof rests on **no axioms at all**.

Proven means three things together: the kernel accepted the file, the proof
contains no `sorry`, and `#print axioms` reports a dependency set within
`{propext, Quot.sound}`. The dependency set above is the evidence, recorded per
theorem rather than summarised.

| | |
| --- | --- |
| source | [`lean/DigitSpace.lean:260`](https://github.com/ceccec/zeropoint-node/blob/main/lean/DigitSpace.lean#L260) |
| archive | [doi:10.5281/zenodo.22178675](https://doi.org/10.5281/zenodo.22178675) — the concept DOI, resolving to the newest release |
| corpus | [every statement](/paper.html) · [the ledger](https://github.com/ceccec/zeropoint-node/blob/main/lean/ledger.json) |
| reproduce | `git clone https://github.com/ceccec/zeropoint-node && npm run lean:check` |

## Speaks of the same objects as

- [non fixed points come in pairs](/pages/theorems/non-fixed-points-come-in-pairs)
- [swap12 is an involution](/pages/theorems/swap12-is-an-involution)
- [the mirror is the involution with a constant orbit sum](/pages/theorems/the-mirror-is-the-involution-with-a-constant-orbit-sum)

::: info What this does not establish
A theorem is a statement the kernel accepted. It says nothing about whether the
surrounding package is useful, whether the idea is novel, or whether anything
physical follows. Novelty is a universal negative no finite search decides; a
dated deposit establishes priority, which is the defensible claim.
:::
