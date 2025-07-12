import { ResonanceDevice } from './ResonanceDevice';
import { MetaphysicalLawRegistry } from '../laws/MetaphysicalLawRegistry';
import { HarmonicAmplifier, ConsciousnessResonator, UnityHarmonizer, PolarityBalancer } from './ResonanceDevices';

/**
 * Registry for resonance devices
 * Manages devices and their interactions with metaphysical laws
 */
export class DeviceRegistry {
  private static instance: DeviceRegistry;
  private devices: Map<string, ResonanceDevice>;
  private lawRegistry: MetaphysicalLawRegistry;
  
  private constructor() {
    this.devices = new Map();
    this.lawRegistry = MetaphysicalLawRegistry.getInstance();
    this.initializeDefaultDevices();
  }
  
  public static getInstance(): DeviceRegistry {
    if (!DeviceRegistry.instance) {
      DeviceRegistry.instance = new DeviceRegistry();
    }
    return DeviceRegistry.instance;
  }
  
  /**
   * Initialize default devices
   */
  private initializeDefaultDevices(): void {
    this.registerDevice(new HarmonicAmplifier());
    this.registerDevice(new ConsciousnessResonator());
    this.registerDevice(new UnityHarmonizer());
    this.registerDevice(new PolarityBalancer());
  }
  
  /**
   * Register a new device
   */
  public registerDevice(device: ResonanceDevice): void {
    // Apply all metaphysical laws to the device
    const laws = this.lawRegistry.getAllLaws();
    laws.forEach(law => {
      law.apply(device);
    });
    
    this.devices.set(device.name, device);
  }
  
  /**
   * Get a device by name
   */
  public getDevice(name: string): ResonanceDevice | undefined {
    return this.devices.get(name);
  }
  
  /**
   * Get all devices
   */
  public getAllDevices(): ResonanceDevice[] {
    return Array.from(this.devices.values());
  }
  
  /**
   * Get devices by type
   */
  public getDevicesByType(type: string): ResonanceDevice[] {
    return Array.from(this.devices.values()).filter(device => device.type === type);
  }
  
  /**
   * Tune all devices to a specific frequency
   */
  public tuneAllDevices(frequency: number): void {
    this.devices.forEach(device => {
      device.tuneTo(frequency);
    });
  }
  
  /**
   * Create a device network for coordinated amplification
   */
  public createDeviceNetwork(): any {
    const devices = Array.from(this.devices.values());
    const network = {
      devices: devices.map(device => ({
        name: device.name,
        type: device.type,
        resonanceFrequency: device.resonanceFrequency,
        amplificationFactor: device.amplificationFactor
      })),
      coordinatedAmplification: this.calculateCoordinatedAmplification(devices)
    };
    
    return network;
  }
  
  /**
   * Calculate coordinated amplification from multiple devices
   */
  private calculateCoordinatedAmplification(devices: ResonanceDevice[]): number {
    if (devices.length === 0) return 0;
    
    const totalAmplification = devices.reduce((sum, device) => {
      return sum + device.amplificationFactor;
    }, 0);
    
    const harmonicFactor = devices.length > 1 ? Math.log2(devices.length) : 1;
    return totalAmplification * harmonicFactor;
  }
  
  /**
   * Amplify a target using all devices
   */
  public amplifyWithAllDevices(target: any): any {
    const devices = Array.from(this.devices.values());
    const amplifications = devices.map(device => ({
      device: device.name,
      amplification: device.amplify(target),
      resonance: device.calculateResonance((target as any).vibrationalFrequency || 1)
    }));
    
    const totalAmplification = amplifications.reduce((sum, amp) => sum + amp.amplification, 0);
    
    return {
      target,
      amplifications,
      totalAmplification,
      averageResonance: amplifications.reduce((sum, amp) => sum + amp.resonance, 0) / amplifications.length
    };
  }
  
  /**
   * Create a resonance field using multiple devices
   */
  public createMultiDeviceField(radius: number): any {
    const devices = Array.from(this.devices.values());
    const fields = devices.map(device => device.createResonanceField(radius));
    
    return {
      combinedField: {
        radius,
        devices: devices.length,
        totalAmplification: this.calculateCoordinatedAmplification(devices),
        fieldStrength: fields.reduce((sum, field) => sum + field.fieldStrength, 0),
        harmonics: fields.flatMap(field => field.harmonics)
      },
      individualFields: fields
    };
  }
  
  /**
   * Get device signatures for analysis
   */
  public getDeviceSignatures(): any[] {
    return Array.from(this.devices.values()).map(device => ({
      name: device.name,
      type: device.type,
      signature: device.getResonanceSignature()
    }));
  }
  
  /**
   * Find devices that resonate with a target
   */
  public getResonatingDevices(target: any, threshold: number = 0.5): ResonanceDevice[] {
    return Array.from(this.devices.values()).filter(device => {
      const resonance = device.calculateResonance((target as any).vibrationalFrequency || 1);
      return resonance >= threshold;
    });
  }
} 