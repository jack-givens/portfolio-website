//from https://material-foundation.github.io/material-theme-builder/

import { VuetifyThemes } from 'vuetify/types/services/theme';
import { clamp, sanitizeDegrees } from './math';

type _Rgb = { red: number; green: number; blue: number };
type _Xyz = { x: number; y: number; z: number };
type ColorConstructor = string | number | _Rgb | _Xyz;

const COLOR_CONSTS = {
  aw: 29.98099719444734,
  c: 0.69,
  fLRoot: 0.7894826179304937,
  fl: 0.3884814537800353,
  n: 0.18418651851244416,
  nbb: 1.0169191804458757,
  nc: 1,
  ncb: 1.0169191804458757,
  rgbD: [1.02117770275752, 0.9863077294280124, 0.9339605082802299],
  z: 1.909169568483652
};

// export class Color {
//   //internal argb int value
//   private value: number;
//   constructor(value: ColorConstructor) {
//     if (typeof value === 'number') {
//       this.value = value;
//     } else if (typeof value === 'string') {
//       this.hex = value;
//     }
//   }
//   set rgb({ red, green, blue }: _Rgb) {
//     this.value =
//       (-16777216 |
//         ((clamp(red, 255) & 255) << 16) |
//         ((clamp(green, 255) & 255) << 8) |
//         (clamp(blue, 255) & 255)) >>>
//       0;
//   }
//   get rgb(): _Rgb {
//     return {
//       red: (this.value & 16711680) >> 16,
//       blue: (this.value & 65280) >> 8,
//       green: this.value & 255
//     };
//   }

//   set rgbArray(val: number[]) {
//     this.rgb = { red: val[0], green: val[1], blue: val[2] };
//   }
//   get rgbArray(): number[] {
//     const { red, green, blue } = this.rgb;
//     return [red, green, blue];
//   }

//   get rgbLinearized(): _Rgb {
//     return {
//       red: linearized(this.rgb.red / 255),
//       green: linearized(this.rgb.green / 255),
//       blue: linearized(this.rgb.blue / 255)
//     };
//   }

//   set hex(val: string) {
//     val.replace('#', '');
//     if (val.length > 6) val = val.slice(2, val.length);
//     const [increment, repeat] = val.length === 3 ? [1, 2] : [2, 1];
//     const rgbArray = [];
//     for (let i = 0; i < val.length; i += increment) {
//       const slice = val.slice(i, i + increment).repeat(repeat);
//       rgbArray.push(parseInt(slice, 16));
//     }
//     this.rgbArray = rgbArray;
//   }
//   get hex(): string {
//     return this.rgbArray.reduce(
//       (result, curr) => (result += curr.toString(16).padStart(2, '0')),
//       '#'
//     );
//   }

//   get luminance(): number {
//     const { red, green, blue } = this.rgbLinearized;
//     const y = 21.26 * red + 71.52 * green + (7.22 * blue) / 100;
//     return y <= 216 / 24389 ? (24389 / 27) * y : 116 * Math.pow(y, 1 / 3) - 16;
//   }

//   get xyz(): _Xyz {
//     const { red, green, blue } = this.rgbLinearized;
//     return {
//       x: (0.41233895 * red + 0.35762064 * green + 0.18051042 * blue) * 100,
//       y: (0.2126 * red + 0.7152 * green + 0.0722 * blue) * 100,
//       z: (0.01932141 * red + 0.11916382 * green + 0.95034478 * blue) * 100,
//     };
//   }
// }

// const adapt = (component: number) => {
//   const x = Math.pow(COLOR_CONSTS.fl * Math.abs(component) * 0.01, 0.42);
//   return (signum(component) * 400 * x) / (x + 27.13);
// };

export class Rgb {
  red: number;
  green: number;
  blue: number;
  constructor(red: number, green: number, blue: number) {
    this.red = clamp(red, 255);
    this.green = clamp(green, 255);
    this.blue = clamp(blue, 255);
  }
  toInt(): number {
    return (
      (-16777216 |
        ((this.red & 255) << 16) |
        ((this.green & 255) << 8) |
        (this.blue & 255)) >>>
      0
    );
  }
  toArray(): number[] {
    return [this.red, this.green, this.blue];
  }
  toHex(): Hex {
    return new Hex(
      this.toArray().reduce(
        (result, curr) => (result += curr.toString(16).padStart(2, '0')),
        '#'
      )
    );
  }
  static fromArray(rgb: number[]): Rgb {
    return rgb.length !== 3
      ? new Rgb(0, 0, 0)
      : new Rgb(rgb[0], rgb[1], rgb[2]);
  }
  static fromInt(argb: number): Rgb {
    return new Rgb((argb & 16711680) >> 16, (argb & 65280) >> 8, argb & 255);
  }
}

export class Hex extends String {
  toRgb(): Rgb {
    let hex = this.replace('#', '');
    if (hex.length > 6) hex = hex.slice(2, hex.length);
    const [increment, repeat] = hex.length === 3 ? [1, 2] : [2, 1];
    const rgb = [];
    for (let i = 0; i < hex.length; i += increment) {
      const slice = hex.slice(i, i + increment).repeat(repeat);
      rgb.push(parseInt(slice, 16));
    }
    return Rgb.fromArray(rgb);
  }
}

const signum = (input: number) => (0 > input ? -1 : 0 === input ? 0 : 1);

const viewingConditions = {
  aw: 29.98099719444734,
  c: 0.69,
  fLRoot: 0.7894826179304937,
  fl: 0.3884814537800353,
  n: 0.18418651851244416,
  nbb: 1.0169191804458757,
  nc: 1,
  ncb: 1.0169191804458757,
  rgbD: [1.02117770275752, 0.9863077294280124, 0.9339605082802299],
  z: 1.909169568483652
};

const linearized = (rgb: number) =>
  0.04045 >= rgb ? rgb / 12.92 : Math.pow((rgb + 0.055) / 1.055, 2.4);
const delinearized = (rgb: number) =>
  0.0031308 >= rgb ? 12.92 * rgb : 1.055 * Math.pow(rgb, 1 / 2.4) - 0.055;

const lstarFromInt = (argb: number) => {
  let y =
    21.26 * linearized(((argb & 16711680) >> 16) / 255) +
    71.52 * linearized(((argb & 65280) >> 8) / 255) +
    7.22 * linearized((argb & 255) / 255);
  y /= 100;
  return y <= 216 / 24389 ? (24389 / 27) * y : 116 * Math.pow(y, 1 / 3) - 16;
};

const WHITE_POINT_D65 = [95.047, 100, 108.883];

const intFromXyz = (x: number, y: number, z: number): number => {
  x /= 100;
  y /= 100;
  z /= 100;
  return new Rgb(
    255 * delinearized(3.2406 * x + -1.5372 * y + -0.4986 * z),
    255 * delinearized(-0.9689 * x + 1.8758 * y + 0.0415 * z),
    255 * delinearized(0.0557 * x + -0.204 * y + 1.057 * z)
  ).toInt();
};

const intFromLstar = (lstar: number) => {
  const fy = (lstar + 16) / 116,
    kappa = 24389 / 27,
    cubeExceedEpsilon = fy * fy * fy > 216 / 24389;
  const xyz = [
    (cubeExceedEpsilon ? fy * fy * fy : (116 * fy - 16) / kappa) *
      WHITE_POINT_D65[0],
    (8 < lstar ? fy * fy * fy : lstar / kappa) * WHITE_POINT_D65[1],
    (cubeExceedEpsilon ? fy * fy * fy : (116 * fy - 16) / kappa) *
      WHITE_POINT_D65[2]
  ];
  return intFromXyz(xyz[0], xyz[1], xyz[2]);
};

const viewed = function (value: Cam16) {
  const t = Math.pow(
      (0 === value.chroma || 0 === value.j
        ? 0
        : value.chroma / Math.sqrt(value.j / 100)) /
        Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73),
      1 / 0.9
    ),
    hRad = (value.hue * Math.PI) / 180,
    p2 =
      (viewingConditions.aw *
        Math.pow(
          value.j / 100,
          1 / viewingConditions.c / viewingConditions.z
        )) /
      viewingConditions.nbb,
    hSin = Math.sin(hRad),
    hCos = Math.cos(hRad),
    gamma =
      (23 * (p2 + 0.305) * t) /
      ((5e4 / 13) *
        (Math.cos(hRad + 2) + 3.8) *
        5.75 *
        viewingConditions.nc *
        viewingConditions.ncb +
        11 * t * hCos +
        108 * t * hSin),
    a = gamma * hCos,
    b = gamma * hSin,
    rA = (460 * p2 + 451 * a + 288 * b) / 1403,
    gA = (460 * p2 - 891 * a - 261 * b) / 1403,
    bA = (460 * p2 - 220 * a - 6300 * b) / 1403,
    rF =
      ((100 / viewingConditions.fl) *
        signum(rA) *
        Math.pow(
          Math.max(0, (27.13 * Math.abs(rA)) / (400 - Math.abs(rA))),
          1 / 0.42
        )) /
      viewingConditions.rgbD[0],
    gF =
      ((100 / viewingConditions.fl) *
        signum(gA) *
        Math.pow(
          Math.max(0, (27.13 * Math.abs(gA)) / (400 - Math.abs(gA))),
          1 / 0.42
        )) /
      viewingConditions.rgbD[1],
    bF =
      ((100 / viewingConditions.fl) *
        signum(bA) *
        Math.pow(
          Math.max(0, (27.13 * Math.abs(bA)) / (400 - Math.abs(bA))),
          1 / 0.42
        )) /
      viewingConditions.rgbD[2];
  return intFromXyz(
    1.86206786 * rF - 1.01125463 * gF + 0.14918677 * bF,
    0.38752654 * rF + 0.62144744 * gF - 0.00897398 * bF,
    -0.0158415 * rF - 0.03412294 * gF + 1.04996444 * bF
  );
};

export class Cam16 {
  hue: number;
  chroma: number;
  j: number;
  q: number;
  s: number;
  jstar: number;
  astar: number;
  bstar: number;
  constructor(
    hue: number,
    chroma: number,
    j: number,
    q: number,
    s: number,
    jstar: number,
    astar: number,
    bstar: number
  ) {
    this.hue = hue;
    this.chroma = chroma;
    this.j = j;
    this.q = q;
    this.s = s;
    this.jstar = jstar;
    this.astar = astar;
    this.bstar = bstar;
  }
  distance(other: Cam16): number {
    const dJ = this.jstar - other.jstar,
      dA = this.astar - other.astar,
      dB = this.bstar - other.bstar;
    return 1.41 * Math.pow(Math.sqrt(dJ * dJ + dA * dA + dB * dB), 0.63);
  }

  static fromInt(argb: number): Cam16 {
    const redL = 100 * linearized(((argb & 16711680) >> 16) / 255),
      greenL = 100 * linearized(((argb & 65280) >> 8) / 255),
      blueL = 100 * linearized((argb & 255) / 255),
      x = 0.41233895 * redL + 0.35762064 * greenL + 0.18051042 * blueL,
      y = 0.2126 * redL + 0.7152 * greenL + 0.0722 * blueL,
      z = 0.01932141 * redL + 0.11916382 * greenL + 0.95034478 * blueL,
      rD =
        viewingConditions.rgbD[0] *
        (0.401288 * x + 0.650173 * y - 0.051461 * z),
      gD =
        viewingConditions.rgbD[1] *
        (-0.250268 * x + 1.204414 * y + 0.045854 * z),
      bD =
        viewingConditions.rgbD[2] *
        (-0.002079 * x + 0.048952 * y + 0.953127 * z),
      rAF = Math.pow((viewingConditions.fl * Math.abs(rD)) / 100, 0.42),
      gAF = Math.pow((viewingConditions.fl * Math.abs(gD)) / 100, 0.42),
      bAF = Math.pow((viewingConditions.fl * Math.abs(bD)) / 100, 0.42),
      rA = (400 * signum(rD) * rAF) / (rAF + 27.13),
      gA = (400 * signum(gD) * gAF) / (gAF + 27.13),
      bA = (400 * signum(bD) * bAF) / (bAF + 27.13),
      a = (11 * rA + -12 * gA + bA) / 11,
      b = (rA + gA - 2 * bA) / 9,
      atanDegrees = (180 * Math.atan2(b, a)) / Math.PI,
      hue =
        0 > atanDegrees
          ? atanDegrees + 360
          : 360 <= atanDegrees
          ? atanDegrees - 360
          : atanDegrees,
      hueRadians = (hue * Math.PI) / 180,
      j =
        100 *
        Math.pow(
          (((40 * rA + 20 * gA + bA) / 20) * viewingConditions.nbb) /
            viewingConditions.aw,
          viewingConditions.c * viewingConditions.z
        ),
      alpha =
        Math.pow(
          ((5e4 / 13) *
            0.25 *
            (Math.cos(((20.14 > hue ? hue + 360 : hue) * Math.PI) / 180 + 2) +
              3.8) *
            viewingConditions.nc *
            viewingConditions.ncb *
            Math.sqrt(a * a + b * b)) /
            ((20 * rA + 20 * gA + 21 * bA) / 20 + 0.305),
          0.9
        ) * Math.pow(1.64 - Math.pow(0.29, viewingConditions.n), 0.73),
      c = alpha * Math.sqrt(j / 100),
      mstar =
        (1 / 0.0228) * Math.log(1 + 0.0228 * c * viewingConditions.fLRoot);
    return new Cam16(
      hue,
      c,
      j,
      (4 / viewingConditions.c) *
        Math.sqrt(j / 100) *
        (viewingConditions.aw + 4) *
        viewingConditions.fLRoot,
      50 *
        Math.sqrt((alpha * viewingConditions.c) / (viewingConditions.aw + 4)),
      ((1 + 100 * 0.007) * j) / (1 + 0.007 * j),
      mstar * Math.cos(hueRadians),
      mstar * Math.sin(hueRadians)
    );
  }

  static fromJch(j: number, c: number, h: number): Cam16 {
    const hueRadians = (h * Math.PI) / 180,
      mstar =
        (1 / 0.0228) * Math.log(1 + 0.0228 * c * viewingConditions.fLRoot);
    return new Cam16(
      h,
      c,
      j,
      (4 / viewingConditions.c) *
        Math.sqrt(j / 100) *
        (viewingConditions.aw + 4) *
        viewingConditions.fLRoot,
      50 *
        Math.sqrt(
          ((c / Math.sqrt(j / 100)) * viewingConditions.c) /
            (viewingConditions.aw + 4)
        ),
      ((1 + 100 * 0.007) * j) / (1 + 0.007 * j),
      mstar * Math.cos(hueRadians),
      mstar * Math.sin(hueRadians)
    );
  }
}

export class Hct {
  hue: number;
  chroma: number;
  tone: number;
  constructor(hue: number, chroma: number, tone: number) {
    this.hue = hue;
    this.chroma = chroma;
    this.tone = tone;
  }
  toInt(): number {
    let hue_ = sanitizeDegrees(this.hue);
    const chroma_ = this.chroma;
    const tone_ = clamp(this.tone, 100);
    if (1 > chroma_ || 0 >= Math.round(tone_) || 100 <= Math.round(tone_))
      return intFromLstar(tone_);
    hue_ = sanitizeDegrees(hue_);
    let high = chroma_,
      mid = chroma_,
      low = 0,
      isFirstLoop = !0,
      answer = null;
    while (0.4 <= Math.abs(low - high)) {
      const hue = hue_,
        chroma = mid,
        tone = tone_;
      let low_ = 0,
        high_ = 100,
        mid_,
        bestdL = 1e3,
        bestdE = 1e3,
        bestCam = null;
      while (0.01 < Math.abs(low_ - high_)) {
        mid_ = low_ + (high_ - low_) / 2;
        const clipped = viewed(Cam16.fromJch(mid_, chroma, hue)),
          clippedLstar = lstarFromInt(clipped),
          dL = Math.abs(tone - clippedLstar);
        if (0.2 > dL) {
          const camClipped = Cam16.fromInt(clipped),
            dE = camClipped.distance(
              Cam16.fromJch(camClipped.j, camClipped.chroma, hue)
            );
          1 >= dE &&
            dE <= bestdE &&
            ((bestdL = dL), (bestdE = dE), (bestCam = camClipped));
        }
        if (0 === bestdL && 0 === bestdE) break;
        clippedLstar < tone ? (low_ = mid_) : (high_ = mid_);
      }
      const possibleAnswer = bestCam;
      if (isFirstLoop) {
        if (null != possibleAnswer) return viewed(possibleAnswer);
        isFirstLoop = !1;
      } else
        null === possibleAnswer
          ? (high = mid)
          : ((answer = possibleAnswer), (low = mid));
      mid = low + (high - low) / 2;
    }
    return null === answer ? intFromLstar(tone_) : viewed(answer);
  }
}

//sets key for both 'light' and 'dark' themes with varying luminance

// const setThemeKey = (
//   hue: number,
//   chroma: number,
//   key: string,
//   themes: VuetifyThemes
// ) => {
//   themes.dark[key] = Rgb.fromInt(new Hct(hue, chroma, 80).toInt())
//     .toHex()
//     .toString();
//   themes.light[key] = Rgb.fromInt(new Hct(hue, chroma, 40).toInt())
//     .toHex()
//     .toString();
// };

// export const setThemes = (hex: string, theme: VuetifyThemes): void => {
//   const argb = new Hex(hex).toRgb().toInt();
//   const { hue, chroma } = cam16fromInt(argb);
//   setThemeKey(hue, Math.max(48, chroma), 'primary', theme);
//   setThemeKey(hue, Math.max(48, chroma), 'success', theme);
//   setThemeKey(hue, 16, 'secondary', theme);
//   setThemeKey(hue + 60, 24, 'accent', theme);
//   setThemeKey(hue, 4, 'info', theme);
//   setThemeKey(hue, 8, 'warning', theme);
//   setThemeKey(25, 84, 'error', theme);
//   debugger;
// };
