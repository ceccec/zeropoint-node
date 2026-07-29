import { PI, min } from './a432.algebra.ts'
import { Controller } from '@hotwired/stimulus';
import { startYinYang, YinYangFrame } from './a432.yin.yang.ts';

export default class extends Controller {
  static targets = ["canvas"];
  declare readonly canvasTarget: HTMLCanvasElement;
  #stop?: () => void;
  connect() {
    console.log('YinYang controller connecting...');
    const canvas = this.canvasTarget;
    console.log('Canvas found:', canvas);
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    console.log('Canvas size:', canvas.width, 'x', canvas.height);
    const ctx = canvas.getContext('2d')!;
    console.log('Canvas context:', ctx);
    
    // Draw a simple test pattern first
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log('Test pattern drawn');
    
    this.#stop = startYinYang((f: YinYangFrame) => {
      const toCss = (c:{c:number,m:number,y:number,k:number}) => `cmyk(${c.c}% ${c.m}% ${c.y}% / ${c.k}%)`;
      const r = min(canvas.width, canvas.height)/2-4;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.save();
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.rotate(f.angle*PI/180);
      ctx.fillStyle = toCss(f.positiveColor);
      ctx.beginPath(); ctx.arc(0,0,r,0,PI,true); ctx.arc(0,-r/2,r/2,0,PI,false); ctx.fill();
      ctx.fillStyle = toCss(f.negativeColor);
      ctx.beginPath(); ctx.arc(0,0,r,0,PI,false); ctx.arc(0,r/2,r/2,0,PI,false); ctx.fill();
      ctx.restore();
    });
    console.log('YinYang controller connected');
  }
  disconnect(){ this.#stop?.(); }
} 