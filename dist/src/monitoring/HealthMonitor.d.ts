import { EventEmitter } from 'events';
/**
 * Health monitoring system for ZeroPoint devices
 *
 * Monitors system health, performance, and provides
 * health check endpoints for production deployment.
 */
export interface HealthStatus {
    status: 'healthy' | 'degraded' | 'unhealthy';
    timestamp: string;
    uptime: number;
    version: string;
    checks: HealthCheck[];
    metrics: SystemMetrics;
}
export interface HealthCheck {
    name: string;
    status: 'pass' | 'fail' | 'warn';
    responseTime: number;
    message?: string;
    data?: any;
}
export interface SystemMetrics {
    memory: {
        used: number;
        total: number;
        percentage: number;
    };
    cpu: {
        usage: number;
        load: number;
    };
    network: {
        connections: number;
        messagesSent: number;
        messagesReceived: number;
        errors: number;
    };
    consciousness: {
        level: number;
        fieldStrength: number;
        patterns: number;
    };
    field: {
        blocks: number;
        events: number;
        energyBalance: number;
    };
}
export interface HealthMonitorConfig {
    checkInterval: number;
    timeout: number;
    enableMetrics: boolean;
    enableAlerts: boolean;
    alertThresholds: {
        memoryUsage: number;
        cpuUsage: number;
        errorRate: number;
        responseTime: number;
    };
}
export declare class HealthMonitor extends EventEmitter {
    private config;
    private checks;
    private metrics;
    private isRunning;
    private checkInterval?;
    private startTime;
    constructor(config?: Partial<HealthMonitorConfig>);
    /**
     * Start health monitoring
     */
    start(): void;
    /**
     * Stop health monitoring
     */
    stop(): void;
    /**
     * Register a custom health check
     */
    registerCheck(name: string, check: () => Promise<HealthCheck>): void;
    /**
     * Get current health status
     */
    getHealthStatus(): Promise<HealthStatus>;
    /**
     * Get current system metrics
     */
    getCurrentMetrics(): SystemMetrics;
    /**
     * Check if system is healthy
     */
    isHealthy(): boolean;
    /**
     * Run all health checks
     */
    private runHealthChecks;
    /**
     * Determine overall health status
     */
    private determineOverallStatus;
    /**
     * Check for alerts based on thresholds
     */
    private checkAlerts;
    /**
     * Initialize system metrics
     */
    private initializeMetrics;
    /**
     * Update current system metrics
     */
    private updateMetrics;
    /**
     * Register default health checks
     */
    private registerDefaultChecks;
}
/**
 * Global health monitor instance
 */
export declare const globalHealthMonitor: HealthMonitor;
//# sourceMappingURL=HealthMonitor.d.ts.map