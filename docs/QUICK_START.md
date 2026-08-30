# Quick start

Every command and every line of code on this page is checked. `npm run docs:commands`
fails if a command here names a script that does not exist, and the examples are
taken from the generated [API reference](API_REFERENCE.md), which is read from
the package's own entry points.

That is worth saying because the previous version of this page was not checked.
It opened by telling you to clone `github.com/your-username/zeropoint-node` — a
placeholder — and then to run three scripts, none of which existed. Every command
in it failed.

## Install

```bash
npm install zeropoint-node
```

## The kernel

The package's smallest surface is `zeropoint-node/0`: the digit arithmetic
everything else is built on.

```javascript
import { digitalRoot, throughVoid, VORTEX_ORBIT, VORTEX_AXIS } from 'zeropoint-node/0'

digitalRoot(432)   // 9   — repeatedly sum the digits until one remains
throughVoid(4)     // 6   — reflect a digit through the void

VORTEX_ORBIT       // [1, 2, 4, 8, 7, 5]  the doubling circuit
VORTEX_AXIS        // [3, 6, 9]           the trinity axis
```

The orbit and the axis are disjoint, and that is a theorem rather than a
convention: doubling starts at 1 and folds mod 9, so every term is coprime to 9
and none can be a multiple of 3. The axis is reachable only by reflection —
`throughVoid` sends 1, 4, 7 to 9, 6, 3.

## Gateways

A gateway is a digit where the stroke reverses direction along the tour
`1\2\4\8/7/5/3\6\9/0\1`. There are exactly four, and they are computed from the
stroke rather than listed.

```javascript
import { vortexStrokeGateways } from 'zeropoint-node/0'

vortexStrokeGateways().gateways   // [8, 3, 9, 0]
```

Note that 6 is on the axis and is **not** a gateway. Being on the axis is not
what makes one, which is why they have to be derived.

## Running the checks

The repository is built around checks that can fail. From a clone:

```bash
npm run check
```

That runs the whole gate. Individually, the ones worth knowing:

```bash
npm run test:kernel
npm run quantum:sim
npm run quantum:proof
npm run coverage:audit
npm run api:reference
```

`quantum:proof` is worth a look: it recomputes 24 checks against the simulator,
algorithms, error-correction and variational code. It used to count sentences —
28 unconditional increments in a file that imported no quantum code — and
reported 32 of 32 with perfect confidence. It reports what it recomputes now,
and says INCOMPLETE where a layer verifies nothing.

`coverage:audit` reports how much of the package nothing exercises. As of this
writing that is 348 exported functions of 1136. It is not a number the project
is proud of; it is on the page because a reader deserves to know which parts
have never been run.

## Where to go next

- [API reference](API_REFERENCE.md) — generated from the entry points, 472 exports
- [The sequence](SEQUENCE.md) — what the digits are and why
- [Kernel](KERNEL.md) — generated from the kernel's own source
