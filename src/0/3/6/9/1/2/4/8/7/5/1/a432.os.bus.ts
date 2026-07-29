import { log } from './a432.algebra.ts'
// a432.os.bus.ts — Self-contained event bus
class A432Bus {
  constructor() { this.listeners = {}; }
  emit(event, payload) { (this.listeners[event] || []).forEach(fn => fn(payload)); }
  on(event, fn) { (this.listeners[event] = this.listeners[event] || []).push(fn); }
}
// Example usage:
// const bus = new A432Bus();
// bus.on('test', payload => console.log(payload));
// bus.emit('test', { hello: 'world' }); 