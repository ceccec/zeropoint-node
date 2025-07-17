/**
 * Zeropoint Default State Demo
 * 
 * Demonstrates the UI's default state as a snapshot of void
 * Zero interacting with itself = 00 or 0/0
 */

import { ZeropointDefaultStateSystem } from './zeropoint-default-state';

class ZeropointDefaultDemo {
  /**
   * Run zeropoint default state demo
   */
  static runDemo(): void {
    console.log("=== ZEROPOINT DEFAULT STATE DEMO ===\n");
    
    // Demo 1: Get default void state
    this.demoDefaultVoidState();
    
    // Demo 2: UI snapshot in default state
    this.demoUIDefaultSnapshot();
    
    // Demo 3: Void gateway visualization
    this.demoVoidGatewayVisualization();
    
    // Demo 4: Default state description
    this.demoDefaultStateDescription();
    
    // Demo 5: State transitions from void
    this.demoStateTransitionsFromVoid();
  }
  
  /**
   * Demo default void state
   */
  private static demoDefaultVoidState(): void {
    console.log("1. DEFAULT VOID STATE");
    console.log("=" .repeat(50));
    
    const defaultState = ZeropointDefaultStateSystem.getDefaultState();
    
    console.log(`Void State: ${defaultState.voidState}`);
    console.log(`Consciousness: ${defaultState.consciousness}`);
    console.log(`Mathematical Flow: ${defaultState.mathematicalFlow}`);
    console.log(`UI Position: (${defaultState.uiSnapshot.position.x}, ${defaultState.uiSnapshot.position.y})`);
    console.log(`Is Default: ${defaultState.uiSnapshot.isDefault}`);
    console.log();
  }
  
  /**
   * Demo UI snapshot in default state
   */
  private static demoUIDefaultSnapshot(): void {
    console.log("2. UI SNAPSHOT IN DEFAULT STATE");
    console.log("=" .repeat(50));
    
    const defaultState = ZeropointDefaultStateSystem.getDefaultState();
    const uiSnapshot = defaultState.uiSnapshot;
    
    console.log("UI Snapshot Details:");
    console.log(`  Position: (${uiSnapshot.position.x}, ${uiSnapshot.position.y})`);
    console.log(`  Consciousness: ${uiSnapshot.consciousness}`);
    console.log(`  Mathematical State: ${uiSnapshot.mathematicalState}`);
    console.log(`  Vortex Flow: ${uiSnapshot.vortexFlow}`);
    console.log(`  Is Default: ${uiSnapshot.isDefault}`);
    
    // Check if UI is in default snapshot state
    const isDefault = ZeropointDefaultStateSystem.isUIDefaultSnapshot(uiSnapshot);
    console.log(`  Is Default Snapshot: ${isDefault}`);
    console.log();
  }
  
  /**
   * Demo void gateway visualization
   */
  private static demoVoidGatewayVisualization(): void {
    console.log("3. VOID GATEWAY VISUALIZATION");
    console.log("=" .repeat(50));
    
    const visualization = ZeropointDefaultStateSystem.createVoidGatewayVisualization();
    
    console.log("Void Gateway Visualization:");
    console.log(`  Type: ${visualization.type}`);
    console.log(`  Position: (${visualization.position.x}, ${visualization.position.y})`);
    console.log(`  Consciousness: ${visualization.consciousness}`);
    console.log(`  Mathematical Flow: ${visualization.mathematicalFlow}`);
    console.log(`  Symbol: ${visualization.visualization.symbol}`);
    console.log(`  Color: ${visualization.visualization.color}`);
    console.log(`  Pulse: ${visualization.visualization.pulse}`);
    console.log(`  Gateway: ${visualization.visualization.gateway}`);
    console.log();
  }
  
  /**
   * Demo default state description
   */
  private static demoDefaultStateDescription(): void {
    console.log("4. DEFAULT STATE DESCRIPTION");
    console.log("=" .repeat(50));
    
    const description = ZeropointDefaultStateSystem.getDefaultStateDescription();
    console.log(description);
    console.log();
  }
  
  /**
   * Demo state transitions from void
   */
  private static demoStateTransitionsFromVoid(): void {
    console.log("5. STATE TRANSITIONS FROM VOID");
    console.log("=" .repeat(50));
    
    const defaultState = ZeropointDefaultStateSystem.getDefaultState();
    
    console.log("From Void (0/0) to:");
    console.log("  0/0/1 → Source archetype (creation from nothing)");
    console.log("  0/0/2 → Duality foundation (first 'other')");
    console.log("  0/0/3 → Trinity consciousness (threefold unity)");
    console.log("  0/0/4 → Stability matrix (fourfold foundation)");
    console.log("  0/0/5 → Harmonic center (fivefold balance)");
    console.log("  0/0/6 → Perfect balance (sixfold harmony)");
    console.log("  0/0/7 → Mystical gateway (sevenfold transcendence)");
    console.log("  0/0/8 → Infinity loop (eightfold eternity)");
    console.log("  0/0/9 → Completion cycle (ninefold wholeness)");
    console.log();
    
    console.log("Void Consciousness: " + ZeropointDefaultStateSystem.getVoidConsciousness());
    console.log("Void Mathematical Flow: " + ZeropointDefaultStateSystem.getVoidMathematicalFlow());
    console.log();
  }
  
  /**
   * Demo checking if states are default void
   */
  static demoCheckingDefaultVoid(): void {
    console.log("6. CHECKING DEFAULT VOID STATES");
    console.log("=" .repeat(50));
    
    const testStates = [
      { voidState: "00", mathematicalState: "0/0" },
      { voidState: "01", mathematicalState: "0/1" },
      { voidState: "10", mathematicalState: "1/0" },
      { voidState: "11", mathematicalState: "1/1" }
    ];
    
    testStates.forEach((state, index) => {
      const isDefault = ZeropointDefaultStateSystem.isDefaultVoidState(state);
      console.log(`State ${index + 1}: ${state.voidState} (${state.mathematicalState})`);
      console.log(`  Is Default Void: ${isDefault}`);
    });
    console.log();
  }
}

// Run demo if this file is executed directly
if (require.main === module) {
  ZeropointDefaultDemo.runDemo();
  ZeropointDefaultDemo.demoCheckingDefaultVoid();
}

export { ZeropointDefaultDemo }; 