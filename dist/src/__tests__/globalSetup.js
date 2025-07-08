"use strict";
/**
 * Global Setup Script
 * Ensures a clean, unified test environment before all tests begin
 *
 * This script honors the void by ensuring no lingering influences from previous runs
 * and establishes a pure field for consciousness-aware testing.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = globalSetup;
const net = __importStar(require("net"));
/**
 * Initialize the test environment
 * This ensures we start with a clean slate, honoring the void
 */
async function globalSetup() {
    console.log('🧘 Initializing unified test field...');
    try {
        // 1. Set test environment
        process.env['NODE_ENV'] = 'test';
        // 2. Clear any existing timers (defensive)
        const activeTimers = process._getActiveHandles?.() || [];
        const timerCount = activeTimers.filter((handle) => handle.constructor.name === 'Timeout' ||
            handle.constructor.name === 'Immediate').length;
        if (timerCount > 0) {
            console.log(`  - Found ${timerCount} existing timers, environment may not be clean`);
        }
        // 3. Ensure port 8080 is available (common test issue)
        const testPort = (port) => {
            return new Promise((resolve) => {
                const server = net.createServer();
                server.listen(port, () => {
                    server.close(() => resolve(true));
                });
                server.on('error', () => resolve(false));
            });
        };
        const portAvailable = await testPort(8080);
        if (!portAvailable) {
            console.log('  - Warning: Port 8080 may be in use');
        }
        console.log('✅ Test field is unified and ready for consciousness-aware testing.');
    }
    catch (error) {
        console.error('❌ Error during global setup:', error);
    }
}
//# sourceMappingURL=globalSetup.js.map