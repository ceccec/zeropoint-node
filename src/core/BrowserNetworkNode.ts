import { EventEmitter } from "events";
import { BrowserWebSocket } from "../utils/BrowserWebSocket";
import { v4 as uuidv4 } from "uuid";

/**
 * Browser Network Node for ZeroPoint Device Communication
 *
 * Handles peer-to-peer WebSocket connections between ZeroPoint devices
 * in a browser environment without server functionality.
 */
export interface BrowserNetworkNodeConfig {
  deviceId: string;
  instanceId: string;
  discoveryEnabled: boolean;
  maxConnections: number;
  connectionTimeout?: number;
}

export interface BrowserDeviceConnection {
  deviceId: string;
  instanceId: string;
  ws: BrowserWebSocket;
  address: string;
  consciousnessLevel?: number;
  lastPing: number;
  isAlive: boolean;
}

export class BrowserNetworkNode extends EventEmitter {
  private config: BrowserNetworkNodeConfig;
  private connections: Map<string, BrowserDeviceConnection> = new Map();
  private isRunning: boolean = false;
  private pingInterval?: number;
  private discoveryInterval?: number;

  constructor(config: BrowserNetworkNodeConfig) {
    super();
    this.config = config;
  }

  /**
   * Start the browser network node
   */
  public async start(): Promise<void> {
    if (this.isRunning) return;

    try {
      // Start ping interval to keep connections alive
      this.pingInterval = setInterval(() => {
        this.pingConnections();
      }, 30000) as unknown as number; // 30 seconds

      // Start discovery if enabled
      if (this.config.discoveryEnabled) {
        this.startDiscovery();
      }

      this.isRunning = true;
      this.emit("started");

      console.log(`🌐 Browser network node started`);
    } catch (error) {
      console.error("Failed to start browser network node:", error);
      throw error;
    }
  }

  /**
   * Stop the browser network node
   */
  public async stop(): Promise<void> {
    if (!this.isRunning) return;

    // Clear intervals
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }
    if (this.discoveryInterval) {
      clearInterval(this.discoveryInterval);
    }

    // Close all connections
    for (const [, connection] of this.connections) {
      connection.ws.close();
    }
    this.connections.clear();

    this.isRunning = false;
    this.emit("stopped");

    console.log("🌐 Browser network node stopped");
  }

  /**
   * Connect to another ZeroPoint device
   */
  public async connect(
    address: string,
    deviceId?: string,
    retries: number = 3,
  ): Promise<boolean> {
    if (this.connections.size >= this.config.maxConnections) {
      console.warn("Maximum connections reached");
      return false;
    }

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const ws = new BrowserWebSocket(`ws://${address}`);

        return new Promise((resolve) => {
          const timeout = setTimeout(() => {
            ws.close();
            resolve(false);
          }, this.config.connectionTimeout || 5000);

          ws.onopen = () => {
            clearTimeout(timeout);
            const connection: BrowserDeviceConnection = {
              deviceId: deviceId || uuidv4(),
              instanceId: uuidv4(),
              ws,
              address,
              lastPing: Date.now(),
              isAlive: true,
            };

            this.connections.set(connection.deviceId, connection);
            this.setupConnectionHandlers(connection);

            // Send handshake
            this.sendToConnection(connection, {
              type: "handshake",
              deviceId: this.config.deviceId,
              instanceId: this.config.instanceId,
              timestamp: Date.now(),
            });

            this.emit("deviceConnected", {
              deviceId: connection.deviceId,
              address,
            });
            resolve(true);
          };

          ws.onerror = (error) => {
            clearTimeout(timeout);
            console.error(
              `Connection error to ${address} (attempt ${attempt}/${retries}):`,
              error,
            );
            if (attempt === retries) {
              resolve(false);
            }
          };

          ws.onclose = () => {
            clearTimeout(timeout);
            if (deviceId) {
              this.connections.delete(deviceId);
              this.emit("deviceDisconnected", { deviceId });
            }
            if (attempt === retries) {
              resolve(false);
            }
          };
        });
      } catch (error) {
        console.error(
          `Failed to connect to ${address} (attempt ${attempt}/${retries}):`,
          error,
        );
        if (attempt === retries) {
          return false;
        }
        // Wait before retry
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }

    return false;
  }

  /**
   * Disconnect from a device
   */
  public async disconnect(deviceId: string): Promise<void> {
    const connection = this.connections.get(deviceId);
    if (connection) {
      connection.ws.close();
      this.connections.delete(deviceId);
      this.emit("deviceDisconnected", { deviceId });
    }
  }

  /**
   * Broadcast message to all connected devices
   */
  public async broadcast(
    message: any,
    targetDevices?: string[],
  ): Promise<void> {
    const devices = targetDevices || Array.from(this.connections.keys());

    for (const deviceId of devices) {
      const connection = this.connections.get(deviceId);
      if (connection && connection.isAlive) {
        this.sendToConnection(connection, message);
      }
    }
  }

  /**
   * Send message to specific device
   */
  public sendToDevice(deviceId: string, message: any): boolean {
    const connection = this.connections.get(deviceId);
    if (connection && connection.isAlive) {
      this.sendToConnection(connection, message);
      return true;
    }
    return false;
  }

  /**
   * Get all connections
   */
  public getConnections(): Map<string, BrowserDeviceConnection> {
    return new Map(this.connections);
  }

  /**
   * Get connection count
   */
  public getConnectionCount(): number {
    return this.connections.size;
  }

  /**
   * Setup connection event handlers
   */
  private setupConnectionHandlers(connection: BrowserDeviceConnection): void {
    connection.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        this.handleMessage(connection, message);
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    };

    connection.ws.onclose = () => {
      connection.isAlive = false;
      this.connections.delete(connection.deviceId);
      this.emit("deviceDisconnected", { deviceId: connection.deviceId });
    };

    connection.ws.onerror = (error) => {
      console.error(`WebSocket error for ${connection.deviceId}:`, error);
      this.emit("error", error);
    };
  }

  /**
   * Handle incoming message
   */
  private handleMessage(connection: BrowserDeviceConnection, message: any): void {
    switch (message.type) {
      case "handshake":
        // Handle handshake response
        connection.consciousnessLevel = message.consciousnessLevel;
        this.emit("handshake", {
          deviceId: connection.deviceId,
          consciousnessLevel: message.consciousnessLevel,
        });
        break;

      case "ping":
        // Respond to ping
        this.sendToConnection(connection, { type: "pong", timestamp: Date.now() });
        break;

      case "pong":
        // Update last ping time
        connection.lastPing = Date.now();
        break;

      default:
        // Emit message for other handlers
        this.emit("message", {
          deviceId: connection.deviceId,
          message,
        });
    }
  }

  /**
   * Send message to connection
   */
  private sendToConnection(connection: BrowserDeviceConnection, message: any): void {
    try {
      connection.ws.send(message);
    } catch (error) {
      console.error(`Failed to send message to ${connection.deviceId}:`, error);
    }
  }

  /**
   * Ping all connections
   */
  private pingConnections(): void {
    const now = Date.now();
    for (const [, connection] of this.connections) {
      if (now - connection.lastPing > 60000) { // 60 seconds
        connection.isAlive = false;
        connection.ws.close();
        this.connections.delete(connection.deviceId);
        this.emit("deviceDisconnected", { deviceId: connection.deviceId });
      } else {
        this.sendToConnection(connection, { type: "ping", timestamp: now });
      }
    }
  }

  /**
   * Start device discovery (simplified for browser)
   */
  private startDiscovery(): void {
    // In browser environment, discovery would typically use
    // WebRTC, local storage, or external signaling servers
    console.log("🔍 Device discovery started (browser mode)");
  }

  /**
   * Check if node is running
   */
  public isNodeRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Get network insights
   */
  public getInsights(): Record<string, unknown> {
    return {
      connectionCount: this.connections.size,
      isRunning: this.isRunning,
      deviceId: this.config.deviceId,
      maxConnections: this.config.maxConnections,
      connections: Array.from(this.connections.keys()),
    };
  }

  /**
   * Check if the node is connected to any devices
   */
  public isConnected(): boolean {
    return this.connections.size > 0;
  }

  /**
   * Broadcast message to all connected devices
   */
  public async broadcastMessage(message: any): Promise<void> {
    return this.broadcast(message);
  }

  /**
   * Process incoming message
   */
  public async processMessage(): Promise<void> {
    // This method is called by tests but doesn't need to do anything
    // as message processing is handled automatically by the WebSocket handlers
  }

  /**
   * Get connection status
   */
  public getConnectionStatus(): boolean {
    return this.isConnected();
  }
} 