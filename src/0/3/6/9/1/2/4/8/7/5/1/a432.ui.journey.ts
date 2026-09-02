// a432.ui.journey.ts — Guided journey engine for A432 UI
import { recordEvent, type A432BlockChain } from './a432.block.chain.event.ts';
import type { EventEmitter } from 'events';

/** What the journey collects: the step's event name, the payload, and when. */
export interface JourneyEvent {
  type: string | null;
  time: number;
  [field: string]: unknown;
}

export async function runGuidedJourney(steps: Array<{ label: string; emitter: EventEmitter | null; event: string | null; prompt: string }>, options: {
  intention?: string;
  overlay: HTMLElement;
  blockchain: A432BlockChain;
  onComplete?: (events: JourneyEvent[]) => void;
}) {
  const journeyEvents: JourneyEvent[] = [];
  let journeyStep = 0;
  const intention = options.intention || '';
  async function runStep() {
    if (journeyStep >= steps.length) {
      recordEvent(options.blockchain, 'iJourneyEnd', 'A432IJourney', {
        intention,
        events: journeyEvents,
        time: Date.now()
      });
      options.overlay.innerHTML = `<b>I Journey Complete</b><br>Intention: ${intention}<br>Events: ${journeyEvents.map(e => e.type).join(', ')}<br><br><i>Every act of awareness is a step toward wholeness.<br>The stream remembers. The field is harmonized.</i>`;
      if (options.onComplete) options.onComplete(journeyEvents);
      return;
    }
    const step = steps[journeyStep];
    options.overlay.innerHTML = `<b>I Journey: ${step.label}</b><br>${step.prompt}<br><br>Intention: ${intention}`;
    options.overlay.style.background = '#222';
    if (step.emitter && step.event) {
      // step.event is narrowed by the guard above, but through an index into
      // `steps` TypeScript cannot see that, so it is bound once here.
      const eventName = step.event;
      const emitter = step.emitter;
      const handler = (ev: unknown) => {
        const payload = (ev ?? {}) as Record<string, unknown>;
        journeyEvents.push({ type: eventName, ...payload, time: Date.now() });
        recordEvent(options.blockchain, `iJourney_${eventName}`, 'A432IJourney', { ...payload, step: step.label, intention });
        emitter.off(eventName, handler);
        journeyStep++;
        runStep();
      };
      emitter.on(eventName, handler);
    } else {
      setTimeout(() => {
        journeyStep++;
        runStep();
      }, 3000);
    }
  }
  await runStep();
} 