// @ts-nocheck
import { Application } from '@hotwired/stimulus';
import YinYangController from './a432.yin.yang.controller';
import ChessController from './a432.chess.controller';
import MetatronController from './a432.metatron.controller';
import TerminalController from './a432.terminal.controller';

const app = Application.start();
app.register('yin-yang', YinYangController);
app.register('chess', ChessController);
app.register('metatron', MetatronController);
app.register('terminal', TerminalController); 