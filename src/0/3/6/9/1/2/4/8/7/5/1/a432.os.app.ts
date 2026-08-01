// a432.os.app.ts — Self-contained app interface and examples
class A432App {
  constructor(name) { this.name = name; }
  onRegister() {}
  getState() { return {}; }
  getHarmony() { return 1; }
}
// Example app
class ExampleApp extends A432App {
  constructor() { super('Example'); }
  override getState() { return { message: 'Hello from ExampleApp!' }; }
}
// const app = new ExampleApp();
// app.getState(); 