"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkNode = void 0;
const events_1 = require("events");
const ws_1 = __importDefault(require("ws"));
const uuid_1 = require("uuid");
class NetworkNode extends events_1.EventEmitter {
    constructor(config) {
        super();
        this.connections = new Map();
        this.isRunning = false;
        this.config = config;
    }
    /**
     * Start the network node
     */
    async start() {
        if (this.isRunning)
            return;
        try {
            // Start WebSocket server
            this.server = new ws_1.default.Server({ port: this.config.port });
            this.server.on('connection', (ws, req) => {
                this.handleIncomingConnection(ws, req);
            });
            this.server.on('error', (error) => {
                this.emit('error', error);
            });
            // Start ping interval to keep connections alive
            this.pingInterval = setInterval(() => {
                this.pingConnections();
            }, 30000); // 30 seconds
            // Start discovery if enabled
            if (this.config.discoveryEnabled) {
                this.startDiscovery();
            }
            this.isRunning = true;
            this.emit('started', { port: this.config.port });
            console.log(`🌐 Network node started on port ${this.config.port}`);
        }
        catch (error) {
            console.error('Failed to start network node:', error);
            throw error;
        }
    }
    /**
     * Stop the network node
     */
    async stop() {
        if (!this.isRunning)
            return;
        // Clear intervals
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
        }
        if (this.discoveryInterval) {
            clearInterval(this.discoveryInterval);
        }
        // Close all connections
        for (const [_deviceId, connection] of this.connections) {
            connection.ws.close();
        }
        this.connections.clear();
        // Close server
        if (this.server) {
            this.server.close();
        }
        this.isRunning = false;
        this.emit('stopped');
        console.log('🌐 Network node stopped');
    }
    /**
     * Connect to another ZeroPoint device
     */
    async connect(address, deviceId, retries = 3) {
        if (this.connections.size >= this.config.maxConnections) {
            console.warn('Maximum connections reached');
            return false;
        }
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const ws = new ws_1.default(`ws://${address}`);
                return new Promise((resolve) => {
                    const timeout = setTimeout(() => {
                        ws.close();
                        resolve(false);
                    }, this.config.connectionTimeout || 5000);
                    ws.on('open', () => {
                        clearTimeout(timeout);
                        const connection = {
                            deviceId: deviceId || (0, uuid_1.v4)(),
                            instanceId: (0, uuid_1.v4)(),
                            ws,
                            address,
                            lastPing: Date.now(),
                            isAlive: true
                        };
                        this.connections.set(connection.deviceId, connection);
                        this.setupConnectionHandlers(connection);
                        // Send handshake
                        this.sendToConnection(connection, {
                            type: 'handshake',
                            deviceId: this.config.deviceId,
                            instanceId: this.config.instanceId,
                            timestamp: Date.now()
                        });
                        this.emit('deviceConnected', { deviceId: connection.deviceId, address });
                        resolve(true);
                    });
                    ws.on('error', (error) => {
                        clearTimeout(timeout);
                        console.error(`Connection error to ${address} (attempt ${attempt}/${retries}):`, error);
                        if (attempt === retries) {
                            resolve(false);
                        }
                    });
                    ws.on('close', () => {
                        clearTimeout(timeout);
                        if (deviceId) {
                            this.connections.delete(deviceId);
                            this.emit('deviceDisconnected', { deviceId });
                        }
                        if (attempt === retries) {
                            resolve(false);
                        }
                    });
                });
            }
            catch (error) {
                console.error(`Failed to connect to ${address} (attempt ${attempt}/${retries}):`, error);
                if (attempt === retries) {
                    return false;
                }
                // Wait before retry
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
        return false;
    }
    /**
     * Disconnect from a device
     */
    async disconnect(deviceId) {
        const connection = this.connections.get(deviceId);
        if (connection) {
            connection.ws.close();
            this.connections.delete(deviceId);
            this.emit('deviceDisconnected', { deviceId });
        }
    }
    /**
     * Broadcast message to all connected devices
     */
    async broadcast(message, targetDevices) {
        const devicesToSend = targetDevices
            ? targetDevices.filter(id => this.connections.has(id))
            : Array.from(this.connections.keys());
        for (const deviceId of devicesToSend) {
            const connection = this.connections.get(deviceId);
            if (connection && connection.isAlive) {
                this.sendToConnection(connection, message);
            }
        }
    }
    /**
     * Send message to specific device
     */
    sendToDevice(deviceId, message) {
        const connection = this.connections.get(deviceId);
        if (connection && connection.isAlive) {
            this.sendToConnection(connection, message);
            return true;
        }
        return false;
    }
    /**
     * Get all active connections
     */
    getConnections() {
        return new Map(this.connections);
    }
    /**
     * Get connection count
     */
    getConnectionCount() {
        return this.connections.size;
    }
    handleIncomingConnection(ws, req) {
        if (this.connections.size >= this.config.maxConnections) {
            ws.close();
            return;
        }
        const connection = {
            deviceId: (0, uuid_1.v4)(), // Will be updated after handshake
            instanceId: (0, uuid_1.v4)(),
            ws,
            address: req.socket.remoteAddress,
            lastPing: Date.now(),
            isAlive: true
        };
        this.setupConnectionHandlers(connection);
    }
    setupConnectionHandlers(connection) {
        connection.ws.on('message', (data) => {
            try {
                const message = JSON.parse(data.toString());
                this.handleMessage(connection, message);
            }
            catch (error) {
                console.error('Failed to parse message:', error);
            }
        });
        connection.ws.on('close', () => {
            this.connections.delete(connection.deviceId);
            this.emit('deviceDisconnected', { deviceId: connection.deviceId });
        });
        connection.ws.on('error', (error) => {
            console.error(`Connection error for ${connection.deviceId}:`, error);
            this.connections.delete(connection.deviceId);
            this.emit('deviceDisconnected', { deviceId: connection.deviceId });
        });
    }
    handleMessage(connection, message) {
        switch (message.type) {
            case 'handshake':
                connection.deviceId = message.deviceId;
                connection.instanceId = message.instanceId;
                this.connections.set(connection.deviceId, connection);
                this.emit('deviceConnected', { deviceId: connection.deviceId, address: connection.address });
                break;
            case 'ping':
                connection.lastPing = Date.now();
                connection.isAlive = true;
                this.sendToConnection(connection, { type: 'pong', timestamp: Date.now() });
                break;
            case 'pong':
                connection.lastPing = Date.now();
                connection.isAlive = true;
                break;
            default:
                this.emit('message', message);
        }
    }
    sendToConnection(connection, message) {
        if (connection.ws.readyState === ws_1.default.OPEN) {
            connection.ws.send(JSON.stringify(message));
        }
    }
    pingConnections() {
        const now = Date.now();
        for (const [_deviceId, connection] of this.connections) {
            if (now - connection.lastPing > 60000) { // 60 seconds
                connection.isAlive = false;
                connection.ws.close();
                this.connections.delete(_deviceId);
                this.emit('deviceDisconnected', { deviceId: _deviceId });
            }
            else {
                this.sendToConnection(connection, { type: 'ping', timestamp: now });
            }
        }
    }
    startDiscovery() {
        // Simple discovery mechanism - can be enhanced with UDP multicast
        this.discoveryInterval = setInterval(() => {
            // Broadcast discovery message
            this.broadcast({
                type: 'discovery',
                deviceId: this.config.deviceId,
                port: this.config.port,
                timestamp: Date.now()
            });
        }, 60000); // Every minute
    }
    processMessage(_msg) {
        // Simple stub for test compatibility
        return;
    }
    /**
     * Check if connected to network
     */
    isConnected() {
        return this.connections.size > 0;
    }
    /**
     * Broadcast a message to all connected devices
     */
    broadcastMessage(message) {
        const broadcastData = {
            ...message,
            timestamp: Date.now(),
            source: this.config.deviceId
        };
        this.connections.forEach((device, deviceId) => {
            try {
                this.sendToConnection(device, broadcastData);
            }
            catch (error) {
                // Remove disconnected device
                this.connections.delete(deviceId);
            }
        });
    }
    /**
     * Shutdown the network node and close all connections
     */
    async shutdown() {
        if (this.server) {
            await new Promise((resolve) => {
                this.server.close(() => resolve());
            });
            this.server = undefined;
        }
        // Close all device connections
        this.connections.forEach((device) => {
            try {
                device.ws.close();
            }
            catch (e) { }
        });
        this.connections.clear();
        // Clear any timers or intervals if present
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
            this.pingInterval = undefined;
        }
        if (this.discoveryInterval) {
            clearInterval(this.discoveryInterval);
            this.discoveryInterval = undefined;
        }
    }
}
exports.NetworkNode = NetworkNode;
//# sourceMappingURL=NetworkNode.js.map