# whole axis and root nine is exactly thirty six

```lean
theorem whole_axis_and_root_nine_is_exactly_thirty_six :
  ∀ b ∈ List.range 100, (((b * 3) % 12 = 0 ∧ (b * 6) % 12 = 0 ∧ (b * 9) % 12 = 0) ∧ b % 9 = 0) ↔ b % 36 = 0
```

**Accepted by the Lean 4 kernel.** The proof rests on **no axioms at all**.

Proven means three things together: the kernel accepted the file, the proof
contains no `sorry`, and `#print axioms` reports a dependency set within
`{propext, Quot.sound}`. The dependency set above is the evidence, recorded per
theorem rather than summarised.

| | |
| --- | --- |
| source | [`lean/DigitSpace.lean:152`](https://github.com/ceccec/zeropoint-node/blob/main/lean/DigitSpace.lean#L152) |
| archive | [doi:10.5281/zenodo.22178675](https://doi.org/10.5281/zenodo.22178675) — the concept DOI, resolving to the newest release |
| corpus | [every statement](/paper.html) · [the ledger](https://github.com/ceccec/zeropoint-node/blob/main/lean/ledger.json) |
| reproduce | `git clone https://github.com/ceccec/zeropoint-node && npm run lean:check` |


::: info What this does not establish
A theorem is a statement the kernel accepted. It says nothing about whether the
surrounding package is useful, whether the idea is novel, or whether anything
physical follows. Novelty is a universal negative no finite search decides; a
dated deposit establishes priority, which is the defensible claim.
:::
