import { 
  generateColorReality, 
  colorSwitchReality, 
  getColorRealityString,
  ColorReality 
} from './index';

describe('Color Reality System', () => {
  test('should start from negative (0 = void/negative)', () => {
    const colorReality = generateColorReality(0);
    expect(colorReality.isNegative).toBe(true);
    expect(colorReality.reality).toBe('negative');
  });

  test('should generate negative colors for digit 0', () => {
    const colorReality = generateColorReality(0);
    expect(colorReality.hue).toBe(180); // Inverted from 0
    expect(colorReality.lightness).toBeLessThan(50); // Darker for negative
  });

  test('should switch from negative to positive reality', () => {
    const negativeReality = generateColorReality(0);
    const positiveReality = colorSwitchReality(0, 'positive');
    
    expect(negativeReality.isNegative).toBe(true);
    expect(positiveReality.isNegative).toBe(false);
    expect(positiveReality.reality).toBe('positive');
  });

  test('should switch from negative to neutral reality', () => {
    const negativeReality = generateColorReality(0);
    const neutralReality = colorSwitchReality(0, 'neutral');
    
    expect(negativeReality.isNegative).toBe(true);
    expect(neutralReality.isNegative).toBe(false);
    expect(neutralReality.reality).toBe('neutral');
  });

  test('should generate valid HSL color strings', () => {
    const colorReality = generateColorReality(5);
    const colorString = getColorRealityString(colorReality);
    
    expect(colorString).toMatch(/^hsl\(\d+,\s*\d+%,\s*\d+%\)$/);
  });

  test('should maintain quantum properties during color switching', () => {
    const originalReality = generateColorReality(3);
    const switchedReality = colorSwitchReality(3, 'positive');
    
    expect(originalReality.phase).toBeDefined();
    expect(switchedReality.phase).toBeDefined();
    expect(switchedReality.phase).not.toBe(originalReality.phase);
  });

  test('should handle all reality transitions', () => {
    const digit = 7;
    
    const negative = colorSwitchReality(digit, 'negative');
    const neutral = colorSwitchReality(digit, 'neutral');
    const positive = colorSwitchReality(digit, 'positive');
    
    expect(negative.reality).toBe('negative');
    expect(neutral.reality).toBe('neutral');
    expect(positive.reality).toBe('positive');
  });

  test('should invert hue for negative reality', () => {
    const positiveReality = generateColorReality(5);
    const negativeReality = colorSwitchReality(5, 'negative');
    
    const hueDifference = Math.abs(positiveReality.hue - negativeReality.hue);
    expect(hueDifference).toBeCloseTo(180, -1); // Should be approximately 180 degrees apart
  });

  test('should adjust lightness based on reality', () => {
    const positiveReality = colorSwitchReality(2, 'positive');
    const negativeReality = colorSwitchReality(2, 'negative');
    
    expect(positiveReality.lightness).toBeGreaterThan(negativeReality.lightness);
  });
}); 