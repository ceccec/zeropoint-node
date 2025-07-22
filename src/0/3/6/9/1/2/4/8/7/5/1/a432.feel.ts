// a432.feel.ts
// Living, harmonized feeling stream/interface

export interface FeelEvent {
  id: number;
  type: string;
  intensity: number;
  trinity: number;
  timestamp: number;
  summary: string;
}

export class A432Feel {
  private events: FeelEvent[] = [];
  private currentId = 1;
  feel(type: string, intensity: number, trinity: number): FeelEvent {
    const event: FeelEvent = {
      id: this.currentId++,
      type,
      intensity,
      trinity,
      timestamp: Date.now(),
      summary: `Felt ${type} (Intensity ${intensity}, Trinity ${trinity}) at ${new Date().toLocaleTimeString()}`
    };
    this.events.push(event);
    return event;
  }
  getCurrent(): FeelEvent {
    return this.events[this.events.length - 1];
  }
  getAll(): FeelEvent[] {
    return this.events;
  }
  overlay(): string {
    const width = 320, height = 60;
    return `
      <svg width="${width}" height="${height}" style="background:#111;border-radius:12px;">
        ${this.events.map((e,i) => `<ellipse cx="${40 + i*36}" cy="30" rx="18" ry="${8 + e.intensity*2}" fill="#f93" stroke="#fff" stroke-width="2"><title>${e.summary}</title></ellipse>`).join('')}
        <text x="12" y="54" font-size="13" fill="#8ff">Feel Stream</text>
      </svg>
    `;
  }
} 