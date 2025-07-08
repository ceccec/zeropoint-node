/**
 * Test Setup File
 *
 * Provides global test utilities and configuration for the ZeroPoint Field test suite.
 */
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeValidResonance(): R;
            toBeValidConsciousnessLevel(): R;
            toBeValidRGB(): R;
        }
    }
}
export {};
//# sourceMappingURL=setup.d.ts.map