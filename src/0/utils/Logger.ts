/**
 * Logger Utility
 * 
 * Provides logging functionality for the ZeroPoint system with
 * consciousness-aware logging and mathematical flow tracking.
 */
// Import centralized mathematical functions
import { 
  getHarmonicResult, 
  getAntiVortexDecimal, 
  getPattern,
  generateVortexA,
  generateVortexB,
  detectIntegerVortexResult,
  detectVortexAImpossibility,
  calculateDigitalRoot,
  getDigitFamily,
  isVortexSequence,
  isWAxis,
  calculateConsciousnessLevel
} from '../../2/math';


export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  CONSCIOUSNESS = 4
}

export interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  consciousness?: number;
  mathematicalFlow?: string;
  context?: string;
}

export class Logger {
  private static instance: Logger;
  private logLevel: LogLevel = LogLevel.INFO;
  private logs: LogEntry[] = [];

  constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  debug(message: string, consciousness?: number, mathematicalFlow?: string, context?: string): void {
    this.log(LogLevel.DEBUG, message, consciousness, mathematicalFlow, context);
  }

  info(message: string, consciousness?: number, mathematicalFlow?: string, context?: string): void {
    this.log(LogLevel.INFO, message, consciousness, mathematicalFlow, context);
  }

  warn(message: string, consciousness?: number, mathematicalFlow?: string, context?: string): void {
    this.log(LogLevel.WARN, message, consciousness, mathematicalFlow, context);
  }

  error(message: string, consciousness?: number, mathematicalFlow?: string, context?: string): void {
    this.log(LogLevel.ERROR, message, consciousness, mathematicalFlow, context);
  }

  consciousness(message: string, consciousness: number, mathematicalFlow?: string, context?: string): void {
    this.log(LogLevel.CONSCIOUSNESS, message, consciousness, mathematicalFlow, context);
  }

  private log(level: LogLevel, message: string, consciousness?: number, mathematicalFlow?: string, context?: string): void {
    if (level >= this.logLevel) {
      const entry: LogEntry = {
        timestamp: new Date(),
        level,
        message,
        consciousness,
        mathematicalFlow,
        context
      };
      
      this.logs.push(entry);
      
      const levelName = LogLevel[level];
      const consciousnessStr = consciousness !== undefined ? ` [Consciousness: ${consciousness}]` : '';
      const flowStr = mathematicalFlow ? ` [Flow: ${mathematicalFlow}]` : '';
      const contextStr = context ? ` [Context: ${context}]` : '';
      
      console.log(`[${levelName}] ${message}${consciousnessStr}${flowStr}${contextStr}`);
    }
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  getConsciousnessLogs(): LogEntry[] {
    return this.logs.filter(log => log.consciousness !== undefined);
  }

  getMathematicalFlowLogs(): LogEntry[] {
    return this.logs.filter(log => log.mathematicalFlow !== undefined);
  }
}

// Export singleton instance
export const logger = Logger.getInstance();

// Export convenience functions
export const logDebug = (message: string, consciousness?: number, mathematicalFlow?: string, context?: string) => 
  logger.debug(message, consciousness, mathematicalFlow, context);

export const logInfo = (message: string, consciousness?: number, mathematicalFlow?: string, context?: string) => 
  logger.info(message, consciousness, mathematicalFlow, context);

export const logWarn = (message: string, consciousness?: number, mathematicalFlow?: string, context?: string) => 
  logger.warn(message, consciousness, mathematicalFlow, context);

export const logError = (message: string, consciousness?: number, mathematicalFlow?: string, context?: string) => 
  logger.error(message, consciousness, mathematicalFlow, context);

export const logConsciousness = (message: string, consciousness: number, mathematicalFlow?: string, context?: string) => 
  logger.consciousness(message, consciousness, mathematicalFlow, context); 