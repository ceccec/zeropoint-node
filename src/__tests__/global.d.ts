import "jest";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidResonance(): R;
      toBeValidConsciousnessLevel(): R;
      toBeValidRGB(): R;
    }
  }
  var testUtils: {
    createTestPattern: (type: string, content: string) => any;
    waitForEvent: (emitter: any, event: string, timeout: number) => Promise<any>;
    createMockDevice: (config?: any) => any;
    createTestNetwork: (deviceCount?: number) => Promise<{ devices: any[]; ports: number[] }>;
    resetMocks: () => void;
    createMockNetworkNode: () => any;
    createMockConsciousnessField: () => any;
  };
}
export {}; 