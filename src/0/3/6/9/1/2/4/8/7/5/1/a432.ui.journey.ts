// a432.ui.journey.ts — Guided journey engine for A432 UI
import { recordEvent } from './a432.block.chain.event.ts';

export async function runGuidedJourney(steps: Array<{ label: string; emitter: any; event: string | null; prompt: string }>, options: {
  intention?: string;
  overlay: HTMLElement;
  blockchain: any;
  onComplete?: (events: any[]) => void;
}) {
  const journeyEvents: any[] = [];
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
      const handler = (ev: any) => {
        journeyEvents.push({ type: step.event, ...ev, time: Date.now() });
        recordEvent(options.blockchain, `iJourney_${step.event}`, 'A432IJourney', { ...ev, step: step.label, intention });
        step.emitter.off(step.event, handler);
        journeyStep++;
        runStep();
      };
      step.emitter.on(step.event, handler);
    } else {
      setTimeout(() => {
        journeyStep++;
        runStep();
      }, 3000);
    }
  }
  await runStep();
} 