import { startA432UI } from './a432.ui';
import * as self from './a432.self';
import * as breathe from './a432.breathe';
import * as math from './a432.math';
import * as sound from './a432.sound';
import * as video from './a432.video';
import { cmykToCss } from './a432.cmyk';

// Mock document and window for DOM side effects
beforeAll(() => {
  global.document = {
    body: { style: { backgroundColor: '' } }
  } as any;
  global.window = {} as any;
});

describe('a432.ui.ts — Living Experience', () => {
  let breathHandler: any;
  let matrixHandler: any;

  beforeEach(() => {
    // Mock emitters using jest.spyOn
    jest.spyOn(breathe.breathEmitter, 'on').mockImplementation((event, cb) => { if (event === 'breath') breathHandler = cb; return breathe.breathEmitter; });
    jest.spyOn(self.matrixEmitter, 'on').mockImplementation((event, cb) => { if (event === 'event') matrixHandler = cb; return self.matrixEmitter; });
    // Mock dependencies
    jest.spyOn(self, 'startSelfEvolution').mockImplementation(() => () => {});
    jest.spyOn(breathe, 'startBreathing').mockImplementation(() => () => {});
    jest.spyOn(math, 'digitAngleToCMYK').mockImplementation((d) => ({ c: d, m: d, y: d, k: d }));
    jest.spyOn(math, 'asAngle').mockImplementation((n) => n as any);
    jest.spyOn(sound, 'playDigit').mockImplementation(() => Promise.resolve());
    jest.spyOn(video, 'flashColor').mockImplementation(() => {});
    // Reset DOM
    document.body.style.backgroundColor = '';
  });

  test('should start streams and register event handlers', () => {
    startA432UI();
    expect(self.startSelfEvolution).toHaveBeenCalled();
    expect(breathe.startBreathing).toHaveBeenCalled();
    expect(breathe.breathEmitter.on).toHaveBeenCalledWith('breath', expect.any(Function));
    expect(self.matrixEmitter.on).toHaveBeenCalledWith('event', expect.any(Function));
  });

  test('should update color and play sound on breath event', async () => {
    startA432UI();
    breathHandler({ value: 3 });
    // Color and sound logic triggered
    expect(document.body.style.backgroundColor).toBe(cmykToCss({ c: 3, m: 3, y: 3, k: 3 }));
    expect(sound.playDigit).toHaveBeenCalled();
    expect(video.flashColor).toHaveBeenCalledWith({ c: 3, m: 3, y: 3, k: 3 });
  });

  test('should update color and play sound on matrix event', async () => {
    startA432UI();
    matrixHandler({ digit: 6 });
    expect(document.body.style.backgroundColor).toBe(cmykToCss({ c: 6, m: 6, y: 6, k: 6 }));
    expect(sound.playDigit).toHaveBeenCalled();
    expect(video.flashColor).toHaveBeenCalledWith({ c: 6, m: 6, y: 6, k: 6 });
  });

  test('should handle user input (keydown) and update state', () => {
    // Simulate window and addEventListener
    const listeners: any = {};
    global.window.addEventListener = jest.fn((event, cb) => { listeners[event] = cb; });
    startA432UI();
    // Simulate keydown for digit 7
    listeners['keydown']({ key: '7' });
    // Color and sound logic triggered
    expect(document.body.style.backgroundColor).toBe(cmykToCss({ c: 7, m: 7, y: 7, k: 7 }));
    expect(sound.playDigit).toHaveBeenCalled();
    expect(video.flashColor).toHaveBeenCalledWith({ c: 7, m: 7, y: 7, k: 7 });
  });

  test('should use xorDigit logic for state', () => {
    // This test checks the xorDigit logic indirectly via event simulation
    // breathDigit = 2, matrixDigit = 4, userDigit = 5
    startA432UI();
    breathHandler({ value: 2 });
    matrixHandler({ digit: 4 });
    // Simulate keydown for digit 5
    const listeners: any = {};
    global.window.addEventListener = jest.fn((event, cb) => { listeners[event] = cb; });
    listeners['keydown']({ key: '5' });
    // The xor of 2, 4, 5 is 7 (2^4^5=7)
    expect(document.body.style.backgroundColor).toBe(cmykToCss({ c: 7, m: 7, y: 7, k: 7 }));
  });
}); 