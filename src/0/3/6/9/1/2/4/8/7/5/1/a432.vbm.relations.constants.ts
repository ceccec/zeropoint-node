import { Fraction } from './a432.math';

/**
 * VBMDigitRelations – raw digit sequences (as strings) extracted from VBM.txt.
 * Consumers can parse via `s.split(' ').map(Number)` or other helpers.
 */
export const VBMDigitRelations: readonly string[] = [
  "0 1 3 12",
  "0 66 12",
  "0 77 99 88 88 99 77 11",
  "00 3 12",
  "00 5 62",
  "1 0 0",
  "1 1 2 3",
  "1 1 2 4 8 7 5 1 2 4 8 2 8 2 4 8 7 5 8 2 4 8 3 8 7 4 8 7 5 8 7 4 8 4 8 7 4 8 7 5 8 7 4 8 5 8 7 5 8 7 5 8 7 5",
  "1 2 3",
  "1 2 4",
  "1 2 4 5 8 7 5",
  "1 2 4 7 5",
  "1 2 4 8",
  "1 2 4 8 16 32",
  "1 2 4 8 7 5",
  "1 2 4 8 7 5 1 2 4 8 7 5 1 2 4 8 7 5",
  "1 2 5",
  "1 3 4",
  "1 4 5",
  "1 4 6 11",
  "1 4 7",
  "1 55 11 49 22 33",
  "1 55 11 49 22 33 33 22 49 11 55 12",
  "1 6 2 7 3 8 4 5",
  "1 6 5 2 9 7 4 3 8",
  "1 6 5 2 9 7 4 3 8 8 3 4 7 9 2 5 6 1",
  "1 66 11",
  "1 7 4",
  "1 7 8 2 3 9 4 10 5 11 6",
  "1 8 2 7 4 5",
  "10 26 50 12",
  "10 9 9 9 9 9",
  "10 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9",
  "14 7 21 49 28 42 35 35 42 28 49 21 7 14",
  "2 2 5 4 6",
  "2 5 8",
  "2 6 3 5 4",
  "2 8 1 3",
  "2 8 5",
  "25 1 1 00",
  "3 1 4 7",
  "3 5 4 7 7 7",
  "3 6 2 5 8",
  "3 6 9",
  "3 6 9 9 6 3",
  "3 7 1 5 4 2 5 3 9 8 4 4 5 5 1",
  "3 7 7 8 1 8 9 8",
  "3 9 6",
  "3 9 6 6 9 3",
  "3 9 6 6 9 3 3 9 6",
  "3 9 6 6 9 3 3 9 6 6 9 3 3 9 6 6 9 3",
  "33 22 49 11 55 12",
  "5 1 2 4",
  "5 10 10 00",
  "5 10 25 15 20 20 15 25 10 5 5 10 25 15 20 2 0 1 5 2 5 1 0 5 5 1 0 2 5 1 5 2 0 20 15 25 10 5",
  "5 12 10 7 3 8",
  "5 25 10",
  "5 3 9 6",
  "5 4 9 8 1 7 2 6 3 5 4",
  "5 7 8 4 2 1",
  "52 32 72",
  "6 3 3",
  "6 32 22 21 11 31 1 5 36 12 2 10 15 26 35 33 28 8 20 30 18 23 9 19 13 29 3 4 14 24",
  "6 4 7 5 4 8 6 2",
  "6 9 3 6 9",
  "7 3 9 6",
  "7 9 2 5 6 1 1 6 5 2 9",
  "7 9 8 1",
  "8 3 7 2 6 1 5 9",
  "8 7 1 3",
  "8 7 6",
  "8 9 1 7 2 6 5 4 3",
  "9 1 1 8 1 2 2 6 3 5 5 1 4 8",
  "9 1 2 3 5 4",
  "9 7 2 9 2",
  "9 9 6",
  "9 9 9",
  "9 9 9 9 9 9 9 9 9 9 9 9 9 9",
  "9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9",
  "9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9"
] as const;

/** Transform to numeric arrays */
export const VBMDigitArrays: readonly number[][] = VBMDigitRelations.map(s => s.split(' ').map(Number)); 