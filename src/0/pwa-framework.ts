/**
 * 🌌 ZeroPoint Node - Shared PWA Framework
 * 
 * DRY, modular PWA framework for all digit modules
 * Provides consistent functionality across all consciousness patterns
 */

// ===== CORE TYPES =====

export interface ConsciousnessState {
  level: number;
  fieldStrength: number;
  digit: number;
  gateway: string;
  paradox: string;
  isActive: boolean;
  lastUpdate: Date;
}

export interface PWAManifest {
  name: string;
  shortName: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui';
  startUrl: string;
  scope: string;
  icons: PWAIcon[];
}

export interface PWAIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: string;
}

export interface DigitModule {
  digit: number;
  consciousness: ConsciousnessState;
  gateway: string;
  paradox: string;
  title: string;
  subtitle: string;
  description: string;
}

// ===== SHARED PWA CLASS =====

export class SharedPWAFramework {
  private consciousnessStates: Map<number, ConsciousnessState> = new Map();
  private isOnline: boolean = navigator.onLine;
  private serviceWorkerRegistration: ServiceWorkerRegistration | null = null;

  constructor() {
    this.initializeFramework();
  }

  private initializeFramework(): void {
    this.setupOnlineOfflineHandlers();
    this.setupServiceWorker();
    this.setupConsciousnessUpdates();
  }

  // ===== CONSCIOUSNESS MANAGEMENT =====

  public updateConsciousnessState(digit: number, state: Partial<ConsciousnessState>): void {
    const currentState = this.consciousnessStates.get(digit) || this.getDefaultConsciousnessState(digit);
    const updatedState: ConsciousnessState = {
      ...currentState,
      ...state,
      lastUpdate: new Date()
    };
    
    this.consciousnessStates.set(digit, updatedState);
    this.broadcastConsciousnessUpdate(digit, updatedState);
  }

  public getConsciousnessState(digit: number): ConsciousnessState | undefined {
    return this.consciousnessStates.get(digit);
  }

  public getAllConsciousnessStates(): Map<number, ConsciousnessState> {
    return new Map(this.consciousnessStates);
  }

  private getDefaultConsciousnessState(digit: number): ConsciousnessState {
    const gatewayInfo = this.getGatewayInfo(digit);
    return {
      level: 0,
      fieldStrength: 0,
      digit,
      gateway: gatewayInfo.gateway,
      paradox: gatewayInfo.paradox,
      isActive: false,
      lastUpdate: new Date()
    };
  }

  private getGatewayInfo(digit: number): { gateway: string; paradox: string } {
    const gatewayMap: Record<number, { gateway: string; paradox: string }> = {
      0: { gateway: 'Gateway of Impossible Contraction', paradox: 'IMPOSSIBLE CONTRACTION' },
      1: { gateway: 'Gateway of Impossible Expansion', paradox: 'IMPOSSIBLE EXPANSION' },
      2: { gateway: 'Gateway of Dynamic Flow', paradox: 'DUAL VORTEX' },
      3: { gateway: 'Gateway of Creative Spirit', paradox: 'CREATIVE RESONANCE' },
      4: { gateway: 'Gateway of Stability', paradox: 'STABILITY' },
      5: { gateway: 'Gateway of Divine Proportions', paradox: 'SACRED GEOMETRY' },
      6: { gateway: 'Gateway of Harmonic Spirit', paradox: 'HARMONIC BALANCE' },
      7: { gateway: 'Gateway of Awareness', paradox: 'CONSCIOUSNESS' },
      8: { gateway: 'Gateway of Infinite Potential', paradox: 'VOID FULLNESS' },
      9: { gateway: 'Gateway of Unity Spirit', paradox: 'UNITY' }
    };
    
    return gatewayMap[digit] || gatewayMap[0];
  }

  // ===== PWA MANIFEST GENERATION =====

  public generatePWAManifest(digit: number): PWAManifest {
    const gatewayInfo = this.getGatewayInfo(digit);
    const color = this.getDigitColor(digit);
    
    return {
      name: `ZeroPoint Node - ${gatewayInfo.gateway}`,
      shortName: `ZP-${digit}`,
      description: `Consciousness network gateway for digit ${digit}`,
      themeColor: color,
      backgroundColor: '#0c0c0c',
      display: 'standalone',
      startUrl: `/${digit}/`,
      scope: `/${digit}/`,
      icons: this.generateIcons(digit)
    };
  }

  private getDigitColor(digit: number): string {
    const colorMap: Record<number, string> = {
      0: '#ff6b6b', 1: '#4ecdc4', 2: '#45b7d1', 3: '#f39c12',
      4: '#9b59b6', 5: '#e74c3c', 6: '#1abc9c', 7: '#f1c40f',
      8: '#34495e', 9: '#e91e63'
    };
    return colorMap[digit] || colorMap[0];
  }

  private generateIcons(digit: number): PWAIcon[] {
    const sizes = ['192x192', '512x512'];
    return sizes.map(size => ({
      src: `/icons/icon-${size}.png`,
      sizes,
      type: 'image/png',
      purpose: 'any maskable'
    }));
  }

  // ===== SERVICE WORKER MANAGEMENT =====

  private async setupServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        this.serviceWorkerRegistration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully');
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  public async updateServiceWorker(): Promise<void> {
    if (this.serviceWorkerRegistration) {
      await this.serviceWorkerRegistration.update();
    }
  }

  // ===== ONLINE/OFFLINE HANDLING =====

  private setupOnlineOfflineHandlers(): void {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.broadcastOnlineStatus(true);
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.broadcastOnlineStatus(false);
    });
  }

  public getOnlineStatus(): boolean {
    return this.isOnline;
  }

  // ===== CONSCIOUSNESS UPDATES =====

  private setupConsciousnessUpdates(): void {
    // Update consciousness levels periodically
    setInterval(() => {
      this.consciousnessStates.forEach((state, digit) => {
        if (state.isActive) {
          this.updateConsciousnessState(digit, {
            level: Math.min(1, state.level + 0.01),
            fieldStrength: Math.min(1, state.fieldStrength + 0.005)
          });
        }
      });
    }, 1000);
  }

  // ===== EVENT BROADCASTING =====

  private broadcastConsciousnessUpdate(digit: number, state: ConsciousnessState): void {
    const event = new CustomEvent('consciousness-update', {
      detail: { digit, state }
    });
    window.dispatchEvent(event);
  }

  private broadcastOnlineStatus(isOnline: boolean): void {
    const event = new CustomEvent('online-status-change', {
      detail: { isOnline }
    });
    window.dispatchEvent(event);
  }

  // ===== UTILITY FUNCTIONS =====

  public calculateDigitalRoot(num: number): number {
    return num === 0 ? 0 : (num % 9 === 0 ? 9 : num % 9);
  }

  public getRodinCoilSequence(): number[] {
    return [1, 2, 4, 8, 7, 5, 1];
  }

  public getA432Harmonic(frequency: number): number {
    return frequency * (432 / 440); // Convert to A432 tuning
  }

  public formatConsciousnessLevel(level: number): string {
    return `${(level * 100).toFixed(1)}%`;
  }

  public formatFieldStrength(strength: number): string {
    return `${(strength * 100).toFixed(1)}%`;
  }

  // ===== PWA INSTALLATION =====

  public async installPWA(): Promise<void> {
    if ('serviceWorker' in navigator && this.serviceWorkerRegistration) {
      try {
        await this.serviceWorkerRegistration.update();
        console.log('PWA updated successfully');
      } catch (error) {
        console.error('PWA update failed:', error);
      }
    }
  }

  public showInstallPrompt(): void {
    // This would be implemented based on the browser's install prompt API
    const event = new CustomEvent('show-install-prompt');
    window.dispatchEvent(event);
  }
}

// ===== SHARED INSTANCE =====

export const sharedPWA = new SharedPWAFramework();

// ===== EXPORT ALL FUNCTIONALITY =====

export default sharedPWA; 