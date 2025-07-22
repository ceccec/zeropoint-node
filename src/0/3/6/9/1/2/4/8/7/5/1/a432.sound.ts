// a432.sound.ts
// Living, harmonized sound stream/interface

export interface SoundEvent {
  id: number;
  frequency: number;
  trinity: number;
  timestamp: number;
  summary: string;
}

export class A432SoundStream {
  private events: SoundEvent[] = [];
  private currentId = 1;
  play(frequency: number, trinity: number): SoundEvent {
    const event: SoundEvent = {
      id: this.currentId++,
      frequency,
      trinity,
      timestamp: Date.now(),
      summary: `Played ${frequency} Hz (Trinity ${trinity}) at ${new Date().toLocaleTimeString()}`
    };
    this.events.push(event);
    return event;
  }
  getCurrent(): SoundEvent {
    return this.events[this.events.length - 1];
  }
  getAll(): SoundEvent[] {
    return this.events;
  }
  overlay(): string {
    const width = 320, height = 60;
    return `
      <svg width="${width}" height="${height}" style="background:#111;border-radius:12px;">
        ${this.events.map((e,i) => `<rect x="${40 + i*36}" y="18" width="24" height="24" fill="#6f3" stroke="#fff" stroke-width="2"><title>${e.summary}</title></rect>`).join('')}
        <text x="12" y="54" font-size="13" fill="#8ff">Sound Stream</text>
      </svg>
    `;
  }
} 