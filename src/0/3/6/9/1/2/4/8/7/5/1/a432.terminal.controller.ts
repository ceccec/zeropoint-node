import './a432.algebra.ts'
import { Controller } from '@hotwired/stimulus';
import { startTerminal } from './a432.terminal.ui.ts';

export default class extends Controller {
  static override targets = ["out"];
  declare readonly outTarget: HTMLPreElement;
  #stop?:()=>void;
  override connect(){
    console.log('Terminal controller connecting...');
    const pre=this.outTarget;
    console.log('Terminal pre found:', pre);
    
    // Add a test message
    pre.textContent = 'A432 Terminal Ready\nType "rodin" to see patterns\n';
    console.log('Terminal test message added');
    
    startTerminal(line=>{pre.textContent+=line+'\n';pre.scrollTop=pre.scrollHeight;});
    this.#stop = () => {}; // No cleanup needed
    console.log('Terminal controller connected');
  }
  override disconnect(){this.#stop?.();}
} 