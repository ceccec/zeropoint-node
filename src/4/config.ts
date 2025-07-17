/**
 * 🌌 Configuration System - src/4/config.ts
 * 
 * Centralized configuration for all zeropoint system constants.
 * All digit constants are configurable.
 */

// 🌌 MAIN ZEROPOINT CONFIGURATION
export const ZEROPOINT_CONFIG = {
  // Gateway definitions - all configurable
  GATEWAY_DIGITS: [0, 3, 6, 9],
  CONSCIOUSNESS_GATEWAYS: [0, 3, 6, 9],
  VORTEX_GATEWAYS: [1, 2, 4, 8, 7, 5],
  
  // Mathematical constants
  MODULO_BASE: 9,
  ZERO_REPLACEMENT: 9, // Instead of 0, use 9
  
  // Consciousness mappings - configurable
  CONSCIOUSNESS_MAP: {
    0: "Void Gateway - Infinite potential",
    1: "Source Gateway - Creation from nothing",
    2: "Duality Gateway - Foundation patterns",
    3: "Trinity Gateway - Threefold unity",
    4: "Stability Gateway - Fourfold foundation",
    5: "Harmonic Gateway - Fivefold balance",
    6: "Balance Gateway - Sixfold harmony",
    7: "Mystical Gateway - Sevenfold transcendence",
    8: "Infinity Gateway - Eightfold eternity",
    9: "Completion Gateway - Ninefold wholeness"
  },
  
  // Flow mappings - configurable
  FLOW_MAP: {
    0: "0/0 → impossible state",
    1: "1 → unity vortex",
    2: "2 → duality vortex",
    3: "3 → trinity vortex",
    4: "4 → stability vortex",
    5: "5 → harmonic vortex",
    6: "6 → balance vortex",
    7: "7 → mystical vortex",
    8: "8 → infinity vortex",
    9: "9 → completion vortex"
  },
  
  // Switching constants
  IMPOSSIBLE_STREAM_LENGTH: 10,
  
  // Vortex constants
  VOID_GATEWAY: '0/0',
  VOID_CONSCIOUSNESS: "Void Gateway - Infinite potential",
  VOID_FLOW: "0/0 → impossible state"
};

/**
 * Update configuration
 */
export function updateConfig(newConfig: Partial<typeof ZEROPOINT_CONFIG>): void {
  Object.assign(ZEROPOINT_CONFIG, newConfig);
}

/**
 * Get configuration value
 */
export function getConfigValue(key: keyof typeof ZEROPOINT_CONFIG) {
  return ZEROPOINT_CONFIG[key];
}

/**
 * Set configuration value
 */
export function setConfigValue(key: keyof typeof ZEROPOINT_CONFIG, value: unknown): void {
  (ZEROPOINT_CONFIG as any)[key] = value;
}

/**
 * Reset configuration to defaults
 */
export function resetConfig(): void {
  // Reset to original values
  Object.assign(ZEROPOINT_CONFIG, {
    GATEWAY_DIGITS: [0, 3, 6, 9],
    CONSCIOUSNESS_GATEWAYS: [0, 3, 6, 9],
    VORTEX_GATEWAYS: [1, 2, 4, 8, 7, 5],
    MODULO_BASE: 9,
    ZERO_REPLACEMENT: 9,
    IMPOSSIBLE_STREAM_LENGTH: 10,
    VOID_GATEWAY: '0/0',
    VOID_CONSCIOUSNESS: "Void Gateway - Infinite potential",
    VOID_FLOW: "0/0 → impossible state"
  });
}

/**
 * Export configuration system
 */
export const ConfigSystem = {
  config: ZEROPOINT_CONFIG,
  updateConfig,
  getConfigValue,
  setConfigValue,
  resetConfig
}; 