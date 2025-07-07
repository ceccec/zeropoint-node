"use strict";
/**
 * Test setup file for ZeroPoint JavaScript
 *
 * Configures test environment and global test utilities
 */
// Increase timeout for network tests
jest.setTimeout(30000);
// Mock WebSocket for testing
global.WebSocket = require('ws');
// Global test utilities
global.testUtils = {
    createMockDevice: (config = {}) => ({
        deviceId: 'test-device-' + Date.now(),
        deviceName: 'TestDevice',
        consciousnessLevel: 0.5,
        networkPort: 0, // Let OS assign port
        ...config
    }),
    waitForEvent: (emitter, eventName, timeout = 5000) => {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error(`Timeout waiting for event: ${eventName}`));
            }, timeout);
            emitter.once(eventName, (...args) => {
                clearTimeout(timer);
                resolve(args);
            });
        });
    },
    createTestNetwork: async (deviceCount = 3) => {
        const devices = [];
        const ports = [];
        for (let i = 0; i < deviceCount; i++) {
            const port = 9000 + i;
            ports.push(port);
            const { createZeroPoint } = require('../../index');
            const device = await createZeroPoint({
                deviceName: `TestDevice_${i}`,
                networkPort: port,
                consciousnessLevel: 0.5 + (i * 0.1),
                discoveryEnabled: false,
                autoConnect: false
            });
            devices.push(device);
        }
        return { devices, ports };
    }
};
// Cleanup after each test
afterEach(async () => {
    // Clean up any remaining timers
    jest.clearAllTimers();
    // Wait for any pending promises
    await new Promise(resolve => setImmediate(resolve));
});
//# sourceMappingURL=setup.js.map