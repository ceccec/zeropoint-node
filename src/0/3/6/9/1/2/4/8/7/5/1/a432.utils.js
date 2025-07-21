"use strict";
// a432.utils.ts
// Shared utility functions for the A432 framework
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDigitalRoot = calculateDigitalRoot;
exports.calculateA432Frequency = calculateA432Frequency;
const a432_constants_1 = require("./a432.constants");
/**
 * Calculate the digital root of a number (returns 9 for 0)
 */
function calculateDigitalRoot(value) {
    if (value === 0)
        return 9;
    const root = value % a432_constants_1.A432_CONSTANTS.DIGITAL_ROOT_BASE;
    return root === 0 ? a432_constants_1.A432_CONSTANTS.DIGITAL_ROOT_BASE : root;
}
/**
 * Calculate the A432 frequency for a string or number input
 */
function calculateA432Frequency(input) {
    if (typeof input === 'number') {
        return input * a432_constants_1.A432_CONSTANTS.A432_FREQUENCY;
    }
    const sum = input.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return sum * a432_constants_1.A432_CONSTANTS.A432_FREQUENCY;
}
