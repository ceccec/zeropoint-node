"use strict";
// COIL Metaphysical Pattern Registry for ZeroPoint Emergence System
// This module now imports from the centralized CoilSystem for all pattern definitions
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaphysicalPatterns = void 0;
const CoilSystem_1 = require("../core/CoilSystem");
// Export the centralized COIL patterns
exports.metaphysicalPatterns = CoilSystem_1.COIL_PATTERNS.map(pattern => ({
    name: pattern.name,
    signature: typeof pattern.signature === 'function' ? /.*/ : pattern.signature, // Convert function signatures to regex for compatibility
    context: pattern.context
}));
//# sourceMappingURL=patterns.js.map