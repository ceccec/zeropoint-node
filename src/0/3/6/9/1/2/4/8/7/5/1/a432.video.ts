// a432.video.ts — Visualize CMYK pulses on a canvas
//---------------------------------------------------
import { CMYK, cmykToCss } from './a432.cmyk';

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;

function ensureCanvas() {
  if (typeof document === 'undefined') return;
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.width = canvas.height = 120;
    canvas.style.position = 'fixed';
    canvas.style.right = '8px';
    canvas.style.bottom = '8px';
    canvas.style.borderRadius = '8px';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
  }
}

export function flashColor(cmyk: CMYK, fadeMs = 400) {
  ensureCanvas();
  if (!ctx || !canvas) return;
  ctx.fillStyle = cmykToCss(cmyk);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  canvas.style.opacity = '1';
  canvas.style.transition = `opacity ${fadeMs}ms ease`;
  setTimeout(() => { if(canvas) canvas.style.opacity = '0'; }, 50);
} 