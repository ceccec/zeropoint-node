import CryptoJS from 'crypto-js';

/**
 * Browser-compatible crypto utilities
 * Replaces Node.js crypto module functionality
 */
export class BrowserCrypto {
  /**
   * Create SHA256 hash
   */
  static createHash(algorithm: string, data: string): string {
    if (algorithm.toLowerCase() === 'sha256') {
      return CryptoJS.SHA256(data).toString();
    }
    throw new Error(`Unsupported algorithm: ${algorithm}`);
  }

  /**
   * Generate random bytes (returns hex string)
   */
  static randomBytes(length: number): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Generate random UUID
   */
  static randomUUID(): string {
    return crypto.randomUUID();
  }

  /**
   * Create hash from object
   */
  static hashObject(obj: any): string {
    const jsonString = JSON.stringify(obj);
    return this.createHash('sha256', jsonString);
  }
} 