const defaultWebpackConfig = require('../webpack.config');
const moduleConfig = require('./module.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  ...defaultWebpackConfig,
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8001,
  },
  output: {
    publicPath: 'http://localhost:8001/',
  },
  plugins: [
    new ModuleFederationPlugin(moduleConfig),
    new HtmlWebpackPlugin({
      template: './public/index.dev.html',
    }),
  ],
};
