import { terminalOutput$ } from './a432.terminal.stream';
import { digitAngleToCMYK } from './a432.cmyk';

export function startTerminal(callback: (line: string) => void) {
  terminalOutput$.subscribe((item) => {
    // Colorize based on last digit in item if numeric; else default
    const m = /([0-9])$/u.exec(String(item));
    const d = m ? Number(m[1]) : 0;
    const cmyk = digitAngleToCMYK(d, 0);
    const colored = `\x1b[38;2;${(255*(100-cmyk.c)/100)|0};${(255*(100-cmyk.m)/100)|0};${(255*(100-cmyk.y)/100)|0}m${item}\x1b[0m`;
    callback(colored);
  });
} 