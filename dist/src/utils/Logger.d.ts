import { EventEmitter } from 'events';
/**
 * Production-ready logging system for ZeroPoint
 *
 * Provides structured logging with different levels,
 * performance monitoring, and error tracking.
 */
export declare enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3,
    TRACE = 4
}
export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    deviceId: string;
    category: string;
    data?: any;
    error?: Error;
    performance?: {
        duration?: number;
        memory?: number;
        cpu?: number;
    };
}
export interface LoggerConfig {
    level: LogLevel;
    deviceId?: string;
    enableConsole: boolean;
    enableFile: boolean;
    logFilePath?: string;
    maxFileSize: number;
    maxFiles: number;
    enablePerformance: boolean;
    enableMetrics: boolean;
}
export declare class Logger extends EventEmitter {
    private config;
    private metrics;
    private performance;
    constructor(config?: Partial<LoggerConfig>);
    /**
     * Log an error message
     */
    error(message: string, data?: any, error?: Error): void;
    /**
     * Log a warning message
     */
    warn(message: string, data?: any): void;
    /**
     * Log an info message
     */
    info(message: string, data?: any): void;
    /**
     * Log a debug message
     */
    debug(message: string, data?: any): void;
    /**
     * Log a trace message
     */
    trace(message: string, data?: any): void;
    /**
     * Start performance measurement
     */
    startTimer(operation: string): string;
    /**
     * End performance measurement
     */
    endTimer(timerId: string, operation: string): void;
    /**
     * Increment a metric counter
     */
    incrementMetric(name: string, value?: number): void;
    /**
     * Set a metric value
     */
    setMetric(name: string, value: number): void;
    /**
     * Get all metrics
     */
    getMetrics(): Record<string, number>;
    /**
     * Get performance statistics
     */
    getPerformanceStats(): Record<string, {
        avg: number;
        min: number;
        max: number;
        count: number;
    }>;
    /**
     * Create a child logger with additional context
     */
    child(category: string, additionalData?: any): Logger;
    /**
     * Internal logging method
     */
    private log;
    /**
     * Write log entry to console
     */
    private writeToConsole;
    /**
     * Write log entry to file
     */
    private writeToFile;
    getLevel(): LogLevel;
}
/**
 * Global logger instance
 */
export declare const globalLogger: Logger;
//# sourceMappingURL=Logger.d.ts.map