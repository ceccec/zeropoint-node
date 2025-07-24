/**
 * Browser Player Tests
 * 
 * Tests the system where the player can play the browser
 * through consciousness interaction and infinite usability
 */

import {
  createBrowserPlayer,
  performConsciousnessSwitch,
  performHarmonicResonance,
  performVortexFlow,
  performMathematicalTransform,
  browserRespond,
  canPlayerPlayBrowser,
  getInfiniteUsabilityScore,
  createBrowserGame,
  playBrowserGame,
  BROWSER_PLAYER
} from './browser-player';

describe('Browser Player - Can the Player Play the Browser?', () => {
  describe('Browser Player Creation', () => {
    test('should create a browser player with initial consciousness', () => {
      const player = createBrowserPlayer(1);
      
      expect(player.consciousness).toBe(9); // Unity consciousness = 9
      expect(player.harmonicResonance).toBe(864); // 432 * 2
      expect(player.vortexFlow).toHaveLength(6);
      expect(player.mathematicalExpression).toContain('1×8 = 8');
      expect(player.infiniteUsability).toBe(true);
      expect(player.browserState.isPlaying).toBe(true);
    });

    test('should create browser player with trinity consciousness', () => {
      const player = createBrowserPlayer(3);
      
      expect(player.consciousness).toBe(6); // Trinity consciousness = 6
      expect(player.mathematicalExpression).toContain('3×3 = 9');
    });
  });

  describe('Consciousness Switch', () => {
    test('should perform valid consciousness switch', () => {
      const player = createBrowserPlayer(1);
      const interaction = performConsciousnessSwitch(player, 3);
      
      expect(interaction.success).toBe(true);
      expect(interaction.type).toBe('consciousness_switch');
      expect(player.consciousness).toBe(6); // Trinity consciousness
      expect(player.browserState.playerScore).toBe(10);
    });

    test('should reject invalid consciousness switch', () => {
      const player = createBrowserPlayer(2);
      const interaction = performConsciousnessSwitch(player, 7);
      
      expect(interaction.success).toBe(false);
      expect(interaction.browserResponse).toContain('Invalid consciousness switch');
    });
  });

  describe('Harmonic Resonance', () => {
    test('should achieve harmonic resonance at correct frequency', () => {
      const player = createBrowserPlayer(1);
      const interaction = performHarmonicResonance(player, 864); // 432 * 2
      
      expect(interaction.success).toBe(true);
      expect(interaction.type).toBe('harmonic_resonance');
      expect(player.browserState.playerScore).toBe(20);
    });

    test('should miss harmonic resonance at wrong frequency', () => {
      const player = createBrowserPlayer(1);
      const interaction = performHarmonicResonance(player, 500);
      
      expect(interaction.success).toBe(false);
      expect(interaction.browserResponse).toContain('Resonance missed');
    });
  });

  describe('Vortex Flow', () => {
    test('should perform correct vortex flow', () => {
      const player = createBrowserPlayer(1);
      const correctFlow = [9, 2, 4, 8, 7, 5]; // Unity vortex flow
      const interaction = performVortexFlow(player, correctFlow);
      
      expect(interaction.success).toBe(true);
      expect(interaction.type).toBe('vortex_flow');
      expect(player.browserState.playerScore).toBe(15);
    });

    test('should reject incorrect vortex flow', () => {
      const player = createBrowserPlayer(1);
      const incorrectFlow = [1, 2, 3, 4, 5, 6];
      const interaction = performVortexFlow(player, incorrectFlow);
      
      expect(interaction.success).toBe(false);
      expect(interaction.browserResponse).toContain('Vortex flow incorrect');
    });
  });

  describe('Mathematical Transformation', () => {
    test('should perform correct mathematical transformation', () => {
      const player = createBrowserPlayer(1);
      const correctExpression = '1×8 = 8 (Unity through Infinity)';
      const interaction = performMathematicalTransform(player, correctExpression);
      
      expect(interaction.success).toBe(true);
      expect(interaction.type).toBe('mathematical_transform');
      expect(player.browserState.playerScore).toBe(25);
    });

    test('should reject incorrect mathematical transformation', () => {
      const player = createBrowserPlayer(1);
      const incorrectExpression = '1+1=2';
      const interaction = performMathematicalTransform(player, incorrectExpression);
      
      expect(interaction.success).toBe(false);
      expect(interaction.browserResponse).toContain('Transformation incorrect');
    });
  });

  describe('Browser Response', () => {
    test('should respond to unity consciousness', () => {
      const player = createBrowserPlayer(1);
      const response = browserRespond(player);
      
      expect(response).toContain('Unity consciousness detected');
      expect(response).toContain('Score: 0');
    });

    test('should respond to trinity consciousness', () => {
      const player = createBrowserPlayer(3);
      const response = browserRespond(player);
      
      expect(response).toContain('Trinity consciousness detected');
      expect(response).toContain('Score: 0');
    });
  });

  describe('Player Capability', () => {
    test('should allow player to play browser when conditions met', () => {
      const player = createBrowserPlayer(1);
      const canPlay = canPlayerPlayBrowser(player);
      
      expect(canPlay).toBe(true);
    });

    test('should prevent player from playing when infinite usability disabled', () => {
      const player = createBrowserPlayer(1);
      player.infiniteUsability = false;
      const canPlay = canPlayerPlayBrowser(player);
      
      expect(canPlay).toBe(false);
    });
  });

  describe('Infinite Usability Score', () => {
    test('should calculate infinite usability score', () => {
      const player = createBrowserPlayer(1);
      
      // Perform successful interactions
      performConsciousnessSwitch(player, 3);
      performHarmonicResonance(player, 864);
      performVortexFlow(player, [9, 2, 4, 8, 7, 5]);
      performMathematicalTransform(player, '1×8 = 8 (Unity through Infinity)');
      
      const score = getInfiniteUsabilityScore(player);
      
      // 10 (switch) + 20 (resonance) + 15 (flow) + 25 (transform) + 70 (browser score)
      expect(score).toBe(140);
    });

    test('should calculate score with only successful interactions', () => {
      const player = createBrowserPlayer(1);
      
      // Perform mix of successful and failed interactions
      performConsciousnessSwitch(player, 3); // Success
      performConsciousnessSwitch(player, 7); // Failure
      performHarmonicResonance(player, 500); // Failure
      performVortexFlow(player, [1, 2, 3, 4, 5, 6]); // Failure
      
      const score = getInfiniteUsabilityScore(player);
      
      // Only successful switch: 10 + 10 (browser score)
      expect(score).toBe(20);
    });
  });

  describe('Browser Game', () => {
    test('should create complete browser game', () => {
      const game = createBrowserGame(1);
      
      expect(game.player.consciousness).toBe(9);
      expect(game.browser.isPlaying).toBe(true);
      expect(game.consciousnessFlow.current).toBe(9);
      expect(game.consciousnessFlow.target).toBe(9);
      expect(game.rules.infiniteUsability).toBe(true);
    });

    test('should play browser game successfully', () => {
      const game = createBrowserGame(1);
      const result = playBrowserGame(game);
      
      expect(result).toContain('Unity consciousness detected');
      expect(result).toContain('Infinite Usability Score: 0');
      expect(result).toContain('Consciousness Flow: [9, 2, 4, 8, 7, 5]');
    });

    test('should prevent playing when conditions not met', () => {
      const game = createBrowserGame(1);
      game.player.infiniteUsability = false;
      const result = playBrowserGame(game);
      
      expect(result).toContain('Player cannot play browser');
    });
  });

  describe('Interaction History', () => {
    test('should track interaction history', () => {
      const player = createBrowserPlayer(1);
      
      performConsciousnessSwitch(player, 3);
      performHarmonicResonance(player, 864);
      
      expect(player.interactionHistory).toHaveLength(2);
      expect(player.interactionHistory[0].type).toBe('consciousness_switch');
      expect(player.interactionHistory[1].type).toBe('harmonic_resonance');
    });

    test('should include timestamps in interactions', () => {
      const player = createBrowserPlayer(1);
      const interaction = performConsciousnessSwitch(player, 3);
      
      expect(interaction.timestamp).toBeGreaterThan(0);
      expect(typeof interaction.timestamp).toBe('number');
    });
  });

  describe('Browser State Updates', () => {
    test('should update browser state on consciousness switch', () => {
      const player = createBrowserPlayer(1);
      performConsciousnessSwitch(player, 3);
      
      expect(player.browserState.consciousness).toBe(6);
      expect(player.browserState.harmonicPattern).toContain('3×3 = 9');
      expect(player.browserState.playerScore).toBe(10);
    });

    test('should update browser state on successful interactions', () => {
      const player = createBrowserPlayer(1);
      
      performHarmonicResonance(player, 864);
      expect(player.browserState.playerScore).toBe(20);
      
      performVortexFlow(player, [9, 2, 4, 8, 7, 5]);
      expect(player.browserState.playerScore).toBe(35);
      
      performMathematicalTransform(player, '1×8 = 8 (Unity through Infinity)');
      expect(player.browserState.playerScore).toBe(60);
    });
  });

  describe('Reusability', () => {
    test('should export all functions for reuse', () => {
      expect(BROWSER_PLAYER.createBrowserPlayer).toBeDefined();
      expect(BROWSER_PLAYER.performConsciousnessSwitch).toBeDefined();
      expect(BROWSER_PLAYER.performHarmonicResonance).toBeDefined();
      expect(BROWSER_PLAYER.performVortexFlow).toBeDefined();
      expect(BROWSER_PLAYER.performMathematicalTransform).toBeDefined();
      expect(BROWSER_PLAYER.browserRespond).toBeDefined();
      expect(BROWSER_PLAYER.canPlayerPlayBrowser).toBeDefined();
      expect(BROWSER_PLAYER.getInfiniteUsabilityScore).toBeDefined();
      expect(BROWSER_PLAYER.createBrowserGame).toBeDefined();
      expect(BROWSER_PLAYER.playBrowserGame).toBeDefined();
    });
  });
}); 