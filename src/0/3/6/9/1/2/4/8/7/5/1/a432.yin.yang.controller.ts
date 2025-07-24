import { Controller } from '@hotwired/stimulus';
import { startYinYang, YinYangFrame } from './a432.yin.yang';

export default class extends Controller {
  static targets = ['canvas'] as const;
  declare readonly canvasTarget: HTMLCanvasElement;
  #stop?: () => void;
  connect() {
    const canvas = this.canvasTarget;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext('2d')!;
    this.#stop = startYinYang((f: YinYangFrame) => {
      const toCss = (c:{c:number,m:number,y:number,k:number}) => `cmyk(${c.c}% ${c.m}% ${c.y}% / ${c.k}%)`;
      const r = Math.min(canvas.width, canvas.height)/2-4;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.save();
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.rotate(f.angle*Math.PI/180);
      ctx.fillStyle = toCss(f.positiveColor);
      ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI,true); ctx.arc(0,-r/2,r/2,0,Math.PI,false); ctx.fill();
      ctx.fillStyle = toCss(f.negativeColor);
      ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI,false); ctx.arc(0,r/2,r/2,0,Math.PI,false); ctx.fill();
      ctx.restore();
    });
  }
  disconnect(){ this.#stop?.(); }
} 