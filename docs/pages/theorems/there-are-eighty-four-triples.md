# there are eighty four triples

```lean
theorem there_are_eighty_four_triples :
  triples.length = 84
```

**Accepted by the Lean 4 kernel.** The proof rests on **no axioms at all**.

Proven means three things together: the kernel accepted the file, the proof
contains no `sorry`, and `#print axioms` reports a dependency set within
`{propext, Quot.sound}`. The dependency set above is the evidence, recorded per
theorem rather than summarised.

| | |
| --- | --- |
| source | [`lean/DigitSpace.lean:460`](https://github.com/ceccec/zeropoint-node/blob/main/lean/DigitSpace.lean#L460) |
| archive | [doi:10.5281/zenodo.22178675](https://doi.org/10.5281/zenodo.22178675) — the concept DOI, resolving to the newest release |
| corpus | [every statement](/paper.html) · [the ledger](https://github.com/ceccec/zeropoint-node/blob/main/lean/ledger.json) |
| reproduce | `git clone https://github.com/ceccec/zeropoint-node && npm run lean:check` |

## Speaks of the same objects as

- [four triples are closed under the mirror](/pages/theorems/four-triples-are-closed-under-the-mirror)
- [no triple is closed under both maps](/pages/theorems/no-triple-is-closed-under-both-maps)
- [the axis is the only triple closed under doubling](/pages/theorems/the-axis-is-the-only-triple-closed-under-doubling)
- [the digit root nine sum does not single out the axis](/pages/theorems/the-digit-root-nine-sum-does-not-single-out-the-axis)

::: info What this does not establish
A theorem is a statement the kernel accepted. It says nothing about whether the
surrounding package is useful, whether the idea is novel, or whether anything
physical follows. Novelty is a universal negative no finite search decides; a
dated deposit establishes priority, which is the defensible claim.
:::
