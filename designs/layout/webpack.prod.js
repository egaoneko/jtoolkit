const defaultWebpackConfig = require('../../webpack.prod');
const moduleConfig = require('./module.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  ...defaultWebpackConfig,
  plugins: [
    new ModuleFederationPlugin(moduleConfig),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
