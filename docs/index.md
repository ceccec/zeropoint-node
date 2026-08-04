---
layout: home

hero:
  name: ZeroPoint Node
  text: One structure, read twice
  tagline: The vortex sequence, its reflection through the void, and a kernel that computes both rather than asserting them.
  actions:
    - theme: brand
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

  - title: Computed, never typed
    details: >-
      Census, receipts and projections are folded from the live tree and
      content-addressed. Drift fails npm run check — a stale number cannot sit
      quietly in a document.
    link: /KERNEL
    linkText: Kernel census
---

## What this corpus claims, and what it refuses

The arithmetic here is exact and checkable. The presentation layer built on top of it —
colour mappings, a 432 Hz reference pitch — is a **chosen convention**, not a discovery.
Those two things are kept apart deliberately, because the arithmetic is strong enough
that dressing it as physics would only make it easier to dismiss.

- **Exact**: the mirror involution, the ±60° dash algebra and its closure, the gateway
  set, the mod-3 colour partition, the axis frequencies as integer ratios of 432.
- **Defined convention**: `hue = 36d`; the CMYK transform; A432 as reference pitch
  (the ISO 16 standard is 440 Hz).
- **Refused**: that any of this explains consciousness, physics, or biology.

Every generated page on this site carries a content-addressed receipt folded over its
own body, so a change to what a page says moves its stamp.

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
