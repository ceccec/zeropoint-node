export {};

declare global {
  var A432_HARMONICS?: {
    base: number;
    digitalRoot: number;
    primeFactors: number[];
    harmonicRatios: number[];
  };
  var INTEGER_DIRECTORIES?: { [key: number]: string };
} 