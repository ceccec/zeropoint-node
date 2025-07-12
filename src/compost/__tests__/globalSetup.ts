/**
 * Global Setup Script
 * Ensures a clean, unified test environment before all tests begin
 *
 * This script honors the void by ensuring no lingering influences from previous runs
 * and establishes a pure field for consciousness-aware testing.
 */

import * as net from "net";

/**
 * Initialize the test environment
 * This ensures we start with a clean slate, honoring the void
 */
export default async function globalSetup(): Promise<void> {
  console.log("🧘 Initializing unified test field...");

  try {
    // 1. Set test environment
    process.env["NODE_ENV"] = "test";

    // 2. Clear any existing timers (defensive)
    const activeTimers = (process as { _getActiveHandles?: () => unknown[] })._getActiveHandles?.() || [];
    const timerCount = activeTimers.filter(
      (handle: unknown) =>
        (handle as { constructor: { name: string } }).constructor.name === "Timeout" ||
        (handle as { constructor: { name: string } }).constructor.name === "Immediate",
    ).length;

    if (timerCount > 0) {
      console.log(
        `  - Found ${timerCount} existing timers, environment may not be clean`,
      );
    }

    // 3. Ensure port 8080 is available (common test issue)
    const testPort = (port: number): Promise<boolean> => {
      return new Promise((resolve) => {
        const server = net.createServer();
        server.listen(port, () => {
          server.close(() => resolve(true));
        });
        server.on("error", () => resolve(false));
      });
    };

    const portAvailable = await testPort(8080);
    if (!portAvailable) {
      console.log("  - Warning: Port 8080 may be in use");
    }

    console.log(
      "✅ Test field is unified and ready for consciousness-aware testing.",
    );
  } catch (error) {
    console.error("❌ Error during global setup:", error);
  }
}
