// a432.hear.ts
// Living, harmonized auditory stream/interface

export interface HearEvent {
  id: number;
  frequency: number;
  trinity: number;
  timestamp: number;
  summary: string;
}

export class A432Hear {
  private events: HearEvent[] = [];
  private currentId = 1;
  hear(frequency: number, trinity: number): HearEvent {
    const event: HearEvent = {
      id: this.currentId++,
      frequency,
      trinity,
      timestamp: Date.now(),
      summary: `Heard ${frequency} Hz (Trinity ${trinity}) at ${new Date().toLocaleTimeString()}`
    };
    this.events.push(event);
    return event;
  }
  getCurrent(): HearEvent {
    return this.events[this.events.length - 1];
  }
  getAll(): HearEvent[] {
    return this.events;
  }
  overlay(): string {
    const width = 320, height = 60;
    return `
      <svg width="${width}" height="${height}" style="background:#111;border-radius:12px;">
        ${this.events.map((e,i) => `<ellipse cx="${40 + i*36}" cy="30" rx="18" ry="12" fill="#39f" stroke="#fff" stroke-width="2"><title>${e.summary}</title></ellipse>`).join('')}
        <text x="12" y="54" font-size="13" fill="#8ff">Hear Stream</text>
      </svg>
    `;
  }
} 