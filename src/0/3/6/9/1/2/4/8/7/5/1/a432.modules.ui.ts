// a432.modules.ui.ts — Interactive modules palette
//--------------------------------------------------
import { digitAngleToCMYK, asAngle } from './a432.math';
import { emotionName } from './a432.emotion';
import { Digit } from './a432.types';
import { tap } from './a432.i.tap';
import { cmykToCss } from './a432.cmyk';

function fileDigit(name:string):Digit{const sum=[...name].reduce((a,c)=>a+c.charCodeAt(0),0);const d=sum%9;return (d===0?9:d) as Digit;}

async function init() {
  if(typeof document==='undefined') return;
  const res=await fetch('/modules');
  const files: string[]=await res.json();
  const panel=document.createElement('div');
  panel.style.position='fixed';panel.style.top='8px';panel.style.right='8px';panel.style.display='grid';panel.style.gap='4px';panel.style.gridTemplateColumns='repeat(auto-fill,24px)';
  panel.style.pointerEvents='auto';
  document.body.appendChild(panel);
  files.forEach(f=>{
    const d=fileDigit(f);
    const cmyk=digitAngleToCMYK(d,asAngle(d*36));
    const div=document.createElement('div');
    div.style.width='22px';div.style.height='22px';div.style.borderRadius='4px';div.style.background=cmykToCss(cmyk);
    div.title=`${f}\n${emotionName(d)}`;
    div.onclick=()=> { window.open(`/${f}?view`,'_blank'); tap(div.offsetLeft,div.offsetTop,1);}
    panel.appendChild(div);
  });
}

if(typeof window!=='undefined') init(); 