import theme from './theme';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{tsx,css}'],
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
  theme,
};
