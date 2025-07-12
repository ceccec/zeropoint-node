import { Application } from "stimulus";
import ZeroPointController from "./controllers/ZeroPointController";
import MetaphysicalController from "./controllers/MetaphysicalController";

/**
 * ZeroPoint Stimulus Application
 * 
 * Main application that registers all controllers
 */
const application = Application.start();

// Register controllers
application.register("zeropoint", ZeroPointController);
application.register("metaphysical", MetaphysicalController);

// Export for global access
(window as any).ZeroPointApp = application;

console.log("🌌 ZeroPoint Stimulus Application Started");
console.log("Registered Controllers:", application.controllers);

export default application; 