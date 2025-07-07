"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalLogger = exports.Logger = exports.LogLevel = void 0;
const events_1 = require("events");
/**
 * Production-ready logging system for ZeroPoint
 *
 * Provides structured logging with different levels,
 * performance monitoring, and error tracking.
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
    LogLevel[LogLevel["TRACE"] = 4] = "TRACE";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class Logger extends events_1.EventEmitter {
    constructor(config = {}) {
        super();
        this.metrics = new Map();
        this.performance = new Map();
        this.config = {
            level: LogLevel.INFO,
            enableConsole: true,
            enableFile: false,
            maxFileSize: 10,
            maxFiles: 5,
            enablePerformance: true,
            enableMetrics: true,
            ...config
        };
    }
    /**
     * Log an error message
     */
    error(message, data, error) {
        this.log(LogLevel.ERROR, message, data, error);
    }
    /**
     * Log a warning message
     */
    warn(message, data) {
        this.log(LogLevel.WARN, message, data);
    }
    /**
     * Log an info message
     */
    info(message, data) {
        this.log(LogLevel.INFO, message, data);
    }
    /**
     * Log a debug message
     */
    debug(message, data) {
        this.log(LogLevel.DEBUG, message, data);
    }
    /**
     * Log a trace message
     */
    trace(message, data) {
        this.log(LogLevel.TRACE, message, data);
    }
    /**
     * Start performance measurement
     */
    startTimer(operation) {
        if (!this.config.enablePerformance)
            return '';
        const timerId = `${operation}_${Date.now()}_${Math.random()}`;
        this.performance.set(timerId, [Date.now()]);
        return timerId;
    }
    /**
     * End performance measurement
     */
    endTimer(timerId, operation) {
        if (!this.config.enablePerformance || !timerId)
            return;
        const startTime = this.performance.get(timerId);
        if (startTime && startTime[0] !== undefined) {
            const duration = Date.now() - startTime[0];
            this.performance.delete(timerId);
            this.debug(`Performance: ${operation}`, { duration, operation });
            // Update metrics
            if (this.config.enableMetrics) {
                const key = `perf_${operation}`;
                const current = this.metrics.get(key) || 0;
                this.metrics.set(key, current + duration);
            }
        }
    }
    /**
     * Increment a metric counter
     */
    incrementMetric(name, value = 1) {
        if (!this.config.enableMetrics)
            return;
        const current = this.metrics.get(name) || 0;
        this.metrics.set(name, current + value);
    }
    /**
     * Set a metric value
     */
    setMetric(name, value) {
        if (!this.config.enableMetrics)
            return;
        this.metrics.set(name, value);
    }
    /**
     * Get all metrics
     */
    getMetrics() {
        return Object.fromEntries(this.metrics);
    }
    /**
     * Get performance statistics
     */
    getPerformanceStats() {
        const stats = {};
        for (const [key, values] of this.performance.entries()) {
            if (values.length > 1) { // Only completed measurements
                const durations = values.slice(1); // Skip start time
                const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
                const min = Math.min(...durations);
                const max = Math.max(...durations);
                stats[key] = { avg, min, max, count: durations.length };
            }
        }
        return stats;
    }
    /**
     * Create a child logger with additional context
     */
    child(category, additionalData) {
        const childLogger = new Logger(this.config);
        if (this.config.deviceId !== undefined) {
            childLogger.config.deviceId = this.config.deviceId;
        }
        // Override log method to add category context
        const originalLog = childLogger.log.bind(childLogger);
        childLogger.log = (level, message, data, error) => {
            const enhancedData = { ...additionalData, ...data, category };
            originalLog(level, message, enhancedData, error);
        };
        return childLogger;
    }
    /**
     * Internal logging method
     */
    log(level, message, data, error) {
        if (level > this.config.level)
            return;
        const entry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            deviceId: this.config.deviceId ?? '',
            category: 'general',
            data
        };
        if (error)
            entry.error = error;
        // Add performance data if available
        if (this.config.enablePerformance) {
            const memUsage = process.memoryUsage();
            entry.performance = {
                memory: memUsage.heapUsed / 1024 / 1024, // MB
                cpu: process.cpuUsage().user / 1000000 // seconds
            };
        }
        // Emit log event
        this.emit('log', entry);
        // Console output
        if (this.config.enableConsole) {
            this.writeToConsole(entry);
        }
        // File output
        if (this.config.enableFile && this.config.logFilePath) {
            this.writeToFile(entry);
        }
    }
    /**
     * Write log entry to console
     */
    writeToConsole(entry) {
        const levelStr = LogLevel[entry.level];
        let timestamp = 'unknown';
        if (entry.timestamp) {
            const splitT = entry.timestamp.split('T');
            if (splitT.length > 1 && splitT[1]) {
                const splitDot = splitT[1].split('.');
                timestamp = splitDot[0] ?? 'unknown';
            }
        }
        const prefix = `[${timestamp}] [${levelStr}]`;
        let output = `${prefix} ${entry.message}`;
        if (entry.deviceId) {
            output += ` [Device: ${entry.deviceId}]`;
        }
        if (entry.data) {
            output += ` | Data: ${JSON.stringify(entry.data)}`;
        }
        if (entry.error) {
            output += ` | Error: ${entry.error.message}`;
        }
        // Color coding for different levels
        switch (entry.level) {
            case LogLevel.ERROR:
                console.error('\x1b[31m%s\x1b[0m', output); // Red
                break;
            case LogLevel.WARN:
                console.warn('\x1b[33m%s\x1b[0m', output); // Yellow
                break;
            case LogLevel.INFO:
                console.info('\x1b[36m%s\x1b[0m', output); // Cyan
                break;
            default:
                console.log(output);
        }
    }
    /**
     * Write log entry to file
     */
    writeToFile(entry) {
        // This would implement file rotation and writing
        // For now, just emit an event for external file handling
        this.emit('fileLog', entry);
    }
    getLevel() {
        return this.config.level;
    }
}
exports.Logger = Logger;
/**
 * Global logger instance
 */
exports.globalLogger = new Logger({
    level: LogLevel.INFO,
    enableConsole: true,
    enablePerformance: true,
    enableMetrics: true
});
//# sourceMappingURL=Logger.js.map