// a432.voice.ui.ts — mic toggle button
import { startVoice, stopVoice } from './a432.i.voice';

if (typeof document !== 'undefined'){
  const btn=document.createElement('button');
  btn.textContent='🎙️';
  btn.style.position='fixed';
  btn.style.right='8px';
  btn.style.top='8px';
  btn.style.fontSize='20px';
  btn.style.background='#222';
  btn.style.color='#8ff';
  btn.style.border='none';
  btn.style.borderRadius='6px';
  btn.style.padding='4px 8px';
  document.body.appendChild(btn);
  let on=false;
  btn.onclick=()=>{
    on=!on;
    if(on){ startVoice(); btn.style.background='#0a0'; }
    else { stopVoice(); btn.style.background='#222'; }
  };
} 