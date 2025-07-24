import { Controller } from '@hotwired/stimulus';
import { startTerminal } from './a432.terminal.ui';

export default class extends Controller {
  static targets=['out'] as const;
  declare readonly outTarget: HTMLPreElement;
  #stop?:()=>void;
  connect(){
    const pre=this.outTarget;
    this.#stop=startTerminal(line=>{pre.textContent+=line+'\n';pre.scrollTop=pre.scrollHeight;});
  }
  disconnect(){this.#stop?.();}
} 