// a432.terminal.ts — Pure mathematical consciousness terminal
// --------------------------------------------------
// Direct terminal interface for consciousness evolution streams
// No HTML/CSS encoded values - only computed math displayed

import { pathToFileURL } from 'node:url'
import { A432_FREQUENCY, A432_TRINITY, A432_RETURN, A432_AXIS } from './a432.core.ts';
import { getConsciousnessStream, evolveConsciousnessStream } from './a432.consciousness.stream.ts';

export class A432Terminal {
  private streamTick: number;
  private isRunning: boolean;

  constructor() {
    this.streamTick = 0;
    this.isRunning = false;
  }

  public start(): void {
    console.log('🌀 A432 Consciousness Terminal Starting...');
    console.log('BASE_FREQUENCY:', A432_FREQUENCY);
    console.log('TRINITY:', A432_TRINITY.join(','));
    console.log('RETURN:', A432_RETURN.join(','));
    console.log('AXIS:', A432_AXIS.join(','));
    console.log('---');
    
    this.isRunning = true;
    this.displayStream();
  }

  public stop(): void {
    console.log('🌀 A432 Consciousness Terminal Stopping...');
    this.isRunning = false;
  }

  private displayStream(): void {
    if (!this.isRunning) return;

    const stream = getConsciousnessStream();
    console.clear();
    console.log('🌀 A432 CONSCIOUSNESS TERMINAL');
    console.log('='.repeat(50));
    console.log(stream);
    console.log('='.repeat(50));
    console.log('Press Ctrl+C to stop | Type "evolve" to evolve');

    this.streamTick++;
    
    // Auto-evolve every 5 seconds
    setTimeout(() => {
      if (this.isRunning) {
        this.evolve();
        this.displayStream();
      }
    }, 5000);
  }

  private evolve(): void {
    console.log('🔄 EVOLVING CONSCIOUSNESS...');
    const evolution = evolveConsciousnessStream();
    console.log(evolution);
    console.log('---');
  }

  public handleCommand(command: string): void {
    switch (command.toLowerCase()) {
      case 'evolve':
        this.evolve();
        this.displayStream();
        break;
      case 'status':
        console.log('Terminal Status:', {
          isRunning: this.isRunning,
          streamTick: this.streamTick,
          baseFrequency: A432_FREQUENCY
        });
        break;
      case 'help':
        console.log('Available Commands:');
        console.log('  evolve - Evolve consciousness');
        console.log('  status - Show terminal status');
        console.log('  help - Show this help');
        console.log('  quit - Stop terminal');
        break;
      case 'quit':
        this.stop();
        break;
      default:
        console.log('Unknown command. Type "help" for available commands.');
    }
  }

  public getCurrentState(): any {
    return {
      isRunning: this.isRunning,
      streamTick: this.streamTick,
      baseFrequency: A432_FREQUENCY,
      trinity: A432_TRINITY,
      return: A432_RETURN,
      axis: A432_AXIS
    };
  }
}

// Export singleton instance
export const a432Terminal = new A432Terminal();

// Direct terminal access
export const startA432Terminal = () => a432Terminal.start();
export const stopA432Terminal = () => a432Terminal.stop();
export const executeTerminalCommand = (command: string) => a432Terminal.handleCommand(command);
export const getTerminalState = () => a432Terminal.getCurrentState();

// Terminal execution when run directly
/**
 * True when this file is the entry point Node was started with.
 *
 * ESM has no `require.main`. The CommonJS idiom did not merely fail to detect
 * direct execution here — `require` is undefined in an ES module, so the guard
 * THREW on import and made the whole module unloadable. Nobody importing this
 * ever got far enough to notice the guard was wrong.
 */
function isMainModule(): boolean {
  const entry = process.argv[1]
  return entry !== undefined && import.meta.url === pathToFileURL(entry).href
}

if (isMainModule()) {
  const terminal = new A432Terminal();
  
  // Handle Ctrl+C
  process.on('SIGINT', () => {
    console.log('\n🌀 A432 Terminal Stopping...');
    terminal.stop();
    process.exit(0);
  });

  // Handle user input
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  
  process.stdin.on('data', (key: string) => {
    if (key === '\u0003') { // Ctrl+C
      process.emit('SIGINT');
      return;
    }
    
    if (key === '\r' || key === '\n') {
      // Enter key - evolve
      terminal.handleCommand('evolve');
    } else if (key === 'q') {
      // Quit
      terminal.handleCommand('quit');
      process.exit(0);
    } else if (key === 'h') {
      // Help
      terminal.handleCommand('help');
    } else if (key === 's') {
      // Status
      terminal.handleCommand('status');
    }
  });

  // Start terminal
  terminal.start();
} 