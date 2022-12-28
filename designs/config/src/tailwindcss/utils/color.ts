import colors from 'tailwindcss/colors';
import tinycolor from 'tinycolor2';

const COLOR_SET: {
  name: string;
  color: {
    light: Record<string, string> | string;
    dark: Record<string, string> | string;
    palette: boolean;
  };
}[] = [
  {
    name: 'Primary',
    color: {
      light: colors.purple,
      dark: colors.purple,
      palette: true,
    },
  },
  {
    name: 'Secondary',
    color: {
      light: colors.gray,
      dark: colors.gray,
      palette: true,
    },
  },
  {
    name: 'Success',
    color: {
      light: colors.green,
      dark: colors.green,
      palette: true,
    },
  },
  {
    name: 'Danger',
    color: {
      light: colors.red,
      dark: colors.red,
      palette: true,
    },
  },
  {
    name: 'Warning',
    color: {
      light: colors.yellow,
      dark: colors.yellow,
      palette: true,
    },
  },
  {
    name: 'Info',
    color: {
      light: colors.blue,
      dark: colors.blue,
      palette: true,
    },
  },
];

const PALETTE_SET = [
  {
    key: '100',
    name: 'Lightest',
  },
  {
    key: '200',
    name: 'Lighter',
  },
  {
    key: '300',
    name: 'Light',
  },
  {
    key: '400',
    name: '',
  },
  {
    key: '500',
    name: 'Dark',
  },
  {
    key: '600',
    name: 'Darker',
  },
  {
    key: '700',
    name: 'Darkest',
  },
];

type Color = ColorFunction | string;
type ColorFunction = (params: { opacityValue: number }) => string;
type ColorTheme = {
  [key: string]: Color;
};

export function generateColorSetTheme(mode: 'light' | 'dark'): ColorTheme {
  const result: ColorTheme = {};
  ['text', 'bg'].forEach(target => {
    COLOR_SET.forEach(colorSet => {
      if (!colorSet.color.palette) {
        if (!colorSet.color[mode]) {
          return;
        } else {
          result[`${target}${colorSet.name}`] = withOpacityValue(colorSet.color[mode] as string);
        }
      } else {
        PALETTE_SET.forEach(palette => {
          result[`${target}${colorSet.name}${palette.name}`] = withOpacityValue(
            (colorSet.color[mode] as Record<string, string>)[palette.key],
          );
        });
      }
    });
  });

  return result;
}

export function withOpacityValue(variable: string): Color {
  const color = tinycolor(variable).toRgb();
  variable = [color.r, color.g, color.b].join(' ');
  return ({ opacityValue }: { opacityValue: number }) => {
    if (opacityValue === undefined) {
      return `rgb(${variable})`;
    }
    return `rgb(${variable} / ${opacityValue})`;
  };
}
