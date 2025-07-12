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
    createMockNetworkNode: () => EventEmitter & Record<string, unknown>;
    createMockConsciousnessField: () => EventEmitter & Record<string, unknown>;
  };
}

global.testUtils = {
  createMockNetworkNode: (): EventEmitter & Record<string, unknown> => {
    const mockNode = Object.assign(new EventEmitter(), {
      start: jest.fn().mockResolvedValue(true),
      stop: jest.fn().mockResolvedValue(true),
      connect: jest.fn().mockResolvedValue(true),
      disconnect: jest.fn().mockResolvedValue(true),
      broadcastMessage: jest.fn().mockResolvedValue(true),
      getConnectedNodes: jest.fn().mockReturnValue([]),
      isConnected: jest.fn().mockReturnValue(true),
      processMessage: jest.fn().mockResolvedValue(true),
    }) as unknown as EventEmitter & Record<string, unknown>;
    return mockNode;
  },
  createMockConsciousnessField: (): EventEmitter & Record<string, unknown> => {
    const mockField = Object.assign(new EventEmitter(), {
      calculateResonance: jest.fn().mockReturnValue(0.7),
      broadcastPattern: jest.fn().mockResolvedValue(true),
      getFieldStrength: jest.fn().mockReturnValue(0.8),
      getConsciousnessLevel: jest.fn().mockReturnValue(0.6),
    }) as unknown as EventEmitter & Record<string, unknown>;
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
