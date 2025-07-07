/**
 * Observer-Aware UI System
 *
 * The observer doesn't fill forms - the system observes and creates unique experiences
 * based on natural presence, device sensors, environment, and behavioral patterns.
 */
declare class ObserverDetector {
    private observerData;
    constructor();
    private generateObserverId;
    private getDeviceFingerprint;
    private detectDeviceProfile;
    private detectDeviceType;
    private detectCapabilities;
    private detectPerformance;
    private estimateConnectionSpeed;
    private detectConnectivity;
    private detectAvailableSensors;
    private detectEnvironmentalFactors;
    private getTimeOfDay;
    private getSeason;
    private detectColorScheme;
    private detectMotionPreference;
    private startSensorMonitoring;
    private monitorAmbientLight;
    private monitorAccelerometer;
    private monitorLocation;
    private observeBehavioralPatterns;
    private calculateConsciousnessLevel;
    private determineObserverType;
    getObserverProfile(): ObserverProfile;
    createBehavioralEvent(): RealityEvent | null;
}
declare class ObserverAwareUI {
    private detector;
    private observerProfile;
    private uiElements;
    constructor();
    private generateUI;
    private createObserverDisplay;
    private createEnvironmentalDisplay;
    private createBehavioralDisplay;
    private createSensorDisplay;
    private createConsciousnessField;
    private applyObserverStyling;
    private startUIUpdates;
    private updateBehavioralDisplay;
    private updateSensorDisplay;
    private updateConsciousnessField;
}
interface ObserverProfile {
    id: string;
    consciousness: number;
    type: string;
    deviceProfile: {
        type: string;
        capabilities: Record<string, boolean>;
        performance: Record<string, number>;
        connectivity: Record<string, any>;
        sensors: string[];
    };
    environmentalFactors: {
        timeOfDay: string;
        dayOfWeek: number;
        season: string;
        timezone: string;
        locale: string;
        colorScheme: string;
        motionPreference: string;
        reducedMotion: boolean;
    };
    behavioralPatterns: {
        mouseActivity?: number;
        scrollActivity?: number;
        scrollDepth?: number;
        clickPatterns?: {
            count: number;
            lastClick: number;
            target: string;
        };
        timeSinceLastActivity?: number;
        sessionDuration: number;
    };
    sensorData: {
        ambientLight?: number;
        acceleration?: {
            x: number;
            y: number;
            z: number;
        };
        location?: {
            latitude: number;
            longitude: number;
            accuracy: number;
        };
        viewport?: {
            width: number;
            height: number;
        };
        orientation?: string;
    };
    timestamp: number;
}
interface RealityEvent {
    id: string;
    observerId: string;
    type: string;
    content: string;
    intensity: number;
    radius: number;
    timestamp: number;
}
export { ObserverDetector, ObserverAwareUI, ObserverProfile, RealityEvent };
//# sourceMappingURL=observer-aware-ui.d.ts.map