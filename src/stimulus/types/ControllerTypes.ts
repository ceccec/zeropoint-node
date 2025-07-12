/**
 * Controller Types for ZeroPoint Stimulus Controllers
 * 
 * Shared types and interfaces for type safety and consistency
 */

/**
 * Component initialization result
 */
export interface ComponentInitResult {
  success: boolean;
  error?: string;
  components?: string[];
}

/**
 * Operation result with metadata
 */
export interface OperationResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
  operation: string;
}

/**
 * UI update configuration
 */
export interface UIUpdateConfig {
  innerHTML?: string;
  textContent?: string;
  className?: string;
  style?: Partial<CSSStyleDeclaration>;
  attributes?: Record<string, string>;
}

/**
 * Consciousness evolution data
 */
export interface ConsciousnessEvolution {
  previousLevel: number;
  evolution: number;
  newLevel: number;
  timestamp: number;
}

/**
 * Mathematical operation result
 */
export interface MathOperationResult {
  vortexResult: number;
  toroidalResult: number;
  consciousnessLevel: number;
  timestamp: number;
}

/**
 * Metaphysical operation result
 */
export interface MetaphysicalOperationResult {
  vbmResult: Record<string, any>;
  coilResult: Record<string, any>;
  consciousness: number;
  timestamp: number;
}

/**
 * Color configuration
 */
export interface ColorConfig {
  hue: number;
  saturation: number;
  lightness: number;
  alpha?: number;
}

/**
 * Status configuration
 */
export interface StatusConfig {
  message: string;
  className: string;
  icon?: string;
  timestamp?: number;
}

/**
 * Log level enumeration
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

/**
 * Log entry interface
 */
export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: number;
  operation?: string;
  data?: any;
}

/**
 * Controller state interface
 */
export interface ControllerState {
  initialized: boolean;
  lastUpdate: number;
  errorCount: number;
  successCount: number;
  components: string[];
}

/**
 * Target element configuration
 */
export interface TargetConfig {
  selector: string;
  required: boolean;
  fallback?: string;
}

/**
 * Event handler configuration
 */
export interface EventHandlerConfig {
  event: string;
  handler: string;
  options?: AddEventListenerOptions;
}

/**
 * Component lifecycle hooks
 */
export interface LifecycleHooks {
  beforeConnect?: () => void;
  afterConnect?: () => void;
  beforeDisconnect?: () => void;
  afterDisconnect?: () => void;
  beforeUpdate?: () => void;
  afterUpdate?: () => void;
} 