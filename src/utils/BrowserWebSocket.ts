/**
 * Browser-compatible WebSocket wrapper
 * Replaces Node.js ws module functionality
 */
export class BrowserWebSocket extends WebSocket {
  constructor(url: string, protocols?: string | string[]) {
    super(url, protocols);
  }

  /**
   * Send data with automatic JSON serialization
   */
  send(data: any): void {
    if (typeof data === 'string') {
      super.send(data);
    } else {
      super.send(JSON.stringify(data));
    }
  }

  /**
   * Add event listener with type safety
   */
  on(event: string, listener: (data: any) => void): this {
    this.addEventListener(event, listener);
    return this;
  }

  /**
   * Remove event listener
   */
  off(event: string, listener: (data: any) => void): this {
    this.removeEventListener(event, listener);
    return this;
  }
} 