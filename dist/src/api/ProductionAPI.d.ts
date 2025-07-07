import express from 'express';
/**
 * Production API endpoints for ZeroPoint
 *
 * Provides monitoring, health checks, metrics, and management
 * endpoints for production deployment.
 */
export declare class ProductionAPI {
    private app;
    private port;
    private isRunning;
    constructor(port?: number);
    /**
     * Setup middleware
     */
    private setupMiddleware;
    /**
     * Setup API routes
     */
    private setupRoutes;
    /**
     * Start the API server
     */
    start(): Promise<void>;
    /**
     * Stop the API server
     */
    stop(): Promise<void>;
    /**
     * Get the Express app instance
     */
    getApp(): express.Application;
    /**
     * Check if the API is running
     */
    isActive(): boolean;
}
/**
 * Global production API instance
 */
export declare const globalProductionAPI: ProductionAPI;
//# sourceMappingURL=ProductionAPI.d.ts.map