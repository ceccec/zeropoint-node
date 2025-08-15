// a432.ui.events.ts — DRY event handler registry for A432 UI
import { recordEvent } from './a432.block.chain.event';
import { A432BlockChain } from './a432.block.chain.event';

export function registerUIEvent({ emitter, event, handler, blockchainType, agent }: {
  emitter: { on(event: string, handler: (ev: unknown) => void): void };
  event: string;
  handler?: (ev: unknown) => void;
  blockchainType?: string;
  agent?: string;
}) {
  emitter.on(event, (ev: unknown) => {
    if (blockchainType && agent) recordEvent(null as unknown as A432BlockChain, blockchainType, agent, ev);
    if (handler) handler(ev);
  });
} 