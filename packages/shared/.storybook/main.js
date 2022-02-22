const postcssConfig = require('../postcss.config');
const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-actions', '@storybook/addon-essentials'],
  webpackFinal: async config => {
    // svg
    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    // tailwindcss
    config.module.rules = config.module.rules.filter(f => f.test.toString() !== '/\\.css$/');
    config.module.rules.push({
      test: /\.css$/i,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: postcssConfig,
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  },
};
