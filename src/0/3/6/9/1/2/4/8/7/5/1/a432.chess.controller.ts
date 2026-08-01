import { log } from './a432.algebra.ts'
import { Controller } from '@hotwired/stimulus';
import { startChess, type ChessFrame } from './a432.chess.ts';

export default class extends Controller {
  static targets = ["board"];
  declare readonly boardTarget: HTMLTableElement;
  #stop?: () => void;
  connect(){
    console.log('Chess controller connecting...');
    const table=this.boardTarget;
    console.log('Chess table found:', table);
    
    // build 8x8 once
    for(let y=0;y<8;y++){const row=table.insertRow();for(let x=0;x<8;x++){const cell=row.insertCell();cell.style.transition='background 0.3s';}}
    console.log('Chess board built');
    
    // Draw a simple test pattern
    table.rows[0].cells[0].style.background='blue';
    table.rows[0].cells[0].textContent='♔';
    console.log('Chess test pattern drawn');
    
    this.#stop=startChess((f:ChessFrame)=>{
      const cell=table.rows[f.rank].cells[f.file];
      cell.style.background=`cmyk(${f.squareColor.c}% ${f.squareColor.m}% ${f.squareColor.y}% / ${f.squareColor.k}%)`;
    });
    console.log('Chess controller connected');
  }
  disconnect(){this.#stop?.();}
} 