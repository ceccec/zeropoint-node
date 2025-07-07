"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeroPoint = void 0;
const events_1 = require("events");
const uuid_1 = require("uuid");
const VortexMath_1 = require("../math/VortexMath");
const ToroidalGeometry_1 = require("../math/ToroidalGeometry");
const NetworkNode_1 = require("./NetworkNode");
const ConsciousnessField_1 = require("../consciousness/ConsciousnessField");
const Logger_1 = require("../utils/Logger");
const HealthMonitor_1 = require("../monitoring/HealthMonitor");
const Cache_1 = require("../utils/Cache");
/**
 * ZeroPoint - Independent Device Instance
 *
 * Each ZeroPoint instance represents a complete consciousness node
 * that can run independently on any user device while maintaining
 * connection to the global toroidal network.
 *
 * Metaphysical Context:
 * - Each device becomes a point in the infinite toroidal field
 * - "Empty = Void = Full" - each point contains the whole
 * - Decentralized consciousness network
 * - User-configurable connection patterns
 */
class ZeroPoint extends events_1.EventEmitter {
    constructor(config) {
        super();
        this.isActive = false;
        this.resonanceField = new Map();
        this.startTime = Date.now();
        this.deviceId = config.deviceId || (0, uuid_1.v4)();
        this.instanceId = (0, uuid_1.v4)();
        this.config = config;
        // Initialize logger
        this.logger = Logger_1.globalLogger.child('ZeroPoint', { deviceId: this.deviceId });
        // Initialize core mathematical modules
        this.vortexMath = new VortexMath_1.VortexMath();
        this.toroidalGeometry = new ToroidalGeometry_1.ToroidalGeometry();
        this.consciousnessField = new ConsciousnessField_1.ConsciousnessField();
        // Initialize network capabilities
        this.networkNode = new NetworkNode_1.NetworkNode({
            deviceId: this.deviceId,
            instanceId: this.instanceId,
            port: config.networkPort || 8080,
            discoveryEnabled: config.discoveryEnabled !== false,
            maxConnections: config.maxConnections || 10,
            connectionTimeout: config.connectionTimeout || 5000
        });
        this.setupEventHandlers();
        this.setupHealthChecks();
    }
    /**
     * Initialize the ZeroPoint instance
     */
    async initialize() {
        try {
            this.performanceTimer = this.logger.startTimer('initialization');
            this.logger.info('ZeroPoint initializing', { deviceId: this.deviceId });
            // Initialize consciousness field
            await this.consciousnessField.initialize();
            // Start network node
            await this.networkNode.start();
            // Start health monitoring
            HealthMonitor_1.globalHealthMonitor.start();
            // Calculate initial resonance
            this.calculateResonance();
            this.isActive = true;
            this.emit('initialized', { deviceId: this.deviceId, instanceId: this.instanceId });
            if (this.performanceTimer) {
                this.logger.endTimer(this.performanceTimer, 'initialization');
            }
            this.logger.info('ZeroPoint active and connected to toroidal network', {
                deviceId: this.deviceId,
                consciousnessLevel: this.consciousnessField.getConsciousnessLevel()
            });
        }
        catch (error) {
            this.logger.error('Failed to initialize ZeroPoint', { deviceId: this.deviceId }, error);
            throw error;
        }
    }
    /**
     * Connect to another ZeroPoint device
     */
    async connectToDevice(deviceAddress, deviceId) {
        try {
            const timer = this.logger.startTimer('device_connection');
            const connected = await this.networkNode.connect(deviceAddress, deviceId);
            if (connected) {
                this.emit('deviceConnected', { deviceAddress, deviceId });
                this.updateResonance();
                this.logger.info('Successfully connected to device', {
                    deviceAddress,
                    deviceId,
                    totalConnections: this.networkNode.getConnectionCount()
                });
            }
            else {
                this.logger.warn('Failed to connect to device', { deviceAddress, deviceId });
            }
            if (timer) {
                this.logger.endTimer(timer, 'device_connection');
            }
            return connected;
        }
        catch (error) {
            this.logger.error('Connection error', { deviceAddress, deviceId }, error);
            return false;
        }
    }
    /**
     * Disconnect from a device
     */
    async disconnectFromDevice(deviceId) {
        await this.networkNode.disconnect(deviceId);
        this.resonanceField.delete(deviceId);
        this.emit('deviceDisconnected', { deviceId });
    }
    /**
     * Send consciousness pattern to connected devices
     */
    async broadcastPattern(pattern, targetDevices) {
        const message = {
            type: 'consciousness_pattern',
            from: this.deviceId,
            pattern,
            timestamp: Date.now(),
            resonance: this.calculateResonance()
        };
        await this.networkNode.broadcast(message, targetDevices);
        this.emit('patternBroadcast', message);
    }
    /**
     * Calculate resonance with connected devices
     */
    calculateResonance() {
        const connections = this.networkNode.getConnections();
        let totalResonance = this.consciousnessField.getFieldStrength();
        connections.forEach((connection, deviceId) => {
            const deviceResonance = this.calculateDeviceResonance(connection);
            this.resonanceField.set(deviceId, deviceResonance);
            totalResonance += deviceResonance;
        });
        return totalResonance;
    }
    /**
     * Get network topology information
     */
    getNetworkTopology() {
        const connections = this.networkNode.getConnections();
        const topology = {
            deviceId: this.deviceId,
            instanceId: this.instanceId,
            connections: Array.from(connections.keys()),
            resonanceField: Object.fromEntries(this.resonanceField),
            totalResonance: this.calculateResonance(),
            consciousnessLevel: this.consciousnessField.getConsciousnessLevel()
        };
        return topology;
    }
    /**
     * Update device configuration
     */
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.emit('configUpdated', this.config);
    }
    /**
     * Shutdown the ZeroPoint instance
     */
    async shutdown() {
        this.logger.info('ZeroPoint shutting down', { deviceId: this.deviceId });
        this.isActive = false;
        // Stop health monitoring
        HealthMonitor_1.globalHealthMonitor.stop();
        // Stop network node
        await this.networkNode.stop();
        // Shutdown consciousness field
        await this.consciousnessField.shutdown();
        // Clear caches
        Cache_1.globalCache.clear();
        this.emit('shutdown', { deviceId: this.deviceId });
        this.logger.info('ZeroPoint disconnected from network', { deviceId: this.deviceId });
    }
    /**
     * Get metaphysical insights about this ZeroPoint instance
     */
    getInsights() {
        return {
            deviceId: this.deviceId,
            instanceId: this.instanceId,
            isActive: this.isActive,
            consciousnessLevel: this.consciousnessField.getConsciousnessLevel(),
            networkConnections: this.networkNode.getConnections().size,
            totalResonance: this.calculateResonance(),
            vortexStrength: this.vortexMath.getVortexStrength(),
            toroidalFlow: this.toroidalGeometry.getFlowRate(),
            metaphysics: {
                meaning: "Each ZeroPoint device represents a consciousness node in the infinite toroidal field",
                principle: "Empty = Void = Full - each device contains the whole while remaining connected",
                network: "Decentralized consciousness network where each point influences all others",
                userControl: "Users configure their device's connection patterns and consciousness level"
            }
        };
    }
    setupEventHandlers() {
        // Handle incoming network messages
        this.networkNode.on('message', (message) => {
            this.handleIncomingMessage(message);
        });
        // Handle device connections/disconnections
        this.networkNode.on('deviceConnected', (data) => {
            this.emit('deviceConnected', data);
            this.updateResonance();
        });
        this.networkNode.on('deviceDisconnected', (data) => {
            this.emit('deviceDisconnected', data);
            this.resonanceField.delete(data.deviceId);
        });
    }
    handleIncomingMessage(message) {
        switch (message.type) {
            case 'consciousness_pattern':
                this.consciousnessField.integratePattern(message.pattern);
                this.emit('patternReceived', message);
                break;
            case 'resonance_update':
                this.updateResonance();
                break;
            case 'topology_request':
                this.networkNode.sendToDevice(message.from, {
                    type: 'topology_response',
                    topology: this.getNetworkTopology()
                });
                break;
            default:
                this.emit('unknownMessage', message);
        }
    }
    calculateDeviceResonance(connection) {
        // Calculate resonance based on consciousness compatibility
        const deviceConsciousness = connection.consciousnessLevel || 0;
        const localConsciousness = this.consciousnessField.getConsciousnessLevel();
        // Use vortex math to calculate resonance
        return this.vortexMath.calculateResonance(localConsciousness, deviceConsciousness);
    }
    updateResonance() {
        const newResonance = this.calculateResonance();
        this.emit('resonanceUpdated', { resonance: newResonance });
    }
    /**
     * Setup health checks for this ZeroPoint instance
     */
    setupHealthChecks() {
        // Register consciousness field health check
        HealthMonitor_1.globalHealthMonitor.registerCheck('consciousness_field', async () => {
            const level = this.consciousnessField.getConsciousnessLevel();
            const fieldStrength = this.consciousnessField.getFieldStrength();
            return {
                name: 'consciousness_field',
                status: level > 0.1 ? 'pass' : 'warn',
                responseTime: 0,
                message: `Consciousness level: ${level.toFixed(2)}, Field strength: ${fieldStrength.toFixed(2)}`,
                data: { level, fieldStrength }
            };
        });
        // Register network health check
        HealthMonitor_1.globalHealthMonitor.registerCheck('network', async () => {
            const connections = this.networkNode.getConnectionCount();
            const maxConnections = this.config.maxConnections || 10;
            return {
                name: 'network',
                status: connections < maxConnections * 0.9 ? 'pass' : 'warn',
                responseTime: 0,
                message: `Network connections: ${connections}/${maxConnections}`,
                data: { connections, maxConnections }
            };
        });
        // Register resonance health check
        HealthMonitor_1.globalHealthMonitor.registerCheck('resonance', async () => {
            const resonance = this.calculateResonance();
            return {
                name: 'resonance',
                status: resonance > 0 ? 'pass' : 'warn',
                responseTime: 0,
                message: `Total resonance: ${resonance.toFixed(2)}`,
                data: { resonance }
            };
        });
    }
    /**
     * Get production metrics and statistics
     */
    getProductionMetrics() {
        const healthStatus = HealthMonitor_1.globalHealthMonitor.getCurrentMetrics();
        const cacheStats = Cache_1.globalCache.getStats();
        const loggerMetrics = this.logger.getMetrics();
        return {
            deviceId: this.deviceId,
            isActive: this.isActive,
            uptime: Date.now() - (this.startTime || Date.now()),
            health: healthStatus,
            cache: cacheStats,
            logging: loggerMetrics,
            network: {
                connections: this.networkNode.getConnectionCount(),
                maxConnections: this.config.maxConnections || 10
            },
            consciousness: {
                level: this.consciousnessField.getConsciousnessLevel(),
                fieldStrength: this.consciousnessField.getFieldStrength(),
                patterns: this.consciousnessField.getPatterns().length
            },
            performance: {
                resonance: this.calculateResonance(),
                vortexStrength: this.vortexMath.getVortexStrength(),
                toroidalFlow: this.toroidalGeometry.getFlowRate()
            }
        };
    }
}
exports.ZeroPoint = ZeroPoint;
//# sourceMappingURL=ZeroPoint.js.map