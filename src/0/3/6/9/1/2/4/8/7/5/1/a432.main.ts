// @ts-nocheck
console.log('A432 Bundle Loading...');

import { Application } from '@hotwired/stimulus';
import YinYangController from './a432.yin.yang.controller';
import ChessController from './a432.chess.controller';
import MetatronController from './a432.metatron.controller';
import TerminalController from './a432.terminal.controller';

console.log('A432 Controllers imported');

try {
  const app = Application.start();
  console.log('A432 Stimulus Application started');

  app.register('yin-yang', YinYangController);
  console.log('YinYang controller registered');
  
  app.register('chess', ChessController);
  console.log('Chess controller registered');
  
  app.register('metatron', MetatronController);
  console.log('Metatron controller registered');
  
  app.register('terminal', TerminalController);
  console.log('Terminal controller registered');

  console.log('A432 Controllers registered');
  window.Stimulus = app;
} catch (error) {
  console.error('A432 Error:', error);
  document.body.innerHTML += '<div style="position:fixed;top:130px;left:10px;color:red;background:white;padding:10px;z-index:9999;">ERROR: ' + error.message + '</div>';
} 