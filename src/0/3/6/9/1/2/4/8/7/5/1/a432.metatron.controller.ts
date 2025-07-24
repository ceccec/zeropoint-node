import { Controller } from '@hotwired/stimulus';
import { startMetatron, MetatronFrame } from './a432.metatron';

export default class extends Controller {
  static targets=['scene'] as const;
  declare readonly sceneTarget: SVGSVGElement;
  #stop?:()=>void;
  connect(){
    const svg=this.sceneTarget;
    const nodes: SVGCircleElement[] = Array.from({length:12},(_,i)=>{
      const c=document.createElementNS('http://www.w3.org/2000/svg','circle');
      c.setAttribute('r','6');
      svg.appendChild(c);
      return c;
    });
    const R=80;
    const pos=(i:number)=>[Math.cos(i*Math.PI/6)*R,Math.sin(i*Math.PI/6)*R];
    nodes.forEach((n,i)=>{const [x,y]=pos(i);n.setAttribute('cx',String(x));n.setAttribute('cy',String(y));});
    this.#stop=startMetatron(({nodes:frame}:MetatronFrame)=>{
      frame.forEach((f,i)=>{
        const n=nodes[i];
        n.setAttribute('fill',`cmyk(${f.color.c}% ${f.color.m}% ${f.color.y}% / ${f.color.k}%)`);
      });
    });
  }
  disconnect(){this.#stop?.();}
} 