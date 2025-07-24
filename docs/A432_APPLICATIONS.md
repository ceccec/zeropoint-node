# A432 Application Map

This document enumerates concrete application layers that sit on top of the immutable math nucleus.
All code lives in the canonical directory `src/0/3/6/9/1/2/4/8/7/5/1/` and imports **only**
`a432.math.ts` and its re-exports.

| Layer | Entry file | Stream source | Purpose |
|-------|------------|---------------|---------|
| Visual Yin-Yang | `a432.yin.yang.controller.ts` | `vortexStream()` | Canvas symbol, polarity colours |
| Tone Chess | `a432.chess.controller.ts` | `toneBoardStream()` | 8×8 board colour matrix |
| Metatron 3-D | `a432.metatron.controller.ts` | `a432SequenceStream()` | SVG/Three JS node pulses |
| Terminal Flow | `a432.terminal.controller.ts` | `terminalOutput$` | CLI colour stream |
| Quantum Mock-up | `a432.quantum.ts` | `linear` + `vortex` | Digit-based quantum evolution example |

## How to extend
1. Pick a physical or business variable → map it to a single digit (metric or vortex).
2. Write a pure digit function `f: Digit×Digit → Digit` to express evolution.
3. Pipe the result through existing helpers (`angle`, `CMYK`, `frequency`).
4. Surface via a new controller or API endpoint.

## HTTP Harmoniser (server)
`a432.server.ts` responds to **any** URL:
* extracts digits, computes vortex digit → 200 JSON with RGB
* no digits or forbidden chars → digit 8 mapping → HTTP 404 (still RGB)

## Zero-entropy checklist (per app)
- [ ] No new arrays >1 digit
- [ ] Uses only helpers from `a432.math.ts`
- [ ] Handles impossibility via collision/fold or dot-switch
- [ ] Filename starts with `a432.` 