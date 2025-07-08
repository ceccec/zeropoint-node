/**
 * Test Setup File
 *
 * Provides global test utilities and configuration for the ZeroPoint Field test suite.
 */

import { EventEmitter } from "events";

// Custom Jest matchers
expect.extend({
  toBeValidResonance(received: number) {
    const pass =
      typeof received === "number" && received >= 0 && received <= 10;
    return {
      message: () =>
        `expected ${received} to be a valid resonance value (0-10)`,
      pass,
    };
  },
  toBeValidConsciousnessLevel(received: number) {
    const pass =
      typeof received === "number" && received >= 0 && received <= 100;
    return {
      message: () =>
        `expected ${received} to be a valid consciousness level (0-100)`,
      pass,
    };
  },
  toBeValidRGB(received: string) {
    const rgbRegex = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
    const pass = typeof received === "string" && rgbRegex.test(received);
    return {
      message: () => `expected ${received} to be a valid RGB color string`,
      pass,
    };
  },
});

// Global type declarations
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeValidResonance(): R;
      toBeValidConsciousnessLevel(): R;
      toBeValidRGB(): R;
    }
  }
}

// Global test utilities
global.testUtils = {
  createTestPattern: (type: string, content: string) => ({
    type,
    content,
    timestamp: Date.now(),
    resonance: Math.random() * 10,
    consciousnessLevel: Math.random() * 100,
  }),
  waitForEvent: (emitter: any, event: string, timeout: number) => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(
        () => reject(new Error(`Timeout waiting for ${event}`)),
        timeout,
      );
      emitter.once(event, (data: any) => {
        clearTimeout(timer);
        resolve(data);
      });
    });
  },
  createMockDevice: (config: any = {}) => {
    return {
      deviceId: `mock-device-${Date.now()}`,
      deviceName: "MockDevice",
      consciousnessLevel: 0.5,
      networkPort: 0,
      discoveryEnabled: false,
      autoConnect: false,
      ...config,
    };
  },
  createTestNetwork: async (deviceCount: number = 2) => {
    const devices = [];
    const ports = [];

    for (let i = 0; i < deviceCount; i++) {
      const port = 8080 + i;
      ports.push(port);
      devices.push({
        deviceId: `test-device-${i}`,
        port,
        address: `localhost:${port}`,
      });
    }

    return { devices, ports };
  },
  resetMocks: () => {
    jest.clearAllMocks();
  },
  createMockNetworkNode: () => {
    const mockNode = Object.assign(new EventEmitter(), {
      start: jest.fn().mockResolvedValue(true),
      stop: jest.fn().mockResolvedValue(true),
      connect: jest.fn().mockResolvedValue(true),
      disconnect: jest.fn().mockResolvedValue(true),
      isConnected: jest.fn().mockReturnValue(true),
      processMessage: jest.fn().mockResolvedValue(true),
    });
    return mockNode;
  },
  createMockConsciousnessField: () => {
    const mockField = Object.assign(new EventEmitter(), {
      calculateResonance: jest.fn().mockReturnValue(0.7),
      broadcastPattern: jest.fn().mockResolvedValue(true),
      getFieldStrength: jest.fn().mockReturnValue(0.8),
      getConsciousnessLevel: jest.fn().mockReturnValue(0.6),
    });
    return mockField;
  },
};

// Global test configuration
beforeAll(() => {
  // Increase timeout for all tests
  jest.setTimeout(15000);

  // Suppress console output during tests unless explicitly needed
  if (process.env["NODE_ENV"] === "test") {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  }
});

afterAll(() => {
  // Restore console methods
  jest.restoreAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
  // If you create any event emitters in tests, remove all listeners here
  // Example: if (global.someEmitter) global.someEmitter.removeAllListeners();
});
