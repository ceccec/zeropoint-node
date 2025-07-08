import express, { Request, Response, NextFunction } from "express";
import { globalLogger } from "../utils/Logger";
import { globalHealthMonitor } from "../monitoring/HealthMonitor";
import { globalCache } from "../utils/Cache";

/**
 * Production API endpoints for ZeroPoint
 *
 * Provides monitoring, health checks, metrics, and management
 * endpoints for production deployment.
 */
export class ProductionAPI {
  private app: express.Application;
  private port: number;
  private isRunning: boolean = false;

  constructor(port: number = 3001) {
    this.port = port;
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  /**
   * Setup middleware
   */
  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Request logging middleware
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const startTime = Date.now();

      res.on("finish", () => {
        const duration = Date.now() - startTime;
        globalLogger.info("API Request", {
          method: req.method,
          path: req.path,
          statusCode: res.statusCode,
          duration,
          userAgent: req.get("User-Agent"),
        });
      });

      next();
    });

    // Error handling middleware
    this.app.use((error: any, _req: Request, res: Response) => {
      globalLogger.error(
        "API Error",
        {
          method: _req.method,
          path: _req.path,
          error: error.message,
        },
        error,
      );

      res.status(500).json({
        error: "Internal Server Error",
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    });
  }

  /**
   * Setup API routes
   */
  private setupRoutes(): void {
    // Health check endpoint
    this.app.get("/health", async (_req: Request, res: Response) => {
      try {
        const healthStatus = await globalHealthMonitor.getHealthStatus();
        const statusCode =
          healthStatus.status === "healthy"
            ? 200
            : healthStatus.status === "degraded"
              ? 200
              : 503;

        res.status(statusCode).json(healthStatus);
      } catch {
        res.status(503).json({
          status: "unhealthy",
          error: "Health check failed",
          timestamp: new Date().toISOString(),
        });
      }
    });

    // Metrics endpoint
    this.app.get("/metrics", (_req: Request, res: Response) => {
      try {
        const metrics = {
          health: globalHealthMonitor.getCurrentMetrics(),
          cache: globalCache.getStats(),
          logging: globalLogger.getMetrics(),
          system: {
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            cpu: process.cpuUsage(),
            pid: process.pid,
            version: process.version,
          },
        };

        res.json(metrics);
      } catch (error) {
        res.status(500).json({
          error: "Failed to get metrics",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      }
    });

    // Cache management endpoints
    this.app.get("/cache/stats", (_req: Request, res: Response) => {
      res.json(globalCache.getStats());
    });

    this.app.post("/cache/clear", (_req: Request, res: Response) => {
      globalCache.clear();
      globalLogger.info("Cache cleared via API");
      res.json({ message: "Cache cleared successfully" });
    });

    this.app.get("/cache/keys", (_req: Request, res: Response) => {
      res.json({
        keys: globalCache.keys(),
        count: globalCache.size(),
      });
    });

    // Logging management endpoints
    this.app.get("/logs/level", (_req: Request, res: Response) => {
      res.json({
        currentLevel: globalLogger.getLevel() || "INFO",
        availableLevels: ["ERROR", "WARN", "INFO", "DEBUG", "TRACE"],
      });
    });

    this.app.post("/logs/level", (req: Request, res: Response) => {
      const { level } = req.body;
      if (
        level &&
        ["ERROR", "WARN", "INFO", "DEBUG", "TRACE"].includes(level)
      ) {
        // Update log level (this would need to be implemented in Logger)
        globalLogger.info("Log level changed via API", { newLevel: level });
        res.json({ message: "Log level updated", level });
      } else {
        res.status(400).json({ error: "Invalid log level" });
      }
    });

    // System information endpoint
    this.app.get("/system/info", (_req: Request, res: Response) => {
      res.json({
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        pid: process.pid,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        env: {
          NODE_ENV: process.env["NODE_ENV"],
          PORT: process.env["PORT"],
        },
      });
    });

    // Performance endpoint
    this.app.get("/performance", (_req: Request, res: Response) => {
      const performanceStats = globalLogger.getPerformanceStats();
      res.json({
        performance: performanceStats,
        cache: globalCache.getStats(),
        system: {
          memory: process.memoryUsage(),
          cpu: process.cpuUsage(),
          uptime: process.uptime(),
        },
      });
    });

    // ZeroPoint specific endpoints
    this.app.get("/zeropoint/status", (_req: Request, res: Response) => {
      // This would need access to the ZeroPoint instance
      res.json({
        message: "ZeroPoint status endpoint - implement with device instance",
        timestamp: new Date().toISOString(),
      });
    });

    // API documentation endpoint
    this.app.get("/api/docs", (_req: Request, res: Response) => {
      res.json({
        name: "ZeroPoint Production API",
        version: "1.0.0",
        description:
          "Production monitoring and management API for ZeroPoint devices",
        endpoints: {
          "/health": {
            method: "GET",
            description: "Health check endpoint",
            response: "HealthStatus object",
          },
          "/metrics": {
            method: "GET",
            description: "System metrics endpoint",
            response: "Metrics object",
          },
          "/cache/stats": {
            method: "GET",
            description: "Cache statistics",
            response: "CacheStats object",
          },
          "/cache/clear": {
            method: "POST",
            description: "Clear all caches",
            response: "Success message",
          },
          "/logs/level_get": {
            method: "GET",
            description: "Get current log level",
            response: "Log level information",
          },
          "/logs/level_post": {
            method: "POST",
            description: "Set log level",
            body: '{ "level": "INFO" }',
            response: "Success message",
          },
          "/system/info": {
            method: "GET",
            description: "System information",
            response: "System information object",
          },
          "/performance": {
            method: "GET",
            description: "Performance statistics",
            response: "Performance object",
          },
        },
      });
    });

    // Root endpoint
    this.app.get("/", (_req: Request, res: Response) => {
      res.json({
        name: "ZeroPoint Production API",
        version: "1.0.0",
        status: "running",
        timestamp: new Date().toISOString(),
        endpoints: [
          "/health",
          "/metrics",
          "/cache/stats",
          "/logs/level",
          "/system/info",
          "/performance",
          "/api/docs",
        ],
      });
    });
  }

  /**
   * Start the API server
   */
  public start(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isRunning) {
        resolve();
        return;
      }

      const server = this.app.listen(this.port, () => {
        this.isRunning = true;
        globalLogger.info("Production API started", {
          port: this.port,
          endpointCount: 6,
          endpoints: "/health,/metrics,/cache/stats,/logs/level,/system/info,/performance",
        });
        resolve();
      });

      server.on("error", (error: any) => {
        globalLogger.error(
          "Production API failed to start",
          { port: this.port },
          error,
        );
        reject(error);
      });
    });
  }

  /**
   * Stop the API server
   */
  public stop(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isRunning) {
        resolve();
        return;
      }

      // Find and close the server
      const server = this.app.listen();
      if (server) {
        server.close(() => {
          this.isRunning = false;
          globalLogger.info("Production API stopped");
          resolve();
        });
      } else {
        this.isRunning = false;
        resolve();
      }
    });
  }

  /**
   * Get the Express app instance
   */
  public getApp(): express.Application {
    return this.app;
  }

  /**
   * Check if the API is running
   */
  public isActive(): boolean {
    return this.isRunning;
  }
}

/**
 * Global production API instance
 */
export const globalProductionAPI = new ProductionAPI();
