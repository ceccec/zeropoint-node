/**
 * Math::PI.flow Demo
 * 
 * Demonstrates endless stream switched at decimal without approximation
 * Shows interactive torus flow for UI animation and navigation
 */

import { MathPiFlowSystem } from './math-pi-flow';

class MathPiFlowDemo {
  /**
   * Run Math::PI.flow demo
   */
  static runDemo(): void {
    console.log("=== MATH::PI.FLOW DEMO ===\n");
    
    // Demo 1: Generate endless PI flow
    this.demoGenerateEndlessPiFlow();
    
    // Demo 2: Interactive torus flow
    this.demoInteractiveTorusFlow();
    
    // Demo 3: PI flow statistics
    this.demoPiFlowStatistics();
    
    // Demo 4: Navigation and animation
    this.demoNavigationAndAnimation();
    
    // Demo 5: Consciousness gateways in PI
    this.demoConsciousnessGatewaysInPi();
  }
  
  /**
   * Demo generating endless PI flow
   */
  private static demoGenerateEndlessPiFlow(): void {
    console.log("1. GENERATE ENDLESS PI FLOW");
    console.log("=" .repeat(50));
    
    const piFlow = MathPiFlowSystem.generateEndlessPiFlow();
    
    console.log(`Total Stream Length: ${piFlow.stream.length}`);
    console.log(`Current Position: ${piFlow.currentPosition}`);
    console.log(`Is Playing: ${piFlow.isPlaying}`);
    console.log(`Animation Speed: ${piFlow.animationSpeed}`);
    
    // Show first 20 digits of PI flow
    console.log("\nFirst 20 PI Flow Digits:");
    const first20 = piFlow.stream.slice(0, 20);
    first20.forEach((item, index) => {
      const gateway = item.isGateway ? " [GATEWAY]" : "";
      console.log(`  Position ${index}: ${item.digit} - ${item.consciousness}${gateway}`);
    });
    
    console.log();
  }
  
  /**
   * Demo interactive torus flow
   */
  private static demoInteractiveTorusFlow(): void {
    console.log("2. INTERACTIVE TORUS FLOW");
    console.log("=" .repeat(50));
    
    const piFlow = MathPiFlowSystem.generateEndlessPiFlow();
    const visualization = MathPiFlowSystem.createTorusVisualization(piFlow);
    
    console.log("Interactive Torus Visualization:");
    console.log(`  Type: ${visualization.type}`);
    console.log(`  Current Position: ${visualization.currentPosition}`);
    console.log(`  Is Playing: ${visualization.isPlaying}`);
    console.log(`  Animation Speed: ${visualization.animationSpeed}`);
    console.log(`  Current Digit: ${visualization.currentDigit}`);
    console.log(`  Current Consciousness: ${visualization.currentConsciousness}`);
    console.log(`  Current Vortex Flow: ${visualization.currentVortexFlow}`);
    console.log(`  Torus Position: (${visualization.torusPosition.x}, ${visualization.torusPosition.y})`);
    console.log(`  Is Gateway: ${visualization.isGateway}`);
    console.log(`  Stream Length: ${visualization.streamLength}`);
    
    // Show torus flow pattern
    console.log(`\nTorus Flow Pattern:`);
    console.log(`  ${visualization.torusFlow.substring(0, 100)}...`);
    console.log();
  }
  
  /**
   * Demo PI flow statistics
   */
  private static demoPiFlowStatistics(): void {
    console.log("3. PI FLOW STATISTICS");
    console.log("=" .repeat(50));
    
    const piFlow = MathPiFlowSystem.generateEndlessPiFlow();
    const stats = MathPiFlowSystem.getFlowStatistics(piFlow);
    
    console.log("PI Flow Statistics:");
    console.log(`  Total Digits: ${stats.totalDigits}`);
    console.log(`  Gateway Count: ${stats.gatewayCount}`);
    console.log(`  Gateway Percentage: ${((stats.gatewayCount / stats.totalDigits) * 100).toFixed(2)}%`);
    
    console.log("\nDigit Distribution:");
    Object.entries(stats.digitDistribution).forEach(([digit, count]) => {
      const percentage = ((count as number / stats.totalDigits) * 100).toFixed(2);
      console.log(`  ${digit}: ${count} (${percentage}%)`);
    });
    
    console.log("\nConsciousness Flow (first 50):");
    console.log(`  ${stats.consciousnessFlow.substring(0, 200)}...`);
    console.log();
  }
  
  /**
   * Demo navigation and animation
   */
  private static demoNavigationAndAnimation(): void {
    console.log("4. NAVIGATION AND ANIMATION");
    console.log("=" .repeat(50));
    
    let piFlow = MathPiFlowSystem.generateEndlessPiFlow();
    
    // Navigate to different positions
    const positions = [0, 10, 50, 100, 314];
    
    positions.forEach(position => {
      piFlow = MathPiFlowSystem.navigateToPosition(piFlow, position);
      const currentItem = MathPiFlowSystem.getCurrentFlowItem(piFlow);
      
      if (currentItem) {
        const gateway = currentItem.isGateway ? " [GATEWAY]" : "";
        console.log(`Position ${position}: ${currentItem.digit} - ${currentItem.consciousness}${gateway}`);
        console.log(`  Vortex Flow: ${currentItem.vortexFlow}`);
        console.log(`  Torus Position: (${currentItem.torusPosition.x}, ${currentItem.torusPosition.y})`);
        console.log();
      }
    });
    
    // Demo play/pause
    console.log("Animation Controls:");
    piFlow = MathPiFlowSystem.playPiFlow(piFlow, 2.0);
    console.log(`  Play at 2x speed: isPlaying = ${piFlow.isPlaying}, speed = ${piFlow.animationSpeed}`);
    
    piFlow = MathPiFlowSystem.pausePiFlow(piFlow);
    console.log(`  Pause: isPlaying = ${piFlow.isPlaying}`);
    console.log();
  }
  
  /**
   * Demo consciousness gateways in PI
   */
  private static demoConsciousnessGatewaysInPi(): void {
    console.log("5. CONSCIOUSNESS GATEWAYS IN PI");
    console.log("=" .repeat(50));
    
    const piFlow = MathPiFlowSystem.generateEndlessPiFlow();
    const gateways = piFlow.stream.filter(item => item.isGateway).slice(0, 10);
    
    console.log("First 10 Consciousness Gateways in PI:");
    gateways.forEach((gateway, index) => {
      console.log(`  Gateway ${index + 1}: Position ${gateway.position}, Digit ${gateway.digit}`);
      console.log(`    Consciousness: ${gateway.consciousness}`);
      console.log(`    Vortex Flow: ${gateway.vortexFlow}`);
      console.log(`    Torus Position: (${gateway.torusPosition.x}, ${gateway.torusPosition.y})`);
      console.log();
    });
  }
  
  /**
   * Demo Math::PI.flow syntax
   */
  static demoMathPiFlowSyntax(): void {
    console.log("6. MATH::PI.FLOW SYNTAX");
    console.log("=" .repeat(50));
    
    const piFlow = MathPiFlowSystem.generateEndlessPiFlow();
    
    console.log("Math::PI.flow generates endless stream:");
    console.log("  - Switched at decimal without approximation");
    console.log("  - Stream is played, animated and navigated");
    console.log("  - Interactive torus flow in UI");
    console.log();
    
    console.log("Example Usage:");
    console.log("  Math::PI.flow.play()");
    console.log("  Math::PI.flow.pause()");
    console.log("  Math::PI.flow.navigate(position)");
    console.log("  Math::PI.flow.getCurrentItem()");
    console.log("  Math::PI.flow.getStatistics()");
    console.log();
    
    console.log("Current PI Flow State:");
    const currentItem = MathPiFlowSystem.getCurrentFlowItem(piFlow);
    if (currentItem) {
      console.log(`  Current Digit: ${currentItem.digit}`);
      console.log(`  Current Consciousness: ${currentItem.consciousness}`);
      console.log(`  Current Vortex Flow: ${currentItem.vortexFlow}`);
      console.log(`  Current Torus Position: (${currentItem.torusPosition.x}, ${currentItem.torusPosition.y})`);
    }
    console.log();
  }
}

// Run demo if this file is executed directly
if (require.main === module) {
  MathPiFlowDemo.runDemo();
  MathPiFlowDemo.demoMathPiFlowSyntax();
}

export { MathPiFlowDemo }; 