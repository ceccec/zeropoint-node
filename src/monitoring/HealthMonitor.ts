import { EventEmitter } from 'events';
import { globalLogger } from '../utils/Logger';

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
  checkInterval: number; // milliseconds
  timeout: number; // milliseconds
  enableMetrics: boolean;
  enableAlerts: boolean;
  alertThresholds: {
    memoryUsage: number; // percentage
    cpuUsage: number; // percentage
    errorRate: number; // percentage
    responseTime: number; // milliseconds
  };
}

export class HealthMonitor extends EventEmitter {
  private config: HealthMonitorConfig;
  private checks: Map<string, () => Promise<HealthCheck>> = new Map();
  private metrics: SystemMetrics;
  private isRunning: boolean = false;
  private checkInterval?: NodeJS.Timeout;
  private startTime: number = Date.now();

  constructor(config: Partial<HealthMonitorConfig> = {}) {
    super();
    
    this.config = {
      checkInterval: 30000, // 30 seconds
      timeout: 5000, // 5 seconds
      enableMetrics: true,
      enableAlerts: true,
      alertThresholds: {
        memoryUsage: 80,
        cpuUsage: 70,
        errorRate: 5,
        responseTime: 1000
      },
      ...config
    };

    this.metrics = this.initializeMetrics();
    this.registerDefaultChecks();
  }

  /**
   * Start health monitoring
   */
  public start(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.startTime = Date.now();

    this.checkInterval = setInterval(() => {
      this.runHealthChecks();
    }, this.config.checkInterval);

    globalLogger.info('Health monitoring started', {
      checkInterval: this.config.checkInterval,
      timeout: this.config.timeout
    });

    this.emit('started');
  }

  /**
   * Stop health monitoring
   */
  public stop(): void {
    if (!this.isRunning) return;

    this.isRunning = false;

    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    globalLogger.info('Health monitoring stopped');
    this.emit('stopped');
  }

  /**
   * Register a custom health check
   */
  public registerCheck(name: string, check: () => Promise<HealthCheck>): void {
    this.checks.set(name, check);
    globalLogger.debug(`Health check registered: ${name}`);
  }

  /**
   * Get current health status
   */
  public async getHealthStatus(): Promise<HealthStatus> {
    const checks = await this.runHealthChecks();
    const overallStatus = this.determineOverallStatus(checks);

    const status: HealthStatus = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      uptime: Date.now() - this.startTime,
      version: process.env['npm_package_version'] || '1.0.0',
      checks,
      metrics: this.getCurrentMetrics()
    };

    return status;
  }

  /**
   * Get current system metrics
   */
  public getCurrentMetrics(): SystemMetrics {
    if (this.config.enableMetrics) {
      this.updateMetrics();
    }
    return this.metrics;
  }

  /**
   * Check if system is healthy
   */
  public isHealthy(): boolean {
    return this.metrics.memory.percentage < this.config.alertThresholds.memoryUsage &&
           this.metrics.cpu.usage < this.config.alertThresholds.cpuUsage;
  }

  /**
   * Run all health checks
   */
  private async runHealthChecks(): Promise<HealthCheck[]> {
    const results: HealthCheck[] = [];

    for (const [name, check] of this.checks) {
      try {
        const startTime = Date.now();
        const result = await Promise.race([
          check(),
          new Promise<HealthCheck>((_, reject) => 
            setTimeout(() => reject(new Error('Health check timeout')), this.config.timeout)
          )
        ]);
        
        result.responseTime = Date.now() - startTime;
        results.push(result);

        // Log check result
        if (result.status === 'fail') {
          globalLogger.error(`Health check failed: ${name}`, { 
            message: result.message, 
            data: result.data 
          });
        } else if (result.status === 'warn') {
          globalLogger.warn(`Health check warning: ${name}`, { 
            message: result.message, 
            data: result.data 
          });
        }

      } catch (error) {
        const failedCheck: HealthCheck = {
          name,
          status: 'fail',
          responseTime: this.config.timeout,
          message: error instanceof Error ? error.message : 'Unknown error',
          data: { error: error instanceof Error ? error.stack : error }
        };

        results.push(failedCheck);
        globalLogger.error(`Health check error: ${name}`, { error });
      }
    }

    // Check for alerts
    if (this.config.enableAlerts) {
      this.checkAlerts(results);
    }

    this.emit('healthCheck', results);
    return results;
  }

  /**
   * Determine overall health status
   */
  private determineOverallStatus(checks: HealthCheck[]): 'healthy' | 'degraded' | 'unhealthy' {
    const failedChecks = checks.filter(c => c.status === 'fail').length;
    const warningChecks = checks.filter(c => c.status === 'warn').length;

    if (failedChecks > 0) {
      return 'unhealthy';
    } else if (warningChecks > 0 || !this.isHealthy()) {
      return 'degraded';
    } else {
      return 'healthy';
    }
  }

  /**
   * Check for alerts based on thresholds
   */
  private checkAlerts(checks: HealthCheck[]): void {
    const metrics = this.getCurrentMetrics();
    const alerts: string[] = [];

    // Memory usage alert
    if (metrics.memory.percentage > this.config.alertThresholds.memoryUsage) {
      alerts.push(`High memory usage: ${metrics.memory.percentage.toFixed(1)}%`);
    }

    // CPU usage alert
    if (metrics.cpu.usage > this.config.alertThresholds.cpuUsage) {
      alerts.push(`High CPU usage: ${metrics.cpu.usage.toFixed(1)}%`);
    }

    // Error rate alert
    const totalMessages = metrics.network.messagesSent + metrics.network.messagesReceived;
    if (totalMessages > 0) {
      const errorRate = (metrics.network.errors / totalMessages) * 100;
      if (errorRate > this.config.alertThresholds.errorRate) {
        alerts.push(`High error rate: ${errorRate.toFixed(1)}%`);
      }
    }

    // Response time alert
    const avgResponseTime = checks.reduce((sum, check) => sum + check.responseTime, 0) / checks.length;
    if (avgResponseTime > this.config.alertThresholds.responseTime) {
      alerts.push(`Slow response time: ${avgResponseTime.toFixed(0)}ms`);
    }

    if (alerts.length > 0) {
      globalLogger.warn('Health alerts detected', { alerts });
      this.emit('alerts', alerts);
    }
  }

  /**
   * Initialize system metrics
   */
  private initializeMetrics(): SystemMetrics {
    return {
      memory: { used: 0, total: 0, percentage: 0 },
      cpu: { usage: 0, load: 0 },
      network: { connections: 0, messagesSent: 0, messagesReceived: 0, errors: 0 },
      consciousness: { level: 0, fieldStrength: 0, patterns: 0 },
      field: { blocks: 0, events: 0, energyBalance: 0 }
    };
  }

  /**
   * Update current system metrics
   */
  private updateMetrics(): void {
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    this.metrics.memory = {
      used: memUsage.heapUsed / 1024 / 1024, // MB
      total: memUsage.heapTotal / 1024 / 1024, // MB
      percentage: (memUsage.heapUsed / memUsage.heapTotal) * 100
    };

    this.metrics.cpu = {
      usage: cpuUsage.user / 1000000, // seconds
      load: process.uptime()
    };
  }

  /**
   * Register default health checks
   */
  private registerDefaultChecks(): void {
    // Memory check
    this.registerCheck('memory', async (): Promise<HealthCheck> => {
      const memUsage = process.memoryUsage();
      const percentage = (memUsage.heapUsed / memUsage.heapTotal) * 100;
      
      return {
        name: 'memory',
        status: percentage > 90 ? 'fail' : percentage > 80 ? 'warn' : 'pass',
        responseTime: 0,
        message: `Memory usage: ${percentage.toFixed(1)}%`,
        data: {
          used: memUsage.heapUsed / 1024 / 1024,
          total: memUsage.heapTotal / 1024 / 1024,
          percentage
        }
      };
    });

    // CPU check
    this.registerCheck('cpu', async (): Promise<HealthCheck> => {
      const startUsage = process.cpuUsage();
      await new Promise(resolve => setTimeout(resolve, 100));
      const endUsage = process.cpuUsage();
      
      const cpuUsage = ((endUsage.user - startUsage.user) + (endUsage.system - startUsage.system)) / 1000000;
      
      return {
        name: 'cpu',
        status: cpuUsage > 50 ? 'warn' : 'pass',
        responseTime: 0,
        message: `CPU usage: ${cpuUsage.toFixed(1)}%`,
        data: { usage: cpuUsage }
      };
    });

    // Uptime check
    this.registerCheck('uptime', async (): Promise<HealthCheck> => {
      const uptime = process.uptime();
      
      return {
        name: 'uptime',
        status: uptime < 60 ? 'warn' : 'pass', // Warn if less than 1 minute
        responseTime: 0,
        message: `Uptime: ${uptime.toFixed(0)}s`,
        data: { uptime }
      };
    });

    // Process check
    this.registerCheck('process', async (): Promise<HealthCheck> => {
      return {
        name: 'process',
        status: 'pass',
        responseTime: 0,
        message: `PID: ${process.pid}`,
        data: { 
          pid: process.pid,
          version: process.version,
          platform: process.platform
        }
      };
    });
  }
}

/**
 * Global health monitor instance
 */
export const globalHealthMonitor = new HealthMonitor(); 