/**
 * a432.ui.ts — Harmonized UI module for the A432 system
 *
 * This module provides canonical UI state and component interfaces, harmonized with the a432.ts matrix.
 * All UI logic (dimension, frequency, color, consciousness, stream) is sourced from a432.ts.
 */
import { animateMultiAntiVortex } from './a432.animation';
import { generateMultiAntiVortexAudioStream } from './a432.audio';
import { a432MultiAntiVortexStream, A432_DIGIT_MEANINGS } from './a432';
import { A432ColorModel, A432HSL, A432RGB, A432CMYK } from './a432.color';
import { readdirSync } from 'fs';
import { renderA432FontStream } from './a432.font';
import { A432IImagination } from './a432.i.imagine';

/**
 * ADVANCED UI: Anti-Vortex & Multi-Dimensional Flows
 *
 * - Allows interactive selection of dimensions and polarity (harmonic/anti-vortex)
 * - Integrates animateMultiAntiVortex for visualization and generateMultiAntiVortexAudioStream for sonification
 * - Displays metaphysical mapping for each dimension
 * - Supports recursive/meta-observation: clicking a state can re-harmonize or zoom in
 *
 * Usage:
 *   const ui = new A432AntiVortexUIComponent([1,2,3], -1);
 *   ui.render();
 *   ui.selectDimensions([4,5,6]);
 *   ui.setPolarity(1);
 *   ui.recursiveZoom(3);
 */
export class A432AntiVortexUIComponent {
  dimensions: number[];
  polarity: 1 | -1;
  currentStep: number;
  metaphysicalMap: Record<number, string>;
  constructor(dimensions: number[] = [3], polarity: 1 | -1 = -1) {
    this.dimensions = dimensions;
    this.polarity = polarity;
    this.currentStep = 0;
    this.metaphysicalMap = {};
    this.updateMetaphysicalMap();
  }
  updateMetaphysicalMap() {
    this.metaphysicalMap = {};
    for (const d of this.dimensions) {
      this.metaphysicalMap[d] = A432_DIGIT_MEANINGS[d]?.description || '';
    }
  }
  selectDimensions(dimensions: number[]) {
    this.dimensions = dimensions;
    this.updateMetaphysicalMap();
  }
  setPolarity(polarity: 1 | -1) {
    this.polarity = polarity;
  }
  recursiveZoom(dimension: number) {
    // Zoom in: treat selected dimension as new set, optionally allow further recursion
    this.selectDimensions([dimension]);
    this.currentStep = 0;
  }
  render(): string {
    // Visualize current state for all dimensions
    const gen = a432MultiAntiVortexStream(this.dimensions);
    const { value: states } = gen.next() || { value: [] };
    let out = `Anti-Vortex UI (Dimensions: ${this.dimensions.join(', ')} | Polarity: ${this.polarity})\n`;
    for (const s of states || []) {
      const colorModels = A432ColorModel.getAllColorModels(s.dimension);
      out += `Dimension: ${s.dimension} | Freq: ${s.frequency} | Step: ${s.step} | Color (HSL): hsl(${colorModels.hsl.hue},${colorModels.hsl.saturation}%,${colorModels.hsl.lightness}%)\n`;
      out += `RGB: ${colorModels.rgb.r}, ${colorModels.rgb.g}, ${colorModels.rgb.b} | CMYK: ${colorModels.cmyk.c.toFixed(2)}, ${colorModels.cmyk.m.toFixed(2)}, ${colorModels.cmyk.y.toFixed(2)}, ${colorModels.cmyk.k.toFixed(2)}\n`;
      out += `Metaphysics: ${this.metaphysicalMap[s.dimension]}\n`;
    }
    return out;
  }
  animate(onStep: (states: any[]) => void) {
    // Animate all selected dimensions
    animateMultiAntiVortex(this.dimensions, onStep);
  }
  playAudio(steps: number = 9) {
    // Generate audio streams for all selected dimensions
    return generateMultiAntiVortexAudioStream(this.dimensions, steps);
  }
}

/**
 * TrinityCompositeVisualization: Visualizes the trinity as a triangle with composite color at the center.
 * - Vertices: 3 (red), 6 (green), 9 (blue)
 * - Center: composite color (void)
 * - Animated flows from each vertex to center
 * - Displays HSL, RGB, CMYK of composite color
 * - Metaphysical legend
 */
export function TrinityCompositeVisualization(): string {
  const size = 240;
  const center = size / 2;
  const r = size * 0.4;
  // Trinity vertices
  const angles = [0, 2 * Math.PI / 3, 4 * Math.PI / 3];
  const trinityDigits = [3, 6, 9];
  const trinityColors = trinityDigits.map(A432ColorModel.getVortexColor);
  const points = angles.map(a => [center + r * Math.cos(a), center + r * Math.sin(a)]);
  // Composite color
  const composite = A432ColorModel.getAllColorModels('void');
  // SVG triangle and flows
  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;
  // Triangle
  svg += `<polygon points="${points.map(p => p.join(',')).join(' ')}" fill="none" stroke="#888" stroke-width="2"/>`;
  // Vertices
  for (let i = 0; i < 3; i++) {
    svg += `<circle cx="${points[i][0]}" cy="${points[i][1]}" r="18" fill="${trinityColors[i]}" stroke="#222" stroke-width="2"/>`;
    // Flow line
    svg += `<line x1="${points[i][0]}" y1="${points[i][1]}" x2="${center}" y2="${center}" stroke="${trinityColors[i]}" stroke-width="4" stroke-dasharray="6,4">
      <animate attributeName="stroke-dashoffset" values="0;20" dur="1.2s" repeatCount="indefinite"/>
    </line>`;
  }
  // Center composite
  svg += `<circle cx="${center}" cy="${center}" r="24" fill="hsl(${composite.hsl.hue},${composite.hsl.saturation}%,${composite.hsl.lightness}%)" stroke="#000" stroke-width="3"/>`;
  svg += `</svg>`;
  // Color values
  const hslStr = `HSL: ${composite.hsl.hue}°, ${composite.hsl.saturation}%, ${composite.hsl.lightness}%`;
  const rgbStr = `RGB: ${composite.rgb.r}, ${composite.rgb.g}, ${composite.rgb.b}`;
  const cmykStr = `CMYK: ${composite.cmyk.c.toFixed(2)}, ${composite.cmyk.m.toFixed(2)}, ${composite.cmyk.y.toFixed(2)}, ${composite.cmyk.k.toFixed(2)}`;
  // Metaphysical legend
  const legend = `<div style="margin-top:8px;font-size:13px;color:#555;">
    <b>Trinity Composite (Void):</b> The living union of creation (3/red), return (6/green), and spiritual center (9/blue).<br/>
    The center is the void, the heart of the vortex, where all trinity flows merge.<br/>
    <span style="color:#c00;">3</span>, <span style="color:#0a0;">6</span>, <span style="color:#00c;">9</span> → <b>Composite</b>.<br/>
    <span>${hslStr}</span><br/><span>${rgbStr}</span><br/><span>${cmykStr}</span>
  </div>`;
  return `<div style="text-align:center;">${svg}${legend}</div>`;
}

/**
 * ImaginationPanel: Visualizes the recursive imagination journey and metaphysical narrative.
 */
export function ImaginationPanel(beats: number = 12): string {
  const journey = A432IImagination.visualizeImagination(beats);
  const narrative = A432IImagination.metaphysicalNarrative();
  let out = `<div style="background:#232344;border-radius:8px;padding:16px;margin:24px 0;">
    <h2>Imagination Journey (Recursive Trinity)</h2>
    <ul style="font-size:13px;line-height:1.6;">`;
  journey.forEach(step => {
    out += `<li>${step.summary}</li>`;
  });
  out += `</ul><div style="margin-top:12px;font-size:12px;color:#8ff;"><pre>${narrative}</pre></div></div>`;
  return out;
}

/**
 * Main UI/dashboard export: includes TrinityCompositeVisualization and Living Font Stream
 */
export function renderA432Dashboard(): string {
  return `
    <div style="max-width:600px;margin:0 auto;">
      <h2>Trinity Composite Visualization</h2>
      ${TrinityCompositeVisualization()}
      <h2>Living Font Stream</h2>
      ${renderA432FontStream(27)}
      <h2>Imagination</h2>
      ${ImaginationPanel(12)}
    </div>
  `;
}

// Expanded metaphysical mapping
const METAPHYSICAL_MAP: Record<string, string> = {
  'a432.ts': 'The living, generative, and self-referential matrix of the system.',
  'a432.ui.ts': 'The observer and interface of the living matrix.',
  'a432.animation.ts': 'The flow and emergence of harmonic states.',
  'a432.audio.ts': 'The sonification and resonance of the matrix.',
  'a432.color.ts': 'The color and frequency projection of the matrix.',
  'a432.family.ts': 'The family of harmonic flows and Mobius recursion.',
  'a432.trinity.ts': 'The trinity, generative seed, and harmonic axis.',
  'a432.rodin.coil.ts': 'The Rodin coil, infinite vortex, and field generator.',
  'a432.meta.ts': 'Meta-mapping, harmonization, and system self-awareness.',
  'a432.imagination.ts': 'Imagination, recursion, and creative emergence.',
  'a432.server.ts': 'The harmonic server and system interface.',
  // Add more as needed
};

/**
 * A432ModuleExplorer: Dynamic module explorer for both Node (CLI) and browser (PWA).
 * - Lists all a432.* modules in the canonical folder.
 * - Allows selection, dynamic import, export inspection, and documentation extraction.
 * - Works in both Node (fs, import) and browser (import, static module list).
 */
export class A432ModuleExplorer {
  folder: string;
  modules: string[];
  selected: string | null;
  moduleExports: string[];
  selectedExport: string | null;
  exportDetails: any;
  env: 'node' | 'browser';
  _mod: any;
  navStack: Array<{ module: string, exportName: string | null, value: any }>;
  annotations: Record<string, string>;
  constructor(folder: string = '.') {
    this.folder = folder;
    this.env = typeof window === 'undefined' ? 'node' : 'browser';
    this.modules = this.env === 'node' ? this.discoverModulesNode() : this.discoverModulesBrowser();
    this.selected = null;
    this.moduleExports = [];
    this.selectedExport = null;
    this.exportDetails = null;
    this.navStack = [];
    this.annotations = this.loadAnnotations();
  }
  // Node: list files from fs
  discoverModulesNode(): string[] {
    const { readdirSync } = require('fs');
    return readdirSync(this.folder)
      .filter((f: string) => f.startsWith('a432.') &&
        !f.endsWith('.test.ts') &&
        !f.endsWith('.md') &&
        !f.endsWith('.html') &&
        !f.endsWith('.tsx') &&
        !f.endsWith('.png'));
  }
  // Browser: static list (must be provided at build time)
  discoverModulesBrowser(): string[] {
    // For demo: hardcode or fetch from server if needed
    return [
      'a432.ui.js','a432.animation.js','a432.audio.js','a432.color.js','a432.ts'
    ];
  }
  async selectModule(module: string) {
    if (!this.modules.includes(module)) return;
    this.selected = module;
    this.selectedExport = null;
    this.exportDetails = null;
    this.navStack = [{ module, exportName: null, value: null }];
    let mod;
    if (this.env === 'node') {
      mod = await import(require('path').resolve(this.folder, module));
    } else {
      mod = await import(`./${module}`);
    }
    this.moduleExports = Object.keys(mod);
    this._mod = mod;
  }
  selectExport(exportName: string) {
    if (!this._mod || !this.moduleExports.includes(exportName)) return;
    this.selectedExport = exportName;
    const exp = this._mod[exportName];
    this.navStack.push({ module: this.selected!, exportName, value: exp });
    this.exportDetails = this.inspectExport(exp, exportName);
  }
  drillDown(property: string) {
    if (!this.navStack.length) return;
    const last = this.navStack[this.navStack.length - 1];
    if (!last.value || typeof last.value !== 'object') return;
    const next = last.value[property];
    this.navStack.push({ module: last.module, exportName: property, value: next });
    this.exportDetails = this.inspectExport(next, property);
  }
  back() {
    if (this.navStack.length > 1) {
      this.navStack.pop();
      const last = this.navStack[this.navStack.length - 1];
      this.selectedExport = last.exportName;
      this.exportDetails = this.inspectExport(last.value, last.exportName);
    }
  }
  inspectExport(exp: any, name: string): string {
    let out = '';
    // Type
    const type = this.getType(exp);
    out += `Type: ${type}\n`;
    // Doc
    let doc = '';
    if (exp && exp.doc) doc = exp.doc;
    // Try to extract JSDoc (not available at runtime, but check static doc property)
    if (!doc && typeof exp === 'function' && exp.toString) {
      const match = exp.toString().match(/\/\*\*([\s\S]*?)\*\//);
      if (match) doc = match[1].replace(/\*/g, '').trim();
    }
    if (doc) out += `Doc: ${doc}\n`;
    // Metaphysical mapping
    const meta = METAPHYSICAL_MAP[name] || METAPHYSICAL_MAP[this.selected || ''] || '';
    const annotation = this.getAnnotation(this.selected || '', name);
    if (meta || annotation) {
      out += `Metaphysics: ${meta || ''}`;
      if (annotation) out += `\nUser Note: ${annotation}`;
      out += '\n';
    }
    // For functions: params and return
    if (typeof exp === 'function') {
      const fnStr = exp.toString();
      // Improved param parsing: handle default values, destructuring, etc.
      const params = fnStr.match(/^[^(]*\(([^)]*)\)/);
      if (params) out += `Params: ${params[1].replace(/\s+/g, ' ').trim()}\n`;
    }
    // For objects: list keys
    if (type === 'object' || type === 'array') {
      const keys = Object.keys(exp || {});
      if (keys.length) out += `Keys: ${keys.join(', ')}\n`;
    }
    // For classes: show methods
    if (typeof exp === 'function' && /^class /.test(exp.toString())) {
      const methods = Object.getOwnPropertyNames(exp.prototype).filter(m => m !== 'constructor');
      if (methods.length) out += `Methods: ${methods.join(', ')}\n`;
    }
    // Value preview
    if (type === 'object' || type === 'array') {
      out += `Preview: ${JSON.stringify(exp, null, 2).slice(0, 300)}\n`;
    } else if (type !== 'function') {
      out += `Value: ${String(exp)}\n`;
    }
    return out;
  }
  getType(exp: any): string {
    if (Array.isArray(exp)) return 'array';
    if (exp === null) return 'null';
    if (typeof exp === 'function') {
      if (/^class /.test(exp.toString())) return 'class';
      return 'function';
    }
    return typeof exp;
  }
  render(): string {
    let out = 'A432 Module Explorer\n---------------------\n';
    this.modules.forEach(m => {
      out += (this.selected === m ? '> ' : '  ') + m + '\n';
    });
    if (this.selected) {
      out += `\nExports in ${this.selected}:\n`;
      this.moduleExports.forEach(e => {
        out += (this.selectedExport === e ? '> ' : '  ') + e + '\n';
      });
    }
    if (this.selectedExport && this.exportDetails) {
      out += `\nExport: ${this.selectedExport}\n${this.exportDetails}\n`;
    }
    // Navigation stack (breadcrumbs)
    if (this.navStack.length > 1) {
      out += '\nNavigation: ' + this.navStack.map(n => n.exportName || n.module).join(' > ') + '\n';
    }
    // Meta-observation
    out += '\n[Meta-Observe] Explorer is self-aware.\n';
    return out;
  }
  // Use composite key for annotation (module|export)
  getAnnotation(module: string, exportName: string | null): string {
    const key = exportName ? `${module}|${exportName}` : module;
    return this.annotations[key] || '';
  }
  setAnnotation(module: string, exportName: string | null, value: string) {
    const key = exportName ? `${module}|${exportName}` : module;
    this.annotations[key] = value;
    this.saveAnnotations();
  }
  loadAnnotations(): Record<string, string> {
    if (this.env === 'browser' && typeof window !== 'undefined' && window.localStorage) {
      try {
        return JSON.parse(window.localStorage.getItem('a432_annotations') || '{}');
      } catch { return {}; }
    }
    return {};
  }
  saveAnnotations() {
    if (this.env === 'browser' && typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('a432_annotations', JSON.stringify(this.annotations));
    }
  }
  // Live code execution for functions (sandboxed, with argument validation)
  async runFunction(args: any[] = []): Promise<{ result: any, error?: string }> {
    if (!this._mod || !this.selectedExport) return { result: undefined };
    const fn = this._mod[this.selectedExport];
    if (typeof fn !== 'function') return { result: undefined, error: 'Not a function' };
    try {
      // Only allow array arguments, no eval, no arbitrary code
      const safeArgs = Array.isArray(args) ? args : [];
      const result = await fn(...safeArgs);
      return { result };
    } catch (e: any) {
      return { result: undefined, error: e?.message || String(e) };
    }
  }
  // Expose navigation stack for UI tree/breadcrumb rendering
  getNavigationStack(): Array<{ module: string, exportName: string | null }> {
    return this.navStack.map(n => ({ module: n.module, exportName: n.exportName }));
  }
  // Harden navigation stack logic
  drillDown(property: string) {
    if (!this.navStack.length) return;
    const last = this.navStack[this.navStack.length - 1];
    if (!last.value || typeof last.value !== 'object' || !(property in last.value)) return;
    const next = last.value[property];
    this.navStack.push({ module: last.module, exportName: property, value: next });
    this.exportDetails = this.inspectExport(next, property ?? '');
  }
  back() {
    if (this.navStack.length > 1) {
      this.navStack.pop();
      const last = this.navStack[this.navStack.length - 1];
      this.selectedExport = last.exportName ?? undefined;
      this.exportDetails = this.inspectExport(last.value, last.exportName ?? '');
    }
  }
  // Improved type/parameter parsing
  inspectExport(exp: any, name: string | null): string {
    let out = '';
    // Type
    const type = this.getType(exp);
    out += `Type: ${type}\n`;
    // Doc
    let doc = '';
    if (exp && exp.doc) doc = exp.doc;
    // Try to extract JSDoc (not available at runtime, but check static doc property)
    if (!doc && typeof exp === 'function' && exp.toString) {
      const match = exp.toString().match(/\/\*\*([\s\S]*?)\*\//);
      if (match) doc = match[1].replace(/\*/g, '').trim();
    }
    if (doc) out += `Doc: ${doc}\n`;
    // Metaphysical mapping
    const meta = METAPHYSICAL_MAP[name ?? ''] || METAPHYSICAL_MAP[this.selected || ''] || '';
    const annotation = this.getAnnotation(this.selected || '', name);
    if (meta || annotation) {
      out += `Metaphysics: ${meta || ''}`;
      if (annotation) out += `\nUser Note: ${annotation}`;
      out += '\n';
    }
    // For functions: params and return
    if (typeof exp === 'function') {
      const fnStr = exp.toString();
      // Improved param parsing: handle default values, destructuring, etc.
      const params = fnStr.match(/^[^(]*\(([^)]*)\)/);
      if (params) out += `Params: ${params[1].replace(/\s+/g, ' ').trim()}\n`;
    }
    // For objects: list keys
    if (type === 'object' || type === 'array') {
      const keys = Object.keys(exp || {});
      if (keys.length) out += `Keys: ${keys.join(', ')}\n`;
    }
    // For classes: show methods
    if (typeof exp === 'function' && /^class /.test(exp.toString())) {
      const methods = Object.getOwnPropertyNames(exp.prototype).filter(m => m !== 'constructor');
      if (methods.length) out += `Methods: ${methods.join(', ')}\n`;
    }
    // Value preview
    if (type === 'object' || type === 'array') {
      out += `Preview: ${JSON.stringify(exp, null, 2).slice(0, 300)}\n`;
    } else if (type !== 'function') {
      out += `Value: ${String(exp)}\n`;
    }
    return out;
  }
  getType(exp: any): string {
    if (Array.isArray(exp)) return 'array';
    if (exp === null) return 'null';
    if (typeof exp === 'function') {
      if (/^class /.test(exp.toString())) return 'class';
      return 'function';
    }
    return typeof exp;
  }
} 