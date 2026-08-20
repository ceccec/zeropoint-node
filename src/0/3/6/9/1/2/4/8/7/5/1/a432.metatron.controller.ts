import './a432.algebra.ts'
import { Controller } from '@hotwired/stimulus';
import './a432.metatron.ts';
import { startA432Visualization } from './a432.pure.visualization.ts';

export default class extends Controller {
  static override targets = ["scene"];
  declare readonly sceneTarget: SVGSVGElement;
  #stop?:()=>void;
  override connect(){
    console.log('Metatron controller connecting...');
    const svg=this.sceneTarget;
    console.log('Metatron SVG found:', svg);
    
    // Mount pure a432 visualization in Metatron quadrant
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.zIndex = '1';
    
    // Clear existing SVG content and add container
    svg.innerHTML = '';
    svg.appendChild(container);
    
    console.log('Pure A432 visualization container created');
    
    // Start the pure a432 visualization
    this.#stop = startA432Visualization(container);
    
    console.log('Pure A432 visualization mounted in Metatron quadrant');
  }
  override disconnect(){this.#stop?.();}
} 