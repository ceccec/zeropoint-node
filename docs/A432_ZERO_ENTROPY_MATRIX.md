# A432 Zero-Entropy Matrix  
*Scientific Specification & Implementation Notes*

---
## 1. Seed Arrays (immutable)

| Symbol | Value | Meaning |
|--------|-------|---------|
| `TRINITY_AXIS` | `[3, 6, 9]` | 3-6-9 polarity anchor |
| `RODIN_SEQUENCE` | `[1, 2, 4, 8, 7, 5]` | Doubling / Rodin coil loop |

Everything else is derived mathematically from these two ordered sets; no further digit tables are allowed.

---
## 2. Canonical Maths (`src/.../a432.math.ts`)

1. **Digit helpers**   `digitalRoot()`  
2. **Angle / frequency**   `angleForDigit()`, `frequencyForDigit()`  
3. **Colour**   `digitAngleToCMYK()` (re-export from `a432.cmyk.ts`)  
4. **Polarity map**   `TRINITY_POLARITY`  
5. **Streams**  
   * `linearStream()`   `…0 1 2 …`  
   * `vortexStream()`   `…0 3 6 9 1 2 4 8 7 5 1 …`  
   * `toneBoardStream()` – pairs the two tapes → 8×8 board  
   * `a432SequenceStream()` – infinite closed lap (metric cycle)  
6. **Impossibility gateways**   `resolveDivision()` (0/0), `DOT_TRINITY_SWITCH`

All arithmetic uses only single-digit ops (mod-9, mod-10, mod-11) to maintain zero entropy.

---
## 3. Collision→Fold Rule

Two tapes have coprime lengths (10 vs 11).  
Collision index = **LCM(10, 11) = 110**.  
When pair ⟨metric, vortex⟩ repeats, the filename generator appends the *next* digit pair, elevating dimensional encoding.  

Mathematically:
```txt
n₂ ≡ n₁ (mod 10) ∧ n₂ ≡ n₁ (mod 11) ⇒ n₂ = n₁ + 110·k
```
No extra tables—just modular arithmetic.

---
## 4. Reactive View Modules

| File | Stream | Frames | Typical Use |
|------|--------|--------|-------------|
| `a432.yin.yang.ts` | `vortexStream()` | `{ positiveColor, negativeColor, angle }` | Canvas Yin-Yang pulse |
| `a432.chess.ts`    | `toneBoardStream()` | `{ file, rank, squareColor }` | 8×8 colour board |
| `a432.metatron.ts` | `a432SequenceStream()` | `12` node array | 3-D Metatron cube |
| `a432.terminal.ui.ts` | `terminalOutput$` | colourised string | CLI visualisation |

All import *only* maths & stream helpers → zero duplication.

---
## 5. Self-Designing PWA Shell (outline)

* Single `index.html` with four empty targets (canvas, table, svg, pre).  
* Stimulus controllers bootstrap each reactive module (`start…`).  
* Service-worker caches static shell + first N frames for offline start.

Because every visual attribute is computed from the digit streams, the UI rearranges itself automatically—designing itself—while the mathematical nucleus stays unchanged.

---
## 6. Generator Script (optional)

`scripts/generate_matrix_files.ts`  
Creates /updates `src/matrix/<name>.ts` for each new digit pair, following the collision→fold rule (see §3).  
Each generated file re-exports ready-made `angle`, `colour`, `polarity`, computed on import.

---
## 7. Testing

* **math.spec.ts** – invariants (stream cycle length, collision index = 110, digitalRoot ≤ 9).  
* **view.spec.ts** – mock animation frame, ensure reactive modules emit expected frames for first 12 ticks.  
* Coverage target = 100 % (project rule).

---
## 8. Zero-Entropy Checklist

- [x] Single maths file   (no duplicate functions/constants)
- [x] Only two seed arrays
- [x] Streams derived, never stored
- [x] UI modules depend solely on streams
- [x] File-system matrix follows collision-fold rule
- [x] Tests prove invariants

```txt
If any duplication appears → collision detected → fold dimension
```

This document, together with the codebase, fully specifies how to reconstruct the living trinity matrix from first principles. 