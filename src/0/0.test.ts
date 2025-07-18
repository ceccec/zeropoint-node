import { describe, it, expect } from 'vitest';
import '../0/index';

// Harmonic fraction utility (should match the one in index.html)
function toHarmonicFraction(value: number) {
    if (value <= 9 && value >= 0 && Number.isInteger(value)) {
        return {
            value: value,
            expression: `${value}/1`,
            isHarmonic: true
        };
    }
    const baseDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let bestFraction = null;
    let bestError = Infinity;
    for (let num of baseDigits) {
        for (let den of baseDigits) {
            const fraction = num / den;
            const error = Math.abs(fraction - value);
            if (error < bestError) {
                bestError = error;
                bestFraction = {
                    value: fraction,
                    expression: `${num}/${den}`,
                    isHarmonic: true,
                    originalValue: value
                };
            }
        }
    }
    return bestFraction || {
        value: Math.round(value),
        expression: `${Math.round(value)}/1`,
        isHarmonic: false,
        originalValue: value
    };
}

describe('Harmonic Fraction System', () => {
    it('converts non-single-digit numbers to harmonic fractions', () => {
        const testCases = [
            { input: 21, expected: '7/3' },
            { input: 15552, expected: '432/1' },
            { input: 2.5, expected: '5/2' },
            { input: 0.333, expected: '1/3' },
            { input: 4.5, expected: '9/2' },
            { input: 1.5, expected: '3/2' },
            { input: 0.5, expected: '1/2' },
            { input: 3, expected: '3/1' },
            { input: 7, expected: '7/1' }
        ];
        for (const { input, expected } of testCases) {
            const result = toHarmonicFraction(input);
            expect(result.expression).toBe(expected);
        }
    });

    it('returns single digits as themselves', () => {
        for (let d = 0; d <= 9; d++) {
            const result = toHarmonicFraction(d);
            expect(result.value).toBe(d);
            expect(result.expression).toBe(`${d}/1`);
        }
    });

    it('finds best harmonic fraction for decimals', () => {
        const result = toHarmonicFraction(0.666);
        expect(result.expression).toBe('2/3');
    });
}); 