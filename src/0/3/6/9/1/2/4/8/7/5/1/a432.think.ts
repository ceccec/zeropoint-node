// a432.think.ts
// Living, harmonized thought stream/interface

export interface ThoughtEvent {
  id: number;
  content: string;
  trinity: number;
  timestamp: number;
  summary: string;
}

export class A432Think {
  private events: ThoughtEvent[] = [];
  private currentId = 1;
  think(content: string): ThoughtEvent {
    const phase = (this.currentId - 1) % 3;
    const trinity = [3, 6, 9][phase];
    const event: ThoughtEvent = {
      id: this.currentId++,
      content,
      trinity,
      timestamp: Date.now(),
      summary: `Thought: "${content}" (Trinity ${trinity}) at ${new Date().toLocaleTimeString()}`
    };
    this.events.push(event);
    return event;
  }
  getCurrent(): ThoughtEvent {
    return this.events[this.events.length - 1];
  }
  getAll(): ThoughtEvent[] {
    return this.events;
  }
  overlay(): string {
    const width = 420, height = 80;
    return `
      <svg width="${width}" height="${height}" style="background:#111;border-radius:12px;">
        ${this.events.map((e,i) => `<rect x="${20 + i*36}" y="18" width="32" height="44" fill="${e.trinity === 3 ? '#39f' : e.trinity === 6 ? '#6f3' : '#f93'}" stroke="#fff" stroke-width="2"><title>${e.summary}</title></rect>`).join('')}
        <text x="12" y="74" font-size="13" fill="#8ff">Think Stream</text>
      </svg>
    `;
  }
} 