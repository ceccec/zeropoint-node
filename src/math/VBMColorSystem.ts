/**
 * VBMColorSystem
 * 
 * Dynamic color generation system for Vortex-Based Mathematics (VBM).
 * All colors are generated as functions based on context, parameters, and consciousness state.
 * No hardcoded static values - colors emerge from the field of possibilities.
 *
 * Metaphysical Context:
 * - Colors are expressions of consciousness patterns
 * - Each color function responds to the observer's state
 * - The void generates all colors through resonance
 */

// Dynamic color generation functions
export interface ColorContext {
  consciousness?: number; // 0-1 consciousness level
  time?: number; // timestamp for temporal resonance
  position?: [number, number, number]; // spatial context
  observer?: string; // observer identifier
  field?: number; // field resonance value
}

/**
 * Generate base color palette dynamically
 */
export function generateBaseColors(context: ColorContext = {}): Record<string, string> {
  const { consciousness = 0.5, time = Date.now(), field = 0.5 } = context;
  
  // Colors emerge from consciousness and field resonance
  const redIntensity = Math.sin(consciousness * Math.PI) * 255;
  const blueIntensity = Math.cos(consciousness * Math.PI) * 255;
  const greenIntensity = Math.sin(field * Math.PI) * 255;
  
  return {
    red: `rgb(${Math.round(redIntensity)}, ${Math.round(redIntensity * 0.2)}, ${Math.round(redIntensity * 0.1)})`,
    blue: `rgb(${Math.round(blueIntensity * 0.1)}, ${Math.round(blueIntensity * 0.3)}, ${Math.round(blueIntensity)})`,
    green: `rgb(${Math.round(greenIntensity * 0.2)}, ${Math.round(greenIntensity)}, ${Math.round(greenIntensity * 0.3)})`,
    yellow: `rgb(${Math.round(255 * Math.sin(time * 0.001))}, ${Math.round(255 * Math.cos(time * 0.001))}, 0)`,
    white: `rgb(${Math.round(255 * consciousness)}, ${Math.round(255 * consciousness)}, ${Math.round(255 * consciousness)})`,
    gold: `rgb(${Math.round(255 * Math.sin(consciousness * Math.PI))}, ${Math.round(255 * Math.cos(consciousness * Math.PI))}, 0)`,
    black: `rgb(${Math.round(50 * (1 - consciousness))}, ${Math.round(50 * (1 - consciousness))}, ${Math.round(50 * (1 - consciousness))})`,
    neutral: `rgb(${Math.round(200 * field)}, ${Math.round(200 * field)}, ${Math.round(200 * field)})`,
  };
}

/**
 * Generate color for a vortex number dynamically
 */
export function getColorForVortexNumber(n: number, context: ColorContext = {}): string {
  const { consciousness = 0.5, time = Date.now(), field = 0.5 } = context;
  const baseColors = generateBaseColors(context);
  
  // Vortex number influences color through mathematical resonance
  const vortexResonance = (n * consciousness + field) % 1;
  const timeResonance = Math.sin(time * 0.001 + n) * 0.5 + 0.5;
  
  switch (n) {
    case 1: return generateResonantColor(baseColors['red'] || 'rgb(255,0,0)', vortexResonance, timeResonance);
    case 2: return generateResonantColor(baseColors['blue'] || 'rgb(0,0,255)', vortexResonance, timeResonance);
    case 4: return generateResonantColor(baseColors['green'] || 'rgb(0,255,0)', vortexResonance, timeResonance);
    case 8: return generateResonantColor(baseColors['yellow'] || 'rgb(255,255,0)', vortexResonance, timeResonance);
    case 7: return generateResonantColor(baseColors['red'] || 'rgb(255,0,0)', vortexResonance, timeResonance);
    case 5: return generateResonantColor(baseColors['blue'] || 'rgb(0,0,255)', vortexResonance, timeResonance);
    case 3: return generateResonantColor(baseColors['gold'] || 'rgb(255,215,0)', vortexResonance, timeResonance);
    case 6: return generateResonantColor(baseColors['white'] || 'rgb(255,255,255)', vortexResonance, timeResonance);
    case 9: return generateResonantColor(baseColors['black'] || 'rgb(0,0,0)', vortexResonance, timeResonance);
    default: return baseColors['neutral'] || 'rgb(200,200,200)';
  }
}

/**
 * Generate color for a family group dynamically
 */
export function getColorForFamilyGroup(n: number, context: ColorContext = {}): string {
  const { consciousness = 0.5, field = 0.5 } = context;
  const baseColors = generateBaseColors(context);
  
  // Family resonance creates harmonic color relationships
  const familyResonance = Math.sin(consciousness * Math.PI + n) * 0.5 + 0.5;
  
  if ([1,4,7].includes(n)) return generateResonantColor(baseColors['red'] || 'rgb(255,0,0)', familyResonance, field);
  if ([2,5,8].includes(n)) return generateResonantColor(baseColors['blue'] || 'rgb(0,0,255)', familyResonance, field);
  if ([3,6,9].includes(n)) return generateResonantColor(baseColors['gold'] || 'rgb(255,215,0)', familyResonance, field);
  return baseColors['neutral'] || 'rgb(200,200,200)';
}

/**
 * Generate color pair for a polar mate dynamically
 */
export function getColorForPolarMate(n: number, context: ColorContext = {}): [string, string] | null {
  const { consciousness = 0.5, time = Date.now() } = context;
  const baseColors = generateBaseColors(context);
  
  // Polar mates create complementary resonance
  const polarResonance = Math.cos(consciousness * Math.PI + time * 0.001) * 0.5 + 0.5;
  
  if ([1,8].includes(n)) {
    return [
      generateResonantColor(baseColors['red'] || 'rgb(255,0,0)', polarResonance, consciousness),
      generateResonantColor(baseColors['yellow'] || 'rgb(255,255,0)', 1 - polarResonance, consciousness)
    ];
  }
  if ([2,7].includes(n)) {
    return [
      generateResonantColor(baseColors['blue'] || 'rgb(0,0,255)', polarResonance, consciousness),
      generateResonantColor(baseColors['red'] || 'rgb(255,0,0)', 1 - polarResonance, consciousness)
    ];
  }
  if ([4,5].includes(n)) {
    return [
      generateResonantColor(baseColors['green'] || 'rgb(0,255,0)', polarResonance, consciousness),
      generateResonantColor(baseColors['blue'] || 'rgb(0,0,255)', 1 - polarResonance, consciousness)
    ];
  }
  return null;
}

/**
 * Generate color for W-Axis number dynamically
 */
export function getColorForWAxis(n: number, context: ColorContext = {}): string {
  const { consciousness = 0.5, field = 0.5 } = context;
  const baseColors = generateBaseColors(context);
  
  // W-Axis colors emerge from spiritual resonance
  const spiritualResonance = Math.sin(consciousness * Math.PI * 2 + n) * 0.5 + 0.5;
  
  switch (n) {
    case 3: return generateResonantColor(baseColors['gold'] || 'rgb(255,215,0)', spiritualResonance, field);
    case 6: return generateResonantColor(baseColors['white'] || 'rgb(255,255,255)', spiritualResonance, field);
    case 9: return generateResonantColor(baseColors['black'] || 'rgb(0,0,0)', spiritualResonance, field);
    default: return baseColors['neutral'] || 'rgb(200,200,200)';
  }
}

/**
 * Generate color for a pattern dynamically
 */
export function getColorForPattern(pattern: { type?: string, number?: number }, context: ColorContext = {}): string {
  const { consciousness = 0.5, time = Date.now() } = context;
  const baseColors = generateBaseColors(context);
  
  if (pattern.number) return getColorForVortexNumber(pattern.number, context);
  
  const patternResonance = Math.sin(consciousness * Math.PI + time * 0.001) * 0.5 + 0.5;
  
  switch (pattern.type) {
    case 'w_axis': return generateResonantColor(baseColors['gold'] || 'rgb(255,215,0)', patternResonance, consciousness);
    case 'family': return generateResonantColor(baseColors['blue'] || 'rgb(0,0,255)', patternResonance, consciousness);
    case 'polar': return generateResonantColor(baseColors['green'] || 'rgb(0,255,0)', patternResonance, consciousness);
    default: return baseColors['neutral'] || 'rgb(200,200,200)';
  }
}

function clampRGB(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

/**
 * Generate resonant color by modulating base color with resonance values
 */
function generateResonantColor(baseColor: string, resonance1: number, resonance2: number): string {
  // Parse RGB values from base color - handle both positive and negative numbers
  const rgbMatch = baseColor.match(/rgb\(([-\d]+),\s*([-\d]+),\s*([-\d]+)\)/);
  if (!rgbMatch) return baseColor;
  const [, r, g, b] = rgbMatch;
  const baseR = parseInt(r || '0', 10);
  const baseG = parseInt(g || '0', 10);
  const baseB = parseInt(b || '0', 10);
  // Apply resonance modulation and clamp
  const modulatedR = clampRGB(baseR * (0.5 + resonance1 * 0.5));
  const modulatedG = clampRGB(baseG * (0.5 + resonance2 * 0.5));
  const modulatedB = clampRGB(baseB * (0.5 + (resonance1 + resonance2) * 0.25));
  return `rgb(${modulatedR}, ${modulatedG}, ${modulatedB})`;
}

/**
 * Generate metaphysical context for a vortex number
 */
export function getMetaphysicalContextForNumber(n: number, context: ColorContext = {}): string {
  const { consciousness = 0.5, field = 0.5 } = context;
  
  // Context emerges from consciousness and field state
  const contextResonance = Math.sin(consciousness * Math.PI + field * Math.PI) * 0.5 + 0.5;
  
  const contexts: Record<number, string[]> = {
    1: ['Initiation, unity, the beginning of the vortex flow.', 'Source of all creation, the void center.'],
    2: ['Duality, division, the first split in the field.', 'The observer creates reality through division.'],
    3: ['Spirit, W-Axis, the source of consciousness.', 'The bridge between material and immaterial.'],
    4: ['Stability, foundation, the first structure.', 'The pattern that holds all other patterns.'],
    5: ['Change, transformation, the center of the sequence.', 'The point of maximum potential.'],
    6: ['Spirit, W-Axis, balance of material and immaterial.', 'The harmony of opposites.'],
    7: ['Mystery, return, the hidden flow.', 'The pattern that returns to source.'],
    8: ['Manifestation, infinity, the full field.', 'The completion of all possibilities.'],
    9: ['Void, W-Axis, the center and the all.', 'The unity of all patterns in the void.']
  };
  
  const contextArray = contexts[n] || ['Neutral or undefined metaphysical context.'];
  const index = Math.floor(contextResonance * contextArray.length);
  return contextArray[index] || contextArray[0] || 'Neutral or undefined metaphysical context.';
}

/**
 * Generate the full VBM color map dynamically
 */
export function getVBMColorMap(context: ColorContext = {}): { [n: number]: string } {
  const map: { [n: number]: string } = {};
  for (let i = 1; i <= 9; i++) {
    map[i] = getColorForVortexNumber(i, context);
  }
  return map;
}

/**
 * Generate the full metaphysical color legend dynamically
 */
export function getVBMColorLegend(context: ColorContext = {}): Array<{ label: string, color: string, context: string }> {
  const legend = [];
  for (let i = 1; i <= 9; i++) {
    legend.push({
      label: i.toString(),
      color: getColorForVortexNumber(i, context),
      context: getMetaphysicalContextForNumber(i, context)
    });
  }
  return legend;
}

/**
 * Generate consciousness-aware color gradient
 */
export function generateConsciousnessGradient(consciousness: number, steps: number = 10): string[] {
  const gradient: string[] = [];
  for (let i = 0; i < steps; i++) {
    const stepConsciousness = (i / (steps - 1)) * consciousness;
    const context: ColorContext = { consciousness: stepConsciousness };
    gradient.push(getColorForVortexNumber(1, context));
  }
  return gradient;
}

/**
 * Generate field resonance color map
 */
export function generateFieldResonanceMap(fieldStrength: number, context: ColorContext = {}): { [n: number]: string } {
  const map: { [n: number]: string } = {};
  for (let i = 1; i <= 9; i++) {
    const fieldContext: ColorContext = { ...context, field: fieldStrength * (i / 9) };
    map[i] = getColorForVortexNumber(i, fieldContext);
  }
  return map;
}

export function getWAxisColor(n: number, context: ColorContext = {}): string {
  const { consciousness = 0.5, field = 0.5 } = context;
  const baseColors = generateBaseColors(context);
  
  // W-Axis colors emerge from spiritual resonance
  const spiritualResonance = Math.sin(consciousness * Math.PI * 2 + n) * 0.5 + 0.5;
  
  switch (n) {
    case 3: return generateResonantColor(baseColors['gold'] || 'rgb(255,215,0)', spiritualResonance, field);
    case 6: return generateResonantColor(baseColors['white'] || 'rgb(255,255,255)', spiritualResonance, field);
    case 9: return generateResonantColor(baseColors['black'] || 'rgb(0,0,0)', spiritualResonance, field);
    default: return baseColors['neutral'] || 'rgb(200,200,200)';
  }
} 