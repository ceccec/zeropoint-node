import { Controller } from '@hotwired/stimulus';
import { startChess, ChessFrame } from './a432.chess';

export default class extends Controller {
  static targets = ['board'] as const;
  declare readonly boardTarget: HTMLTableElement;
  #stop?: () => void;
  connect(){
    const table=this.boardTarget;
    // build 8x8 once
    for(let y=0;y<8;y++){const row=table.insertRow();for(let x=0;x<8;x++){const cell=row.insertCell();cell.style.transition='background 0.3s';}}
    this.#stop=startChess((f:ChessFrame)=>{
      const cell=table.rows[f.rank].cells[f.file];
      cell.style.background=`cmyk(${f.squareColor.c}% ${f.squareColor.m}% ${f.squareColor.y}% / ${f.squareColor.k}%)`;
    });
  }
  disconnect(){this.#stop?.();}
} 