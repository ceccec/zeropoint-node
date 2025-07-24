// a432.paths.ts — Canonical YANG and YIN URL paths
//----------------------------------------------------
export const YANG_DIGITS = [0,3,6,9,1,2,4,8,7,5,1] as const;
export const YANG_PATH = '/' + YANG_DIGITS.join('/') + '/';

export const YIN_DIGITS  = [...YANG_DIGITS].reverse() as unknown as typeof YANG_DIGITS;
export const YIN_PATH  = '/' + YIN_DIGITS.join('/') + '/';

export function isYang(url: string): boolean { return url.startsWith(YANG_PATH); }
export function isYin(url: string): boolean { return url.startsWith(YIN_PATH); } 