# Quick start

Every command on this page is checked by `npm run docs:commands`, and every
import is checked by `npm run entrypoints`. The code examples were run against
the package as installed from npm.

That is worth saying because the previous version of this page was not checked.
It opened by telling you to clone `github.com/your-username/zeropoint-node` — a
placeholder — and then to run three scripts, none of which existed. Every command
in it failed.

## Install

```bash
npm install zeropoint-node
```

## What you can import

```javascript
import { A432Math, A432Sequence } from 'zeropoint-node'

A432Math.digitalRoot(432)              // 9
A432Sequence.generateVortexSequence(6) // [1, 2, 4, 8, 7, 5]
```

Both lines above were run against the published package, installed into an empty
directory — not against a checkout. That distinction matters here, and the
paragraph below explains why.

The doubling circuit `[1, 2, 4, 8, 7, 5]` and the trinity axis `[3, 6, 9]` are
disjoint, and that is a theorem rather than a convention: doubling starts at 1
and folds mod 9, so every term is coprime to 9 and none can be a multiple of 3.
The axis is reachable only by reflection.

## What you cannot import yet

`package.json` advertises 22 entry points. **Only 12 of them can be imported by
a consumer.** The other 10 — including `zeropoint-node/0`, the kernel — resolve
to `src/*.ts`, and Node refuses to strip types for anything under
`node_modules`:

```
ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING
```

So the kernel is reachable in a clone of this repository and not from npm.
`npm run entrypoints` reports which subpaths are usable and fails on any that
are not; it is in the gate so this cannot silently get worse.

This page previously showed `import { digitalRoot } from 'zeropoint-node/0'`,
which does not work. It was "verified" by installing from a local directory,
which does not reproduce the node_modules restriction — so the test passed and
the claim was false. Testing against a path that is not the one users take is
not testing, and shipping that example in 1.0.13 was the exact defect this page
had just been rewritten to fix.

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
