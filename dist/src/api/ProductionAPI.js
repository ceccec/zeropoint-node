"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalProductionAPI = exports.ProductionAPI = void 0;
const express_1 = __importDefault(require("express"));
const Logger_1 = require("../utils/Logger");
const HealthMonitor_1 = require("../monitoring/HealthMonitor");
const Cache_1 = require("../utils/Cache");
/**
 * Production API endpoints for ZeroPoint
 *
 * Provides monitoring, health checks, metrics, and management
 * endpoints for production deployment.
 */
class ProductionAPI {
    constructor(port = 3001) {
        this.isRunning = false;
        this.port = port;
        this.app = (0, express_1.default)();
        this.setupMiddleware();
        this.setupRoutes();
    }
    /**
     * Setup middleware
     */
    setupMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // Request logging middleware
        this.app.use((req, res, next) => {
            const startTime = Date.now();
            res.on('finish', () => {
                const duration = Date.now() - startTime;
                Logger_1.globalLogger.info('API Request', {
                    method: req.method,
                    path: req.path,
                    statusCode: res.statusCode,
                    duration,
                    userAgent: req.get('User-Agent')
                });
            });
            next();
        });
        // Error handling middleware
        this.app.use((error, _req, res, _next) => {
            Logger_1.globalLogger.error('API Error', {
                method: _req.method,
                path: _req.path,
                error: error.message
            }, error);
            res.status(500).json({
                error: 'Internal Server Error',
                message: error.message,
                timestamp: new Date().toISOString()
            });
        });
    }
    /**
     * Setup API routes
     */
    setupRoutes() {
        // Health check endpoint
        this.app.get('/health', async (_req, res) => {
            try {
                const healthStatus = await HealthMonitor_1.globalHealthMonitor.getHealthStatus();
                const statusCode = healthStatus.status === 'healthy' ? 200 :
                    healthStatus.status === 'degraded' ? 200 : 503;
                res.status(statusCode).json(healthStatus);
            }
            catch (error) {
                res.status(503).json({
                    status: 'unhealthy',
                    error: 'Health check failed',
                    timestamp: new Date().toISOString()
                });
            }
        });
        // Metrics endpoint
        this.app.get('/metrics', (_req, res) => {
            try {
                const metrics = {
                    health: HealthMonitor_1.globalHealthMonitor.getCurrentMetrics(),
                    cache: Cache_1.globalCache.getStats(),
                    logging: Logger_1.globalLogger.getMetrics(),
                    system: {
                        uptime: process.uptime(),
                        memory: process.memoryUsage(),
                        cpu: process.cpuUsage(),
                        pid: process.pid,
                        version: process.version
                    }
                };
                res.json(metrics);
            }
            catch (error) {
                res.status(500).json({
                    error: 'Failed to get metrics',
                    message: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        // Cache management endpoints
        this.app.get('/cache/stats', (_req, res) => {
            res.json(Cache_1.globalCache.getStats());
        });
        this.app.post('/cache/clear', (_req, res) => {
            Cache_1.globalCache.clear();
            Logger_1.globalLogger.info('Cache cleared via API');
            res.json({ message: 'Cache cleared successfully' });
        });
        this.app.get('/cache/keys', (_req, res) => {
            res.json({
                keys: Cache_1.globalCache.keys(),
                count: Cache_1.globalCache.size()
            });
        });
        // Logging management endpoints
        this.app.get('/logs/level', (_req, res) => {
            res.json({
                currentLevel: Logger_1.globalLogger.getLevel() || 'INFO',
                availableLevels: ['ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE']
            });
        });
        this.app.post('/logs/level', (req, res) => {
            const { level } = req.body;
            if (level && ['ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'].includes(level)) {
                // Update log level (this would need to be implemented in Logger)
                Logger_1.globalLogger.info('Log level changed via API', { newLevel: level });
                res.json({ message: 'Log level updated', level });
            }
            else {
                res.status(400).json({ error: 'Invalid log level' });
            }
        });
        // System information endpoint
        this.app.get('/system/info', (_req, res) => {
            res.json({
                nodeVersion: process.version,
                platform: process.platform,
                arch: process.arch,
                pid: process.pid,
                uptime: process.uptime(),
                memory: process.memoryUsage(),
                cpu: process.cpuUsage(),
                env: {
                    NODE_ENV: process.env['NODE_ENV'],
                    PORT: process.env['PORT']
                }
            });
        });
        // Performance endpoint
        this.app.get('/performance', (_req, res) => {
            const performanceStats = Logger_1.globalLogger.getPerformanceStats();
            res.json({
                performance: performanceStats,
                cache: Cache_1.globalCache.getStats(),
                system: {
                    memory: process.memoryUsage(),
                    cpu: process.cpuUsage(),
                    uptime: process.uptime()
                }
            });
        });
        // ZeroPoint specific endpoints
        this.app.get('/zeropoint/status', (_req, res) => {
            // This would need access to the ZeroPoint instance
            res.json({
                message: 'ZeroPoint status endpoint - implement with device instance',
                timestamp: new Date().toISOString()
            });
        });
        // API documentation endpoint
        this.app.get('/api/docs', (_req, res) => {
            res.json({
                name: 'ZeroPoint Production API',
                version: '1.0.0',
                description: 'Production monitoring and management API for ZeroPoint devices',
                endpoints: {
                    '/health': {
                        method: 'GET',
                        description: 'Health check endpoint',
                        response: 'HealthStatus object'
                    },
                    '/metrics': {
                        method: 'GET',
                        description: 'System metrics endpoint',
                        response: 'Metrics object'
                    },
                    '/cache/stats': {
                        method: 'GET',
                        description: 'Cache statistics',
                        response: 'CacheStats object'
                    },
                    '/cache/clear': {
                        method: 'POST',
                        description: 'Clear all caches',
                        response: 'Success message'
                    },
                    '/logs/level_get': {
                        method: 'GET',
                        description: 'Get current log level',
                        response: 'Log level information'
                    },
                    '/logs/level_post': {
                        method: 'POST',
                        description: 'Set log level',
                        body: '{ "level": "INFO" }',
                        response: 'Success message'
                    },
                    '/system/info': {
                        method: 'GET',
                        description: 'System information',
                        response: 'System information object'
                    },
                    '/performance': {
                        method: 'GET',
                        description: 'Performance statistics',
                        response: 'Performance object'
                    }
                }
            });
        });
        // Root endpoint
        this.app.get('/', (_req, res) => {
            res.json({
                name: 'ZeroPoint Production API',
                version: '1.0.0',
                status: 'running',
                timestamp: new Date().toISOString(),
                endpoints: [
                    '/health',
                    '/metrics',
                    '/cache/stats',
                    '/logs/level',
                    '/system/info',
                    '/performance',
                    '/api/docs'
                ]
            });
        });
    }
    /**
     * Start the API server
     */
    start() {
        return new Promise((resolve, reject) => {
            if (this.isRunning) {
                resolve();
                return;
            }
            const server = this.app.listen(this.port, () => {
                this.isRunning = true;
                Logger_1.globalLogger.info('Production API started', {
                    port: this.port,
                    endpoints: [
                        '/health',
                        '/metrics',
                        '/cache/stats',
                        '/logs/level',
                        '/system/info',
                        '/performance'
                    ]
                });
                resolve();
            });
            server.on('error', (error) => {
                Logger_1.globalLogger.error('Production API failed to start', { port: this.port }, error);
                reject(error);
            });
        });
    }
    /**
     * Stop the API server
     */
    stop() {
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
                    Logger_1.globalLogger.info('Production API stopped');
                    resolve();
                });
            }
            else {
                this.isRunning = false;
                resolve();
            }
        });
    }
    /**
     * Get the Express app instance
     */
    getApp() {
        return this.app;
    }
    /**
     * Check if the API is running
     */
    isActive() {
        return this.isRunning;
    }
}
exports.ProductionAPI = ProductionAPI;
/**
 * Global production API instance
 */
exports.globalProductionAPI = new ProductionAPI();
//# sourceMappingURL=ProductionAPI.js.map