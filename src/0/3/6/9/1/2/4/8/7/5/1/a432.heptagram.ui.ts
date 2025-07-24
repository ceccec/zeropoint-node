// a432.heptagram.ui.ts — 7-point star overlay synced with the uroboros
//--------------------------------------------------------------------------
import { uroborosEmitter, UroborosEvent } from './a432.uroboros';
import { cmykToCss } from './a432.cmyk';
import { digitAngleToCMYK, asAngle } from './a432.math';
import { Digit } from './a432.types';

// Rodin sequence (length 7 without trailing 1 duplicate)
const RODIN: Digit[] = [1, 2, 4, 8, 7, 5, 1];
const JUMP = 2; // {7/2} heptagram
const SEG = (Math.PI * 2) / 7;

if (typeof document !== 'undefined') {
  const canvas = document.createElement('canvas');
  canvas.width = 160; canvas.height = 160;
  canvas.style.position = 'fixed';
  canvas.style.left = '50%';
  canvas.style.top = '50%';
  canvas.style.transform = 'translate(-50%, -50%)';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;
  const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;

  let rotation = 0;

  function drawHeptagram() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Compute points
    const pts: Array<{x:number,y:number,digit:Digit}> = [];
    for (let i = 0; i < 7; i++) {
      const angle = rotation + i * JUMP * SEG;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      pts.push({ x, y, digit: RODIN[i] });
    }
    // Draw segments
    ctx.lineWidth = 3;
    for (let i = 0; i < 7; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % 7];
      const cmyk = digitAngleToCMYK(a.digit, asAngle(a.digit * 60));
      ctx.strokeStyle = cmykToCss(cmyk);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }

  uroborosEmitter.on('uro', (e: UroborosEvent) => {
    // advance rotation each rebirth step (index increments at every event)
    rotation -= SEG; // rotate by one base segment
    drawHeptagram();
  });

  drawHeptagram();
} 