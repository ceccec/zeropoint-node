import "jest";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeValidResonance(): R;
      toBeValidConsciousnessLevel(): R;
      toBeValidRGB(): R;
    }
  }

  // eslint-disable-next-line no-var
  var testUtils: {
    createTestPattern: (type: string, content: string) => any;
    waitForEvent: (
      emitter: any,
      event: string,
      timeout: number,
    ) => Promise<any>;
    createMockDevice: (config?: any) => any;
    createTestNetwork: (
      deviceCount?: number,
    ) => Promise<{ devices: any[]; ports: number[] }>;
    resetMocks: () => void;
    createMockNetworkNode: () => any;
    createMockConsciousnessField: () => any;
  };
}
export {};
