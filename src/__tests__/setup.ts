/**
 * Test Setup File
 *
 * Provides global test utilities and configuration for the ZeroPoint Field test suite.
 */

import { EventEmitter } from "events";

// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidResonance(): R;
      toBeValidConsciousnessLevel(): R;
    }
  }
}

// Custom matchers
expect.extend({
  toBeValidResonance(received: number) {
    const pass = typeof received === 'number' && received >= 0 && received <= 1;
    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid resonance (0-1)`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid resonance (0-1)`,
        pass: false,
      };
    }
  },
  toBeValidConsciousnessLevel(received: number) {
    const pass = typeof received === 'number' && received >= 0 && received <= 1;
    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid consciousness level (0-1)`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid consciousness level (0-1)`,
        pass: false,
      };
    }
  },
});

// Global test utilities
declare global {
  var testUtils: {
    createTestPattern: (type: string, content: string) => unknown;
    waitForEvent: (emitter: unknown, event: string, timeout: number) => Promise<unknown>;
    createMockDevice: (config?: Record<string, unknown>) => unknown;
    createTestNetwork: (deviceCount?: number) => Promise<{ devices: unknown[]; ports: number[] }>;
    resetMocks: () => void;
    createMockNetworkNode: () => unknown;
    createMockConsciousnessField: () => unknown;
  };
}

global.testUtils = {
  createTestPattern: (type: string, content: string): unknown => ({
    type,
    content,
    timestamp: Date.now(),
    id: `test_pattern_${Date.now()}`,
  }),
  
  waitForEvent: async (emitter: unknown, event: string, timeout: number): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`Timeout waiting for event: ${event}`)), timeout);
      if (emitter && typeof (emitter as EventEmitter).on === 'function') {
        (emitter as EventEmitter).once(event, (data) => {
          clearTimeout(timer);
          resolve(data);
        });
      } else {
        clearTimeout(timer);
        reject(new Error('Invalid emitter'));
      }
    });
  },
  
  createMockDevice: (config?: Record<string, unknown>): unknown => ({
    id: `mock_device_${Date.now()}`,
    type: 'test',
    config: config || {},
    start: jest.fn().mockResolvedValue(true),
    stop: jest.fn().mockResolvedValue(true),
  }),
  
  createTestNetwork: async (deviceCount: number = 2): Promise<{ devices: unknown[]; ports: number[] }> => {
    const devices = [];
    const ports = [];
    for (let i = 0; i < deviceCount; i++) {
      devices.push({
        id: `test_device_${i}`,
        port: 8080 + i,
      });
      ports.push(8080 + i);
    }
    return { devices, ports };
  },
  
  resetMocks: (): void => {
    jest.clearAllMocks();
  },
  
  createMockNetworkNode: (): unknown => {
    const mockNode = Object.assign(new EventEmitter(), {
      start: jest.fn().mockResolvedValue(true),
      stop: jest.fn().mockResolvedValue(true),
      connect: jest.fn().mockResolvedValue(true),
      disconnect: jest.fn().mockResolvedValue(true),
      broadcastMessage: jest.fn().mockResolvedValue(true),
      getConnectedNodes: jest.fn().mockReturnValue([]),
      isConnected: jest.fn().mockReturnValue(true),
      processMessage: jest.fn().mockResolvedValue(true),
    });
    return mockNode;
  },
  
  createMockConsciousnessField: (): unknown => {
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
  
  // Verify custom matchers are loaded
  console.log("Custom matchers loaded:", typeof expect.extend);
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
