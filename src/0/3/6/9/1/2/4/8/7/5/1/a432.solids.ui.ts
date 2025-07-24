// a432.solids.ui.ts — Platonic solids radial-face visualizer
//-------------------------------------------------------------
import { uroborosEmitter, UroborosEvent } from './a432.uroboros';
import { cmykToCss } from './a432.cmyk';
import { digitAngleToCMYK, asAngle } from './a432.math';
import { Digit } from './a432.types';

interface SolidCfg { name:string; faces:number; radius:number; yOffset:number; }
const solids: SolidCfg[] = [
  { name:'Tetra',   faces:4,  radius:40, yOffset:-120 },
  { name:'Cube',    faces:6,  radius:45, yOffset:-60  },
  { name:'Octa',    faces:8,  radius:50, yOffset:0    },
  { name:'Dodeca',  faces:12, radius:55, yOffset:60   },
  { name:'Icosa',   faces:20, radius:60, yOffset:120  }
];

if (typeof document !== 'undefined') {
  const canv = document.createElement('canvas');
  canv.width = 240; canv.height = 480;
  canv.style.position='fixed';
  canv.style.left='calc(50% + 180px)';
  canv.style.top='50%';
  canv.style.transform='translate(-50%, -50%)';
  canv.style.pointerEvents='none';
  document.body.appendChild(canv);
  const ctx = canv.getContext('2d')!;

  let rotation = 0;

  function draw() {
    ctx.clearRect(0,0,canv.width,canv.height);
    const cx = canv.width/2;
    const cy = canv.height/2;
    solids.forEach((s,si)=>{
      const seg = (Math.PI*2)/s.faces;
      for(let i=0;i<s.faces;i++){
        const angleStart= rotation + i*seg;
        const angleEnd  = angleStart + seg;
        const x0 = cx; const y0 = cy + s.yOffset;
        const r = s.radius;
        ctx.beginPath();
        ctx.moveTo(x0,y0);
        ctx.arc(x0,y0,r,angleStart,angleEnd);
        ctx.closePath();
        const digit = ((i+1) as Digit);
        const cmyk = digitAngleToCMYK(digit, asAngle(digit*60));
        ctx.fillStyle = cmykToCss(cmyk);
        ctx.fill();
      }
    });
  }

  uroborosEmitter.on('uro', (_e: UroborosEvent)=>{ rotation -= Math.PI/18; draw(); });
  draw();
} 