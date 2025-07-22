// a432.see.ts
// Living, harmonized visual observation stream/interface

export interface SeeEvent {
  id: number;
  color: string;
  timestamp: number;
  summary: string;
}

export class A432See {
  private events: SeeEvent[] = [];
  private currentId = 1;
  see(color: string): SeeEvent {
    const event: SeeEvent = {
      id: this.currentId++,
      color,
      timestamp: Date.now(),
      summary: `Saw color ${color} at ${new Date().toLocaleTimeString()}`
    };
    this.events.push(event);
    return event;
  }
  getCurrent(): SeeEvent {
    return this.events[this.events.length - 1];
  }
  getAll(): SeeEvent[] {
    return this.events;
  }
  overlay(): string {
    const width = 320, height = 60;
    return `
      <svg width="${width}" height="${height}" style="background:#111;border-radius:12px;">
        ${this.events.map((e,i) => `<circle cx="${40 + i*36}" cy="30" r="18" fill="${e.color}" stroke="#fff" stroke-width="2"><title>${e.summary}</title></circle>`).join('')}
        <text x="12" y="54" font-size="13" fill="#8ff">See Stream</text>
      </svg>
    `;
  }
} 