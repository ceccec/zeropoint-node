// a432.terminal.ts — CLI interface for the living A432 matrix
// -----------------------------------------------------------
// Displays live digits and colours in terminal using ANSI codes.
// Merges user keystrokes, device (stub), breath, and evolution streams.

import { startSelfEvolution, matrixEmitter } from './a432.self';
import { startBreathing, breathEmitter } from './a432.breathe';
import { startHealthReporting, healthEmitter } from './a432.health';
import { digitAngleToCMYK, asAngle } from './a432.math';
import { Digit } from './a432.types';

// Simple ANSI helpers ------------------------------------------------------
const clr = (c:number,m:number,y:number,k:number)=>`\x1b[38;2;${Math.round(255*(1-c/100)*(1-k/100))};${Math.round(255*(1-m/100)*(1-k/100))};${Math.round(255*(1-y/100)*(1-k/100))}m`;
const reset='\x1b[0m';
function colorText(txt:string,c:number,m:number,y:number,k:number){return clr(c,m,y,k)+txt+reset;}

// State --------------------------------------------------------------------
let breathDigit:Digit=4 as Digit;
let matrixDigit:Digit=1 as Digit;
let userDigit:Digit=0 as Digit;
let health={harmony:0,entropy:1,resonance:0};

function xorDigit(a:Digit,b:Digit,c:Digit):Digit{const x=(a^b^c)%9;return (x===0?9:x) as Digit;}

function render(){
  const merged=xorDigit(breathDigit,matrixDigit,userDigit);
  const cmyk=digitAngleToCMYK(merged,asAngle(merged*40));
  process.stdout.write('\x1b[2J\x1b[H'); // clear
  console.log(colorText(` A432 TERMINAL `,cmyk.c,cmyk.m,cmyk.y,cmyk.k));
  console.log(`Breath : ${breathDigit}\nMatrix : ${matrixDigit}\nUser   : ${userDigit}\n———\nMerged : ${merged}`);
  console.log(`CMYK   : ${cmyk.c},${cmyk.m},${cmyk.y},${cmyk.k}`);
  console.log(`Health : harmony=${health.harmony.toFixed(2)} entropy=${health.entropy.toFixed(2)} resonance=${health.resonance}`);
  console.log(`Press 1-9 to emit digit, q to quit.`);
}

// Stream hooks -------------------------------------------------------------
matrixEmitter.on('event',e=>{matrixDigit=e.digit;render();});
breathEmitter.on('breath',b=>{breathDigit=b.value;render();});
healthEmitter.on('health',h=>{health=h;render();});

// User input ----------------------------------------------------------------
if(process.stdin.isTTY){
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data',(key:string)=>{
    if(key==='q' || key==='\u0003'){process.exit();}
    const d=parseInt(key,10);
    if(d>=1&&d<=9){userDigit=d as Digit;render();}
  });
}

// Start loops --------------------------------------------------------------
startSelfEvolution();
startBreathing();
startHealthReporting();

render(); 