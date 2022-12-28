import defaultTheme from 'tailwindcss/defaultTheme';

import { generateColorSetTheme } from './utils/color';

const theme = {
  ...defaultTheme,
  extend: {
    colors: {
      // Light Mode
      ...generateColorSetTheme('light'),

      // Dark Mode
      dark: {
        ...generateColorSetTheme('dark'),
      },
    },
    zIndex: {
      modal: 1300,
    },
    keyframes: {
      ripple: {
        from: {
          transform: 'scale(0)',
          opacity: '0.3',
        },
        to: {
          transform: 'scale(4)',
          opacity: '0',
        },
      },
    },
    animation: {
      ripple: 'ripple 600ms linear',
    },
  },
};

export default theme;
