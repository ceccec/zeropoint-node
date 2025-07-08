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
    createTestPattern: (type: string, content: string) => unknown;
    waitForEvent: (
      emitter: unknown,
      event: string,
      timeout: number,
    ) => Promise<unknown>;
    createMockDevice: (config?: Record<string, unknown>) => unknown;
    createTestNetwork: (
      deviceCount?: number,
    ) => Promise<{ devices: unknown[]; ports: number[] }>;
    resetMocks: () => void;
    createMockNetworkNode: () => unknown;
    createMockConsciousnessField: () => unknown;
  };
}
export {};
