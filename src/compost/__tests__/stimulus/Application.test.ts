import { Application } from "stimulus";
import ZeroPointController from "../../stimulus/controllers/ZeroPointController";
import MetaphysicalController from "../../stimulus/controllers/MetaphysicalController";
import { LogLevel } from "../../stimulus/types/ControllerTypes";

// Mock the window object for testing
const mockWindow = {
  ZeroPointApp: null
};

Object.defineProperty(global, 'window', {
  value: mockWindow,
  writable: true
});

// Mock console.log to capture log messages
const mockConsoleLog = jest.fn();
Object.defineProperty(console, 'log', {
  value: mockConsoleLog,
  writable: true
});

describe('ZeroPoint Stimulus Application', () => {
  let application: Application;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    mockWindow.ZeroPointApp = null;
  });

  describe('Application Initialization', () => {
    it('should create application with default configuration', () => {
      // Import the application (this will trigger initialization)
      const app = require('../../stimulus/application').default;
      
      expect(app).toBeDefined();
      expect(app).toBeInstanceOf(Application);
    });

    it('should register core controllers', () => {
      const app = require('../../stimulus/application').default;
      
      // Check that controllers are registered
      expect(app.controllers).toBeDefined();
      expect(Object.keys(app.controllers)).toContain('zeropoint');
      expect(Object.keys(app.controllers)).toContain('metaphysical');
    });

    it('should set up global access in development mode', () => {
      // Mock NODE_ENV to development
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      // Re-import to trigger initialization with development config
      jest.resetModules();
      require('../../stimulus/application');

      expect(mockWindow.ZeroPointApp).toBeDefined();
      expect(mockWindow.ZeroPointApp).toHaveProperty('application');
      expect(mockWindow.ZeroPointApp).toHaveProperty('config');
      expect(mockWindow.ZeroPointApp).toHaveProperty('logs');
      expect(mockWindow.ZeroPointApp).toHaveProperty('getLogs');
      expect(mockWindow.ZeroPointApp).toHaveProperty('clearLogs');

      // Restore original environment
      process.env.NODE_ENV = originalEnv;
    });

    it('should set up minimal global access in production mode', () => {
      // Mock NODE_ENV to production
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      // Re-import to trigger initialization with production config
      jest.resetModules();
      const app = require('../../stimulus/application').default;

      expect(mockWindow.ZeroPointApp).toBe(app);

      // Restore original environment
      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('Logging System', () => {
    it('should log application startup messages', () => {
      // Re-import to trigger logging
      jest.resetModules();
      require('../../stimulus/application');

      expect(mockConsoleLog).toHaveBeenCalledWith('ℹ️ [INFO] 🌌 ZeroPoint Stimulus Application Started');
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('ℹ️ [INFO] Registered Controllers:'));
    });

    it('should log controller registration', () => {
      // Re-import to trigger logging
      jest.resetModules();
      require('../../stimulus/application');

      expect(mockConsoleLog).toHaveBeenCalledWith('🔍 [DEBUG] Controller \'zeropoint\' registered');
      expect(mockConsoleLog).toHaveBeenCalledWith('🔍 [DEBUG] Controller \'metaphysical\' registered');
    });

    it('should handle controller registration errors', () => {
      // Mock Application.start to throw an error
      const originalStart = Application.start;
      Application.start = jest.fn().mockImplementation(() => {
        throw new Error('Application start failed');
      });

      expect(() => {
        jest.resetModules();
        require('../../stimulus/application');
      }).toThrow('Application start failed');

      // Restore original method
      Application.start = originalStart;
    });
  });

  describe('Configuration', () => {
    it('should use development configuration in development mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      jest.resetModules();
      const app = require('../../stimulus/application').default;

      expect(mockWindow.ZeroPointApp.config.debug).toBe(true);
      expect(mockWindow.ZeroPointApp.config.logLevel).toBe(LogLevel.DEBUG);

      process.env.NODE_ENV = originalEnv;
    });

    it('should use production configuration in production mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      jest.resetModules();
      require('../../stimulus/application');

      expect(mockWindow.ZeroPointApp.config.debug).toBe(false);
      expect(mockWindow.ZeroPointApp.config.logLevel).toBe(LogLevel.INFO);

      process.env.NODE_ENV = originalEnv;
    });

    it('should use default configuration when NODE_ENV is not set', () => {
      const originalEnv = process.env.NODE_ENV;
      delete process.env.NODE_ENV;

      jest.resetModules();
      require('../../stimulus/application');

      expect(mockWindow.ZeroPointApp.config.debug).toBe(false);
      expect(mockWindow.ZeroPointApp.config.logLevel).toBe(LogLevel.INFO);

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('Log Level Filtering', () => {
    it('should filter logs based on configured level', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production'; // INFO level

      jest.resetModules();
      require('../../stimulus/application');

      // Should log INFO and ERROR messages, but not DEBUG
      const logCalls = mockConsoleLog.mock.calls.map(call => call[0]);
      
      expect(logCalls.some(call => call.includes('[INFO]'))).toBe(true);
      expect(logCalls.some(call => call.includes('[ERROR]'))).toBe(false); // No errors in normal startup
      expect(logCalls.some(call => call.includes('[DEBUG]'))).toBe(false); // DEBUG filtered out in production

      process.env.NODE_ENV = originalEnv;
    });

    it('should show DEBUG messages in development mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development'; // DEBUG level

      jest.resetModules();
      require('../../stimulus/application');

      const logCalls = mockConsoleLog.mock.calls.map(call => call[0]);
      
      expect(logCalls.some(call => call.includes('[DEBUG]'))).toBe(true);

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('Global Access Methods', () => {
    beforeEach(() => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      jest.resetModules();
      require('../../stimulus/application');
      
      process.env.NODE_ENV = originalEnv;
    });

    it('should provide getLogs method', () => {
      const logs = mockWindow.ZeroPointApp.getLogs();
      expect(Array.isArray(logs)).toBe(true);
      expect(logs.length).toBeGreaterThan(0);
      
      // Check log structure
      const firstLog = logs[0];
      expect(firstLog).toHaveProperty('level');
      expect(firstLog).toHaveProperty('message');
      expect(firstLog).toHaveProperty('timestamp');
      expect(typeof firstLog.level).toBe('string');
      expect(typeof firstLog.message).toBe('string');
      expect(typeof firstLog.timestamp).toBe('number');
    });

    it('should provide clearLogs method', () => {
      const initialLogs = mockWindow.ZeroPointApp.getLogs();
      expect(initialLogs.length).toBeGreaterThan(0);

      mockWindow.ZeroPointApp.clearLogs();
      
      const clearedLogs = mockWindow.ZeroPointApp.getLogs();
      expect(clearedLogs.length).toBe(0);
    });

    it('should provide application instance', () => {
      expect(mockWindow.ZeroPointApp.application).toBeDefined();
      expect(mockWindow.ZeroPointApp.application).toBeInstanceOf(Application);
    });

    it('should provide configuration', () => {
      expect(mockWindow.ZeroPointApp.config).toBeDefined();
      expect(mockWindow.ZeroPointApp.config).toHaveProperty('debug');
      expect(mockWindow.ZeroPointApp.config).toHaveProperty('logLevel');
      expect(mockWindow.ZeroPointApp.config).toHaveProperty('controllers');
    });
  });

  describe('Error Handling', () => {
    it('should handle controller registration errors gracefully', () => {
      // Mock a controller that throws an error
      const MockController = class {
        static targets = [];
      };

      // This would normally be handled by the application class
      // We're testing the error handling pattern
      expect(() => {
        const app = Application.start();
        app.register('test', MockController);
      }).not.toThrow();
    });

    it('should log errors with appropriate level', () => {
      // Mock console.error to capture error logs
      const mockConsoleError = jest.fn();
      const originalError = console.error;
      console.error = mockConsoleError;

      try {
        // Trigger an error by trying to register an invalid controller
        const app = Application.start();
        app.register('invalid', null as any);
      } catch (error) {
        // Error should be caught and logged
      }

      expect(mockConsoleError).toHaveBeenCalled();

      console.error = originalError;
    });
  });

  describe('Controller Integration', () => {
    it('should properly register ZeroPointController', () => {
      const app = require('../../stimulus/application').default;
      
      expect(app.controllers.zeropoint).toBe(ZeroPointController);
    });

    it('should properly register MetaphysicalController', () => {
      const app = require('../../stimulus/application').default;
      
      expect(app.controllers.metaphysical).toBe(MetaphysicalController);
    });

    it('should have correct controller names', () => {
      const app = require('../../stimulus/application').default;
      const controllerNames = Object.keys(app.controllers);
      
      expect(controllerNames).toContain('zeropoint');
      expect(controllerNames).toContain('metaphysical');
      expect(controllerNames.length).toBe(2);
    });
  });

  describe('Type Safety', () => {
    it('should have correct LogLevel enum values', () => {
      expect(LogLevel.DEBUG).toBe('debug');
      expect(LogLevel.INFO).toBe('info');
      expect(LogLevel.WARN).toBe('warn');
      expect(LogLevel.ERROR).toBe('error');
    });

    it('should have correct log entry structure', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      jest.resetModules();
      require('../../stimulus/application');
      
      const logs = mockWindow.ZeroPointApp.getLogs();
      const logEntry = logs[0];
      
      expect(logEntry).toHaveProperty('level');
      expect(logEntry).toHaveProperty('message');
      expect(logEntry).toHaveProperty('timestamp');
      expect(logEntry).toHaveProperty('operation');
      expect(logEntry).toHaveProperty('data');
      
      expect(Object.values(LogLevel)).toContain(logEntry.level);
      expect(typeof logEntry.message).toBe('string');
      expect(typeof logEntry.timestamp).toBe('number');
      
      process.env.NODE_ENV = originalEnv;
    });
  });
}); 