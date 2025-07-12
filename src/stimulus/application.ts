import { Application } from "stimulus";
import ZeroPointController from "./controllers/ZeroPointController";
import MetaphysicalController from "./controllers/MetaphysicalController";
import { LogLevel, LogEntry } from "./types/ControllerTypes";

/**
 * ZeroPoint Stimulus Application Configuration
 */
interface AppConfig {
  debug: boolean;
  logLevel: LogLevel;
  controllers: Record<string, any>;
}

/**
 * ZeroPoint Stimulus Application
 * 
 * Main application that registers all controllers with enhanced error handling
 * and logging capabilities
 */
class ZeroPointApplication {
  private application: Application;
  private config: AppConfig;
  private logs: LogEntry[] = [];

  constructor(config: Partial<AppConfig> = {}) {
    this.config = {
      debug: config.debug ?? false,
      logLevel: config.logLevel ?? LogLevel.INFO,
      controllers: config.controllers ?? {}
    };

    this.application = Application.start();
    this.initializeControllers();
    this.setupGlobalAccess();
    this.logApplicationStart();
  }

  /**
   * Initialize all controllers with error handling
   */
  private initializeControllers(): void {
    try {
      // Register core controllers
      this.registerController("zeropoint", ZeroPointController);
      this.registerController("metaphysical", MetaphysicalController);

      // Register any additional controllers from config
      Object.entries(this.config.controllers).forEach(([name, controller]) => {
        this.registerController(name, controller);
      });

      this.log(LogLevel.INFO, "All controllers registered successfully");
    } catch (error) {
      this.log(LogLevel.ERROR, `Controller initialization failed: ${error}`);
      throw error;
    }
  }

  /**
   * Register a controller with error handling
   */
  private registerController(name: string, controller: any): void {
    try {
      this.application.register(name, controller);
      this.log(LogLevel.DEBUG, `Controller '${name}' registered`);
    } catch (error) {
      this.log(LogLevel.ERROR, `Failed to register controller '${name}': ${error}`);
      throw error;
    }
  }

  /**
   * Setup global access for debugging
   */
  private setupGlobalAccess(): void {
    if (this.config.debug) {
      (window as any).ZeroPointApp = {
        application: this.application,
        config: this.config,
        logs: this.logs,
        getLogs: () => this.logs,
        clearLogs: () => this.logs = []
      };
    } else {
      (window as any).ZeroPointApp = this.application;
    }
  }

  /**
   * Log application startup
   */
  private logApplicationStart(): void {
    this.log(LogLevel.INFO, "🌌 ZeroPoint Stimulus Application Started");
    this.log(LogLevel.INFO, `Registered Controllers: ${Object.keys(this.application.controllers).join(", ")}`);
  }

  /**
   * Log message with timestamp and level
   */
  private log(level: LogLevel, message: string, operation?: string, data?: any): void {
    const logEntry: LogEntry = {
      level,
      message,
      timestamp: Date.now(),
      operation,
      data
    };

    this.logs.push(logEntry);

    // Only log if level is appropriate
    if (this.shouldLog(level)) {
      const emoji = this.getLevelEmoji(level);
      console.log(`${emoji} [${level.toUpperCase()}] ${message}`);
    }
  }

  /**
   * Check if message should be logged based on config
   */
  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    const configLevelIndex = levels.indexOf(this.config.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= configLevelIndex;
  }

  /**
   * Get emoji for log level
   */
  private getLevelEmoji(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG: return "🔍";
      case LogLevel.INFO: return "ℹ️";
      case LogLevel.WARN: return "⚠️";
      case LogLevel.ERROR: return "❌";
      default: return "ℹ️";
    }
  }

  /**
   * Get the Stimulus application instance
   */
  getApplication(): Application {
    return this.application;
  }

  /**
   * Get application configuration
   */
  getConfig(): AppConfig {
    return this.config;
  }

  /**
   * Get application logs
   */
  getLogs(): LogEntry[] {
    return this.logs;
  }
}

// Initialize the application
const app = new ZeroPointApplication({
  debug: process.env.NODE_ENV === 'development',
  logLevel: process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO
});

export default app.getApplication(); 