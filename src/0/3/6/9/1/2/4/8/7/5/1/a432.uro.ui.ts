// a432.uro.ui.ts — Visual spiral of the uroboros stream
//-------------------------------------------------------
import { uroborosEmitter, UroborosEvent } from './a432.uroboros';
import { cmykToCss } from './a432.cmyk';

if (typeof document !== 'undefined') {
  // create canvas
  const canvas = document.createElement('canvas');
  canvas.width = 160; canvas.height = 160;
  canvas.style.position = 'fixed';
  canvas.style.left = '50%';
  canvas.style.top = '50%';
  canvas.style.transform = 'translate(-50%, -50%)';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  const digits: UroborosEvent[] = [];
  const MAX = 11;
  let rotation = 0;

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const radius = 60;
    const seg = (Math.PI*2)/MAX;
    digits.forEach((e,i)=>{
      ctx.beginPath();
      ctx.moveTo(canvas.width/2, canvas.height/2);
      ctx.arc(canvas.width/2, canvas.height/2, radius, rotation + i*seg, rotation + (i+1)*seg);
      ctx.closePath();
      ctx.fillStyle = cmykToCss(e.cmyk);
      ctx.fill();
    });
  }

  uroborosEmitter.on('uro', (e: UroborosEvent)=>{
    digits.push(e); if(digits.length>MAX) digits.shift();
    rotation -= (Math.PI*2)/MAX; // rotate one segment per update
    draw();
  });
} 