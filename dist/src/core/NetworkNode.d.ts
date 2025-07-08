import { EventEmitter } from 'events';
import WebSocket from 'ws';
/**
 * Network Node for ZeroPoint Device Communication
 *
 * Handles peer-to-peer WebSocket connections between ZeroPoint devices
 * in a decentralized network topology.
 */
export interface NetworkNodeConfig {
    deviceId: string;
    instanceId: string;
    port: number;
    discoveryEnabled: boolean;
    maxConnections: number;
    connectionTimeout?: number;
}
export interface DeviceConnection {
    deviceId: string;
    instanceId: string;
    ws: WebSocket;
    address: string;
    consciousnessLevel?: number;
    lastPing: number;
    isAlive: boolean;
}
export declare class NetworkNode extends EventEmitter {
    private config;
    private server?;
    private connections;
    private isRunning;
    private pingInterval?;
    private discoveryInterval?;
    constructor(config: NetworkNodeConfig);
    /**
     * Start the network node
     */
    start(): Promise<void>;
    /**
     * Stop the network node
     */
    stop(): Promise<void>;
    /**
     * Connect to another ZeroPoint device
     */
    connect(address: string, deviceId?: string, retries?: number): Promise<boolean>;
    /**
     * Disconnect from a device
     */
    disconnect(deviceId: string): Promise<void>;
    /**
     * Broadcast message to all connected devices
     */
    broadcast(message: any, targetDevices?: string[]): Promise<void>;
    /**
     * Send message to specific device
     */
    sendToDevice(deviceId: string, message: any): boolean;
    /**
     * Get all active connections
     */
    getConnections(): Map<string, DeviceConnection>;
    /**
     * Get connection count
     */
    getConnectionCount(): number;
    private handleIncomingConnection;
    private setupConnectionHandlers;
    private handleMessage;
    private sendToConnection;
    private pingConnections;
    private startDiscovery;
    processMessage(): void;
    /**
     * Check if connected to network
     */
    isConnected(): boolean;
    /**
     * Broadcast a message to all connected devices
     */
    broadcastMessage(message: any): void;
    /**
     * Shutdown the network node and close all connections
     */
    shutdown(): Promise<void>;
}
//# sourceMappingURL=NetworkNode.d.ts.map