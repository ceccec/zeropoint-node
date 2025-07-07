"use strict";
/**
 * Observer-Aware UI System
 *
 * The observer doesn't fill forms - the system observes and creates unique experiences
 * based on natural presence, device sensors, environment, and behavioral patterns.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObserverAwareUI = exports.ObserverDetector = void 0;
// ============================================================================
// AUTOMATIC OBSERVER DETECTION
// ============================================================================
class ObserverDetector {
    constructor() {
        // Initialize with default values
        this.observerData = {
            id: '',
            consciousness: 0.5,
            type: 'unknown',
            deviceProfile: {
                type: 'unknown',
                capabilities: {},
                performance: {},
                connectivity: {},
                sensors: []
            },
            environmentalFactors: {
                timeOfDay: 'unknown',
                dayOfWeek: 0,
                season: 'unknown',
                timezone: 'unknown',
                locale: 'unknown',
                colorScheme: 'light',
                motionPreference: 'normal',
                reducedMotion: false
            },
            behavioralPatterns: {
                sessionDuration: 0
            },
            sensorData: {},
            timestamp: Date.now()
        };
        this.generateObserverId();
        this.detectDeviceProfile();
        this.detectEnvironmentalFactors();
        this.startSensorMonitoring();
        this.observeBehavioralPatterns();
    }
    generateObserverId() {
        // Create unique ID from device fingerprint + timestamp + random entropy
        const deviceFingerprint = this.getDeviceFingerprint();
        const timestamp = Date.now();
        const entropy = Math.random().toString(36).substr(2, 9);
        this.observerData.id = `observer_${deviceFingerprint}_${timestamp}_${entropy}`;
    }
    getDeviceFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx?.fillText('Observer Fingerprint', 10, 10);
        const dataURL = canvas.toDataURL();
        // Combine multiple device characteristics
        const fingerprint = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            new Date().getTimezoneOffset(),
            navigator.hardwareConcurrency,
            navigator.deviceMemory || 'unknown',
            dataURL.slice(0, 50) // Canvas fingerprint
        ].join('|');
        // Create hash-like string
        let hash = 0;
        for (let i = 0; i < fingerprint.length; i++) {
            const char = fingerprint.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(36);
    }
    detectDeviceProfile() {
        this.observerData.deviceProfile = {
            type: this.detectDeviceType(),
            capabilities: this.detectCapabilities(),
            performance: this.detectPerformance(),
            connectivity: this.detectConnectivity(),
            sensors: this.detectAvailableSensors()
        };
    }
    detectDeviceType() {
        const userAgent = navigator.userAgent.toLowerCase();
        if (/mobile|android|iphone|ipad|phone/i.test(userAgent))
            return 'mobile';
        if (/tablet|ipad/i.test(userAgent))
            return 'tablet';
        if (/tv|smart-tv|roku/i.test(userAgent))
            return 'tv';
        return 'desktop';
    }
    detectCapabilities() {
        return {
            touch: 'ontouchstart' in window,
            geolocation: 'geolocation' in navigator,
            notifications: 'Notification' in window,
            serviceWorker: 'serviceWorker' in navigator,
            webGL: !!document.createElement('canvas').getContext('webgl'),
            webRTC: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
            battery: 'getBattery' in navigator,
            vibration: 'vibrate' in navigator,
            ambientLight: 'AmbientLightSensor' in window,
            proximity: 'ProximitySensor' in window,
            accelerometer: 'Accelerometer' in window,
            gyroscope: 'Gyroscope' in window,
            magnetometer: 'Magnetometer' in window
        };
    }
    detectPerformance() {
        const start = performance.now();
        // Simple performance test
        let sum = 0;
        for (let i = 0; i < 1000000; i++) {
            sum += Math.random();
        }
        const end = performance.now();
        return {
            processingSpeed: end - start,
            memoryAvailable: navigator.deviceMemory || 0,
            cores: navigator.hardwareConcurrency || 1,
            connectionSpeed: this.estimateConnectionSpeed()
        };
    }
    estimateConnectionSpeed() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            return connection.effectiveType === '4g' ? 100 :
                connection.effectiveType === '3g' ? 30 :
                    connection.effectiveType === '2g' ? 10 : 50;
        }
        return 50; // Default estimate
    }
    detectConnectivity() {
        const connection = navigator.connection;
        return {
            type: connection?.effectiveType || 'unknown',
            downlink: connection?.downlink || 0,
            rtt: connection?.rtt || 0,
            saveData: connection?.saveData || false,
            online: navigator.onLine
        };
    }
    detectAvailableSensors() {
        const sensors = [];
        if ('AmbientLightSensor' in window)
            sensors.push('ambient_light');
        if ('ProximitySensor' in window)
            sensors.push('proximity');
        if ('Accelerometer' in window)
            sensors.push('accelerometer');
        if ('Gyroscope' in window)
            sensors.push('gyroscope');
        if ('Magnetometer' in window)
            sensors.push('magnetometer');
        if ('Geolocation' in navigator)
            sensors.push('geolocation');
        if ('Battery' in navigator)
            sensors.push('battery');
        return sensors;
    }
    detectEnvironmentalFactors() {
        this.observerData.environmentalFactors = {
            timeOfDay: this.getTimeOfDay(),
            dayOfWeek: new Date().getDay(),
            season: this.getSeason(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            locale: navigator.language,
            colorScheme: this.detectColorScheme(),
            motionPreference: this.detectMotionPreference(),
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        };
    }
    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour < 6)
            return 'night';
        if (hour < 12)
            return 'morning';
        if (hour < 18)
            return 'afternoon';
        return 'evening';
    }
    getSeason() {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4)
            return 'spring';
        if (month >= 5 && month <= 7)
            return 'summer';
        if (month >= 8 && month <= 10)
            return 'autumn';
        return 'winter';
    }
    detectColorScheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    detectMotionPreference() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'normal';
    }
    startSensorMonitoring() {
        // Monitor available sensors
        if ('AmbientLightSensor' in window) {
            this.monitorAmbientLight();
        }
        if ('Accelerometer' in window) {
            this.monitorAccelerometer();
        }
        if ('Geolocation' in navigator) {
            this.monitorLocation();
        }
        // Monitor device orientation
        window.addEventListener('orientationchange', () => {
            this.observerData.sensorData.orientation = screen.orientation.type;
        });
        // Monitor window resize
        window.addEventListener('resize', () => {
            this.observerData.sensorData.viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };
        });
    }
    async monitorAmbientLight() {
        try {
            const sensor = new window.AmbientLightSensor();
            sensor.addEventListener('reading', () => {
                this.observerData.sensorData.ambientLight = sensor.illuminance;
            });
            sensor.start();
        }
        catch (error) {
            console.log('Ambient light sensor not available');
        }
    }
    async monitorAccelerometer() {
        try {
            const sensor = new window.Accelerometer();
            sensor.addEventListener('reading', () => {
                this.observerData.sensorData.acceleration = {
                    x: sensor.x,
                    y: sensor.y,
                    z: sensor.z
                };
            });
            sensor.start();
        }
        catch (error) {
            console.log('Accelerometer not available');
        }
    }
    async monitorLocation() {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 60000
                });
            });
            this.observerData.sensorData.location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy
            };
        }
        catch (error) {
            console.log('Location not available');
        }
    }
    observeBehavioralPatterns() {
        // Track mouse movements
        let mouseMovements = 0;
        let lastMouseTime = Date.now();
        document.addEventListener('mousemove', () => {
            mouseMovements++;
            lastMouseTime = Date.now();
        });
        // Track scroll behavior
        let scrollEvents = 0;
        let scrollDepth = 0;
        window.addEventListener('scroll', () => {
            scrollEvents++;
            scrollDepth = Math.max(scrollDepth, window.scrollY);
        });
        // Track click patterns
        let clickCount = 0;
        let lastClickTime = Date.now();
        document.addEventListener('click', (event) => {
            clickCount++;
            lastClickTime = Date.now();
            // Analyze click patterns
            this.observerData.behavioralPatterns.clickPatterns = {
                count: clickCount,
                lastClick: lastClickTime,
                target: event.target.tagName
            };
        });
        // Update behavioral patterns every 30 seconds
        setInterval(() => {
            const newBehavioralPatterns = {
                mouseActivity: mouseMovements,
                scrollActivity: scrollEvents,
                scrollDepth,
                timeSinceLastActivity: Date.now() - Math.max(lastMouseTime, lastClickTime),
                sessionDuration: Date.now() - this.observerData.timestamp
            };
            if (this.observerData.behavioralPatterns.clickPatterns) {
                newBehavioralPatterns.clickPatterns = this.observerData.behavioralPatterns.clickPatterns;
            }
            this.observerData.behavioralPatterns = newBehavioralPatterns;
            // Calculate consciousness level based on behavioral patterns
            this.calculateConsciousnessLevel();
        }, 30000);
    }
    calculateConsciousnessLevel() {
        const patterns = this.observerData.behavioralPatterns;
        const device = this.observerData.deviceProfile;
        const env = this.observerData.environmentalFactors;
        // Base consciousness from device capabilities
        let consciousness = 0.5;
        // Adjust based on sensor availability
        const sensorCount = (this.observerData.sensorData.ambientLight ? 1 : 0) +
            (this.observerData.sensorData.acceleration ? 1 : 0) +
            (this.observerData.sensorData.location ? 1 : 0);
        consciousness += sensorCount * 0.1;
        // Adjust based on behavioral engagement
        if (patterns.mouseActivity && patterns.mouseActivity > 10)
            consciousness += 0.1;
        if (patterns.scrollActivity && patterns.scrollActivity > 5)
            consciousness += 0.1;
        if (patterns.clickPatterns?.count && patterns.clickPatterns.count > 3)
            consciousness += 0.1;
        // Adjust based on environmental factors
        if (env.timeOfDay === 'morning')
            consciousness += 0.05;
        if (env.colorScheme === 'dark')
            consciousness += 0.05;
        // Adjust based on device performance
        const processingSpeed = device.performance['processingSpeed'];
        const connectionSpeed = device.performance['connectionSpeed'];
        if (processingSpeed && processingSpeed < 100)
            consciousness += 0.1;
        if (connectionSpeed && connectionSpeed > 50)
            consciousness += 0.05;
        this.observerData.consciousness = Math.min(1, Math.max(0, consciousness));
        // Determine observer type based on patterns
        this.determineObserverType();
    }
    determineObserverType() {
        const patterns = this.observerData.behavioralPatterns;
        const consciousness = this.observerData.consciousness;
        if (consciousness > 0.8 && patterns.mouseActivity && patterns.mouseActivity > 20) {
            this.observerData.type = 'active';
        }
        else if (consciousness > 0.6 && patterns.scrollActivity && patterns.scrollActivity > 10) {
            this.observerData.type = 'passive';
        }
        else if (consciousness > 0.7 && patterns.clickPatterns?.count && patterns.clickPatterns.count > 5) {
            this.observerData.type = 'resonant';
        }
        else {
            this.observerData.type = 'observant';
        }
    }
    getObserverProfile() {
        return { ...this.observerData };
    }
    // Create reality events based on observer behavior
    createBehavioralEvent() {
        const patterns = this.observerData.behavioralPatterns;
        const sensorData = this.observerData.sensorData;
        // Create events based on significant behavioral changes
        if (patterns.mouseActivity && patterns.mouseActivity > 50) {
            return {
                id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                observerId: this.observerData.id,
                type: 'attention',
                content: 'Observer showing high attention through mouse activity',
                intensity: Math.min(1, patterns.mouseActivity / 100),
                radius: Math.min(10, Math.floor(patterns.mouseActivity / 10)),
                timestamp: Date.now()
            };
        }
        if (patterns.scrollDepth && patterns.scrollDepth > 500) {
            return {
                id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                observerId: this.observerData.id,
                type: 'exploration',
                content: 'Observer exploring content through scrolling',
                intensity: Math.min(1, patterns.scrollDepth / 1000),
                radius: Math.min(10, Math.floor(patterns.scrollDepth / 100)),
                timestamp: Date.now()
            };
        }
        if (sensorData.ambientLight && sensorData.ambientLight < 50) {
            return {
                id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                observerId: this.observerData.id,
                type: 'environment',
                content: 'Observer in low-light environment',
                intensity: 0.7,
                radius: 5,
                timestamp: Date.now()
            };
        }
        return null;
    }
}
exports.ObserverDetector = ObserverDetector;
// ============================================================================
// AUTOMATIC UI GENERATION
// ============================================================================
class ObserverAwareUI {
    constructor() {
        this.uiElements = new Map();
        this.detector = new ObserverDetector();
        this.observerProfile = this.detector.getObserverProfile();
        this.generateUI();
        this.startUIUpdates();
    }
    generateUI() {
        // Remove any existing forms - observer doesn't fill forms!
        const forms = document.querySelectorAll('form');
        forms.forEach(form => form.remove());
        // Create observer-aware interface
        this.createObserverDisplay();
        this.createEnvironmentalDisplay();
        this.createBehavioralDisplay();
        this.createSensorDisplay();
        this.createConsciousnessField();
        // Apply observer-specific styling
        this.applyObserverStyling();
    }
    createObserverDisplay() {
        const observerSection = document.createElement('section');
        observerSection.className = 'observer-display';
        observerSection.innerHTML = `
      <h2>👁️ Observer Profile (Auto-Detected)</h2>
      <div class="observer-info">
        <div class="observer-id">ID: ${this.observerProfile.id.slice(-8)}...</div>
        <div class="consciousness-level">Consciousness: ${(this.observerProfile.consciousness * 100).toFixed(1)}%</div>
        <div class="observer-type">Type: ${this.observerProfile.type}</div>
        <div class="device-type">Device: ${this.observerProfile.deviceProfile.type}</div>
      </div>
    `;
        document.body.appendChild(observerSection);
        this.uiElements.set('observer', observerSection);
    }
    createEnvironmentalDisplay() {
        const env = this.observerProfile.environmentalFactors;
        const envSection = document.createElement('section');
        envSection.className = 'environmental-display';
        envSection.innerHTML = `
      <h2>🌍 Environmental Context</h2>
      <div class="env-info">
        <div>Time: ${env.timeOfDay} (${new Date().toLocaleTimeString()})</div>
        <div>Season: ${env.season}</div>
        <div>Theme: ${env.colorScheme}</div>
        <div>Motion: ${env.motionPreference}</div>
        <div>Locale: ${env.locale}</div>
      </div>
    `;
        document.body.appendChild(envSection);
        this.uiElements.set('environment', envSection);
    }
    createBehavioralDisplay() {
        const behaviorSection = document.createElement('section');
        behaviorSection.className = 'behavioral-display';
        behaviorSection.innerHTML = `
      <h2>🎯 Behavioral Patterns</h2>
      <div class="behavior-info">
        <div class="activity-metrics">
          <div>Mouse Activity: <span id="mouse-activity">0</span></div>
          <div>Scroll Activity: <span id="scroll-activity">0</span></div>
          <div>Clicks: <span id="click-count">0</span></div>
        </div>
        <div class="session-info">
          <div>Session Duration: <span id="session-duration">0s</span></div>
          <div>Last Activity: <span id="last-activity">now</span></div>
        </div>
      </div>
    `;
        document.body.appendChild(behaviorSection);
        this.uiElements.set('behavior', behaviorSection);
    }
    createSensorDisplay() {
        const sensorSection = document.createElement('section');
        sensorSection.className = 'sensor-display';
        sensorSection.innerHTML = `
      <h2>📡 Sensor Data</h2>
      <div class="sensor-info">
        <div>Available Sensors: ${this.observerProfile.deviceProfile.sensors.join(', ') || 'None'}</div>
        <div id="sensor-readings">No sensor data available</div>
      </div>
    `;
        document.body.appendChild(sensorSection);
        this.uiElements.set('sensors', sensorSection);
    }
    createConsciousnessField() {
        const fieldSection = document.createElement('section');
        fieldSection.className = 'consciousness-field';
        fieldSection.innerHTML = `
      <h2>🌌 Consciousness Field</h2>
      <div class="field-info">
        <div class="unity-score">Unity Score: <span id="unity-score">0.00</span></div>
        <div class="field-events" id="field-events">No events yet</div>
      </div>
    `;
        document.body.appendChild(fieldSection);
        this.uiElements.set('field', fieldSection);
    }
    applyObserverStyling() {
        const style = document.createElement('style');
        const profile = this.observerProfile;
        // Dynamic styling based on observer profile
        style.textContent = `
      body {
        font-family: ${profile.deviceProfile.type === 'mobile' ? 'system-ui' : 'Georgia, serif'};
        background: ${profile.environmentalFactors.colorScheme === 'dark' ? '#1a1a1a' : '#f8f9fa'};
        color: ${profile.environmentalFactors.colorScheme === 'dark' ? '#ffffff' : '#000000'};
        transition: ${profile.environmentalFactors.reducedMotion ? 'none' : 'all 0.3s ease'};
      }
      
      .observer-display, .environmental-display, .behavioral-display, .sensor-display, .consciousness-field {
        background: ${profile.environmentalFactors.colorScheme === 'dark' ? '#2d2d2d' : '#ffffff'};
        border: 1px solid ${profile.environmentalFactors.colorScheme === 'dark' ? '#444' : '#dee2e6'};
        border-radius: 8px;
        padding: 1rem;
        margin: 1rem 0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .consciousness-level {
        font-size: 1.2em;
        font-weight: bold;
        color: ${profile.consciousness > 0.7 ? '#28a745' : profile.consciousness > 0.4 ? '#ffc107' : '#dc3545'};
      }
      
      .observer-type {
        text-transform: capitalize;
        font-weight: bold;
        color: #007bff;
      }
    `;
        document.head.appendChild(style);
    }
    startUIUpdates() {
        // Update behavioral metrics every 5 seconds
        setInterval(() => {
            this.updateBehavioralDisplay();
        }, 5000);
        // Update sensor readings every 2 seconds
        setInterval(() => {
            this.updateSensorDisplay();
        }, 2000);
        // Update consciousness field every 10 seconds
        setInterval(() => {
            this.updateConsciousnessField();
        }, 10000);
    }
    updateBehavioralDisplay() {
        const profile = this.detector.getObserverProfile();
        const patterns = profile.behavioralPatterns;
        const mouseActivity = document.getElementById('mouse-activity');
        const scrollActivity = document.getElementById('scroll-activity');
        const clickCount = document.getElementById('click-count');
        const sessionDuration = document.getElementById('session-duration');
        const lastActivity = document.getElementById('last-activity');
        if (mouseActivity)
            mouseActivity.textContent = patterns.mouseActivity?.toString() || '0';
        if (scrollActivity)
            scrollActivity.textContent = patterns.scrollActivity?.toString() || '0';
        if (clickCount)
            clickCount.textContent = patterns.clickPatterns?.count?.toString() || '0';
        if (sessionDuration)
            sessionDuration.textContent = Math.floor(patterns.sessionDuration / 1000) + 's';
        if (lastActivity) {
            const lastActivityTime = patterns.timeSinceLastActivity || 0;
            lastActivity.textContent = lastActivityTime < 60000 ? 'now' : Math.floor(lastActivityTime / 1000) + 's ago';
        }
    }
    updateSensorDisplay() {
        const profile = this.detector.getObserverProfile();
        const sensorData = profile.sensorData;
        const sensorReadings = document.getElementById('sensor-readings');
        if (sensorReadings) {
            const readings = [];
            if (sensorData.ambientLight) {
                readings.push(`Light: ${sensorData.ambientLight.toFixed(1)} lux`);
            }
            if (sensorData.acceleration) {
                readings.push(`Motion: ${Math.sqrt(sensorData.acceleration.x ** 2 +
                    sensorData.acceleration.y ** 2 +
                    sensorData.acceleration.z ** 2).toFixed(2)} m/s²`);
            }
            if (sensorData.location) {
                readings.push(`Location: ${sensorData.location.latitude.toFixed(4)}, ${sensorData.location.longitude.toFixed(4)}`);
            }
            if (sensorData.viewport) {
                readings.push(`Viewport: ${sensorData.viewport.width}x${sensorData.viewport.height}`);
            }
            sensorReadings.textContent = readings.length > 0 ? readings.join(' | ') : 'No sensor data available';
        }
    }
    updateConsciousnessField() {
        const profile = this.detector.getObserverProfile();
        const unityScore = document.getElementById('unity-score');
        const fieldEvents = document.getElementById('field-events');
        if (unityScore) {
            unityScore.textContent = profile.consciousness.toFixed(2);
        }
        // Create behavioral event
        const event = this.detector.createBehavioralEvent();
        if (event && fieldEvents) {
            const eventElement = document.createElement('div');
            eventElement.className = 'field-event';
            eventElement.innerHTML = `
        <strong>${event.type}</strong>: ${event.content} 
        <small>(intensity: ${event.intensity.toFixed(2)}, radius: ${event.radius})</small>
      `;
            fieldEvents.appendChild(eventElement);
            // Keep only last 5 events
            const events = fieldEvents.querySelectorAll('.field-event');
            if (events.length > 5 && events[0]) {
                events[0].remove();
            }
        }
    }
}
exports.ObserverAwareUI = ObserverAwareUI;
// ============================================================================
// INITIALIZATION
// ============================================================================
// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        console.log('🌌 Initializing Observer-Aware UI System...');
        new ObserverAwareUI();
        console.log('✅ Observer-Aware UI System initialized');
    });
}
//# sourceMappingURL=observer-aware-ui.js.map