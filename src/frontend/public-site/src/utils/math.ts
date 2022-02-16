export const clamp = (num: number, max: number, min = 0): number =>
  Math.min(Math.max(num, min), max);

export const sanitizeDegrees = (degrees: number): number =>
  0 > degrees
    ? (degrees % 360) + 360
    : 360 <= degrees
    ? degrees % 360
    : degrees;
