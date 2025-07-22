import { A432ColorModel, A432HSL, A432RGB, A432CMYK } from './a432.color';

/**
 * Generates a harmonized vortex/trinity SVG icon.
 * @param size Icon size
 * @param colorModel 'hsl' | 'rgb' | 'cmyk' (default: 'hsl')
 * @returns SVG string
 * Metaphysical: Vortex icon as living color projection (HSL: consciousness, RGB: manifestation, CMYK: trinity/void)
 */
export function generateVortexIcon(size: number = 192, colorModel: 'hsl' | 'rgb' | 'cmyk' = 'hsl'): string {
  // Helper to get color string from color models
  function getColor(d: number, colorModel: 'hsl' | 'rgb' | 'cmyk' = 'hsl'): string {
    const models = A432ColorModel.getAllColorModels(d);
    if (colorModel === 'rgb') return `rgb(${models.rgb.r},${models.rgb.g},${models.rgb.b})`;
    if (colorModel === 'cmyk') return `cmyk(${models.cmyk.c.toFixed(2)},${models.cmyk.m.toFixed(2)},${models.cmyk.y.toFixed(2)},${models.cmyk.k.toFixed(2)})`;
    return `hsl(${models.hsl.hue},${models.hsl.saturation}%,${models.hsl.lightness}%)`;
  }
  const colors = [1, 2, 4, 8, 7, 5].map(d => getColor(d, colorModel));
  const center = size * 0.5;
  const r = size * 0.4;
  let paths = '';
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * 2 * Math.PI;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    paths += `<circle cx="${x}" cy="${y}" r="${size * 0.111}" fill="${colors[i]}"/>`;
  }
  // Center trinity
  const centerColor = getColor(3, colorModel);
  paths += `<circle cx="${center}" cy="${center}" r="${size * 0.125}" fill="${centerColor}"/>`;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">${paths}</svg>`;
}

/**
 * Generates a harmonized consciousness/observer SVG icon.
 */
export function generateObserverIcon(size: number = 192, colorModel: 'hsl' | 'rgb' | 'cmyk' = 'hsl'): string {
  // Helper to get color string from color models
  function getColor(d: number, colorModel: 'hsl' | 'rgb' | 'cmyk' = 'hsl'): string {
    const models = A432ColorModel.getAllColorModels(d);
    if (colorModel === 'rgb') return `rgb(${models.rgb.r},${models.rgb.g},${models.rgb.b})`;
    if (colorModel === 'cmyk') return `cmyk(${models.cmyk.c.toFixed(2)},${models.cmyk.m.toFixed(2)},${models.cmyk.y.toFixed(2)},${models.cmyk.k.toFixed(2)})`;
    return `hsl(${models.hsl.hue},${models.hsl.saturation}%,${models.hsl.lightness}%)`;
  }
  const center = size * 0.5;
  const r = size * 0.6; // 2/5
  const color = getColor(9, colorModel);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="${center}" cy="${center}" rx="${r}" ry="${r * 0.6}" fill="${color}" stroke="#fff" stroke-width="${size * 0.03}"/>
    <circle cx="${center}" cy="${center}" r="${size * 0.125}" fill="#222233" stroke="#fff" stroke-width="${size * 0.02}"/>
  </svg>`;
}

/**
 * Generates a harmonized matrix SVG icon (nested squares/circles).
 */
export function generateMatrixIcon(size: number = 192, colorModel: 'hsl' | 'rgb' | 'cmyk' = 'hsl'): string {
  // Helper to get color string from color models
  function getColor(d: number, colorModel: 'hsl' | 'rgb' | 'cmyk' = 'hsl'): string {
    const models = A432ColorModel.getAllColorModels(d);
    if (colorModel === 'rgb') return `rgb(${models.rgb.r},${models.rgb.g},${models.rgb.b})`;
    if (colorModel === 'cmyk') return `cmyk(${models.cmyk.c.toFixed(2)},${models.cmyk.m.toFixed(2)},${models.cmyk.y.toFixed(2)},${models.cmyk.k.toFixed(2)})`;
    return `hsl(${models.hsl.hue},${models.hsl.saturation}%,${models.hsl.lightness}%)`;
  }
  const center = size * 0.5;
  let shapes = '';
  for (let i = 0; i < 4; i++) {
    const r = size * (0.45 - i * 0.1); // 9/20, 7/20, 5/20, 3/20
    shapes += `<circle cx="${center}" cy="${center}" r="${r}" fill="none" stroke="${getColor((i * 2 + 1) % 9 || 9, colorModel)}" stroke-width="${size * 0.03}"/>`;
    shapes += `<rect x="${center - r}" y="${center - r}" width="${2 * r}" height="${2 * r}" fill="none" stroke="${getColor((i * 3 + 1) % 9 || 9, colorModel)}" stroke-width="${size * 0.02}"/>`;
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">${shapes}</svg>`;
}

/**
 * Generates a harmonized meta/Mobius SVG icon (spiral path).
 */
export function generateMetaIcon(size: number = 192, colorModel: 'hsl' | 'rgb' | 'cmyk' = 'hsl'): string {
  // Helper to get color string from color models
  function getColor(d: number, colorModel: 'hsl' | 'rgb' | 'cmyk' = 'hsl'): string {
    const models = A432ColorModel.getAllColorModels(d);
    if (colorModel === 'rgb') return `rgb(${models.rgb.r},${models.rgb.g},${models.rgb.b})`;
    if (colorModel === 'cmyk') return `cmyk(${models.cmyk.c.toFixed(2)},${models.cmyk.m.toFixed(2)},${models.cmyk.y.toFixed(2)},${models.cmyk.k.toFixed(2)})`;
    return `hsl(${models.hsl.hue},${models.hsl.saturation}%,${models.hsl.lightness}%)`;
  }
  const center = size * 0.5;
  const turns = 2;
  const points = [];
  for (let t = 0; t <= 1; t += 1/60) {
    const angle = turns * 2 * Math.PI * t;
    const r = size * 0.1 + size * 0.6 * t;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  const color = getColor(6, colorModel);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <polyline points="${points.join(' ')}" fill="none" stroke="${color}" stroke-width="${size * 0.045}" stroke-linecap="round"/>
  </svg>`;
}

/**
 * Converts an SVG string to a PNG data URI (for manifest/UI integration).
 * Here, we return a data URI for the SVG directly for browser use.
 */
export function svgToDataUri(svg: string): string {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
} 