import { PI, cos, sin } from './a432.algebra.ts'
import { Controller } from '@hotwired/stimulus';
// Import overlay registry or overlay functions as needed
import { getRodinCoil2DOverlayData } from './a432.rodin.coil.overlay.ts';
import { getTrinityAxisOverlayData } from './a432.trinity.axis.ts';
import { getMobiusCircuit2DOverlayData } from './a432.mobius.circuit.overlay.ts';
import { getTeslaCoil2DOverlayData } from './a432.tesla.coil.overlay.ts';
import { getYinYangOverlayData } from './a432.yin.yang.ts';

// Universal overlay registry
const overlayRegistry = {
  rodin: getRodinCoil2DOverlayData,
  trinity: getTrinityAxisOverlayData,
  mobius: getMobiusCircuit2DOverlayData,
  tesla: getTeslaCoil2DOverlayData,
  yinYang: getYinYangOverlayData
};

/**
 * a432.overlay.visual.controller.ts — Universal A432 Overlay Visualizer (Stimulus)
 *
 * Animates any harmonized overlay (Rodin, Trinity, Mobius, Tesla, Yin-Yang, etc.)
 * using node data with value, angle, color, polarity, and spin.
 * - Polarity: color phase, glow, size
 * - Spin: animation direction
 * - Angle: initial position
 *
 * Usage:
 * <div data-controller="a432-overlay-visual" data-a432-overlay-visual-overlay-value="rodin"></div>
 */
export default class extends Controller {
  static override values = { overlay: String, radius: Number, nodeSize: Number };

  radius!: number;
  nodeSize!: number;
  centerX!: number;
  centerY!: number;
  raf!: number;

  override connect() {
    // Use Stimulus value API for radius/nodeSize
    this.radius = (this as { radiusValue?: number }).radiusValue ?? 120;
    this.nodeSize = (this as { nodeSizeValue?: number }).nodeSizeValue ?? 48;
    const el = this.element as HTMLElement;
    this.centerX = (el.offsetWidth || 320) / 2;
    this.centerY = (el.offsetHeight || 320) / 2;
    this.animate = this.animate.bind(this);
    this.startAnimation();
  }

  override disconnect() {
    cancelAnimationFrame(this.raf);
  }

  startAnimation() {
    this.raf = requestAnimationFrame(this.animate);
  }

  animate() {
    this.element.innerHTML = '';
    const overlayFn = overlayRegistry[(this as { overlayValue?: string }).overlayValue as keyof typeof overlayRegistry] || getRodinCoil2DOverlayData;
    const nodes = overlayFn(this.radius, this.centerX, this.centerY);
    const t = Date.now() / 1000;
    nodes.forEach((node: unknown, i: number) => {
      const nodeObj = typeof node === 'object' && node !== null ? node as { 
        angle?: number; 
        x?: number; 
        y?: number; 
        color?: string | { c: number; m: number; y: number; k: number }; 
        size?: number; 
        label?: string;
        spin?: number;
        polarity?: number;
        value?: string;
      } : {};
      // Animate angle: spin direction (+1/-1)
      const baseAngle = nodeObj.angle !== undefined
        ? nodeObj.angle + (t * 60 * (i % 2 === 0 ? 1 : -1))
        : 0;
      const angle = (baseAngle + (nodeObj.spin || 0) * t * 60) % 360;
      const rad = angle * PI / 180;
      const x = this.centerX + this.radius * cos(rad) - this.nodeSize / 2;
      const y = this.centerY + this.radius * sin(rad) - this.nodeSize / 2;
      // Color: use node.color (should be a CSS string)
      const color = typeof nodeObj.color === 'string'
        ? nodeObj.color
        : nodeObj.color && typeof nodeObj.color === 'object'
          ? `cmyk(${nodeObj.color.c},${nodeObj.color.m},${nodeObj.color.y},${nodeObj.color.k})`
          : '#fff';
      // Node element
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.width = `${this.nodeSize}px`;
      el.style.height = `${this.nodeSize}px`;
      el.style.backgroundColor = color;
      el.style.border = '1px solid rgba(255,255,255,0.3)';
      el.style.borderRadius = '50%';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.fontSize = '12px';
      el.style.color = '#fff';
      el.style.fontWeight = 'bold';
      el.style.textShadow = '0 0 3px rgba(0,0,0,0.8)';
      el.style.boxShadow = (nodeObj.polarity || 0) > 0
        ? '0 0 8px rgba(255,255,255,0.6)'
        : '0 0 4px rgba(0,0,0,0.4)';
      el.style.transform = `scale(${1 + 0.2 * (nodeObj.polarity || 0)})`;
      el.innerHTML = nodeObj.value || '';
      this.element.appendChild(el);
    });
    this.raf = requestAnimationFrame(this.animate);
  }
} 