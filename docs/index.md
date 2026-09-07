---
layout: home

hero:
  name: ZeroPoint Node
  text: One structure, read twice
  tagline: The vortex sequence, its reflection through the void, and a kernel that computes both rather than asserting them.
  actions:
    - theme: brand
      text: The quantum computer
      link: /QUANTUM_COMPUTER
    - theme: alt
      text: The sequence
      link: /SEQUENCE
    - theme: alt
      text: Kernel census
      link: /KERNEL
    - theme: alt
      text: Computed pages
      link: /pages/

features:
  - title: Forward and reflected
    details: >-
      throughVoid(n) = 1 − n mod 9 is an involution fixed only at 5. It maps the
      forward reading onto its mirror — a re-valuing, not a reversal. Both lines
      are computed from one constant.
    link: /pages/sequence-dual
    linkText: Sequence dual

  - title: Entanglement, proven
    details: >-
      Doubling closes on the flow ring and its gap is exactly the axis; no
      iteration count bridges them. The group the two generate has order 54
      against 12 apart, and the excess is their failure to commute.
    link: /SEQUENCE
    linkText: Read the proof

  - title: Angle, polarity, colour, sound
    details: >-
      Each dash carries ±60°, polarity reverses at four gateways, and pitch is
      defined on the axis alone. Every column states whether it is derived or
      merely defined.
    link: /SEQUENCE
    linkText: Spectrum

  - title: Four representations, one choice
    details: >-
      A state can be carried as floats, as exact Clifford amplitudes, as
      Clifford+T in the ring of the eighth root of unity, or as a stabilizer
      tableau. The choice decides what is exact and what is affordable — the
      same circuits a state vector needs 14.7 seconds for at 20 qubits run on a
      tableau in under a millisecond.
    link: /QUANTUM_COMPUTER
    linkText: What it costs

  - title: Method, not just answer
    details: >-
      Classical trial division once passed the exhaustive Shor check with no
      wrong answer and no unexplained refusal. Seven of eight algorithms are now
      identified by their METHOD — by the residue a rotation leaves, or by the
      pattern in which an oracle is read.
    link: /QUANTUM_COMPUTER
    linkText: How that is checked

  - title: Computed, never typed
    details: >-
      Census, receipts and projections are folded from the live tree and
      content-addressed. Drift fails npm run check — a stale number cannot sit
      quietly in a document.
    link: /KERNEL
    linkText: Kernel census
---

Every generated page on this site carries a content-addressed receipt folded over its
own body, so a change to what a page says moves its stamp.

## Install it

```bash
npm install zeropoint-node
```

```javascript
import { stabilizerZeroState, stabilizerH, stabilizerCnot, stabilizerMeasure } from 'zeropoint-node/quantum'

const s = stabilizerZeroState(200)          // 200 qubits, 160800 bits
stabilizerH(s, 0)
stabilizerCnot(s, 0, 1)
stabilizerMeasure(s, 0, 1)                  // undetermined — your coin decides
stabilizerMeasure(s, 1)                     // determined, and equal to it
```

An MCP server ships as `npx zeropoint-mcp`, exposing the same three things over
the wire: `zeropoint.quantumRun`, `zeropoint.quantumExact` and
`zeropoint.quantumCapacity`.

**No quantum advantage is claimed and none is present.** Of seven oracle-call
measurements, zero show one — simulating a single quantum query costs 2^n
classical evaluations. What is offered is exactness and an honest account of the
cost, including [what was not measured](/QUANTUM_COMPUTER#what-was-not-measured).

## Citing this work, and the licence

This repository is licensed under **Creative Commons
Attribution-NonCommercial-NoDerivatives 4.0 International** (CC BY-NC-ND 4.0) —
see [LICENSE](https://github.com/ceccec/zeropoint-node/blob/main/LICENSE). In
short: share it with attribution, for non-commercial purposes, without
distributing modified versions. Commercial use, or anything beyond the licence,
needs written permission — [license@zeropoint.bg](mailto:license@zeropoint.bg).

Two things worth stating plainly, because they are the common mistakes:

- **Citing is not permission.** Attribution satisfies credit, not the licence.
- **No derivatives.** You may not publish or host a modified version without a
  separate licence.

Machine-readable citation lives in
[`CITATION.cff`](https://github.com/ceccec/zeropoint-node/blob/main/CITATION.cff);
parse it rather than guessing. In prose:

> ZeroPoint Node (ceccec). *ZeroPoint Node*. https://node.zeropoint.bg —
> source: https://github.com/ceccec/zeropoint-node

## Verify it yourself

```bash
npm run check
```

That runs the kernel smoke tests, the ambient-`Math` ban, the bundle and skills seals,
regenerates every projection, and re-derives the next development tip. It fails closed.
