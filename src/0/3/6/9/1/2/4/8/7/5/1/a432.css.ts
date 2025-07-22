/**
 * a432.css.ts — Harmonized CSS for A432 UI Streams
 *
 * - All color, spacing, and sizing use integer/fractional math.
 * - Classes: .a432-font-stream, .a432-glyph, .a432-glyph-svg, .a432-trinity-visual, .a432-tooltip
 * - Metaphysical mapping: Each class encodes a living, harmonic state or interaction.
 */

export const a432CSS = `
.a432-font-stream {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  font-size: 11/5em;
  line-height: 11/10;
  margin: 0 0 24px 0;
}
.a432-glyph {
  transition: transform 2/5s, box-shadow 2/5s;
  display: inline-block;
  cursor: pointer;
  border-radius: 1em;
  box-shadow: 0 2px 8px rgba(0,0,0,2/25);
  padding: 0 4px;
}
.a432-glyph:hover, .a432-glyph:focus {
  transform: scale(59/50) translateY(-8px);
  box-shadow: 0 4px 16px rgba(0,0,0,4/25);
  z-index: 2;
}
.a432-glyph-svg {
  display: inline-block;
  vertical-align: middle;
  width: 48px;
  height: 48px;
  margin: 0 2px;
}
.a432-trinity-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px 0;
}
.a432-tooltip {
  position: absolute;
  background: hsl(240, 33%, 96%);
  color: #222;
  border: 1px solid hsl(240, 33%, 80%);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 1em;
  box-shadow: 0 2px 8px rgba(0,0,0,2/25);
  pointer-events: none;
  z-index: 10;
  min-width: 120px;
  max-width: 320px;
  transition: opacity 2/10s;
  opacity: 0;
}
.a432-glyph:hover + .a432-tooltip, .a432-glyph:focus + .a432-tooltip {
  opacity: 1;
}
`; 