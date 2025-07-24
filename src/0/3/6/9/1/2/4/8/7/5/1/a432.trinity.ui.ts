import { getTrinityDotStyle, trinityFieldState, trinityFieldMap } from './a432.trinity';

/**
 * NOTE: These functions are for browser/DOM use. If using in a non-DOM environment, adapt as needed.
 */

/**
 * TrinityDot: Render a single trinity dot as a div (HTML) with harmonized style.
 */
export function TrinityDot({ trinity, angle = 0, label = null }: { trinity: number, angle?: number, label?: string | null }): any {
  const dot = document.createElement('div');
  dot.style.cssText = getTrinityDotStyle(trinity, angle);
  dot.title = `Trinity: ${trinity} @ ${angle}°`;
  dot.textContent = label !== null ? label : String(trinity);
  return dot;
}

/**
 * TrinityAxis: Render the three trinity axis points (3, 6, 9) on a circle as divs (HTML).
 */
export function TrinityAxis({ size = 180, center = { x: 90, y: 90 } }: { size?: number, center?: { x: number, y: number } }): any {
  const container = document.createElement('div');
  container.style.cssText = `position:relative;width:${size}px;height:${size}px;display:inline-block;`;
  const r = size * 0.36;
  [0, 1, 2].forEach(i => {
    const angle = i * 120;
    const rad = (angle * Math.PI) / 180;
    const x = center.x + r * Math.cos(rad) - 16;
    const y = center.y + r * Math.sin(rad) - 16;
    const trinity = [3, 6, 9][i];
    const dot = TrinityDot({ trinity, angle, label: String(trinity) });
    dot.style.position = 'absolute';
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    container.appendChild(dot);
  });
  return container;
}

/**
 * TrinityFieldMap: Render the full trinity field as a circular map of dots (HTML).
 */
export function TrinityFieldMap({ resolution = 36, size = 240 }: { resolution?: number, size?: number }): any {
  const container = document.createElement('div');
  container.style.cssText = `position:relative;width:${size}px;height:${size}px;display:inline-block;`;
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  for (let i = 0; i < resolution; i++) {
    const angle = (i * 360) / resolution;
    const rad = (angle * Math.PI) / 180;
    const x = cx + r * Math.cos(rad) - 16;
    const y = cy + r * Math.sin(rad) - 16;
    const trinity = trinityFieldState(angle);
    const dot = TrinityDot({ trinity, angle });
    dot.style.position = 'absolute';
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    container.appendChild(dot);
  }
  return container;
}

/**
 * StreamToTrinityField: Render a stream of values as animated/interpolated dots on the trinity field (HTML).
 * The stream is an array of { value, angle } objects.
 */
export function StreamToTrinityField({ stream, size = 240 }: { stream: { value: number, angle: number }[], size?: number }): any {
  const container = document.createElement('div');
  container.style.cssText = `position:relative;width:${size}px;height:${size}px;display:inline-block;`;
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  stream.forEach(({ value, angle }, i) => {
    const rad = (angle * Math.PI) / 180;
    const x = cx + r * Math.cos(rad) - 16;
    const y = cy + r * Math.sin(rad) - 16;
    const trinity = trinityFieldState(angle);
    const dot = TrinityDot({ trinity, angle, label: String(value) });
    dot.style.position = 'absolute';
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.opacity = '0.85';
    container.appendChild(dot);
  });
  return container;
}

/**
 * Usage:
 *   import { TrinityAxis, TrinityFieldMap, StreamToTrinityField, TrinityDot } from './a432.trinity.ui';
 *   document.body.appendChild(TrinityAxis({ size: 200 }));
 *   document.body.appendChild(TrinityFieldMap({ resolution: 36, size: 300 }));
 *   document.body.appendChild(StreamToTrinityField({ stream: [{ value: 7, angle: 45 }, ...] }));
 */ 